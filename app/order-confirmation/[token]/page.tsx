'use client';

import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ShieldAlert, ArrowRight } from 'lucide-react';
import { SiteShell } from '@/components/layout/SiteShell';
import { formatAudCents } from '@/lib/domain-logic';
import type { OrderRecord } from '@/lib/types';

export default function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = use(params);
  const [order, setOrder] = useState<OrderRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrder() {
      try {
        const res = await fetch(
          `/api/state?orderToken=${encodeURIComponent(token)}`,
          { cache: 'no-store' }
        );
        const json = await res.json();
        const matched = Array.isArray(json.orders)
          ? (json.orders as OrderRecord[]).find(
              (o) => o.confirmationToken === token
            )
          : null;
        setOrder(matched ?? null);
      } finally {
        setLoading(false);
      }
    }
    void loadOrder();
  }, [token]);

  return (
    <SiteShell>
      <div className="px-4 sm:px-8 lg:px-12 py-14 max-w-4xl mx-auto">
        {loading ? (
          <div className="p-10 rounded-2xl bg-[#0F1117] border border-white/10 text-center text-sm text-slate-400">
            Verifying order confirmation token...
          </div>
        ) : !order ? (
          <div
            role="alert"
            className="p-10 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-center space-y-4"
          >
            <ShieldAlert className="w-10 h-10 text-rose-400 mx-auto" />
            <h1 className="text-2xl font-bold text-white">
              Order Confirmation Token Invalid or Unauthorised
            </h1>
            <p className="text-xs sm:text-sm text-rose-200/90 max-w-lg mx-auto">
              Per Section 11.2, guest and customer order confirmation requires a valid engine-authorised confirmation token. Sequential order ID guessing is blocked.
            </p>
            <Link
              href="/shop/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-slate-950 text-xs font-semibold"
            >
              Return to Shop
            </Link>
          </div>
        ) : (
          <div className="bg-[#0F1117] border border-white/10 rounded-2xl p-6 sm:p-10 space-y-8">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-mono">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>03. ORDER COMPLETE · SANDBOX VERIFIED</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-bold text-white">
                  Order {order.orderNumber} Confirmed
                </h1>
                <p className="text-xs text-slate-400">
                  Confirmation Token: <code className="font-mono">{order.confirmationToken}</code>
                </p>
              </div>
              <div className="text-right font-mono text-xs text-slate-300">
                <div>Status: {order.paymentStatus}</div>
                <div>Fulfilment: {order.fulfilmentStatus}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="p-4 rounded-xl bg-[#08090C] border border-white/10 space-y-1">
                <div className="text-slate-400 font-semibold">Customer</div>
                <div className="text-white font-medium">{order.customerName}</div>
                <div className="text-slate-300">{order.customerEmail}</div>
                <div className="text-slate-300">{order.customerPhone}</div>
              </div>
              <div className="p-4 rounded-xl bg-[#08090C] border border-white/10 space-y-1">
                <div className="text-slate-400 font-semibold">Delivery Address</div>
                <div className="text-white font-medium">{order.shippingAddress.street}</div>
                <div className="text-slate-300">
                  {order.shippingAddress.suburb} {order.shippingAddress.state}{' '}
                  {order.shippingAddress.postcode}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-white">Ordered Items</h2>
              <div className="divide-y divide-white/10 border-y border-white/10 text-xs sm:text-sm">
                {order.items.map((item) => (
                  <div
                    key={`${item.productId}_${item.variantLabel || 'base'}`}
                    className="py-3 flex items-center justify-between"
                  >
                    <div>
                      <span className="font-semibold text-white">{item.name}</span>
                      {item.variantLabel ? ` (${item.variantLabel})` : ''} × {item.quantity}
                    </div>
                    <div className="font-mono text-white tabular-nums">
                      {formatAudCents(item.unitPriceCents * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between text-slate-300">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums">{formatAudCents(order.subtotalCents)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Freight</span>
                <span className="font-mono tabular-nums">{formatAudCents(order.shippingCents)}</span>
              </div>
              <div className="flex justify-between text-slate-400 text-xs">
                <span>Included Australian GST</span>
                <span className="font-mono tabular-nums">{formatAudCents(order.gstIncludedCents)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-white pt-2 border-t border-white/10">
                <span>Total Paid (Sandbox)</span>
                <span className="font-mono tabular-nums">{formatAudCents(order.totalCents)}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/shop/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#EC008C] text-white text-xs font-semibold"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/warranty-registration/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-white text-xs font-medium"
              >
                Register Product Warranty
              </Link>
            </div>
          </div>
        )}
      </div>
    </SiteShell>
  );
}
