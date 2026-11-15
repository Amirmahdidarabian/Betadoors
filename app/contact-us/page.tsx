'use client';

import React from 'react';
import { MapPin, Phone, Mail, Clock, Sparkles } from 'lucide-react';
import { SiteShell } from '@/components/layout/SiteShell';
import { DeFiPageHeroStage } from '@/components/hero/DeFiPageHeroStage';
import { EnquiryForm } from '@/components/forms/EnquiryForm';

export default function ContactUsPage() {
  return (
    <SiteShell>
      <DeFiPageHeroStage
        ariaLabel="Contact BETA DOORS 16:9 Hero Stage"
        badgeText="We're available Australia wide! · 1300 238 243"
        badgeHref="#contact-enquiry-desk"
        headlinePrimary="Enquire Now — Direct"
        headlineGradient="Technical & Service Desk"
        subheadline="Speak directly with our Campbellfield VIC operations desk (1300 238 243 · sales@betadoors.com.au) for garage door repairs, motor replacements, commercial shutters, or dealer enquiries."
        primaryCtaLabel="Submit Online Enquiry"
        primaryCtaHref="#contact-enquiry-desk"
        secondaryCtaLabel="Call 1300 238 243"
        secondaryCtaHref="tel:1300238243"
        scrollTargetId="contact-enquiry-desk"
        topLeftNode={{
          label: 'National Phone',
          metric: '1300 238 243',
          href: 'tel:1300238243',
        }}
        topRightNode={{
          label: 'Campbellfield HQ',
          metric: 'VIC 3061',
          href: '#contact-enquiry-desk',
        }}
        bottomLeftNode={{
          label: 'Email Support',
          metric: 'sales@betadoors',
          href: 'mailto:sales@betadoors.com.au',
        }}
        bottomRightNode={{
          label: 'Same-Day Service',
          metric: '11 VIC Hubs',
          href: '/services',
        }}
        horizonSlides={[
          { label: '01/04 . Contact BETA DOORS', tag: '5/1730 Hume Hwy, Campbellfield VIC 3061' },
          { label: '02/04 . Rapid Dispatch', tag: 'Same-Day Emergency Garage Door Repairs' },
          { label: '03/04 . Trade & Dealers', tag: 'Wholesale Motors, Springs & Hardware' },
          { label: '04/04 . Australia Wide', tag: '1300 238 243 · sales@betadoors.com.au' },
        ]}
      />

      <section
        id="contact-enquiry-desk"
        className="px-4 sm:px-8 lg:px-12 py-12 max-w-[1440px] mx-auto space-y-10"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              icon: MapPin,
              label: 'HEAD OFFICE & SHOWROOM',
              value: '5/1730 Hume Hwy, Campbellfield VIC 3061',
            },
            {
              icon: Phone,
              label: 'NATIONAL PHONE',
              value: '1300 238 243',
            },
            {
              icon: Mail,
              label: 'SALES & SUPPORT EMAIL',
              value: 'sales@betadoors.com.au',
            },
            {
              icon: Clock,
              label: 'OPERATING HOURS',
              value: 'Mon–Fri 8:00am–5:30pm AEST + Urgent Repairs',
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="rounded-[24px] bg-[#0B0C0F] border border-white/[0.08] p-6 space-y-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.65)]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#EC008C]">
                    {item.label}
                  </span>
                  <Icon className="w-4 h-4 text-slate-400" />
                </div>
                <div className="text-sm font-semibold text-white">{item.value}</div>
              </div>
            );
          })}
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="mb-6 text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-[#EC008C]" />
              <span>MAKE AN ENQUIRY · BETADOORS.COM.AU</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-semibold text-white tracking-tight">
              Make an Enquiry
            </h2>
          </div>
          <EnquiryForm
            sourcePagePath="/contact-us"
            heading="Make an Enquiry"
            subheading="Direct routing to Campbellfield operations (1300 238 243 · sales@betadoors.com.au)."
          />
        </div>
      </section>
    </SiteShell>
  );
}
