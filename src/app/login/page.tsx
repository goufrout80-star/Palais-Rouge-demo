'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, EyeOff, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/layout/Navbar';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && user) {
      const redirects: Record<string, string> = {
        admin: '/admin/dashboard',
        agent: '/agent/dashboard',
        user: '/dashboard',
      };
      router.push(redirects[user.role] || '/dashboard');
    }
  }, [isAuthenticated, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      setIsLoading(false);
      return;
    }

    const result = await login(username.trim(), password);
    
    if (!result.success) {
      setError(result.error || 'Login failed');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#FDFCFA]">
      <Navbar />
      <div className="flex pt-20">
        {/* Left side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#1A1A1A] p-12 flex-col justify-between relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#8B1538]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#7D8471]/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <Link href="/" className="inline-block">
              <span className="font-display text-2xl text-white tracking-tight">
                Palais<span className="text-[#8B1538]">.</span>Rouge
              </span>
            </Link>
          </div>

          <div className="relative z-10 space-y-8">
            <div>
              <span className="text-[#8B1538] text-xs tracking-[0.3em] uppercase mb-4 block">
                Welcome Back
              </span>
              <h1 className="font-display text-4xl lg:text-5xl text-white leading-[1.1]">
                Find Your Perfect<br />
                <span className="italic text-white/70">Place to Call Home</span>
              </h1>
            </div>
            <p className="text-white/50 text-lg max-w-md leading-relaxed">
              Discover thousands of curated properties for sale and rent. Your dream home is just a few clicks away.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div>
                <div className="font-display text-3xl text-white">500+</div>
                <div className="text-white/40 text-sm mt-1">Properties</div>
              </div>
              <div>
                <div className="font-display text-3xl text-white">50+</div>
                <div className="text-white/40 text-sm mt-1">Expert Agents</div>
              </div>
              <div>
                <div className="font-display text-3xl text-white">1000+</div>
                <div className="text-white/40 text-sm mt-1">Happy Clients</div>
              </div>
            </div>
          </div>

          <div className="relative z-10 text-white/30 text-sm">
            &copy; {new Date().getFullYear()} Palais Rouge Immobilier. All rights reserved.
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            {/* Mobile Logo */}
            <div className="lg:hidden mb-12">
              <Link href="/" className="inline-block">
                <span className="font-display text-2xl text-[#1A1A1A] tracking-tight">
                  Palais<span className="text-[#8B1538]">.</span>Rouge
                </span>
              </Link>
            </div>

            <div>
              <span className="text-[#7D8471] text-xs tracking-[0.3em] uppercase mb-4 block">
                Sign In
              </span>
              <h2 className="font-display text-3xl text-[#1A1A1A] mb-2">Welcome Back</h2>
              <p className="text-[#4A4A4A] mb-8">Enter your credentials to access your account</p>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-100 flex items-center gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <span className="text-sm text-red-700">{error}</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs tracking-wide uppercase text-[#4A4A4A] mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                    className="w-full px-4 py-3 bg-white border border-[#EDE9E3] text-[#1A1A1A] placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs tracking-wide uppercase text-[#4A4A4A] mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      className="w-full px-4 py-3 bg-white border border-[#EDE9E3] text-[#1A1A1A] placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#1A1A1A] transition-colors pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9A9A9A] hover:text-[#1A1A1A] transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-[#1A1A1A] text-white font-medium flex items-center justify-center gap-3 hover:bg-[#2D2D2D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {/* Demo credentials */}
              <div className="mt-10 p-5 bg-[#F8F6F3] border border-[#EDE9E3]">
                <p className="text-xs tracking-wide uppercase text-[#7D8471] mb-4">Demo Credentials</p>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-[#4A4A4A]">Admin:</span>
                    <code className="px-3 py-1 bg-white border border-[#EDE9E3] text-xs text-[#1A1A1A]">admin / 123</code>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#4A4A4A]">Agent:</span>
                    <code className="px-3 py-1 bg-white border border-[#EDE9E3] text-xs text-[#1A1A1A]">agent / 123</code>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#4A4A4A]">User:</span>
                    <code className="px-3 py-1 bg-white border border-[#EDE9E3] text-xs text-[#1A1A1A]">user / 123</code>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center">
              <Link 
                href="/" 
                className="text-[#7D8471] hover:text-[#1A1A1A] transition-colors text-sm flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}