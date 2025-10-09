// components/common/Header/Header.jsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCart, User, Search, Menu } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../../../../lib/hooks/redux";
import { selectCartItemCount, openCart } from "../../../../lib/store/cartSlice";

// Custom Button with client-side detection
function Button({ children, onClick, variant = "ghost", size = "icon" }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const baseStyles =
    "flex items-center justify-center rounded-2xl transition-colors focus:outline-none";

  const variants = {
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
    solid: "bg-indigo-600 hover:bg-indigo-700 text-white",
  };

  const sizes = {
    icon: "p-2 w-10 h-10",
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
  };

  // During SSR, render a div that matches the button structure
  if (!isClient) {
    return (
      <div className={`${baseStyles} ${variants[variant]} ${sizes[size]}`}>
        {children}
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]}`}
    >
      {children}
    </button>
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  // Redux state
  const cartItemCount = useAppSelector(selectCartItemCount);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCartClick = () => {
    dispatch(openCart());
    // Navigate to cart page
    window.location.href = '/cart';
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-wide text-gray-900 hover:text-indigo-600"
        >
          DiscountStore
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/products"
            className="text-gray-700 hover:text-indigo-600 font-medium"
          >
            Products
          </Link>
          <Link
            href="/categories"
            className="text-gray-700 hover:text-indigo-600 font-medium"
          >
            Categories
          </Link>
          <Link
            href="/brands"
            className="text-gray-700 hover:text-indigo-600 font-medium"
          >
            Brands
          </Link>
          <Link
            href="/partners"
            className="text-gray-700 hover:text-indigo-600 font-medium"
          >
            Partner with Us
          </Link>
          <Link
            href="/about"
            className="text-gray-700 hover:text-indigo-600 font-medium"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-gray-700 hover:text-indigo-600 font-medium"
          >
            Contact
          </Link>
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Search className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleCartClick}>
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </div>
          </Button>
          <Button variant="ghost" size="icon">
            <User className="w-5 h-5" />
          </Button>

          {/* Mobile Menu Toggle */}
          {!isClient ? (
            <div className="md:hidden text-gray-800 hover:text-indigo-600">
              <Menu className="w-6 h-6" />
            </div>
          ) : (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-800 hover:text-indigo-600"
            >
              <Menu className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-gray-50 border-t border-gray-200 p-4 space-y-3">
          <Link
            href="/products"
            className="block text-gray-700 hover:text-indigo-600 font-medium"
          >
            Products
          </Link>
          <Link
            href="/categories"
            className="block text-gray-700 hover:text-indigo-600 font-medium"
          >
            Categories
          </Link>
          <Link
            href="/brands"
            className="block text-gray-700 hover:text-indigo-600 font-medium"
          >
            Brands
          </Link>
          <Link
            href="/partners"
            className="block text-gray-700 hover:text-indigo-600 font-medium"
          >
            Partner with Us
          </Link>
          <Link
            href="/about"
            className="block text-gray-700 hover:text-indigo-600 font-medium"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="block text-gray-700 hover:text-indigo-600 font-medium"
          >
            Contact
          </Link>
          <button
            onClick={handleCartClick}
            className="w-full text-left text-gray-700 hover:text-indigo-600 font-medium flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Cart ({cartItemCount})
          </button>
        </div>
      )}
    </header>
  );
}