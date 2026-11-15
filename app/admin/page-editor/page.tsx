'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Check,
  ExternalLink,
  FileEdit,
  Image as ImageIcon,
  Layers,
  Link2,
  Plus,
  Sparkles,
  Trash2,
  Type,
  Eye,
} from 'lucide-react';
import { SiteShell } from '@/components/layout/SiteShell';
import { useBetaDoors } from '@/components/providers/BetaDoorsProvider';
import { canPerformAdminAction } from '@/lib/domain-logic';
import type { CategoryCardItem, PageSectionBlock } from '@/lib/types';

const STUDIO_IMAGE_PRESETS = [
  { label: 'Garage Door Range (16:9)', url: '/assets/studio/cat_01_garage_doors_16x9.png' },
  { label: 'Aria 121 Opener (16:9)', url: '/assets/studio/cat_02_aria_121_opener_16x9.png' },
  { label: 'Roller Door Opener (16:9)', url: '/assets/studio/cat_03_roller_door_opener_16x9.png' },
  { label: 'BETA & LIFE Gate Opener (16:9)', url: '/assets/studio/cat_04_gate_opener_16x9.png' },
  { label: 'Smart Accessories & Keypad (16:9)', url: '/assets/studio/cat_05_smart_accessories_16x9.png' },
  { label: 'Hardware, Springs & Hinges (16:9)', url: '/assets/studio/cat_06_hardware_springs_16x9.png' },
  { label: 'Panel Motor Pack Kit (16:9)', url: '/assets/studio/prod_01_motor_pack_16x9.png' },
  { label: 'Receiver & 3x Remote Pack (16:9)', url: '/assets/studio/prod_03_remote_pack_16x9.png' },
  { label: 'External 2-Ch Receiver (16:9)', url: '/assets/studio/prod_04_external_receiver_16x9.png' },
  { label: 'Single P2011 Remote (16:9)', url: '/assets/studio/prod_05_single_remote_16x9.png' },
];

export default function DedicatedAdminPageEditor() {
  const { brand, pages, products, actor, mutateServer } = useBetaDoors();
  const canAccess = canPerformAdminAction(actor.role, 'view_dashboard');

  const [selectedPageId, setSelectedPageId] = useState<string>('home');
  const selectedPage =
    pages.find((p) => p.id === selectedPageId) || pages[0];

  const getInitialFields = (p: typeof selectedPage) => {
    const cleanSlug = p?.slug.replace(/\/$/, '') || '/';
    const savedHdr =
      brand.pageHeaders?.[cleanSlug] || brand.pageHeaders?.[p?.slug || ''];
    const isHome = cleanSlug === '/' || p?.id === 'home';

    return {
      badge: isHome
        ? 'ARIA 121 SERIES'
        : savedHdr?.badgeText ?? p?.headerBadge ?? p?.serviceType ?? 'BETA DOORS AUSTRALIA',
      title: isHome
        ? brand.heroConfig.headline
        : p?.draftTitle ?? savedHdr?.headlinePrimary ?? p?.title ?? '',
      gradient: isHome
        ? ''
        : savedHdr?.headlineGradient ?? p?.headlineGradient ?? '',
      lead: isHome
        ? brand.heroConfig.subheadline
        : p?.draftLeadDescription ?? savedHdr?.subheadline ?? p?.leadDescription ?? '',
      primaryCtaLabel: isHome
        ? brand.heroConfig.primaryCtaLabel
        : savedHdr?.primaryCtaLabel ?? p?.headerPrimaryCtaLabel ?? 'Request a Technical Quote',
      primaryCtaHref: isHome
        ? brand.heroConfig.primaryCtaHref
        : savedHdr?.primaryCtaHref ?? p?.headerPrimaryCtaHref ?? '#page-enquiry-desk',
      secondaryCtaLabel: isHome
        ? brand.heroConfig.secondaryCtaLabel
        : savedHdr?.secondaryCtaLabel ?? p?.headerSecondaryCtaLabel ?? 'Explore Online Shop',
      secondaryCtaHref: isHome
        ? brand.heroConfig.secondaryCtaHref
        : savedHdr?.secondaryCtaHref ?? p?.headerSecondaryCtaHref ?? '/shop',
      videoUrl: brand.heroConfig.videoUrl || '/assets/aistudio/logo_motion_ec8a3dd9.mp4',
      seoTitle: p?.seoTitle ?? '',
      seoDescription: p?.seoDescription ?? '',
      highlights: [...(p?.highlights || [])],
      sections: structuredClone(p?.draftSections ?? p?.sections ?? []),
    };
  };

  const initial = getInitialFields(selectedPage);
  const [badge, setBadge] = useState(initial.badge);
  const [title, setTitle] = useState(initial.title);
  const [gradient, setGradient] = useState(initial.gradient);
  const [lead, setLead] = useState(initial.lead);
  const [primaryCtaLabel, setPrimaryCtaLabel] = useState(initial.primaryCtaLabel);
  const [primaryCtaHref, setPrimaryCtaHref] = useState(initial.primaryCtaHref);
  const [secondaryCtaLabel, setSecondaryCtaLabel] = useState(initial.secondaryCtaLabel);
  const [secondaryCtaHref, setSecondaryCtaHref] = useState(initial.secondaryCtaHref);
  const [videoUrl, setVideoUrl] = useState(initial.videoUrl);
  const [seoTitle, setSeoTitle] = useState(initial.seoTitle);
  const [seoDescription, setSeoDescription] = useState(initial.seoDescription);
  const [highlights, setHighlights] = useState<string[]>(initial.highlights);
  const [sections, setSections] = useState<PageSectionBlock[]>(initial.sections);

  const [categoryCards, setCategoryCards] = useState<CategoryCardItem[]>(
    brand.categoryCards ? structuredClone(brand.categoryCards) : []
  );

  const [activeSubTab, setActiveSubTab] = useState<
    'header' | 'sections' | 'cards_images' | 'live_preview'
  >('header');
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleSelectPage = (pageId: string) => {
    setSelectedPageId(pageId);
    setStatusMessage(null);
    const p = pages.find((x) => x.id === pageId);
    if (p) {
      const f = getInitialFields(p);
      setBadge(f.badge);
      setTitle(f.title);
      setGradient(f.gradient);
      setLead(f.lead);
      setPrimaryCtaLabel(f.primaryCtaLabel);
      setPrimaryCtaHref(f.primaryCtaHref);
      setSecondaryCtaLabel(f.secondaryCtaLabel);
      setSecondaryCtaHref(f.secondaryCtaHref);
      setVideoUrl(f.videoUrl);
      setSeoTitle(f.seoTitle);
      setSeoDescription(f.seoDescription);
      setHighlights(f.highlights);
      setSections(f.sections);
    }
  };

  const handleSaveAllForPage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPage) return;
    setIsSaving(true);
    setStatusMessage(null);

    const cleanSlug = selectedPage.slug.replace(/\/$/, '') || '/';
    if (cleanSlug === '/' || selectedPage.id === 'home') {
      await mutateServer('update_brand_hero', {
        heroHeadline: title,
        heroSubheadline: lead,
        primaryCtaLabel,
        primaryCtaHref,
        secondaryCtaLabel,
        secondaryCtaHref,
        heroVideoUrl: videoUrl,
        heroWidth: 1920,
        heroHeight: 1080,
      });
    }

    await mutateServer('update_site_copy_overrides', {
      pagePath: cleanSlug,
      pageHeader: {
        badgeText: badge,
        headlinePrimary: title,
        headlineGradient: gradient,
        subheadline: lead,
        primaryCtaLabel,
        primaryCtaHref,
        secondaryCtaLabel,
        secondaryCtaHref,
      },
      categoryCards: categoryCards.length === 6 ? categoryCards : undefined,
    });

    await mutateServer('save_page_draft', {
      pageId: selectedPage.id,
      draftTitle: title,
      draftLeadDescription: lead,
      draftSections: sections,
      headerBadge: badge,
      headlineGradient: gradient,
      headerPrimaryCtaLabel: primaryCtaLabel,
      headerPrimaryCtaHref: primaryCtaHref,
      headerSecondaryCtaLabel: secondaryCtaLabel,
      headerSecondaryCtaHref: secondaryCtaHref,
      seoTitle,
      seoDescription,
      highlights,
    });

    await mutateServer('publish_page', {
      pageId: selectedPage.id,
    });

    setIsSaving(false);
    setStatusMessage(
      `Published all changes for ${selectedPage.slug} (Header, Texts, Buttons, Sections & Images) live!`
    );
  };

  const cleanLivePath =
    selectedPage?.slug === '/'
      ? '/'
      : selectedPage?.slug.replace(/\/$/, '') || '/';

  return (
    <SiteShell>
      <div className="w-full max-w-[1760px] mx-auto px-3 sm:px-5 lg:px-7 py-8 space-y-6">
        {/* Top Command Header */}
        <div className="hud-corner-brackets brand-animated-border bg-[#0B0C10] border border-white/15 p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#EC008C]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ADMIN STUDIO // DEDICATED PAGE &amp; VISUAL CONTENT EDITOR</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Dedicated Page Header, Section, Image &amp; Button Studio
            </h1>
            <p className="text-xs text-slate-400">
              All page editing controls live cleanly in this dedicated Admin workspace so public pages remain clutter-free.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#08090C] hover:bg-white/[0.08] border border-white/15 text-xs font-mono font-semibold text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#EC008C]" />
              <span>BACK TO ADMIN HOME</span>
            </Link>

            <a
              href={`${cleanLivePath}?visualEdit=1`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#08090C] hover:bg-white/[0.08] border border-[#EC008C]/50 text-xs font-mono font-semibold text-white transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-[#EC008C]" />
              <span>OPEN INTERACTIVE HOVER PREVIEW</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>

        {!canAccess ? (
          <div className="p-8 bg-rose-950/40 border border-rose-500/40 text-center text-xs text-rose-200">
            Staff role required. Switch your active role in the footer or Admin dashboard.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Page Selector (All 44 Pages) */}
            <aside className="lg:col-span-3 hud-corner-brackets bg-[#0B0C10] border border-white/15 p-4 space-y-3 max-h-[82vh] overflow-y-auto">
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#EC008C] font-bold border-b border-white/10 pb-2">
                SELECT PAGE TO EDIT ({pages.length} ROUTES)
              </div>
              <div className="space-y-1">
                {pages.map((p) => {
                  const isSelected = p.id === selectedPage?.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleSelectPage(p.id)}
                      className={`w-full text-left px-3 py-2 text-xs transition-colors cursor-pointer flex items-center justify-between gap-2 ${
                        isSelected
                          ? 'bg-[#EC008C] text-white font-semibold keep-white-text'
                          : 'bg-[#08090C] hover:bg-white/[0.06] text-slate-300 border border-white/[0.06]'
                      }`}
                    >
                      <span className="truncate">{p.title}</span>
                      <code className="text-[10px] font-mono opacity-80 shrink-0">
                        {p.slug}
                      </code>
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Right Column: Multi-Tab Page Editor & Live Iframe Preview */}
            <div className="lg:col-span-9 hud-corner-brackets bg-[#0B0C10] border border-white/15 p-5 sm:p-7 space-y-6">
              {/* Selected Page Bar + Sub-Tabs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="text-[11px] font-mono text-[#EC008C] uppercase">
                    ACTIVE ROUTE · {selectedPage?.slug}
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">
                    {selectedPage?.title}
                  </h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 p-1 bg-[#08090C] border border-white/15 text-[11px] font-mono">
                  {[
                    { id: 'header' as const, label: '01 · HEADER & CTAs', icon: Type },
                    { id: 'sections' as const, label: '02 · SECTIONS', icon: Layers },
                    { id: 'cards_images' as const, label: '03 · IMAGES & CARDS', icon: ImageIcon },
                    { id: 'live_preview' as const, label: '04 · LIVE VIEW', icon: Eye },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveSubTab(tab.id)}
                        className={`px-3 py-2 flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                          activeSubTab === tab.id
                            ? 'bg-[#EC008C] text-white font-bold keep-white-text'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {statusMessage && (
                <div className="p-3.5 bg-emerald-950/80 border border-emerald-500/40 text-xs text-emerald-200 font-medium flex items-center justify-between">
                  <span>{statusMessage}</span>
                  <button
                    type="button"
                    onClick={() => setStatusMessage(null)}
                    className="underline text-[11px]"
                  >
                    Dismiss
                  </button>
                </div>
              )}

              <form onSubmit={handleSaveAllForPage} className="space-y-6 text-xs">
                {/* SUB-TAB 1: PAGE HEADER, H1, SUBTITLE, BUTTONS & VIDEO */}
                {activeSubTab === 'header' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-300 font-medium mb-1">
                          Top HUD Badge Text
                        </label>
                        <input
                          type="text"
                          value={badge}
                          onChange={(e) => setBadge(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-[#08090C] border border-white/15 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 font-medium mb-1">
                          Headline Accent Words (Magenta Highlight)
                        </label>
                        <input
                          type="text"
                          value={gradient}
                          onChange={(e) => setGradient(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-[#08090C] border border-white/15 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-medium mb-1">
                        Main Page Headline (H1)
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#08090C] border border-white/15 text-white font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-medium mb-1">
                        Page Header Subtitle / Lead Description
                      </label>
                      <textarea
                        rows={3}
                        value={lead}
                        onChange={(e) => setLead(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#08090C] border border-white/15 text-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-300 font-medium mb-1">
                          Primary CTA Button Label
                        </label>
                        <input
                          type="text"
                          value={primaryCtaLabel}
                          onChange={(e) => setPrimaryCtaLabel(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-[#08090C] border border-white/15 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 font-medium mb-1">
                          Primary CTA Link URL
                        </label>
                        <input
                          type="text"
                          value={primaryCtaHref}
                          onChange={(e) => setPrimaryCtaHref(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-[#08090C] border border-white/15 text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 font-medium mb-1">
                          Secondary CTA Button Label
                        </label>
                        <input
                          type="text"
                          value={secondaryCtaLabel}
                          onChange={(e) => setSecondaryCtaLabel(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-[#08090C] border border-white/15 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 font-medium mb-1">
                          Secondary CTA Link URL
                        </label>
                        <input
                          type="text"
                          value={secondaryCtaHref}
                          onChange={(e) => setSecondaryCtaHref(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-[#08090C] border border-white/15 text-white font-mono"
                        />
                      </div>
                    </div>

                    {(selectedPage?.id === 'home' || selectedPage?.slug === '/') && (
                      <div>
                        <label className="block text-slate-300 font-medium mb-1">
                          Homepage 16:9 Motion Video URL (MP4)
                        </label>
                        <input
                          type="text"
                          value={videoUrl}
                          onChange={(e) => setVideoUrl(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-[#08090C] border border-white/15 text-white font-mono"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* SUB-TAB 2: PAGE SECTIONS & CARDS */}
                {activeSubTab === 'sections' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300 font-semibold">
                        Editable Section Blocks ({sections.length})
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setSections([
                            ...sections,
                            {
                              id: `sec_${Date.now()}`,
                              type: 'defi_bento_insights',
                              title: 'New Custom HUD Section',
                              subtitle: 'Custom engineering specification block.',
                              order: sections.length + 1,
                              enabled: true,
                              motionPreset: 'kinetic_bento',
                              items: [
                                {
                                  id: `item_${Date.now()}`,
                                  title: 'Specification Node',
                                  description: 'Custom technical detail.',
                                  metric: '100%',
                                  tag: 'BETA SPEC',
                                },
                              ],
                            },
                          ])
                        }
                        className="keep-white-text inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#EC008C] text-white font-mono text-[11px] font-bold cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>ADD SECTION</span>
                      </button>
                    </div>

                    {sections.map((sec, idx) => (
                      <div
                        key={sec.id}
                        className="p-4 bg-[#08090C] border border-white/15 space-y-3"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-mono text-[#EC008C] font-bold">
                            SECTION 0{idx + 1} · {sec.type.toUpperCase()}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setSections(sections.filter((_, i) => i !== idx))
                            }
                            className="text-rose-400 hover:text-rose-300 inline-flex items-center gap-1 text-[11px] cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-slate-400 mb-1">
                              Section Heading
                            </label>
                            <input
                              type="text"
                              value={sec.title}
                              onChange={(e) => {
                                const next = [...sections];
                                next[idx] = { ...sec, title: e.target.value };
                                setSections(next);
                              }}
                              className="w-full px-3 py-2 bg-[#0B0C10] border border-white/15 text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-400 mb-1">
                              Section Subtitle
                            </label>
                            <input
                              type="text"
                              value={sec.subtitle}
                              onChange={(e) => {
                                const next = [...sections];
                                next[idx] = { ...sec, subtitle: e.target.value };
                                setSections(next);
                              }}
                              className="w-full px-3 py-2 bg-[#0B0C10] border border-white/15 text-white"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* SUB-TAB 3: 06 PRODUCT CATEGORY CARDS & 16:9 STUDIO IMAGES */}
                {activeSubTab === 'cards_images' && (
                  <div className="space-y-4">
                    <div className="text-slate-300 font-semibold">
                      06 Product Family Cards — Titles, Badges, Links &amp; 16:9 Studio Images
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {categoryCards.map((card, idx) => (
                        <div
                          key={card.id}
                          className="p-4 bg-[#08090C] border border-white/15 space-y-2.5"
                        >
                          <div className="text-[11px] font-mono text-[#EC008C] font-bold">
                            CARD [{card.index}] · {card.title}
                          </div>
                          <input
                            type="text"
                            value={card.title}
                            onChange={(e) => {
                              const next = [...categoryCards];
                              next[idx] = { ...card, title: e.target.value };
                              setCategoryCards(next);
                            }}
                            placeholder="Card Title"
                            className="w-full px-3 py-2 bg-[#0B0C10] border border-white/15 text-white"
                          />
                          <input
                            type="text"
                            value={card.subtitle}
                            onChange={(e) => {
                              const next = [...categoryCards];
                              next[idx] = { ...card, subtitle: e.target.value };
                              setCategoryCards(next);
                            }}
                            placeholder="Card Subtitle"
                            className="w-full px-3 py-2 bg-[#0B0C10] border border-white/15 text-white"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={card.href}
                              onChange={(e) => {
                                const next = [...categoryCards];
                                next[idx] = { ...card, href: e.target.value };
                                setCategoryCards(next);
                              }}
                              placeholder="Target Link URL"
                              className="w-full px-3 py-2 bg-[#0B0C10] border border-white/15 text-white font-mono"
                            />
                            <select
                              value={card.customImageUrl || ''}
                              onChange={(e) => {
                                const next = [...categoryCards];
                                next[idx] = {
                                  ...card,
                                  customImageUrl: e.target.value || undefined,
                                };
                                setCategoryCards(next);
                              }}
                              className="w-full px-3 py-2 bg-[#0B0C10] border border-white/15 text-white"
                            >
                              <option value="">Default 16:9 Studio Render</option>
                              {STUDIO_IMAGE_PRESETS.map((preset) => (
                                <option key={preset.url} value={preset.url}>
                                  {preset.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SUB-TAB 4: EMBEDDED INTERACTIVE LIVE PREVIEW */}
                {activeSubTab === 'live_preview' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span>
                        Interactive Visual Editor Preview for{' '}
                        <code className="font-mono text-[#EC008C]">
                          {cleanLivePath}
                        </code>
                      </span>
                      <a
                        href={`${cleanLivePath}?visualEdit=1`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#EC008C] hover:underline font-mono inline-flex items-center gap-1"
                      >
                        <span>Open Fullscreen Visual Editor</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <div className="w-full h-[640px] border border-white/20 bg-[#040406] overflow-hidden">
                      <iframe
                        title={`Visual preview for ${cleanLivePath}`}
                        src={`${cleanLivePath}?visualEdit=1`}
                        className="w-full h-full border-0"
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="keep-white-text inline-flex items-center gap-2 px-6 py-2.5 bg-[#EC008C] hover:bg-[#d4007d] text-white font-mono font-bold text-xs shadow-[0_0_24px_rgba(236,0,140,0.4)] cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>
                      {isSaving
                        ? 'SAVING & PUBLISHING...'
                        : `SAVE & PUBLISH ${selectedPage?.slug.toUpperCase()}`}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </SiteShell>
  );
}
