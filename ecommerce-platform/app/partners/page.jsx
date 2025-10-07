"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

export default function PartnersPage() {
  const [formState, setFormState] = useState({
    company: "",
    contactName: "",
    email: "",
    website: "",
    apiAccess: "Yes",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const brands = useMemo(() => {
    try {
      // Dynamic import of static JSON at runtime (client).
      // Using require ensures it bundles the JSON.
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const data = require("../../public/data/store.json");
      return data?.brands ?? [];
    } catch (e) {
      return [];
    }
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // For now, just simulate success
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-yellow-300/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-indigo-300/30 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                Partner with DiscountStore
              </h1>
              <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                Join leading brands and platforms that power the best deals online. Our
                API integrations help you reach more customers and convert intent into
                sales with real-time offers.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm">Real-time sync</span>
                <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm">Attribution-ready</span>
                <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm">High-intent audience</span>
              </div>
            </div>
            <div className="bg-white border border-gray-100 shadow-xl rounded-3xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-yellow-400 text-black flex items-center justify-center font-bold">API</div>
                <h3 className="text-xl font-semibold text-gray-900">Integration Overview</h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li>• Products, pricing, and stock via secure endpoints</li>
                <li>• Promotions and discount campaigns with start/end windows</li>
                <li>• Webhooks for order events and performance insights</li>
                <li>• OAuth or key-based auth with granular scopes</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Partner brands grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Our Partners
            </h2>
            <p className="text-gray-600">A selection of brands we integrate with.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {brands.map((b) => (
              <div key={b.id} className="group relative rounded-2xl border border-gray-100 bg-white p-4 hover:shadow-lg transition overflow-hidden">
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-yellow-300/20 rounded-full blur-2xl group-hover:opacity-70" />
                <div className="flex flex-col items-center text-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={b.logo} alt={b.name} className="w-16 h-16 rounded-xl object-cover mb-3" />
                  <div className="font-semibold text-gray-900">{b.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{b.discountRange}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-50 via-white to-purple-50" />
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-10">Why integrate your API with us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm">
              <div className="text-2xl">🚀</div>
              <h3 className="mt-3 font-semibold text-lg text-gray-900">Boosted Reach</h3>
              <p className="mt-2 text-gray-700">Tap into high-intent shoppers browsing across brands and categories.</p>
            </div>
            <div className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm">
              <div className="text-2xl">📊</div>
              <h3 className="mt-3 font-semibold text-lg text-gray-900">Performance Insights</h3>
              <p className="mt-2 text-gray-700">Granular reporting on impressions, clicks, conversions, and AOV.</p>
            </div>
            <div className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm">
              <div className="text-2xl">🔌</div>
              <h3 className="mt-3 font-semibold text-lg text-gray-900">Simple Integration</h3>
              <p className="mt-2 text-gray-700">Flexible auth, clear specs, sandbox testing, and partner success support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Inquiry Form */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-8 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Become a Partner</h2>
            <p className="mt-3 text-gray-700">Tell us about your brand and API access. We’ll get back within 2 business days.</p>
          </div>

          <div className="rounded-3xl border border-gray-100 shadow-xl p-6 md:p-8 bg-gradient-to-br from-white to-gray-50">
            {submitted ? (
              <div className="text-center py-6">
                <div className="text-4xl mb-3">🎉</div>
                <h3 className="text-xl font-semibold text-gray-900">Thanks! We received your request.</h3>
                <p className="mt-2 text-gray-700">Our partnerships team will contact you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <input name="company" value={formState.company} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400" placeholder="Acme Inc." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                    <input name="contactName" value={formState.contactName} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400" placeholder="Jane Doe" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" name="email" value={formState.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400" placeholder="jane@acme.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                    <input name="website" value={formState.website} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400" placeholder="https://acme.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Do you have an API?</label>
                  <select name="apiAccess" value={formState.apiAccess} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400">
                    <option>Yes</option>
                    <option>No</option>
                    <option>In progress</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea name="message" rows={5} value={formState.message} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400" placeholder="Share integration details or goals" />
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="px-6 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black font-semibold transition">
                    Request Partnership
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}


