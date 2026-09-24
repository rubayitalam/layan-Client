import { BusinessDashboardLayout } from '@/components/business/BusinessDashboardLayout';
import { Users, Send, AlertCircle } from 'lucide-react';
import { DevBadge } from '@/components/common/DevBadge';

export default function BusinessCustomersPage() {
  return (
    <BusinessDashboardLayout>
      <div className="space-y-6">
        <div className="border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">Client CRM &amp; Insights</span>
            <DevBadge />
          </div>
          <h1 className="font-serif text-3xl font-semibold text-white mt-1">Customer CRM &amp; Smart Insights</h1>
        </div>

        <div className="space-y-3">
          {[
            { name: 'Sarah Ahmed', visits: 14, spend: '£670.00', lastVisit: '7 weeks ago', status: 'overdue' },
            { name: 'Alexandra Reed', visits: 8, spend: '£420.00', lastVisit: '2 weeks ago', status: 'active' }
          ].map((c, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-between text-xs">
              <div>
                <h3 className="font-semibold text-white text-sm">{c.name}</h3>
                <p className="text-neutral-400">{c.visits} visits · Total Spend: {c.spend} · Last visit: {c.lastVisit}</p>
              </div>
              <div className="flex items-center gap-3">
                {c.status === 'overdue' && (
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-mono flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Overdue Rebook
                  </span>
                )}
                <button className="px-3 py-1.5 bg-white text-[#141414] rounded-lg text-xs font-semibold hover:bg-neutral-200 transition-colors flex items-center gap-1">
                  <Send className="w-3 h-3" /> Send Offer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BusinessDashboardLayout>
  );
}
