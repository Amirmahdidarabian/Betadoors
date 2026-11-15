'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Wrench,
  Layers,
  Cpu,
} from 'lucide-react';
import { SiteShell } from '@/components/layout/SiteShell';
import { DeFiPageHeroStage } from '@/components/hero/DeFiPageHeroStage';
import { ProductTechnicalArtwork } from '@/components/brand/ProductTechnicalArtwork';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { useBetaDoors } from '@/components/providers/BetaDoorsProvider';
import { formatAudCents } from '@/lib/domain-logic';

const OFFICIAL_PRODUCT_CATEGORIES = [
  {
    id: 'garage-doors',
    number: '01',
    title: 'Garage Doors',
    subtitle: 'Insulated Sectional · Single Skin Sectional · Roller Doors',
    href: '/garage-door-range',
    artwork: 'sectional_door' as const,
    description:
      'Enjoy a wide selection of Garage Doors in Melbourne. Our insulated sectional garage doors feature panels designed to provide thermal protection and finger protection technology, alongside Single Skin Sectional Doors and durable Australian Roller Doors.',
    subItems: [
      { label: 'Insulated Sectional Garage Doors', href: '/garage-door-range' },
      { label: 'Single Skin Sectional Garage Doors', href: '/garage-door-range' },
      { label: 'Roller Doors', href: '/garage-door-range' },
    ],
  },
  {
    id: 'gate-openers',
    number: '02',
    title: 'Gate Openers',
    subtitle: 'BETA Gate Openers · LIFE Gate Openers · Swing & Sliding',
    href: '/gate-opener-brands',
    artwork: 'gate_opener' as const,
    description:
      'Comprehensive Swing Gate Openers and Sliding Gate Openers from BETA (B600 / B550) and LIFE (HP4, OP2, OP3-OP5, HP6, and articulated swing gate openers) engineered for residential and commercial perimeters.',
    subItems: [
      { label: 'BETA Gate Opener Range (B600 / B550)', href: '/beta-gate-opener-range' },
      { label: 'LIFE Gate Opener Range (HP4 / OP2 / HP6)', href: '/life-gate-opener-range' },
      { label: 'All Gate Opener Brands', href: '/gate-opener-brands' },
    ],
  },
  {
    id: 'garage-door-openers',
    number: '03',
    title: 'Garage Door Openers',
    subtitle: '7 Years Warranty · 1000N · 1200N · 1500N · Optional WiFi Kit',
    href: '/garage-door-opener-catagories',
    artwork: 'aria_121' as const,
    description:
      'Featuring the BETA DOORS Aria 121 sectional/tilt door opener and Residential & Heavy-duty Roller Door Openers (5 Years Warranty · 1000N, 1500N, and 1800N commercial motors) for smooth, quiet everyday operation.',
    subItems: [
      {
        label: 'Sectional & Tilt Door Openers (Aria 121)',
        href: '/sectional-and-tilt-door-opener-range',
      },
      {
        label: 'Roller Door Openers (1000N / 1500N / 1800N)',
        href: '/roller-door-opener-range',
      },
      { label: 'Panel Door Motor Pack (Shop)', href: '/product/motor-pack' },
    ],
  },
  {
    id: 'gates',
    number: '04',
    title: 'Gates',
    subtitle: 'Swing Gates · Sliding Gates · Custom Architectural Profiles',
    href: '/gate-catagories',
    artwork: 'roller_opener' as const,
    description:
      'Custom-fabricated Swing Gates and Sliding Gates designed for Australian driveways, commercial entrances, and automated security access control.',
    subItems: [
      { label: 'Swing Gates', href: '/gate-catagories' },
      { label: 'Sliding Gates', href: '/gate-catagories' },
    ],
  },
  {
    id: 'accessories',
    number: '05',
    title: 'Accessories',
    subtitle: 'Remotes · External Receivers · Universal WiFi Kit · Safety Beams',
    href: '/accessories',
    artwork: 'keypad' as const,
    description:
      'Hopping code Remote controls, External Receivers, Universal WiFi Kit, Wireless Keypad, Wall Button, WiFi Camera, and Photocell Safety Beams for enhanced comfort and peace of mind.',
    subItems: [
      { label: 'Remotes & Wireless Keypad', href: '/accessories' },
      { label: 'Wall Button & WiFi Camera', href: '/accessories' },
      { label: 'Safety Beams & External Receivers', href: '/accessories' },
    ],
  },
  {
    id: 'hardware',
    number: '06',
    title: 'Hardware',
    subtitle: 'Over 10 Sizes of Sectional Springs · Hinges · Bearings · Cables',
    href: '/hardware',
    artwork: 'hardware_kit' as const,
    description:
      'Steel Line Hinges, B&D Hinges, Gliderol Hinges, Centurion T Shaped & Old T Hinges, Side Bearing Plates, Middle Bearings, Sectional & Tilt Door Springs, and heavy-duty lifting Cables.',
    subItems: [
      { label: 'Steel Line, B&D, Gliderol & Centurion Hinges', href: '/hardware' },
      { label: 'Sectional & Tilt Door Springs + Cables', href: '/hardware' },
      { label: 'Garage Door Spring Estimator Tool', href: '/garage-door-spring-estimator' },
    ],
  },
];

export default function ProductsPage() {
  const { products } = useBetaDoors();
  const [activeBarIndex, setActiveBarIndex] = useState(2);

  return (
    <SiteShell>
      {/* 1. DeFi Landing Page 16:9 Hero Stage with verbatim betadoors.com.au/products/ copy */}
      <DeFiPageHeroStage
        ariaLabel="BETA DOORS Product Categories 16:9 Hero Stage"
        badgeText="Pioneers in the door automation industry · Australia Wide"
        badgeHref="/about-us/"
        headlinePrimary="Product Categories &"
        headlineGradient="Door Automation Systems"
        subheadline="At Beta, we are pioneers in the door automation industry. We offer a comprehensive range of solutions for Commercial and Residential Garage Door and Gates — from sectional and roller door operators to accessories, WiFi capabilities, springs, and receivers."
        primaryCtaLabel="Explore Online Shop"
        primaryCtaHref="/shop/"
        secondaryCtaLabel="Enquire Now"
        secondaryCtaHref="#products-enquiry"
        scrollTargetId="products-bento-insights"
        topLeftNode={{ label: 'Garage Door Openers', metric: '7 Years Warranty' }}
        topRightNode={{ label: 'Roller Door Openers', metric: '1000N – 1800N' }}
        bottomLeftNode={{ label: 'Sectional Springs', metric: '10+ Sizes' }}
        bottomRightNode={{ label: 'Gate Automation', metric: 'Swing & Sliding' }}
        horizonSlides={[
          { label: '01/04 . Product Categories', tag: 'Garage Doors & Aria 121 Openers' },
          { label: '02/04 . Product Categories', tag: 'Roller Door Openers (5 Years Warranty)' },
          { label: '03/04 . Product Categories', tag: 'BETA & LIFE Gate Automation' },
          { label: '04/04 . Product Categories', tag: 'Springs, Hardware & Smart Accessories' },
        ]}
      />

      {/* 2. "What We Offer" 4-Card DeFi Bento Grid (matching uploaded DeFi reference image) */}
      <section
        id="products-bento-insights"
        className="px-4 sm:px-8 lg:px-12 py-16 max-w-7xl mx-auto"
      >
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 font-mono text-[11px] text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-[#EC008C]" />
            <span>WHAT WE OFFER · BETADOORS.COM.AU SPECIFICATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white">
            Speed in Service, Quality in Product
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Every product undergoes rigorous testing to ensure it meets our high Australian standards, backed by dedicated installer support and warranty coverage.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Card 1 (Left 7 cols): Garage Door Openers & 7 Years Warranty */}
          <div className="lg:col-span-7 rounded-[28px] brand-animated-border bg-[#0B0C10] border border-white/[0.08] p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-12 top-6 w-56 h-56 rounded-full blur-3xl opacity-35"
              style={{
                background:
                  'radial-gradient(circle, rgba(215,230,222,0.5) 0%, rgba(11,12,16,0) 70%)',
              }}
            />

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              <div className="sm:col-span-5 space-y-1">
                <div className="text-4xl sm:text-5xl font-light tracking-tight text-white tabular-nums">
                  7 Years <span className="text-slate-500">.</span>
                </div>
                <div className="text-xs text-slate-400">
                  Warranty · Garage Door Openers
                </div>
              </div>

              {/* Orbital Force Diagram */}
              <div className="sm:col-span-7 relative h-36 flex items-center justify-center">
                <svg viewBox="0 0 320 140" className="w-full h-full overflow-visible">
                  <ellipse
                    cx="160"
                    cy="75"
                    rx="135"
                    ry="38"
                    fill="none"
                    stroke="rgba(255,255,255,0.14)"
                    strokeWidth="1"
                    transform="rotate(-8 160 75)"
                  />
                  <ellipse
                    cx="165"
                    cy="75"
                    rx="95"
                    ry="24"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="1"
                    transform="rotate(-8 165 75)"
                  />
                  <g transform="translate(110, 42)">
                    <circle cx="30" cy="24" r="3" fill="#FFFFFF" />
                    <rect
                      x="0"
                      y="0"
                      width="68"
                      height="18"
                      rx="9"
                      fill="#151821"
                      stroke="rgba(255,255,255,0.2)"
                    />
                    <text x="34" y="12" textAnchor="middle" fill="#E2E8F0" fontSize="8" fontFamily="monospace">
                      1000N
                    </text>
                  </g>
                  <g transform="translate(175, 22)">
                    <circle cx="30" cy="24" r="3" fill="#94A3B8" />
                    <rect
                      x="0"
                      y="0"
                      width="68"
                      height="18"
                      rx="9"
                      fill="#151821"
                      stroke="rgba(255,255,255,0.15)"
                    />
                    <text x="34" y="12" textAnchor="middle" fill="#CBD5E1" fontSize="8" fontFamily="monospace">
                      1200N
                    </text>
                  </g>
                  <g transform="translate(222, 68)">
                    <circle cx="28" cy="0" r="3" fill="#EC008C" />
                    <rect
                      x="0"
                      y="6"
                      width="68"
                      height="18"
                      rx="9"
                      fill="#151821"
                      stroke="rgba(236,0,140,0.4)"
                    />
                    <text x="34" y="18" textAnchor="middle" fill="#F8FAFC" fontSize="8" fontFamily="monospace">
                      1500N + WiFi
                    </text>
                  </g>
                </svg>
              </div>
            </div>

            <div className="my-5 p-1.5 rounded-full bg-[#07080A] border border-white/[0.07] flex flex-wrap items-center justify-between gap-2 text-[11px]">
              <Link
                href="/sectional-and-tilt-door-opener-range/"
                className="px-3 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 transition-colors"
              >
                ↗ Aria 121 Sectional Opener
              </Link>
              <Link
                href="/product/motor-pack/"
                className="px-3.5 py-1 rounded-full bg-white/[0.1] text-white font-medium border border-white/15"
              >
                ⓘ Optional WiFi Kit &amp; Camera
              </Link>
              <Link
                href="/beta-doors-manuals/"
                className="px-3 py-1 rounded-full text-slate-400 hover:text-white transition-colors"
              >
                Asterion PDO Manual
              </Link>
            </div>

            <div className="text-center space-y-1.5 pt-1">
              <h3 className="text-lg font-medium text-white">
                Garage Door Openers (1000N · 1200N · 1500N)
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                Sectional and tilt door operators backed by a 7-year warranty, hopping code security, photocell safety beams, and optional WiFi kit.
              </p>
            </div>
          </div>

          {/* Card 2 (Right 5 cols): Vertical Glowing Cylinders for Roller Door Openers */}
          <div className="lg:col-span-5 rounded-[28px] brand-animated-border bg-[#0B0C10] border border-white/[0.08] p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden">
            <div className="h-48 flex items-end justify-center gap-4 sm:gap-5 pt-4 px-2">
              {[
                { label: '1800N', height: '100%' },
                { label: '1500N', height: '86%' },
                { label: '1200N', height: '72%' },
                { label: '1000N', height: '58%' },
                { label: '5 YR', height: '46%' },
              ].map((bar) => (
                <div
                  key={bar.label}
                  className="flex flex-col items-center gap-2 h-full justify-end flex-1 max-w-[42px]"
                >
                  <div
                    style={{ height: bar.height }}
                    className="w-full rounded-t-2xl bg-gradient-to-b from-white/30 via-white/[0.08] to-transparent border-t border-x border-white/25 relative flex justify-center pt-2 shadow-[0_0_25px_rgba(255,255,255,0.08)]"
                  >
                    <span className="w-3.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_#fff]" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 tabular-nums">
                    {bar.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-center space-y-1.5 pt-6">
              <h3 className="text-lg font-medium text-white">
                Roller Door Openers (5 Years Warranty)
              </h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                Available in 1000N and 1500N residential options plus our heavy-duty 1800N commercial roller door opener.
              </p>
            </div>
          </div>

          {/* Card 3 (Bottom-Left 5 cols): Sectional & Tilt Door Springs */}
          <div className="lg:col-span-5 rounded-[28px] brand-animated-border bg-[#0B0C10] border border-white/[0.08] p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden">
            <div className="grid grid-cols-2 gap-3.5">
              <Link
                href="/hardware/"
                className="rounded-2xl bg-[#12141A] border border-white/[0.08] hover:border-white/20 p-4 space-y-3 transition-colors"
              >
                <div className="flex items-center gap-1.5 text-xs text-slate-300">
                  <span className="w-1 h-3.5 rounded-full bg-amber-400" />
                  <span>Sectional Springs</span>
                </div>
                <div className="text-[11px] text-slate-400">Range</div>
                <div className="text-2xl sm:text-3xl font-light text-white tabular-nums">
                  10+ Sizes
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  Custom Installer Software
                </div>
              </Link>

              <Link
                href="/garage-door-spring-estimator/"
                className="rounded-2xl bg-[#12141A] border border-white/[0.08] hover:border-white/20 p-4 space-y-3 transition-colors"
              >
                <div className="flex items-center gap-1.5 text-xs text-slate-300">
                  <span className="w-1 h-3.5 rounded-full bg-[#EC008C]" />
                  <span>Tilt Door Springs</span>
                </div>
                <div className="text-[11px] text-slate-400">Coverage</div>
                <div className="text-2xl sm:text-3xl font-light text-white tabular-nums">
                  Full Range
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  Spring Estimator →
                </div>
              </Link>
            </div>

            <div className="text-center space-y-1.5 pt-6">
              <h3 className="text-lg font-medium text-white">
                Sectional &amp; Tilt Door Springs
              </h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                Over 10 sizes of sectional springs, full range of tilt door springs, and custom sectional spring software for installers.
              </p>
            </div>
          </div>

          {/* Card 4 (Bottom-Right 7 cols): Gate Automation & Accessories Matrix */}
          <div className="lg:col-span-7 rounded-[28px] brand-animated-border bg-[#0B0C10] border border-white/[0.08] p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden">
            <div className="text-center space-y-1.5">
              <h3 className="text-lg font-medium text-white">
                Gate Automation . Smart Accessories
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                Swing &amp; Sliding Gate Openers, Hopping Code Remote Controls, External Receivers, and Universal WiFi Kits.
              </p>
            </div>

            <div className="h-44 flex items-end justify-center gap-3 sm:gap-5 pt-6 px-4">
              {[
                {
                  name: 'B600 / B550',
                  tag: 'BETA Gate',
                  height: '65%',
                  color: 'from-amber-200/40 via-amber-500/15 to-transparent border-amber-300/30',
                },
                {
                  name: 'LIFE HP4/HP6',
                  tag: 'Sliding Gate',
                  height: '86%',
                  color: 'from-[#EC008C]/55 via-[#EC008C]/20 to-transparent border-[#EC008C]/40',
                },
                {
                  name: 'LIFE OP2–OP5',
                  tag: 'Swing Gate',
                  height: '100%',
                  color: 'from-emerald-200/50 via-teal-400/20 to-transparent border-emerald-200/40',
                },
                {
                  name: '2-Ch Receiver',
                  tag: 'External',
                  height: '62%',
                  color: 'from-amber-100/40 via-amber-400/15 to-transparent border-amber-200/30',
                },
                {
                  name: 'WiFi + Beams',
                  tag: 'Smart Kit',
                  height: '76%',
                  color: 'from-slate-200/45 via-slate-400/15 to-transparent border-white/30',
                },
              ].map((col, idx) => (
                <div
                  key={col.name}
                  onClick={() => setActiveBarIndex(idx)}
                  className="flex flex-col items-center justify-end h-full flex-1 max-w-[82px] cursor-pointer group"
                >
                  <span className="text-[10px] font-mono text-slate-300 mb-1.5 tabular-nums">
                    {col.tag}
                  </span>
                  <div
                    style={{ height: col.height }}
                    className={`w-full rounded-t-xl bg-gradient-to-b ${col.color} border-t border-x relative flex justify-center pt-1.5 transition-all group-hover:brightness-125`}
                  >
                    <span className="w-4 h-1 rounded-full bg-white/90" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 mt-2 truncate max-w-full">
                    {col.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-1.5 pt-4">
              {[0, 1, 2, 3, 4].map((idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveBarIndex(idx)}
                  aria-label={`Select capability column ${idx + 1}`}
                  className={`h-1 rounded-full transition-all ${
                    activeBarIndex === idx ? 'w-6 bg-white' : 'w-4 bg-white/15'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. All 6 Official Product Categories from betadoors.com.au/products/ */}
      <section className="px-4 sm:px-8 lg:px-12 py-12 max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-2">
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-[#EC008C]">
              OFFICIAL BETADOORS.COM.AU/PRODUCTS/ DIRECTORY
            </div>
            <h2 className="text-2xl sm:text-4xl font-semibold text-white tracking-tight">
              6 Core Product Categories
            </h2>
            <p className="text-sm text-slate-400">
              Select any category below to inspect models, technical specifications, and sub-ranges.
            </p>
          </div>
          <Link
            href="/shop/"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-slate-950 hover:bg-slate-200 transition-colors self-start"
          >
            <span>Open Online Shop ({products.length} Products)</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {OFFICIAL_PRODUCT_CATEGORIES.map((cat) => (
            <article
              key={cat.id}
              className="group brand-animated-border bg-[#0B0C10] border border-white/[0.08] rounded-[26px] overflow-hidden flex flex-col justify-between transition-all"
            >
              <div>
                <Link href={cat.href} className="block aspect-video w-full border-b border-[#EC008C]/25 bg-[#12141A] overflow-hidden">
                  <ProductTechnicalArtwork
                    type={cat.artwork}
                    title={cat.title}
                    className="w-full h-full"
                  />
                </Link>
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#EC008C]">
                    <span>CATEGORY {cat.number}</span>
                    <span className="text-slate-500">{cat.href}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    <Link href={cat.href} className="hover:text-[#EC008C] transition-colors">
                      {cat.title}
                    </Link>
                  </h3>
                  <p className="text-xs font-medium text-slate-300">{cat.subtitle}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{cat.description}</p>

                  <ul className="pt-2 space-y-1.5 border-t border-white/[0.06]">
                    {cat.subItems.map((sub) => (
                      <li key={sub.label}>
                        <Link
                          href={sub.href}
                          className="flex items-center justify-between text-xs text-slate-300 hover:text-white py-1"
                        >
                          <span className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{sub.label}</span>
                          </span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <Link
                  href={cat.href}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white/[0.06] hover:bg-white text-white hover:text-black border border-white/10 py-2.5 px-4 text-xs font-semibold transition-colors"
                >
                  <span>Explore {cat.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Direct Storefront Preview Strip */}
      <section className="px-4 sm:px-8 lg:px-12 py-10 max-w-7xl mx-auto">
        <div className="rounded-[28px] border border-white/[0.08] bg-[#0B0C10] p-6 sm:p-9 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
                READY FOR IMMEDIATE DISPATCH · CAMPBELLFIELD VIC 3061
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-semibold text-white">
                Direct Online Shop Products
              </h2>
            </div>
            <Link
              href="/shop/"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-5 py-2.5 text-xs font-medium text-white hover:bg-white/[0.1]"
            >
              <span>Go to Shop</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {products.map((prod) => (
              <Link
                key={prod.id}
                href={prod.path}
                className="rounded-2xl brand-animated-border border border-white/[0.08] bg-[#07080A] p-4 flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/[0.06] bg-[#12141A] mb-3">
                    <ProductTechnicalArtwork
                      type={prod.imageSvgType}
                      customImageUrl={prod.customImageUrl}
                      title={prod.name}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="font-mono text-[10px] text-slate-400">{prod.sku}</div>
                  <h3 className="text-sm font-semibold text-white mt-0.5">{prod.name}</h3>
                </div>
                <div className="mt-3 pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-emerald-300 tabular-nums">
                  <span>
                    {prod.maxPriceCents
                      ? `${formatAudCents(prod.priceCents)}–${formatAudCents(prod.maxPriceCents)}`
                      : formatAudCents(prod.priceCents)}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Make an Enquiry Form */}
      <section id="products-enquiry" className="px-4 sm:px-8 lg:px-12 py-12 max-w-5xl mx-auto">
        <EnquiryForm
          sourcePagePath="/products/"
          heading="Make an Enquiry — Product Selection, Trade & Installer Support"
          subheading="We're available Australia wide! Contact our Campbellfield head office (1300 238 243 · sales@betadoors.com.au) for product specifications, dealer pricing, or installation quotes."
        />
      </section>
    </SiteShell>
  );
}
