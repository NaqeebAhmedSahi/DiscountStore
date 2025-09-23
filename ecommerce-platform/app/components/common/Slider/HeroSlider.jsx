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
    image: "/images/slider2.jpg",
    button: "Shop Now",
  },
  {
    id: 2,
    brand: "Zara",
    discount: "70% OFF",
    category: "Women’s Dresses",
    image: "/images/slider3.jpg",
    button: "Grab Deal",
  },
  {
    id: 3,
    brand: "Adidas",
    discount: "40% OFF",
    category: "Sportswear",
    image: "/images/slider4.jpg",
    button: "Explore Now",
  },
  {
    id: 4,
    brand: "Gucci",
    discount: "30% OFF",
    category: "Luxury Bags",
    image: "/images/gucci-sale.jpg",
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
      <Slider {...settings} className="h-full">
        {offers.map((offer) => (
          <div key={offer.id} className="relative w-full h-[450px] md:h-[600px]">
            {/* Background Image */}
            <Image
              src={offer.image}
              alt={offer.brand}
              fill
              className="object-cover brightness-75"
              priority
            />

            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
              <span className="text-sm md:text-lg font-semibold tracking-widest uppercase text-yellow-300 animate-fadeIn">
                {offer.brand}
              </span>
              <h2 className="text-4xl md:text-6xl font-extrabold mb-3 animate-fadeIn">
                {offer.discount}
              </h2>
              <p className="text-lg md:text-2xl font-medium mb-6 animate-fadeIn delay-200">
                {offer.category}
              </p>
              <button className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 rounded-full 
                                 font-semibold text-lg text-black shadow-lg transition-all 
                                 duration-300 animate-fadeIn delay-300 cursor-pointer">
                {offer.button}
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
