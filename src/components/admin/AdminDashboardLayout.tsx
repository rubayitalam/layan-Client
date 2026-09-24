'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/AuthContext';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Building, 
  FileText, 
  Activity, 
  LogOut, 
  ArrowLeft,
  ShieldAlert
} from 'lucide-react';

export const AdminDashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const navItems = [
    { label: 'Platform Overview', href: '/admin', icon: Activity },
    { label: 'Verification Queue', href: '/admin/verification', icon: ShieldCheck },
    { label: 'Disputes Resolution', href: '/admin/disputes', icon: AlertTriangle },
    { label: 'Fraud Detection', href: '/admin/fraud', icon: AlertTriangle },
    { label: 'Action Logs', href: '/admin/logs', icon: FileText },
  ];

  if (!loading && (!user || user.user_type !== 'admin')) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-14 h-14 rounded-full bg-rose-500/10 text-rose-400 mx-auto flex items-center justify-center">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-white">Administrator Access Required</h2>
            <p className="text-xs text-slate-400 mt-2">
              This area is restricted to platform administrators. Please sign in with verified administrative credentials.
            </p>
          </div>
          <div className="space-y-3">
            <Link
              href="/login"
              className="w-full py-3.5 bg-white text-slate-950 rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-slate-200 transition-colors block text-center"
            >
              Sign In to Admin Portal
            </Link>
            <Link
              href="/"
              className="w-full py-3 border border-slate-800 text-slate-400 hover:text-white rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-6 lg:px-8 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium mr-2">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Marketplace</span>
          </Link>
          <div className="h-4 w-px bg-slate-800 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg tracking-widest font-bold text-white">LAYAN</span>
            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[10px] font-mono border border-amber-500/20">
              INTERNAL ADMIN CONTROL
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <span className="text-slate-400 font-mono hidden md:inline">{user?.email}</span>
          <button
            onClick={handleLogout}
            id="admin-logout-btn"
            className="px-3.5 py-1.5 rounded-xl border border-slate-800 hover:border-rose-500/50 hover:bg-rose-500/10 text-slate-300 hover:text-rose-400 transition-all flex items-center gap-1.5 font-medium"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 border-r border-slate-800 min-h-[calc(100vh-65px)] p-4 flex flex-col justify-between shrink-0 bg-slate-900/30">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-100 hover:bg-slate-900 transition-all"
                >
                  <Icon className="w-4 h-4 text-slate-500" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-slate-800 space-y-2">
            <Link
              href="/"
              className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
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

        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
