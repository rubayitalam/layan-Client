'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/AuthContext';
import { 
  Calendar, 
  Wallet, 
  Heart, 
  MessageSquare, 
  Award, 
  Settings, 
  LogOut, 
  ArrowLeft, 
  ShieldAlert,
  User as UserIcon,
  Sparkles
} from 'lucide-react';

export const CustomerDashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const navItems = [
    { label: 'My Appointments', href: '/dashboard', icon: Calendar },
    { label: 'Wallet & Cards', href: '/dashboard/wallet', icon: Wallet },
    { label: 'Favourites', href: '/dashboard/favourites', icon: Heart },
    { label: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
    { label: 'Loyalty & Rewards', href: '/dashboard/loyalty', icon: Award },
    { label: 'Account Settings', href: '/dashboard/settings', icon: Settings },
  ];

  if (!loading && !user) {
    return (
      <div className="min-h-screen bg-[#F7F6F3] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white border border-[#E7E5E1] rounded-3xl p-8 text-center space-y-6 shadow-xl">
          <div className="w-14 h-14 rounded-full bg-neutral-100 text-[#141414] mx-auto flex items-center justify-center">
            <UserIcon className="w-7 h-7 text-[#141414]" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#141414]">Sign In Required</h2>
            <p className="text-xs text-[#6B6B6B] mt-2">
              Please sign in to view your appointments, wallet credits, and loyalty rewards.
            </p>
          </div>
          <div className="space-y-3">
            <Link
              href="/login"
              className="w-full py-3.5 bg-[#141414] text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors block text-center"
            >
              Sign In to Your Account
            </Link>
            <Link
              href="/"
              className="w-full py-3 border border-[#E7E5E1] text-[#6B6B6B] hover:text-[#141414] rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F6F3]">
      {/* Top Header Navigation */}
      <header className="bg-white border-b border-[#E7E5E1] px-6 lg:px-8 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-[#6B6B6B] hover:text-[#141414] transition-colors flex items-center gap-1.5 text-xs font-medium mr-2">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Marketplace</span>
            </Link>
            <div className="h-4 w-px bg-[#E7E5E1] hidden sm:block" />
            <Link href="/" className="font-serif text-xl tracking-widest font-bold text-[#141414]">
              LAYAN
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/search" className="text-xs font-medium text-[#6B6B6B] hover:text-[#141414] hidden md:flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#D9CBB8]" /> Book New Service
            </Link>
            <button
              onClick={handleLogout}
              id="customer-header-logout-btn"
              className="px-3 py-1.5 rounded-xl border border-[#E7E5E1] hover:border-rose-300 hover:text-rose-600 text-[#6B6B6B] transition-colors flex items-center gap-1.5 text-xs font-medium"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-[#E7E5E1] space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#141414] text-white flex items-center justify-center font-serif text-lg font-bold">
                {user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="overflow-hidden">
                <h3 className="font-semibold text-sm text-[#141414] truncate">{user?.email || 'Customer'}</h3>
                <p className="text-xs text-[#6B6B6B]">Member since 2026</p>
              </div>
            </div>
            <div className="pt-4 border-t border-[#E7E5E1] text-xs space-y-1">
              <p className="text-[#9A9892]">Layan Points: <span className="font-mono text-[#141414] font-semibold">450 pts</span></p>
              <p className="text-[#9A9892]">Wallet Balance: <span className="font-mono text-[#141414] font-semibold">£25.00</span></p>
            </div>
          </div>

          <nav className="bg-white rounded-3xl border border-[#E7E5E1] p-3 space-y-1 shadow-sm">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-medium text-[#6B6B6B] hover:text-[#141414] hover:bg-[#F7F6F3] transition-all"
                >
                  <Icon className="w-4 h-4 text-[#9A9892]" />
                  {item.label}
                </Link>
              );
            })}

            <div className="pt-3 mt-3 border-t border-[#E7E5E1] space-y-1">
              <Link
                href="/"
                className="flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-medium text-[#6B6B6B] hover:text-[#141414] hover:bg-[#F7F6F3] transition-colors"
              >
                <ArrowLeft className="w-4 h-4 text-[#9A9892]" />
                <span>Back to Home</span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="lg:col-span-9 bg-white p-6 lg:p-8 rounded-3xl border border-[#E7E5E1] space-y-8 shadow-sm">
          {children}
        </main>
      </div>
    </div>
  );
};
