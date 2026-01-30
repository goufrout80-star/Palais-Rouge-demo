'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, MapPin, Maximize2, Building2, TrendingUp, CheckCircle,
  ArrowRight, Calendar, Bed, Bath
} from 'lucide-react';
import Link from 'next/link';

export default function ValuationPage() {
  const [step, setStep] = useState(1);
  const [showResult, setShowResult] = useState(false);
  const [formData, setFormData] = useState({
    propertyType: '',
    location: '',
    neighborhood: '',
    size: '',
    bedrooms: '',
    bathrooms: '',
    yearBuilt: '',
    condition: '',
    features: [] as string[],
    name: '',
    email: '',
    phone: ''
  });

  const [valuation, setValuation] = useState({
    low: 0,
    mid: 0,
    high: 0
  });

  const propertyTypes = [
    { id: 'villa', label: 'Villa', icon: Home },
    { id: 'apartment', label: 'Apartment', icon: Building2 },
    { id: 'riad', label: 'Riad', icon: Home },
    { id: 'penthouse', label: 'Penthouse', icon: Building2 },
  ];

  const conditions = [
    { id: 'new', label: 'New / Excellent', multiplier: 1.15 },
    { id: 'good', label: 'Good Condition', multiplier: 1.0 },
    { id: 'fair', label: 'Fair / Needs Updates', multiplier: 0.85 },
    { id: 'renovation', label: 'Needs Renovation', multiplier: 0.70 },
  ];

  const features = [
    'Swimming Pool', 'Garden', 'Terrace', 'Garage', 'Security',
    'Sea View', 'Mountain View', 'Smart Home', 'Elevator', 'Fireplace'
  ];

  const handleSubmit = () => {
    // Simple estimation logic (in real app, this would call an API)
    const basePrice = 15000; // MAD per m²
    const size = parseInt(formData.size) || 100;
    const conditionMultiplier = conditions.find(c => c.id === formData.condition)?.multiplier || 1;
    const featureBonus = formData.features.length * 0.02;
    const locationMultiplier = formData.location === 'Marrakech' ? 1.2 : 
                              formData.location === 'Casablanca' ? 1.3 : 1.0;
    
    const estimatedValue = basePrice * size * conditionMultiplier * locationMultiplier * (1 + featureBonus);
    
    setValuation({
      low: Math.round(estimatedValue * 0.9),
      mid: Math.round(estimatedValue),
      high: Math.round(estimatedValue * 1.1)
    });
    setShowResult(true);
  };

  const toggleFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  if (showResult) {
    return (
      <main className="min-h-screen bg-[#FDFCFA] pt-20">
        <section className="py-16 lg:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="w-16 h-16 bg-[#8B1538]/10 mx-auto mb-6 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-[#8B1538]" />
              </div>
              <h1 className="font-display text-3xl md:text-4xl text-[#1A1A1A] mb-4">
                Your Property Estimate
              </h1>
              <p className="text-[#7D8471]">
                Based on the information you provided, here's our estimated value range.
              </p>
            </motion.div>

            <div className="bg-white border border-[#EDE9E3] p-8 mb-8">
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-[#F8F6F3]">
                  <p className="text-sm text-[#7D8471] mb-1">Low Estimate</p>
                  <p className="font-display text-xl text-[#1A1A1A]">
                    {valuation.low.toLocaleString()} MAD
                  </p>
                </div>
                <div className="text-center p-4 bg-[#8B1538] text-white">
                  <p className="text-sm opacity-80 mb-1">Estimated Value</p>
                  <p className="font-display text-2xl">
                    {valuation.mid.toLocaleString()} MAD
                  </p>
                </div>
                <div className="text-center p-4 bg-[#F8F6F3]">
                  <p className="text-sm text-[#7D8471] mb-1">High Estimate</p>
                  <p className="font-display text-xl text-[#1A1A1A]">
                    {valuation.high.toLocaleString()} MAD
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-[#7D8471]">
                <div className="flex justify-between py-2 border-b border-[#EDE9E3]">
                  <span>Property Type</span>
                  <span className="font-medium text-[#1A1A1A] capitalize">{formData.propertyType}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#EDE9E3]">
                  <span>Location</span>
                  <span className="font-medium text-[#1A1A1A]">{formData.location}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#EDE9E3]">
                  <span>Size</span>
                  <span className="font-medium text-[#1A1A1A]">{formData.size} m²</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#EDE9E3]">
                  <span>Bedrooms / Bathrooms</span>
                  <span className="font-medium text-[#1A1A1A]">{formData.bedrooms} / {formData.bathrooms}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span>Condition</span>
                  <span className="font-medium text-[#1A1A1A] capitalize">{formData.condition?.replace('-', ' ')}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#8B1538]/5 border border-[#8B1538]/20 p-6 mb-8">
              <h3 className="font-display text-lg text-[#1A1A1A] mb-2">
                Want a More Accurate Valuation?
              </h3>
              <p className="text-sm text-[#7D8471] mb-4">
                Our experts can provide a detailed, in-person valuation for free. 
                We'll analyze your property's unique features and market position.
              </p>
              <Link
                href="/contact?subject=valuation"
                className="inline-flex items-center gap-2 text-[#8B1538] font-medium hover:underline"
              >
                Request Expert Valuation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowResult(false);
                  setStep(1);
                }}
                className="flex-1 py-4 border border-[#1A1A1A] text-[#1A1A1A] font-medium hover:bg-[#1A1A1A] hover:text-white transition-colors"
              >
                Start Over
              </button>
              <Link
                href="/sell"
                className="flex-1 py-4 bg-[#8B1538] text-white font-medium text-center hover:bg-[#6B0F2B] transition-colors"
              >
                Sell With Us
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FDFCFA] pt-20">
      {/* Hero */}
      <section className="py-16 lg:py-20 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#8B1538] text-xs tracking-[0.3em] uppercase mb-4 block"
          >
            Free Tool
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-6"
          >
            Home Valuation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 max-w-2xl mx-auto text-lg"
          >
            Get an instant estimate of your property's value in just a few steps.
          </motion.p>
        </div>
      </section>

      {/* Progress */}
      <div className="bg-white border-b border-[#EDE9E3] py-4">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 flex items-center justify-center font-display ${
                  step >= s ? 'bg-[#8B1538] text-white' : 'bg-[#F8F6F3] text-[#7D8471]'
                }`}>
                  {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                </div>
                {s < 3 && (
                  <div className={`w-20 sm:w-32 h-1 mx-2 ${
                    step > s ? 'bg-[#8B1538]' : 'bg-[#EDE9E3]'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <section className="py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Step 1: Property Type & Location */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="font-display text-2xl text-[#1A1A1A] mb-6">Property Details</h2>
              
              <div className="mb-8">
                <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-3">
                  Property Type
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {propertyTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setFormData({ ...formData, propertyType: type.id })}
                      className={`p-4 flex flex-col items-center gap-2 border transition-all ${
                        formData.propertyType === type.id
                          ? 'bg-[#8B1538] text-white border-[#8B1538]'
                          : 'bg-white border-[#EDE9E3] hover:border-[#8B1538]'
                      }`}
                    >
                      <type.icon className="w-6 h-6" />
                      <span className="text-sm font-medium">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                    City
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[#EDE9E3] focus:outline-none focus:border-[#8B1538]"
                  >
                    <option value="">Select city</option>
                    <option value="Marrakech">Marrakech</option>
                    <option value="Casablanca">Casablanca</option>
                    <option value="Rabat">Rabat</option>
                    <option value="Tangier">Tangier</option>
                    <option value="Agadir">Agadir</option>
                    <option value="Fes">Fes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                    Neighborhood
                  </label>
                  <input
                    type="text"
                    value={formData.neighborhood}
                    onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                    placeholder="e.g., Gueliz, Hivernage"
                    className="w-full px-4 py-3 bg-white border border-[#EDE9E3] focus:outline-none focus:border-[#8B1538]"
                  />
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!formData.propertyType || !formData.location}
                className="w-full py-4 bg-[#8B1538] text-white font-medium hover:bg-[#6B0F2B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </motion.div>
          )}

          {/* Step 2: Size & Specs */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="font-display text-2xl text-[#1A1A1A] mb-6">Property Specifications</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                    Size (m²)
                  </label>
                  <div className="relative">
                    <Maximize2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7D8471]" />
                    <input
                      type="number"
                      value={formData.size}
                      onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                      placeholder="150"
                      className="w-full pl-10 pr-4 py-3 bg-white border border-[#EDE9E3] focus:outline-none focus:border-[#8B1538]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                    Year Built
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7D8471]" />
                    <input
                      type="number"
                      value={formData.yearBuilt}
                      onChange={(e) => setFormData({ ...formData, yearBuilt: e.target.value })}
                      placeholder="2020"
                      className="w-full pl-10 pr-4 py-3 bg-white border border-[#EDE9E3] focus:outline-none focus:border-[#8B1538]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                    Bedrooms
                  </label>
                  <div className="relative">
                    <Bed className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7D8471]" />
                    <select
                      value={formData.bedrooms}
                      onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-[#EDE9E3] focus:outline-none focus:border-[#8B1538]"
                    >
                      <option value="">Select</option>
                      {[1, 2, 3, 4, 5, 6, '7+'].map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                    Bathrooms
                  </label>
                  <div className="relative">
                    <Bath className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7D8471]" />
                    <select
                      value={formData.bathrooms}
                      onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-[#EDE9E3] focus:outline-none focus:border-[#8B1538]"
                    >
                      <option value="">Select</option>
                      {[1, 2, 3, 4, 5, '6+'].map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-3">
                  Property Condition
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {conditions.map((condition) => (
                    <button
                      key={condition.id}
                      onClick={() => setFormData({ ...formData, condition: condition.id })}
                      className={`p-4 text-left border transition-all ${
                        formData.condition === condition.id
                          ? 'bg-[#8B1538] text-white border-[#8B1538]'
                          : 'bg-white border-[#EDE9E3] hover:border-[#8B1538]'
                      }`}
                    >
                      <span className="text-sm font-medium">{condition.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 border border-[#1A1A1A] text-[#1A1A1A] font-medium hover:bg-[#1A1A1A] hover:text-white transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!formData.size || !formData.bedrooms || !formData.condition}
                  className="flex-1 py-4 bg-[#8B1538] text-white font-medium hover:bg-[#6B0F2B] transition-colors disabled:opacity-50"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Features */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="font-display text-2xl text-[#1A1A1A] mb-6">Property Features</h2>
              
              <div className="mb-8">
                <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-3">
                  Select all that apply
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {features.map((feature) => (
                    <button
                      key={feature}
                      onClick={() => toggleFeature(feature)}
                      className={`p-3 text-sm font-medium border transition-all ${
                        formData.features.includes(feature)
                          ? 'bg-[#8B1538] text-white border-[#8B1538]'
                          : 'bg-white border-[#EDE9E3] hover:border-[#8B1538]'
                      }`}
                    >
                      {feature}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 py-4 border border-[#1A1A1A] text-[#1A1A1A] font-medium hover:bg-[#1A1A1A] hover:text-white transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 py-4 bg-[#8B1538] text-white font-medium hover:bg-[#6B0F2B] transition-colors"
                >
                  Get Estimate
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}
