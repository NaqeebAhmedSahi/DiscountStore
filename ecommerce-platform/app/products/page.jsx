// app/products/page.jsx
"use client";
import Header from "../components/common/Header/Header";
import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Mock product data - in real app, this would come from an API
const mockProducts = [
  {
    id: 1,
    name: "Premium Running Shoes",
    price: 89.99,
    originalPrice: 129.99,
    category: "Shoes & Sneakers",
    brand: "Nike",
    size: ["US 8", "US 9", "US 10", "US 11"],
    color: ["Black", "White", "Blue"],
    image: "/images/products/shoe-1.jpg",
    rating: 4.5,
    reviews: 124,
    isNew: true,
    discount: 30
  },
  {
    id: 2,
    name: "Designer Handbag",
    price: 199.99,
    originalPrice: 299.99,
    category: "Luxury Bags",
    brand: "Michael Kors",
    size: ["One Size"],
    color: ["Brown", "Black", "Red"],
    image: "/images/products/bag-1.jpg",
    rating: 4.8,
    reviews: 89,
    isNew: false,
    discount: 33
  },
  {
    id: 3,
    name: "Sports Watch",
    price: 149.99,
    originalPrice: 199.99,
    category: "Watches",
    brand: "Casio",
    size: ["Regular", "Large"],
    color: ["Black", "Silver", "Blue"],
    image: "/images/products/watch-1.jpg",
    rating: 4.3,
    reviews: 67,
    isNew: true,
    discount: 25
  },
  {
    id: 4,
    name: "Summer Dress",
    price: 49.99,
    originalPrice: 79.99,
    category: "Women's Fashion",
    brand: "Zara",
    size: ["S", "M", "L", "XL"],
    color: ["Red", "Yellow", "Blue", "White"],
    image: "/images/products/dress-1.jpg",
    rating: 4.6,
    reviews: 156,
    isNew: false,
    discount: 37
  },
  {
    id: 5,
    name: "Men's Casual Shirt",
    price: 39.99,
    originalPrice: 59.99,
    category: "Men's Clothing",
    brand: "H&M",
    size: ["S", "M", "L", "XL", "XXL"],
    color: ["White", "Blue", "Gray", "Black"],
    image: "/images/products/shirt-1.jpg",
    rating: 4.2,
    reviews: 203,
    isNew: true,
    discount: 33
  },
  {
    id: 6,
    name: "Yoga Pants",
    price: 34.99,
    originalPrice: 49.99,
    category: "Sportswear",
    brand: "Adidas",
    size: ["XS", "S", "M", "L", "XL"],
    color: ["Black", "Gray", "Purple"],
    image: "/images/products/pants-1.jpg",
    rating: 4.7,
    reviews: 178,
    isNew: false,
    discount: 30
  },
  {
    id: 7,
    name: "Basketball Sneakers",
    price: 119.99,
    originalPrice: 159.99,
    category: "Shoes & Sneakers",
    brand: "Jordan",
    size: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    color: ["Red", "Black", "White"],
    image: "/images/products/shoe-2.jpg",
    rating: 4.9,
    reviews: 234,
    isNew: true,
    discount: 25
  },
  {
    id: 8,
    name: "Leather Wallet",
    price: 59.99,
    originalPrice: 89.99,
    category: "Luxury Bags",
    brand: "Fossil",
    size: ["One Size"],
    color: ["Brown", "Black"],
    image: "/images/products/wallet-1.jpg",
    rating: 4.4,
    reviews: 92,
    isNew: false,
    discount: 33
  }
];

const categories = ["All", "Shoes & Sneakers", "Women's Fashion", "Luxury Bags", "Sportswear", "Watches", "Men's Clothing"];
const brands = ["Nike", "Adidas", "Zara", "H&M", "Michael Kors", "Casio", "Jordan", "Fossil"];
const sizes = ["XS", "S", "M", "L", "XL", "XXL", "US 7", "US 8", "US 9", "US 10", "US 11", "US 12", "Regular", "Large", "One Size"];
const colors = ["Black", "White", "Blue", "Red", "Brown", "Gray", "Silver", "Yellow", "Purple"];

// Products Content Component (separated to use useSearchParams)
function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [products, setProducts] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [sortOption, setSortOption] = useState('popularity');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 300]);
  
  const productsPerPage = 8;

  // Update URL parameters
  const updateSearchParams = (updates) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  // Filter and sort products
  useEffect(() => {
    setIsLoading(true);
    
    let result = [...products];
    
    // Search filter
    if (searchQuery) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Category filter
    if (selectedCategories.length > 0 && !selectedCategories.includes('All')) {
      result = result.filter(product => selectedCategories.includes(product.category));
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
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'popularity':
      default:
        result.sort((a, b) => b.rating - a.rating);
        break;
    }
    
    setFilteredProducts(result);
    setIsLoading(false);
  }, [searchQuery, selectedCategories, selectedBrands, selectedSizes, selectedColors, priceRange, sortOption, products]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return filteredProducts.slice(startIndex, startIndex + productsPerPage);
  }, [filteredProducts, currentPage, productsPerPage]);

  // Handle filter changes
  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
    setCurrentPage(1);
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
    setCurrentPage(1);
  };

  const handleSizeChange = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
    setCurrentPage(1);
  };

  const handleColorChange = (color) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    updateSearchParams({ search: searchQuery });
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, 300]);
    setSearchQuery('');
    setSortOption('popularity');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            🛍️ All <span className="text-yellow-500">Products</span>
          </h1>
          <p className="text-gray-600 mt-2">Discover our amazing collection of discounted brand items</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search products, brands, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                🔍
              </button>
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-2xl hover:bg-yellow-500 transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <div className="lg:w-1/4">
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

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-400"
                      />
                      <span className="ml-2 text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Brand</h4>
                <div className="space-y-2">
                  {brands.map(brand => (
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

              {/* Size Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Size</h4>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => handleSizeChange(size)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
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

              {/* Color Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Color</h4>
                <div className="grid grid-cols-3 gap-2">
                  {colors.map(color => (
                    <button
                      key={color}
                      onClick={() => handleColorChange(color)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
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

              {/* Price Range Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="300"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="300"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Sort and Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <p className="text-gray-600">
                Showing {filteredProducts.length} products
                {searchQuery && ` for "${searchQuery}"`}
              </p>
              
              <div className="flex items-center gap-4">
                <label htmlFor="sort" className="text-gray-700 font-medium">Sort by:</label>
                <select
                  id="sort"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  <option value="popularity">Popularity</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
              </div>
            )}

            {/* Products Grid */}
            {!isLoading && (
              <>
                {currentProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {currentProducts.map(product => (
                      <div
                        key={product.id}
                        className="bg-white rounded-2xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300"
                      >
                        <Link href={`/product/${product.id}`}>
                          <div className="relative">
                            {/* Product Image */}
                            <div className="w-full h-48 relative">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            
                            {/* Discount Badge */}
                            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                              -{product.discount}%
                            </div>
                            
                            {/* New Badge */}
                            {product.isNew && (
                              <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                                NEW
                              </div>
                            )}
                            
                            {/* Quick View Overlay */}
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                              <button className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white text-black px-4 py-2 rounded-full font-semibold">
                                Quick View
                              </button>
                            </div>
                          </div>

                          {/* Product Info */}
                          <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
                              <span className="text-yellow-500">⭐ {product.rating}</span>
                            </div>
                            
                            <p className="text-gray-600 text-sm mb-2">{product.brand}</p>
                            
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-lg font-bold text-gray-900">${product.price}</span>
                              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                            </div>
                            
                            <div className="flex justify-between items-center text-sm text-gray-500">
                              <span>{product.reviews} reviews</span>
                              <span className="text-green-600">In Stock</span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">😔</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
                    <button
                      onClick={clearFilters}
                      className="px-6 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-12">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg font-medium ${
                          currentPage === page
                            ? 'bg-yellow-400 text-black'
                            : 'border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading component for Suspense fallback
function ProductsLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
        </div>
      </div>
    </div>
  );
}

// Main Page Component with Suspense boundary
export default function ProductsPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<ProductsLoading />}>
        <ProductsContent />
      </Suspense>
    </>
  );
}