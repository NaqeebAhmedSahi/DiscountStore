// app/brands/[brand]/page.jsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Mock brand data
const brandsData = {
  nike: {
    id: "nike",
    name: "Nike",
    logo: "/images/brands/nike-logo.png",
    banner: "/images/brands/nike-banner.jpg",
    description: "Just Do It. Nike is the world's leading athletic footwear, apparel, and equipment company.",
    fullDescription: "Since 1964, Nike has been synonymous with innovation, quality, and performance. From professional athletes to everyday fitness enthusiasts, Nike provides the tools and inspiration to help people achieve their goals. With groundbreaking technologies like Air Max, Flyknit, and Dri-FIT, Nike continues to push the boundaries of what's possible in sportswear.",
    founded: 1964,
    headquarters: "Beaverton, Oregon, USA",
    category: "Sportswear, Footwear, Equipment",
    website: "https://nike.com",
    socialMedia: {
      instagram: "nike",
      twitter: "Nike",
      facebook: "nike"
    }
  },
  adidas: {
    id: "adidas",
    name: "Adidas",
    logo: "/images/brands/adidas-logo.png",
    banner: "/images/brands/adidas-banner.jpg",
    description: "Impossible is Nothing. Adidas creates the best sports products for athletes of all levels.",
    fullDescription: "Founded in 1949, Adidas has been at the forefront of sports innovation for decades. Known for the iconic three stripes, Adidas combines German engineering with cutting-edge design to create products that enhance athletic performance while maintaining style and comfort.",
    founded: 1949,
    headquarters: "Herzogenaurach, Germany",
    category: "Sportswear, Footwear, Accessories",
    website: "https://adidas.com",
    socialMedia: {
      instagram: "adidas",
      twitter: "adidas",
      facebook: "adidas"
    }
  },
  zara: {
    id: "zara",
    name: "Zara",
    logo: "/images/brands/zara-logo.png",
    banner: "/images/brands/zara-banner.jpg",
    description: "Fast fashion leader bringing the latest trends to customers worldwide.",
    fullDescription: "Zara revolutionized the fashion industry with its fast-fashion model, bringing high-fashion trends to the mass market at affordable prices. With new collections arriving every week, Zara keeps fashion-forward customers coming back for the latest styles.",
    founded: 1974,
    headquarters: "Arteixo, Spain",
    category: "Fashion, Apparel, Accessories",
    website: "https://zara.com",
    socialMedia: {
      instagram: "zara",
      twitter: "Zara",
      facebook: "zara"
    }
  }
};

// Mock products by brand
const brandProducts = {
  nike: [
    {
      id: 1,
      name: "Nike Air Max 270",
      price: 149.99,
      originalPrice: 189.99,
      category: "Shoes & Sneakers",
      type: "Running Shoes",
      size: ["US 8", "US 9", "US 10", "US 11", "US 12"],
      color: ["Black", "White", "Blue", "Red"],
      image: "/images/products/nike-airmax.jpg",
      rating: 4.7,
      reviews: 289,
      discount: 21,
      technology: ["Air Max", "React Foam"],
      season: ["Spring", "Summer", "Fall"],
      activity: ["Running", "Walking", "Training"]
    },
    {
      id: 2,
      name: "Nike Dri-FIT Running Shirt",
      price: 34.99,
      originalPrice: 49.99,
      category: "Sportswear",
      type: "Performance Top",
      size: ["S", "M", "L", "XL", "XXL"],
      color: ["Black", "Gray", "Blue", "Green"],
      image: "/images/products/nike-shirt.jpg",
      rating: 4.5,
      reviews: 156,
      discount: 30,
      technology: ["Dri-FIT"],
      season: ["Spring", "Summer"],
      activity: ["Running", "Training", "Gym"]
    },
    {
      id: 3,
      name: "Nike Pro Shorts",
      price: 29.99,
      originalPrice: 39.99,
      category: "Sportswear",
      type: "Shorts",
      size: ["S", "M", "L", "XL"],
      color: ["Black", "Navy", "Red"],
      image: "/images/products/nike-shorts.jpg",
      rating: 4.3,
      reviews: 98,
      discount: 25,
      technology: ["Dri-FIT", "4-Way Stretch"],
      season: ["Spring", "Summer"],
      activity: ["Running", "Training", "Basketball"]
    },
    {
      id: 4,
      name: "Nike Air Force 1",
      price: 99.99,
      originalPrice: 129.99,
      category: "Shoes & Sneakers",
      type: "Lifestyle Shoes",
      size: ["US 7", "US 8", "US 9", "US 10", "US 11"],
      color: ["White", "Black", "Triple White"],
      image: "/images/products/nike-af1.jpg",
      rating: 4.8,
      reviews: 432,
      discount: 23,
      technology: ["Air Cushioning"],
      season: ["All Season"],
      activity: ["Casual", "Lifestyle"]
    }
  ],
  adidas: [
    {
      id: 5,
      name: "Adidas Ultraboost 22",
      price: 179.99,
      originalPrice: 219.99,
      category: "Shoes & Sneakers",
      type: "Running Shoes",
      size: ["US 8", "US 9", "US 10", "US 11"],
      color: ["Black", "White", "Solar Red", "Blue"],
      image: "/images/products/adidas-ultraboost.jpg",
      rating: 4.6,
      reviews: 198,
      discount: 18,
      technology: ["Boost", "Primeknit"],
      season: ["All Season"],
      activity: ["Running", "Walking"]
    },
    {
      id: 6,
      name: "Adidas Trefoil Hoodie",
      price: 69.99,
      originalPrice: 89.99,
      category: "Sportswear",
      type: "Hoodie",
      size: ["S", "M", "L", "XL", "XXL"],
      color: ["Black", "Gray", "Navy", "Green"],
      image: "/images/products/adidas-hoodie.jpg",
      rating: 4.4,
      reviews: 124,
      discount: 22,
      technology: ["Cotton Blend", "Fleece Lining"],
      season: ["Fall", "Winter"],
      activity: ["Casual", "Lifestyle"]
    }
  ],
  zara: [
    {
      id: 7,
      name: "Zara Basic T-Shirt",
      price: 15.99,
      originalPrice: 22.99,
      category: "Clothing",
      type: "T-Shirt",
      size: ["XS", "S", "M", "L", "XL"],
      color: ["White", "Black", "Gray", "Navy", "Beige"],
      image: "/images/products/zara-tshirt.jpg",
      rating: 4.2,
      reviews: 267,
      discount: 30,
      technology: ["Cotton"],
      season: ["All Season"],
      activity: ["Casual", "Everyday"]
    },
    {
      id: 8,
      name: "Zara Denim Jacket",
      price: 59.99,
      originalPrice: 79.99,
      category: "Clothing",
      type: "Jacket",
      size: ["XS", "S", "M", "L", "XL"],
      color: ["Light Blue", "Dark Blue", "Black"],
      image: "/images/products/zara-jacket.jpg",
      rating: 4.5,
      reviews: 89,
      discount: 25,
      technology: ["Denim", "Cotton"],
      season: ["Spring", "Fall"],
      activity: ["Casual", "Fashion"]
    }
  ]
};

export default function BrandPage() {
  const params = useParams();
  const brandId = params.brand;
  
  const [brand, setBrand] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Brand-specific filters
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedTechnology, setSelectedTechnology] = useState("all");
  const [selectedSeason, setSelectedSeason] = useState("all");
  const [selectedActivity, setSelectedActivity] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [sortOption, setSortOption] = useState("popularity");
  
  // Get unique filter options from products
  const filterOptions = useMemo(() => {
    if (!products.length) return {};
    
    const categories = [...new Set(products.map(p => p.category))];
    const types = [...new Set(products.map(p => p.type))];
    const technologies = [...new Set(products.flatMap(p => p.technology))];
    const seasons = [...new Set(products.flatMap(p => p.season))];
    const activities = [...new Set(products.flatMap(p => p.activity))];
    
    return { categories, types, technologies, seasons, activities };
  }, [products]);

  // Load brand data
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const brandData = brandsData[brandId];
      const brandProductsData = brandProducts[brandId] || [];
      
      setBrand(brandData);
      setProducts(brandProductsData);
      setFilteredProducts(brandProductsData);
      setIsLoading(false);
    }, 500);
  }, [brandId]);

  // Apply filters
  useEffect(() => {
    if (!products.length) return;
    
    let result = [...products];
    
    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Type filter
    if (selectedType !== "all") {
      result = result.filter(product => product.type === selectedType);
    }
    
    // Technology filter
    if (selectedTechnology !== "all") {
      result = result.filter(product => product.technology.includes(selectedTechnology));
    }
    
    // Season filter
    if (selectedSeason !== "all") {
      result = result.filter(product => product.season.includes(selectedSeason));
    }
    
    // Activity filter
    if (selectedActivity !== "all") {
      result = result.filter(product => product.activity.includes(selectedActivity));
    }
    
    // Price range filter
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Sort products
    switch (sortOption) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => b.id - a.id);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'popularity':
      default:
        result.sort((a, b) => b.reviews - a.reviews);
        break;
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, selectedType, selectedTechnology, selectedSeason, selectedActivity, priceRange, sortOption, products]);

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedType("all");
    setSelectedTechnology("all");
    setSelectedSeason("all");
    setSelectedActivity("all");
    setPriceRange([0, 300]);
    setSortOption("popularity");
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-sm ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Brand Not Found</h2>
          <p className="text-gray-600 mb-4">The brand you're looking for doesn't exist.</p>
          <Link href="/brands" className="text-yellow-600 hover:text-yellow-700 font-medium">
            Browse All Brands
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Brand Banner */}
      <div className="relative h-64 md:h-80 bg-gradient-to-r from-gray-900 to-gray-800">
        <Image
          src={brand.banner}
          alt={brand.name}
          fill
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex items-center gap-6">
              {/* Brand Logo */}
              <div className="bg-white rounded-2xl p-4 shadow-lg">
                <div className="relative w-20 h-20 md:w-24 md:h-24">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              
              {/* Brand Info */}
              <div className="text-white">
                <h1 className="text-3xl md:text-5xl font-bold mb-2">{brand.name}</h1>
                <p className="text-lg md:text-xl text-gray-200 max-w-2xl">{brand.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link href="/brands" className="text-gray-500 hover:text-gray-700">
                Brands
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium">{brand.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Brand Info Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-4">
              {/* Brand Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">About {brand.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{brand.fullDescription}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Founded:</span>
                    <span className="text-gray-900 font-medium">{brand.founded}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Headquarters:</span>
                    <span className="text-gray-900 font-medium">{brand.headquarters}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Category:</span>
                    <span className="text-gray-900 font-medium">{brand.category}</span>
                  </div>
                </div>

                {/* Social Media */}
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3">Follow {brand.name}</h4>
                  <div className="flex gap-3">
                    {Object.entries(brand.socialMedia).map(([platform, handle]) => (
                      <a
                        key={platform}
                        href={`https://${platform}.com/${handle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors"
                        title={`Follow on ${platform}`}
                      >
                        <span className="text-sm">📱</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Brand Website */}
                <a
                  href={brand.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-yellow-400 text-black text-center font-semibold py-2 rounded-lg hover:bg-yellow-500 transition-colors"
                >
                  Visit Official Website
                </a>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="lg:col-span-3">
            {/* Filters and Sort Header */}
            <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {brand.name} Products ({filteredProducts.length})
                  </h2>
                  <p className="text-gray-600">Exclusive collection from {brand.name}</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <button
                    onClick={clearFilters}
                    className="text-sm text-yellow-600 hover:text-yellow-700 font-medium"
                  >
                    Clear Filters
                  </button>
                  
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                  >
                    <option value="popularity">Sort by: Popularity</option>
                    <option value="rating">Sort by: Highest Rating</option>
                    <option value="price-low">Sort by: Price Low to High</option>
                    <option value="price-high">Sort by: Price High to Low</option>
                    <option value="newest">Sort by: Newest</option>
                  </select>
                </div>
              </div>

              {/* Brand-specific Filters */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                  >
                    <option value="all">All Categories</option>
                    {filterOptions.categories?.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                  >
                    <option value="all">All Types</option>
                    {filterOptions.types?.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Technology Filter */}
                {filterOptions.technologies?.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Technology</label>
                    <select
                      value={selectedTechnology}
                      onChange={(e) => setSelectedTechnology(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                    >
                      <option value="all">All Technologies</option>
                      {filterOptions.technologies.map(tech => (
                        <option key={tech} value={tech}>{tech}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Season Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Season</label>
                  <select
                    value={selectedSeason}
                    onChange={(e) => setSelectedSeason(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                  >
                    <option value="all">All Seasons</option>
                    {filterOptions.seasons?.map(season => (
                      <option key={season} value={season}>{season}</option>
                    ))}
                  </select>
                </div>

                {/* Activity Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Activity</label>
                  <select
                    value={selectedActivity}
                    onChange={(e) => setSelectedActivity(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                  >
                    <option value="all">All Activities</option>
                    {filterOptions.activities?.map(activity => (
                      <option key={activity} value={activity}>{activity}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <div className="flex gap-4 items-center">
                  <input
                    type="range"
                    min="0"
                    max="300"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="flex-1"
                  />
                  <input
                    type="range"
                    min="0"
                    max="300"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <Link key={product.id} href={`/products/${product.id}`}>
                    <div className="bg-white rounded-2xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300">
                      {/* Product Image */}
                      <div className="relative h-48">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        
                        {/* Discount Badge */}
                        <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                          -{product.discount}%
                        </div>
                        
                        {/* Brand Badge */}
                        <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs">
                          {brand.name}
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 line-clamp-1 mb-1">{product.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{product.type}</p>
                        
                        {/* Technology Tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {product.technology.slice(0, 2).map(tech => (
                            <span key={tech} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                              {tech}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-gray-900">${product.price}</span>
                            <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            {renderStars(product.rating)}
                            <span className="text-sm text-gray-600">({product.reviews})</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl shadow-md">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters to see more results</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}