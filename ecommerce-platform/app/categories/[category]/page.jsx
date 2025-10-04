// app/categories/[category]/page.jsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Mock category data
const categoriesData = {
  "shoes-sneakers": {
    id: "shoes-sneakers",
    name: "Shoes & Sneakers",
    banner: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1920&h=600&fit=crop&crop=center",
    description: "Step up your style with our premium footwear collection",
    longDescription: "Discover the perfect pair for every occasion. From running shoes to casual sneakers, formal footwear to athletic performance, our curated collection features the latest styles from top brands at unbeatable prices.",
    icon: "👟",
    featuredBrands: ["Nike", "Adidas", "Jordan", "Puma", "New Balance"],
    subcategories: ["Running", "Basketball", "Casual", "Formal", "Sports", "Sandals"],
    popularSizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
    careTips: ["Use shoe trees to maintain shape", "Clean with appropriate products", "Rotate between pairs for longevity"]
  },
  "womens-fashion": {
    id: "womens-fashion",
    name: "Women's Fashion",
    banner: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=600&fit=crop&crop=center",
    description: "Express your style with trendy women's clothing",
    longDescription: "Explore our extensive collection of women's fashion featuring the latest trends in dresses, tops, bottoms, and accessories. From casual everyday wear to elegant evening outfits, find pieces that reflect your unique personality.",
    icon: "👚",
    featuredBrands: ["Zara", "H&M", "Forever 21", "Mango", "Uniqlo"],
    subcategories: ["Dresses", "Tops", "Bottoms", "Outerwear", "Activewear", "Accessories"],
    popularSizes: ["S", "M", "L", "XL"],
    careTips: ["Follow washing instructions carefully", "Store properly to maintain shape", "Use gentle detergents for delicate fabrics"]
  },
  "luxury-bags": {
    id: "luxury-bags",
    name: "Luxury Bags",
    banner: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1920&h=600&fit=crop&crop=center",
    description: "Elevate your style with premium luxury bags",
    longDescription: "Indulge in our exquisite collection of luxury bags from renowned designers. From handbags to backpacks, clutches to totes, each piece combines superior craftsmanship with timeless elegance.",
    icon: "👜",
    featuredBrands: ["Michael Kors", "Coach", "Kate Spade", "Fossil", "Guess"],
    subcategories: ["Handbags", "Backpacks", "Clutches", "Totes", "Crossbody", "Travel"],
    popularSizes: ["Small", "Medium", "Large", "One Size"],
    careTips: ["Store in dust bags when not in use", "Avoid overloading to maintain shape", "Clean with specialized leather products"]
  },
  "sportswear": {
    id: "sportswear",
    name: "Sportswear",
    banner: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1920&h=600&fit=crop&crop=center",
    description: "Performance gear for active lifestyles",
    longDescription: "Achieve your fitness goals with our high-performance sportswear collection. Designed for comfort, mobility, and style, our activewear features advanced technologies to enhance your workout experience.",
    icon: "🏃‍♀️",
    featuredBrands: ["Nike", "Adidas", "Under Armour", "Lululemon", "Reebok"],
    subcategories: ["Training", "Running", "Yoga", "Gym", "Outdoor", "Swim"],
    popularSizes: ["S", "M", "L", "XL", "XXL"],
    careTips: ["Wash after each use", "Use mild detergents", "Avoid fabric softeners", "Air dry when possible"]
  },
  "watches": {
    id: "watches",
    name: "Watches",
    banner: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1920&h=600&fit=crop&crop=center",
    description: "Timeless elegance for every wrist",
    longDescription: "Discover our curated selection of watches that blend precision engineering with sophisticated design. From classic analog to smart watches, find the perfect timepiece to complement your style.",
    icon: "⌚",
    featuredBrands: ["Casio", "Fossil", "Seiko", "Citizen", "Timex"],
    subcategories: ["Analog", "Digital", "Smart", "Sports", "Luxury", "Chronograph"],
    popularSizes: ["38mm", "40mm", "42mm", "44mm", "Adjustable"],
    careTips: ["Avoid water exposure unless waterproof", "Clean with soft cloth", "Service regularly", "Store in watch boxes"]
  },
  "mens-clothing": {
    id: "mens-clothing",
    name: "Men's Clothing",
    banner: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=600&fit=crop&crop=center",
    description: "Modern styles for the contemporary man",
    longDescription: "Upgrade your wardrobe with our collection of men's clothing that combines style, comfort, and quality. From formal wear to casual essentials, find pieces that work for every occasion.",
    icon: "👔",
    featuredBrands: ["H&M", "Uniqlo", "Tommy Hilfiger", "Calvin Klein", "Levi's"],
    subcategories: ["Shirts", "Pants", "Outerwear", "Activewear", "Formal", "Accessories"],
    popularSizes: ["S", "M", "L", "XL", "XXL"],
    careTips: ["Iron at appropriate temperatures", "Follow care labels", "Store on hangers when possible"]
  }
};

// Mock products by category
const categoryProducts = {
  "shoes-sneakers": [
    {
      id: 1,
      name: "Nike Air Max 270",
      price: 149.99,
      originalPrice: 189.99,
      brand: "Nike",
      subcategory: "Running",
      size: ["US 8", "US 9", "US 10", "US 11", "US 12"],
      color: ["Black", "White", "Blue", "Red"],
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop&crop=center",
      rating: 4.7,
      reviews: 289,
      discount: 21,
      features: ["Air Cushioning", "Breathable Mesh", "Lightweight"],
      gender: ["Men", "Women"],
      activity: ["Running", "Walking", "Training"]
    },
    {
      id: 2,
      name: "Adidas Ultraboost 22",
      price: 179.99,
      originalPrice: 219.99,
      brand: "Adidas",
      subcategory: "Running",
      size: ["US 8", "US 9", "US 10", "US 11"],
      color: ["Black", "White", "Solar Red"],
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop&crop=center",
      rating: 4.6,
      reviews: 198,
      discount: 18,
      features: ["Boost Technology", "Primeknit Upper", "Continental Rubber"],
      gender: ["Men", "Women"],
      activity: ["Running", "Walking"]
    },
    {
      id: 3,
      name: "Jordan Air 1",
      price: 129.99,
      originalPrice: 159.99,
      brand: "Jordan",
      subcategory: "Casual",
      size: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
      color: ["Black/Red", "White/Black", "Chicago"],
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop&crop=center",
      rating: 4.8,
      reviews: 432,
      discount: 19,
      features: ["Air-Sole Unit", "Leather Upper", "Iconic Design"],
      gender: ["Men", "Women"],
      activity: ["Casual", "Lifestyle"]
    },
    {
      id: 4,
      name: "Puma RS-X",
      price: 99.99,
      originalPrice: 129.99,
      brand: "Puma",
      subcategory: "Casual",
      size: ["US 8", "US 9", "US 10", "US 11"],
      color: ["White", "Black", "Blue", "Green"],
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=800&fit=crop&crop=center",
      rating: 4.4,
      reviews: 156,
      discount: 23,
      features: ["RS Cushioning", "Chunky Design", "Comfortable"],
      gender: ["Men", "Women"],
      activity: ["Casual", "Walking"]
    },
    {
      id: 5,
      name: "New Balance 574",
      price: 89.99,
      originalPrice: 119.99,
      brand: "New Balance",
      subcategory: "Sports",
      size: ["US 8", "US 9", "US 10", "US 11", "US 12"],
      color: ["Gray", "Navy", "Maroon"],
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop&crop=center",
      rating: 4.5,
      reviews: 267,
      discount: 25,
      features: ["ENCAP Technology", "Suede Upper", "Durable"],
      gender: ["Men", "Women"],
      activity: ["Walking", "Casual", "Light Sports"]
    },
    {
      id: 6,
      name: "Formal Leather Oxford",
      price: 199.99,
      originalPrice: 259.99,
      brand: "Cole Haan",
      subcategory: "Formal",
      size: ["US 8", "US 9", "US 10", "US 11"],
      color: ["Black", "Brown", "Oxblood"],
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=800&fit=crop&crop=center",
      rating: 4.6,
      reviews: 89,
      discount: 23,
      features: ["Genuine Leather", "Goodyear Welt", "Comfort Insole"],
      gender: ["Men"],
      activity: ["Formal", "Business"]
    }
  ],
  "womens-fashion": [
    {
      id: 7,
      name: "Summer Floral Dress",
      price: 49.99,
      originalPrice: 79.99,
      brand: "Zara",
      subcategory: "Dresses",
      size: ["XS", "S", "M", "L", "XL"],
      color: ["Floral", "Blue", "Pink", "Yellow"],
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=800&fit=crop&crop=center",
      rating: 4.5,
      reviews: 156,
      discount: 38,
      features: ["Cotton Blend", "A-Line Cut", "Knee Length"],
      gender: ["Women"],
      season: ["Spring", "Summer"],
      occasion: ["Casual", "Party", "Beach"]
    }
    // ... more products for other categories
  ]
};

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.category;
  
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Category-specific filters
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 500]);
  const [selectedGender, setSelectedGender] = useState("all");
  const [selectedActivity, setSelectedActivity] = useState("all");
  const [sortOption, setSortOption] = useState("popularity");
  
  // Get unique filter options from products
  const filterOptions = useMemo(() => {
    if (!products.length) return {};
    
    const brands = [...new Set(products.map(p => p.brand))];
    const sizes = [...new Set(products.flatMap(p => p.size))];
    const colors = [...new Set(products.flatMap(p => p.color))];
    const subcategories = [...new Set(products.map(p => p.subcategory))];
    const genders = [...new Set(products.flatMap(p => p.gender))];
    const activities = [...new Set(products.flatMap(p => p.activity || []))];
    const features = [...new Set(products.flatMap(p => p.features || []))];
    
    return { brands, sizes, colors, subcategories, genders, activities, features };
  }, [products]);

  // Load category data
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const categoryData = categoriesData[categoryId];
      const categoryProductsData = categoryProducts[categoryId] || [];
      
      setCategory(categoryData);
      setProducts(categoryProductsData);
      setFilteredProducts(categoryProductsData);
      setIsLoading(false);
    }, 500);
  }, [categoryId]);

  // Apply filters
  useEffect(() => {
    if (!products.length) return;
    
    let result = [...products];
    
    // Subcategory filter
    if (selectedSubcategory !== "all") {
      result = result.filter(product => product.subcategory === selectedSubcategory);
    }
    
    // Brand filter
    if (selectedBrands.length > 0) {
      result = result.filter(product => selectedBrands.includes(product.brand));
    }
    
    // Size filter
    if (selectedSizes.length > 0) {
      result = result.filter(product => 
        product.size.some(size => selectedSizes.includes(size))
      );
    }
    
    // Color filter
    if (selectedColors.length > 0) {
      result = result.filter(product => 
        product.color.some(color => selectedColors.includes(color))
      );
    }
    
    // Gender filter
    if (selectedGender !== "all") {
      result = result.filter(product => product.gender.includes(selectedGender));
    }
    
    // Activity filter
    if (selectedActivity !== "all" && filterOptions.activities.length > 0) {
      result = result.filter(product => 
        product.activity && product.activity.includes(selectedActivity)
      );
    }
    
    // Price range filter
    result = result.filter(product => 
      product.price >= selectedPriceRange[0] && product.price <= selectedPriceRange[1]
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
  }, [
    selectedSubcategory, selectedBrands, selectedSizes, selectedColors, 
    selectedGender, selectedActivity, selectedPriceRange, sortOption, products, filterOptions.activities
  ]);

  const handleBrandChange = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleSizeChange = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleColorChange = (color) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const clearFilters = () => {
    setSelectedSubcategory("all");
    setSelectedBrands([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedGender("all");
    setSelectedActivity("all");
    setSelectedPriceRange([0, 500]);
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

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Category Not Found</h2>
          <p className="text-gray-600 mb-4">The category you're looking for doesn't exist.</p>
          <Link href="/categories" className="text-yellow-600 hover:text-yellow-700 font-medium">
            Browse All Categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Banner */}
      <div className="relative h-64 md:h-80 bg-gradient-to-r from-gray-900 to-gray-800">
        <Image
          src={category.banner}
          alt={category.name}
          fill
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
            <div className="text-6xl mb-4">{category.icon}</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{category.name}</h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">{category.description}</p>
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
              <Link href="/categories" className="text-gray-500 hover:text-gray-700">
                Categories
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium">{category.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-yellow-600 hover:text-yellow-700 font-medium"
                >
                  Clear All
                </button>
              </div>

              {/* Subcategory Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Subcategory</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="subcategory"
                      value="all"
                      checked={selectedSubcategory === "all"}
                      onChange={(e) => setSelectedSubcategory(e.target.value)}
                      className="text-yellow-500 focus:ring-yellow-400"
                    />
                    <span className="ml-2 text-gray-700">All {category.name}</span>
                  </label>
                  {category.subcategories.map(subcat => (
                    <label key={subcat} className="flex items-center">
                      <input
                        type="radio"
                        name="subcategory"
                        value={subcat}
                        checked={selectedSubcategory === subcat}
                        onChange={(e) => setSelectedSubcategory(e.target.value)}
                        className="text-yellow-500 focus:ring-yellow-400"
                      />
                      <span className="ml-2 text-gray-700">{subcat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              {filterOptions.brands.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Brand</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {filterOptions.brands.map(brand => (
                      <label key={brand} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => handleBrandChange(brand)}
                          className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-400"
                        />
                        <span className="ml-2 text-gray-700">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Filter */}
              {filterOptions.sizes.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Size</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {filterOptions.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => handleSizeChange(size)}
                        className={`px-2 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedSizes.includes(size)
                            ? 'bg-yellow-400 text-black'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Filter */}
              {filterOptions.colors.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Color</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {filterOptions.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => handleColorChange(color)}
                        className={`px-2 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedColors.includes(color)
                            ? 'bg-yellow-400 text-black'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Gender Filter */}
              {filterOptions.genders.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Gender</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="all"
                        checked={selectedGender === "all"}
                        onChange={(e) => setSelectedGender(e.target.value)}
                        className="text-yellow-500 focus:ring-yellow-400"
                      />
                      <span className="ml-2 text-gray-700">All Genders</span>
                    </label>
                    {filterOptions.genders.map(gender => (
                      <label key={gender} className="flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          value={gender}
                          checked={selectedGender === gender}
                          onChange={(e) => setSelectedGender(e.target.value)}
                          className="text-yellow-500 focus:ring-yellow-400"
                        />
                        <span className="ml-2 text-gray-700">{gender}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Activity Filter */}
              {filterOptions.activities.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Activity</h4>
                  <select
                    value={selectedActivity}
                    onChange={(e) => setSelectedActivity(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                  >
                    <option value="all">All Activities</option>
                    {filterOptions.activities.map(activity => (
                      <option key={activity} value={activity}>{activity}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Price Range Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">
                  Price: ${selectedPriceRange[0]} - ${selectedPriceRange[1]}
                </h4>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={selectedPriceRange[0]}
                    onChange={(e) => setSelectedPriceRange([parseInt(e.target.value), selectedPriceRange[1]])}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={selectedPriceRange[1]}
                    onChange={(e) => setSelectedPriceRange([selectedPriceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Category Info */}
            <div className="bg-white rounded-2xl shadow-md p-6 mt-6">
              <h3 className="font-semibold text-gray-900 mb-4">About {category.name}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{category.longDescription}</p>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-900 text-sm mb-2">Featured Brands</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.featuredBrands.map(brand => (
                      <span key={brand} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 text-sm mb-2">Care Tips</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {category.careTips.map((tip, index) => (
                      <li key={index}>• {tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="lg:col-span-3">
            {/* Header with Sort */}
            <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {category.name} ({filteredProducts.length} products)
                  </h2>
                  <p className="text-gray-600">Discover amazing {category.name.toLowerCase()} at discounted prices</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                  >
                    <option value="popularity">Popularity</option>
                    <option value="rating">Highest Rating</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="discount">Highest Discount</option>
                    <option value="newest">Newest</option>
                  </select>
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
                        
                        {/* Subcategory Badge */}
                        <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs">
                          {product.subcategory}
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 line-clamp-1 mb-1">{product.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{product.brand}</p>
                        
                        {/* Features Tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {product.features.slice(0, 2).map(feature => (
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