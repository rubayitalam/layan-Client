'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/AuthContext';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Scissors, 
  ShoppingBag, 
  Megaphone, 
  Star, 
  Settings, 
  DollarSign, 
  Store, 
  LogOut, 
  ArrowLeft, 
  ShieldAlert,
  UserCheck
} from 'lucide-react';

export const BusinessDashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const navItems = [
    { label: 'Overview', href: '/business', icon: LayoutDashboard },
    { label: 'Calendar & Waitlist', href: '/business/calendar', icon: Calendar },
    { label: 'Fast POS Checkout', href: '/business/pos', icon: DollarSign },
    { label: 'Services Catalogue', href: '/business/services', icon: Scissors },
    { label: 'Staff & Team', href: '/business/staff', icon: Users },
    { label: 'Customer CRM', href: '/business/customers', icon: Users },
    { label: 'Marketing & Promos', href: '/business/marketing', icon: Megaphone },
    { label: 'Reviews & Score', href: '/business/reviews', icon: Star },
    { label: 'Studio Settings', href: '/business/settings', icon: Settings },
  ];

  // If unauthenticated or not an owner/staff/admin
  if (!loading && (!user || (user.user_type !== 'owner' && user.user_type !== 'staff' && user.user_type !== 'admin'))) {
    return (
      <div className="min-h-screen bg-[#141414] text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-14 h-14 rounded-full bg-amber-500/10 text-amber-400 mx-auto flex items-center justify-center">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-white">Salon Owner Access Required</h2>
            <p className="text-xs text-neutral-400 mt-2">
              Please sign in with a registered salon owner or manager account to manage bookings, staff, and register.
            </p>
          </div>
          <div className="space-y-3">
            <Link
              href="/login"
              className="w-full py-3.5 bg-white text-[#141414] rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-colors block text-center"
            >
              Sign In to Business Portal
            </Link>
            <Link
              href="/"
              className="w-full py-3 border border-neutral-800 text-neutral-400 hover:text-white rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      {/* Top Header */}
      <header className="border-b border-neutral-800 bg-neutral-900/80 backdrop-blur-md px-6 lg:px-8 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium mr-2">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Marketplace</span>
          </Link>
          <div className="h-4 w-px bg-neutral-800 hidden sm:block" />
          <Link href="/business" className="font-serif text-lg tracking-widest font-bold flex items-center gap-2">
            LAYAN <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-normal">BUSINESS</span>
          </Link>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <Link href="/b/london-grooming" className="text-neutral-400 hover:text-white hidden md:flex items-center gap-1.5">
            <Store className="w-3.5 h-3.5" /> View Public Page
          </Link>
          <button
            onClick={handleLogout}
            id="business-logout-btn"
            className="px-3.5 py-1.5 rounded-xl border border-neutral-800 hover:border-rose-500/50 hover:bg-rose-500/10 text-neutral-300 hover:text-rose-400 transition-all flex items-center gap-1.5 font-medium"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-neutral-800 min-h-[calc(100vh-65px)] p-4 flex flex-col justify-between shrink-0 bg-neutral-950/50">
          <div className="space-y-4">
            {/* Owner Info Card */}
            <div className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-neutral-800 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {user?.email ? user.email.charAt(0).toUpperCase() : 'O'}
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-semibold text-white truncate">{user?.email || 'Salon Owner'}</p>
                  <p className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Verified Studio
                  </p>
                </div>
              </div>
            </div>

            {/* Nav Links */}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-900 transition-all"
                  >
                    <Icon className="w-4 h-4 text-neutral-500" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer */}
          <div className="pt-4 border-t border-neutral-800 space-y-2">
            <Link
              href="/"
              className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </aside>

        {/* Main Workspace */}
        <main className="flex-1 p-6 lg:p-8 bg-[#141414] overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
