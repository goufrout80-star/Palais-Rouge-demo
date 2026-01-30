'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Key, FileText, Shield, Calendar, Users, CheckCircle,
  ArrowRight, Home, Search, Phone, Mail
} from 'lucide-react';
import Link from 'next/link';

export default function RentingGuidePage() {
  const checklist = [
    'Determine your budget and preferred neighborhoods',
    'Research rental market prices in your target area',
    'Prepare necessary documents (ID, proof of income, references)',
    'Find a reputable real estate agent',
    'Schedule property viewings',
    'Negotiate lease terms and conditions',
    'Conduct property inspection',
    'Sign lease agreement',
    'Pay required deposits and first month\'s rent',
    'Move in and document property condition'
  ];

  const tenantRights = [
    {
      title: 'Lease Agreement',
      description: 'You have the right to a written lease agreement outlining all terms and conditions.'
    },
    {
      title: 'Privacy',
      description: 'Landlords must give reasonable notice (usually 24-48 hours) before entering your property.'
    },
    {
      title: 'Repairs',
      description: 'Landlords are responsible for major repairs and maintaining habitable living conditions.'
    },
    {
      title: 'Deposit Protection',
      description: 'Security deposits must be returned within the legally required timeframe with proper documentation.'
    }
  ];

  const tips = [
    {
      title: 'Budget Wisely',
      content: 'Factor in utilities, internet, and other monthly expenses. Aim to spend no more than 30% of your gross income on rent.'
    },
    {
      title: 'Location Matters',
      content: 'Consider commute times, nearby amenities, and neighborhood safety. Research future development plans in the area.'
    },
    {
      title: 'Inspect Thoroughly',
      content: 'Document the property\'s condition with photos/videos before moving in. Test all appliances and fixtures.'
    },
    {
      title: 'Read Carefully',
      content: 'Review all lease terms, especially clauses about pets, guests, subletting, and renewal options.'
    }
  ];

  return (
    <main className="min-h-screen bg-[#FDFCFA] pt-20">
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[#8B1538] text-xs tracking-[0.3em] uppercase mb-4 block"
              >
                Ultimate Guide
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-6"
              >
                Renting a Property<br />in Morocco
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/60 text-lg mb-8"
              >
                Everything you need to know about renting in Morocco, from finding the perfect place
                to understanding your rights as a tenant.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  href="/properties?type=RENT"
                  className="px-6 py-3 bg-[#8B1538] text-white font-medium hover:bg-[#6B0F2B] transition-colors"
                >
                  Browse Rentals
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 border border-white/30 text-white font-medium hover:bg-white/10 transition-colors"
                >
                  Get Help
                </Link>
              </motion.div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"
                alt="Modern apartment interior"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#8B1538] flex items-center justify-center">
                <Key className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="py-16 lg:py-24 bg-white border-b border-[#EDE9E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-[#1A1A1A] mb-4">
              Your Renting Checklist
            </h2>
            <p className="text-[#7D8471] max-w-2xl mx-auto">
              Follow these steps to rent your new home with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {checklist.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#F8F6F3] p-5 border border-[#EDE9E3]"
              >
                <div className="w-8 h-8 bg-[#8B1538] text-white flex items-center justify-center font-display text-sm mb-3">
                  {idx + 1}
                </div>
                <p className="text-sm text-[#4A4A4A]">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tenant Rights */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#8B1538] text-xs tracking-[0.3em] uppercase mb-4 block">
              Know Your Rights
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-[#1A1A1A] mb-4">
              Tenant Rights in Morocco
            </h2>
            <p className="text-[#7D8471] max-w-2xl mx-auto">
              Understanding your legal protections as a tenant helps ensure a fair and positive renting experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tenantRights.map((right, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex gap-4 p-6 bg-white border border-[#EDE9E3] hover:border-[#8B1538] transition-colors"
              >
                <Shield className="w-8 h-8 text-[#8B1538] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-display text-lg text-[#1A1A1A] mb-2">{right.title}</h3>
                  <p className="text-sm text-[#7D8471]">{right.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 lg:py-24 bg-[#F8F6F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-[#1A1A1A] mb-4">
              Pro Tips for Renters
            </h2>
            <p className="text-[#7D8471] max-w-2xl mx-auto">
              Expert advice to help you find and secure the perfect rental property.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tips.map((tip, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white border border-[#EDE9E3] p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#8B1538]/10 flex items-center justify-center flex-shrink-0">
                    {idx === 0 && <FileText className="w-6 h-6 text-[#8B1538]" />}
                    {idx === 1 && <Search className="w-6 h-6 text-[#8B1538]" />}
                    {idx === 2 && <Home className="w-6 h-6 text-[#8B1538]" />}
                    {idx === 3 && <FileText className="w-6 h-6 text-[#8B1538]" />}
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-[#1A1A1A] mb-2">{tip.title}</h3>
                    <p className="text-sm text-[#7D8471]">{tip.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-[#1A1A1A] mb-4">
              Common Questions
            </h2>
            <p className="text-[#7D8471] mb-8">
              Answers to frequently asked questions about renting in Morocco.
            </p>
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-[#8B1538] font-medium hover:underline"
            >
              View All FAQs
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                q: 'What documents do I need to rent?',
                a: 'Typically you\'ll need ID, proof of income, bank statements, and references from previous landlords.'
              },
              {
                q: 'How much deposit is required?',
                a: 'Usually 2-3 months rent as security deposit, plus first month\'s rent paid upfront.'
              },
              {
                q: 'Can I negotiate the rental price?',
                a: 'Yes, especially for longer leases or if you can provide excellent references.'
              },
              {
                q: 'What\'s included in the rent?',
                a: 'This varies by property. Some include utilities, others are base rent only.'
              }
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white border border-[#EDE9E3] p-5"
              >
                <h3 className="font-medium text-[#1A1A1A] mb-2">{faq.q}</h3>
                <p className="text-sm text-[#7D8471]">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl text-white mb-4">Ready to Find Your Home?</h2>
          <p className="text-white/60 mb-8 max-w-2xl mx-auto">
            Let our expert agents help you navigate the rental market and find the perfect property.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/properties?type=RENT"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B1538] text-white font-medium hover:bg-[#6B0F2B] transition-colors"
            >
              <Search className="w-5 h-5" />
              Browse Rentals
            </Link>
            <a
              href="tel:+212524430000"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white font-medium hover:bg-white/10 transition-colors"
            >
              <Phone className="w-5 h-5" />
              +212 524 43 00 00
            </a>
            <a
              href="mailto:rentals@palaisrouge.ma"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white font-medium hover:bg-white/10 transition-colors"
            >
              <Mail className="w-5 h-5" />
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
