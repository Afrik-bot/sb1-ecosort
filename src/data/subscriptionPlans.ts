import type { Subscription } from '../types/MonetizationTypes';

export const SUBSCRIPTION_PLANS: Subscription[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    features: [
      'Basic item recognition',
      'Local recycling guidelines',
      'Center locator',
      'Basic statistics'
    ],
    isActive: true
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 4.99,
    features: [
      'Advanced item recognition',
      'Detailed analytics dashboard',
      'Personalized recycling plan',
      'Ad-free experience',
      'Premium educational content',
      'Priority support',
      'Custom reminders',
      'Carbon footprint tracking'
    ],
    isActive: false
  }
];