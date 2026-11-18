'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ShoppingCart,
  X,
  Search,
  ChevronLeft,
  Layers,
  FileText,
  ShoppingBag,
  Check,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useBetaDoors } from '@/components/providers/BetaDoorsProvider';
import { formatAudCents } from '@/lib/domain-logic';
import { ProductTechnicalArtwork } from '@/components/brand/ProductTechnicalArtwork';
import { BetaReferenceProductCard } from '@/components/shop/BetaReferenceProductCard';
import { DeFiPageHeroStage } from '@/components/hero/DeFiPageHeroStage';
import {
  BETA_OFFICIAL_CATEGORIES,
  BETA_ALL_OFFICIAL_PRODUCTS,
  type BetaOfficialProductItem,
} from '@/lib/beta-official-catalog';
import type { ShopProduct } from '@/lib/types';

export function ShopListingView({
  categoryFilterSlug,
  heading = 'فروشگاه آنلاین و خرید مستقیم پکیج‌ها و تجهیزات شرکت بتا.',
  subheading = 'خرید اینترنتی آنی پکیج‌های آماده نصب (با انتخاب ظرفیت موتور) و تک‌تک ۳۷۰ محصول شرکت بتا به همراه افزودن مستقیم به سبد خرید و گارانتی معتبر.',
}: {
  categoryFilterSlug?: string;
  heading?: string;
  subheading?: string;
}) {
  const { products, addToCart } = useBetaDoors();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'kits' | 'accessories'>(
    'all'
  );
  const [sortOrder, setSortOrder] = useState<
    'featured' | 'price_asc' | 'price_desc'
  >('featured');

  const [addedFeedback, setAddedFeedback] = useState<Record<string, string>>(
    {}
  );
  const [quickViewProduct, setQuickViewProduct] = useState<ShopProduct | null>(
    null
  );
  const [quickViewVariant, setQuickViewVariant] = useState<string>('1200N');

  // Official 370-Product Catalog Browser state inside Shop
  const [selectedOfficialCatId, setSelectedOfficialCatId] =
    useState<string>('all');
  const [selectedOfficialSubId, setSelectedOfficialSubId] =
    useState<string>('all');
  const [visibleOfficialCount, setVisibleOfficialCount] = useState<number>(20);

  const filteredProducts = useMemo(() => {
    const base = categoryFilterSlug
      ? products.filter((p) => p.categorySlug === categoryFilterSlug)
      : products;

    const searched = base.filter((p) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q);
        if (!match) return false;
      }

      if (filterType === 'kits') {
        return (
          p.slug.includes('motor') ||
          p.slug.includes('opener') ||
          p.slug.includes('remote-pack')
        );
      }
      if (filterType === 'accessories') {
        return p.slug === 'receiver' || p.slug === 'remote';
      }
      return true;
    });

    const sorted = [...searched];
    if (sortOrder === 'price_asc') {
      sorted.sort((a, b) => a.priceCents - b.priceCents);
    } else if (sortOrder === 'price_desc') {
      sorted.sort((a, b) => b.priceCents - a.priceCents);
    }
    return sorted;
  }, [products, categoryFilterSlug, searchQuery, filterType, sortOrder]);

  const activeOfficialCategory = useMemo(
    () =>
      BETA_OFFICIAL_CATEGORIES.find((c) => c.id === selectedOfficialCatId) ||
      null,
    [selectedOfficialCatId]
  );

  const filteredOfficialCatalog = useMemo(() => {
    return BETA_ALL_OFFICIAL_PRODUCTS.filter((p) => {
      if (
        selectedOfficialCatId !== 'all' &&
        p.categoryId !== selectedOfficialCatId
      ) {
        return false;
      }
      if (
        selectedOfficialSubId !== 'all' &&
        p.subCategoryId !== selectedOfficialSubId
      ) {
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
  }, [selectedOfficialCatId, selectedOfficialSubId, searchQuery]);

  const handleDirectAdd = (prod: ShopProduct, variantLabel: string | null) => {
    const res = addToCart(prod, variantLabel, 1);
    if (res.ok) {
      setAddedFeedback((prev) => ({
        ...prev,
        [prod.id]: `به سبد خرید اضافه شد`,
      }));
      window.setTimeout(() => {
        setAddedFeedback((prev) => {
          const copy = { ...prev };
          delete copy[prod.id];
          return copy;
        });
      }, 2500);
    }
  };

  const handleAddOfficialCatalogItem = (item: BetaOfficialProductItem) => {
    const syntheticShopProduct: ShopProduct = {
      id: item.id,
      slug: item.id,
      path: item.internalHref,
      name: item.title,
      sku: item.sku,
      categorySlug: item.categoryId,
      priceCents: 385000000,
      currency: 'AUD',
      stockCount: 25,
      requiresVariant: false,
      variants: [],
      features: [item.categoryTitle, item.subCategoryTitle],
      packContents: [item.title, 'دفترچه راهنما و کارت گارانتی شرکت بتا'],
      shortDescription: `${item.categoryTitle} — ${item.subCategoryTitle}`,
      description: `محصول اورجینال شرکت بتا در گروه ${item.categoryTitle} (${item.subCategoryTitle}) با گارانتی معتبر.`,
      specs: [
        { label: 'گروه اصلی', value: item.categoryTitle, verified: true },
        { label: 'زیرمجموعه', value: item.subCategoryTitle, verified: true },
        { label: 'کد فنی', value: item.sku, verified: true },
      ],
      relatedProductIds: [],
      reviews: [],
      imageSvgType: item.artwork,
      customImageUrl: item.image,
    };
    const res = addToCart(syntheticShopProduct, null, 1);
    if (res.ok) {
      setAddedFeedback((prev) => ({
        ...prev,
        [item.id]: 'به سبد خرید اضافه شد',
      }));
      window.setTimeout(() => {
        setAddedFeedback((prev) => {
          const copy = { ...prev };
          delete copy[item.id];
          return copy;
        });
      }, 2500);
    }
  };

  return (
    <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Clean Apple Header */}
      <DeFiPageHeroStage
        ariaLabel="فروشگاه آنلاین شرکت بتا"
        badgeText="فروشگاه اینترنتی و خرید مستقیم بتا"
        badgeHref="/products"
        headlinePrimary={heading}
        headlineGradient=""
        subheadline={subheading}
        primaryCtaLabel="مشاهده سبد خرید"
        primaryCtaHref="/cart"
        secondaryCtaLabel="کاتالوگ فنی ۳۷۰ محصول"
        secondaryCtaHref="/products"
        scrollTargetId="shop-catalog"
        topLeftNode={{ label: 'پکیج‌های جک', metric: 'TITAN · F600' }}
        topRightNode={{ label: 'موتور کرکره', metric: 'Side UPS' }}
        bottomLeftNode={{ label: 'رسیور سیموت', metric: 'Smart GSM' }}
        bottomRightNode={{ label: 'کاربری بخش', metric: 'خرید آنی و سبد خرید' }}
        horizonSlides={[]}
      />

      {/* Clear Comparison Strip: Difference Between فروشگاه آنلاین vs کاتالوگ محصولات */}
      <div className="rounded-[26px] bg-white dark:bg-[#161617] border border-black/[0.06] dark:border-white/[0.1] p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 gap-4 shadow-[0_8px_28px_rgba(0,0,0,0.03)]">
        <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-[#EC008C]/[0.06] dark:bg-[#EC008C]/[0.12] border border-[#EC008C]/25">
          <div className="w-10 h-10 rounded-xl bg-[#EC008C] text-white flex items-center justify-center shrink-0">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="text-xs font-extrabold text-[#EC008C]">
              شما در بخش «فروشگاه آنلاین» هستید
            </div>
            <div className="text-sm font-black text-[#1D1D1F] dark:text-white">
              خرید مستقیم پکیج‌های آماده نصب و تک‌محصولات با افزودن آنی به سبد خرید
            </div>
            <p className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
              مخصوص خرید آنلاین با قیمت مشخص، انتخاب ظرفیت موتور (800N / 1200N /
              1500N) و ثبت سفارش اینترنتی پکیج‌های کامل نصب یا تجهیزات تکی.
            </p>
          </div>
        </div>

        <div className="flex items-start justify-between gap-3.5 p-3 rounded-2xl bg-[#F4F5F8] dark:bg-[#1E2029] border border-black/[0.05] dark:border-white/[0.08]">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#1D1D1F] dark:bg-white/10 text-white flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-[#EC008C]" />
            </div>
            <div className="space-y-1">
              <div className="text-xs font-extrabold text-[#6E6E73] dark:text-[#A1A1A6]">
                تفاوت با بخش «محصولات (کاتالوگ فنی)»
              </div>
              <div className="text-sm font-black text-[#1D1D1F] dark:text-white">
                مرجع مهندسی ۱۱ گروه، ۴۵ زیرگروه و مشخصات فنی تمام ۳۷۰ محصول
              </div>
              <p className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                اگر قصد بررسی مشخصات فنی، کدهای مهندسی و مقایسه زیرگروه‌های تخصصی
                کارخانه بتا را دارید، از بخش کاتالوگ محصولات استفاده کنید.
              </p>
            </div>
          </div>
          <Link
            href="/products"
            className="shrink-0 self-center inline-flex items-center gap-1 px-4 py-2 rounded-full bg-white dark:bg-[#282C37] border border-black/[0.08] dark:border-white/[0.12] text-[#1D1D1F] dark:text-white hover:text-[#EC008C] text-xs font-extrabold"
          >
            <span>کاتالوگ فنی</span>
            <ChevronLeft className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Minimal Apple Filter & Search Bar */}
      <div className="rounded-[24px] bg-white dark:bg-[#161617] border border-black/[0.05] dark:border-white/[0.08] p-4 sm:p-5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 shadow-[0_8px_28px_rgba(0,0,0,0.03)]">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'همه پکیج‌های آماده نصب' },
            { id: 'kits', label: 'پکیج‌های جک، کرکره و دزدگیر' },
            { id: 'accessories', label: 'پکیج‌های سیموت و ریموت' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterType(tab.id as typeof filterType)}
              className={`apple-pill-btn px-4 py-2 rounded-full text-xs sm:text-sm font-bold cursor-pointer ${
                filterType === tab.id
                  ? 'keep-white-text bg-[#EC008C] text-white'
                  : 'bg-[#F5F5F7] dark:bg-[#242426] text-[#515154] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-[#86868B] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجوی محصول..."
              aria-label="جستجوی محصولات فروشگاه بتا"
              className="w-full pr-10 pl-4 py-2 rounded-full bg-[#F5F5F7] dark:bg-[#242426] border border-transparent focus:border-[#EC008C] text-sm text-[#1D1D1F] dark:text-white focus:outline-none"
            />
          </div>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as typeof sortOrder)}
            aria-label="مرتب‌سازی محصولات"
            className="px-4 py-2 rounded-full bg-[#F5F5F7] dark:bg-[#242426] text-xs sm:text-sm text-[#1D1D1F] dark:text-white font-medium focus:outline-none cursor-pointer"
          >
            <option value="featured">مرتب‌سازی: منتخب</option>
            <option value="price_asc">قیمت: کم به زیاد</option>
            <option value="price_desc">قیمت: زیاد به کم</option>
          </select>
        </div>
      </div>

      {/* Reference-Matched Storefront Product Cards (2-Column Grid matching image_d7b364e7.png) */}
      <div
        id="shop-catalog"
        className="max-w-[1160px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {filteredProducts.map((prod, idx) => {
          const formattedPrice =
            prod.requiresVariant && prod.maxPriceCents
              ? `${formatAudCents(prod.priceCents).replace(' تومان', '')} تا ${formatAudCents(prod.maxPriceCents)}`
              : formatAudCents(prod.priceCents);

          return (
            <BetaReferenceProductCard
              key={prod.id}
              id={prod.id}
              sku={prod.sku}
              title={prod.name}
              priceText={formattedPrice}
              description={prod.shortDescription}
              href={prod.path}
              artworkType={prod.imageSvgType}
              customImageUrl={prod.customImageUrl}
              ctaMode={prod.requiresVariant ? 'select_model' : 'direct_add'}
              onQuickView={() => {
                setQuickViewProduct(prod);
                setQuickViewVariant('1200N');
              }}
              onAddToCart={() => handleDirectAdd(prod, null)}
              addedFeedbackText={addedFeedback[prod.id]}
              index={idx}
            />
          );
        })}
      </div>

      {/* Complete 11-Category / 370-Product Direct Online Order Shelf Inside Shop */}
      <div className="rounded-[36px] bg-white dark:bg-[#161617] border border-black/[0.06] dark:border-white/[0.1] p-5 sm:p-8 shadow-[0_18px_50px_rgba(15,23,42,0.06)] space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/[0.06] dark:border-white/[0.08] pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#EC008C]">
              <Layers className="w-4 h-4" />
              <span>خرید تکی تمامی ۳۷۰ محصول رسمی شرکت بتا</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#1D1D1F] dark:text-white mt-1">
              سفارش آنلاین تک‌تک محصولات در ۱۱ گروه اصلی
            </h2>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-extrabold text-[#EC008C] hover:underline"
          >
            <span>مشاهده کاتالوگ فنی</span>
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </div>

        {/* 11 Categories Bar (With Smooth Sliding Pill Animation) */}
        <div className="rounded-2xl bg-[#EDEDEE] dark:bg-[#1E2029] p-2 flex flex-wrap items-center gap-1.5 border-t-2 border-[#EC008C]">
          <button
            type="button"
            onClick={() => {
              setSelectedOfficialCatId('all');
              setSelectedOfficialSubId('all');
              setVisibleOfficialCount(20);
            }}
            className={`relative z-10 px-3.5 py-2 rounded-xl text-xs sm:text-[13px] font-extrabold transition-colors duration-200 cursor-pointer ${
              selectedOfficialCatId === 'all'
                ? 'keep-white-text text-white'
                : 'text-[#3A3A3C] dark:text-[#D1D1D6] hover:text-[#EC008C]'
            }`}
          >
            {selectedOfficialCatId === 'all' && (
              <motion.span
                layoutId="shop-catalog-main-pill"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                className="absolute inset-0 rounded-xl bg-[#EC008C] shadow-xs -z-10"
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
            const active = selectedOfficialCatId === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedOfficialCatId(cat.id);
                  setSelectedOfficialSubId('all');
                  setVisibleOfficialCount(20);
                }}
                className={`relative z-10 px-3.5 py-2 rounded-xl text-xs sm:text-[13px] font-extrabold transition-colors duration-200 cursor-pointer ${
                  active
                    ? 'text-[#EC008C]'
                    : 'text-[#3A3A3C] dark:text-[#D1D1D6] hover:text-[#EC008C]'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="shop-catalog-main-pill"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    className="absolute inset-0 rounded-xl bg-white dark:bg-[#2A2E3B] shadow-xs -z-10"
                  />
                )}
                <span className="relative z-10">
                  {cat.title} ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Sub-Categories Bar (With Smooth Sliding Pill Animation on Hover & Click) */}
        {activeOfficialCategory && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeOfficialCategory.id}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-2"
            >
              <button
                type="button"
                onClick={() => setSelectedOfficialSubId('all')}
                onMouseEnter={() => setSelectedOfficialSubId('all')}
                className={`relative z-10 px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-colors duration-200 cursor-pointer ${
                  selectedOfficialSubId === 'all'
                    ? 'keep-white-text text-white'
                    : 'bg-[#F4F5F8] dark:bg-[#242731] text-[#3A3A3C] dark:text-[#E5E5EA] hover:text-[#EC008C]'
                }`}
              >
                {selectedOfficialSubId === 'all' && (
                  <motion.span
                    layoutId={`shop-catalog-sub-pill-${activeOfficialCategory.id}`}
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-[#EC008C] shadow-[0_6px_18px_rgba(236,0,140,0.32)] -z-10"
                  />
                )}
                <span className="relative z-10">همه زیرگروه‌ها</span>
              </button>
              {activeOfficialCategory.subCategories.map((sub) => {
                const isSubActive = selectedOfficialSubId === sub.id;
                return (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => {
                      setSelectedOfficialSubId(sub.id);
                      setVisibleOfficialCount(20);
                    }}
                    onMouseEnter={() => {
                      setSelectedOfficialSubId(sub.id);
                      setVisibleOfficialCount(20);
                    }}
                    className={`relative z-10 px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors duration-200 cursor-pointer ${
                      isSubActive
                        ? 'keep-white-text text-white font-extrabold'
                        : 'bg-[#F4F5F8] dark:bg-[#242731] text-[#3A3A3C] dark:text-[#E5E5EA] hover:text-[#EC008C]'
                    }`}
                  >
                    {isSubActive && (
                      <motion.span
                        layoutId={`shop-catalog-sub-pill-${activeOfficialCategory.id}`}
                        transition={{
                          type: 'spring',
                          stiffness: 420,
                          damping: 32,
                        }}
                        className="absolute inset-0 rounded-full bg-[#EC008C] shadow-[0_6px_18px_rgba(236,0,140,0.32)] -z-10"
                      />
                    )}
                    <span className="relative z-10">
                      {sub.title} ({sub.products.length})
                    </span>
                  </button>
                );
              })}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Official Products Grid with Direct Add-to-Cart Button */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedOfficialCatId}-${selectedOfficialSubId}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
          >
            {filteredOfficialCatalog
              .slice(0, visibleOfficialCount)
              .map((prod) => {
                const feedback = addedFeedback[prod.id];
                return (
                  <div
                    key={prod.id}
                    className="apple-card group rounded-[28px] bg-[#F8F9FB] dark:bg-[#1E2029] border border-black/[0.05] dark:border-white/[0.08] p-3 flex flex-col justify-between shadow-xs hover:border-[#EC008C]/40 transition-all"
                  >
                    <div>
                      <div className="relative aspect-square w-full rounded-[22px] bg-[#ECECEE] overflow-hidden flex items-center justify-center p-4 mb-3">
                        <span className="absolute top-2.5 right-3 text-[11px] font-extrabold text-[#1E293B] inline-flex items-center gap-1.5">
                          <span>موجود در انبار</span>
                          <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                        </span>
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
                        <div className="text-xs font-extrabold text-[#EC008C] tabular-nums pt-0.5">
                          {prod.priceRange}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-black/[0.05] dark:border-white/[0.08] flex items-center justify-between gap-2 px-1">
                      <button
                        type="button"
                        onClick={() => handleAddOfficialCatalogItem(prod)}
                        className="keep-white-text flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-[#EC008C] hover:bg-[#d4007d] text-white text-xs font-extrabold text-center transition-colors cursor-pointer"
                      >
                        {feedback ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>{feedback}</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-3.5 h-3.5" />
                            <span>افزودن به سبد خرید</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
          </motion.div>
        </AnimatePresence>

        {visibleOfficialCount < filteredOfficialCatalog.length && (
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              type="button"
              onClick={() => setVisibleOfficialCount((v) => v + 24)}
              className="keep-white-text px-6 py-2.5 rounded-full bg-[#EC008C] hover:bg-[#d4007d] text-white text-xs sm:text-sm font-extrabold cursor-pointer"
            >
              نمایش ۲۴ محصول بیشتر
            </button>
            <button
              type="button"
              onClick={() =>
                setVisibleOfficialCount(filteredOfficialCatalog.length)
              }
              className="px-6 py-2.5 rounded-full bg-[#F4F5F8] dark:bg-[#242731] text-[#1D1D1F] dark:text-white text-xs sm:text-sm font-extrabold cursor-pointer"
            >
              نمایش تمام {filteredOfficialCatalog.length} محصول
            </button>
          </div>
        )}
      </div>

      {/* Clean Apple Quick-View Modal */}
      {quickViewProduct && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`مشاهده سریع: ${quickViewProduct.name}`}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="w-full max-w-2xl rounded-[32px] bg-white dark:bg-[#161617] border border-black/[0.08] dark:border-white/[0.12] p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
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
                aria-label="بستن پنجره مشاهده سریع"
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

            <p className="text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
              {quickViewProduct.description}
            </p>

            {quickViewProduct.requiresVariant && (
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#1D1D1F] dark:text-white">
                  انتخاب ظرفیت موتور:
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {quickViewProduct.variants.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setQuickViewVariant(v.label)}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                        quickViewVariant === v.label
                          ? 'keep-white-text bg-[#EC008C] border-[#EC008C] text-white'
                          : 'bg-[#F5F5F7] dark:bg-[#242426] border-transparent text-[#1D1D1F] dark:text-white'
                      }`}
                    >
                      <div className="text-sm font-bold">{v.label}</div>
                      <div className="text-xs opacity-90 tabular-nums">
                        {formatAudCents(v.priceCents)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-black/[0.06] dark:border-white/[0.08]">
              <button
                type="button"
                onClick={() => {
                  handleDirectAdd(
                    quickViewProduct,
                    quickViewProduct.requiresVariant ? quickViewVariant : null
                  );
                  setQuickViewProduct(null);
                }}
                className="apple-pill-btn keep-white-text inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#EC008C] hover:bg-[#d4007d] text-white text-sm font-bold cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>افزودن به سبد خرید</span>
              </button>

              <Link
                href={quickViewProduct.path}
                onClick={() => setQuickViewProduct(null)}
                className="inline-flex items-center gap-1 text-sm font-bold text-[#EC008C]"
              >
                <span>مشاهده کامل مشخصات</span>
                <ChevronLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
