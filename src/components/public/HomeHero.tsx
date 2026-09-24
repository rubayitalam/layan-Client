'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, MapPin, Sparkles, ArrowRight, Star, Clock, CheckCircle2, Loader2 } from 'lucide-react';
import { useBusinesses } from '@/features/businesses/useBusinesses';
import { MOCK_IMAGES } from '@/lib/placeholderImages';

const getValidImageUrl = (url?: string, fallback: string = MOCK_IMAGES.hero[0]) => {
  if (!url || url.includes('example.com')) {
    return fallback;
  }
  return url;
};

export const HomeHero: React.FC = () => {
  const [naturalQuery, setNaturalQuery] = useState('');
  const { data: businesses = [], isLoading: bizLoading } = useBusinesses();

  const heroBusiness = businesses[0];
  const heroImgUrl = getValidImageUrl(heroBusiness?.cover_image_url, MOCK_IMAGES.hero[0]);

  return (
    <div className="relative bg-white overflow-hidden">
      {/* Editorial Top Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F6F3] border border-[#E7E5E1] text-xs font-mono text-[#6B6B6B]">
            <Sparkles className="w-3.5 h-3.5 text-[#141414]" />
            <span>UK Premier Salon &amp; Beauty Marketplace</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-[#141414] leading-[1.08]">
            Expert Hair <br />
            Treatments &amp; <br />
            Styling
          </h1>

          <p className="text-base sm:text-lg text-[#6B6B6B] leading-relaxed max-w-xl">
            Experience professional hair care in a serene, minimal environment. Our expert stylists deliver exceptional results tailored for you.
          </p>

          {/* Layan Smart Search Bar (Natural Language) */}
          <div className="bg-[#F7F6F3] p-3 rounded-2xl border border-[#E7E5E1] shadow-sm space-y-3">
            <div className="relative flex items-center bg-white rounded-xl border border-[#E7E5E1] px-4 py-3.5 focus-within:border-[#141414] transition-colors">
              <Search className="w-5 h-5 text-[#9A9892] mr-3 shrink-0" />
              <input
                type="text"
                id="home-search-input"
                value={naturalQuery}
                onChange={(e) => setNaturalQuery(e.target.value)}
                placeholder="Try 'Skin fade near Soho tomorrow after 6pm under £30'..."
                className="w-full bg-transparent text-sm text-[#141414] placeholder-[#9A9892] focus:outline-none"
              />
              <Link
                href={`/search?q=${encodeURIComponent(naturalQuery)}`}
                id="home-search-btn"
                className="inline-flex items-center justify-center px-5 py-2.5 bg-[#141414] hover:bg-neutral-800 text-white rounded-lg text-xs font-medium tracking-wider uppercase transition-all shrink-0 ml-2"
              >
                Search
              </Link>
            </div>
            <div className="flex items-center justify-between text-xs text-[#6B6B6B] px-1">
              <span className="font-mono text-[11px] text-[#9A9892]">✨ Natural Language AI Search Enabled</span>
              <div className="flex items-center gap-3">
                <Link href="/search?q=Mayfair" className="hover:text-[#141414] cursor-pointer">Mayfair</Link>
                <Link href="/search?q=Soho" className="hover:text-[#141414] cursor-pointer">Soho</Link>
                <Link href="/search?q=Covent+Garden" className="hover:text-[#141414] cursor-pointer">Covent Garden</Link>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="pt-6 border-t border-[#E7E5E1] grid grid-cols-3 gap-6">
            <div>
              <p className="font-serif text-3xl font-bold text-[#141414]">{businesses.length || '3'}+</p>
              <p className="text-xs text-[#6B6B6B] uppercase tracking-wider mt-1">Partner Salons</p>
            </div>
            <div>
              <p className="font-serif text-3xl font-bold text-[#141414]">8K+</p>
              <p className="text-xs text-[#6B6B6B] uppercase tracking-wider mt-1">Booked Clients</p>
            </div>
            <div>
              <p className="font-serif text-3xl font-bold text-[#141414]">4.9</p>
              <p className="text-xs text-[#6B6B6B] uppercase tracking-wider mt-1">Average Rating</p>
            </div>
          </div>
        </div>

        {/* Hero Editorial Image Showcase */}
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[#E7E5E1] shadow-2xl bg-neutral-100">
            <Image
              src={heroImgUrl}
              alt="Salon Hero Interior"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover hover:scale-105 transition-transform duration-700"
              priority
            />
          </div>
          {/* Floating Badge */}
          <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-[#E7E5E1] shadow-lg max-w-xs hidden sm:block">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#141414] text-white flex items-center justify-center font-serif text-lg font-bold">
                L
              </div>
              <div>
                <p className="text-xs font-bold text-[#141414]">Verified Layan Studio</p>
                <p className="text-[11px] text-[#6B6B6B]">Top Professional Guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 01-04 Numbered Service Categories Grid */}
      <section className="bg-[#F7F6F3] py-24 border-y border-[#E7E5E1]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-16">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#9A9892]">Our Services</span>
              <h2 className="font-serif text-4xl font-semibold text-[#141414] mt-2">What We Offer</h2>
            </div>
            <Link href="/search" className="text-xs font-semibold uppercase tracking-wider text-[#141414] hover:text-[#6B6B6B] transition-colors flex items-center gap-1">
              View All Categories <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'Haircut', desc: 'Restyle your hair to fit your look.', price: '£65' },
              { num: '02', title: 'Color', desc: 'Expert color treatment & custom highlights.', price: '£220' },
              { num: '03', title: 'Styling', desc: 'Professional blow-dry & red carpet finish.', price: '£60' },
              { num: '04', title: 'Treatment', desc: 'Deep restorative keratin & scalp care.', price: '£95' },
            ].map((cat, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-[#E7E5E1] hover:border-[#141414] transition-all group">
                <span className="font-serif text-3xl text-[#9A9892] group-hover:text-[#141414] transition-colors">{cat.num}</span>
                <h3 className="text-xl font-semibold text-[#141414] mt-4">{cat.title}</h3>
                <p className="text-xs text-[#6B6B6B] mt-2 leading-relaxed">{cat.desc}</p>
                <div className="mt-8 pt-4 border-t border-[#E7E5E1] flex items-center justify-between text-xs">
                  <span className="text-[#9A9892]">From {cat.price}</span>
                  <Link href={`/search?category=${cat.title.toLowerCase()}`} className="font-semibold text-[#141414] group-hover:underline">
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Businesses Carousel / Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-16">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#9A9892]">Top Rated</span>
            <h2 className="font-serif text-4xl font-semibold text-[#141414] mt-2">Featured Studios</h2>
          </div>
          <Link href="/search" className="text-xs font-semibold uppercase tracking-wider text-[#141414] hover:text-[#6B6B6B] transition-colors flex items-center gap-1">
            Explore All Salons <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {bizLoading ? (
          <div className="p-12 flex items-center justify-center text-neutral-400 gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm font-mono">Loading featured studios from database...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {businesses.map((b, idx) => {
              const coverImg = getValidImageUrl(
                b.cover_image_url,
                MOCK_IMAGES.businessCovers[idx % MOCK_IMAGES.businessCovers.length]
              );
              return (
                <div key={b._id} className="group bg-white rounded-2xl border border-[#E7E5E1] overflow-hidden hover:border-[#141414] transition-all">
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                    <Image
                      src={coverImg}
                      alt={b.display_name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold text-[#141414] flex items-center gap-1 shadow-sm">
                      <Star className="w-3.5 h-3.5 fill-[#141414] text-[#141414]" />
                      <span>4.9</span>
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-xl font-semibold text-[#141414] group-hover:text-[#6B6B6B] transition-colors">
                        {b.display_name}
                      </h3>
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
                        View Studio <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
