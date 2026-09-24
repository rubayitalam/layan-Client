export interface AppUser {
  _id: string;
  email: string;
  phone?: string;
  user_type: 'owner' | 'staff' | 'customer' | 'admin';
  created_at?: string;
}

export interface Business {
  _id: string;
  owner_user_id: string;
  legal_name: string;
  display_name: string;
  slug: string;
  category: string;
  description: string;
  cover_image_url?: string;
  profile_image_url?: string;
  cancellation_policy?: {
    window_hours: number;
    fee_type: 'fixed' | 'percentage';
    fee_value: number;
  };
  verification_status?: 'pending' | 'verified' | 'rejected';
  is_verified?: boolean;
  business_score?: number;
  is_active: boolean;
}

export interface Location {
  _id: string;
  business_id: string;
  name: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  postcode: string;
  country: string;
  lat?: number;
  lng?: number;
  opening_hours?: Record<string, { open: string; close: string }[]>;
  mobile_service_radius_km?: number;
  is_active: boolean;
}

export interface Staff {
  _id: string;
  user_id?: string;
  business_id: string;
  location_id?: string;
  display_name: string;
  role: string;
  commission_pct?: number;
  permissions?: { can_manage_bookings: boolean };
  is_active: boolean;
  avatar_url?: string;
  rating?: number;
  bio?: string;
}

export interface ServiceCategory {
  _id: string;
  business_id?: string;
  name: string;
  description?: string;
}

export interface Service {
  _id: string;
  business_id: string;
  category_id?: string;
  category?: string;
  name: string;
  description?: string;
  duration_minutes: number;
  buffer_before_minutes?: number;
  buffer_after_minutes?: number;
  base_price_minor: number; // in minor units (divide by 100 for display)
  lead_time_hours?: number;
  is_instant_book?: boolean;
  is_active?: boolean;
}

export interface Appointment {
  _id: string;
  business_id: string;
  location_id?: string;
  staff_id: string;
  customer_id: string;
  start_at: string;
  end_at: string;
  status: 'pending' | 'confirmed' | 'attended' | 'cancelled' | 'no_show' | 'late_cancel';
  source_channel?: string;
  total_price_minor: number;
  deposit_required_minor?: number;
  notes?: string;
  service_name?: string;
  staff_name?: string;
  customer_name?: string;
}

export interface PortfolioMedia {
  _id: string;
  business_id: string;
  staff_id?: string;
  service_id?: string;
  media_url: string;
  media_type: 'image' | 'video';
  title?: string;
  likes_count?: number;
}

export interface Review {
  _id: string;
  business_id: string;
  customer_id: string;
  customer_name?: string;
  customer_avatar?: string;
  ratings: {
    overall: number;
    service?: number;
    cleanliness?: number;
    value?: number;
    professionalism?: number;
    punctuality?: number;
  };
  comment: string;
  business_reply?: string;
  is_verified_booking: boolean;
  created_at: string;
}

export interface BusinessBadge {
  _id: string;
  business_id: string;
  badge_type: 'identity_verified' | 'business_verified' | 'top_professional' | 'highly_rebooked' | 'fast_responder';
  granted_at: string;
}

export interface CustomerWallet {
  _id: string;
  customer_id: string;
  balance_minor: number;
  loyalty_points: number;
}

export interface GiftCard {
  _id: string;
  code: string;
  initial_value_minor: number;
  current_balance_minor: number;
  is_active: boolean;
}

export interface MembershipPlan {
  _id: string;
  business_id: string;
  title: string;
  price_minor: number;
  interval: 'monthly' | 'yearly';
  perks: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}
