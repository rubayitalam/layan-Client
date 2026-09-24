import { CustomerDashboardLayout } from '@/components/customer/CustomerDashboardLayout';
import { Award, Share2, Copy, Gift } from 'lucide-react';
import { DevBadge } from '@/components/common/DevBadge';

export default function CustomerLoyaltyPage() {
  return (
    <CustomerDashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between border-b border-[#E7E5E1] pb-4">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono uppercase tracking-widest text-[#9A9892]">Customer Rewards</span>
              <DevBadge />
            </div>
            <h1 className="font-serif text-3xl font-semibold text-[#141414] mt-1">Loyalty &amp; Referrals</h1>
          </div>
        </div>

        {/* Give £5, Get £5 Referral Box */}
        <div className="p-8 rounded-3xl bg-[#F7F6F3] border border-[#E7E5E1] space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#141414] text-white flex items-center justify-center">
              <Gift className="w-6 h-6 text-[#D9CBB8]" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-semibold text-[#141414]">Give £5, Get £5</h3>
              <p className="text-xs text-[#6B6B6B]">Share your link with friends. They get £5 off their first booking, and you get £5 credit.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white p-2.5 rounded-2xl border border-[#E7E5E1]">
            <input
              type="text"
              readOnly
              value="https://layan.app/ref/alexandra-reed-55"
              className="w-full bg-transparent text-xs font-mono text-[#141414] px-3 focus:outline-none"
            />
            <button className="px-4 py-2 bg-[#141414] hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1 shrink-0">
              <Copy className="w-3.5 h-3.5" /> Copy Link
            </button>
          </div>
        </div>
      </div>
    </CustomerDashboardLayout>
  );
}
