// app/brands/page.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const brandsList = [
  {
    id: "nike",
    name: "Nike",
    logo: "/images/brands/nike-logo.png",
    description: "World's leading athletic footwear and apparel",
    productCount: 45,
    categories: ["Shoes", "Apparel", "Equipment"],
    discountRange: "20-50% OFF"
  },
  {
    id: "adidas",
    name: "Adidas",
    logo: "/images/brands/adidas-logo.png",
    description: "German sportswear manufacturer known for three stripes",
    productCount: 32,
    categories: ["Shoes", "Apparel", "Accessories"],
    discountRange: "15-40% OFF"
  },
  {
    id: "zara",
    name: "Zara",
    logo: "/images/brands/zara-logo.png",
    description: "Spanish fast fashion clothing and accessories",
    productCount: 28,
    categories: ["Clothing", "Accessories"],
    discountRange: "25-60% OFF"
  },
  {
    id: "h&m",
    name: "H&M",
    logo: "/images/brands/hm-logo.png",
    description: "Swedish multinational clothing-retail company",
    productCount: 36,
    categories: ["Clothing", "Accessories", "Home"],
    discountRange: "30-70% OFF"
  },
  {
    id: "puma",
    name: "Puma",
    logo: "/images/brands/puma-logo.png",
    description: "German multinational corporation that designs athletic footwear",
    productCount: 24,
    categories: ["Shoes", "Apparel", "Accessories"],
    discountRange: "20-45% OFF"
  },
  {
    id: "uniqlo",
    name: "Uniqlo",
    logo: "/images/brands/uniqlo-logo.png",
    description: "Japanese casual wear designer, manufacturer and retailer",
    productCount: 19,
    categories: ["Clothing", "Accessories"],
    discountRange: "15-35% OFF"
  }
];

export default function BrandsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBrands = brandsList.filter(brand =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    brand.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    brand.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🏢 Our <span className="text-yellow-500">Brands</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover amazing products from world-renowned brands at discounted prices. 
            Each brand brings unique quality and style to our collection.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </div>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBrands.map(brand => (
            <Link key={brand.id} href={`/brands/${brand.id}`}>
              <div className="bg-white rounded-2xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Brand Header */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-white rounded-xl p-3">
                      <div className="relative w-16 h-16">
                        <Image
                          src={brand.logo}
                          alt={brand.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="text-white">
                      <h3 className="text-xl font-bold">{brand.name}</h3>
                      <p className="text-yellow-400 font-semibold">{brand.discountRange}</p>
                    </div>
                  </div>
                </div>

                {/* Brand Info */}
                <div className="p-6">
                  <p className="text-gray-600 mb-4 line-clamp-2">{brand.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Products:</span>
                      <span className="font-semibold text-gray-900">{brand.productCount} items</span>
                    </div>
                    
                    <div>
                      <span className="text-gray-500 text-sm">Categories:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {brand.categories.map(category => (
                          <span key={category} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Explore Button */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <button className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-lg hover:bg-yellow-500 transition-colors group-hover:bg-yellow-500">
                      Explore Brand →
                    </button>
                  </div>
                </div>
              </div>
            </Link>
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