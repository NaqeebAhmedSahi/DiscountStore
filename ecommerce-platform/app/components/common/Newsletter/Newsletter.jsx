// components/common/Newsletter/Newsletter.jsx
"use client";

export default function Newsletter() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400/20 rounded-full animate-float"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-pink-400/20 rounded-full animate-float delay-300"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-400/20 rounded-full animate-float delay-500"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        {/* Title */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-white">
            📩 Stay Updated with <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">Exclusive Deals</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed">
            Join our newsletter and never miss out on the hottest discounts from top brands. 
            Get early access to flash sales and exclusive offers.
          </p>
        </div>

        {/* Signup Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="relative w-full sm:w-2/3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-yellow-400/50 transition-all duration-300 text-lg"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <button
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-black font-bold rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-lg"
            >
              Subscribe Now
            </button>
          </form>

          {/* Features */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-200">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-yellow-400">✓</span>
              <span>Weekly deals</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-yellow-400">✓</span>
              <span>Early access</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-yellow-400">✓</span>
              <span>No spam</span>
            </div>
          </div>
        </div>

        {/* Small note */}
        <p className="mt-8 text-sm text-gray-200">
          We care about your privacy. Unsubscribe anytime. <span className="text-yellow-300">Join 50,000+ subscribers!</span>
        </p>
      </div>
    </section>
  );
}
