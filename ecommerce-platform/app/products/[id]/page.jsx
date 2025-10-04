// app/products/[id]/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Mock data - in real app, this would come from an API
const mockProduct = {
  id: 1,
  name: "Premium Running Shoes",
  price: 89.99,
  originalPrice: 129.99,
  discount: 30,
  category: "Shoes & Sneakers",
  brand: "Nike",
  description: "Experience ultimate comfort and performance with our premium running shoes. Designed for serious runners who demand the best in cushioning, support, and durability.",
  longDescription: `
    These premium running shoes are engineered with cutting-edge technology to provide exceptional performance. 
    Features include advanced cushioning system for maximum impact absorption, breathable mesh upper for optimal airflow, 
    and durable rubber outsole for superior traction on all surfaces. Perfect for long-distance running, training, or everyday wear.
  `,
  images: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop&crop=center"
  ],
  sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
  colors: [
    { name: "Black", value: "#000000" },
    { name: "White", value: "#FFFFFF" },
    { name: "Blue", value: "#2563EB" },
    { name: "Red", value: "#DC2626" }
  ],
  rating: 4.5,
  reviews: 124,
  inStock: true,
  stockQuantity: 15,
  features: [
    "Advanced cushioning technology",
    "Breathable mesh upper",
    "Durable rubber outsole",
    "Lightweight design",
    "Moisture-wicking lining"
  ],
  specifications: {
    "Material": "Mesh, Rubber, Synthetic",
    "Weight": "280g (per shoe)",
    "Closure": "Lace-up",
    "Heel Height": "30mm",
    "Forefoot Height": "20mm",
    "Drop": "10mm",
    "Water Resistance": "No"
  },
  sku: "NK-RS-2024-BLK"
};

const relatedProducts = [
  {
    id: 2,
    name: "Basketball Sneakers",
    price: 119.99,
    originalPrice: 159.99,
    category: "Shoes & Sneakers",
    brand: "Jordan",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop&crop=center",
    rating: 4.9,
    discount: 25
  },
  {
    id: 3,
    name: "Casual Walking Shoes",
    price: 69.99,
    originalPrice: 99.99,
    category: "Shoes & Sneakers",
    brand: "Skechers",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=800&fit=crop&crop=center",
    rating: 4.3,
    discount: 30
  },
  {
    id: 4,
    name: "Trail Running Shoes",
    price: 94.99,
    originalPrice: 139.99,
    category: "Shoes & Sneakers",
    brand: "Salomon",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop&crop=center",
    rating: 4.7,
    discount: 32
  }
];

const reviews = [
  {
    id: 1,
    user: "John D.",
    rating: 5,
    date: "2024-01-15",
    title: "Best running shoes ever!",
    comment: "These shoes are incredibly comfortable. I've run 100 miles in them and they still feel great. The cushioning is perfect for my long runs.",
    verified: true
  },
  {
    id: 2,
    user: "Sarah M.",
    rating: 4,
    date: "2024-01-10",
    title: "Great quality, runs small",
    comment: "Love the shoes but had to exchange for a half size larger. Once I got the right size, they were perfect for my training.",
    verified: true
  },
  {
    id: 3,
    user: "Mike T.",
    rating: 5,
    date: "2024-01-05",
    title: "Worth every penny",
    comment: "The discount made these an incredible deal. Quality is top-notch and they look amazing. My go-to running shoes now.",
    verified: false
  }
];

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id;
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // In real app, fetch product data based on ID
  const product = mockProduct;
  const related = relatedProducts;

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Add to cart logic here
    console.log('Added to cart:', {
      productId: product.id,
      size: selectedSize,
      color: selectedColor,
      quantity
    });
    
    setIsAddingToCart(false);
    
    // Show success message (you could use a toast notification)
    alert('Product added to cart successfully!');
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-lg ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <Link href="/products" className="text-gray-500 hover:text-gray-700">
                Products
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link href={`/products?category=${product.category}`} className="text-gray-500 hover:text-gray-700">
                {product.category}
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="relative h-96 md:h-[500px]">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Discount Badge */}
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  -{product.discount}% OFF
                </div>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`bg-white rounded-xl shadow-sm overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-yellow-400' : 'border-transparent'
                  }`}
                >
                  <div className="relative h-20">
                    <Image
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand and Category */}
            <div>
              <span className="text-sm text-gray-500 uppercase tracking-wide">
                {product.brand} • {product.category}
              </span>
              
              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-3 mt-3">
                {renderStars(product.rating)}
                <span className="text-gray-600">({product.reviews} reviews)</span>
                {product.inStock ? (
                  <span className="text-green-600 font-medium">In Stock</span>
                ) : (
                  <span className="text-red-600 font-medium">Out of Stock</span>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-gray-900">${product.price}</span>
              <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
              <span className="bg-red-100 text-red-600 px-2 py-1 rounded-md text-sm font-bold">
                Save ${(product.originalPrice - product.price).toFixed(2)}
              </span>
            </div>

            {/* Short Description */}
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Color Selection */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Color: {selectedColor || "Select color"}</h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-12 h-12 rounded-full border-2 transition-all ${
                      selectedColor === color.name ? 'border-yellow-400 ring-2 ring-yellow-200' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Size: {selectedSize || "Select size"}</h3>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 px-2 rounded-lg border transition-all font-medium ${
                      selectedSize === size
                        ? 'bg-yellow-400 text-black border-yellow-400'
                        : 'bg-white border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-gray-600 hover:text-gray-900"
                >
                  -
                </button>
                <span className="px-4 py-3 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-gray-600 hover:text-gray-900"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock || !selectedSize || !selectedColor || isAddingToCart}
                className="flex-1 bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-500 
                         disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {isAddingToCart ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                    Adding...
                  </>
                ) : (
                  <>
                    🛒 Add to Cart
                  </>
                )}
              </button>
            </div>

            {/* Product Features */}
            <div className="bg-gray-100 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-green-500">✓</span> {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Additional Info */}
            <div className="text-sm text-gray-500 space-y-1">
              <div className="flex justify-between">
                <span>SKU:</span>
                <span>{product.sku}</span>
              </div>
              <div className="flex justify-between">
                <span>Category:</span>
                <span>{product.category}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>Free shipping worldwide</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="bg-white rounded-2xl shadow-md mb-16">
          {/* Tab Headers */}
          <div className="border-b border-gray-200">
            <nav className="flex flex-wrap">
              {[
                { id: "description", label: "Description" },
                { id: "specifications", label: "Specifications" },
                { id: "reviews", label: `Reviews (${reviews.length})` },
                { id: "shipping", label: "Shipping & Returns" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-yellow-400 text-yellow-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "description" && (
              <div className="prose max-w-none">
                <p className="text-gray-600 leading-relaxed">{product.longDescription}</p>
                
                <h4 className="font-semibold text-gray-900 mt-6 mb-3">Why You'll Love It:</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600">
                      <span className="text-green-500">✓</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="font-medium text-gray-600">{key}:</span>
                    <span className="text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                {/* Review Summary */}
                <div className="flex items-center gap-8 bg-gray-50 rounded-lg p-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900">{product.rating}</div>
                    <div className="flex justify-center mt-1">{renderStars(product.rating)}</div>
                    <div className="text-sm text-gray-600 mt-1">{product.reviews} reviews</div>
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center gap-3">
                        <span className="text-sm text-gray-600 w-8">{stars} stars</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-yellow-400 h-2 rounded-full" 
                            style={{ width: `${(stars / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{review.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            {renderStars(review.rating)}
                            <span className="text-sm text-gray-600">by {review.user}</span>
                            {review.verified && (
                              <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                                Verified Purchase
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>

                {/* Add Review Button */}
                <button className="bg-yellow-400 text-black font-semibold py-2 px-6 rounded-lg hover:bg-yellow-500 transition-colors">
                  Write a Review
                </button>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Shipping Information</h4>
                  <p className="text-gray-600">
                    Free standard shipping worldwide. Orders typically ship within 1-2 business days. 
                    Delivery times vary by location but generally take 3-7 business days.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Returns Policy</h4>
                  <p className="text-gray-600">
                    We offer a 30-day return policy. Items must be in original condition with tags attached. 
                    Return shipping is free for all returns.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            🔥 Related <span className="text-yellow-500">Products</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <div className="bg-white rounded-2xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                      -{product.discount}%
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 line-clamp-1 mb-1">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{product.brand}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-900">${product.price}</span>
                        <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm text-gray-600">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}