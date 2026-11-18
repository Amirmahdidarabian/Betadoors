'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, X, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { useBetaDoors } from '@/components/providers/BetaDoorsProvider';
import { validateHeroMediaDimensions } from '@/lib/domain-logic';

const HERO_ARCHITECTURAL_LIGHT_BG =
  '/assets/aistudio/beta_hero_light_mode.jpg';
const HERO_ARCHITECTURAL_DARK_BG =
  '/assets/aistudio/b318dba0-6cc7-42de-aa3c-cb95b341eb2f_2386fbba.png';

const APPLE_HERO_QUICK_PILLS = [
  { label: 'جک پارکینگی', sub: 'TITAN · F600', href: '/insulated-sectional-garage-doors' },
  { label: 'موتور ریلی', sub: 'F-550M · F-500', href: '/single-skin-sectional-garage-doors' },
  { label: 'مدار و سیموت', sub: 'Rock-S · GSM', href: '/garage-door-opener-catagories' },
  { label: 'حضور و غیاب و UHF', sub: '2209 · S51', href: '/gate-catagories' },
  { label: 'موتور کرکره', sub: 'ساید UPS · توبولار', href: '/roller-door-opener-range' },
  { label: 'راهبند و دزدگیر', sub: 'B600 · Z7-GSM', href: '/accessories' },
];

export function Hero16By9Showcase() {
  const { brand, mutateServer } = useBetaDoors();
  const { heroConfig } = brand;

  const [heroModalOpen, setHeroModalOpen] = useState<boolean>(false);
  const [isSavingHero, setIsSavingHero] = useState<boolean>(false);

  const [formHeadline, setFormHeadline] = useState<string>(heroConfig.headline);
  const [formSubheadline, setFormSubheadline] = useState<string>(
    heroConfig.subheadline
  );
  const [formPrimaryLabel, setFormPrimaryLabel] = useState<string>(
    heroConfig.primaryCtaLabel
  );
  const [formPrimaryHref, setFormPrimaryHref] = useState<string>(
    heroConfig.primaryCtaHref
  );
  const [formSecondaryLabel, setFormSecondaryLabel] = useState<string>(
    heroConfig.secondaryCtaLabel
  );
  const [formSecondaryHref, setFormSecondaryHref] = useState<string>(
    heroConfig.secondaryCtaHref
  );
  const [formVideoUrl, setFormVideoUrl] = useState<string>(heroConfig.videoUrl);

  const mediaValidation = validateHeroMediaDimensions(
    heroConfig.width || 1920,
    heroConfig.height || 1080
  );

  const handleSaveHeroInline = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingHero(true);
    await mutateServer('update_brand_hero', {
      heroHeadline: formHeadline,
      heroSubheadline: formSubheadline,
      primaryCtaLabel: formPrimaryLabel,
      primaryCtaHref: formPrimaryHref,
      secondaryCtaLabel: formSecondaryLabel,
      secondaryCtaHref: formSecondaryHref,
      heroVideoUrl: formVideoUrl,
      heroWidth: 1920,
      heroHeight: 1080,
    });
    setIsSavingHero(false);
    setHeroModalOpen(false);
  };

  return (
    <section
      data-cms-custom-header="true"
      aria-label="معرفی محصولات شرکت بتا (BETA.IR)"
      className="w-full"
    >
      {/* Full-Bleed 16:9 Architectural Hero Stage Featuring Beta Products */}
      <div
        data-testid="hero-16x9-container"
        data-aspect-valid={mediaValidation.is16By9 ? 'true' : 'false'}
        className="relative w-full aspect-[16/10] sm:aspect-video min-h-[540px] sm:min-h-[660px] lg:min-h-[800px] max-h-[960px] overflow-hidden bg-[#ECEEF2] dark:bg-[#121316] select-none border-b border-black/[0.06] dark:border-white/[0.08]"
      >
        {/* Base Layer: Daylight Architectural Studio Scene (Always opacity 100% on GPU to prevent mid-fade bleed) */}
        <img
          src={HERO_ARCHITECTURAL_LIGHT_BG}
          alt="نمای روز محصولات شرکت بتا شامل راهبند اتوماتیک، موتور درب ریلی، مدار کنترل، اکسس کنترل RFID و ریموت"
          data-testid="hero-light-bg-img"
          decoding="async"
          fetchPriority="high"
          referrerPolicy="no-referrer"
          className="hero-bg-layer-light absolute inset-0 w-full h-full object-cover object-center pointer-events-none opacity-100 transform-gpu"
        />

        {/* Top Layer: Night Architectural Studio Scene (Pure GPU Opacity Cross-Dissolve 0 <-> 1) */}
        <img
          src={HERO_ARCHITECTURAL_DARK_BG}
          alt="نمای شب محصولات شرکت بتا شامل راهبند اتوماتیک، موتور درب ریلی، مدار کنترل، اکسس کنترل RFID و ریموت"
          data-testid="hero-dark-bg-img"
          decoding="async"
          fetchPriority="high"
          referrerPolicy="no-referrer"
          className="hero-bg-layer-dark absolute inset-0 w-full h-full object-cover object-center pointer-events-none opacity-0 dark:opacity-100 transform-gpu"
        />

        {/* Subtle Studio Contrast Scrim for Crisp Headline Readability in Both Light & Dark Themes */}
        <div
          aria-hidden="true"
          className="hero-scrim-layer pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_38%_at_53%_20%,rgba(255,255,255,0.38)_0%,transparent_100%)] dark:bg-[radial-gradient(ellipse_60%_38%_at_53%_20%,rgba(12,13,17,0.45)_0%,transparent_100%)]"
        />

        {/* Upper Studio Wall Typography & Dual Pill CTA Overlay (Positioned cleanly above the barrier boom arm) */}
        <div className="relative z-10 w-full h-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 pt-[2.2%] sm:pt-[2.3%] lg:pt-[2.4%] flex flex-col items-center text-center">
          {/* 1. Spaced English Eyebrow with Flanking Hairlines: ——— B E T A   D O O R S ——— */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            dir="ltr"
            className="inline-flex items-center justify-center gap-4 sm:gap-5 mb-1.5 sm:mb-2"
          >
            <span className="w-10 sm:w-14 h-[1px] bg-black/25 dark:bg-white/30 transition-colors duration-700" />
            <span className="hero-eyebrow-text text-[11px] sm:text-[12.5px] font-semibold tracking-[0.42em] uppercase">
              BETA DOORS
            </span>
            <span className="w-10 sm:w-14 h-[1px] bg-black/25 dark:bg-white/30 transition-colors duration-700" />
          </motion.div>

          {/* 2. 2-Line Display Headline with Glowing Magenta "بتا" */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="hero-charcoal-text text-[32px] sm:text-[48px] md:text-[58px] lg:text-[66px] font-black tracking-tight leading-[1.1] sm:leading-[1.08]"
          >
            <span className="block">
              وقتی <span className="hero-magenta-text">بتا</span> می‌خری،
            </span>
            <span className="block mt-0.5">خیالت راحته.</span>
          </motion.h1>

          {/* 3. Single-Line Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="hero-slate-text mt-2 sm:mt-2.5 text-sm sm:text-lg md:text-[19px] lg:text-[21px] font-medium max-w-2xl mx-auto leading-snug"
          >
            نسل جدید جک‌های پارکینگی، مدارهای هوشمند و سیستم‌های امنیتی.
          </motion.p>

          {/* 4. Centered Dual Pill Buttons (Magenta Right, White/Glass Left in RTL) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3.5 sm:mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-3.5"
          >
            <Link
              href={heroConfig.primaryCtaHref?.replace(/\/$/, '') || '/products'}
              className="apple-pill-btn keep-white-text inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-[#EC008C] hover:bg-[#d4007d] text-white text-xs sm:text-sm md:text-base font-bold shadow-[0_10px_28px_rgba(236,0,140,0.38)]"
            >
              <span>مشاهده محصولات</span>
            </Link>

            <Link
              href="/shop"
              className="apple-pill-btn hero-white-pill inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-white hover:bg-[#F9FAFB] text-xs sm:text-sm md:text-base font-bold shadow-[0_8px_24px_rgba(0,0,0,0.12)] border border-black/[0.08] dark:border-white/20 transition-all duration-500"
            >
              <span>خرید آنلاین</span>
              <ChevronLeft className="w-4 h-4 text-[#EC008C]" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Apple Chapter Quick Bar Below Hero */}
      <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
        >
          {APPLE_HERO_QUICK_PILLS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="apple-card group rounded-2xl bg-white dark:bg-[#161617] border border-black/[0.05] dark:border-white/[0.08] px-4 py-3.5 text-center flex flex-col items-center justify-center gap-0.5 shadow-[0_4px_16px_rgba(0,0,0,0.03)]"
            >
              <span className="text-sm font-bold text-[#1D1D1F] dark:text-[#F5F5F7] group-hover:text-[#EC008C] transition-colors">
                {item.label}
              </span>
              <span className="text-xs text-[#86868B]" dir="ltr">
                {item.sub}
              </span>
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Inline Admin Homepage Hero Header Editor Modal */}
      {heroModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="ویرایشگر هدر صفحه اصلی"
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="w-full max-w-2xl rounded-3xl bg-white dark:bg-[#1D1D1F] border border-black/10 dark:border-white/15 p-6 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between gap-4 border-b border-black/10 dark:border-white/10 pb-4">
              <div>
                <div className="text-xs font-bold text-[#EC008C]">
                  ویرایشگر هدر صفحه اصلی
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-[#1D1D1F] dark:text-white">
                  ویرایش تیتر و دکمه‌های بخش اصلی
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setHeroModalOpen(false)}
                className="w-9 h-9 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-[#1D1D1F] dark:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveHeroInline} className="space-y-4 text-sm">
              <div>
                <label className="block font-medium mb-1">تیتر اصلی (H1)</label>
                <input
                  type="text"
                  value={formHeadline}
                  onChange={(e) => setFormHeadline(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F5F7] dark:bg-black/40 border border-black/10 dark:border-white/15"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">زیرتیتر</label>
                <textarea
                  rows={2}
                  value={formSubheadline}
                  onChange={(e) => setFormSubheadline(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F5F7] dark:bg-black/40 border border-black/10 dark:border-white/15"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-black/10 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setHeroModalOpen(false)}
                  className="px-4 py-2 rounded-full bg-black/5 dark:bg-white/10 font-medium cursor-pointer"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  disabled={isSavingHero}
                  className="keep-white-text inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#EC008C] text-white font-bold cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>{isSavingHero ? 'در حال ذخیره...' : 'ذخیره'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
