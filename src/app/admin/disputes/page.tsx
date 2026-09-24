'use client';

import React, { useState } from 'react';
import { AdminDashboardLayout } from '@/components/admin/AdminDashboardLayout';
import { useDisputes, useResolveDispute } from '@/features/disputes/useDisputes';
import { Scale, CheckCircle2, Loader2, Check } from 'lucide-react';
import { DevBadge } from '@/components/common/DevBadge';

export default function AdminDisputesPage() {
  const { data: disputes = [], isLoading } = useDisputes();
  const resolveDispute = useResolveDispute();
  const [feedback, setFeedback] = useState('');

  const handleResolve = async (disputeId: string) => {
    try {
      const res = await resolveDispute.mutateAsync({
        disputeId,
        status: 'resolved_merchant_payout',
        resolution: 'Admin reviewed evidence: payout authorized to merchant'
      });
      if (res.success) {
        setFeedback(`Dispute ${disputeId} resolved successfully.`);
        setTimeout(() => setFeedback(''), 3000);
      }
    } catch (err: any) {
      alert(err.message || 'Failed to resolve dispute');
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400">Resolution</span>
            <DevBadge />
          </div>
          <h1 className="font-serif text-3xl font-semibold text-white mt-1">Dispute Resolution Queue</h1>
        </div>

        {feedback && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-2xl flex items-center gap-2">
            <Check className="w-4 h-4" /> {feedback}
          </div>
        )}

        {isLoading ? (
          <div className="p-12 flex items-center justify-center text-slate-400 gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm font-mono">Loading disputes from API...</span>
          </div>
        ) : disputes.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs font-mono">
            No active disputes found in database.
          </div>
        ) : (
          <div className="space-y-3">
            {disputes.map((d) => (
              <div
                key={d._id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white text-sm">{d.reason}</h3>
                    <span className="font-mono text-[10px] text-slate-500">ID: {d._id}</span>
                  </div>
                  <p className="text-slate-400">
                    Payment Ref: <span className="font-mono text-slate-300">{d.payment_id}</span> · Raised by: <span className="uppercase font-mono text-[11px] text-slate-300">{d.raised_by}</span>
                  </p>
                  {d.resolution && (
                    <p className="text-emerald-400 font-mono text-[11px]">Resolution: {d.resolution}</p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase font-bold ${
                      d.status.startsWith('resolved')
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-amber-500/10 text-amber-400'
                    }`}
                  >
                    {d.status}
                  </span>

                  {!d.status.startsWith('resolved') && (
                    <button
                      disabled={resolveDispute.isPending}
                      onClick={() => handleResolve(d._id || '')}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <Scale className="w-3.5 h-3.5" /> Resolve Dispute
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminDashboardLayout>
  );
}
