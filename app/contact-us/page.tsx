'use client';

import React from 'react';
import { MapPin, Phone, Mail, Clock, Sparkles, Navigation, Globe2, Send } from 'lucide-react';
import { SiteShell } from '@/components/layout/SiteShell';
import { DeFiPageHeroStage } from '@/components/hero/DeFiPageHeroStage';
import { EnquiryForm } from '@/components/forms/EnquiryForm';

export default function ContactUsPage() {
  return (
    <SiteShell>
      <DeFiPageHeroStage
        ariaLabel="بخش تماس با شرکت بتا (BETA.IR)"
        badgeText="ارتباط مستقیم با دفتر مرکزی تهران · ۰۲۱-۸۸۴۰۴۴۰۷ الی ۴۰۹"
        badgeHref="#contact-enquiry-desk"
        headlinePrimary="تماس با شرکت بتا"
        headlineGradient="دفتر مرکزی و خدمات پس از فروش"
        subheadline="جهت دریافت مشاوره فنی خرید جک پارکینگی و موتور کرکره برقی، اخذ نمایندگی فروش در سراسر ایران، و یا پیگیری امور گارانتی و خدمات پس از فروش با دفتر مرکزی شرکت بتا در تهران در ارتباط باشید."
        primaryCtaLabel="ثبت فرم تماس و استعلام آنلاین"
        primaryCtaHref="#contact-enquiry-desk"
        secondaryCtaLabel="تماس تلفنی: ۰۲۱-۸۸۴۰۴۴۰۷"
        secondaryCtaHref="tel:02188404407"
        scrollTargetId="contact-enquiry-desk"
        topLeftNode={{
          label: 'تلفن دفتر مرکزی',
          metric: '021-88404407-9',
          href: 'tel:02188404407',
        }}
        topRightNode={{
          label: 'دفتر مرکزی تهران',
          metric: 'مسیل باختر، پلاک ۱۲',
          href: '#contact-enquiry-desk',
        }}
        bottomLeftNode={{
          label: 'پست الکترونیک',
          metric: 'info@beta.ir',
          href: 'mailto:info@beta.ir',
        }}
        bottomRightNode={{
          label: 'شعبه استرالیا (ملبورن)',
          metric: '1300 238 243',
          href: '/campbellfield',
        }}
        horizonSlides={[
          { label: '01/04 . دفتر مرکزی تهران', tag: 'اتوبان صیاد شیرازی، خروجی مسیل باختر، پلاک ۱۲' },
          { label: '02/04 . خطوط ویژه فروش و پشتیبانی', tag: '۰۲۱-۸۸۴۰۴۴۰۷ الی ۴۰۹ · info@beta.ir' },
          { label: '03/04 . واحد خدمات پس از فروش', tag: 'پذیرش حضوری و ارسال پستی بردها و جک‌ها' },
          { label: '04/04 . شعبه بین‌المللی استرالیا', tag: '5/1730 Hume Hwy, Campbellfield VIC 3061' },
        ]}
      />

      <section
        id="contact-enquiry-desk"
        dir="rtl"
        className="px-4 sm:px-8 lg:px-12 py-12 max-w-[1440px] mx-auto space-y-10"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              icon: MapPin,
              label: 'نشانی دفتر مرکزی تهران',
              value: 'تهران، اتوبان صیاد شیرازی، خروجی مسیل باختر، پلاک ۱۲ (کد پستی: ۱۶۳۱۹-۳۵۷۱۱)',
            },
            {
              icon: Phone,
              label: 'تلفن‌های تماس (۳ خط ویژه)',
              value: '۰۲۱-۸۸۴۰۴۴۰۷ الی ۴۰۹',
            },
            {
              icon: Mail,
              label: 'پست الکترونیک و شبکه‌های اجتماعی',
              value: 'info@beta.ir · تلگرام: @BETAsanatilia',
            },
            {
              icon: Clock,
              label: 'ساعات کاری دفتر مرکزی و خدمات',
              value: 'شنبه تا چهارشنبه ۸:۰۰ الی ۱۷:۳۰',
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="hud-corner-brackets rounded-none bg-[#0B0C0F] border border-white/[0.08] p-6 space-y-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.65)]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#EC008C]">
                    {item.label}
                  </span>
                  <Icon className="w-4 h-4 text-slate-400" />
                </div>
                <div className="text-sm font-semibold text-white leading-relaxed">{item.value}</div>
              </div>
            );
          })}
        </div>

        {/* Navigation Links (Waze, Google Maps, Telegram, Instagram) + Australia Branch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 hud-corner-brackets rounded-none bg-[#0B0C0F] border border-white/[0.08] p-6 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-[#EC008C]">
              [NAVIGATION &amp; SOCIAL CHANNELS // مسیریابی و شبکه‌های اجتماعی رسمی بتا]
            </div>
            <h3 className="text-lg font-bold text-white">
              دسترسی سریع و مسیریابی به دفتر مرکزی شرکت بتا
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              مراجعه‌کنندگان محترم واحد فروش و خدمات پس از فروش می‌توانند از طریق لینک‌های مستقیم زیر در اپلیکیشن‌های مسیریاب Waze و Google Maps به دفتر مرکزی شرکت بتا (خروجی مسیل باختر، پلاک ۱۲) مراجعه نمایند.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href="https://maps.google.com/?q=35.7292,51.4581"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-none bg-[#08090C] border border-white/15 hover:border-[#EC008C]/60 text-xs font-mono text-white transition"
              >
                <Navigation className="w-3.5 h-3.5 text-[#EC008C]" />
                <span>مسیریابی در Google Maps</span>
              </a>
              <a
                href="https://waze.com/ul?ll=35.7292,51.4581&navigate=yes"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-none bg-[#08090C] border border-white/15 hover:border-[#EC008C]/60 text-xs font-mono text-white transition"
              >
                <MapPin className="w-3.5 h-3.5 text-[#EC008C]" />
                <span>مسیریابی در Waze</span>
              </a>
              <a
                href="https://t.me/BETAsanatilia"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-none bg-[#08090C] border border-white/15 hover:border-[#EC008C]/60 text-xs font-mono text-white transition"
              >
                <Send className="w-3.5 h-3.5 text-[#EC008C]" />
                <span>کانال تلگرام: @BETAsanatilia</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 hud-corner-brackets rounded-none bg-[#0B0C0F] border border-white/[0.08] p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-[#EC008C]">
                [INTERNATIONAL BRANCH // شعبه استرالیا]
              </span>
              <Globe2 className="w-4 h-4 text-[#EC008C]" />
            </div>
            <h3 className="text-lg font-bold text-white">
              شعبه ملبورن استرالیا (BETA DOORS AUSTRALIA)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              تامین و خدمات تخصصی درب‌های اتوماتیک، موتورهای سکشنال و رولردور در ایالت ویکتوریا و سراسر استرالیا:
            </p>
            <div className="text-xs font-mono text-slate-200 space-y-1 pt-1" dir="ltr">
              <div>Address: 5/1730 Sydney Road (Hume Hwy), Campbellfield, VIC 3061</div>
              <div>National Phone: 1300 238 243 · Email: sales@betadoors.com.au</div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="mb-6 text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-none bg-white/[0.04] border border-white/10 text-[11px] font-mono text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-[#EC008C]" />
              <span>BETA.IR · ثبت درخواست مشاوره، خرید و نمایندگی</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-semibold text-white tracking-tight">
              ارسال پیام و استعلام مستقیم به شرکت بتا
            </h2>
          </div>
          <EnquiryForm
            sourcePagePath="/contact-us"
            heading="فرم ارتباط مستقیم با واحد فروش و پشتیبانی بتا"
            subheading="پاسخگویی مستقیم توسط کارشناسان دفتر مرکزی تهران (۰۲۱-۸۸۴۰۴۴۰۷ الی ۴۰۹ · info@beta.ir)."
          />
        </div>
      </section>
    </SiteShell>
  );
}
