// components/common/Header/Header.jsx
"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
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
    "flex items-center justify-center rounded-2xl transition-colors focus:outline-none cursor-pointer";

  const variants = {
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
    solid: "bg-indigo-600 hover:bg-indigo-700 text-white",
  };

  const sizes = {
    icon: "p-2 w-10 h-10",
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
  };

  // During SSR, render a non-interactive element that visually matches the button
  // but keep accessibility attributes so it behaves like a button to assistive tech.
  if (!isClient) {
    return (
      <div
        role="button"
        tabIndex={0}
        aria-hidden={true}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]}`}
      >
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
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const router = useRouter();
  
  // Redux state
  const cartItemCount = useAppSelector(selectCartItemCount);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  // Close search on outside click or Escape
  useEffect(() => {
    if (!searchOpen) return;

    function handleDocClick(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    }

    function handleEsc(e) {
      if (e.key === "Escape") setSearchOpen(false);
    }

    document.addEventListener("mousedown", handleDocClick);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleDocClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [searchOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const q = (searchQuery || "").trim();
    if (q) {
      router.push(`/products?search=${encodeURIComponent(q)}`);
    } else {
      router.push(`/products`);
    }
    setSearchOpen(false);
    setSearchQuery("");
  };

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
          {/* Search: toggles to show input */}
          <div ref={searchRef} className="relative">
            {!searchOpen ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                aria-label="Open search"
              >
                <Search className="w-5 h-5" />
              </Button>
            ) : (
              <form onSubmit={handleSearchSubmit} className="flex items-center bg-gray-100 rounded-full px-2">
                <input
                  ref={inputRef}
                  aria-label="Search products"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, brands, categories..."
                  className="bg-transparent outline-none px-3 py-2 w-40 md:w-64 text-sm"
                />
                <button type="submit" className="p-2 text-gray-700" aria-label="Search">
                  <Search className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                  className="p-2 text-gray-500 hover:text-gray-700"
                  aria-label="Close search"
                >
                  ✕
                </button>
              </form>
            )}
          </div>
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