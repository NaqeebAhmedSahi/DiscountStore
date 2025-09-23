// app/categories/page.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const categoriesList = [
  {
    id: "shoes-sneakers",
    name: "Shoes & Sneakers",
    image: "/images/categories/shoes-grid.jpg",
    description: "Footwear for every occasion and style",
    productCount: 245,
    discountRange: "20-60% OFF",
    icon: "👟",
    featured: true
  },
  {
    id: "womens-fashion",
    name: "Women's Fashion",
    image: "/images/categories/women-grid.jpg",
    description: "Trendy clothing and accessories",
    productCount: 189,
    discountRange: "25-70% OFF",
    icon: "👚",
    featured: true
  },
  {
    id: "luxury-bags",
    name: "Luxury Bags",
    image: "/images/categories/bags-grid.jpg",
    description: "Premium bags and accessories",
    productCount: 76,
    discountRange: "15-50% OFF",
    icon: "👜",
    featured: false
  },
  {
    id: "sportswear",
    name: "Sportswear",
    image: "/images/categories/sportswear-grid.jpg",
    description: "Performance activewear and gear",
    productCount: 134,
    discountRange: "20-45% OFF",
    icon: "🏃‍♀️",
    featured: true
  },
  {
    id: "watches",
    name: "Watches",
    image: "/images/categories/watches-grid.jpg",
    description: "Timepieces for every style",
    productCount: 89,
    discountRange: "15-40% OFF",
    icon: "⌚",
    featured: false
  },
  {
    id: "mens-clothing",
    name: "Men's Clothing",
    image: "/images/categories/mens-grid.jpg",
    description: "Modern apparel for men",
    productCount: 156,
    discountRange: "20-55% OFF",
    icon: "👔",
    featured: true
  }
];

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categoriesList.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featuredCategories = categoriesList.filter(cat => cat.featured);
  const otherCategories = categoriesList.filter(cat => !cat.featured);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            📁 Shop by <span className="text-yellow-500">Category</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our extensive collection organized by categories. Find exactly what you're looking for with our curated selections.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </div>
        </div>

        {/* Featured Categories */}
        {searchQuery === "" && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              🌟 Featured Categories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.id}`}
                  className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition"
                >
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    width={400}
                    height={300}
                    className="object-cover w-full h-56 group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-3xl">{cat.icon}</span>
                    <h3 className="text-xl font-bold">{cat.name}</h3>
                    <p className="text-sm">{cat.discountRange}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* All Categories */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {searchQuery ? "🔎 Search Results" : "📂 All Categories"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.id}`}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col"
              >
                <div className="relative w-full h-40 mb-4">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {cat.icon} {cat.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{cat.description}</p>
                <div className="text-sm text-gray-500">
                  {cat.productCount} products · {cat.discountRange}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
