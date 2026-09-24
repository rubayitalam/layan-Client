import { AdminDashboardLayout } from '@/components/admin/AdminDashboardLayout';
import { FileText } from 'lucide-react';
import { DevBadge } from '@/components/common/DevBadge';

export default function AdminLogsPage() {
  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400">Audit</span>
            <DevBadge />
          </div>
          <h1 className="font-serif text-3xl font-semibold text-white mt-1">Admin Action Logs</h1>
        </div>

        <div className="space-y-2">
          {[
            { action: 'Approved Verification for Salon Studio Mayfair', admin: 'Admin System', time: '2026-09-20 10:14:02' },
            { action: 'Resolved Deposit Dispute #d004 in favour of Customer', admin: 'Admin Operator #1', time: '2026-09-18 16:45:11' }
          ].map((l, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs flex justify-between text-slate-300">
              <span>{l.action} (by {l.admin})</span>
              <span className="text-slate-500">{l.time}</span>
            </div>
          ))}
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
