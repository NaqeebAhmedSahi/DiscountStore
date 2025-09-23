// components/common/Footer/Footer.jsx
"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand / About */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">DiscountStore</h2>
          <p className="text-gray-400 mb-6">
            Your one-stop destination for the best discount deals on clothing,
            shoes, and luxury brands. Save more, shop smart!
          </p>

          {/* Socials */}
          <div className="flex gap-4">
            <Link href="#" className="hover:text-yellow-400 transition">
              <Facebook size={22} />
            </Link>
            <Link href="#" className="hover:text-yellow-400 transition">
              <Instagram size={22} />
            </Link>
            <Link href="#" className="hover:text-yellow-400 transition">
              <Twitter size={22} />
            </Link>
            <Link href="#" className="hover:text-yellow-400 transition">
              <Youtube size={22} />
            </Link>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Shop</h3>
          <ul className="space-y-2">
            <li><Link href="/products" className="hover:text-yellow-400">All Products</Link></li>
            <li><Link href="/categories" className="hover:text-yellow-400">Categories</Link></li>
            <li><Link href="/deals" className="hover:text-yellow-400">Deals</Link></li>
            <li><Link href="/brands" className="hover:text-yellow-400">Brands</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
          <ul className="space-y-2">
            <li><Link href="/about" className="hover:text-yellow-400">About Us</Link></li>
            <li><Link href="/careers" className="hover:text-yellow-400">Careers</Link></li>
            <li><Link href="/blog" className="hover:text-yellow-400">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-yellow-400">Contact</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
          <p className="text-gray-400 mb-4">
            Subscribe to get updates on new deals and exclusive discounts.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="submit"
              className="px-5 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center py-6 text-gray-400 text-sm">
        © {new Date().getFullYear()} DiscountStore. All rights reserved.
      </div>
    </footer>
  );
}
