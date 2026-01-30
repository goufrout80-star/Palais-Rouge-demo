'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Settings, Check, Shield } from 'lucide-react';
import { useSiteConfig } from '@/context/SiteConfigContext';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export function CookieConsent() {
  const { config } = useSiteConfig();
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: true,
    marketing: false,
    preferences: true,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem('cookie-consent');
    if (!cookieChoice && config.cookieConsent.enabled) {
      // Show after a short delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [config.cookieConsent.enabled]);

  const handleAcceptAll = () => {
    setPreferences({
      essential: true,
      analytics: true,
      marketing: true,
      preferences: true,
    });
    localStorage.setItem('cookie-consent', JSON.stringify({
      accepted: true,
      preferences: { essential: true, analytics: true, marketing: true, preferences: true },
      timestamp: new Date().toISOString(),
    }));
    setIsVisible(false);
  };

  const handleDecline = () => {
    setPreferences({
      essential: true,
      analytics: false,
      marketing: false,
      preferences: false,
    });
    localStorage.setItem('cookie-consent', JSON.stringify({
      accepted: false,
      preferences: { essential: true, analytics: false, marketing: false, preferences: false },
      timestamp: new Date().toISOString(),
    }));
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      accepted: true,
      preferences,
      timestamp: new Date().toISOString(),
    }));
    setIsVisible(false);
    setShowSettings(false);
  };

  if (!config.cookieConsent.enabled) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-[500]"
            onClick={() => !showSettings && setIsVisible(false)}
          />

          {/* Main Popup */}
          {!showSettings ? (
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-[440px] z-[501]"
            >
              <div className="bg-white shadow-2xl border border-[#EDE9E3]">
                {/* Header */}
                <div className="relative px-6 pt-6 pb-4">
                  <button
                    onClick={handleDecline}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-[#9A9A9A] hover:text-[#1A1A1A] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#C9A962]/10 flex items-center justify-center flex-shrink-0">
                      <Cookie className="w-6 h-6 text-[#C9A962]" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl text-[#1A1A1A] mb-1">
                        {config.cookieConsent.title}
                      </h3>
                      <p className="text-sm text-[#4A4A4A] leading-relaxed">
                        {config.cookieConsent.message}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Link to Cookie Policy */}
                <div className="px-6 pb-4">
                  <Link 
                    href="/cookies" 
                    className="text-sm text-[#C9A962] hover:underline"
                  >
                    Learn more about our Cookie Policy →
                  </Link>
                </div>

                {/* Actions */}
                <div className="px-6 pb-6 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAcceptAll}
                    className="flex-1 py-3.5 bg-[#1A1A1A] text-white text-sm font-medium hover:bg-[#2D2D2D] transition-colors flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    {config.cookieConsent.acceptText}
                  </button>
                  <button
                    onClick={() => setShowSettings(true)}
                    className="flex-1 py-3.5 border border-[#EDE9E3] text-[#1A1A1A] text-sm font-medium hover:border-[#1A1A1A] transition-colors flex items-center justify-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    Customize
                  </button>
                </div>

                {/* Powered by */}
                <div className="px-6 py-3 bg-[#F8F6F3] border-t border-[#EDE9E3]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-[#7D8471]">
                      <Shield className="w-3 h-3" />
                      <span>Your privacy matters to us</span>
                    </div>
                    <button
                      onClick={handleDecline}
                      className="text-xs text-[#7D8471] hover:text-[#1A1A1A] transition-colors"
                    >
                      {config.cookieConsent.declineText}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Settings Panel */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[500px] md:max-h-[80vh] z-[501] overflow-auto"
            >
              <div className="bg-white shadow-2xl border border-[#EDE9E3]">
                {/* Header */}
                <div className="px-6 py-5 border-b border-[#EDE9E3] flex items-center justify-between sticky top-0 bg-white z-10">
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-[#C9A962]" />
                    <h3 className="font-display text-lg text-[#1A1A1A]">Cookie Settings</h3>
                  </div>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="w-8 h-8 flex items-center justify-center text-[#9A9A9A] hover:text-[#1A1A1A] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Cookie Options */}
                <div className="p-6 space-y-4">
                  {/* Essential */}
                  <div className="p-4 bg-[#F8F6F3] border border-[#EDE9E3]">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-[#1A1A1A]">Essential Cookies</h4>
                          <span className="text-[10px] uppercase tracking-wide bg-[#7D8471] text-white px-2 py-0.5">Required</span>
                        </div>
                        <p className="text-sm text-[#4A4A4A]">
                          Necessary for the website to function properly. Cannot be disabled.
                        </p>
                      </div>
                      <div className="w-12 h-6 bg-[#7D8471] rounded-full relative opacity-50 cursor-not-allowed">
                        <span className="absolute top-1 left-7 w-4 h-4 bg-white rounded-full" />
                      </div>
                    </div>
                  </div>

                  {/* Analytics */}
                  <div className="p-4 bg-white border border-[#EDE9E3]">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-medium text-[#1A1A1A] mb-1">Analytics Cookies</h4>
                        <p className="text-sm text-[#4A4A4A]">
                          Help us understand how visitors interact with our website.
                        </p>
                      </div>
                      <button
                        onClick={() => setPreferences({...preferences, analytics: !preferences.analytics})}
                        className={`w-12 h-6 rounded-full relative transition-colors ${
                          preferences.analytics ? 'bg-[#7D8471]' : 'bg-[#EDE9E3]'
                        }`}
                      >
                        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          preferences.analytics ? 'left-7' : 'left-1'
                        }`} />
                      </button>
                    </div>
                  </div>

                  {/* Marketing */}
                  <div className="p-4 bg-white border border-[#EDE9E3]">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-medium text-[#1A1A1A] mb-1">Marketing Cookies</h4>
                        <p className="text-sm text-[#4A4A4A]">
                          Used to deliver personalized advertisements.
                        </p>
                      </div>
                      <button
                        onClick={() => setPreferences({...preferences, marketing: !preferences.marketing})}
                        className={`w-12 h-6 rounded-full relative transition-colors ${
                          preferences.marketing ? 'bg-[#7D8471]' : 'bg-[#EDE9E3]'
                        }`}
                      >
                        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          preferences.marketing ? 'left-7' : 'left-1'
                        }`} />
                      </button>
                    </div>
                  </div>

                  {/* Preferences */}
                  <div className="p-4 bg-white border border-[#EDE9E3]">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-medium text-[#1A1A1A] mb-1">Preference Cookies</h4>
                        <p className="text-sm text-[#4A4A4A]">
                          Remember your settings and preferences for future visits.
                        </p>
                      </div>
                      <button
                        onClick={() => setPreferences({...preferences, preferences: !preferences.preferences})}
                        className={`w-12 h-6 rounded-full relative transition-colors ${
                          preferences.preferences ? 'bg-[#7D8471]' : 'bg-[#EDE9E3]'
                        }`}
                      >
                        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          preferences.preferences ? 'left-7' : 'left-1'
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-[#EDE9E3] bg-[#F8F6F3] flex gap-3 sticky bottom-0">
                  <button
                    onClick={() => setShowSettings(false)}
                    className="flex-1 py-3 border border-[#EDE9E3] bg-white text-[#1A1A1A] text-sm font-medium hover:border-[#1A1A1A] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSavePreferences}
                    className="flex-1 py-3 bg-[#1A1A1A] text-white text-sm font-medium hover:bg-[#2D2D2D] transition-colors flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Save Preferences
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}
