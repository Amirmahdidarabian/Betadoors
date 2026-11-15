'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { SiteShell } from '@/components/layout/SiteShell';

export default function LostPasswordPage() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameOrEmail.trim()) return;
    setSubmitted(true);
  };

  return (
    <SiteShell>
      <div className="px-4 sm:px-8 lg:px-12 py-14 max-w-xl mx-auto space-y-8">
        <Link
          href="/my-account/"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to My Account Sign In</span>
        </Link>

        <div className="bg-[#0F1117] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-5">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Password Recovery
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Lost your password? Please enter your username or email address. If a matching account exists, a single-use password reset link will be sent via email.
          </p>

          {submitted ? (
            <div
              role="status"
              aria-live="polite"
              className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-100 space-y-2"
            >
              <div className="flex items-center gap-2 font-semibold text-white">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Recovery Request Queued (Generic Anti-Enumeration Response)</span>
              </div>
              <p>
                If an account matches <code className="font-mono">{usernameOrEmail}</code>, a single-use expiring recovery token has been queued to the local mail catcher.
              </p>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
              <div>
                <label
                  htmlFor="lost-username-email"
                  className="block text-xs font-medium text-slate-300 mb-1.5"
                >
                  Username or email *
                </label>
                <input
                  id="lost-username-email"
                  type="text"
                  required
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#08090C] border border-white/15 rounded-lg text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 px-5 rounded-xl bg-[#EC008C] hover:bg-[#d4007d] text-white text-sm font-semibold transition-colors"
              >
                Reset password
              </button>
            </form>
          )}
        </div>
      </div>
    </SiteShell>
  );
}
