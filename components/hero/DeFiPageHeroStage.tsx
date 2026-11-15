'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  Play,
  Pause,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Triangle,
  Cpu,
  Shield,
  Hexagon,
  Pencil,
  X,
  Check,
} from 'lucide-react';
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
  scrollTargetId,
  topLeftNode,
  topRightNode,
  bottomLeftNode,
  bottomRightNode,
  horizonSlides,
}: DeFiPageHeroStageProps) {
  const pathname = usePathname() || '/';
  const { brand, pages, actor, mutateServer } = useBetaDoors();
  const isStaffEditor =
    actor.role === 'administrator' || actor.role === 'content_editor';

  const cleanPath =
    pathname === '/' ? '/' : `/${pathname.replace(/^\/+|\/+$/g, '')}`;
  const cmsPage = pages.find(
    (p) => p.slug.replace(/\/$/, '') === cleanPath
  );
  const savedHeader =
    brand.pageHeaders?.[cleanPath] ||
    brand.pageHeaders?.[`${cleanPath}/`];

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

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [activeSlide, setActiveSlide] = useState<number>(0);
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

  const openHeaderEditor = () => {
    setFormBadge(resolvedBadge);
    setFormHeadlinePrimary(resolvedHeadlinePrimary);
    setFormHeadlineGradient(resolvedHeadlineGradient);
    setFormSubheadline(resolvedSubheadline);
    setFormPrimaryCtaLabel(resolvedPrimaryCtaLabel);
    setFormPrimaryCtaHref(resolvedPrimaryCtaHref);
    setFormSecondaryCtaLabel(resolvedSecondaryCtaLabel);
    setFormSecondaryCtaHref(resolvedSecondaryCtaHref);
    setEditModalOpen(true);
  };

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

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const timer = window.setTimeout(() => {
      if (mq.matches) setIsPlaying(false);
    }, 0);
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setIsPlaying(false);
    };
    mq.addEventListener('change', onChange);
    return () => {
      window.clearTimeout(timer);
      mq.removeEventListener('change', onChange);
    };
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % Math.max(1, horizonSlides.length));
    }, 3500);
    return () => window.clearInterval(timer);
  }, [isPlaying, horizonSlides.length]);

  const cleanHref = (h: string) => (h.length > 1 && h.endsWith('/') ? h.slice(0, -1) : h);

  return (
    <section
      data-cms-custom-header="true"
      aria-label={ariaLabel}
      className="group/hero relative w-full max-w-[1760px] mx-auto px-3 sm:px-5 lg:px-7 pt-2 pb-8"
    >
      {/* Admin Hover Quick-Edit Button on Page Header */}
      {isStaffEditor && (
        <div className="absolute top-5 right-8 lg:right-12 z-40 opacity-90 sm:opacity-0 group-hover/hero:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            onClick={openHeaderEditor}
            data-testid="admin-edit-page-header-btn"
            className="keep-white-text inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#EC008C] hover:bg-[#d4007d] text-white text-xs font-semibold shadow-[0_6px_24px_rgba(236,0,140,0.55)] border border-white/25 cursor-pointer transition-all"
          >
            <Pencil className="w-3.5 h-3.5" />
            <span>Edit Page Header</span>
          </button>
        </div>
      )}

      {/* Main 16:9 Architectural HUD Container in Light & Dark Mode */}
      <div
        className="hud-corner-brackets relative w-full lg:aspect-video min-h-[480px] sm:min-h-[520px] rounded-xl overflow-hidden brand-animated-border border border-slate-200/90 dark:border-white/[0.09] bg-gradient-to-br from-white via-[#F4F8F7] to-[#E6F0EC] dark:from-[#060709] dark:via-[#060709] dark:to-[#060709] shadow-[0_24px_70px_rgba(15,23,42,0.08)] dark:shadow-[0_30px_100px_rgba(0,0,0,0.85)] transition-colors"
      >
        {/* 1. Volumetric Atmospheric Light Blooms */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-20 w-[65%] h-[78%] rounded-full blur-[95px] opacity-85"
          style={{
            background:
              'radial-gradient(circle at 70% 30%, rgba(16, 185, 129, 0.16) 0%, rgba(236, 0, 140, 0.08) 38%, transparent 72%)',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 -left-20 w-[58%] h-[68%] rounded-full blur-[90px] opacity-70"
          style={{
            background:
              'radial-gradient(circle at 30% 75%, rgba(56, 189, 248, 0.14) 0%, rgba(236, 0, 140, 0.06) 45%, transparent 75%)',
          }}
        />

        {/* Subtle Architectural Grid Points & Connector Lines */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
          className="pointer-events-none absolute inset-0 w-full h-full text-slate-400/45 dark:text-white/20"
        >
          {/* Top-Left Connector */}
          <path
            d="M 0 310 L 310 310 Q 345 310 370 280 L 455 180"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          {/* Top-Right Connector */}
          <path
            d="M 1920 310 L 1600 310 Q 1565 310 1540 280 L 1455 180"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          {/* Bottom-Left Connector */}
          <path
            d="M 0 740 L 310 740 Q 345 740 370 770 L 455 865"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          {/* Bottom-Right Connector */}
          <path
            d="M 1920 740 L 1600 740 Q 1565 740 1540 770 L 1455 865"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          />

          {/* Vertical Center Light Beams Below CTA Buttons */}
          <line x1="875" y1="640" x2="875" y2="1080" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />
          <line x1="920" y1="640" x2="920" y2="1080" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1" />
          <line x1="960" y1="640" x2="960" y2="1080" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1" />
          <line x1="1005" y1="640" x2="1005" y2="1080" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1" />
          <line x1="1050" y1="640" x2="1050" y2="1080" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />

          {/* Glowing Vertical Shooting Streaks on the Center Lines */}
          <line
            x1="875"
            y1={isPlaying ? '700' : '740'}
            x2="875"
            y2={isPlaying ? '840' : '860'}
            stroke="#EC008C"
            strokeOpacity="0.7"
            strokeWidth="2.2"
          />
          <line
            x1="960"
            y1={isPlaying ? '790' : '810'}
            x2="960"
            y2={isPlaying ? '920' : '930'}
            stroke="#0F172A"
            strokeOpacity="0.55"
            strokeWidth="2.2"
          />
          <line
            x1="1050"
            y1={isPlaying ? '850' : '870'}
            x2="1050"
            y2={isPlaying ? '980' : '990'}
            stroke="#EC008C"
            strokeOpacity="0.7"
            strokeWidth="2.2"
          />

          {/* Subtle ambient particles */}
          <circle cx="420" cy="240" r="1.8" fill="currentColor" />
          <circle cx="680" cy="190" r="1.4" fill="currentColor" />
          <circle cx="1220" cy="270" r="1.8" fill="currentColor" />
          <circle cx="1390" cy="490" r="1.8" fill="currentColor" />
          <circle cx="530" cy="720" r="1.5" fill="currentColor" />
          <circle cx="1190" cy="790" r="1.8" fill="currentColor" />
        </svg>

        {/* 2. Floating 4-Corner Node Callouts (Click to select slide 0..3) */}
        {/* Top-Left Node (Slide 0) */}
        <button
          type="button"
          onClick={() => {
            setActiveSlide(0);
            setIsPlaying(false);
          }}
          className="hidden md:flex flex-col items-start gap-2 absolute left-[8%] lg:left-[11%] top-[23%] z-30 text-left group cursor-pointer"
        >
          <div
            className={`w-10 h-10 rounded-full border backdrop-blur-md flex items-center justify-center transition-all shadow-sm ${
              activeSlide === 0
                ? 'bg-[#EC008C] border-[#EC008C] text-white scale-110 shadow-[0_0_25px_rgba(236,0,140,0.45)]'
                : 'bg-white/90 dark:bg-white/[0.04] border-slate-200 dark:border-white/15 text-slate-900 dark:text-white group-hover:border-[#EC008C]/60'
            }`}
          >
            <Triangle className="w-4 h-4" />
          </div>
          <div className="pl-1 pt-1">
            <div className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-1.5 group-hover:text-[#EC008C] transition-colors">
              <span className={`w-1.5 h-1.5 rounded-full ${activeSlide === 0 ? 'bg-[#EC008C] animate-pulse' : 'bg-slate-400'}`} />
              <span>{topLeftNode.label}</span>
            </div>
            <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 pl-3 tabular-nums">
              {topLeftNode.metric}
            </div>
          </div>
        </button>

        {/* Top-Right Node (Slide 2) */}
        <button
          type="button"
          onClick={() => {
            setActiveSlide(Math.min(2, horizonSlides.length - 1));
            setIsPlaying(false);
          }}
          className="hidden md:flex flex-col items-end gap-2 absolute right-[8%] lg:right-[11%] top-[23%] z-30 text-right group cursor-pointer"
        >
          <div
            className={`w-10 h-10 rounded-full border backdrop-blur-md flex items-center justify-center transition-all shadow-sm ${
              activeSlide === 2
                ? 'bg-[#EC008C] border-[#EC008C] text-white scale-110 shadow-[0_0_25px_rgba(236,0,140,0.45)]'
                : 'bg-white/90 dark:bg-white/[0.08] border-slate-200 dark:border-white/20 text-slate-900 dark:text-white group-hover:border-[#EC008C]/60'
            }`}
          >
            <Cpu className="w-4 h-4" />
          </div>
          <div className="pr-1 pt-1 text-right">
            <div className="text-xs font-semibold text-slate-900 dark:text-white flex items-center justify-end gap-1.5 group-hover:text-[#EC008C] transition-colors">
              <span className={`w-1.5 h-1.5 rounded-full ${activeSlide === 2 ? 'bg-[#EC008C] animate-pulse' : 'bg-slate-400'}`} />
              <span>{topRightNode.label}</span>
            </div>
            <div className="text-[11px] font-mono text-slate-500 dark:text-slate-300 tabular-nums">
              {topRightNode.metric}
            </div>
          </div>
        </button>

        {/* Bottom-Left Node (Slide 1) */}
        <button
          type="button"
          onClick={() => {
            setActiveSlide(Math.min(1, horizonSlides.length - 1));
            setIsPlaying(false);
          }}
          className="hidden md:flex flex-col items-start gap-2 absolute left-[8%] lg:left-[11%] bottom-[21%] z-30 text-left group cursor-pointer"
        >
          <div className="pl-1 pb-1">
            <div className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-1.5 group-hover:text-[#EC008C] transition-colors">
              <span className={`w-1.5 h-1.5 rounded-full ${activeSlide === 1 ? 'bg-[#EC008C] animate-pulse' : 'bg-slate-400'}`} />
              <span>{bottomLeftNode.label}</span>
            </div>
            <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 pl-3 tabular-nums">
              {bottomLeftNode.metric}
            </div>
          </div>
          <div
            className={`w-10 h-10 rounded-full border backdrop-blur-md flex items-center justify-center transition-all shadow-sm ${
              activeSlide === 1
                ? 'bg-[#EC008C] border-[#EC008C] text-white scale-110 shadow-[0_0_25px_rgba(236,0,140,0.45)]'
                : 'bg-white/90 dark:bg-white/[0.04] border-slate-200 dark:border-white/15 text-slate-900 dark:text-white group-hover:border-[#EC008C]/60'
            }`}
          >
            <Shield className="w-4 h-4" />
          </div>
        </button>

        {/* Bottom-Right Node (Slide 3) */}
        <button
          type="button"
          onClick={() => {
            setActiveSlide(Math.min(3, horizonSlides.length - 1));
            setIsPlaying(false);
          }}
          className="hidden md:flex flex-col items-end gap-2 absolute right-[8%] lg:right-[11%] bottom-[21%] z-30 text-right group cursor-pointer"
        >
          <div className="pr-1 pb-1 text-right">
            <div className="text-xs font-semibold text-slate-900 dark:text-white flex items-center justify-end gap-1.5 group-hover:text-[#EC008C] transition-colors">
              <span className={`w-1.5 h-1.5 rounded-full ${activeSlide === 3 ? 'bg-[#EC008C] animate-pulse' : 'bg-slate-400'}`} />
              <span>{bottomRightNode.label}</span>
            </div>
            <div className="text-[11px] font-mono text-slate-500 dark:text-slate-300 tabular-nums">
              {bottomRightNode.metric}
            </div>
          </div>
          <div
            className={`w-10 h-10 rounded-full border backdrop-blur-md flex items-center justify-center transition-all shadow-sm ${
              activeSlide === 3
                ? 'bg-[#EC008C] border-[#EC008C] text-white scale-110 shadow-[0_0_25px_rgba(236,0,140,0.45)]'
                : 'bg-white/90 dark:bg-white/[0.08] border-slate-200 dark:border-white/20 text-slate-900 dark:text-white group-hover:border-[#EC008C]/60'
            }`}
          >
            <Hexagon className="w-4 h-4" />
          </div>
        </button>

        {/* 3. Foreground Content Layer */}
        <div className="relative z-20 flex flex-col justify-between h-full p-6 sm:p-10 lg:p-14">
          {/* Top-Center Play/Pause Circular Button */}
          <div className="flex justify-center pt-2 sm:pt-4">
            <button
              type="button"
              onClick={() => setIsPlaying((prev) => !prev)}
              aria-label={isPlaying ? 'Pause stage animation' : 'Play stage animation'}
              aria-pressed={isPlaying}
              className="w-11 h-11 rounded-full bg-white/90 hover:bg-white dark:bg-white/[0.07] dark:hover:bg-white/[0.15] border border-slate-200/90 dark:border-white/15 backdrop-blur-md flex items-center justify-center text-slate-900 dark:text-white transition-all shadow-md"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4 translate-x-0.5 fill-current" />
              )}
            </button>
          </div>

          {/* Center Hero Copy Stack */}
          <div className="max-w-3xl mx-auto text-center space-y-5 my-auto py-6">
            {/* Pill Badge */}
            <div className="flex justify-center">
              <a
                href={cleanHref(badgeHref)}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 hover:bg-white dark:bg-white/[0.06] dark:hover:bg-white/[0.11] border border-slate-200/90 dark:border-white/15 backdrop-blur-md text-xs font-medium text-slate-700 dark:text-slate-200 shadow-xs transition-colors"
              >
                <span className="keep-white-text w-4 h-4 rounded-full bg-[#EC008C] text-white flex items-center justify-center text-[10px] font-bold">
                  B
                </span>
                <span>{resolvedBadge}</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </a>
            </div>

            {/* Display H1 with subtle metallic fade on right words */}
            <h1 className="text-3xl sm:text-5xl lg:text-[62px] font-semibold tracking-[-0.03em] leading-[1.08]">
              <span className="text-slate-950 dark:text-white">
                {resolvedHeadlinePrimary}{' '}
              </span>
              {resolvedHeadlineGradient ? (
                <span className="bg-gradient-to-r from-[#EC008C] via-slate-800 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-400/70 bg-clip-text text-transparent">
                  {resolvedHeadlineGradient}
                </span>
              ) : null}
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm lg:text-base text-slate-600 dark:text-slate-300/85 max-w-xl mx-auto leading-relaxed font-normal">
              {resolvedSubheadline}
            </p>

            {/* Dual Pill CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
              <a
                href={cleanHref(resolvedPrimaryCtaHref)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-50 dark:bg-[#111216]/90 dark:hover:bg-white/10 border border-slate-300 dark:border-white/15 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white shadow-sm transition-colors whitespace-nowrap"
              >
                <span>{resolvedPrimaryCtaLabel}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#EC008C]" />
              </a>

              <a
                href={cleanHref(resolvedSecondaryCtaHref)}
                className="keep-white-text inline-flex items-center justify-center px-7 py-3 rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-xs sm:text-sm font-semibold text-white dark:text-slate-950 shadow-md transition-colors whitespace-nowrap"
              >
                {resolvedSecondaryCtaLabel}
              </a>
            </div>
          </div>

          {/* Bottom-Left Scroll Indicator & Bottom-Right Horizon Progress Bar */}
          <div className="relative z-20 flex items-end justify-between gap-4 pt-4">
            <div className="flex items-center gap-2.5">
              <a
                href={`#${scrollTargetId}`}
                aria-label="Scroll down to page content"
                className="keep-white-text w-8 h-8 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black flex items-center justify-center hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors shrink-0 shadow-xs"
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </a>
              <a
                href={`#${scrollTargetId}`}
                className="px-3.5 py-1.5 rounded-full bg-white/85 dark:bg-white/[0.06] border border-slate-200/90 dark:border-white/10 text-[11px] font-mono text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors whitespace-nowrap shadow-2xs"
              >
                {horizonSlides[activeSlide]?.label || '01/04 . Scroll down'}
              </a>
            </div>

            <div className="text-right space-y-2 shrink-0">
              <div className="flex items-center justify-end gap-2">
                <a
                  href={`#${scrollTargetId}`}
                  className="text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-[#EC008C] transition-colors whitespace-nowrap"
                >
                  BETA horizons{' '}
                  <span className="text-slate-500 dark:text-slate-400 font-normal hidden sm:inline">
                    · {horizonSlides[activeSlide]?.tag}
                  </span>
                </a>
              </div>
              <div className="flex items-center justify-end gap-1.5">
                {horizonSlides.map((slide, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setActiveSlide(idx);
                      setIsPlaying(false);
                    }}
                    aria-label={`Select horizon slide ${idx + 1}: ${slide.tag}`}
                    title={slide.tag}
                    className="py-1.5 cursor-pointer group"
                  >
                    <span
                      className={`block h-1.5 rounded-full transition-all ${
                        activeSlide === idx
                          ? 'w-8 bg-[#EC008C] dark:bg-white'
                          : 'w-5 bg-slate-300 group-hover:bg-slate-400 dark:bg-white/25 dark:group-hover:bg-white/50'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partner & Compatible Hardware Strip Below Hero Frame */}
      <div className="mt-7 pt-2 px-4 flex flex-wrap items-center justify-center sm:justify-between gap-6 sm:gap-8 text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-white/10 pb-8">
        {[
          { name: 'ARIA 121', symbol: '▲', href: '/sectional-and-tilt-door-opener-range' },
          { name: 'ASTERION PDO', symbol: '✺', href: '/beta-doors-manuals' },
          { name: 'BETA B600', symbol: '▣', href: '/beta-gate-opener-range' },
          { name: 'RDO 1000N–1800N', symbol: '◎', href: '/roller-door-opener-range' },
          { name: '_STEEL LINE', symbol: '', href: '/hardware' },
          { name: 'B&D HINGES', symbol: '↗', href: '/hardware' },
          { name: 'LIFE GATE HP4', symbol: '❖', href: '/life-gate-opener-range' },
        ].map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-slate-700 dark:text-slate-200 hover:text-[#EC008C] dark:hover:text-white transition-colors"
          >
            {item.symbol && <span className="text-[#EC008C]">{item.symbol}</span>}
            <span>{item.name}</span>
          </a>
        ))}
      </div>

      {/* Inline Admin Page Header Editor Modal */}
      {editModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Edit Page Header for ${cleanPath}`}
          className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="w-full max-w-2xl rounded-2xl bg-[#0F1117] border border-white/15 p-6 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <div className="text-[11px] font-mono text-[#EC008C] uppercase tracking-wider">
                  INLINE ADMIN HEADER EDITOR · {cleanPath}
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Edit Page Header Texts &amp; CTAs
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setEditModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveHeader} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Top Pill Badge Text
                </label>
                <input
                  type="text"
                  value={formBadge}
                  onChange={(e) => setFormBadge(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#08090C] border border-white/15 text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Main Headline (Primary Words)
                  </label>
                  <input
                    type="text"
                    value={formHeadlinePrimary}
                    onChange={(e) => setFormHeadlinePrimary(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#08090C] border border-white/15 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Headline Gradient Accent Words
                  </label>
                  <input
                    type="text"
                    value={formHeadlineGradient}
                    onChange={(e) => setFormHeadlineGradient(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#08090C] border border-white/15 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Header Subtitle / Lead Description
                </label>
                <textarea
                  rows={3}
                  value={formSubheadline}
                  onChange={(e) => setFormSubheadline(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#08090C] border border-white/15 text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Primary CTA Button Label
                  </label>
                  <input
                    type="text"
                    value={formPrimaryCtaLabel}
                    onChange={(e) => setFormPrimaryCtaLabel(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#08090C] border border-white/15 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Primary CTA Link URL
                  </label>
                  <input
                    type="text"
                    value={formPrimaryCtaHref}
                    onChange={(e) => setFormPrimaryCtaHref(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#08090C] border border-white/15 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Secondary CTA Button Label
                  </label>
                  <input
                    type="text"
                    value={formSecondaryCtaLabel}
                    onChange={(e) => setFormSecondaryCtaLabel(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#08090C] border border-white/15 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Secondary CTA Link URL
                  </label>
                  <input
                    type="text"
                    value={formSecondaryCtaHref}
                    onChange={(e) => setFormSecondaryCtaHref(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#08090C] border border-white/15 text-white font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingHeader}
                  className="keep-white-text inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#EC008C] hover:bg-[#d4007d] text-white font-semibold shadow-lg cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>
                    {isSavingHeader ? 'Saving...' : 'Save & Publish Header'}
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
