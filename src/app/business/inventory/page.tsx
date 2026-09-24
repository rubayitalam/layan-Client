import { BusinessDashboardLayout } from '@/components/business/BusinessDashboardLayout';
import { Package, AlertCircle } from 'lucide-react';
import { DevBadge } from '@/components/common/DevBadge';

export default function BusinessInventoryPage() {
  return (
    <BusinessDashboardLayout>
      <div className="space-y-6">
        <div className="border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">Stock Control</span>
            <DevBadge />
          </div>
          <h1 className="font-serif text-3xl font-semibold text-white mt-1">Inventory &amp; Stock Movements</h1>
        </div>

        <div className="space-y-3">
          {[
            { item: 'Layan Keratin Shampoo (1000ml)', stock: 12, threshold: 5, price: '£30.00' },
            { item: 'Precision Foil Packs (100ct)', stock: 3, threshold: 5, price: '£15.00', alert: true }
          ].map((i, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-between text-xs">
              <div>
                <h3 className="font-semibold text-white text-sm">{i.item}</h3>
                <p className="text-neutral-400">Price: {i.price} · In Stock: {i.stock} units</p>
              </div>
              {i.alert ? (
                <span className="px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 text-[10px] font-mono flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Low Stock Threshold
                </span>
              ) : (
                <span className="text-neutral-400 font-mono">Stock Normal</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </BusinessDashboardLayout>
  );
}
