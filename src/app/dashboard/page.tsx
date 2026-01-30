'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Heart, Eye, Calendar, MessageSquare, Search, 
  Clock, MapPin, ArrowRight, Building2, ArrowUpRight
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { Property } from '@/types';

const MOCK_FAVORITES: Property[] = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    description: 'Stunning apartment with city views',
    price: 450000,
    listingType: 'BUY',
    propertyType: 'APARTMENT',
    status: 'AVAILABLE',
    address: '123 Main Street',
    city: 'New York',
    neighborhood: 'Manhattan',
    bedrooms: 2,
    bathrooms: 2,
    surfaceArea: 1200,
    hasPool: false,
    hasParking: true,
    hasGarden: false,
    hasAC: true,
    hasGym: true,
    hasElevator: true,
    hasSecurity: true,
    images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'],
    featured: true,
    approved: true,
    viewCount: 245,
    agentId: '2',
    createdAt: '2024-01-15T10:00:00Z'
  }
];

const MOCK_VISITS = [
  { id: '1', property: 'Modern Downtown Apartment', date: '2024-01-20', time: '10:00 AM', status: 'confirmed' },
  { id: '2', property: 'Luxury Beach Villa', date: '2024-01-22', time: '2:00 PM', status: 'pending' },
];

export default function UserDashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
    if (!isLoading && isAuthenticated && user?.role !== 'user') {
      const redirects: Record<string, string> = {
        admin: '/admin/dashboard',
        agent: '/agent/dashboard',
      };
      router.push(redirects[user?.role || 'user'] || '/dashboard');
    }
  }, [isLoading, isAuthenticated, user, router]);

  if (isLoading || !isAuthenticated || user?.role !== 'user') {
    return (
      <div className="min-h-screen bg-[#FDFCFA] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#EDE9E3] border-t-[#1A1A1A] rounded-full animate-spin" />
      </div>
    );
  }

  const stats = [
    { icon: Heart, label: 'Saved Properties', value: '12', color: 'text-[#C9A962]', bg: 'bg-[#C9A962]/10' },
    { icon: Eye, label: 'Recently Viewed', value: '28', color: 'text-[#7D8471]', bg: 'bg-[#7D8471]/10' },
    { icon: Calendar, label: 'Scheduled Visits', value: '3', color: 'text-[#1A1A1A]', bg: 'bg-[#1A1A1A]/5' },
    { icon: MessageSquare, label: 'Inquiries Sent', value: '7', color: 'text-[#4A4A4A]', bg: 'bg-[#4A4A4A]/10' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFA]">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <span className="text-[#7D8471] text-xs tracking-[0.3em] uppercase mb-4 block">
              Dashboard
            </span>
            <h1 className="font-display text-3xl md:text-4xl text-[#1A1A1A]">
              Welcome back, <span className="italic text-[#7D8471]">{user.name}</span>
            </h1>
            <p className="text-[#4A4A4A] mt-2">
              Manage your property searches and saved listings
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white border border-[#EDE9E3] p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs tracking-wide uppercase text-[#7D8471] mb-1">{stat.label}</p>
                    <p className="font-display text-2xl text-[#1A1A1A]">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.bg} flex items-center justify-center`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Saved Properties */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-[#EDE9E3]">
                <div className="px-6 py-5 border-b border-[#EDE9E3] flex items-center justify-between">
                  <h2 className="font-display text-lg text-[#1A1A1A]">Saved Properties</h2>
                  <Link href="/favorites" className="text-sm text-[#7D8471] hover:text-[#1A1A1A] transition-colors flex items-center gap-1">
                    View All <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="p-6">
                  {MOCK_FAVORITES.length > 0 ? (
                    <div className="space-y-4">
                      {MOCK_FAVORITES.map((property) => (
                        <div key={property.id} className="flex gap-4 p-4 bg-[#F8F6F3] group">
                          <div className="w-24 h-24 bg-[#EDE9E3] overflow-hidden flex-shrink-0">
                            <img 
                              src={property.images[0]} 
                              alt={property.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="flex-1">
                            <Link href={`/properties/${property.id}`}>
                              <h3 className="font-display text-[#1A1A1A] hover:text-[#7D8471] transition-colors">
                                {property.title}
                              </h3>
                            </Link>
                            <div className="flex items-center text-[#7D8471] text-sm mt-1">
                              <MapPin className="w-3.5 h-3.5 mr-1" />
                              {property.city}
                            </div>
                            <p className="font-display text-lg text-[#1A1A1A] mt-2">
                              ${property.price.toLocaleString()}
                            </p>
                          </div>
                          <button className="text-[#C9A962] hover:text-[#1A1A1A] transition-colors">
                            <Heart className="w-5 h-5 fill-current" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Heart className="w-12 h-12 text-[#EDE9E3] mx-auto mb-4" />
                      <p className="text-[#4A4A4A]">No saved properties yet</p>
                      <Link href="/properties">
                        <button className="mt-4 px-6 py-2 border border-[#1A1A1A] text-[#1A1A1A] text-sm hover:bg-[#1A1A1A] hover:text-white transition-colors">
                          Browse Properties
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Upcoming Visits */}
              <div className="bg-white border border-[#EDE9E3]">
                <div className="px-6 py-5 border-b border-[#EDE9E3]">
                  <h2 className="font-display text-lg text-[#1A1A1A]">Upcoming Visits</h2>
                </div>
                <div className="p-6">
                  {MOCK_VISITS.length > 0 ? (
                    <div className="space-y-4">
                      {MOCK_VISITS.map((visit) => (
                        <div key={visit.id} className="p-4 bg-[#F8F6F3]">
                          <h4 className="font-medium text-[#1A1A1A]">{visit.property}</h4>
                          <div className="flex items-center text-[#7D8471] text-sm mt-2">
                            <Calendar className="w-4 h-4 mr-2" />
                            {visit.date}
                          </div>
                          <div className="flex items-center text-[#7D8471] text-sm mt-1">
                            <Clock className="w-4 h-4 mr-2" />
                            {visit.time}
                          </div>
                          <span className={`inline-block mt-3 px-3 py-1 text-xs font-medium uppercase tracking-wide ${
                            visit.status === 'confirmed' 
                              ? 'bg-[#7D8471]/10 text-[#7D8471]' 
                              : 'bg-[#C9A962]/10 text-[#C9A962]'
                          }`}>
                            {visit.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 text-[#EDE9E3] mx-auto mb-4" />
                      <p className="text-[#4A4A4A]">No scheduled visits</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white border border-[#EDE9E3]">
                <div className="px-6 py-5 border-b border-[#EDE9E3]">
                  <h2 className="font-display text-lg text-[#1A1A1A]">Quick Actions</h2>
                </div>
                <div className="p-6 space-y-3">
                  <Link href="/properties" className="block">
                    <button className="w-full px-4 py-3 border border-[#EDE9E3] text-[#1A1A1A] text-sm flex items-center justify-between hover:border-[#1A1A1A] transition-colors group">
                      <span className="flex items-center gap-2">
                        <Search className="w-4 h-4 text-[#7D8471]" />
                        Search Properties
                      </span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </Link>
                  <Link href="/properties?listingType=BUY" className="block">
                    <button className="w-full px-4 py-3 border border-[#EDE9E3] text-[#1A1A1A] text-sm flex items-center justify-between hover:border-[#1A1A1A] transition-colors group">
                      <span className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-[#7D8471]" />
                        Properties for Sale
                      </span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </Link>
                  <Link href="/properties?listingType=RENT" className="block">
                    <button className="w-full px-4 py-3 border border-[#EDE9E3] text-[#1A1A1A] text-sm flex items-center justify-between hover:border-[#1A1A1A] transition-colors group">
                      <span className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-[#7D8471]" />
                        Properties for Rent
                      </span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
