'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { User, Role } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hardcoded credentials for development
const VALID_USERS: Record<string, { password: string; user: User; redirect: string }> = {
  admin: {
    password: '123',
    user: {
      id: '1',
      username: 'admin',
      email: 'admin@razestates.com',
      name: 'Admin User',
      role: 'admin',
      createdAt: new Date().toISOString(),
    },
    redirect: '/admin/dashboard',
  },
  agent: {
    password: '123',
    user: {
      id: '2',
      username: 'agent',
      email: 'agent@razestates.com',
      name: 'Agent Smith',
      role: 'agent',
      bio: 'Experienced real estate agent with 10+ years in luxury properties.',
      listings: 6,
      soldProperties: 45,
      createdAt: new Date().toISOString(),
    },
    redirect: '/agent/dashboard',
  },
  user: {
    password: '123',
    user: {
      id: '3',
      username: 'user',
      email: 'user@razestates.com',
      name: 'John Doe',
      role: 'user',
      createdAt: new Date().toISOString(),
    },
    redirect: '/dashboard',
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const checkAuth = useCallback(() => {
    try {
      const storedUser = localStorage.getItem('raz_user');
      const storedRole = localStorage.getItem('raz_role');
      
      if (storedUser && storedRole) {
        const parsedUser = JSON.parse(storedUser);
        // Validate that the stored user matches our valid users
        const validUser = VALID_USERS[parsedUser.username];
        if (validUser && validUser.user.role === storedRole) {
          setUser(parsedUser);
        } else {
          // Invalid stored data, clear it
          localStorage.removeItem('raz_user');
          localStorage.removeItem('raz_role');
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('raz_user');
      localStorage.removeItem('raz_role');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (username: string, password: string): Promise<{ success: boolean; error?: string; redirect?: string }> => {
    setIsLoading(true);
    
    try {
      // Validate credentials
      const validUser = VALID_USERS[username.toLowerCase()];
      
      if (!validUser || validUser.password !== password) {
        setIsLoading(false);
        return { success: false, error: 'Invalid username or password' };
      }

      // Store user data in localStorage
      localStorage.setItem('raz_user', JSON.stringify(validUser.user));
      localStorage.setItem('raz_role', validUser.user.role);
      
      setUser(validUser.user);
      setIsLoading(false);
      
      // Redirect based on role
      router.push(validUser.redirect);
      
      return { success: true, redirect: validUser.redirect };
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('raz_user');
    localStorage.removeItem('raz_role');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// HOC for protected routes
export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  allowedRoles?: Role[]
) {
  return function ProtectedRoute(props: P) {
    const { user, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading) {
        if (!isAuthenticated) {
          router.push('/login');
        } else if (allowedRoles && user && !allowedRoles.includes(user.role)) {
          // Redirect to appropriate dashboard based on role
          const redirects: Record<Role, string> = {
            admin: '/admin/dashboard',
            agent: '/agent/dashboard',
            user: '/dashboard',
          };
          router.push(redirects[user.role]);
        }
      }
    }, [isAuthenticated, isLoading, user, router]);

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return null;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
