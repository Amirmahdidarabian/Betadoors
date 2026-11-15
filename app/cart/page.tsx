'use client';

import React from 'react';
import Link from 'next/link';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { SiteShell } from '@/components/layout/SiteShell';
import { useBetaDoors } from '@/components/providers/BetaDoorsProvider';
import { formatAudCents } from '@/lib/domain-logic';

export default function CartPage() {
  const { cart, cartTotals, updateCartQuantity, removeFromCart } = useBetaDoors();

  return (
    <SiteShell>
      <div className="px-4 sm:px-8 lg:px-12 py-12 max-w-6xl mx-auto space-y-10">
        {/* Shopping Steps Header */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono border-b border-white/10 pb-6">
          <span className="text-white font-semibold">01. SHOPPING CART</span>
          <span aria-hidden="true" className="text-slate-600">→</span>
          <span className="text-slate-400">02. CHECKOUT DETAILS</span>
          <span aria-hidden="true" className="text-slate-600">→</span>
          <span className="text-slate-500">03. ORDER COMPLETE</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="bg-[#0F1117] border border-white/10 rounded-2xl p-10 text-center space-y-4">
            <ShoppingBag className="w-10 h-10 text-slate-500 mx-auto" />
            <h2 className="text-xl font-semibold text-white">
              Your cart is currently empty.
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
              Browse our 5 active BETA DOORS products — including Panel Door Motor Packs (800N–1500N), Roller Door Openers, Receivers, and Remote Packs.
            </p>
            <div className="pt-2">
              <Link
                href="/shop/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#EC008C] hover:bg-[#d4007d] text-white text-xs sm:text-sm font-semibold transition-colors"
              >
                <span>Return to Shop</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Cart Items Table */}
            <div className="lg:col-span-8 bg-[#0F1117] border border-white/10 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 bg-[#0B0D13]">
                    <th className="py-3.5 px-5">Product</th>
                    <th className="py-3.5 px-4">Price</th>
                    <th className="py-3.5 px-4">Quantity</th>
                    <th className="py-3.5 px-4 text-right">Subtotal</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {cart.map((item) => (
                    <tr key={`${item.productId}_${item.variantLabel || 'base'}`}>
                      <td className="py-4 px-5">
                        <Link
                          href={`/product/${item.productSlug}/`}
                          className="font-semibold text-white hover:text-[#EC008C]"
                        >
                          {item.name}
                        </Link>
                        <div className="text-xs text-slate-400 font-mono mt-0.5">
                          SKU: {item.sku}
                          {item.variantLabel ? ` · Option: ${item.variantLabel}` : ''}
                        </div>
                      </td>
                      <td className="py-4 px-4 font-mono text-slate-300 tabular-nums">
                        {formatAudCents(item.unitPriceCents)}
                      </td>
                      <td className="py-4 px-4">
                        <input
                          type="number"
                          min={1}
                          max={20}
                          aria-label={`Quantity for ${item.name}`}
                          value={item.quantity}
                          onChange={(e) =>
                            updateCartQuantity(
                              item.productId,
                              item.variantLabel,
                              Number(e.target.value)
                            )
                          }
                          className="w-20 px-2.5 py-1.5 rounded-lg bg-[#08090C] border border-white/15 text-white text-xs tabular-nums"
                        />
                      </td>
                      <td className="py-4 px-4 text-right font-mono font-semibold text-white tabular-nums">
                        {formatAudCents(item.unitPriceCents * item.quantity)}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(item.productId, item.variantLabel)
                          }
                          aria-label={`Remove ${item.name} from cart`}
                          className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-white/5"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals Summary Card */}
            <div className="lg:col-span-4 bg-[#0F1117] border border-white/10 rounded-2xl p-6 space-y-5">
              <h2 className="text-lg font-bold text-white">Cart Totals (AUD)</h2>
              <div className="space-y-3 text-xs sm:text-sm border-b border-white/10 pb-4">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums">
                    {formatAudCents(cartTotals.subtotalCents)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Freight (Free ≥ $500 AUD)</span>
                  <span className="font-mono tabular-nums">
                    {cartTotals.shippingCents === 0
                      ? 'FREE ($0.00)'
                      : formatAudCents(cartTotals.shippingCents)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Included GST (1/11th Sandbox Rule)</span>
                  <span className="font-mono tabular-nums">
                    {formatAudCents(cartTotals.gstIncludedCents)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-base font-bold text-white">
                <span>Total</span>
                <span className="font-mono tabular-nums">
                  {formatAudCents(cartTotals.totalCents)}
                </span>
              </div>

              <Link
                href="/checkout/"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#EC008C] hover:bg-[#d4007d] text-white text-sm font-semibold transition-colors"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </SiteShell>
  );
}
