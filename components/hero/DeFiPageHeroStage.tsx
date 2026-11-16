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
  Crosshair,
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
    }, 3800);
    return () => window.clearInterval(timer);
  }, [isPlaying, horizonSlides.length]);

  const cleanHref = (h: string) => (h.length > 1 && h.endsWith('/') ? h.slice(0, -1) : h);

  const cornerNodes = [
    { idx: '01', node: topLeftNode, slideIdx: 0, Icon: Triangle },
    { idx: '02', node: bottomLeftNode, slideIdx: 1, Icon: Shield },
    { idx: '03', node: topRightNode, slideIdx: 2, Icon: Cpu },
    { idx: '04', node: bottomRightNode, slideIdx: 3, Icon: Hexagon },
  ];

  return (
    <section
      data-cms-custom-header="true"
      aria-label={ariaLabel}
      className="group/hero relative w-full max-w-[1760px] mx-auto px-3 sm:px-5 lg:px-7 pt-2 pb-8"
    >
      {/* Main Architectural HUD Stage (0px Sharp Geometry) */}
      <div
        className="hud-corner-brackets hud-technical-grid relative w-full min-h-[440px] sm:min-h-[480px] rounded-none overflow-hidden brand-animated-border border border-slate-300 dark:border-white/[0.12] bg-[#0B0C10] shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:shadow-[0_30px_100px_rgba(0,0,0,0.85)] flex flex-col justify-between transition-colors"
      >
        {/* 1. Animated HUD Vector Circuit Traces */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1920 820"
          preserveAspectRatio="xMidYMid slice"
          className="pointer-events-none absolute inset-0 w-full h-full"
        >
          {/* Top-Left HUD Trace */}
          <path
            d="M 0 210 L 380 210 L 450 140"
            fill="none"
            stroke="rgba(236,0,140,0.28)"
            strokeWidth="1.5"
            className="hud-rail-dashed"
          />
          <path
            d="M 0 210 L 380 210 L 450 140"
            fill="none"
            stroke="#EC008C"
            strokeWidth="2"
            className="hud-animated-trace"
          />
          <rect x="446" y="136" width="8" height="8" fill="#EC008C" />

          {/* Top-Right HUD Trace */}
          <path
            d="M 1920 210 L 1540 210 L 1470 140"
            fill="none"
            stroke="rgba(236,0,140,0.28)"
            strokeWidth="1.5"
            className="hud-rail-dashed"
          />
          <path
            d="M 1920 210 L 1540 210 L 1470 140"
            fill="none"
            stroke="#EC008C"
            strokeWidth="2"
            className="hud-animated-trace"
          />
          <rect x="1466" y="136" width="8" height="8" fill="#EC008C" />

          {/* Bottom-Left HUD Trace */}
          <path
            d="M 0 610 L 380 610 L 450 680"
            fill="none"
            stroke="rgba(56,189,248,0.28)"
            strokeWidth="1.5"
            className="hud-rail-dashed"
          />
          <rect x="446" y="676" width="8" height="8" fill="#38BDF8" />

          {/* Bottom-Right HUD Trace */}
          <path
            d="M 1920 610 L 1540 610 L 1470 680"
            fill="none"
            stroke="rgba(56,189,248,0.28)"
            strokeWidth="1.5"
            className="hud-rail-dashed"
          />
          <rect x="1466" y="676" width="8" height="8" fill="#38BDF8" />

          {/* Center Vertical Calibration Axis */}
          <line
            x1="960"
            y1="520"
            x2="960"
            y2="820"
            stroke="rgba(236,0,140,0.24)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        </svg>

        {/* 2. Top Architectural HUD Telemetry Bar */}
        <div className="relative z-20 px-4 sm:px-7 py-3 border-b border-white/[0.08] bg-[#08090C] flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono uppercase tracking-widest">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#EC008C]/15 border border-[#EC008C]/45 text-[#ff7ac6] font-bold">
              <span className="w-1.5 h-1.5 bg-[#EC008C] animate-pulse" />
              <span>HUD.STAGE</span>
            </span>
            <span className="text-slate-400">
              ROUTE // <strong className="text-white">{cleanPath === '/' ? '/HOME' : cleanPath.toUpperCase()}</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-slate-400">
              CAMPBELLFIELD VIC 3061 // 1300 238 243
            </span>
            <button
              type="button"
              onClick={() => setIsPlaying((prev) => !prev)}
              aria-label={isPlaying ? 'Pause stage telemetry' : 'Resume stage telemetry'}
              aria-pressed={isPlaying}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-none bg-[#0B0C10] hover:bg-white/[0.08] border border-white/15 text-[10px] font-mono font-semibold text-white cursor-pointer transition-colors"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3 h-3 text-[#EC008C]" />
                  <span>TELEMETRY: LIVE</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-slate-400" />
                  <span>TELEMETRY: PAUSED</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 3. Main Center Grid: 2 Left HUD Nodes + Center Editorial Stack + 2 Right HUD Nodes */}
        <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center px-4 sm:px-8 lg:px-10 py-8 sm:py-10 my-auto">
          {/* Left Column: 2 Sharp HUD Telemetry Modules ([01] & [02]) */}
          <div className="hidden lg:flex lg:col-span-3 flex-col gap-3">
            {[cornerNodes[0], cornerNodes[1]].map(({ idx, node, slideIdx, Icon }) => {
              const isSelected = activeSlide === slideIdx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setActiveSlide(Math.min(slideIdx, horizonSlides.length - 1));
                    setIsPlaying(false);
                  }}
                  className={`hud-corner-brackets text-left p-3.5 rounded-none border transition-all cursor-pointer flex items-center gap-3 ${
                    isSelected
                      ? 'bg-[#EC008C]/15 border-[#EC008C] shadow-[0_0_24px_rgba(236,0,140,0.2)]'
                      : 'bg-[#08090C] hover:bg-white/[0.05] border-white/[0.1]'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-none border flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-[#EC008C] border-[#EC008C] text-white keep-white-text'
                        : 'bg-[#0B0C10] border-white/15 text-[#EC008C]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                      NODE // [{idx}]
                    </div>
                    <div className="text-xs font-semibold text-white truncate">
                      {node.label}
                    </div>
                    <div className="text-[11px] font-mono text-[#ff7ac6] font-semibold tabular-nums truncate">
                      {node.metric}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Center Hero Copy Stack */}
          <div className="lg:col-span-6 text-center space-y-5">
            {/* Sharp 0px HUD Specification Badge */}
            <div className="flex justify-center">
              <a
                href={cleanHref(badgeHref)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-[#08090C] hover:bg-white/[0.08] border border-[#EC008C]/45 text-[11px] font-mono font-semibold text-white transition-colors"
              >
                <span className="keep-white-text px-1.5 py-0.5 rounded-none bg-[#EC008C] text-white text-[9px] font-mono font-bold">
                  BETA
                </span>
                <span>{resolvedBadge}</span>
                <ArrowRight className="w-3 h-3 text-[#EC008C]" />
              </a>
            </div>

            {/* Display H1 with High-Contrast Sharp Typography */}
            <h1
              style={{ textWrap: 'balance' }}
              className="text-3xl sm:text-5xl lg:text-[54px] font-semibold tracking-[-0.03em] leading-[1.08]"
            >
              <span className="text-white">{resolvedHeadlinePrimary} </span>
              {resolvedHeadlineGradient ? (
                <span className="text-[#EC008C]">{resolvedHeadlineGradient}</span>
              ) : null}
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm lg:text-base text-slate-300 max-w-xl mx-auto leading-relaxed font-normal">
              {resolvedSubheadline}
            </p>

            {/* Dual Sharp 0px HUD CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href={cleanHref(resolvedPrimaryCtaHref)}
                className="keep-white-text inline-flex items-center gap-2 px-6 py-3 rounded-none bg-[#EC008C] hover:bg-[#d4007d] text-xs sm:text-sm font-mono font-bold text-white shadow-[0_0_24px_rgba(236,0,140,0.4)] transition-colors whitespace-nowrap"
              >
                <span>{resolvedPrimaryCtaLabel}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href={cleanHref(resolvedSecondaryCtaHref)}
                className="inline-flex items-center justify-center px-6 py-3 rounded-none bg-[#08090C] hover:bg-white/[0.08] border border-white/20 text-xs sm:text-sm font-mono font-semibold text-white transition-colors whitespace-nowrap"
              >
                {resolvedSecondaryCtaLabel}
              </a>
            </div>

            {/* Mobile/Tablet 4-Node Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 lg:hidden text-left">
              {cornerNodes.map(({ idx, node, slideIdx }) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveSlide(Math.min(slideIdx, horizonSlides.length - 1))}
                  className={`p-2.5 rounded-none border text-xs cursor-pointer ${
                    activeSlide === slideIdx
                      ? 'bg-[#EC008C]/15 border-[#EC008C]'
                      : 'bg-[#08090C] border-white/10'
                  }`}
                >
                  <div className="text-[10px] font-mono text-[#ff7ac6] font-bold">
                    [{idx}] {node.label}
                  </div>
                  <div className="text-[10px] font-mono text-slate-300 truncate">
                    {node.metric}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: 2 Sharp HUD Telemetry Modules ([03] & [04]) */}
          <div className="hidden lg:flex lg:col-span-3 flex-col gap-3">
            {[cornerNodes[2], cornerNodes[3]].map(({ idx, node, slideIdx, Icon }) => {
              const isSelected = activeSlide === slideIdx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setActiveSlide(Math.min(slideIdx, horizonSlides.length - 1));
                    setIsPlaying(false);
                  }}
                  className={`hud-corner-brackets text-right p-3.5 rounded-none border transition-all cursor-pointer flex items-center justify-end gap-3 ${
                    isSelected
                      ? 'bg-[#EC008C]/15 border-[#EC008C] shadow-[0_0_24px_rgba(236,0,140,0.2)]'
                      : 'bg-[#08090C] hover:bg-white/[0.05] border-white/[0.1]'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                      NODE // [{idx}]
                    </div>
                    <div className="text-xs font-semibold text-white truncate">
                      {node.label}
                    </div>
                    <div className="text-[11px] font-mono text-[#ff7ac6] font-semibold tabular-nums truncate">
                      {node.metric}
                    </div>
                  </div>
                  <div
                    className={`w-9 h-9 rounded-none border flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-[#EC008C] border-[#EC008C] text-white keep-white-text'
                        : 'bg-[#0B0C10] border-white/15 text-[#EC008C]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Bottom HUD Scroll & Horizon Progress Bar */}
        <div className="relative z-20 px-4 sm:px-7 py-3 border-t border-white/[0.08] bg-[#08090C] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <a
              href={`#${scrollTargetId}`}
              aria-label="Scroll down to page content"
              className="keep-white-text w-7 h-7 rounded-none bg-[#EC008C] text-white flex items-center justify-center hover:bg-[#d4007d] transition-colors shrink-0"
            >
              <ArrowDown className="w-3.5 h-3.5" />
            </a>
            <a
              href={`#${scrollTargetId}`}
              className="px-3 py-1 rounded-none bg-[#0B0C10] border border-white/10 text-[11px] font-mono text-slate-300 hover:text-white transition-colors whitespace-nowrap"
            >
              {horizonSlides[activeSlide]?.label || '01/04 · Scroll down'}
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`#${scrollTargetId}`}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-white hover:text-[#EC008C] transition-colors whitespace-nowrap"
            >
              <Crosshair className="w-3.5 h-3.5 text-[#EC008C]" />
              <span>{horizonSlides[activeSlide]?.tag || 'BETA DOORS HARDWARE'}</span>
            </a>

            <div className="flex items-center gap-1.5">
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
                  className="py-1 cursor-pointer group"
                >
                  <span
                    className={`block h-1.5 rounded-none transition-all ${
                      activeSlide === idx
                        ? 'w-8 bg-[#EC008C]'
                        : 'w-4 bg-slate-500/35 group-hover:bg-slate-400/70'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Partner & Compatible Hardware Strip Below Hero Frame (0px Sharp HUD Boxes) */}
      <div className="mt-3.5 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {[
          { idx: '01', name: 'ARIA 121', detail: 'Sectional Drive', href: '/sectional-and-tilt-door-opener-range' },
          { idx: '02', name: 'ASTERION PDO', detail: 'Panel Opener', href: '/beta-doors-manuals' },
          { idx: '03', name: 'BETA B600', detail: 'Sliding Gate', href: '/beta-gate-opener-range' },
          { idx: '04', name: 'RDO 1000–1800N', detail: 'Roller Drive', href: '/roller-door-opener-range' },
          { idx: '05', name: 'STEEL LINE', detail: 'Hinge Spec', href: '/hardware' },
          { idx: '06', name: 'B&D HINGES', detail: 'Trade Hardware', href: '/hardware' },
          { idx: '07', name: 'LIFE GATE HP4', detail: 'Italian Gate', href: '/life-gate-opener-range' },
        ].map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="group hud-corner-brackets px-3 py-2 rounded-none bg-[#0B0C10] border border-white/[0.09] hover:border-[#EC008C]/50 flex items-center justify-between gap-2 transition-all"
          >
            <div className="min-w-0">
              <div className="text-[10px] font-mono font-bold text-white group-hover:text-[#EC008C] transition-colors truncate">
                <span className="text-slate-500 mr-1">[{item.idx}]</span>
                {item.name}
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                {item.detail}
              </div>
            </div>
            <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-[#EC008C] shrink-0" />
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
          <div className="hud-corner-brackets w-full max-w-2xl rounded-none bg-[#0F1117] border border-white/15 p-6 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
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
                className="w-8 h-8 rounded-none bg-[#181B24] hover:bg-[#232836] border border-white/15 flex items-center justify-center text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveHeader} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Top HUD Badge Text
                </label>
                <input
                  type="text"
                  value={formBadge}
                  onChange={(e) => setFormBadge(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-none bg-[#08090C] border border-white/15 text-white"
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
                    className="w-full px-3.5 py-2.5 rounded-none bg-[#08090C] border border-white/15 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Headline Accent Words
                  </label>
                  <input
                    type="text"
                    value={formHeadlineGradient}
                    onChange={(e) => setFormHeadlineGradient(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-none bg-[#08090C] border border-white/15 text-white"
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
                  className="w-full px-3.5 py-2.5 rounded-none bg-[#08090C] border border-white/15 text-white"
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
                    className="w-full px-3.5 py-2.5 rounded-none bg-[#08090C] border border-white/15 text-white"
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
                    className="w-full px-3.5 py-2.5 rounded-none bg-[#08090C] border border-white/15 text-white font-mono"
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
                    className="w-full px-3.5 py-2.5 rounded-none bg-[#08090C] border border-white/15 text-white"
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
                    className="w-full px-3.5 py-2.5 rounded-none bg-[#08090C] border border-white/15 text-white font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 rounded-none bg-[#181B24] hover:bg-[#232836] border border-white/15 text-white font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingHeader}
                  className="keep-white-text inline-flex items-center gap-1.5 px-6 py-2.5 rounded-none bg-[#EC008C] hover:bg-[#d4007d] text-white font-semibold shadow-lg cursor-pointer"
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
