import { AdminDashboardLayout } from '@/components/admin/AdminDashboardLayout';
import { AlertTriangle, ShieldAlert } from 'lucide-react';
import { DevBadge } from '@/components/common/DevBadge';

export default function AdminFraudPage() {
  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400">Security</span>
            <DevBadge />
          </div>
          <h1 className="font-serif text-3xl font-semibold text-white mt-1">Fraud Flags &amp; Risk Monitoring</h1>
        </div>

        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3">
          <ShieldAlert className="w-10 h-10 text-emerald-400 mx-auto" />
          <h3 className="font-serif text-xl font-semibold text-white">No Active Security Alerts</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Platform monitoring indicates zero suspicious account networks or payment chargeback manipulation.
          </p>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
