import { BusinessDashboardLayout } from '@/components/business/BusinessDashboardLayout';
import { MOCK_REVIEWS } from '@/lib/mockData';
import { Star, ShieldCheck, MessageCircle } from 'lucide-react';
import { DevBadge } from '@/components/common/DevBadge';

export default function BusinessReviewsPage() {
  return (
    <BusinessDashboardLayout>
      <div className="space-y-6">
        <div className="border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">Reputation</span>
            <DevBadge />
          </div>
          <h1 className="font-serif text-3xl font-semibold text-white mt-1">Reviews &amp; Layan Business Score</h1>
        </div>

        {/* Business Score Metric Box */}
        <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase text-neutral-400">Proprietary Score</span>
            <h3 className="font-serif text-4xl font-bold text-white mt-1">98 / 100</h3>
            <p className="text-xs text-emerald-400 mt-1">Top 5% of Salons in Mayfair</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-full bg-white/10 text-white text-xs font-mono border border-white/20 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-[#D9CBB8]" /> Verified Business
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {MOCK_REVIEWS.map((r) => (
            <div key={r._id} className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white text-sm">{r.customer_name}</span>
                <span className="flex items-center gap-1 text-amber-400 font-bold"><Star className="w-3.5 h-3.5 fill-amber-400" /> {r.ratings.overall}.0</span>
              </div>
              <p className="text-neutral-300">{r.comment}</p>
              <button className="px-3 py-1.5 rounded-lg border border-neutral-700 text-neutral-300 hover:text-white text-[11px] flex items-center gap-1">
                <MessageCircle className="w-3 h-3" /> Reply to Review
              </button>
            </div>
          ))}
        </div>
      </div>
    </BusinessDashboardLayout>
  );
}
