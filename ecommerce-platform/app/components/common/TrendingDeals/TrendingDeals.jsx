"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useAppDispatch } from "../../../../lib/hooks/redux";
import { addToCart } from "../../../../lib/store/cartSlice";
import { showSuccessToast } from "../../../../lib/utils/toast";

export default function TrendingDeals() {
  const dispatch = useAppDispatch();
  const [deals, setDeals] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [soldPercentages, setSoldPercentages] = useState({});
  const containerRef = useRef(null);

  // ✅ Fetch data
  useEffect(() => {
    fetch("/data/store.json")
      .then((res) => res.json())
      .then((data) => {
        const products = data.products || [];
        const trending = products.filter((p) => p.trending);
        setDeals(trending);

        const percentages = {};
        trending.forEach((deal) => {
          percentages[deal.id] = Math.floor(Math.random() * 50) + 20;
        });
        setSoldPercentages(percentages);
      })
      .catch((err) => console.error("Error loading deals:", err));
  }, []);

  // ✅ Handle add to cart
  const handleAddToCart = (deal) => {
    const product = {
      id: deal.id,
      name: deal.name,
      price: deal.price,
      originalPrice: deal.oldPrice,
      image: deal.image,
      brand: deal.brand || "Unknown",
      category: deal.category || "Deals",
      inStock: true,
      discount: deal.discount,
      rating: deal.rating,
      reviews: deal.reviews,
    };
    dispatch(
      addToCart({
        product,
        selectedSize: "One Size",
        selectedColor: "Default",
        quantity: 1,
      })
    );
    showSuccessToast("", deal.name);
  };

  // ✅ Set number of visible cards (1 on mobile, 4 on tablet/desktop)
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) setVisibleCount(1);
      else setVisibleCount(4);
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const scrollByAmount = (dir = 1) => {
    const el = containerRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth / visibleCount;
    el.scrollBy({ left: dir * scrollAmount, behavior: "smooth" });
  };

  if (!deals.length) return null;

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
            🔥 Trending{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
              Deals
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Limited time offers that are selling fast! Don’t miss out.
          </p>
        </div>

        {/* Deals Row (Horizontal Scroll) */}
        <div className="relative">
          {/* Left Button */}
          <button
            aria-label="Previous"
            onClick={() => scrollByAmount(-1)}
            className="hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-r from-red-500 to-orange-500 text-white w-12 h-12 rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            ←
          </button>

          {/* Scrollable Row */}
          <div
            ref={containerRef}
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide py-4"
          >
            {deals.map((deal) => (
              <div
                key={deal.id}
                className="min-w-[80%] sm:min-w-[calc(25%-1rem)] flex-shrink-0 group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden"
              >
                {/* Badge */}
                {deal.badge && (
                  <div className="absolute top-4 left-4 z-20">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        deal.badge === "TRENDING"
                          ? "bg-red-500 text-white animate-pulse"
                          : "bg-yellow-500 text-black"
                      }`}
                    >
                      {deal.badge}
                    </span>
                  </div>
                )}

                {/* Product Image */}
                <Link href={`/products/${deal.id}`}>
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    <Image
                      src={deal.image}
                      alt={deal.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </Link>

                {/* Deal Info */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    {deal.name}
                  </h3>

                  {/* Rating */}
                  {deal.rating && (
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex space-x-1">
                        {Array(5)
                          .fill()
                          .map((_, i) => (
                            <span
                              key={i}
                              className={`text-sm ${
                                i < Math.floor(deal.rating)
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            >
                              ★
                            </span>
                          ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        ({deal.reviews})
                      </span>
                    </div>
                  )}

                  {/* Price */}
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-2xl font-extrabold text-red-600">
                      {deal.price}
                    </span>
                    {deal.oldPrice && (
                      <span className="text-lg line-through text-gray-500">
                        {deal.oldPrice}
                      </span>
                    )}
                    {deal.discount && (
                      <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-bold rounded">
                        {deal.discount}
                      </span>
                    )}
                  </div>

                  {/* Sold Progress */}
                  {soldPercentages[deal.id] && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Sold: {soldPercentages[deal.id]}%</span>
                        <span>Hurry!</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${soldPercentages[deal.id]}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Add to Cart */}
                  <button
                    onClick={() => handleAddToCart(deal)}
                    className="w-full py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                  >
                    Grab This Deal
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Button */}
          <button
            aria-label="Next"
            onClick={() => scrollByAmount(1)}
            className="hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-r from-red-500 to-orange-500 text-white w-12 h-12 rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            →
          </button>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
            <Link
              href="/products?trending=1"
              className="px-8 py-4 bg-white border-2 border-red-600 text-red-600 font-semibold rounded-xl hover:bg-red-600 hover:text-white transition-all duration-300 shadow-lg"
            >
              View All Trending Deals
            </Link>
        </div>
      </div>
    </section>
  );
}
