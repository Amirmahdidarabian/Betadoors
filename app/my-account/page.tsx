'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { UserCheck, Lock, Package, ShieldAlert } from 'lucide-react';
import { SiteShell } from '@/components/layout/SiteShell';
import {
  DEMO_ACTORS,
  useBetaDoors,
} from '@/components/providers/BetaDoorsProvider';
import { formatAudCents } from '@/lib/domain-logic';

export default function MyAccountPage() {
  const { actor, actorKey, setActorKey, orders } = useBetaDoors();

  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loginStatus, setLoginStatus] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = usernameOrEmail.trim().toLowerCase();
    if (clean.includes('alice')) {
      setActorKey('customer_alice');
      setLoginStatus('Signed in as Customer A (Alice Walker).');
    } else if (clean.includes('bob')) {
      setActorKey('customer_bob');
      setLoginStatus('Signed in as Customer B (Bob Mitchell).');
    } else if (clean.includes('admin')) {
      setActorKey('administrator');
      setLoginStatus('Signed in as Site Administrator.');
    } else {
      setActorKey('customer_alice');
      setLoginStatus('Signed in to customer sandbox session (Alice Walker).');
    }
  };

  return (
    <SiteShell>
      <div className="px-4 sm:px-8 lg:px-12 py-12 max-w-6xl mx-auto space-y-12">
        <div className="border-b border-white/10 pb-6 space-y-2">
          <div className="text-xs text-slate-400">
            Account &amp; Customer Ownership Boundary · /my-account/
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            My Account
          </h1>
          <p className="text-sm text-slate-300">
            Sign in to view your customer orders and saved delivery details, or switch between Customer A and Customer B to verify strict horizontal order isolation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Login Form (Observed Legacy Schema: username_or_email, password, remember_me, lost_password) */}
          <div className="lg:col-span-5 bg-[#0F1117] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-5">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#EC008C]" />
              <span>Customer / Staff Sign In</span>
            </h2>

            {loginStatus && (
              <div
                role="status"
                className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-200"
              >
                {loginStatus}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="acc-username"
                  className="block text-xs font-medium text-slate-300 mb-1.5"
                >
                  Username or email address *
                </label>
                <input
                  id="acc-username"
                  type="text"
                  required
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  placeholder="alice.walker@example.com.au or bob.mitchell@example.com.au"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#08090C] border border-white/15 rounded-lg text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="acc-password"
                  className="block text-xs font-medium text-slate-300 mb-1.5"
                >
                  Password *
                </label>
                <input
                  id="acc-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#08090C] border border-white/15 rounded-lg text-white"
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="inline-flex items-center gap-2 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-white/20 bg-[#08090C]"
                  />
                  <span>Remember me</span>
                </label>
                <Link
                  href="/my-account/lost-password/"
                  className="text-[#EC008C] hover:underline"
                >
                  Lost your password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-5 rounded-xl bg-[#EC008C] hover:bg-[#d4007d] text-white text-sm font-semibold transition-colors"
              >
                Log in
              </button>
            </form>

            {/* Quick Account & Admin Switcher */}
            <div className="pt-4 border-t border-white/10 space-y-2.5">
              <div className="text-xs font-semibold text-slate-300">
                Quick Login &amp; Admin Access:
              </div>
              <div className="p-3 bg-[#08090C] border border-[#EC008C]/40 text-xs space-y-1.5">
                <div className="font-mono text-[#EC008C] font-bold">
                  ADMIN CREDENTIALS
                </div>
                <div className="font-mono text-slate-300">
                  Username: <strong className="text-white">admin@betadoors.com.au</strong>
                </div>
                <div className="font-mono text-slate-300">
                  Password: <strong className="text-white">BetaAdmin2026!</strong>
                </div>
                <div className="flex flex-wrap items-center gap-2 pt-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setActorKey('administrator');
                      setUsernameOrEmail('admin@betadoors.com.au');
                      setPassword('BetaAdmin2026!');
                      setLoginStatus('Signed in as Site Administrator (Full Access).');
                    }}
                    className="keep-white-text px-3 py-1.5 bg-[#EC008C] hover:bg-[#d4007d] text-white text-xs font-mono font-bold cursor-pointer"
                  >
                    1-Click Admin Login
                  </button>
                  <Link
                    href="/admin"
                    className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-semibold"
                  >
                    Open Admin Panel →
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setActorKey('customer_alice')}
                  className={`p-2.5 rounded-lg border text-xs text-left transition-colors cursor-pointer ${
                    actorKey === 'customer_alice'
                      ? 'bg-[#EC008C]/20 border-[#EC008C] text-white'
                      : 'bg-[#08090C] border-white/10 text-slate-300 hover:border-white/25'
                  }`}
                >
                  <div className="font-semibold">Customer A (Alice)</div>
                  <div className="text-[11px] text-slate-400">Sees Order BD-1001</div>
                </button>
                <button
                  type="button"
                  onClick={() => setActorKey('customer_bob')}
                  className={`p-2.5 rounded-lg border text-xs text-left transition-colors cursor-pointer ${
                    actorKey === 'customer_bob'
                      ? 'bg-[#EC008C]/20 border-[#EC008C] text-white'
                      : 'bg-[#08090C] border-white/10 text-slate-300 hover:border-white/25'
                  }`}
                >
                  <div className="font-semibold">Customer B (Bob)</div>
                  <div className="text-[11px] text-slate-400">Sees Order BD-1002</div>
                </button>
              </div>
            </div>
          </div>

          {/* Right: Owner-Scoped Account Dashboard & Orders */}
          <div className="lg:col-span-7 bg-[#0F1117] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <UserCheck className="w-5 h-5 text-[#EC008C]" />
                <div>
                  <h2 className="text-lg font-bold text-white">
                    Active Identity: {actor.displayName}
                  </h2>
                  <p className="text-xs text-slate-400 font-mono">
                    Email: {actor.email} · Role: {actor.role}
                  </p>
                </div>
              </div>
              {actor.role !== 'guest' && (
                <button
                  type="button"
                  onClick={() => setActorKey('guest')}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300"
                >
                  Log Out to Guest
                </button>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Package className="w-4 h-4 text-[#EC008C]" />
                <span>Authorised Orders for This Session ({orders.length})</span>
              </h3>

              {orders.length === 0 ? (
                <div className="p-6 rounded-xl bg-[#08090C] border border-white/10 text-xs text-slate-400 space-y-2">
                  <div className="flex items-center gap-2 text-slate-200 font-medium">
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                    <span>No orders accessible for {actor.displayName}</span>
                  </div>
                  <p>
                    Guest sessions cannot enumerate customer orders without a confirmation token. Switch to Customer A (Alice) or Customer B (Bob) to verify owner-scoped order visibility.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-4 rounded-xl bg-[#08090C] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="font-mono font-semibold text-white">
                          Order {ord.orderNumber} · {ord.customerName} ({ord.customerEmail})
                        </div>
                        <div className="text-slate-400">
                          {ord.items.map((i) => `${i.quantity}× ${i.name}`).join(', ')}
                        </div>
                        <div className="text-slate-500">
                          Delivery: {ord.shippingAddress.suburb} {ord.shippingAddress.state}{' '}
                          {ord.shippingAddress.postcode}
                        </div>
                      </div>
                      <div className="flex sm:flex-col items-end justify-between gap-2 shrink-0">
                        <span className="text-sm font-bold font-mono text-white tabular-nums">
                          {formatAudCents(ord.totalCents)}
                        </span>
                        <Link
                          href={`/order-confirmation/${ord.confirmationToken}`}
                          className="text-[#EC008C] hover:underline font-medium"
                        >
                          View Receipt →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
