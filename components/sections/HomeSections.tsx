'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  Calculator,
  Wrench,
  FileText,
  Phone,
  X,
  Search,
  Layers,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useBetaDoors } from '@/components/providers/BetaDoorsProvider';
import { formatAudCents } from '@/lib/domain-logic';
import { ProductTechnicalArtwork } from '@/components/brand/ProductTechnicalArtwork';
import { BetaReferenceProductCard } from '@/components/shop/BetaReferenceProductCard';
import {
  BETA_OFFICIAL_CATEGORIES,
  BETA_ALL_OFFICIAL_PRODUCTS,
  type BetaOfficialMainCategory,
  type BetaOfficialProductItem,
} from '@/lib/beta-official-catalog';
import type { ShopProduct } from '@/lib/types';

/**
 * Clean Apple-style Section Divider
 */
export function HudSectionRail({
  sector,
  status,
}: {
  code?: string;
  sector: string;
  status?: string;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-black/[0.06] dark:border-white/[0.08] pb-3 text-xs sm:text-sm text-[#86868B]">
      <span className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
        {sector.split('//')[0].trim()}
      </span>
      {status && (
        <span className="text-[#EC008C] font-semibold">
          {status.split('//')[0].trim()}
        </span>
      )}
    </div>
  );
}

/**
 * 1. Apple.com 2x2 Visual Promo Grid + Minimal Weight Selector Bar
 * Uses Authentic beta.ir Category & Product Photos from /assets/beta-official/
 */
const APPLE_PROMO_TILES = [
  {
    id: 'promo_gate',
    eyebrow: 'اتوماسیون پارکینگ (۳۴ محصول)',
    title: 'درب بازکن بازویی، ریلی و زیرسقفی.',
    subtitle:
      'انواع جک پارکینگی بتا لاین، MPC TITAN-400/600، F600، موتور ریلی F-550M و زیرسقفی سکشنال.',
    primaryLabel: 'مشاهده ۳۴ محصول',
    primaryHref: '/products?cat=gate-openers',
    secondaryLabel: 'خرید پکیج',
    secondaryHref: '/product/motor-pack',
    artwork: 'gate_opener' as const,
    imageUrl:
      BETA_OFFICIAL_CATEGORIES.find((c) => c.id === 'gate-openers')?.image ||
      '/assets/products/apple_studio/beta_swing_gate_arms.jpg',
  },
  {
    id: 'promo_simote',
    eyebrow: 'مدار کنترل و رسیور (۸۸ محصول)',
    title: 'مدار فرمان هوشمند و رسیور سیموت.',
    subtitle:
      'مراکز کنترل درب بازکن، کرکره برقی، اپراتور شیشه برقی، برد راهبند و رسیور سیم‌کارتی سیموت.',
    primaryLabel: 'مشاهده ۸۸ محصول',
    primaryHref: '/products?cat=control-boards',
    secondaryLabel: 'خرید سیموت',
    secondaryHref: '/product/receiver',
    artwork: 'aria_121' as const,
    imageUrl:
      BETA_OFFICIAL_CATEGORIES.find((c) => c.id === 'control-boards')?.image ||
      '/assets/products/apple_studio/beta_control_simote_gsm.jpg',
  },
  {
    id: 'promo_uhf',
    eyebrow: 'کنترل تردد هوشمند (۷۷ محصول)',
    title: 'حضور و غیاب، اکسس کنترل و UHF.',
    subtitle:
      'دستگاه حضور و غیاب تشخیص چهره و اثرانگشت، آنتن برد بلند UHF، دستگیره دیجیتال و تگ RFID.',
    primaryLabel: 'مشاهده ۷۷ محصول',
    primaryHref: '/products?cat=attendance-uhf-rfid',
    secondaryLabel: 'مشاوره فنی',
    secondaryHref: '/contact-us',
    artwork: 'keypad' as const,
    imageUrl:
      BETA_OFFICIAL_CATEGORIES.find((c) => c.id === 'attendance-uhf-rfid')
        ?.image ||
      '/assets/products/apple_studio/beta_attendance_uhf_access.jpg',
  },
  {
    id: 'promo_alarm',
    eyebrow: 'امنیت و حفاظت اماکن (۲۶ محصول)',
    title: 'دزدگیر اماکن و تلفن‌کننده سیم‌کارتی.',
    subtitle:
      'دزدگیرهای سیم‌کارتی Z7-GSM Plus، B1 Ultimate Plus، Z4، چشمی‌های حرکتی و آژیرهای حفاظتی بتا.',
    primaryLabel: 'مشاهده ۲۶ محصول',
    primaryHref: '/products?cat=security-systems',
    secondaryLabel: 'خرید دزدگیر',
    secondaryHref: '/product/remote-pack',
    artwork: 'remote_pack' as const,
    imageUrl:
      BETA_OFFICIAL_CATEGORIES.find((c) => c.id === 'security-systems')
        ?.image || '/assets/products/apple_studio/beta_z7_gsm_alarm_pack.jpg',
  },
];

const QUICK_FORCE_TIERS = [
  {
    force: '۴۰۰ کیلوگرم',
    model: 'جک بازویی MPC TITAN-400 / BETA-400',
    desc: 'مناسب درب‌های مسکونی تا عرض ۳ متر',
    price: '۱۳,۰۰۰,۰۰۰ تومان',
    href: '/products?cat=gate-openers',
  },
  {
    force: '۶۰۰ کیلوگرم',
    model: 'جک بازویی F600 / MPC TITAN-600',
    desc: 'مناسب مجتمع‌های پرتردد تا عرض ۳.۵ متر',
    price: '۱۳,۸۰۰,۰۰۰ تومان',
    href: '/products?cat=gate-openers',
  },
  {
    force: '۱۰۰۰ کیلوگرم',
    model: 'موتور کرکره ساید با UPS هوشمند',
    desc: 'مجهز به برق اضطراری هوشمند هنگام قطع برق',
    price: '۱۱,۸۰۰,۰۰۰ تومان',
    href: '/products?cat=shutter-motors',
  },
  {
    force: '۱۵۰۰ کیلوگرم',
    model: 'موتور درب ریلی F-550M / F-500',
    desc: 'مناسب درب‌های کشویی سنگین و صنعتی',
    price: '۱۴,۶۰۰,۰۰۰ تومان',
    href: '/products?cat=gate-openers',
  },
];

export function DefiBentoInsightsSection() {
  const [selectedForceIdx, setSelectedForceIdx] = useState<number>(1);
  const currentForce =
    QUICK_FORCE_TIERS[selectedForceIdx] || QUICK_FORCE_TIERS[1];

  return (
    <section
      aria-label="محصولات برگزیده شرکت بتا"
      className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8"
    >
      {/* Apple.com 2x2 Visual Promo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {APPLE_PROMO_TILES.map((tile, idx) => (
          <motion.article
            key={tile.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
              duration: 0.65,
              delay: (idx % 2) * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="apple-card group rounded-[32px] bg-white dark:bg-[#161617] border border-black/[0.05] dark:border-white/[0.08] p-7 sm:p-10 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.03)] overflow-hidden"
          >
            {/* Top Centered Apple Copy */}
            <div className="text-center max-w-md mx-auto space-y-2.5 mb-7">
              <div className="text-xs font-bold tracking-wide text-[#EC008C]">
                {tile.eyebrow}
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
                {tile.title}
              </h2>
              <p className="text-sm sm:text-base text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                {tile.subtitle}
              </p>

              <div className="flex items-center justify-center gap-4 pt-2">
                <Link
                  href={tile.primaryHref}
                  className="apple-pill-btn keep-white-text px-5 py-2 rounded-full bg-[#EC008C] hover:bg-[#d4007d] text-white text-sm font-bold"
                >
                  {tile.primaryLabel}
                </Link>
                <Link
                  href={tile.secondaryHref}
                  className="inline-flex items-center gap-1 text-sm font-bold text-[#1D1D1F] dark:text-[#F5F5F7] hover:text-[#EC008C] dark:hover:text-[#EC008C] transition-colors"
                >
                  <span>{tile.secondaryLabel}</span>
                  <ChevronLeft className="w-4 h-4 text-[#EC008C]" />
                </Link>
              </div>
            </div>

            {/* Bottom Authentic beta.ir Studio Image */}
            <Link
              href={tile.primaryHref}
              className="block aspect-video w-full rounded-2xl overflow-hidden bg-[#ECECEE] border border-black/[0.04]"
            >
              <ProductTechnicalArtwork
                type={tile.artwork}
                customImageUrl={tile.imageUrl}
                title={tile.title}
                className="w-full h-full"
              />
            </Link>
          </motion.article>
        ))}
      </div>

      {/* Minimal Single-Row Apple Motor Capacity Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-[28px] bg-white dark:bg-[#161617] border border-black/[0.05] dark:border-white/[0.08] p-5 sm:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col lg:flex-row items-center justify-between gap-4"
      >
        <div className="space-y-0.5 text-center lg:text-right shrink-0">
          <div className="text-xs font-bold text-[#EC008C]">
            انتخاب سریع موتور
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#1D1D1F] dark:text-[#F5F5F7] whitespace-nowrap">
            وزن تقریبی درب:
          </h3>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 shrink-0">
          {QUICK_FORCE_TIERS.map((t, idx) => (
            <button
              key={t.force}
              type="button"
              onClick={() => setSelectedForceIdx(idx)}
              className={`apple-pill-btn whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-bold cursor-pointer ${
                selectedForceIdx === idx
                  ? 'keep-white-text bg-[#EC008C] text-white shadow-sm'
                  : 'bg-[#F5F5F7] dark:bg-[#1D1D1F] text-[#515154] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-white'
              }`}
            >
              {t.force}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4 bg-[#F5F5F7] dark:bg-[#1D1D1F] px-5 py-3 rounded-2xl shrink-0">
          <div className="text-right">
            <div className="text-sm font-bold text-[#1D1D1F] dark:text-white whitespace-nowrap">
              {currentForce.model} ·{' '}
              <span className="text-[#EC008C] tabular-nums">
                {currentForce.price}
              </span>
            </div>
            <div className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] whitespace-nowrap">
              {currentForce.desc}
            </div>
          </div>
          <Link
            href={currentForce.href}
            className="apple-pill-btn keep-white-text whitespace-nowrap px-4 py-2 rounded-full bg-[#EC008C] text-white text-xs font-bold shrink-0"
          >
            مشاهده
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

/**
 * 2. Complete Official beta.ir 11-Category & 370-Product Interactive Catalog Section
 */
export function ProductFamilyGridSection() {
  const [viewMode, setViewMode] = useState<'categories' | 'all_products'>(
    'categories'
  );
  const [selectedMainCatId, setSelectedMainCatId] = useState<string>(
    BETA_OFFICIAL_CATEGORIES[0]?.id || 'attendance-uhf-rfid'
  );
  const [selectedSubCatId, setSelectedSubCatId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visibleLimit, setVisibleLimit] = useState<number>(20);
  const [quickPreviewCat, setQuickPreviewCat] =
    useState<BetaOfficialMainCategory | null>(null);
  const [quickPreviewProd, setQuickPreviewProd] =
    useState<BetaOfficialProductItem | null>(null);

  const activeMainCat = useMemo(
    () =>
      BETA_OFFICIAL_CATEGORIES.find((c) => c.id === selectedMainCatId) ||
      BETA_OFFICIAL_CATEGORIES[0],
    [selectedMainCatId]
  );

  const matchingProducts = useMemo(() => {
    return BETA_ALL_OFFICIAL_PRODUCTS.filter((p) => {
      if (selectedMainCatId !== 'all' && p.categoryId !== selectedMainCatId) {
        return false;
      }
      if (selectedSubCatId !== 'all' && p.subCategoryId !== selectedSubCatId) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.categoryTitle.toLowerCase().includes(q) ||
          p.subCategoryTitle.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedMainCatId, selectedSubCatId, searchQuery]);

  const handleOpenCategoryProducts = (catId: string) => {
    setSelectedMainCatId(catId);
    setSelectedSubCatId('all');
    setVisibleLimit(24);
    setViewMode('all_products');
  };

  return (
    <section
      aria-labelledby="product-families-heading"
      className="w-full max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 space-y-12"
    >
      {/* Apple Centered Header + Mode Switcher */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="text-xs font-extrabold tracking-wide text-[#EC008C]">
          کاتالوگ جامع وب‌سایت رسمی شرکت بتا (BETA.IR)
        </div>
        <h2
          id="product-families-heading"
          style={{ textWrap: 'balance' }}
          className="text-3xl sm:text-5xl font-black text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight"
        >
          تمامی ۱۱ گروه و {BETA_ALL_OFFICIAL_PRODUCTS.length} محصول رسمی بتا.
        </h2>
        <p className="text-sm sm:text-lg text-[#6E6E73] dark:text-[#A1A1A6]">
          حضور و غیاب و UHF، ریموت کنترل، مدار کنترل، درب بازکن، سیستم‌های
          امنیتی، موتور کرکره، راهبند، اپراتور شیشه برقی، آرام‌بند، قفل برقی و
          برق اضطراری UPS با تصاویر اصلی محصولات.
        </p>

        {/* Mode Switcher: 11 Main Categories vs Interactive 370-Product Browser */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
          <button
            type="button"
            onClick={() => setViewMode('categories')}
            className={`apple-pill-btn px-6 py-2.5 rounded-full text-sm font-extrabold cursor-pointer ${
              viewMode === 'categories'
                ? 'keep-white-text bg-[#EC008C] text-white shadow-md'
                : 'bg-white dark:bg-[#161617] text-[#515154] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-white border border-black/[0.06] dark:border-white/[0.1]'
            }`}
          >
            ۱۱ گروه اصلی محصولات بتا
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedMainCatId('all');
              setSelectedSubCatId('all');
              setVisibleLimit(24);
              setViewMode('all_products');
            }}
            className={`apple-pill-btn px-6 py-2.5 rounded-full text-sm font-extrabold cursor-pointer ${
              viewMode === 'all_products'
                ? 'keep-white-text bg-[#EC008C] text-white shadow-md'
                : 'bg-white dark:bg-[#161617] text-[#515154] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-white border border-black/[0.06] dark:border-white/[0.1]'
            }`}
          >
            مرور همه {BETA_ALL_OFFICIAL_PRODUCTS.length} محصول با تصاویر اصلی
          </button>
        </div>
      </div>

      {viewMode === 'categories' ? (
        <div className="space-y-12">
          {/* All 11 Official Main Categories Rendered with BetaReferenceProductCard & Official beta.ir Photos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {BETA_OFFICIAL_CATEGORIES.map((cat, idx) => {
              const totalCatProducts = cat.subCategories.reduce(
                (acc, s) => acc + s.products.length,
                0
              );
              const subTitles = cat.subCategories
                .map((s) => s.title)
                .join(' · ');

              return (
                <BetaReferenceProductCard
                  key={cat.id}
                  id={cat.id}
                  sku={`${cat.skuPrefix} · ${totalCatProducts} PRODUCTS`}
                  title={cat.title}
                  priceText={`${totalCatProducts} محصول در ${cat.subCategories.length} زیرگروه`}
                  description={`${cat.description} (${subTitles})`}
                  href={`/products?cat=${cat.id}`}
                  artworkType={cat.artwork}
                  customImageUrl={cat.image}
                  ctaMode="select_model"
                  onQuickView={() => setQuickPreviewCat(cat)}
                  index={idx}
                />
              );
            })}
          </div>
        </div>
      ) : null}

      {/* Interactive Multi-Level Browser for All 370 Official beta.ir Products (Always Visible Below or Expanded) */}
      <div className="rounded-[36px] bg-white dark:bg-[#161617] border border-black/[0.06] dark:border-white/[0.1] p-5 sm:p-8 shadow-[0_18px_50px_rgba(15,23,42,0.06)] space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-black/[0.06] dark:border-white/[0.08] pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#EC008C]">
              <Layers className="w-4 h-4" />
              <span>مرورگر مستقیم محصولات و زیرمجموعه‌های BETA.IR</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#1D1D1F] dark:text-white mt-1">
              مشاهده تک‌تک محصولات شرکت بتا به تفکیک گروه و زیرگروه
            </h3>
          </div>

          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-[#86868B] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleLimit(24);
              }}
              placeholder="جستجو در ۳۷۰ محصول بتا..."
              aria-label="جستجوی محصول در کاتالوگ صفحه اصلی"
              className="w-full pr-10 pl-4 py-2.5 rounded-full bg-[#F4F5F8] dark:bg-[#242731] border border-transparent focus:border-[#EC008C] text-xs sm:text-sm text-[#1D1D1F] dark:text-white focus:outline-none"
            />
          </div>
        </div>

        {/* Row 1: All 11 Main Categories Bar (With Smooth Sliding Pill Animation) */}
        <div className="rounded-2xl bg-[#EDEDEE] dark:bg-[#1E2029] p-2 flex flex-wrap items-center gap-1.5 border-t-2 border-[#EC008C]">
          <button
            type="button"
            onClick={() => {
              setSelectedMainCatId('all');
              setSelectedSubCatId('all');
              setVisibleLimit(24);
            }}
            className={`relative z-10 px-3.5 py-2 rounded-xl text-xs sm:text-[13px] font-extrabold transition-colors duration-200 cursor-pointer ${
              selectedMainCatId === 'all'
                ? 'keep-white-text text-white'
                : 'text-[#3A3A3C] dark:text-[#D1D1D6] hover:text-[#EC008C]'
            }`}
          >
            {selectedMainCatId === 'all' && (
              <motion.span
                layoutId="home-catalog-main-pill"
                transition={{ type: 'spring', stiffness: 480, damping: 35, mass: 0.55 }}
                className="absolute inset-0 z-0 rounded-xl bg-[#EC008C] shadow-xs"
              />
            )}
            <span className="relative z-10">
              همه ۱۱ گروه ({BETA_ALL_OFFICIAL_PRODUCTS.length})
            </span>
          </button>
          {BETA_OFFICIAL_CATEGORIES.map((cat) => {
            const count = cat.subCategories.reduce(
              (acc, s) => acc + s.products.length,
              0
            );
            const active = selectedMainCatId === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedMainCatId(cat.id);
                  setSelectedSubCatId('all');
                  setVisibleLimit(24);
                }}
                className={`relative px-3.5 py-2 rounded-xl text-xs sm:text-[13px] font-extrabold transition-colors duration-150 cursor-pointer ${
                  active
                    ? 'z-20 text-[#EC008C]'
                    : 'z-10 text-[#3A3A3C] dark:text-[#D1D1D6] hover:text-[#EC008C]'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="home-catalog-main-pill"
                    transition={{ type: 'spring', stiffness: 480, damping: 35, mass: 0.55 }}
                    className="absolute inset-0 z-0 rounded-xl bg-white dark:bg-[#2A2E3B] shadow-xs"
                  />
                )}
                <span className="relative z-10">
                  {cat.title} ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Row 2: Sub-Categories Bar for Selected Main Category (With 120fps Liquid Sliding Pill on Hover & Click: e.g. اکسس کنترل -> EM Reader) */}
        {selectedMainCatId !== 'all' && activeMainCat && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => setSelectedSubCatId('all')}
              onMouseEnter={() => setSelectedSubCatId('all')}
              className={`relative px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-colors duration-150 cursor-pointer ${
                selectedSubCatId === 'all'
                  ? 'z-20 keep-white-text text-white'
                  : 'z-10 bg-[#F4F5F8] dark:bg-[#242731] text-[#3A3A3C] dark:text-[#E5E5EA] hover:text-[#EC008C]'
              }`}
            >
              {selectedSubCatId === 'all' && (
                <motion.span
                  layoutId={`home-catalog-sub-pill-${activeMainCat.id}`}
                  transition={{ type: 'spring', stiffness: 480, damping: 35, mass: 0.55 }}
                  className="absolute inset-0 z-0 rounded-full bg-[#EC008C] shadow-[0_6px_18px_rgba(236,0,140,0.32)]"
                />
              )}
              <span className="relative z-10">
                همه زیرگروه‌های {activeMainCat.title}
              </span>
            </button>
            {activeMainCat.subCategories.map((sub) => {
              const isSubActive = selectedSubCatId === sub.id;
              return (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => {
                    setSelectedSubCatId(sub.id);
                    setVisibleLimit(24);
                  }}
                  onMouseEnter={() => {
                    setSelectedSubCatId(sub.id);
                    setVisibleLimit(24);
                  }}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors duration-150 cursor-pointer ${
                    isSubActive
                      ? 'z-20 keep-white-text text-white font-extrabold'
                      : 'z-10 bg-[#F4F5F8] dark:bg-[#242731] text-[#3A3A3C] dark:text-[#E5E5EA] hover:text-[#EC008C]'
                  }`}
                >
                  {isSubActive && (
                    <motion.span
                      layoutId={`home-catalog-sub-pill-${activeMainCat.id}`}
                      transition={{
                        type: 'spring',
                        stiffness: 480,
                        damping: 35,
                        mass: 0.55,
                      }}
                      className="absolute inset-0 z-0 rounded-full bg-[#EC008C] shadow-[0_6px_18px_rgba(236,0,140,0.32)]"
                    />
                  )}
                  <span className="relative z-10">
                    {sub.title} ({sub.products.length})
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Row 3: Real beta.ir Products Grid with Authentic Product Photos & Smooth Transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedMainCatId}-${selectedSubCatId}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 pt-2"
          >
            {matchingProducts.slice(0, visibleLimit).map((prod) => (
              <div
                key={prod.id}
                className="apple-card group rounded-[28px] bg-[#F8F9FB] dark:bg-[#1E2029] border border-black/[0.05] dark:border-white/[0.08] p-3 flex flex-col justify-between shadow-xs hover:border-[#EC008C]/40 transition-all"
              >
                <div>
                  <div className="relative aspect-square w-full rounded-[22px] bg-[#ECECEE] overflow-hidden flex items-center justify-center p-4 mb-3">
                    <span className="absolute top-2.5 right-3 text-[11px] font-extrabold text-[#1E293B] inline-flex items-center gap-1.5">
                      <span>موجود</span>
                      <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuickPreviewProd(prod)}
                      className="absolute top-2.5 left-3 px-2.5 py-1 rounded-full bg-white text-[11px] font-extrabold text-[#1E293B] shadow-xs hover:scale-105 transition-transform cursor-pointer"
                    >
                      مشاهده سریع
                    </button>
                    <img
                      src={prod.image}
                      alt={prod.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain pt-5 mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="px-1.5 space-y-1 text-right">
                    <div className="flex items-center justify-between text-[11px] text-[#64748B] dark:text-[#94A3B8]">
                      <span className="truncate font-bold text-[#EC008C]">
                        {prod.subCategoryTitle}
                      </span>
                      <span dir="ltr" className="font-mono font-bold">
                        {prod.sku}
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-[15px] font-black text-[#0F172A] dark:text-white line-clamp-2 leading-snug">
                      <Link
                        href={`/products?cat=${prod.categoryId}&sub=${prod.subCategoryId}&q=${encodeURIComponent(prod.title)}`}
                        className="hover:text-[#EC008C] transition-colors"
                      >
                        {prod.title}
                      </Link>
                    </h4>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-black/[0.05] dark:border-white/[0.08] flex items-center justify-between gap-2 px-1">
                  <Link
                    href={`/products?cat=${prod.categoryId}&sub=${prod.subCategoryId}&q=${encodeURIComponent(prod.title)}`}
                    className="keep-white-text flex-1 py-2 px-3 rounded-full bg-[#EC008C] hover:bg-[#d4007d] text-white text-xs font-extrabold text-center transition-colors"
                  >
                    مشخصات و خرید
                  </Link>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Load More / View All Footer */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-black/[0.06] dark:border-white/[0.08]">
          <div className="text-xs sm:text-sm font-bold text-[#6E6E73] dark:text-[#A1A1A6]">
            نمایش{' '}
            <strong className="text-[#1D1D1F] dark:text-white tabular-nums">
              {Math.min(visibleLimit, matchingProducts.length)}
            </strong>{' '}
            از{' '}
            <strong className="text-[#EC008C] tabular-nums">
              {matchingProducts.length}
            </strong>{' '}
            محصول در این بخش
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {visibleLimit < matchingProducts.length && (
              <>
                <button
                  type="button"
                  onClick={() => setVisibleLimit((v) => v + 24)}
                  className="keep-white-text px-5 py-2.5 rounded-full bg-[#EC008C] hover:bg-[#d4007d] text-white text-xs sm:text-sm font-extrabold cursor-pointer"
                >
                  نمایش ۲۴ محصول بیشتر
                </button>
                <button
                  type="button"
                  onClick={() => setVisibleLimit(matchingProducts.length)}
                  className="px-5 py-2.5 rounded-full bg-[#F4F5F8] dark:bg-[#242731] text-[#1D1D1F] dark:text-white text-xs sm:text-sm font-extrabold cursor-pointer"
                >
                  نمایش تمام {matchingProducts.length} محصول
                </button>
              </>
            )}
            <Link
              href="/products"
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-extrabold text-[#EC008C] hover:underline"
            >
              <span>ورود به صفحه کامل کاتالوگ</span>
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Category Quick Preview Modal */}
      {quickPreviewCat && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`مشاهده سریع ${quickPreviewCat.title}`}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="w-full max-w-xl rounded-[32px] bg-white dark:bg-[#161617] border border-black/[0.08] dark:border-white/[0.12] p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div
                  className="text-xs font-bold text-[#64748B] uppercase"
                  dir="ltr"
                >
                  {quickPreviewCat.skuPrefix}
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#1D1D1F] dark:text-white mt-1">
                  {quickPreviewCat.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setQuickPreviewCat(null)}
                className="w-9 h-9 rounded-full bg-[#F5F5F7] dark:bg-[#242426] flex items-center justify-center text-[#1D1D1F] dark:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-[#ECECEE] border border-black/[0.04]">
              <ProductTechnicalArtwork
                type={quickPreviewCat.artwork}
                customImageUrl={quickPreviewCat.image}
                title={quickPreviewCat.title}
                className="w-full h-full"
              />
            </div>

            <div className="flex flex-wrap gap-1.5">
              {quickPreviewCat.subCategories.map((s) => (
                <Link
                  key={s.id}
                  href={`/products?cat=${quickPreviewCat.id}&sub=${s.id}`}
                  onClick={() => setQuickPreviewCat(null)}
                  className="px-3 py-1 rounded-full bg-[#F4F5F8] dark:bg-[#242731] text-xs font-bold text-[#1D1D1F] dark:text-white hover:text-[#EC008C]"
                >
                  {s.title} ({s.products.length})
                </Link>
              ))}
            </div>

            <p className="text-sm text-[#64748B] dark:text-[#A1A1A6] leading-relaxed">
              {quickPreviewCat.description}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  const id = quickPreviewCat.id;
                  setQuickPreviewCat(null);
                  handleOpenCategoryProducts(id);
                }}
                className="apple-pill-btn keep-white-text flex-1 py-3.5 px-6 rounded-full bg-[#EC008C] hover:bg-[#d4007d] text-white text-sm font-bold text-center cursor-pointer"
              >
                مشاهده تمام محصولات این گروه
              </button>
              <button
                type="button"
                onClick={() => setQuickPreviewCat(null)}
                className="px-5 py-3.5 rounded-full bg-[#F5F5F7] dark:bg-[#242426] text-sm font-bold text-[#1D1D1F] dark:text-white cursor-pointer"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Individual Product Quick Preview Modal */}
      {quickPreviewProd && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`مشاهده سریع ${quickPreviewProd.title}`}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="w-full max-w-xl rounded-[32px] bg-white dark:bg-[#161617] border border-black/[0.08] dark:border-white/[0.12] p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div
                  className="text-xs font-bold text-[#64748B] uppercase"
                  dir="ltr"
                >
                  {quickPreviewProd.sku}
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#1D1D1F] dark:text-white mt-1">
                  {quickPreviewProd.title}
                </h2>
                <div className="text-xs font-bold text-[#EC008C] mt-1">
                  {quickPreviewProd.categoryTitle} /{' '}
                  {quickPreviewProd.subCategoryTitle}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setQuickPreviewProd(null)}
                className="w-9 h-9 rounded-full bg-[#F5F5F7] dark:bg-[#242426] flex items-center justify-center text-[#1D1D1F] dark:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-[#ECECEE] border border-black/[0.04]">
              <ProductTechnicalArtwork
                type={quickPreviewProd.artwork}
                customImageUrl={quickPreviewProd.image}
                title={quickPreviewProd.title}
                className="w-full h-full"
              />
            </div>

            <div className="text-xl font-black text-[#EC008C] tabular-nums">
              {quickPreviewProd.priceRange}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Link
                href={`/products?cat=${quickPreviewProd.categoryId}&sub=${quickPreviewProd.subCategoryId}&q=${encodeURIComponent(quickPreviewProd.title)}`}
                onClick={() => setQuickPreviewProd(null)}
                className="apple-pill-btn keep-white-text flex-1 py-3.5 px-6 rounded-full bg-[#EC008C] hover:bg-[#d4007d] text-white text-sm font-bold text-center"
              >
                مشاهده در کاتالوگ و سفارش
              </Link>
              <button
                type="button"
                onClick={() => setQuickPreviewProd(null)}
                className="px-5 py-3.5 rounded-full bg-[#F5F5F7] dark:bg-[#242426] text-sm font-bold text-[#1D1D1F] dark:text-white cursor-pointer"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/**
 * 3. Storefront Direct Buy Shelf (Exact Reference Card Layout from image_d7b364e7.png)
 */
const SHORT_PRODUCT_TITLES: Record<string, { title: string; summary: string }> =
  {
    'motor-pack': {
      title: 'پک جک پارکینگی بتا (F350)',
      summary:
        'پکیج کامل دو بازوی الکترومکانیکی (یا موتور ریلی)، مدار کنترل هوشمند، فتوسل، فلاشر و ۲ عدد ریموت بتا.',
    },
    'roller-door-opener': {
      title: 'پک موتور کرکره ساید بتا UPS هوشمند',
      summary:
        'موتور کرکره برقی ساید (1000Kg) مجهز به برق اضطراری UPS، زنجیر خلاص‌کن، مرکز کنترل و ۲ ریموت.',
    },
    'remote-pack': {
      title: 'پک دزدگیر اماکن سیم‌کارتی Z7-GSM Plus',
      summary:
        'پنل مرکزی دزدگیر سیم‌کارتی و خط ثابت بتا با اپلیکیشن فارسی موبایل، ۲ چشمی دیجیتال، آژیر و ۲ ریموت.',
    },
    receiver: {
      title: 'پک مدار فرمان و رسیور سیم‌کارتی سیموت',
      summary:
        'تابلو فرمان دیجیتال به همراه رسیور سیم‌کارتی اسمارت سیموت، آنتن تقویتی، چشمی فتوسل و ۲ عدد ریموت بتا.',
    },
    remote: {
      title: 'پک ریموت کنترل و فتوسل ایمنی فابریک بتا',
      summary:
        'مجموعه ۴ عدد ریموت استیل بتا، گیرنده رادیویی دیجیتال ۲ کاناله، چشمی فتوسل مادون قرمز و فلاشر LED.',
    },
    'sliding-gate-pack': {
      title: 'پک موتور درب ریلی بتا (F-550M)',
      summary:
        'موتور گیربکس صنعتی درب کشویی تا ۱۵۰۰ کیلوگرم به همراه ریل فولادی دنده‌شانه‌ای، برد دیجیتال، فتوسل و ۲ ریموت.',
    },
  };

export function FeaturedAriaAndShopSection() {
  const { products, addToCart } = useBetaDoors();
  const [quickStatus, setQuickStatus] = useState<Record<string, string>>({});
  const [quickViewProduct, setQuickViewProduct] = useState<ShopProduct | null>(
    null
  );

  const handleQuickAdd = (productSlug: string) => {
    const prod = products.find((p) => p.slug === productSlug);
    if (!prod) return;
    const defaultVariant = prod.requiresVariant ? '1200N' : null;
    const res = addToCart(prod, defaultVariant, 1);
    if (res.ok) {
      setQuickStatus((prev) => ({
        ...prev,
        [prod.id]: `به سبد خرید اضافه شد`,
      }));
      window.setTimeout(() => {
        setQuickStatus((prev) => {
          const copy = { ...prev };
          delete copy[prod.id];
          return copy;
        });
      }, 2800);
    }
  };

  return (
    <section
      aria-labelledby="featured-aria-heading"
      className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-14"
    >
      {/* Storefront Product Shelf Matching Reference Card Design (2-Column Grid as in image_d7b364e7.png) */}
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-bold text-[#EC008C]">
              فروشگاه آنلاین بتا
            </div>
            <h2
              id="featured-aria-heading"
              className="text-2xl sm:text-4xl font-bold text-[#1D1D1F] dark:text-white tracking-tight"
            >
              خرید مستقیم پکیج‌های آماده نصب.
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1 text-sm font-bold text-[#EC008C] hover:opacity-80"
          >
            <span>مشاهده فروشگاه</span>
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((prod, idx) => {
            const concise = SHORT_PRODUCT_TITLES[prod.slug] || {
              title: prod.name,
              summary: prod.shortDescription,
            };
            const formattedPrice =
              prod.requiresVariant && prod.maxPriceCents
                ? `${formatAudCents(prod.priceCents).replace(' تومان', '')} تا ${formatAudCents(prod.maxPriceCents)}`
                : formatAudCents(prod.priceCents);

            return (
              <BetaReferenceProductCard
                key={prod.id}
                id={prod.id}
                sku={prod.sku}
                title={concise.title}
                priceText={formattedPrice}
                description={concise.summary}
                href={prod.path}
                artworkType={prod.imageSvgType}
                customImageUrl={prod.customImageUrl}
                ctaMode={prod.requiresVariant ? 'select_model' : 'direct_add'}
                onQuickView={() => setQuickViewProduct(prod)}
                onAddToCart={() => handleQuickAdd(prod.slug)}
                addedFeedbackText={quickStatus[prod.id]}
                index={idx}
              />
            );
          })}
        </div>
      </div>

      {/* Minimal 3-Card Apple Support & Utility Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="apple-card rounded-[28px] bg-white dark:bg-[#161617] border border-black/[0.05] dark:border-white/[0.08] p-7 flex flex-col justify-between space-y-4 shadow-[0_8px_28px_rgba(0,0,0,0.03)]">
          <div className="space-y-2">
            <Calculator className="w-6 h-6 text-[#EC008C]" />
            <h3 className="text-lg font-bold text-[#1D1D1F] dark:text-white">
              محاسبه‌گر هوشمند موتور
            </h3>
            <p className="text-sm text-[#6E6E73] dark:text-[#A1A1A6]">
              پیشنهاد دقیق مدل جک یا موتور کرکره بر اساس ابعاد درب.
            </p>
          </div>
          <Link
            href="/garage-door-spring-estimator"
            className="inline-flex items-center gap-1 text-sm font-bold text-[#EC008C]"
          >
            <span>ورود به محاسبه‌گر</span>
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="apple-card rounded-[28px] bg-white dark:bg-[#161617] border border-black/[0.05] dark:border-white/[0.08] p-7 flex flex-col justify-between space-y-4 shadow-[0_8px_28px_rgba(0,0,0,0.03)]">
          <div className="space-y-2">
            <Wrench className="w-6 h-6 text-[#EC008C]" />
            <h3 className="text-lg font-bold text-[#1D1D1F] dark:text-white">
              گارانتی و خدمات پس از فروش
            </h3>
            <p className="text-sm text-[#6E6E73] dark:text-[#A1A1A6]">
              پشتیبانی فنی و تعمیرات تخصصی در واحد مرکزی تهران.
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm font-bold">
            <Link
              href="/services"
              className="inline-flex items-center gap-1 text-[#EC008C]"
            >
              <span>شرایط خدمات</span>
              <ChevronLeft className="w-4 h-4" />
            </Link>
            <a
              href="tel:02188404407"
              dir="ltr"
              className="inline-flex items-center gap-1 text-[#1D1D1F] dark:text-white"
            >
              <Phone className="w-3.5 h-3.5 text-[#EC008C]" />
              <span>021-88404407</span>
            </a>
          </div>
        </div>

        <div className="apple-card rounded-[28px] bg-white dark:bg-[#161617] border border-black/[0.05] dark:border-white/[0.08] p-7 flex flex-col justify-between space-y-4 shadow-[0_8px_28px_rgba(0,0,0,0.03)]">
          <div className="space-y-2">
            <FileText className="w-6 h-6 text-[#EC008C]" />
            <h3 className="text-lg font-bold text-[#1D1D1F] dark:text-white">
              اپلیکیشن‌ها و راهنمای نصب
            </h3>
            <p className="text-sm text-[#6E6E73] dark:text-[#A1A1A6]">
              دانلود اپ‌های سیموت و دزدگیر Z7-GSM به همراه نقشه سیم‌کشی بردها.
            </p>
          </div>
          <Link
            href="/beta-doors-manuals"
            className="inline-flex items-center gap-1 text-sm font-bold text-[#EC008C]"
          >
            <span>دریافت فایل‌ها</span>
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Quick View Modal for Storefront Cards */}
      {quickViewProduct && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`مشاهده سریع ${quickViewProduct.name}`}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="w-full max-w-xl rounded-[32px] bg-white dark:bg-[#161617] border border-black/[0.08] dark:border-white/[0.12] p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div
                  className="text-xs font-bold text-[#64748B] uppercase"
                  dir="ltr"
                >
                  {quickViewProduct.sku}
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#1D1D1F] dark:text-white mt-1">
                  {quickViewProduct.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setQuickViewProduct(null)}
                className="w-9 h-9 rounded-full bg-[#F5F5F7] dark:bg-[#242426] flex items-center justify-center text-[#1D1D1F] dark:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-[#F5F5F7] border border-black/[0.04]">
              <ProductTechnicalArtwork
                type={quickViewProduct.imageSvgType}
                customImageUrl={quickViewProduct.customImageUrl}
                title={quickViewProduct.name}
                className="w-full h-full"
              />
            </div>

            <div className="text-2xl font-black text-[#EC008C] tabular-nums">
              {quickViewProduct.requiresVariant && quickViewProduct.maxPriceCents
                ? `${formatAudCents(quickViewProduct.priceCents).replace(' تومان', '')} تا ${formatAudCents(quickViewProduct.maxPriceCents)}`
                : formatAudCents(quickViewProduct.priceCents)}
            </div>

            <p className="text-sm text-[#64748B] dark:text-[#A1A1A6] leading-relaxed">
              {quickViewProduct.shortDescription}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <Link
                href={quickViewProduct.path}
                onClick={() => setQuickViewProduct(null)}
                className="apple-pill-btn keep-white-text flex-1 py-3.5 px-6 rounded-full bg-[#EC008C] hover:bg-[#d4007d] text-white text-sm font-bold text-center"
              >
                مشاهده صفحه محصول و خرید
              </Link>
              <button
                type="button"
                onClick={() => setQuickViewProduct(null)}
                className="px-5 py-3.5 rounded-full bg-[#F5F5F7] dark:bg-[#242426] text-sm font-bold text-[#1D1D1F] dark:text-white cursor-pointer"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
