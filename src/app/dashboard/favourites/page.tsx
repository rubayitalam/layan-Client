import { CustomerDashboardLayout } from '@/components/customer/CustomerDashboardLayout';
import { Heart, MapPin, ArrowRight } from 'lucide-react';
import { MOCK_BUSINESSES } from '@/lib/mockData';
import Image from 'next/image';
import Link from 'next/link';
import { DevBadge } from '@/components/common/DevBadge';

export default function CustomerFavouritesPage() {
  return (
    <CustomerDashboardLayout>
      <div className="space-y-6">
        <div className="border-b border-[#E7E5E1] pb-4">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-[#9A9892]">Customer Saved</span>
            <DevBadge />
          </div>
          <h1 className="font-serif text-3xl font-semibold text-[#141414] mt-1">Favourite Studios</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_BUSINESSES.slice(0, 2).map((b) => (
            <div key={b._id} className="bg-white rounded-2xl border border-[#E7E5E1] p-5 space-y-4 hover:border-[#141414] transition-all">
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
                <Image src={b.cover_image_url || ''} alt={b.display_name} fill className="object-cover" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-xl font-semibold text-[#141414]">{b.display_name}</h3>
                <p className="text-xs text-[#6B6B6B] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#9A9892]" /> Mayfair, London
                </p>
                <Link
                  href={`/b/${b.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#141414] hover:underline pt-2"
                >
                  Book Appointment <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CustomerDashboardLayout>
  );
}
