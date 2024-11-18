interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface RecyclingCenter {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  coordinates: Coordinates;
  region: 'Northern California' | 'Southern California';
  materials: string[];
  hours: string;
  specialInstructions?: string;
  certifications: string[];
  website?: string;
}

export const CALIFORNIA_CENTERS: RecyclingCenter[] = [
  // Northern California
  {
    id: 'sf-001',
    name: 'San Francisco Recology Center',
    address: '501 Tunnel Ave',
    city: 'San Francisco',
    state: 'CA',
    zip: '94134',
    phone: '(415) 330-1400',
    coordinates: {
      latitude: 37.7123,
      longitude: -122.4012
    },
    region: 'Northern California',
    materials: [
      'Plastic (Types 1-7)',
      'Paper',
      'Cardboard',
      'Glass',
      'Metal',
      'Electronics',
      'Batteries',
      'Hazardous Waste'
    ],
    hours: 'Mon-Sat: 6AM-4:30PM, Sun: Closed',
    specialInstructions: 'Hazardous waste requires appointment. Proof of residency required.',
    certifications: ['CalRecycle Certified', 'E-Waste Certified', 'ISO 14001'],
    website: 'https://www.recology.com/recology-san-francisco'
  },
  {
    id: 'oak-001',
    name: 'Oakland Zero Waste Center',
    address: '2615 Davis Street',
    city: 'Oakland',
    state: 'CA',
    zip: '94601',
    phone: '(510) 613-8710',
    coordinates: {
      latitude: 37.7831,
      longitude: -122.2854
    },
    region: 'Northern California',
    materials: [
      'Mixed Recyclables',
      'Green Waste',
      'Construction Debris',
      'Electronics',
      'Appliances',
      'Mattresses'
    ],
    hours: 'Mon-Fri: 7AM-5PM, Sat-Sun: 8AM-4PM',
    specialInstructions: 'Large items may incur additional fees. No liquid waste accepted.',
    certifications: ['CalRecycle Certified', 'Bay Area Green Business'],
    website: 'https://www.oaklandrecycles.com'
  },
  {
    id: 'sj-001',
    name: 'San Jose Environmental Innovation Center',
    address: '1608 Las Plumas Avenue',
    city: 'San Jose',
    state: 'CA',
    zip: '95133',
    phone: '(408) 535-8550',
    coordinates: {
      latitude: 37.3657,
      longitude: -121.8590
    },
    region: 'Northern California',
    materials: [
      'Electronics',
      'Batteries',
      'Fluorescent Lights',
      'Paint',
      'Motor Oil',
      'Household Chemicals'
    ],
    hours: 'Tue-Sat: 9AM-4PM',
    specialInstructions: 'Household hazardous waste by appointment only',
    certifications: ['HHW Facility Permit', 'CalRecycle Certified'],
    website: 'https://www.sanjoseca.gov/recycling'
  },

  // Southern California
  {
    id: 'la-001',
    name: 'LA Central Recycling Center',
    address: '2201 E. Washington Blvd',
    city: 'Los Angeles',
    state: 'CA',
    zip: '90021',
    phone: '(323) 583-1013',
    coordinates: {
      latitude: 34.0205,
      longitude: -118.2437
    },
    region: 'Southern California',
    materials: [
      'Mixed Recyclables',
      'Scrap Metal',
      'Paper',
      'Cardboard',
      'Glass',
      'Plastic',
      'Electronics'
    ],
    hours: 'Mon-Sat: 8AM-5PM',
    specialInstructions: 'CRV buyback available. Commercial accounts welcome.',
    certifications: ['CalRecycle Certified', 'CRV Certified'],
    website: 'https://www.larecyclingcenter.com'
  },
  {
    id: 'sd-001',
    name: 'Miramar Recycling Center',
    address: '5165 Convoy Street',
    city: 'San Diego',
    state: 'CA',
    zip: '92111',
    phone: '(858) 268-8971',
    coordinates: {
      latitude: 32.8328,
      longitude: -117.1539
    },
    region: 'Southern California',
    materials: [
      'Household Recyclables',
      'Green Waste',
      'Construction Materials',
      'Hazardous Waste',
      'Electronics',
      'Tires'
    ],
    hours: 'Mon-Sat: 7AM-4:30PM, Sun: 7AM-4PM',
    specialInstructions: 'Vehicle load restrictions apply. No commercial hazardous waste.',
    certifications: ['CalRecycle Certified', 'Environmental Excellence Award'],
    website: 'https://www.sandiego.gov/environmental-services'
  },
  {
    id: 'ana-001',
    name: 'Anaheim Recycling Complex',
    address: '1131 N. Blue Gum Street',
    city: 'Anaheim',
    state: 'CA',
    zip: '92806',
    phone: '(714) 238-2444',
    coordinates: {
      latitude: 33.8474,
      longitude: -117.8944
    },
    region: 'Southern California',
    materials: [
      'Residential Recyclables',
      'Commercial Waste',
      'Green Waste',
      'Construction Debris',
      'Electronics',
      'Universal Waste'
    ],
    hours: 'Mon-Fri: 6AM-5PM, Sat: 6AM-3PM',
    specialInstructions: 'Source-separated materials preferred. Bulk pricing available.',
    certifications: ['LEED Certified Facility', 'CalRecycle Certified'],
    website: 'https://www.anaheim.net/recycling'
  }
];