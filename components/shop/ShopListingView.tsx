'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Eye,
  ShoppingBag,
  CheckCircle2,
  X,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  CreditCard,
} from 'lucide-react';
import { SiteShell } from '@/components/layout/SiteShell';
import { DeFiPageHeroStage } from '@/components/hero/DeFiPageHeroStage';
import { useBetaDoors } from '@/components/providers/BetaDoorsProvider';
import { formatAudCents } from '@/lib/domain-logic';
import { ProductTechnicalArtwork } from '@/components/brand/ProductTechnicalArtwork';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import type { ShopProduct } from '@/lib/types';

export function ShopListingView({
  heading = 'Online Shop — Garage Door Motors, Receivers & Remotes',
  subheading = 'Purchase genuine BETA DOORS Panel Door Automation Packs, 1000N Roller Door Openers, Hopping Code P2011 Remotes, and Universal External Receivers directly.',
}: {
  heading?: string;
  subheading?: string;
}) {
  const { products, addToCart, cartTotals } = useBetaDoors();
  const [quickViewProduct, setQuickViewProduct] = useState<ShopProduct | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string>('1200N');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleDirectAdd = (prod: ShopProduct, variantLabel: string | null) => {
    const res = addToCart(prod, variantLabel, 1);
    if (res.ok) {
      setToastMessage(
        `Added 1 × ${prod.name}${variantLabel ? ` (${variantLabel})` : ''} to cart.`
      );
      window.setTimeout(() => setToastMessage(null), 3500);
    }
  };

  return (
    <SiteShell>
      {/* 1. DeFi Landing Page 16:9 Hero Stage for Online Shop */}
      <DeFiPageHeroStage
        ariaLabel="BETA DOORS Online Shop 16:9 Hero Stage"
        badgeText="Official BETA DOORS Online Storefront · Australia Wide Delivery"
        badgeHref="/cart/"
        headlinePrimary="Shop BETA DOORS"
        headlineGradient="Automation & Remotes"
        subheadline="Built in WiFi. Photocell sensors. WiFi camera. Hopping code security. Experience enhanced comfort and security with official BETA DOORS operators, receivers, and remote packs."
        primaryCtaLabel={`View Cart (${cartTotals.itemCount})`}
        primaryCtaHref="/cart/"
        secondaryCtaLabel="Browse 5 Shop Products"
        secondaryCtaHref="#shop-product-grid"
        scrollTargetId="shop-product-grid"
        topLeftNode={{ label: 'Panel Motor Pack', metric: '$650 – $730' }}
        topRightNode={{ label: 'Roller Door Opener', metric: '$590 · 1000N' }}
        bottomLeftNode={{ label: 'Remote Pack (3+1)', metric: '$240 AUD' }}
        bottomRightNode={{ label: 'Receiver & Remote', metric: '$90 / $60' }}
        horizonSlides={[
          { label: '01/05 . Online Shop', tag: 'Panel Door Motor Pack (800N / 1200N / 1500N)' },
          { label: '02/05 . Online Shop', tag: 'Roller Door Opener (1000N + 2x P2011 Remotes)' },
          { label: '03/05 . Online Shop', tag: 'Remote Pack (3x Remotes + 1x Receiver)' },
          { label: '04/05 . Online Shop', tag: 'Universal External Receiver & Hopping Code Remote' },
        ]}
      />

      <div
        id="shop-product-grid"
        className="w-full max-w-[1760px] mx-auto px-3 sm:px-5 lg:px-7 py-12 space-y-12"
      >
        {/* DeFi Bento Storefront Highlights Strip */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="hud-corner-brackets rounded-xl border border-white/[0.08] bg-[#0B0C10] p-5">
            <div className="font-mono text-[11px] uppercase text-[#EC008C]">
              PANEL AUTOMATION
            </div>
            <div className="mt-1 text-xl font-semibold text-white tabular-nums">
              800N · 1200N · 1500N
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Built-in WiFi, photocell sensors &amp; WiFi camera included in Motor Pack.
            </p>
          </div>
          <div className="hud-corner-brackets rounded-xl border border-white/[0.08] bg-[#0B0C10] p-5">
            <div className="font-mono text-[11px] uppercase text-[#EC008C]">
              ROLLER OPENER
            </div>
            <div className="mt-1 text-xl font-semibold text-white tabular-nums">
              1000 Newtons
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Includes 2 × BETA DOORS P2011 remotes &amp; wall button for single/double roller doors.
            </p>
          </div>
          <div className="hud-corner-brackets rounded-xl border border-white/[0.08] bg-[#0B0C10] p-5">
            <div className="font-mono text-[11px] uppercase text-[#EC008C]">
              RF SECURITY
            </div>
            <div className="mt-1 text-xl font-semibold text-white">
              Hopping Code
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Advanced hopping code radio frequency security technique across all P2011 remotes.
            </p>
          </div>
          <div className="hud-corner-brackets rounded-xl border border-white/[0.08] bg-[#0B0C10] p-5">
            <div className="font-mono text-[11px] uppercase text-[#EC008C]">
              CHECKOUT &amp; SUPPORT
            </div>
            <div className="mt-1 text-xl font-semibold text-white tabular-nums">
              1300 238 243
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Visa · MasterCard · PayPal · Stripe · Cash On Delivery · Australia-wide support.
            </p>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-[#EC008C]" />
              <span>BETA DOORS Storefront · Single Commerce Authority · AUD</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
              {heading}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {subheading}
            </p>
          </div>
          <Link
            href="/cart/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-white text-slate-950 text-xs sm:text-sm font-mono font-semibold hover:bg-slate-200 transition-colors self-start whitespace-nowrap shadow-[0_0_25px_rgba(255,255,255,0.2)]"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>View Cart &amp; Checkout ({formatAudCents(cartTotals.totalCents)})</span>
          </Link>
        </div>

        {toastMessage && (
          <div
            role="status"
            aria-live="polite"
            className="p-4 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-xs sm:text-sm text-emerald-100 flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{toastMessage}</span>
            </div>
            <Link
              href="/cart/"
              className="underline font-semibold text-white whitespace-nowrap"
            >
              Proceed to Cart →
            </Link>
          </div>
        )}

        {/* 3-Column DeFi Dark Obsidian Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((prod) => (
            <article
              key={prod.id}
              className="hud-corner-brackets brand-animated-border bg-[#0B0C10] border border-white/[0.08] rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-150 hover:-translate-y-0.5"
            >
              <div>
                <div className="p-2 pb-0">
                  <div className="relative aspect-video w-full rounded-lg border border-white/[0.08] bg-[#12141A] overflow-hidden">
                    <Link href={prod.path} className="block w-full h-full">
                      <ProductTechnicalArtwork
                        type={prod.imageSvgType}
                        customImageUrl={prod.customImageUrl}
                        title={prod.name}
                        className="w-full h-full"
                      />
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setQuickViewProduct(prod);
                        setSelectedVariant(prod.requiresVariant ? '1200N' : '');
                      }}
                      aria-label={`Quick view ${prod.name}`}
                      className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-black/80 hover:bg-black text-[11px] font-mono text-slate-200 border border-white/15 backdrop-blur-md transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#EC008C]" />
                      <span>QUICK VIEW</span>
                    </button>
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pb-2 border-b border-white/[0.06]">
                    <span>{prod.sku}</span>
                    <span className="text-emerald-400 font-semibold">● IN STOCK ({prod.stockCount})</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    <Link
                      href={prod.path}
                      className="hover:text-[#EC008C] transition-colors"
                    >
                      {prod.name}
                    </Link>
                  </h3>
                  <div className="text-lg font-bold font-mono text-white tabular-nums">
                    {prod.maxPriceCents
                      ? `${formatAudCents(prod.priceCents)} – ${formatAudCents(prod.maxPriceCents)}`
                      : formatAudCents(prod.priceCents)}
                  </div>
                  <p className="text-xs text-slate-300/90 leading-relaxed">
                    {prod.shortDescription}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center gap-2.5">
                {prod.requiresVariant ? (
                  <Link
                    href={prod.path}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-md bg-white hover:bg-slate-200 text-slate-950 text-xs font-mono font-semibold transition-colors whitespace-nowrap"
                  >
                    <span>SELECT OPTIONS (800N–1500N)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => handleDirectAdd(prod, null)}
                      className="flex-1 py-2.5 px-4 rounded-md bg-white hover:bg-slate-200 text-slate-950 text-xs font-mono font-semibold transition-colors whitespace-nowrap cursor-pointer"
                    >
                      + ADD TO CART
                    </button>
                    <Link
                      href={prod.path}
                      className="py-2.5 px-4 rounded-md bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-mono font-medium text-slate-200 transition-colors whitespace-nowrap"
                    >
                      DETAILS
                    </Link>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Accessible Quick View Dialog */}
        {quickViewProduct && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-view-title"
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div className="bg-[#0F1117] border border-white/15 rounded-[26px] max-w-2xl w-full overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <h2 id="quick-view-title" className="text-lg font-bold text-white">
                  {quickViewProduct.name} — Quick View
                </h2>
                <button
                  type="button"
                  onClick={() => setQuickViewProduct(null)}
                  aria-label="Close quick view modal"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-[#12141A]">
                  <ProductTechnicalArtwork
                    type={quickViewProduct.imageSvgType}
                    customImageUrl={quickViewProduct.customImageUrl}
                    title={quickViewProduct.name}
                    className="w-full h-full"
                  />
                </div>
                <div className="space-y-4">
                  <div className="text-xs font-mono text-slate-400">
                    SKU: {quickViewProduct.sku} · Stock: {quickViewProduct.stockCount}
                  </div>
                  <div className="text-2xl font-bold text-white tabular-nums">
                    {quickViewProduct.maxPriceCents
                      ? `${formatAudCents(quickViewProduct.priceCents)} – ${formatAudCents(quickViewProduct.maxPriceCents)}`
                      : formatAudCents(quickViewProduct.priceCents)}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {quickViewProduct.shortDescription}
                  </p>

                  {quickViewProduct.requiresVariant && (
                    <div>
                      <label
                        htmlFor="qv-variant-select"
                        className="block text-xs font-medium text-slate-300 mb-1.5"
                      >
                        Motor Pack Option *
                      </label>
                      <select
                        id="qv-variant-select"
                        value={selectedVariant}
                        onChange={(e) => setSelectedVariant(e.target.value)}
                        className="w-full bg-[#08090C] border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                      >
                        {quickViewProduct.variants.map((v) => (
                          <option key={v.id} value={v.label}>
                            {v.label} — {formatAudCents(v.priceCents)} ({v.stockCount} in stock)
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        handleDirectAdd(
                          quickViewProduct,
                          quickViewProduct.requiresVariant ? selectedVariant : null
                        );
                        setQuickViewProduct(null);
                      }}
                      className="flex-1 py-2.5 px-4 rounded-full bg-white hover:bg-slate-200 text-slate-950 text-xs font-semibold"
                    >
                      Add to cart
                    </button>
                    <Link
                      href={quickViewProduct.path}
                      onClick={() => setQuickViewProduct(null)}
                      className="py-2.5 px-4 rounded-full bg-white/10 hover:bg-white/15 text-xs text-white"
                    >
                      Full Page
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Storefront Enquiry Section */}
        <div className="pt-6">
          <EnquiryForm
            sourcePagePath="/shop/"
            heading="Questions About a Product or Installation Quote?"
            subheading="Contact BETA DOORS on 1300 238 243 or lodge an enquiry below for compatibility advice, professional Melbourne installation, or trade account enquiries."
          />
        </div>
      </div>
    </SiteShell>
  );
}
