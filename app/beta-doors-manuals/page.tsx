'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Download,
  FileText,
  Search,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
  Wrench,
  ShieldCheck,
} from 'lucide-react';
import { SiteShell } from '@/components/layout/SiteShell';
import { DeFiPageHeroStage } from '@/components/hero/DeFiPageHeroStage';
import { useBetaDoors } from '@/components/providers/BetaDoorsProvider';
import { EnquiryForm } from '@/components/forms/EnquiryForm';

// Exact manual categories observed on https://www.betadoors.com.au/beta-doors-manuals/
const MANUAL_CATEGORIES: Record<
  string,
  { categoryHeading: string; wpSourceFile: string; highlights: string[] }
> = {
  manual_asterion: {
    categoryHeading: 'Panel Door Operator:',
    wpSourceFile: 'BETA-DOORS-Asterion-PDO.pdf',
    highlights: [
      'Overhead sectional & tilt panel door operator installation',
      'Electronic travel limit calibration & soft-start/stop force learning',
      'Hopping code handset pairing & photocell safety beam terminal wiring',
    ],
  },
  manual_rdo: {
    categoryHeading: 'Roller Door Operator:',
    wpSourceFile: 'BETA-DOORS-RDO-manual.pdf',
    highlights: [
      'Side-mounted drum roller door opener installation (1000N / 1500N / 1800N)',
      'P2011 hopping code remote & wireless wall button programming',
      'Manual release cord operation & obstruction force sensitivity setup',
    ],
  },
  manual_safety_beams: {
    categoryHeading: 'Safety Beams:',
    wpSourceFile: 'BETA-DOORS-Safety-Beams-Manual.pdf',
    highlights: [
      'Infrared emitter & receiver alignment across garage doorway',
      'Auto-reverse safety trigger verification & LED diagnostic indicators',
      'Weather-resistant enclosure mounting & low-voltage control board wiring',
    ],
  },
  manual_receiver: {
    categoryHeading: 'External Receivers:',
    wpSourceFile: 'Mini2-Relay-03-NEW.pdf',
    highlights: [
      'Universal 2-Channel external receiver (Mini2-Relay-03) wiring diagram',
      'Enables BETA DOORS hopping code remotes on compatible third-party motors',
      'Channel 1 & Channel 2 memory learning and full memory clear procedure',
    ],
  },
};

export default function ManualsPage() {
  const { manuals } = useBetaDoors();
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = manuals.filter(
    (m) =>
      m.published &&
      (m.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.modelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.summary.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <SiteShell>
      {/* 1. DeFi Landing Page 16:9 Hero Stage with verbatim betadoors.com.au/beta-doors-manuals/ items */}
      <DeFiPageHeroStage
        ariaLabel="BETA DOORS Manuals 16:9 Hero Stage"
        badgeText="Official BETA DOORS Technical Library · Verified PDF Downloads"
        badgeHref="#manuals-library-grid"
        headlinePrimary="BETA DOORS Manuals &"
        headlineGradient="Operator Setup Guides"
        subheadline="Download official PDF installation and programming manuals for Panel Door Operator (Asterion Model), Roller Door Operator (RDO Manual File), BETA DOORS Safety Beams, and 2 Channel External Receivers."
        primaryCtaLabel="Browse 4 PDF Manuals"
        primaryCtaHref="#manuals-library-grid"
        secondaryCtaLabel="BETA Smart Support"
        secondaryCtaHref="/beta-smart-support/"
        scrollTargetId="manuals-library-grid"
        topLeftNode={{ label: 'Panel Door Operator', metric: 'Asterion Model' }}
        topRightNode={{ label: 'Roller Door Operator', metric: 'RDO Manual File' }}
        bottomLeftNode={{ label: 'Safety Beams', metric: 'Photocell PDF' }}
        bottomRightNode={{ label: 'External Receivers', metric: '2 Channel Receiver' }}
        horizonSlides={[
          { label: '01/04 . BETA DOORS Manuals', tag: 'Panel Door Operator: Asterion Model' },
          { label: '02/04 . BETA DOORS Manuals', tag: 'Roller Door Operator: RDO Manual File' },
          { label: '03/04 . BETA DOORS Manuals', tag: 'Safety Beams: BETA DOORS Safety beams file' },
          { label: '04/04 . BETA DOORS Manuals', tag: 'External Receivers: 2 Channel Receiver' },
        ]}
      />

      <div
        id="manuals-library-grid"
        className="px-4 sm:px-8 lg:px-12 py-12 max-w-7xl mx-auto space-y-12"
      >
        {/* Header & Search Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-[#EC008C]" />
              <span>OFFICIAL BETADOORS.COM.AU/BETA-DOORS-MANUALS/</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
              BETA DOORS Manuals:
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Verified PDF documentation for installers and homeowners. Admin staff can update versions and upload new PDFs in the CMS Workspace.
            </p>
          </div>

          <div className="w-full md:w-80">
            <label htmlFor="manual-search" className="sr-only">
              Search manuals by model or keyword
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
              <input
                id="manual-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter manuals (Asterion, RDO, Beams, Receiver)..."
                className="w-full pl-11 pr-4 py-3 text-xs bg-[#0B0C10] border border-white/15 rounded-full text-white placeholder:text-slate-500"
              />
            </div>
          </div>
        </div>

        {/* 2x2 DeFi Bento Manual Cards matching betadoors.com.au/beta-doors-manuals/ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((manual) => {
            const meta = MANUAL_CATEGORIES[manual.id] || {
              categoryHeading: 'Technical Manual:',
              wpSourceFile: `${manual.id}.pdf`,
              highlights: [manual.summary],
            };
            return (
              <article
                key={manual.id}
                className="bg-[#0B0C10] border border-white/[0.08] hover:border-white/25 rounded-[28px] p-7 sm:p-8 flex flex-col justify-between space-y-6 shadow-[0_20px_60px_rgba(0,0,0,0.65)] relative overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#EC008C] uppercase tracking-wider">
                      {meta.categoryHeading}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-0.5 text-slate-300 tabular-nums">
                      v{manual.version} · {manual.fileSizeKb} KB · PDF
                    </span>
                  </div>

                  <h3 className="text-2xl font-semibold text-white flex items-center gap-2.5">
                    <FileText className="w-5 h-5 text-[#EC008C] shrink-0" />
                    <span>{manual.label}</span>
                  </h3>

                  <div className="text-xs font-mono text-slate-400">
                    Model: {manual.modelName} · File: {meta.wpSourceFile}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed">
                    {manual.summary}
                  </p>

                  <ul className="space-y-2 pt-2">
                    {meta.highlights.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2.5 rounded-xl border border-white/[0.06] bg-black/40 p-3 text-xs text-slate-200"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <a
                    href={manual.localDownloadPath}
                    download={`${manual.id}.pdf`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-200 text-slate-950 text-xs font-semibold transition-colors shadow-[0_0_25px_rgba(255,255,255,0.2)]"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download {manual.label} (PDF)</span>
                  </a>
                  <a
                    href={manual.localDownloadPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.1] text-xs text-white transition-colors"
                  >
                    <span>Open in Browser</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {/* Connected Support & Registration Tools */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Link
            href="/warranty-registration/"
            className="rounded-[24px] border border-white/[0.08] bg-[#0B0C10] hover:border-white/25 p-6 flex items-center justify-between transition-all"
          >
            <div>
              <div className="font-mono text-[10px] uppercase text-[#EC008C]">WARRANTY PORTAL</div>
              <div className="text-base font-semibold text-white mt-1">Warranty Registration</div>
              <div className="text-xs text-slate-400 mt-1">Register serial number &amp; dealer code</div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-slate-400" />
          </Link>
          <Link
            href="/register-to-service/"
            className="rounded-[24px] border border-white/[0.08] bg-[#0B0C10] hover:border-white/25 p-6 flex items-center justify-between transition-all"
          >
            <div>
              <div className="font-mono text-[10px] uppercase text-[#EC008C]">SERVICE PORTAL</div>
              <div className="text-base font-semibold text-white mt-1">Register to Service</div>
              <div className="text-xs text-slate-400 mt-1">Upload purchase proof &amp; book service</div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-slate-400" />
          </Link>
          <Link
            href="/garage-door-spring-estimator/"
            className="rounded-[24px] border border-white/[0.08] bg-[#0B0C10] hover:border-white/25 p-6 flex items-center justify-between transition-all"
          >
            <div>
              <div className="font-mono text-[10px] uppercase text-[#EC008C]">INSTALLER TOOL</div>
              <div className="text-base font-semibold text-white mt-1">Spring Estimator</div>
              <div className="text-xs text-slate-400 mt-1">Sectional &amp; tilt spring sizing tool</div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-slate-400" />
          </Link>
        </div>

        <EnquiryForm
          sourcePagePath="/beta-doors-manuals/"
          heading="Need Technical Support or a Wiring Diagram?"
          subheading="We're available Australia wide! Contact our Campbellfield technical desk (1300 238 243 · sales@betadoors.com.au) for installer programming support."
        />
      </div>
    </SiteShell>
  );
}
