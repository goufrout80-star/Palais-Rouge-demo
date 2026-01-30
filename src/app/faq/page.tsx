'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, MessageCircle, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  items: FAQItem[];
}

const faqData: FAQCategory[] = [
  {
    title: 'Buying a Property',
    items: [
      {
        question: 'How do I start the home buying process?',
        answer: 'Start by getting pre-approved for a mortgage, then work with one of our agents to identify properties that match your criteria. We\'ll guide you through viewings, making offers, and closing the deal.'
      },
      {
        question: 'What costs should I expect when buying a property?',
        answer: 'Beyond the purchase price, expect to pay for closing costs (2-5% of the purchase price), property inspections, appraisal fees, and potentially property taxes and insurance upfront. Our team will provide a detailed breakdown for each property.'
      },
      {
        question: 'How long does it take to buy a property?',
        answer: 'The typical timeline is 30-60 days from offer acceptance to closing. However, this can vary based on financing, inspections, and negotiations. Our team works to expedite the process while ensuring all due diligence is completed.'
      },
      {
        question: 'Do I need a real estate agent to buy?',
        answer: 'While not required, having a professional agent provides valuable market insights, negotiation expertise, and guidance through complex paperwork. Our agents work to protect your interests throughout the process.'
      },
    ]
  },
  {
    title: 'Selling a Property',
    items: [
      {
        question: 'How do I determine my home\'s value?',
        answer: 'We offer free home valuations using comparable sales data, market trends, and property condition assessments. Our agents provide a comprehensive market analysis to help you price your property competitively.'
      },
      {
        question: 'What should I do to prepare my home for sale?',
        answer: 'Focus on decluttering, deep cleaning, minor repairs, and staging. Our team provides personalized recommendations and can connect you with trusted contractors and staging professionals.'
      },
      {
        question: 'How long does it typically take to sell a property?',
        answer: 'Luxury properties in Morocco typically sell within 60-120 days when priced correctly. Market conditions, location, and property condition all affect timing. Our marketing strategies help maximize exposure and attract qualified buyers.'
      },
      {
        question: 'What are the fees for selling through Palais Rouge?',
        answer: 'Our commission structure is competitive and transparent. Contact us for a detailed fee breakdown based on your property type and value. We believe in providing exceptional service that justifies our fees.'
      },
    ]
  },
  {
    title: 'Renting a Property',
    items: [
      {
        question: 'What documents do I need to rent?',
        answer: 'Typically you\'ll need proof of identity, proof of income (last 3 pay slips or employment letter), bank statements, and references from previous landlords. International clients may need additional documentation.'
      },
      {
        question: 'How much deposit is required?',
        answer: 'Most rentals require 2-3 months rent as a security deposit, plus the first month\'s rent upfront. Some luxury properties may require additional deposits. All deposits are held securely and returned per the lease terms.'
      },
      {
        question: 'Can I negotiate the rental price?',
        answer: 'Yes, there\'s often room for negotiation, especially for longer lease terms or if you can provide excellent references. Our agents can advise on negotiation strategies for specific properties.'
      },
      {
        question: 'What\'s included in the rent?',
        answer: 'This varies by property. Some include utilities, building fees, and maintenance, while others are base rent only. Each listing clearly indicates what\'s included. Our agents ensure you understand all costs upfront.'
      },
    ]
  },
  {
    title: 'Working with Palais Rouge',
    items: [
      {
        question: 'How do I become a Palais Rouge agent?',
        answer: 'We\'re always looking for talented real estate professionals. Visit our Careers page or contact our HR team to learn about current opportunities and requirements for joining our team.'
      },
      {
        question: 'What areas do you cover?',
        answer: 'We specialize in luxury properties throughout Morocco, with a focus on Marrakech, Casablanca, Rabat, and coastal regions. We also have partnerships for international properties.'
      },
      {
        question: 'How can I list my property with you?',
        answer: 'Contact us through our website or call our office. An agent will schedule a property assessment and discuss our marketing strategy and terms. We accept select luxury properties that meet our quality standards.'
      },
      {
        question: 'Do you offer property management services?',
        answer: 'Yes, we offer comprehensive property management for owners who want hands-off investment management. Services include tenant screening, rent collection, maintenance coordination, and financial reporting.'
      },
    ]
  },
];

function FAQAccordion({ item, isOpen, onClick }: { item: FAQItem; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-[#EDE9E3]">
      <button
        onClick={onClick}
        className="w-full py-5 flex items-center justify-between text-left hover:text-[#8B1538] transition-colors"
      >
        <span className="font-medium text-[#1A1A1A] pr-8">{item.question}</span>
        <ChevronDown className={`w-5 h-5 text-[#8B1538] flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[#7D8471] leading-relaxed">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const toggleItem = (categoryTitle: string, questionIndex: number) => {
    const key = `${categoryTitle}-${questionIndex}`;
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredFAQ = faqData.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => 
    activeCategory ? category.title === activeCategory : category.items.length > 0
  );

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
              Help Center
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-6"
            >
              Frequently Asked Questions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/60 max-w-2xl mx-auto text-lg mb-8"
            >
              Find answers to common questions about buying, selling, and renting luxury properties.
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
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-[#EDE9E3] text-[#1A1A1A] focus:outline-none focus:border-[#8B1538] transition-colors"
              />
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-6 border-b border-[#EDE9E3] bg-white sticky top-[72px] z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === null
                    ? 'bg-[#8B1538] text-white'
                    : 'bg-[#F8F6F3] text-[#4A4A4A] hover:bg-[#EDE9E3]'
                }`}
              >
                All Categories
              </button>
              {faqData.map((category) => (
                <button
                  key={category.title}
                  onClick={() => setActiveCategory(category.title)}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    activeCategory === category.title
                      ? 'bg-[#8B1538] text-white'
                      : 'bg-[#F8F6F3] text-[#4A4A4A] hover:bg-[#EDE9E3]'
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredFAQ.length === 0 ? (
              <div className="text-center py-16">
                <Search className="w-12 h-12 text-[#7D8471] mx-auto mb-4" />
                <h3 className="font-display text-xl text-[#1A1A1A] mb-2">No results found</h3>
                <p className="text-[#7D8471] mb-6">
                  Try adjusting your search or browse all categories.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory(null);
                  }}
                  className="px-6 py-3 bg-[#8B1538] text-white font-medium hover:bg-[#6B0F2B] transition-colors"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              filteredFAQ.map((category) => (
                <div key={category.title} className="mb-16">
                  <h2 className="font-display text-2xl text-[#1A1A1A] mb-6 pb-4 border-b border-[#EDE9E3]">
                    {category.title}
                  </h2>
                  <div className="bg-white border border-[#EDE9E3]">
                    {category.items.map((item, idx) => (
                      <FAQAccordion
                        key={idx}
                        item={item}
                        isOpen={openItems[`${category.title}-${idx}`] || false}
                        onClick={() => toggleItem(category.title, idx)}
                      />
                    ))}
                  </div>
                </div>
              ))
            )}

            {/* Still Need Help */}
            <div className="mt-16 pt-12 border-t border-[#EDE9E3] text-center">
              <h3 className="font-display text-xl text-[#1A1A1A] mb-4">Still Need Help?</h3>
              <p className="text-[#7D8471] mb-8 max-w-2xl mx-auto">
                Our team of experts is ready to assist you with any questions about luxury real estate in Morocco.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B1538] text-white font-medium hover:bg-[#6B0F2B] transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  Contact Us
                </Link>
                <a
                  href="tel:+212524430000"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[#EDE9E3] text-[#1A1A1A] font-medium hover:border-[#8B1538] transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  +212 524 43 00 00
                </a>
                <a
                  href="mailto:support@palaisrouge.ma"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[#EDE9E3] text-[#1A1A1A] font-medium hover:border-[#8B1538] transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  Email Support
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}