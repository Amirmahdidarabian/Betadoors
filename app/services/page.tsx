'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Wrench,
  Settings,
  ShieldAlert,
  Phone,
  MapPin,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  Zap,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { SiteShell } from '@/components/layout/SiteShell';
import { DeFiPageHeroStage } from '@/components/hero/DeFiPageHeroStage';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { useBetaDoors } from '@/components/providers/BetaDoorsProvider';

// Verbatim service cards from https://www.betadoors.com.au/services/
const OFFICIAL_SERVICES = [
  {
    id: 'track-and-roller-repairs',
    number: '01',
    title: 'Track and Roller Repairs',
    tag: 'ALIGNMENT & ROLLERS',
    metric: 'Smooth Travel',
    description:
      'Repair of misaligned or bent tracks and worn-out rollers to ensure smooth and efficient door operation.',
    enquiryTopic: 'Garage Door Repairs',
  },
  {
    id: 'panel-and-door-repairs',
    number: '02',
    title: 'Panel and Door Repairs',
    tag: 'SECTIONAL · ROLLER · TILT',
    metric: 'Structural Integrity',
    description:
      "Comprehensive repairs for garage door panels, sectional doors, panel doors, roller doors, and tilt doors to maintain the door's integrity and appearance.",
    enquiryTopic: 'Garage Door Repairs',
  },
  {
    id: 'motor-and-remote-services',
    number: '03',
    title: 'Motor and Remote Services',
    tag: 'AUTOMATION & REMOTES',
    metric: 'Hopping Code RF',
    description:
      'Repair or replacement of garage door motors and remotes to ensure reliable and convenient operation.',
    enquiryTopic: 'Motor Replacement',
  },
  {
    id: 'spring-and-cable-replacement',
    number: '04',
    title: 'Spring and Cable Replacement',
    tag: 'HIGH-TENSION BALANCE',
    metric: '10+ Spring Sizes',
    description:
      'Replacement of garage door torsion springs and cables to maintain proper balance and safe functionality of the door.',
    enquiryTopic: 'Spring Replacement',
  },
  {
    id: 'urgent-repairs',
    number: '05',
    title: 'Urgent Repairs',
    tag: 'RAPID RESPONSE',
    metric: 'Same-Day Priority',
    description:
      'Immediate response and repair services for urgent garage door issues to restore functionality and security quickly.',
    enquiryTopic: 'Commercial Door Service/Repairs',
  },
  {
    id: 'complete-door-overhaul',
    number: '06',
    title: 'Complete Door Overhaul',
    tag: 'FULL MAINTENANCE PACKAGE',
    metric: 'All-In-One Care',
    description:
      'A full-service repair package addressing all aspects of garage door maintenance, including tracks, rollers, panels, motors, springs, and cables, for comprehensive door care.',
    enquiryTopic: 'Garage Door Repairs',
  },
];

export default function ServicesPage() {
  const { pages } = useBetaDoors();
  const [selectedStep, setSelectedStep] = useState(0);

  const localServicePages = pages.filter(
    (p) => p.category === 'local_services' && p.status === 'published'
  );

  const dispatchSteps = [
    {
      stepNumber: 'Step 01',
      title: 'Triage & Diagnosis',
      subtitle: 'Campbellfield Operations Desk · 1300 238 243',
      metric: '1300 238 243',
    },
    {
      stepNumber: 'Step 02',
      title: 'Technician Dispatch',
      subtitle: 'Fully stocked service vehicles across Melbourne',
      metric: '11 Corridors',
    },
    {
      stepNumber: 'Step 03',
      title: 'Balance & Safety Check',
      subtitle: 'Spring tension, track alignment & photocell verification',
      metric: 'AS/NZS Verified',
    },
  ];

  return (
    <SiteShell>
      {/* 1. DeFi Landing Page 16:9 Hero Stage with verbatim betadoors.com.au/services/ copy */}
      <DeFiPageHeroStage
        ariaLabel="BETA DOORS Services 16:9 Hero Stage"
        badgeText="Speed in service, Quality in product, Innovation in design."
        badgeHref="#make-an-enquiry"
        headlinePrimary="Services We Offer —"
        headlineGradient="Garage Door & Gate Care"
        subheadline="From misaligned tracks and broken torsion springs to complete door overhauls, motor replacements, and urgent repairs — our technicians restore smooth, safe, and secure operation across Melbourne."
        primaryCtaLabel="Make an Enquiry"
        primaryCtaHref="#make-an-enquiry"
        secondaryCtaLabel="Call 1300 238 243"
        secondaryCtaHref="tel:1300238243"
        scrollTargetId="services-we-offer"
        topLeftNode={{ label: 'Track & Roller', metric: 'Precision Align' }}
        topRightNode={{ label: 'Spring & Cable', metric: 'Torsion Balance' }}
        bottomLeftNode={{ label: 'Motor & Remote', metric: 'Aria 121 / RDO' }}
        bottomRightNode={{ label: 'Urgent Repairs', metric: 'Rapid Response' }}
        horizonSlides={[
          { label: '01/06 . Services We Offer', tag: 'Track, Roller & Panel Door Repairs' },
          { label: '02/06 . Services We Offer', tag: 'Motor & Remote Replacement Services' },
          { label: '03/06 . Services We Offer', tag: 'Torsion Spring & Cable Replacement' },
          { label: '04/06 . Services We Offer', tag: 'Urgent Repairs & Complete Door Overhaul' },
        ]}
      />

      {/* 2. "Services We Offer" — 6 Verbatim Service Cards from betadoors.com.au/services/ */}
      <section
        id="services-we-offer"
        className="px-4 sm:px-8 lg:px-12 py-16 max-w-7xl mx-auto space-y-12"
      >
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 font-mono text-[11px] text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-[#EC008C]" />
            <span>OFFICIAL BETADOORS.COM.AU/SERVICES/</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white">
            Services We Offer
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Speed in service, Quality in product, Innovation in design. Select any service below or lodge an enquiry for immediate technician dispatch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {OFFICIAL_SERVICES.map((srv) => (
            <article
              key={srv.id}
              className="rounded-[28px] bg-[#0B0C10] border border-white/[0.08] hover:border-white/25 p-7 flex flex-col justify-between transition-all shadow-[0_20px_50px_rgba(0,0,0,0.65)] relative overflow-hidden group"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full blur-2xl opacity-0 group-hover:opacity-35 transition-opacity"
                style={{
                  background:
                    'radial-gradient(circle, rgba(236,0,140,0.45) 0%, rgba(11,12,16,0) 70%)',
                }}
              />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#EC008C]">
                    {srv.number} · {srv.tag}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-0.5 font-mono text-[10px] text-slate-300">
                    {srv.metric}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-white">{srv.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed">
                  {srv.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.07] flex items-center justify-between gap-3">
                <a
                  href="#make-an-enquiry"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-[#EC008C] transition-colors"
                >
                  <span>Make an enquiry</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="tel:1300238243"
                  className="font-mono text-[11px] text-slate-400 hover:text-white tabular-nums"
                >
                  1300 238 243
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. DeFi Orbital Service Dispatch Section (matching bottom-left of reference image) */}
      <section className="px-4 sm:px-8 lg:px-12 py-12 max-w-7xl mx-auto">
        <div className="rounded-[32px] bg-[#060709] border border-white/[0.08] p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.8)]">
          <div className="text-center max-w-xl mx-auto space-y-3 mb-12">
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white">
              BETA Service Dispatch
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Rapid response for urgent repairs across residential garages, commercial warehouses, and automated gates.
            </p>
            <div className="pt-2">
              <Link
                href="/register-to-service/"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-white text-slate-950 text-xs font-semibold hover:bg-slate-200 transition-colors shadow-[0_0_25px_rgba(255,255,255,0.2)]"
              >
                Register a Product for Service
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 relative space-y-6">
              <div className="space-y-1">
                <div className="text-xs text-slate-400">Melbourne Field Operations</div>
                <div className="text-3xl sm:text-4xl font-light text-white tracking-tight tabular-nums">
                  +24/7 Urgent Support
                </div>
              </div>

              <div className="space-y-3.5 relative z-10">
                {[
                  {
                    status: 'Track & Roller',
                    suburb: 'Re-aligned & Lubricated',
                    value: 'SMOOTH',
                    unit: 'OPERATION',
                    offset: 'sm:ml-16',
                  },
                  {
                    status: 'Torsion Spring',
                    suburb: 'High-Cycle Replacement',
                    value: 'BALANCED',
                    unit: 'SAFE LIFT',
                    offset: 'sm:ml-6',
                  },
                  {
                    status: 'Motor & Remote',
                    suburb: 'Hopping Code Programmed',
                    value: 'SECURED',
                    unit: 'VERIFIED',
                    offset: 'sm:ml-0',
                  },
                ].map((tx) => (
                  <div
                    key={tx.status}
                    className={`${tx.offset} max-w-sm rounded-2xl bg-[#101217]/95 border border-white/[0.08] px-4 py-3.5 flex items-center justify-between gap-4 shadow-xl`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-slate-300">
                        <Wrench className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-white">{tx.status}</div>
                        <div className="text-[11px] text-slate-500">{tx.suburb}</div>
                      </div>
                    </div>
                    <div className="text-right font-mono">
                      <div className="text-xs text-slate-200 tabular-nums">{tx.value}</div>
                      <div className="text-[10px] text-slate-500">{tx.unit}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 text-xs text-slate-500">
                <span>Campbellfield HQ · 5/1730 Hume Hwy</span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSelectedStep((s) => (s + 2) % 3)}
                    aria-label="Previous dispatch step"
                    className="w-8 h-8 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 flex items-center justify-center text-slate-300"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedStep((s) => (s + 1) % 3)}
                    aria-label="Next dispatch step"
                    className="w-8 h-8 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 flex items-center justify-center text-slate-300"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
                <svg viewBox="0 0 280 280" className="w-full h-full">
                  <circle
                    cx="140"
                    cy="140"
                    r="122"
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="22"
                  />
                  <circle
                    cx="140"
                    cy="140"
                    r="92"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="16"
                    strokeDasharray="180 400"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 140 48 A 92 92 0 0 1 215 86"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="18"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="140"
                    cy="140"
                    r="64"
                    fill="#090A0E"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="1.5"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                  <Zap className="w-5 h-5 text-white mb-1.5" />
                  <div className="text-sm font-semibold text-white">
                    {dispatchSteps[selectedStep].stepNumber}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                    {dispatchSteps[selectedStep].metric}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 11 Melbourne Local Service Corridors Directory */}
      <section className="px-4 sm:px-8 lg:px-12 py-10 max-w-7xl mx-auto">
        <div className="rounded-[28px] border border-white/[0.08] bg-[#0B0C10] p-7 sm:p-9 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-[#EC008C]">
                <MapPin className="w-4 h-4" />
                <span>MELBOURNE LOCAL SERVICE CORRIDORS (11 DEDICATED ROUTES)</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white">
                Local Suburb &amp; Commercial Shutter Repairs
              </h2>
            </div>
            <a
              href="tel:1300238243"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-slate-950 hover:bg-slate-200"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Emergency Line: 1300 238 243</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {localServicePages.map((page) => (
              <Link
                key={page.slug}
                href={page.slug}
                className="flex items-center justify-between rounded-2xl border border-white/[0.08] bg-[#07080A] hover:border-white/25 px-4 py-3.5 text-xs text-slate-200 hover:text-white transition-all"
              >
                <div className="truncate pr-3">
                  <div className="font-medium text-white truncate">{page.title}</div>
                  <div className="font-mono text-[10px] text-slate-500 mt-0.5 truncate">
                    {page.slug}
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Make an Enquiry Form (exact fields from betadoors.com.au/services/) */}
      <section id="make-an-enquiry" className="px-4 sm:px-8 lg:px-12 py-12 max-w-5xl mx-auto">
        <EnquiryForm
          sourcePagePath="/services/"
          heading="Make an Enquiry"
          subheading="Speed in service, Quality in product, Innovation in design. Complete the form below (Your Name, Suburb, Company, Email, Phone, Type Of Service, Message) for prompt technician dispatch."
        />
      </section>
    </SiteShell>
  );
}
