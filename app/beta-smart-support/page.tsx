'use client';

import React from 'react';
import Link from 'next/link';
import { PhoneCall, Wifi, ShieldCheck, Wrench, ArrowDown } from 'lucide-react';
import { SiteShell } from '@/components/layout/SiteShell';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { useBetaDoors } from '@/components/providers/BetaDoorsProvider';

export default function BetaSmartSupportPage() {
  const { brand } = useBetaDoors();

  return (
    <SiteShell>
      <div className="px-4 sm:px-8 lg:px-12 py-12 max-w-6xl mx-auto space-y-12">
        <div className="bg-[#0F1117] border border-white/10 rounded-3xl p-8 sm:p-12 space-y-6">
          <div className="text-xs text-slate-400">
            Smart Connectivity &amp; Technical Help · /beta-smart-support/ (Repaired Urgent Action Target)
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            BETA Smart — WiFi Opener &amp; Camera Support
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Setup assistance for BETA Smart WiFi control modules, integrated WiFi garage cameras, optical photocell alignment, and remote handset pairing.
          </p>

          {/* Repaired urgent link (replacing legacy broken '#' anchor per Section 13 & Appendix B.1 #7) */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href={`tel:${brand.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#EC008C] hover:bg-[#d4007d] text-white text-xs sm:text-sm font-semibold transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Urgent Phone Support: {brand.phone}</span>
            </a>
            <a
              href="#smart-support-enquiry"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-medium transition-colors"
            >
              <span>Lodge Priority Support Ticket</span>
              <ArrowDown className="w-4 h-4" />
            </a>
            <Link
              href="/beta-doors-manuals/"
              className="text-xs font-semibold text-slate-300 hover:text-white underline underline-offset-4"
            >
              Download PDF Manuals →
            </Link>
          </div>
        </div>

        {/* Service & Support Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0F1117] border border-white/10 rounded-2xl p-6 space-y-2">
            <Wifi className="w-6 h-6 text-[#EC008C]" />
            <h2 className="text-lg font-bold text-white">
              01. WiFi Control &amp; Camera Pairing
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              2.4 GHz network pairing, camera QR onboarding, and multi-user mobile access configuration for Panel Door Motor Packs.
            </p>
          </div>
          <div className="bg-[#0F1117] border border-white/10 rounded-2xl p-6 space-y-2">
            <ShieldCheck className="w-6 h-6 text-[#EC008C]" />
            <h2 className="text-lg font-bold text-white">
              02. Photocell Safety Beam Alignment
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Diagnostic LED indicators and optical alignment troubleshooting when a door reverses before closing.
            </p>
          </div>
          <div className="bg-[#0F1117] border border-white/10 rounded-2xl p-6 space-y-2">
            <Wrench className="w-6 h-6 text-[#EC008C]" />
            <h2 className="text-lg font-bold text-white">
              03. On-Site Technician Dispatch
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Need an on-site technician in Melbourne? Our Campbellfield fleet carries replacement receivers, remotes, and motors.
            </p>
          </div>
        </div>

        <div id="smart-support-enquiry">
          <EnquiryForm
            sourcePagePath="/beta-smart-support/"
            productContext="BETA Smart Support Request"
            heading="BETA Smart Technical Support & Service Booking"
            subheading="Describe your opener model, WiFi module status, or urgent repair requirement below."
          />
        </div>
      </div>
    </SiteShell>
  );
}
