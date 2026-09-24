'use client';

import React, { useState } from 'react';
import { BusinessDashboardLayout } from '@/components/business/BusinessDashboardLayout';
import { useAppointments, useCreateAppointment } from '@/features/appointments/useAppointments';
import { useStaff } from '@/features/staff/useStaff';
import { useServices } from '@/features/services/useServices';
import { Calendar, Plus, Clock, User, Loader2, Check, X } from 'lucide-react';
import { DevBadge } from '@/components/common/DevBadge';

export default function BusinessCalendarPage() {
  const { data: appointments = [], isLoading: appLoading } = useAppointments();
  const { data: staffList = [] } = useStaff('business-001');
  const { data: services = [] } = useServices('business-001');
  const createAppointment = useCreateAppointment();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [clientName, setClientName] = useState('');
  const [timeSlot, setTimeSlot] = useState('14:00');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const handleCreateWalkIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const selectedService = services.find(s => s._id === selectedServiceId) || services[0];
      const staffId = selectedStaffId || (staffList[0]?._id || 'staff-001');

      const res = await createAppointment.mutateAsync({
        business_id: 'business-001',
        staff_id: staffId,
        customer_id: 'walkin-cust',
        start_at: `2026-09-25T${timeSlot}:00Z`,
        end_at: `2026-09-25T${timeSlot}:45Z`,
        status: 'confirmed',
        total_price_minor: selectedService?.base_price_minor || 3500,
        notes: `Walk-in: ${clientName || 'Walk-in Client'} (${selectedService?.name || 'Haircut'})`
      });

      if (res.success) {
        setFeedbackMsg(`Successfully booked walk-in for ${clientName}!`);
        setTimeout(() => {
          setIsModalOpen(false);
          setFeedbackMsg('');
          setClientName('');
        }, 1200);
      } else {
        alert(res.message || 'Failed to log walk-in');
      }
    } catch (err: any) {
      alert(err.message || 'Error creating walk-in');
    }
  };

  return (
    <BusinessDashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">Interactive Schedule</span>
              <DevBadge />
            </div>
            <h1 className="font-serif text-3xl font-semibold text-white mt-1">Calendar &amp; Waitlist</h1>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-white text-[#141414] rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Log Walk-In
          </button>
        </div>

        {/* Staff Roster Bar */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {staffList.map((st) => (
            <div key={st._id} className="px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs flex items-center gap-2 whitespace-nowrap">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="font-semibold text-white">{st.display_name}</span>
              <span className="text-neutral-500 font-mono text-[10px]">({st.role})</span>
            </div>
          ))}
        </div>

        {/* Calendar Timeline Grid */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between text-xs text-neutral-400 border-b border-neutral-800 pb-4">
            <span className="font-mono text-white font-semibold">Live Appointments Schedule</span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> Confirmed ({appointments.length})
              </span>
            </div>
          </div>

          {appLoading ? (
            <div className="p-12 flex items-center justify-center text-neutral-400 gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="text-sm font-mono">Loading calendar schedule from API...</span>
            </div>
          ) : appointments.length === 0 ? (
            <div className="p-8 text-center text-neutral-500 text-xs font-mono">
              No appointments scheduled for today. Log a walk-in above.
            </div>
          ) : (
            <div className="space-y-3">
              {appointments.map((slot) => {
                const staffObj = staffList.find(s => s._id === slot.staff_id);
                return (
                  <div
                    key={slot._id}
                    className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-neutral-400 w-28">
                        {slot.start_at ? new Date(slot.start_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '10:00 AM'}
                      </span>
                      <div>
                        <p className="font-semibold text-white">{slot.notes || 'Appointment Booking'}</p>
                        <p className="text-neutral-400 font-mono text-[11px]">
                          Stylist: {staffObj ? staffObj.display_name : slot.staff_id}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-white font-semibold">
                        £{((slot.total_price_minor || 0) / 100).toFixed(2)}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase font-bold bg-emerald-500/10 text-emerald-400">
                        {slot.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal for Walk-in */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-md w-full p-6 space-y-5 text-white">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div>
                  <h3 className="font-serif text-xl font-semibold">Log Walk-In Appointment</h3>
                  <p className="text-xs text-neutral-400">Create a real appointment on the schedule</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {feedbackMsg && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl flex items-center gap-2">
                  <Check className="w-4 h-4" /> {feedbackMsg}
                </div>
              )}

              <form onSubmit={handleCreateWalkIn} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold uppercase tracking-wider block mb-1">Client Name</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Thomas Shelby"
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-neutral-500"
                  />
                </div>

                <div>
                  <label className="font-semibold uppercase tracking-wider block mb-1">Select Stylist</label>
                  <select
                    value={selectedStaffId}
                    onChange={(e) => setSelectedStaffId(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-neutral-500"
                  >
                    {staffList.map((st) => (
                      <option key={st._id} value={st._id}>{st.display_name} ({st.role})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold uppercase tracking-wider block mb-1">Select Service</label>
                  <select
                    value={selectedServiceId}
                    onChange={(e) => setSelectedServiceId(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-neutral-500"
                  >
                    {services.map((s) => (
                      <option key={s._id} value={s._id}>{s.name} (£{(s.base_price_minor / 100).toFixed(2)})</option>
                    ))}
                  </select>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="w-1/3 py-2.5 border border-neutral-800 rounded-xl hover:bg-neutral-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={createAppointment.isPending}
                    className="w-2/3 py-2.5 bg-white text-neutral-950 rounded-xl font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center justify-center gap-1"
                  >
                    {createAppointment.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Confirm Walk-In'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </BusinessDashboardLayout>
  );
}
