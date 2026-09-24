'use client';

import React from 'react';
import { CustomerDashboardLayout } from '@/components/customer/CustomerDashboardLayout';
import { useAppointments } from '@/features/appointments/useAppointments';
import { Calendar, Clock, MapPin, Loader2, Sparkles } from 'lucide-react';
import { DevBadge } from '@/components/common/DevBadge';

export default function CustomerDashboardPage() {
  const { data: appointments = [], isLoading } = useAppointments();

  return (
    <CustomerDashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#E7E5E1] pb-4">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono uppercase tracking-widest text-[#9A9892]">Customer Portal</span>
              <DevBadge />
            </div>
            <h1 className="font-serif text-3xl font-semibold text-[#141414] mt-1">My Appointments</h1>
          </div>
        </div>

        {isLoading ? (
          <div className="p-12 flex items-center justify-center text-neutral-400 gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm font-mono">Loading real appointments from API...</span>
          </div>
        ) : appointments.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-dashed border-[#E7E5E1] bg-white space-y-3">
            <Sparkles className="w-8 h-8 text-neutral-400 mx-auto" />
            <h3 className="font-serif text-lg font-semibold text-[#141414]">No appointments booked yet</h3>
            <p className="text-xs text-[#6B6B6B]">Explore London salons and book your first appointment.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((app) => (
              <div
                key={app._id}
                className="p-6 rounded-2xl border border-[#E7E5E1] bg-white hover:border-[#141414] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider ${
                        app.status === 'confirmed'
                          ? 'bg-emerald-500/10 text-emerald-600'
                          : app.status === 'attended'
                          ? 'bg-blue-500/10 text-blue-600'
                          : 'bg-amber-500/10 text-amber-600'
                      }`}
                    >
                      {app.status}
                    </span>
                    <span className="font-mono text-[11px] text-[#9A9892]">ID: {app._id}</span>
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-[#141414]">
                    {app.notes || 'Salon Treatment Booking'}
                  </h3>
                  <p className="text-xs text-[#6B6B6B] flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" /> {app.start_at ? new Date(app.start_at).toLocaleString() : 'Scheduled'}
                  </p>
                  <p className="text-xs text-[#6B6B6B] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#9A9892]" /> London Studio · Staff ID: {app.staff_id || 'Assigned Stylist'}
                  </p>
                </div>

                <div className="flex items-center gap-4 justify-between sm:justify-end border-t sm:border-t-0 pt-4 sm:pt-0 border-[#E7E5E1]">
                  <span className="font-serif text-lg font-bold text-[#141414]">
                    £{((app.total_price_minor || 0) / 100).toFixed(2)}
                  </span>
                  <button className="px-4 py-2 border border-[#E7E5E1] hover:border-[#141414] text-[#141414] rounded-lg text-xs font-medium transition-colors">
                    Manage
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </CustomerDashboardLayout>
  );
}
