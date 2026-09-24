import { BusinessDashboardLayout } from '@/components/business/BusinessDashboardLayout';
import { MOCK_APPOINTMENTS, MOCK_BUSINESSES } from '@/lib/mockData';
import { TrendingUp, Users, Calendar, DollarSign, Clock, Sparkles } from 'lucide-react';
import { DevBadge } from '@/components/common/DevBadge';

export default function BusinessOverviewPage() {
  return (
    <BusinessDashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-6">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">Owner Portal</span>
              <DevBadge />
            </div>
            <h1 className="font-serif text-3xl font-semibold text-white mt-1">Salon Studio Overview</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-medium border border-emerald-500/20">
              Layan Business Score: 98/100
            </span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-xs font-mono uppercase tracking-wider">Today&apos;s Revenue</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="font-serif text-3xl font-bold text-white">£485.00</p>
            <p className="text-[11px] text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +14% vs last week
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-xs font-mono uppercase tracking-wider">Bookings Today</span>
              <Calendar className="w-4 h-4 text-neutral-400" />
            </div>
            <p className="font-serif text-3xl font-bold text-white">8</p>
            <p className="text-[11px] text-neutral-400">2 walk-ins · 6 instant book</p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-xs font-mono uppercase tracking-wider">Active Clients</span>
              <Users className="w-4 h-4 text-neutral-400" />
            </div>
            <p className="font-serif text-3xl font-bold text-white">240</p>
            <p className="text-[11px] text-neutral-400">82% rebooking rate</p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-xs font-mono uppercase tracking-wider">Calendar Utilisation</span>
              <Clock className="w-4 h-4 text-[#D9CBB8]" />
            </div>
            <p className="font-serif text-3xl font-bold text-white">92%</p>
            <p className="text-[11px] text-[#D9CBB8]">Smart Gap Protection Active</p>
          </div>
        </div>

        {/* Smart AI Opportunity Action Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-neutral-900 to-neutral-800 border border-neutral-700 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D9CBB8]" />
              <h3 className="font-serif text-lg font-semibold text-white">Layan AI Revenue Insight</h3>
            </div>
            <p className="text-xs text-neutral-300">
              You have 3 empty appointment slots this Thursday afternoon (14:00 - 17:00). Launch a 15% Happy Hour promotion?
            </p>
          </div>
          <button className="px-5 py-2.5 bg-white text-[#141414] hover:bg-neutral-200 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shrink-0">
            Launch Offer (1-Tap)
          </button>
        </div>
      </div>
    </BusinessDashboardLayout>
  );
}
