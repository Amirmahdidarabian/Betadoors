'use client';

import React from 'react';
import Link from 'next/link';
import {
  Phone,
  MapPin,
  ArrowUpRight,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { SiteShell } from '@/components/layout/SiteShell';
import { DeFiPageHeroStage } from '@/components/hero/DeFiPageHeroStage';
import { HudSectionRail } from '@/components/sections/HomeSections';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { useBetaDoors } from '@/components/providers/BetaDoorsProvider';

// Official After-Sales & Technical Services from https://www.beta.ir/form/main?id=11
const OFFICIAL_SERVICES = [
  {
    id: 'board-and-receiver-repair',
    number: '۰۱',
    title: 'تعمیر تخصصی مدارهای کنترل و رسیورهای سیموت',
    tag: 'CONTROL BOARDS & SIMOTE',
    metric: 'تست تخصصی SMD',
    description:
      'عیب‌یابی و تعمیر تخصصی انواع مرکز کنترل جک پارکینگی (Rock-S، ROCK، Solid، BT1)، برد کرکره برقی و رسیورهای سیم‌کارتی سیموت ۲، ۴ و ۸ رله با قطعات اصلی در واحد خدمات مرکزی.',
  },
  {
    id: 'gate-opener-overhaul',
    number: '۰۲',
    title: 'سرویس و بازسازی جک‌های بازویی و موتورهای ریلی',
    tag: 'TITAN · F600 · F-550M',
    metric: 'تامین قطعات فابریک',
    description:
      'سرویس کامل گیربکس، شفت، استاتور، میکروسوئیچ و خلاص‌کن جک‌های بازویی (MPC TITAN-400/600، F600، BETA-400) و موتورهای ریلی F-550M و F-500.',
  },
  {
    id: 'attendance-uhf-support',
    number: '۰۳',
    title: 'پشتیبانی دستگاه‌های حضور و غیاب، اکسس کنترل و UHF',
    tag: 'ATTENDANCE & UHF',
    metric: 'کالیبراسیون سنسور و برد',
    description:
      'خدمات گارانتی، ارتقای فریمور و تعمیر سنسور اپتیکال، برد شبکه و ماژول فرکانسی دستگاه‌های حضور و غیاب سری 2209/2208، کارتخوان‌های 1206TW و آنتن‌های UHF برد بلند.',
  },
  {
    id: 'shutter-and-ups-service',
    number: '۰۴',
    title: 'خدمات موتور کرکره ساید، توبولار و برق اضطراری UPS',
    tag: 'SHUTTER MOTORS & UPS',
    metric: 'تست بار و باتری بکاپ',
    description:
      'بررسی و تعمیر موتورهای کرکره ساید (300Kg تا 1000Kg)، موتورهای توبولار و برد شارژر دستگاه‌های برق اضطراری UPS ۱۲ و ۲۴ ولت بتا.',
  },
  {
    id: 'alarm-and-gsm-service',
    number: '۰۵',
    title: 'تعمیر و پشتیبانی دزدگیر اماکن Z7-GSM و چشمی‌ها',
    tag: 'Z7-GSM PLUS & B1',
    metric: 'تست ماژول مخابراتی',
    description:
      'رفع ایرادات ماژول سیم‌کارت، تلفن‌کننده خط ثابت، زون‌ها و کالیبراسیون چشمی‌های حرکتی (G9، G15، G20) و دزدگیرهای Z7-GSM Plus و B1 Ultimate Plus.',
  },
  {
    id: 'barrier-and-glass-operator',
    number: '۰۶',
    title: 'پشتیبانی راهبندهای B600/B400 و اپراتور شیشه‌ای Target',
    tag: 'BARRIERS & GLASS DOOR',
    metric: 'پشتیبانی پروژه‌های سازمانی',
    description:
      'تامین برد، فنر بالانس، بوم تلسکوپی/LEDدار راهبندهای B600 و B400 و سرویس موتور، برد و رادارهای اپراتور شیشه برقی ریلی Target و بازویی 1808.',
  },
];

// Verbatim rules from http://www.beta.ir/form/main?id=11
const AFTER_SALES_RULES = [
  'واحد خدمات پس از فروش فقط محصولات شرکت بتا را پذیرش می‌نماید؛ لذا از ارسال محصولات متفرقه خودداری فرمایید (در صورت ارسال، بدون بررسی عودت داده می‌شود).',
  'خواهشمند است عیوب مشاهده‌شده را به طور دقیق بر روی هر دستگاه یادداشت و الصاق نمایید تا سرعت عیب‌یابی افزایش یابد.',
  'مدت زمان ارائه خدمات در واحد گارانتی از تاریخ تحویل به این واحد، بین ۲ الی ۷ روز کاری می‌باشد.',
  'برای دستگاه‌های خارج از گارانتی (وارانتی)، سقف هزینه تعمیرات بدون هماهنگی قبلی ۱,۰۰۰,۰۰۰ ریال است و مبالغ بالاتر پس از اعلام هزینه و تایید مشتری انجام می‌پذیرد.',
];

export default function ServicesPage() {
  const { pages } = useBetaDoors();

  const localServicePages = pages.filter(
    (p) => p.category === 'local_services' && p.status === 'published'
  );

  return (
    <SiteShell>
      {/* 1. Architectural HUD Stage */}
      <DeFiPageHeroStage
        ariaLabel="واحد خدمات پس از فروش شرکت بتا (BETA.IR)"
        badgeText="سرعت در خدمات، کیفیت در محصول، نوآوری در طراحی · پاسخگویی ۲ الی ۷ روز کاری"
        badgeHref="#make-an-enquiry"
        headlinePrimary="خدمات پس از فروش و"
        headlineGradient="پشتیبانی فنی شرکت بتا"
        subheadline="واحد خدمات پس از فروش شرکت بتا در دفتر مرکزی تهران با بهره‌گیری از مهندسان مجرب و تجهیزات تست استاندارد، کلیه محصولات تولیدی بتا را در کوتاه‌ترین زمان (۲ الی ۷ روز کاری) عیب‌یابی، تعمیر و پشتیبانی می‌نماید."
        primaryCtaLabel="فرم پذیرش تعمیر و سرویس"
        primaryCtaHref="/register-to-service"
        secondaryCtaLabel="تماس: ۰۲۱-۸۸۴۰۴۴۰۷"
        secondaryCtaHref="tel:02188404407"
        scrollTargetId="services-we-offer"
        topLeftNode={{ label: 'زمان ارائه خدمات', metric: '۲ تا ۷ روز کاری' }}
        topRightNode={{ label: 'تعمیر برد و سیموت', metric: 'قطعات اورجینال' }}
        bottomLeftNode={{ label: 'تعمیر جک و موتور', metric: 'TITAN · F600 · Side' }}
        bottomRightNode={{ label: 'دفتر مرکزی تهران', metric: '۰۲۱-۸۸۴۰۴۴۰۷' }}
        horizonSlides={[
          { label: '۰۱/۰۴ · خدمات پس از فروش بتا', tag: 'پذیرش و تعمیر تخصصی محصولات بتا در ۲ الی ۷ روز کاری' },
          { label: '۰۲/۰۴ · خدمات پس از فروش بتا', tag: 'تعمیر بردهای کنترل جک، کرکره و رسیورهای سیم‌کارتی سیموت' },
          { label: '۰۳/۰۴ · خدمات پس از فروش بتا', tag: 'سرویس جک‌های بازویی، ریلی، موتور کرکره، راهبند و اپراتور' },
          { label: '۰۴/۰۴ · خدمات پس از فروش بتا', tag: 'پشتیبانی دستگاه حضور و غیاب، آنتن UHF و دزدگیر Z7-GSM' },
        ]}
      />

      {/* 2. Official beta.ir After-Sales Conditions Box */}
      <section className="w-full max-w-[1760px] mx-auto px-3 sm:px-5 lg:px-7 pt-10">
        <div className="hud-corner-brackets brand-animated-border rounded-none bg-[#0B0C10] border border-[#EC008C]/40 p-6 sm:p-8 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-2.5">
              <ShieldAlert className="w-5 h-5 text-[#EC008C]" />
              <h2 className="text-lg sm:text-2xl font-bold text-white">
                ضوابط و شرایط رسمی پذیرش در واحد خدمات پس از فروش شرکت بتا (BETA.IR)
              </h2>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#08090C] border border-white/15 text-xs font-mono text-[#ff7ac6]">
              <Clock className="w-3.5 h-3.5 text-[#EC008C]" />
              <span>مدت زمان خدمات: ۲ الی ۷ روز کاری</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {AFTER_SALES_RULES.map((rule, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 bg-[#08090C] border border-white/[0.08] text-xs sm:text-sm text-slate-200 leading-relaxed"
              >
                <CheckCircle2 className="w-4 h-4 text-[#EC008C] shrink-0 mt-1" />
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 6 Specialist Service Divisions (0px Sharp HUD Cards) */}
      <section
        id="services-we-offer"
        className="w-full max-w-[1760px] mx-auto px-3 sm:px-5 lg:px-7 py-14 space-y-10"
      >
        <HudSectionRail
          code="HUD.SRV.01"
          sector="واحدهای تخصصی تعمیرات و خدمات پس از فروش شرکت بتا // ۰۶ دپارتمان فنی"
          status="۰۲۱-۸۸۴۰۴۴۰۷ الی ۴۰۹"
        />

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-none border border-[#EC008C]/40 bg-[#EC008C]/15 px-3 py-1 font-mono text-[11px] text-[#ff7ac6]">
              <Sparkles className="w-3.5 h-3.5 text-[#EC008C]" />
              <span>OFFICIAL BETA.IR AFTER-SALES SUPPORT</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              بخش‌های تخصصی خدمات فنی و گارانتی بتا
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              برای ثبت آنلاین درخواست تعمیر، بارگذاری تصویر فاکتور/گارانتی یا دریافت مشاوره فنی از یکی از گزینه‌های زیر اقدام نمایید.
            </p>
          </div>
          <Link
            href="/register-to-service"
            className="keep-white-text inline-flex items-center gap-2 px-5 py-2.5 rounded-none bg-[#EC008C] hover:bg-[#d4007d] text-white text-xs font-mono font-bold transition-colors self-start"
          >
            <span>ثبت آنلاین درخواست تعمیر و سرویس</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {OFFICIAL_SERVICES.map((srv) => (
            <article
              key={srv.id}
              className="hud-corner-brackets brand-animated-border hud-technical-grid rounded-none bg-[#0B0C10] border border-white/[0.09] p-6 flex flex-col justify-between transition-all relative overflow-hidden group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.07]">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#EC008C]">
                    [{srv.number}] {srv.tag}
                  </span>
                  <span className="rounded-none border border-white/15 bg-[#08090C] px-2.5 py-0.5 font-mono text-[10px] text-slate-300">
                    {srv.metric}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#EC008C] transition-colors">
                  {srv.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {srv.description}
                </p>
              </div>

              <div className="pt-5 mt-6 border-t border-white/[0.07] flex items-center justify-between gap-3">
                <a
                  href="#make-an-enquiry"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-white hover:text-[#EC008C] transition-colors"
                >
                  <span>ثبت درخواست پشتیبانی</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#EC008C]" />
                </a>
                <a
                  href="tel:02188404407"
                  dir="ltr"
                  className="font-mono text-[11px] text-slate-400 hover:text-white tabular-nums"
                >
                  021-88404407
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Regional Service & Distribution Hubs Directory (0px Sharp HUD Grid) */}
      <section className="w-full max-w-[1760px] mx-auto px-3 sm:px-5 lg:px-7 py-10">
        <HudSectionRail
          code="HUD.SRV.02"
          sector="مراکز پخش، نمایندگی و خدمات منطقه‌ای شرکت بتا // ۱۱ مرکز"
          status="پشتیبانی سراسری"
        />

        <div className="hud-corner-brackets rounded-none border border-white/[0.09] bg-[#0B0C10] p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.07] pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-[#EC008C]">
                <MapPin className="w-4 h-4" />
                <span>دفتر مرکزی تهران، مراکز استانی و شعبه ملبورن استرالیا</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-bold text-white">
                پوشش فروش و خدمات پس از فروش در سراسر کشور
              </h2>
            </div>
            <a
              href="tel:02188404407"
              className="keep-white-text inline-flex items-center gap-2 rounded-none bg-[#EC008C] hover:bg-[#d4007d] px-4 py-2.5 text-xs font-mono font-bold text-white"
            >
              <Phone className="w-3.5 h-3.5" />
              <span dir="ltr">021-88404407 - 9</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {localServicePages.map((page, idx) => (
              <Link
                key={page.slug}
                href={page.slug}
                className="hud-corner-brackets flex items-center justify-between rounded-none border border-white/[0.09] bg-[#08090C] hover:border-[#EC008C]/60 px-4 py-3.5 text-xs text-slate-200 hover:text-white transition-all"
              >
                <div className="truncate pl-3">
                  <div className="font-semibold text-white truncate">
                    <span className="font-mono text-[#EC008C] ml-1.5">
                      [{String(idx + 1).padStart(2, '0')}]
                    </span>
                    {page.title}
                  </div>
                  <div className="font-mono text-[10px] text-slate-500 mt-0.5 truncate" dir="ltr">
                    {page.slug}
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#EC008C] shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Make an Enquiry Form */}
      <section id="make-an-enquiry" className="w-full max-w-[1760px] mx-auto px-3 sm:px-5 lg:px-7 py-12">
        <EnquiryForm
          sourcePagePath="/services/"
          heading="درخواست پشتیبانی فنی یا پیگیری خدمات پس از فروش"
          subheading="فرم زیر را تکمیل نمایید یا در ساعات کاری (شنبه تا چهارشنبه ۸:۰۰ الی ۱۷:۳۰) با شماره‌های ۰۲۱-۸۸۴۰۴۴۰۷ الی ۴۰۹ تماس حاصل فرمایید."
        />
      </section>
    </SiteShell>
  );
}
