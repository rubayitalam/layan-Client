import { AdminDashboardLayout } from '@/components/admin/AdminDashboardLayout';
import { ShieldCheck, AlertTriangle, Building, Activity, CheckCircle, XCircle } from 'lucide-react';
import { DevBadge } from '@/components/common/DevBadge';

export default function AdminDashboardPage() {
  return (
    <AdminDashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">Internal Control</span>
              <DevBadge />
            </div>
            <h1 className="font-serif text-3xl font-semibold text-white mt-1">Marketplace Admin Overview</h1>
          </div>
        </div>

        {/* Top Platform Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-xs font-mono uppercase text-slate-400">Total Platform GMV</span>
            <p className="font-serif text-3xl font-bold text-white">£124,500</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-xs font-mono uppercase text-slate-400">Active Studios</span>
            <p className="font-serif text-3xl font-bold text-white">48</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-xs font-mono uppercase text-slate-400">Verification Pending</span>
            <p className="font-serif text-3xl font-bold text-amber-400">3</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-xs font-mono uppercase text-slate-400">Fraud Flags</span>
            <p className="font-serif text-3xl font-bold text-emerald-400">0 Active</p>
          </div>
        </div>

        {/* Business Verification Queue */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
          <h3 className="font-serif text-xl font-semibold text-white">Business Verification Queue</h3>
          <div className="space-y-3">
            {[
              { id: 'v1', name: 'Soho Grooming Lab', type: 'Barbershop', owner: 'Dave Miller', date: '2026-09-22' },
              { id: 'v2', name: 'Kensington Aesthetics', type: 'Aesthetics', owner: 'Dr. Elena Rostova', date: '2026-09-21' }
            ].map((item) => (
              <div key={item.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-white">{item.name} ({item.type})</p>
                  <p className="text-slate-400">Owner: {item.owner} · Submitted: {item.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors flex items-center gap-1 font-medium">
                    <CheckCircle className="w-3.5 h-3.5" /> Approve
                  </button>
                  <button className="px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 transition-colors flex items-center gap-1 font-medium">
                    <XCircle className="w-3.5 h-3.5" /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
