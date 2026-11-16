'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowDown,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  PhoneCall,
  Pencil,
  X,
  Check,
  Crosshair,
} from 'lucide-react';
import { useBetaDoors } from '@/components/providers/BetaDoorsProvider';

const HERO_MOTION_VIDEO_URL = '/assets/aistudio/logo_motion_ec8a3dd9.mp4';

export function Hero16By9Showcase() {
  const { brand, actor, mutateServer } = useBetaDoors();
  const { heroConfig } = brand;
  const isStaffEditor =
    actor.role === 'administrator' || actor.role === 'content_editor';

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

  const openHeroEditor = () => {
    setFormHeadline(heroConfig.headline);
    setFormSubheadline(heroConfig.subheadline);
    setFormPrimaryLabel(heroConfig.primaryCtaLabel);
    setFormPrimaryHref(heroConfig.primaryCtaHref);
    setFormSecondaryLabel(heroConfig.secondaryCtaLabel);
    setFormSecondaryHref(heroConfig.secondaryCtaHref);
    setFormVideoUrl(heroConfig.videoUrl);
    setHeroModalOpen(true);
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

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const timer = window.setTimeout(() => {
      if (mq.matches) {
        setIsPlaying(false);
        videoRef.current?.pause();
      }
    }, 0);
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsPlaying(false);
        videoRef.current?.pause();
      }
    };
    mq.addEventListener('change', onChange);
    return () => {
      window.clearTimeout(timer);
      mq.removeEventListener('change', onChange);
    };
  }, []);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (isPlaying) {
      vid.play().catch(() => {
        // Autoplay fallback if browser blocks unmuted play
      });
    } else {
      vid.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 4);
    }, 6800);
    return () => window.clearInterval(timer);
  }, [isPlaying]);

  const horizonSlides = [
    {
      label: '01/04 · Scroll down',
      seriesCode: 'ARIA 121 SERIES',
      coord: 'SYS.01 // 1200N',
      tag: 'Aria 121 Sectional Automation',
      href: '/sectional-and-tilt-door-opener-range',
      headline:
        heroConfig.headline || 'Innovative Garage Door Solutions for Every Home',
      subheadline:
        heroConfig.subheadline ||
        'Commercial & residential sectional, roller, and gate automation engineered for Australian bays.',
      primaryCtaLabel: heroConfig.primaryCtaLabel || 'Explore Online Shop',
      primaryCtaHref: heroConfig.primaryCtaHref?.replace(/\/$/, '') || '/shop',
      secondaryCtaLabel: heroConfig.secondaryCtaLabel || 'Enquire Now',
      secondaryCtaHref:
        heroConfig.secondaryCtaHref?.replace(/\/$/, '') || '/contact-us',
      specs: ['Soft-Start Belt Drive', 'Infrared Beams', 'VIC 3061 HQ'],
    },
    {
      label: '02/04 · Scroll down',
      seriesCode: 'WIFI MOTOR PACK',
      coord: 'SYS.02 // WIFI-CAM',
      tag: 'Panel Door Motor Pack (800N–1500N)',
      href: '/product/motor-pack',
      headline: 'Smart WiFi Panel Door Motor Packs',
      subheadline:
        'Complete sectional kit with built-in WiFi, photocell safety beams, 3 remotes, wall switch & optional camera.',
      primaryCtaLabel: 'Buy Motor Pack ($650–$730)',
      primaryCtaHref: '/product/motor-pack',
      secondaryCtaLabel: 'View Sectional Range',
      secondaryCtaHref: '/sectional-and-tilt-door-opener-range',
      specs: ['800N · 1200N · 1500N', 'Built-in WiFi', '7-Yr Warranty'],
    },
    {
      label: '03/04 · Scroll down',
      seriesCode: 'RDO 1000N–1800N',
      coord: 'SYS.03 // 1800N-RDO',
      tag: 'Heavy-Duty Roller Openers',
      href: '/roller-door-opener-range',
      headline: 'Whisper-Quiet 1000N–1800N Roller Openers',
      subheadline:
        'High-torque drum automation supplied with 2 × genuine P2011 hopping-code remotes and wireless wall button.',
      primaryCtaLabel: 'Buy Roller Opener ($590)',
      primaryCtaHref: '/product/roller-door-opener',
      secondaryCtaLabel: 'Inspect RDO Range',
      secondaryCtaHref: '/roller-door-opener-range',
      specs: ['1000N–1800N Torque', '2 × P2011 Remotes', '5-Yr Warranty'],
    },
    {
      label: '04/04 · Scroll down',
      seriesCode: 'BETA & LIFE GATES',
      coord: 'SYS.04 // B600-HP4',
      tag: 'Sliding & Swing Gate Automation',
      href: '/gate-opener-brands',
      headline: 'BETA & Italian LIFE Gate Automation',
      subheadline:
        'Heavy-duty sliding and swing gate drives (B600, B550, LIFE HP4, OP2, HP6) with photocell safety integration.',
      primaryCtaLabel: 'Explore Gate Range',
      primaryCtaHref: '/gate-opener-brands',
      secondaryCtaLabel: 'Spring Estimator',
      secondaryCtaHref: '/garage-door-spring-estimator',
      specs: ['600kg–1500kg Drives', 'Sliding & Swing', '1300 238 243'],
    },
  ];

  const currentSlide = horizonSlides[activeSlide] || horizonSlides[0];

  const selectSlide = (index: number) => {
    setActiveSlide(index);
  };

  const hardwareStripItems = [
    {
      idx: '01',
      code: 'ARIA 121',
      detail: '1200N Sectional Drive',
      href: '/sectional-and-tilt-door-opener-range',
    },
    {
      idx: '02',
      code: 'RDO 1800N',
      detail: 'Heavy Roller Opener',
      href: '/roller-door-opener-range',
    },
    {
      idx: '03',
      code: 'MOTOR PACK',
      detail: '$650–$730 AUD · WiFi',
      href: '/product/motor-pack',
    },
    {
      idx: '04',
      code: 'BETA B600',
      detail: 'Sliding Gate Automation',
      href: '/beta-gate-opener-range',
    },
    {
      idx: '05',
      code: 'LIFE GATE',
      detail: 'Italian Gate Systems',
      href: '/life-gate-opener-range',
    },
    {
      idx: '06',
      code: 'TRADE HARDWARE',
      detail: 'Steel Line & B&D Hinges',
      href: '/hardware',
    },
  ];

  return (
    <section
      data-cms-custom-header="true"
      aria-label="Homepage 1920 by 1080 16:9 hero stage"
      className="group/hero relative w-full max-w-[1760px] mx-auto px-3 sm:px-5 lg:px-7 pt-2 pb-6"
    >
      {/* Wide 16:9 Landscape Stage with Pure 0px Sharp HUD Geometry */}
      <div
        data-testid="hero-16x9-container"
        className="hud-corner-brackets relative w-full lg:aspect-video min-h-[480px] sm:min-h-[540px] rounded-none overflow-hidden brand-animated-border border border-white/[0.14] bg-[#040406] shadow-[0_24px_80px_rgba(0,0,0,0.88)] flex flex-col justify-between p-4 sm:p-6 lg:p-7 transition-colors"
      >
        {/* 1. Primary Full-Bleed 16:9 Motion Video (/assets/aistudio/logo_motion_ec8a3dd9.mp4 + .webm) */}
        <video
          ref={videoRef}
          poster="/assets/aistudio/logo_motion_poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-label="BETA DOORS 3D Logo & Mechanical Door Automation Showcase Video"
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source
            src="/assets/aistudio/logo_motion_ec8a3dd9.webm"
            type="video/webm"
          />
          <source src={videoSrc} type="video/mp4" />
        </video>

        {/* 2. Subtle Perimeter Vignette so center 3D mechanism remains bright while bottom HUD panels stay ultra-legible */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              'radial-gradient(circle at 50% 48%, transparent 56%, rgba(4, 4, 6, 0.36) 100%)',
          }}
        />

        {/* 3. Unobstructed Center Showcase Window — keeps the entire top & middle of the 16:9 stage open for the 3D Logo & Door Animation */}
        <div
          aria-hidden="true"
          className="flex-1 min-h-[240px] sm:min-h-[300px] pointer-events-none"
        />

        {/* 5. Bottom Precision HUD Split Dock (0px Sharp) with Fixed-Height Smooth Animated Slide Transitions */}
        <div className="relative z-20 flex flex-col lg:flex-row lg:items-end justify-between gap-4 pt-2">
          {/* Bottom-Left HUD Panel: Locked Height so Frame Never Jumps + Unified Smooth Slide Animation */}
          <div className="hud-corner-brackets crystal-glass-panel relative rounded-none p-4 sm:p-5 w-full lg:w-[460px] xl:w-[480px] h-[212px] sm:h-[216px] text-left overflow-hidden flex flex-col justify-between shrink-0">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col justify-between h-full"
              >
                {/* Top Row: Slide Counter + Series Code */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <a
                      href="#bento-insights-heading"
                      aria-label="Scroll down to engineering insights"
                      className="keep-white-text w-5 h-5 rounded-none bg-[#EC008C] text-white flex items-center justify-center hover:bg-[#d4007d] transition-colors shrink-0 shadow-[0_0_12px_rgba(236,0,140,0.55)]"
                    >
                      <ArrowDown className="w-3 h-3" />
                    </a>
                    <a
                      href="#bento-insights-heading"
                      className="keep-white-text text-[10px] font-mono uppercase tracking-wider text-slate-200 hover:text-white transition-colors whitespace-nowrap"
                    >
                      {currentSlide.label}
                    </a>
                  </div>

                  <span className="keep-white-text inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-[#ff7ac6] font-semibold">
                    <Crosshair className="w-2.5 h-2.5 text-[#EC008C]" />
                    {currentSlide.seriesCode}
                  </span>
                </div>

                {/* Middle Row: Locked-Height Headline & Subheadline so Card Never Resizes */}
                <div className="my-auto py-1 space-y-1.5">
                  <h1 className="keep-white-text text-base sm:text-lg xl:text-[20px] font-semibold tracking-tight leading-[1.25] min-h-[48px] sm:min-h-[50px] flex items-center line-clamp-2 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
                    {currentSlide.headline}
                  </h1>

                  <p className="keep-white-text text-xs text-slate-100/90 leading-relaxed min-h-[36px] line-clamp-2 drop-shadow-[0_1px_6px_rgba(0,0,0,0.65)]">
                    {currentSlide.subheadline}
                  </p>
                </div>

                {/* Bottom Row: Clean Inline HUD Telemetry Spec Bar */}
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 pt-2 border-t border-white/15 text-[10px] font-mono uppercase tracking-[0.06em] text-slate-100">
                  {currentSlide.specs.map((spec, idx) => (
                    <React.Fragment key={spec}>
                      {idx > 0 && (
                        <span
                          aria-hidden="true"
                          className="text-[#EC008C] font-bold select-none"
                        >
                          /
                        </span>
                      )}
                      <span className="keep-white-text inline-flex items-center gap-1.5 whitespace-nowrap">
                        <span className="w-1 h-1 bg-[#EC008C] shrink-0" />
                        <span>{spec}</span>
                      </span>
                    </React.Fragment>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Smooth Animated Auto-Advance Progress Line Along Bottom Edge */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 overflow-hidden">
              <motion.div
                key={`progress-${activeSlide}-${isPlaying}`}
                initial={{ width: '0%' }}
                animate={{ width: isPlaying ? '100%' : '35%' }}
                transition={{
                  duration: isPlaying ? 6.8 : 0.3,
                  ease: 'linear',
                }}
                className="h-full bg-[#EC008C] shadow-[0_0_10px_#EC008C]"
              />
            </div>
          </div>

          {/* Bottom-Right HUD Panel: Precision CTAs (0px Sharp) + Interactive BETA Series Switcher */}
          <div className="hud-corner-brackets crystal-glass-panel rounded-none p-4 sm:p-5 flex flex-col sm:items-end justify-between gap-3 w-full lg:w-[410px] xl:w-[430px] min-h-[132px] shrink-0">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`cta-${activeSlide}`}
                initial={{ opacity: 0, y: 6, filter: 'blur(3px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -6, filter: 'blur(3px)' }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap items-center sm:justify-end gap-2 w-full"
              >
                <a
                  href={currentSlide.primaryCtaHref}
                  className="keep-white-text inline-flex items-center gap-1.5 px-3.5 py-2 rounded-none crystal-glass-pill text-xs font-mono font-semibold text-white transition-all whitespace-nowrap"
                >
                  <span>{currentSlide.primaryCtaLabel}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#EC008C]" />
                </a>

                <a
                  href={currentSlide.secondaryCtaHref}
                  className="keep-white-text inline-flex items-center justify-center px-4 py-2 rounded-none bg-gradient-to-r from-[#EC008C] to-[#c40074] hover:brightness-110 text-xs font-mono font-bold text-white shadow-[0_0_20px_rgba(236,0,140,0.45)] transition-all whitespace-nowrap"
                >
                  {currentSlide.secondaryCtaLabel}
                </a>
              </motion.div>
            </AnimatePresence>

            {/* Interactive BETA Series Switcher (No HORIZON text) */}
            <div className="space-y-2 text-left sm:text-right w-full pt-2.5 border-t border-white/15">
              <div className="flex items-center justify-between gap-3">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.a
                    key={`tag-${activeSlide}`}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 6 }}
                    transition={{ duration: 0.25 }}
                    href={currentSlide.href}
                    className="keep-white-text text-[11px] font-mono font-semibold text-white hover:text-[#ff7ac6] transition-colors inline-flex items-center gap-1.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)] truncate"
                  >
                    <span className="text-[#EC008C] shrink-0">■</span>
                    <span className="keep-white-text text-white truncate">
                      {currentSlide.tag}
                    </span>
                    <ArrowUpRight className="w-3 h-3 text-[#EC008C] shrink-0" />
                  </motion.a>
                </AnimatePresence>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => selectSlide((activeSlide + 3) % 4)}
                    aria-label="Previous slide"
                    className="keep-white-text crystal-glass-pill w-6 h-6 rounded-none flex items-center justify-center text-white cursor-pointer transition-colors"
                  >
                    <ChevronLeft className="w-3 h-3 text-white keep-white-text" />
                  </button>
                  <button
                    type="button"
                    onClick={() => selectSlide((activeSlide + 1) % 4)}
                    aria-label="Next slide"
                    className="keep-white-text crystal-glass-pill w-6 h-6 rounded-none flex items-center justify-center text-white cursor-pointer transition-colors"
                  >
                    <ChevronRight className="w-3 h-3 text-white keep-white-text" />
                  </button>
                </div>
              </div>

              <div className="flex items-center sm:justify-end gap-1.5">
                {horizonSlides.map((slide, idx) => (
                  <button
                    key={slide.tag}
                    type="button"
                    onClick={() => selectSlide(idx)}
                    aria-label={`Select slide ${idx + 1}: ${slide.tag}`}
                    title={slide.tag}
                    className="py-0.5 cursor-pointer group"
                  >
                    <span
                      className={`block h-1.5 rounded-none transition-all duration-300 ${
                        activeSlide === idx
                          ? 'w-9 bg-[#EC008C] shadow-[0_0_12px_rgba(236,0,140,0.85)]'
                          : 'w-4 bg-white/30 group-hover:bg-white/70'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 8. Architectural HUD Hardware Specification Dock Below Hero Stage (0px Sharp) */}
      <div className="mt-3.5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5">
        {hardwareStripItems.map((item) => (
          <a
            key={item.code}
            href={item.href}
            className="group hud-corner-brackets rounded-none bg-[#0B0C10] hover:bg-[#12151E] border border-white/[0.09] hover:border-[#EC008C]/50 px-3.5 py-2.5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between gap-1">
              <span className="text-[11px] font-mono font-semibold tracking-wider text-white group-hover:text-[#EC008C] transition-colors">
                <span className="text-slate-500 mr-1">[{item.idx}]</span>
                {item.code}
              </span>
              <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-[#EC008C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <span className="text-[11px] text-slate-400 truncate mt-1">
              {item.detail}
            </span>
          </a>
        ))}

        <a
          href="tel:1300238243"
          className="col-span-2 sm:col-span-3 lg:col-span-1 hud-corner-brackets rounded-none bg-gradient-to-br from-[#EC008C]/20 via-[#EC008C]/10 to-[#0B0C10] hover:from-[#EC008C]/30 border border-[#EC008C]/45 px-3.5 py-2.5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between gap-1">
            <span className="text-[11px] font-mono font-semibold text-white flex items-center gap-1.5">
              <PhoneCall className="w-3 h-3 text-[#EC008C] animate-pulse" />
              <span>1300 238 243</span>
            </span>
          </div>
          <span className="text-[11px] text-slate-300 truncate mt-1">
            Direct Sales &amp; Tech Desk
          </span>
        </a>
      </div>

      {/* Inline Admin Homepage Hero Header Editor Modal */}
      {heroModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Edit Homepage 16:9 Hero Header"
          className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="hud-corner-brackets w-full max-w-2xl rounded-none bg-[#0F1117] border border-white/15 p-6 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <div className="text-[11px] font-mono text-[#EC008C] uppercase tracking-wider">
                  INLINE ADMIN HERO EDITOR · HOMEPAGE (/)
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Edit Homepage 16:9 Hero Texts, CTAs &amp; Video
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Primary CTA Button Label
                  </label>
                  <input
                    type="text"
                    value={formPrimaryLabel}
                    onChange={(e) => setFormPrimaryLabel(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-none bg-[#08090C] border border-white/15 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Primary CTA Link URL
                  </label>
                  <input
                    type="text"
                    value={formPrimaryHref}
                    onChange={(e) => setFormPrimaryHref(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-none bg-[#08090C] border border-white/15 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Secondary CTA Button Label
                  </label>
                  <input
                    type="text"
                    value={formSecondaryLabel}
                    onChange={(e) => setFormSecondaryLabel(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-none bg-[#08090C] border border-white/15 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Secondary CTA Link URL
                  </label>
                  <input
                    type="text"
                    value={formSecondaryHref}
                    onChange={(e) => setFormSecondaryHref(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-none bg-[#08090C] border border-white/15 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  16:9 Motion Video URL (MP4)
                </label>
                <input
                  type="text"
                  value={formVideoUrl}
                  onChange={(e) => setFormVideoUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-none bg-[#08090C] border border-white/15 text-white font-mono"
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
