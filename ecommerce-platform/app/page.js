// pages/index.js
"use client";
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showBanner, setShowBanner] = useState(true);

  // Sample promotional banners data
  const banners = [
    {
      id: 1,
      title: "Summer Sale",
      subtitle: "Up to 50% off on selected items",
      description: "Don't miss our biggest sale of the season. Limited time only!",
      image: "/api/placeholder/800/400",
      cta: "Shop Now",
      bgColor: "bg-gradient-to-r from-rose-400 to-orange-300",
      textColor: "text-white"
    },
    {
      id: 2,
      title: "New Collection",
      subtitle: "Discover the latest trends",
      description: "Brand new arrivals from your favorite designers",
      image: "/api/placeholder/800/400",
      cta: "Explore Now",
      bgColor: "bg-gradient-to-r from-blue-400 to-purple-500",
      textColor: "text-white"
    },
    {
      id: 3,
      title: "Free Shipping",
      subtitle: "On orders over $50",
      description: "Plus easy returns and exchanges",
      image: "/api/placeholder/800/400",
      cta: "Learn More",
      bgColor: "bg-gradient-to-r from-emerald-400 to-cyan-500",
      textColor: "text-white"
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen">
      <Head>
        <title>FashionDeals - Discounted Brand Items</title>
        <meta name="description" content="Discover discounted brand items including clothing, shoes, and more" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Top Announcement Banner */}
      {showBanner && (
        <div className="bg-primary-700 text-white py-2 px-4 relative">
          <div className="container mx-auto text-center text-sm">
            🎉 Free shipping on all orders over $50! 🎉
          </div>
          <button 
            onClick={() => setShowBanner(false)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
            aria-label="Close banner"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      )}

      <main>
        {/* Hero Section with Carousel */}
        <section className="relative h-[500px] md:h-[600px] overflow-hidden">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${banner.bgColor} ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="container mx-auto h-full flex items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
                  {/* Text Content */}
                  <div className={`px-6 md:px-0 ${banner.textColor} space-y-6`}>
                    <h1 className="text-4xl md:text-5xl font-bold">{banner.title}</h1>
                    <h2 className="text-2xl md:text-3xl font-semibold">{banner.subtitle}</h2>
                    <p className="text-lg">{banner.description}</p>
                    <button className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">
                      {banner.cta}
                    </button>
                  </div>
                  
                  {/* Image */}
                  <div className="flex justify-center items-center">
                    <div className="w-full h-64 md:h-96 bg-white rounded-lg shadow-xl overflow-hidden">
                      <img 
                        src={banner.image} 
                        alt={banner.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRightIcon className="h-6 w-6 text-gray-800" />
          </button>
          
          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 w-3 rounded-full ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>

        {/* Featured Categories Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Clothing", image: "/api/placeholder/400/300", items: "1234 products" },
                { name: "Shoes", image: "/api/placeholder/400/300", items: "856 products" },
                { name: "Accessories", image: "/api/placeholder/400/300", items: "612 products" }
              ].map((category, index) => (
                <div key={index} className="group relative overflow-hidden rounded-xl shadow-md">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
                    <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                    <p className="text-white/80">{category.items}</p>
                    <button className="mt-4 self-start bg-white text-gray-900 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors">
                      Shop Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-primary-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Subscribe to our newsletter to receive exclusive offers and updates about new products.
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto sm:max-w-lg">
              <input 
                type="email" 
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-l-md sm:rounded-r-none sm:rounded-l-md border focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button className="mt-2 sm:mt-0 bg-primary-600 text-white px-6 py-3 rounded-r-md sm:rounded-l-none font-medium hover:bg-primary-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">FashionDeals</h3>
              <p className="text-gray-400">Your destination for discounted brand items.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">All Products</a></li>
                <li><a href="#" className="hover:text-white">Clothing</a></li>
                <li><a href="#" className="hover:text-white">Shoes</a></li>
                <li><a href="#" className="hover:text-white">Accessories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Shipping</a></li>
                <li><a href="#" className="hover:text-white">Returns</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Stay Connected</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <span className="h-6 w-6">FB</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <span className="h-6 w-6">IG</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <span className="h-6 w-6">TW</span>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} FashionDeals. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}