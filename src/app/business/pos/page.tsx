'use client';

import React, { useState } from 'react';
import { BusinessDashboardLayout } from '@/components/business/BusinessDashboardLayout';
import { useServices } from '@/features/services/useServices';
import { useCreatePayment } from '@/features/payments/usePayments';
import { useCreateAppointment } from '@/features/appointments/useAppointments';
import { DollarSign, CheckCircle2, ShoppingBag, Plus, Loader2, Sparkles, Check } from 'lucide-react';
import { DevBadge } from '@/components/common/DevBadge';

export default function BusinessPOSPage() {
  const { data: services = [] } = useServices('business-001');
  const createPayment = useCreatePayment();
  const createAppointment = useCreateAppointment();

  const [cartItems, setCartItems] = useState<Array<{ name: string; priceMinor: number }>>([
    { name: 'Precision Cut & Styling', priceMinor: 3500 },
    { name: 'Keratin Restorative Mask', priceMinor: 2000 }
  ]);
  const [tipMinor, setTipMinor] = useState(500);
  const [isProcessing, setIsProcessing] = useState(false);
  const [receipt, setReceipt] = useState<{ appointmentId: string; paymentId: string; total: number } | null>(null);

  const subtotal = cartItems.reduce((acc, item) => acc + item.priceMinor, 0);
  const grandTotal = subtotal + tipMinor;

  const addItem = (name: string, priceMinor: number) => {
    setCartItems([...cartItems, { name, priceMinor }]);
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      // 1. Create walk-in appointment record
      const appRes = await createAppointment.mutateAsync({
        business_id: 'business-001',
        staff_id: 'staff-001',
        customer_id: 'pos-customer',
        start_at: new Date().toISOString(),
        end_at: new Date(Date.now() + 30 * 60000).toISOString(),
        status: 'attended',
        total_price_minor: grandTotal,
        notes: `In-Store POS Checkout: ${cartItems.map(i => i.name).join(', ')}`
      });

      const appId = appRes.data?._id || 'app-pos';

      // 2. Create Payment record linked to this appointment
      const payRes = await createPayment.mutateAsync({
        type: 'full_payment',
        status: 'succeeded',
        amount_minor: grandTotal,
        appointment_id: appId
      });

      const payId = (payRes as any)?.data?._id || 'pay-pos';

      setReceipt({
        appointmentId: appId,
        paymentId: payId,
        total: grandTotal
      });
    } catch (err: any) {
      alert(err.message || 'Checkout failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <BusinessDashboardLayout>
      <div className="space-y-6">
        <div className="border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">In-Store Register</span>
            <DevBadge />
          </div>
          <h1 className="font-serif text-3xl font-semibold text-white mt-1">Fast POS Checkout</h1>
        </div>

        {receipt ? (
          <div className="bg-neutral-900 border border-emerald-500/30 rounded-3xl p-8 max-w-xl mx-auto text-center space-y-5 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center">
              <Check className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-white">Payment Succeeded &amp; Recorded!</h2>
            <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 space-y-2 text-xs font-mono text-neutral-300 text-left">
              <p className="flex justify-between">
                <span>Appointment Record ID:</span>
                <span className="text-emerald-400 font-bold">{receipt.appointmentId}</span>
              </p>
              <p className="flex justify-between">
                <span>Payment Record ID:</span>
                <span className="text-emerald-400 font-bold">{receipt.paymentId}</span>
              </p>
              <p className="flex justify-between border-t border-neutral-800 pt-2 font-serif text-sm text-white">
                <span>Total Settled:</span>
                <span className="font-bold">£{(receipt.total / 100).toFixed(2)}</span>
              </p>
            </div>
            <button
              onClick={() => {
                setReceipt(null);
                setCartItems([]);
              }}
              className="w-full py-3 bg-white text-neutral-950 font-semibold rounded-xl text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors"
            >
              Start Next Transaction
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-4">
              <h3 className="font-serif text-lg font-semibold text-white">Select Service or Retail Add-on</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                {services.map((s) => (
                  <button
                    key={s._id}
                    onClick={() => addItem(s.name, s.base_price_minor)}
                    className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-left hover:border-neutral-500 transition-all space-y-1"
                  >
                    <p className="font-semibold text-white truncate">{s.name}</p>
                    <p className="text-emerald-400 font-mono">£{(s.base_price_minor / 100).toFixed(2)}</p>
                  </button>
                ))}
                <button
                  onClick={() => addItem('Styling Pomade Matte', 1800)}
                  className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-left hover:border-neutral-500 transition-all space-y-1"
                >
                  <p className="font-semibold text-white">Matte Clay Pomade</p>
                  <p className="text-emerald-400 font-mono">£18.00 (Retail)</p>
                </button>
                <button
                  onClick={() => addItem('Beard Conditioning Oil', 1500)}
                  className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-left hover:border-neutral-500 transition-all space-y-1"
                >
                  <p className="font-semibold text-white">Organic Beard Oil</p>
                  <p className="text-emerald-400 font-mono">£15.00 (Retail)</p>
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-6">
              <h3 className="font-serif text-xl font-semibold text-white">Order Summary</h3>
              {cartItems.length === 0 ? (
                <p className="text-xs text-neutral-500 italic py-4">No items added yet. Click an item to add.</p>
              ) : (
                <div className="space-y-2 text-xs border-b border-neutral-800 pb-4">
                  {cartItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-neutral-300">
                      <span>{item.name}</span>
                      <span className="font-mono">£{(item.priceMinor / 100).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-neutral-400 pt-2 border-t border-neutral-800">
                    <span>Stylist Gratuity</span>
                    <span className="font-mono">£{(tipMinor / 100).toFixed(2)}</span>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center text-lg font-bold font-serif text-white">
                <span>Total Due</span>
                <span className="font-mono">£{(grandTotal / 100).toFixed(2)}</span>
              </div>

              <button
                disabled={isProcessing || cartItems.length === 0}
                onClick={handleCheckout}
                className="w-full py-4 bg-white text-[#141414] hover:bg-neutral-200 disabled:opacity-50 rounded-xl text-xs font-semibold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Processing Payment...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Complete Checkout (Tap to Pay)
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </BusinessDashboardLayout>
  );
}
