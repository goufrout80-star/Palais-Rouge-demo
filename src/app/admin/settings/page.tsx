'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Settings, Image, Link2, Instagram, Linkedin, Twitter, Facebook,
  Save, Plus, Trash2, ArrowLeft, Upload, X, Check, GripVertical, Layout, Palette,
  Phone, Mail, MapPin, FileText, Cookie, Globe
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/layout/Navbar';

interface HeroImage {
  id: string;
  url: string;
  alt: string;
  order: number;
}

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  enabled: boolean;
}

const INITIAL_HERO_IMAGES: HeroImage[] = [
  { id: '1', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920', alt: 'Luxury home exterior', order: 1 },
  { id: '2', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920', alt: 'Modern interior', order: 2 },
  { id: '3', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920', alt: 'Contemporary villa', order: 3 },
];

const INITIAL_SOCIAL_LINKS: SocialLink[] = [
  { id: '1', platform: 'instagram', url: 'https://instagram.com/palaisrouge', enabled: true },
  { id: '2', platform: 'linkedin', url: 'https://linkedin.com/company/palaisrouge', enabled: true },
  { id: '3', platform: 'twitter', url: 'https://twitter.com/palaisrouge', enabled: true },
  { id: '4', platform: 'facebook', url: 'https://facebook.com/palaisrouge', enabled: false },
];

const PLATFORM_ICONS: Record<string, React.ElementType> = {
  instagram: Instagram,
  linkedin: Linkedin,
  twitter: Twitter,
  facebook: Facebook,
};

export default function AdminSettingsPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  
  const [heroImages, setHeroImages] = useState<HeroImage[]>(INITIAL_HERO_IMAGES);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(INITIAL_SOCIAL_LINKS);
  const [activeTab, setActiveTab] = useState<'hero' | 'social' | 'branding' | 'sections' | 'contact' | 'legal'>('hero');
  const [logoUrl, setLogoUrl] = useState('');
  const [faviconUrl, setFaviconUrl] = useState('/favicon.ico');
  const [contactEmail, setContactEmail] = useState('contact@palaisrouge.ma');
  const [contactPhone, setContactPhone] = useState('+1 (555) 123-4567');
  const [contactAddress, setContactAddress] = useState('123 Real Estate Ave, New York, NY 10001');
  const [companyName, setCompanyName] = useState('Palais Rouge Immobilier');
  const [companyTagline, setCompanyTagline] = useState('Luxury Real Estate Redefined');
  const [legalPages, setLegalPages] = useState({
    privacyPolicy: { enabled: true, title: 'Privacy Policy' },
    termsOfService: { enabled: true, title: 'Terms of Service' },
    cookies: { enabled: true, title: 'Cookie Policy' },
  });
  const [cookieSettings, setCookieSettings] = useState({
    enabled: true,
    title: 'We Value Your Privacy',
    message: 'We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.',
    acceptText: 'Accept All',
    declineText: 'Decline',
  });
  const [sections, setSections] = useState([
    { id: 'hero', name: 'Hero Section', enabled: true, order: 1 },
    { id: 'featured', name: 'Featured Properties', enabled: true, order: 2 },
    { id: 'services', name: 'Services', enabled: true, order: 3 },
    { id: 'why-choose', name: 'Why Choose Us', enabled: true, order: 4 },
    { id: 'cta', name: 'Call to Action', enabled: true, order: 5 },
  ]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageAlt, setNewImageAlt] = useState('');

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
    if (!isLoading && isAuthenticated && user?.role !== 'admin') {
      router.push('/dashboard');
    }
  }, [isLoading, isAuthenticated, user, router]);

  if (isLoading || !isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#FDFCFA] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#EDE9E3] border-t-[#1A1A1A] rounded-full animate-spin" />
      </div>
    );
  }

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    
    // In a real app, you would save to your backend here
    console.log('Saving settings:', { heroImages, socialLinks });
  };

  const addHeroImage = () => {
    if (!newImageUrl.trim()) return;
    
    const newImage: HeroImage = {
      id: Date.now().toString(),
      url: newImageUrl.trim(),
      alt: newImageAlt.trim() || 'Hero image',
      order: heroImages.length + 1,
    };
    
    setHeroImages([...heroImages, newImage]);
    setNewImageUrl('');
    setNewImageAlt('');
  };

  const removeHeroImage = (id: string) => {
    setHeroImages(heroImages.filter(img => img.id !== id));
  };

  const updateHeroImage = (id: string, field: 'url' | 'alt', value: string) => {
    setHeroImages(heroImages.map(img => 
      img.id === id ? { ...img, [field]: value } : img
    ));
  };

  const updateSocialLink = (id: string, field: 'url' | 'enabled', value: string | boolean) => {
    setSocialLinks(socialLinks.map(link =>
      link.id === id ? { ...link, [field]: value } : link
    ));
  };

  return (
    <div className="min-h-screen bg-[#FDFCFA]">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link 
              href="/admin/dashboard" 
              className="inline-flex items-center text-[#7D8471] hover:text-[#1A1A1A] transition-colors text-sm mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#1A1A1A] flex items-center justify-center">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-[#7D8471] text-xs tracking-[0.3em] uppercase block">
                    Administration
                  </span>
                  <h1 className="font-display text-2xl md:text-3xl text-[#1A1A1A]">
                    Site Settings
                  </h1>
                </div>
              </div>
              
              <button
                onClick={handleSave}
                disabled={saving}
                className={`px-6 py-3 text-sm font-medium flex items-center gap-2 transition-all ${
                  saved 
                    ? 'bg-[#7D8471] text-white' 
                    : 'bg-[#1A1A1A] text-white hover:bg-[#2D2D2D]'
                } disabled:opacity-50`}
              >
                {saving ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : saved ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {saved ? 'Saved!' : saving ? 'Saving...' : 'Save Changes'}
              </button>
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="flex gap-0 mb-8 border-b border-[#EDE9E3] overflow-x-auto">
            <button
              onClick={() => setActiveTab('hero')}
              className={`px-6 py-4 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'hero'
                  ? 'border-[#1A1A1A] text-[#1A1A1A]'
                  : 'border-transparent text-[#7D8471] hover:text-[#1A1A1A]'
              }`}
            >
              <Image className="w-4 h-4" />
              Hero Images
            </button>
            <button
              onClick={() => setActiveTab('branding')}
              className={`px-6 py-4 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'branding'
                  ? 'border-[#1A1A1A] text-[#1A1A1A]'
                  : 'border-transparent text-[#7D8471] hover:text-[#1A1A1A]'
              }`}
            >
              <Palette className="w-4 h-4" />
              Logo & Favicon
            </button>
            <button
              onClick={() => setActiveTab('sections')}
              className={`px-6 py-4 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'sections'
                  ? 'border-[#1A1A1A] text-[#1A1A1A]'
                  : 'border-transparent text-[#7D8471] hover:text-[#1A1A1A]'
              }`}
            >
              <Layout className="w-4 h-4" />
              Page Sections
            </button>
            <button
              onClick={() => setActiveTab('social')}
              className={`px-6 py-4 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'social'
                  ? 'border-[#1A1A1A] text-[#1A1A1A]'
                  : 'border-transparent text-[#7D8471] hover:text-[#1A1A1A]'
              }`}
            >
              <Link2 className="w-4 h-4" />
              Social Links
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`px-6 py-4 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'contact'
                  ? 'border-[#1A1A1A] text-[#1A1A1A]'
                  : 'border-transparent text-[#7D8471] hover:text-[#1A1A1A]'
              }`}
            >
              <Phone className="w-4 h-4" />
              Contact Info
            </button>
            <button
              onClick={() => setActiveTab('legal')}
              className={`px-6 py-4 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'legal'
                  ? 'border-[#1A1A1A] text-[#1A1A1A]'
                  : 'border-transparent text-[#7D8471] hover:text-[#1A1A1A]'
              }`}
            >
              <FileText className="w-4 h-4" />
              Legal & Cookies
            </button>
          </div>

          {/* Hero Images Tab */}
          {activeTab === 'hero' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white border border-[#EDE9E3] mb-6">
                <div className="px-6 py-5 border-b border-[#EDE9E3]">
                  <h2 className="font-display text-lg text-[#1A1A1A]">Hero Section Images</h2>
                  <p className="text-sm text-[#7D8471] mt-1">
                    Manage the images displayed in the hero section of your homepage
                  </p>
                </div>
                
                <div className="p-6 space-y-4">
                  {heroImages.map((image, index) => (
                    <div key={image.id} className="flex gap-4 p-4 bg-[#F8F6F3] group">
                      <div className="flex items-center text-[#9A9A9A]">
                        <GripVertical className="w-5 h-5" />
                      </div>
                      
                      <div className="w-32 h-20 bg-[#EDE9E3] overflow-hidden flex-shrink-0">
                        <img 
                          src={image.url} 
                          alt={image.alt}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/128x80?text=Invalid+URL';
                          }}
                        />
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <div>
                          <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-1">
                            Image URL
                          </label>
                          <input
                            type="text"
                            value={image.url}
                            onChange={(e) => updateHeroImage(image.id, 'url', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-[#EDE9E3] text-[#1A1A1A] text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors"
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>
                        <div>
                          <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-1">
                            Alt Text
                          </label>
                          <input
                            type="text"
                            value={image.alt}
                            onChange={(e) => updateHeroImage(image.id, 'alt', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-[#EDE9E3] text-[#1A1A1A] text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors"
                            placeholder="Describe this image"
                          />
                        </div>
                      </div>
                      
                      <button
                        onClick={() => removeHeroImage(image.id)}
                        className="w-10 h-10 flex items-center justify-center text-[#9A9A9A] hover:text-red-500 hover:bg-red-50 transition-colors self-center"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add New Image */}
              <div className="bg-white border border-[#EDE9E3]">
                <div className="px-6 py-5 border-b border-[#EDE9E3]">
                  <h3 className="font-display text-[#1A1A1A]">Add New Image</h3>
                </div>
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                        Image URL
                      </label>
                      <input
                        type="text"
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-[#EDE9E3] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                        Alt Text
                      </label>
                      <input
                        type="text"
                        value={newImageAlt}
                        onChange={(e) => setNewImageAlt(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-[#EDE9E3] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                        placeholder="Describe this image"
                      />
                    </div>
                  </div>
                  <button
                    onClick={addHeroImage}
                    disabled={!newImageUrl.trim()}
                    className="px-6 py-3 bg-[#1A1A1A] text-white text-sm font-medium flex items-center gap-2 hover:bg-[#2D2D2D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4" />
                    Add Image
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Social Links Tab */}
          {activeTab === 'social' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white border border-[#EDE9E3]">
                <div className="px-6 py-5 border-b border-[#EDE9E3]">
                  <h2 className="font-display text-lg text-[#1A1A1A]">Social Media Links</h2>
                  <p className="text-sm text-[#7D8471] mt-1">
                    Configure your social media links displayed in the footer and across the site
                  </p>
                </div>
                
                <div className="p-6 space-y-4">
                  {socialLinks.map((link) => {
                    const Icon = PLATFORM_ICONS[link.platform] || Link2;
                    return (
                      <div 
                        key={link.id} 
                        className={`flex items-center gap-4 p-4 transition-colors ${
                          link.enabled ? 'bg-[#F8F6F3]' : 'bg-[#F8F6F3]/50'
                        }`}
                      >
                        <div className={`w-12 h-12 flex items-center justify-center ${
                          link.enabled ? 'bg-[#1A1A1A] text-white' : 'bg-[#EDE9E3] text-[#9A9A9A]'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        
                        <div className="flex-1">
                          <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                            {link.platform.charAt(0).toUpperCase() + link.platform.slice(1)} URL
                          </label>
                          <input
                            type="text"
                            value={link.url}
                            onChange={(e) => updateSocialLink(link.id, 'url', e.target.value)}
                            disabled={!link.enabled}
                            className={`w-full px-4 py-3 bg-white border border-[#EDE9E3] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors ${
                              !link.enabled ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            placeholder={`https://${link.platform}.com/yourusername`}
                          />
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <span className="text-xs tracking-wide uppercase text-[#7D8471]">
                            {link.enabled ? 'Active' : 'Disabled'}
                          </span>
                          <button
                            onClick={() => updateSocialLink(link.id, 'enabled', !link.enabled)}
                            className={`w-12 h-6 rounded-full relative transition-colors ${
                              link.enabled ? 'bg-[#7D8471]' : 'bg-[#EDE9E3]'
                            }`}
                          >
                            <span 
                              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                link.enabled ? 'left-7' : 'left-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Preview */}
              <div className="mt-6 bg-[#1A1A1A] p-6">
                <p className="text-xs tracking-wide uppercase text-white/50 mb-4">Preview</p>
                <div className="flex items-center gap-6">
                  {socialLinks.filter(link => link.enabled).map((link) => (
                    <a 
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/40 hover:text-[#C9A962] transition-colors text-sm tracking-wide capitalize"
                    >
                      {link.platform}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Branding Tab */}
          {activeTab === 'branding' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Logo */}
              <div className="bg-white border border-[#EDE9E3]">
                <div className="px-6 py-5 border-b border-[#EDE9E3]">
                  <h2 className="font-display text-lg text-[#1A1A1A]">Site Logo</h2>
                  <p className="text-sm text-[#7D8471] mt-1">
                    Upload your logo that appears in the navbar and footer
                  </p>
                </div>
                <div className="p-6">
                  <div className="flex gap-6 items-start">
                    {/* Preview */}
                    <div className="w-48 h-24 bg-[#F8F6F3] border border-[#EDE9E3] flex items-center justify-center">
                      {logoUrl ? (
                        <img src={logoUrl} alt="Logo preview" className="max-w-full max-h-full object-contain" />
                      ) : (
                        <div className="text-center">
                          <span className="font-display text-xl text-[#1A1A1A] tracking-tight">
                            Raz<span className="text-[#C9A962]">.</span>Estates
                          </span>
                          <p className="text-xs text-[#7D8471] mt-1">Default text logo</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <div>
                        <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                          Logo Image URL
                        </label>
                        <input
                          type="text"
                          value={logoUrl}
                          onChange={(e) => setLogoUrl(e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-[#EDE9E3] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                          placeholder="https://example.com/logo.png"
                        />
                      </div>
                      <p className="text-xs text-[#7D8471]">
                        Recommended: SVG or PNG with transparent background, max height 60px
                      </p>
                      <button className="px-4 py-2 border border-dashed border-[#EDE9E3] text-[#7D8471] text-sm hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-colors flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        Upload Logo File
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Favicon */}
              <div className="bg-white border border-[#EDE9E3]">
                <div className="px-6 py-5 border-b border-[#EDE9E3]">
                  <h2 className="font-display text-lg text-[#1A1A1A]">Favicon</h2>
                  <p className="text-sm text-[#7D8471] mt-1">
                    The small icon that appears in browser tabs
                  </p>
                </div>
                <div className="p-6">
                  <div className="flex gap-6 items-start">
                    {/* Preview */}
                    <div className="space-y-3">
                      <div className="w-16 h-16 bg-[#F8F6F3] border border-[#EDE9E3] flex items-center justify-center">
                        {faviconUrl ? (
                          <img src={faviconUrl} alt="Favicon" className="w-8 h-8" />
                        ) : (
                          <div className="w-8 h-8 bg-[#1A1A1A] flex items-center justify-center">
                            <span className="text-[#C9A962] font-bold text-sm">R</span>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-[#7D8471] text-center">32x32</p>
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <div>
                        <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                          Favicon URL
                        </label>
                        <input
                          type="text"
                          value={faviconUrl}
                          onChange={(e) => setFaviconUrl(e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-[#EDE9E3] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                          placeholder="/favicon.ico"
                        />
                      </div>
                      <p className="text-xs text-[#7D8471]">
                        Recommended: ICO, PNG, or SVG format. 32x32 or 64x64 pixels.
                      </p>
                      <button className="px-4 py-2 border border-dashed border-[#EDE9E3] text-[#7D8471] text-sm hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-colors flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        Upload Favicon
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Browser Preview */}
              <div className="bg-[#1A1A1A] p-6">
                <p className="text-xs tracking-wide uppercase text-white/50 mb-4">Browser Tab Preview</p>
                <div className="bg-[#2D2D2D] rounded-t-lg p-2 inline-flex items-center gap-2">
                  <div className="w-4 h-4 bg-white/10 flex items-center justify-center rounded-sm">
                    {faviconUrl ? (
                      <img src={faviconUrl} alt="" className="w-3 h-3" />
                    ) : (
                      <span className="text-[#C9A962] text-[8px] font-bold">R</span>
                    )}
                  </div>
                  <span className="text-white/70 text-xs">Raz.Estates | Luxury Real Estate</span>
                  <X className="w-3 h-3 text-white/30 ml-4" />
                </div>
              </div>
            </motion.div>
          )}

          {/* Page Sections Tab */}
          {activeTab === 'sections' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white border border-[#EDE9E3]">
                <div className="px-6 py-5 border-b border-[#EDE9E3]">
                  <h2 className="font-display text-lg text-[#1A1A1A]">Homepage Sections</h2>
                  <p className="text-sm text-[#7D8471] mt-1">
                    Drag to reorder sections. Toggle visibility for each section.
                  </p>
                </div>
                <div className="p-6 space-y-3">
                  {sections.sort((a, b) => a.order - b.order).map((section) => (
                    <div 
                      key={section.id}
                      className={`flex items-center gap-4 p-4 border transition-all cursor-move ${
                        section.enabled 
                          ? 'bg-white border-[#EDE9E3] hover:border-[#1A1A1A]' 
                          : 'bg-[#F8F6F3]/50 border-[#EDE9E3]/50'
                      }`}
                    >
                      <div className="text-[#9A9A9A] cursor-grab active:cursor-grabbing">
                        <GripVertical className="w-5 h-5" />
                      </div>
                      
                      <div className={`w-8 h-8 flex items-center justify-center text-sm font-medium ${
                        section.enabled ? 'bg-[#1A1A1A] text-white' : 'bg-[#EDE9E3] text-[#9A9A9A]'
                      }`}>
                        {section.order}
                      </div>
                      
                      <div className="flex-1">
                        <p className={`font-medium ${
                          section.enabled ? 'text-[#1A1A1A]' : 'text-[#9A9A9A]'
                        }`}>
                          {section.name}
                        </p>
                        <p className="text-xs text-[#7D8471]">
                          {section.id === 'hero' && 'Main hero with images and CTA'}
                          {section.id === 'featured' && 'Featured property listings'}
                          {section.id === 'services' && 'Buy, Rent, Sell services'}
                          {section.id === 'why-choose' && 'Company benefits and stats'}
                          {section.id === 'cta' && 'Newsletter signup section'}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className={`text-xs tracking-wide uppercase ${
                          section.enabled ? 'text-[#7D8471]' : 'text-[#9A9A9A]'
                        }`}>
                          {section.enabled ? 'Visible' : 'Hidden'}
                        </span>
                        <button
                          onClick={() => {
                            setSections(sections.map(s => 
                              s.id === section.id ? { ...s, enabled: !s.enabled } : s
                            ));
                          }}
                          className={`w-12 h-6 rounded-full relative transition-colors ${
                            section.enabled ? 'bg-[#7D8471]' : 'bg-[#EDE9E3]'
                          }`}
                        >
                          <span 
                            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                              section.enabled ? 'left-7' : 'left-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div className="mt-6 p-4 bg-[#C9A962]/10 border border-[#C9A962]/20">
                <p className="text-sm text-[#1A1A1A]">
                  <strong>Tip:</strong> When in Edit Mode on the homepage, you can also drag sections directly to reorder them.
                </p>
              </div>
            </motion.div>
          )}

          {/* Contact Info Tab */}
          {activeTab === 'contact' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Company Info */}
              <div className="bg-white border border-[#EDE9E3]">
                <div className="px-6 py-5 border-b border-[#EDE9E3]">
                  <h2 className="font-display text-lg text-[#1A1A1A]">Company Information</h2>
                  <p className="text-sm text-[#7D8471] mt-1">
                    Your company details shown across the site
                  </p>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-[#EDE9E3] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                        placeholder="Your Company Name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                        Tagline
                      </label>
                      <input
                        type="text"
                        value={companyTagline}
                        onChange={(e) => setCompanyTagline(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-[#EDE9E3] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                        placeholder="Luxury Real Estate Redefined"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              <div className="bg-white border border-[#EDE9E3]">
                <div className="px-6 py-5 border-b border-[#EDE9E3]">
                  <h2 className="font-display text-lg text-[#1A1A1A]">Contact Details</h2>
                  <p className="text-sm text-[#7D8471] mt-1">
                    Contact information displayed in the footer and contact pages
                  </p>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-[#F8F6F3]">
                    <div className="w-12 h-12 bg-[#1A1A1A] flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-[#EDE9E3] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                        placeholder="info@yourcompany.com"
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-[#F8F6F3]">
                    <div className="w-12 h-12 bg-[#1A1A1A] flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-[#EDE9E3] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-[#F8F6F3]">
                    <div className="w-12 h-12 bg-[#1A1A1A] flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                        Address
                      </label>
                      <textarea
                        value={contactAddress}
                        onChange={(e) => setContactAddress(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-[#EDE9E3] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors resize-none"
                        placeholder="123 Real Estate Ave, New York, NY 10001"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="bg-[#1A1A1A] p-6">
                <p className="text-xs tracking-wide uppercase text-white/50 mb-4">Footer Preview</p>
                <div className="space-y-2 text-white/60 text-sm">
                  <p>{contactEmail}</p>
                  <p>{contactPhone}</p>
                  <p>{contactAddress}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Legal & Cookies Tab */}
          {activeTab === 'legal' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Legal Pages */}
              <div className="bg-white border border-[#EDE9E3]">
                <div className="px-6 py-5 border-b border-[#EDE9E3]">
                  <h2 className="font-display text-lg text-[#1A1A1A]">Legal Pages</h2>
                  <p className="text-sm text-[#7D8471] mt-1">
                    Manage legal pages displayed in your footer
                  </p>
                </div>
                <div className="p-6 space-y-4">
                  {/* Privacy Policy */}
                  <div className={`flex items-center gap-4 p-4 transition-colors ${
                    legalPages.privacyPolicy.enabled ? 'bg-[#F8F6F3]' : 'bg-[#F8F6F3]/50'
                  }`}>
                    <div className={`w-12 h-12 flex items-center justify-center ${
                      legalPages.privacyPolicy.enabled ? 'bg-[#1A1A1A] text-white' : 'bg-[#EDE9E3] text-[#9A9A9A]'
                    }`}>
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={legalPages.privacyPolicy.title}
                        onChange={(e) => setLegalPages({...legalPages, privacyPolicy: {...legalPages.privacyPolicy, title: e.target.value}})}
                        disabled={!legalPages.privacyPolicy.enabled}
                        className={`w-full px-4 py-3 bg-white border border-[#EDE9E3] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors ${
                          !legalPages.privacyPolicy.enabled ? 'opacity-50' : ''
                        }`}
                        placeholder="Privacy Policy"
                      />
                      <Link href="/privacy-policy" className="text-xs text-[#C9A962] mt-1 inline-block hover:underline">
                        View page →
                      </Link>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setLegalPages({...legalPages, privacyPolicy: {...legalPages.privacyPolicy, enabled: !legalPages.privacyPolicy.enabled}})}
                        className={`w-12 h-6 rounded-full relative transition-colors ${
                          legalPages.privacyPolicy.enabled ? 'bg-[#7D8471]' : 'bg-[#EDE9E3]'
                        }`}
                      >
                        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          legalPages.privacyPolicy.enabled ? 'left-7' : 'left-1'
                        }`} />
                      </button>
                    </div>
                  </div>

                  {/* Terms of Service */}
                  <div className={`flex items-center gap-4 p-4 transition-colors ${
                    legalPages.termsOfService.enabled ? 'bg-[#F8F6F3]' : 'bg-[#F8F6F3]/50'
                  }`}>
                    <div className={`w-12 h-12 flex items-center justify-center ${
                      legalPages.termsOfService.enabled ? 'bg-[#1A1A1A] text-white' : 'bg-[#EDE9E3] text-[#9A9A9A]'
                    }`}>
                      <Globe className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={legalPages.termsOfService.title}
                        onChange={(e) => setLegalPages({...legalPages, termsOfService: {...legalPages.termsOfService, title: e.target.value}})}
                        disabled={!legalPages.termsOfService.enabled}
                        className={`w-full px-4 py-3 bg-white border border-[#EDE9E3] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors ${
                          !legalPages.termsOfService.enabled ? 'opacity-50' : ''
                        }`}
                        placeholder="Terms of Service"
                      />
                      <Link href="/terms-of-service" className="text-xs text-[#C9A962] mt-1 inline-block hover:underline">
                        View page →
                      </Link>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setLegalPages({...legalPages, termsOfService: {...legalPages.termsOfService, enabled: !legalPages.termsOfService.enabled}})}
                        className={`w-12 h-6 rounded-full relative transition-colors ${
                          legalPages.termsOfService.enabled ? 'bg-[#7D8471]' : 'bg-[#EDE9E3]'
                        }`}
                      >
                        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          legalPages.termsOfService.enabled ? 'left-7' : 'left-1'
                        }`} />
                      </button>
                    </div>
                  </div>

                  {/* Cookies */}
                  <div className={`flex items-center gap-4 p-4 transition-colors ${
                    legalPages.cookies.enabled ? 'bg-[#F8F6F3]' : 'bg-[#F8F6F3]/50'
                  }`}>
                    <div className={`w-12 h-12 flex items-center justify-center ${
                      legalPages.cookies.enabled ? 'bg-[#1A1A1A] text-white' : 'bg-[#EDE9E3] text-[#9A9A9A]'
                    }`}>
                      <Cookie className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={legalPages.cookies.title}
                        onChange={(e) => setLegalPages({...legalPages, cookies: {...legalPages.cookies, title: e.target.value}})}
                        disabled={!legalPages.cookies.enabled}
                        className={`w-full px-4 py-3 bg-white border border-[#EDE9E3] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors ${
                          !legalPages.cookies.enabled ? 'opacity-50' : ''
                        }`}
                        placeholder="Cookie Policy"
                      />
                      <Link href="/cookies" className="text-xs text-[#C9A962] mt-1 inline-block hover:underline">
                        View page →
                      </Link>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setLegalPages({...legalPages, cookies: {...legalPages.cookies, enabled: !legalPages.cookies.enabled}})}
                        className={`w-12 h-6 rounded-full relative transition-colors ${
                          legalPages.cookies.enabled ? 'bg-[#7D8471]' : 'bg-[#EDE9E3]'
                        }`}
                      >
                        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          legalPages.cookies.enabled ? 'left-7' : 'left-1'
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cookie Consent Popup */}
              <div className="bg-white border border-[#EDE9E3]">
                <div className="px-6 py-5 border-b border-[#EDE9E3]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-display text-lg text-[#1A1A1A]">Cookie Consent Popup</h2>
                      <p className="text-sm text-[#7D8471] mt-1">
                        Customize the cookie consent banner shown to visitors
                      </p>
                    </div>
                    <button
                      onClick={() => setCookieSettings({...cookieSettings, enabled: !cookieSettings.enabled})}
                      className={`w-12 h-6 rounded-full relative transition-colors ${
                        cookieSettings.enabled ? 'bg-[#7D8471]' : 'bg-[#EDE9E3]'
                      }`}
                    >
                      <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        cookieSettings.enabled ? 'left-7' : 'left-1'
                      }`} />
                    </button>
                  </div>
                </div>
                <div className={`p-6 space-y-4 ${!cookieSettings.enabled ? 'opacity-50 pointer-events-none' : ''}`}>
                  <div>
                    <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={cookieSettings.title}
                      onChange={(e) => setCookieSettings({...cookieSettings, title: e.target.value})}
                      className="w-full px-4 py-3 bg-white border border-[#EDE9E3] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                      placeholder="We Value Your Privacy"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                      Message
                    </label>
                    <textarea
                      value={cookieSettings.message}
                      onChange={(e) => setCookieSettings({...cookieSettings, message: e.target.value})}
                      className="w-full px-4 py-3 bg-white border border-[#EDE9E3] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors resize-none"
                      rows={3}
                      placeholder="We use cookies to enhance your browsing experience..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                        Accept Button Text
                      </label>
                      <input
                        type="text"
                        value={cookieSettings.acceptText}
                        onChange={(e) => setCookieSettings({...cookieSettings, acceptText: e.target.value})}
                        className="w-full px-4 py-3 bg-white border border-[#EDE9E3] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                        placeholder="Accept All"
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                        Decline Button Text
                      </label>
                      <input
                        type="text"
                        value={cookieSettings.declineText}
                        onChange={(e) => setCookieSettings({...cookieSettings, declineText: e.target.value})}
                        className="w-full px-4 py-3 bg-white border border-[#EDE9E3] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                        placeholder="Decline"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Cookie Popup Preview */}
              <div className="bg-[#1A1A1A] p-6">
                <p className="text-xs tracking-wide uppercase text-white/50 mb-4">Cookie Popup Preview</p>
                <div className="bg-white p-6 max-w-md">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 bg-[#C9A962]/10 flex items-center justify-center flex-shrink-0">
                      <Cookie className="w-5 h-5 text-[#C9A962]" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg text-[#1A1A1A] mb-1">{cookieSettings.title}</h3>
                      <p className="text-sm text-[#4A4A4A] leading-relaxed">{cookieSettings.message}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 py-3 bg-[#1A1A1A] text-white text-sm font-medium">
                      {cookieSettings.acceptText}
                    </button>
                    <button className="flex-1 py-3 border border-[#EDE9E3] text-[#1A1A1A] text-sm font-medium">
                      {cookieSettings.declineText}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
