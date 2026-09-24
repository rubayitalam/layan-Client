import { CustomerDashboardLayout } from '@/components/customer/CustomerDashboardLayout';
import { Wallet, Gift as GiftCardIcon, Sparkles, Plus } from 'lucide-react';
import { DevBadge } from '@/components/common/DevBadge';

export default function CustomerWalletPage() {
  return (
    <CustomerDashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between border-b border-[#E7E5E1] pb-4">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono uppercase tracking-widest text-[#9A9892]">Customer Portal</span>
              <DevBadge />
            </div>
            <h1 className="font-serif text-3xl font-semibold text-[#141414] mt-1">My Wallet &amp; Cards</h1>
          </div>
          <button className="px-4 py-2 bg-[#141414] hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1">
            <Plus className="w-3.5 h-3.5" /> Add Gift Card
          </button>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-[#141414] text-white space-y-4 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-neutral-400">Layan Balance</span>
              <Wallet className="w-5 h-5 text-[#D9CBB8]" />
            </div>
            <p className="font-serif text-4xl font-bold">£25.00</p>
            <p className="text-[11px] text-neutral-400">Usable for instant bookings &amp; deposits across any salon.</p>
          </div>

          <div className="p-6 rounded-3xl bg-[#F7F6F3] border border-[#E7E5E1] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-[#9A9892]">Active Gift Card</span>
              <GiftCardIcon className="w-5 h-5 text-[#141414]" />
            </div>
            <p className="font-serif text-4xl font-bold text-[#141414]">£50.00</p>
            <p className="text-[11px] text-[#6B6B6B]">Code: <span className="font-mono text-[#141414] font-semibold">LAYAN-MAYFAIR-2026</span></p>
          </div>
        </div>
      </div>
    </CustomerDashboardLayout>
  );
}
