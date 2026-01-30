'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Camera, Users, Calendar, CheckCircle, Award,
  ArrowRight, Home, DollarSign, Clock, Star, Phone, Mail
} from 'lucide-react';
import Link from 'next/link';

export default function SellingGuidePage() {
  const steps = [
    {
      icon: Home,
      title: 'Prepare Your Property',
      description: 'Clean, declutter, make necessary repairs, and stage your home for maximum appeal.'
    },
    {
      icon: Camera,
      title: 'Professional Photography',
      description: 'High-quality photos and virtual tours are essential for attracting serious buyers.'
    },
    {
      icon: Users,
      title: 'Choose the Right Agent',
      description: 'Partner with an experienced agent who understands your market and has proven results.'
    },
    {
      icon: DollarSign,
      title: 'Set Competitive Pricing',
      description: 'Price strategically based on market analysis to attract qualified buyers quickly.'
    },
    {
      icon: Calendar,
      title: 'Marketing & Exposure',
      description: 'Utilize multiple channels including online listings, social media, and networking.'
    },
    {
      icon: CheckCircle,
      title: 'Negotiate & Close',
      description: 'Work with your agent to negotiate favorable terms and navigate the closing process.'
    }
  ];

  const pricingFactors = [
    {
      title: 'Location',
      description: 'Neighborhood desirability, proximity to amenities, schools, and transportation.'
    },
    {
      title: 'Property Condition',
      description: 'Age, maintenance, recent renovations, and overall move-in readiness.'
    },
    {
      title: 'Market Trends',
      description: 'Current supply and demand, seasonal fluctuations, and economic factors.'
    },
    {
      title: 'Comparable Sales',
      description: 'Recent sales of similar properties in your area (comps).'
    }
  ];

  const tips = [
    {
      title: 'Time Your Sale Right',
      content: 'Spring and early summer typically see the most buyer activity. Avoid listing during holidays or extreme weather.'
    },
    {
      title: 'First Impressions Matter',
      content: 'Invest in curb appeal - landscaping, fresh paint, clean exterior. Buyers decide in the first few minutes.'
    },
    {
      title: 'Don\'t Overprice',
      description: 'Overpriced homes sit longer and often sell for less. Price competitively to generate interest and offers.'
    },
    {
      title: 'Be Flexible',
      content: 'Successful sales require compromise. Prepare for negotiations on price, closing dates, and contingencies.'
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
                Expert Guide
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-6"
              >
                Selling Your Property<br />for Maximum Value
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/60 text-lg mb-8"
              >
                Learn how to sell your property quickly and for the best possible price
                with our comprehensive selling guide.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  href="/sell"
                  className="px-6 py-3 bg-[#8B1538] text-white font-medium hover:bg-[#6B0F2B] transition-colors"
                >
                  Get Free Valuation
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 border border-white/30 text-white font-medium hover:bg-white/10 transition-colors"
                >
                  Talk to an Expert
                </Link>
              </motion.div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800"
                alt="Luxury villa for sale"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#8B1538] flex items-center justify-center">
                <TrendingUp className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b border-[#EDE9E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: DollarSign, value: '12%', label: 'Higher average sale price' },
              { icon: Clock, value: '45', label: 'Days average to sell' },
              { icon: Star, value: '4.9', label: 'Customer satisfaction' },
              { icon: Award, value: '15+', label: 'Years experience' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
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
              The Process
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-[#1A1A1A] mb-4">
              How to Sell Your Property
            </h2>
            <p className="text-[#7D8471] max-w-2xl mx-auto">
              Follow these proven steps to maximize your property's value and sell quickly.
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

      {/* Pricing Factors */}
      <section className="py-16 lg:py-24 bg-[#F8F6F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-[#1A1A1A] mb-4">
              What Determines Your Home's Value?
            </h2>
            <p className="text-[#7D8471] max-w-2xl mx-auto">
              Several key factors influence how much your property will sell for.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pricingFactors.map((factor, idx) => (
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
                    {idx === 0 && <Home className="w-6 h-6 text-[#8B1538]" />}
                    {idx === 1 && <Star className="w-6 h-6 text-[#8B1538]" />}
                    {idx === 2 && <TrendingUp className="w-6 h-6 text-[#8B1538]" />}
                    {idx === 3 && <DollarSign className="w-6 h-6 text-[#8B1538]" />}
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-[#1A1A1A] mb-2">{factor.title}</h3>
                    <p className="text-sm text-[#7D8471]">{factor.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pro Tips */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-[#1A1A1A] mb-4">
              Seller Success Tips
            </h2>
            <p className="text-[#7D8471] max-w-2xl mx-auto">
              Professional advice to help you get the best price for your property.
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
                className="bg-white border border-[#EDE9E3] p-6 hover:border-[#8B1538] transition-colors"
              >
                <h3 className="font-display text-lg text-[#1A1A1A] mb-3">{tip.title}</h3>
                <p className="text-sm text-[#7D8471]">{tip.content || tip.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-16 lg:py-24 bg-[#F8F6F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-[#1A1A1A] mb-4">
              Selling Questions Answered
            </h2>
            <p className="text-[#7D8471] mb-8">
              Get clarity on common concerns when selling your property.
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
                q: 'How do I determine my home\'s value?',
                a: 'We provide free professional valuations using comparable sales data and market analysis.'
              },
              {
                q: 'What are the selling costs?',
                a: 'Expect 2-5% for agent commissions, plus closing costs, inspections, and potential repairs.'
              },
              {
                q: 'Should I make repairs before selling?',
                a: 'Minor repairs and improvements often provide good ROI. Major renovations should be evaluated case-by-case.'
              },
              {
                q: 'How long will it take to sell?',
                a: 'Well-priced properties in good condition typically sell within 45-90 days in Morocco\'s luxury market.'
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
          <h2 className="font-display text-3xl text-white mb-4">Ready to Sell?</h2>
          <p className="text-white/60 mb-8 max-w-2xl mx-auto">
            Get a free, no-obligation valuation from our expert team today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/sell"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B1538] text-white font-medium hover:bg-[#6B0F2B] transition-colors"
            >
              <DollarSign className="w-5 h-5" />
              Request Valuation
            </Link>
            <a
              href="tel:+212524430000"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white font-medium hover:bg-white/10 transition-colors"
            >
              <Phone className="w-5 h-5" />
              +212 524 43 00 00
            </a>
            <a
              href="mailto:sales@palaisrouge.ma"
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
