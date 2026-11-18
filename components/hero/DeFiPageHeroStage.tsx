'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, X, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { useBetaDoors } from '@/components/providers/BetaDoorsProvider';

export interface DeFiCornerNode {
  label: string;
  metric: string;
  href?: string;
}

export interface DeFiHorizonSlide {
  label: string;
  tag: string;
}

export interface DeFiPageHeroStageProps {
  ariaLabel: string;
  badgeText: string;
  badgeHref: string;
  headlinePrimary: string;
  headlineGradient: string;
  subheadline: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  scrollTargetId: string;
  topLeftNode: DeFiCornerNode;
  topRightNode: DeFiCornerNode;
  bottomLeftNode: DeFiCornerNode;
  bottomRightNode: DeFiCornerNode;
  horizonSlides: DeFiHorizonSlide[];
}

export function DeFiPageHeroStage({
  ariaLabel,
  badgeText,
  badgeHref,
  headlinePrimary,
  headlineGradient,
  subheadline,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
}: DeFiPageHeroStageProps) {
  const pathname = usePathname() || '/';
  const { brand, pages, mutateServer } = useBetaDoors();

  const cleanPath =
    pathname === '/' ? '/' : `/${pathname.replace(/^\/+|\/+$/g, '')}`;
  const cmsPage = pages.find((p) => p.slug.replace(/\/$/, '') === cleanPath);
  const savedHeader =
    brand.pageHeaders?.[cleanPath] || brand.pageHeaders?.[`${cleanPath}/`];

  const resolvedBadge =
    savedHeader?.badgeText ?? cmsPage?.headerBadge ?? badgeText;
  const resolvedHeadlinePrimary =
    savedHeader?.headlinePrimary ?? cmsPage?.title ?? headlinePrimary;
  const resolvedHeadlineGradient =
    savedHeader?.headlineGradient ??
    cmsPage?.headlineGradient ??
    headlineGradient;
  const resolvedSubheadline =
    savedHeader?.subheadline ?? cmsPage?.leadDescription ?? subheadline;
  const resolvedPrimaryCtaLabel =
    savedHeader?.primaryCtaLabel ??
    cmsPage?.headerPrimaryCtaLabel ??
    primaryCtaLabel;
  const resolvedPrimaryCtaHref =
    savedHeader?.primaryCtaHref ??
    cmsPage?.headerPrimaryCtaHref ??
    primaryCtaHref;
  const resolvedSecondaryCtaLabel =
    savedHeader?.secondaryCtaLabel ??
    cmsPage?.headerSecondaryCtaLabel ??
    secondaryCtaLabel;
  const resolvedSecondaryCtaHref =
    savedHeader?.secondaryCtaHref ??
    cmsPage?.headerSecondaryCtaHref ??
    secondaryCtaHref;

  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [isSavingHeader, setIsSavingHeader] = useState<boolean>(false);

  const [formBadge, setFormBadge] = useState(resolvedBadge);
  const [formHeadlinePrimary, setFormHeadlinePrimary] = useState(
    resolvedHeadlinePrimary
  );
  const [formHeadlineGradient, setFormHeadlineGradient] = useState(
    resolvedHeadlineGradient
  );
  const [formSubheadline, setFormSubheadline] = useState(resolvedSubheadline);
  const [formPrimaryCtaLabel, setFormPrimaryCtaLabel] = useState(
    resolvedPrimaryCtaLabel
  );
  const [formPrimaryCtaHref, setFormPrimaryCtaHref] = useState(
    resolvedPrimaryCtaHref
  );
  const [formSecondaryCtaLabel, setFormSecondaryCtaLabel] = useState(
    resolvedSecondaryCtaLabel
  );
  const [formSecondaryCtaHref, setFormSecondaryCtaHref] = useState(
    resolvedSecondaryCtaHref
  );

  const handleSaveHeader = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingHeader(true);
    await mutateServer('update_site_copy_overrides', {
      pagePath: cleanPath,
      pageHeader: {
        badgeText: formBadge,
        headlinePrimary: formHeadlinePrimary,
        headlineGradient: formHeadlineGradient,
        subheadline: formSubheadline,
        primaryCtaLabel: formPrimaryCtaLabel,
        primaryCtaHref: formPrimaryCtaHref,
        secondaryCtaLabel: formSecondaryCtaLabel,
        secondaryCtaHref: formSecondaryCtaHref,
      },
    });
    if (cmsPage) {
      await mutateServer('update_page_full', {
        pageId: cmsPage.id,
        title: formHeadlinePrimary,
        headlineGradient: formHeadlineGradient,
        leadDescription: formSubheadline,
        headerBadge: formBadge,
        headerPrimaryCtaLabel: formPrimaryCtaLabel,
        headerPrimaryCtaHref: formPrimaryCtaHref,
        headerSecondaryCtaLabel: formSecondaryCtaLabel,
        headerSecondaryCtaHref: formSecondaryCtaHref,
      });
    }
    setIsSavingHeader(false);
    setEditModalOpen(false);
  };

  const cleanHref = (h: string) =>
    h.length > 1 && h.endsWith('/') ? h.slice(0, -1) : h;

  return (
    <section
      data-cms-custom-header="true"
      aria-label={ariaLabel}
      className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-[32px] border border-black/[0.06] dark:border-white/[0.1] bg-white dark:bg-[#11131A] px-6 sm:px-12 py-12 sm:py-16 shadow-[0_14px_40px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
      >
        {/* Light Mode Architectural Automation Header Backdrop */}
        <img
          src="/assets/aistudio/beta_hero_light_mode.jpg"
          alt=""
          referrerPolicy="no-referrer"
          className="pointer-events-none select-none absolute inset-0 w-full h-full object-cover object-center opacity-35 dark:opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/70 via-white/85 to-white/95 opacity-100 dark:opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />

        {/* Dark Mode Architectural Automation Header Backdrop */}
        <img
          src="/assets/aistudio/b318dba0-6cc7-42de-aa3c-cb95b341eb2f_2386fbba.png"
          alt=""
          referrerPolicy="no-referrer"
          className="pointer-events-none select-none absolute inset-0 w-full h-full object-cover object-center opacity-0 dark:opacity-35 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#090B10]/70 via-[#0B0E15]/85 to-[#090B10]/95 opacity-0 dark:opacity-100 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
          <div className="flex justify-center">
            <Link
              href={cleanHref(badgeHref)}
              className="text-sm font-bold text-[#EC008C] hover:opacity-80 transition-opacity"
            >
              {resolvedBadge}
            </Link>
          </div>

          <h1
            style={{ textWrap: 'balance' }}
            className="text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7] leading-[1.18]"
          >
            <span>{resolvedHeadlinePrimary} </span>
            {resolvedHeadlineGradient ? (
              <span className="text-[#EC008C]">{resolvedHeadlineGradient}</span>
            ) : null}
          </h1>

          <p className="text-base sm:text-xl text-[#515154] dark:text-[#CBD5E1] max-w-2xl mx-auto leading-relaxed">
            {resolvedSubheadline}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <a
              href={cleanHref(resolvedPrimaryCtaHref)}
              className="apple-pill-btn keep-white-text inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#EC008C] hover:bg-[#d4007d] text-white text-base font-bold shadow-[0_8px_24px_rgba(236,0,140,0.28)]"
            >
              <span>{resolvedPrimaryCtaLabel}</span>
            </a>

            <a
              href={cleanHref(resolvedSecondaryCtaHref)}
              className="apple-pill-btn inline-flex items-center gap-1.5 px-7 py-3 rounded-full bg-white/90 dark:bg-[#1D1D1F]/90 hover:bg-white dark:hover:bg-white/[0.14] border border-black/[0.08] dark:border-white/[0.14] text-base font-bold text-[#1D1D1F] dark:text-[#F5F5F7] backdrop-blur-md"
            >
              <span>{resolvedSecondaryCtaLabel}</span>
              <ChevronLeft className="w-4 h-4 text-[#EC008C]" />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Inline Admin Page Header Editor Modal */}
      {editModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`ویرایشگر هدر صفحه ${cleanPath}`}
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="w-full max-w-2xl rounded-3xl bg-white dark:bg-[#1D1D1F] border border-black/10 dark:border-white/15 p-6 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between gap-4 border-b border-black/10 dark:border-white/10 pb-4">
              <div>
                <div className="text-xs font-bold text-[#EC008C]">
                  ویرایشگر هدر صفحه · {cleanPath}
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-[#1D1D1F] dark:text-white">
                  ویرایش متون و دکمه‌های هدر صفحه
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setEditModalOpen(false)}
                className="w-9 h-9 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-[#1D1D1F] dark:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveHeader} className="space-y-4 text-sm">
              <div>
                <label className="block font-medium mb-1">
                  متن بالای تیتر
                </label>
                <input
                  type="text"
                  value={formBadge}
                  onChange={(e) => setFormBadge(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F5F5F7] dark:bg-black/40 border border-black/10 dark:border-white/15"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1">
                    بخش اول تیتر اصلی
                  </label>
                  <input
                    type="text"
                    value={formHeadlinePrimary}
                    onChange={(e) => setFormHeadlinePrimary(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F5F5F7] dark:bg-black/40 border border-black/10 dark:border-white/15"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">
                    بخش رنگی تیتر (سرخابی)
                  </label>
                  <input
                    type="text"
                    value={formHeadlineGradient}
                    onChange={(e) => setFormHeadlineGradient(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F5F5F7] dark:bg-black/40 border border-black/10 dark:border-white/15"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1">
                  توضیحات زیرتیتر
                </label>
                <textarea
                  rows={3}
                  value={formSubheadline}
                  onChange={(e) => setFormSubheadline(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F5F5F7] dark:bg-black/40 border border-black/10 dark:border-white/15"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-black/10 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-5 py-2.5 rounded-full bg-black/5 dark:bg-white/10 font-medium cursor-pointer"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  disabled={isSavingHeader}
                  className="keep-white-text inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#EC008C] hover:bg-[#d4007d] text-white font-semibold cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>
                    {isSavingHeader ? 'در حال ذخیره...' : 'ذخیره و انتشار هدر'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
