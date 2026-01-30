'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function SearchPage() {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    location: '',
    listingType: '',
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    
    if (formData.location) params.set('city', formData.location);
    if (formData.listingType) params.set('listingType', formData.listingType);
    if (formData.propertyType) params.set('propertyType', formData.propertyType);
    if (formData.minPrice) params.set('minPrice', formData.minPrice);
    if (formData.maxPrice) params.set('maxPrice', formData.maxPrice);
    if (formData.bedrooms) params.set('bedrooms', formData.bedrooms);
    if (formData.bathrooms) params.set('bathrooms', formData.bathrooms);

    router.push(`/properties?${params.toString()}`);
  };

  const quickSearches = [
    { label: 'Houses for Sale', params: 'listingType=BUY&propertyType=HOUSE' },
    { label: 'Apartments for Rent', params: 'listingType=RENT&propertyType=APARTMENT' },
    { label: 'Luxury Villas', params: 'propertyType=VILLA' },
    { label: 'Commercial Spaces', params: 'propertyType=COMMERCIAL' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFA]">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="text-[#7D8471] text-xs tracking-[0.3em] uppercase mb-4 block">Search</span>
            <h1 className="font-display text-4xl md:text-5xl text-[#1A1A1A] mb-4">
              Find Your Property
            </h1>
            <p className="text-lg text-[#4A4A4A] max-w-md mx-auto">
              Search through our curated listings to find your perfect home
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="bg-white border border-[#EDE9E3] p-8 md:p-10">
              {/* Location */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-[#4A4A4A] mb-3">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7D8471]" />
                  <input
                    type="text"
                    placeholder="Enter city or neighborhood"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 bg-[#F8F6F3] border border-[#EDE9E3] text-[#1A1A1A] placeholder:text-[#999] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                  />
                </div>
              </div>

              {/* Listing Type & Property Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-3">
                    Listing Type
                  </label>
                  <select
                    value={formData.listingType}
                    onChange={(e) => setFormData({ ...formData, listingType: e.target.value })}
                    className="w-full px-4 py-4 bg-[#F8F6F3] border border-[#EDE9E3] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                  >
                    <option value="">Any</option>
                    <option value="BUY">Buy</option>
                    <option value="RENT">Rent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-3">
                    Property Type
                  </label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full px-4 py-4 bg-[#F8F6F3] border border-[#EDE9E3] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                  >
                    <option value="">Any</option>
                    <option value="HOUSE">House</option>
                    <option value="APARTMENT">Apartment</option>
                    <option value="VILLA">Villa</option>
                    <option value="COMMERCIAL">Commercial</option>
                    <option value="LAND">Land</option>
                  </select>
                </div>
              </div>

              {/* Price Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-3">
                    Min Price
                  </label>
                  <input
                    type="number"
                    placeholder="No minimum"
                    value={formData.minPrice}
                    onChange={(e) => setFormData({ ...formData, minPrice: e.target.value })}
                    className="w-full px-4 py-4 bg-[#F8F6F3] border border-[#EDE9E3] text-[#1A1A1A] placeholder:text-[#999] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-3">
                    Max Price
                  </label>
                  <input
                    type="number"
                    placeholder="No maximum"
                    value={formData.maxPrice}
                    onChange={(e) => setFormData({ ...formData, maxPrice: e.target.value })}
                    className="w-full px-4 py-4 bg-[#F8F6F3] border border-[#EDE9E3] text-[#1A1A1A] placeholder:text-[#999] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                  />
                </div>
              </div>

              {/* Bedrooms & Bathrooms */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-3">
                    Bedrooms
                  </label>
                  <select
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                    className="w-full px-4 py-4 bg-[#F8F6F3] border border-[#EDE9E3] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                  >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-3">
                    Bathrooms
                  </label>
                  <select
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                    className="w-full px-4 py-4 bg-[#F8F6F3] border border-[#EDE9E3] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                  >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full py-4 bg-[#1A1A1A] text-white font-medium flex items-center justify-center gap-2 hover:bg-[#2D2D2D] transition-colors group"
              >
                <Search className="w-5 h-5" />
                Search Properties
                <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
              </button>
            </form>
          </motion.div>

          {/* Quick Searches */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12"
          >
            <h2 className="text-sm font-medium text-[#7D8471] mb-4 text-center uppercase tracking-wide">
              Popular Searches
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {quickSearches.map((search) => (
                <button
                  key={search.label}
                  onClick={() => router.push(`/properties?${search.params}`)}
                  className="px-5 py-2.5 bg-white border border-[#EDE9E3] text-[#4A4A4A] text-sm hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-colors"
                >
                  {search.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
