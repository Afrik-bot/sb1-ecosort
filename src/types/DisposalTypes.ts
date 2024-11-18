export interface Facility {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  hours: string;
  type: 'recycling' | 'hazardous' | 'electronic' | 'composting';
  region: 'northern' | 'southern';
  acceptedMaterials: string[];
  notes?: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  website?: string;
  certifications?: string[];
}