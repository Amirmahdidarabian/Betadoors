'use client';

import React from 'react';
import { SiteShell } from '@/components/layout/SiteShell';
import { BetaDoorsLogo } from '@/components/brand/BetaDoorsLogo';
import { ProductTechnicalArtwork } from '@/components/brand/ProductTechnicalArtwork';

export default function DesignSystemShowcasePage() {
  return (
    <SiteShell>
      <div className="px-4 sm:px-8 lg:px-12 py-12 max-w-6xl mx-auto space-y-12">
        <div className="border-b border-white/10 pb-8 space-y-2">
          <div className="text-xs text-slate-400">
            Section 6 Deliverable · Shared Design Tokens &amp; Component Showcase
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            BETA DOORS — Shared Design &amp; Motion System
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl">
            One unified dark-luxury architectural design system applied across every public template, transactional commerce screen, and custom staff CMS view.
          </p>
        </div>

        {/* Palette & Brand Marks */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">01. Brand Marks &amp; Semantic Colour Tokens</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#08090C] border border-white/15 space-y-2">
              <div className="h-8 w-full rounded bg-[#08090C] border border-white/10" />
              <div className="text-xs font-mono text-white">#08090C · Obsidian Canvas (60%)</div>
            </div>
            <div className="p-5 rounded-2xl bg-[#0F1117] border border-white/15 space-y-2">
              <div className="h-8 w-full rounded bg-[#0F1117] border border-white/10" />
              <div className="text-xs font-mono text-white">#0F1117 · Structural Bento Surface (30%)</div>
            </div>
            <div className="p-5 rounded-2xl bg-[#0F1117] border border-white/15 space-y-2">
              <div className="h-8 w-full rounded bg-[#EC008C]" />
              <div className="text-xs font-mono text-white">#EC008C · BETA Magenta Accent (10%)</div>
            </div>
            <div className="p-5 rounded-2xl bg-[#0F1117] border border-white/15 flex items-center justify-center">
              <BetaDoorsLogo className="h-8 w-auto" />
            </div>
          </div>
        </section>

        {/* Interactive Controls & States */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">02. Interactive Controls &amp; Motion Timings</h2>
          <div className="bg-[#0F1117] border border-white/10 rounded-2xl p-6 flex flex-wrap items-center gap-4">
            <button
              type="button"
              className="px-5 py-2.5 rounded-full bg-[#EC008C] hover:bg-[#d4007d] text-white text-xs font-semibold transition-colors duration-150"
            >
              Primary Action (150ms)
            </button>
            <button
              type="button"
              className="px-5 py-2.5 rounded-full bg-white text-slate-950 hover:bg-slate-200 text-xs font-semibold transition-colors duration-150"
            >
              High-Contrast CTA
            </button>
            <button
              type="button"
              className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 text-xs font-medium transition-colors duration-150"
            >
              Secondary Action
            </button>
            <button
              type="button"
              disabled
              className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-slate-500 text-xs font-medium opacity-50 cursor-not-allowed"
            >
              Disabled State
            </button>
          </div>
        </section>

        {/* Technical Product Artwork Gallery */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">03. Technical Hardware Renders</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-[#12141A]">
              <ProductTechnicalArtwork type="motor_pack" title="Motor Pack" />
            </div>
            <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-[#12141A]">
              <ProductTechnicalArtwork type="roller_opener" title="Roller Opener" />
            </div>
            <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-[#12141A]">
              <ProductTechnicalArtwork type="remote_pack" title="Remote Pack" />
            </div>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
