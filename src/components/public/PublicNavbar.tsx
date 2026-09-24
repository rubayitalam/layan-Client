'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/AuthContext';
import { Search, Sparkles, LogOut, LayoutDashboard } from 'lucide-react';

export const PublicNavbar: React.FC = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const getDashboardHref = () => {
    if (!user) return '/login';
    if (user.user_type === 'owner' || user.user_type === 'staff') return '/business';
    if (user.user_type === 'admin') return '/admin';
    return '/dashboard';
  };

  const getForSalonsHref = () => {
    if (!user) return '/login';
    if (user.user_type === 'owner' || user.user_type === 'staff') return '/business';
    return '/register';
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E7E5E1] transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-serif text-2xl tracking-widest font-semibold text-[#141414] uppercase">
            LAYAN
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#141414] group-hover:bg-[#D9CBB8] transition-colors" />
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-[#6B6B6B]">
          <Link href="/search" className="hover:text-[#141414] transition-colors flex items-center gap-1.5">
            <Search className="w-4 h-4" />
            Explore Salons
          </Link>
          <Link href="/feed" className="hover:text-[#141414] transition-colors flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#D9CBB8]" />
            Discovery Feed
          </Link>
          <Link href="/b/london-grooming" className="hover:text-[#141414] transition-colors">
            Featured Studio
          </Link>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {user ? (
            /* Logged In State */
            <div className="flex items-center gap-3">
              <Link
                href={getDashboardHref()}
                id="nav-dashboard-link"
                className="px-4 py-2 bg-[#F7F6F3] border border-[#E7E5E1] hover:border-[#141414] rounded-xl text-xs font-semibold text-[#141414] flex items-center gap-2 transition-all shadow-sm"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-[#141414]" />
                <span>Dashboard</span>
              </Link>

              <button
                onClick={handleLogout}
                id="nav-logout-btn"
                title="Log Out"
                className="px-3 py-2 rounded-xl border border-[#E7E5E1] hover:border-rose-300 hover:text-rose-600 text-[#6B6B6B] transition-colors flex items-center gap-1.5 text-xs font-medium"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Log Out</span>
              </button>
            </div>
          ) : (
            /* Logged Out State */
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href={getForSalonsHref()}
                className="hidden lg:inline-flex text-xs font-semibold uppercase tracking-wider text-[#6B6B6B] hover:text-[#141414] transition-colors mr-2"
              >
                For Salons
              </Link>
              <Link
                href="/login"
                id="nav-login-link"
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#141414] hover:bg-[#F7F6F3] border border-transparent hover:border-[#E7E5E1] transition-all"
              >
                Log In
              </Link>
              <Link
                href="/register"
                id="nav-signup-link"
                className="px-5 py-2.5 rounded-xl bg-[#141414] hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
