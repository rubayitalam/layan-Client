import { CustomerDashboardLayout } from '@/components/customer/CustomerDashboardLayout';
import { MessageSquare, Send } from 'lucide-react';
import { DevBadge } from '@/components/common/DevBadge';

export default function CustomerMessagesPage() {
  return (
    <CustomerDashboardLayout>
      <div className="space-y-6">
        <div className="border-b border-[#E7E5E1] pb-4">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-[#9A9892]">In-App Chat</span>
            <DevBadge />
          </div>
          <h1 className="font-serif text-3xl font-semibold text-[#141414] mt-1">Messages</h1>
        </div>

        <div className="border border-[#E7E5E1] rounded-2xl overflow-hidden h-[450px] flex flex-col">
          {/* Thread Header */}
          <div className="p-4 bg-[#F7F6F3] border-b border-[#E7E5E1] flex items-center justify-between">
            <div>
              <p className="font-semibold text-xs text-[#141414]">Salon Studio Mayfair</p>
              <p className="text-[10px] text-[#6B6B6B]">Regarding Appointment #app1</p>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-white text-xs">
            <div className="max-w-xs p-3 rounded-2xl bg-[#F7F6F3] text-[#141414]">
              Hello Alexandra! Looking forward to seeing you this Friday for your Precision Cut.
            </div>
            <div className="max-w-xs p-3 rounded-2xl bg-[#141414] text-white ml-auto">
              Hi Sofia! Is parking available nearby?
            </div>
            <div className="max-w-xs p-3 rounded-2xl bg-[#F7F6F3] text-[#141414]">
              Yes, NCP parking on Mount Street is 2 mins walk away!
            </div>
          </div>

          {/* Input Box */}
          <div className="p-3 bg-[#F7F6F3] border-t border-[#E7E5E1] flex items-center gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-[#E7E5E1] bg-white text-xs text-[#141414] focus:outline-none"
            />
            <button className="p-2.5 bg-[#141414] text-white rounded-xl hover:bg-neutral-800 transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </CustomerDashboardLayout>
  );
}
