'use client';

import { useI18n } from '@/context/I18nContext';

// Utility hook for formatting numbers and currency with smart rounding
export function useFormatting() {
  const { formatCurrency, formatNumber, convertCurrency, currency, language } = useI18n();

  // Format property price with smart rounding
  const formatPrice = (amountInMAD: number): string => {
    return formatCurrency(amountInMAD);
  };

  // Format price per square meter
  const formatPricePerSqm = (totalPrice: number, area: number): string => {
    const pricePerSqmMad = totalPrice / area;
    const convertedPrice = convertCurrency(pricePerSqmMad, 'MAD', currency);
    
    // Format without decimals for clean display
    const locale = language === 'ar' ? 'en-US' : 
                   language === 'fr' ? 'fr-FR' : 'en-US';
    
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    
    return formatter.format(Math.round(convertedPrice));
  };

  // Format large numbers (e.g., 27000 -> 27 000 in French)
  const formatLargeNumber = (num: number): string => {
    return formatNumber(num);
  };

  // Convert and format with the smart logic
  // Example: 3000 USD -> 27000 MAD (rounded to 27000)
  const convertAndFormat = (amount: number, fromCurrency: 'MAD' | 'USD' | 'EUR'): string => {
    const converted = convertCurrency(amount, fromCurrency, currency);
    return formatCurrency(converted);
  };

  return {
    formatPrice,
    formatPricePerSqm,
    formatLargeNumber,
    convertAndFormat,
    currency,
    language
  };
}
