'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Home, Search, Heart, User, LogOut, Building2, LayoutDashboard,
  ChevronDown, Key, TrendingUp, Calculator, FileText, Phone,
  HelpCircle, BookOpen, Users, Briefcase, MapPin, DollarSign, BadgeCheck
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useI18n } from '@/context/I18nContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { LanguageCurrencySwitcher } from '@/components/ui/LanguageCurrencySwitcher';

interface DropdownItem {
  icon: React.ElementType;
  label: string;
  description: string;
  href: string;
}

interface NavDropdown {
  label: string;
  items: DropdownItem[];
}

const buyItems: DropdownItem[] = [
  { icon: Home, label: 'Browse Homes', description: 'Explore all properties for sale', href: '/properties?type=BUY' },
  { icon: MapPin, label: 'By Location', description: 'Search by city or neighborhood', href: '/search?type=BUY' },
  { icon: Building2, label: 'New Developments', description: 'Latest luxury developments', href: '/properties?type=BUY&new=true' },
  { icon: Calculator, label: 'Mortgage Calculator', description: 'Estimate your payments', href: '/calculator' },
];

const rentItems: DropdownItem[] = [
  { icon: Key, label: 'Browse Rentals', description: 'Explore all rentals', href: '/properties?type=RENT' },
  { icon: MapPin, label: 'By Location', description: 'Search rentals by area', href: '/search?type=RENT' },
  { icon: BadgeCheck, label: 'Verified Listings', description: 'Pre-verified properties', href: '/properties?type=RENT&verified=true' },
  { icon: FileText, label: 'Rental Guide', description: 'Tips for renters', href: '/guide/renting' },
];

const sellItems: DropdownItem[] = [
  { icon: TrendingUp, label: 'Sell Your Home', description: 'List with top agents', href: '/sell' },
  { icon: Calculator, label: 'Home Valuation', description: 'Get your home\'s value', href: '/valuation' },
  { icon: Users, label: 'Find an Agent', description: 'Connect with experts', href: '/agents' },
  { icon: DollarSign, label: 'Selling Guide', description: 'Tips to maximize value', href: '/guide/selling' },
];

const helpItems: DropdownItem[] = [
  { icon: Phone, label: 'Contact Us', description: 'Get in touch with our team', href: '/contact' },
  { icon: HelpCircle, label: 'FAQ', description: 'Common questions answered', href: '/faq' },
  { icon: BookOpen, label: 'Resources', description: 'Guides and articles', href: '/resources' },
];

function NavDropdownMenu({ label, items, isActive }: { label: string; items: DropdownItem[]; isActive?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={cn(
          'flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors',
          isOpen || isActive ? 'text-[#8B1538]' : 'text-[#3D3936] hover:text-[#8B1538]'
        )}
      >
        {label}
        <ChevronDown className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 w-72 bg-white border border-[#E8E4DC] shadow-xl mt-1"
          >
            <div className="p-2">
              {items.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="flex items-start gap-3 p-3 hover:bg-[#FAF9F7] transition-colors group"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-10 h-10 bg-[#F5F3EF] flex items-center justify-center flex-shrink-0 group-hover:bg-[#8B1538]/10">
                    <item.icon className="w-5 h-5 text-[#8B1538]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#1A1818] text-sm">{item.label}</p>
                    <p className="text-xs text-[#8A8178] mt-0.5">{item.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const { user, isAuthenticated, logout } = useAuth();
  const { t } = useI18n();
  const pathname = usePathname();

  const getDashboardLink = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'admin':
        return '/admin/dashboard';
      case 'agent':
        return '/agent/dashboard';
      default:
        return '/dashboard';
    }
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF9F7]/95 backdrop-blur-md border-b border-[#E8E4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#8B1538] flex items-center justify-center">
              <span className="text-white font-display font-bold text-lg">PR</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-display font-semibold text-[#1A1818] leading-tight">Palais Rouge</span>
              <span className="text-[10px] tracking-[0.2em] text-[#8A8178] uppercase">Immobilier</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <NavDropdownMenu label={t('common.buy')} items={buyItems} />
            <NavDropdownMenu label={t('common.rent')} items={rentItems} />
            <NavDropdownMenu label={t('common.sell')} items={sellItems} />
            <Link
              href="/properties"
              className={cn(
                'px-4 py-2 text-sm font-medium transition-colors',
                isActive('/properties') ? 'text-[#8B1538]' : 'text-[#3D3936] hover:text-[#8B1538]'
              )}
            >
              {t('common.all_properties')}
            </Link>
            <NavDropdownMenu label={t('common.help')} items={helpItems} />
            <LanguageCurrencySwitcher />
          </div>

          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                <Link
                  href={getDashboardLink()}
                  className={cn(
                    'flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-colors',
                    pathname.includes('dashboard')
                      ? 'text-[#8B1538]'
                      : 'text-[#3D3936] hover:text-[#8B1538]'
                  )}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                <div className="flex items-center space-x-2 px-3 py-1.5 bg-[#F5F3EF] border border-[#E8E4DC]">
                  <div className="w-7 h-7 bg-[#8B1538] flex items-center justify-center">
                    <span className="text-white text-xs font-medium">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-[#1A1818]">{user?.name}</span>
                  <span className="text-xs px-2 py-0.5 bg-[#8B1538]/10 text-[#8B1538] capitalize">
                    {user?.role}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-[#3D3936] hover:text-[#8B1538] hover:bg-[#8B1538]/5 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-[#3D3936] hover:text-[#8B1538]">
                    Sign In
                  </Button>
                </Link>
                <Link href="/login">
                  <button className="px-5 py-2.5 bg-[#8B1538] text-white text-sm font-medium hover:bg-[#6B0F2B] transition-colors">
                    Get Started
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageCurrencySwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-[#3D3936] hover:bg-[#F5F3EF]"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#FAF9F7] border-t border-[#E8E4DC] max-h-[80vh] overflow-y-auto">
            <div className="px-4 py-4 space-y-1">
              {/* Mobile Dropdowns */}
              {[
                { label: 'Buy', items: buyItems, key: 'buy' },
                { label: 'Rent', items: rentItems, key: 'rent' },
                { label: 'Sell', items: sellItems, key: 'sell' },
                { label: 'Help', items: helpItems, key: 'help' },
              ].map((dropdown) => (
                <div key={dropdown.key}>
                  <button
                    onClick={() => setMobileDropdown(mobileDropdown === dropdown.key ? null : dropdown.key)}
                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-[#3D3936] hover:bg-[#F5F3EF]"
                  >
                    <span>{dropdown.label}</span>
                    <ChevronDown className={cn('w-4 h-4 transition-transform', mobileDropdown === dropdown.key && 'rotate-180')} />
                  </button>
                  <AnimatePresence>
                    {mobileDropdown === dropdown.key && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-[#F5F3EF]"
                      >
                        {dropdown.items.map((item, idx) => (
                          <Link
                            key={idx}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-6 py-3 hover:bg-[#E8E4DC] transition-colors"
                          >
                            <item.icon className="w-4 h-4 text-[#8B1538]" />
                            <div>
                              <p className="text-sm font-medium text-[#1A1818]">{item.label}</p>
                              <p className="text-xs text-[#8A8178]">{item.description}</p>
                            </div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              <Link
                href="/properties"
                onClick={() => setIsOpen(false)}
                className={cn(
                  'flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors',
                  isActive('/properties')
                    ? 'bg-[#8B1538]/5 text-[#8B1538]'
                    : 'text-[#3D3936] hover:bg-[#F5F3EF]'
                )}
              >
                <Building2 className="w-5 h-5" />
                <span>All Properties</span>
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link
                    href={getDashboardLink()}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-[#3D3936] hover:bg-[#F5F3EF]"
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    <span>Dashboard</span>
                  </Link>
                  <div className="pt-2 border-t border-[#E8E4DC]">
                    <div className="flex items-center justify-between px-4 py-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-[#8B1538] flex items-center justify-center">
                          <span className="text-white font-medium">
                            {user?.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-[#1A1818]">{user?.name}</p>
                          <p className="text-sm text-[#8A8178] capitalize">{user?.role}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setIsOpen(false);
                        }}
                        className="p-2 text-[#8B1538] hover:bg-[#8B1538]/5"
                      >
                        <LogOut className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="pt-2 border-t border-[#E8E4DC] space-y-2">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <button className="w-full px-4 py-3 border border-[#E8E4DC] text-[#1A1818] font-medium hover:bg-[#F5F3EF] transition-colors">
                      Sign In
                    </button>
                  </Link>
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <button className="w-full px-4 py-3 bg-[#8B1538] text-white font-medium hover:bg-[#6B0F2B] transition-colors">
                      Get Started
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
