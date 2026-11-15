'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  Award,
  CheckCircle2,
  Clock,
  Cpu,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { SiteShell } from '@/components/layout/SiteShell';
import { DeFiPageHeroStage } from '@/components/hero/DeFiPageHeroStage';
import { EnquiryForm } from '@/components/forms/EnquiryForm';

export default function AboutUsPage() {
  return (
    <SiteShell>
      {/* 1. DeFi Landing Page 16:9 Atmospheric Hero Stage */}
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
          { label: '01/04 . About BETA DOORS', tag: 'Pioneers in Door & Gate Automation' },
          { label: '02/04 . Speed in Service', tag: 'Rapid Melbourne & National Support' },
          { label: '03/04 . Quality in Product', tag: '7-Year Opener Warranty & AS/NZS Compliance' },
          { label: '04/04 . Innovation in Design', tag: 'Smart WiFi Camera & Custom Spring Software' },
        ]}
      />

      {/* 2. DeFi Bento Insights Grid — Official betadoors.com.au/about-us/ Pillars */}
      <section
        id="about-bento-grid"
        className="px-4 sm:px-8 lg:px-12 py-14 max-w-[1440px] mx-auto space-y-10"
      >
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-[#EC008C]" />
            <span>OFFICIAL BETADOORS.COM.AU/ABOUT-US</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold text-white tracking-tight">
            Speed in Service, Quality in Product,{' '}
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400/70 bg-clip-text text-transparent">
              Innovation in Design
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Whether you need a sleek new garage door, a reliable gate opener, or essential accessories, Beta has you covered. Our products include garage doors and openers with WiFi capabilities, springs, and receivers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Card 1: Large Left Feature (7 cols) */}
          <div className="lg:col-span-7 relative rounded-[26px] bg-[#0B0C0F] border border-white/[0.08] p-7 sm:p-9 overflow-hidden flex flex-col justify-between shadow-[0_24px_60px_rgba(0,0,0,0.75)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 rounded-full blur-[70px] opacity-60"
              style={{
                background:
                  'radial-gradient(circle, rgba(210,225,216,0.32) 0%, rgba(11,12,15,0) 70%)',
              }}
            />

            <div className="relative z-10 flex flex-wrap items-start justify-between gap-6">
              <div>
                <div className="text-4xl sm:text-5xl font-light text-white tracking-tight tabular-nums">
                  100% <span className="text-slate-400">.</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Australian Owned &amp; Operated · Campbellfield VIC 3061
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[11px] font-mono text-slate-300">
                  Commercial &amp; Residential
                </span>
                <span className="px-3 py-1 rounded-full bg-[#EC008C]/15 border border-[#EC008C]/40 text-[11px] font-mono text-white">
                  Australia Wide
                </span>
              </div>
            </div>

            <div className="relative z-10 my-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  icon: Cpu,
                  title: 'Cutting-Edge Systems',
                  desc: 'Cutting-edge door automation systems with built-in WiFi, photocell safety beams, and optional WiFi camera.',
                },
                {
                  icon: Award,
                  title: 'Premium Craftsmanship',
                  desc: 'Premium materials and craftsmanship backed by our 7-year sectional opener warranty and 5-year roller opener warranty.',
                },
                {
                  icon: Clock,
                  title: 'Rapid Response',
                  desc: 'Rapid response for urgent repairs across Melbourne and technical dealer support Australia wide.',
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl bg-[#111318]/90 border border-white/[0.07] p-4 space-y-2"
                  >
                    <div className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white">
                      <Icon className="w-4 h-4 text-[#EC008C]" />
                    </div>
                    <h3 className="text-xs font-semibold text-white">{item.title}</h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="relative z-10 space-y-2 pt-2 border-t border-white/[0.06]">
              <h3 className="text-lg sm:text-xl font-semibold text-white">
                Who We Are — BETA DOORS Australia
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                At Beta, we are pioneers in the door automation industry. We offer a comprehensive range of solutions for Commercial and Residential Garage Door and Gates. Whether you need a sleek new garage door, a reliable gate opener, or essential accessories, Beta has you covered.
              </p>
            </div>
          </div>

          {/* Card 2: Right Vertical Telemetry Card (5 cols) */}
          <div className="lg:col-span-5 relative rounded-[26px] bg-[#0B0C0F] border border-white/[0.08] p-7 sm:p-9 overflow-hidden flex flex-col justify-between shadow-[0_24px_60px_rgba(0,0,0,0.75)]">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[11px] font-mono text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-[#EC008C]" />
                <span>HEAD OFFICE &amp; SHOWROOM</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white">
                Campbellfield Operations &amp; National Distribution
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Headquartered at 5/1730 Hume Hwy, Campbellfield VIC 3061, we supply homeowners, commercial facility managers, and trade installers across Australia.
              </p>
            </div>

            <div className="my-6 space-y-3">
              {[
                { label: 'Head Office Address', value: '5/1730 Hume Hwy, Campbellfield VIC 3061' },
                { label: 'National Phone', value: '1300 238 243' },
                { label: 'Email Desk', value: 'sales@betadoors.com.au' },
                { label: 'Service Coverage', value: '11 Melbourne Hubs + Australia Wide Supply' },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 rounded-xl bg-[#111318] border border-white/[0.06] px-4 py-3 text-xs"
                >
                  <span className="text-slate-400 font-mono">{row.label}</span>
                  <span className="text-white font-medium">{row.value}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white text-slate-950 text-xs font-semibold hover:bg-slate-200 transition-colors"
              >
                <span>Browse Products</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs font-medium text-white transition-colors"
              >
                <span>Visit Online Shop</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </div>
          </div>
        </div>

        {/* 3. Quick Navigation Cards to Products, Shop, Services, Manuals & Warranty */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {[
            {
              tag: 'PRODUCTS',
              title: '6 Product Families',
              desc: 'Garage Doors, Gate Openers, Garage Door Openers, Gates, Accessories & Hardware.',
              href: '/products',
            },
            {
              tag: 'ONLINE SHOP',
              title: '5 Direct Shop Items',
              desc: 'Panel Door Motor Pack ($650–$730), Roller Door Opener ($590), Remote Pack, Receiver & Remote.',
              href: '/shop',
            },
            {
              tag: 'SERVICES',
              title: '6 Repair & Care Services',
              desc: 'Track & Roller, Panel & Door, Motor & Remote, Spring & Cable, Urgent Repairs & Overhauls.',
              href: '/services',
            },
            {
              tag: 'MANUALS & WARRANTY',
              title: 'PDF Manuals & Warranty',
              desc: 'Download Asterion PDO, RDO, Safety Beams & Receiver PDFs or register your product warranty.',
              href: '/beta-doors-manuals',
            },
          ].map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group rounded-[22px] bg-[#0B0C0F] border border-white/[0.08] hover:border-white/25 p-6 flex flex-col justify-between transition-all"
            >
              <div className="space-y-2">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#EC008C]">
                  {card.tag}
                </div>
                <h3 className="text-base font-semibold text-white group-hover:text-slate-100">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">{card.desc}</p>
              </div>
              <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-300 group-hover:text-white">
                <span>Explore</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Enquiry Section */}
      <section
        id="about-enquiry-section"
        className="px-4 sm:px-8 lg:px-12 pb-14 max-w-5xl mx-auto"
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
