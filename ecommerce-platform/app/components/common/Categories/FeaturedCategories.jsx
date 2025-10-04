// components/common/Categories/FeaturedCategories.jsx
"use client";

import Image from "next/image";

const categories = [
  {
    id: 1,
    name: "Shoes & Sneakers",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=600&fit=crop&crop=center",
  },
  {
    id: 2,
    name: "Women's Fashion",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop&crop=center",
  },
  {
    id: 3,
    name: "Luxury Bags",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop&crop=center",
  },
  {
    id: 4,
    name: "Sportswear",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=center",
  },
  {
    id: 5,
    name: "Watches",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop&crop=center",
  },
  {
    id: 6,
    name: "Men's Clothing",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center",
  },
];

export default function FeaturedCategories({ viewMode = 'grid' }) {
  const renderGrid = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {categories.map((cat) => (
        <div
          key={cat.id}
          className="group relative bg-white rounded-2xl shadow-lg overflow-hidden 
                     transform hover:-translate-y-3 transition-all duration-500 cursor-pointer hover:shadow-2xl"
        >
          {/* Category Image */}
          <div className="w-full h-40 md:h-48 relative">
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 
                          transition-opacity duration-300"></div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 
                          transition-opacity duration-300 flex items-center justify-center">
            <span className="px-4 py-2 bg-yellow-400 text-black rounded-full font-semibold shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300">
              Explore
            </span>
          </div>

          {/* Category Title */}
          <div className="absolute bottom-3 left-0 right-0 text-center">
            <h3 className="text-lg font-bold text-white drop-shadow-lg group-hover:text-yellow-300 transition-colors duration-300">
              {cat.name}
            </h3>
          </div>

          {/* Shine Effect */}
          <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shine transition-opacity duration-300"></div>
        </div>
      ))}
    </div>
  );

  const renderList = () => (
    <div className="space-y-4">
      {categories.map((cat) => (
        <div
          key={cat.id}
          className="group flex items-center bg-white rounded-2xl shadow-lg overflow-hidden 
                     transform hover:-translate-y-1 transition-all duration-300 cursor-pointer hover:shadow-xl"
        >
          {/* Category Image */}
          <div className="w-32 h-24 relative flex-shrink-0">
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
              {cat.name}
            </h3>
            <p className="text-gray-600 mt-1">Explore our collection</p>
          </div>

          {/* Arrow */}
          <div className="p-6">
            <span className="text-2xl text-gray-400 group-hover:text-purple-600 transition-colors duration-300">→</span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderMasonry = () => (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
      {categories.map((cat, index) => (
        <div
          key={cat.id}
          className={`group relative bg-white rounded-2xl shadow-lg overflow-hidden 
                     transform hover:-translate-y-2 transition-all duration-500 cursor-pointer hover:shadow-2xl break-inside-avoid
                     ${index % 3 === 0 ? 'h-64' : index % 3 === 1 ? 'h-48' : 'h-56'}`}
        >
          {/* Category Image */}
          <div className="w-full h-full relative">
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 
                          transition-opacity duration-300"></div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 
                          transition-opacity duration-300 flex items-center justify-center">
            <span className="px-4 py-2 bg-yellow-400 text-black rounded-full font-semibold shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300">
              Explore
            </span>
          </div>

          {/* Category Title */}
          <div className="absolute bottom-3 left-0 right-0 text-center">
            <h3 className="text-lg font-bold text-white drop-shadow-lg group-hover:text-yellow-300 transition-colors duration-300">
              {cat.name}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      {viewMode === 'grid' && renderGrid()}
      {viewMode === 'list' && renderList()}
      {viewMode === 'masonry' && renderMasonry()}
    </div>
  );
}
