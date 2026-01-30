'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function TermsOfServicePage() {
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
                <FileText className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-[#7D8471] text-xs tracking-[0.3em] uppercase block">
                  Legal
                </span>
                <h1 className="font-display text-3xl md:text-4xl text-[#1A1A1A]">
                  Terms of Service
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
                <h2 className="font-display text-2xl text-[#1A1A1A] mb-4">1. Acceptance of Terms</h2>
                <p className="leading-relaxed">
                  By accessing and using the Palais Rouge Immobilier website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-[#1A1A1A] mb-4">2. Services Description</h2>
                <p className="leading-relaxed">
                  Palais Rouge Immobilier provides an online platform for real estate listings, property searches, and related services. We connect property buyers, sellers, and renters with real estate professionals.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-[#1A1A1A] mb-4">3. User Accounts</h2>
                <p className="leading-relaxed mb-4">When creating an account, you agree to:</p>
                <ul className="list-none space-y-3 pl-0">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-[#C9A962] rounded-full mt-2.5 flex-shrink-0" />
                    <span>Provide accurate and complete information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-[#C9A962] rounded-full mt-2.5 flex-shrink-0" />
                    <span>Maintain the security of your account credentials</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-[#C9A962] rounded-full mt-2.5 flex-shrink-0" />
                    <span>Promptly update any changes to your information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-[#C9A962] rounded-full mt-2.5 flex-shrink-0" />
                    <span>Accept responsibility for all activities under your account</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl text-[#1A1A1A] mb-4">4. Property Listings</h2>
                <p className="leading-relaxed mb-4">Users who list properties agree that:</p>
                <ul className="list-none space-y-3 pl-0">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-[#C9A962] rounded-full mt-2.5 flex-shrink-0" />
                    <span>All listing information is accurate and truthful</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-[#C9A962] rounded-full mt-2.5 flex-shrink-0" />
                    <span>They have the legal right to list the property</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-[#C9A962] rounded-full mt-2.5 flex-shrink-0" />
                    <span>Images used are authentic and owned or licensed</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-[#C9A962] rounded-full mt-2.5 flex-shrink-0" />
                    <span>Pricing and availability information is current</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl text-[#1A1A1A] mb-4">5. Prohibited Activities</h2>
                <p className="leading-relaxed mb-4">You may not use our services to:</p>
                <ul className="list-none space-y-3 pl-0">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-[#C9A962] rounded-full mt-2.5 flex-shrink-0" />
                    <span>Post fraudulent or misleading listings</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-[#C9A962] rounded-full mt-2.5 flex-shrink-0" />
                    <span>Harass or abuse other users</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-[#C9A962] rounded-full mt-2.5 flex-shrink-0" />
                    <span>Violate any applicable laws or regulations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-[#C9A962] rounded-full mt-2.5 flex-shrink-0" />
                    <span>Scrape or collect data without authorization</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl text-[#1A1A1A] mb-4">6. Intellectual Property</h2>
                <p className="leading-relaxed">
                  All content on Palais Rouge Immobilier, including text, graphics, logos, and software, is the property of Palais Rouge Immobilier or its licensors and is protected by intellectual property laws.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-[#1A1A1A] mb-4">7. Limitation of Liability</h2>
                <p className="leading-relaxed">
                  Palais Rouge Immobilier shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services. We do not guarantee the accuracy of listing information provided by third parties.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-[#1A1A1A] mb-4">8. Changes to Terms</h2>
                <p className="leading-relaxed">
                  We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the updated terms.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-[#1A1A1A] mb-4">9. Contact Us</h2>
                <p className="leading-relaxed">
                  If you have questions about these Terms of Service, please contact us at:
                </p>
                <div className="mt-4 p-6 bg-[#F8F6F3] border border-[#EDE9E3]">
                  <p className="font-medium text-[#1A1A1A]">Palais Rouge Immobilier</p>
                  <p className="mt-2">Email: legal@razestates.com</p>
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
