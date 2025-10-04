// components/common/Slider/DiscountSlider.jsx
"use client";

import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const offers = [
  {
    id: 1,
    brand: "Nike",
    discount: "50% OFF",
    category: "Shoes & Sneakers",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1920&h=1080&fit=crop&crop=center",
    button: "Shop Now",
  },
  {
    id: 2,
    brand: "Zara",
    discount: "70% OFF",
    category: "Women's Dresses",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop&crop=center",
    button: "Grab Deal",
  },
  {
    id: 3,
    brand: "Adidas",
    discount: "40% OFF",
    category: "Sportswear",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1920&h=1080&fit=crop&crop=center",
    button: "Explore Now",
  },
  {
    id: 4,
    brand: "Gucci",
    discount: "30% OFF",
    category: "Luxury Bags",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1920&h=1080&fit=crop&crop=center",
    button: "See Offer",
  },
];

// Custom Prev Arrow
function PrevArrow(props) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute bottom-6 right-20 z-10 bg-yellow-400 hover:bg-yellow-500 
                 text-black font-bold rounded-full w-12 h-12 flex items-center justify-center 
                 shadow-lg transition-all duration-300 cursor-pointer"
    >
      ←
    </button>
  );
}

// Custom Next Arrow
function NextArrow(props) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute bottom-6 right-6 z-10 bg-yellow-400 hover:bg-yellow-500 
                 text-black font-bold rounded-full w-12 h-12 flex items-center justify-center 
                 shadow-lg transition-all duration-300 cursor-pointer"
    >
      →
    </button>
  );
}

export default function DiscountSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    fade: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    appendDots: (dots) => (
      <div>
        <ul className="flex justify-center space-x-3 mt-4">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-3 h-3 bg-gray-300 rounded-full hover:bg-yellow-400 
                      transition-all duration-300 cursor-pointer"></div>
    ),
  };

  return (
    <div className="relative w-full h-[450px] md:h-[600px] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 z-10"></div>
      
      <Slider {...settings} className="h-full">
        {offers.map((offer) => (
          <div key={offer.id} className="relative w-full h-[450px] md:h-[600px]">
            {/* Background Image */}
            <Image
              src={offer.image}
              alt={offer.brand}
              fill
              className="object-cover brightness-75 group-hover:scale-105 transition-transform duration-700"
              priority
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40"></div>

            {/* Floating Elements */}
            <div className="absolute top-10 right-10 w-20 h-20 bg-yellow-400/20 rounded-full animate-float"></div>
            <div className="absolute bottom-20 left-10 w-16 h-16 bg-red-400/20 rounded-full animate-float delay-300"></div>

            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 z-20">
              <div className="max-w-4xl mx-auto">
                <span className="text-sm md:text-lg font-semibold tracking-widest uppercase text-yellow-300 animate-fadeIn drop-shadow-lg">
                  {offer.brand}
                </span>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-3 animate-fadeIn delay-200 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent drop-shadow-2xl">
                  {offer.discount}
                </h2>
                <p className="text-lg md:text-2xl font-medium mb-8 animate-fadeIn delay-300 text-gray-100 drop-shadow-lg">
                  {offer.category}
                </p>
                <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 rounded-full 
                                   font-bold text-lg text-black shadow-2xl transition-all duration-300 animate-fadeIn delay-500 cursor-pointer
                                   transform hover:scale-105 hover:shadow-3xl animate-pulse-glow">
                  {offer.button}
                </button>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-1/4 left-8 w-2 h-32 bg-gradient-to-b from-yellow-400 to-transparent opacity-60 animate-pulse"></div>
            <div className="absolute bottom-1/4 right-8 w-2 h-24 bg-gradient-to-t from-red-400 to-transparent opacity-60 animate-pulse delay-300"></div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
