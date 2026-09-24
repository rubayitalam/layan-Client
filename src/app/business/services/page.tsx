'use client';

import React, { useState } from 'react';
import { BusinessDashboardLayout } from '@/components/business/BusinessDashboardLayout';
import { useServices, useCreateService } from '@/features/services/useServices';
import { Plus, Edit2, Trash2, X, Loader2, Check } from 'lucide-react';
import { DevBadge } from '@/components/common/DevBadge';

export default function BusinessServicesPage() {
  const { data: services = [], isLoading } = useServices('business-001');
  const createService = useCreateService();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(45);
  const [pricePounds, setPricePounds] = useState('35.00');
  const [category, setCategory] = useState('haircut');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const priceMinor = Math.round(parseFloat(pricePounds || '0') * 100);
      const res = await createService.mutateAsync({
        business_id: 'business-001',
        name,
        description: description || 'Premium salon treatment service',
        duration_minutes: Number(durationMinutes),
        base_price_minor: priceMinor,
        category,
        is_active: true
      });

      if (res.success) {
        setFeedbackMsg(`Successfully created service ${name}!`);
        setName('');
        setDescription('');
        setTimeout(() => {
          setIsModalOpen(false);
          setFeedbackMsg('');
        }, 1200);
      } else {
        alert(res.message || 'Failed to create service');
      }
    } catch (err: any) {
      alert(err.message || 'Error creating service');
    }
  };

  return (
    <BusinessDashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">Service Catalogue</span>
              <DevBadge />
            </div>
            <h1 className="font-serif text-3xl font-semibold text-white mt-1">Services &amp; Pricing CRUD</h1>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-white text-[#141414] rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add New Service
          </button>
        </div>

        {isLoading ? (
          <div className="p-12 flex items-center justify-center text-neutral-400 gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm font-mono">Loading services from API...</span>
          </div>
        ) : (
          <div className="space-y-3">
            {services.map((s) => (
              <div
                key={s._id}
                className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white text-sm">{s.name}</h3>
                    <span className="font-mono text-[10px] text-neutral-500">ID: {s._id}</span>
                  </div>
                  <p className="text-neutral-400">
                    {s.description} · {s.duration_minutes} mins
                  </p>
                </div>
                <div className="flex items-center gap-6">
                  <span className="font-serif font-bold text-base text-white">
                    £{(s.base_price_minor / 100).toFixed(2)}
                  </span>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-neutral-400 hover:text-white">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-rose-400 hover:text-rose-300">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal Dialog for Adding Service */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-md w-full p-6 space-y-5 text-white">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div>
                  <h3 className="font-serif text-xl font-semibold">Add New Service</h3>
                  <p className="text-xs text-neutral-400">Configure catalog offering for London Grooming</p>
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

              <form onSubmit={handleAddService} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold uppercase tracking-wider block mb-1">Service Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Royal Shave & Facial"
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-neutral-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold uppercase tracking-wider block mb-1">Price (£)</label>
                    <input
                      type="number"
                      step="0.5"
                      required
                      value={pricePounds}
                      onChange={(e) => setPricePounds(e.target.value)}
                      placeholder="45.00"
                      className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-neutral-500"
                    />
                  </div>
                  <div>
                    <label className="font-semibold uppercase tracking-wider block mb-1">Duration (Min)</label>
                    <input
                      type="number"
                      required
                      value={durationMinutes}
                      onChange={(e) => setDurationMinutes(Number(e.target.value))}
                      placeholder="45"
                      className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-neutral-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold uppercase tracking-wider block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-neutral-500"
                  >
                    <option value="haircut">Haircut &amp; Styling</option>
                    <option value="shave">Beard &amp; Shave</option>
                    <option value="color">Color &amp; Highlights</option>
                    <option value="treatment">Scalp &amp; Spa Treatment</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold uppercase tracking-wider block mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g. Hot towel treatment, precision razor work and essential oils."
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
                    disabled={createService.isPending}
                    className="w-2/3 py-2.5 bg-white text-neutral-950 rounded-xl font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center justify-center gap-1"
                  >
                    {createService.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Service'}
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
