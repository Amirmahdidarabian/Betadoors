'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Play,
  Pause,
  ArrowDown,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Crosshair,
  X,
  Check,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useBetaDoors } from '@/components/providers/BetaDoorsProvider';
import { validateHeroMediaDimensions } from '@/lib/domain-logic';

const HERO_MOTION_VIDEO_URL = '/assets/aistudio/logo_motion_ec8a3dd9.mp4';

interface HeroShowcaseSlide {
  idx: string;
  seriesTag: string;
  title: string;
  description: string;
  specs: [string, string, string];
  quickLinkLabel: string;
  quickLinkHref: string;
}

const HERO_SHOWCASE_SLIDES: HeroShowcaseSlide[] = [
  {
    idx: '01/04',
    seriesTag: 'ARIA 121 SERIES',
    title: 'Whisper-Quiet Sectional & Panel Door Drives',
    description:
      '800N, 1200N, and 1500N 24V DC brushless-grade belt & chain drives with WiFi app control and safety photo-beams.',
    specs: ['800N–1500N FORCE', 'WIFI + 3 REMOTES', '5-YEAR WARRANTY'],
    quickLinkLabel: 'Panel Door Motor Pack (800N–1500N)',
    quickLinkHref: '/product/motor-pack',
  },
  {
    idx: '02/04',
    seriesTag: 'RDO DRUM SERIES',
    title: 'High-Torque Roller Door Openers (1000N–1800N)',
    description:
      'Slim-clearance side-mount roller door automation engineered for residential and heavy sheet-curtain bays.',
    specs: ['1000N–1800N TORQUE', 'SLIM SIDE CLEARANCE', '2 × P2011 REMOTES'],
    quickLinkLabel: 'Roller Door Opener Kit ($590 AUD)',
    quickLinkHref: '/product/roller-door-opener',
  },
  {
    idx: '03/04',
    seriesTag: 'GATE AUTOMATION',
    title: 'BETA & Italian LIFE Gate Automation',
    description:
      'Heavy-duty sliding and swing gate drives (B600, B550, LIFE HP4, OP2, HP6) with photocell safety integration.',
    specs: ['600KG–1500KG DRIVES', 'SLIDING & SWING', '1300 238 243'],
    quickLinkLabel: 'BETA & LIFE Gate Opener Range',
    quickLinkHref: '/beta-gate-opener-range',
  },
  {
    idx: '04/04',
    seriesTag: 'MELBOURNE DISPATCH',
    title: 'Same-Day Melbourne Repairs & Trade Supply',
    description:
      'Rapid spring replacement, cable resets, commercial shutter servicing, and genuine parts from Campbellfield HQ.',
    specs: ['CAMPBELLFIELD 3061', '20,000+ CYCLE SPRINGS', 'SAME-DAY SERVICE'],
    quickLinkLabel: 'Book Same-Day Service or Repair',
    quickLinkHref: '/register-to-service',
  },
];

export function Hero16By9Showcase() {
  const { brand, mutateServer } = useBetaDoors();
  const { heroConfig } = brand;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [activeSlide, setActiveSlide] = useState<number>(0);
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

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const timer = window.setTimeout(() => {
      if (mq.matches) {
        setIsPlaying(false);
        videoRef.current?.pause();
      }
    }, 0);
    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsPlaying(false);
        videoRef.current?.pause();
      }
    };
    mq.addEventListener('change', handleMotionChange);
    return () => {
      window.clearTimeout(timer);
      mq.removeEventListener('change', handleMotionChange);
    };
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SHOWCASE_SLIDES.length);
    }, 4800);
    return () => window.clearInterval(timer);
  }, [isPlaying]);

  const togglePlayback = () => {
    const vid = videoRef.current;
    if (!vid) {
      setIsPlaying((prev) => !prev);
      return;
    }
    if (vid.paused) {
      vid.play().catch(() => {});
      setIsPlaying(true);
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  };

  const handlePrevSlide = () => {
    setActiveSlide(
      (prev) =>
        (prev - 1 + HERO_SHOWCASE_SLIDES.length) % HERO_SHOWCASE_SLIDES.length
    );
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % HERO_SHOWCASE_SLIDES.length);
  };

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

  const videoSrc =
    heroConfig.videoUrl && heroConfig.videoUrl.endsWith('.mp4')
      ? heroConfig.videoUrl
      : HERO_MOTION_VIDEO_URL;

  const currentSlide = HERO_SHOWCASE_SLIDES[activeSlide] || HERO_SHOWCASE_SLIDES[0];

  return (
    <section
      data-cms-custom-header="true"
      aria-label="16:9 Full-Frame 3D Brand Motion Showcase"
      className="group/hero relative w-full max-w-[1760px] mx-auto px-3 sm:px-5 lg:px-7 pt-2 pb-6"
    >
      {/* Master 16:9 Architectural Video Stage (1920x1080 Uncropped with 0px Sharp HUD Overlays) */}
      <div
        data-testid="hero-16x9-container"
        data-aspect-valid={mediaValidation.is16By9 ? 'true' : 'false'}
        className="hud-corner-brackets relative w-full aspect-video rounded-none overflow-hidden brand-animated-border bg-[#040406] shadow-[0_24px_80px_rgba(0,0,0,0.85)] select-none"
      >
        {/* 1920x1080 16:9 Motion Video Layer */}
        <video
          ref={videoRef}
          src={videoSrc}
          poster="/assets/aistudio/logo_motion_poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-contain bg-[#040406]"
        />

        {/* Subtle Edge Vignette so HUD Panels remain legible without obscuring center 3D motion */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/35"
        />

        {/* Top HUD Telemetry Bar inside 16:9 Frame */}
        <div className="absolute top-3 sm:top-5 inset-x-3 sm:inset-x-6 z-20 flex items-center justify-between gap-2 pointer-events-none">
          <div className="crystal-glass-pill pointer-events-auto inline-flex items-center gap-2 px-3 py-1.5 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-white keep-white-text">
            <span className="w-2 h-2 bg-[#EC008C] animate-pulse shrink-0" />
            <span className="font-bold text-[#ff7ac6]">BETA DOORS</span>
            <span className="hidden sm:inline text-white/80">
              {'// 16:9 ARCHITECTURAL MOTION STAGE · VIC 3061'}
            </span>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              type="button"
              onClick={togglePlayback}
              aria-label={isPlaying ? 'Pause hero video' : 'Play hero video'}
              aria-pressed={isPlaying}
              className="crystal-glass-pill keep-white-text inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] sm:text-[11px] font-mono font-semibold text-white cursor-pointer transition-colors"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#EC008C]" />
                  <span>PAUSE MOTION</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-[#EC008C]" />
                  <span>PLAY MOTION</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Bottom Split HUD Overlays inside 16:9 Stage (Desktop & Tablet) */}
        <div className="hidden md:flex absolute bottom-4 lg:bottom-6 inset-x-4 lg:inset-x-6 z-20 items-end justify-between gap-6 pointer-events-none">
          {/* Bottom-Left HUD Telemetry & Slide Card (Fixed Dimensions + Smooth Animated Transition) */}
          <div className="crystal-glass-panel hud-corner-brackets pointer-events-auto w-full max-w-[520px] lg:max-w-[560px] h-[184px] p-4 lg:p-5 flex flex-col justify-between overflow-hidden keep-white-text">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <a
                  href="#bento-insights-heading"
                  aria-label="Scroll down to technical specifications"
                  className="keep-white-text w-6 h-6 bg-[#EC008C] hover:bg-[#d4007d] text-white flex items-center justify-center transition-colors shrink-0 shadow-[0_0_14px_rgba(236,0,140,0.5)]"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </a>
                <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-white/90 tabular-nums">
                  {currentSlide.idx} · SCROLL DOWN
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-white">
                <Crosshair className="w-3.5 h-3.5 text-[#EC008C]" />
                <span>{currentSlide.seriesTag}</span>
              </div>
            </div>

            <div className="relative flex-1 flex flex-col justify-center overflow-hidden my-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide.idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-1"
                >
                  <h1 className="text-lg lg:text-xl font-bold tracking-tight text-white truncate">
                    {currentSlide.title}
                  </h1>
                  <p className="text-xs text-slate-200/90 line-clamp-2 leading-relaxed">
                    {currentSlide.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="pt-2.5 border-t border-white/15 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-mono uppercase tracking-wider text-slate-200">
              {currentSlide.specs.map((spec, idx) => (
                <React.Fragment key={spec}>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#EC008C]" />
                    <span>{spec}</span>
                  </span>
                  {idx < currentSlide.specs.length - 1 && (
                    <span className="text-white/30">/</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Bottom-Right HUD Action & Slide Switcher Card */}
          <div className="crystal-glass-panel hud-corner-brackets pointer-events-auto w-full max-w-[420px] lg:max-w-[460px] p-4 lg:p-5 flex flex-col justify-between gap-3.5 keep-white-text">
            <div className="flex flex-col items-end gap-2.5">
              <a
                href="/product/motor-pack"
                className="keep-white-text inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/25 text-xs lg:text-sm font-bold text-white transition-colors"
              >
                <span>Buy Motor Pack ($650–$730)</span>
                <ArrowUpRight className="w-4 h-4 text-[#EC008C]" />
              </a>

              <a
                href={
                  heroConfig.primaryCtaHref?.replace(/\/$/, '') ||
                  '/sectional-and-tilt-door-opener-range'
                }
                className="keep-white-text inline-flex items-center gap-2 px-5 py-2.5 bg-[#EC008C] hover:bg-[#d4007d] text-xs lg:text-sm font-bold text-white shadow-[0_0_24px_rgba(236,0,140,0.45)] transition-colors"
              >
                <span>
                  {heroConfig.primaryCtaLabel || 'View Sectional Range'}
                </span>
              </a>
            </div>

            <div className="pt-3 border-t border-white/15 flex items-center justify-between gap-3">
              <a
                href={currentSlide.quickLinkHref}
                className="keep-white-text inline-flex items-center gap-2 text-xs font-medium text-white hover:text-[#ff7ac6] transition-colors min-w-0 truncate"
              >
                <span className="w-2 h-2 bg-[#EC008C] shrink-0" />
                <span className="truncate">{currentSlide.quickLinkLabel}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#EC008C] shrink-0" />
              </a>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={handlePrevSlide}
                  aria-label="Previous showcase slide"
                  className="keep-white-text w-7 h-7 border border-white/25 bg-white/10 hover:bg-[#EC008C] text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleNextSlide}
                  aria-label="Next showcase slide"
                  className="keep-white-text w-7 h-7 border border-white/25 bg-white/10 hover:bg-[#EC008C] text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 4-Slide Progress Indicator Bars */}
            <div className="flex items-center justify-end gap-1.5">
              {HERO_SHOWCASE_SLIDES.map((s, idx) => (
                <button
                  key={s.idx}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  aria-label={`Select slide ${idx + 1}: ${s.seriesTag}`}
                  className="py-0.5 cursor-pointer"
                >
                  <span
                    className={`block h-1.5 transition-all duration-300 ${
                      activeSlide === idx
                        ? 'w-8 bg-[#EC008C]'
                        : 'w-3.5 bg-white/30 hover:bg-white/60'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Compact HUD Summary & CTAs (Below 16:9 Video Frame on Small Screens) */}
      <div
        id="bento-insights-heading"
        className="md:hidden mt-3 hud-corner-brackets p-4 bg-[#0B0C10] border border-white/15 space-y-3"
      >
        <div className="flex items-center justify-between text-[10px] font-mono text-[#EC008C] uppercase">
          <span>{currentSlide.idx}</span>
          <span>{currentSlide.seriesTag}</span>
        </div>
        <h2 className="text-base font-bold text-white">{currentSlide.title}</h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          {currentSlide.description}
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          <a
            href="/product/motor-pack"
            className="keep-white-text flex-1 text-center px-4 py-2.5 bg-[#EC008C] text-white text-xs font-mono font-bold"
          >
            Buy Motor Pack ($650–$730)
          </a>
          <a
            href="/sectional-and-tilt-door-opener-range"
            className="flex-1 text-center px-4 py-2.5 bg-[#12141A] border border-white/15 text-white text-xs font-mono font-semibold"
          >
            View Range
          </a>
        </div>
      </div>

      {/* 7-Item Compatible Hardware & Product Quick-Jump Strip Below 16:9 Hero Frame */}
      <div className="mt-3.5 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {[
          {
            idx: '01',
            name: 'ARIA 121',
            detail: 'Sectional Drive',
            href: '/sectional-and-tilt-door-opener-range',
          },
          {
            idx: '02',
            name: 'ASTERION PDO',
            detail: 'Panel Opener',
            href: '/beta-doors-manuals',
          },
          {
            idx: '03',
            name: 'BETA B600',
            detail: 'Sliding Gate',
            href: '/beta-gate-opener-range',
          },
          {
            idx: '04',
            name: 'RDO 1000–1800N',
            detail: 'Roller Drive',
            href: '/roller-door-opener-range',
          },
          {
            idx: '05',
            name: 'STEEL LINE',
            detail: 'Hinge Spec',
            href: '/hardware',
          },
          {
            idx: '06',
            name: 'B&D HINGES',
            detail: 'Trade Hardware',
            href: '/hardware',
          },
          {
            idx: '07',
            name: 'LIFE GATE HP4',
            detail: 'Italian Gate',
            href: '/life-gate-opener-range',
          },
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

      {/* Inline Admin Homepage Hero Header Editor Modal */}
      {heroModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Edit Homepage Hero Header"
          className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="hud-corner-brackets w-full max-w-2xl rounded-none bg-[#0F1117] border border-white/15 p-6 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <div className="text-[11px] font-mono text-[#EC008C] uppercase tracking-wider">
                  ADMIN HERO EDITOR · HOMEPAGE (/)
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Edit Homepage Hero Texts &amp; CTAs
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setHeroModalOpen(false)}
                className="w-8 h-8 rounded-none bg-[#181B24] hover:bg-[#232836] border border-white/15 flex items-center justify-center text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveHeroInline} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Hero Main Headline (H1)
                </label>
                <input
                  type="text"
                  value={formHeadline}
                  onChange={(e) => setFormHeadline(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-none bg-[#08090C] border border-white/15 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Hero Subheadline / Lead Description
                </label>
                <textarea
                  rows={2}
                  value={formSubheadline}
                  onChange={(e) => setFormSubheadline(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-none bg-[#08090C] border border-white/15 text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setHeroModalOpen(false)}
                  className="px-4 py-2 rounded-none bg-[#181B24] hover:bg-[#232836] border border-white/15 text-white font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingHero}
                  className="keep-white-text inline-flex items-center gap-1.5 px-6 py-2.5 rounded-none bg-[#EC008C] hover:bg-[#d4007d] text-white font-semibold shadow-lg cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>
                    {isSavingHero ? 'Saving...' : 'Save & Publish Hero'}
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
