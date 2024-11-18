import { collection, getDocs, addDoc } from 'firebase/firestore';
import { Facility } from '../types/DisposalTypes';

export const CALIFORNIA_FACILITIES: Facility[] = [
  {
    id: 'sf-recology',
    name: 'Recology San Francisco Transfer Station',
    address: '501 Tunnel Ave',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94134',
    phone: '(415) 330-1400',
    type: 'recycling',
    region: 'northern',
    hours: 'Mon-Fri: 6AM-6PM, Sat-Sun: 8AM-4PM',
    acceptedMaterials: [
      'Paper',
      'Cardboard',
      'Glass',
      'Metal',
      'Plastic',
      'Electronics',
      'Yard Waste'
    ],
    coordinates: {
      latitude: 37.7123,
      longitude: -122.4012
    },
    website: 'https://www.recology.com/recology-san-francisco',
    notes: 'Residential and commercial recycling services. Proof of residency required for certain services.',
    certifications: ['CalRecycle Certified', 'Green Business Certified']
  },
  // ... rest of the facilities data remains the same
];

export async function initializeFacilitiesData(db: any) {
  try {
    const facilitiesRef = collection(db, 'facilities');
    
    // Check if data already exists
    const snapshot = await getDocs(facilitiesRef);
    if (!snapshot.empty) return;

    // Add facilities to Firestore
    const promises = CALIFORNIA_FACILITIES.map(facility => 
      addDoc(facilitiesRef, facility)
    );

    await Promise.all(promises);
    console.log('Facilities data initialized successfully');
  } catch (error) {
    console.error('Error initializing facilities data:', error);
  }
}