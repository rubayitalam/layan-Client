'use client';

import React, { useState, useEffect } from 'react';
import { Service, Staff, Appointment } from '@/types/api';
import { X, Calendar as CalendarIcon, Clock, Check, Shield, FileText, CreditCard, Sparkles } from 'lucide-react';
import { DevBadge } from '@/components/common/DevBadge';
import { ApiClient } from '@/lib/apiClient';

interface BookingFlowModalProps {
  service: Service;
  staff: Staff;
  businessId: string;
  onClose: () => void;
}

export const BookingFlowModal: React.FC<BookingFlowModalProps> = ({ service, staff, businessId, onClose }) => {
  const [step, setStep] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState<string>('2026-09-25');
  const [selectedSlot, setSelectedSlot] = useState<string>('10:00 AM');
  const [consultationAnswer, setConsultationAnswer] = useState<string>('No allergies, scalp normal.');
  const [promoCode, setPromoCode] = useState<string>('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [createdAppointmentId, setCreatedAppointmentId] = useState<string | null>(null);
  const [createdPaymentId, setCreatedPaymentId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Draft persistence in localStorage
  useEffect(() => {
    const savedDraft = localStorage.getItem(`layan_booking_draft_${service._id}`);
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        setSelectedDate(parsed.selectedDate || '2026-09-25');
        setSelectedSlot(parsed.selectedSlot || '10:00 AM');
        setStep(parsed.step || 1);
      } catch (e) {
        console.error(e);
      }
    }
  }, [service._id]);

  const saveDraft = (currentStep: number, date: string, slot: string) => {
    localStorage.setItem(
      `layan_booking_draft_${service._id}`,
      JSON.stringify({ step: currentStep, selectedDate: date, selectedSlot: slot })
    );
  };

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'LAYAN5') {
      setAppliedDiscount(500); // £5.00 off
    }
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);

    const finalPrice = Math.max(0, service.base_price_minor - appliedDiscount);

    // 1. Create Appointment Record
    const appRes = await ApiClient.post<Appointment>('/appointment', {
      business_id: businessId,
      staff_id: staff._id,
      customer_id: 'c1',
      start_at: `${selectedDate}T10:00:00Z`,
      end_at: `${selectedDate}T10:45:00Z`,
      status: 'confirmed',
      total_price_minor: finalPrice,
      notes: consultationAnswer
    });

    if (!appRes.success || !appRes.data?._id) {
      setIsSubmitting(false);
      alert(appRes.message || 'Failed to create appointment on backend.');
      return;
    }
    const appRecordId = appRes.data._id;
    setCreatedAppointmentId(appRecordId);

    // 2. Create Payment Record via live Express backend
    const payRes = await ApiClient.post<{ _id: string }>('/payment', {
      type: 'full_payment',
      status: 'succeeded',
      amount_minor: finalPrice,
      appointment_id: appRecordId
    });

    if (!payRes.success || !payRes.data?._id) {
      setIsSubmitting(false);
      alert(payRes.message || 'Failed to create payment record on backend.');
      return;
    }
    const payRecordId = payRes.data._id;
    setCreatedPaymentId(payRecordId);

    // Clear Draft
    localStorage.removeItem(`layan_booking_draft_${service._id}`);

    setIsSubmitting(false);
    setStep(5); // Go to Confirmation
  };

  const slots = ['09:00 AM', '10:00 AM', '11:15 AM', '01:30 PM', '03:00 PM'];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-[#E7E5E1] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header Stepper */}
        <div className="p-6 border-b border-[#E7E5E1] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono uppercase tracking-widest text-[#9A9892]">
                Booking Step {step} of 5
              </span>
              <DevBadge />
            </div>
            <h3 className="font-serif text-xl font-semibold text-[#141414] mt-0.5">
              {step === 1 && '1. Choose Date & Slot'}
              {step === 2 && '2. Consultation Form'}
              {step === 3 && '3. Promo & Credits'}
              {step === 4 && '4. Payment & Review'}
              {step === 5 && '5. Confirmation'}
            </h3>
          </div>
          <button onClick={onClose} className="p-2 text-[#6B6B6B] hover:text-[#141414] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Slot Picker */}
        {step === 1 && (
          <div className="p-6 space-y-6">
            <div className="p-4 rounded-xl bg-[#F7F6F3] border border-[#E7E5E1] flex justify-between items-center text-xs">
              <div>
                <p className="font-semibold text-[#141414]">{service.name}</p>
                <p className="text-[#6B6B6B]">Stylist: {staff.display_name}</p>
              </div>
              <span className="font-serif font-bold text-sm text-[#141414]">
                £{(service.base_price_minor / 100).toFixed(2)}
              </span>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#141414] uppercase tracking-wider block">Date</label>
              <div className="grid grid-cols-3 gap-2">
                {['2026-09-24', '2026-09-25', '2026-09-26'].map((d) => (
                  <button
                    key={d}
                    onClick={() => {
                      setSelectedDate(d);
                      saveDraft(1, d, selectedSlot);
                    }}
                    className={`p-3 rounded-xl border text-xs font-medium transition-all ${
                      selectedDate === d ? 'border-[#141414] bg-[#141414] text-white' : 'border-[#E7E5E1] bg-white text-[#6B6B6B]'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#141414] uppercase tracking-wider block">Available Slots</label>
              <div className="grid grid-cols-3 gap-2">
                {slots.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSelectedSlot(s);
                      saveDraft(1, selectedDate, s);
                    }}
                    className={`py-2 px-1 rounded-lg border text-xs font-mono transition-all ${
                      selectedSlot === s ? 'border-[#141414] bg-[#141414] text-white' : 'border-[#E7E5E1] bg-white text-[#6B6B6B]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setStep(2);
                saveDraft(2, selectedDate, selectedSlot);
              }}
              className="w-full py-3.5 bg-[#141414] text-white rounded-xl text-xs font-semibold uppercase tracking-widest hover:bg-neutral-800 transition-colors"
            >
              Next: Consultation Form
            </button>
          </div>
        )}

        {/* Step 2: Consultation Form */}
        {step === 2 && (
          <div className="p-6 space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 flex items-center gap-2">
              <FileText className="w-4 h-4 shrink-0" />
              <span>Studio Hair &amp; Scalp Consent Questionnaire</span>
            </div>
            <div>
              <label className="font-semibold text-[#141414] uppercase tracking-wider block mb-1">
                Any scalp sensitivities or chemical treatment history?
              </label>
              <textarea
                value={consultationAnswer}
                onChange={(e) => setConsultationAnswer(e.target.value)}
                className="w-full p-3 rounded-xl border border-[#E7E5E1] text-xs text-[#141414] focus:outline-none focus:border-[#141414]"
                rows={3}
              />
            </div>
            <div className="flex gap-2 pt-4">
              <button onClick={() => setStep(1)} className="w-1/3 py-3 border border-[#E7E5E1] rounded-xl font-semibold">Back</button>
              <button onClick={() => setStep(3)} className="w-2/3 py-3 bg-[#141414] text-white rounded-xl font-semibold uppercase tracking-wider">Next: Promo Code</button>
            </div>
          </div>
        )}

        {/* Step 3: Promo & Gift Cards */}
        {step === 3 && (
          <div className="p-6 space-y-4 text-xs">
            <div>
              <label className="font-semibold text-[#141414] uppercase tracking-wider block mb-1">Apply Gift Card or Promo Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter LAYAN5"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-[#E7E5E1] focus:outline-none"
                />
                <button onClick={handleApplyPromo} className="px-4 py-2.5 bg-[#141414] text-white rounded-xl font-semibold">Apply</button>
              </div>
              {appliedDiscount > 0 && (
                <p className="text-emerald-600 font-semibold mt-2">✓ Promo LAYAN5 Applied: £5.00 Discount</p>
              )}
            </div>
            <div className="flex gap-2 pt-4">
              <button onClick={() => setStep(2)} className="w-1/3 py-3 border border-[#E7E5E1] rounded-xl font-semibold">Back</button>
              <button onClick={() => setStep(4)} className="w-2/3 py-3 bg-[#141414] text-white rounded-xl font-semibold uppercase tracking-wider">Next: Payment Review</button>
            </div>
          </div>
        )}

        {/* Step 4: Final Payment Review */}
        {step === 4 && (
          <div className="p-6 space-y-4 text-xs">
            <div className="space-y-2 border-b border-[#E7E5E1] pb-4">
              <div className="flex justify-between text-[#6B6B6B]"><span>Service Base</span><span>£{(service.base_price_minor / 100).toFixed(2)}</span></div>
              <div className="flex justify-between text-emerald-600"><span>Discount</span><span>-£{(appliedDiscount / 100).toFixed(2)}</span></div>
              <div className="flex justify-between font-serif font-bold text-base text-[#141414] pt-2">
                <span>Total Due</span>
                <span>£{((service.base_price_minor - appliedDiscount) / 100).toFixed(2)}</span>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={() => setStep(3)} className="w-1/3 py-3 border border-[#E7E5E1] rounded-xl font-semibold">Back</button>
              <button
                disabled={isSubmitting}
                onClick={handleFinalSubmit}
                className="w-2/3 py-3 bg-[#141414] text-white rounded-xl font-semibold uppercase tracking-wider flex items-center justify-center gap-1"
              >
                <CreditCard className="w-4 h-4" /> {isSubmitting ? 'Processing...' : 'Pay & Confirm'}
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Confirmation */}
        {step === 5 && (
          <div className="p-8 text-center space-y-4 text-xs">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 mx-auto flex items-center justify-center">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="font-serif text-2xl font-semibold text-[#141414]">Booking &amp; Payment Complete!</h4>
            <div className="bg-[#F7F6F3] p-4 rounded-xl border border-[#E7E5E1] space-y-1 font-mono text-[11px] text-[#141414]">
              <p>Appointment ID: <span className="font-bold text-emerald-600">{createdAppointmentId}</span></p>
              <p>Payment ID: <span className="font-bold text-emerald-600">{createdPaymentId}</span></p>
              <p>Date: {selectedDate} at {selectedSlot}</p>
            </div>
            <button onClick={onClose} className="w-full py-3 bg-[#141414] text-white rounded-xl font-semibold uppercase tracking-wider">
              Close &amp; View in Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
