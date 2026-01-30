'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, FileText, Video, Download, ArrowRight, Search,
  Home, TrendingUp, Key, Calculator, Users, Shield
} from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'guide' | 'article' | 'video' | 'download';
  readTime?: string;
  image: string;
  href: string;
}

const resources: Resource[] = [
  {
    id: '1',
    title: 'First-Time Buyer\'s Complete Guide',
    description: 'Everything you need to know about buying your first property in Morocco.',
    category: 'Buying',
    type: 'guide',
    readTime: '15 min read',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600',
    href: '/guide/renting'
  },
  {
    id: '2',
    title: 'How to Sell Your Home Fast',
    description: 'Expert tips and strategies to sell your property quickly at the best price.',
    category: 'Selling',
    type: 'guide',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600',
    href: '/guide/selling'
  },
  {
    id: '3',
    title: 'Renter\'s Rights in Morocco',
    description: 'Know your rights and responsibilities as a tenant in Morocco.',
    category: 'Renting',
    type: 'article',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600',
    href: '/guide/renting'
  },
  {
    id: '4',
    title: 'Property Investment 101',
    description: 'Learn the basics of real estate investment and building wealth.',
    category: 'Investment',
    type: 'guide',
    readTime: '20 min read',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600',
    href: '/guide/selling'
  },
  {
    id: '5',
    title: 'Understanding Mortgage Options',
    description: 'A comprehensive guide to mortgage types and finding the best rates.',
    category: 'Financing',
    type: 'article',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600',
    href: '/calculator'
  },
  {
    id: '6',
    title: 'Home Staging Tips',
    description: 'How to prepare your home for viewings and attract more buyers.',
    category: 'Selling',
    type: 'video',
    readTime: '5 min watch',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600',
    href: '/guide/selling'
  },
];

const categories = ['All', 'Buying', 'Selling', 'Renting', 'Investment', 'Financing'];

const typeIcons = {
  guide: BookOpen,
  article: FileText,
  video: Video,
  download: Download
};

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || resource.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const quickLinks = [
    { icon: Home, title: 'Buying Guide', description: 'Start your home search', href: '/guide/renting' },
    { icon: TrendingUp, title: 'Selling Guide', description: 'Maximize your sale', href: '/guide/selling' },
    { icon: Key, title: 'Renting Guide', description: 'Find your rental', href: '/guide/renting' },
    { icon: Calculator, title: 'Mortgage Calculator', description: 'Plan your budget', href: '/calculator' },
    { icon: Users, title: 'Find an Agent', description: 'Get expert help', href: '/agents' },
    { icon: Shield, title: 'Legal Resources', description: 'Know your rights', href: '/faq' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFA]">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 lg:py-24 bg-[#1A1A1A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#8B1538] text-xs tracking-[0.3em] uppercase mb-4 block"
            >
              Knowledge Center
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-6"
            >
              Resources & Guides
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/60 max-w-2xl mx-auto text-lg mb-8"
            >
              Expert advice, market insights, and helpful tools to guide you through
              every step of your real estate journey.
            </motion.p>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-xl mx-auto relative"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7D8471]" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-[#EDE9E3] text-[#1A1A1A] focus:outline-none focus:border-[#8B1538]"
              />
            </motion.div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-12 bg-white border-b border-[#EDE9E3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {quickLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  className="p-4 bg-[#F8F6F3] hover:bg-[#EDE9E3] transition-colors group"
                >
                  <link.icon className="w-6 h-6 text-[#8B1538] mb-2" />
                  <p className="font-medium text-[#1A1A1A] text-sm">{link.title}</p>
                  <p className="text-xs text-[#7D8471]">{link.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-6 border-b border-[#EDE9E3] bg-white sticky top-[72px] z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? 'bg-[#8B1538] text-white'
                      : 'bg-[#F8F6F3] text-[#4A4A4A] hover:bg-[#EDE9E3]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Resources Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredResources.length === 0 ? (
              <div className="text-center py-16">
                <Search className="w-12 h-12 text-[#7D8471] mx-auto mb-4" />
                <h3 className="font-display text-xl text-[#1A1A1A] mb-2">No resources found</h3>
                <p className="text-[#7D8471] mb-6">
                  Try adjusting your search or browse all categories.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('All');
                  }}
                  className="px-6 py-3 bg-[#8B1538] text-white font-medium hover:bg-[#6B0F2B] transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredResources.map((resource, idx) => {
                  const IconComponent = typeIcons[resource.type];
                  return (
                    <motion.div
                      key={resource.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white border border-[#EDE9E3] overflow-hidden group hover:border-[#8B1538] transition-colors"
                    >
                      <div className="relative">
                        <img
                          src={resource.image}
                          alt={resource.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 bg-[#8B1538] text-white text-xs font-medium capitalize">
                            {resource.type}
                          </span>
                        </div>
                        <div className="absolute bottom-4 left-4">
                          <IconComponent className="w-8 h-8 text-white bg-[#1A1A1A]/50 p-2 rounded-full" />
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <span className="text-xs text-[#8B1538] font-medium uppercase tracking-wide">
                          {resource.category}
                        </span>
                        <h3 className="font-display text-lg text-[#1A1A1A] mt-2 mb-3 group-hover:text-[#8B1538] transition-colors">
                          {resource.title}
                        </h3>
                        <p className="text-[#7D8471] text-sm mb-4 line-clamp-3">
                          {resource.description}
                        </p>
                        
                        {resource.readTime && (
                          <div className="flex items-center justify-between text-xs text-[#7D8471] mb-4">
                            <span>{resource.readTime}</span>
                          </div>
                        )}
                        
                        <Link
                          href={resource.href}
                          className="inline-flex items-center gap-2 text-[#8B1538] font-medium hover:underline"
                        >
                          Read More
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-[#1A1A1A]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-3xl text-white mb-4">Stay Informed</h2>
            <p className="text-white/60 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest market insights, property guides, and investment opportunities.
            </p>
            
            <form className="flex gap-0 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#8B1538]/50 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#8B1538] text-white font-medium hover:bg-[#6B0F2B] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}