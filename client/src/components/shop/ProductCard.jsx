import { Link } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import { Button } from "../ui/Button";

const categoryLabelMap = {
  Flours: "Nutritious Flours",
  "Wooden Artifacts": "Handcrafted Woodwork",
  "Traditional Snacks": "Traditional Snacks",
  "Wellness Products": "Wellness Products",
};

const toCategoryLabel = (value) => categoryLabelMap[value] || value;

export const ProductCard = ({ product }) => {
  const { addToCart, getCartQuantity, updateQuantity, showCartToast } = useShop();
  const isActive = product.isActive !== false;
  const outOfStock = !isActive || product.countInStock <= 0;
  const productKey = product._id || product.slug;
  const cartQuantity = getCartQuantity(product);

  const increaseQuantity = () => {
    if (outOfStock) return;
    addToCart(product, 1);
  };

  const decreaseQuantity = () => {
    if (!productKey || cartQuantity <= 0) return;
    updateQuantity(productKey, cartQuantity - 1);
    showCartToast(cartQuantity - 1 > 0 ? `${product.name} quantity updated in cart` : `${product.name} removed from cart`);
  };

  return (
    <article className="group relative overflow-hidden rounded-4xl border-2 border-sage/10 bg-white shadow-card transition-all duration-500 hover:border-sage/30 hover:shadow-medium">
      {/* Featured badge */}
      {product.featured && (
        <div className="absolute left-4 top-4 z-10 rounded-full bg-gradient-to-r from-coral to-terracotta px-3 py-1.5 text-xs font-bold text-white shadow-soft">
          ⭐ Featured
        </div>
      )}
      
      {/* Stock badge */}
      {outOfStock && (
        <div className="absolute right-4 top-4 z-10 rounded-full bg-slate-900/90 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
          Out of Stock
        </div>
      )}
      
      <Link to={`/shop/${product.slug}`} className="block">
        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-warmCream to-mist">
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
      </Link>
      
      <div className="space-y-5 p-6">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-px w-6 bg-gradient-to-r from-sage to-transparent"></span>
            <p className="text-xs font-bold uppercase tracking-wider text-sage">
              {product.subcategory
                ? `${toCategoryLabel(product.category)} • ${product.subcategory}`
                : toCategoryLabel(product.category)}
            </p>
          </div>
          
          <Link to={`/shop/${product.slug}`} className="group/title block">
            <h3 className="font-display text-2xl font-bold text-ink transition-colors group-hover/title:text-sage">
              {product.name}
            </h3>
          </Link>
          
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-600">{product.story}</p>
        </div>
        
        {/* Maker info */}
        <div className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-warmCream to-mist p-3">
          <svg className="h-5 w-5 flex-shrink-0 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-ink">{product.makerName}</p>
            <p className="text-xs text-slate-500">{product.unitLabel || "per item"}</p>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-white px-2 py-1">
            <svg className="h-3 w-3 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs font-semibold text-slate-700">{product.rating || 4.8}</span>
          </div>
        </div>
        
        {/* Stock info */}
        <div className="flex items-center justify-between text-xs">
          <span className={`font-medium ${outOfStock ? "text-rose-600" : "text-sage"}`}>
            {outOfStock ? "Currently unavailable" : `${product.countInStock} in stock`}
          </span>
          {product.reviewsCount > 0 && (
            <span className="text-slate-500">{product.reviewsCount} reviews</span>
          )}
        </div>
        
        {/* Impact section */}
        <div className="rounded-3xl border-2 border-meadow/50 bg-gradient-to-br from-meadow/30 to-mist/50 p-4">
          <div className="mb-2 flex items-center gap-2">
            <svg className="h-4 w-4 text-sage" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <p className="text-xs font-bold uppercase tracking-wider text-sage">Your Impact</p>
          </div>
          <p className="text-sm leading-relaxed text-slate-700">{product.impactSummary}</p>
        </div>
        
        {/* Cart controls */}
        <div className="rounded-3xl border-2 border-slate-200 bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">In Your Cart</p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={decreaseQuantity}
                disabled={cartQuantity === 0}
                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-200 text-lg font-bold text-slate-700 transition-all hover:border-sage hover:bg-sage hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                −
              </button>
              <span className="min-w-8 text-center font-display text-lg font-bold text-ink">{cartQuantity}</span>
              <button
                type="button"
                onClick={increaseQuantity}
                disabled={outOfStock || cartQuantity >= product.countInStock}
                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-200 text-lg font-bold text-slate-700 transition-all hover:border-sage hover:bg-sage hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                +
              </button>
            </div>
          </div>
          <p className="text-sm font-medium text-slate-600">
            {cartQuantity > 0 ? `${cartQuantity} item${cartQuantity > 1 ? 's' : ''} added` : "Not added yet"}
          </p>
        </div>
        
        {/* Price and actions */}
        <div className="flex items-center justify-between gap-4 pt-2">
          <div>
            <p className="text-xs font-medium text-slate-500">Price</p>
            <p className="font-display text-3xl font-bold text-ink">₹{product.price}</p>
          </div>
          <div className="flex flex-col gap-2">
            <Button 
              variant="coral" 
              onClick={() => addToCart(product)} 
              disabled={outOfStock || cartQuantity >= product.countInStock}
              className="text-xs"
            >
              {outOfStock ? "Unavailable" : cartQuantity > 0 ? "Add More" : "Add to Cart"}
            </Button>
            <Link
              to="/cart"
              className="inline-flex items-center justify-center rounded-full border-2 border-sage/30 bg-white px-4 py-2 text-xs font-semibold text-ink transition-all hover:border-sage hover:bg-sage hover:text-white"
            >
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};
