// app/page.jsx
"use client";

import { useState } from "react";
import Header from "../app/components/common/Header/Header";
import HeroSlider from "../app/components/common/Slider/HeroSlider";
import FeaturedCategories from "../app/components/common/Categories/FeaturedCategories";
import NewArrivals from "../app/components/common/NewArrivals/NewArrivals";
import TrendingDeals from "../app/components/common/TrendingDeals/TrendingDeals";
import BrandShowcase from "../app/components/common/BrandShowcase/BrandShowcase";
import Newsletter from "../app/components/common/Newsletter/Newsletter";
import Testimonials from "../app/components/common/Testimonials/Testimonials";
import Footer from "../app/components/common/Footer/Footer";
import StatsSection from "../app/components/common/Stats/StatsSection";
import FeaturedProducts from "../app/components/common/FeaturedProducts/FeaturedProducts";
import ViewToggle from "../app/components/common/ViewToggle/ViewToggle";

export default function Home() {
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'list', 'masonry'

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Header />
      
      {/* Hero Section */}
      <section className="relative">
        <HeroSlider />
        {/* Floating Elements */}
        <div className="absolute top-20 right-10 hidden lg:block">
          <div className="w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
        </div>
        <div className="absolute bottom-20 left-10 hidden lg:block">
          <div className="w-16 h-16 bg-red-400 rounded-full opacity-20 animate-bounce"></div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Featured Categories with View Toggle */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50"></div>
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                🌟 Featured <span className="text-yellow-500">Categories</span>
              </h2>
              <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
            </div>
            <FeaturedCategories viewMode={viewMode} />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedProducts />

      {/* New Arrivals */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50 relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="relative z-10">
          <NewArrivals />
        </div>
      </section>

      {/* Trending Deals */}
      <TrendingDeals />

      {/* Brand Showcase */}
      <BrandShowcase />

      {/* Newsletter */}
      <Newsletter />

      {/* Testimonials */}
      <Testimonials />

      <Footer />
    </div>
  );
}