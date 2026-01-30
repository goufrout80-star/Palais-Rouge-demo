'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Upload, X, Plus, Image as ImageIcon, Check, 
  Home, Building2, Castle, Landmark, TreePine, MapPin,
  Bed, Bath, Square, Calendar, Car, Trees, Wind, Dumbbell,
  Shield, Building, DollarSign, Trash2, Save,
  ChevronDown, AlertCircle, Loader2
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useProperties } from '@/context/PropertiesContext';
import { Navbar } from '@/components/layout/Navbar';

interface PropertyImage {
  id: string;
  url: string;
  file?: File;
  isMain: boolean;
}

const PROPERTY_TYPES = [
  { value: 'HOUSE', label: 'House', icon: Home },
  { value: 'APARTMENT', label: 'Apartment', icon: Building2 },
  { value: 'VILLA', label: 'Villa', icon: Castle },
  { value: 'COMMERCIAL', label: 'Commercial', icon: Landmark },
  { value: 'LAND', label: 'Land', icon: TreePine },
];

const LISTING_TYPES = [
  { value: 'BUY', label: 'For Sale' },
  { value: 'RENT', label: 'For Rent' },
];

const AMENITIES = [
  { key: 'hasPool', label: 'Swimming Pool', icon: '🏊', lucideIcon: null },
  { key: 'hasParking', label: 'Parking', icon: null, lucideIcon: Car },
  { key: 'hasGarden', label: 'Garden', icon: null, lucideIcon: Trees },
  { key: 'hasAC', label: 'Air Conditioning', icon: null, lucideIcon: Wind },
  { key: 'hasGym', label: 'Gym', icon: null, lucideIcon: Dumbbell },
  { key: 'hasElevator', label: 'Elevator', icon: null, lucideIcon: Building },
  { key: 'hasSecurity', label: '24/7 Security', icon: null, lucideIcon: Shield },
];

export default function EditPropertyPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { getProperty, updateProperty, isLoading: propertiesLoading } = useProperties();
  const router = useRouter();
  const params = useParams();
  const propertyId = params.id as string;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isInitialized, setIsInitialized] = useState(false);
  const [notFound, setNotFound] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    listingType: 'BUY',
    propertyType: 'HOUSE',
    address: '',
    city: '',
    neighborhood: '',
    zipCode: '',
    bedrooms: '',
    bathrooms: '',
    surfaceArea: '',
    yearBuilt: '',
    hasPool: false,
    hasParking: false,
    hasGarden: false,
    hasAC: false,
    hasGym: false,
    hasElevator: false,
    hasSecurity: false,
    featured: false,
    approved: true,
    status: 'AVAILABLE',
  });

  const [images, setImages] = useState<PropertyImage[]>([]);
  const [activeStep, setActiveStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load property data
  useEffect(() => {
    if (!propertiesLoading && propertyId && !isInitialized) {
      const property = getProperty(propertyId);
      if (property) {
        setFormData({
          title: property.title || '',
          description: property.description || '',
          price: property.price?.toString() || '',
          listingType: property.listingType || 'BUY',
          propertyType: property.propertyType || 'HOUSE',
          address: property.address || '',
          city: property.city || '',
          neighborhood: property.neighborhood || '',
          zipCode: property.zipCode || '',
          bedrooms: property.bedrooms?.toString() || '',
          bathrooms: property.bathrooms?.toString() || '',
          surfaceArea: property.surfaceArea?.toString() || '',
          yearBuilt: property.yearBuilt?.toString() || '',
          hasPool: property.hasPool || false,
          hasParking: property.hasParking || false,
          hasGarden: property.hasGarden || false,
          hasAC: property.hasAC || false,
          hasGym: property.hasGym || false,
          hasElevator: property.hasElevator || false,
          hasSecurity: property.hasSecurity || false,
          featured: property.featured || false,
          approved: property.approved !== false,
          status: property.status || 'AVAILABLE',
        });

        // Load existing images
        if (property.images && property.images.length > 0) {
          setImages(property.images.map((url, index) => ({
            id: `existing-${index}`,
            url,
            isMain: index === 0,
          })));
        }

        setIsInitialized(true);
      } else {
        setNotFound(true);
      }
    }
  }, [propertiesLoading, propertyId, getProperty, isInitialized]);

  // Check authentication
  if (!authLoading && !isAuthenticated) {
    router.push('/login');
    return null;
  }

  if (!authLoading && user?.role !== 'admin' && user?.role !== 'agent') {
    router.push('/dashboard');
    return null;
  }

  const handleInputChange = (field: string, value: string | boolean | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: PropertyImage[] = [];
    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file);
      newImages.push({
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        url,
        file,
        isMain: images.length === 0 && newImages.length === 0,
      });
    });

    setImages(prev => [...prev, ...newImages]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [images.length]);

  const removeImage = (id: string) => {
    setImages(prev => {
      const filtered = prev.filter(img => img.id !== id);
      if (filtered.length > 0 && !filtered.some(img => img.isMain)) {
        filtered[0].isMain = true;
      }
      return filtered;
    });
  };

  const setMainImage = (id: string) => {
    setImages(prev => prev.map(img => ({
      ...img,
      isMain: img.id === id,
    })));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.title.trim()) newErrors.title = 'Title is required';
      if (!formData.description.trim()) newErrors.description = 'Description is required';
      if (!formData.price) newErrors.price = 'Price is required';
    }

    if (step === 2) {
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
    }

    if (step === 3) {
      if (!formData.bedrooms) newErrors.bedrooms = 'Bedrooms is required';
      if (!formData.bathrooms) newErrors.bathrooms = 'Bathrooms is required';
      if (!formData.surfaceArea) newErrors.surfaceArea = 'Surface area is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(activeStep)) {
      setActiveStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setActiveStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(activeStep)) return;

    setSaving(true);

    // Prepare the updated property data
    const sortedImages = [...images].sort((a, b) => (a.isMain ? -1 : b.isMain ? 1 : 0));
    const imageUrls = sortedImages.map(img => img.url);

    const updatedProperty = {
      title: formData.title,
      description: formData.description,
      price: Number(formData.price),
      listingType: formData.listingType as 'BUY' | 'RENT',
      propertyType: formData.propertyType as any,
      status: formData.status as any,
      address: formData.address,
      city: formData.city,
      neighborhood: formData.neighborhood,
      zipCode: formData.zipCode,
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      surfaceArea: Number(formData.surfaceArea),
      yearBuilt: Number(formData.yearBuilt) || 0,
      hasPool: formData.hasPool,
      hasParking: formData.hasParking,
      hasGarden: formData.hasGarden,
      hasAC: formData.hasAC,
      hasGym: formData.hasGym,
      hasElevator: formData.hasElevator,
      hasSecurity: formData.hasSecurity,
      featured: formData.featured,
      approved: formData.approved,
      images: imageUrls,
    };

    const success = updateProperty(propertyId, updatedProperty);
    
    // Small delay for UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setSaving(false);
    
    if (success) {
      router.push(`/properties/${propertyId}`);
    }
  };

  const steps = [
    { num: 1, label: 'Basic Info' },
    { num: 2, label: 'Location' },
    { num: 3, label: 'Details' },
    { num: 4, label: 'Photos' },
  ];

  if (authLoading || propertiesLoading || !isInitialized) {
    return (
      <div className="min-h-screen bg-[#FDFCFA] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#7D8471] mx-auto mb-4" />
          <p className="text-[#7D8471]">Loading property...</p>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-[#FDFCFA]">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="font-display text-3xl text-[#1A1A1A] mb-4">Property Not Found</h1>
            <p className="text-[#7D8471] mb-8">The property you're trying to edit doesn't exist.</p>
            <Link href="/properties" className="px-6 py-3 bg-[#1A1A1A] text-white inline-block">
              Back to Properties
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCFA]">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link 
              href={`/properties/${propertyId}`}
              className="inline-flex items-center text-[#7D8471] hover:text-[#1A1A1A] transition-colors text-sm mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Property
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-[#7D8471] text-xs tracking-[0.3em] uppercase block mb-2">
                Edit Listing
              </span>
              <h1 className="font-display text-3xl md:text-4xl text-[#1A1A1A]">
                Edit Property
              </h1>
            </motion.div>
          </div>

          {/* Progress Steps */}
          <div className="mb-10">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <React.Fragment key={step.num}>
                  <button
                    onClick={() => setActiveStep(step.num)}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <div className={`w-10 h-10 flex items-center justify-center text-sm font-medium transition-all ${
                      activeStep > step.num
                        ? 'bg-[#7D8471] text-white'
                        : activeStep === step.num
                        ? 'bg-[#1A1A1A] text-white'
                        : 'bg-[#EDE9E3] text-[#9A9A9A]'
                    }`}>
                      {activeStep > step.num ? <Check className="w-5 h-5" /> : step.num}
                    </div>
                    <span className={`hidden sm:block text-sm font-medium ${
                      activeStep >= step.num ? 'text-[#1A1A1A]' : 'text-[#9A9A9A]'
                    }`}>
                      {step.label}
                    </span>
                  </button>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-px mx-4 ${
                      activeStep > step.num ? 'bg-[#7D8471]' : 'bg-[#EDE9E3]'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="bg-white border border-[#EDE9E3]">
            <AnimatePresence mode="wait">
              {/* Step 1: Basic Info */}
              {activeStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 md:p-8"
                >
                  <h2 className="font-display text-xl text-[#1A1A1A] mb-6">Basic Information</h2>
                  
                  <div className="space-y-6">
                    {/* Title */}
                    <div>
                      <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                        Property Title *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className={`w-full px-4 py-3 bg-white border ${errors.title ? 'border-red-400' : 'border-[#EDE9E3]'} text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors`}
                        placeholder="e.g., Modern Downtown Apartment with City Views"
                      />
                      {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                        Description *
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        rows={5}
                        className={`w-full px-4 py-3 bg-white border ${errors.description ? 'border-red-400' : 'border-[#EDE9E3]'} text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors resize-none`}
                        placeholder="Describe the property in detail..."
                      />
                      {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                    </div>

                    {/* Listing Type & Property Type */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                          Listing Type
                        </label>
                        <div className="flex gap-3">
                          {LISTING_TYPES.map((type) => (
                            <button
                              key={type.value}
                              type="button"
                              onClick={() => handleInputChange('listingType', type.value)}
                              className={`flex-1 py-3 px-4 text-sm font-medium transition-all ${
                                formData.listingType === type.value
                                  ? 'bg-[#1A1A1A] text-white'
                                  : 'bg-[#F8F6F3] text-[#4A4A4A] hover:bg-[#EDE9E3]'
                              }`}
                            >
                              {type.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                          Price ({formData.listingType === 'RENT' ? 'per month' : ''}) *
                        </label>
                        <div className="relative">
                          <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A9A]" />
                          <input
                            type="number"
                            value={formData.price}
                            onChange={(e) => handleInputChange('price', e.target.value)}
                            className={`w-full pl-10 pr-4 py-3 bg-white border ${errors.price ? 'border-red-400' : 'border-[#EDE9E3]'} text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors`}
                            placeholder="0"
                          />
                        </div>
                        {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                      </div>
                    </div>

                    {/* Property Type */}
                    <div>
                      <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-3">
                        Property Type
                      </label>
                      <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                        {PROPERTY_TYPES.map((type) => {
                          const Icon = type.icon;
                          return (
                            <button
                              key={type.value}
                              type="button"
                              onClick={() => handleInputChange('propertyType', type.value)}
                              className={`p-4 text-center transition-all ${
                                formData.propertyType === type.value
                                  ? 'bg-[#1A1A1A] text-white'
                                  : 'bg-[#F8F6F3] text-[#4A4A4A] hover:bg-[#EDE9E3]'
                              }`}
                            >
                              <Icon className="w-5 h-5 mx-auto mb-2" />
                              <span className="text-xs font-medium">{type.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Status & Featured (Admin only) */}
                    {user?.role === 'admin' && (
                      <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-[#EDE9E3]">
                        <div>
                          <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                            Status
                          </label>
                          <select
                            value={formData.status}
                            onChange={(e) => handleInputChange('status', e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-[#EDE9E3] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                          >
                            <option value="AVAILABLE">Available</option>
                            <option value="PENDING">Pending</option>
                            <option value="SOLD">Sold</option>
                            <option value="RENTED">Rented</option>
                          </select>
                        </div>
                        <div className="flex flex-col gap-3">
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.featured}
                              onChange={(e) => handleInputChange('featured', e.target.checked)}
                              className="w-5 h-5 accent-[#1A1A1A]"
                            />
                            <span className="text-sm text-[#1A1A1A]">Featured Property</span>
                          </label>
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.approved}
                              onChange={(e) => handleInputChange('approved', e.target.checked)}
                              className="w-5 h-5 accent-[#1A1A1A]"
                            />
                            <span className="text-sm text-[#1A1A1A]">Approved</span>
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Location */}
              {activeStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 md:p-8"
                >
                  <h2 className="font-display text-xl text-[#1A1A1A] mb-6">Location Details</h2>
                  
                  <div className="space-y-6">
                    {/* Address */}
                    <div>
                      <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                        Street Address *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A9A]" />
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          className={`w-full pl-10 pr-4 py-3 bg-white border ${errors.address ? 'border-red-400' : 'border-[#EDE9E3]'} text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors`}
                          placeholder="123 Main Street, Unit 5A"
                        />
                      </div>
                      {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                    </div>

                    {/* City & Neighborhood */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          className={`w-full px-4 py-3 bg-white border ${errors.city ? 'border-red-400' : 'border-[#EDE9E3]'} text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors`}
                          placeholder="New York"
                        />
                        {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                      </div>

                      <div>
                        <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                          Neighborhood
                        </label>
                        <input
                          type="text"
                          value={formData.neighborhood}
                          onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-[#EDE9E3] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                          placeholder="Manhattan"
                        />
                      </div>
                    </div>

                    {/* Zip Code */}
                    <div className="max-w-xs">
                      <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                        Zip / Postal Code
                      </label>
                      <input
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-[#EDE9E3] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                        placeholder="10001"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Details */}
              {activeStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 md:p-8"
                >
                  <h2 className="font-display text-xl text-[#1A1A1A] mb-6">Property Details</h2>
                  
                  <div className="space-y-8">
                    {/* Specs */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                          Bedrooms *
                        </label>
                        <div className="relative">
                          <Bed className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A9A]" />
                          <input
                            type="number"
                            value={formData.bedrooms}
                            onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                            className={`w-full pl-10 pr-4 py-3 bg-white border ${errors.bedrooms ? 'border-red-400' : 'border-[#EDE9E3]'} text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors`}
                            placeholder="0"
                            min="0"
                          />
                        </div>
                        {errors.bedrooms && <p className="text-red-500 text-xs mt-1">{errors.bedrooms}</p>}
                      </div>

                      <div>
                        <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                          Bathrooms *
                        </label>
                        <div className="relative">
                          <Bath className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A9A]" />
                          <input
                            type="number"
                            value={formData.bathrooms}
                            onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                            className={`w-full pl-10 pr-4 py-3 bg-white border ${errors.bathrooms ? 'border-red-400' : 'border-[#EDE9E3]'} text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors`}
                            placeholder="0"
                            min="0"
                          />
                        </div>
                        {errors.bathrooms && <p className="text-red-500 text-xs mt-1">{errors.bathrooms}</p>}
                      </div>

                      <div>
                        <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                          Area (m²) *
                        </label>
                        <div className="relative">
                          <Square className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A9A]" />
                          <input
                            type="number"
                            value={formData.surfaceArea}
                            onChange={(e) => handleInputChange('surfaceArea', e.target.value)}
                            className={`w-full pl-10 pr-4 py-3 bg-white border ${errors.surfaceArea ? 'border-red-400' : 'border-[#EDE9E3]'} text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors`}
                            placeholder="0"
                            min="0"
                          />
                        </div>
                        {errors.surfaceArea && <p className="text-red-500 text-xs mt-1">{errors.surfaceArea}</p>}
                      </div>

                      <div>
                        <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                          Year Built
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A9A]" />
                          <input
                            type="number"
                            value={formData.yearBuilt}
                            onChange={(e) => handleInputChange('yearBuilt', e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white border border-[#EDE9E3] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                            placeholder="2020"
                            min="1900"
                            max={new Date().getFullYear()}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div>
                      <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-4">
                        Amenities
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {AMENITIES.map((amenity) => {
                          const isSelected = formData[amenity.key as keyof typeof formData];
                          const LucideIcon = amenity.lucideIcon;
                          return (
                            <button
                              key={amenity.key}
                              type="button"
                              onClick={() => handleInputChange(amenity.key, !isSelected)}
                              className={`p-4 flex items-center gap-3 transition-all ${
                                isSelected
                                  ? 'bg-[#1A1A1A] text-white'
                                  : 'bg-[#F8F6F3] text-[#4A4A4A] hover:bg-[#EDE9E3]'
                              }`}
                            >
                              {LucideIcon ? <LucideIcon className="w-5 h-5" /> : <span className="text-lg">{amenity.icon}</span>}
                              <span className="text-sm font-medium">{amenity.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Photos */}
              {activeStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 md:p-8"
                >
                  <h2 className="font-display text-xl text-[#1A1A1A] mb-2">Property Photos</h2>
                  <p className="text-sm text-[#7D8471] mb-6">
                    Upload high-quality photos. The first image will be the main listing photo.
                  </p>
                  
                  <div className="space-y-6">
                    {/* Upload Area */}
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-[#EDE9E3] hover:border-[#1A1A1A] transition-colors cursor-pointer p-8 md:p-12"
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-[#F8F6F3] flex items-center justify-center">
                          <Upload className="w-7 h-7 text-[#7D8471]" />
                        </div>
                        <p className="text-[#1A1A1A] font-medium mb-1">
                          Click to upload photos
                        </p>
                        <p className="text-sm text-[#7D8471]">
                          or drag and drop • PNG, JPG up to 10MB each
                        </p>
                      </div>
                    </div>

                    {/* Image Preview Grid */}
                    {images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {images.map((image, index) => (
                          <div
                            key={image.id}
                            className={`relative aspect-square group ${
                              image.isMain ? 'ring-2 ring-[#C9A962]' : ''
                            }`}
                          >
                            <img
                              src={image.url}
                              alt={`Property ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            
                            {/* Main Badge */}
                            {image.isMain && (
                              <div className="absolute top-2 left-2 px-2 py-1 bg-[#C9A962] text-[#1A1A1A] text-xs font-medium">
                                Main Photo
                              </div>
                            )}

                            {/* Overlay Actions */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              {!image.isMain && (
                                <button
                                  type="button"
                                  onClick={() => setMainImage(image.id)}
                                  className="w-10 h-10 bg-white text-[#1A1A1A] flex items-center justify-center hover:bg-[#C9A962] transition-colors"
                                  title="Set as main"
                                >
                                  <ImageIcon className="w-5 h-5" />
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => removeImage(image.id)}
                                className="w-10 h-10 bg-white text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                                title="Remove"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        ))}

                        {/* Add More */}
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="aspect-square border-2 border-dashed border-[#EDE9E3] hover:border-[#1A1A1A] transition-colors flex flex-col items-center justify-center gap-2 text-[#7D8471] hover:text-[#1A1A1A]"
                        >
                          <Plus className="w-6 h-6" />
                          <span className="text-xs font-medium">Add More</span>
                        </button>
                      </div>
                    )}

                    {/* No Images Warning */}
                    {images.length === 0 && (
                      <div className="flex items-center gap-3 p-4 bg-[#C9A962]/10 border border-[#C9A962]/20">
                        <AlertCircle className="w-5 h-5 text-[#C9A962]" />
                        <p className="text-sm text-[#1A1A1A]">
                          Add at least one photo to make your listing more attractive.
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer Actions */}
            <div className="px-6 md:px-8 py-5 bg-[#F8F6F3] border-t border-[#EDE9E3] flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                disabled={activeStep === 1}
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  activeStep === 1
                    ? 'text-[#9A9A9A] cursor-not-allowed'
                    : 'text-[#1A1A1A] hover:bg-[#EDE9E3]'
                }`}
              >
                Back
              </button>

              <div className="flex gap-3">
                {activeStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-8 py-3 bg-[#1A1A1A] text-white text-sm font-medium hover:bg-[#2D2D2D] transition-colors flex items-center gap-2"
                  >
                    Continue
                    <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={saving}
                    className="px-8 py-3 bg-[#1A1A1A] text-white text-sm font-medium hover:bg-[#2D2D2D] transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save Changes
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
