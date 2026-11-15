'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronUp,
  ChevronDown,
  Zap,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Crosshair,
  Activity,
  SlidersHorizontal,
  ShoppingCart,
} from 'lucide-react';
import { useBetaDoors } from '@/components/providers/BetaDoorsProvider';
import { formatAudCents } from '@/lib/domain-logic';
import { ProductTechnicalArtwork } from '@/components/brand/ProductTechnicalArtwork';

/**
 * Reusable Animated HUD Schematic Section Rail
 */
function HudSectionRail({
  code,
  sector,
  status = 'ONLINE // CALIBRATED',
}: {
  code: string;
  sector: string;
  status?: string;
}) {
  return (
    <div className="mb-6 flex items-center gap-3 select-none" aria-hidden="true">
      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#EC008C]/15 border border-[#EC008C]/40 text-[10px] font-mono font-semibold tracking-widest text-[#ff7ac6] shrink-0">
        <span className="w-1.5 h-1.5 bg-[#EC008C] animate-pulse" />
        <span>{code}</span>
      </div>

      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 shrink-0 hidden sm:inline">
        {sector}
      </span>

      <div className="relative flex-1 h-4 flex items-center overflow-hidden">
        <svg
          viewBox="0 0 800 16"
          preserveAspectRatio="none"
          className="w-full h-4"
        >
          <line
            x1="0"
            y1="8"
            x2="800"
            y2="8"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
            className="hud-rail-dashed"
          />
          <line
            x1="0"
            y1="8"
            x2="800"
            y2="8"
            stroke="#EC008C"
            strokeWidth="1.5"
            className="hud-animated-trace"
          />
          <rect x="120" y="5" width="6" height="6" fill="rgba(236,0,140,0.6)" />
          <rect x="420" y="6" width="4" height="4" fill="rgba(255,255,255,0.3)" />
          <rect x="680" y="5" width="6" height="6" fill="rgba(56,189,248,0.6)" />
        </svg>
      </div>

      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 shrink-0 hidden md:inline">
        [{status}]
      </span>
    </div>
  );
}

/**
 * Interactive 4-Card Architectural HUD Bento Grid ("Meet Marvellous Engineering")
 * with live Melbourne Hub Radar, Interactive Lifting Force Cylinders, Automation Pack Tabs, and Storefront Matrix.
 */
export function DefiBentoInsightsSection() {
  const [activeHubIdx, setActiveHubIdx] = useState(0);
  const [activeCylinderIdx, setActiveCylinderIdx] = useState(2); // Default 1200N
  const [activePackTab, setActivePackTab] = useState<number>(0);
  const [activeBarPage, setActiveBarPage] = useState(1); // Default Motor 1200N

  const melbourneHubs = [
    {
      name: 'Campbellfield HQ',
      postcode: 'VIC 3061',
      coord: '37.6690° S, 144.9567° E',
      corridor: 'Northern Operations Desk · 5/1730 Hume Hwy',
      sla: 'IMMEDIATE DISPATCH',
      nodeX: 225,
      nodeY: 46,
      href: '/garage-door-repairs-campbellfield-3061-beta-doors/',
    },
    {
      name: 'Craigieburn',
      postcode: 'VIC 3064',
      coord: '37.5960° S, 144.9400° E',
      corridor: 'Hume Growth Corridor · Residential & Trade',
      sla: '< 90 MIN RESPONSE',
      nodeX: 265,
      nodeY: 28,
      href: '/garage-door-repairs-craigieburn-3064-beta-doors/',
    },
    {
      name: 'Epping',
      postcode: 'VIC 3076',
      coord: '37.6530° S, 145.0140° E',
      corridor: 'North-East Industrial & Domestic Bays',
      sla: 'SAME-DAY SERVICE',
      nodeX: 295,
      nodeY: 56,
      href: '/garage-door-repairs-epping-3076-beta-doors/',
    },
    {
      name: 'Essendon',
      postcode: 'VIC 3040',
      coord: '37.7490° S, 144.9140° E',
      corridor: 'Inner North-West Architectural Doors',
      sla: 'SAME-DAY SERVICE',
      nodeX: 165,
      nodeY: 78,
      href: '/garage-door-repairs-essendon-3040-beta-doors/',
    },
    {
      name: 'Narre Warren',
      postcode: 'VIC 3805',
      coord: '38.0260° S, 145.3020° E',
      corridor: 'South-East Metro Dispatch Corridor',
      sla: 'SAME-DAY SERVICE',
      nodeX: 312,
      nodeY: 88,
      href: '/garage-door-repairs-narre-warren-3805-beta-doors/',
    },
  ];

  const cylinders = [
    {
      label: '1800N',
      pct: 95,
      cycleRating: 'Heavy Industrial · Continuous Duty',
      application: 'Heavy Commercial Roller Shutters & High-Cycle Warehouses',
      model: 'RDO-1800N PRO',
    },
    {
      label: '1500N',
      pct: 82,
      cycleRating: 'Oversized Double Bay · Soft-Start',
      application: 'Custom Timber, Clad & Oversized Double Sectional Doors',
      model: 'BD-MP-1500N ($730)',
    },
    {
      label: '1200N',
      pct: 68,
      cycleRating: 'Standard Double Bay · WiFi Ready',
      application: 'Standard Double Insulated Sectional & Panel Lift Doors',
      model: 'BD-MP-1200N ($690)',
    },
    {
      label: '1000N',
      pct: 54,
      cycleRating: 'Residential Drum Drive · Dual Remote',
      application: 'Single & Double Residential Continuous Steel Roller Doors',
      model: 'BD-RDO-1000N ($590)',
    },
    {
      label: '800N',
      pct: 40,
      cycleRating: 'Single Bay Sectional · Whisper Belt',
      application: 'Single Bay Residential Sectional & Tilt Garage Doors',
      model: 'BD-MP-800N ($650)',
    },
  ];

  const driveComparisonTabs = [
    {
      id: 'panel-pack',
      tabLabel: '01 · Panel Motor Pack',
      sku: 'BD-MP-SERIES',
      force: '800N – 1500N',
      price: '$650 – $730 AUD',
      warranty: '7-Year Motor Warranty',
      highlights: ['Built-in Smart WiFi', 'Infrared Safety Beams', '3 × P2011 + Wall Switch'],
      href: '/product/motor-pack/',
    },
    {
      id: 'roller-kit',
      tabLabel: '02 · Roller Opener Kit',
      sku: 'BD-RDO-1000N',
      force: '1000N – 1800N',
      price: '$590 AUD Complete',
      warranty: '5-Year Drive Warranty',
      highlights: ['Whisper Drum Drive', '2 × P2011 Remotes', 'Wireless Wall Button'],
      href: '/product/roller-door-opener/',
    },
    {
      id: 'gate-kit',
      tabLabel: '03 · BETA & LIFE Gates',
      sku: 'B600 / LIFE-HP4',
      force: '600kg – 1500kg',
      price: 'Custom Trade Quote',
      warranty: 'Commercial Perimeter Rated',
      highlights: ['Sliding & Swing Drives', 'Italian LIFE & BETA', 'Photocell Integration'],
      href: '/gate-opener-brands/',
    },
  ];

  const spaceColumns = [
    {
      value: '650',
      label: 'Motor 800N',
      fullName: 'Panel Door Motor Pack (800N)',
      sku: 'BD-MP-800N',
      href: '/product/motor-pack/',
      heightPct: 54,
      gradient: 'from-amber-200/75 via-amber-500/20 to-transparent',
      capColor: 'bg-amber-300',
    },
    {
      value: '690',
      label: 'Motor 1200N',
      fullName: 'Panel Door Motor Pack (1200N)',
      sku: 'BD-MP-1200N',
      href: '/product/motor-pack/',
      heightPct: 76,
      gradient: 'from-[#EC008C]/85 via-rose-500/25 to-transparent',
      capColor: 'bg-[#EC008C]',
    },
    {
      value: '730',
      label: 'Motor 1500N',
      fullName: 'Panel Door Motor Pack (1500N)',
      sku: 'BD-MP-1500N',
      href: '/product/motor-pack/',
      heightPct: 96,
      gradient: 'from-emerald-200/85 via-teal-400/25 to-transparent',
      capColor: 'bg-emerald-300',
    },
    {
      value: '590',
      label: 'Roller RDO',
      fullName: 'Roller Door Opener (1000N Kit)',
      sku: 'BD-RDO-1000N',
      href: '/product/roller-door-opener/',
      heightPct: 50,
      gradient: 'from-sky-200/75 via-sky-400/20 to-transparent',
      capColor: 'bg-sky-300',
    },
    {
      value: '240',
      label: 'Remote Pack',
      fullName: 'Receiver & 3 × P2011 Remote Pack',
      sku: 'BD-REM-PACK4',
      href: '/product/receiver-and-remote-pack/',
      heightPct: 62,
      gradient: 'from-slate-200/80 via-slate-400/25 to-transparent',
      capColor: 'bg-slate-200',
    },
  ];

  const selectedHub = melbourneHubs[activeHubIdx] || melbourneHubs[0];
  const selectedCylinder = cylinders[activeCylinderIdx] || cylinders[2];
  const selectedPack = driveComparisonTabs[activePackTab] || driveComparisonTabs[0];
  const selectedSpaceCol = spaceColumns[activeBarPage] || spaceColumns[1];

  return (
    <section
      data-cms-section="home-bento-telemetry"
      data-cms-label="Architectural Engineering Bento Grid"
      aria-labelledby="bento-insights-heading"
      className="relative w-full max-w-[1760px] mx-auto px-3 sm:px-5 lg:px-7 py-14 overflow-hidden"
    >
      <HudSectionRail
        code="HUD.01"
        sector="ARCHITECTURAL TELEMETRY // MELBOURNE OPERATIONS"
        status="11 HUBS ACTIVE"
      />

      {/* Section Header */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#ff7ac6]">
            <Activity className="w-3.5 h-3.5 text-[#EC008C]" />
            <span>Precision Door &amp; Gate Engineering</span>
          </div>
          <h2
            id="bento-insights-heading"
            style={{ textWrap: 'balance' }}
            className="text-2xl sm:text-4xl font-semibold text-white tracking-tight"
          >
            Meet Marvellous Engineering
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
          BETA DOORS replaces fragmented sourcing with integrated doors, whisper-quiet motors, and same-day Melbourne field servicing from our Campbellfield headquarters.
        </p>
      </div>

      {/* 4-Card Asymmetric HUD Bento Grid (rounded-xl + hud-corner-brackets) */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        {/* TOP-LEFT CARD (Col Span 7): Interactive Melbourne 11-Hub Dispatch Radar */}
        <div className="lg:col-span-7 hud-corner-brackets brand-animated-border bg-[#0B0C10] border border-white/[0.09] rounded-xl p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden min-h-[360px]">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 86% 36%, rgba(236, 0, 140, 0.11) 0%, transparent 55%)',
            }}
          />

          {/* Top Visual Area: 98.2% On-Time SLA + Animated HUD Radar Trajectory */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center min-h-[150px]">
            <div className="sm:col-span-5 space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#EC008C]/15 border border-[#EC008C]/40 text-[10px] font-mono text-[#ff7ac6]">
                <span className="w-1.5 h-1.5 bg-[#EC008C] animate-pulse" />
                <span>{selectedHub.sla}</span>
              </div>
              <div className="text-4xl sm:text-5xl font-light text-white tracking-tight tabular-nums">
                98.2% <span className="text-[#EC008C]">.</span>
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                {selectedHub.coord}
              </div>
            </div>

            {/* Animated HUD Orbital Radar SVG */}
            <div className="sm:col-span-7 relative h-40">
              <svg viewBox="0 0 360 140" className="w-full h-full">
                {/* HUD Grid Crosshairs */}
                <line
                  x1="20"
                  y1="70"
                  x2="340"
                  y2="70"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="1"
                  className="hud-rail-dashed"
                />
                <line
                  x1="200"
                  y1="8"
                  x2="200"
                  y2="132"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="1"
                  className="hud-rail-dashed"
                />

                <ellipse
                  cx="200"
                  cy="72"
                  rx="138"
                  ry="44"
                  fill="none"
                  stroke="rgba(255,255,255,0.14)"
                  strokeWidth="1"
                  transform="rotate(-12 200 72)"
                  className="hud-rail-dashed"
                />
                <ellipse
                  cx="200"
                  cy="72"
                  rx="138"
                  ry="44"
                  fill="none"
                  stroke="#EC008C"
                  strokeWidth="1.5"
                  transform="rotate(-12 200 72)"
                  className="hud-animated-trace"
                />
                <ellipse
                  cx="205"
                  cy="72"
                  rx="92"
                  ry="28"
                  fill="none"
                  stroke="rgba(236,0,140,0.32)"
                  strokeWidth="1.2"
                  transform="rotate(-12 205 72)"
                />

                {/* Animated HUD Vector Line from HQ (225,46) to Selected Suburb */}
                <line
                  x1="225"
                  y1="46"
                  x2={selectedHub.nodeX}
                  y2={selectedHub.nodeY}
                  stroke="#EC008C"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                />

                {/* HQ Node */}
                <circle cx="225" cy="46" r="4" fill="#EC008C" />
                <rect
                  x="188"
                  y="18"
                  width="72"
                  height="18"
                  rx="3"
                  fill="#14161C"
                  stroke="rgba(236,0,140,0.55)"
                />
                <text
                  x="224"
                  y="30"
                  textAnchor="middle"
                  fill="#F8FAFC"
                  fontSize="8"
                  fontFamily="monospace"
                >
                  HQ VIC-3061
                </text>

                {/* Dynamic Active Target Reticle */}
                <circle
                  cx={selectedHub.nodeX}
                  cy={selectedHub.nodeY}
                  r="4.5"
                  fill="#38BDF8"
                />
                <circle
                  cx={selectedHub.nodeX}
                  cy={selectedHub.nodeY}
                  r="11"
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="1"
                  strokeDasharray="5 3"
                  className="hud-reticle-ring"
                />
                <rect
                  x={Math.min(280, Math.max(10, selectedHub.nodeX - 34))}
                  y={Math.max(4, selectedHub.nodeY - 26)}
                  width="68"
                  height="17"
                  rx="3"
                  fill="#181A20"
                  stroke="rgba(56,189,248,0.55)"
                />
                <text
                  x={Math.min(314, Math.max(44, selectedHub.nodeX))}
                  y={Math.max(15, selectedHub.nodeY - 15)}
                  textAnchor="middle"
                  fill="#F8FAFC"
                  fontSize="7.5"
                  fontFamily="monospace"
                >
                  {selectedHub.postcode}
                </text>
              </svg>
            </div>
          </div>

          {/* Interactive Hub Switcher Tabs (rounded-md with smooth motion indicator) */}
          <div className="relative z-10 my-3 space-y-2.5">
            <div className="flex flex-wrap items-center gap-1.5">
              {melbourneHubs.map((hub, idx) => {
                const isActive = activeHubIdx === idx;
                return (
                  <button
                    key={hub.postcode}
                    type="button"
                    onClick={() => setActiveHubIdx(idx)}
                    className={`relative px-2.5 py-1.5 rounded-md text-[11px] font-mono transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#EC008C] text-white font-semibold shadow-[0_0_16px_rgba(236,0,140,0.4)] keep-white-text'
                        : 'bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.08] text-slate-300'
                    }`}
                  >
                    {hub.name} · {hub.postcode.replace('VIC ', '')}
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedHub.postcode}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
                className="flex flex-wrap items-center justify-between gap-2 py-2 px-3 rounded-lg bg-[#08090C] border border-white/[0.08] text-xs"
              >
                <div className="flex items-center gap-2 text-slate-200">
                  <MapPin className="w-3.5 h-3.5 text-[#EC008C] shrink-0" />
                  <span className="font-semibold text-white">
                    {selectedHub.name}
                  </span>
                  <span className="text-slate-400 hidden sm:inline">
                    — {selectedHub.corridor}
                  </span>
                </div>
                <Link
                  href={selectedHub.href}
                  className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-[#ff7ac6] hover:text-white transition-colors"
                >
                  <span>DISPATCH PAGE</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Title & Description */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3 pt-2.5 border-t border-white/[0.06]">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-white">
                Same-Day Melbourne Dispatch
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Rapid garage door, spring, cable, and commercial shutter repairs across 11 Melbourne corridors.
              </p>
            </div>
            <Link
              href="/services/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-mono font-medium text-white shrink-0 transition-colors"
            >
              <span>ALL 11 HUBS</span>
              <ArrowRight className="w-3 h-3 text-[#EC008C]" />
            </Link>
          </div>
        </div>

        {/* TOP-RIGHT CARD (Col Span 5): Interactive 5 Vertical Telemetry Force Bars */}
        <div className="lg:col-span-5 hud-corner-brackets brand-animated-border bg-[#0B0C10] border border-white/[0.09] rounded-xl p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden min-h-[360px]">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 20% 40%, rgba(236, 0, 140, 0.1) 0%, transparent 55%)',
            }}
          />

          <div className="relative z-10 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-slate-400">
            <span>TORQUE.CALIBRATION // N-METRIC</span>
            <span className="text-[#ff7ac6]">{selectedCylinder.cycleRating}</span>
          </div>

          {/* 5 Interactive HUD Force Columns (rounded-md instead of bubbly pills) */}
          <div className="relative z-10 flex items-end justify-center gap-3 sm:gap-5 h-44 pt-4 px-2">
            {cylinders.map((cyl, idx) => {
              const isSelected = activeCylinderIdx === idx;
              return (
                <button
                  key={cyl.label}
                  type="button"
                  onClick={() => setActiveCylinderIdx(idx)}
                  onMouseEnter={() => setActiveCylinderIdx(idx)}
                  aria-label={`Inspect ${cyl.label} lifting force`}
                  className="flex flex-col items-center justify-end h-full w-12 group cursor-pointer focus:outline-none"
                >
                  <motion.div
                    initial={false}
                    animate={{ height: `${cyl.pct}%` }}
                    transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                    className={`w-full rounded-t-md border-x border-t relative flex flex-col items-center pt-2 transition-colors duration-200 ${
                      isSelected
                        ? 'bg-gradient-to-b from-[#EC008C]/65 via-[#EC008C]/20 to-transparent border-[#EC008C] shadow-[0_0_20px_rgba(236,0,140,0.35)]'
                        : 'bg-gradient-to-b from-white/25 via-white/10 to-transparent border-white/20 group-hover:border-white/40'
                    }`}
                  >
                    <span
                      className={`w-5 h-1 rounded-xs transition-all ${
                        isSelected
                          ? 'bg-white shadow-[0_0_8px_#fff]'
                          : 'bg-white/60'
                      }`}
                    />
                  </motion.div>
                  <span
                    className={`mt-2 text-[11px] font-mono tabular-nums transition-colors ${
                      isSelected
                        ? 'text-[#ff7ac6] font-bold'
                        : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  >
                    {cyl.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Force Spec Readout Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCylinder.label}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="relative z-10 my-2.5 p-3 rounded-lg bg-[#08090C] border border-white/[0.08] flex items-center justify-between gap-3"
            >
              <div className="space-y-0.5">
                <div className="text-[11px] font-mono text-[#ff7ac6] font-semibold">
                  [{selectedCylinder.label}] · {selectedCylinder.model}
                </div>
                <div className="text-xs text-slate-300">
                  {selectedCylinder.application}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="relative z-10 text-left pt-2 border-t border-white/[0.06] space-y-1">
            <h3 className="text-base sm:text-lg font-semibold text-white">
              Lifting Force Spectrum
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Select a torque rating above to match residential panel doors up to 1800N commercial shutters.
            </p>
          </div>
        </div>

        {/* BOTTOM-LEFT CARD (Col Span 5): Interactive 3-Tab Drive Comparison Module */}
        <div className="lg:col-span-5 hud-corner-brackets brand-animated-border bg-[#0B0C10] border border-white/[0.09] rounded-xl p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden min-h-[340px]">
          <div className="space-y-3">
            {/* Interactive 3-Tab Segmented Switcher */}
            <div
              role="tablist"
              aria-label="Automation drive comparison tabs"
              className="grid grid-cols-3 gap-1 p-1 rounded-lg bg-[#08090C] border border-white/[0.08]"
            >
              {driveComparisonTabs.map((tab, idx) => {
                const isActive = activePackTab === idx;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActivePackTab(idx)}
                    className={`py-1.5 px-2 rounded-md text-[10px] font-mono font-semibold transition-all cursor-pointer truncate ${
                      isActive
                        ? 'bg-[#EC008C] text-white shadow-sm keep-white-text'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab.tabLabel}
                  </button>
                );
              })}
            </div>

            {/* Animated Active Drive Tab Detail Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPack.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="p-4 rounded-lg bg-[#08090C] border border-white/[0.08] space-y-3"
              >
                <div className="flex items-center justify-between gap-2 border-b border-white/[0.06] pb-2 text-[10px] font-mono">
                  <span className="text-slate-400">SKU // {selectedPack.sku}</span>
                  <span className="text-emerald-400">{selectedPack.warranty}</span>
                </div>

                <div className="flex items-baseline justify-between gap-2">
                  <div>
                    <div className="text-2xl sm:text-3xl font-semibold text-white tabular-nums">
                      {selectedPack.force}
                    </div>
                    <div className="text-xs font-mono text-[#ff7ac6] tabular-nums mt-0.5">
                      {selectedPack.price}
                    </div>
                  </div>
                  <Link
                    href={selectedPack.href}
                    className="keep-white-text inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-[#EC008C] hover:bg-[#d4007d] text-white text-xs font-semibold transition-colors"
                  >
                    <span>Inspect</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Clean Inline Unboxed Spec Bar */}
                <div className="pt-2 border-t border-white/[0.06] flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[10px] font-mono text-slate-300">
                  {selectedPack.highlights.map((h, i) => (
                    <React.Fragment key={h}>
                      {i > 0 && <span className="text-[#EC008C]">/</span>}
                      <span>{h}</span>
                    </React.Fragment>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="text-left pt-4 border-t border-white/[0.06] space-y-1">
            <h3 className="text-base sm:text-lg font-semibold text-white">
              Your Automation Drive Options
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Switch tabs above to compare sectional WiFi motor packs, roller door openers, and commercial gate systems.
            </p>
          </div>
        </div>

        {/* BOTTOM-RIGHT CARD (Col Span 7): Interactive 5-Column Storefront Matrix */}
        <div className="lg:col-span-7 hud-corner-brackets brand-animated-border bg-[#0B0C10] border border-white/[0.09] rounded-xl p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden min-h-[340px]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-white">
                BETA Space · Storefront Matrix
              </h3>
              <p className="text-xs text-slate-400">
                Select any telemetry column below to inspect server-validated AUD pricing and live inventory.
              </p>
            </div>
            <Link
              href={selectedSpaceCol.href}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs font-mono font-medium text-white shrink-0 transition-colors"
            >
              <span>
                {selectedSpaceCol.label}: ${selectedSpaceCol.value} AUD
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#EC008C]" />
            </Link>
          </div>

          {/* 5 Interactive Vertical Columns with Spring Animation (rounded-t-md) */}
          <div className="flex items-end justify-center gap-3.5 sm:gap-7 h-38 my-4 px-2">
            {spaceColumns.map((col, idx) => {
              const isSelected = activeBarPage === idx;
              return (
                <button
                  key={col.label}
                  type="button"
                  onClick={() => setActiveBarPage(idx)}
                  onMouseEnter={() => setActiveBarPage(idx)}
                  className="flex flex-col items-center justify-end h-full w-13 sm:w-16 group cursor-pointer focus:outline-none"
                >
                  <span
                    className={`text-[11px] font-mono tabular-nums mb-1.5 transition-colors ${
                      isSelected
                        ? 'text-white font-semibold'
                        : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  >
                    ${col.value}
                  </span>
                  <motion.div
                    initial={false}
                    animate={{ height: `${col.heightPct}%` }}
                    transition={{ type: 'spring', stiffness: 250, damping: 22 }}
                    className={`w-full rounded-t-md bg-gradient-to-b ${col.gradient} border-x border-t relative transition-colors duration-200 ${
                      isSelected
                        ? 'border-white/50 shadow-[0_0_20px_rgba(236,0,140,0.28)]'
                        : 'border-white/15 opacity-80 group-hover:opacity-100'
                    }`}
                  >
                    <div
                      className={`w-full h-1 rounded-t-md ${col.capColor}`}
                    />
                  </motion.div>
                  <span
                    className={`mt-2 text-[10px] font-mono truncate max-w-full transition-colors ${
                      isSelected
                        ? 'text-[#ff7ac6] font-semibold'
                        : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  >
                    {col.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 5-Segment Pager Indicator + Selected SKU Readout */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2.5 border-t border-white/[0.06]">
            <div className="text-xs text-slate-300 font-mono">
              <span className="text-[#EC008C]">●</span> {selectedSpaceCol.sku} —{' '}
              <span className="text-white font-sans font-medium">
                {selectedSpaceCol.fullName}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {spaceColumns.map((col, idx) => (
                <button
                  key={col.sku}
                  type="button"
                  onClick={() => setActiveBarPage(idx)}
                  aria-label={`Select storefront bar ${idx + 1}`}
                  className={`h-1 rounded-xs transition-all cursor-pointer ${
                    activeBarPage === idx
                      ? 'w-7 bg-[#EC008C]'
                      : 'w-4 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Product-Family Navigation Grid (6 Core Categories) with Interactive HUD Filter Tabs,
 * Wide Viewport Layout, Precision Radii (rounded-xl), and Clean Technical Headers (Zero Bloated Pills)
 */
export function ProductFamilyGridSection() {
  const { brand } = useBetaDoors();
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<
    'all' | 'doors_openers' | 'gates' | 'accessories_hardware'
  >('all');

  const defaultFamilies = [
    {
      id: 'cat_01',
      index: '01',
      group: 'doors_openers' as const,
      badge: 'Custom Australian Bays',
      title: '01. Garage Door Range',
      subtitle: 'Insulated Sectional · Single Skin · Roller Doors',
      description:
        'Architectural overhead sectional doors and durable continuous steel roller doors custom-sized for residential & commercial bays.',
      href: '/garage-door-range/',
      artType: 'sectional_door' as const,
      customImageUrl: undefined as string | undefined,
    },
    {
      id: 'cat_02',
      index: '02',
      group: 'doors_openers' as const,
      badge: 'Aria 121 Series',
      title: '02. Sectional & Tilt Openers',
      subtitle: 'Featuring the Aria 121 Drive Presentation',
      description:
        'Quiet overhead belt/chain automation with soft-start travel profiling and infrared safety beam integration.',
      href: '/sectional-and-tilt-door-opener-range/',
      artType: 'aria_121' as const,
      customImageUrl: undefined as string | undefined,
    },
    {
      id: 'cat_03',
      index: '03',
      group: 'doors_openers' as const,
      badge: '1000N · 1500N · 1800N',
      title: '03. Roller Door Openers',
      subtitle: 'Residential & Heavy-Duty Side Drum Drives',
      description:
        'High-torque side drum drives with dual P2011 handsets, courtesy LED lighting, and wireless wall button.',
      href: '/roller-door-opener-range/',
      artType: 'roller_opener' as const,
      customImageUrl: undefined as string | undefined,
    },
    {
      id: 'cat_04',
      index: '04',
      group: 'gates' as const,
      badge: 'BETA & LIFE Italy',
      title: '04. Gate Opener Brands (BETA & LIFE)',
      subtitle: 'BETA B600/B550 · LIFE HP4, OP2, OP3-OP5, HP6',
      description:
        'Sliding and swing gate automation engineered for residential driveways and commercial security perimeters.',
      href: '/gate-opener-brands',
      artType: 'gate_opener' as const,
      customImageUrl: undefined as string | undefined,
    },
    {
      id: 'cat_05',
      index: '05',
      group: 'accessories_hardware' as const,
      badge: 'P2011 & Smart WiFi',
      title: '05. Smart Accessories & Remotes',
      subtitle: 'Remotes · Wireless Keypad · WiFi Camera · Safety Beams',
      description:
        'Genuine P2011 handsets, Mini2-Relay-03 2-channel receivers, optical safety beams, and smart camera modules.',
      href: '/accessories',
      artType: 'keypad' as const,
      customImageUrl: undefined as string | undefined,
    },
    {
      id: 'cat_06',
      index: '06',
      group: 'accessories_hardware' as const,
      badge: 'Springs, Hinges & Cables',
      title: '06. Structural Hardware & Springs',
      subtitle: 'Steel Line, B&D, Gliderol & Centurion Hinges',
      description:
        'Trade replacement hinges, side/middle bearing plates, calibrated torsion springs, and aircraft-grade lifting cables.',
      href: '/hardware',
      artType: 'hardware_kit' as const,
      customImageUrl: undefined as string | undefined,
    },
  ];

  const rawFamilies =
    brand.categoryCards && brand.categoryCards.length === 6
      ? brand.categoryCards.map((c, idx) => ({
          ...c,
          group:
            idx < 3
              ? ('doors_openers' as const)
              : idx === 3
                ? ('gates' as const)
                : ('accessories_hardware' as const),
        }))
      : defaultFamilies;

  const filteredFamilies = rawFamilies.filter((f) =>
    activeCategoryFilter === 'all' ? true : f.group === activeCategoryFilter
  );

  const filterTabs = [
    { id: 'all' as const, label: 'ALL 06 FAMILIES', count: 6 },
    { id: 'doors_openers' as const, label: 'DOORS & OPENERS', count: 3 },
    { id: 'gates' as const, label: 'GATE AUTOMATION', count: 1 },
    { id: 'accessories_hardware' as const, label: 'REMOTES & HARDWARE', count: 2 },
  ];

  return (
    <section
      data-cms-section="home-product-families"
      data-cms-label="06 Product & Automation Families Grid"
      aria-labelledby="family-grid-heading"
      className="w-full max-w-[1760px] mx-auto px-3 sm:px-5 lg:px-7 py-14"
    >
      <HudSectionRail
        code="HUD.02"
        sector="PRODUCT & AUTOMATION CATALOGUE // 06 ENGINEERED FAMILIES"
        status="16:9 STUDIO SPEC"
      />

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#ff7ac6]">
            <Crosshair className="w-3.5 h-3.5 text-[#EC008C]" />
            <span>06 Engineered Hardware &amp; Automation Families</span>
          </div>
          <h2
            id="family-grid-heading"
            className="text-2xl sm:text-4xl font-semibold text-white tracking-tight"
          >
            Complete Product &amp; Automation Families
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Explore all 11 catalogue routes with unified 16:9 studio photography and verified technical specifications.
          </p>
        </div>

        {/* Interactive HUD Category Filter Bar with Animated Tab Highlight */}
        <div className="flex flex-wrap items-center gap-2">
          <div
            role="tablist"
            aria-label="Filter product families"
            className="inline-flex flex-wrap items-center gap-1 p-1 rounded-lg bg-[#0B0C10] border border-white/[0.09]"
          >
            {filterTabs.map((tab) => {
              const isActive = activeCategoryFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategoryFilter(tab.id)}
                  className={`relative px-3 py-1.5 rounded-md text-[10px] font-mono font-semibold tracking-wider transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#EC008C] text-white shadow-sm keep-white-text'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className="ml-1.5 opacity-75">[{tab.count}]</span>
                </button>
              );
            })}
          </div>

          <Link
            href="/products/"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-white/[0.05] hover:bg-white/[0.12] border border-white/15 text-xs font-mono font-semibold text-white transition-all whitespace-nowrap"
          >
            <span>ALL CATEGORIES</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#EC008C]" />
          </Link>
        </div>
      </div>

      {/* Responsive Architectural Card Grid (rounded-xl outer, rounded-lg inner image, zero bulky pills) */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
      >
        <AnimatePresence mode="popLayout">
          {filteredFamilies.map((fam) => (
            <motion.div
              layout
              key={fam.id || fam.href}
              initial={{ opacity: 0, scale: 0.97, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
            >
              <Link
                href={fam.href}
                className="group hud-corner-brackets brand-animated-border bg-[#0B0C10] border border-white/[0.09] rounded-xl overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-1"
              >
                {/* 16:9 Studio Artwork Frame with Sleek Micro-Index Corner Tag Only */}
                <div className="p-2 pb-0">
                  <div className="relative aspect-video w-full rounded-lg border border-white/[0.08] overflow-hidden bg-[#12141A]">
                    <div className="w-full h-full transition-transform duration-500 group-hover:scale-[1.04]">
                      <ProductTechnicalArtwork
                        type={fam.artType}
                        customImageUrl={fam.customImageUrl}
                        title={fam.title}
                        className="w-full h-full"
                      />
                    </div>

                    {/* Ultra-Crisp Single-Line HUD Micro-Overlay in Top Corners */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                      <span className="studio-floating-badge keep-white-text px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider text-white">
                        [{fam.index}]
                      </span>
                      <span className="studio-floating-badge keep-white-text inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9.5px] font-mono font-medium tracking-wider uppercase text-white whitespace-nowrap">
                        <span className="studio-badge-dot w-1.5 h-1.5 bg-[#EC008C] shrink-0" />
                        <span>{fam.badge}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Structured Architectural Card Body */}
                <div className="p-5 pt-4 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2 pb-2 border-b border-white/[0.06] text-[10px] font-mono tracking-wider uppercase">
                      <span className="text-[#ff7ac6] font-medium truncate">
                        {fam.subtitle}
                      </span>
                      <span className="text-slate-500 shrink-0">
                        CAT // {fam.index}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-[#EC008C] transition-colors">
                      {fam.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {fam.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono font-semibold text-white">
                    <span className="group-hover:text-[#EC008C] transition-colors">
                      INSPECT SPECIFICATION
                    </span>
                    <span className="w-7 h-7 rounded-md bg-white/[0.06] group-hover:bg-[#EC008C] border border-white/10 flex items-center justify-center transition-colors">
                      <ArrowUpRight className="w-3.5 h-3.5 text-white group-hover:keep-white-text" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

/**
 * Direct Storefront — 5 Verified Shop Products with Unobstructed 16:9 Studio Images,
 * Clean Single-Line HUD Metadata Strip (Zero Ugly Image Overlay Pills!), and Interactive Filter Tabs
 */
export function FeaturedAriaAndShopSection() {
  const { products, addToCart } = useBetaDoors();
  const [feedback, setFeedback] = useState<string | null>(null);
  const [shopFilter, setShopFilter] = useState<'all' | 'motors' | 'remotes'>(
    'all'
  );

  const handleQuickAdd = (slug: string) => {
    const prod = products.find((p) => p.slug === slug);
    if (!prod) return;
    const defaultVar = prod.requiresVariant ? '1200N' : null;
    const res = addToCart(prod, defaultVar, 1);
    if (res.ok) {
      setFeedback(
        `Added ${prod.name}${defaultVar ? ` (${defaultVar})` : ''} to cart.`
      );
      window.setTimeout(() => setFeedback(null), 3500);
    }
  };

  const filteredProducts = products.filter((p) => {
    if (shopFilter === 'motors') {
      return p.slug.includes('motor') || p.slug.includes('opener');
    }
    if (shopFilter === 'remotes') {
      return p.slug.includes('remote') || p.slug.includes('receiver');
    }
    return true;
  });

  return (
    <section
      data-cms-section="home-shop-products"
      data-cms-label="Direct Storefront (5 Shop Products)"
      aria-labelledby="featured-aria-heading"
      className="w-full max-w-[1760px] mx-auto px-3 sm:px-5 lg:px-7 py-14 space-y-8"
    >
      <HudSectionRail
        code="HUD.03"
        sector="DIRECT AUSTRALIAN STOREFRONT // 05 VERIFIED PRODUCTS"
        status="GST INCLUSIVE · AUD"
      />

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#ff7ac6]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#EC008C]" />
            <span>Direct Australian Storefront · Authoritative Inventory</span>
          </div>
          <h2
            id="featured-aria-heading"
            className="text-2xl sm:text-4xl font-semibold text-white tracking-tight"
          >
            Direct Storefront — 5 Verified Products
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Authoritative WooCommerce-compatible pricing and live stock, editable in real time via the Admin CMS.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Interactive Storefront Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter storefront products"
            className="inline-flex items-center gap-1 p-1 rounded-lg bg-[#0B0C10] border border-white/[0.09]"
          >
            {[
              { id: 'all' as const, label: 'ALL [05]' },
              { id: 'motors' as const, label: 'DRIVE MOTORS [02]' },
              { id: 'remotes' as const, label: 'REMOTES & RF [03]' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={shopFilter === tab.id}
                onClick={() => setShopFilter(tab.id)}
                className={`px-3 py-1.5 rounded-md text-[10px] font-mono font-semibold tracking-wider transition-colors cursor-pointer ${
                  shopFilter === tab.id
                    ? 'bg-[#EC008C] text-white shadow-sm keep-white-text'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {feedback ? (
            <div
              role="status"
              aria-live="polite"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-emerald-950 border border-emerald-500/40 text-xs text-emerald-200"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{feedback}</span>
            </div>
          ) : (
            <Link
              href="/shop/"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-white/[0.05] hover:bg-white/[0.12] border border-white/15 text-xs font-mono font-semibold text-white transition-all"
            >
              <span>OPEN FULL SHOP</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#EC008C]" />
            </Link>
          )}
        </div>
      </div>

      {/* 5-Column Responsive Architectural Product Grid — Unobstructed 16:9 Images + Clean Single-Line HUD Metadata Bar */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((prod, idx) => (
            <motion.div
              layout
              key={prod.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.22, delay: idx * 0.03 }}
              className="group hud-corner-brackets brand-animated-border bg-[#0B0C10] border border-white/[0.09] rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Clean 16:9 Studio Artwork without bulky multi-line wrapped pills */}
                <div className="p-2 pb-0">
                  <Link
                    href={prod.path}
                    className="relative block aspect-video w-full rounded-lg border border-white/[0.08] overflow-hidden bg-[#12141A]"
                  >
                    <div className="w-full h-full transition-transform duration-500 group-hover:scale-[1.05]">
                      <ProductTechnicalArtwork
                        type={prod.imageSvgType}
                        customImageUrl={prod.customImageUrl}
                        title={prod.name}
                        className="w-full h-full"
                      />
                    </div>
                    {/* Subtle Corner Index Only — never wraps or blocks the product photo */}
                    <span className="studio-floating-badge keep-white-text absolute top-2 left-2 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider text-white pointer-events-none">
                      [0{idx + 1}]
                    </span>
                  </Link>
                </div>

                {/* Structured HUD Technical Metadata Bar + Title + Price */}
                <div className="p-4 pt-3 space-y-2">
                  <div className="flex items-center justify-between gap-1.5 pb-2 border-b border-white/[0.06] text-[10px] font-mono uppercase tracking-wider">
                    <span className="text-slate-400 truncate" title={prod.sku}>
                      {prod.sku}
                    </span>
                    <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold shrink-0 whitespace-nowrap">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{prod.stockCount} IN STOCK</span>
                    </span>
                  </div>

                  <Link
                    href={prod.path}
                    className="block text-sm font-semibold text-white group-hover:text-[#EC008C] transition-colors line-clamp-1"
                  >
                    {prod.name}
                  </Link>

                  <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2 min-h-[34px]">
                    {prod.shortDescription}
                  </p>

                  <div className="pt-1 flex items-baseline justify-between gap-1.5">
                    <span className="text-sm sm:text-[15px] font-bold text-white font-mono tabular-nums whitespace-nowrap">
                      {prod.maxPriceCents
                        ? `$${Math.round(prod.priceCents / 100)} – $${Math.round(prod.maxPriceCents / 100)} AUD`
                        : formatAudCents(prod.priceCents)}
                    </span>
                    <span className="text-[9.5px] font-mono text-slate-500 whitespace-nowrap shrink-0">
                      INC. GST
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0 flex items-center gap-2">
                <Link
                  href={prod.path}
                  className="flex-1 text-center py-2 px-2.5 text-xs font-mono font-medium rounded-md bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-slate-200 transition-colors whitespace-nowrap"
                >
                  {prod.requiresVariant ? 'OPTIONS' : 'DETAILS'}
                </Link>
                <button
                  type="button"
                  onClick={() => handleQuickAdd(prod.slug)}
                  aria-label={`Quick add ${prod.name} to cart`}
                  className="keep-white-text inline-flex items-center gap-1 py-2 px-3 text-xs font-mono font-semibold rounded-md bg-[#EC008C] hover:bg-[#d4007d] text-white shadow-[0_0_14px_rgba(236,0,140,0.35)] transition-colors whitespace-nowrap cursor-pointer"
                >
                  <ShoppingCart className="w-3 h-3" />
                  <span>+ CART</span>
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

/**
 * Interactive BETA Smart System Workflow & Animated HUD Orbital Telemetry Ring
 */
export function OrbitalWorkflowSection() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      stepLabel: 'STEP 01',
      code: '+A3.7',
      title: 'Dispatched from Campbellfield HQ',
      subtitle: '5/1730 Hume Hwy · Same-Day Metro Fleet',
      detail:
        'Every sectional door, Aria 121 opener, and P2011 handset is quality-inspected and dispatched directly from our Campbellfield warehouse.',
      metric: '1200N',
      unit: 'MOTOR PACK',
      dashArray: '140 440',
      href: '/product/motor-pack/',
    },
    {
      stepLabel: 'STEP 02',
      code: '+B6.0',
      title: 'Installed & Force-Calibrated On-Site',
      subtitle: 'Across 11 Melbourne Service Corridors',
      detail:
        'Technicians calibrate torsion springs, travel limits, and infrared safety beams to match your exact residential or commercial bay weight.',
      metric: '1000N',
      unit: 'RDO OPENER',
      dashArray: '280 440',
      href: '/services/',
    },
    {
      stepLabel: 'STEP 03',
      code: '+S9.2',
      title: 'Registered for 7-Year Digital Warranty',
      subtitle: 'Verified Serial & Installation Record',
      detail:
        'Serial numbers and installation proofs are logged directly into the BETA DOORS warranty registry for rapid priority support.',
      metric: 'ARIA 121',
      unit: 'VERIFIED',
      dashArray: '420 440',
      href: '/warranty-registration/',
    },
  ];

  const bottomLinks = [
    { label: '01 // 5 Shop Products', href: '/shop/', active: false },
    { label: '02 // Same-Day Repairs', href: '/services/', active: false },
    { label: '03 // Campbellfield VIC 3061', href: '/contact-us/', active: true },
    {
      label: '04 // Spring Estimator',
      href: '/garage-door-spring-estimator/',
      active: false,
    },
    { label: '05 // 4 PDF Manuals', href: '/beta-doors-manuals/', active: false },
    {
      label: '06 // Warranty Portal',
      href: '/warranty-registration/',
      active: false,
    },
    { label: '07 // Staff Admin CMS', href: '/admin/', active: false },
  ];

  const currentStep = steps[activeStep] || steps[0];

  return (
    <section
      data-cms-section="home-orbital-workflow"
      data-cms-label="BETA Smart System Lifecycle"
      aria-labelledby="orbital-workflow-heading"
      className="w-full max-w-[1760px] mx-auto px-3 sm:px-5 lg:px-7 py-14"
    >
      <HudSectionRail
        code="HUD.04"
        sector="END-TO-END AUTOMATION LIFECYCLE // BETA SMART SYSTEM"
        status="7-YR WARRANTY"
      />

      <div className="hud-corner-brackets brand-animated-border bg-[#08090D] border border-white/[0.09] rounded-xl p-5 sm:p-9 lg:p-12 relative overflow-hidden">
        {/* Top Row Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/[0.07]">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#ff7ac6]">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#EC008C]" />
              <span>End-to-End Automation Lifecycle</span>
            </div>
            <h2
              id="orbital-workflow-heading"
              className="text-2xl sm:text-4xl font-semibold text-white tracking-tight"
            >
              BETA Smart System
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Seamless progression from Campbellfield warehouse dispatch to precision spring calibration and 7-year warranty registration.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/garage-door-spring-estimator/"
              className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-white text-black text-xs font-mono font-semibold hover:bg-slate-200 transition-colors"
            >
              SPRING ESTIMATOR
            </Link>
            <Link
              href={currentStep.href}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs font-mono font-semibold text-white transition-colors"
            >
              <span>INSPECT {currentStep.stepLabel}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#EC008C]" />
            </Link>
          </div>
        </div>

        {/* Main 2-Column Trajectory & Concentric Step Orbital Ring */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Metric + Animated HUD Trajectory Arcs + 3 Clickable Step Modules */}
          <div className="lg:col-span-7 relative min-h-[320px] flex flex-col justify-between">
            <svg
              viewBox="0 0 600 320"
              className="absolute inset-0 w-full h-full pointer-events-none"
              aria-hidden="true"
            >
              <path
                d="M 10 260 Q 260 240 490 40"
                fill="none"
                stroke="rgba(236,0,140,0.22)"
                strokeWidth="1.2"
                className="hud-rail-dashed"
              />
              <path
                d="M 10 260 Q 260 240 490 40"
                fill="none"
                stroke="#EC008C"
                strokeWidth="2"
                className="hud-animated-trace"
              />
              <path
                d="M 40 310 Q 300 280 550 90"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
            </svg>

            <div className="relative z-10 flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#ff7ac6]">
                  BETA DISPATCH TELEMETRY
                </div>
                <div className="text-3xl sm:text-4xl font-light text-white tracking-tight font-mono tabular-nums mt-0.5">
                  {currentStep.code}
                </div>
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentStep.stepLabel}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs text-slate-300 max-w-md leading-relaxed"
                >
                  {currentStep.detail}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* 3 Interactive HUD Step Modules (rounded-lg) */}
            <div className="relative z-10 my-5 space-y-2.5">
              {steps.map((st, idx) => {
                const isSelected = activeStep === idx;
                return (
                  <button
                    key={st.stepLabel}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-lg backdrop-blur-xl border transition-all flex items-center justify-between gap-4 cursor-pointer ${
                      isSelected
                        ? 'bg-white/[0.08] border-[#EC008C]/70 shadow-[0_8px_28px_rgba(236,0,140,0.18)]'
                        : 'bg-[#111318]/85 hover:bg-white/[0.05] border-white/[0.08]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-md border flex items-center justify-center font-mono text-xs font-bold transition-colors ${
                          isSelected
                            ? 'bg-[#EC008C] border-[#EC008C] text-white keep-white-text'
                            : 'bg-white/[0.06] border-white/10 text-slate-300'
                        }`}
                      >
                        0{idx + 1}
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-semibold text-white">
                          {st.stepLabel} · {st.title}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {st.subtitle}
                        </div>
                      </div>
                    </div>
                    <div className="text-right font-mono shrink-0">
                      <div className="text-xs font-semibold text-white tabular-nums">
                        {st.metric}
                      </div>
                      <div className="text-[10px] text-[#ff7ac6]">{st.unit}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom status readout & step controls */}
            <div className="relative z-10 flex items-center justify-between pt-2">
              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-300">
                <span className="px-2.5 py-1 rounded bg-white/[0.05] border border-white/[0.1]">
                  {currentStep.stepLabel} / 03
                </span>
                <span className="px-2.5 py-1 rounded bg-[#EC008C]/15 border border-[#EC008C]/40 text-[#ff7ac6] font-semibold">
                  ACTIVE STAGE
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setActiveStep((p) => (p + 2) % 3)}
                  aria-label="Previous workflow step"
                  className="w-8 h-8 rounded-md bg-white/[0.06] hover:bg-white/[0.14] border border-white/15 flex items-center justify-center text-white cursor-pointer transition-colors"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep((p) => (p + 1) % 3)}
                  aria-label="Next workflow step"
                  className="w-8 h-8 rounded-md bg-white/[0.06] hover:bg-white/[0.14] border border-white/15 flex items-center justify-center text-white cursor-pointer transition-colors"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right: Concentric HUD Orbital Dial with Rotating Telemetry Reticle */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-60 h-60 sm:w-68 sm:h-68 rounded-full bg-gradient-to-b from-[#14161D] to-[#08090C] border border-white/10 flex items-center justify-center shadow-[0_20px_70px_rgba(0,0,0,0.9)]">
              <svg
                viewBox="0 0 240 240"
                className="absolute inset-0 w-full h-full -rotate-90"
              >
                {/* Outer Rotating HUD Reticle Ring */}
                <circle
                  cx="120"
                  cy="120"
                  r="108"
                  fill="none"
                  stroke="rgba(236,0,140,0.28)"
                  strokeWidth="1"
                  strokeDasharray="8 6"
                  className="hud-reticle-ring"
                />
                <circle
                  cx="120"
                  cy="120"
                  r="86"
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="14"
                />
                <circle
                  cx="120"
                  cy="120"
                  r="86"
                  fill="none"
                  stroke="#EC008C"
                  strokeWidth="14"
                  strokeDasharray={currentStep.dashArray}
                  strokeLinecap="butt"
                  className="transition-all duration-500"
                />
              </svg>

              <div className="relative z-10 w-36 h-36 rounded-full bg-[#07080B] border border-white/15 flex flex-col items-center justify-center text-center p-4 shadow-inner">
                <Zap className="w-4 h-4 text-[#EC008C] fill-[#EC008C] mb-1" />
                <span className="text-[11px] font-mono font-semibold text-white">
                  {currentStep.stepLabel}
                </span>
                <span className="text-sm font-mono font-bold text-[#ff7ac6] mt-0.5">
                  {currentStep.metric}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {currentStep.unit}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Architectural Quick-Jump Matrix (rounded-md instead of bloated pills) */}
        <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-center gap-2">
          {bottomLinks.map((tag) => (
            <Link
              key={tag.label}
              href={tag.href}
              className={`px-3 py-1.5 rounded-md text-[11px] font-mono transition-all ${
                tag.active
                  ? 'bg-[#EC008C] text-white font-semibold shadow-[0_0_16px_rgba(236,0,140,0.4)] keep-white-text'
                  : 'bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] text-slate-300'
              }`}
            >
              {tag.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
