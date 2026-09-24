import React from 'react';
import Link from 'next/link';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-[#141414] text-white pt-20 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Brand Column */}
        <div className="md:col-span-4 space-y-6">
          <Link href="/" className="inline-block">
            <span className="font-serif text-3xl tracking-widest font-bold uppercase text-white">
              LAYAN
            </span>
          </Link>
          <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
            The boutique salon & beauty marketplace. Discover elite barbers, stylists, nail architects, and aesthetics professionals near you.
          </p>
          <p className="text-xs text-neutral-500 font-mono">
            London · Birmingham · Manchester · Edinburgh
          </p>
        </div>

        {/* Links Columns */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="text-xs font-semibold tracking-widest uppercase text-neutral-400">Explore</h4>
          <ul className="space-y-2.5 text-sm text-neutral-300">
            <li><Link href="/search?category=hair_salon" className="hover:text-white transition-colors">Hair Salons</Link></li>
            <li><Link href="/search?category=barbers" className="hover:text-white transition-colors">Barber Shops</Link></li>
            <li><Link href="/search?category=nails" className="hover:text-white transition-colors">Nail Studios</Link></li>
            <li><Link href="/feed" className="hover:text-white transition-colors">Discovery Feed</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2 space-y-4">
          <h4 className="text-xs font-semibold tracking-widest uppercase text-neutral-400">For Business</h4>
          <ul className="space-y-2.5 text-sm text-neutral-300">
            <li><Link href="/business" className="hover:text-white transition-colors">Layan Business</Link></li>
            <li><Link href="/business/pos" className="hover:text-white transition-colors">Smart Checkout</Link></li>
            <li><Link href="/business/calendar" className="hover:text-white transition-colors">Calendar & Waitlist</Link></li>
            <li><Link href="/admin" className="hover:text-white transition-colors">Admin Portal</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4 space-y-4 bg-neutral-900/60 p-6 rounded-2xl border border-neutral-800">
          <h4 className="text-sm font-medium text-white">Ready to Transform Your Look?</h4>
          <p className="text-xs text-neutral-400">Book your next appointment in seconds with verified instant availability.</p>
          <Link
            href="/search"
            className="inline-flex items-center justify-center w-full px-6 py-3 text-xs font-semibold uppercase tracking-widest bg-white text-[#141414] rounded-lg hover:bg-neutral-200 transition-colors"
          >
            Find a Salon Near You
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500">
        <p>© {new Date().getFullYear()} LAYAN Marketplace Ltd. All rights reserved.</p>
        <div className="flex items-center gap-6 mt-4 sm:mt-0">
          <Link href="#" className="hover:text-neutral-400">Privacy Policy</Link>
          <Link href="#" className="hover:text-neutral-400">Terms of Service</Link>
          <Link href="#" className="hover:text-neutral-400">Cookies</Link>
        </div>
      </div>
    </footer>
  );
};
