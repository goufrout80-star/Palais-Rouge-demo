import { Router, Request, Response } from 'express';

const router = Router();

// Mock property data for development
const PROPERTIES = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    description: 'Stunning 2-bedroom apartment in the heart of downtown with panoramic city views. Features modern finishes, open floor plan, and premium amenities.',
    price: 450000,
    listingType: 'BUY',
    propertyType: 'APARTMENT',
    status: 'AVAILABLE',
    address: '123 Main Street, Unit 15A',
    city: 'New York',
    neighborhood: 'Manhattan',
    zipCode: '10001',
    latitude: 40.7128,
    longitude: -74.006,
    bedrooms: 2,
    bathrooms: 2,
    surfaceArea: 1200,
    yearBuilt: 2020,
    hasPool: false,
    hasParking: true,
    hasGarden: false,
    hasAC: true,
    hasGym: true,
    hasElevator: true,
    hasSecurity: true,
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
    ],
    videoUrl: null,
    virtualTour: null,
    featured: true,
    approved: true,
    viewCount: 245,
    agentId: '2',
    agentName: 'Agent Smith',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Luxury Beach Villa',
    description: 'Exquisite 5-bedroom villa with private beach access. Features infinity pool, landscaped gardens, and breathtaking ocean views from every room.',
    price: 2500000,
    listingType: 'BUY',
    propertyType: 'VILLA',
    status: 'AVAILABLE',
    address: '456 Ocean Drive',
    city: 'Miami',
    neighborhood: 'South Beach',
    zipCode: '33139',
    latitude: 25.7617,
    longitude: -80.1918,
    bedrooms: 5,
    bathrooms: 4,
    surfaceArea: 4500,
    yearBuilt: 2018,
    hasPool: true,
    hasParking: true,
    hasGarden: true,
    hasAC: true,
    hasGym: true,
    hasElevator: false,
    hasSecurity: true,
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
    ],
    videoUrl: null,
    virtualTour: null,
    featured: true,
    approved: true,
    viewCount: 532,
    agentId: '2',
    agentName: 'Agent Smith',
    createdAt: '2024-01-10T10:00:00Z'
  },
  {
    id: '3',
    title: 'Cozy Suburban Family Home',
    description: 'Charming 4-bedroom family home in a quiet suburban neighborhood. Features spacious backyard, updated kitchen, and excellent school district.',
    price: 650000,
    listingType: 'BUY',
    propertyType: 'HOUSE',
    status: 'AVAILABLE',
    address: '789 Oak Lane',
    city: 'Austin',
    neighborhood: 'Westlake',
    zipCode: '78746',
    latitude: 30.2672,
    longitude: -97.7431,
    bedrooms: 4,
    bathrooms: 3,
    surfaceArea: 2800,
    yearBuilt: 2015,
    hasPool: false,
    hasParking: true,
    hasGarden: true,
    hasAC: true,
    hasGym: false,
    hasElevator: false,
    hasSecurity: false,
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800'
    ],
    videoUrl: null,
    virtualTour: null,
    featured: true,
    approved: true,
    viewCount: 189,
    agentId: '2',
    agentName: 'Agent Smith',
    createdAt: '2024-01-08T10:00:00Z'
  },
  {
    id: '4',
    title: 'Modern Loft for Rent',
    description: 'Stylish industrial loft in converted warehouse. High ceilings, exposed brick, floor-to-ceiling windows, and rooftop access.',
    price: 3500,
    listingType: 'RENT',
    propertyType: 'APARTMENT',
    status: 'AVAILABLE',
    address: '321 Industrial Blvd, Loft 4B',
    city: 'Los Angeles',
    neighborhood: 'Arts District',
    zipCode: '90013',
    latitude: 34.0407,
    longitude: -118.2351,
    bedrooms: 1,
    bathrooms: 1,
    surfaceArea: 950,
    yearBuilt: 2019,
    hasPool: false,
    hasParking: true,
    hasGarden: false,
    hasAC: true,
    hasGym: true,
    hasElevator: true,
    hasSecurity: true,
    images: [
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800',
      'https://images.unsplash.com/photo-1560185008-b033106af5c3?w=800'
    ],
    videoUrl: null,
    virtualTour: null,
    featured: false,
    approved: true,
    viewCount: 312,
    agentId: '2',
    agentName: 'Agent Smith',
    createdAt: '2024-01-05T10:00:00Z'
  },
  {
    id: '5',
    title: 'Commercial Office Space',
    description: 'Prime commercial office space in business district. Open layout, conference rooms, kitchenette, and ample parking.',
    price: 8500,
    listingType: 'RENT',
    propertyType: 'COMMERCIAL',
    status: 'AVAILABLE',
    address: '555 Business Center',
    city: 'Chicago',
    neighborhood: 'Loop',
    zipCode: '60601',
    latitude: 41.8781,
    longitude: -87.6298,
    bedrooms: 0,
    bathrooms: 2,
    surfaceArea: 3200,
    yearBuilt: 2021,
    hasPool: false,
    hasParking: true,
    hasGarden: false,
    hasAC: true,
    hasGym: false,
    hasElevator: true,
    hasSecurity: true,
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800'
    ],
    videoUrl: null,
    virtualTour: null,
    featured: false,
    approved: true,
    viewCount: 156,
    agentId: '2',
    agentName: 'Agent Smith',
    createdAt: '2024-01-03T10:00:00Z'
  },
  {
    id: '6',
    title: 'Development Land Plot',
    description: 'Prime development land with approved permits for residential construction. Utilities available, flat terrain, excellent location.',
    price: 850000,
    listingType: 'BUY',
    propertyType: 'LAND',
    status: 'AVAILABLE',
    address: '999 Development Road',
    city: 'Phoenix',
    neighborhood: 'Scottsdale',
    zipCode: '85251',
    latitude: 33.4942,
    longitude: -111.9261,
    bedrooms: 0,
    bathrooms: 0,
    surfaceArea: 15000,
    yearBuilt: 0,
    hasPool: false,
    hasParking: false,
    hasGarden: false,
    hasAC: false,
    hasGym: false,
    hasElevator: false,
    hasSecurity: false,
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
      'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=800'
    ],
    videoUrl: null,
    virtualTour: null,
    featured: false,
    approved: true,
    viewCount: 89,
    agentId: '2',
    agentName: 'Agent Smith',
    createdAt: '2024-01-01T10:00:00Z'
  }
];

// Get all properties with optional filters
router.get('/', (req: Request, res: Response) => {
  let filtered = [...PROPERTIES];
  
  const { 
    city, 
    listingType, 
    propertyType, 
    minPrice, 
    maxPrice,
    bedrooms,
    bathrooms,
    featured,
    status
  } = req.query;

  if (city) {
    filtered = filtered.filter(p => p.city.toLowerCase().includes((city as string).toLowerCase()));
  }
  if (listingType) {
    filtered = filtered.filter(p => p.listingType === listingType);
  }
  if (propertyType) {
    filtered = filtered.filter(p => p.propertyType === propertyType);
  }
  if (minPrice) {
    filtered = filtered.filter(p => p.price >= Number(minPrice));
  }
  if (maxPrice) {
    filtered = filtered.filter(p => p.price <= Number(maxPrice));
  }
  if (bedrooms) {
    filtered = filtered.filter(p => p.bedrooms >= Number(bedrooms));
  }
  if (bathrooms) {
    filtered = filtered.filter(p => p.bathrooms >= Number(bathrooms));
  }
  if (featured === 'true') {
    filtered = filtered.filter(p => p.featured);
  }
  if (status) {
    filtered = filtered.filter(p => p.status === status);
  }

  return res.json({ properties: filtered, total: filtered.length });
});

// Get featured properties
router.get('/featured', (_req: Request, res: Response) => {
  const featured = PROPERTIES.filter(p => p.featured && p.approved);
  return res.json({ properties: featured });
});

// Get single property
router.get('/:id', (req: Request, res: Response) => {
  const property = PROPERTIES.find(p => p.id === req.params.id);
  
  if (!property) {
    return res.status(404).json({ error: 'Property not found' });
  }

  // Get similar properties
  const similar = PROPERTIES.filter(p => 
    p.id !== property.id && 
    (p.city === property.city || p.propertyType === property.propertyType)
  ).slice(0, 3);

  return res.json({ property, similar });
});

// Create property (agent only)
router.post('/', (req: Request, res: Response) => {
  const newProperty = {
    id: String(PROPERTIES.length + 1),
    ...req.body,
    approved: false,
    viewCount: 0,
    createdAt: new Date().toISOString()
  };
  
  PROPERTIES.push(newProperty);
  return res.status(201).json({ property: newProperty });
});

// Update property
router.put('/:id', (req: Request, res: Response) => {
  const index = PROPERTIES.findIndex(p => p.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Property not found' });
  }

  PROPERTIES[index] = { ...PROPERTIES[index], ...req.body };
  return res.json({ property: PROPERTIES[index] });
});

// Delete property
router.delete('/:id', (req: Request, res: Response) => {
  const index = PROPERTIES.findIndex(p => p.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Property not found' });
  }

  PROPERTIES.splice(index, 1);
  return res.json({ success: true });
});

export default router;
