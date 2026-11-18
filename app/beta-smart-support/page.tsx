'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  PhoneCall,
  HelpCircle,
  Search,
  ArrowDown,
  FileText,
  CheckCircle2,
} from 'lucide-react';
import { SiteShell } from '@/components/layout/SiteShell';
import { DeFiPageHeroStage } from '@/components/hero/DeFiPageHeroStage';
import { HudSectionRail } from '@/components/sections/HomeSections';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { useBetaDoors } from '@/components/providers/BetaDoorsProvider';

interface FaqItem {
  category: 'gate' | 'board_simote' | 'shutter' | 'alarm' | 'access_uhf';
  categoryLabel: string;
  q: string;
  a: string;
}

// Official technical FAQs extracted from https://www.beta.ir/faq
const OFFICIAL_BETA_FAQS: FaqItem[] = [
  {
    category: 'board_simote',
    categoryLabel: 'مدار کنترل و سیموت',
    q: 'چگونه ریموت جدید را روی مدارهای کنترل جک و کرکره بتا کددهی (Learn) کنیم؟',
    a: 'دکمه Learn روی مدار کنترل را یک‌بار فشار دهید تا چراغ LED چشمک‌زن یا روشن شود؛ سپس یکی از دکمه‌های ریموت بتا را نگه دارید تا LED برد چشمک بزند و کد ثبت گردد. برای پاک کردن کل حافظه، دکمه Learn را به مدت ۸ تا ۱۰ ثانیه نگه دارید.',
  },
  {
    category: 'board_simote',
    categoryLabel: 'مدار کنترل و سیموت',
    q: 'تفاوت رسیور سیم‌کارتی اسمارت سیموت پلاس با مدل‌های ۴ و ۸ رله صنعتی چیست؟',
    a: 'اسمارت سیموت پلاس دارای ۲ خروجی رله مجزا (مناسب جک پارکینگی، کرکره و قفل برقی) به همراه گیرنده ریموت ۴۳۳ مگاهرتز است؛ در حالی که مدل‌های ۴ رله و ۸ رله صنعتی برای کنترل همزمان چندین درب، راهبند یا خطوط روشنایی و صنعتی از طریق اپلیکیشن Smart Simote طراحی شده‌اند.',
  },
  {
    category: 'gate',
    categoryLabel: 'جک پارکینگی بازویی و ریلی',
    q: 'در جک‌های بازویی MPC TITAN-400/600 و F600 تنظیم تایم اول و تایم دوم (نرم‌ایست) چگونه انجام می‌شود؟',
    a: 'تایم اول مربوط به حرکت با سرعت عادی بازوها و تایم دوم مربوط به حرکت آهسته (نرم‌ایست) در انتهای کورس باز و بسته شدن است تا درب بدون ضربه بسته شود. در بردهای سری Rock-S، ROCK و BT1 این زمان‌ها به صورت مجزا برای هر لنگه درب از طریق منوی دیجیتال قابل برنامه‌ریزی هستند.',
  },
  {
    category: 'gate',
    categoryLabel: 'جک پارکینگی بازویی و ریلی',
    q: 'علت بسته نشدن درب پارکینگ در حالی که درب به صورت اتوماتیک باز می‌شود چیست؟',
    a: 'در اکثر مواقع این موضوع به دلیل قطع بودن ارتباط چشمی فتوسل، کثیف بودن لنز فتوسل‌ها، خارج شدن آن‌ها از روبه‌روی یکدیگر یا قطع شدن سیم فتوسل (ترمینال PH / COM) رخ می‌دهد. وضعیت چراغ LED روی چشمی فتوسل را بررسی کنید.',
  },
  {
    category: 'shutter',
    categoryLabel: 'موتور کرکره برقی و UPS',
    q: 'نحوه تنظیم حد بالا و پایین (میکروسوئیچ) در موتورهای کرکره ساید و توبولار بتا چگونه است؟',
    a: 'در موتورهای ساید بتا از طریق چرخ‌دنده‌های لیمیت‌سوئیچ زیر درپوش بالای موتور و در موتورهای توبولار از طریق پیچ‌های تنظیم آلنی (+) و (-) روی کله‌گی موتور، حد توقف دقیق تیغه در بالا و پایین تنظیم می‌گردد.',
  },
  {
    category: 'alarm',
    categoryLabel: 'دزدگیر اماکن Z7-GSM',
    q: 'چگونه مدیر اصلی و کاربران را در دزدگیر اماکن سیم‌کارتی Z7-GSM Plus تعریف کنیم؟',
    a: 'پس از قرار دادن سیم‌کارت (با غیرفعال بودن پین‌کد) در دستگاه، از طریق کیپد دستگاه یا ارسال کد دستوری پیامکی با رمز پیش‌فرض، شماره موبایل مدیر اول را ثبت کرده و سپس از طریق اپلیکیشن فارسی Z7-GSM Multi سایر مدیران، زون‌ها و رله‌ها را مدیریت نمایید.',
  },
  {
    category: 'access_uhf',
    categoryLabel: 'حضور و غیاب و آنتن UHF',
    q: 'بهترین محل و زاویه نصب برای آنتن برد بلند UHF پارکینگی (مدل S51 / T51 / Z51) کجاست؟',
    a: 'آنتن UHF باید در ارتفاع ۲ تا ۲.۵ متری با زاویه دید مستقیم به شیشه جلوی خودروهای ورودی نصب شود تا تگ برچسبی پشت شیشه یا چراغ خودرو در فاصله ۶ تا ۱۲ متری بدون مانع فلزی قرائت شده و فرمان باز شدن به جک یا راهبند ارسال گردد.',
  },
  {
    category: 'access_uhf',
    categoryLabel: 'حضور و غیاب و آنتن UHF',
    q: 'آیا دستگاه‌های حضور و غیاب تشخیص چهره بتا (مدل 2209 و 2208) قابلیت تخلیه اطلاعات با فلش و شبکه را دارند؟',
    a: 'بله، تمامی دستگاه‌های حضور و غیاب سری 2201 تا 2209 بتا علاوه بر پورت شبکه TCP/IP، دارای درگاه USB جهت تخلیه مستقیم ترددها روی فلش مموری و انتقال به نرم‌افزار حضور و غیاب هستند.',
  },
];

export default function BetaSmartSupportPage() {
  const { brand } = useBetaDoors();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredFaqs = OFFICIAL_BETA_FAQS.filter((item) => {
    const matchCat = activeCategory === 'all' || item.category === activeCategory;
    const matchSearch =
      !searchTerm.trim() ||
      item.q.includes(searchTerm) ||
      item.a.includes(searchTerm) ||
      item.categoryLabel.includes(searchTerm);
    return matchCat && matchSearch;
  });

  return (
    <SiteShell>
      <DeFiPageHeroStage
        ariaLabel="بانک سوالات متداول فنی شرکت بتا (BETA.IR/FAQ)"
        badgeText="مرجع رسمی سوالات متداول فنی (BETA.IR/FAQ) · پشتیبانی نصابان و مصرف‌کنندگان"
        badgeHref="#faq-directory"
        headlinePrimary="بانک سوالات متداول فنی و"
        headlineGradient="راهنمای برنامه‌ریزی محصولات بتا"
        subheadline="پاسخ به رایج‌ترین سوالات فنی درباره کددهی ریموت‌ها، تنظیم مدارهای کنترل جک و کرکره، راه‌اندازی رسیور سیم‌کارتی سیموت، دزدگیر اماکن Z7-GSM، آنتن UHF و دستگاه‌های حضور و غیاب بتا."
        primaryCtaLabel="مشاهده سوالات متداول"
        primaryCtaHref="#faq-directory"
        secondaryCtaLabel="دانلود اپلیکیشن و نقشه‌ها"
        secondaryCtaHref="/beta-doors-manuals"
        scrollTargetId="faq-directory"
        topLeftNode={{ label: 'کددهی ریموت و برد', metric: 'Rock-S · BT1' }}
        topRightNode={{ label: 'اپلیکیشن و سیموت', metric: 'Smart Simote' }}
        bottomLeftNode={{ label: 'دزدگیر سیم‌کارتی', metric: 'Z7-GSM Plus' }}
        bottomRightNode={{ label: 'پشتیبانی تلفنی', metric: '۰۲۱-۸۸۴۰۴۴۰۷' }}
        horizonSlides={[
          { label: '۰۱/۰۴ · سوالات متداول فنی', tag: 'آموزش ست کردن ریموت و تنظیم تایم مدارهای کنترل جک' },
          { label: '۰۲/۰۴ · سوالات متداول فنی', tag: 'راه‌اندازی رسیور سیم‌کارتی سیموت و اپلیکیشن موبایل' },
          { label: '۰۳/۰۴ · سوالات متداول فنی', tag: 'تنظیمات دزدگیر اماکن سیم‌کارتی Z7-GSM Plus و چشمی‌ها' },
          { label: '۰۴/۰۴ · سوالات متداول فنی', tag: 'نصب آنتن برد بلند UHF و دستگاه‌های حضور و غیاب بتا' },
        ]}
      />

      <div
        id="faq-directory"
        className="w-full max-w-[1760px] mx-auto px-3 sm:px-5 lg:px-7 py-12 space-y-12"
      >
        <HudSectionRail
          code="HUD.FAQ.01"
          sector="بانک سوالات متداول فنی شرکت بتا (BETA.IR/FAQ)"
          status="پشتیبانی فنی تهران"
        />

        {/* Top Filter & Search Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#0B0C10] border border-white/[0.1] p-5">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'همه موضوعات فنی' },
              { id: 'board_simote', label: 'مدار کنترل و سیموت' },
              { id: 'gate', label: 'جک بازویی و ریلی' },
              { id: 'shutter', label: 'موتور کرکره و UPS' },
              { id: 'alarm', label: 'دزدگیر Z7-GSM' },
              { id: 'access_uhf', label: 'حضور و غیاب و UHF' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3.5 py-2 text-xs font-mono border cursor-pointer transition-colors ${
                  activeCategory === tab.id
                    ? 'keep-white-text bg-[#EC008C] border-[#EC008C] text-white font-bold'
                    : 'bg-[#08090C] border-white/15 text-slate-300 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="جستجو در سوالات فنی..."
              className="w-full pr-10 pl-3.5 py-2 text-xs bg-[#08090C] border border-white/15 text-white placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* FAQ Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredFaqs.map((item, idx) => (
            <article
              key={item.q}
              className="hud-corner-brackets brand-animated-border bg-[#0B0C10] border border-white/[0.09] p-6 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-white/[0.07] pb-2.5 text-[11px] font-mono">
                  <span className="text-[#EC008C] font-bold">
                    [FAQ.0{idx + 1}] {item.categoryLabel}
                  </span>
                  <HelpCircle className="w-4 h-4 text-[#EC008C]" />
                </div>
                <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {item.q}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#08090C] border border-white/[0.06] p-4">
                  {item.a}
                </p>
              </div>
              <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="inline-flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>پاسخ واحد فنی شرکت بتا</span>
                </span>
                <Link href="/beta-doors-manuals" className="text-[#EC008C] hover:underline">
                  دانلود نقشه مرتبط ←
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Direct Phone & Manual Action Strip */}
        <div className="hud-corner-brackets bg-[#0B0C10] border border-white/10 p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">
              پاسخ سوال فنی خود را پیدا نکردید؟
            </h3>
            <p className="text-xs text-slate-400">
              کارشناسان پشتیبانی فنی شرکت بتا شنبه تا چهارشنبه (۸:۰۰ الی ۱۷:۳۰) آماده راهنمایی تلفنی نصابان و مشتریان هستند.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${brand.phone.replace(/\s+/g, '')}`}
              className="keep-white-text inline-flex items-center gap-2 px-5 py-2.5 bg-[#EC008C] hover:bg-[#d4007d] text-white text-xs font-mono font-bold"
            >
              <PhoneCall className="w-4 h-4" />
              <span dir="ltr">021-88404407 - 9</span>
            </a>
            <Link
              href="/beta-doors-manuals"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#08090C] border border-white/15 text-white text-xs font-mono"
            >
              <FileText className="w-4 h-4 text-[#EC008C]" />
              <span>دانلود کاتالوگ‌ها و اپلیکیشن‌ها</span>
            </Link>
            <a
              href="#smart-support-enquiry"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#08090C] border border-white/15 text-slate-200 text-xs font-mono"
            >
              <span>ارسال سوال به واحد فنی</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#EC008C]" />
            </a>
          </div>
        </div>

        <div id="smart-support-enquiry">
          <EnquiryForm
            sourcePagePath="/beta-smart-support/"
            productContext="سوال فنی و پشتیبانی برنامه‌ریزی محصولات بتا"
            heading="ثبت سوال فنی یا درخواست راهنمایی راه‌اندازی"
            subheading="مدل دقیق دستگاه (جک، مدار کنترل، سیموت، دزدگیر یا حضور و غیاب) و سوال فنی خود را در فرم زیر بنویسید."
          />
        </div>
      </div>
    </SiteShell>
  );
}
