/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Package {
  id: string;
  name: string;
  badge: string;
  priceSetup: number;
  priceMonthly: number;
  description: string;
  features: string[];
  isPopular?: boolean;
  glowColor: 'blue' | 'purple' | 'pink';
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'setup' | 'maintenance' | 'feature';
}

export interface ManagementPlan {
  id: 'monthly' | 'quarterly';
  name: string;
  badge: 'Standard' | 'Premium Value';
  pricingText: string;
  discountMultiplier: number; // e.g. 1.0 or 0.85 (15% discount)
  benefits: string[];
}

export interface CustomerInfo {
  fullName: string;
  restaurantName: string;
  email: string;
  phone: string;
  businessAddress: string;
  additionalNotes: string;
  hasCurrentWebsite?: string;
  currentWebsiteUrl?: string;
  country?: string;
}

export interface LogoChoice {
  id: string;
  name: string;
  tagline: string;
  description: string;
}
