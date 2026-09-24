import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MOCK_IMAGES } from '@/lib/placeholderImages';
import { Sparkles, Bookmark, Heart, ArrowRight } from 'lucide-react';
import { DevBadge } from '@/components/common/DevBadge';

export const DiscoveryFeed: React.FC = () => {
  const posts = [
    {
      id: 'p1',
      title: 'Flawless Skin Fade & Beard Sculpt',
      salon: 'Crown Barber Co.',
      stylist: 'James Anderson',
      image: MOCK_IMAGES.hero[1],
      price: '£32.00',
      slug: 'crown-barber-soho'
    },
    {
      id: 'p2',
      title: 'Honey Balayage Transformation',
      salon: 'Salon Studio',
      stylist: 'Sofia Martinez',
      image: MOCK_IMAGES.gallery[0],
      price: '£220.00',
      slug: 'salon-studio-mayfair'
    },
    {
      id: 'p3',
      title: 'Minimalist Russian Gel Manicure',
      salon: 'Lumiere Atelier',
      stylist: 'Isabelle Chen',
      image: MOCK_IMAGES.gallery[1],
      price: '£65.00',
      slug: 'lumiere-atelier-covent-garden'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F6F3] py-12">
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        <div className="border-b border-[#E7E5E1] pb-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#9A9892]">Discovery Feed</span>
            <DevBadge />
          </div>
          <h1 className="font-serif text-4xl font-semibold text-[#141414] mt-1">Book This Look</h1>
          <p className="text-xs text-[#6B6B6B] mt-1">Explore real client transformations and book the exact service in one tap.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-3xl border border-[#E7E5E1] overflow-hidden hover:border-[#141414] transition-all group">
              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <button className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#141414] hover:bg-white transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#E7E5E1] flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-[#141414]">{post.salon}</p>
                    <p className="text-[11px] text-[#6B6B6B]">by {post.stylist}</p>
                  </div>
                  <span className="font-serif font-bold text-sm text-[#141414]">{post.price}</span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="font-serif text-lg font-semibold text-[#141414]">{post.title}</h3>
                <Link
                  href={`/b/${post.slug}`}
                  className="w-full py-3 bg-[#141414] hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D9CBB8]" /> Book This Look
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
