'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, Edit3, Eye, EyeOff, Save, X, Image, Layout, 
  Link2, Upload, Check, ChevronDown, Palette, LogOut
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useSiteConfig } from '@/context/SiteConfigContext';

export function AdminToolbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { isEditMode, setEditMode, saveConfig } = useSiteConfig();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Only show for admin users
  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  const handleSave = async () => {
    setSaving(true);
    await saveConfig();
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleToggleEdit = () => {
    setEditMode(!isEditMode);
  };

  return (
    <>
      {/* Admin Bar */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-[100] bg-[#1A1A1A] text-white h-10 flex items-center px-4 shadow-lg"
      >
        <div className="flex items-center justify-between w-full max-w-[1800px] mx-auto">
          {/* Left - Brand */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#C9A962] flex items-center justify-center">
                <Settings className="w-3.5 h-3.5 text-[#1A1A1A]" />
              </div>
              <span className="text-xs font-medium tracking-wide">ADMIN MODE</span>
            </div>
            
            <div className="h-4 w-px bg-white/20" />
            
            <Link 
              href="/admin/dashboard" 
              className="text-xs text-white/60 hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              href="/admin/settings" 
              className="text-xs text-white/60 hover:text-white transition-colors"
            >
              Site Settings
            </Link>
          </div>

          {/* Center - Edit Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleEdit}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium transition-all ${
                isEditMode 
                  ? 'bg-[#C9A962] text-[#1A1A1A]' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {isEditMode ? (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  Exit Edit Mode
                </>
              ) : (
                <>
                  <Edit3 className="w-3.5 h-3.5" />
                  Edit Page
                </>
              )}
            </button>

            {isEditMode && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={handleSave}
                disabled={saving}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium transition-all ${
                  saved 
                    ? 'bg-green-500 text-white' 
                    : 'bg-white text-[#1A1A1A] hover:bg-white/90'
                }`}
              >
                {saving ? (
                  <div className="w-3.5 h-3.5 border-2 border-[#1A1A1A]/30 border-t-[#1A1A1A] rounded-full animate-spin" />
                ) : saved ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <Save className="w-3.5 h-3.5" />
                )}
                {saved ? 'Saved!' : saving ? 'Saving...' : 'Save Changes'}
              </motion.button>
            )}
          </div>

          {/* Right - User Menu */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 text-xs text-white/60 hover:text-white transition-colors"
              >
                <div className="w-6 h-6 bg-white/10 flex items-center justify-center">
                  <span className="text-[10px] font-medium">{user?.name?.charAt(0)}</span>
                </div>
                <span>{user?.name}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${showMenu ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-white text-[#1A1A1A] shadow-xl border border-[#EDE9E3]"
                  >
                    <Link 
                      href="/admin/dashboard" 
                      className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-[#F8F6F3] transition-colors"
                      onClick={() => setShowMenu(false)}
                    >
                      <Layout className="w-4 h-4 text-[#7D8471]" />
                      Dashboard
                    </Link>
                    <Link 
                      href="/admin/settings" 
                      className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-[#F8F6F3] transition-colors"
                      onClick={() => setShowMenu(false)}
                    >
                      <Settings className="w-4 h-4 text-[#7D8471]" />
                      Site Settings
                    </Link>
                    <div className="h-px bg-[#EDE9E3]" />
                    <button 
                      onClick={() => {
                        setShowMenu(false);
                        logout();
                      }}
                      className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-[#F8F6F3] transition-colors w-full text-left text-red-600"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Spacer to push content down */}
      <div className="h-10" />

      {/* Edit Mode Sidebar */}
      <AnimatePresence>
        {isEditMode && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-10 bottom-0 w-64 bg-white border-r border-[#EDE9E3] z-[90] shadow-xl overflow-y-auto"
          >
            <div className="p-4">
              <h3 className="text-xs tracking-[0.2em] uppercase text-[#7D8471] mb-4">Quick Edit</h3>
              
              <div className="space-y-2">
                <Link
                  href="/admin/settings"
                  className="flex items-center gap-3 p-3 bg-[#F8F6F3] hover:bg-[#EDE9E3] transition-colors group"
                >
                  <div className="w-8 h-8 bg-[#1A1A1A] flex items-center justify-center group-hover:bg-[#C9A962] transition-colors">
                    <Image className="w-4 h-4 text-white group-hover:text-[#1A1A1A]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1A1A1A]">Hero Images</p>
                    <p className="text-xs text-[#7D8471]">Edit slideshow</p>
                  </div>
                </Link>

                <Link
                  href="/admin/settings"
                  className="flex items-center gap-3 p-3 bg-[#F8F6F3] hover:bg-[#EDE9E3] transition-colors group"
                >
                  <div className="w-8 h-8 bg-[#1A1A1A] flex items-center justify-center group-hover:bg-[#C9A962] transition-colors">
                    <Upload className="w-4 h-4 text-white group-hover:text-[#1A1A1A]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1A1A1A]">Logo & Favicon</p>
                    <p className="text-xs text-[#7D8471]">Upload branding</p>
                  </div>
                </Link>

                <Link
                  href="/admin/settings"
                  className="flex items-center gap-3 p-3 bg-[#F8F6F3] hover:bg-[#EDE9E3] transition-colors group"
                >
                  <div className="w-8 h-8 bg-[#1A1A1A] flex items-center justify-center group-hover:bg-[#C9A962] transition-colors">
                    <Link2 className="w-4 h-4 text-white group-hover:text-[#1A1A1A]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1A1A1A]">Social Links</p>
                    <p className="text-xs text-[#7D8471]">Edit social media</p>
                  </div>
                </Link>

                <Link
                  href="/admin/settings"
                  className="flex items-center gap-3 p-3 bg-[#F8F6F3] hover:bg-[#EDE9E3] transition-colors group"
                >
                  <div className="w-8 h-8 bg-[#1A1A1A] flex items-center justify-center group-hover:bg-[#C9A962] transition-colors">
                    <Layout className="w-4 h-4 text-white group-hover:text-[#1A1A1A]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1A1A1A]">Page Sections</p>
                    <p className="text-xs text-[#7D8471]">Reorder & toggle</p>
                  </div>
                </Link>
              </div>

              <div className="mt-6 pt-6 border-t border-[#EDE9E3]">
                <h3 className="text-xs tracking-[0.2em] uppercase text-[#7D8471] mb-4">Help</h3>
                <p className="text-xs text-[#4A4A4A] leading-relaxed">
                  Click on any editable element on the page to modify it directly. 
                  Look for the <Edit3 className="w-3 h-3 inline text-[#C9A962]" /> icon.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content offset when sidebar is open */}
      {isEditMode && <div className="w-64 flex-shrink-0 hidden lg:block" />}
    </>
  );
}
