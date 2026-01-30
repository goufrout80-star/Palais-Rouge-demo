'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, X, Check, Upload, Link2, Trash2 } from 'lucide-react';
import { useSiteConfig } from '@/context/SiteConfigContext';
import { useAuth } from '@/context/AuthContext';

interface EditableImageProps {
  src: string;
  alt: string;
  className?: string;
  imageId?: string;
  onUpdate?: (url: string, alt: string) => void;
  editable?: boolean;
}

export function EditableImage({ 
  src, 
  alt, 
  className = '', 
  imageId,
  onUpdate,
  editable = true 
}: EditableImageProps) {
  const { user, isAuthenticated } = useAuth();
  const { isEditMode, updateHeroImage } = useSiteConfig();
  const [isEditing, setIsEditing] = useState(false);
  const [newUrl, setNewUrl] = useState(src);
  const [newAlt, setNewAlt] = useState(alt);
  const [inputMode, setInputMode] = useState<'url' | 'upload'>('url');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isAdmin = isAuthenticated && user?.role === 'admin';
  const canEdit = isAdmin && isEditMode && editable;

  const handleSave = () => {
    if (imageId) {
      updateHeroImage(imageId, { url: newUrl, alt: newAlt });
    }
    if (onUpdate) {
      onUpdate(newUrl, newAlt);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewUrl(src);
    setNewAlt(alt);
    setIsEditing(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload to your server/CDN
      // For now, create a local URL preview
      const url = URL.createObjectURL(file);
      setNewUrl(url);
    }
  };

  return (
    <div className={`relative group ${className}`}>
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover"
      />
      
      {/* Edit Overlay */}
      {canEdit && !isEditing && (
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => setIsEditing(true)}
        >
          <div className="flex flex-col items-center gap-2 text-white">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Edit3 className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium tracking-wide uppercase">Edit Image</span>
          </div>
        </motion.div>
      )}

      {/* Edit indicator badge */}
      {canEdit && !isEditing && (
        <div className="absolute top-2 right-2 w-6 h-6 bg-[#C9A962] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Edit3 className="w-3 h-3 text-[#1A1A1A]" />
        </div>
      )}

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-[200] flex items-center justify-center p-4"
            onClick={handleCancel}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white w-full max-w-xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#EDE9E3]">
                <h3 className="font-display text-lg text-[#1A1A1A]">Edit Image</h3>
                <button 
                  onClick={handleCancel}
                  className="w-8 h-8 flex items-center justify-center text-[#7D8471] hover:text-[#1A1A1A] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Preview */}
              <div className="p-6 bg-[#F8F6F3]">
                <div className="aspect-video bg-[#EDE9E3] overflow-hidden">
                  <img 
                    src={newUrl} 
                    alt={newAlt}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x450?text=Invalid+URL';
                    }}
                  />
                </div>
              </div>

              {/* Input Mode Tabs */}
              <div className="flex border-b border-[#EDE9E3]">
                <button
                  onClick={() => setInputMode('url')}
                  className={`flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                    inputMode === 'url' 
                      ? 'bg-[#1A1A1A] text-white' 
                      : 'text-[#7D8471] hover:text-[#1A1A1A]'
                  }`}
                >
                  <Link2 className="w-4 h-4" />
                  URL
                </button>
                <button
                  onClick={() => setInputMode('upload')}
                  className={`flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                    inputMode === 'upload' 
                      ? 'bg-[#1A1A1A] text-white' 
                      : 'text-[#7D8471] hover:text-[#1A1A1A]'
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  Upload
                </button>
              </div>

              {/* Form */}
              <div className="p-6 space-y-4">
                {inputMode === 'url' ? (
                  <div>
                    <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                      Image URL
                    </label>
                    <input
                      type="text"
                      value={newUrl}
                      onChange={(e) => setNewUrl(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-[#EDE9E3] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                      Upload Image
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full px-4 py-8 border-2 border-dashed border-[#EDE9E3] text-[#7D8471] hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-colors flex flex-col items-center gap-2"
                    >
                      <Upload className="w-6 h-6" />
                      <span className="text-sm">Click to select image</span>
                    </button>
                  </div>
                )}

                <div>
                  <label className="block text-xs tracking-wide uppercase text-[#7D8471] mb-2">
                    Alt Text
                  </label>
                  <input
                    type="text"
                    value={newAlt}
                    onChange={(e) => setNewAlt(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-[#EDE9E3] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                    placeholder="Describe this image"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex gap-3 px-6 py-4 border-t border-[#EDE9E3] bg-[#F8F6F3]">
                <button
                  onClick={handleCancel}
                  className="flex-1 px-4 py-3 border border-[#EDE9E3] text-[#1A1A1A] text-sm font-medium hover:border-[#1A1A1A] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 px-4 py-3 bg-[#1A1A1A] text-white text-sm font-medium hover:bg-[#2D2D2D] transition-colors flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Save Image
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Editable Text Component
interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  multiline?: boolean;
}

export function EditableText({ 
  value, 
  onChange, 
  className = '', 
  as: Tag = 'p',
  multiline = false 
}: EditableTextProps) {
  const { user, isAuthenticated } = useAuth();
  const { isEditMode } = useSiteConfig();
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const isAdmin = isAuthenticated && user?.role === 'admin';
  const canEdit = isAdmin && isEditMode;

  const handleSave = () => {
    onChange(tempValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempValue(value);
    setIsEditing(false);
  };

  if (!canEdit) {
    return <Tag className={className}>{value}</Tag>;
  }

  if (isEditing) {
    return (
      <div className="relative">
        {multiline ? (
          <textarea
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className={`${className} bg-white/10 border border-[#C9A962] focus:outline-none p-2 w-full`}
            autoFocus
            rows={3}
          />
        ) : (
          <input
            type="text"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className={`${className} bg-white/10 border border-[#C9A962] focus:outline-none p-2 w-full`}
            autoFocus
          />
        )}
        <div className="absolute -bottom-10 right-0 flex gap-2">
          <button
            onClick={handleCancel}
            className="w-8 h-8 bg-red-500 text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
          <button
            onClick={handleSave}
            className="w-8 h-8 bg-green-500 text-white flex items-center justify-center"
          >
            <Check className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <Tag 
      className={`${className} cursor-pointer relative group`}
      onClick={() => setIsEditing(true)}
    >
      {value}
      <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#C9A962] text-[#1A1A1A] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <Edit3 className="w-3 h-3" />
      </span>
    </Tag>
  );
}
