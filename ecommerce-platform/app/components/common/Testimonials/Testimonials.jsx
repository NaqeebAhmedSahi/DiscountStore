// components/common/Testimonials/Testimonials.jsx
"use client";

import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Fashion Blogger",
    image: "/images/users/user1.jpg",
    quote:
      "This store is a game-changer! I found authentic Nike sneakers at 50% off. Super smooth checkout and delivery.",
  },
  {
    id: 2,
    name: "David Williams",
    role: "Tech Enthusiast",
    image: "/images/users/user2.jpg",
    quote:
      "I love the way they bring together deals from multiple brands. I scored Adidas sportswear at an unbelievable price!",
  },
  {
    id: 3,
    name: "Emily Carter",
    role: "Student",
    image: "/images/users/user3.jpg",
    quote:
      "Luxury brands like Gucci and Zara on discounts? Yes please! The site design makes shopping fun and easy.",
  },
];

export default function Testimonials() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    arrows: false,
  };

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-14">
          💬 What Our <span className="text-indigo-600">Customers Say</span>
        </h2>

        {/* Slider */}
        <Slider {...settings}>
          {testimonials.map((t) => (
            <div key={t.id} className="px-6">
              <div className="bg-white shadow-lg rounded-2xl p-8 md:p-12 flex flex-col items-center">
                {/* User Image */}
                <Image
                  src={t.image}
                  alt={t.name}
                  width={100}
                  height={100}
                  className="rounded-full object-cover border-4 border-indigo-500 mb-6"
                />

                {/* Quote */}
                <p className="text-lg md:text-xl italic text-gray-700 mb-6">
                  “{t.quote}”
                </p>

                {/* Name & Role */}
                <h3 className="text-xl font-bold text-gray-900">{t.name}</h3>
                <p className="text-gray-500">{t.role}</p>

                {/* Stars */}
                <div className="flex gap-1 mt-4">
                  {Array(5)
                    .fill()
                    .map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">★</span>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
