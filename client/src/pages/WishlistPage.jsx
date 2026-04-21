import { useAuth } from "../context/AuthContext";
import { ProductCard } from "../components/shop/ProductCard";

export const WishlistPage = () => {
  const { user } = useAuth();
  const wishlist = user?.wishlist || [];

  return (
    <section className="container-shell py-12">
      <h1 className="text-4xl font-semibold tracking-tight text-ink">Wishlist</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {wishlist.length ? (
          wishlist.map((product) => <ProductCard key={product._id || product.slug} product={product} />)
        ) : (
          <div className="glass-panel p-6 text-slate-600">Save products to revisit them later.</div>
        )}
      </div>
    </section>
  );
};
