// components/common/Newsletter/Newsletter.jsx
"use client";

export default function Newsletter() {
  return (
    <section className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
      <div className="max-w-3xl mx-auto text-center px-6">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          📩 Stay Updated with <span className="text-yellow-300">Exclusive Deals</span>
        </h2>
        <p className="text-lg md:text-xl mb-8 text-gray-100">
          Join our newsletter and never miss out on the hottest discounts from top brands.
        </p>

        {/* Signup Form */}
        <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-2/3 px-5 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-full shadow-lg transition-all duration-300"
          >
            Subscribe
          </button>
        </form>

        {/* Small note */}
        <p className="mt-6 text-sm text-gray-200">
          We care about your privacy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
