import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "../components/shop/ProductCard";
import { SectionHeading } from "../components/ui/SectionHeading";
import { useShop } from "../context/ShopContext";

const categoryLabelMap = {
  Flours: "Nutritious Flours",
  "Wooden Artifacts": "Handcrafted Woodwork",
  "Traditional Snacks": "Traditional Snacks",
  "Wellness Products": "Wellness Products",
};

const toCategoryLabel = (value) => categoryLabelMap[value] || value;

export const ShopPage = () => {
  const { products, loading } = useShop();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [subcategory, setSubcategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(null);
  const [sortBy, setSortBy] = useState("recommended");
  const [showFilters, setShowFilters] = useState(false);

  const absoluteMaxPrice = useMemo(() => {
    const highestProductPrice = Math.max(...products.map((product) => Number(product.price) || 0), 0);
    return highestProductPrice > 0 ? Math.ceil(highestProductPrice / 50) * 50 : 2000;
  }, [products]);

  useEffect(() => {
    if (maxPrice === null) {
      setMaxPrice(absoluteMaxPrice);
      return;
    }

    if (maxPrice > absoluteMaxPrice) {
      setMaxPrice(absoluteMaxPrice);
    }
  }, [maxPrice, absoluteMaxPrice]);

  const categories = useMemo(
    () => ["All", ...new Set(products.map((product) => product.category).filter(Boolean))],
    [products]
  );

  const subcategories = useMemo(() => {
    const scopedProducts =
      category === "All" ? products : products.filter((product) => product.category === category);

    return ["All", ...new Set(scopedProducts.map((product) => product.subcategory).filter(Boolean))];
  }, [products, category]);

  useEffect(() => {
    setSubcategory("All");
  }, [category]);

  const activeMaxPrice = maxPrice ?? absoluteMaxPrice;

  const filtered = useMemo(
    () =>
      products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === "All" || product.category === category;
        const matchesSubcategory = subcategory === "All" || product.subcategory === subcategory;
        const matchesPrice = Number(product.price) <= activeMaxPrice;
        return matchesSearch && matchesCategory && matchesSubcategory && matchesPrice;
      }),
    [products, search, category, subcategory, activeMaxPrice]
  );

  const sortedProducts = useMemo(() => {
    const list = [...filtered];

    if (sortBy === "price-asc") {
      return list.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "price-desc") {
      return list.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "newest") {
      return list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }

    if (sortBy === "in-stock") {
      return list.sort((a, b) => (b.countInStock || 0) - (a.countInStock || 0));
    }

    return list.sort((a, b) => {
      const featuredWeight = Number(Boolean(b.featured)) - Number(Boolean(a.featured));
      if (featuredWeight !== 0) return featuredWeight;
      return (b.rating || 0) - (a.rating || 0);
    });
  }, [filtered, sortBy]);

  const activeFilterCount =
    Number(Boolean(search.trim())) +
    Number(category !== "All") +
    Number(subcategory !== "All") +
    Number(activeMaxPrice < absoluteMaxPrice);

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setSubcategory("All");
    setMaxPrice(absoluteMaxPrice);
  };

  return (
    <section className="container-shell py-12">
      <SectionHeading
        eyebrow="Marketplace"
        title="Mind Park Marketplace"
        copy="Support rehabilitation-linked makers through food, handcrafted decor, and wellness products. Browse with clean categories, quick filters, and clear stock visibility."
      />

      <div className="glass-panel mt-8 space-y-5 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-xl">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by product name"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm outline-none"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              / \
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setShowFilters((current) => !current)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M4 6h16" />
                <path d="M7 12h10" />
                <path d="M10 18h4" />
              </svg>
              Filters
              {activeFilterCount > 0 ? (
                <span className="rounded-full bg-slate-900 px-2 py-0.5 text-xs text-white">
                  {activeFilterCount}
                </span>
              ) : null}
            </button>

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 outline-none"
            >
              <option value="recommended">Sort: Recommended</option>
              <option value="newest">Sort: New arrivals</option>
              <option value="price-asc">Sort: Price low to high</option>
              <option value="price-desc">Sort: Price high to low</option>
              <option value="in-stock">Sort: Most in stock</option>
            </select>

            <p className="text-sm text-slate-500">{sortedProducts.length} products</p>
          </div>
        </div>

        {showFilters ? (
          <div className="rounded-3xl border border-slate-200 bg-white/75 p-5">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Category</label>
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none"
                >
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item === "All" ? "All Categories" : toCategoryLabel(item)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Subcategory</label>
                <select
                  value={subcategory}
                  onChange={(event) => setSubcategory(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none"
                >
                  {subcategories.map((item) => (
                    <option key={item} value={item}>
                      {item === "All" ? "All Subcategories" : item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Max price: Rs. {activeMaxPrice}
                </label>
                <input
                  type="range"
                  min="100"
                  max={absoluteMaxPrice}
                  step="50"
                  value={activeMaxPrice}
                  onChange={(event) => setMaxPrice(Number(event.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={resetFilters}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600"
              >
                Reset filters
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {loading ? (
        <p className="mt-10 text-slate-600">Loading products...</p>
      ) : sortedProducts.length === 0 ? (
        <div className="mt-8 glass-panel p-6 text-slate-600">
          No products match your current selection. Open Filters and reset to see all products.
        </div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {sortedProducts.map((product) => (
            <ProductCard key={product._id || product.slug} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};
