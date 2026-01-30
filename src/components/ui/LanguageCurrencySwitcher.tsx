'use client';

import React from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useI18n, Language, Currency } from '@/context/I18nContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ar', name: 'العربية', flag: '🇲🇦' }
];

const currencies: { code: Currency; name: string; symbol: string }[] = [
  { code: 'MAD', name: 'Dirham Marocain', symbol: 'DH' },
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' }
];

export function LanguageCurrencySwitcher() {
  const { language, currency, setLanguage, setCurrency, t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const currentLang = languages.find(l => l.code === language) || languages[0];
  const currentCurr = currencies.find(c => c.code === currency) || currencies[0];

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  const handleCurrencyChange = (curr: Currency) => {
    setCurrency(curr);
    setIsOpen(false);
  };

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#3D3936] hover:text-[#8B1538] transition-colors">
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{currentLang.flag} {currentLang.code.toUpperCase()}</span>
        <span className="sm:hidden">{currentLang.flag}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 w-64 bg-white border border-[#E8E4DC] shadow-xl mt-1 z-50"
          >
            <div className="p-2">
              {/* Languages */}
              <div className="mb-3">
                <p className="text-xs text-[#8A8178] uppercase tracking-wide px-2 py-1">
                  {t('common.language')}
                </p>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left text-sm transition-colors ${
                      language === lang.code
                        ? 'bg-[#8B1538]/10 text-[#8B1538]'
                        : 'hover:bg-[#FAF9F7] text-[#1A1818]'
                    }`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span>{lang.name}</span>
                    {language === lang.code && (
                      <div className="ml-auto w-2 h-2 bg-[#8B1538] rounded-full" />
                    )}
                  </button>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-[#E8E4DC] my-2" />

              {/* Currencies */}
              <div>
                <p className="text-xs text-[#8A8178] uppercase tracking-wide px-2 py-1">
                  {t('common.currency')}
                </p>
                {currencies.map((curr) => (
                  <button
                    key={curr.code}
                    onClick={() => handleCurrencyChange(curr.code)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-left text-sm transition-colors ${
                      currency === curr.code
                        ? 'bg-[#8B1538]/10 text-[#8B1538]'
                        : 'hover:bg-[#FAF9F7] text-[#1A1818]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{curr.symbol}</span>
                      <span>{curr.name}</span>
                    </div>
                    {currency === curr.code && (
                      <div className="w-2 h-2 bg-[#8B1538] rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
