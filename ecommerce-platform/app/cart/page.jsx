// app/cart/page.jsx
"use client";
import Header from "../components/common/Header/Header";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "../../lib/hooks/redux";
import { 
  selectCartItems, 
  selectCartSummary, 
  updateQuantity, 
  removeFromCart, 
  clearCart 
} from "../../lib/store/cartSlice";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const cartSummary = useAppSelector(selectCartSummary);
  
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  // Calculate totals with promo
  const subtotal = cartSummary.subtotal;
  const shipping = cartSummary.shipping;
  const tax = cartSummary.tax;
  const discount = promoApplied ? subtotal * 0.1 : 0; // 10% discount
  const total = subtotal + shipping + tax - discount;

  // Update quantity
  const handleUpdateQuantity = (cartItemId, newQuantity) => {
    dispatch(updateQuantity({ cartItemId, quantity: newQuantity }));
  };

  // Remove item from cart
  const handleRemoveItem = (cartItemId) => {
    dispatch(removeFromCart(cartItemId));
  };

  // Clear cart
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // Apply promo code
  const applyPromoCode = () => {
    setPromoError("");
    const validPromoCodes = ["SAVE10", "DISCOUNT15", "WELCOME20"];
    
    if (validPromoCodes.includes(promoCode.toUpperCase())) {
      setPromoApplied(true);
    } else {
      setPromoError("Invalid promo code. Try SAVE10, DISCOUNT15, or WELCOME20");
    }
  };

  // Clear promo code
  const clearPromoCode = () => {
    setPromoCode("");
    setPromoApplied(false);
    setPromoError("");
  };

  // Remove the localStorage effect since Redux handles persistence

  return (
    <>
      {/* <Header /> */}
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              🛒 Shopping <span className="text-yellow-500">Cart</span>
            </h1>
            <p className="text-gray-600 mt-2">Review your items and proceed to checkout</p>
          </div>

          {cartItems.length === 0 ? (
            // Empty Cart State
            <div className="text-center py-16">
              <div className="text-6xl mb-4">😔</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h3>
              <p className="text-gray-600 mb-8">Start shopping to add items to your cart</p>
              <Link
                href="/products"
                className="px-8 py-3 bg-yellow-400 text-black font-semibold rounded-2xl hover:bg-yellow-500 transition-colors inline-block"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items Section */}
              <div className="lg:w-2/3">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  {/* Cart Header */}
                  <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Your Items ({cartItems.length})
                    </h2>
                    <Link
                      href="/products"
                      className="text-yellow-600 hover:text-yellow-700 font-medium flex items-center gap-2"
                    >
                      ← Continue Shopping
                    </Link>
                  </div>

                  {/* Cart Items List */}
                  <div className="space-y-6">
                    {cartItems.map((item) => (
                      <div
                        key={item.cartItemId}
                        className="flex flex-col sm:flex-row gap-4 pb-6 border-b border-gray-100 last:border-b-0"
                      >
                        {/* Product Image */}
                        <div className="sm:w-24 sm:h-24 w-full h-48 relative rounded-lg overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                            <div>
                              <h3 className="font-semibold text-gray-900 hover:text-yellow-600 transition-colors">
                                <Link href={`/products/${item.id}`}>
                                  {item.name}
                                </Link>
                              </h3>
                              <p className="text-gray-600 text-sm">{item.brand}</p>
                              
                              {/* Size and Color */}
                              <div className="flex gap-4 mt-2 text-sm text-gray-600">
                                <span>Size: {item.selectedSize}</span>
                                <span>Color: {item.selectedColor}</span>
                              </div>

                              {/* Stock Status */}
                              <div className="mt-1">
                                <span className={`text-sm font-medium ${
                                  item.inStock ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {item.inStock ? 'In Stock' : 'Out of Stock'}
                                </span>
                              </div>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <div className="text-lg font-bold text-gray-900">
                                ${(parseFloat(item.price) || 0).toFixed(2)}
                              </div>
                              <div className="text-sm text-gray-500 line-through">
                                ${(parseFloat(item.originalPrice) || 0).toFixed(2)}
                              </div>
                            </div>
                          </div>

                          {/* Quantity Controls and Remove */}
                          <div className="flex justify-between items-center mt-4">
                            {/* Quantity Adjuster */}
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-medium text-gray-700">Quantity:</span>
                              <div className="flex items-center border border-gray-300 rounded-lg">
                                <button
                                  onClick={() => handleUpdateQuantity(item.cartItemId, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-l-lg"
                                >
                                  −
                                </button>
                                <span className="px-4 py-1 text-gray-900 font-medium min-w-[50px] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => handleUpdateQuantity(item.cartItemId, item.quantity + 1)}
                                  disabled={item.quantity >= item.maxQuantity}
                                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-r-lg"
                                >
                                  +
                                </button>
                              </div>
                              <span className="text-xs text-gray-500">
                                Max: {item.maxQuantity}
                              </span>
                            </div>

                            {/* Remove Button */}
                            <button
                              onClick={() => handleRemoveItem(item.cartItemId)}
                              className="text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
                            >
                              <span>🗑️</span>
                              Remove
                            </button>
                          </div>

                          {/* Item Total */}
                          <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                            <span className="text-sm text-gray-600">Item Total:</span>
                            <span className="font-semibold text-gray-900">
                              ${(item.totalPrice || (parseFloat(item.price) || 0) * (item.quantity || 1)).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Cart Actions */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-6 pt-6 border-t border-gray-200">
                    <button
                      onClick={handleClearCart}
                      className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Clear Cart
                    </button>
                    <Link
                      href="/products"
                      className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors text-center"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>

              {/* Price Summary Section */}
              <div className="lg:w-1/3">
                <div className="bg-white rounded-2xl shadow-md p-6 sticky top-4">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

                  {/* Price Breakdown */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({cartSummary.itemCount} items)</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    
                    <div className="flex justify-between text-gray-600">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>

                    {/* Discount */}
                    {promoApplied && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount (10%)</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  {/* Promo Code Section */}
                  <div className="mb-6">
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        disabled={promoApplied}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:bg-gray-100"
                      />
                      {promoApplied ? (
                        <button
                          onClick={clearPromoCode}
                          className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors"
                        >
                          Remove
                        </button>
                      ) : (
                        <button
                          onClick={applyPromoCode}
                          className="px-4 py-2 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                        >
                          Apply
                        </button>
                      )}
                    </div>
                    {promoError && (
                      <p className="text-red-500 text-sm mt-1">{promoError}</p>
                    )}
                    {!promoApplied && (
                      <p className="text-gray-500 text-xs mt-1">
                        Try: SAVE10, DISCOUNT15, WELCOME20
                      </p>
                    )}
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center text-lg font-bold border-t border-gray-200 pt-4 mb-6">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  {/* Checkout Button */}
                  <button className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-lg hover:bg-yellow-500 transition-colors mb-4">
                    Proceed to Checkout
                  </button>

                  {/* Security Badges */}
                  <div className="text-center">
                    <div className="flex justify-center gap-4 mb-2">
                      <span className="text-2xl">🔒</span>
                      <span className="text-2xl">🛡️</span>
                      <span className="text-2xl">✓</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      100% Secure Checkout · SSL Encrypted · Money Back Guarantee
                    </p>
                  </div>

                  {/* Additional Benefits */}
                  <div className="mt-6 space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Free shipping on orders over $100</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>30-day money-back guarantee</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Secure payment processing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Recently Viewed / Recommended Products */}
          {cartItems.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">You Might Also Like</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Recommended Product 1 */}
                <div className="bg-white rounded-2xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48">
                    <Image
                      src="/images/products/shoe-2.jpg"
                      alt="Basketball Sneakers"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                      -25%
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-1">Basketball Sneakers</h4>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg font-bold text-gray-900">$119.99</span>
                      <span className="text-sm text-gray-500 line-through">$159.99</span>
                    </div>
                    <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                      Add to Cart
                    </button>
                  </div>
                </div>

                {/* Recommended Product 2 */}
                <div className="bg-white rounded-2xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48">
                    <Image
                      src="/images/products/pants-1.jpg"
                      alt="Yoga Pants"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                      -30%
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-1">Yoga Pants</h4>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg font-bold text-gray-900">$34.99</span>
                      <span className="text-sm text-gray-500 line-through">$49.99</span>
                    </div>
                    <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                      Add to Cart
                    </button>
                  </div>
                </div>

                {/* Recommended Product 3 */}
                <div className="bg-white rounded-2xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48">
                    <Image
                      src="/images/products/wallet-1.jpg"
                      alt="Leather Wallet"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                      -33%
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-1">Leather Wallet</h4>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg font-bold text-gray-900">$59.99</span>
                      <span className="text-sm text-gray-500 line-through">$89.99</span>
                    </div>
                    <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                      Add to Cart
                    </button>
                  </div>
                </div>

                {/* Recommended Product 4 */}
                <div className="bg-white rounded-2xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48">
                    <Image
                      src="/images/products/shirt-1.jpg"
                      alt="Men's Casual Shirt"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                      -33%
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-1">Men's Casual Shirt</h4>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg font-bold text-gray-900">$39.99</span>
                      <span className="text-sm text-gray-500 line-through">$59.99</span>
                    </div>
                    <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}