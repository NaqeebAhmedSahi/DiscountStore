// components/common/BrandShowcase/BrandShowcase.jsx
"use client";

import { useEffect, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const brands = [
  {
    id: 1,
    name: "Nike",
    logo: "/images/brands/nike.png",
    banner: "/images/brand-banners/nike-banner.jpg",
    tagline: "Just Do It – 50% Off Deals",
    endTime: new Date().getTime() + 3600 * 1000, // 1 hour
  },
  {
    id: 2,
    name: "Adidas",
    logo: "/images/brands/adidas.png",
    banner: "/images/brand-banners/adidas-banner.jpg",
    tagline: "Run Your World – Big Discounts",
    endTime: new Date().getTime() + 7200 * 1000, // 2 hours
  },
  {
    id: 3,
    name: "Zara",
    logo: "/images/brands/zara.png",
    banner: "/images/brand-banners/zara-banner.jpg",
    tagline: "Trendy Styles for Less",
    endTime: new Date().getTime() + 5400 * 1000, // 1.5 hours
  },
  {
    id: 4,
    name: "Gucci",
    logo: "/images/brands/gucci.png",
    banner: "/images/brand-banners/gucci-banner.jpg",
    tagline: "Luxury Deals – Limited Time",
    endTime: new Date().getTime() + 10800 * 1000, // 3 hours
  },
];

// Countdown Hook
function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(targetDate - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(targetDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft <= 0) return "Expired";

  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

// Custom Prev Arrow
function PrevArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-6 right-20 z-20 bg-white hover:bg-gray-100 
                 text-gray-800 font-bold rounded-full w-12 h-12 flex items-center justify-center 
                 shadow-lg transition cursor-pointer"
    >
      ←
    </button>
  );
}

// Custom Next Arrow
function NextArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-6 right-6 z-20 bg-white hover:bg-gray-100 
                 text-gray-800 font-bold rounded-full w-12 h-12 flex items-center justify-center 
                 shadow-lg transition cursor-pointer"
    >
      →
    </button>
  );
}

export default function BrandShowcase() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    fade: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <section className="py-20 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-14">
          🔥 Trending <span className="text-red-600">Brands</span>
        </h2>

        {/* Hero Brand Carousel */}
        <div className="relative mb-16 rounded-2xl overflow-hidden shadow-xl">
          <Slider {...settings}>
            {brands.map((brand) => (
              <div
                key={brand.id}
                className="relative w-full h-[350px] md:h-[500px]"
              >
                {/* Background */}
                <Image
                  src={brand.banner}
                  alt={brand.name}
                  fill
                  className="object-cover brightness-75"
                />

                {/* Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={120}
                    height={60}
                    className="object-contain mb-4"
                  />
                  <h3 className="text-2xl md:text-4xl font-bold">
                    {brand.tagline}
                  </h3>

                  {/* Countdown Timer */}
                  <p className="mt-4 text-lg md:text-2xl font-semibold bg-black/60 px-4 py-2 rounded-lg">
                    Ends in:{" "}
                    <span className="text-yellow-400">
                      {useCountdown(brand.endTime)}
                    </span>
                  </p>

                  {/* CTA */}
                  <button className="mt-6 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-full shadow-md transition">
                    Shop {brand.name}
                  </button>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Secondary Brand Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-8">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="bg-white p-4 rounded-xl shadow-md flex items-center justify-center hover:shadow-xl transition cursor-pointer"
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                width={100}
                height={50}
                className="object-contain grayscale hover:grayscale-0 transition duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
