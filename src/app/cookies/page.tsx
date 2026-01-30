'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Cookie, Check, X } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function CookiesPage() {
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
                <Cookie className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-[#7D8471] text-xs tracking-[0.3em] uppercase block">
                  Legal
                </span>
                <h1 className="font-display text-3xl md:text-4xl text-[#1A1A1A]">
                  Cookie Policy
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
                <h2 className="font-display text-2xl text-[#1A1A1A] mb-4">What Are Cookies?</h2>
                <p className="leading-relaxed">
                  Cookies are small text files that are stored on your device when you visit a website. They help websites remember your preferences and understand how you interact with the site.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-[#1A1A1A] mb-4">Types of Cookies We Use</h2>
                
                {/* Cookie Types Table */}
                <div className="space-y-4 mt-6">
                  {/* Essential */}
                  <div className="bg-[#F8F6F3] border border-[#EDE9E3] p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#7D8471] flex items-center justify-center flex-shrink-0">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-display text-lg text-[#1A1A1A]">Essential Cookies</h3>
                          <span className="text-xs uppercase tracking-wide text-[#7D8471] bg-[#7D8471]/10 px-3 py-1">Always Active</span>
                        </div>
                        <p className="text-sm leading-relaxed">
                          These cookies are necessary for the website to function properly. They enable basic features like page navigation, secure areas access, and account authentication.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Analytics */}
                  <div className="bg-white border border-[#EDE9E3] p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#EDE9E3] flex items-center justify-center flex-shrink-0">
                        <Cookie className="w-5 h-5 text-[#7D8471]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-display text-lg text-[#1A1A1A]">Analytics Cookies</h3>
                          <span className="text-xs uppercase tracking-wide text-[#C9A962] bg-[#C9A962]/10 px-3 py-1">Optional</span>
                        </div>
                        <p className="text-sm leading-relaxed">
                          These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. We use this data to improve our services.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Marketing */}
                  <div className="bg-white border border-[#EDE9E3] p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#EDE9E3] flex items-center justify-center flex-shrink-0">
                        <Cookie className="w-5 h-5 text-[#7D8471]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-display text-lg text-[#1A1A1A]">Marketing Cookies</h3>
                          <span className="text-xs uppercase tracking-wide text-[#C9A962] bg-[#C9A962]/10 px-3 py-1">Optional</span>
                        </div>
                        <p className="text-sm leading-relaxed">
                          These cookies are used to track visitors across websites to display relevant advertisements. They help make advertising more engaging and valuable for users.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Preferences */}
                  <div className="bg-white border border-[#EDE9E3] p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#EDE9E3] flex items-center justify-center flex-shrink-0">
                        <Cookie className="w-5 h-5 text-[#7D8471]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-display text-lg text-[#1A1A1A]">Preference Cookies</h3>
                          <span className="text-xs uppercase tracking-wide text-[#C9A962] bg-[#C9A962]/10 px-3 py-1">Optional</span>
                        </div>
                        <p className="text-sm leading-relaxed">
                          These cookies remember your preferences and settings, such as language and region, to provide a more personalized experience on future visits.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="font-display text-2xl text-[#1A1A1A] mb-4">Managing Your Cookie Preferences</h2>
                <p className="leading-relaxed mb-4">
                  You can manage your cookie preferences at any time. Most web browsers allow you to control cookies through their settings. Here&apos;s how:
                </p>
                <ul className="list-none space-y-3 pl-0">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-[#C9A962] rounded-full mt-2.5 flex-shrink-0" />
                    <span><strong>Chrome:</strong> Settings → Privacy and Security → Cookies</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-[#C9A962] rounded-full mt-2.5 flex-shrink-0" />
                    <span><strong>Firefox:</strong> Options → Privacy & Security → Cookies</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-[#C9A962] rounded-full mt-2.5 flex-shrink-0" />
                    <span><strong>Safari:</strong> Preferences → Privacy → Cookies</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-[#C9A962] rounded-full mt-2.5 flex-shrink-0" />
                    <span><strong>Edge:</strong> Settings → Privacy → Cookies</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl text-[#1A1A1A] mb-4">Third-Party Cookies</h2>
                <p className="leading-relaxed">
                  Some cookies are placed by third-party services that appear on our pages. We do not control these third-party cookies and recommend reviewing their respective privacy policies for more information.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-[#1A1A1A] mb-4">Contact Us</h2>
                <p className="leading-relaxed">
                  If you have questions about our Cookie Policy, please contact us at:
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
