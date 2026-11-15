'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  Award,
  Clock,
  Cpu,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { SiteShell } from '@/components/layout/SiteShell';
import { DeFiPageHeroStage } from '@/components/hero/DeFiPageHeroStage';
import { HudSectionRail } from '@/components/sections/HomeSections';
import { EnquiryForm } from '@/components/forms/EnquiryForm';

export default function AboutUsPage() {
  return (
    <SiteShell>
      {/* 1. Architectural HUD Stage */}
      <DeFiPageHeroStage
        ariaLabel="About BETA DOORS 16:9 Hero Stage"
        badgeText="We're available Australia wide! · Campbellfield VIC 3061 HQ"
        badgeHref="#about-bento-grid"
        headlinePrimary="Pioneers in the Door"
        headlineGradient="Automation Industry"
        subheadline="Speed in service, Quality in product, Innovation in design. At Beta, we are pioneers in the door automation industry. We offer a comprehensive range of solutions for Commercial and Residential Garage Door and Gates."
        primaryCtaLabel="Explore Our Products"
        primaryCtaHref="/products"
        secondaryCtaLabel="Enquire Now"
        secondaryCtaHref="#about-enquiry-section"
        scrollTargetId="about-bento-grid"
        topLeftNode={{
          label: 'Speed in Service',
          metric: 'Same-Day VIC',
          href: '/services',
        }}
        topRightNode={{
          label: 'Quality in Product',
          metric: '7-Yr Warranty',
          href: '/products',
        }}
        bottomLeftNode={{
          label: 'Innovation in Design',
          metric: 'WiFi & Smart',
          href: '/shop',
        }}
        bottomRightNode={{
          label: 'Australia Wide',
          metric: '1300 238 243',
          href: '/contact-us',
        }}
        horizonSlides={[
          { label: '01/04 · About BETA DOORS', tag: 'Pioneers in Door & Gate Automation' },
          { label: '02/04 · Speed in Service', tag: 'Rapid Melbourne & National Support' },
          { label: '03/04 · Quality in Product', tag: '7-Year Opener Warranty & AS/NZS Compliance' },
          { label: '04/04 · Innovation in Design', tag: 'Smart WiFi Camera & Custom Spring Software' },
        ]}
      />

      {/* 2. Architectural HUD Bento Grid — Official betadoors.com.au/about-us/ Pillars */}
      <section
        id="about-bento-grid"
        className="w-full max-w-[1760px] mx-auto px-3 sm:px-5 lg:px-7 py-14 space-y-10"
      >
        <HudSectionRail
          code="HUD.ABOUT.01"
          sector="CORPORATE ARCHITECTURE // CAMPBELLFIELD VIC 3061 HQ"
          status="AUSTRALIA WIDE"
        />

        <div className="max-w-3xl space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-[#EC008C]/15 border border-[#EC008C]/40 text-[11px] font-mono text-[#ff7ac6]">
            <Sparkles className="w-3.5 h-3.5 text-[#EC008C]" />
            <span>OFFICIAL BETADOORS.COM.AU/ABOUT-US</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-semibold text-white tracking-tight">
            Speed in Service, Quality in Product,{' '}
            <span className="text-[#EC008C]">Innovation in Design</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Whether you need a sleek new garage door, a reliable gate opener, or essential accessories, Beta has you covered. Our products include garage doors and openers with WiFi capabilities, springs, and receivers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Card 1: Large Left Feature (7 cols) */}
          <div className="lg:col-span-7 hud-corner-brackets brand-animated-border hud-technical-grid relative rounded-none bg-[#0B0C10] border border-white/[0.09] p-6 sm:p-8 overflow-hidden flex flex-col justify-between">
            <div className="relative z-10 flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-white/[0.07]">
              <div>
                <div className="text-3xl sm:text-4xl font-bold font-mono text-white tracking-tight tabular-nums">
                  100% <span className="text-[#EC008C]">AU</span>
                </div>
                <div className="text-xs text-slate-400 mt-1 font-mono">
                  Australian Owned &amp; Operated · Campbellfield VIC 3061
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-none bg-[#08090C] border border-white/15 text-[10px] font-mono text-slate-300 uppercase">
                  Commercial &amp; Residential
                </span>
                <span className="keep-white-text px-2.5 py-1 rounded-none bg-[#EC008C] text-[10px] font-mono font-bold text-white uppercase">
                  Australia Wide
                </span>
              </div>
            </div>

            <div className="relative z-10 my-6 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {[
                {
                  code: 'PIL.01',
                  icon: Cpu,
                  title: 'Cutting-Edge Systems',
                  desc: 'Cutting-edge door automation systems with built-in WiFi, photocell safety beams, and optional WiFi camera.',
                },
                {
                  code: 'PIL.02',
                  icon: Award,
                  title: 'Premium Craftsmanship',
                  desc: 'Premium materials and craftsmanship backed by our 7-year sectional opener warranty and 5-year roller opener warranty.',
                },
                {
                  code: 'PIL.03',
                  icon: Clock,
                  title: 'Rapid Response',
                  desc: 'Rapid response for urgent repairs across Melbourne and technical dealer support Australia wide.',
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-none bg-[#08090C] border border-white/[0.08] p-4 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-none bg-[#0B0C10] border border-white/15 flex items-center justify-center text-white">
                        <Icon className="w-4 h-4 text-[#EC008C]" />
                      </div>
                      <span className="text-[10px] font-mono text-[#ff7ac6] font-bold">
                        [{item.code}]
                      </span>
                    </div>
                    <h3 className="text-xs font-semibold text-white">{item.title}</h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="relative z-10 space-y-2 pt-3 border-t border-white/[0.07]">
              <h3 className="text-base sm:text-lg font-semibold text-white">
                Who We Are — BETA DOORS Australia
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                At Beta, we are pioneers in the door automation industry. We offer a comprehensive range of solutions for Commercial and Residential Garage Door and Gates. Whether you need a sleek new garage door, a reliable gate opener, or essential accessories, Beta has you covered.
              </p>
            </div>
          </div>

          {/* Card 2: Right Vertical Telemetry Card (5 cols) */}
          <div className="lg:col-span-5 hud-corner-brackets brand-animated-border hud-technical-grid relative rounded-none bg-[#0B0C10] border border-white/[0.09] p-6 sm:p-8 overflow-hidden flex flex-col justify-between">
            <div className="space-y-3 pb-4 border-b border-white/[0.07]">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-none bg-[#08090C] border border-white/15 text-[10px] font-mono text-[#ff7ac6]">
                <MapPin className="w-3.5 h-3.5 text-[#EC008C]" />
                <span>HEAD OFFICE &amp; SHOWROOM</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white">
                Campbellfield Operations &amp; National Distribution
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Headquartered at 5/1730 Hume Hwy, Campbellfield VIC 3061, we supply homeowners, commercial facility managers, and trade installers across Australia.
              </p>
            </div>

            <div className="my-5 space-y-2.5">
              {[
                { label: 'HQ ADDRESS', value: '5/1730 Hume Hwy, Campbellfield VIC 3061' },
                { label: 'NATIONAL PHONE', value: '1300 238 243' },
                { label: 'EMAIL DESK', value: 'sales@betadoors.com.au' },
                { label: 'COVERAGE', value: '11 Melbourne Corridors + Australia Wide' },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 rounded-none bg-[#08090C] border border-white/[0.08] px-3.5 py-2.5 text-xs"
                >
                  <span className="text-[10px] text-[#ff7ac6] font-mono font-bold">
                    {row.label}
                  </span>
                  <span className="text-white font-medium">{row.value}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-white/[0.07]">
              <Link
                href="/products"
                className="keep-white-text inline-flex items-center gap-1.5 px-4 py-2.5 rounded-none bg-[#EC008C] hover:bg-[#d4007d] text-white text-xs font-mono font-bold transition-colors"
              >
                <span>BROWSE PRODUCTS</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-none bg-[#08090C] hover:bg-white/[0.08] border border-white/15 text-xs font-mono font-semibold text-white transition-colors"
              >
                <span>VISIT ONLINE SHOP</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#EC008C]" />
              </Link>
            </div>
          </div>
        </div>

        {/* 3. Quick Navigation Cards (0px Sharp HUD Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {[
            {
              idx: '01',
              tag: 'PRODUCTS',
              title: '6 Product Families',
              desc: 'Garage Doors, Gate Openers, Garage Door Openers, Gates, Accessories & Hardware.',
              href: '/products',
            },
            {
              idx: '02',
              tag: 'ONLINE SHOP',
              title: '5 Direct Shop Items',
              desc: 'Panel Door Motor Pack ($650–$730), Roller Door Opener ($590), Remote Pack, Receiver & Remote.',
              href: '/shop',
            },
            {
              idx: '03',
              tag: 'SERVICES',
              title: '6 Repair & Care Services',
              desc: 'Track & Roller, Panel & Door, Motor & Remote, Spring & Cable, Urgent Repairs & Overhauls.',
              href: '/services',
            },
            {
              idx: '04',
              tag: 'MANUALS & WARRANTY',
              title: 'PDF Manuals & Warranty',
              desc: 'Download Asterion PDO, RDO, Safety Beams & Receiver PDFs or register your product warranty.',
              href: '/beta-doors-manuals',
            },
          ].map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group hud-corner-brackets brand-animated-border rounded-none bg-[#0B0C10] border border-white/[0.09] p-5 flex flex-col justify-between transition-all hover:-translate-y-0.5"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider border-b border-white/[0.07] pb-2">
                  <span className="text-[#EC008C] font-bold">[{card.idx}] {card.tag}</span>
                  <span className="text-slate-500">ROUTE</span>
                </div>
                <h3 className="text-base font-semibold text-white group-hover:text-[#EC008C] transition-colors pt-1">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">{card.desc}</p>
              </div>
              <div className="mt-5 pt-3 border-t border-white/[0.07] flex items-center justify-between text-xs font-mono font-semibold text-white">
                <span className="group-hover:text-[#EC008C] transition-colors">INSPECT ROUTE</span>
                <ArrowUpRight className="w-4 h-4 text-[#EC008C] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Enquiry Section */}
      <section
        id="about-enquiry-section"
        className="w-full max-w-[1760px] mx-auto px-3 sm:px-5 lg:px-7 pb-14"
      >
        <EnquiryForm
          sourcePagePath="/about-us"
          heading="Speak with BETA DOORS Australia"
          subheading="We're available Australia wide! Contact our Campbellfield team on 1300 238 243 or submit an enquiry below."
        />
      </section>
    </SiteShell>
  );
}
