'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ApiClient } from '@/lib/apiClient';
import { useAuth } from '@/features/auth/AuthContext';
import { AppUser } from '@/types/api';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await ApiClient.post<{ token: string; user: AppUser }>('/auth/login', { email, password });
    
    if (res.success && res.data) {
      login(res.data.token, res.data.user);
      const role = res.data.user.user_type;
      if (role === 'owner' || role === 'staff') router.push('/business');
      else if (role === 'admin') router.push('/admin');
      else router.push('/dashboard');
    } else {
      setError(res.message || 'Invalid email or password.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F7F6F3] flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full mb-4">
        <Link 
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B6B6B] hover:text-[#141414] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Marketplace
        </Link>
      </div>

      <div className="max-w-md w-full bg-white rounded-3xl border border-[#E7E5E1] p-8 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <span className="font-serif text-3xl font-bold tracking-widest text-[#141414] uppercase">LAYAN</span>
          <h1 className="font-serif text-2xl font-semibold text-[#141414]">Welcome Back</h1>
          <p className="text-xs text-[#6B6B6B]">Enter your credentials to access your account.</p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 text-xs text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#141414] uppercase tracking-wider block mb-1">Email</label>
            <input
              type="email"
              required
              id="login-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alexandra@example.com"
              className="w-full px-4 py-3 rounded-xl border border-[#E7E5E1] text-xs text-[#141414] focus:outline-none focus:border-[#141414]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#141414] uppercase tracking-wider block mb-1">Password</label>
            <input
              type="password"
              required
              id="login-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-[#E7E5E1] text-xs text-[#141414] focus:outline-none focus:border-[#141414]"
            />
          </div>

          <button
            type="submit"
            id="login-submit-btn"
            disabled={loading}
            className="w-full py-3.5 bg-[#141414] hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'Signing In...' : 'Sign In'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-4 border-t border-[#E7E5E1] text-xs text-[#6B6B6B]">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-semibold text-[#141414] hover:underline">
            Register Here
          </Link>
        </div>
      </div>
    </div>
  );
}
