'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { useSiteConfig } from '@/context/SiteConfigContext';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { config } = useSiteConfig();

  const quickLinks = [
    { label: 'All Properties', href: '/properties' },
    { label: 'For Sale', href: '/properties?listingType=BUY' },
    { label: 'For Rent', href: '/properties?listingType=RENT' },
    { label: 'Advanced Search', href: '/search' },
  ];

  const propertyTypes = [
    { label: 'Houses', href: '/properties?propertyType=HOUSE' },
    { label: 'Apartments', href: '/properties?propertyType=APARTMENT' },
    { label: 'Villas', href: '/properties?propertyType=VILLA' },
    { label: 'Commercial', href: '/properties?propertyType=COMMERCIAL' },
    { label: 'Land', href: '/properties?propertyType=LAND' },
  ];

  return (
    <footer className="bg-[#1A1818]">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section - Brand & Newsletter */}
        <div className="py-16 lg:py-20 border-b border-white/10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Brand */}
            <div>
              <Link href="/" className="inline-block mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#8B1538] flex items-center justify-center">
                    <span className="text-white font-display font-bold text-lg">PR</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-display text-xl text-white leading-tight">Palais Rouge</span>
                    <span className="text-[10px] tracking-[0.2em] text-white/50 uppercase">Immobilier</span>
                  </div>
                </div>
              </Link>
              <p className="text-white/50 leading-relaxed max-w-md mb-8">
                L'excellence immobilière depuis 1985. Découvrez des propriétés d'exception 
                avec un service personnalisé et une expertise inégalée.
              </p>
              <div className="flex items-center gap-6">
                {config.socialLinks.filter(link => link.enabled).map((link, index) => (
                  <React.Fragment key={link.platform}>
                    {index > 0 && <span className="w-1 h-1 bg-white/20 rounded-full" />}
                    <a 
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/40 hover:text-[#8B1538] transition-colors text-sm tracking-wide capitalize"
                    >
                      {link.platform}
                    </a>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="flex flex-col justify-center">
              <span className="text-[#8B1538] text-xs tracking-[0.3em] uppercase mb-4">Stay Updated</span>
              <h3 className="font-display text-2xl text-white mb-4">
                Subscribe to our newsletter
              </h3>
              <p className="text-white/50 text-sm mb-6">
                Get the latest listings and market insights delivered to your inbox.
              </p>
              <form className="flex gap-0">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#8B1538]/50 transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#8B1538] text-white font-medium text-sm hover:bg-[#6B0F2B] transition-colors flex items-center gap-2"
                >
                  Subscribe
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Middle Section - Links */}
        <div className="py-12 border-b border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {/* Quick Links */}
            <div>
              <h4 className="text-white text-xs tracking-[0.2em] uppercase mb-6">Navigate</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className="text-white/50 text-sm hover:text-[#8B1538] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Property Types */}
            <div>
              <h4 className="text-white text-xs tracking-[0.2em] uppercase mb-6">Properties</h4>
              <ul className="space-y-3">
                {propertyTypes.map((type) => (
                  <li key={type.href}>
                    <Link 
                      href={type.href} 
                      className="text-white/50 text-sm hover:text-[#8B1538] transition-colors"
                    >
                      {type.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white text-xs tracking-[0.2em] uppercase mb-6">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-white/50 text-sm hover:text-[#8B1538] transition-colors">About Us</a></li>
                <li><a href="#" className="text-white/50 text-sm hover:text-[#8B1538] transition-colors">Our Team</a></li>
                <li><a href="#" className="text-white/50 text-sm hover:text-[#8B1538] transition-colors">Careers</a></li>
                <li><a href="#" className="text-white/50 text-sm hover:text-[#8B1538] transition-colors">Press</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white text-xs tracking-[0.2em] uppercase mb-6">Contact</h4>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="flex items-start gap-3 text-white/50 hover:text-[#8B1538] transition-colors group">
                    <MapPin className="w-4 h-4 mt-0.5 text-[#8B1538] group-hover:text-[#8B1538]" />
                    <span className="text-sm">{config.contactAddress}</span>
                  </a>
                </li>
                <li>
                  <a href={`tel:${config.contactPhone.replace(/\s/g, '')}`} className="flex items-center gap-3 text-white/50 hover:text-[#8B1538] transition-colors group">
                    <Phone className="w-4 h-4 text-[#8B1538] group-hover:text-[#8B1538]" />
                    <span className="text-sm">{config.contactPhone}</span>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${config.contactEmail}`} className="flex items-center gap-3 text-white/50 hover:text-[#8B1538] transition-colors group">
                    <Mail className="w-4 h-4 text-[#8B1538] group-hover:text-[#8B1538]" />
                    <span className="text-sm">{config.contactEmail}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">
            &copy; {currentYear} {config.companyName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            {config.legalPages.privacyPolicy.enabled && (
              <Link href="/privacy-policy" className="text-white/30 hover:text-white/60 transition-colors">
                {config.legalPages.privacyPolicy.title}
              </Link>
            )}
            {config.legalPages.termsOfService.enabled && (
              <Link href="/terms-of-service" className="text-white/30 hover:text-white/60 transition-colors">
                {config.legalPages.termsOfService.title}
              </Link>
            )}
            {config.legalPages.cookies.enabled && (
              <Link href="/cookies" className="text-white/30 hover:text-white/60 transition-colors">
                {config.legalPages.cookies.title}
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
