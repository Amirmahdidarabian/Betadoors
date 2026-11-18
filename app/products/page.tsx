'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  X,
  Layers,
  Grid3X3,
  Sparkles,
  ShoppingBag,
  FileText,
  ChevronLeft,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { SiteShell } from '@/components/layout/SiteShell';
import { DeFiPageHeroStage } from '@/components/hero/DeFiPageHeroStage';
import { ProductTechnicalArtwork } from '@/components/brand/ProductTechnicalArtwork';
import { BetaReferenceProductCard } from '@/components/shop/BetaReferenceProductCard';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import {
  BETA_OFFICIAL_CATEGORIES,
  BETA_ALL_OFFICIAL_PRODUCTS,
  type BetaOfficialProductItem,
} from '@/lib/beta-official-catalog';

export default function ProductsPage() {
  const pathname = usePathname();
  const [selectedCatId, setSelectedCatId] = useState<string>('all');
  const [selectedSubId, setSelectedSubId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(24);
  const [quickPreviewProduct, setQuickPreviewProduct] =
    useState<BetaOfficialProductItem | null>(null);

  // Sync URL query params (?cat=...&sub=...&q=...)
  useEffect(() => {
    const syncFromUrl = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const catParam = params.get('cat');
        const subParam = params.get('sub');
        const qParam = params.get('q') || params.get('product');
        if (
          catParam &&
          BETA_OFFICIAL_CATEGORIES.some((c) => c.id === catParam)
        ) {
          setSelectedCatId(catParam);
        }
        if (subParam) {
          setSelectedSubId(subParam);
        } else {
          setSelectedSubId('all');
        }
        if (qParam) {
          setSearchQuery(qParam);
        }
      } catch {
        // ignore
      }
    };
    syncFromUrl();
    window.addEventListener('popstate', syncFromUrl);
    return () => window.removeEventListener('popstate', syncFromUrl);
  }, [pathname]);

  const activeCategory = useMemo(
    () =>
      BETA_OFFICIAL_CATEGORIES.find((c) => c.id === selectedCatId) || null,
    [selectedCatId]
  );

  const filteredProducts = useMemo(() => {
    return BETA_ALL_OFFICIAL_PRODUCTS.filter((prod) => {
      if (selectedCatId !== 'all' && prod.categoryId !== selectedCatId) {
        return false;
      }
      if (selectedSubId !== 'all' && prod.subCategoryId !== selectedSubId) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const match =
          prod.title.toLowerCase().includes(q) ||
          prod.categoryTitle.toLowerCase().includes(q) ||
          prod.subCategoryTitle.toLowerCase().includes(q) ||
          prod.sku.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [selectedCatId, selectedSubId, searchQuery]);

  const visibleProducts = useMemo(
    () => filteredProducts.slice(0, visibleCount),
    [filteredProducts, visibleCount]
  );

  const handleSelectCat = (catId: string) => {
    setSelectedCatId(catId);
    setSelectedSubId('all');
    setVisibleCount(24);
  };

  const handleSelectSub = (subId: string) => {
    setSelectedSubId(subId);
    setVisibleCount(24);
  };

  return (
    <SiteShell>
      {/* 1. Clean Apple Header */}
      <DeFiPageHeroStage
        ariaLabel="کاتالوگ جامع محصولات شرکت بتا"
        badgeText="مرجع فنی و کاتالوگ رسمی شرکت بتا (BETA.IR)"
        badgeHref="/about-us"
        headlinePrimary="کاتالوگ فنی ۱۱ گروه و ۳۷۰ محصول رسمی شرکت بتا."
        headlineGradient=""
        subheadline="مرجع کامل بررسی مشخصات فنی، کدهای مهندسی (SKU) و زیرمجموعه‌های تخصصی شرکت بتا (حضور و غیاب و UHF، ریموت، مدار کنترل، درب بازکن، سیستم‌های امنیتی، موتور کرکره، راهبند، اپراتور شیشه برقی، آرام‌بند، قفل برقی و UPS)."
        primaryCtaLabel="ورود به فروشگاه آنلاین (خرید مستقیم)"
        primaryCtaHref="/shop"
        secondaryCtaLabel="مشاوره و استعلام"
        secondaryCtaHref="#products-enquiry"
        scrollTargetId="products-catalog"
        topLeftNode={{ label: 'گروه‌های اصلی', metric: '۱۱ گروه تخصصی' }}
        topRightNode={{ label: 'زیرمجموعه‌ها', metric: '۴۵ زیرگروه' }}
        bottomLeftNode={{
          label: 'تعداد کل محصولات',
          metric: `${BETA_ALL_OFFICIAL_PRODUCTS.length} محصول رسمی`,
        }}
        bottomRightNode={{ label: 'کاربری بخش', metric: 'کاتالوگ و مشخصات فنی' }}
        horizonSlides={[]}
      />

      {/* Clear Comparison Strip: Difference Between کاتالوگ محصولات vs فروشگاه آنلاین */}
      <section className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="rounded-[26px] bg-white dark:bg-[#161617] border border-black/[0.06] dark:border-white/[0.1] p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 gap-4 shadow-[0_8px_28px_rgba(0,0,0,0.03)]">
          <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-[#EC008C]/[0.06] dark:bg-[#EC008C]/[0.12] border border-[#EC008C]/25">
            <div className="w-10 h-10 rounded-xl bg-[#EC008C] text-white flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="text-xs font-extrabold text-[#EC008C]">
                شما در بخش «محصولات (کاتالوگ فنی)» هستید
              </div>
              <div className="text-sm font-black text-[#1D1D1F] dark:text-white">
                مرجع کامل ۳۷۰ محصول، ۴۵ زیرگروه، مشخصات فنی و کدهای کالا
              </div>
              <p className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                مخصوص آشنایی با تمام تولیدات کارخانه بتا، بررسی زیرگروه‌های تخصصی
                (مانند اکسس کنترل، EM Reader، بردهای فرمان و تگ‌ها) و استعلام
                فنی پروژه‌ها.
              </p>
            </div>
          </div>

          <div className="flex items-start justify-between gap-3.5 p-3 rounded-2xl bg-[#F4F5F8] dark:bg-[#1E2029] border border-black/[0.05] dark:border-white/[0.08]">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#1D1D1F] dark:bg-white/10 text-white flex items-center justify-center shrink-0">
                <ShoppingBag className="w-5 h-5 text-[#EC008C]" />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-extrabold text-[#6E6E73] dark:text-[#A1A1A6]">
                  تفاوت با «فروشگاه آنلاین»
                </div>
                <div className="text-sm font-black text-[#1D1D1F] dark:text-white">
                  خرید مستقیم اینترنتی، پکیج‌های آماده نصب و افزودن آنی به سبد خرید
                </div>
                <p className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                  در فروشگاه آنلاین می‌توانید پکیج‌های کامل نصب یا تک‌محصولات را با
                  انتخاب ظرفیت موتور مستقیماً به سبد خرید اضافه و آنلاین سفارش
                  دهید.
                </p>
              </div>
            </div>
            <Link
              href="/shop"
              className="keep-white-text shrink-0 self-center inline-flex items-center gap-1 px-4 py-2 rounded-full bg-[#EC008C] hover:bg-[#d4007d] text-white text-xs font-extrabold"
            >
              <span>فروشگاه آنلاین</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. All 11 Official Main Categories Visual Overview Grid */}
      <section
        id="products-catalog"
        className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6 space-y-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#EC008C]">
              <Layers className="w-4 h-4" />
              <span>۱۱ گروه اصلی محصولات شرکت بتا</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1D1D1F] dark:text-white mt-1">
              انتخاب گروه تخصصی محصولات
            </h2>
          </div>

          <button
            type="button"
            onClick={() => {
              setSelectedCatId('all');
              setSelectedSubId('all');
              setSearchQuery('');
              setVisibleCount(36);
            }}
            className={`apple-pill-btn px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold cursor-pointer ${
              selectedCatId === 'all'
                ? 'keep-white-text bg-[#EC008C] text-white shadow-md'
                : 'bg-white dark:bg-[#161617] text-[#1D1D1F] dark:text-white border border-black/[0.08] dark:border-white/[0.12]'
            }`}
          >
            نمایش همه ۱۱ گروه ({BETA_ALL_OFFICIAL_PRODUCTS.length} محصول)
          </button>
        </div>

        {/* 11 Official Categories Cards matching beta.ir/product */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {BETA_OFFICIAL_CATEGORIES.map((cat) => {
            const totalCatProducts = cat.subCategories.reduce(
              (acc, s) => acc + s.products.length,
              0
            );
            const isSelected = selectedCatId === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleSelectCat(cat.id)}
                className={`group text-right rounded-[24px] p-3 transition-all flex flex-col justify-between cursor-pointer border ${
                  isSelected
                    ? 'bg-white dark:bg-[#1E2029] border-[#EC008C] ring-2 ring-[#EC008C]/30 shadow-lg'
                    : 'bg-white/90 dark:bg-[#161617] border-black/[0.06] dark:border-white/[0.08] hover:border-[#EC008C]/50'
                }`}
              >
                <div className="aspect-[16/10] w-full rounded-2xl bg-[#ECECEE] overflow-hidden flex items-center justify-center p-2 mb-2.5 border border-black/[0.04]">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <div
                    className={`text-xs sm:text-[13px] font-black line-clamp-1 ${
                      isSelected
                        ? 'text-[#EC008C]'
                        : 'text-[#1D1D1F] dark:text-white group-hover:text-[#EC008C]'
                    }`}
                  >
                    {cat.title}
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-[#6E6E73] dark:text-[#A1A1A6]">
                    <span>{cat.subCategories.length} زیرگروه</span>
                    <span className="font-bold text-[#EC008C] tabular-nums">
                      {totalCatProducts} محصول
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Horizontal Level-2 Sub-Category Bar + Search Filter (With Smooth Sliding Pill Animation) */}
        <div className="rounded-[28px] bg-white dark:bg-[#161617] border border-black/[0.06] dark:border-white/[0.1] p-4 sm:p-5 space-y-4 shadow-[0_12px_32px_rgba(0,0,0,0.04)]">
          {activeCategory && (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-center gap-2 pb-3 border-b border-black/[0.06] dark:border-white/[0.08]"
              >
                <span className="text-xs font-extrabold text-[#86868B] pl-2">
                  زیرمجموعه‌های {activeCategory.title}:
                </span>
                <button
                  type="button"
                  onClick={() => handleSelectSub('all')}
                  onMouseEnter={() => handleSelectSub('all')}
                  className={`relative z-10 px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-colors duration-200 cursor-pointer ${
                    selectedSubId === 'all'
                      ? 'keep-white-text text-white'
                      : 'bg-[#F4F5F8] dark:bg-[#242731] text-[#3A3A3C] dark:text-[#E5E5EA] hover:text-[#EC008C]'
                  }`}
                >
                  {selectedSubId === 'all' && (
                    <motion.span
                      layoutId={`products-page-sub-pill-${activeCategory.id}`}
                      transition={{
                        type: 'spring',
                        stiffness: 420,
                        damping: 32,
                      }}
                      className="absolute inset-0 rounded-full bg-[#EC008C] shadow-[0_6px_18px_rgba(236,0,140,0.32)] -z-10"
                    />
                  )}
                  <span className="relative z-10">همه زیرگروه‌ها</span>
                </button>
                {activeCategory.subCategories.map((sub) => {
                  const isSubSelected = selectedSubId === sub.id;
                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => handleSelectSub(sub.id)}
                      onMouseEnter={() => handleSelectSub(sub.id)}
                      className={`relative z-10 px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors duration-200 cursor-pointer ${
                        isSubSelected
                          ? 'keep-white-text text-white font-extrabold'
                          : 'bg-[#F4F5F8] dark:bg-[#242731] text-[#3A3A3C] dark:text-[#E5E5EA] hover:text-[#EC008C]'
                      }`}
                    >
                      {isSubSelected && (
                        <motion.span
                          layoutId={`products-page-sub-pill-${activeCategory.id}`}
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

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#86868B] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(24);
                }}
                placeholder="جستجوی نام یا مدل در بین ۳۷۰ محصول بتا (مثلاً F600، 2208، Z7-GSM، سیموت...)"
                aria-label="جستجو در کاتالوگ محصولات بتا"
                className="w-full pr-10 pl-4 py-2.5 rounded-full bg-[#F4F5F8] dark:bg-[#242731] border border-transparent focus:border-[#EC008C] text-xs sm:text-sm text-[#1D1D1F] dark:text-white focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 text-xs sm:text-sm font-bold text-[#6E6E73] dark:text-[#A1A1A6]">
              <span className="inline-flex items-center gap-1.5">
                <Grid3X3 className="w-4 h-4 text-[#EC008C]" />
                <span>
                  نمایش{' '}
                  <strong className="text-[#1D1D1F] dark:text-white tabular-nums">
                    {visibleProducts.length}
                  </strong>{' '}
                  از{' '}
                  <strong className="text-[#EC008C] tabular-nums">
                    {filteredProducts.length}
                  </strong>{' '}
                  محصول
                </span>
              </span>
              {visibleProducts.length < filteredProducts.length && (
                <button
                  type="button"
                  onClick={() => setVisibleCount(filteredProducts.length)}
                  className="text-xs font-extrabold text-[#EC008C] hover:underline cursor-pointer"
                >
                  نمایش یکجای همه ({filteredProducts.length})
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Official Products Grid (Using BetaReferenceProductCard + Authentic beta.ir Product Images) */}
      <section className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
        {visibleProducts.length === 0 ? (
          <div className="rounded-[32px] bg-white dark:bg-[#161617] border border-black/[0.06] dark:border-white/[0.1] p-12 text-center space-y-4">
            <div className="text-lg font-black text-[#1D1D1F] dark:text-white">
              محصولی مطابق با عبارت جستجو شده یافت نشد.
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedCatId('all');
                setSelectedSubId('all');
                setSearchQuery('');
              }}
              className="keep-white-text px-6 py-2.5 rounded-full bg-[#EC008C] text-white text-sm font-bold cursor-pointer"
            >
              نمایش همه محصولات بتا
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {visibleProducts.map((prod, idx) => (
              <BetaReferenceProductCard
                key={prod.id}
                id={prod.id}
                sku={prod.sku}
                title={prod.title}
                priceText={prod.priceRange}
                description={`گروه ${prod.categoryTitle} · زیرمجموعه ${prod.subCategoryTitle} — محصول اصلی شرکت بتا با گارانتی و خدمات پس از فروش معتبر.`}
                href={prod.internalHref}
                artworkType={prod.artwork}
                customImageUrl={prod.image}
                ctaMode="select_model"
                onQuickView={() => setQuickPreviewProduct(prod)}
                index={idx}
              />
            ))}
          </div>
        )}

        {visibleProducts.length < filteredProducts.length && (
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 24)}
              className="apple-pill-btn keep-white-text px-8 py-3.5 rounded-full bg-[#EC008C] hover:bg-[#d4007d] text-white text-sm font-extrabold shadow-lg cursor-pointer"
            >
              نمایش ۲۴ محصول بعدی (باقی‌مانده:{' '}
              {filteredProducts.length - visibleProducts.length} محصول)
            </button>
            <button
              type="button"
              onClick={() => setVisibleCount(filteredProducts.length)}
              className="apple-pill-btn px-6 py-3.5 rounded-full bg-white dark:bg-[#1E2029] border border-black/[0.08] dark:border-white/[0.12] text-[#1D1D1F] dark:text-white text-sm font-extrabold cursor-pointer"
            >
              نمایش تمام {filteredProducts.length} محصول
            </button>
          </div>
        )}
      </section>

      {/* 4. Enquiry Section */}
      <section
        id="products-enquiry"
        className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <EnquiryForm
          sourcePagePath="/products"
          heading="مشاوره انتخاب محصول و فروش سازمانی."
          subheading="کارشناسان شرکت بتا (۰۲۱-۸۸۴۰۴۴۰۷) آماده پاسخگویی به شما هستند."
        />
      </section>

      {/* Product Quick View Modal */}
      {quickPreviewProduct && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`مشاهده سریع ${quickPreviewProduct.title}`}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="w-full max-w-xl rounded-[32px] bg-white dark:bg-[#161617] border border-black/[0.08] dark:border-white/[0.12] p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div
                  className="text-xs font-bold text-[#64748B] uppercase"
                  dir="ltr"
                >
                  {quickPreviewProduct.sku}
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#1D1D1F] dark:text-white mt-1">
                  {quickPreviewProduct.title}
                </h2>
                <div className="mt-1 inline-flex items-center gap-1.5 text-xs font-bold text-[#EC008C]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    {quickPreviewProduct.categoryTitle} /{' '}
                    {quickPreviewProduct.subCategoryTitle}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setQuickPreviewProduct(null)}
                className="w-9 h-9 rounded-full bg-[#F5F5F7] dark:bg-[#242426] flex items-center justify-center text-[#1D1D1F] dark:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-[#ECECEE] border border-black/[0.04]">
              <ProductTechnicalArtwork
                type={quickPreviewProduct.artwork}
                customImageUrl={quickPreviewProduct.image}
                title={quickPreviewProduct.title}
                className="w-full h-full"
              />
            </div>

            <div className="text-xl font-black text-[#EC008C] tabular-nums">
              {quickPreviewProduct.priceRange}
            </div>

            <p className="text-sm text-[#64748B] dark:text-[#A1A1A6] leading-relaxed">
              محصول رسمی شرکت بتا در گروه «{quickPreviewProduct.categoryTitle}» و
              زیرمجموعه «{quickPreviewProduct.subCategoryTitle}» با گارانتی و
              پشتیبانی فنی مستقیم دفتر مرکزی تهران.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <Link
                href={quickPreviewProduct.internalHref}
                onClick={() => setQuickPreviewProduct(null)}
                className="apple-pill-btn keep-white-text flex-1 py-3.5 px-6 rounded-full bg-[#EC008C] hover:bg-[#d4007d] text-white text-sm font-bold text-center"
              >
                مشاهده مشخصات و سفارش
              </Link>
              <button
                type="button"
                onClick={() => setQuickPreviewProduct(null)}
                className="px-5 py-3.5 rounded-full bg-[#F5F5F7] dark:bg-[#242426] text-sm font-bold text-[#1D1D1F] dark:text-white cursor-pointer"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}
    </SiteShell>
  );
}
