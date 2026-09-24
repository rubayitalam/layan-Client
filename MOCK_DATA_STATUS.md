# MOCK_DATA_STATUS.md — Layan Frontend Data Integration Tracker

This document tracks which components and pages are currently backed by mock data fallbacks vs live API endpoints.

---

## Data Layer Architecture Rule
Every custom hook and API fetcher uses **API First → Mock Fallback in Dev** mode.

---

## Module Status Checklist

| Area | Page / Feature | Component Path | Status | API Endpoint | Mock Data Source |
|---|---|---|---|---|---|
| **Public** | Home & Smart Search | `@/components/public/HomeHero` | 🟡 Hybrid | `/api/business`, `/api/service-category` | `mockData.ts` |
| **Public** | Search & Discovery | `@/components/public/SearchGrid` | 🟡 Hybrid | `/api/business`, `/api/location` | `mockData.ts` |
| **Public** | Salon Profile (`/b/[slug]`) | `@/components/public/SalonProfile` | 🟡 Hybrid | `/api/business/:id`, `/api/service`, `/api/staff` | `mockData.ts` |
| **Public** | Discovery Feed | `@/components/public/DiscoveryFeed` | 🟡 Hybrid | `/api/portfolio-media` | `mockData.ts` |
| **Public** | Booking Flow & SlotPicker | `@/components/booking/SlotPicker` | 🟡 Hybrid | `/api/staff-availability`, `/api/appointment` | `mockData.ts` |
| **Customer** | My Appointments | `@/components/customer/AppointmentsList` | 🟡 Hybrid | `/api/appointment`, `/api/appointment-status-history` | `mockData.ts` |
| **Customer** | Wallet & Packages | `@/components/customer/WalletCard` | 🟡 Hybrid | `/api/customer-wallet`, `/api/gift-card` | `mockData.ts` |
| **Customer** | Favourites & Messages | `@/components/customer/FavouritesGrid` | 🟡 Hybrid | `/api/customer-favourite`, `/api/message` | `mockData.ts` |
| **Business** | Overview & POS | `@/components/business/POSCheckout` | 🟡 Hybrid | `/api/appointment`, `/api/payment` | `mockData.ts` |
| **Business** | Calendar & Waitlist | `@/components/business/ScheduleCalendar` | 🟡 Hybrid | `/api/appointment`, `/api/waitlist-entry` | `mockData.ts` |
| **Business** | Services & Staff CRUD | `@/components/business/ServiceManager` | 🟡 Hybrid | `/api/service`, `/api/staff` | `mockData.ts` |
| **Business** | CRM & Smart Insights | `@/components/business/CustomerCRM` | 🟡 Hybrid | `/api/customer-business-profile` | `mockData.ts` |
| **Admin** | Verification Queue & Fraud | `@/components/admin/AdminControls` | 🟡 Hybrid | `/api/fraud-flag`, `/api/dispute` | `mockData.ts` |

---

*Legend: 🟢 Live API Only | 🟡 Hybrid (API First + Fallback) | 🔴 Pending Setup*
