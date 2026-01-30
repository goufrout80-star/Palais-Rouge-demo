'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Camera, Users, Calendar, CheckCircle, ArrowRight,
  Home, DollarSign, Clock, Award, Phone, Mail
} from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    icon: Phone,
    title: 'Free Consultation',
    description: 'Schedule a call with our experts to discuss your property and goals.'
  },
  {
    icon: Home,
    title: 'Property Valuation',
    description: 'We provide a comprehensive market analysis to determine optimal pricing.'
  },
  {
    icon: Camera,
    title: 'Professional Marketing',
    description: 'High-quality photos, videos, and virtual tours to showcase your property.'
  },
  {
    icon: Users,
    title: 'Buyer Matching',
    description: 'We connect your property with qualified, pre-vetted buyers.'
  },
  {
    icon: Calendar,
    title: 'Viewings & Negotiations',
    description: 'We handle all viewings and negotiate the best terms on your behalf.'
  },
  {
    icon: CheckCircle,
    title: 'Closing & Handover',
    description: 'We manage all paperwork and ensure a smooth closing process.'
  },
];

const benefits = [
  { icon: TrendingUp, value: '15%', label: 'Higher sale prices on average' },
  { icon: Clock, value: '45', label: 'Days average time to sell' },
  { icon: Users, value: '10K+', label: 'Qualified buyers in our network' },
  { icon: Award, value: '98%', label: 'Client satisfaction rate' },
];

export default function SellPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    location: '',
    bedrooms: '',
    timeline: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you! Our team will contact you within 24 hours.');
  };

  return (
    <main className="min-h-screen bg-[#FDFCFA] pt-20">
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-[#1A1A1A] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#8B1538] text-xs tracking-[0.3em] uppercase mb-4 block"
          >
            Sell With Confidence
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-6"
          >
            Sell Your Property<br />for Top Value
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 max-w-2xl mx-auto text-lg mb-8"
          >
            Partner with Morocco's leading luxury real estate experts to maximize
            your property's value and reach qualified buyers worldwide.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <a
              href="#get-started"
              className="px-8 py-4 bg-[#8B1538] text-white font-medium hover:bg-[#6B0F2B] transition-colors"
            >
              Get Free Valuation
            </a>
            <Link
              href="/valuation"
              className="px-8 py-4 border border-white/30 text-white font-medium hover:bg-white/10 transition-colors"
            >
              Instant Estimate
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b border-[#EDE9E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {benefits.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 text-[#8B1538] mx-auto mb-3" />
                <p className="font-display text-3xl text-[#1A1A1A]">{stat.value}</p>
                <p className="text-sm text-[#7D8471]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#8B1538] text-xs tracking-[0.3em] uppercase mb-4 block">
              Our Process
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-[#1A1A1A] mb-4">
              How We Sell Your Property
            </h2>
            <p className="text-[#7D8471] max-w-2xl mx-auto">
              Our streamlined process ensures your property gets maximum exposure
              and sells at the best possible price.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative bg-white border border-[#EDE9E3] p-6 hover:border-[#8B1538] transition-colors"
              >
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#8B1538] text-white flex items-center justify-center font-display text-sm">
                  {idx + 1}
                </div>
                <div className="w-12 h-12 bg-[#F8F6F3] flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-[#8B1538]" />
                </div>
                <h3 className="font-display text-lg text-[#1A1A1A] mb-2">{step.title}</h3>
                <p className="text-sm text-[#7D8471]">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-24 bg-[#F8F6F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#8B1538] text-xs tracking-[0.3em] uppercase mb-4 block">
                Why Palais Rouge
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-[#1A1A1A] mb-6">
                The Luxury Real Estate<br />Experts You Can Trust
              </h2>
              <div className="space-y-4">
                {[
                  'Exclusive network of high-net-worth buyers',
                  'Professional photography and virtual tours',
                  'Strategic pricing backed by market data',
                  'Dedicated agent throughout the process',
                  'International marketing reach',
                  'Transparent communication and reporting',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#8B1538] flex-shrink-0" />
                    <span className="text-[#4A4A4A]">{item}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/agents"
                className="inline-flex items-center gap-2 mt-8 text-[#8B1538] font-medium hover:underline"
              >
                Meet Our Agents
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"
                alt="Luxury property"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-6">
                <p className="text-sm text-[#7D8471] mb-2">Recent Sale</p>
                <p className="font-display text-xl text-[#1A1A1A]">Villa Majorelle</p>
                <p className="text-[#8B1538] font-medium">Sold 12% above asking price</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="get-started" className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#8B1538] text-xs tracking-[0.3em] uppercase mb-4 block">
              Get Started
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-[#1A1A1A] mb-4">
              Request Your Free Valuation
            </h2>
            <p className="text-[#7D8471]">
              Fill out the form below and one of our experts will contact you within 24 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white border border-[#EDE9E3] p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-[#F8F6F3] border border-[#EDE9E3] focus:outline-none focus:border-[#8B1538]"
                />
              </div>
              <div>
                <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-[#F8F6F3] border border-[#EDE9E3] focus:outline-none focus:border-[#8B1538]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-[#F8F6F3] border border-[#EDE9E3] focus:outline-none focus:border-[#8B1538]"
                />
              </div>
              <div>
                <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                  Property Type *
                </label>
                <select
                  required
                  value={formData.propertyType}
                  onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                  className="w-full px-4 py-3 bg-[#F8F6F3] border border-[#EDE9E3] focus:outline-none focus:border-[#8B1538]"
                >
                  <option value="">Select type</option>
                  <option value="villa">Villa</option>
                  <option value="apartment">Apartment</option>
                  <option value="riad">Riad</option>
                  <option value="penthouse">Penthouse</option>
                  <option value="land">Land</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  required
                  placeholder="City, neighborhood"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 bg-[#F8F6F3] border border-[#EDE9E3] focus:outline-none focus:border-[#8B1538]"
                />
              </div>
              <div>
                <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                  Timeline
                </label>
                <select
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full px-4 py-3 bg-[#F8F6F3] border border-[#EDE9E3] focus:outline-none focus:border-[#8B1538]"
                >
                  <option value="">When do you want to sell?</option>
                  <option value="asap">As soon as possible</option>
                  <option value="1-3months">1-3 months</option>
                  <option value="3-6months">3-6 months</option>
                  <option value="6months+">6+ months</option>
                  <option value="just-exploring">Just exploring options</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                Additional Information
              </label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us more about your property..."
                className="w-full px-4 py-3 bg-[#F8F6F3] border border-[#EDE9E3] focus:outline-none focus:border-[#8B1538] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#8B1538] text-white font-medium hover:bg-[#6B0F2B] transition-colors"
            >
              Request Free Valuation
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
