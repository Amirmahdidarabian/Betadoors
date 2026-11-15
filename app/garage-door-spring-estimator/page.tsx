'use client';

import React, { useState } from 'react';
import { Calculator, AlertTriangle, Phone, ArrowDown } from 'lucide-react';
import { SiteShell } from '@/components/layout/SiteShell';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { useBetaDoors } from '@/components/providers/BetaDoorsProvider';

export default function SpringEstimatorPage() {
  const { brand } = useBetaDoors();

  const [doorType, setDoorType] = useState<'sectional' | 'tilt'>('sectional');
  const [doorHeightMm, setDoorHeightMm] = useState<number>(2100);
  const [doorWidthMm, setDoorWidthMm] = useState<number>(4800);
  const [doorWeightKg, setDoorWeightKg] = useState<number>(92);
  const [springCount, setSpringCount] = useState<1 | 2>(2);

  // Reference engineering pre-assessment summary (explicitly marked provisional per Section 13)
  const drumCircumferenceMm = 318; // Standard 4" drum
  const requiredTurns = Number(((doorHeightMm / drumCircumferenceMm) + 0.75).toFixed(1));
  const estimatedIpptPerSpring = Number(
    (((doorWeightKg * 2.20462 * 2) / springCount / requiredTurns) * 10).toFixed(1)
  );

  const calculatorContextSummary = `Door: ${doorType.toUpperCase()} | ${doorWidthMm}mm W × ${doorHeightMm}mm H | Weight: ${doorWeightKg}kg | Springs: ${springCount} | Est. Turns: ${requiredTurns} | Ref IPPT/spring: ~${estimatedIpptPerSpring} (Pending Technician Verification)`;

  return (
    <SiteShell>
      <div className="px-4 sm:px-8 lg:px-12 py-12 max-w-6xl mx-auto space-y-12">
        <div className="border-b border-white/10 pb-8 space-y-3">
          <div className="text-xs text-slate-400">
            Engineering Tool &amp; Order Context · /garage-door-spring-estimator/
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Garage Door Spring Estimator
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Capture your door dimensions, mass, and spring configuration to prepare a verified spring order or replacement booking with our Campbellfield specialists.
          </p>
        </div>

        {/* Safety & Verification Notice per Section 13 */}
        <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-500/30 flex items-start gap-3.5 text-xs text-amber-200 leading-relaxed">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-semibold text-white">
              High-Tension Torsion Spring Safety &amp; Formula Verification Notice
            </div>
            <p>
              Per Section 13 of the BETA DOORS engineering brief, legacy external estimator iframes (<code className="font-mono">8753447398479647.netlify.app</code>) are isolated pending specialist formula sign-off. Use the interactive specification capture tool below to carry your exact door measurements directly into a BETA DOORS spring order enquiry or call <strong className="text-white">{brand.phone}</strong>.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive Spring Input Panel */}
          <div className="lg:col-span-7 bg-[#0F1117] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-5">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#EC008C]" />
              <span>1. Enter Door &amp; Spring Parameters (Metric)</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label
                  htmlFor="calc-door-type"
                  className="block font-medium text-slate-300 mb-1.5"
                >
                  Door Configuration
                </label>
                <select
                  id="calc-door-type"
                  value={doorType}
                  onChange={(e) => setDoorType(e.target.value as 'sectional' | 'tilt')}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#08090C] border border-white/15 text-white"
                >
                  <option value="sectional">Sectional Overhead Door</option>
                  <option value="tilt">Tilt Garage Door</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="calc-spring-count"
                  className="block font-medium text-slate-300 mb-1.5"
                >
                  Number of Torsion Springs
                </label>
                <select
                  id="calc-spring-count"
                  value={springCount}
                  onChange={(e) => setSpringCount(Number(e.target.value) as 1 | 2)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#08090C] border border-white/15 text-white"
                >
                  <option value={2}>2 Springs (Standard Double Door)</option>
                  <option value={1}>1 Spring (Single Door)</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="calc-height"
                  className="block font-medium text-slate-300 mb-1.5"
                >
                  Door Height (mm)
                </label>
                <input
                  id="calc-height"
                  type="number"
                  min={1800}
                  max={3600}
                  step={50}
                  value={doorHeightMm}
                  onChange={(e) => setDoorHeightMm(Number(e.target.value) || 2100)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#08090C] border border-white/15 text-white font-mono tabular-nums"
                />
              </div>

              <div>
                <label
                  htmlFor="calc-width"
                  className="block font-medium text-slate-300 mb-1.5"
                >
                  Door Width (mm)
                </label>
                <input
                  id="calc-width"
                  type="number"
                  min={2000}
                  max={6500}
                  step={100}
                  value={doorWidthMm}
                  onChange={(e) => setDoorWidthMm(Number(e.target.value) || 4800)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#08090C] border border-white/15 text-white font-mono tabular-nums"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="calc-weight"
                  className="block font-medium text-slate-300 mb-1.5"
                >
                  Estimated Door Curtain Mass (kg)
                </label>
                <input
                  id="calc-weight"
                  type="number"
                  min={35}
                  max={240}
                  value={doorWeightKg}
                  onChange={(e) => setDoorWeightKg(Number(e.target.value) || 92)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#08090C] border border-white/15 text-white font-mono tabular-nums"
                />
              </div>
            </div>
          </div>

          {/* Right: Computed Pre-Assessment Output & Handoff */}
          <div className="lg:col-span-5 bg-[#0F1117] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-5">
            <h2 className="text-lg font-bold text-white">
              2. Spring Pre-Assessment Summary
            </h2>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-xl bg-[#08090C] border border-white/10 space-y-1">
                <div className="text-slate-400">Nominal Drum Turns</div>
                <div className="text-2xl font-bold text-white font-mono tabular-nums">
                  {requiredTurns} turns
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#08090C] border border-white/10 space-y-1">
                <div className="text-slate-400">Ref. Torque Index</div>
                <div className="text-2xl font-bold text-[#EC008C] font-mono tabular-nums">
                  ~{estimatedIpptPerSpring}
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#08090C] border border-white/10 text-xs font-mono text-slate-300 leading-relaxed">
              {calculatorContextSummary}
            </div>

            <div className="flex flex-col gap-2.5 pt-2">
              <a
                href="#spring-enquiry-section"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#EC008C] hover:bg-[#d4007d] text-white text-xs font-semibold transition-colors"
              >
                <span>Carry Parameters into Spring Enquiry Below</span>
                <ArrowDown className="w-4 h-4" />
              </a>
              <a
                href={`tel:${brand.phone.replace(/\s+/g, '')}`}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-medium"
              >
                <Phone className="w-3.5 h-3.5 text-[#EC008C]" />
                <span>Phone Spring Desk: {brand.phone}</span>
              </a>
            </div>
          </div>
        </div>

        <div id="spring-enquiry-section">
          <EnquiryForm
            sourcePagePath="/garage-door-spring-estimator/"
            calculatorContext={calculatorContextSummary}
            heading="Order Custom Torsion Springs or Book Replacement"
            subheading="Your calculated door dimensions and spring parameters above are automatically attached to this enquiry."
          />
        </div>
      </div>
    </SiteShell>
  );
}
