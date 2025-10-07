// app/categories/page.jsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const gradients = {
  "shoes-sneakers": "from-blue-500 to-purple-600",
  "womens-fashion": "from-pink-500 to-rose-600",
  "luxury-bags": "from-amber-500 to-orange-600",
  "sportswear": "from-green-500 to-emerald-600",
  "watches": "from-slate-500 to-gray-600",
  "mens-clothing": "from-indigo-500 to-blue-600",
  "electronics": "from-cyan-500 to-blue-600",
  "home-appliances": "from-orange-500 to-red-600",
  "beauty": "from-pink-500 to-purple-600",
  "kids": "from-yellow-500 to-orange-500"
};

const pattern = `bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]`;

export default function CategoriesPage() {
  const [categoriesList, setCategoriesList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [minProducts, setMinProducts] = useState(0);
  const [maxProducts, setMaxProducts] = useState(1000);
  const [sortOption, setSortOption] = useState("relevance");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    fetch('/data/store.json')
      .then(res => res.json())
      .then(data => {
        const withVisuals = (data.categories || []).map(cat => ({
          ...cat,
          gradient: gradients[cat.id] || 'from-gray-500 to-gray-700',
          bgPattern: pattern
        }));
        setCategoriesList(withVisuals);
      })
      .catch(() => setCategoriesList([]));
  }, []);

  const filteredCategories = categoriesList
    .filter(category =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(category => (showFeaturedOnly ? category.featured : true))
    .filter(category => category.productCount >= minProducts && category.productCount <= maxProducts)
    .sort((a, b) => {
      switch (sortOption) {
        case "products-high":
          return b.productCount - a.productCount;
        case "products-low":
          return a.productCount - b.productCount;
        case "name-az":
          return a.name.localeCompare(b.name);
        case "name-za":
          return b.name.localeCompare(a.name);
        case "relevance":
        default:
          return 0;
      }
    });

  const featuredCategories = categoriesList.filter(cat => cat.featured);
  const otherCategories = categoriesList.filter(cat => !cat.featured);

  // Prevent hydration mismatch by not rendering form elements until mounted
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-yellow-200/20 to-orange-200/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 animate-pulse-glow">
            <span className="text-3xl">📁</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
            Shop by <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500">Category</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our curated collections organized by categories. Find exactly what you're looking for with our premium selections at unbeatable prices.
          </p>
        </div>

        {/* Search + Filters */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search categories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-8 py-4 rounded-2xl bg-transparent focus:outline-none text-lg placeholder-gray-500 border border-gray-200"
                  />
                  <div className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-purple-500 transition-colors duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowFeaturedOnly(v => !v)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${showFeaturedOnly ? "bg-purple-600 text-white border-purple-600" : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"}`}
                  >
                    {showFeaturedOnly ? "Featured: On" : "Featured: Off"}
                  </button>

                  <div className="hidden md:flex items-center gap-3">
                    <label className="text-sm text-gray-600">Min Products</label>
                    <input
                      type="number"
                      min={0}
                      value={minProducts}
                      onChange={(e) => setMinProducts(parseInt(e.target.value || "0"))}
                      className="w-24 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none text-sm"
                    />
                    <label className="text-sm text-gray-600">Max Products</label>
                    <input
                      type="number"
                      min={0}
                      value={maxProducts}
                      onChange={(e) => setMaxProducts(parseInt(e.target.value || "0"))}
                      className="w-24 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none text-sm"
                    />
                  </div>

                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm"
                  >
                    <option value="relevance">Sort: Relevance</option>
                    <option value="products-high">Products: High to Low</option>
                    <option value="products-low">Products: Low to High</option>
                    <option value="name-az">Name: A → Z</option>
                    <option value="name-za">Name: Z → A</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Categories */}
        {searchQuery === "" && (
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                🌟 Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">Categories</span>
              </h2>
              <p className="text-gray-600 text-lg">Handpicked collections for the ultimate shopping experience</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCategories.map((cat, index) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.id}`}
                  className="group relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4"
                  onMouseEnter={() => setHoveredCategory(cat.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  {/* Background Image */}
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={cat.banner}
                      alt={cat.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${cat.gradient} opacity-80 group-hover:opacity-90 transition-opacity duration-300`}></div>
                    
                    {/* Pattern Overlay */}
                    <div className={`absolute inset-0 ${cat.bgPattern} opacity-20`}></div>
                    
                    {/* Floating Elements */}
                    <div className="absolute top-4 right-4 w-16 h-16 bg-white/20 rounded-full animate-float"></div>
                    <div className="absolute bottom-20 left-4 w-12 h-12 bg-white/20 rounded-full animate-float delay-300"></div>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                    <div className="transform group-hover:translate-y-0 translate-y-4 transition-transform duration-300">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-4xl animate-bounce">{cat.icon}</span>
                        <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                          <span className="text-sm font-bold">{cat.discountRange}</span>
                        </div>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-yellow-300 transition-colors duration-300">
                        {cat.name}
                      </h3>
                      <p className="text-white/90 mb-4 text-sm md:text-base">{cat.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{cat.productCount} products</span>
                        <div className="flex items-center gap-2 text-yellow-300">
                          <span className="text-sm font-medium">Explore</span>
                          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Shine Effect */}
                  <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shine transition-opacity duration-300"></div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* All Categories */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {searchQuery ? "🔎 Search Results" : "📂 All Categories"}
            </h2>
            <p className="text-gray-600 text-lg">
              {searchQuery ? `Found ${filteredCategories.length} categories` : "Browse our complete collection"}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCategories.map((cat, index) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.id}`}
                className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-white/20"
                onMouseEnter={() => setHoveredCategory(cat.id)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                {/* Background Pattern */}
                <div className={`absolute inset-0 ${cat.bgPattern} opacity-5`}></div>
                
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={cat.banner}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${cat.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                  
                  {/* Icon */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                    <span className="text-2xl">{cat.icon}</span>
                  </div>
                  
                  {/* Discount Badge */}
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    {cat.discountRange}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                    {cat.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{cat.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      <span>{cat.productCount} products</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-purple-600 group-hover:text-purple-700 transition-colors duration-300">
                      <span className="text-sm font-medium">Explore</span>
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 opacity-0 group-hover:opacity-50 pointer-events-none transition-opacity duration-300`}></div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {filteredCategories.length === 0 && (
            <div className="text-center py-16">
              <div className="text-8xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No categories found</h3>
              <p className="text-gray-600 mb-8">Try adjusting your search terms</p>
              <button
                onClick={() => setSearchQuery("")}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Clear Search
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
