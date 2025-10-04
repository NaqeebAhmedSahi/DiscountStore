// components/common/FeaturedProducts/FeaturedProducts.jsx
"use client";

import { useState } from "react";
import Image from "next/image";

const featuredProducts = [
  {
    id: 1,
    name: "Nike Air Max 270",
    price: "$120",
    oldPrice: "$200",
    discount: "40% OFF",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop&crop=center",
    rating: 4.8,
    reviews: 124,
    badge: "BESTSELLER",
    colors: ["#000000", "#FF6B6B", "#4ECDC4", "#45B7D1"]
  },
  {
    id: 2,
    name: "Zara Summer Collection",
    price: "$89",
    oldPrice: "$150",
    discount: "41% OFF",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=800&fit=crop&crop=center",
    rating: 4.6,
    reviews: 89,
    badge: "NEW",
    colors: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"]
  },
  {
    id: 3,
    name: "Gucci Luxury Handbag",
    price: "$1,200",
    oldPrice: "$1,800",
    discount: "33% OFF",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop&crop=center",
    rating: 4.9,
    reviews: 67,
    badge: "LUXURY",
    colors: ["#000000", "#8B4513", "#C0C0C0"]
  },
  {
    id: 4,
    name: "Adidas Ultraboost 22",
    price: "$95",
    oldPrice: "$180",
    discount: "47% OFF",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop&crop=center",
    rating: 4.7,
    reviews: 203,
    badge: "HOT",
    colors: ["#000000", "#FFFFFF", "#FF6B6B", "#4ECDC4"]
  }
];

export default function FeaturedProducts() {
  const [hoveredProduct, setHoveredProduct] = useState(null);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            ✨ Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Products</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium products with exclusive discounts
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className={`group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden ${
                index === 0 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Badge */}
              <div className="absolute top-4 left-4 z-20">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  product.badge === 'BESTSELLER' ? 'bg-green-500 text-white' :
                  product.badge === 'NEW' ? 'bg-blue-500 text-white' :
                  product.badge === 'LUXURY' ? 'bg-yellow-500 text-black' :
                  'bg-red-500 text-white'
                }`}>
                  {product.badge}
                </span>
              </div>

              {/* Product Image */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Quick Actions */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-3">
                    <button className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200">
                      <span className="text-xl">♡</span>
                    </button>
                    <button className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200">
                      <span className="text-xl">👁</span>
                    </button>
                    <button className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200">
                      <span className="text-xl">🛒</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                  {product.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex space-x-1">
                    {Array(5).fill().map((_, i) => (
                      <span key={i} className={`text-sm ${
                        i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                      }`}>★</span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl font-extrabold text-purple-600">{product.price}</span>
                  <span className="text-lg line-through text-gray-500">{product.oldPrice}</span>
                  <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-bold rounded">
                    {product.discount}
                  </span>
                </div>

                {/* Color Options */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-sm text-gray-600">Colors:</span>
                  <div className="flex space-x-2">
                    {product.colors.map((color, i) => (
                      <div
                        key={i}
                        className="w-5 h-5 rounded-full border-2 border-gray-300 hover:border-gray-400 cursor-pointer transition-colors duration-200"
                        style={{ backgroundColor: color }}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Add to Cart
                </button>
              </div>

              {/* Hover Glow Effect */}
              {hoveredProduct === product.id && (
                <div className="absolute inset-0 rounded-3xl border-2 border-purple-300 opacity-50 pointer-events-none"></div>
              )}
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-white border-2 border-purple-600 text-purple-600 font-semibold rounded-xl hover:bg-purple-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl">
            View All Featured Products
          </button>
        </div>
      </div>
    </section>
  );
}
