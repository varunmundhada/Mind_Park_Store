import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { useShop } from "../context/ShopContext";

export const ProductDetailsPage = () => {
  const { slug } = useParams();
  const { products, addToCart } = useShop();
  const { user, toggleWishlist } = useAuth();

  const product = useMemo(() => products.find((item) => item.slug === slug), [products, slug]);

  if (!product) {
    return (
      <section className="container-shell py-16">
        <p className="text-slate-600">Product not found.</p>
      </section>
    );
  }

  const wishlisted = user?.wishlist?.some((item) => (item._id || item) === product._id);
  const isActive = product.isActive !== false;
  const outOfStock = !isActive || product.countInStock <= 0;

  return (
    <section className="container-shell py-12">
      <div className="grid gap-8 md:grid-cols-[1fr_0.95fr]">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="glass-panel h-[480px] w-full object-cover p-2"
        />
        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
              {product.subcategory ? `${product.category} • ${product.subcategory}` : product.category}
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink">{product.name}</h1>
            <p className="mt-4 text-lg text-slate-600">{product.description}</p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-soft">
            <p className="text-3xl font-semibold text-ink">Rs. {product.price}</p>
            <p className="mt-2 text-sm text-slate-500">Made by {product.makerName}</p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-600">
              <span>{product.unitLabel || "per item"}</span>
              <span>{outOfStock ? "Currently unavailable" : `${product.countInStock} ready to order`}</span>
            </div>
          </div>

          <div className="glass-panel p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
              Story behind the product
            </p>
            <p className="mt-3 text-base leading-7 text-slate-600">{product.story}</p>
          </div>

          <div className="glass-panel p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
              Impact
            </p>
            <p className="mt-3 text-base leading-7 text-slate-600">{product.impactSummary}</p>
          </div>

          {product.tags?.length ? (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-mist px-3 py-2 text-xs text-slate-600">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <Button onClick={() => addToCart(product)} disabled={outOfStock}>
              {outOfStock ? "Out of Stock" : "Add to Cart"}
            </Button>
            {user ? (
              <Button variant="secondary" onClick={() => toggleWishlist(product._id)}>
                {wishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};
