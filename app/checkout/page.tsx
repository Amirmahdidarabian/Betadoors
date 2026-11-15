'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Lock } from 'lucide-react';
import { SiteShell } from '@/components/layout/SiteShell';
import { useBetaDoors } from '@/components/providers/BetaDoorsProvider';
import { formatAudCents } from '@/lib/domain-logic';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotals, actor, clearCart, mutateServer } = useBetaDoors();

  const [customerName, setCustomerName] = useState(
    actor.role === 'customer' ? actor.displayName.split(' (')[0] : ''
  );
  const [customerEmail, setCustomerEmail] = useState(
    actor.role === 'customer' ? actor.email : ''
  );
  const [customerPhone, setCustomerPhone] = useState('0412 345 678');
  const [street, setStreet] = useState('');
  const [suburb, setSuburb] = useState('');
  const [state, setState] = useState('VIC');
  const [postcode, setPostcode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Observed legacy behavior from Appendix A & B: visiting /checkout/ with an empty cart redirects to /cart/
  useEffect(() => {
    if (cart.length === 0 && !submitting) {
      router.replace('/cart/');
    }
  }, [cart.length, router, submitting]);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await mutateServer('submit_order', {
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress: {
          street,
          suburb,
          state,
          postcode,
        },
        items: cart,
        idempotencyKey: `chk_${customerEmail}_${cartTotals.totalCents}_${cart.length}`,
      });
      if (!res.ok) {
        setError(String(res.error || 'Checkout validation failed.'));
        setSubmitting(false);
        return;
      }
      const order = res.order as { confirmationToken: string };
      clearCart();
      router.push(`/order-confirmation/${order.confirmationToken}`);
    } catch {
      setError('Network error while submitting sandbox order.');
      setSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <SiteShell>
        <div className="px-6 py-20 max-w-2xl mx-auto text-center space-y-4">
          <h1 className="text-2xl font-bold text-white">
            Redirecting to Shopping Cart...
          </h1>
          <p className="text-xs text-slate-400">
            Checkout requires at least one product in your cart (preserving observed legacy route behavior).
          </p>
          <Link href="/cart/" className="underline text-xs text-[#EC008C]">
            Go to Cart
          </Link>
        </div>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <div className="px-4 sm:px-8 lg:px-12 py-12 max-w-6xl mx-auto space-y-10">
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono border-b border-white/10 pb-6">
          <Link href="/cart/" className="text-slate-400 hover:text-white">
            01. SHOPPING CART
          </Link>
          <span aria-hidden="true" className="text-slate-600">→</span>
          <span className="text-white font-semibold">02. CHECKOUT DETAILS</span>
          <span aria-hidden="true" className="text-slate-600">→</span>
          <span className="text-slate-500">03. ORDER COMPLETE</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Checkout (Sandbox Gateway Mode)
        </h1>

        <form
          onSubmit={handlePlaceOrder}
          noValidate
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* Left: Billing & Australian Delivery Details */}
          <div className="lg:col-span-7 bg-[#0F1117] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-5">
            <h2 className="text-lg font-semibold text-white">
              Customer &amp; Australian Delivery Details
            </h2>

            {error && (
              <div
                role="alert"
                className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-200"
              >
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label
                  htmlFor="chk-name"
                  className="block text-xs font-medium text-slate-300 mb-1.5"
                >
                  Full Name *
                </label>
                <input
                  id="chk-name"
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Alice Walker"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#08090C] border border-white/15 rounded-lg text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="chk-email"
                  className="block text-xs font-medium text-slate-300 mb-1.5"
                >
                  Email Address *
                </label>
                <input
                  id="chk-email"
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="alice@example.com.au"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#08090C] border border-white/15 rounded-lg text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="chk-phone"
                  className="block text-xs font-medium text-slate-300 mb-1.5"
                >
                  Mobile / Phone *
                </label>
                <input
                  id="chk-phone"
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="0412 345 678"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#08090C] border border-white/15 rounded-lg text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="chk-street"
                  className="block text-xs font-medium text-slate-300 mb-1.5"
                >
                  Street Address *
                </label>
                <input
                  id="chk-street"
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="88 Pascoe Vale Road"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#08090C] border border-white/15 rounded-lg text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="chk-suburb"
                  className="block text-xs font-medium text-slate-300 mb-1.5"
                >
                  Suburb *
                </label>
                <input
                  id="chk-suburb"
                  type="text"
                  required
                  value={suburb}
                  onChange={(e) => setSuburb(e.target.value)}
                  placeholder="Moonee Ponds"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#08090C] border border-white/15 rounded-lg text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="chk-state"
                    className="block text-xs font-medium text-slate-300 mb-1.5"
                  >
                    State *
                  </label>
                  <select
                    id="chk-state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm bg-[#08090C] border border-white/15 rounded-lg text-white"
                  >
                    <option value="VIC">VIC</option>
                    <option value="NSW">NSW</option>
                    <option value="QLD">QLD</option>
                    <option value="SA">SA</option>
                    <option value="WA">WA</option>
                    <option value="TAS">TAS</option>
                    <option value="ACT">ACT</option>
                    <option value="NT">NT</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="chk-postcode"
                    className="block text-xs font-medium text-slate-300 mb-1.5"
                  >
                    Postcode *
                  </label>
                  <input
                    id="chk-postcode"
                    type="text"
                    required
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    placeholder="3039"
                    className="w-full px-3 py-2.5 text-sm bg-[#08090C] border border-white/15 rounded-lg text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Order Summary & Sandbox Payment */}
          <div className="lg:col-span-5 bg-[#0F1117] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-semibold text-white">Your Order Summary</h2>

            <div className="space-y-3 divide-y divide-white/10 text-xs">
              {cart.map((item) => (
                <div
                  key={`${item.productId}_${item.variantLabel || 'base'}`}
                  className="pt-3 first:pt-0 flex items-center justify-between gap-4"
                >
                  <div>
                    <div className="font-semibold text-white">
                      {item.name} × {item.quantity}
                    </div>
                    {item.variantLabel && (
                      <div className="text-slate-400 font-mono">
                        Option: {item.variantLabel}
                      </div>
                    )}
                  </div>
                  <div className="font-mono text-white tabular-nums">
                    {formatAudCents(item.unitPriceCents * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-4 space-y-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums">
                  {formatAudCents(cartTotals.subtotalCents)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Freight</span>
                <span className="font-mono tabular-nums">
                  {cartTotals.shippingCents === 0
                    ? 'FREE ($0.00)'
                    : formatAudCents(cartTotals.shippingCents)}
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Included Australian GST (1/11th)</span>
                <span className="font-mono tabular-nums">
                  {formatAudCents(cartTotals.gstIncludedCents)}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                <span>Total Payable</span>
                <span className="font-mono tabular-nums">
                  {formatAudCents(cartTotals.totalCents)}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#08090C] border border-white/10 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2 font-semibold text-white">
                <Lock className="w-4 h-4 text-[#EC008C]" />
                <span>Sandbox Payment Adapter Active</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                No raw card numbers are collected or stored. Totals and stock are recomputed server-side with idempotency protection.
              </p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 px-6 rounded-xl bg-[#EC008C] hover:bg-[#d4007d] text-white text-sm font-semibold transition-colors disabled:opacity-50"
            >
              {submitting
                ? 'Verifying Stock & Creating Order...'
                : `Complete Sandbox Order (${formatAudCents(cartTotals.totalCents)})`}
            </button>
          </div>
        </form>
      </div>
    </SiteShell>
  );
}
