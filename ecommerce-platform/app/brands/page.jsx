// app/brands/page.jsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// Function to fetch store data
const fetchStoreData = async () => {
  try {
    const response = await fetch('/data/store.json');
    if (!response.ok) {
      throw new Error('Failed to fetch store data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching store data:', error);
    return null;
  }
};

export default function BrandsPage() {
  const [brandsList, setBrandsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minDiscount, setMinDiscount] = useState(0);
  const [sortOption, setSortOption] = useState("relevance");

  // Load brands data
  useEffect(() => {
    const loadBrandsData = async () => {
      setIsLoading(true);
      
      try {
        const storeData = await fetchStoreData();
        
        if (storeData && storeData.brands) {
          setBrandsList(storeData.brands);
        } else {
          setBrandsList([]);
        }
      } catch (error) {
        console.error('Error loading brands data:', error);
        setBrandsList([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadBrandsData();
  }, []);

  const allCategories = Array.from(new Set(brandsList.flatMap(b => b.categories)));

  const filteredBrands = brandsList
    .filter(brand =>
      brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brand.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brand.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .filter(brand => selectedCategories.length === 0 || selectedCategories.every(c => brand.categories.includes(c)))
    .filter(brand => {
      const min = parseInt(String(minDiscount || 0));
      const range = brand.discountRange.match(/(\d+)-(\d+)/);
      const lowest = range ? parseInt(range[1]) : 0;
      return lowest >= min || (range && parseInt(range[2]) >= min);
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "name-az":
          return a.name.localeCompare(b.name);
        case "name-za":
          return b.name.localeCompare(a.name);
        case "discount": {
          const aMax = parseInt((a.discountRange.match(/-(\d+)%/) || [])[1] || (a.discountRange.match(/(\d+)-(\d+)/) || [])[2] || 0);
          const bMax = parseInt((b.discountRange.match(/-(\d+)%/) || [])[1] || (b.discountRange.match(/(\d+)-(\d+)/) || [])[2] || 0);
          return bMax - aMax;
        }
        case "products":
          return b.productCount - a.productCount;
        case "relevance":
        default:
          return 0;
      }
    });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading brands...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
        <div className="absolute -top-24 -right-24 w-[30rem] h-[30rem] bg-yellow-400/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-[28rem] h-[28rem] bg-pink-500/20 rounded-full blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 text-yellow-300 mb-5">
              <span className="text-sm">Curated Collections</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
              Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-300">Premium Brands</span>
            </h1>
            <p className="text-gray-200 max-w-2xl mx-auto">
              Hand-picked labels with stunning deals. Filter and discover what fits your vibe.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 pb-12">
        {/* Filters - glassmorphism */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-pink-400/20 rounded-3xl blur-lg"></div>
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
              {/* Search */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search brands</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search brands..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-6 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</div>
                </div>
              </div>

              {/* Category chips */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
                <div className="flex flex-wrap gap-2">
                  {allCategories.map(cat => {
                    const active = selectedCategories.includes(cat);
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategories(prev => active ? prev.filter(c => c !== cat) : [...prev, cat])}
                        className={`px-3 py-1.5 rounded-full text-sm border transition ${active ? "bg-yellow-400 text-black border-yellow-400" : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"}`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Discount + Sort */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Min discount %</label>
                  <input
                    type="number"
                    min={0}
                    max={90}
                    value={minDiscount}
                    onChange={(e) => setMinDiscount(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="name-az">Name: A → Z</option>
                    <option value="name-za">Name: Z → A</option>
                    <option value="discount">Highest Discount</option>
                    <option value="products">Most Products</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Brands Zig-Zag */}
        <div className="space-y-10">
          {filteredBrands.map((brand, index) => (
            <div key={brand.id} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {/* Image side */}
              <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <Link href={`/brands/${brand.id}`}>
                  <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden shadow-md group">
                    {brand.cover ? (
                      <Image src={brand.cover} alt={`${brand.name} cover`} fill className="object-cover" />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-r from-gray-900 to-gray-700" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    {/* Discount badge */}
                    <div className="absolute top-4 left-4 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full shadow">
                      {brand.discountRange}
                    </div>
                    {/* Floating logo */}
                    <div className="absolute -bottom-6 left-6">
                      <div className="relative w-16 h-16 rounded-2xl bg-white shadow-lg p-2">
                        <Image src={brand.logo} alt={brand.name} fill className="object-contain" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Content side */}
              <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <div className="h-full rounded-3xl bg-white shadow-md border border-gray-100 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-2xl font-extrabold text-gray-900">{brand.name}</h3>
                      <span className="text-amber-600 font-semibold">{brand.productCount} products</span>
                    </div>
                    <p className="text-gray-600 mb-4">{brand.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {brand.categories.map((category) => (
                        <span key={category} className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Exclusive deals • Trusted brand</span>
                    <Link href={`/brands/${brand.id}`} className="px-5 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-400 text-black font-semibold hover:from-yellow-500 hover:to-amber-500">
                      Explore →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredBrands.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No brands found</h3>
            <p className="text-gray-600">Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </div>
  );
}