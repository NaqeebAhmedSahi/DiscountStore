// app/contact/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "general"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactMethods = [
    {
      icon: "📧",
      title: "Email Us",
      description: "Send us an email anytime",
      details: "support@brandhub.com",
      link: "mailto:support@brandhub.com",
      buttonText: "Send Email"
    },
    {
      icon: "📞",
      title: "Call Us",
      description: "Mon-Fri from 9am to 6pm",
      details: "+1 (555) 123-4567",
      link: "tel:+15551234567",
      buttonText: "Call Now"
    },
    {
      icon: "💬",
      title: "Live Chat",
      description: "Get instant help online",
      details: "Available 24/7",
      link: "#live-chat",
      buttonText: "Start Chat"
    },
    {
      icon: "📍",
      title: "Visit Us",
      description: "Our headquarters",
      details: "123 Commerce St, City, State 12345",
      link: "https://maps.google.com",
      buttonText: "Get Directions"
    }
  ];

  const faqItems = [
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-7 business days. Express shipping is available for 1-2 business days delivery."
    },
    {
      question: "Can I return products from different brands together?",
      answer: "Yes! We offer unified returns. You can return products from multiple brands in one package using our simplified return process."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Currently we ship within the United States. We're working on expanding internationally soon!"
    },
    {
      question: "How do I track my order?",
      answer: "You'll receive a tracking link via email and SMS. You can also check order status in your account dashboard."
    },
    {
      question: "Are the discounts real compared to brand websites?",
      answer: "Absolutely! We negotiate exclusive deals with brands, often offering better prices than their own websites."
    },
    {
      question: "Can I modify or cancel my order?",
      answer: "Orders can be modified or cancelled within 1 hour of placement. Contact us immediately if you need changes."
    }
  ];

  const departments = [
    {
      name: "Customer Support",
      email: "support@brandhub.com",
      phone: "+1 (555) 123-4501",
      description: "Order issues, returns, and general inquiries"
    },
    {
      name: "Sales & Partnerships",
      email: "sales@brandhub.com",
      phone: "+1 (555) 123-4502",
      description: "Brand partnerships and bulk orders"
    },
    {
      name: "Technical Support",
      email: "tech@brandhub.com",
      phone: "+1 (555) 123-4503",
      description: "Website issues and account problems"
    },
    {
      name: "Press & Media",
      email: "press@brandhub.com",
      phone: "+1 (555) 123-4504",
      description: "Media inquiries and partnerships"
    }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after success
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        category: "general"
      });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="max-w-md mx-auto text-center bg-white rounded-2xl shadow-lg p-8">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Message Sent Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for contacting us. We'll get back to you within 24 hours.
          </p>
          <div className="space-y-3">
            <Link 
              href="/"
              className="block w-full bg-yellow-400 text-black font-semibold py-3 rounded-lg hover:bg-yellow-500 transition-colors"
            >
              Continue Shopping
            </Link>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="block w-full border-2 border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:border-gray-400 transition-colors"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-purple-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Get in <span className="text-yellow-400">Touch</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            We're here to help! Contact us for any questions about our platform, 
            products, or your shopping experience.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Contact Methods Grid */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{method.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{method.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{method.description}</p>
                <p className="text-gray-900 font-semibold mb-4">{method.details}</p>
                <a 
                  href={method.link}
                  className="inline-block bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold text-sm hover:bg-yellow-500 transition-colors"
                >
                  {method.buttonText}
                </a>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h2>
                <p className="text-gray-600">We typically respond within 2 hours during business hours</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      required
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="order">Order Support</option>
                      <option value="returns">Returns & Refunds</option>
                      <option value="technical">Technical Support</option>
                      <option value="partnership">Brand Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      placeholder="Brief subject line"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
                    placeholder="Please describe your inquiry in detail..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-yellow-400 text-black font-bold py-4 rounded-lg hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      📨 Send Message
                    </>
                  )}
                </button>

                <p className="text-center text-sm text-gray-500">
                  By contacting us, you agree to our{" "}
                  <Link href="/privacy" className="text-yellow-600 hover:text-yellow-700">
                    Privacy Policy
                  </Link>
                </p>
              </form>
            </div>

            {/* Departments Contact */}
            <div className="mt-8 bg-white rounded-2xl shadow-md p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Specific Departments</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {departments.map((dept, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-yellow-400 transition-colors">
                    <h4 className="font-semibold text-gray-900 mb-2">{dept.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{dept.description}</p>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <span>📧</span>
                        <a href={`mailto:${dept.email}`} className="text-yellow-600 hover:text-yellow-700">
                          {dept.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>📞</span>
                        <a href={`tel:${dept.phone}`} className="text-gray-700 hover:text-gray-900">
                          {dept.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <div className="bg-white rounded-2xl shadow-md p-8 sticky top-4">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {faqItems.map((faq, index) => (
                  <details key={index} className="group">
                    <summary className="flex justify-between items-center cursor-pointer list-none p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <span className="font-medium text-gray-900 text-sm">{faq.question}</span>
                      <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-sm text-gray-600 bg-white rounded-b-lg">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>

              {/* Quick Help */}
              <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-gray-900 mb-2">Quick Help</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Check our help center for instant answers to common questions.
                </p>
                <Link 
                  href="/help"
                  className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-700 font-semibold text-sm"
                >
                  Visit Help Center →
                </Link>
              </div>

              {/* Business Hours */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Business Hours</h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday:</span>
                    <span className="font-medium">9:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday:</span>
                    <span className="font-medium">10:00 AM - 4:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday:</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
              </div>

              {/* Emergency Support */}
              <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-900 mb-2">Urgent Order Issues</h4>
                <p className="text-sm text-red-700 mb-3">
                  For urgent order problems, call our priority support line:
                </p>
                <a 
                  href="tel:+15551234567"
                  className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold text-sm"
                >
                  🚨 +1 (555) 123-URGENT
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Map & Location Section */}
        <section className="mt-16 bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Visit Our Headquarters</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="font-semibold text-gray-900">BrandHub Commerce Center</p>
                    <p className="text-gray-600">123 Commerce Street, Suite 500</p>
                    <p className="text-gray-600">San Francisco, CA 94105</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⏰</span>
                  <div>
                    <p className="font-semibold text-gray-900">Visiting Hours</p>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
                    <p className="text-gray-600">By appointment only</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🅿️</span>
                  <div>
                    <p className="font-semibold text-gray-900">Parking Information</p>
                    <p className="text-gray-600">Complimentary parking available</p>
                    <p className="text-gray-600">Underground garage access</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex gap-4">
                <a 
                  href="https://maps.google.com"
                  className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
                >
                  Get Directions
                </a>
                <button className="border-2 border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:border-gray-400 transition-colors">
                  Schedule Visit
                </button>
              </div>
            </div>
            
            <div className="bg-gray-200 min-h-64 lg:min-h-0 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="text-6xl mb-4">🗺️</div>
                <p className="text-gray-600">Interactive Map</p>
                <p className="text-sm text-gray-500">Location map would be embedded here</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}