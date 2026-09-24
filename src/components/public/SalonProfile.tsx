'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MOCK_BUSINESSES, MOCK_SERVICES, MOCK_STAFF, MOCK_REVIEWS } from '@/lib/mockData';
import { MOCK_IMAGES } from '@/lib/placeholderImages';
import { Star, MapPin, Clock, ShieldCheck, Check, Sparkles, Calendar } from 'lucide-react';
import { DevBadge } from '@/components/common/DevBadge';
import { BookingFlowModal } from '@/components/booking/BookingFlowModal';

export const SalonProfile: React.FC<{ slug: string }> = ({ slug }) => {
  const business = MOCK_BUSINESSES.find((b) => b.slug === slug) || MOCK_BUSINESSES[0];
  const [selectedService, setSelectedService] = useState(MOCK_SERVICES[0]);
  const [selectedStaff, setSelectedStaff] = useState(MOCK_STAFF[0]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const coverImg = !business.cover_image_url || business.cover_image_url.includes('example.com')
    ? MOCK_IMAGES.hero[0]
    : business.cover_image_url;

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Editorial Cover Banner */}
      <div className="relative h-80 sm:h-96 w-full bg-[#141414] overflow-hidden">
        <Image
          src={coverImg}
          alt={business.display_name}
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 max-w-7xl mx-auto px-6 text-white space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-mono border border-white/20">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D9CBB8]" /> Verified Layan Studio <DevBadge />
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight">{business.display_name}</h1>
          <p className="text-xs text-neutral-300 flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5" /> Mayfair, London · <Clock className="w-3.5 h-3.5 ml-2" /> Open Today 09:00 - 19:00
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-16">
          {/* About */}
          <section className="space-y-4 border-b border-[#E7E5E1] pb-10">
            <h2 className="font-serif text-2xl font-semibold text-[#141414]">About Studio</h2>
            <p className="text-sm text-[#6B6B6B] leading-relaxed">{business.description}</p>
          </section>

          {/* Services Menu */}
          <section className="space-y-6 border-b border-[#E7E5E1] pb-12">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-semibold text-[#141414]">Services</h2>
              <span className="text-xs font-mono text-[#9A9892]">Instant Book Available</span>
            </div>

            <div className="space-y-4">
              {MOCK_SERVICES.map((s) => (
                <div
                  key={s._id}
                  className={`p-6 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer ${
                    selectedService._id === s._id
                      ? 'border-[#141414] bg-[#F7F6F3] shadow-sm'
                      : 'border-[#E7E5E1] bg-white hover:border-[#141414]'
                  }`}
                  onClick={() => setSelectedService(s)}
                >
                  <div className="space-y-1">
                    <h3 className="font-medium text-base text-[#141414]">{s.name}</h3>
                    <p className="text-xs text-[#6B6B6B]">{s.description}</p>
                    <span className="inline-block text-[11px] text-[#9A9892] font-mono">{s.duration_minutes} mins</span>
                  </div>
                  <div className="flex items-center gap-4 shrink-0 justify-between sm:justify-end">
                    <span className="font-serif text-lg font-semibold text-[#141414]">
                      £{(s.base_price_minor / 100).toFixed(2)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedService(s);
                        setIsBookingOpen(true);
                      }}
                      className="px-4 py-2 bg-[#141414] hover:bg-neutral-800 text-white rounded-lg text-xs font-medium tracking-wider uppercase transition-colors"
                    >
                      Book
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Our Stylists */}
          <section className="space-y-6 border-b border-[#E7E5E1] pb-12">
            <h2 className="font-serif text-2xl font-semibold text-[#141414]">Our Stylists</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {MOCK_STAFF.map((st) => (
                <div key={st._id} className="text-center space-y-3 group">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-[#E7E5E1] group-hover:border-[#141414] transition-all">
                    <Image src={st.avatar_url || ''} alt={st.display_name} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-[#141414]">{st.display_name}</h3>
                    <p className="text-xs text-[#6B6B6B]">{st.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sticky Booking Widget Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 bg-[#F7F6F3] p-8 rounded-3xl border border-[#E7E5E1] space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#9A9892]">Selected Service</span>
              <h3 className="font-serif text-xl font-semibold text-[#141414] mt-1">{selectedService.name}</h3>
              <p className="text-xs text-[#6B6B6B] mt-1">£{(selectedService.base_price_minor / 100).toFixed(2)} · {selectedService.duration_minutes} mins</p>
            </div>

            <div className="pt-4 border-t border-[#E7E5E1] space-y-3">
              <label className="text-xs font-semibold text-[#141414] uppercase tracking-wider block">Choose Stylist</label>
              <select
                value={selectedStaff._id}
                onChange={(e) => {
                  const st = MOCK_STAFF.find(s => s._id === e.target.value);
                  if (st) setSelectedStaff(st);
                }}
                className="w-full bg-white border border-[#E7E5E1] rounded-xl px-4 py-3 text-xs text-[#141414] focus:outline-none focus:border-[#141414]"
              >
                {MOCK_STAFF.map(st => (
                  <option key={st._id} value={st._id}>{st.display_name} — {st.role}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setIsBookingOpen(true)}
              className="w-full py-4 bg-[#141414] hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" /> Select Date &amp; Time Slot
            </button>

            <p className="text-[11px] text-[#9A9892] text-center">No payment charged until service confirmation.</p>
          </div>
        </div>
      </div>

      {/* Booking Flow Wizard Modal */}
      {isBookingOpen && (
        <BookingFlowModal
          service={selectedService}
          staff={selectedStaff}
          businessId={business._id}
          onClose={() => setIsBookingOpen(false)}
        />
      )}
    </div>
  );
};
