'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Search, SlidersHorizontal, MapPin, Grid, List, X, ChevronDown, Plus
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PropertyCard } from '@/components/property/PropertyCard';
import { Property, PropertyType, ListingType } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { useProperties } from '@/context/PropertiesContext';

const ALL_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    description: 'Stunning 2-bedroom apartment in the heart of downtown with panoramic city views.',
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
    images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'],
    featured: true,
    approved: true,
    viewCount: 245,
    agentId: '2',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Luxury Beach Villa',
    description: 'Exquisite 5-bedroom villa with private beach access and infinity pool.',
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
    images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800'],
    featured: true,
    approved: true,
    viewCount: 532,
    agentId: '2',
    createdAt: '2024-01-10T10:00:00Z'
  },
  {
    id: '3',
    title: 'Cozy Suburban Family Home',
    description: 'Charming 4-bedroom family home in a quiet suburban neighborhood.',
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
    images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'],
    featured: true,
    approved: true,
    viewCount: 189,
    agentId: '2',
    createdAt: '2024-01-08T10:00:00Z'
  },
  {
    id: '4',
    title: 'Modern Loft for Rent',
    description: 'Stylish industrial loft in converted warehouse with high ceilings.',
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
    createdAt: '2024-01-03T10:00:00Z'
  },
  {
    id: '6',
    title: 'Development Land Plot',
    description: 'Prime development land with approved permits for residential construction.',
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
    createdAt: '2024-01-01T10:00:00Z'
  }
];

// Component for Add Property button (only visible to admin/agent)
function AddPropertyButton() {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated || (user?.role !== 'admin' && user?.role !== 'agent')) {
    return null;
  }

  return (
    <Link href="/properties/new" className="mt-4 md:mt-0">
      <button className="px-6 py-3 bg-[#1A1A1A] text-white text-sm flex items-center gap-2 hover:bg-[#2D2D2D] transition-colors">
        <Plus className="w-4 h-4" />
        Add New Property
      </button>
    </Link>
  );
}

function PropertiesContent() {
  const searchParams = useSearchParams();
  const { properties, isLoading: propertiesLoading } = useProperties();
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState(searchParams.get('city') || '');
  const [listingType, setListingType] = useState<string>(searchParams.get('listingType') || '');
  const [propertyType, setPropertyType] = useState<string>(searchParams.get('propertyType') || '');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [bedrooms, setBedrooms] = useState<string>('');
  const [bathrooms, setBathrooms] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');

  // Filter only approved properties for public view
  const approvedProperties = properties.filter(p => p.approved);

  // Filter properties
  const filteredProperties = approvedProperties.filter((property) => {
    if (searchQuery && !property.city.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !property.neighborhood?.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (listingType && property.listingType !== listingType) return false;
    if (propertyType && property.propertyType !== propertyType) return false;
    if (minPrice && property.price < Number(minPrice)) return false;
    if (maxPrice && property.price > Number(maxPrice)) return false;
    if (bedrooms && property.bedrooms < Number(bedrooms)) return false;
    if (bathrooms && property.bathrooms < Number(bathrooms)) return false;
    return true;
  });

  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0;
    }
  });

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setListingType('');
    setPropertyType('');
    setMinPrice('');
    setMaxPrice('');
    setBedrooms('');
    setBathrooms('');
  };

  const hasActiveFilters = searchQuery || listingType || propertyType || minPrice || maxPrice || bedrooms || bathrooms;

  return (
    <div className="min-h-screen bg-[#FDFCFA]">
      <Navbar />
      
      <main className="pt-20 pb-12">
        {/* Header */}
        <div className="bg-white border-b border-[#EDE9E3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between">
              <div>
                <span className="text-[#7D8471] text-xs tracking-[0.3em] uppercase mb-3 block">Explore</span>
                <h1 className="font-display text-4xl md:text-5xl text-[#1A1A1A]">Find Your Property</h1>
                <p className="text-[#4A4A4A] mt-3">
                  {sortedProperties.length} properties available
                </p>
              </div>
              <AddPropertyButton />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search and Filter Bar */}
          <div className="bg-white border border-[#EDE9E3] p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7D8471]" />
                <input
                  type="text"
                  placeholder="Search by city or neighborhood..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-[#F8F6F3] border border-[#EDE9E3] text-[#1A1A1A] placeholder:text-[#999] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                />
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap gap-3">
                <select
                  value={listingType}
                  onChange={(e) => setListingType(e.target.value)}
                  className="px-4 py-3 bg-[#F8F6F3] border border-[#EDE9E3] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                >
                  <option value="">Buy / Rent</option>
                  <option value="BUY">Buy</option>
                  <option value="RENT">Rent</option>
                </select>

                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="px-4 py-3 bg-[#F8F6F3] border border-[#EDE9E3] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                >
                  <option value="">Property Type</option>
                  <option value="HOUSE">House</option>
                  <option value="APARTMENT">Apartment</option>
                  <option value="VILLA">Villa</option>
                  <option value="COMMERCIAL">Commercial</option>
                  <option value="LAND">Land</option>
                </select>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-5 py-3 border flex items-center gap-2 font-medium transition-colors ${
                    showFilters 
                      ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white' 
                      : 'bg-white border-[#EDE9E3] text-[#1A1A1A] hover:border-[#1A1A1A]'
                  }`}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </button>
              </div>
            </div>

            {/* Extended Filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 pt-6 border-t border-[#EDE9E3]"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Min Price</label>
                    <input
                      type="number"
                      placeholder="$0"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#F8F6F3] border border-[#EDE9E3] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Max Price</label>
                    <input
                      type="number"
                      placeholder="No max"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#F8F6F3] border border-[#EDE9E3] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Bedrooms</label>
                    <select
                      value={bedrooms}
                      onChange={(e) => setBedrooms(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#F8F6F3] border border-[#EDE9E3] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                    >
                      <option value="">Any</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                      <option value="5">5+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Bathrooms</label>
                    <select
                      value={bathrooms}
                      onChange={(e) => setBathrooms(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#F8F6F3] border border-[#EDE9E3] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                    >
                      <option value="">Any</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                    </select>
                  </div>
                </div>
                {hasActiveFilters && (
                  <div className="mt-6 flex justify-end">
                    <button 
                      onClick={clearFilters}
                      className="text-sm text-[#7D8471] hover:text-[#1A1A1A] transition-colors flex items-center gap-1"
                    >
                      <X className="w-4 h-4" />
                      Clear All Filters
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-[#4A4A4A]">
              Showing <span className="font-medium text-[#1A1A1A]">{sortedProperties.length}</span> properties
            </p>
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-white border border-[#EDE9E3] text-[#1A1A1A] text-sm focus:outline-none focus:border-[#1A1A1A]"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <div className="hidden md:flex items-center gap-1 bg-[#F8F6F3] p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-white text-[#1A1A1A]' : 'text-[#7D8471] hover:text-[#1A1A1A]'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-white text-[#1A1A1A]' : 'text-[#7D8471] hover:text-[#1A1A1A]'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Properties Grid */}
          {sortedProperties.length > 0 ? (
            <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {sortedProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onFavorite={toggleFavorite}
                  isFavorite={favorites.includes(property.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white border border-[#EDE9E3]">
              <Search className="w-12 h-12 text-[#C9A962] mx-auto mb-4" />
              <h3 className="font-display text-xl text-[#1A1A1A] mb-2">No properties found</h3>
              <p className="text-[#4A4A4A] mb-6">Try adjusting your search or filters</p>
              <button 
                onClick={clearFilters}
                className="px-6 py-3 bg-[#1A1A1A] text-white font-medium hover:bg-[#2D2D2D] transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FDFCFA] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-[#EDE9E3] border-t-[#1A1A1A]"></div>
      </div>
    }>
      <PropertiesContent />
    </Suspense>
  );
}
