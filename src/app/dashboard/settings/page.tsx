import { CustomerDashboardLayout } from '@/components/customer/CustomerDashboardLayout';
import { User, Save } from 'lucide-react';

export default function CustomerSettingsPage() {
  return (
    <CustomerDashboardLayout>
      <div className="space-y-6">
        <div className="border-b border-[#E7E5E1] pb-4">
          <h1 className="font-serif text-3xl font-semibold text-[#141414]">Account Settings</h1>
        </div>

        <form className="max-w-md space-y-4 text-xs">
          <div>
            <label className="font-semibold text-[#141414] uppercase tracking-wider block mb-1">Full Name</label>
            <input
              type="text"
              defaultValue="Alexandra Reed"
              className="w-full px-4 py-3 rounded-xl border border-[#E7E5E1] text-[#141414] focus:outline-none focus:border-[#141414]"
            />
          </div>
          <div>
            <label className="font-semibold text-[#141414] uppercase tracking-wider block mb-1">Email</label>
            <input
              type="email"
              defaultValue="alexandra@example.com"
              className="w-full px-4 py-3 rounded-xl border border-[#E7E5E1] text-[#141414] focus:outline-none focus:border-[#141414]"
            />
          </div>
          <div>
            <label className="font-semibold text-[#141414] uppercase tracking-wider block mb-1">Phone</label>
            <input
              type="tel"
              defaultValue="+44 7700 900123"
              className="w-full px-4 py-3 rounded-xl border border-[#E7E5E1] text-[#141414] focus:outline-none focus:border-[#141414]"
            />
          </div>
          <button
            type="button"
            className="py-3 px-6 bg-[#141414] text-white rounded-xl font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </form>
      </div>
    </CustomerDashboardLayout>
  );
}
