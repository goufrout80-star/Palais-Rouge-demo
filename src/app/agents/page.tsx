'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, MapPin, Star, Phone, Mail, MessageSquare,
  Award, Home, Users, ArrowRight, Filter
} from 'lucide-react';
import Link from 'next/link';

interface Agent {
  id: string;
  name: string;
  title: string;
  image: string;
  location: string;
  specialties: string[];
  languages: string[];
  rating: number;
  reviews: number;
  propertiesSold: number;
  yearsExperience: number;
  phone: string;
  email: string;
  bio: string;
}

const agents: Agent[] = [
  {
    id: '1',
    name: 'Sarah El Amrani',
    title: 'Senior Luxury Specialist',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    location: 'Marrakech',
    specialties: ['Luxury Villas', 'Riads', 'Investment Properties'],
    languages: ['English', 'French', 'Arabic'],
    rating: 4.9,
    reviews: 127,
    propertiesSold: 89,
    yearsExperience: 12,
    phone: '+212 600 123 456',
    email: 'sarah@palaisrouge.ma',
    bio: 'Specializing in luxury properties in Marrakech\'s most prestigious neighborhoods for over a decade.'
  },
  {
    id: '2',
    name: 'Mohammed Bennani',
    title: 'Commercial Real Estate Expert',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    location: 'Casablanca',
    specialties: ['Commercial', 'Office Spaces', 'Retail'],
    languages: ['English', 'French', 'Arabic', 'Spanish'],
    rating: 4.8,
    reviews: 93,
    propertiesSold: 156,
    yearsExperience: 15,
    phone: '+212 600 234 567',
    email: 'mohammed@palaisrouge.ma',
    bio: 'Expert in commercial real estate with a focus on prime business locations in Morocco\'s economic capital.'
  },
  {
    id: '3',
    name: 'Yasmine Idrissi',
    title: 'Residential Specialist',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
    location: 'Rabat',
    specialties: ['Apartments', 'Penthouses', 'First-time Buyers'],
    languages: ['English', 'French', 'Arabic'],
    rating: 4.9,
    reviews: 78,
    propertiesSold: 64,
    yearsExperience: 8,
    phone: '+212 600 345 678',
    email: 'yasmine@palaisrouge.ma',
    bio: 'Passionate about helping clients find their dream home in Rabat\'s finest neighborhoods.'
  },
  {
    id: '4',
    name: 'Karim Alaoui',
    title: 'International Property Consultant',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    location: 'Tangier',
    specialties: ['International Buyers', 'Waterfront Properties', 'New Developments'],
    languages: ['English', 'French', 'Arabic', 'German'],
    rating: 4.7,
    reviews: 61,
    propertiesSold: 73,
    yearsExperience: 10,
    phone: '+212 600 456 789',
    email: 'karim@palaisrouge.ma',
    bio: 'Helping international clients navigate Morocco\'s property market with ease and confidence.'
  },
  {
    id: '5',
    name: 'Fatima Zahra Chraibi',
    title: 'Luxury Estate Agent',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400',
    location: 'Marrakech',
    specialties: ['Historic Properties', 'Riads', 'Boutique Hotels'],
    languages: ['English', 'French', 'Arabic', 'Italian'],
    rating: 5.0,
    reviews: 45,
    propertiesSold: 38,
    yearsExperience: 7,
    phone: '+212 600 567 890',
    email: 'fatima@palaisrouge.ma',
    bio: 'Specializing in unique historic properties and boutique hospitality investments in the Medina.'
  },
  {
    id: '6',
    name: 'Omar Tazi',
    title: 'Investment Property Specialist',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
    location: 'Casablanca',
    specialties: ['Investment Properties', 'Rental Portfolios', 'Development Projects'],
    languages: ['English', 'French', 'Arabic'],
    rating: 4.8,
    reviews: 82,
    propertiesSold: 112,
    yearsExperience: 14,
    phone: '+212 600 678 901',
    email: 'omar@palaisrouge.ma',
    bio: 'Building wealth through strategic real estate investments across Morocco\'s growth markets.'
  },
];

const locations = ['All Locations', 'Marrakech', 'Casablanca', 'Rabat', 'Tangier'];
const specialties = ['All Specialties', 'Luxury Villas', 'Apartments', 'Commercial', 'Riads', 'Investment Properties'];

export default function AgentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const [showFilters, setShowFilters] = useState(false);

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.bio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = selectedLocation === 'All Locations' || agent.location === selectedLocation;
    const matchesSpecialty = selectedSpecialty === 'All Specialties' || 
                            agent.specialties.some(s => s.includes(selectedSpecialty.replace('All Specialties', '')));
    return matchesSearch && matchesLocation && matchesSpecialty;
  });

  return (
    <main className="min-h-screen bg-[#FDFCFA] pt-20">
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#8B1538] text-xs tracking-[0.3em] uppercase mb-4 block"
          >
            Our Team
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-6"
          >
            Find Your Agent
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 max-w-2xl mx-auto text-lg"
          >
            Connect with experienced real estate professionals who understand your needs
            and know the market inside out.
          </motion.p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-8 border-b border-[#EDE9E3] bg-white sticky top-[72px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7D8471]" />
              <input
                type="text"
                placeholder="Search agents by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[#F8F6F3] border border-[#EDE9E3] text-[#1A1A1A] focus:outline-none focus:border-[#8B1538] transition-colors"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center justify-center gap-2 px-4 py-3 border border-[#EDE9E3] text-[#1A1A1A]"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
            <div className={`${showFilters ? 'flex' : 'hidden'} md:flex flex-col md:flex-row gap-4`}>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-3 bg-[#F8F6F3] border border-[#EDE9E3] text-[#1A1A1A] focus:outline-none focus:border-[#8B1538]"
              >
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="px-4 py-3 bg-[#F8F6F3] border border-[#EDE9E3] text-[#1A1A1A] focus:outline-none focus:border-[#8B1538]"
              >
                {specialties.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-[#F8F6F3] border-b border-[#EDE9E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, value: '50+', label: 'Expert Agents' },
              { icon: Home, value: '2,500+', label: 'Properties Sold' },
              { icon: Star, value: '4.9', label: 'Average Rating' },
              { icon: Award, value: '15+', label: 'Years Experience' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <stat.icon className="w-8 h-8 text-[#8B1538] mx-auto mb-3" />
                <p className="font-display text-3xl text-[#1A1A1A]">{stat.value}</p>
                <p className="text-sm text-[#7D8471]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agents Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAgents.map((agent, idx) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white border border-[#EDE9E3] overflow-hidden group hover:border-[#8B1538] transition-colors"
              >
                {/* Image */}
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={agent.image}
                    alt={agent.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm">
                    <Star className="w-4 h-4 text-[#C4A35A] fill-current" />
                    <span className="text-sm font-medium">{agent.rating}</span>
                    <span className="text-xs text-[#7D8471]">({agent.reviews})</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-[#7D8471] mb-2">
                    <MapPin className="w-4 h-4" />
                    {agent.location}
                  </div>
                  <h3 className="font-display text-xl text-[#1A1A1A] mb-1">{agent.name}</h3>
                  <p className="text-sm text-[#8B1538] font-medium mb-3">{agent.title}</p>
                  <p className="text-sm text-[#7D8471] mb-4 line-clamp-2">{agent.bio}</p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 py-4 border-t border-[#EDE9E3] mb-4">
                    <div className="text-center flex-1">
                      <p className="font-display text-lg text-[#1A1A1A]">{agent.propertiesSold}</p>
                      <p className="text-xs text-[#7D8471]">Properties Sold</p>
                    </div>
                    <div className="w-px h-8 bg-[#EDE9E3]" />
                    <div className="text-center flex-1">
                      <p className="font-display text-lg text-[#1A1A1A]">{agent.yearsExperience}</p>
                      <p className="text-xs text-[#7D8471]">Years Exp.</p>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {agent.specialties.slice(0, 2).map((spec, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-[#F8F6F3] text-[#7D8471]">
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <a
                      href={`tel:${agent.phone}`}
                      className="flex-1 py-3 border border-[#EDE9E3] text-[#1A1A1A] text-sm font-medium flex items-center justify-center gap-2 hover:border-[#8B1538] hover:text-[#8B1538] transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      Call
                    </a>
                    <a
                      href={`mailto:${agent.email}`}
                      className="flex-1 py-3 border border-[#EDE9E3] text-[#1A1A1A] text-sm font-medium flex items-center justify-center gap-2 hover:border-[#8B1538] hover:text-[#8B1538] transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      Email
                    </a>
                    <Link
                      href={`/contact?agent=${agent.id}`}
                      className="flex-1 py-3 bg-[#8B1538] text-white text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#6B0F2B] transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Contact
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredAgents.length === 0 && (
            <div className="text-center py-16">
              <Users className="w-12 h-12 text-[#7D8471] mx-auto mb-4" />
              <p className="text-[#7D8471] text-lg">No agents found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedLocation('All Locations');
                  setSelectedSpecialty('All Specialties');
                }}
                className="mt-4 text-[#8B1538] font-medium hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="py-16 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl text-white mb-4">Join Our Team</h2>
          <p className="text-white/60 mb-8 max-w-2xl mx-auto">
            Are you a talented real estate professional? We're always looking for
            exceptional agents to join the Palais Rouge family.
          </p>
          <Link
            href="/contact?subject=careers"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B1538] text-white font-medium hover:bg-[#6B0F2B] transition-colors"
          >
            Apply Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
