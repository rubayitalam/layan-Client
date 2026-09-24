'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MOCK_BUSINESSES } from '@/lib/mockData';
import { MOCK_IMAGES } from '@/lib/placeholderImages';
import { Star, MapPin, Grid, Map as MapIcon, ArrowRight } from 'lucide-react';
import { DevBadge } from '@/components/common/DevBadge';

export const SearchGrid: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'hair_salon', label: 'Hair Salons' },
    { id: 'barbers', label: 'Barber Shops' },
    { id: 'nails', label: 'Nail Architecture' },
    { id: 'aesthetics', label: 'Aesthetics & Spa' },
  ];

  const filteredBusinesses = selectedCategory === 'all' 
    ? MOCK_BUSINESSES 
    : MOCK_BUSINESSES.filter(b => b.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#F7F6F3] py-12">
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E7E5E1] pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#9A9892]">Marketplace</span>
              <DevBadge />
            </div>
            <h1 className="font-serif text-4xl font-semibold text-[#141414] mt-1">Discover Top Studios</h1>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-[#E7E5E1]">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'list' ? 'bg-[#141414] text-white shadow-sm' : 'text-[#6B6B6B] hover:text-[#141414]'
              }`}
            >
              <Grid className="w-3.5 h-3.5" /> List
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'map' ? 'bg-[#141414] text-white shadow-sm' : 'text-[#6B6B6B] hover:text-[#141414]'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" /> Map View
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-all border ${
                selectedCategory === c.id
                  ? 'bg-[#141414] text-white border-[#141414]'
                  : 'bg-white text-[#6B6B6B] border-[#E7E5E1] hover:border-[#141414]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Content View */}
        {viewMode === 'list' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBusinesses.map((b, idx) => {
              const coverImg = !b.cover_image_url || b.cover_image_url.includes('example.com')
                ? MOCK_IMAGES.businessCovers[idx % MOCK_IMAGES.businessCovers.length]
                : b.cover_image_url;
              return (
                <div key={b._id} className="bg-white rounded-2xl border border-[#E7E5E1] overflow-hidden hover:border-[#141414] transition-all group">
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                    <Image
                      src={coverImg}
                      alt={b.display_name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold text-[#141414] flex items-center gap-1 shadow-sm">
                      <Star className="w-3.5 h-3.5 fill-[#141414] text-[#141414]" />
                      <span>4.9</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-xl font-semibold text-[#141414]">{b.display_name}</h3>
                      <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-[#F7F6F3] text-[#6B6B6B]">
                        {b.category}
                      </span>
                    </div>
                    <p className="text-xs text-[#6B6B6B] line-clamp-2 leading-relaxed">
                      {b.description}
                    </p>
                    <div className="pt-4 border-t border-[#E7E5E1] flex items-center justify-between text-xs">
                      <span className="text-[#6B6B6B] flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#9A9892]" /> London, UK
                      </span>
                      <Link
                        href={`/b/${b.slug}`}
                        className="font-semibold text-[#141414] hover:underline flex items-center gap-1"
                      >
                        Book Now <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white border border-[#E7E5E1] rounded-2xl p-12 text-center space-y-4">
            <MapIcon className="w-12 h-12 mx-auto text-[#9A9892]" />
            <h3 className="font-serif text-2xl font-semibold text-[#141414]">Interactive Map View</h3>
            <p className="text-xs text-[#6B6B6B] max-w-md mx-auto">
              Map integration ready for Google Maps API. Filter by radius, city centres, and instant availability.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
