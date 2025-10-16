// components/common/Stats/StatsSection.jsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const stats = [
  {
    id: 1,
    number: "50K+",
    label: "Happy Customers",
    icon: "👥",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    number: "1000+",
    label: "Daily Deals",
    icon: "🔥",
    color: "from-red-500 to-pink-500"
  },
  {
    id: 3,
    number: "500+",
    label: "Top Brands",
    icon: "⭐",
    color: "from-yellow-500 to-orange-500"
  },
  {
    id: 4,
    number: "99%",
    label: "Satisfaction Rate",
    icon: "💯",
    color: "from-green-500 to-emerald-500"
  }
];

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50"></div>
      <div className="absolute top-0 left-0 w-full h-full opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a855f7' fill-opacity='0.05'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Our Store?</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us for the best deals and quality products
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={`group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                isVisible ? 'animate-fadeIn' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 rounded-2xl group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              {/* Content */}
              <div className="relative z-10 text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className={`text-3xl md:text-4xl font-extrabold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.number}
                </div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-purple-200 transition-colors duration-300"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link href="/products" className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
            <span>Start Shopping Now</span>
            <span className="text-xl">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
