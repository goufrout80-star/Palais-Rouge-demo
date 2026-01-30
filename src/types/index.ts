export type Role = 'admin' | 'agent' | 'user';

export type ListingType = 'BUY' | 'RENT';

export type PropertyType = 'HOUSE' | 'APARTMENT' | 'VILLA' | 'LAND' | 'COMMERCIAL';

export type PropertyStatus = 'AVAILABLE' | 'PENDING' | 'SOLD' | 'RENTED';

export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  role: Role;
  phone?: string;
  avatar?: string;
  bio?: string;
  listings?: number;
  soldProperties?: number;
  createdAt: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  listingType: ListingType;
  propertyType: PropertyType;
  status: PropertyStatus;
  address: string;
  city: string;
  neighborhood?: string;
  zipCode?: string;
  latitude?: number;
  longitude?: number;
  bedrooms: number;
  bathrooms: number;
  surfaceArea: number;
  yearBuilt?: number;
  hasPool: boolean;
  hasParking: boolean;
  hasGarden: boolean;
  hasAC: boolean;
  hasGym: boolean;
  hasElevator: boolean;
  hasSecurity: boolean;
  images: string[];
  videoUrl?: string;
  virtualTour?: string;
  featured: boolean;
  approved: boolean;
  viewCount: number;
  agentId: string;
  agentName?: string;
  createdAt: string;
}

export interface SearchFilters {
  city?: string;
  listingType?: ListingType;
  propertyType?: PropertyType;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  amenities?: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface ApiResponse<T> {
  success?: boolean;
  error?: string;
  data?: T;
}
