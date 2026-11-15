'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  Crosshair,
  Activity,
  ShoppingCart,
  Layers,
} from 'lucide-react';
import { useBetaDoors } from '@/components/providers/BetaDoorsProvider';
import { formatAudCents } from '@/lib/domain-logic';
import { ProductTechnicalArtwork } from '@/components/brand/ProductTechnicalArtwork';

/**
 * Reusable Sharp Art-Director HUD Schematic Section Rail (0px Geometry)
 */
export function HudSectionRail({
  code,
  sector,
  status = 'ONLINE // CALIBRATED',
}: {
  code: string;
  sector: string;
  status?: string;
}) {
  return (
    <div
      className="mb-6 flex items-center gap-3 select-none border-b border-white/[0.08] pb-2.5"
      aria-hidden="true"
    >
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-none bg-[#EC008C]/15 border border-[#EC008C]/50 text-[10px] font-mono font-bold tracking-widest text-[#ff7ac6] shrink-0">
        <span className="w-1.5 h-1.5 bg-[#EC008C] animate-pulse" />
        <span>{code}</span>
      </div>

      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 shrink-0 hidden sm:inline">
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
            stroke="rgba(236,0,140,0.22)"
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
          {/* Precision CAD Tick Marks */}
          <line x1="80" y1="3" x2="80" y2="13" stroke="rgba(236,0,140,0.5)" strokeWidth="1" />
          <rect x="220" y="5" width="6" height="6" fill="rgba(236,0,140,0.75)" />
          <line x1="380" y1="4" x2="380" y2="12" stroke="rgba(148,163,184,0.4)" strokeWidth="1" />
          <rect x="540" y="5" width="5" height="5" fill="rgba(56,189,248,0.65)" />
          <line x1="700" y1="3" x2="700" y2="13" stroke="rgba(236,0,140,0.5)" strokeWidth="1" />
        </svg>
      </div>

      <span className="px-2 py-0.5 border border-white/[0.08] bg-[#08090C] text-[10px] font-mono uppercase tracking-widest text-slate-400 shrink-0 hidden md:inline">
        [{status}]
      </span>
    </div>
  );
}

/**
 * Interactive 4-Card Architectural HUD Bento Grid ("Meet Marvellous Engineering")
 * Pure 0px Sharp HUD Geometry — High-Precision Engineering Visualizers & Infographics
 */
export function DefiBentoInsightsSection() {
  const [activeBlueprintIdx, setActiveBlueprintIdx] = useState(0);
  const [activeCylinderIdx, setActiveCylinderIdx] = useState(2); // Default 1200N
  const [activePackTab, setActivePackTab] = useState<number>(0);
  const [activeBarPage, setActiveBarPage] = useState(0);

  const architecturalBlueprints = [
    {
      code: 'CAD.01',
      tabLabel: '01 · Insulated Sectional',
      name: 'Insulated Overhead Sectional Doors',
      metric: '40mm PU',
      unit: 'THERMAL CORE',
      specCode: 'AS/NZS 4505 // ACOUSTIC & THERMAL RATED',
      artType: 'sectional_door' as const,
      cycle: '35,000+ Cycle Torsion Assembly',
      href: '/insulated-sectional-garage-doors',
      meters: [
        { label: 'Thermal & Acoustic Insulation', value: 'R-2.2 / 40mm PU', pct: 96 },
        { label: 'Wind-Lock Structural Integrity', value: 'AS/NZS 4505 Rated', pct: 94 },
        { label: 'Torsion Cycle Endurance', value: '35,000+ Cycles', pct: 92 },
      ],
      specs: [
        { code: '01', label: 'PANEL SKIN', val: '0.60mm Dual-Skin Colorbond Steel' },
        { code: '02', label: 'BAY WIDTH', val: '2,100mm – 6,400mm Custom Span' },
        { code: '03', label: 'DRIVE MATCH', val: 'Aria 121 / Motor Pack (800N–1500N)' },
      ],
    },
    {
      code: 'CAD.02',
      tabLabel: '02 · Continuous Roller',
      name: 'Continuous Curtain Steel Roller Doors',
      metric: '1000–1800N',
      unit: 'DRUM DRIVE',
      specCode: 'HEAVY DUTY // NYLON FELT RUNNING STRIPS',
      artType: 'roller_opener' as const,
      cycle: 'Precision Helical Drum Springs',
      href: '/roller-garage-doors',
      meters: [
        { label: 'Curtain Tensile Rigidity', value: 'Deep-Ribbed Steel', pct: 95 },
        { label: 'Low-Friction Acoustic Glide', value: 'Nylon Felt Strips', pct: 90 },
        { label: 'Side-Drum Torque Capacity', value: 'Up to 1800N Drive', pct: 96 },
      ],
      specs: [
        { code: '01', label: 'CURTAIN', val: 'Roll-Formed High-Tensile Steel' },
        { code: '02', label: 'GUIDE RAILS', val: 'Heavy Extruded Aluminium Tracks' },
        { code: '03', label: 'DRIVE MATCH', val: 'BETA RDO-1000N / 1500N / 1800N' },
      ],
    },
    {
      code: 'CAD.03',
      tabLabel: '03 · BETA & LIFE Gates',
      name: 'BETA & LIFE Sliding & Swing Gates',
      metric: '600–1500KG',
      unit: 'GATE TORQUE',
      specCode: 'IP44 / IP55 // ITALIAN & BETA PERIMETER DRIVES',
      artType: 'gate_opener' as const,
      cycle: 'Continuous Commercial & Residential Duty',
      href: '/gate-opener-brands',
      meters: [
        { label: 'Sliding & Swing Mass Rating', value: '600kg – 1,500kg', pct: 98 },
        { label: 'Weather & Ingress Protection', value: 'IP44 / IP55 Sealed', pct: 94 },
        { label: 'Obstacle Reversal Precision', value: 'Dual Photocell Sync', pct: 97 },
      ],
      specs: [
        { code: '01', label: 'GEARBOX', val: 'Die-Cast Alloy + Hardened Steel Pinion' },
        { code: '02', label: 'SPAN RATING', val: 'Up to 12m Sliding / 5m Dual Swing' },
        { code: '03', label: 'DRIVE MATCH', val: 'BETA B600/B550 · LIFE HP4/OP2/HP6' },
      ],
    },
    {
      code: 'CAD.04',
      tabLabel: '04 · Springs & Hardware',
      name: 'Calibrated Torsion Springs & Hinges',
      metric: '25,000+',
      unit: 'HIGH-CYCLE',
      specCode: 'OIL-TEMPERED // HIGH-TENSILE SPRING WIRE',
      artType: 'hardware_kit' as const,
      cycle: 'Precision Matched to Exact Door Weight',
      href: '/garage-door-spring-estimator',
      meters: [
        { label: 'Oil-Tempered Wire Fatigue Rating', value: '25,000+ Cycles', pct: 96 },
        { label: 'Crimp & Cable Breaking Strain', value: '7×19 Aircraft Wire', pct: 98 },
        { label: 'Brand Hinge Compatibility', value: 'Steel Line · B&D · Gliderol', pct: 100 },
      ],
      specs: [
        { code: '01', label: 'TORSION WIRE', val: 'High-Carbon Oil-Tempered Spring Steel' },
        { code: '02', label: 'HINGE MATRIX', val: 'Numbered #1–#6 Galv & Nylon Rollers' },
        { code: '03', label: 'CALIBRATION', val: 'Interactive Online Spring Estimator' },
      ],
    },
  ];

  const torqueSpecs = [
    {
      label: '800N',
      forceNum: 800,
      pct: 48,
      maxWeight: '110 kg',
      maxWidth: '3,400 mm',
      driveType: 'Whisper Belt Drive',
      cycleRating: 'Single Bay Sectional · Soft-Start',
      application: 'Single residential sectional & tilt garage doors',
      model: 'BD-MP-800N',
      price: '$650 AUD',
      href: '/product/motor-pack',
    },
    {
      label: '1000N',
      forceNum: 1000,
      pct: 60,
      maxWeight: '140 kg',
      maxWidth: '5,000 mm',
      driveType: 'Side Drum Opener',
      cycleRating: 'Residential Roller · Dual Remote',
      application: 'Single & double continuous steel roller doors',
      model: 'BD-RDO-1000N',
      price: '$590 AUD',
      href: '/product/roller-door-opener',
    },
    {
      label: '1200N',
      forceNum: 1200,
      pct: 74,
      maxWeight: '175 kg',
      maxWidth: '5,600 mm',
      driveType: 'Smart WiFi Belt Drive',
      cycleRating: 'Standard Double Bay · WiFi Ready',
      application: 'Double insulated sectional & architectural doors',
      model: 'BD-MP-1200N',
      price: '$690 AUD',
      href: '/product/motor-pack',
    },
    {
      label: '1500N',
      forceNum: 1500,
      pct: 88,
      maxWeight: '220 kg',
      maxWidth: '6,200 mm',
      driveType: 'Heavy-Duty Belt/Chain',
      cycleRating: 'Oversized Double Bay · High Torque',
      application: 'Custom timber, clad & oversized double sectional doors',
      model: 'BD-MP-1500N',
      price: '$730 AUD',
      href: '/product/motor-pack',
    },
    {
      label: '1800N',
      forceNum: 1800,
      pct: 100,
      maxWeight: '280 kg',
      maxWidth: '6,800 mm',
      driveType: 'Industrial Side Drum',
      cycleRating: 'Heavy Industrial · Continuous Duty',
      application: 'Commercial roller shutters & high-cycle warehouses',
      model: 'RDO-1800N PRO',
      price: 'Trade Spec',
      href: '/roller-door-opener-range',
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
      href: '/product/motor-pack',
      modules: [
        { code: '01', title: 'Smart WiFi Drive Head', detail: '800N, 1200N or 1500N + Optional Camera' },
        { code: '02', title: '3 × Handsets + Wall Switch', detail: '3 × Hopping-Code Remotes + Wireless Button' },
        { code: '03', title: 'Infrared Safety Beams', detail: 'Auto-Reverse Optical Obstacle Protection' },
        { code: '04', title: '7-Year Warranty', detail: 'Backed by Campbellfield VIC 3061 HQ' },
      ],
    },
    {
      id: 'roller-kit',
      tabLabel: '02 · Roller Opener Kit',
      sku: 'BD-RDO-1000N',
      force: '1000N – 1800N',
      price: '$590 AUD Complete',
      warranty: '5-Year Drive Warranty',
      href: '/product/roller-door-opener',
      modules: [
        { code: '01', title: 'High-Torque Drum Drive', detail: 'Slim Side-Room Fitment + LED Courtesy Light' },
        { code: '02', title: '2 × Genuine P2011 Remotes', detail: 'Encrypted Rolling-Code RF Handsets' },
        { code: '03', title: 'Wireless Wall Button', detail: 'Interior Garage Mount Push-Button Control' },
        { code: '04', title: 'Soft-Start / Soft-Stop', detail: 'Reduced Curtain Wear & Whisper Operation' },
      ],
    },
    {
      id: 'gate-kit',
      tabLabel: '03 · BETA & LIFE Gates',
      sku: 'B600 / LIFE-HP4',
      force: '600kg – 1500kg',
      price: 'Custom Trade Spec',
      warranty: 'Commercial Perimeter Rated',
      href: '/gate-opener-brands',
      modules: [
        { code: '01', title: 'BETA & Italian LIFE Drives', detail: 'B600, B550, LIFE HP4, OP2, OP3–OP5, HP6' },
        { code: '02', title: 'Sliding & Swing Configurations', detail: 'Heavy Rack & Pinion or Linear Articulated Arms' },
        { code: '03', title: 'Dual Photocell Safety', detail: 'Perimeter Infrared Beam & Crush Prevention' },
        { code: '04', title: 'Multi-User RF & Keypad', detail: 'Compatible with MINI2-RELAY-03 & P2011' },
      ],
    },
  ];

  const storefrontMatrixRows = [
    {
      idx: '01',
      sku: 'BD-MP-800/1200/1500',
      name: 'Panel Door Motor Pack (WiFi + Beams + 3 Remotes)',
      spec: '800N · 1200N · 1500N Variants',
      stock: '15 IN STOCK',
      price: '$650 – $730 AUD',
      pct: 96,
      href: '/product/motor-pack',
    },
    {
      idx: '02',
      sku: 'BD-RDO-1000N',
      name: 'Roller Door Opener Kit (2 × P2011 + Wall Switch)',
      spec: '1000N–1800N Drum Drive',
      stock: '22 IN STOCK',
      price: '$590 AUD',
      pct: 84,
      href: '/product/roller-door-opener',
    },
    {
      idx: '03',
      sku: 'BD-REM-PACK4',
      name: 'Universal Receiver & 3 × P2011 Remote Upgrade Pack',
      spec: 'Plug-and-Play Multi-Brand Kit',
      stock: '30 IN STOCK',
      price: '$240 AUD',
      pct: 64,
      href: '/product/receiver-and-remote-pack',
    },
    {
      idx: '04',
      sku: 'MINI2-RELAY-03',
      name: 'External 2-Channel Receiver (12–24V AC/DC)',
      spec: 'Dual Independent Relay Channels',
      stock: '40 IN STOCK',
      price: '$85 AUD',
      pct: 48,
      href: '/product/external-2-channel-receiver-mini2-relay-03',
    },
    {
      idx: '05',
      sku: 'BD-REM-P2011',
      name: 'Genuine BETA DOORS P2011 Remote Control',
      spec: '4-Button Encrypted Hopping-Code',
      stock: '85 IN STOCK',
      price: '$60 AUD',
      pct: 38,
      href: '/product/remote',
    },
  ];

  const selectedBlueprint =
    architecturalBlueprints[activeBlueprintIdx] || architecturalBlueprints[0];
  const selectedTorque = torqueSpecs[activeCylinderIdx] || torqueSpecs[2];
  const selectedPack = driveComparisonTabs[activePackTab] || driveComparisonTabs[0];
  const selectedStoreRow = storefrontMatrixRows[activeBarPage] || storefrontMatrixRows[0];

  // Radial gauge circumference calculation (radius = 48 -> C = ~301.6)
  const gaugeRadius = 48;
  const gaugeCircumference = 2 * Math.PI * gaugeRadius;
  const gaugeArcLength = gaugeCircumference * 0.75; // 270 degree sweep
  const gaugeStrokeOffset =
    gaugeArcLength - (gaugeArcLength * selectedTorque.pct) / 100;

  return (
    <section
      data-cms-section="home-bento-telemetry"
      data-cms-label="Architectural Engineering Bento Grid"
      aria-labelledby="bento-insights-heading"
      className="relative w-full max-w-[1760px] mx-auto px-3 sm:px-5 lg:px-7 py-14 overflow-hidden"
    >
      <HudSectionRail
        code="HUD.01"
        sector="ARCHITECTURAL ENGINEERING // CAD SPECIFICATION MATRIX"
        status="04 CORE SYSTEMS"
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
          BETA DOORS engineers insulated sectional doors, continuous steel roller doors, and whisper-quiet automation drives calibrated for Australian residential and commercial bays.
        </p>
      </div>

      {/* 4-Card Asymmetric Professional HUD Bento Grid (0px Sharp Geometry) */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        {/* ===================================================================
            CARD 01 (Col Span 7): Interactive Architectural System Visualizer
           =================================================================== */}
        <div className="lg:col-span-7 hud-corner-brackets brand-animated-border hud-technical-grid bg-[#0B0C10] border border-white/[0.09] rounded-none p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden">
          {/* Top HUD Header Strip */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/[0.08] text-[10px] font-mono uppercase tracking-widest">
            <div className="inline-flex items-center gap-2 text-[#ff7ac6] font-bold">
              <Layers className="w-3.5 h-3.5 text-[#EC008C]" />
              <span>ARCH.BLUEPRINT // {selectedBlueprint.code}</span>
            </div>
            <span className="text-slate-400">{selectedBlueprint.specCode}</span>
          </div>

          {/* Interactive 4-System Blueprint Selector Tabs with Smooth Framer Motion Highlight */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-1.5 my-3.5">
            {architecturalBlueprints.map((bp, idx) => {
              const isActive = activeBlueprintIdx === idx;
              return (
                <button
                  key={bp.code}
                  type="button"
                  onClick={() => setActiveBlueprintIdx(idx)}
                  className={`relative px-3 py-2.5 rounded-none text-[10px] font-mono font-semibold text-left transition-colors cursor-pointer border overflow-hidden ${
                    isActive
                      ? 'border-[#EC008C] text-white keep-white-text'
                      : 'bg-[#08090C] hover:bg-white/[0.05] border-white/[0.1] text-slate-300'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="eng-blueprint-active-pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="pointer-events-none absolute inset-0 bg-[#EC008C] z-0"
                    />
                  )}
                  <span className="relative z-10 block truncate">{bp.tabLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Center 16:9 Studio Visual + Calibrated Engineering Capacity Meters */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedBlueprint.code}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-4 items-stretch my-1"
            >
              {/* Left Column (5 Cols): Real 16:9 Studio Hardware Visual + Metric Callout */}
              <div className="sm:col-span-5 flex flex-col justify-between bg-[#08090C] border border-white/[0.09] p-2.5 space-y-2.5">
                <div className="relative aspect-video w-full overflow-hidden border border-white/[0.08] bg-[#12141A]">
                  <ProductTechnicalArtwork
                    type={selectedBlueprint.artType}
                    title={selectedBlueprint.name}
                    className="w-full h-full"
                  />
                </div>

                <div className="flex items-center justify-between gap-2 px-1 pt-0.5">
                  <div>
                    <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">
                      PRIMARY RATING
                    </div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums leading-tight">
                      {selectedBlueprint.metric}
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-[#EC008C]/15 border border-[#EC008C]/45 text-[9.5px] font-mono font-bold text-[#ff7ac6] shrink-0">
                    {selectedBlueprint.unit}
                  </span>
                </div>
              </div>

              {/* Right Column (7 Cols): 3 Animated Engineering Meters + 3 Clean Spec Rows */}
              <div className="sm:col-span-7 flex flex-col justify-between gap-2.5">
                {/* 3 Horizontal Telemetry Meters */}
                <div className="p-3 bg-[#08090C] border border-white/[0.09] space-y-2.5">
                  {selectedBlueprint.meters.map((meter) => (
                    <div key={meter.label} className="space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="text-slate-300">{meter.label}</span>
                        <span className="text-[#ff7ac6] font-bold tabular-nums">
                          {meter.value}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-white/[0.07] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${meter.pct}%` }}
                          transition={{ duration: 0.45, ease: 'easeOut' }}
                          className="h-full bg-gradient-to-r from-[#EC008C] to-[#ff7ac6]"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* 3 Non-Wrapping Specification Rows */}
                <div className="grid grid-cols-1 gap-1.5">
                  {selectedBlueprint.specs.map((row) => (
                    <div
                      key={row.code}
                      className="flex items-center justify-between gap-3 px-3 py-1.5 bg-[#08090C] border border-white/[0.08] text-xs"
                    >
                      <span className="text-[10px] font-mono font-bold text-[#ff7ac6] shrink-0">
                        [{row.code}] {row.label}
                      </span>
                      <span className="text-[11px] text-slate-200 font-medium text-right truncate">
                        {row.val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Title & Action */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3.5 mt-3 border-t border-white/[0.08]">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-white">
                {selectedBlueprint.name}
              </h3>
              <p className="text-xs text-slate-400">
                {selectedBlueprint.cycle} — engineered for smooth, low-noise architectural operation.
              </p>
            </div>
            <Link
              href={selectedBlueprint.href}
              className="keep-white-text inline-flex items-center gap-1.5 px-4 py-2 rounded-none bg-[#EC008C] hover:bg-[#d4007d] text-xs font-mono font-bold text-white shrink-0 transition-colors"
            >
              <span>FULL TECHNICAL SHEET</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* ===================================================================
            CARD 02 (Col Span 5): Interactive Motor Torque & Bay Calibrator
           =================================================================== */}
        <div className="lg:col-span-5 hud-corner-brackets brand-animated-border hud-technical-grid bg-[#0B0C10] border border-white/[0.09] rounded-none p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10 flex items-center justify-between pb-3 border-b border-white/[0.08] text-[10px] font-mono uppercase tracking-wider text-slate-400">
            <span>TORQUE.CALIBRATOR // N-METRIC</span>
            <span className="text-[#ff7ac6] font-bold">{selectedTorque.cycleRating}</span>
          </div>

          {/* 5 Interactive Torque Selector Tabs with Smooth Sliding Indicator */}
          <div className="relative z-10 grid grid-cols-5 gap-1.5 my-3.5">
            {torqueSpecs.map((item, idx) => {
              const isSelected = activeCylinderIdx === idx;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setActiveCylinderIdx(idx)}
                  aria-label={`Inspect ${item.label} lifting force`}
                  className={`relative py-2 rounded-none text-[11px] font-mono font-bold tabular-nums transition-colors cursor-pointer border overflow-hidden ${
                    isSelected
                      ? 'border-[#EC008C] text-white keep-white-text'
                      : 'bg-[#08090C] hover:bg-white/[0.05] border-white/[0.1] text-slate-300'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="torque-selector-pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="pointer-events-none absolute inset-0 bg-[#EC008C] z-0"
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Center Precision SVG Radial Torque Gauge + 4-Cell Engineering Spec Readout */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTorque.label}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.18 }}
              className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-center my-1"
            >
              {/* Radial Tachometer SVG Gauge */}
              <div className="sm:col-span-5 bg-[#08090C] border border-white/[0.09] p-3 flex flex-col items-center justify-center">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-[225deg]">
                    {/* Background Track Arc (270 deg) */}
                    <circle
                      cx="60"
                      cy="60"
                      r={gaugeRadius}
                      fill="none"
                      stroke="rgba(148, 163, 184, 0.18)"
                      strokeWidth="8"
                      strokeDasharray={`${gaugeArcLength} ${gaugeCircumference}`}
                      strokeLinecap="butt"
                    />
                    {/* Active Torque Arc */}
                    <motion.circle
                      cx="60"
                      cy="60"
                      r={gaugeRadius}
                      fill="none"
                      stroke="#EC008C"
                      strokeWidth="8"
                      strokeDasharray={`${gaugeArcLength} ${gaugeCircumference}`}
                      initial={{ strokeDashoffset: gaugeArcLength }}
                      animate={{ strokeDashoffset: gaugeStrokeOffset }}
                      transition={{ duration: 0.45, ease: 'easeOut' }}
                      strokeLinecap="butt"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400">
                      FORCE
                    </span>
                    <span className="text-xl font-bold font-mono text-white tabular-nums">
                      {selectedTorque.label}
                    </span>
                    <span className="text-[9.5px] font-mono text-[#ff7ac6] font-semibold">
                      {selectedTorque.pct}% LOAD
                    </span>
                  </div>
                </div>
              </div>

              {/* 4-Cell Calibrated Readout Grid */}
              <div className="sm:col-span-7 grid grid-cols-2 gap-2">
                <div className="p-2.5 bg-[#08090C] border border-white/[0.08]">
                  <div className="text-[9px] font-mono text-slate-400 uppercase">
                    MAX DOOR MASS
                  </div>
                  <div className="text-sm font-bold font-mono text-white tabular-nums mt-0.5">
                    {selectedTorque.maxWeight}
                  </div>
                </div>
                <div className="p-2.5 bg-[#08090C] border border-white/[0.08]">
                  <div className="text-[9px] font-mono text-slate-400 uppercase">
                    MAX BAY WIDTH
                  </div>
                  <div className="text-sm font-bold font-mono text-white tabular-nums mt-0.5">
                    {selectedTorque.maxWidth}
                  </div>
                </div>
                <div className="p-2.5 bg-[#08090C] border border-white/[0.08]">
                  <div className="text-[9px] font-mono text-slate-400 uppercase">
                    DRIVE SYSTEM
                  </div>
                  <div className="text-xs font-semibold text-white truncate mt-0.5">
                    {selectedTorque.driveType}
                  </div>
                </div>
                <div className="p-2.5 bg-[#08090C] border border-white/[0.08]">
                  <div className="text-[9px] font-mono text-slate-400 uppercase">
                    MODEL &amp; PRICE
                  </div>
                  <div className="text-xs font-bold font-mono text-[#ff7ac6] truncate mt-0.5">
                    {selectedTorque.price}
                  </div>
                </div>

                <div className="col-span-2 px-3 py-2 bg-[#08090C] border border-white/[0.08] flex items-center justify-between gap-2 text-[11px]">
                  <span className="text-slate-300 truncate">
                    {selectedTorque.application}
                  </span>
                  <Link
                    href={selectedTorque.href}
                    className="text-[#ff7ac6] hover:text-white font-mono font-bold shrink-0 inline-flex items-center gap-0.5"
                  >
                    <span>SPEC</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="relative z-10 text-left pt-3.5 mt-3 border-t border-white/[0.08] flex items-center justify-between gap-3">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-white">
                Lifting Force &amp; Torque Calibrator
              </h3>
              <p className="text-xs text-slate-400">
                Select a Newton rating above to match door weight and bay width.
              </p>
            </div>
            <span className="px-2.5 py-1 bg-[#08090C] border border-white/15 text-[10px] font-mono font-bold text-[#ff7ac6] shrink-0">
              {selectedTorque.model}
            </span>
          </div>
        </div>

        {/* ===================================================================
            CARD 03 (Col Span 5): Complete Automation Kit Architecture
           =================================================================== */}
        <div className="lg:col-span-5 hud-corner-brackets brand-animated-border hud-technical-grid bg-[#0B0C10] border border-white/[0.09] rounded-none p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] text-[10px] font-mono uppercase tracking-wider text-slate-400">
              <span>KIT.ARCHITECTURE // INCLUSIONS</span>
              <span className="text-emerald-400 font-bold">{selectedPack.warranty}</span>
            </div>

            {/* Interactive 3-Tab Segmented Switcher with Sliding Pill */}
            <div
              role="tablist"
              aria-label="Automation drive comparison tabs"
              className="grid grid-cols-3 gap-1.5"
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
                    className={`relative py-2 px-2 rounded-none text-[10px] font-mono font-semibold transition-colors cursor-pointer border overflow-hidden truncate ${
                      isActive
                        ? 'border-[#EC008C] text-white keep-white-text'
                        : 'bg-[#08090C] hover:bg-white/[0.05] border-white/[0.1] text-slate-300'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="kit-selector-pill"
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        className="pointer-events-none absolute inset-0 bg-[#EC008C] z-0"
                      />
                    )}
                    <span className="relative z-10">{tab.tabLabel}</span>
                  </button>
                );
              })}
            </div>

            {/* Animated 2x2 Hardware Inclusion Matrix */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPack.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.18 }}
                className="space-y-3"
              >
                <div className="p-3.5 bg-[#08090C] border border-white/[0.09] flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] font-mono text-slate-400">
                      SKU // {selectedPack.sku}
                    </div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">
                      {selectedPack.force}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-[#ff7ac6] tabular-nums">
                      {selectedPack.price}
                    </div>
                    <Link
                      href={selectedPack.href}
                      className="keep-white-text mt-1 inline-flex items-center gap-1 px-3 py-1 rounded-none bg-[#EC008C] hover:bg-[#d4007d] text-white text-[10px] font-mono font-bold transition-colors"
                    >
                      <span>INSPECT KIT</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedPack.modules.map((mod) => (
                    <div
                      key={mod.code}
                      className="p-2.5 bg-[#08090C] border border-white/[0.08] space-y-0.5"
                    >
                      <div className="text-[10px] font-mono font-bold text-[#ff7ac6]">
                        [{mod.code}] {mod.title}
                      </div>
                      <div className="text-[11px] text-slate-300 leading-snug">
                        {mod.detail}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="text-left pt-3.5 mt-3 border-t border-white/[0.08] space-y-0.5">
            <h3 className="text-base sm:text-lg font-semibold text-white">
              Complete Automation Kit Architecture
            </h3>
            <p className="text-xs text-slate-400">
              Every BETA DOORS drive kit includes matched remotes, safety protection, and Australian warranty support.
            </p>
          </div>
        </div>

        {/* ===================================================================
            CARD 04 (Col Span 7): Direct Storefront 5-SKU Specification Matrix
           =================================================================== */}
        <div className="lg:col-span-7 hud-corner-brackets brand-animated-border hud-technical-grid bg-[#0B0C10] border border-white/[0.09] rounded-none p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/[0.08] text-[10px] font-mono uppercase tracking-wider">
            <span className="text-[#ff7ac6] font-bold">
              STOREFRONT.MATRIX // 05 VERIFIED SKUS
            </span>
            <span className="text-slate-400">
              SERVER-VALIDATED AUD PRICING · GST INCLUSIVE
            </span>
          </div>

          {/* 5-Row Interactive Storefront Telemetry Table */}
          <div className="my-3 space-y-1.5">
            {storefrontMatrixRows.map((row, idx) => {
              const isSelected = activeBarPage === idx;
              return (
                <div
                  key={row.sku}
                  onMouseEnter={() => setActiveBarPage(idx)}
                  onClick={() => setActiveBarPage(idx)}
                  className={`relative p-2.5 sm:px-3.5 sm:py-2.5 border transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2 overflow-hidden ${
                    isSelected
                      ? 'border-[#EC008C] bg-[#08090C]'
                      : 'border-white/[0.08] bg-[#08090C]/80 hover:border-white/20'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="storefront-row-highlight"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-[#EC008C]"
                    />
                  )}

                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-[10px] font-mono font-bold text-[#ff7ac6] shrink-0">
                        [{row.idx}] {row.sku}
                      </span>
                      <span className="font-semibold text-white truncate">
                        {row.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-28 sm:w-36 h-1 bg-white/[0.08] overflow-hidden shrink-0">
                        <div
                          style={{ width: `${row.pct}%` }}
                          className="h-full bg-[#EC008C]"
                        />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 truncate">
                        {row.spec}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                    <span className="px-2 py-0.5 bg-emerald-950/60 border border-emerald-500/40 text-[9.5px] font-mono font-bold text-emerald-300">
                      {row.stock}
                    </span>
                    <span className="text-xs sm:text-sm font-mono font-bold text-white tabular-nums min-w-[105px] text-right">
                      {row.price}
                    </span>
                    <Link
                      href={row.href}
                      className="keep-white-text w-7 h-7 bg-[#EC008C] hover:bg-[#d4007d] text-white flex items-center justify-center transition-colors shrink-0"
                      aria-label={`Inspect ${row.name}`}
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-white/[0.08]">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-white">
                Direct Storefront Hardware Matrix
              </h3>
              <p className="text-xs text-slate-400">
                Active selection: <strong className="text-white">{selectedStoreRow.name}</strong> ({selectedStoreRow.price})
              </p>
            </div>
            <Link
              href={selectedStoreRow.href}
              className="keep-white-text inline-flex items-center gap-1.5 px-4 py-2 rounded-none bg-[#EC008C] hover:bg-[#d4007d] text-xs font-mono font-bold text-white shrink-0 transition-colors"
            >
              <span>BUY / INSPECT SKU</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Product-Family Navigation Grid (6 Core Categories) with Interactive HUD Filter Tabs,
 * Wide Viewport Layout, Pure 0px Sharp HUD Geometry, and Clean Technical Headers
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

        {/* Interactive HUD Category Filter Bar (0px Sharp) */}
        <div className="flex flex-wrap items-center gap-2">
          <div
            role="tablist"
            aria-label="Filter product families"
            className="inline-flex flex-wrap items-center gap-1 p-1 rounded-none bg-[#0B0C10] border border-white/[0.09]"
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
                  className={`relative px-3 py-1.5 rounded-none text-[10px] font-mono font-semibold tracking-wider transition-colors cursor-pointer ${
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
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-none bg-[#0B0C10] hover:bg-white/[0.08] border border-white/15 text-xs font-mono font-semibold text-white transition-all whitespace-nowrap"
          >
            <span>ALL CATEGORIES</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#EC008C]" />
          </Link>
        </div>
      </div>

      {/* Responsive Architectural Card Grid (0px Sharp HUD Geometry) */}
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
                className="group hud-corner-brackets brand-animated-border bg-[#0B0C10] border border-white/[0.09] rounded-none overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-1"
              >
                {/* Top HUD Telemetry Bar */}
                <div className="px-3.5 py-2 border-b border-white/[0.07] bg-[#08090C] flex items-center justify-between text-[10px] font-mono tracking-wider uppercase">
                  <span className="text-[#ff7ac6] font-bold">
                    SYS.CAT // [{fam.index}]
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-slate-400">
                    <span className="w-1.5 h-1.5 bg-[#EC008C]" />
                    <span>{fam.badge}</span>
                  </span>
                </div>

                {/* 16:9 Studio Artwork Frame (0px Sharp) */}
                <div className="p-2.5 pb-0">
                  <div className="relative aspect-video w-full rounded-none border border-white/[0.08] overflow-hidden bg-[#12141A]">
                    <div className="w-full h-full transition-transform duration-500 group-hover:scale-[1.04]">
                      <ProductTechnicalArtwork
                        type={fam.artType}
                        customImageUrl={fam.customImageUrl}
                        title={fam.title}
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Structured Architectural Card Body */}
                <div className="p-5 pt-4 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="text-[10px] font-mono tracking-wider uppercase text-[#ff7ac6] font-medium truncate">
                      {fam.subtitle}
                    </div>

                    <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-[#EC008C] transition-colors">
                      {fam.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {fam.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/[0.07] flex items-center justify-between text-xs font-mono font-semibold text-white">
                    <span className="group-hover:text-[#EC008C] transition-colors">
                      INSPECT SPECIFICATION
                    </span>
                    <span className="w-7 h-7 rounded-none bg-[#08090C] group-hover:bg-[#EC008C] border border-white/15 flex items-center justify-center transition-colors">
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
 * Pure 0px Sharp HUD Geometry, and Interactive Filter Tabs
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
          {/* Interactive Storefront Filter Tabs (0px Sharp) */}
          <div
            role="tablist"
            aria-label="Filter storefront products"
            className="inline-flex items-center gap-1 p-1 rounded-none bg-[#0B0C10] border border-white/[0.09]"
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
                className={`px-3 py-1.5 rounded-none text-[10px] font-mono font-semibold tracking-wider transition-colors cursor-pointer ${
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
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-none bg-emerald-950 border border-emerald-500/40 text-xs text-emerald-200 keep-white-text"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{feedback}</span>
            </div>
          ) : (
            <Link
              href="/shop/"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-none bg-[#0B0C10] hover:bg-white/[0.08] border border-white/15 text-xs font-mono font-semibold text-white transition-all"
            >
              <span>OPEN FULL SHOP</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#EC008C]" />
            </Link>
          )}
        </div>
      </div>

      {/* 5-Column Responsive Architectural Product Grid — Pure 0px Sharp HUD Cards */}
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
              className="group hud-corner-brackets brand-animated-border bg-[#0B0C10] border border-white/[0.09] rounded-none overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Top HUD SKU + Stock Telemetry Header */}
                <div className="px-3 py-1.5 border-b border-white/[0.07] bg-[#08090C] flex items-center justify-between gap-1.5 text-[9.5px] font-mono uppercase tracking-wider">
                  <span className="text-slate-400 truncate" title={prod.sku}>
                    [0{idx + 1}] {prod.sku}
                  </span>
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-bold shrink-0 whitespace-nowrap">
                    <span className="w-1.5 h-1.5 bg-emerald-400 animate-pulse" />
                    <span>{prod.stockCount} IN STOCK</span>
                  </span>
                </div>

                {/* Clean 16:9 Studio Artwork (0px Sharp) */}
                <div className="p-2 pb-0">
                  <Link
                    href={prod.path}
                    className="relative block aspect-video w-full rounded-none border border-white/[0.08] overflow-hidden bg-[#12141A]"
                  >
                    <div className="w-full h-full transition-transform duration-500 group-hover:scale-[1.05]">
                      <ProductTechnicalArtwork
                        type={prod.imageSvgType}
                        customImageUrl={prod.customImageUrl}
                        title={prod.name}
                        className="w-full h-full"
                      />
                    </div>
                  </Link>
                </div>

                {/* Title + Description + Price */}
                <div className="p-4 pt-3 space-y-2">
                  <Link
                    href={prod.path}
                    className="block text-sm font-semibold text-white group-hover:text-[#EC008C] transition-colors line-clamp-1"
                  >
                    {prod.name}
                  </Link>

                  <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2 min-h-[34px]">
                    {prod.shortDescription}
                  </p>

                  <div className="pt-2 border-t border-white/[0.06] flex items-baseline justify-between gap-1.5">
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
                  className="flex-1 text-center py-2 px-2.5 text-xs font-mono font-semibold rounded-none bg-[#08090C] hover:bg-white/[0.08] border border-white/15 text-slate-200 transition-colors whitespace-nowrap"
                >
                  {prod.requiresVariant ? 'OPTIONS' : 'DETAILS'}
                </Link>
                <button
                  type="button"
                  onClick={() => handleQuickAdd(prod.slug)}
                  aria-label={`Quick add ${prod.name} to cart`}
                  className="keep-white-text inline-flex items-center gap-1 py-2 px-3 text-xs font-mono font-bold rounded-none bg-[#EC008C] hover:bg-[#d4007d] text-white shadow-[0_0_14px_rgba(236,0,140,0.35)] transition-colors whitespace-nowrap cursor-pointer"
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
