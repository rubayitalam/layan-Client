'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ApiClient } from '@/lib/apiClient';
import { useAuth } from '@/features/auth/AuthContext';
import { AppUser } from '@/types/api';
import { ArrowRight, ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [userType, setUserType] = useState<'customer' | 'owner'>('customer');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    const res = await ApiClient.post<{ token: string; user: AppUser }>('/auth/register', {
      email,
      password,
      phone,
      user_type: userType
    });

    if (res.success && res.data) {
      setSuccessMessage(`Account created successfully! Redirecting...`);
      login(res.data.token, res.data.user);
      setTimeout(() => {
        if (userType === 'owner') router.push('/business');
        else router.push('/dashboard');
      }, 500);
    } else {
      setErrorMessage(res.message || 'Registration failed. Please check your credentials.');
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
          <h1 className="font-serif text-2xl font-semibold text-[#141414]">Create Account</h1>
          <p className="text-xs text-[#6B6B6B]">Join as a Customer or Salon Owner.</p>
        </div>

        {errorMessage && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Account Type Selector (Customer & Salon Owner only) */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-[#F7F6F3] rounded-xl border border-[#E7E5E1]">
          <button
            type="button"
            id="register-type-customer"
            onClick={() => setUserType('customer')}
            className={`py-2 text-xs font-semibold rounded-lg transition-all ${
              userType === 'customer' ? 'bg-[#141414] text-white shadow-sm' : 'text-[#6B6B6B]'
            }`}
          >
            Customer
          </button>
          <button
            type="button"
            id="register-type-owner"
            onClick={() => setUserType('owner')}
            className={`py-2 text-xs font-semibold rounded-lg transition-all ${
              userType === 'owner' ? 'bg-[#141414] text-white shadow-sm' : 'text-[#6B6B6B]'
            }`}
          >
            Salon Owner
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#141414] uppercase tracking-wider block mb-1">Email</label>
            <input
              type="email"
              required
              id="register-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              className="w-full px-4 py-3 rounded-xl border border-[#E7E5E1] text-xs text-[#141414] focus:outline-none focus:border-[#141414]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#141414] uppercase tracking-wider block mb-1">Phone</label>
            <input
              type="tel"
              id="register-phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+44 7700 900000"
              className="w-full px-4 py-3 rounded-xl border border-[#E7E5E1] text-xs text-[#141414] focus:outline-none focus:border-[#141414]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#141414] uppercase tracking-wider block mb-1">Password</label>
            <input
              type="password"
              required
              id="register-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-[#E7E5E1] text-xs text-[#141414] focus:outline-none focus:border-[#141414]"
            />
          </div>

          <button
            type="submit"
            id="register-submit-btn"
            disabled={loading}
            className="w-full py-3.5 bg-[#141414] hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'Creating Account...' : `Register as ${userType === 'owner' ? 'Salon Owner' : 'Customer'}`} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-4 border-t border-[#E7E5E1] text-xs text-[#6B6B6B]">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-[#141414] hover:underline">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}
