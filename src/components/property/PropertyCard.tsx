'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, MapPin, Bed, Bath, Maximize2, ArrowUpRight } from 'lucide-react';
import { Property } from '@/types';
import { getPropertyTypeLabel, cn } from '@/lib/utils';
import { useFormatting } from '@/hooks/useFormatting';
import { useI18n } from '@/context/I18nContext';

interface PropertyCardProps {
  property: Property;
  onFavorite?: (id: string) => void;
  isFavorite?: boolean;
}

export function PropertyCard({ property, onFavorite, isFavorite = false }: PropertyCardProps) {
  const [imageError, setImageError] = useState(false);
  const { formatPrice } = useFormatting();
  const { t } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      {/* Image Container */}
      <Link href={`/properties/${property.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#F8F6F3]">
          {!imageError && property.images?.[0] ? (
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Maximize2 className="w-10 h-10 text-[#C9A962]/50" />
            </div>
          )}
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          
          {/* Top Row - Badges & Favorite */}
          <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 text-[11px] font-medium tracking-wide uppercase bg-white text-[#1A1A1A]">
                {property.listingType === 'BUY' ? t('common.buy') : t('common.rent')}
              </span>
              {property.featured && (
                <span className="px-3 py-1.5 text-[11px] font-medium tracking-wide uppercase bg-[#1A1A1A] text-white">
                  Featured
                </span>
              )}
            </div>
            
            {onFavorite && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onFavorite(property.id);
                }}
                className={cn(
                  'w-9 h-9 flex items-center justify-center transition-all duration-300',
                  isFavorite 
                    ? 'bg-[#1A1A1A] text-white' 
                    : 'bg-white text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white'
                )}
              >
                <Heart className={cn('w-4 h-4', isFavorite && 'fill-current')} />
              </button>
            )}
          </div>

          {/* View Button - appears on hover */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <div className="w-10 h-10 bg-white flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4 text-[#1A1A1A]" />
            </div>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="pt-5">
        {/* Location - Small text above */}
        <div className="flex items-center text-[#7D8471] mb-2">
          <MapPin className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
          <span className="text-xs tracking-wide uppercase line-clamp-1">
            {property.neighborhood ? `${property.neighborhood}, ` : ''}{property.city}
          </span>
        </div>
        
        {/* Title */}
        <Link href={`/properties/${property.id}`}>
          <h3 className="font-display text-lg text-[#1A1A1A] group-hover:text-[#7D8471] transition-colors line-clamp-1 mb-3">
            {property.title}
          </h3>
        </Link>

        {/* Specs Row */}
        <div className="flex items-center gap-4 text-[#4A4A4A] text-sm mb-4">
          {property.bedrooms > 0 && (
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-[#7D8471]" />
              <span>{property.bedrooms} {property.bedrooms === 1 ? t('property.bedrooms') : t('property.bedrooms')}</span>
            </div>
          )}
          {property.bathrooms > 0 && (
            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-[#7D8471]" />
              <span>{property.bathrooms} {property.bathrooms === 1 ? t('property.bathrooms') : t('property.bathrooms')}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Maximize2 className="w-4 h-4 text-[#7D8471]" />
            <span>{property.surfaceArea.toLocaleString()} {t('property.sqm')}</span>
          </div>
        </div>

        {/* Bottom Row - Price & Type */}
        <div className="flex items-center justify-between pt-4 border-t border-[#EDE9E3]">
          <div className="font-display text-xl text-[#1A1A1A]">
            {formatPrice(property.price)}
          </div>
          <span className="text-[11px] tracking-wide uppercase text-[#7D8471]">
            {getPropertyTypeLabel(property.propertyType)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
