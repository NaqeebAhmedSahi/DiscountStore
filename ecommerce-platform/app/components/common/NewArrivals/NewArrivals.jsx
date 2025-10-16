// components/common/NewArrivals/NewArrivals.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useAppDispatch } from "../../../../lib/hooks/redux";
import { addToCart } from "../../../../lib/store/cartSlice";
import { showSuccessToast } from "../../../../lib/utils/toast";

const arrivals = [
  {
    id: 1,
    name: "Nike Air Max",
    price: 120,
    originalPrice: 200,
    discount: 40,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop&crop=center",
    rating: 4.8,
    reviews: 124,
    badge: "NEW",
    colors: ["#000000", "#FF6B6B", "#4ECDC4"],
    sizes: ["S", "M", "L", "XL"],
    brand: "Nike",
    category: "Shoes & Sneakers",
    inStock: true
  },
  {
    id: 2,
    name: "Zara Summer Dress",
    price: 60,
    originalPrice: 100,
    discount: 40,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=800&fit=crop&crop=center",
    rating: 4.6,
    reviews: 89,
    badge: "HOT",
    colors: ["#FF6B6B", "#4ECDC4", "#45B7D1"],
    sizes: ["XS", "S", "M", "L"],
    brand: "Zara",
    category: "Women's Fashion",
    inStock: true
  },
  {
    id: 3,
    name: "Adidas Hoodie",
    price: "$75",
    oldPrice: "$125",
    discount: "50% OFF",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop&crop=center",
    rating: 4.7,
    reviews: 203,
    badge: "BESTSELLER",
    colors: ["#000000", "#FFFFFF", "#FF6B6B"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 4,
    name: "Gucci Handbag",
    price: "$950",
    oldPrice: "$1300",
    discount: "30% OFF",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop&crop=center",
    rating: 4.9,
    reviews: 67,
    badge: "LUXURY",
    colors: ["#000000", "#8B4513", "#C0C0C0"],
    sizes: ["One Size"]
  },
];

export default function NewArrivals() {
  const dispatch = useAppDispatch();

  const handleAddToCart = (item) => {
    // Convert the item to match our cart structure
    const product = {
      id: item.id,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
      brand: item.brand,
      category: item.category,
      inStock: item.inStock,
      discount: item.discount,
      rating: item.rating,
      reviews: item.reviews
    };

    // Use default size and color for quick add
    const selectedSize = item.sizes && item.sizes.length > 0 ? item.sizes[0] : 'One Size';
    const selectedColor = item.colors && item.colors.length > 0 ? 'Default' : 'Default';

    dispatch(addToCart({
      product,
      selectedSize,
      selectedColor,
      quantity: 1
    }));

    showSuccessToast("", item.name);
  };
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-pink-200/20 to-yellow-200/20 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
            ✨ New <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Arrivals</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the latest trends and newest additions to our collection
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {arrivals.map((item, index) => (
            <div
              key={item.id}
              className={`group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden ${
                index === 0 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Badge */}
              <div className="absolute top-4 left-4 z-20">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  item.badge === 'NEW' ? 'bg-green-500 text-white' :
                  item.badge === 'HOT' ? 'bg-red-500 text-white' :
                  item.badge === 'BESTSELLER' ? 'bg-blue-500 text-white' :
                  'bg-yellow-500 text-black'
                }`}>
                  {item.badge}
                </span>
              </div>

              {/* Product Image */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
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
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                  {item.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex space-x-1">
                    {Array(5).fill().map((_, i) => (
                      <span key={i} className={`text-sm ${
                        i < Math.floor(item.rating) ? 'text-yellow-400' : 'text-gray-300'
                      }`}>★</span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">({item.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl font-extrabold text-indigo-600">{item.price}</span>
                  <span className="text-lg line-through text-gray-500">{item.oldPrice}</span>
                  <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-bold rounded">
                    {item.discount}
                  </span>
                </div>

                {/* Color Options */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-sm text-gray-600">Colors:</span>
                  <div className="flex space-x-2">
                    {item.colors.map((color, i) => (
                      <div
                        key={i}
                        className="w-5 h-5 rounded-full border-2 border-gray-300 hover:border-gray-400 cursor-pointer transition-colors duration-200"
                        style={{ backgroundColor: color }}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-sm text-gray-600">Sizes:</span>
                  <div className="flex space-x-1">
                    {item.sizes.map((size, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs bg-gray-100 hover:bg-indigo-100 text-gray-700 rounded cursor-pointer transition-colors duration-200"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button 
                  onClick={() => handleAddToCart(item)}
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Add to Cart
                </button>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-3xl border-2 border-indigo-300 opacity-0 group-hover:opacity-50 pointer-events-none transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/products" className="px-8 py-4 bg-white border-2 border-indigo-600 text-indigo-600 font-semibold rounded-xl hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer">
            View All New Arrivals
          </Link>
        </div>
      </div>
    </section>
  );
}
