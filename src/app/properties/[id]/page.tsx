'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Heart, Share2, MapPin, Bed, Bath, Square, Calendar, Eye, 
  Car, Waves, Trees, Wind, Dumbbell, Shield, ArrowLeft,
  Phone, Mail, MessageSquare, ChevronLeft, ChevronRight, X, ArrowUpRight
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PropertyCard } from '@/components/property/PropertyCard';
import { formatPrice, formatDate, getPropertyTypeLabel } from '@/lib/utils';
import { Property } from '@/types';

const ALL_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    description: 'Stunning 2-bedroom apartment in the heart of downtown with panoramic city views. Features modern finishes, open floor plan, and premium amenities including a state-of-the-art fitness center and rooftop terrace. Floor-to-ceiling windows flood the space with natural light, while the gourmet kitchen boasts stainless steel appliances and quartz countertops. The master suite includes a spa-like bathroom with dual vanities and a walk-in closet. Building amenities include 24-hour concierge, package room, and bike storage.',
    price: 450000,
    listingType: 'BUY',
    propertyType: 'APARTMENT',
    status: 'AVAILABLE',
    address: '123 Main Street, Unit 15A',
    city: 'New York',
    neighborhood: 'Manhattan',
    zipCode: '10001',
    latitude: 40.7128,
    longitude: -74.006,
    bedrooms: 2,
    bathrooms: 2,
    surfaceArea: 1200,
    yearBuilt: 2020,
    hasPool: false,
    hasParking: true,
    hasGarden: false,
    hasAC: true,
    hasGym: true,
    hasElevator: true,
    hasSecurity: true,
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800'
    ],
    featured: true,
    approved: true,
    viewCount: 245,
    agentId: '2',
    agentName: 'Agent Smith',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Luxury Beach Villa',
    description: 'Exquisite 5-bedroom villa with private beach access and breathtaking ocean views. This architectural masterpiece features an infinity pool, landscaped gardens, and outdoor entertainment areas perfect for hosting. The open-concept living spaces seamlessly blend indoor and outdoor living. Gourmet kitchen with top-of-the-line appliances, wine cellar, and butler\'s pantry. Master suite occupies the entire top floor with private terrace and spa bathroom. Smart home technology throughout.',
    price: 2500000,
    listingType: 'BUY',
    propertyType: 'VILLA',
    status: 'AVAILABLE',
    address: '456 Ocean Drive',
    city: 'Miami',
    neighborhood: 'South Beach',
    zipCode: '33139',
    latitude: 25.7617,
    longitude: -80.1918,
    bedrooms: 5,
    bathrooms: 4,
    surfaceArea: 4500,
    yearBuilt: 2018,
    hasPool: true,
    hasParking: true,
    hasGarden: true,
    hasAC: true,
    hasGym: true,
    hasElevator: false,
    hasSecurity: true,
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
    ],
    featured: true,
    approved: true,
    viewCount: 532,
    agentId: '2',
    agentName: 'Agent Smith',
    createdAt: '2024-01-10T10:00:00Z'
  },
  {
    id: '3',
    title: 'Cozy Suburban Family Home',
    description: 'Charming 4-bedroom family home in a quiet suburban neighborhood with excellent schools. Features spacious backyard perfect for children and entertaining, updated kitchen with granite countertops, and hardwood floors throughout. The finished basement provides additional living space ideal for a home office or media room. Two-car garage, new roof, and energy-efficient windows. Walking distance to parks, shops, and public transportation.',
    price: 650000,
    listingType: 'BUY',
    propertyType: 'HOUSE',
    status: 'AVAILABLE',
    address: '789 Oak Lane',
    city: 'Austin',
    neighborhood: 'Westlake',
    zipCode: '78746',
    latitude: 30.2672,
    longitude: -97.7431,
    bedrooms: 4,
    bathrooms: 3,
    surfaceArea: 2800,
    yearBuilt: 2015,
    hasPool: false,
    hasParking: true,
    hasGarden: true,
    hasAC: true,
    hasGym: false,
    hasElevator: false,
    hasSecurity: false,
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800'
    ],
    featured: true,
    approved: true,
    viewCount: 189,
    agentId: '2',
    agentName: 'Agent Smith',
    createdAt: '2024-01-08T10:00:00Z'
  },
  {
    id: '4',
    title: 'Modern Loft for Rent',
    description: 'Stylish industrial loft in converted warehouse with high ceilings and exposed brick.',
    price: 3500,
    listingType: 'RENT',
    propertyType: 'APARTMENT',
    status: 'AVAILABLE',
    address: '321 Industrial Blvd, Loft 4B',
    city: 'Los Angeles',
    neighborhood: 'Arts District',
    zipCode: '90013',
    latitude: 34.0407,
    longitude: -118.2351,
    bedrooms: 1,
    bathrooms: 1,
    surfaceArea: 950,
    yearBuilt: 2019,
    hasPool: false,
    hasParking: true,
    hasGarden: false,
    hasAC: true,
    hasGym: true,
    hasElevator: true,
    hasSecurity: true,
    images: ['https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800'],
    featured: false,
    approved: true,
    viewCount: 312,
    agentId: '2',
    agentName: 'Agent Smith',
    createdAt: '2024-01-05T10:00:00Z'
  },
  {
    id: '5',
    title: 'Commercial Office Space',
    description: 'Prime commercial office space in business district.',
    price: 8500,
    listingType: 'RENT',
    propertyType: 'COMMERCIAL',
    status: 'AVAILABLE',
    address: '555 Business Center',
    city: 'Chicago',
    neighborhood: 'Loop',
    zipCode: '60601',
    latitude: 41.8781,
    longitude: -87.6298,
    bedrooms: 0,
    bathrooms: 2,
    surfaceArea: 3200,
    yearBuilt: 2021,
    hasPool: false,
    hasParking: true,
    hasGarden: false,
    hasAC: true,
    hasGym: false,
    hasElevator: true,
    hasSecurity: true,
    images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'],
    featured: false,
    approved: true,
    viewCount: 156,
    agentId: '2',
    agentName: 'Agent Smith',
    createdAt: '2024-01-03T10:00:00Z'
  },
  {
    id: '6',
    title: 'Development Land Plot',
    description: 'Prime development land with approved permits.',
    price: 850000,
    listingType: 'BUY',
    propertyType: 'LAND',
    status: 'AVAILABLE',
    address: '999 Development Road',
    city: 'Phoenix',
    neighborhood: 'Scottsdale',
    zipCode: '85251',
    latitude: 33.4942,
    longitude: -111.9261,
    bedrooms: 0,
    bathrooms: 0,
    surfaceArea: 15000,
    yearBuilt: 0,
    hasPool: false,
    hasParking: false,
    hasGarden: false,
    hasAC: false,
    hasGym: false,
    hasElevator: false,
    hasSecurity: false,
    images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'],
    featured: false,
    approved: true,
    viewCount: 89,
    agentId: '2',
    agentName: 'Agent Smith',
    createdAt: '2024-01-01T10:00:00Z'
  }
];

export default function PropertyDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  const property = ALL_PROPERTIES.find(p => p.id === params.id);
  
  if (!property) {
    return (
      <div className="min-h-screen bg-[#FDFCFA]">
        <Navbar />
        <div className="pt-32 pb-12 text-center">
          <h1 className="font-display text-2xl text-[#1A1A1A]">Property Not Found</h1>
          <p className="text-[#4A4A4A] mt-2">The property you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/properties">
            <button className="mt-6 px-6 py-3 bg-[#1A1A1A] text-white text-sm hover:bg-[#2D2D2D] transition-colors">
              Browse Properties
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const similarProperties = ALL_PROPERTIES.filter(
    p => p.id !== property.id && (p.city === property.city || p.propertyType === property.propertyType)
  ).slice(0, 3);

  const amenities = [
    { key: 'hasParking', icon: Car, label: 'Parking' },
    { key: 'hasPool', icon: Waves, label: 'Pool' },
    { key: 'hasGarden', icon: Trees, label: 'Garden' },
    { key: 'hasAC', icon: Wind, label: 'Air Conditioning' },
    { key: 'hasGym', icon: Dumbbell, label: 'Gym' },
    { key: 'hasSecurity', icon: Shield, label: 'Security' },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div className="min-h-screen bg-[#FDFCFA]">
      <Navbar />
      
      <main className="pt-20 pb-12">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center text-[#7D8471] hover:text-[#1A1A1A] transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to listings
          </button>
        </div>

        {/* Image Gallery */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-8">
            {/* Main Image */}
            <div 
              className="relative h-80 lg:h-[500px] overflow-hidden cursor-pointer group"
              onClick={() => setShowGallery(true)}
            >
              <Image
                src={property.images[0]}
                alt={property.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity">View Gallery</span>
              </div>
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className={`px-3 py-1.5 text-xs font-medium tracking-wide uppercase ${
                  property.listingType === 'BUY' ? 'bg-[#1A1A1A] text-white' : 'bg-white text-[#1A1A1A]'
                }`}>
                  For {property.listingType === 'BUY' ? 'Sale' : 'Rent'}
                </span>
                {property.featured && (
                  <span className="px-3 py-1.5 text-xs font-medium tracking-wide uppercase bg-[#C9A962] text-[#1A1A1A]">
                    Featured
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Grid */}
            <div className="hidden lg:grid grid-cols-2 gap-2">
              {property.images.slice(1, 5).map((image, index) => (
                <div 
                  key={index}
                  className="relative h-60 overflow-hidden cursor-pointer group"
                  onClick={() => {
                    setCurrentImageIndex(index + 1);
                    setShowGallery(true);
                  }}
                >
                  <Image
                    src={image}
                    alt={`${property.title} ${index + 2}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {index === 3 && property.images.length > 5 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-medium text-lg">+{property.images.length - 5} more</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Title and Price */}
              <div className="bg-white border border-[#EDE9E3] p-6 lg:p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <h1 className="font-display text-2xl md:text-3xl text-[#1A1A1A]">
                      {property.title}
                    </h1>
                    <div className="flex items-center mt-3 text-[#7D8471]">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{property.address}, {property.city}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                      <span className={`px-3 py-1 text-xs font-medium tracking-wide uppercase ${
                        property.status === 'AVAILABLE' ? 'bg-[#7D8471]/10 text-[#7D8471]' :
                        property.status === 'PENDING' ? 'bg-[#C9A962]/10 text-[#C9A962]' :
                        'bg-[#EDE9E3] text-[#4A4A4A]'
                      }`}>
                        {property.status}
                      </span>
                      <span className="text-sm text-[#7D8471] flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {property.viewCount} views
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-3xl text-[#1A1A1A]">
                      {formatPrice(property.price, property.listingType)}
                    </p>
                    <p className="text-[#7D8471] text-sm mt-1">
                      €{Math.round(property.price / property.surfaceArea).toLocaleString()} / m²
                    </p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-4 gap-4 mt-8 pt-8 border-t border-[#EDE9E3]">
                  {property.bedrooms > 0 && (
                    <div className="text-center">
                      <Bed className="w-5 h-5 mx-auto text-[#7D8471]" />
                      <p className="font-display text-lg text-[#1A1A1A] mt-2">{property.bedrooms}</p>
                      <p className="text-xs text-[#7D8471] uppercase tracking-wide">Beds</p>
                    </div>
                  )}
                  {property.bathrooms > 0 && (
                    <div className="text-center">
                      <Bath className="w-5 h-5 mx-auto text-[#7D8471]" />
                      <p className="font-display text-lg text-[#1A1A1A] mt-2">{property.bathrooms}</p>
                      <p className="text-xs text-[#7D8471] uppercase tracking-wide">Baths</p>
                    </div>
                  )}
                  <div className="text-center">
                    <Square className="w-5 h-5 mx-auto text-[#7D8471]" />
                    <p className="font-display text-lg text-[#1A1A1A] mt-2">{property.surfaceArea.toLocaleString()}</p>
                    <p className="text-xs text-[#7D8471] uppercase tracking-wide">m²</p>
                  </div>
                  {property.yearBuilt && property.yearBuilt > 0 && (
                    <div className="text-center">
                      <Calendar className="w-5 h-5 mx-auto text-[#7D8471]" />
                      <p className="font-display text-lg text-[#1A1A1A] mt-2">{property.yearBuilt}</p>
                      <p className="text-xs text-[#7D8471] uppercase tracking-wide">Built</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="bg-white border border-[#EDE9E3]">
                <div className="px-6 lg:px-8 py-5 border-b border-[#EDE9E3]">
                  <h2 className="font-display text-lg text-[#1A1A1A]">Description</h2>
                </div>
                <div className="px-6 lg:px-8 py-6">
                  <p className="text-[#4A4A4A] leading-relaxed whitespace-pre-line">
                    {property.description}
                  </p>
                </div>
              </div>

              {/* Amenities */}
              <div className="bg-white border border-[#EDE9E3]">
                <div className="px-6 lg:px-8 py-5 border-b border-[#EDE9E3]">
                  <h2 className="font-display text-lg text-[#1A1A1A]">Amenities</h2>
                </div>
                <div className="px-6 lg:px-8 py-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {amenities.map(({ key, icon: Icon, label }) => (
                      <div
                        key={key}
                        className={`flex items-center gap-3 p-4 ${
                          property[key as keyof Property]
                            ? 'bg-[#7D8471]/10 text-[#1A1A1A]'
                            : 'bg-[#F8F6F3] text-[#9A9A9A]'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-sm font-medium">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="bg-white border border-[#EDE9E3]">
                <div className="px-6 lg:px-8 py-5 border-b border-[#EDE9E3]">
                  <h2 className="font-display text-lg text-[#1A1A1A]">Property Details</h2>
                </div>
                <div className="px-6 lg:px-8 py-6">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Property Type', value: getPropertyTypeLabel(property.propertyType) },
                      { label: 'Listing Type', value: property.listingType === 'BUY' ? 'For Sale' : 'For Rent' },
                      { label: 'City', value: property.city },
                      { label: 'Neighborhood', value: property.neighborhood || 'N/A' },
                      { label: 'Zip Code', value: property.zipCode || 'N/A' },
                      { label: 'Listed On', value: formatDate(property.createdAt) },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between py-3 border-b border-[#EDE9E3]">
                        <span className="text-[#7D8471] text-sm">{item.label}</span>
                        <span className="font-medium text-[#1A1A1A] text-sm">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Actions */}
              <div className="bg-white border border-[#EDE9E3] p-6">
                <div className="flex gap-3 mb-6">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                      isFavorite 
                        ? 'bg-[#1A1A1A] text-white' 
                        : 'border border-[#EDE9E3] text-[#1A1A1A] hover:border-[#1A1A1A]'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                    {isFavorite ? 'Saved' : 'Save'}
                  </button>
                  <button className="flex-1 py-3 border border-[#EDE9E3] text-[#1A1A1A] text-sm font-medium flex items-center justify-center gap-2 hover:border-[#1A1A1A] transition-colors">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
                <button 
                  onClick={() => setShowContactForm(true)}
                  className="w-full py-4 bg-[#1A1A1A] text-white font-medium flex items-center justify-center gap-2 hover:bg-[#2D2D2D] transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  Contact Agent
                </button>
              </div>

              {/* Agent Card */}
              <div className="bg-white border border-[#EDE9E3]">
                <div className="px-6 py-5 border-b border-[#EDE9E3]">
                  <h3 className="font-display text-[#1A1A1A]">Listed By</h3>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#7D8471]/10 flex items-center justify-center">
                      <span className="text-[#7D8471] font-display text-xl">
                        {property.agentName?.charAt(0) || 'A'}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-[#1A1A1A]">{property.agentName || 'Agent Smith'}</p>
                      <p className="text-sm text-[#7D8471]">Licensed Real Estate Agent</p>
                    </div>
                  </div>
                  <div className="mt-6 space-y-3">
                    <a href="tel:+1234567890" className="flex items-center gap-3 text-[#4A4A4A] hover:text-[#1A1A1A] transition-colors text-sm">
                      <Phone className="w-4 h-4 text-[#C9A962]" />
                      <span>+1 (234) 567-8901</span>
                    </a>
                    <a href="mailto:agent@palaisrouge.ma" className="flex items-center gap-3 text-[#4A4A4A] hover:text-[#1A1A1A] transition-colors text-sm">
                      <Mail className="w-4 h-4 text-[#C9A962]" />
                      <span>agent@palaisrouge.ma</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Schedule Visit */}
              <div className="bg-white border border-[#EDE9E3]">
                <div className="px-6 py-5 border-b border-[#EDE9E3]">
                  <h3 className="font-display text-[#1A1A1A]">Schedule a Visit</h3>
                </div>
                <div className="p-6">
                  <p className="text-sm text-[#4A4A4A] mb-4">
                    Interested in this property? Schedule a visit to see it in person.
                  </p>
                  <button className="w-full py-3 border border-[#EDE9E3] text-[#1A1A1A] text-sm font-medium flex items-center justify-center gap-2 hover:border-[#1A1A1A] transition-colors">
                    <Calendar className="w-4 h-4" />
                    Book Viewing
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Properties */}
          {similarProperties.length > 0 && (
            <section className="mt-20">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-[#7D8471] text-xs tracking-[0.3em] uppercase mb-2 block">
                    More Options
                  </span>
                  <h2 className="font-display text-2xl text-[#1A1A1A]">Similar Properties</h2>
                </div>
                <Link href="/properties" className="text-sm text-[#7D8471] hover:text-[#1A1A1A] transition-colors flex items-center gap-1">
                  View All <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarProperties.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Full Screen Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 z-50 bg-[#1A1A1A] flex items-center justify-center">
          <button
            onClick={() => setShowGallery(false)}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>
          
          <button
            onClick={prevImage}
            className="absolute left-6 w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          
          <div className="relative w-full h-full max-w-5xl max-h-[80vh] mx-4">
            <Image
              src={property.images[currentImageIndex]}
              alt={`${property.title} ${currentImageIndex + 1}`}
              fill
              className="object-contain"
            />
          </div>
          
          <button
            onClick={nextImage}
            className="absolute right-6 w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {property.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 transition-colors ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-6 lg:p-8 max-w-md w-full"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-xl text-[#1A1A1A]">Contact Agent</h3>
              <button onClick={() => setShowContactForm(false)} className="w-8 h-8 flex items-center justify-center hover:bg-[#F8F6F3] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-xs tracking-wide uppercase text-[#4A4A4A] mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white border border-[#EDE9E3] text-[#1A1A1A] placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-xs tracking-wide uppercase text-[#4A4A4A] mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-white border border-[#EDE9E3] text-[#1A1A1A] placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-xs tracking-wide uppercase text-[#4A4A4A] mb-2">Phone</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 bg-white border border-[#EDE9E3] text-[#1A1A1A] placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                  placeholder="(123) 456-7890"
                />
              </div>
              <div>
                <label className="block text-xs tracking-wide uppercase text-[#4A4A4A] mb-2">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-white border border-[#EDE9E3] text-[#1A1A1A] placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#1A1A1A] transition-colors resize-none"
                  placeholder={`I'm interested in ${property.title}...`}
                />
              </div>
              <button type="submit" className="w-full py-4 bg-[#1A1A1A] text-white font-medium hover:bg-[#2D2D2D] transition-colors">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
}
