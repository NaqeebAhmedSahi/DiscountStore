// components/common/Categories/FeaturedCategories.jsx
"use client";

import Image from "next/image";

const categories = [
  {
    id: 1,
    name: "Shoes & Sneakers",
    image: "/images/categories/shoes.jpg",
  },
  {
    id: 2,
    name: "Women’s Fashion",
    image: "/images/categories/women-fashion.jpg",
  },
  {
    id: 3,
    name: "Luxury Bags",
    image: "/images/categories/bags.jpg",
  },
  {
    id: 4,
    name: "Sportswear",
    image: "/images/categories/sportswear.jpg",
  },
  {
    id: 5,
    name: "Watches",
    image: "/images/categories/watches.jpg",
  },
  {
    id: 6,
    name: "Men’s Clothing",
    image: "/images/categories/mens-fashion.jpg",
  },
];

export default function FeaturedCategories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-12">
          🌟 Featured <span className="text-yellow-500">Categories</span>
        </h2>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="group relative bg-white rounded-2xl shadow-md overflow-hidden 
                         transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              {/* Category Image */}
              <div className="w-full h-40 md:h-48 relative">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 
                              transition-opacity duration-300 flex items-center justify-center">
                <span className="px-4 py-2 bg-yellow-400 text-black rounded-full font-semibold shadow-md">
                  Explore
                </span>
              </div>

              {/* Category Title */}
              <div className="absolute bottom-3 left-0 right-0 text-center">
                <h3 className="text-lg font-bold text-white drop-shadow-lg">
                  {cat.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
