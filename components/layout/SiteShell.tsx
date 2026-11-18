'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShoppingBag,
  Menu,
  X,
  Phone,
  ChevronDown,
  ChevronLeft,
  Lock,
  Sun,
  Moon,
  LogOut,
  Home,
  Boxes,
  Wrench,
  Video,
  FileText,
  HelpCircle,
  DownloadCloud,
  FileSpreadsheet,
  PhoneCall,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useBetaDoors } from '@/components/providers/BetaDoorsProvider';
import { BetaDoorsLogo } from '@/components/brand/BetaDoorsLogo';
import { formatAudCents } from '@/lib/domain-logic';
import { AdminHoverEditor } from '@/components/cms/AdminHoverEditor';
import {
  BETA_OFFICIAL_CATEGORIES,
  BETA_ALL_OFFICIAL_PRODUCTS,
} from '@/lib/beta-official-catalog';

interface SubMenuLink {
  label: string;
  href: string;
}

interface TopNavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  isProductsMega?: boolean;
  subItems?: SubMenuLink[];
}

const TOP_NAV_ITEMS: TopNavItem[] = [
  {
    id: 'home',
    label: 'صفحه اصلی',
    href: '/',
    icon: Home,
  },
  {
    id: 'products',
    label: 'محصولات',
    href: '/products',
    icon: Boxes,
    isProductsMega: true,
  },
  {
    id: 'shop',
    label: 'فروشگاه آنلاین',
    href: '/shop',
    icon: ShoppingBag,
  },
  {
    id: 'services',
    label: 'خدمات پس از فروش',
    href: '/services',
    icon: Wrench,
  },
  {
    id: 'education',
    label: 'محتوای آموزشی',
    href: '/beta-doors-manuals',
    icon: Video,
    subItems: [
      { label: 'نقشه راهنمای بردها', href: '/beta-doors-manuals?tab=boards' },
      { label: 'فیلم و ویدئو آموزشی', href: '/beta-doors-manuals?tab=videos' },
    ],
  },
  {
    id: 'articles',
    label: 'مقالات',
    href: '/beta-smart-support',
    icon: FileText,
    subItems: [
      {
        label: 'مقالات سیستم های امنیتی حفاظتی',
        href: '/beta-smart-support?topic=security',
      },
      {
        label: 'مقالات تکنولوژی',
        href: '/beta-smart-support?topic=technology',
      },
    ],
  },
  {
    id: 'faq',
    label: 'سوالات متداول',
    href: '/beta-smart-support',
    icon: HelpCircle,
  },
  {
    id: 'apps',
    label: 'دانلود اپلیکیشن',
    href: '/beta-doors-manuals',
    icon: DownloadCloud,
  },
  {
    id: 'about',
    label: 'درباره ما',
    href: '/about-us',
    icon: FileSpreadsheet,
  },
  {
    id: 'contact',
    label: 'تماس با ما',
    href: '/contact-us',
    icon: PhoneCall,
    subItems: [
      { label: 'تماس با ما', href: '/contact-us' },
      { label: 'نظرات و پیشنهادات', href: '/contact-us?tab=feedback' },
      { label: 'ثبت شکایات مشتریان', href: '/contact-us?tab=complaints' },
    ],
  },
];

export function SiteShell({
  children,
  previewBanner,
}: {
  children: React.ReactNode;
  previewBanner?: {
    isDraftPreview: boolean;
    pageSlug: string;
    revision: number;
  } | null;
}) {
  const pathname = usePathname() || '/';
  const { cartTotals, actor, setActorKey } = useBetaDoors();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>(
    BETA_OFFICIAL_CATEGORIES[0]?.id || null
  );
  const [productsMenuOpen, setProductsMenuOpen] = useState(false);
  const [openSimpleDropdownId, setOpenSimpleDropdownId] = useState<
    string | null
  >(null);
  const [activeMainCatId, setActiveMainCatId] = useState<string>(
    BETA_OFFICIAL_CATEGORIES[0]?.id || 'attendance-uhf-rfid'
  );
  const [activeSubCatId, setActiveSubCatId] = useState<string>(
    BETA_OFFICIAL_CATEGORIES[0]?.subCategories[0]?.id || ''
  );
  const [hoveredNavId, setHoveredNavId] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const closeTimeoutRef = useRef<number | null>(null);

  const isStaff =
    pathname.startsWith('/admin') &&
    (actor.role === 'administrator' ||
      actor.role === 'content_editor' ||
      actor.role === 'shop_manager' ||
      actor.role === 'support_staff');

  useEffect(() => {
    try {
      const savedTheme = window.localStorage.getItem('betadoors_theme_mode');
      const resolvedTheme: 'light' | 'dark' =
        savedTheme === 'dark' ? 'dark' : 'light';

      const timer = window.setTimeout(() => {
        setTheme(resolvedTheme);
      }, 0);

      if (resolvedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      document.documentElement.setAttribute('data-font', 'iransans');
      window.localStorage.setItem('betadoors_persian_font', 'iransans');

      return () => window.clearTimeout(timer);
    } catch {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-font', 'iransans');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const clearCloseTimer = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const openProductsFlyout = () => {
    clearCloseTimer();
    setOpenSimpleDropdownId(null);
    setProductsMenuOpen(true);
  };

  const closeProductsFlyoutWithDelay = () => {
    clearCloseTimer();
    closeTimeoutRef.current = window.setTimeout(() => {
      setProductsMenuOpen(false);
      setOpenSimpleDropdownId(null);
    }, 180);
  };

  const handleSelectMainCategory = (catId: string) => {
    setActiveMainCatId(catId);
    const found = BETA_OFFICIAL_CATEGORIES.find((c) => c.id === catId);
    if (found && found.subCategories.length > 0) {
      setActiveSubCatId(found.subCategories[0].id);
    }
  };

  const handleSelectSubCategory = (subId: string) => {
    if (subId !== activeSubCatId) {
      setActiveSubCatId(subId);
    }
  };

  const activeMainCategory =
    BETA_OFFICIAL_CATEGORIES.find((c) => c.id === activeMainCatId) ||
    BETA_OFFICIAL_CATEGORIES[0];

  const activeSubCategory =
    activeMainCategory?.subCategories.find((s) => s.id === activeSubCatId) ||
    activeMainCategory?.subCategories[0];

  const toggleTheme = () => {
    const next: 'light' | 'dark' = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try {
      window.localStorage.setItem('betadoors_theme_mode', next);
    } catch {
      // ignore storage errors
    }
    if (next === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const isActivePath = (href: string) => {
    const cleanHref = href.split('?')[0].replace(/\/$/, '') || '/';
    const cleanCurrent = pathname.replace(/\/$/, '') || '/';
    if (cleanHref === '/') return cleanCurrent === '/';
    return (
      cleanCurrent === cleanHref || cleanCurrent.startsWith(`${cleanHref}/`)
    );
  };

  return (
    <div
      dir="rtl"
      className="relative min-h-screen flex flex-col bg-[#F4F5F8] dark:bg-[#07090E] text-[#1D1D1F] dark:text-[#F5F5F7] selection:bg-[#EC008C] selection:text-white transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-x-clip"
    >

      {/* Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:right-3 focus:z-[100] focus:px-5 focus:py-2.5 focus:bg-[#EC008C] focus:text-white focus:rounded-full focus:font-semibold"
      >
        پرش به محتوای اصلی صفحه
      </a>

      {/* Draft Preview Banner */}
      {previewBanner?.isDraftPreview && (
        <div
          role="region"
          aria-label="Draft Preview Mode Banner"
          className="relative z-40 bg-amber-500/15 border-b border-amber-500/30 px-4 py-2.5 text-sm text-amber-900 dark:text-amber-200 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-bold text-xs">
              پیش‌نویس
            </span>
            <span>
              در حال مشاهده پیش‌نویس صفحه{' '}
              <strong>{previewBanner.pageSlug}</strong> (نسخه #
              {previewBanner.revision}).
            </span>
          </div>
          <Link
            href="/admin"
            className="underline font-semibold hover:opacity-80"
          >
            بازگشت به پنل مدیریت
          </Link>
        </div>
      )}

      {/* Authenticated Staff Ribbon (Only visible on /admin routes) */}
      {isStaff && (
        <div
          data-admin-editor-ui="true"
          className="relative z-40 bg-[#1D1D1F] border-b border-white/10 px-4 sm:px-6 py-2 text-xs text-slate-200"
        >
          <div className="max-w-[1360px] mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="keep-white-text inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#EC008C] text-white font-bold">
                <Lock className="w-3 h-3" />
                <span>پنل مدیریت بتا</span>
              </span>
              <span className="text-slate-300 hidden sm:inline">
                {actor.displayName} ({actor.email})
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/admin"
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
              >
                داشبورد مدیریت
              </Link>
              <button
                type="button"
                onClick={() => setActorKey('guest')}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 cursor-pointer"
              >
                <LogOut className="w-3 h-3" />
                <span>خروج</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Official beta.ir + Apple.com Animated Multi-Level Navigation Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        onMouseLeave={closeProductsFlyoutWithDelay}
        className={`sticky top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled || productsMenuOpen
            ? 'bg-white/95 dark:bg-[#121318]/95 backdrop-blur-2xl shadow-[0_10px_34px_rgba(0,0,0,0.06)] dark:shadow-[0_14px_40px_rgba(0,0,0,0.45)] border-b border-black/[0.08] dark:border-white/[0.12]'
            : 'bg-white/88 dark:bg-[#121318]/88 backdrop-blur-xl border-b border-black/[0.05] dark:border-white/[0.08]'
        }`}
      >
        <div className="max-w-[1420px] mx-auto px-3 sm:px-6 lg:px-8 h-[68px] flex items-center justify-between gap-3">
          {/* Zone 1: Official Beta Logo Mark Only */}
          <Link
            href="/"
            aria-label="شرکت بتا — صفحه اصلی"
            className="inline-flex items-center shrink-0 focus:outline-none"
          >
            <BetaDoorsLogo className="h-10 w-auto" />
          </Link>

          {/* Zone 2: Full Official beta.ir Navigation Items (Matching image_074d521e.png) */}
          <nav
            aria-label="منوی اصلی وب‌سایت شرکت بتا"
            onMouseLeave={() => setHoveredNavId(null)}
            className="hidden lg:flex items-center gap-0.5 xl:gap-1"
          >
            {TOP_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = isActivePath(item.href);
              const isProductsItem = Boolean(item.isProductsMega);
              const hasSimpleSub = Boolean(item.subItems?.length);
              const isHovered =
                hoveredNavId === item.id ||
                (isProductsItem && productsMenuOpen) ||
                (hasSimpleSub && openSimpleDropdownId === item.id);

              if (isProductsItem) {
                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => {
                      setHoveredNavId(item.id);
                      openProductsFlyout();
                    }}
                  >
                    <Link
                      href={item.href}
                      aria-expanded={productsMenuOpen}
                      aria-haspopup="true"
                      className={`relative inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-[13.5px] xl:text-[14.5px] transition-colors duration-300 whitespace-nowrap ${
                        active || productsMenuOpen
                          ? 'text-[#EC008C] font-extrabold'
                          : 'text-[#1D1D1F] dark:text-[#F5F5F7] hover:text-[#EC008C] dark:hover:text-[#EC008C] font-bold'
                      }`}
                    >
                      {isHovered && (
                        <motion.span
                          layoutId="apple-navbar-hover-pill"
                          transition={{
                            type: 'spring',
                            stiffness: 420,
                            damping: 32,
                          }}
                          className="absolute inset-0 rounded-full bg-black/[0.05] dark:bg-white/[0.09] -z-10"
                        />
                      )}
                      <Icon className="w-3.5 h-3.5 opacity-60 hidden xl:inline-block" />
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          productsMenuOpen
                            ? 'rotate-180 text-[#EC008C]'
                            : 'opacity-65'
                        }`}
                      />
                    </Link>
                  </div>
                );
              }

              if (hasSimpleSub && item.subItems) {
                const subOpen = openSimpleDropdownId === item.id;
                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => {
                      clearCloseTimer();
                      setProductsMenuOpen(false);
                      setHoveredNavId(item.id);
                      setOpenSimpleDropdownId(item.id);
                    }}
                    onMouseLeave={() => setOpenSimpleDropdownId(null)}
                  >
                    <Link
                      href={item.href}
                      aria-expanded={subOpen}
                      className={`relative inline-flex items-center gap-1 px-2.5 xl:px-3 py-2 rounded-full text-[13px] xl:text-[14px] transition-colors duration-300 whitespace-nowrap ${
                        active || subOpen
                          ? 'text-[#EC008C] font-bold'
                          : 'text-[#1D1D1F]/90 dark:text-[#F5F5F7]/90 hover:text-[#1D1D1F] dark:hover:text-white font-semibold'
                      }`}
                    >
                      {isHovered && (
                        <motion.span
                          layoutId="apple-navbar-hover-pill"
                          transition={{
                            type: 'spring',
                            stiffness: 420,
                            damping: 32,
                          }}
                          className="absolute inset-0 rounded-full bg-black/[0.05] dark:bg-white/[0.09] -z-10"
                        />
                      )}
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          subOpen ? 'rotate-180 text-[#EC008C]' : 'opacity-60'
                        }`}
                      />
                    </Link>

                    <div
                      className={`absolute right-0 top-full pt-2 w-60 z-50 origin-top transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        subOpen
                          ? 'opacity-100 translate-y-0 scale-y-100 pointer-events-auto visible'
                          : 'opacity-0 -translate-y-2 scale-y-90 pointer-events-none invisible'
                      }`}
                    >
                      <div className="rounded-2xl bg-white/95 dark:bg-[#181920]/95 backdrop-blur-2xl border border-black/[0.08] dark:border-white/[0.14] p-2 shadow-xl space-y-1">
                        {item.subItems.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setOpenSimpleDropdownId(null)}
                            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-[#EC008C]/10 hover:text-[#EC008C] transition-colors"
                          >
                            <span>{sub.label}</span>
                            <ChevronLeft className="w-3.5 h-3.5 opacity-60" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onMouseEnter={() => {
                    setHoveredNavId(item.id);
                    setOpenSimpleDropdownId(null);
                  }}
                  className={`relative px-2.5 xl:px-3 py-2 rounded-full text-[13px] xl:text-[14px] transition-colors duration-300 whitespace-nowrap ${
                    active
                      ? 'text-[#EC008C] font-bold'
                      : 'text-[#1D1D1F]/90 dark:text-[#F5F5F7]/90 hover:text-[#1D1D1F] dark:hover:text-white font-semibold'
                  }`}
                >
                  {isHovered && (
                    <motion.span
                      layoutId="apple-navbar-hover-pill"
                      transition={{
                        type: 'spring',
                        stiffness: 420,
                        damping: 32,
                      }}
                      className="absolute inset-0 rounded-full bg-black/[0.05] dark:bg-white/[0.09] -z-10"
                    />
                  )}
                  <span>{item.label}</span>
                  {active && (
                    <motion.span
                      layoutId="apple-navbar-active-dot"
                      className="absolute bottom-0.5 right-3 left-3 h-[2px] rounded-full bg-[#EC008C]"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Theme Toggle + Bag + Primary Pill CTA */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              data-testid="theme-toggle-button"
              onClick={toggleTheme}
              aria-label={
                theme === 'dark' ? 'تغییر به حالت روشن' : 'تغییر به حالت تیره'
              }
              title={
                theme === 'dark' ? 'تغییر به حالت روشن' : 'تغییر به حالت تیره'
              }
              className="apple-pill-btn relative overflow-hidden inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/[0.05] dark:bg-white/[0.08] hover:bg-black/[0.09] dark:hover:bg-white/[0.14] text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7] transition-all duration-500 cursor-pointer whitespace-nowrap"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                  <motion.span
                    key="sun-mode"
                    initial={{ opacity: 0, rotate: -65, scale: 0.7, y: 6 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1, y: 0 }}
                    exit={{ opacity: 0, rotate: 65, scale: 0.7, y: -6 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-flex items-center gap-1.5"
                  >
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span className="hidden sm:inline">روشن</span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon-mode"
                    initial={{ opacity: 0, rotate: 65, scale: 0.7, y: 6 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1, y: 0 }}
                    exit={{ opacity: 0, rotate: -65, scale: 0.7, y: -6 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-flex items-center gap-1.5"
                  >
                    <Moon className="w-3.5 h-3.5 text-[#1D1D1F]" />
                    <span className="hidden sm:inline">تیره</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <Link
              href="/cart"
              aria-label={`سبد خرید با ${cartTotals.itemCount} کالا، جمع کل ${formatAudCents(cartTotals.totalCents)}`}
              className="apple-pill-btn inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/[0.05] dark:bg-white/[0.08] hover:bg-black/[0.09] dark:hover:bg-white/[0.14] text-xs font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] transition-all whitespace-nowrap"
            >
              <ShoppingBag className="w-4 h-4 text-[#EC008C]" />
              <span className="tabular-nums">{cartTotals.itemCount}</span>
            </Link>

            <button
              type="button"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={mobileMenuOpen ? 'بستن منو' : 'باز کردن منو'}
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="lg:hidden p-2 rounded-full bg-black/[0.05] dark:bg-white/[0.08] text-[#1D1D1F] dark:text-white cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* =====================================================================
            Full-Width Multi-Level Official beta.ir Products Mega-Bar
            Matches Screenshots image_828e571a.png through image_f4c94052.png:
            - Level 1: Horizontal Gray Bar with Top Pink Line & All 11 Main Categories
            - Level 2: Horizontal White Sub-Category Bar for Active Main Category
            - Level 3: All Products of Active Sub-Category + Official Category Photo
           ===================================================================== */}
        <div
          data-testid="products-slide-dropdown"
          aria-hidden={!productsMenuOpen}
          onMouseEnter={openProductsFlyout}
          onMouseLeave={closeProductsFlyoutWithDelay}
          className={`hidden lg:block absolute inset-x-0 top-full z-50 origin-top transition-all duration-450 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            productsMenuOpen
              ? 'opacity-100 translate-y-0 scale-y-100 pointer-events-auto visible'
              : 'opacity-0 -translate-y-3 scale-y-95 pointer-events-none invisible'
          }`}
        >
          <div className="border-t-[3px] border-[#EC008C] shadow-[0_28px_70px_rgba(0,0,0,0.18)] dark:shadow-[0_28px_70px_rgba(0,0,0,0.75)]">
            {/* LEVEL 1: All 11 Official Main Categories Horizontal Bar (With 120fps Spring Sliding Pill Animation) */}
            <div className="bg-[#EDEDEE] dark:bg-[#191B22] border-b border-black/[0.07] dark:border-white/[0.08]">
              <div className="max-w-[1420px] mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-start gap-1 py-1.5">
                {BETA_OFFICIAL_CATEGORIES.map((cat) => {
                  const isCatActive = cat.id === activeMainCategory?.id;
                  const hasMultipleSubs = cat.subCategories.length > 1;
                  return (
                    <Link
                      key={cat.id}
                      href={`/products?cat=${cat.id}`}
                      onMouseEnter={() => handleSelectMainCategory(cat.id)}
                      onClick={() => setProductsMenuOpen(false)}
                      className={`relative inline-flex items-center gap-1 px-3 py-2 rounded-lg text-[13px] xl:text-[13.5px] transition-colors duration-150 whitespace-nowrap ${
                        isCatActive
                          ? 'z-20 text-[#EC008C] font-extrabold'
                          : 'z-10 text-[#3A3A3C] dark:text-[#D1D1D6] hover:text-[#EC008C] font-bold'
                      }`}
                    >
                      {isCatActive && (
                        <motion.span
                          layoutId="beta-megamenu-main-category-pill"
                          transition={{
                            type: 'spring',
                            stiffness: 480,
                            damping: 36,
                            mass: 0.55,
                          }}
                          className="absolute inset-0 z-0 rounded-lg bg-white dark:bg-[#242731] shadow-[0_2px_10px_rgba(0,0,0,0.08)]"
                        />
                      )}
                      <span className="relative z-10">{cat.title}</span>
                      {hasMultipleSubs && (
                        <ChevronDown
                          className={`relative z-10 w-3.5 h-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            isCatActive
                              ? 'rotate-180 text-[#EC008C]'
                              : 'opacity-65'
                          }`}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* LEVEL 2: Sub-Categories Bar for Active Main Category (120fps Liquid Spring Pill on Hover: e.g. اکسس کنترل -> EM Reader) */}
            {activeMainCategory &&
              activeMainCategory.subCategories.length > 0 && (
                <div className="bg-white dark:bg-[#1F222B] border-b border-black/[0.06] dark:border-white/[0.08]">
                  <div className="max-w-[1420px] mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-start gap-2 py-2.5">
                    {activeMainCategory.subCategories.map((sub) => {
                      const isSubActive = sub.id === activeSubCategory?.id;
                      return (
                        <Link
                          key={sub.id}
                          href={`/products?cat=${activeMainCategory.id}&sub=${sub.id}`}
                          data-testid={`megamenu-sub-${sub.id}`}
                          onMouseEnter={() => handleSelectSubCategory(sub.id)}
                          onClick={() => setProductsMenuOpen(false)}
                          className={`relative inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] transition-colors duration-150 whitespace-nowrap ${
                            isSubActive
                              ? 'z-20 keep-white-text text-white font-extrabold'
                              : 'z-10 bg-[#F4F5F8] dark:bg-[#282C37] text-[#3A3A3C] dark:text-[#E5E5EA] hover:text-[#EC008C] font-bold'
                          }`}
                        >
                          {isSubActive && (
                            <motion.span
                              layoutId="beta-megamenu-sub-active-pill"
                              transition={{
                                type: 'spring',
                                stiffness: 480,
                                damping: 35,
                                mass: 0.55,
                              }}
                              className="absolute inset-0 z-0 rounded-full bg-[#EC008C] shadow-[0_6px_18px_rgba(236,0,140,0.34)]"
                            />
                          )}
                          <span className="relative z-10">{sub.title}</span>
                          <span
                            className={`relative z-10 text-[11px] tabular-nums px-1.5 py-0.2 rounded-full transition-colors duration-150 ${
                              isSubActive
                                ? 'bg-white/25 text-white'
                                : 'bg-black/[0.06] dark:bg-white/[0.1] text-[#6E6E73] dark:text-[#A1A1A6]'
                            }`}
                          >
                            {sub.products.length}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

            {/* LEVEL 3: All Products of Active Sub-Category (Scrollable with Hidden Visual Scrollbar + 120fps GPU Transition) */}
            {activeMainCategory && activeSubCategory && (
              <div className="bg-white dark:bg-[#14161D] overflow-hidden">
                <div className="max-w-[1420px] mx-auto px-4 sm:px-6 py-5 grid grid-cols-12 gap-6 items-start">
                  {/* Right 9 Columns: All Products in Active Sub-Category — Scrollable with Hidden Scrollbar (.no-scrollbar) */}
                  <div className="col-span-9 space-y-3 min-h-[268px]">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/[0.06] dark:border-white/[0.08] pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#EC008C]" />
                        <span className="text-sm font-black text-[#1D1D1F] dark:text-white">
                          {activeMainCategory.title}
                        </span>
                        <span className="text-xs text-[#86868B]">/</span>
                        <span className="text-sm font-bold text-[#EC008C]">
                          {activeSubCategory.title}
                        </span>
                        <span className="text-xs text-[#86868B] tabular-nums">
                          ({activeSubCategory.products.length} محصول)
                        </span>
                      </div>

                      <Link
                        href={`/products?cat=${activeMainCategory.id}&sub=${activeSubCategory.id}`}
                        onClick={() => setProductsMenuOpen(false)}
                        className="inline-flex items-center gap-1 text-xs font-extrabold text-[#EC008C] hover:underline"
                      >
                        <span>مشاهده همه در کاتالوگ</span>
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    {/* Scrollable Container with Visual Scrollbar Completely Hidden */}
                    <div className="max-h-[320px] overflow-y-auto no-scrollbar">
                      <motion.div
                        key={`${activeMainCategory.id}-${activeSubCategory.id}`}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.22,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="grid grid-cols-3 xl:grid-cols-4 gap-2.5 py-0.5 transform-gpu will-change-[opacity,transform]"
                      >
                        {activeSubCategory.products.map((prod) => (
                          <Link
                            key={prod.id}
                            href={`/products?cat=${activeMainCategory.id}&sub=${activeSubCategory.id}&q=${encodeURIComponent(prod.title)}`}
                            onClick={() => setProductsMenuOpen(false)}
                            className="group flex items-center gap-2.5 p-2 rounded-2xl bg-[#F5F5F7] dark:bg-[#1E2029] hover:bg-[#EC008C]/[0.08] dark:hover:bg-[#EC008C]/[0.18] border border-black/[0.04] dark:border-white/[0.06] hover:border-[#EC008C]/40 hover:-translate-y-0.5 transition-all duration-200"
                          >
                            <div className="w-12 h-12 rounded-xl bg-[#ECECEE] shrink-0 overflow-hidden flex items-center justify-center p-1 border border-black/[0.04]">
                              <img
                                src={prod.image}
                                alt={prod.title}
                                decoding="async"
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-xs font-bold text-[#1D1D1F] dark:text-[#F5F5F7] group-hover:text-[#EC008C] line-clamp-2 leading-snug">
                                {prod.title}
                              </div>
                              <div
                                dir="ltr"
                                className="text-[10px] font-semibold text-[#86868B] truncate mt-0.5"
                              >
                                {prod.sku}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </motion.div>
                    </div>
                  </div>

                  {/* Left 3 Columns: Official beta.ir Sub-Category / Category Showcase Card */}
                  <motion.div
                    key={`preview-${activeMainCategory.id}-${activeSubCategory.id}`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="col-span-3 rounded-3xl bg-[#F4F5F8] dark:bg-[#1E2029] border border-black/[0.06] dark:border-white/[0.08] p-4 flex flex-col justify-between space-y-3 transform-gpu"
                  >
                    <div className="aspect-[4/3] w-full rounded-2xl bg-[#ECECEE] overflow-hidden flex items-center justify-center p-3 border border-black/[0.04]">
                      <img
                        src={
                          activeSubCategory.image || activeMainCategory.image
                        }
                        alt={activeSubCategory.title}
                        decoding="async"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-[#EC008C]">
                        {activeMainCategory.title}
                      </div>
                      <div className="text-base font-black text-[#1D1D1F] dark:text-white">
                        {activeSubCategory.title}
                      </div>
                      <p className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] line-clamp-2 leading-relaxed">
                        {activeMainCategory.description}
                      </p>
                    </div>
                    <div className="pt-1 flex flex-col gap-2">
                      <Link
                        href={`/products?cat=${activeMainCategory.id}&sub=${activeSubCategory.id}`}
                        onClick={() => setProductsMenuOpen(false)}
                        className="keep-white-text w-full py-2.5 px-4 rounded-full bg-[#EC008C] hover:bg-[#d4007d] text-white text-xs font-extrabold text-center transition-colors"
                      >
                        مشاهده محصولات {activeSubCategory.title}
                      </Link>
                      <Link
                        href="/products"
                        onClick={() => setProductsMenuOpen(false)}
                        className="w-full py-2 px-4 rounded-full bg-white dark:bg-[#282C37] text-[#1D1D1F] dark:text-white text-xs font-bold text-center border border-black/[0.06] dark:border-white/[0.1] hover:border-[#EC008C]"
                      >
                        همه {BETA_ALL_OFFICIAL_PRODUCTS.length} محصول شرکت بتا
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Animated Mobile Drawer with All 11 Categories & Sub-Categories */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-nav-drawer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden overflow-hidden border-t border-black/[0.06] dark:border-white/[0.08] bg-white/98 dark:bg-[#161617]/98 backdrop-blur-2xl px-4 py-5 space-y-2 shadow-xl max-h-[82vh] overflow-y-auto"
            >
              {TOP_NAV_ITEMS.map((item) => {
                if (item.isProductsMega) {
                  return (
                    <div
                      key={item.id}
                      className="rounded-2xl bg-[#F4F5F8] dark:bg-[#1E2028] p-3 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <Link
                          href="/products"
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-sm font-black text-[#EC008C]"
                        >
                          همه محصولات شرکت بتا (۱۱ گروه اصلی)
                        </Link>
                      </div>
                      <div className="space-y-1.5">
                        {BETA_OFFICIAL_CATEGORIES.map((cat) => {
                          const isExpanded = mobileExpandedCat === cat.id;
                          return (
                            <div
                              key={cat.id}
                              className="rounded-xl bg-white dark:bg-[#14161D] border border-black/[0.05] dark:border-white/[0.07] overflow-hidden"
                            >
                              <div className="flex items-center justify-between px-3 py-2">
                                <Link
                                  href={`/products?cat=${cat.id}`}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="text-xs font-extrabold text-[#1D1D1F] dark:text-white"
                                >
                                  {cat.title}
                                </Link>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setMobileExpandedCat(
                                      isExpanded ? null : cat.id
                                    )
                                  }
                                  className="p-1 text-[#86868B]"
                                  aria-label={`زیرمجموعه‌های ${cat.title}`}
                                >
                                  <ChevronDown
                                    className={`w-4 h-4 transition-transform ${
                                      isExpanded
                                        ? 'rotate-180 text-[#EC008C]'
                                        : ''
                                    }`}
                                  />
                                </button>
                              </div>
                              {isExpanded && (
                                <div className="px-3 pb-2.5 pt-1 border-t border-black/[0.04] dark:border-white/[0.06] flex flex-wrap gap-1.5">
                                  {cat.subCategories.map((sub) => (
                                    <Link
                                      key={sub.id}
                                      href={`/products?cat=${cat.id}&sub=${sub.id}`}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className="px-2.5 py-1 rounded-full bg-[#F4F5F8] dark:bg-[#242731] text-[11px] font-bold text-[#3A3A3C] dark:text-[#E5E5EA] hover:text-[#EC008C]"
                                    >
                                      {sub.title} ({sub.products.length})
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-2.5 rounded-2xl text-sm font-bold ${
                      isActivePath(item.href)
                        ? 'keep-white-text bg-[#EC008C] text-white'
                        : 'text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-[#F5F5F7] dark:hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <div className="pt-3 border-t border-black/[0.06] dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
                <a
                  href="tel:02188404407"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7]"
                >
                  <Phone className="w-4 h-4 text-[#EC008C]" />
                  <span dir="ltr">021-88404407</span>
                </a>
                <Link
                  href="/contact-us"
                  onClick={() => setMobileMenuOpen(false)}
                  className="keep-white-text px-5 py-2.5 rounded-full bg-[#EC008C] text-white text-sm font-bold"
                >
                  مشاوره و استعلام قیمت
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Subtle Apple-Style Page Backdrop Dimming Curtain when Products Flyout is Open */}
      <div
        aria-hidden="true"
        onClick={() => setProductsMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/20 dark:bg-black/50 backdrop-blur-[2px] transition-opacity duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          productsMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Main Content */}
      <main id="main-content" className="flex-1 relative z-10">
        {children}
      </main>

      {/* Global Visual CMS Editor Toolbar for Authenticated Admin/Editor */}
      <AdminHoverEditor />

      {/* Apple.com Clean Directory Footer with All 11 Official beta.ir Categories */}
      <footer className="relative z-10 border-t border-black/[0.08] dark:border-white/[0.08] bg-white/80 dark:bg-[#111216]/90 backdrop-blur-xl text-[#515154] dark:text-[#A1A1A6] text-sm mt-24 transition-colors duration-300">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Brand & Tehran / Australia Offices (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <BetaDoorsLogo className="h-9 w-auto" />
            <p className="text-[#515154] dark:text-[#A1A1A6] leading-relaxed">
              وقتی بتا می‌خری خیالت راحته، چون برند می‌خری. طراح و تولیدکننده
              جک‌های پارکینگی، مدارهای کنترل، رسیور سیموت، دستگاه حضور و غیاب،
              موتور کرکره، راهبند، اپراتور شیشه‌ای و سیستم‌های امنیتی از سال
              ۱۳۸۰.
            </p>
            <div className="space-y-2 rounded-2xl bg-white dark:bg-[#1D1D1F] p-5 border border-black/[0.06] dark:border-white/[0.08] text-sm">
              <div className="font-bold text-[#1D1D1F] dark:text-white">
                دفتر مرکزی ایران:
              </div>
              <div className="text-[#515154] dark:text-[#A1A1A6]">
                تهران، اتوبان صیاد شیرازی، خروجی مسیل باختر، پلاک ۱۲ · کد پستی:
                ۱۶۳۱۹-۳۵۷۱۱
              </div>
              <div>
                تلفن:{' '}
                <a
                  href="tel:02188404407"
                  dir="ltr"
                  className="font-bold text-[#1D1D1F] dark:text-white hover:text-[#EC008C]"
                >
                  021-88404407
                </a>{' '}
                الی <span dir="ltr">409</span>
              </div>
              <div>
                ایمیل:{' '}
                <a
                  href="mailto:info@beta.ir"
                  className="font-medium text-[#1D1D1F] dark:text-white hover:text-[#EC008C]"
                >
                  info@beta.ir
                </a>{' '}
                · شنبه تا چهارشنبه ۸:۰۰ الی ۱۷:۳۰
              </div>
              <div className="pt-2.5 mt-2.5 border-t border-black/[0.06] dark:border-white/10 text-xs text-[#86868B]">
                <strong className="text-[#1D1D1F] dark:text-white">
                  شعبه استرالیا (ملبورن):
                </strong>{' '}
                5/1730 Hume Hwy, Campbellfield VIC 3061 · Tel: 1300 238 243
              </div>
            </div>
          </div>

          {/* Col 2: All 11 Official Product Categories (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h2 className="text-[#1D1D1F] dark:text-white font-bold text-base">
              ۱۱ گروه اصلی محصولات شرکت بتا
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {BETA_OFFICIAL_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/products?cat=${cat.id}`}
                    className="hover:text-[#EC008C] inline-flex items-center gap-1.5 text-xs sm:text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EC008C]" />
                    <span>{cat.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Support, Apps, Manuals & Commerce (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h2 className="text-[#1D1D1F] dark:text-white font-bold text-base">
              خدمات، آموزش و پشتیبانی رسمی بتا
            </h2>
            <ul className="space-y-2.5">
              <li>
                <Link href="/products" className="hover:text-[#EC008C]">
                  کاتالوگ جامع همه {BETA_ALL_OFFICIAL_PRODUCTS.length} محصول
                  شرکت بتا
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#EC008C]">
                  فروشگاه آنلاین محصولات بتا
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#EC008C]">
                  خدمات پس از فروش و گارانتی
                </Link>
              </li>
              <li>
                <Link
                  href="/beta-doors-manuals"
                  className="hover:text-[#EC008C]"
                >
                  نقشه راهنمای بردها، فیلم‌های آموزشی و دانلود اپلیکیشن
                </Link>
              </li>
              <li>
                <Link
                  href="/beta-smart-support"
                  className="hover:text-[#EC008C]"
                >
                  مقالات تخصصی و سوالات متداول (FAQ)
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-[#EC008C]">
                  درباره شرکت بتا
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-[#EC008C]">
                  تماس با ما، نظرات و ثبت شکایات مشتریان
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-black/[0.06] dark:border-white/[0.08] px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#86868B]">
            <p>
              © {new Date().getFullYear()} شرکت بتا (www.beta.ir). کلیه حقوق
              مادی و معنوی محفوظ است.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <span>تولید ملی با استانداردهای بین‌المللی از سال ۱۳۸۰</span>
              <Link
                href="/admin"
                className="inline-flex items-center gap-1 text-[#86868B] hover:text-[#EC008C] transition-colors"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>پنل مدیریت</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
