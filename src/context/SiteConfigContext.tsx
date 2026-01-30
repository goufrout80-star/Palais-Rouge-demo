'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface HeroImage {
  id: string;
  url: string;
  alt: string;
}

export interface SocialLink {
  platform: 'instagram' | 'linkedin' | 'twitter' | 'facebook';
  url: string;
  enabled: boolean;
}

export interface HomeSection {
  id: string;
  type: 'hero' | 'featured' | 'services' | 'why-choose' | 'cta';
  enabled: boolean;
  order: number;
}

export interface SiteConfig {
  logo: {
    url: string;
    alt: string;
  };
  favicon: string;
  heroImages: HeroImage[];
  heroTitle: string;
  heroSubtitle: string;
  socialLinks: SocialLink[];
  homeSections: HomeSection[];
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  companyName: string;
  companyTagline: string;
  legalPages: {
    privacyPolicy: { enabled: boolean; title: string };
    termsOfService: { enabled: boolean; title: string };
    cookies: { enabled: boolean; title: string };
  };
  footerLinks: {
    id: string;
    label: string;
    url: string;
    enabled: boolean;
  }[];
  cookieConsent: {
    enabled: boolean;
    title: string;
    message: string;
    acceptText: string;
    declineText: string;
    settingsText: string;
  };
}

interface SiteConfigContextType {
  config: SiteConfig;
  isEditMode: boolean;
  setEditMode: (mode: boolean) => void;
  updateConfig: (updates: Partial<SiteConfig>) => void;
  updateHeroImage: (id: string, updates: Partial<HeroImage>) => void;
  addHeroImage: (image: HeroImage) => void;
  removeHeroImage: (id: string) => void;
  updateSocialLink: (platform: string, updates: Partial<SocialLink>) => void;
  reorderSections: (sections: HomeSection[]) => void;
  toggleSection: (id: string) => void;
  saveConfig: () => Promise<void>;
}

const defaultConfig: SiteConfig = {
  logo: {
    url: '',
    alt: 'Palais Rouge Immobilier',
  },
  favicon: '/favicon.ico',
  heroImages: [
    { id: '1', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920', alt: 'Propriété de luxe' },
    { id: '2', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920', alt: 'Intérieur moderne' },
    { id: '3', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920', alt: 'Villa contemporaine' },
  ],
  heroTitle: 'L\'Excellence Immobilière',
  heroSubtitle: 'Des propriétés d\'exception pour une clientèle exigeante',
  socialLinks: [
    { platform: 'instagram', url: 'https://instagram.com/palaisrouge', enabled: true },
    { platform: 'linkedin', url: 'https://linkedin.com/company/palaisrouge', enabled: true },
    { platform: 'twitter', url: 'https://twitter.com/palaisrouge', enabled: true },
    { platform: 'facebook', url: 'https://facebook.com/palaisrouge', enabled: false },
  ],
  homeSections: [
    { id: 'hero', type: 'hero', enabled: true, order: 1 },
    { id: 'featured', type: 'featured', enabled: true, order: 2 },
    { id: 'services', type: 'services', enabled: true, order: 3 },
    { id: 'why-choose', type: 'why-choose', enabled: true, order: 4 },
    { id: 'cta', type: 'cta', enabled: true, order: 5 },
  ],
  contactEmail: 'contact@palaisrouge.ma',
  contactPhone: '+212 524 43 00 00',
  contactAddress: 'Bd Abdelkrim Al Khattabi, Marrakech 40000, Morocco',
  companyName: 'Palais Rouge Immobilier',
  companyTagline: 'L\'Excellence Immobilière depuis 1985',
  legalPages: {
    privacyPolicy: { enabled: true, title: 'Confidentialité' },
    termsOfService: { enabled: true, title: 'Conditions' },
    cookies: { enabled: true, title: 'Cookies' },
  },
  footerLinks: [
    { id: '1', label: 'About Us', url: '/about', enabled: true },
    { id: '2', label: 'Contact', url: '/contact', enabled: true },
    { id: '3', label: 'Careers', url: '/careers', enabled: false },
  ],
  cookieConsent: {
    enabled: true,
    title: 'Respect de votre vie privée',
    message: 'Nous utilisons des cookies pour améliorer votre expérience de navigation, personnaliser le contenu et analyser notre trafic. En cliquant sur "Accepter", vous consentez à l\'utilisation de cookies.',
    acceptText: 'Accepter',
    declineText: 'Refuser',
    settingsText: 'Paramètres',
  },
};

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [isEditMode, setEditMode] = useState(false);

  const updateConfig = useCallback((updates: Partial<SiteConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  }, []);

  const updateHeroImage = useCallback((id: string, updates: Partial<HeroImage>) => {
    setConfig(prev => ({
      ...prev,
      heroImages: prev.heroImages.map(img => 
        img.id === id ? { ...img, ...updates } : img
      ),
    }));
  }, []);

  const addHeroImage = useCallback((image: HeroImage) => {
    setConfig(prev => ({
      ...prev,
      heroImages: [...prev.heroImages, image],
    }));
  }, []);

  const removeHeroImage = useCallback((id: string) => {
    setConfig(prev => ({
      ...prev,
      heroImages: prev.heroImages.filter(img => img.id !== id),
    }));
  }, []);

  const updateSocialLink = useCallback((platform: string, updates: Partial<SocialLink>) => {
    setConfig(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.map(link =>
        link.platform === platform ? { ...link, ...updates } : link
      ),
    }));
  }, []);

  const reorderSections = useCallback((sections: HomeSection[]) => {
    setConfig(prev => ({ ...prev, homeSections: sections }));
  }, []);

  const toggleSection = useCallback((id: string) => {
    setConfig(prev => ({
      ...prev,
      homeSections: prev.homeSections.map(section =>
        section.id === id ? { ...section, enabled: !section.enabled } : section
      ),
    }));
  }, []);

  const saveConfig = useCallback(async () => {
    // In a real app, save to backend
    console.log('Saving config:', config);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
  }, [config]);

  return (
    <SiteConfigContext.Provider
      value={{
        config,
        isEditMode,
        setEditMode,
        updateConfig,
        updateHeroImage,
        addHeroImage,
        removeHeroImage,
        updateSocialLink,
        reorderSections,
        toggleSection,
        saveConfig,
      }}
    >
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  const context = useContext(SiteConfigContext);
  if (!context) {
    throw new Error('useSiteConfig must be used within a SiteConfigProvider');
  }
  return context;
}
