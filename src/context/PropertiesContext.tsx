'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Property } from '@/types';
import initialPropertiesData from '@/data/properties.json';

interface PropertiesContextType {
  properties: Property[];
  isLoading: boolean;
  addProperty: (property: Omit<Property, 'id' | 'createdAt' | 'viewCount'>) => Property;
  updateProperty: (id: string, updates: Partial<Property>) => boolean;
  deleteProperty: (id: string) => boolean;
  getProperty: (id: string) => Property | undefined;
  getPropertiesByAgent: (agentId: string) => Property[];
  getFeaturedProperties: () => Property[];
  incrementViewCount: (id: string) => void;
}

const PropertiesContext = createContext<PropertiesContextType | undefined>(undefined);

const STORAGE_KEY = 'raz-estates-properties';

export function PropertiesProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load properties from localStorage or use initial data
  useEffect(() => {
    const loadProperties = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setProperties(parsed);
        } else {
          // Initialize with data from JSON file
          setProperties(initialPropertiesData.properties as Property[]);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(initialPropertiesData.properties));
        }
      } catch (error) {
        console.error('Error loading properties:', error);
        setProperties(initialPropertiesData.properties as Property[]);
      }
      setIsLoading(false);
    };

    loadProperties();
  }, []);

  // Save to localStorage whenever properties change
  useEffect(() => {
    if (!isLoading && properties.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
    }
  }, [properties, isLoading]);

  // Add a new property
  const addProperty = (propertyData: Omit<Property, 'id' | 'createdAt' | 'viewCount'>): Property => {
    const newProperty: Property = {
      ...propertyData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      viewCount: 0,
    };

    setProperties(prev => [newProperty, ...prev]);
    return newProperty;
  };

  // Update an existing property
  const updateProperty = (id: string, updates: Partial<Property>): boolean => {
    const index = properties.findIndex(p => p.id === id);
    if (index === -1) return false;

    setProperties(prev => prev.map(p => 
      p.id === id ? { ...p, ...updates } : p
    ));
    return true;
  };

  // Delete a property
  const deleteProperty = (id: string): boolean => {
    const index = properties.findIndex(p => p.id === id);
    if (index === -1) return false;

    setProperties(prev => prev.filter(p => p.id !== id));
    return true;
  };

  // Get a single property by ID
  const getProperty = (id: string): Property | undefined => {
    return properties.find(p => p.id === id);
  };

  // Get properties by agent ID
  const getPropertiesByAgent = (agentId: string): Property[] => {
    return properties.filter(p => p.agentId === agentId);
  };

  // Get featured properties
  const getFeaturedProperties = (): Property[] => {
    return properties.filter(p => p.featured && p.approved);
  };

  // Increment view count
  const incrementViewCount = (id: string): void => {
    setProperties(prev => prev.map(p => 
      p.id === id ? { ...p, viewCount: (p.viewCount || 0) + 1 } : p
    ));
  };

  return (
    <PropertiesContext.Provider
      value={{
        properties,
        isLoading,
        addProperty,
        updateProperty,
        deleteProperty,
        getProperty,
        getPropertiesByAgent,
        getFeaturedProperties,
        incrementViewCount,
      }}
    >
      {children}
    </PropertiesContext.Provider>
  );
}

export function useProperties() {
  const context = useContext(PropertiesContext);
  if (context === undefined) {
    throw new Error('useProperties must be used within a PropertiesProvider');
  }
  return context;
}

// Export a function to reset properties to initial data (for admin use)
export function resetPropertiesToDefault() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialPropertiesData.properties));
  window.location.reload();
}
