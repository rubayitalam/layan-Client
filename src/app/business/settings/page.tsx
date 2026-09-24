import { BusinessDashboardLayout } from '@/components/business/BusinessDashboardLayout';
import { Store, Save } from 'lucide-react';

export default function BusinessSettingsPage() {
  return (
    <BusinessDashboardLayout>
      <div className="space-y-6">
        <div className="border-b border-neutral-800 pb-4">
          <h1 className="font-serif text-3xl font-semibold text-white">Studio Profile Settings</h1>
        </div>

        <form className="max-w-xl space-y-4 text-xs text-neutral-300">
          <div>
            <label className="font-semibold text-white uppercase tracking-wider block mb-1">Display Name</label>
            <input
              type="text"
              defaultValue="Salon Studio"
              className="w-full px-4 py-3 rounded-xl border border-neutral-800 bg-neutral-900 text-white focus:outline-none focus:border-white"
            />
          </div>
          <div>
            <label className="font-semibold text-white uppercase tracking-wider block mb-1">Category</label>
            <input
              type="text"
              defaultValue="Hair Salon & Styling"
              className="w-full px-4 py-3 rounded-xl border border-neutral-800 bg-neutral-900 text-white focus:outline-none focus:border-white"
            />
          </div>
          <div>
            <label className="font-semibold text-white uppercase tracking-wider block mb-1">Cancellation Window (Hours)</label>
            <input
              type="number"
              defaultValue="24"
              className="w-full px-4 py-3 rounded-xl border border-neutral-800 bg-neutral-900 text-white focus:outline-none focus:border-white"
            />
          </div>
          <button
            type="button"
            className="py-3 px-6 bg-white text-[#141414] rounded-xl font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Settings
          </button>
        </form>
      </div>
    </BusinessDashboardLayout>
  );
}
