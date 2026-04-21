import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/client";
import { fallbackProducts, fallbackProfiles } from "../data/fallbackContent";

const ShopContext = createContext(null);

const cartKey = "mindpark-cart";

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem(cartKey);
    return stored ? JSON.parse(stored) : [];
  });
  const [loading, setLoading] = useState(true);
  const [cartToast, setCartToast] = useState("");

  useEffect(() => {
    localStorage.setItem(cartKey, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productData, profileData] = await Promise.all([
          api.get("/products"),
          api.get("/content/profiles"),
        ]);

        const nextProducts = Array.isArray(productData) && productData.length ? productData : fallbackProducts;
        const nextProfiles = Array.isArray(profileData) && profileData.length ? profileData : fallbackProfiles;

        setProducts(nextProducts);
        setProfiles(nextProfiles);
      } catch (error) {
        setProducts(fallbackProducts);
        setProfiles(fallbackProfiles);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const refreshProducts = async () => {
    const productData = await api.get("/products");

    const nextProducts = Array.isArray(productData) && productData.length ? productData : fallbackProducts;
    setProducts(nextProducts);
    return nextProducts;
  };

  const addToCart = (product, quantity = 1) => {
    const isActive = product?.isActive !== false;
    const stock = Number(product?.countInStock || 0);
    const productKey = product?._id || product?.slug;

    if (!productKey || !isActive || stock <= 0) {
      return;
    }

    setCart((current) => {
      const existing = current.find((item) => (item._id || item.slug) === productKey);
      if (existing) {
        const safeQuantity = Math.max(1, Number(quantity) || 1);
        const nextQuantity = Math.min(existing.quantity + safeQuantity, stock);

        if (nextQuantity > existing.quantity) {
          setCartToast(`${product.name} quantity updated in cart`);
        } else {
          setCartToast(`${product.name} already at max stock in cart`);
        }

        return current.map((item) =>
          (item._id || item.slug) === productKey ? { ...item, quantity: nextQuantity } : item
        );
      }

      const safeQuantity = Math.max(1, Number(quantity) || 1);
      setCartToast(`${product.name} added to cart`);
      return [...current, { ...product, quantity: Math.min(safeQuantity, stock) }];
    });
  };

  const updateQuantity = (itemId, quantity) => {
    setCart((current) =>
      current
        .map((item) =>
          (item._id || item.slug) === itemId
            ? {
                ...item,
                quantity: Math.max(0, Math.min(quantity, item.countInStock || quantity)),
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const getCartQuantity = (product) => {
    const productKey = product?._id || product?.slug;
    if (!productKey) return 0;

    const cartItem = cart.find((item) => (item._id || item.slug) === productKey);
    return cartItem?.quantity || 0;
  };

  const showCartToast = (message) => {
    setCartToast(message);
  };

  useEffect(() => {
    if (!cartToast) return;

    const timerId = window.setTimeout(() => setCartToast(""), 1800);
    return () => window.clearTimeout(timerId);
  }, [cartToast]);

  const clearCart = () => setCart([]);

  return (
    <ShopContext.Provider
      value={{
        products,
        profiles,
        cart,
        loading,
        addToCart,
        updateQuantity,
        getCartQuantity,
        clearCart,
        refreshProducts,
        cartToast,
        showCartToast,
        featuredProducts: products.filter((product) => product.featured && product.isActive).slice(0, 3),
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
