// app/brands/[brand]/page.jsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Function to fetch store data
const fetchStoreData = async () => {
  try {
    const response = await fetch('/data/store.json');
    if (!response.ok) {
      throw new Error('Failed to fetch store data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching store data:', error);
    return null;
  }
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
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");
  const [selectedFeature, setSelectedFeature] = useState("all");
  const [selectedGender, setSelectedGender] = useState("all");
  const [selectedActivity, setSelectedActivity] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [sortOption, setSortOption] = useState("popularity");
  
  // Get unique filter options from products
  const filterOptions = useMemo(() => {
    if (!products.length) return {};
    
    const categories = [...new Set(products.map(p => p.category))];
    const subcategories = [...new Set(products.map(p => p.subcategory))];
    const features = [...new Set(products.flatMap(p => p.features || []))];
    const activities = [...new Set(products.flatMap(p => p.activity || []))];
    const genders = [...new Set(products.flatMap(p => p.gender || []))];
    
    return { categories, subcategories, features, activities, genders };
  }, [products]);

  // Load brand data
  useEffect(() => {
    const loadBrandData = async () => {
      setIsLoading(true);
      
      try {
        const storeData = await fetchStoreData();
        
        if (storeData) {
          // Find brand data
          const brandData = storeData.brands.find(brand => brand.id === brandId);
          
          // Filter products by brand
          const brandProductsData = storeData.products.filter(product => product.brand === brandData?.name);
          
          setBrand(brandData);
          setProducts(brandProductsData);
          setFilteredProducts(brandProductsData);
        } else {
          // Fallback if data fetch fails
          setBrand(null);
          setProducts([]);
          setFilteredProducts([]);
        }
      } catch (error) {
        console.error('Error loading brand data:', error);
        setBrand(null);
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadBrandData();
  }, [brandId]);

  // Apply filters
  useEffect(() => {
    if (!products.length) return;
    
    let result = [...products];
    
    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Subcategory filter
    if (selectedSubcategory !== "all") {
      result = result.filter(product => product.subcategory === selectedSubcategory);
    }
    
    // Feature filter
    if (selectedFeature !== "all") {
      result = result.filter(product => product.features && product.features.includes(selectedFeature));
    }
    
    // Gender filter
    if (selectedGender !== "all") {
      result = result.filter(product => product.gender && product.gender.includes(selectedGender));
    }
    
    // Activity filter
    if (selectedActivity !== "all") {
      result = result.filter(product => product.activity && product.activity.includes(selectedActivity));
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
      case 'discount':
        result.sort((a, b) => b.discount - a.discount);
        break;
      case 'popularity':
      default:
        result.sort((a, b) => b.reviews - a.reviews);
        break;
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, selectedSubcategory, selectedFeature, selectedGender, selectedActivity, priceRange, sortOption, products]);

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedSubcategory("all");
    setSelectedFeature("all");
    setSelectedGender("all");
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
          src={brand.cover}
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
                <p className="text-gray-600 text-sm leading-relaxed">{brand.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Products:</span>
                    <span className="text-gray-900 font-medium">{brand.productCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Categories:</span>
                    <span className="text-gray-900 font-medium">{brand.categories.join(", ")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Discount Range:</span>
                    <span className="text-gray-900 font-medium">{brand.discountRange}</span>
                  </div>
                </div>

                {/* Brand Categories */}
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    {brand.categories.map(category => (
                      <span key={category} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
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

                {/* Subcategory Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
                  <select
                    value={selectedSubcategory}
                    onChange={(e) => setSelectedSubcategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                  >
                    <option value="all">All Subcategories</option>
                    {filterOptions.subcategories?.map(subcategory => (
                      <option key={subcategory} value={subcategory}>{subcategory}</option>
                    ))}
                  </select>
                </div>

                {/* Feature Filter */}
                {filterOptions.features?.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Feature</label>
                    <select
                      value={selectedFeature}
                      onChange={(e) => setSelectedFeature(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                    >
                      <option value="all">All Features</option>
                      {filterOptions.features.map(feature => (
                        <option key={feature} value={feature}>{feature}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Gender Filter */}
                {filterOptions.genders?.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select
                      value={selectedGender}
                      onChange={(e) => setSelectedGender(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                    >
                      <option value="all">All Genders</option>
                      {filterOptions.genders.map(gender => (
                        <option key={gender} value={gender}>{gender}</option>
                      ))}
                    </select>
                  </div>
                )}

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
                        <p className="text-gray-600 text-sm mb-2">{product.subcategory}</p>
                        
                        {/* Feature Tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {product.features && product.features.slice(0, 2).map(feature => (
                            <span key={feature} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                              {feature}
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