// components/common/FeaturedProducts/FeaturedProducts.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedProducts() {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [featuredIds, setFeaturedIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/data/store.json')
      .then(res => res.json())
      .then(data => {
        setAllProducts(data.products || []);
        setFeaturedIds(data.featuredProductIds || []);
        setIsLoading(false);
      })
      .catch(() => {
        setAllProducts([]);
        setFeaturedIds([]);
        setIsLoading(false);
      });
  }, []);

  const featuredProducts = useMemo(
    () => allProducts.filter(p => featuredIds.includes(p.id)).slice(0, 4),
    [allProducts, featuredIds]
  );

  // Show loading state
  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              ✨ Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Products</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium products with exclusive discounts
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array(4).fill().map((_, index) => (
              <div key={index} className="group relative bg-white rounded-3xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-64 md:h-80 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-3"></div>
                  <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
                  <div className="h-10 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Show empty state if no products
  if (!featuredProducts.length) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            ✨ Featured Products
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            No featured products available at the moment.
          </p>
        </div>
      </section>
    );
  }

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
              {product.badge && (
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
              )}

              {/* Product Image */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <Image
                  src={product.image || "/placeholder-image.jpg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Quick Actions */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-3">
                    <button 
                      suppressHydrationWarning
                      className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200"
                    >
                      <span className="text-xl">♡</span>
                    </button>
                    <button 
                      suppressHydrationWarning
                      className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200"
                    >
                      <span className="text-xl">👁</span>
                    </button>
                    <button 
                      suppressHydrationWarning
                      className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200"
                    >
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
                {product.rating && (
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex space-x-1">
                      {Array(5).fill().map((_, i) => (
                        <span key={i} className={`text-sm ${
                          i < Math.floor(product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'
                        }`}>★</span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews || 0})</span>
                  </div>
                )}

                {/* Price */}
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl font-extrabold text-purple-600">{product.price}</span>
                  {product.oldPrice && (
                    <span className="text-lg line-through text-gray-500">{product.oldPrice}</span>
                  )}
                  {product.discount && (
                    <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-bold rounded">
                      {product.discount}
                    </span>
                  )}
                </div>

                {/* Color Options - Only show if colors exist */}
                {product.colors && product.colors.length > 0 && (
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
                )}

                {/* Add to Cart Button */}
                <button 
                  suppressHydrationWarning
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
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
          <button 
            suppressHydrationWarning
            className="px-8 py-4 bg-white border-2 border-purple-600 text-purple-600 font-semibold rounded-xl hover:bg-purple-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View All Featured Products
          </button>
        </div>
      </div>
    </section>
  );
}