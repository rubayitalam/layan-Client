import { Business, Service, Staff, Review, Appointment } from '@/types/api';
import { MOCK_IMAGES } from './placeholderImages';

export const MOCK_BUSINESSES: Business[] = [
  {
    _id: 'b1',
    owner_user_id: 'u1',
    legal_name: 'Salon Studio London Ltd',
    display_name: 'Salon Studio',
    slug: 'salon-studio-mayfair',
    category: 'hair_salon',
    description: 'Experience professional hair care in a serene, minimal environment. Our expert stylists deliver exceptional results tailored for you.',
    cover_image_url: MOCK_IMAGES.hero[0],
    profile_image_url: MOCK_IMAGES.businessCovers[0],
    cancellation_policy: { window_hours: 24, fee_type: 'percentage', fee_value: 50 },
    verification_status: 'verified',
    business_score: 98,
    is_active: true
  },
  {
    _id: 'b2',
    owner_user_id: 'u2',
    legal_name: 'The Crown Barber Club',
    display_name: 'Crown Barber Co.',
    slug: 'crown-barber-soho',
    category: 'barbers',
    description: 'Precision skin fades, traditional hot towel shaves, and beard sculpting in the heart of Soho.',
    cover_image_url: MOCK_IMAGES.businessCovers[1],
    profile_image_url: MOCK_IMAGES.hero[1],
    cancellation_policy: { window_hours: 12, fee_type: 'fixed', fee_value: 1500 },
    verification_status: 'verified',
    business_score: 94,
    is_active: true
  },
  {
    _id: 'b3',
    owner_user_id: 'u3',
    legal_name: 'Lumiere Aesthetics & Nails',
    display_name: 'Lumiere Atelier',
    slug: 'lumiere-atelier-covent-garden',
    category: 'nails',
    description: 'Boutique nail architecture, Russian manicures, and subtle aesthetic treatments.',
    cover_image_url: MOCK_IMAGES.businessCovers[2],
    profile_image_url: MOCK_IMAGES.gallery[1],
    cancellation_policy: { window_hours: 48, fee_type: 'percentage', fee_value: 100 },
    verification_status: 'verified',
    business_score: 96,
    is_active: true
  }
];

export const MOCK_SERVICES: Service[] = [
  {
    _id: 's1',
    business_id: 'b1',
    name: 'Precision Cut & Styling',
    description: 'Restyle your haircut to fit your features and lifestyle perfectly.',
    duration_minutes: 45,
    base_price_minor: 6500, // £65.00
    is_instant_book: true,
    is_active: true
  },
  {
    _id: 's2',
    business_id: 'b1',
    name: 'Balayage & Gloss Finish',
    description: 'Custom hand-painted highlights with a nourishing gloss treatment.',
    duration_minutes: 120,
    base_price_minor: 22000, // £220.00
    is_instant_book: true,
    is_active: true
  },
  {
    _id: 's3',
    business_id: 'b1',
    name: 'Nourishing Keratin Spa',
    description: 'Deep restorative mask and scalp therapy for glossy hair.',
    duration_minutes: 60,
    base_price_minor: 9500, // £95.00
    is_instant_book: true,
    is_active: true
  },
  {
    _id: 's4',
    business_id: 'b2',
    name: 'Signature Skin Fade & Wash',
    description: 'Foil-close skin fade with razor line-up and shampoo finish.',
    duration_minutes: 35,
    base_price_minor: 3200, // £32.00
    is_instant_book: true,
    is_active: true
  }
];

export const MOCK_STAFF: Staff[] = [
  {
    _id: 'st1',
    business_id: 'b1',
    display_name: 'Sofia Martinez',
    role: 'Creative Director & Master Stylist',
    avatar_url: MOCK_IMAGES.staff[0],
    rating: 4.98,
    is_active: true
  },
  {
    _id: 'st2',
    business_id: 'b1',
    display_name: 'James Anderson',
    role: 'Senior Colorist',
    avatar_url: MOCK_IMAGES.staff[1],
    rating: 4.95,
    is_active: true
  },
  {
    _id: 'st3',
    business_id: 'b1',
    display_name: 'Isabelle Chen',
    role: 'Styling Specialist',
    avatar_url: MOCK_IMAGES.staff[2],
    rating: 4.99,
    is_active: true
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    _id: 'r1',
    business_id: 'b1',
    customer_id: 'c1',
    customer_name: 'Alexandra R.',
    ratings: { overall: 5, service: 5, cleanliness: 5, value: 5, professionalism: 5, punctuality: 5 },
    comment: 'The best hair experience in Mayfair! Sofia transformed my hair completely and gave me great advice.',
    is_verified_booking: true,
    created_at: '2026-09-15T14:30:00Z'
  },
  {
    _id: 'r2',
    business_id: 'b1',
    customer_id: 'c2',
    customer_name: 'Marcus T.',
    ratings: { overall: 5, service: 5, cleanliness: 5, value: 4, professionalism: 5, punctuality: 5 },
    comment: 'Professional staff, calm minimal decor. The scalp massage during treatment was incredible.',
    is_verified_booking: true,
    created_at: '2026-09-10T11:20:00Z'
  }
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    _id: 'app1',
    business_id: 'b1',
    staff_id: 'st1',
    customer_id: 'c1',
    start_at: '2026-09-25T10:00:00Z',
    end_at: '2026-09-25T10:45:00Z',
    status: 'confirmed',
    total_price_minor: 6500,
    service_name: 'Precision Cut & Styling',
    staff_name: 'Sofia Martinez',
    customer_name: 'Alexandra R.'
  }
];
