'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { 
  Search, MapPin, Home, Building2, Castle, Landmark, TreePine, ArrowRight, Edit3, GripVertical, Settings
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PropertyCard } from '@/components/property/PropertyCard';
import { Property } from '@/types';
import { useSiteConfig } from '@/context/SiteConfigContext';
import { useAuth } from '@/context/AuthContext';

const FEATURED_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    description: 'Stunning 2-bedroom apartment in the heart of downtown with panoramic city views.',
    price: 450000,
    listingType: 'BUY',
    propertyType: 'APARTMENT',
    status: 'AVAILABLE',
    address: '123 Main Street, Unit 15A',
    city: 'New York',
    neighborhood: 'Manhattan',
    zipCode: '10001',
    latitude: 40.7128,
    longitude: -74.006,
    bedrooms: 2,
    bathrooms: 2,
    surfaceArea: 1200,
    yearBuilt: 2020,
    hasPool: false,
    hasParking: true,
    hasGarden: false,
    hasAC: true,
    hasGym: true,
    hasElevator: true,
    hasSecurity: true,
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'],
    featured: true,
    approved: true,
    viewCount: 245,
    agentId: '2',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Luxury Beach Villa',
    description: 'Exquisite 5-bedroom villa with private beach access and infinity pool.',
    price: 2500000,
    listingType: 'BUY',
    propertyType: 'VILLA',
    status: 'AVAILABLE',
    address: '456 Ocean Drive',
    city: 'Miami',
    neighborhood: 'South Beach',
    zipCode: '33139',
    latitude: 25.7617,
    longitude: -80.1918,
    bedrooms: 5,
    bathrooms: 4,
    surfaceArea: 4500,
    yearBuilt: 2018,
    hasPool: true,
    hasParking: true,
    hasGarden: true,
    hasAC: true,
    hasGym: true,
    hasElevator: false,
    hasSecurity: true,
    images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800'],
    featured: true,
    approved: true,
    viewCount: 532,
    agentId: '2',
    createdAt: '2024-01-10T10:00:00Z'
  },
  {
    id: '3',
    title: 'Cozy Suburban Family Home',
    description: 'Charming 4-bedroom family home in a quiet suburban neighborhood.',
    price: 650000,
    listingType: 'BUY',
    propertyType: 'HOUSE',
    status: 'AVAILABLE',
    address: '789 Oak Lane',
    city: 'Austin',
    neighborhood: 'Westlake',
    zipCode: '78746',
    latitude: 30.2672,
    longitude: -97.7431,
    bedrooms: 4,
    bathrooms: 3,
    surfaceArea: 2800,
    yearBuilt: 2015,
    hasPool: false,
    hasParking: true,
    hasGarden: true,
    hasAC: true,
    hasGym: false,
    hasElevator: false,
    hasSecurity: false,
    images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'],
    featured: true,
    approved: true,
    viewCount: 189,
    agentId: '2',
    createdAt: '2024-01-08T10:00:00Z'
  }
];

const PROPERTY_TYPES = [
  { icon: Home, label: 'Houses', count: 245, type: 'HOUSE' },
  { icon: Building2, label: 'Apartments', count: 189, type: 'APARTMENT' },
  { icon: Castle, label: 'Villas', count: 67, type: 'VILLA' },
  { icon: Landmark, label: 'Commercial', count: 34, type: 'COMMERCIAL' },
  { icon: TreePine, label: 'Land', count: 23, type: 'LAND' },
];

// Animated Counter
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = value / 60;
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 30);
    return () => clearInterval(timer);
  }, [isInView, value]);
  
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'buy' | 'rent'>('buy');
  const heroRef = useRef(null);
  const { isEditMode, config, updateHeroImage } = useSiteConfig();
  const { user, isAuthenticated } = useAuth();
  const isAdmin = isAuthenticated && user?.role === 'admin';

  // Editable Image Wrapper
  const EditableImageWrapper = ({ 
    src, 
    alt, 
    imageId,
    className = '' 
  }: { 
    src: string; 
    alt: string; 
    imageId?: string;
    className?: string;
  }) => {
    const [isHovering, setIsHovering] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newUrl, setNewUrl] = useState(src);

    const handleSave = () => {
      if (imageId) {
        updateHeroImage(imageId, { url: newUrl });
      }
      setIsEditing(false);
    };

    if (!isAdmin || !isEditMode) {
      return (
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover ${className}`}
        />
      );
    }

    return (
      <>
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover ${className}`}
        />
        {/* Edit Overlay */}
        <div 
          className="absolute inset-0 cursor-pointer transition-all"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClick={() => setIsEditing(true)}
        >
          {isHovering && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center text-white">
                <Edit3 className="w-8 h-8 mx-auto mb-2" />
                <span className="text-sm font-medium">Edit Image</span>
              </div>
            </div>
          )}
          <div className="absolute top-2 right-2 w-8 h-8 bg-[#8B1538] flex items-center justify-center opacity-80">
            <Edit3 className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Edit Modal */}
        {isEditing && (
          <div 
            className="fixed inset-0 bg-black/80 z-[300] flex items-center justify-center p-4"
            onClick={() => setIsEditing(false)}
          >
            <div 
              className="bg-white w-full max-w-md p-6"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="font-display text-lg text-[#1A1A1A] mb-4">Edit Image</h3>
              <input
                type="text"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                className="w-full px-4 py-3 border border-[#EDE9E3] mb-4 focus:outline-none focus:border-[#1A1A1A]"
                placeholder="Image URL"
              />
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-3 border border-[#EDE9E3] text-[#1A1A1A]"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="flex-1 py-3 bg-[#1A1A1A] text-white"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  // Section Edit Overlay
  const SectionEditOverlay = ({ sectionName }: { sectionName: string }) => {
    if (!isAdmin || !isEditMode) return null;
    
    return (
      <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
        <div className="px-3 py-1.5 bg-[#8B1538] text-white text-xs font-medium flex items-center gap-2">
          <GripVertical className="w-3 h-3" />
          {sectionName}
        </div>
        <Link href="/admin/settings">
          <button className="w-8 h-8 bg-[#1A1A1A] text-white flex items-center justify-center hover:bg-[#2D2D2D]">
            <Settings className="w-4 h-4" />
          </button>
        </Link>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FDFCFA] font-sans">
      <Navbar />
      
      {/* Hero Section - Clean Minimal Design */}
      <section ref={heroRef} className="relative min-h-screen bg-white">
        <SectionEditOverlay sectionName="Hero Section" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 min-h-screen items-center pt-24 pb-16">
            
            {/* Left Content - 5 columns */}
            <div className="lg:col-span-5 relative z-10">
              {/* Small Label */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-[#7D8471] text-sm tracking-wide mb-6"
              >
                Luxury Real Estate
              </motion.p>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-display text-[3.5rem] md:text-[4.5rem] lg:text-[5rem] text-[#1A1A1A] leading-[1.05] tracking-tight mb-8"
              >
                Find your
                <br />
                perfect
                <br />
                <span className="italic text-[#7D8471]">place</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-[#4A4A4A] text-lg leading-relaxed max-w-sm mb-10"
              >
                Curated properties for modern living. Simple search, exceptional homes.
              </motion.p>

              {/* Search Box - Clean */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="space-y-4"
              >
                {/* Tabs */}
                <div className="flex gap-6 border-b border-[#EDE9E3]">
                  {['buy', 'rent'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as 'buy' | 'rent')}
                      className={`pb-3 text-sm font-medium transition-all relative ${
                        activeTab === tab
                          ? 'text-[#1A1A1A]'
                          : 'text-[#999] hover:text-[#4A4A4A]'
                      }`}
                    >
                      {tab === 'buy' ? 'Buy' : 'Rent'}
                      {activeTab === tab && (
                        <motion.div 
                          layoutId="tab-indicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1A1A1A]" 
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* Search Input */}
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="City or neighborhood..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-0 py-3 bg-transparent border-b border-[#EDE9E3] text-[#1A1A1A] placeholder:text-[#BEBEBE] focus:outline-none focus:border-[#1A1A1A] transition-colors text-lg"
                    />
                  </div>
                  <Link href={`/properties${searchQuery ? `?city=${searchQuery}&listingType=${activeTab.toUpperCase()}` : `?listingType=${activeTab.toUpperCase()}`}`}>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-12 h-12 bg-[#1A1A1A] text-white rounded-full flex items-center justify-center hover:bg-[#2D2D2D] transition-colors"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>

              {/* Stats - Minimal */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex gap-10 mt-16 pt-10 border-t border-[#EDE9E3]"
              >
                {[
                  { value: 500, suffix: '+', label: 'Properties' },
                  { value: 25, suffix: '+', label: 'Cities' },
                  { value: 98, suffix: '%', label: 'Satisfaction' },
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="font-display text-3xl text-[#1A1A1A] tracking-tight">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs text-[#7D8471] mt-1 tracking-wide uppercase">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Content - Image Grid - 7 columns */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:col-span-7 relative hidden lg:block"
            >
              <div className="grid grid-cols-12 gap-4 h-[85vh]">
                {/* Large Image */}
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="col-span-7 relative rounded-2xl overflow-hidden"
                >
                  <EditableImageWrapper
                    src={config.heroImages[0]?.url || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"}
                    alt={config.heroImages[0]?.alt || "Modern Home"}
                    imageId={config.heroImages[0]?.id}
                  />
                </motion.div>
                
                {/* Right Column - Two Stacked Images */}
                <div className="col-span-5 flex flex-col gap-4">
                  <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex-1 relative rounded-2xl overflow-hidden"
                  >
                    <EditableImageWrapper
                      src={config.heroImages[1]?.url || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"}
                      alt={config.heroImages[1]?.alt || "Interior"}
                      imageId={config.heroImages[1]?.id}
                    />
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="flex-1 relative rounded-2xl overflow-hidden"
                  >
                    <EditableImageWrapper
                      src={config.heroImages[2]?.url || "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800"}
                      alt={config.heroImages[2]?.alt || "Living Space"}
                      imageId={config.heroImages[2]?.id}
                    />
                  </motion.div>
                </div>
              </div>

              {/* Floating Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="absolute bottom-8 left-8 bg-white rounded-xl p-5 shadow-luxury border border-[#EDE9E3]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#1A1A1A] rounded-full flex items-center justify-center">
                    <Home className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[#1A1A1A]">3,200+ Listings</div>
                    <div className="text-xs text-[#7D8471]">Available now</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Scroll Line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#EDE9E3]" />
      </section>

      {/* Property Types Section */}
      <section className="py-24 bg-white relative">
        <SectionEditOverlay sectionName="Browse by Type" />
        <div className="absolute top-0 left-0 right-0 divider-elegant" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="line-accent" />
                <span className="text-sm font-medium tracking-[0.2em] uppercase text-[#7D8471]">
                  Categories
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-[#1A1A1A] text-editorial">
                Browse by type
              </h2>
            </div>
            <Link 
              href="/properties" 
              className="elegant-underline text-[#2D2D2D] font-medium flex items-center gap-2 group"
            >
              View all properties
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {PROPERTY_TYPES.map((type, index) => (
              <motion.div
                key={type.type}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  href={`/properties?propertyType=${type.type}`}
                  className="block card-elegant rounded-xl p-6 text-center group"
                >
                  <div className="w-14 h-14 mx-auto mb-4 bg-[#F8F6F3] rounded-xl flex items-center justify-center group-hover:bg-[#2D2D2D] transition-colors duration-300">
                    <type.icon className="w-7 h-7 text-[#2D2D2D] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-medium text-[#1A1A1A] mb-1">{type.label}</h3>
                  <p className="text-sm text-[#7D8471]">{type.count} listings</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 bg-[#F8F6F3] relative overflow-hidden">
        <SectionEditOverlay sectionName="Featured Properties" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="line-accent" />
                <span className="text-sm font-medium tracking-[0.2em] uppercase text-[#7D8471]">
                  Curated Selection
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-[#1A1A1A] text-editorial">
                Featured properties
              </h2>
              <p className="mt-4 text-[#4A4A4A] max-w-md">
                Handpicked homes that exemplify quality, design, and exceptional living.
              </p>
            </div>
            <Link href="/properties?featured=true">
              <button className="px-6 py-3 bg-[#2D2D2D] text-white rounded-lg font-medium flex items-center gap-2 hover:bg-[#1A1A1A] transition-colors group">
                View All
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_PROPERTIES.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Editorial Grid */}
      <section className="py-32 bg-white relative">
        <SectionEditOverlay sectionName="Why Choose Us" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-20"
          >
            <div>
              <span className="text-[#7D8471] text-xs tracking-[0.3em] uppercase mb-4 block">
                Why Palais Rouge
              </span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] leading-[1.1]">
                Built on trust,
                <br />
                <span className="italic text-[#7D8471]">driven by expertise</span>
              </h2>
            </div>
            <div className="flex items-end">
              <p className="text-[#4A4A4A] text-lg leading-relaxed max-w-md">
                We combine decades of market knowledge with a personalized approach, ensuring every client finds not just a property, but a place to call home.
              </p>
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-px bg-[#EDE9E3]">
            {[
              {
                num: '01',
                title: 'Curated Selection',
                description: 'Every property is personally vetted to meet our exacting standards for quality, location, and lasting value.'
              },
              {
                num: '02',
                title: 'Expert Guidance',
                description: 'Our seasoned advisors bring decades of local market expertise to navigate every transaction with confidence.'
              },
              {
                num: '03',
                title: 'Trusted Process',
                description: 'Transparent pricing, secure transactions, and dedicated support at every step of your property journey.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-10 lg:p-12 group"
              >
                <span className="text-[#C9A962] text-sm font-medium tracking-wider mb-8 block">
                  {feature.num}
                </span>
                <h3 className="font-display text-2xl text-[#1A1A1A] mb-4 group-hover:text-[#7D8471] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-[#4A4A4A] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Minimal Dark */}
      <section className="relative bg-[#1A1A1A] overflow-hidden">
        <SectionEditOverlay sectionName="Call to Action" />
        {/* Top Border Accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-[#C9A962]/30" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 py-24 lg:py-32">
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[#C9A962] text-xs tracking-[0.3em] uppercase mb-6 block">
                Start Your Journey
              </span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] text-white leading-[1.1] mb-6">
                Ready to find your
                <br />
                <span className="italic text-white/70">perfect place?</span>
              </h2>
              <p className="text-white/50 text-lg leading-relaxed max-w-md mb-10">
                Let our expert team guide you to discover properties that match your lifestyle and aspirations.
              </p>
              
              {/* Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link href="/properties">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-white text-[#1A1A1A] font-medium flex items-center gap-3 hover:bg-[#F8F6F3] transition-colors group"
                  >
                    Browse Properties
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
                <Link href="/login">
                  <button className="px-8 py-4 border border-white/20 text-white font-medium hover:bg-white/5 hover:border-white/30 transition-all">
                    Contact Us
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Right - Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center"
            >
              <div className="grid grid-cols-2 gap-8 lg:gap-12 w-full">
                {[
                  { value: '500+', label: 'Properties Listed' },
                  { value: '25+', label: 'Cities Covered' },
                  { value: '98%', label: 'Client Satisfaction' },
                  { value: '15+', label: 'Years Experience' },
                ].map((stat, i) => (
                  <div key={i} className="border-l border-white/10 pl-6">
                    <div className="font-display text-3xl lg:text-4xl text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="text-white/40 text-sm tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
      </section>

      <Footer />
    </div>
  );
}
