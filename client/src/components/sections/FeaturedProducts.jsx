import { Link } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import { ProductCard } from "../shop/ProductCard";
import { SectionHeading } from "../ui/SectionHeading";
import { motion } from "framer-motion";

export const FeaturedProducts = () => {
  const { featuredProducts } = useShop();

  return (
    <section className="container-shell py-16">
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          eyebrow="Featured Collection"
          title="Beautifully Made, Emotionally Meaningful"
          copy="Every product carries the skill, patience, and story of a rehabilitation journey. Buyers receive quality goods while directly supporting care and livelihoods."
        />
        <Link 
          to="/shop" 
          className="group inline-flex items-center gap-2 self-start rounded-full border-2 border-sage/30 bg-white px-6 py-3 font-semibold text-ink shadow-soft transition-all hover:border-sage hover:bg-sage hover:text-white hover:shadow-medium md:self-auto"
        >
          <span>View All Products</span>
          <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {featuredProducts.map((product, index) => (
          <motion.div
            key={product._id || product.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
      
      {featuredProducts.length === 0 && (
        <div className="rounded-4xl border-2 border-sage/20 bg-gradient-to-br from-warmCream to-mist p-12 text-center">
          <svg className="mx-auto mb-4 h-16 w-16 text-sage/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <p className="font-display text-xl font-bold text-ink">No featured products yet</p>
          <p className="mt-2 text-slate-600">Check back soon for our curated collection</p>
        </div>
      )}
    </section>
  );
};
