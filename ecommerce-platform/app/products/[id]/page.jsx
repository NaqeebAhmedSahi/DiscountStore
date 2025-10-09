// app/products/[id]/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch } from "../../../lib/hooks/redux";
import { addToCart } from "../../../lib/store/cartSlice";
import { showSuccessToast } from "../../../lib/utils/toast";

// Fetch store data
const fetchStoreData = async () => {
  try {
    const response = await fetch('/data/store.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching store data:', error);
    return { products: [], reviews: [], relatedProducts: {} };
  }
};

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id;
  const dispatch = useAppDispatch();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Load product data
  useEffect(() => {
    const loadProductData = async () => {
      setIsLoading(true);
      const storeData = await fetchStoreData();
      
      // Find the product by ID
      const foundProduct = storeData.products.find(p => p.id === parseInt(productId));
      if (foundProduct) {
        setProduct(foundProduct);
        
        // Set default size and color if available
        if (foundProduct.size && foundProduct.size.length > 0) {
          setSelectedSize(foundProduct.size[0]);
        }
        if (foundProduct.colors && foundProduct.colors.length > 0) {
          setSelectedColor(foundProduct.colors[0].name || foundProduct.colors[0]);
        } else if (foundProduct.color && foundProduct.color.length > 0) {
          setSelectedColor(foundProduct.color[0]);
        }
        
        // Get reviews for this product
        const productReviews = storeData.reviews.filter(r => r.productId === parseInt(productId));
        setReviews(productReviews);
        
        // Get related products
        const relatedIds = storeData.relatedProducts[productId] || [];
        const related = storeData.products.filter(p => relatedIds.includes(p.id));
        setRelatedProducts(related);
      }
      
      setIsLoading(false);
    };
    
    if (productId) {
      loadProductData();
    }
  }, [productId]);

  const handleAddToCart = async () => {
    if (!product) return;
    
    setIsAddingToCart(true);
    
    try {
      // For products that require size/color selection but none is selected
      const finalSize = selectedSize || (product.size && product.size.length > 0 ? product.size[0] : 'One Size');
      const finalColor = selectedColor || (product.colors && product.colors.length > 0 ? 
        (product.colors[0].name || product.colors[0]) : 
        (product.color && product.color.length > 0 ? product.color[0] : 'Default'));
      
      // Add to cart using Redux
      dispatch(addToCart({
        product: {
          ...product,
          // Ensure we have the main image for cart display
          image: product.images ? product.images[0] : product.image
        },
        selectedSize: finalSize,
        selectedColor: finalColor,
        quantity: quantity
      }));
      
      // Show success message
      showSuccessToast("", product.name);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
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

  // Show loading state
  if (isLoading) {
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

  // Show not found if product doesn't exist
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Product not found</h3>
            <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
            <Link
              href="/products"
              className="px-6 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Check if add to cart button should be disabled
  const isAddToCartDisabled = !product.inStock || isAddingToCart;

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
                  src={product.images ? product.images[selectedImage] : product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Discount Badge */}
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  -{product.discount}% OFF
                </div>
                
                {/* New Badge */}
                {product.isNew && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    NEW
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
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
            )}
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
            {product.description && (
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Color: {selectedColor || "Select color"}</h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => {
                    const colorName = typeof color === 'string' ? color : color.name;
                    const colorValue = typeof color === 'string' ? color : color.value;
                    
                    return (
                      <button
                        key={colorName}
                        onClick={() => setSelectedColor(colorName)}
                        className={`w-12 h-12 rounded-full border-2 transition-all ${
                          selectedColor === colorName ? 'border-yellow-400 ring-2 ring-yellow-200' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: colorValue }}
                        title={colorName}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.size && product.size.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Size: {selectedSize || "Select size"}</h3>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {product.size.map((size) => (
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
            )}

            {/* Quantity and Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-4 py-3 font-medium min-w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={isAddToCartDisabled}
                className="flex-1 bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-500 
                         disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {isAddingToCart ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                    Adding...
                  </>
                ) : !product.inStock ? (
                  "Out of Stock"
                ) : (
                  <>
                    🛒 Add to Cart
                  </>
                )}
              </button>
            </div>

            {/* Product Features */}
            {product.features && product.features.length > 0 && (
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
            )}

            {/* Additional Info */}
            <div className="text-sm text-gray-500 space-y-1">
              {product.sku && (
                <div className="flex justify-between">
                  <span>SKU:</span>
                  <span>{product.sku}</span>
                </div>
              )}
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
                {product.longDescription ? (
                  <p className="text-gray-600 leading-relaxed">{product.longDescription}</p>
                ) : product.description ? (
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                ) : (
                  <p className="text-gray-600">No description available for this product.</p>
                )}
                
                {product.features && product.features.length > 0 && (
                  <>
                    <h4 className="font-semibold text-gray-900 mt-6 mb-3">Why You'll Love It:</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-600">
                          <span className="text-green-500">✓</span> {feature}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.specifications ? (
                  Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="font-medium text-gray-600">{key}:</span>
                      <span className="text-gray-900">{value}</span>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2">
                    <p className="text-gray-600">No specifications available for this product.</p>
                  </div>
                )}
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
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
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
                    ))
                  ) : (
                    <p className="text-gray-600 text-center py-4">No reviews yet. Be the first to review this product!</p>
                  )}
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
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              🔥 Related <span className="text-yellow-500">Products</span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/products/${relatedProduct.id}`}>
                  <div className="bg-white rounded-2xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300">
                    <div className="relative h-48">
                      <Image
                        src={relatedProduct.images ? relatedProduct.images[0] : relatedProduct.image}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                        -{relatedProduct.discount}%
                      </div>
                      {relatedProduct.isNew && (
                        <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                          NEW
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 line-clamp-1 mb-1">{relatedProduct.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{relatedProduct.brand}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-gray-900">${relatedProduct.price}</span>
                          <span className="text-sm text-gray-500 line-through">${relatedProduct.originalPrice}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-400">★</span>
                          <span className="text-sm text-gray-600">{relatedProduct.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}