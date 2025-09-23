// components/common/TrendingDeals/TrendingDeals.jsx
"use client";

import Image from "next/image";

const deals = [
  {
    id: 1,
    name: "Nike Running Shoes",
    price: "$99",
    oldPrice: "$180",
    discount: "45% OFF",
    image: "/images/deals/nike-shoes.jpg",
    hot: true,
  },
  {
    id: 2,
    name: "Zara Jacket",
    price: "$70",
    oldPrice: "$120",
    discount: "40% OFF",
    image: "/images/deals/zara-jacket.jpg",
    hot: false,
  },
  {
    id: 3,
    name: "Gucci Sunglasses",
    price: "$220",
    oldPrice: "$350",
    discount: "35% OFF",
    image: "/images/deals/gucci-glasses.jpg",
    hot: true,
  },
  {
    id: 4,
    name: "Adidas Tracksuit",
    price: "$85",
    oldPrice: "$150",
    discount: "43% OFF",
    image: "/images/deals/adidas-tracksuit.jpg",
    hot: false,
  },
];

export default function TrendingDeals() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-12">
          🔥 Trending <span className="text-red-600">Deals</span>
        </h2>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden 
                         transform hover:-translate-y-2 transition-all duration-300 cursor-pointer relative"
            >
              {/* Product Image */}
              <div className="relative w-full h-64">
                <Image
                  src={deal.image}
                  alt={deal.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Discount Badge */}
                <span className="absolute top-3 left-3 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
                  {deal.discount}
                </span>

                {/* Hot Deal Flame */}
                {deal.hot && (
                  <span className="absolute top-3 right-3 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                    HOT 🔥
                  </span>
                )}
              </div>

              {/* Deal Info */}
              <div className="p-5 text-center">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300">
                  {deal.name}
                </h3>
                <div className="mt-2 flex items-center justify-center space-x-3">
                  <span className="text-xl font-extrabold text-red-600">{deal.price}</span>
                  <span className="text-sm line-through text-gray-500">{deal.oldPrice}</span>
                </div>

                {/* Shop Button */}
                <button className="mt-4 px-5 py-2 bg-red-600 hover:bg-red-700 
                                   text-white rounded-full font-medium shadow-md 
                                   transition-all duration-300 cursor-pointer">
                  Grab Deal
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
