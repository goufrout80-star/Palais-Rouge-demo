'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'fr' | 'en' | 'ar';
export type Currency = 'MAD' | 'USD' | 'EUR';

export interface Translation {
  [key: string]: string | Translation;
}

interface I18nContextType {
  language: Language;
  currency: Currency;
  setLanguage: (lang: Language) => void;
  setCurrency: (curr: Currency) => void;
  t: (key: string) => string;
  formatCurrency: (amount: number) => string;
  convertCurrency: (amount: number, from: Currency, to: Currency) => number;
  formatNumber: (num: number) => string;
}

// Exchange rates (should be updated regularly in production)
const EXCHANGE_RATES: Record<Currency, Partial<Record<Currency, number>>> = {
  USD: { MAD: 10.0, EUR: 0.92 },
  EUR: { MAD: 10.87, USD: 1.09 },
  MAD: { USD: 0.10, EUR: 0.092 }
};

// Smart rounding logic
const smartRound = (amount: number, currency: Currency): number => {
  if (currency === 'MAD' && amount > 700) {
    // Round to nearest 1000 for MAD amounts over 700
    return Math.round(amount / 1000) * 1000;
  }
  return Math.round(amount * 100) / 100; // 2 decimal places for other cases
};

const translations: Record<Language, Translation> = {
  fr: {
    common: {
      buy: 'Acheter',
      rent: 'Louer',
      sell: 'Vendre',
      help: 'Aide',
      contact: 'Contact',
      search: 'Recherche',
      properties: 'Propriétés',
      home: 'Accueil',
      all_properties: 'Toutes les propriétés',
      browse_homes: 'Parcourir les maisons',
      by_location: 'Par emplacement',
      new_developments: 'Nouveaux développements',
      mortgage_calculator: 'Calculateur hypothécaire',
      browse_rentals: 'Parcourir les locations',
      verified_listings: 'Annonces vérifiées',
      rental_guide: 'Guide de location',
      sell_your_home: 'Vendez votre maison',
      home_valuation: 'Évaluation immobilière',
      find_an_agent: 'Trouver un agent',
      selling_guide: 'Guide de vente',
      faq: 'FAQ',
      resources: 'Ressources',
      dashboard: 'Tableau de bord',
      sign_in: 'Se connecter',
      get_started: 'Commencer',
      logout: 'Déconnexion'
    },
    property: {
      price: 'Prix',
      bedrooms: 'Chambres',
      bathrooms: 'Salles de bain',
      area: 'Surface',
      sqm: 'm²',
      year_built: 'Année de construction',
      property_type: 'Type de propriété',
      listing_type: 'Type d\'annonce'
    },
    currency: {
      mad: 'DH',
      usd: '$',
      eur: '€'
    }
  },
  en: {
    common: {
      buy: 'Buy',
      rent: 'Rent',
      sell: 'Sell',
      help: 'Help',
      contact: 'Contact',
      search: 'Search',
      properties: 'Properties',
      home: 'Home',
      all_properties: 'All Properties',
      browse_homes: 'Browse Homes',
      by_location: 'By Location',
      new_developments: 'New Developments',
      mortgage_calculator: 'Mortgage Calculator',
      browse_rentals: 'Browse Rentals',
      verified_listings: 'Verified Listings',
      rental_guide: 'Rental Guide',
      sell_your_home: 'Sell Your Home',
      home_valuation: 'Home Valuation',
      find_an_agent: 'Find an Agent',
      selling_guide: 'Selling Guide',
      faq: 'FAQ',
      resources: 'Resources',
      dashboard: 'Dashboard',
      sign_in: 'Sign In',
      get_started: 'Get Started',
      logout: 'Logout'
    },
    property: {
      price: 'Price',
      bedrooms: 'Bedrooms',
      bathrooms: 'Bathrooms',
      area: 'Area',
      sqm: 'm²',
      year_built: 'Year Built',
      property_type: 'Property Type',
      listing_type: 'Listing Type'
    },
    currency: {
      mad: 'MAD',
      usd: 'USD',
      eur: 'EUR'
    }
  },
  ar: {
    common: {
      buy: 'شراء',
      rent: 'إيجار',
      sell: 'بيع',
      help: 'مساعدة',
      contact: 'اتصال',
      search: 'بحث',
      properties: 'العقارات',
      home: 'الرئيسية',
      all_properties: 'جميع العقارات',
      browse_homes: 'تصفح المنازل',
      by_location: 'حسب الموقع',
      new_developments: 'مشاريع جديدة',
      mortgage_calculator: 'حاسبة الرهن العقاري',
      browse_rentals: 'تصفح الإيجارات',
      verified_listings: 'إعلانات مُعتمدة',
      rental_guide: 'دليل الإيجار',
      sell_your_home: 'بع منزلك',
      home_valuation: 'تقييم المنزل',
      find_an_agent: 'ابحث عن وكيل',
      selling_guide: 'دليل البيع',
      faq: 'الأسئلة الشائعة',
      resources: 'الموارد',
      dashboard: 'لوحة التحكم',
      sign_in: 'تسجيل الدخول',
      get_started: 'ابدأ الآن',
      logout: 'تسجيل الخروج'
    },
    property: {
      price: 'السعر',
      bedrooms: 'غرف النوم',
      bathrooms: 'الحمامات',
      area: 'المساحة',
      sqm: 'م²',
      year_built: 'سنة البناء',
      property_type: 'نوع العقار',
      listing_type: 'نوع الإعلان'
    },
    currency: {
      mad: 'درهم',
      usd: 'دولار',
      eur: 'يورو'
    }
  }
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr'); // French default
  const [currency, setCurrency] = useState<Currency>('MAD'); // MAD default

  // Load saved preferences from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    const savedCurr = localStorage.getItem('currency') as Currency;
    
    if (savedLang && ['fr', 'en', 'ar'].includes(savedLang)) {
      setLanguage(savedLang);
    }
    if (savedCurr && ['MAD', 'USD', 'EUR'].includes(savedCurr)) {
      setCurrency(savedCurr);
    }
  }, []);

  // Save preferences when they change
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  const convertCurrency = (amount: number, from: Currency, to: Currency): number => {
    if (from === to) return amount;
    
    const rate = EXCHANGE_RATES[from]?.[to];
    if (!rate) return amount;
    
    return amount * rate;
  };

  const formatCurrency = (amount: number): string => {
    const convertedAmount = convertCurrency(amount, 'MAD', currency);
    const roundedAmount = smartRound(convertedAmount, currency);
    
    // Format based on language and currency
    // Use 'en-US' for Arabic to get Western Arabic numerals (1,2,3 instead of ١,٢,٣)
    const locale = language === 'ar' ? 'en-US' : 
                   language === 'fr' ? 'fr-FR' : 'en-US';
    
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: currency === 'MAD' && roundedAmount >= 1000 ? 0 : 2,
      maximumFractionDigits: currency === 'MAD' && roundedAmount >= 1000 ? 0 : 2
    });
    
    return formatter.format(roundedAmount);
  };

  const formatNumber = (num: number): string => {
    // Use 'en-US' for Arabic to get Western Arabic numerals
    const locale = language === 'ar' ? 'en-US' : 
                   language === 'fr' ? 'fr-FR' : 'en-US';
    
    return new Intl.NumberFormat(locale).format(num);
  };

  return (
    <I18nContext.Provider
      value={{
        language,
        currency,
        setLanguage,
        setCurrency,
        t,
        formatCurrency,
        convertCurrency,
        formatNumber
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
