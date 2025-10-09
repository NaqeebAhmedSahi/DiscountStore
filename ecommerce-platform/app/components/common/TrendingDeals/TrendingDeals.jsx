// components/common/TrendingDeals/TrendingDeals.jsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAppDispatch } from "../../../../lib/hooks/redux";
import { addToCart } from "../../../../lib/store/cartSlice";
import { showSuccessToast } from "../../../../lib/utils/toast";

export default function TrendingDeals() {
  const dispatch = useAppDispatch();
  const [deals, setDeals] = useState([]);
  const [soldPercentages, setSoldPercentages] = useState({});

  const handleAddToCart = (deal) => {
    // Convert the deal to match our cart structure
    const product = {
      id: deal.id,
      name: deal.name,
      price: deal.price,
      originalPrice: deal.oldPrice,
      image: deal.image,
      brand: deal.brand || 'Unknown',
      category: deal.category || 'Deals',
      inStock: true,
      discount: deal.discount,
      rating: deal.rating,
      reviews: deal.reviews
    };

    // Use default size and color for quick add
    const selectedSize = 'One Size';
    const selectedColor = deal.colors && deal.colors.length > 0 ? 'Default' : 'Default';

    dispatch(addToCart({
      product,
      selectedSize,
      selectedColor,
      quantity: 1
    }));

    showSuccessToast("", deal.name);
  };

  useEffect(() => {
    fetch('/data/store.json')
      .then(res => res.json())
      .then(data => {
        setDeals(data.trendingDeals || []);
        
        // Generate consistent random percentages for each deal
        const percentages = {};
        (data.trendingDeals || []).forEach(deal => {
          percentages[deal.id] = Math.floor(Math.random() * 50) + 20;
        });
        setSoldPercentages(percentages);
      })
      .catch(() => {
        // Fallback data
        const fallbackDeals = [
          {
            id: 1,
            name: "Nike Running Shoes",
            price: "$99",
            oldPrice: "$180",
            discount: "45% OFF",
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop&crop=center",
            hot: true,
            rating: 4.9,
            reviews: 156,
            badge: "TRENDING",
            colors: ["#000000", "#FF6B6B", "#4ECDC4"],
            timeLeft: "2h 15m"
          },
          {
            id: 2,
            name: "Zara Jacket",
            price: "$70",
            oldPrice: "$120",
            discount: "40% OFF",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=800&fit=crop&crop=center",
            hot: false,
            rating: 4.7,
            reviews: 89,
            badge: "LIMITED",
            colors: ["#FF6B6B", "#4ECDC4", "#45B7D1"],
            timeLeft: "5h 30m"
          },
          {
            id: 3,
            name: "Gucci Sunglasses",
            price: "$220",
            oldPrice: "$350",
            discount: "35% OFF",
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop&crop=center",
            hot: true,
            rating: 4.8,
            reviews: 203,
            badge: "EXCLUSIVE",
            colors: ["#000000", "#8B4513", "#C0C0C0"],
            timeLeft: "1h 45m"
          },
          {
            id: 4,
            name: "Adidas Tracksuit",
            price: "$85",
            oldPrice: "$150",
            discount: "43% OFF",
            image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop&crop=center",
            hot: false,
            rating: 4.6,
            reviews: 127,
            badge: "POPULAR",
            colors: ["#000000", "#FFFFFF", "#FF6B6B"],
            timeLeft: "3h 20m"
          },
        ];
        
        setDeals(fallbackDeals);
        
        // Generate consistent random percentages for fallback deals
        const percentages = {};
        fallbackDeals.forEach(deal => {
          percentages[deal.id] = Math.floor(Math.random() * 50) + 20;
        });
        setSoldPercentages(percentages);
      });
  }, []);

  if (!deals.length) {
    return null;
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50"></div>
      <div className="absolute top-0 left-0 w-full h-full opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ef4444' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      {/* Floating Elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-red-400/20 rounded-full animate-float"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-orange-400/20 rounded-full animate-float delay-300"></div>
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-yellow-400/20 rounded-full animate-float delay-500"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
            🔥 Trending <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">Deals</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Limited time offers that are selling fast! Don't miss out on these amazing deals.
          </p>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {deals.map((deal, index) => (
            <Link href={`/products`} key={deal.id}>
              <div
                className={`group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden ${
                  index === 0 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {/* Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    deal.badge === 'TRENDING' ? 'bg-red-500 text-white animate-pulse' :
                    deal.badge === 'LIMITED' ? 'bg-orange-500 text-white' :
                    deal.badge === 'EXCLUSIVE' ? 'bg-purple-500 text-white' :
                    'bg-yellow-500 text-black'
                  }`}>
                    {deal.badge}
                  </span>
                </div>

                {/* Hot Deal Badge */}
                {deal.hot && (
                  <div className="absolute top-4 right-4 z-20">
                    <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs font-bold rounded-full animate-pulse shadow-lg">
                      HOT 🔥
                    </span>
                  </div>
                )}

                {/* Product Image */}
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <Image
                    src={deal.image}
                    alt={deal.name}
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

                  {/* Time Left */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/70 text-white px-3 py-2 rounded-full text-sm font-semibold text-center">
                      ⏰ {deal.timeLeft} left
                    </div>
                  </div>
                </div>

                {/* Deal Info */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                    {deal.name}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex space-x-1">
                      {Array(5).fill().map((_, i) => (
                        <span key={i} className={`text-sm ${
                          i < Math.floor(deal.rating) ? 'text-yellow-400' : 'text-gray-300'
                        }`}>★</span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">({deal.reviews})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-2xl font-extrabold text-red-600">{deal.price}</span>
                    <span className="text-lg line-through text-gray-500">{deal.oldPrice}</span>
                    <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-bold rounded">
                      {deal.discount}
                    </span>
                  </div>

                  {/* Color Options */}
                  {deal.colors && (
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-sm text-gray-600">Colors:</span>
                      <div className="flex space-x-2">
                        {deal.colors.map((color, i) => (
                          <div
                            key={i}
                            className="w-5 h-5 rounded-full border-2 border-gray-300 hover:border-red-400 cursor-pointer transition-colors duration-200"
                            style={{ backgroundColor: color }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Progress Bar - Only show when percentage is available */}
                  {soldPercentages[deal.id] && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Sold: {soldPercentages[deal.id]}%</span>
                        <span>Hurry!</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${soldPercentages[deal.id]}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Add to Cart Button */}
                  <button 
                    onClick={() => handleAddToCart(deal)}
                    className="w-full py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Grab This Deal
                  </button>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-3xl border-2 border-red-300 opacity-0 group-hover:opacity-50 pointer-events-none transition-opacity duration-300"></div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/products" className="px-8 py-4 bg-white border-2 border-red-600 text-red-600 font-semibold rounded-xl hover:bg-red-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl">
            View All Trending Deals
          </Link>
        </div>
      </div>
    </section>
  );
}