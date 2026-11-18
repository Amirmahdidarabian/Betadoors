'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  Award,
  Clock,
  Cpu,
  MapPin,
  Sparkles,
  Quote,
} from 'lucide-react';
import { SiteShell } from '@/components/layout/SiteShell';
import { DeFiPageHeroStage } from '@/components/hero/DeFiPageHeroStage';
import { HudSectionRail } from '@/components/sections/HomeSections';
import { EnquiryForm } from '@/components/forms/EnquiryForm';

export default function AboutUsPage() {
  return (
    <SiteShell>
      {/* 1. Architectural HUD Stage */}
      <DeFiPageHeroStage
        ariaLabel="درباره شرکت بتا (BETA.IR)"
        badgeText="شرکت بتا (بتا صنعت ایلیا) · تاسیس ۱۳۸۰ خورشیدی · تولید ملی با استانداردهای جهانی"
        badgeHref="#about-bento-grid"
        headlinePrimary="بیش از دو دهه پیشگامی در صنعت"
        headlineGradient="الکترونیک، کنترل تردد و اتوماسیون"
        subheadline="وقتی بتا می‌خری خیالت راحته، چون برند می‌خری... شرکت بتا در سال ۱۳۸۰ فعالیت خود را با طراحی و تولید بردهای الکترونیکی، درب بازکن‌های اتوماتیک پارکینگی، سیستم‌های کنترل تردد، ریموت کنترل، راهبند، موتور کرکره و دزدگیر اماکن آغاز نمود."
        primaryCtaLabel="مشاهده کاتالوگ محصولات"
        primaryCtaHref="/products"
        secondaryCtaLabel="ارتباط با واحد فروش"
        secondaryCtaHref="#about-enquiry-section"
        scrollTargetId="about-bento-grid"
        topLeftNode={{
          label: 'سال تاسیس',
          metric: '۱۳۸۰ خورشیدی',
          href: '#about-bento-grid',
        }}
        topRightNode={{
          label: 'تنوع سبد محصولات',
          metric: '+۳۰۰ مدل محصول',
          href: '/products',
        }}
        bottomLeftNode={{
          label: 'خدمات پس از فروش',
          metric: '۲ تا ۷ روز کاری',
          href: '/services',
        }}
        bottomRightNode={{
          label: 'دفتر مرکزی تهران',
          metric: '۰۲۱-۸۸۴۰۴۴۰۷',
          href: '/contact-us',
        }}
        horizonSlides={[
          { label: '۰۱/۰۴ · درباره شرکت بتا', tag: 'تاسیس ۱۳۸۰ — طراح و تولیدکننده سیستم‌های الکترونیکی و اتوماسیون' },
          { label: '۰۲/۰۴ · پیام مدیرعامل', tag: 'مهندس ایرج مقاصدی — کیفیت پایدار و پشتیبانی بی‌وقفه' },
          { label: '۰۳/۰۴ · تحقیق و توسعه (R&D)', tag: 'طراحی بومی مدارهای کنترل، رسیورهای سیموت و دزدگیرهای Z7-GSM' },
          { label: '۰۴/۰۴ · حضور بین‌المللی', tag: 'دفتر مرکزی تهران و شعبه رسمی ملبورن استرالیا' },
        ]}
      />

      {/* 2. Architectural HUD Bento Grid — Official beta.ir/about Pillars */}
      <section
        id="about-bento-grid"
        className="w-full max-w-[1760px] mx-auto px-3 sm:px-5 lg:px-7 py-14 space-y-10"
      >
        <HudSectionRail
          code="HUD.ABOUT.01"
          sector="معرفی و تاریخچه شرکت بتا (BETA.IR) // تاسیس ۱۳۸۰"
          status="تولیدکننده برتر ملی"
        />

        <div className="max-w-3xl space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-[#EC008C]/15 border border-[#EC008C]/40 text-[11px] font-mono text-[#ff7ac6]">
            <Sparkles className="w-3.5 h-3.5 text-[#EC008C]" />
            <span>OFFICIAL BETA.IR/ABOUT // بتا صنعت ایلیا</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            سرعت در خدمات، کیفیت در محصول،{' '}
            <span className="text-[#EC008C]">نوآوری در طراحی</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            شرکت بتا با تکیه بر دانش فنی مهندسان ایرانی، خطوط تولید مجهز SMD و کنترل کیفیت چندمرحله‌ای، متنوع‌ترین سبد محصولات اتوماسیون ورودی، کنترل تردد و سیستم‌های امنیتی را در سطح کشور و بازارهای صادراتی عرضه می‌نماید.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Card 1: Large Right Feature in RTL (7 cols) — History & CEO Message */}
          <div className="lg:col-span-7 hud-corner-brackets brand-animated-border hud-technical-grid relative rounded-none bg-[#0B0C10] border border-white/[0.09] p-6 sm:p-8 overflow-hidden flex flex-col justify-between">
            <div className="relative z-10 flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-white/[0.07]">
              <div>
                <div className="text-3xl sm:text-4xl font-bold font-mono text-white tracking-tight tabular-nums">
                  ۱۳۸۰ <span className="text-[#EC008C]">BETA.IR</span>
                </div>
                <div className="text-xs text-slate-400 mt-1 font-mono">
                  بیش از دو دهه طراحی و تولید تخصصی در صنعت الکترونیک و اتوماسیون ایران
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-none bg-[#08090C] border border-white/15 text-[10px] font-mono text-slate-300">
                  ۹ گروه محصول تخصصی
                </span>
                <span className="keep-white-text px-2.5 py-1 rounded-none bg-[#EC008C] text-[10px] font-mono font-bold text-white">
                  تهران + ملبورن استرالیا
                </span>
              </div>
            </div>

            <div className="relative z-10 my-6 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {[
                {
                  code: 'PIL.01',
                  icon: Cpu,
                  title: 'تحقیق و توسعه و تولید برد (R&D)',
                  desc: 'طراحی و مونتاژ تمام‌اتوماتیک انواع مدار کنترل جک، کرکره برقی، رسیورهای سیم‌کارتی سیموت، دزدگیر اماکن و ریموت کنترل.',
                },
                {
                  code: 'PIL.02',
                  icon: Award,
                  title: 'متنوع‌ترین سبد خرید در کشور',
                  desc: 'پوشش کامل جک پارکینگی، موتور کرکره، راهبند، اپراتور شیشه‌ای، حضور و غیاب، آنتن UHF، دستگیره دیجیتال، قفل برقی و UPS.',
                },
                {
                  code: 'PIL.03',
                  icon: Clock,
                  title: 'پشتیبانی در خدمات پس از فروش',
                  desc: 'تعهد پاسخگویی و تعمیر تخصصی در مدت ۲ الی ۷ روز کاری در واحد خدمات مرکزی تهران همراه با تامین پایدار قطعات.',
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-none bg-[#08090C] border border-white/[0.08] p-4 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-none bg-[#0B0C10] border border-white/15 flex items-center justify-center text-white">
                        <Icon className="w-4 h-4 text-[#EC008C]" />
                      </div>
                      <span className="text-[10px] font-mono text-[#ff7ac6] font-bold">
                        [{item.code}]
                      </span>
                    </div>
                    <h3 className="text-xs font-bold text-white">{item.title}</h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* CEO Message from beta.ir/about */}
            <div className="relative z-10 space-y-2.5 pt-4 border-t border-white/[0.07] bg-[#08090C] p-5 border border-white/[0.08]">
              <div className="flex items-center justify-between">
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <Quote className="w-4 h-4 text-[#EC008C]" />
                  <span>سخن مدیرعامل — مهندس ایرج مقاصدی</span>
                </h3>
                <span className="text-[10px] font-mono text-[#EC008C] font-bold">
                  مدیریت عامل شرکت بتا
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                «از نخستین روز فعالیت شرکت بتا در سال ۱۳۸۰، هدف ما تولید محصولاتی با کیفیت تراز اول، قیمت رقابتی و پشتیبانی واقعی از نصابان، همکاران و مصرف‌کنندگان نهایی بوده است. اعتماد بازار ایران و حضور موفق در بازار استرالیا، نتیجه تلاش مستمر تیم مهندسی، تولید و خدمات پس از فروش خانواده بزرگ بتا است؛ چرا که معتقدیم وقتی بتا می‌خری خیالت راحته، چون برند می‌خری...»
              </p>
            </div>
          </div>

          {/* Card 2: Left Vertical Telemetry Card in RTL (5 cols) — Tehran HQ & Australia Branch */}
          <div className="lg:col-span-5 hud-corner-brackets brand-animated-border hud-technical-grid relative rounded-none bg-[#0B0C10] border border-white/[0.09] p-6 sm:p-8 overflow-hidden flex flex-col justify-between">
            <div className="space-y-3 pb-4 border-b border-white/[0.07]">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-none bg-[#08090C] border border-white/15 text-[10px] font-mono text-[#ff7ac6]">
                <MapPin className="w-3.5 h-3.5 text-[#EC008C]" />
                <span>دفتر مرکزی تهران و شعبه بین‌المللی استرالیا</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                اطلاعات تماس رسمی شرکت بتا (BETA.IR)
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                دفتر مرکزی فروش و خدمات پس از فروش شرکت بتا در تهران واقع شده و شعبه بین‌المللی شرکت نیز در ملبورن استرالیا (Campbellfield VIC 3061) فعالیت می‌نماید.
              </p>
            </div>

            <div className="my-5 space-y-2.5">
              {[
                {
                  label: 'آدرس دفتر مرکزی ایران',
                  value: 'تهران، اتوبان صیاد شیرازی، خروجی مسیل باختر، پلاک ۱۲',
                },
                {
                  label: 'کد پستی دفتر مرکزی',
                  value: '۱۶۳۱۹-۳۵۷۱۱',
                },
                {
                  label: 'تلفن‌های ویژه تهران',
                  value: '021-88404407 · 021-88404408 · 021-88404409',
                },
                {
                  label: 'ساعات کاری شرکت',
                  value: 'شنبه تا چهارشنبه ۸:۰۰ الی ۱۷:۳۰ (پنج‌شنبه و جمعه تعطیل)',
                },
                {
                  label: 'ایمیل و شبکه‌های اجتماعی',
                  value: 'info@beta.ir | @BETAsanatilia',
                },
                {
                  label: 'شعبه استرالیا (ملبورن)',
                  value: '5/1730 Hume Hwy, Campbellfield VIC 3061 · 1300 238 243',
                },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 rounded-none bg-[#08090C] border border-white/[0.08] px-3.5 py-2.5 text-xs"
                >
                  <span className="text-[10px] text-[#ff7ac6] font-mono font-bold">
                    {row.label}
                  </span>
                  <span className="text-white font-medium">{row.value}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-white/[0.07]">
              <Link
                href="/products"
                className="keep-white-text inline-flex items-center gap-1.5 px-4 py-2.5 rounded-none bg-[#EC008C] hover:bg-[#d4007d] text-white text-xs font-mono font-bold transition-colors"
              >
                <span>مشاهده کاتالوگ محصولات</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/beta-doors-manuals"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-none bg-[#08090C] hover:bg-white/[0.08] border border-white/15 text-xs font-mono font-semibold text-white transition-colors"
              >
                <span>دانلود اپلیکیشن‌ها و کاتالوگ</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#EC008C]" />
              </Link>
            </div>
          </div>
        </div>

        {/* 3. Quick Navigation Cards (0px Sharp HUD Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {[
            {
              idx: '۰۱',
              tag: 'کاتالوگ محصولات',
              title: '۹ خانواده تخصصی محصول',
              desc: 'جک پارکینگی، مدار کنترل، حضور و غیاب و UHF، ریموت، موتور کرکره، راهبند، اپراتور شیشه‌ای، دزدگیر و UPS.',
              href: '/products',
            },
            {
              idx: '۰۲',
              tag: 'فروشگاه آنلاین',
              title: '۵ پکیج آماده سفارش',
              desc: 'پک جک بازویی/ریلی، موتور کرکره ساید با UPS، دزدگیر Z7-GSM Plus، رسیور سیموت و ریموت بتا.',
              href: '/shop',
            },
            {
              idx: '۰۳',
              tag: 'خدمات پس از فروش',
              title: 'ضوابط گارانتی و تعمیرات',
              desc: 'پاسخگویی ۲ تا ۷ روز کاری در واحد گارانتی و تعمیر تخصصی انواع برد، جک و موتور.',
              href: '/services',
            },
            {
              idx: '۰۴',
              tag: 'نرم‌افزار و آموزش',
              title: 'اپلیکیشن موبایل و سوالات متداول',
              desc: 'دانلود اپ‌های Smart Simote و Z7-GSM، نقشه‌های سیم‌کشی بردها و بانک سوالات فنی (FAQ).',
              href: '/beta-doors-manuals',
            },
          ].map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group hud-corner-brackets brand-animated-border rounded-none bg-[#0B0C10] border border-white/[0.09] p-5 flex flex-col justify-between transition-all hover:-translate-y-0.5"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider border-b border-white/[0.07] pb-2">
                  <span className="text-[#EC008C] font-bold">
                    [{card.idx}] {card.tag}
                  </span>
                  <span className="text-slate-500">BETA.IR</span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-[#EC008C] transition-colors pt-1">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {card.desc}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-white/[0.07] flex items-center justify-between text-xs font-mono font-semibold text-white">
                <span className="group-hover:text-[#EC008C] transition-colors">
                  ورود به بخش
                </span>
                <ArrowUpRight className="w-4 h-4 text-[#EC008C] transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Enquiry Section */}
      <section
        id="about-enquiry-section"
        className="w-full max-w-[1760px] mx-auto px-3 sm:px-5 lg:px-7 pb-14"
      >
        <EnquiryForm
          sourcePagePath="/about-us"
          heading="ارتباط مستقیم با دفتر مرکزی شرکت بتا (تهران)"
          subheading="با واحد فروش، امور نمایندگان و پشتیبانی فنی شرکت بتا با شماره‌های ۰۲۱-۸۸۴۰۴۴۰۷ الی ۴۰۹ تماس بگیرید یا فرم زیر را تکمیل نمایید."
        />
      </section>
    </SiteShell>
  );
}
