'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import enTranslations from '@/locales/en.json';
import frTranslations from '@/locales/fr.json';
import arTranslations from '@/locales/ar.json';

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
  isRTL: boolean;
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
  en: enTranslations,
  fr: frTranslations,
  ar: arTranslations
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr'); // French default
  const [currency, setCurrency] = useState<Currency>('MAD'); // MAD default
  const isRTL = language === 'ar';

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

  // Update document direction and lang attribute for RTL support
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
    }
  }, [language, isRTL]);

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
        formatNumber,
        isRTL
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
