'use client';

import React, { useState } from 'react';
import { Service, Staff } from '@/types/api';
import { X, Calendar as CalendarIcon, Clock, Check, Shield } from 'lucide-react';
import { DevBadge } from '@/components/common/DevBadge';

interface SlotPickerProps {
  service: Service;
  staff: Staff;
  onClose: () => void;
}

export const SlotPicker: React.FC<SlotPickerProps> = ({ service, staff, onClose }) => {
  const [selectedDate, setSelectedDate] = useState<string>('2026-09-25');
  const [selectedSlot, setSelectedSlot] = useState<string>('10:00 AM');
  const [isBooked, setIsBooked] = useState(false);

  // Available Time Slots Computed Mock
  const slots = ['09:00 AM', '09:45 AM', '10:30 AM', '11:15 AM', '01:30 PM', '02:15 PM', '03:45 PM', '04:30 PM'];

  const handleConfirm = () => {
    setIsBooked(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-[#E7E5E1] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-[#E7E5E1] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono uppercase tracking-widest text-[#9A9892]">Smart Slot Engine</span>
              <DevBadge />
            </div>
            <h3 className="font-serif text-xl font-semibold text-[#141414] mt-0.5">Choose Booking Slot</h3>
          </div>
          <button onClick={onClose} className="p-2 text-[#6B6B6B] hover:text-[#141414] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {isBooked ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 mx-auto flex items-center justify-center">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="font-serif text-2xl font-semibold text-[#141414]">Booking Confirmed!</h4>
            <p className="text-xs text-[#6B6B6B]">
              Appointment booked with {staff.display_name} for {service.name} on {selectedDate} at {selectedSlot}.
            </p>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {/* Service Summary Pill */}
            <div className="p-4 rounded-xl bg-[#F7F6F3] border border-[#E7E5E1] flex items-center justify-between text-xs">
              <div>
                <p className="font-semibold text-[#141414]">{service.name}</p>
                <p className="text-[#6B6B6B]">Stylist: {staff.display_name}</p>
              </div>
              <span className="font-serif font-bold text-sm text-[#141414]">
                £{(service.base_price_minor / 100).toFixed(2)}
              </span>
            </div>

            {/* Date Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#141414] uppercase tracking-wider block">Select Date</label>
              <div className="grid grid-cols-3 gap-2">
                {['2026-09-24', '2026-09-25', '2026-09-26'].map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDate(d)}
                    className={`p-3 rounded-xl border text-xs font-medium transition-all text-center ${
                      selectedDate === d
                        ? 'border-[#141414] bg-[#141414] text-white'
                        : 'border-[#E7E5E1] bg-white text-[#6B6B6B] hover:border-[#141414]'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slot Grid */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#141414] uppercase tracking-wider block">Available Slots</label>
              <div className="grid grid-cols-4 gap-2">
                {slots.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSlot(s)}
                    className={`py-2 px-1 rounded-lg border text-xs font-mono transition-all text-center ${
                      selectedSlot === s
                        ? 'border-[#141414] bg-[#141414] text-white shadow-sm'
                        : 'border-[#E7E5E1] bg-white text-[#6B6B6B] hover:border-[#141414]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Footer */}
            <div className="pt-4 border-t border-[#E7E5E1] space-y-3">
              <button
                onClick={handleConfirm}
                className="w-full py-3.5 bg-[#141414] hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold uppercase tracking-widest transition-all"
              >
                Confirm Appointment (£{(service.base_price_minor / 100).toFixed(2)})
              </button>
              <p className="text-[10px] text-[#9A9892] text-center flex items-center justify-center gap-1">
                <Shield className="w-3 h-3" /> No-Show Protection &amp; Free Cancellation within 24h
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
