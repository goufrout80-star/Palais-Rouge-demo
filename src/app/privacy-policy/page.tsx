'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FDFCFA]">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <Link 
            href="/" 
            className="inline-flex items-center text-[#7D8471] hover:text-[#1A1A1A] transition-colors text-sm mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-[#1A1A1A] flex items-center justify-center">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-[#7D8471] text-xs tracking-[0.3em] uppercase block">
                  Legal
                </span>
                <h1 className="font-display text-3xl md:text-4xl text-[#1A1A1A]">
                  Privacy Policy
                </h1>
              </div>
            </div>
            <p className="text-[#7D8471] text-sm">
              Last updated: January 30, 2026
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="prose prose-lg max-w-none"
          >
            <div className="space-y-8 text-[#4A4A4A]">
              <section>
                <h2 className="font-display text-2xl text-[#1A1A1A] mb-4">1. Introduction</h2>
                <p className="leading-relaxed">
                  Welcome to Palais Rouge Immobilier (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-[#1A1A1A] mb-4">2. Information We Collect</h2>
                <p className="leading-relaxed mb-4">We collect information that you provide directly to us, including:</p>
                <ul className="list-none space-y-3 pl-0">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-[#C9A962] rounded-full mt-2.5 flex-shrink-0" />
                    <span>Personal identification information (name, email address, phone number)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-[#C9A962] rounded-full mt-2.5 flex-shrink-0" />
                    <span>Property preferences and search history</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-[#C9A962] rounded-full mt-2.5 flex-shrink-0" />
                    <span>Communication records and inquiry details</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-[#C9A962] rounded-full mt-2.5 flex-shrink-0" />
                    <span>Account credentials and authentication data</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl text-[#1A1A1A] mb-4">3. How We Use Your Information</h2>
                <p className="leading-relaxed mb-4">We use the information we collect to:</p>
                <ul className="list-none space-y-3 pl-0">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-[#C9A962] rounded-full mt-2.5 flex-shrink-0" />
                    <span>Provide, maintain, and improve our services</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-[#C9A962] rounded-full mt-2.5 flex-shrink-0" />
                    <span>Process transactions and send related information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-[#C9A962] rounded-full mt-2.5 flex-shrink-0" />
                    <span>Send promotional communications (with your consent)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-[#C9A962] rounded-full mt-2.5 flex-shrink-0" />
                    <span>Respond to your inquiries and provide customer support</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl text-[#1A1A1A] mb-4">4. Data Security</h2>
                <p className="leading-relaxed">
                  We implement appropriate technical and organizational security measures designed to protect your personal information. However, no electronic transmission or storage of information can be guaranteed to be 100% secure.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-[#1A1A1A] mb-4">5. Your Rights</h2>
                <p className="leading-relaxed mb-4">You have the right to:</p>
                <ul className="list-none space-y-3 pl-0">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-[#C9A962] rounded-full mt-2.5 flex-shrink-0" />
                    <span>Access and receive a copy of your personal data</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-[#C9A962] rounded-full mt-2.5 flex-shrink-0" />
                    <span>Rectify any inaccurate personal data</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-[#C9A962] rounded-full mt-2.5 flex-shrink-0" />
                    <span>Request deletion of your personal data</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-[#C9A962] rounded-full mt-2.5 flex-shrink-0" />
                    <span>Withdraw consent at any time</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl text-[#1A1A1A] mb-4">6. Contact Us</h2>
                <p className="leading-relaxed">
                  If you have questions about this Privacy Policy or our data practices, please contact us at:
                </p>
                <div className="mt-4 p-6 bg-[#F8F6F3] border border-[#EDE9E3]">
                  <p className="font-medium text-[#1A1A1A]">Palais Rouge Immobilier</p>
                  <p className="mt-2">Email: privacy@palaisrouge.ma</p>
                  <p>Phone: +1 (555) 123-4567</p>
                  <p>Address: 123 Real Estate Ave, New York, NY 10001</p>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
