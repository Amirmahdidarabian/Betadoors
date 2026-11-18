'use client';

import React, { useState } from 'react';
import { Calculator, AlertTriangle, Phone, ArrowDown } from 'lucide-react';
import { SiteShell } from '@/components/layout/SiteShell';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { useBetaDoors } from '@/components/providers/BetaDoorsProvider';

export default function SpringEstimatorPage() {
  const { brand } = useBetaDoors();

  const [doorType, setDoorType] = useState<'sectional' | 'tilt'>('sectional');
  const [doorHeightMm, setDoorHeightMm] = useState<number>(2200);
  const [doorWidthMm, setDoorWidthMm] = useState<number>(3500);
  const [doorWeightKg, setDoorWeightKg] = useState<number>(280);
  const [springCount, setSpringCount] = useState<1 | 2>(2);

  // Reference engineering pre-assessment summary
  const drumCircumferenceMm = 318;
  const requiredTurns = Number(((doorHeightMm / drumCircumferenceMm) + 0.75).toFixed(1));
  const estimatedIpptPerSpring = Number(
    (((doorWeightKg * 2.20462 * 2) / springCount / requiredTurns) * 10).toFixed(1)
  );

  const recommendedBetaModel =
    doorType === 'sectional'
      ? doorWeightKg <= 450
        ? 'موتور کرکره توبولار بتا (100N الی 140N) یا ساید AC 300Kg'
        : 'موتور ساید کرکره برقی بتا AC 600Kg / 800Kg (یا سه فاز 1500Kg)'
      : doorWeightKg <= 700
        ? 'جک پارکینگی بازویی دو لنگه بتا مدل B400 / B500 / B550'
        : 'جک پارکینگی ریلی بتا مدل B600 یا موتور ریلی صنعتی فورس';

  const calculatorContextSummary = `نوع درب: ${doorType === 'sectional' ? 'کرکره برقی / سکشنال' : 'پارکینگی لولایی / ریلی'} | عرض: ${doorWidthMm}mm × ارتفاع: ${doorHeightMm}mm | وزن تخمینی: ${doorWeightKg}kg | تعداد لنگه/فنر: ${springCount} | پیشنهاد مهندسی بتا: ${recommendedBetaModel}`;

  return (
    <SiteShell>
      <div dir="rtl" className="px-4 sm:px-8 lg:px-12 py-12 max-w-6xl mx-auto space-y-12">
        <div className="border-b border-white/10 pb-8 space-y-3">
          <div className="text-xs font-mono text-[#EC008C]">
            محاسبه‌گر مهندسی شرکت بتا · انتخاب ظرفیت جک پارکینگی، موتور کرکره و فنربندی
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            محاسبه‌گر هوشمند ظرفیت جک و موتور کرکره بتا
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            ابعاد درب، وزن تخمینی و آرایش لنگه‌ها را وارد نمایید تا سیستم مهندسی بتا، مدل دقیق موتور کرکره برقی (ساید یا توبولار) یا جک پارکینگی (B400 / B500 / B550 / B600) مناسب پروژه شما را محاسبه و به فرم استعلام پیوست نماید.
          </p>
        </div>

        {/* Safety & Verification Notice */}
        <div className="hud-corner-brackets p-5 rounded-none bg-amber-950/40 border border-amber-500/30 flex items-start gap-3.5 text-xs text-amber-200 leading-relaxed">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-semibold text-white">
              نکته ایمنی و مهندسی در انتخاب ظرفیت موتور و جک پارکینگی
            </div>
            <p>
              در انتخاب موتور کرکره برقی و جک پارکینگی، همواره ضریب اطمینان ۲۵٪ بالاتر از وزن استاتیک درب و میزان تردد روزانه (مسکونی، مجتمع پرتردد یا صنعتی) را در نظر بگیرید. جهت مشاوره مستقیم با مهندسین فروش بتا با شماره <strong className="text-white">{brand.phone}</strong> تماس حاصل فرمایید.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive Input Panel */}
          <div className="lg:col-span-7 hud-corner-brackets bg-[#0F1117] border border-white/10 rounded-none p-6 sm:p-8 space-y-5">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#EC008C]" />
              <span>۱. ورود ابعاد و مشخصات فنی درب (میلی‌متر و کیلوگرم)</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label
                  htmlFor="calc-door-type"
                  className="block font-medium text-slate-300 mb-1.5"
                >
                  نوع کاربری درب
                </label>
                <select
                  id="calc-door-type"
                  value={doorType}
                  onChange={(e) => setDoorType(e.target.value as 'sectional' | 'tilt')}
                  className="w-full px-3.5 py-2.5 rounded-none bg-[#08090C] border border-white/15 text-white"
                >
                  <option value="sectional">کرکره برقی اتوماتیک / درب سکشنال</option>
                  <option value="tilt">درب پارکینگی لولایی (بازویی) یا ریلی</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="calc-spring-count"
                  className="block font-medium text-slate-300 mb-1.5"
                >
                  تعداد لنگه درب / شفت فنر
                </label>
                <select
                  id="calc-spring-count"
                  value={springCount}
                  onChange={(e) => setSpringCount(Number(e.target.value) as 1 | 2)}
                  className="w-full px-3.5 py-2.5 rounded-none bg-[#08090C] border border-white/15 text-white"
                >
                  <option value={2}>دو لنگه (جفت بازو / دو فنر)</option>
                  <option value={1}>تک لنگه (تک بازو / ریلی یکپارچه)</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="calc-height"
                  className="block font-medium text-slate-300 mb-1.5"
                >
                  ارتفاع مفید درب (میلی‌متر)
                </label>
                <input
                  id="calc-height"
                  type="number"
                  min={1800}
                  max={6000}
                  step={50}
                  value={doorHeightMm}
                  onChange={(e) => setDoorHeightMm(Number(e.target.value) || 2200)}
                  className="w-full px-3.5 py-2.5 rounded-none bg-[#08090C] border border-white/15 text-white font-mono tabular-nums"
                />
              </div>

              <div>
                <label
                  htmlFor="calc-width"
                  className="block font-medium text-slate-300 mb-1.5"
                >
                  عرض دهانه ورودی (میلی‌متر)
                </label>
                <input
                  id="calc-width"
                  type="number"
                  min={1500}
                  max={8000}
                  step={100}
                  value={doorWidthMm}
                  onChange={(e) => setDoorWidthMm(Number(e.target.value) || 3500)}
                  className="w-full px-3.5 py-2.5 rounded-none bg-[#08090C] border border-white/15 text-white font-mono tabular-nums"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="calc-weight"
                  className="block font-medium text-slate-300 mb-1.5"
                >
                  وزن کل تیغه کرکره یا لنگه‌های درب (کیلوگرم)
                </label>
                <input
                  id="calc-weight"
                  type="number"
                  min={35}
                  max={1500}
                  value={doorWeightKg}
                  onChange={(e) => setDoorWeightKg(Number(e.target.value) || 280)}
                  className="w-full px-3.5 py-2.5 rounded-none bg-[#08090C] border border-white/15 text-white font-mono tabular-nums"
                />
              </div>
            </div>
          </div>

          {/* Right: Computed Pre-Assessment Output & Handoff */}
          <div className="lg:col-span-5 hud-corner-brackets bg-[#0F1117] border border-white/10 rounded-none p-6 sm:p-8 space-y-5">
            <h2 className="text-lg font-bold text-white">
              ۲. خروجی محاسبه و پیشنهاد سیستم بتا
            </h2>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-none bg-[#08090C] border border-white/10 space-y-1">
                <div className="text-slate-400">دور شفت / کورس نامی</div>
                <div className="text-2xl font-bold text-white font-mono tabular-nums">
                  {requiredTurns} دور
                </div>
              </div>
              <div className="p-4 rounded-none bg-[#08090C] border border-white/10 space-y-1">
                <div className="text-slate-400">شاخص گشتاور مرجع</div>
                <div className="text-2xl font-bold text-[#EC008C] font-mono tabular-nums">
                  ~{estimatedIpptPerSpring}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-none bg-[#EC008C]/10 border border-[#EC008C]/40 space-y-1">
              <div className="text-[11px] font-mono text-[#ff7ac6]">مدل پیشنهادی شرکت بتا:</div>
              <div className="text-sm font-bold text-white leading-relaxed">
                {recommendedBetaModel}
              </div>
            </div>

            <div className="p-3.5 rounded-none bg-[#08090C] border border-white/10 text-xs font-mono text-slate-300 leading-relaxed">
              {calculatorContextSummary}
            </div>

            <div className="flex flex-col gap-2.5 pt-2">
              <a
                href="#spring-enquiry-section"
                className="keep-white-text w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-none bg-[#EC008C] hover:bg-[#d4007d] text-white text-xs font-semibold transition-colors"
              >
                <span>ارسال مشخصات محاسبه‌شده به فرم استعلام پایین</span>
                <ArrowDown className="w-4 h-4" />
              </a>
              <a
                href="tel:02188404407"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-none bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-medium"
              >
                <Phone className="w-3.5 h-3.5 text-[#EC008C]" />
                <span>تماس با واحد مهندسی فروش: {brand.phone}</span>
              </a>
            </div>
          </div>
        </div>

        <div id="spring-enquiry-section">
          <EnquiryForm
            sourcePagePath="/garage-door-spring-estimator/"
            calculatorContext={calculatorContextSummary}
            heading="ثبت سفارش و استعلام قیمت بر اساس محاسبه مهندسی"
            subheading="ابعاد و ظرفیت محاسبه‌شده درب شما به صورت خودکار به این درخواست پیوست شده است."
          />
        </div>
      </div>
    </SiteShell>
  );
}
