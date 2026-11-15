'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  ShoppingBag,
  User,
  Phone,
  MapPin,
  Mail,
  Shield,
  ArrowUpRight,
  Menu,
  X,
  Sun,
  Moon,
} from 'lucide-react';
import { BetaDoorsLogo } from '@/components/brand/BetaDoorsLogo';
import {
  DEMO_ACTORS,
  useBetaDoors,
} from '@/components/providers/BetaDoorsProvider';
import { formatAudCents } from '@/lib/domain-logic';
import { AdminHoverEditor } from '@/components/cms/AdminHoverEditor';

const PRIMARY_NAV_ITEMS = [
  {
    label: 'Home',
    href: '/',
    match: (p: string) => p === '/',
  },
  {
    label: 'About us',
    href: '/about-us',
    match: (p: string) => p.startsWith('/about-us'),
  },
  {
    label: 'Products',
    href: '/products',
    match: (p: string) =>
      p.startsWith('/products') ||
      p.includes('range') ||
      p.includes('catagories') ||
      p.startsWith('/accessories') ||
      p.startsWith('/hardware'),
  },
  {
    label: 'Shop',
    href: '/shop',
    match: (p: string) =>
      p.startsWith('/shop') ||
      p.startsWith('/product/') ||
      p.startsWith('/product-category'),
  },
  {
    label: 'Services',
    href: '/services',
    match: (p: string) => p.startsWith('/services') || p.includes('repairs'),
  },
  {
    label: 'Manuals',
    href: '/beta-doors-manuals',
    match: (p: string) => p.includes('manuals') || p.includes('support'),
  },
  {
    label: 'Warranty Registration',
    href: '/warranty-registration',
    match: (p: string) => p.startsWith('/warranty-registration'),
  },
];

export function SiteShell({
  children,
  previewBanner,
}: {
  children: React.ReactNode;
  previewBanner?: { isDraftPreview: boolean; pageSlug: string; revision: number } | null;
}) {
  const pathname = usePathname() || '/';
  const { brand, cartTotals, actorKey, setActorKey } = useBetaDoors();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem('betadoors_theme');
        if (saved === 'light' || saved === 'dark') {
          setTheme(saved);
          document.documentElement.classList.toggle('dark', saved === 'dark');
        } else {
          setTheme('dark');
          document.documentElement.classList.add('dark');
        }
      } catch {
        // ignore
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    try {
      window.localStorage.setItem('betadoors_theme', next);
    } catch {
      // ignore
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col brand-outer-ambient-frame text-slate-900 dark:text-slate-100 transition-colors duration-200 selection:bg-[#EC008C]/15 selection:text-[#EC008C] overflow-x-clip">
      {/* Subtle, Ultra-Slow Ambient Aurora & Raycast Perimeter Backdrop (90% Obsidian Black + Soft Diffused Brand Magenta Edge Blooms) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        {/* Layer 1: Primary slow-drifting perimeter aurora blooms (30s cycle) */}
        <div
          className="beta-aurora-orb-primary absolute -inset-[25%] opacity-40 dark:opacity-100"
          style={{
            backgroundImage: [
              'radial-gradient(circle at 14% 12%, rgba(236, 0, 140, 0.17) 0%, rgba(158, 0, 94, 0.06) 22%, transparent 46%)',
              'radial-gradient(circle at 88% 18%, rgba(236, 0, 140, 0.14) 0%, rgba(112, 0, 68, 0.05) 24%, transparent 48%)',
              'radial-gradient(circle at 50% 92%, rgba(236, 0, 140, 0.13) 0%, rgba(88, 28, 135, 0.05) 26%, transparent 50%)',
            ].join(', '),
            filter: 'blur(75px)',
          }}
        />

        {/* Layer 2: Secondary counter-drifting perimeter edge glow (36s cycle) */}
        <div
          className="beta-aurora-orb-secondary absolute -inset-[25%] opacity-35 dark:opacity-90"
          style={{
            backgroundImage: [
              'radial-gradient(circle at 6% 62%, rgba(236, 0, 140, 0.12) 0%, transparent 40%)',
              'radial-gradient(circle at 94% 68%, rgba(236, 0, 140, 0.13) 0%, transparent 42%)',
            ].join(', '),
            filter: 'blur(85px)',
          }}
        />

        {/* Layer 3: Linear / Raycast subtle diagonal light shaft sweep (32s cycle) */}
        <div className="beta-raycast-beams absolute inset-0" />

        {/* Layer 4: Subtle architectural dot matrix & dark center vignette so obsidian black dominates */}
        <div
          className="absolute inset-0 opacity-20 dark:opacity-35"
          style={{
            backgroundImage:
              'radial-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            maskImage:
              'radial-gradient(ellipse at 50% 35%, transparent 45%, black 95%)',
            WebkitMaskImage:
              'radial-gradient(ellipse at 50% 35%, transparent 45%, black 95%)',
          }}
        />
      </div>

      {/* Scoped Draft Preview Banner when ?previewToken= is active */}
      {previewBanner?.isDraftPreview && (
        <div
          role="region"
          aria-label="Draft preview notice"
          className="relative z-50 keep-white-text bg-[#EC008C] text-white px-6 py-2 text-xs font-medium flex items-center justify-between gap-4"
        >
          <span>
            SCOPED DRAFT PREVIEW · Viewing unpublished draft revision #{previewBanner.revision} for{' '}
            <code className="font-mono underline">{previewBanner.pageSlug}</code>
          </span>
          <a
            href={previewBanner.pageSlug}
            className="keep-white-text px-3 py-1 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors whitespace-nowrap shrink-0"
          >
            Exit Preview
          </a>
        </div>
      )}

      {/* Top Navigation with true glassmorphic transparency, backdrop blur, and precision HUD radii */}
      <header className="sticky top-0 z-50 w-full bg-white/35 dark:bg-[#040406]/45 supports-[backdrop-filter]:bg-white/20 dark:supports-[backdrop-filter]:bg-[#040406]/35 border-b border-slate-200/50 dark:border-white/[0.08] backdrop-blur-2xl transition-colors">
        <div className="w-full max-w-[1760px] mx-auto flex items-center justify-between gap-3 px-3 sm:px-5 lg:px-7 py-3">
          {/* Zone 1: Brand Lockup */}
          <a
            href="/"
            aria-label="BETA DOORS Home"
            className="flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#EC008C]"
          >
            <BetaDoorsLogo
              variant={theme === 'light' ? 'light_surface' : 'dark_surface'}
              className="h-6 sm:h-7 w-auto"
            />
          </a>

          {/* Zone 2: Floating Center HUD Command Dock with translucent blur & precision rounded-lg frame */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-1 bg-white/60 dark:bg-[#0B0C10]/70 backdrop-blur-2xl border border-slate-300/60 dark:border-white/[0.12] rounded-lg p-1 shadow-[0_8px_32px_rgba(15,23,42,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.55)]"
          >
            <div className="flex items-center gap-0.5 text-xs font-medium pr-1">
              {PRIMARY_NAV_ITEMS.map((item) => {
                const isActive = item.match(pathname);
                const customNavLabel = brand.navLabels?.[item.href] || item.label;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-slate-900 text-white font-semibold shadow-sm dark:bg-[#EC008C] dark:text-white keep-white-text'
                        : 'text-slate-700 hover:text-slate-950 hover:bg-white/60 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/[0.08]'
                    }`}
                  >
                    {customNavLabel}
                  </a>
                );
              })}
            </div>

            <a
              href="/contact-us"
              className="keep-white-text inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900/90 hover:bg-slate-900 dark:bg-white/[0.1] dark:hover:bg-white/[0.18] border border-slate-900/80 dark:border-white/[0.14] text-xs font-medium text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Enquire Now</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#EC008C]" />
            </a>
            <a
              href="/admin"
              aria-label="Admin CMS Workspace"
              title="Admin CMS Workspace"
              className="keep-white-text ml-0.5 w-7 h-7 rounded-md bg-[#EC008C] text-white flex items-center justify-center hover:bg-[#d4007d] transition-colors shrink-0 cursor-pointer shadow-sm"
            >
              <Shield className="w-3.5 h-3.5 fill-white" />
            </a>
          </nav>

          {/* Zone 3: Theme Switcher + Login / Account & Cart */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
              title={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-white/60 hover:bg-white/85 dark:bg-[#0B0C10]/70 dark:hover:bg-white/15 backdrop-blur-xl border border-slate-300/70 dark:border-white/12 text-xs font-mono font-medium text-slate-800 dark:text-slate-200 transition-colors cursor-pointer whitespace-nowrap"
            >
              {theme === 'light' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span className="hidden lg:inline">LIGHT</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-sky-400" />
                  <span className="hidden lg:inline">DARK</span>
                </>
              )}
            </button>

            <a
              href="/my-account"
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md hover:bg-white/[0.06] text-xs font-medium text-slate-800 hover:text-slate-950 dark:text-slate-200 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <User className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              <span>Login</span>
            </a>

            <a
              href="/cart"
              aria-label={`Shopping cart with ${cartTotals.itemCount} items`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/65 hover:bg-white/90 dark:bg-[#0B0C10]/70 dark:hover:bg-white/15 backdrop-blur-xl border border-slate-300/70 dark:border-white/12 text-xs font-mono font-semibold text-slate-900 dark:text-white shadow-xs transition-colors whitespace-nowrap shrink-0 tabular-nums cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#EC008C]" />
              <span>CART ({cartTotals.itemCount})</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-2 rounded-md border border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="md:hidden bg-white dark:bg-[#0B0C10] border-b border-slate-200 dark:border-white/10 px-6 py-4 space-y-3 text-xs z-50 shadow-lg"
        >
          <div className="grid grid-cols-2 gap-2">
            <a href="/" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white font-medium">Home</a>
            <a href="/about-us" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white font-medium">About us</a>
            <a href="/products" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white font-medium">Products</a>
            <a href="/shop" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white font-medium">Shop</a>
            <a href="/services" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white font-medium">Services</a>
            <a href="/beta-doors-manuals" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white font-medium">Manuals</a>
            <a href="/warranty-registration" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white font-medium">Warranty Registration</a>
            <a href="/contact-us" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white font-medium">Enquire Now</a>
            <a href="/my-account" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white font-medium">Login / Account</a>
            <a href="/admin" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded-lg bg-[#EC008C]/15 border border-[#EC008C]/40 text-[#EC008C] dark:text-white font-semibold">Admin CMS</a>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main id="main-content" className="relative z-10 flex-1">
        {children}
      </main>

      {/* Minimalist Architectural Footer + Full 44-Route Directory & Sandbox Session Switcher */}
      <footer className="relative z-10 bg-white/80 dark:bg-[#040406]/80 backdrop-blur-xl border-t border-slate-200/90 dark:border-white/[0.08] text-slate-600 dark:text-slate-400 pt-14 pb-10 px-3 sm:px-5 lg:px-7 mt-16 transition-colors">
        <div className="w-full max-w-[1760px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200/80 dark:border-white/[0.08]">
          {/* Col 1: Brand & Contact */}
          <div className="lg:col-span-2 space-y-4">
            <BetaDoorsLogo
              variant={theme === 'light' ? 'light_surface' : 'dark_surface'}
              className="h-6 w-auto"
            />
            <p className="text-xs font-semibold text-slate-900 dark:text-white">
              {brand.footerTagline ||
                "We're available Australia wide! Speed in service, Quality in product, Innovation in design."}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              {brand.footerDescription ||
                'At Beta, we are pioneers in the door automation industry. We offer a comprehensive range of solutions for Commercial and Residential Garage Door and Gates.'}
            </p>
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#EC008C] shrink-0" />
                <span>Head Office: {brand.headOffice}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#EC008C] shrink-0" />
                <a href={`tel:${brand.phone.replace(/\s+/g, '')}`} className="hover:text-[#EC008C] tabular-nums font-medium">
                  {brand.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#EC008C] shrink-0" />
                <a href={`mailto:${brand.email}`} className="hover:text-[#EC008C] font-medium">
                  {brand.email}
                </a>
              </div>
            </div>

            {/* Sandbox Session Role Switcher for Testing */}
            <div className="pt-3 flex items-center gap-2 text-xs">
              <label htmlFor="footer-role-select" className="text-slate-500">
                Active Role:
              </label>
              <select
                id="footer-role-select"
                value={actorKey}
                onChange={(e) => setActorKey(e.target.value)}
                className="bg-slate-100 dark:bg-[#0D0E12] text-slate-800 dark:text-slate-300 border border-slate-300 dark:border-white/10 rounded-lg px-2.5 py-1 text-xs"
              >
                {Object.entries(DEMO_ACTORS).map(([key, item]) => (
                  <option key={key} value={key}>
                    {item.displayName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Col 2: Catalogue */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">Products &amp; Catalogue</h3>
            <ul className="space-y-1.5 text-xs">
              <li><a href="/products" className="hover:text-[#EC008C] transition-colors">All Product Categories</a></li>
              <li><a href="/garage-door-range" className="hover:text-[#EC008C] transition-colors">Garage Door Range</a></li>
              <li><a href="/garage-door-opener-catagories" className="hover:text-[#EC008C] transition-colors">Garage Door Opener Categories</a></li>
              <li><a href="/sectional-and-tilt-door-opener-range" className="hover:text-[#EC008C] transition-colors">Sectional &amp; Tilt Openers (Aria 121)</a></li>
              <li><a href="/roller-door-opener-range" className="hover:text-[#EC008C] transition-colors">Roller Door Openers (1000N–1800N)</a></li>
              <li><a href="/gate-opener-brands" className="hover:text-[#EC008C] transition-colors">Gate Opener Brands (BETA &amp; LIFE)</a></li>
              <li><a href="/beta-gate-opener-range" className="hover:text-[#EC008C] transition-colors">BETA Gate Openers (B600 / B550)</a></li>
              <li><a href="/life-gate-opener-range" className="hover:text-[#EC008C] transition-colors">LIFE Gate Openers (HP4 / OP2 / HP6)</a></li>
              <li><a href="/gate-catagories" className="hover:text-[#EC008C] transition-colors">Swing &amp; Sliding Gates</a></li>
              <li><a href="/accessories" className="hover:text-[#EC008C] transition-colors">Accessories &amp; Safety Beams</a></li>
              <li><a href="/hardware" className="hover:text-[#EC008C] transition-colors">Hinges, Bearings, Springs &amp; Cables</a></li>
            </ul>
          </div>

          {/* Col 3: Melbourne Local Repairs */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">Melbourne Service Corridors</h3>
            <ul className="space-y-1.5 text-xs">
              <li><a href="/services" className="hover:text-[#EC008C] transition-colors">All Garage Door &amp; Gate Services</a></li>
              <li><a href="/garage-door-repairs-melbourne-beta-doors" className="hover:text-[#EC008C] transition-colors">Garage Door Repairs Melbourne</a></li>
              <li><a href="/garage-door-repairs-craigieburn-3064-beta-doors" className="hover:text-[#EC008C] transition-colors">Repairs Craigieburn 3064</a></li>
              <li><a href="/garage-door-repairs-narre-warren-3805-beta-doors" className="hover:text-[#EC008C] transition-colors">Repairs Narre Warren 3805</a></li>
              <li><a href="/garage-door-repairs-deer-park-3023-beta-doors" className="hover:text-[#EC008C] transition-colors">Repairs Deer Park 3023</a></li>
              <li><a href="/roller-door-repairs-melbourne-same-day-repairs" className="hover:text-[#EC008C] transition-colors">Roller Door Repairs Melbourne</a></li>
              <li><a href="/roller-door-repairs-essendon-same-day-repairs" className="hover:text-[#EC008C] transition-colors">Roller Door Repairs Essendon</a></li>
              <li><a href="/roller-door-repairs-thomastown-same-day-repairs" className="hover:text-[#EC008C] transition-colors">Roller Door Repairs Thomastown</a></li>
              <li><a href="/commercial-roller-doors-melbourne-industrial-roller-doors" className="hover:text-[#EC008C] transition-colors">Commercial Roller Doors Melbourne</a></li>
              <li><a href="/commercial-roller-door-repairs-melbourne-industrial-shutters" className="hover:text-[#EC008C] transition-colors">Industrial Shutter Repairs Melbourne</a></li>
              <li><a href="/commercial-roller-door-repairs-craigieburn-industrial-shutters" className="hover:text-[#EC008C] transition-colors">Commercial Repairs Craigieburn</a></li>
              <li><a href="/same-day-garage-door-repairs-melbourne-emergency-repairs" className="hover:text-[#EC008C] transition-colors">Same-Day Emergency Repairs</a></li>
            </ul>
          </div>

          {/* Col 4: Support, Shop & Legal */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">Support, Shop &amp; Legal</h3>
            <ul className="space-y-1.5 text-xs">
              <li><a href="/about-us" className="hover:text-[#EC008C] transition-colors">About BETA DOORS</a></li>
              <li><a href="/contact-us" className="hover:text-[#EC008C] transition-colors">Contact Us</a></li>
              <li><a href="/shop" className="hover:text-[#EC008C] transition-colors">Online Shop ({formatAudCents(cartTotals.totalCents)})</a></li>
              <li><a href="/product-category/uncategorized" className="hover:text-[#EC008C] transition-colors">Shop Archive (Uncategorized)</a></li>
              <li><a href="/warranty-registration" className="hover:text-[#EC008C] transition-colors">Warranty Registration</a></li>
              <li><a href="/register-to-service" className="hover:text-[#EC008C] transition-colors">Register to Service (Proof Upload)</a></li>
              <li><a href="/beta-doors-manuals" className="hover:text-[#EC008C] transition-colors">Manuals &amp; PDF Downloads</a></li>
              <li><a href="/beta-smart-support" className="hover:text-[#EC008C] transition-colors">BETA Smart Support</a></li>
              <li><a href="/garage-door-spring-estimator" className="hover:text-[#EC008C] transition-colors">Garage Door Spring Estimator</a></li>
              <li><a href="/terms-conditions" className="hover:text-[#EC008C] transition-colors">Terms &amp; Conditions</a></li>
              <li><a href="/refund_returns" className="hover:text-[#EC008C] transition-colors">Refund &amp; Returns Policy</a></li>
              <li><a href="/design-system" className="hover:text-[#EC008C] transition-colors">Design System Showcase</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="w-full max-w-[1760px] mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-6">
            <a href="/beta-smart-support" className="hover:text-slate-900 dark:hover:text-white">Support</a>
            <a href="/warranty-registration" className="hover:text-slate-900 dark:hover:text-white">Register</a>
            <a href="/admin" className="hover:text-slate-900 dark:hover:text-white">Admin CMS</a>
          </div>
          <p>© 2026 BETA DOORS Australia · 5/1730 Hume Hwy, Campbellfield VIC 3061</p>
          <div className="flex items-center gap-2">
            <a
              href={`tel:${brand.phone.replace(/\s+/g, '')}`}
              className="px-2.5 py-1 rounded border border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-[#EC008C] font-mono text-[11px]"
            >
              {brand.phone}
            </a>
          </div>
        </div>
      </footer>

      {/* Universal Admin Hover-to-Edit Visual Overlay & Inline Modal */}
      <AdminHoverEditor />
    </div>
  );
}
