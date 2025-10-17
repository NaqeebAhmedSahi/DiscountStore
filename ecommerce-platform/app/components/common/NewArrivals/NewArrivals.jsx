"use client";

import Image from "next/image";
import Link from "next/link";
import { useAppDispatch } from "../../../../lib/hooks/redux";
import { addToCart } from "../../../../lib/store/cartSlice";
import { showSuccessToast } from "../../../../lib/utils/toast";
import { useEffect, useState } from "react";

export default function NewArrivals() {
  const dispatch = useAppDispatch();
  const [items, setItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ Fetch new arrivals
  useEffect(() => {
    fetch("/data/store.json")
      .then((res) => res.json())
      .then((data) => {
        const products = data.products || [];
        setItems(products.filter((p) => p.newArrival));
      })
      .catch(() => setItems([]));
  }, []);

  // ✅ Update visible count on resize
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) setVisibleCount(1); // Mobile
      else setVisibleCount(4); // Tablet & Desktop
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  // ✅ Add to cart
  const handleAddToCart = (item) => {
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
      reviews: item.reviews,
    };

    const availableSizes = item.size || item.sizes || [];
    const availableColors = item.colors || item.color || [];
    const selectedSize =
      availableSizes.length > 0 ? availableSizes[0] : "One Size";
    const selectedColor =
      availableColors.length > 0
        ? typeof availableColors[0] === "string"
          ? availableColors[0]
          : availableColors[0].name || "Default"
        : "Default";

    dispatch(
      addToCart({
        product,
        selectedSize,
        selectedColor,
        quantity: 1,
      })
    );

    showSuccessToast("", item.name);
  };

  // ✅ Carousel navigation
  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev + visibleCount >= items.length ? 0 : prev + visibleCount
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev - visibleCount < 0
        ? Math.max(items.length - visibleCount, 0)
        : prev - visibleCount
    );
  };

  // ✅ Calculate the visible items
  const visibleItems = items.slice(
    currentIndex,
    currentIndex + visibleCount
  );

  // If we’re near the end, wrap around
  if (visibleItems.length < visibleCount && items.length > 0) {
    visibleItems.push(
      ...items.slice(0, visibleCount - visibleItems.length)
    );
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-pink-200/20 to-yellow-200/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
            ✨ New{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Arrivals
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the latest trends and newest additions to our collection
          </p>
        </div>

        {/* Carousel */}
        <div className="relative flex items-center justify-center">
          {/* Prev Button */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white w-12 h-12 rounded-full shadow-lg transition-transform hover:scale-105"
          >
            ←
          </button>

          {/* Products */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 w-full transition-transform duration-700 ease-in-out">
            {visibleItems.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden"
              >
                {/* Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      item.badge === "NEW"
                        ? "bg-green-500 text-white"
                        : item.badge === "HOT"
                        ? "bg-red-500 text-white"
                        : item.badge === "BESTSELLER"
                        ? "bg-blue-500 text-white"
                        : "bg-yellow-500 text-black"
                    }`}
                  >
                    {item.badge}
                  </span>
                </div>

                {/* Image */}
                <div className="relative h-60 md:h-64 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                    {item.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex space-x-1">
                      {Array(5)
                        .fill()
                        .map((_, i) => (
                          <span
                            key={i}
                            className={`text-sm ${
                              i < Math.floor(item.rating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      ({item.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-2xl font-extrabold text-indigo-600">
                      {item.price}
                    </span>
                    <span className="text-lg line-through text-gray-500">
                      {item.oldPrice}
                    </span>
                    <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-bold rounded">
                      {item.discount}
                    </span>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white w-12 h-12 rounded-full shadow-lg transition-transform hover:scale-105"
          >
            →
          </button>
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <Link
            href="/products?newArrival=1"
            className="px-8 py-4 bg-white border-2 border-indigo-600 text-indigo-600 font-semibold rounded-xl hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
          >
            View All New Arrivals
          </Link>
        </div>
      </div>
    </section>
  );
}
