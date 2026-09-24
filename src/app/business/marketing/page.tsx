import { BusinessDashboardLayout } from '@/components/business/BusinessDashboardLayout';
import { Megaphone, Plus, Sparkles } from 'lucide-react';
import { DevBadge } from '@/components/common/DevBadge';

export default function BusinessMarketingPage() {
  return (
    <BusinessDashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">Growth Engine</span>
              <DevBadge />
            </div>
            <h1 className="font-serif text-3xl font-semibold text-white mt-1">Marketing &amp; Promotions</h1>
          </div>
          <button className="px-4 py-2 bg-white text-[#141414] rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center gap-1">
            <Plus className="w-3.5 h-3.5" /> Create Campaign
          </button>
        </div>

        <div className="space-y-3">
          {[
            { title: 'Quiet Day Discount (Tuesday 12:00 - 16:00)', discount: '15% OFF', status: 'Active' },
            { title: 'Last-Minute Cancellation Discount', discount: '20% OFF', status: 'Active' }
          ].map((p, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-between text-xs">
              <div>
                <h3 className="font-semibold text-white text-sm">{p.title}</h3>
                <p className="text-neutral-400">Benefit: {p.discount}</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold uppercase">
                {p.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </BusinessDashboardLayout>
  );
}
