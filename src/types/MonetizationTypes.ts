export interface Subscription {
  id: string;
  name: 'Free' | 'Premium';
  price: number;
  features: string[];
  isActive: boolean;
}

export interface AffiliateProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  affiliateUrl: string;
  category: string;
  brand: string;
}

export interface PremiumFeature {
  id: string;
  name: string;
  description: string;
  requiresPremium: boolean;
  comingSoon?: boolean;
}