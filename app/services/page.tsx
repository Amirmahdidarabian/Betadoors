'use client';

import React from 'react';
import Link from 'next/link';
import {
  Phone,
  MapPin,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { SiteShell } from '@/components/layout/SiteShell';
import { DeFiPageHeroStage } from '@/components/hero/DeFiPageHeroStage';
import { HudSectionRail } from '@/components/sections/HomeSections';
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

  const localServicePages = pages.filter(
    (p) => p.category === 'local_services' && p.status === 'published'
  );

  return (
    <SiteShell>
      {/* 1. Architectural HUD Stage */}
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
          { label: '01/04 · Services We Offer', tag: 'Track, Roller & Panel Door Repairs' },
          { label: '02/04 · Services We Offer', tag: 'Motor & Remote Replacement Services' },
          { label: '03/04 · Services We Offer', tag: 'Torsion Spring & Cable Replacement' },
          { label: '04/04 · Services We Offer', tag: 'Urgent Repairs & Complete Door Overhaul' },
        ]}
      />

      {/* 2. "Services We Offer" — 6 Verbatim Service Cards (0px Sharp HUD Cards) */}
      <section
        id="services-we-offer"
        className="w-full max-w-[1760px] mx-auto px-3 sm:px-5 lg:px-7 py-14 space-y-10"
      >
        <HudSectionRail
          code="HUD.SRV.01"
          sector="TECHNICAL FIELD SERVICES // 06 SPECIALIST DIVISIONS"
          status="1300 238 243"
        />

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-none border border-[#EC008C]/40 bg-[#EC008C]/15 px-3 py-1 font-mono text-[11px] text-[#ff7ac6]">
              <Sparkles className="w-3.5 h-3.5 text-[#EC008C]" />
              <span>OFFICIAL BETADOORS.COM.AU/SERVICES/</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-white">
              Services We Offer
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Speed in service, Quality in product, Innovation in design. Select any service below or lodge an enquiry for prompt technical support.
            </p>
          </div>
          <Link
            href="/register-to-service"
            className="keep-white-text inline-flex items-center gap-2 px-5 py-2.5 rounded-none bg-[#EC008C] hover:bg-[#d4007d] text-white text-xs font-mono font-bold transition-colors self-start"
          >
            <span>REGISTER PRODUCT FOR SERVICE</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {OFFICIAL_SERVICES.map((srv) => (
            <article
              key={srv.id}
              className="hud-corner-brackets brand-animated-border hud-technical-grid rounded-none bg-[#0B0C10] border border-white/[0.09] p-6 flex flex-col justify-between transition-all relative overflow-hidden group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.07]">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#EC008C]">
                    [{srv.number}] {srv.tag}
                  </span>
                  <span className="rounded-none border border-white/15 bg-[#08090C] px-2.5 py-0.5 font-mono text-[10px] text-slate-300">
                    {srv.metric}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-[#EC008C] transition-colors">
                  {srv.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {srv.description}
                </p>
              </div>

              <div className="pt-5 mt-6 border-t border-white/[0.07] flex items-center justify-between gap-3">
                <a
                  href="#make-an-enquiry"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-white hover:text-[#EC008C] transition-colors"
                >
                  <span>MAKE AN ENQUIRY</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#EC008C]" />
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

      {/* 3. 11 Melbourne Local Service Corridors Directory (0px Sharp HUD Grid) */}
      <section className="w-full max-w-[1760px] mx-auto px-3 sm:px-5 lg:px-7 py-10">
        <HudSectionRail
          code="HUD.SRV.02"
          sector="MELBOURNE REGIONAL SERVICE COVERAGE // 11 ROUTES"
          status="SAME-DAY SUPPORT"
        />

        <div className="hud-corner-brackets rounded-none border border-white/[0.09] bg-[#0B0C10] p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.07] pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-[#EC008C]">
                <MapPin className="w-4 h-4" />
                <span>MELBOURNE LOCAL SERVICE CORRIDORS (11 DEDICATED ROUTES)</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-semibold text-white">
                Local Suburb &amp; Commercial Shutter Repairs
              </h2>
            </div>
            <a
              href="tel:1300238243"
              className="keep-white-text inline-flex items-center gap-2 rounded-none bg-[#EC008C] hover:bg-[#d4007d] px-4 py-2.5 text-xs font-mono font-bold text-white"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>DIRECT LINE: 1300 238 243</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {localServicePages.map((page, idx) => (
              <Link
                key={page.slug}
                href={page.slug}
                className="hud-corner-brackets flex items-center justify-between rounded-none border border-white/[0.09] bg-[#08090C] hover:border-[#EC008C]/60 px-4 py-3.5 text-xs text-slate-200 hover:text-white transition-all"
              >
                <div className="truncate pr-3">
                  <div className="font-semibold text-white truncate">
                    <span className="font-mono text-[#EC008C] mr-1.5">
                      [{String(idx + 1).padStart(2, '0')}]
                    </span>
                    {page.title}
                  </div>
                  <div className="font-mono text-[10px] text-slate-500 mt-0.5 truncate">
                    {page.slug}
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#EC008C] shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Make an Enquiry Form */}
      <section id="make-an-enquiry" className="w-full max-w-[1760px] mx-auto px-3 sm:px-5 lg:px-7 py-12">
        <EnquiryForm
          sourcePagePath="/services/"
          heading="Make an Enquiry"
          subheading="Speed in service, Quality in product, Innovation in design. Complete the form below (Your Name, Suburb, Company, Email, Phone, Type Of Service, Message) for prompt technical assistance."
        />
      </section>
    </SiteShell>
  );
}
