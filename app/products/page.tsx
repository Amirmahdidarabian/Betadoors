'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { SiteShell } from '@/components/layout/SiteShell';
import { DeFiPageHeroStage } from '@/components/hero/DeFiPageHeroStage';
import { HudSectionRail } from '@/components/sections/HomeSections';
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
      { label: 'Insulated Sectional Garage Doors', href: '/insulated-sectional-garage-doors' },
      { label: 'Single Skin Sectional Garage Doors', href: '/single-skin-sectional-garage-doors' },
      { label: 'Roller Garage Doors', href: '/roller-garage-doors' },
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
      { label: 'Swing Gates', href: '/swing-gates' },
      { label: 'Sliding Gates', href: '/sliding-gates' },
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
      {/* 1. Architectural HUD Stage */}
      <DeFiPageHeroStage
        ariaLabel="BETA DOORS Product Categories 16:9 Hero Stage"
        badgeText="Pioneers in the door automation industry · Australia Wide"
        badgeHref="/about-us"
        headlinePrimary="Product Categories &"
        headlineGradient="Door Automation Systems"
        subheadline="At Beta, we are pioneers in the door automation industry. We offer a comprehensive range of solutions for Commercial and Residential Garage Door and Gates — from sectional and roller door operators to accessories, WiFi capabilities, springs, and receivers."
        primaryCtaLabel="Explore Online Shop"
        primaryCtaHref="/shop"
        secondaryCtaLabel="Enquire Now"
        secondaryCtaHref="#products-enquiry"
        scrollTargetId="products-bento-insights"
        topLeftNode={{ label: 'Garage Door Openers', metric: '7 Years Warranty' }}
        topRightNode={{ label: 'Roller Door Openers', metric: '1000N – 1800N' }}
        bottomLeftNode={{ label: 'Sectional Springs', metric: '10+ Sizes' }}
        bottomRightNode={{ label: 'Gate Automation', metric: 'Swing & Sliding' }}
        horizonSlides={[
          { label: '01/04 · Product Categories', tag: 'Garage Doors & Aria 121 Openers' },
          { label: '02/04 · Product Categories', tag: 'Roller Door Openers (5 Years Warranty)' },
          { label: '03/04 · Product Categories', tag: 'BETA & LIFE Gate Automation' },
          { label: '04/04 · Product Categories', tag: 'Springs, Hardware & Smart Accessories' },
        ]}
      />

      {/* 2. "What We Offer" 4-Card Sharp HUD Bento Grid */}
      <section
        id="products-bento-insights"
        className="w-full max-w-[1760px] mx-auto px-3 sm:px-5 lg:px-7 py-14"
      >
        <HudSectionRail
          code="HUD.PROD.01"
          sector="WHAT WE OFFER // BETADOORS.COM.AU SPECIFICATIONS"
          status="AS/NZS VERIFIED"
        />

        <div className="max-w-2xl mb-10 space-y-2.5">
          <div className="inline-flex items-center gap-2 rounded-none border border-[#EC008C]/40 bg-[#EC008C]/15 px-3 py-1 font-mono text-[11px] text-[#ff7ac6]">
            <Sparkles className="w-3.5 h-3.5 text-[#EC008C]" />
            <span>WHAT WE OFFER · BETADOORS.COM.AU SPECIFICATIONS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-white">
            Speed in Service, Quality in Product
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Every product undergoes rigorous testing to ensure it meets our high Australian standards, backed by dedicated installer support and warranty coverage.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Card 1 (Left 7 cols): Garage Door Openers & 7 Years Warranty */}
          <div className="lg:col-span-7 hud-corner-brackets brand-animated-border hud-technical-grid rounded-none bg-[#0B0C10] border border-white/[0.09] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              <div className="sm:col-span-5 space-y-1">
                <div className="text-[10px] font-mono text-[#ff7ac6] uppercase tracking-wider">
                  WARRANTY.COVERAGE // PDO
                </div>
                <div className="text-3xl sm:text-5xl font-bold font-mono tracking-tight text-white tabular-nums">
                  7 YEARS <span className="text-[#EC008C]">■</span>
                </div>
                <div className="text-xs text-slate-400">
                  Sectional &amp; Tilt Garage Door Openers
                </div>
              </div>

              {/* Sharp CAD Schematic Force Diagram */}
              <div className="sm:col-span-7 relative h-36 flex items-center justify-center bg-[#08090C] border border-white/[0.08] p-3">
                <svg viewBox="0 0 320 120" className="w-full h-full">
                  <line
                    x1="16"
                    y1="30"
                    x2="304"
                    y2="30"
                    stroke="rgba(236,0,140,0.3)"
                    strokeWidth="1"
                    className="hud-rail-dashed"
                  />
                  <line
                    x1="16"
                    y1="60"
                    x2="304"
                    y2="60"
                    stroke="#EC008C"
                    strokeWidth="1.5"
                    className="hud-animated-trace"
                  />
                  <line
                    x1="16"
                    y1="90"
                    x2="304"
                    y2="90"
                    stroke="rgba(56,189,248,0.35)"
                    strokeWidth="1"
                    className="hud-rail-dashed"
                  />
                  <rect x="24" y="18" width="76" height="22" fill="#14161D" stroke="rgba(255,255,255,0.2)" />
                  <text x="62" y="32" textAnchor="middle" fill="#F8FAFC" fontSize="8.5" fontFamily="monospace">
                    800N / 1000N
                  </text>
                  <rect x="122" y="48" width="76" height="22" fill="#14161D" stroke="#EC008C" />
                  <text x="160" y="62" textAnchor="middle" fill="#F8FAFC" fontSize="8.5" fontFamily="monospace">
                    1200N ARIA
                  </text>
                  <rect x="218" y="78" width="82" height="22" fill="#14161D" stroke="rgba(56,189,248,0.6)" />
                  <text x="259" y="92" textAnchor="middle" fill="#F8FAFC" fontSize="8.5" fontFamily="monospace">
                    1500N + WIFI
                  </text>
                </svg>
              </div>
            </div>

            <div className="my-5 p-2 rounded-none bg-[#08090C] border border-white/[0.08] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
              <Link
                href="/sectional-and-tilt-door-opener-range"
                className="px-3 py-1.5 rounded-none bg-[#0B0C10] hover:bg-white/[0.08] border border-white/10 text-slate-300 transition-colors"
              >
                [01] Aria 121 Sectional Opener
              </Link>
              <Link
                href="/product/motor-pack"
                className="keep-white-text px-3.5 py-1.5 rounded-none bg-[#EC008C] text-white font-bold"
              >
                [02] WiFi Motor Pack ($650–$730)
              </Link>
              <Link
                href="/beta-doors-manuals"
                className="px-3 py-1.5 rounded-none text-slate-400 hover:text-white transition-colors"
              >
                [03] Asterion PDO Manual →
              </Link>
            </div>

            <div className="space-y-1.5 pt-3 border-t border-white/[0.07]">
              <h3 className="text-base sm:text-lg font-semibold text-white">
                Garage Door Openers (1000N · 1200N · 1500N)
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Sectional and tilt door operators backed by a 7-year warranty, hopping code security, photocell safety beams, and optional WiFi kit.
              </p>
            </div>
          </div>

          {/* Card 2 (Right 5 cols): Sharp Columns for Roller Door Openers */}
          <div className="lg:col-span-5 hud-corner-brackets brand-animated-border hud-technical-grid rounded-none bg-[#0B0C10] border border-white/[0.09] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="h-48 flex items-end justify-center gap-4 sm:gap-5 pt-4 px-2">
              {[
                { label: '1800N', height: '100%' },
                { label: '1500N', height: '86%' },
                { label: '1200N', height: '72%' },
                { label: '1000N', height: '58%' },
                { label: '5 YR', height: '46%' },
              ].map((bar, idx) => (
                <div
                  key={bar.label}
                  className="flex flex-col items-center gap-2 h-full justify-end flex-1 max-w-[46px]"
                >
                  <div
                    style={{ height: bar.height }}
                    className={`w-full rounded-none border-t border-x relative flex justify-center pt-2 ${
                      idx === 0
                        ? 'bg-gradient-to-b from-[#EC008C]/65 via-[#EC008C]/20 to-transparent border-[#EC008C]'
                        : 'bg-gradient-to-b from-slate-400/35 via-slate-400/10 to-transparent border-white/25'
                    }`}
                  >
                    <span className="w-4 h-1 rounded-none bg-[#EC008C]" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-300 font-bold tabular-nums">
                    {bar.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-1.5 pt-4 border-t border-white/[0.07]">
              <h3 className="text-base sm:text-lg font-semibold text-white">
                Roller Door Openers (5 Years Warranty)
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Available in 1000N and 1500N residential options plus our heavy-duty 1800N commercial roller door opener.
              </p>
            </div>
          </div>

          {/* Card 3 (Bottom-Left 5 cols): Sectional & Tilt Door Springs */}
          <div className="lg:col-span-5 hud-corner-brackets brand-animated-border hud-technical-grid rounded-none bg-[#0B0C10] border border-white/[0.09] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="grid grid-cols-2 gap-3.5">
              <Link
                href="/hardware"
                className="rounded-none bg-[#08090C] border border-white/[0.09] hover:border-[#EC008C]/60 p-4 space-y-2.5 transition-colors"
              >
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#ff7ac6]">
                  <span className="w-1.5 h-3.5 bg-amber-400" />
                  <span>SECTIONAL SPRINGS</span>
                </div>
                <div className="text-[11px] text-slate-400">Calibration Range</div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums">
                  10+ SIZES
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  Custom Installer Software
                </div>
              </Link>

              <Link
                href="/garage-door-spring-estimator"
                className="rounded-none bg-[#08090C] border border-white/[0.09] hover:border-[#EC008C]/60 p-4 space-y-2.5 transition-colors"
              >
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#ff7ac6]">
                  <span className="w-1.5 h-3.5 bg-[#EC008C]" />
                  <span>TILT SPRINGS</span>
                </div>
                <div className="text-[11px] text-slate-400">Coverage</div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums">
                  FULL RANGE
                </div>
                <div className="text-[11px] text-[#EC008C] font-mono font-bold">
                  OPEN ESTIMATOR →
                </div>
              </Link>
            </div>

            <div className="space-y-1.5 pt-4 border-t border-white/[0.07]">
              <h3 className="text-base sm:text-lg font-semibold text-white">
                Sectional &amp; Tilt Door Springs
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Over 10 sizes of sectional springs, full range of tilt door springs, and custom sectional spring software for installers.
              </p>
            </div>
          </div>

          {/* Card 4 (Bottom-Right 7 cols): Gate Automation & Accessories Matrix */}
          <div className="lg:col-span-7 hud-corner-brackets brand-animated-border hud-technical-grid rounded-none bg-[#0B0C10] border border-white/[0.09] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-1 pb-3 border-b border-white/[0.07]">
              <h3 className="text-base sm:text-lg font-semibold text-white">
                Gate Automation &amp; Smart Accessories
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Swing &amp; Sliding Gate Openers, Hopping Code Remote Controls, External Receivers, and Universal WiFi Kits.
              </p>
            </div>

            <div className="h-44 flex items-end justify-center gap-3 sm:gap-5 pt-6 px-2">
              {[
                {
                  name: 'B600 / B550',
                  tag: 'BETA Gate',
                  height: '65%',
                  color: 'from-amber-400/50 via-amber-500/15 to-transparent border-amber-400/50',
                },
                {
                  name: 'LIFE HP4/HP6',
                  tag: 'Sliding Gate',
                  height: '86%',
                  color: 'from-[#EC008C]/65 via-[#EC008C]/20 to-transparent border-[#EC008C]',
                },
                {
                  name: 'LIFE OP2–OP5',
                  tag: 'Swing Gate',
                  height: '100%',
                  color: 'from-emerald-400/55 via-teal-400/20 to-transparent border-emerald-400/50',
                },
                {
                  name: '2-Ch Receiver',
                  tag: 'External',
                  height: '62%',
                  color: 'from-sky-400/50 via-sky-500/15 to-transparent border-sky-400/50',
                },
                {
                  name: 'WiFi + Beams',
                  tag: 'Smart Kit',
                  height: '76%',
                  color: 'from-slate-400/50 via-slate-500/15 to-transparent border-slate-400/50',
                },
              ].map((col, idx) => (
                <div
                  key={col.name}
                  onClick={() => setActiveBarIndex(idx)}
                  className="flex flex-col items-center justify-end h-full flex-1 max-w-[88px] cursor-pointer group"
                >
                  <span className="text-[10px] font-mono text-slate-300 mb-1.5 tabular-nums">
                    {col.tag}
                  </span>
                  <div
                    style={{ height: col.height }}
                    className={`w-full rounded-none bg-gradient-to-b ${col.color} border-t border-x relative flex justify-center pt-1.5 transition-all group-hover:brightness-125`}
                  >
                    <span className="w-4 h-1 rounded-none bg-white/90" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 mt-2 truncate max-w-full">
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
                  className={`h-1.5 rounded-none transition-all cursor-pointer ${
                    activeBarIndex === idx ? 'w-7 bg-[#EC008C]' : 'w-4 bg-slate-500/35'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. All 6 Official Product Categories (0px Sharp HUD Cards) */}
      <section className="w-full max-w-[1760px] mx-auto px-3 sm:px-5 lg:px-7 py-12 space-y-10">
        <HudSectionRail
          code="HUD.PROD.02"
          sector="OFFICIAL BETADOORS.COM.AU/PRODUCTS/ DIRECTORY"
          status="06 CORE FAMILIES"
        />

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div className="space-y-1.5">
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-[#EC008C]">
              OFFICIAL BETADOORS.COM.AU/PRODUCTS/ DIRECTORY
            </div>
            <h2 className="text-2xl sm:text-4xl font-semibold text-white tracking-tight">
              6 Core Product Categories
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Select any category below to inspect models, technical specifications, and sub-ranges.
            </p>
          </div>
          <Link
            href="/shop"
            className="keep-white-text inline-flex items-center gap-2 rounded-none bg-[#EC008C] hover:bg-[#d4007d] px-5 py-2.5 text-xs font-mono font-bold text-white transition-colors self-start"
          >
            <span>OPEN ONLINE SHOP ({products.length} PRODUCTS)</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {OFFICIAL_PRODUCT_CATEGORIES.map((cat) => (
            <article
              key={cat.id}
              className="group hud-corner-brackets brand-animated-border bg-[#0B0C10] border border-white/[0.09] rounded-none overflow-hidden flex flex-col justify-between transition-all"
            >
              <div>
                <div className="px-4 py-2 border-b border-white/[0.07] bg-[#08090C] flex items-center justify-between text-[10px] font-mono">
                  <span className="text-[#EC008C] font-bold">SYS.CAT // [{cat.number}]</span>
                  <span className="text-slate-400">{cat.href}</span>
                </div>
                <Link href={cat.href} className="block aspect-video w-full border-b border-white/[0.08] bg-[#12141A] overflow-hidden">
                  <ProductTechnicalArtwork
                    type={cat.artwork}
                    title={cat.title}
                    className="w-full h-full"
                  />
                </Link>
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-semibold text-white">
                    <Link href={cat.href} className="hover:text-[#EC008C] transition-colors">
                      {cat.title}
                    </Link>
                  </h3>
                  <p className="text-xs font-mono text-[#ff7ac6]">{cat.subtitle}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{cat.description}</p>

                  <ul className="pt-2 space-y-1.5 border-t border-white/[0.07]">
                    {cat.subItems.map((sub) => (
                      <li key={sub.label}>
                        <Link
                          href={sub.href}
                          className="flex items-center justify-between text-xs text-slate-300 hover:text-[#EC008C] py-1"
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
                  className="w-full inline-flex items-center justify-center gap-2 rounded-none bg-[#08090C] hover:bg-[#EC008C] text-white hover:keep-white-text border border-white/15 py-2.5 px-4 text-xs font-mono font-bold transition-colors"
                >
                  <span>EXPLORE {cat.title.toUpperCase()}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Direct Storefront Preview Strip */}
      <section className="w-full max-w-[1760px] mx-auto px-3 sm:px-5 lg:px-7 py-8">
        <div className="hud-corner-brackets rounded-none border border-white/[0.09] bg-[#0B0C10] p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.07] pb-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#ff7ac6]">
                DIRECT STOREFRONT · CAMPBELLFIELD VIC 3061
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-semibold text-white">
                Direct Online Shop Products
              </h2>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-none border border-white/15 bg-[#08090C] px-4 py-2 text-xs font-mono font-semibold text-white hover:bg-white/[0.08]"
            >
              <span>GO TO SHOP</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#EC008C]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {products.map((prod) => (
              <Link
                key={prod.id}
                href={prod.path}
                className="hud-corner-brackets rounded-none brand-animated-border border border-white/[0.09] bg-[#08090C] p-4 flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="aspect-video w-full rounded-none overflow-hidden border border-white/[0.08] bg-[#12141A] mb-3">
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
                <div className="mt-3 pt-2 border-t border-white/[0.07] flex items-center justify-between text-xs font-mono text-[#ff7ac6] font-bold tabular-nums">
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
      <section id="products-enquiry" className="w-full max-w-[1760px] mx-auto px-3 sm:px-5 lg:px-7 py-12">
        <EnquiryForm
          sourcePagePath="/products/"
          heading="Make an Enquiry — Product Selection, Trade & Installer Support"
          subheading="We're available Australia wide! Contact our Campbellfield head office (1300 238 243 · sales@betadoors.com.au) for product specifications, dealer pricing, or installation quotes."
        />
      </section>
    </SiteShell>
  );
}
