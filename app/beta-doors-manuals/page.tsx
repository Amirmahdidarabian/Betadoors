'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Download,
  FileText,
  Search,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
  Smartphone,
  Globe,
} from 'lucide-react';
import { SiteShell } from '@/components/layout/SiteShell';
import { DeFiPageHeroStage } from '@/components/hero/DeFiPageHeroStage';
import { HudSectionRail } from '@/components/sections/HomeSections';
import { useBetaDoors } from '@/components/providers/BetaDoorsProvider';
import { EnquiryForm } from '@/components/forms/EnquiryForm';

// Official mobile apps from http://www.beta.ir/form/main?id=5
const OFFICIAL_BETA_APPS = [
  {
    id: 'app_smart_simote',
    title: 'اپلیکیشن رسیور سیم‌کارتی Smart Simote (تک‌مدیره / دو مدیره / مولتی)',
    models: 'سیموت ۲ رله · اسمارت سیموت پلاس',
    platforms: ['نسخه اندروید (APK)', 'وب‌اپلیکیشن آیفون (iOS PWA)'],
    description:
      'کنترل باز و بسته شدن درب پارکینگ، کرکره برقی و رله‌ها از طریق اینترنت و پیامک، مدیریت کاربران مجاز و تنظیم زمان‌بندی رله‌ها.',
    androidUrl: '/api/manuals/manual_rdo',
    iosWebUrl: 'https://www.beta.ir/form/main?id=5',
  },
  {
    id: 'app_simote_4_8',
    title: 'اپلیکیشن رسیور سیم‌کارتی ۴ رله و ۸ رله صنعتی بتا',
    models: 'سیموت ۴ رله · سیموت ۸ رله صنعتی سیم‌کارتی',
    platforms: ['نسخه معمولی و صنعتی اندروید', 'نسخه مولتی (چند دستگاهی)'],
    description:
      'مدیریت مستقل ۴ تا ۸ خروجی رله صنعتی با قابلیت نام‌گذاری هر کلید، تعیین حالت لحظه‌ای یا چفتی (Latch) و گزارش‌گیری وضعیت.',
    androidUrl: '/api/manuals/manual_rdo',
    iosWebUrl: 'https://www.beta.ir/form/main?id=5',
  },
  {
    id: 'app_z7_gsm',
    title: 'اپلیکیشن دزدگیر اماکن سیم‌کارتی Z7-GSM و Z7-GSM Multi',
    models: 'Z7-GSM Plus · Z5-GSM',
    platforms: ['اپلیکیشن فارسی اندروید', 'وب‌اپلیکیشن آیفون (iOS)'],
    description:
      'فعال و غیرفعال‌سازی دزدگیر، حالت نیمه‌فعال (در منزل)، کنترل رله‌های خروجی، مشاهده گزارش زون‌ها و مدیریت مدیران دستگاه.',
    androidUrl: '/api/manuals/manual_receiver',
    iosWebUrl: 'https://www.beta.ir/form/main?id=5',
  },
  {
    id: 'app_b1_shutter',
    title: 'اپلیکیشن دزدگیر B1 Ultimate / B1 Eco و کرکره سیم‌کارتی GSM Side',
    models: 'B1 Ultimate Plus · B1 ECO · GSM Side Full Ch Multi',
    platforms: ['اپلیکیشن اندروید (تک و مولتی)', 'وب‌اپلیکیشن آیفون (iOS)'],
    description:
      'نرم‌افزار اختصاصی مدیریت دزدگیرهای سری B1 بتا و مرکز کنترل موتور کرکره ساید فول سیم‌کارتی با قابلیت ثبت چندین مکان.',
    androidUrl: '/api/manuals/manual_receiver',
    iosWebUrl: 'https://www.beta.ir/form/main?id=5',
  },
];

const MANUAL_CATEGORIES: Record<
  string,
  { categoryHeading: string; wpSourceFile: string; highlights: string[] }
> = {
  manual_asterion: {
    categoryHeading: 'راهنمای جک پارکینگی و مدار کنترل:',
    wpSourceFile: 'BETA-Gate-RockS-BT1-Manual.pdf',
    highlights: [
      'نقشه سیم‌کشی بازوهای جک MPC TITAN-400/600، F600 و موتور ریلی F-550M',
      'برنامه‌ریزی دیجیتال تایم اول، تایم دوم (نرم‌ایست) و تنظیم فورس مدار Rock-S و BT1',
      'نحوه کددهی و پاک کردن حافظه ریموت‌های بتا و اتصال فتوسل و قفل برقی',
    ],
  },
  manual_rdo: {
    categoryHeading: 'راهنمای رسیور سیم‌کارتی سیموت:',
    wpSourceFile: 'BETA-Smart-Simote-GSM-Manual.pdf',
    highlights: [
      'نقشه اتصال سیموت ۲ رله، اسمارت سیموت پلاس و سیموت ۴/۸ رله به انواع برد جک و کرکره',
      'جدول کامل کدهای دستوری پیامکی (تعریف مدیر اول و دوم، افزودن و حذف کاربر)',
      'راهنمای نصب و راه‌اندازی اپلیکیشن اندروید و وب‌اپلیکیشن آیفون Smart Simote',
    ],
  },
  manual_safety_beams: {
    categoryHeading: 'راهنمای حضور و غیاب، اکسس کنترل و UHF:',
    wpSourceFile: 'BETA-Access-UHF-2209-Manual.pdf',
    highlights: [
      'نقشه سیم‌کشی قفل برقی، قفل مگنتی 280Kg و شستی خروج در دستگاه‌های حضور و غیاب و اکسس کنترل',
      'تنظیمات شبکه TCP/IP در دستگاه حضور و غیاب 2209/2208 و برد کنترل دسترسی دو درب C02/S02',
      'زاویه استاندارد نصب آنتن‌های برد بلند UHF پارکینگی (S51، T51، Z51) و تعریف تگ خودرو',
    ],
  },
  manual_receiver: {
    categoryHeading: 'راهنمای دزدگیر Z7-GSM و برد کرکره:',
    wpSourceFile: 'BETA-Z7-GSM-Plus-Shutter-Manual.pdf',
    highlights: [
      'نقشه سیم‌کشی زون‌های باسیم، چشمی‌های حرکتی G9/G15/G20، بلندگو و باتری در دزدگیر Z7-GSM Plus',
      'نحوه ست کردن سنسورها و مگنت‌های بی‌سیم، ریموت کنترل و تنظیمات سیم‌کارت',
      'راهنمای تنظیم مرکز کنترل موتور کرکره ساید UPS بتا New Face و ساید فول سیم‌کارتی',
    ],
  },
};

export default function ManualsPage() {
  const { manuals } = useBetaDoors();
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = manuals.filter(
    (m) =>
      m.published &&
      (m.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.modelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.summary.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <SiteShell>
      {/* 1. Architectural HUD Stage */}
      <DeFiPageHeroStage
        ariaLabel="مرکز دانلود اپلیکیشن‌ها، کاتالوگ‌ها و نقشه‌های برد شرکت بتا"
        badgeText="مرکز دانلود رسمی شرکت بتا (BETA.IR) · اپلیکیشن‌های موبایل و نقشه‌های سیم‌کشی"
        badgeHref="#apps-download-section"
        headlinePrimary="دانلود اپلیکیشن‌های موبایل و"
        headlineGradient="راهنمای نصب بردهای بتا"
        subheadline="دریافت مستقیم اپلیکیشن‌های اندروید و وب‌اپلیکیشن آیفون (Smart Simote، Z7-GSM Multi، B1 Ultimate و کرکره سیم‌کارتی) به همراه کاتالوگ‌ها و نقشه‌های سیم‌کشی تخصصی مدارهای کنترل بتا."
        primaryCtaLabel="دانلود اپلیکیشن‌های موبایل"
        primaryCtaHref="#apps-download-section"
        secondaryCtaLabel="سوالات متداول فنی (FAQ)"
        secondaryCtaHref="/beta-smart-support"
        scrollTargetId="apps-download-section"
        topLeftNode={{ label: 'اپلیکیشن سیموت', metric: 'Smart Simote' }}
        topRightNode={{ label: 'اپلیکیشن دزدگیر', metric: 'Z7-GSM Multi' }}
        bottomLeftNode={{ label: 'نقشه سیم‌کشی بردها', metric: 'Rock-S · BT1' }}
        bottomRightNode={{ label: 'حضور و غیاب و UHF', metric: '2209 · S51' }}
        horizonSlides={[
          { label: '۰۱/۰۴ · مرکز دانلود بتا', tag: 'اپلیکیشن Smart Simote (تک‌مدیره، دو مدیره و مولتی)' },
          { label: '۰۲/۰۴ · مرکز دانلود بتا', tag: 'اپلیکیشن دزدگیر Z7-GSM Plus و B1 Ultimate Plus' },
          { label: '۰۳/۰۴ · مرکز دانلود بتا', tag: 'کاتالوگ و نقشه سیم‌کشی جک پارکینگی و مدار Rock-S' },
          { label: '۰۴/۰۴ · مرکز دانلود بتا', tag: 'راهنمای نصب حضور و غیاب، اکسس کنترل و آنتن UHF' },
        ]}
      />

      <div
        id="apps-download-section"
        className="w-full max-w-[1760px] mx-auto px-3 sm:px-5 lg:px-7 py-12 space-y-14"
      >
        {/* Section 1: Official Mobile Applications (Android & iOS Web App) */}
        <div className="space-y-8">
          <HudSectionRail
            code="HUD.APPS.01"
            sector="دانلود اپلیکیشن‌های موبایل شرکت بتا (BETA.IR) // اندروید و وب‌اپلیکیشن آیفون"
            status="نسخه‌های رسمی"
          />

          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#ff7ac6]">
              <Smartphone className="w-4 h-4 text-[#EC008C]" />
              <span>OFFICIAL BETA.IR MOBILE APPLICATIONS (ANDROID &amp; iOS)</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              اپلیکیشن‌های موبایل کنترل سیموت، دزدگیر و کرکره بتا
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              نرم‌افزارهای رسمی شرکت بتا جهت مدیریت رسیورهای سیم‌کارتی سیموت (۲، ۴ و ۸ رله)، دزدگیرهای اماکن Z7-GSM و B1 و مرکز کنترل کرکره سیم‌کارتی برای سیستم‌عامل اندروید و وب‌اپلیکیشن iOS.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OFFICIAL_BETA_APPS.map((app, idx) => (
              <article
                key={app.id}
                className="hud-corner-brackets brand-animated-border bg-[#0B0C10] border border-white/[0.09] p-6 sm:p-7 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono border-b border-white/[0.07] pb-2.5">
                    <span className="text-[#EC008C] font-bold">
                      [APP.0{idx + 1}] {app.models}
                    </span>
                    <span className="text-emerald-400">اندروید + iOS</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {app.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {app.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {app.platforms.map((p) => (
                      <span
                        key={p}
                        className="px-2.5 py-1 bg-[#08090C] border border-white/15 text-[11px] font-mono text-slate-300"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center gap-3">
                  <a
                    href={app.androidUrl}
                    download={`${app.id}-guide.pdf`}
                    className="keep-white-text inline-flex items-center gap-2 px-4 py-2.5 bg-[#EC008C] hover:bg-[#d4007d] text-white text-xs font-mono font-bold transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>دریافت پکیج و راهنمای نصب</span>
                  </a>
                  <a
                    href={app.iosWebUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#08090C] hover:bg-white/[0.08] border border-white/15 text-xs font-mono text-white transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5 text-[#EC008C]" />
                    <span>صفحه رسمی دانلود و وب‌اپ iOS</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Section 2: PDF Wiring Diagrams & Technical Manuals */}
        <div id="manuals-library-grid" className="space-y-8 pt-4">
          <HudSectionRail
            code="HUD.MANUALS.02"
            sector="دفترچه‌های راهنمای نصب، نقشه‌های سیم‌کشی و کاتالوگ‌های فنی (PDF)"
            status="تائید شده توسط واحد فنی"
          />

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-400">
                <Sparkles className="w-3.5 h-3.5 text-[#EC008C]" />
                <span>OFFICIAL BETA.IR TECHNICAL MANUALS &amp; WIRING DIAGRAMS</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                نقشه‌های سیم‌کشی بردها و دفترچه‌های راهنمای نصب
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                مستندات فنی و راهنمای برنامه‌ریزی مخصوص نصابان، همکاران و مصرف‌کنندگان محصولات شرکت بتا.
              </p>
            </div>

            <div className="w-full md:w-80">
              <label htmlFor="manual-search" className="sr-only">
                جستجوی دفترچه راهنما بر اساس مدل
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute right-4 top-3.5" />
                <input
                  id="manual-search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="جستجو (Rock-S، سیموت، Z7-GSM، UHF)..."
                  className="w-full pr-11 pl-4 py-3 text-xs bg-[#0B0C10] border border-white/15 rounded-none text-white placeholder:text-slate-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((manual) => {
              const meta = MANUAL_CATEGORIES[manual.id] || {
                categoryHeading: 'دفترچه راهنمای فنی:',
                wpSourceFile: `${manual.id}.pdf`,
                highlights: [manual.summary],
              };
              return (
                <article
                  key={manual.id}
                  className="hud-corner-brackets brand-animated-border bg-[#0B0C10] border border-white/[0.08] p-7 sm:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#EC008C] font-bold">
                        {meta.categoryHeading}
                      </span>
                      <span className="border border-white/10 bg-[#08090C] px-3 py-0.5 text-slate-300 tabular-nums">
                        نسخه {manual.version} · {manual.fileSizeKb} کیلوبایت · PDF
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
                      <FileText className="w-5 h-5 text-[#EC008C] shrink-0" />
                      <span>{manual.label}</span>
                    </h3>

                    <div className="text-xs font-mono text-slate-400">
                      مدل‌های تحت پوشش: {manual.modelName}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed">
                      {manual.summary}
                    </p>

                    <ul className="space-y-2 pt-2">
                      {meta.highlights.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-2.5 border border-white/[0.06] bg-[#08090C] p-3 text-xs text-slate-200"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                    <a
                      href={manual.localDownloadPath}
                      download={`${manual.id}.pdf`}
                      className="keep-white-text inline-flex items-center gap-2 px-5 py-2.5 bg-[#EC008C] hover:bg-[#d4007d] text-white text-xs font-semibold transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>دانلود مستقیم فایل راهنما (PDF)</span>
                    </a>
                    <a
                      href={manual.localDownloadPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 border border-white/15 bg-[#08090C] hover:bg-white/[0.1] text-xs text-white transition-colors"
                    >
                      <span>مشاهده در مرورگر</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Connected Support & Registration Tools */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Link
            href="/beta-smart-support"
            className="hud-corner-brackets border border-white/[0.08] bg-[#0B0C10] hover:border-[#EC008C]/50 p-6 flex items-center justify-between transition-all"
          >
            <div>
              <div className="font-mono text-[10px] uppercase text-[#EC008C]">TECHNICAL FAQ</div>
              <div className="text-base font-bold text-white mt-1">بانک سوالات متداول فنی (FAQ)</div>
              <div className="text-xs text-slate-400 mt-1">آموزش کددهی ریموت، تنظیم فورس و رفع خطاها</div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-[#EC008C]" />
          </Link>
          <Link
            href="/warranty-registration"
            className="hud-corner-brackets border border-white/[0.08] bg-[#0B0C10] hover:border-[#EC008C]/50 p-6 flex items-center justify-between transition-all"
          >
            <div>
              <div className="font-mono text-[10px] uppercase text-[#EC008C]">WARRANTY PORTAL</div>
              <div className="text-base font-bold text-white mt-1">ثبت گارانتی محصولات بتا</div>
              <div className="text-xs text-slate-400 mt-1">ثبت شماره سریال دستگاه و کد نمایندگی</div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-[#EC008C]" />
          </Link>
          <Link
            href="/register-to-service"
            className="hud-corner-brackets border border-white/[0.08] bg-[#0B0C10] hover:border-[#EC008C]/50 p-6 flex items-center justify-between transition-all"
          >
            <div>
              <div className="font-mono text-[10px] uppercase text-[#EC008C]">SERVICE PORTAL</div>
              <div className="text-base font-bold text-white mt-1">فرم پذیرش تعمیر و خدمات پس از فروش</div>
              <div className="text-xs text-slate-400 mt-1">ثبت درخواست تعمیر در واحد گارانتی (۲ تا ۷ روز کاری)</div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-[#EC008C]" />
          </Link>
        </div>

        <EnquiryForm
          sourcePagePath="/beta-doors-manuals/"
          heading="نیاز به نقشه سیم‌کشی خاص یا راهنمایی فنی دارید؟"
          subheading="با واحد پشتیبانی فنی شرکت بتا (۰۲۱-۸۸۴۰۴۴۰۷ الی ۴۰۹) تماس بگیرید یا سوال فنی خود را در فرم زیر ثبت نمایید."
        />
      </div>
    </SiteShell>
  );
}
