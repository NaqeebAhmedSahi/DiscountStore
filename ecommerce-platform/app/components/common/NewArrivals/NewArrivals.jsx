// components/common/NewArrivals/NewArrivals.jsx
"use client";

import Image from "next/image";

const arrivals = [
  {
    id: 1,
    name: "Nike Air Max",
    price: "$120",
    oldPrice: "$200",
    discount: "40% OFF",
    image: "/images/arrivals/nike-airmax.jpg",
  },
  {
    id: 2,
    name: "Zara Summer Dress",
    price: "$60",
    oldPrice: "$100",
    discount: "40% OFF",
    image: "/images/arrivals/zara-dress.jpg",
  },
  {
    id: 3,
    name: "Adidas Hoodie",
    price: "$75",
    oldPrice: "$125",
    discount: "50% OFF",
    image: "/images/arrivals/adidas-hoodie.jpg",
  },
  {
    id: 4,
    name: "Gucci Handbag",
    price: "$950",
    oldPrice: "$1300",
    discount: "30% OFF",
    image: "/images/arrivals/gucci-bag.jpg",
  },
];

export default function NewArrivals() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-12">
          ✨ New <span className="text-indigo-600">Arrivals</span>
        </h2>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {arrivals.map((item) => (
            <div
              key={item.id}
              className="group bg-gray-50 rounded-2xl shadow-md overflow-hidden 
                         transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              {/* Product Image */}
              <div className="relative w-full h-64">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Discount Badge */}
                <span className="absolute top-3 left-3 bg-yellow-400 text-black text-sm font-bold px-3 py-1 rounded-full shadow-md">
                  {item.discount}
                </span>
              </div>

              {/* Product Info */}
              <div className="p-5 text-center">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                  {item.name}
                </h3>
                <div className="mt-2 flex items-center justify-center space-x-3">
                  <span className="text-xl font-extrabold text-indigo-600">{item.price}</span>
                  <span className="text-sm line-through text-gray-500">{item.oldPrice}</span>
                </div>

                {/* Button */}
                <button className="mt-4 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 
                                   text-white rounded-full font-medium shadow-md 
                                   transition-all duration-300 cursor-pointer">
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
