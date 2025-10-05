// app/about/page.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: "🛍️",
      title: "Curated Brand Collections",
      description: "Access premium brands in one place without visiting multiple websites",
      details: "We've partnered with top brands to bring you their best products at discounted prices. No more hopping between sites - everything you need is here."
    },
    {
      icon: "💰",
      title: "Exclusive Discounts",
      description: "Enjoy significant savings on brand-name items",
      details: "Get access to special discounts not available on brand websites. We negotiate better prices so you can shop luxury for less."
    },
    {
      icon: "🔍",
      title: "Smart Search & Filters",
      description: "Find exactly what you want with advanced filtering",
      details: "Our intelligent search system helps you discover products by brand, category, size, color, price range, and more with precision."
    },
    {
      icon: "🚚",
      title: "Unified Shipping",
      description: "One checkout, one delivery for all your brands",
      details: "Shop from multiple brands in a single transaction. We handle the logistics so you receive everything together with tracking and support."
    },
    {
      icon: "⭐",
      title: "Verified Reviews",
      description: "Make informed decisions with authentic customer feedback",
      details: "Read real reviews from verified buyers across all brands. Our rating system helps you choose the best products with confidence."
    },
    {
      icon: "🔒",
      title: "Secure Shopping",
      description: "Shop with confidence using our secure platform",
      details: "Your data and payments are protected with enterprise-grade security. We prioritize your privacy and transaction safety."
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "200+", label: "Brand Partners" },
    { number: "10K+", label: "Products Available" },
    { number: "98%", label: "Satisfaction Rate" }
  ];

  const brands = [
    { name: "Nike", logo: "/images/brands/nike-logo.png" },
    { name: "Adidas", logo: "/images/brands/adidas-logo.png" },
    { name: "Zara", logo: "/images/brands/zara-logo.png" },
    { name: "H&M", logo: "/images/brands/hm-logo.png" },
    { name: "Michael Kors", logo: "/images/brands/mk-logo.png" },
    { name: "Puma", logo: "/images/brands/puma-logo.png" },
    { name: "Uniqlo", logo: "/images/brands/uniqlo-logo.png" },
    { name: "Casio", logo: "/images/brands/casio-logo.png" }
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Browse & Discover",
      description: "Explore thousands of products from top brands in one place",
      icon: "🔍"
    },
    {
      step: "02",
      title: "Filter & Compare",
      description: "Use smart filters to find exactly what you're looking for",
      icon: "⚡"
    },
    {
      step: "03",
      title: "Add to Cart",
      description: "Select items from different brands and add them to your cart",
      icon: "🛒"
    },
    {
      step: "04",
      title: "Checkout Once",
      description: "Complete your purchase with a single, secure checkout",
      icon: "💳"
    },
    {
      step: "05",
      title: "Track & Receive",
      description: "Monitor your order and receive everything together",
      icon: "📦"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
        <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] bg-yellow-400/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-[26rem] h-[26rem] bg-pink-400/20 rounded-full blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Revolutionizing <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-300">Online Shopping</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto">
            One platform for all your favorite brands. No more jumping between websites - 
            discover, compare, and purchase from multiple brands in a single, seamless experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/products"
              className="bg-gradient-to-r from-yellow-400 to-amber-400 text-black px-8 py-3 rounded-lg font-bold text-lg hover:from-yellow-500 hover:to-amber-500 transition-colors"
            >
              Start Shopping Now
            </Link>
            <button className="border-2 border-white/70 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-white hover:text-black transition-colors">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Problem Solution Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Problem Side */}
            <div>
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
                <div className="text-4xl mb-4">😫</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">The Traditional Hassle</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-3">
                    <span className="text-gray-500">✗</span>
                    Multiple websites, multiple accounts
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-gray-500">✗</span>
                    Different shipping costs and times
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-gray-500">✗</span>
                    Inconsistent return policies
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-gray-500">✗</span>
                    No unified customer support
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-gray-500">✗</span>
                    Difficult to compare products across brands
                  </li>
                </ul>
              </div>
            </div>

            {/* Solution Side */}
            <div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Simple Solution</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-3">
                    <span className="text-yellow-600">✓</span>
                    One platform for all brands
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-yellow-600">✓</span>
                    Single checkout and shipping
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-yellow-600">✓</span>
                    Unified return policy
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-yellow-600">✓</span>
                    Dedicated customer support
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-yellow-600">✓</span>
                    Easy cross-brand comparison
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-yellow-400 to-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="text-white">
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our <span className="text-yellow-500">Platform</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've simplified online shopping by bringing your favorite brands together in one place
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Features List */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  onClick={() => setActiveFeature(index)}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                    activeFeature === index
                      ? 'bg-yellow-400 shadow-lg transform scale-105'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{feature.icon}</div>
                    <div>
                      <h3 className={`font-bold text-lg ${
                        activeFeature === index ? 'text-black' : 'text-gray-900'
                      }`}>
                        {feature.title}
                      </h3>
                      <p className={activeFeature === index ? 'text-gray-800' : 'text-gray-600'}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Feature Details */}
            <div className="bg-gray-900 text-white rounded-2xl p-8">
              <div className="text-6xl mb-4">{features[activeFeature].icon}</div>
              <h3 className="text-2xl font-bold mb-4">{features[activeFeature].title}</h3>
              <p className="text-gray-200 text-lg leading-relaxed">
                {features[activeFeature].details}
              </p>
              
              {/* Additional benefits */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-yellow-400">
                  <span>✨</span>
                  <span>Save time shopping across multiple sites</span>
                </div>
                <div className="flex items-center gap-3 text-yellow-400">
                  <span>💸</span>
                  <span>Get better prices than individual brand sites</span>
                </div>
                <div className="flex items-center gap-3 text-yellow-400">
                  <span>🛡️</span>
                  <span>One trusted platform for all your purchases</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It <span className="text-yellow-500">Works</span>
            </h2>
            <p className="text-xl text-gray-600">Shopping made simple in 5 easy steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-lg mb-4 mx-auto">
                    {step.step}
                  </div>
                  <div className="text-3xl mb-3">{step.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:flex items-center justify-center h-full">
                    <div className="w-full h-0.5 bg-gray-300 relative">
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 border-t-2 border-r-2 border-gray-400 rotate-45"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Showcase */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured <span className="text-yellow-500">Brands</span>
            </h2>
            <p className="text-xl text-gray-600">Shop from your favorite brands all in one place</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {brands.map((brand, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 text-center group hover:shadow-lg transition-all">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <div className="bg-white rounded-xl p-3 shadow-md group-hover:scale-110 transition-transform">
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-600">{brand.name.charAt(0)}</span>
                    </div>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900">{brand.name}</h3>
                <p className="text-yellow-600 text-sm mt-1">Up to 60% OFF</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link 
              href="/brands"
              className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-700 font-semibold"
            >
              View All 200+ Brands
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-purple-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Simplify Your Shopping?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Join thousands of smart shoppers who save time and money with our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/products"
              className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold text-lg hover:bg-yellow-500 transition-colors"
            >
              Start Shopping Now
            </Link>
            <Link 
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-white hover:text-black transition-colors"
            >
              Contact Us
            </Link>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-6 text-gray-300">
            <div className="flex items-center gap-2">
              <span>🔒</span>
              <span>Secure Shopping</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🚚</span>
              <span>Free Shipping Over $50</span>
            </div>
            <div className="flex items-center gap-2">
              <span>↩️</span>
              <span>Easy Returns</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-6">🎯</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            To simplify online shopping by creating a unified platform where customers can access 
            all their favorite brands with the convenience of single checkout, unified shipping, 
            and exceptional customer service. We believe shopping should be enjoyable, not complicated.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold">
              Making Shopping Simple Since 2024
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}