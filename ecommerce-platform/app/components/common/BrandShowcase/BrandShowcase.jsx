// components/common/BrandShowcase/BrandShowcase.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const brands = [
  {
    id: 1,
    name: "Nike",
    logo: "Nike",
    banner: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=800&fit=crop&crop=center",
    tagline: "Just Do It – 50% Off Deals",
    endTime: new Date().getTime() + 3600 * 1000, // 1 hour
    discount: "50% OFF",
    category: "Shoes & Sportswear",
    color: "from-blue-600 to-cyan-500",
    products: 1200,
    rating: 4.9
  },
  {
    id: 2,
    name: "Adidas",
    logo: "Adidas",
    banner: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1200&h=800&fit=crop&crop=center",
    tagline: "Run Your World – Big Discounts",
    endTime: new Date().getTime() + 7200 * 1000, // 2 hours
    discount: "40% OFF",
    category: "Athletic Wear",
    color: "from-green-600 to-emerald-500",
    products: 850,
    rating: 4.8
  },
  {
    id: 3,
    name: "Zara",
    logo: "Zara",
    banner: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop&crop=center",
    tagline: "Trendy Styles for Less",
    endTime: new Date().getTime() + 5400 * 1000, // 1.5 hours
    discount: "60% OFF",
    category: "Fashion & Apparel",
    color: "from-pink-600 to-rose-500",
    products: 2100,
    rating: 4.7
  },
  {
    id: 4,
    name: "Gucci",
    logo: "Gucci",
    banner: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&h=800&fit=crop&crop=center",
    tagline: "Luxury Deals – Limited Time",
    endTime: new Date().getTime() + 10800 * 1000, // 3 hours
    discount: "30% OFF",
    category: "Luxury Fashion",
    color: "from-purple-600 to-violet-500",
    products: 450,
    rating: 4.9
  },
  {
    id: 5,
    name: "Puma",
    logo: "Puma",
    banner: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&fit=crop&crop=center",
    tagline: "Forever Faster",
    endTime: new Date().getTime() + 4800 * 1000, // 1.3 hours
    discount: "45% OFF",
    category: "Sports & Lifestyle",
    color: "from-orange-600 to-red-500",
    products: 680,
    rating: 4.6
  },
  {
    id: 6,
    name: "H&M",
    logo: "H&M",
    banner: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1200&h=800&fit=crop&crop=center",
    tagline: "Fashion for Everyone",
    endTime: new Date().getTime() + 6000 * 1000, // 1.7 hours
    discount: "55% OFF",
    category: "Fast Fashion",
    color: "from-teal-600 to-cyan-500",
    products: 3200,
    rating: 4.5
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
  const router = useRouter();
  const [selectedBrand, setSelectedBrand] = useState(brands[0]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'carousel', 'masonry'

  const toSlug = (text) => (text || "").toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    fade: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  const renderGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {brands.map((brand) => (
        <div
          key={brand.id}
          className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden cursor-pointer"
          onClick={() => setSelectedBrand(brand)}
        >
          {/* Brand Image */}
          <div className="relative h-64 overflow-hidden">
            <Image
              src={brand.banner}
              alt={brand.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${brand.color} opacity-80 group-hover:opacity-90 transition-opacity duration-300`}></div>
            
            {/* Brand Logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-4xl font-bold text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                {brand.logo}
              </h3>
            </div>

            {/* Discount Badge */}
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 bg-white/90 text-gray-900 text-sm font-bold rounded-full shadow-lg">
                {brand.discount}
              </span>
            </div>

            {/* Countdown Timer */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-black/70 text-white px-3 py-2 rounded-full text-sm font-semibold text-center">
                ⏰ {useCountdown(brand.endTime)} left
              </div>
            </div>
          </div>

          {/* Brand Info */}
          <div className="p-6">
            <h4 className="text-xl font-bold text-gray-900 mb-2">{brand.name}</h4>
            <p className="text-gray-600 mb-3">{brand.category}</p>
            
            {/* Stats */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-1">
                <span className="text-yellow-400">★</span>
                <span className="text-sm font-semibold">{brand.rating}</span>
              </div>
              <div className="text-sm text-gray-500">
                {brand.products} products
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => router.push(`/brands/${toSlug(brand.name)}`)}
              className={`w-full py-3 bg-gradient-to-r ${brand.color} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
            >
              Shop {brand.name}
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCarousel = () => (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl">
      <Slider {...settings}>
        {brands.map((brand) => (
          <div key={brand.id} className="relative w-full h-[400px] md:h-[600px]">
            <Image
              src={brand.banner}
              alt={brand.name}
              fill
              className="object-cover"
            />
            
            <div className={`absolute inset-0 bg-gradient-to-r ${brand.color} opacity-90`}></div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
              <h3 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-2xl">
                {brand.logo}
              </h3>
              <p className="text-xl md:text-3xl font-semibold mb-6 drop-shadow-lg">
                {brand.tagline}
              </p>
              
              <div className="flex items-center space-x-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold">{brand.products}</div>
                  <div className="text-sm opacity-90">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{brand.rating}</div>
                  <div className="text-sm opacity-90">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{brand.discount}</div>
                  <div className="text-sm opacity-90">Discount</div>
                </div>
              </div>

              <div className="bg-black/60 px-6 py-3 rounded-full mb-6">
                <span className="text-lg font-semibold">
                  Ends in: <span className="text-yellow-400">{useCountdown(brand.endTime)}</span>
                </span>
              </div>

              <button
                onClick={() => router.push(`/brands/${toSlug(brand.name)}`)}
                className={`px-8 py-4 bg-white text-gray-900 font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}
              >
                Shop {brand.name} Now
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );

  const renderMasonry = () => (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
      {brands.map((brand, index) => (
        <div
          key={brand.id}
          className={`group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden cursor-pointer break-inside-avoid ${
            index % 3 === 0 ? 'h-80' : index % 3 === 1 ? 'h-64' : 'h-72'
          }`}
          onClick={() => setSelectedBrand(brand)}
        >
          <div className="relative h-full">
            <Image
              src={brand.banner}
              alt={brand.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            
            <div className={`absolute inset-0 bg-gradient-to-t ${brand.color} opacity-80 group-hover:opacity-90 transition-opacity duration-300`}></div>
            
            <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
              <div>
                <h3 className="text-3xl font-bold mb-2 drop-shadow-lg">{brand.logo}</h3>
                <p className="text-sm opacity-90">{brand.category}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-white/90 text-gray-900 text-sm font-bold rounded-full">
                  {brand.discount}
                </span>
                <div className="text-right">
                  <div className="text-sm opacity-90">Rating</div>
                  <div className="font-bold">{brand.rating} ⭐</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
            🔥 Trending <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Brands</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Discover exclusive deals from your favorite brands. Limited time offers that won't last long!
          </p>
          
          {/* View Toggle */}
          <div className="flex justify-center space-x-2 bg-gray-100 rounded-full p-1">
            {[
              { id: 'grid', icon: '⊞', label: 'Grid' },
              { id: 'carousel', icon: '◯', label: 'Carousel' },
              { id: 'masonry', icon: '⊡', label: 'Masonry' }
            ].map((view) => (
              <button
                key={view.id}
                onClick={() => setViewMode(view.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  viewMode === view.id
                    ? 'bg-white text-purple-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                }`}
              >
                <span className="text-lg">{view.icon}</span>
                <span className="hidden sm:inline">{view.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Brand Display */}
        {viewMode === 'grid' && renderGrid()}
        {viewMode === 'carousel' && renderCarousel()}
        {viewMode === 'masonry' && renderMasonry()}

        {/* Featured Brand Spotlight */}
        <div className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl"></div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Featured: <span className="text-yellow-400">{selectedBrand.name}</span>
              </h3>
              <p className="text-lg text-gray-300 mb-6">{selectedBrand.tagline}</p>
              <div className="flex items-center space-x-6 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{selectedBrand.products}</div>
                  <div className="text-sm text-gray-400">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{selectedBrand.rating}</div>
                  <div className="text-sm text-gray-400">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{selectedBrand.discount}</div>
                  <div className="text-sm text-gray-400">Discount</div>
                </div>
              </div>
              <button
                onClick={() => router.push(`/brands/${toSlug(selectedBrand.name)}`)}
                className={`px-8 py-4 bg-gradient-to-r ${selectedBrand.color} text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}
              >
                Explore {selectedBrand.name} Collection
              </button>
            </div>
            
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
              <Image
                src={selectedBrand.banner}
                alt={selectedBrand.name}
                fill
                className="object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${selectedBrand.color} opacity-60`}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
