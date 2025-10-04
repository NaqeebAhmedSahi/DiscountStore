// components/common/Header/Header.jsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, User, Search, Menu } from "lucide-react";

// Simple Button component (local to this file)
function Button({ children, onClick, variant = "ghost", size = "icon" }) {
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
            brands
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
          <Button variant="ghost" size="icon">
            <ShoppingCart className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="w-5 h-5" />
          </Button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-800 hover:text-indigo-600"
          >
            <Menu className="w-6 h-6" />
          </button>
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
            href="/deals"
            className="block text-gray-700 hover:text-indigo-600 font-medium"
          >
            Deals
          </Link>
          <Link
            href="/about"
            className="block text-gray-700 hover:text-indigo-600 font-medium"
          >
            About
          </Link>
        </div>
      )}
    </header>
  );
}
