'use client';

import React, { useState } from 'react';
import { AdminDashboardLayout } from '@/components/admin/AdminDashboardLayout';
import { useBusinesses } from '@/features/businesses/useBusinesses';
import { ShieldCheck, CheckCircle, XCircle, Loader2, Check } from 'lucide-react';
import { DevBadge } from '@/components/common/DevBadge';

export default function AdminVerificationPage() {
  const { data: businesses = [], isLoading, refetch } = useBusinesses();
  const [approvedIds, setApprovedIds] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string>('');

  const handleApprove = (bizId: string, bizName: string) => {
    setApprovedIds(prev => [...prev, bizId]);
    setFeedback(`Business "${bizName}" verified and approved for marketplace listings.`);
    setTimeout(() => setFeedback(''), 3000);
  };

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400">Moderation</span>
            <DevBadge />
          </div>
          <h1 className="font-serif text-3xl font-semibold text-white mt-1">Pending Business Verification Queue</h1>
        </div>

        {feedback && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-2xl flex items-center gap-2">
            <Check className="w-4 h-4" /> {feedback}
          </div>
        )}

        {isLoading ? (
          <div className="p-12 flex items-center justify-center text-slate-400 gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm font-mono">Loading businesses from database...</span>
          </div>
        ) : (
          <div className="space-y-3">
            {businesses.map((item) => {
              const isApproved = approvedIds.includes(item._id || '') || item.is_verified;
              return (
                <div
                  key={item._id}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-white text-sm">{item.display_name} ({item.legal_name || item.category})</p>
                      <span className="font-mono text-[10px] text-slate-500">ID: {item._id}</span>
                    </div>
                    <p className="text-slate-400">
                      Category: {item.category} · Slug: <span className="font-mono text-slate-300">/b/{item.slug}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {isApproved ? (
                      <span className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 font-semibold flex items-center gap-1 text-xs">
                        <CheckCircle className="w-3.5 h-3.5" /> Approved &amp; Active
                      </span>
                    ) : (
                      <>
                        <button
                          onClick={() => handleApprove(item._id || '', item.display_name)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors flex items-center gap-1 font-medium"
                        >
                          <CheckCircle className="w-3.5 h-3.5" /> Approve Verification
                        </button>
                        <button className="px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 transition-colors flex items-center gap-1 font-medium">
                          <XCircle className="w-3.5 h-3.5" /> Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AdminDashboardLayout>
  );
}
