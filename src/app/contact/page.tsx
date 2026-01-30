'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, Phone, Mail, Clock, Send, MessageSquare,
  Building2, Users, Briefcase, ArrowRight
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['Bd Abdelkrim Al Khattabi', 'Marrakech 40000, Morocco'],
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+212 524 43 00 00', '+212 524 43 00 01'],
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['contact@palaisrouge.ma', 'support@palaisrouge.ma'],
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 4:00 PM'],
    },
  ];

  const inquiryTypes = [
    { id: 'general', label: 'General Inquiry', icon: MessageSquare },
    { id: 'buying', label: 'Buying a Property', icon: Building2 },
    { id: 'selling', label: 'Selling a Property', icon: Briefcase },
    { id: 'agent', label: 'Become an Agent', icon: Users },
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#FDFCFA]">
        <Navbar />
        <main className="pt-20 max-w-2xl mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 bg-[#8B1538]/10 mx-auto mb-6 flex items-center justify-center"
          >
            <Send className="w-10 h-10 text-[#8B1538]" />
          </motion.div>
          <h1 className="font-display text-3xl text-[#1A1A1A] mb-4">Message Sent!</h1>
          <p className="text-[#7D8471] mb-8">
            Thank you for contacting us. Our team will get back to you within 24 hours.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B1538] text-white font-medium hover:bg-[#6B0F2B] transition-colors"
          >
            Back to Home
            <ArrowRight className="w-4 h-4" />
          </a>
        </main>
        <Footer />
      </div>
    );
  }

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
              Get in Touch
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-6"
            >
              Contact Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/60 max-w-2xl mx-auto text-lg"
            >
              Have a question or need assistance? Our team of experts is here to help you
              find your perfect property.
            </motion.p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16 border-b border-[#EDE9E3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white border border-[#EDE9E3] p-6 hover:border-[#8B1538] transition-colors group"
                >
                  <div className="w-12 h-12 bg-[#F8F6F3] flex items-center justify-center mb-4 group-hover:bg-[#8B1538]/10 transition-colors">
                    <item.icon className="w-6 h-6 text-[#8B1538]" />
                  </div>
                  <h3 className="font-display text-lg text-[#1A1A1A] mb-2">{item.title}</h3>
                  {item.details.map((detail, i) => (
                    <p key={i} className="text-[#7D8471] text-sm">{detail}</p>
                  ))}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Form */}
              <div>
                <h2 className="font-display text-3xl text-[#1A1A1A] mb-2">Send us a Message</h2>
                <p className="text-[#7D8471] mb-8">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Inquiry Type */}
                  <div>
                    <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-3">
                      What can we help you with?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {inquiryTypes.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, inquiryType: type.id })}
                          className={`p-4 flex items-center gap-3 border transition-all ${
                            formData.inquiryType === type.id
                              ? 'bg-[#8B1538] text-white border-[#8B1538]'
                              : 'bg-white border-[#EDE9E3] text-[#4A4A4A] hover:border-[#8B1538]'
                          }`}
                        >
                          <type.icon className="w-5 h-5" />
                          <span className="text-sm font-medium">{type.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full px-4 py-3 bg-white border border-[#EDE9E3] text-[#1A1A1A] focus:outline-none focus:border-[#8B1538] transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full px-4 py-3 bg-white border border-[#EDE9E3] text-[#1A1A1A] focus:outline-none focus:border-[#8B1538] transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  {/* Phone & Subject */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#EDE9E3] text-[#1A1A1A] focus:outline-none focus:border-[#8B1538] transition-colors"
                        placeholder="+212 600 000 000"
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                        className="w-full px-4 py-3 bg-white border border-[#EDE9E3] text-[#1A1A1A] focus:outline-none focus:border-[#8B1538] transition-colors"
                        placeholder="How can we help?"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                      Message *
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-white border border-[#EDE9E3] text-[#1A1A1A] focus:outline-none focus:border-[#8B1538] transition-colors resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#8B1538] text-white font-medium flex items-center justify-center gap-2 hover:bg-[#6B0F2B] transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Map Placeholder */}
              <div>
                <h2 className="font-display text-3xl text-[#1A1A1A] mb-2">Our Location</h2>
                <p className="text-[#7D8471] mb-8">
                  Visit our office in the heart of Marrakech.
                </p>
                
                <div className="bg-[#F8F6F3] border border-[#EDE9E3] h-80 flex items-center justify-center mb-6">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-[#8B1538] mx-auto mb-3" />
                    <p className="text-[#1A1A1A] font-medium">Interactive Map Coming Soon</p>
                    <p className="text-[#7D8471] text-sm mt-1">Bd Abdelkrim Al Khattabi, Marrakech</p>
                  </div>
                </div>

                <a
                  href="https://maps.google.com/?q=Marrakech+Morocco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-6 text-[#8B1538] font-medium hover:underline"
                >
                  Open in Google Maps
                  <ArrowRight className="w-4 h-4" />
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