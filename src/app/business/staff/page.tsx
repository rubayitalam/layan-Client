'use client';

import React, { useState } from 'react';
import { BusinessDashboardLayout } from '@/components/business/BusinessDashboardLayout';
import { useStaff, useCreateStaff } from '@/features/staff/useStaff';
import { UserPlus, Star, Clock, X, Loader2, Check } from 'lucide-react';
import Image from 'next/image';
import { DevBadge } from '@/components/common/DevBadge';

export default function BusinessStaffPage() {
  const { data: staffList = [], isLoading } = useStaff('business-001');
  const createStaff = useCreateStaff();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState('Senior Stylist');
  const [bio, setBio] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const handleAddStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await createStaff.mutateAsync({
        business_id: 'business-001',
        display_name: displayName,
        role: role,
        bio: bio || 'Expert in modern styling and hair design',
        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
        rating: 5.0,
        is_active: true
      });

      if (res.success) {
        setFeedbackMsg(`Successfully added stylist ${displayName}!`);
        setDisplayName('');
        setBio('');
        setTimeout(() => {
          setIsModalOpen(false);
          setFeedbackMsg('');
        }, 1200);
      } else {
        alert(res.message || 'Failed to create staff member');
      }
    } catch (err: any) {
      alert(err.message || 'Error creating staff member');
    }
  };

  return (
    <BusinessDashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">Team Roster</span>
              <DevBadge />
            </div>
            <h1 className="font-serif text-3xl font-semibold text-white mt-1">Staff &amp; Availability CRUD</h1>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-white text-[#141414] rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center gap-1"
          >
            <UserPlus className="w-3.5 h-3.5" /> Add Stylist
          </button>
        </div>

        {isLoading ? (
          <div className="p-12 flex items-center justify-center text-neutral-400 gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm font-mono">Loading staff roster from API...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {staffList.map((st) => (
              <div key={st._id} className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border border-neutral-700 shrink-0 bg-neutral-800 flex items-center justify-center text-white font-bold text-lg">
                    {st.avatar_url ? (
                      <Image src={st.avatar_url} alt={st.display_name} fill className="object-cover" />
                    ) : (
                      st.display_name.charAt(0)
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">{st.display_name}</h3>
                    <p className="text-xs text-neutral-400">{st.role}</p>
                    <p className="text-[11px] text-amber-400 flex items-center gap-1 mt-1">
                      <Star className="w-3 h-3 fill-amber-400" /> {st.rating || 5.0}
                    </p>
                  </div>
                </div>
                <div className="pt-3 border-t border-neutral-800 flex justify-between text-xs text-neutral-400">
                  <span>ID: <span className="font-mono text-[10px] text-neutral-300">{st._id}</span></span>
                  <span className="text-emerald-400">Active</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal Dialog for Adding Staff */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-md w-full p-6 space-y-5 text-white">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div>
                  <h3 className="font-serif text-xl font-semibold">Add New Stylist</h3>
                  <p className="text-xs text-neutral-400">Add a team member to London Grooming</p>
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

              <form onSubmit={handleAddStaff} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold uppercase tracking-wider block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="e.g. Liam Gallagher"
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-neutral-500"
                  />
                </div>

                <div>
                  <label className="font-semibold uppercase tracking-wider block mb-1">Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-neutral-500"
                  >
                    <option value="Senior Stylist">Senior Stylist</option>
                    <option value="Master Barber">Master Barber</option>
                    <option value="Color Specialist">Color Specialist</option>
                    <option value="Aesthetician">Aesthetician</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold uppercase tracking-wider block mb-1">Bio / Specialties</label>
                  <textarea
                    rows={2}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="e.g. Fade specialist with 8 years experience"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-neutral-500"
                  />
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
                    disabled={createStaff.isPending}
                    className="w-2/3 py-2.5 bg-white text-neutral-950 rounded-xl font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center justify-center gap-1"
                  >
                    {createStaff.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Stylist'}
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
