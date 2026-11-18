'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  FileText,
  Wrench,
  ArrowUpRight,
  Award,
} from 'lucide-react';
import { SiteShell } from '@/components/layout/SiteShell';
import { DeFiPageHeroStage } from '@/components/hero/DeFiPageHeroStage';
import { useBetaDoors } from '@/components/providers/BetaDoorsProvider';

export default function WarrantyRegistrationPage() {
  const { mutateServer } = useBetaDoors();

  const [serialNumber, setSerialNumber] = useState('');
  const [dealerCode, setDealerCode] = useState('');
  const [installationDate, setInstallationDate] = useState('14/11/2026');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [suburb, setSuburb] = useState('');
  const [state, setState] = useState('تهران');
  const [postcode, setPostcode] = useState('');
  const [country, setCountry] = useState('ایران');

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [referenceCode, setReferenceCode] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await mutateServer('submit_warranty', {
        serialNumber,
        dealerCode,
        installationDate,
        firstName,
        lastName,
        email,
        phone,
        street,
        addressLine2,
        suburb,
        state,
        postcode,
        country,
      });
      if (!res.ok) {
        setError(String(res.error || 'خطا در اعتبارسنجی اطلاعات گارانتی.'));
      } else {
        setReferenceCode(String(res.referenceCode));
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SiteShell>
      {/* 1. DeFi 16:9 Atmospheric Hero Stage */}
      <DeFiPageHeroStage
        ariaLabel="پرتال ثبت گارانتی محصولات شرکت بتا"
        badgeText="گارانتی و خدمات پس از فروش رسمی شرکت بتا · BETA.IR"
        badgeHref="#warranty-registration-form"
        headlinePrimary="پرتال ثبت آنلاین گارانتی"
        headlineGradient="محصولات شرکت بتا"
        subheadline="جهت بهره‌مندی از خدمات گارانتی و وارانتی شرکت بتا (موتورهای کرکره برقی، جک‌های پارکینگی بازویی و ریلی، بردهای کنترل و چشم‌های الکترونیکی)، شماره سریال دستگاه و کد نمایندگی نصب را در سامانه ثبت نمایید."
        primaryCtaLabel="ثبت شماره سریال محصول"
        primaryCtaHref="#warranty-registration-form"
        secondaryCtaLabel="فرم پذیرش تعمیر و خدمات"
        secondaryCtaHref="/register-to-service"
        scrollTargetId="warranty-registration-form"
        topLeftNode={{
          label: 'موتورها و جک‌های بتا',
          metric: 'گارانتی معتبر شرکتی',
          href: '/products',
        }}
        topRightNode={{
          label: 'مدت زمان تعمیرات',
          metric: '۲ الی ۷ روز کاری',
          href: '/services',
        }}
        bottomLeftNode={{
          label: 'استعلام اصالت کالا',
          metric: 'تایید سریال و نماینده',
          href: '#warranty-registration-form',
        }}
        bottomRightNode={{
          label: 'تلفن واحد خدمات',
          metric: '021-88404407',
          href: 'tel:02188404407',
        }}
        horizonSlides={[
          { label: '01/04 . ثبت سریال گارانتی', tag: 'احراز اصالت موتورهای کرکره، جک‌های پارکینگی و بردهای بتا' },
          { label: '02/04 . خدمات ۲ الی ۷ روز کاری', tag: 'تعمیر و سرویس تخصصی در واحد خدمات مرکزی تهران' },
          { label: '03/04 . سقف تعمیر بدون هماهنگی', tag: 'تعمیر وارانتی تا سقف ۱,۰۰۰,۰۰۰ ریال بدون نیاز به تماس قبلی' },
          { label: '04/04 . پشتیبانی فنی سراسری', tag: '۰۲۱-۸۸۴۰۴۴۰۷ الی ۴۰۹ · مسیل باختر، پلاک ۱۲' },
        ]}
      />

      {/* 2. DeFi Bento Warranty Coverage Strip + Interactive Registration Form */}
      <div
        id="warranty-registration-form"
        dir="rtl"
        className="px-4 sm:px-8 lg:px-12 py-12 max-w-[1440px] mx-auto space-y-12"
      >
        {/* 3-Card DeFi Bento Coverage Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="hud-corner-brackets rounded-none bg-[#0B0C0F] border border-white/[0.08] p-6 space-y-3 shadow-[0_20px_50px_rgba(0,0,0,0.65)]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#EC008C]">
                جک پارکینگی و موتور کرکره
              </span>
              <Award className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-white">گارانتی رسمی شرکت بتا</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              پوشش کامل گارانتی و تامین قطعات اورجینال برای کلیه جک‌های بازویی (B400/B500/B550)، جک ریلی (B600) و موتورهای کرکره ساید و توبولار بتا.
            </p>
          </div>

          <div className="hud-corner-brackets rounded-none bg-[#0B0C0F] border border-white/[0.08] p-6 space-y-3 shadow-[0_20px_50px_rgba(0,0,0,0.65)]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#EC008C]">
                ضوابط پذیرش خدمات
              </span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-white tabular-nums">۲ الی ۷ روز کاری</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              کلیه تعمیرات گارانتی و وارانتی در واحد خدمات پس از فروش تهران (مسیل باختر، پلاک ۱۲) بین ۲ الی ۷ روز کاری انجام و تست نهایی می‌شود.
            </p>
          </div>

          <div className="hud-corner-brackets rounded-none bg-[#0B0C0F] border border-white/[0.08] p-6 space-y-3 shadow-[0_20px_50px_rgba(0,0,0,0.65)]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                پذیرش تعمیر و نقشه‌های فنی
              </span>
              <Wrench className="w-4 h-4 text-[#EC008C]" />
            </div>
            <div className="text-xl font-semibold text-white">نیاز به تعمیر یا کاتالوگ دارید؟</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              جهت ارسال دستگاه به واحد تعمیرات یا دانلود دفترچه راهنمای بردها و نرم‌افزارهای موبایل از لینک‌های زیر استفاده کنید:
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <Link
                href="/register-to-service"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-none bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs text-white"
              >
                <span>فرم پذیرش تعمیر</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/beta-doors-manuals"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-none bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs text-white"
              >
                <FileText className="w-3.5 h-3.5 text-[#EC008C]" />
                <span>اپلیکیشن‌ها و کاتالوگ PDF</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Registration Form Container */}
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-2 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-none bg-white/[0.04] border border-white/10 text-[11px] font-mono text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-[#EC008C]" />
              <span>BETA.IR · فرم رسمی ثبت گارانتی محصولات بتا</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-semibold text-white tracking-tight">
              ثبت مشخصات محصول و فعال‌سازی گارانتی
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
              شماره سریال درج‌شده روی بدنه محصول، کد نمایندگی مجاز و تاریخ نصب (<code className="font-mono text-slate-200">dd/mm/yyyy</code>) را وارد نمایید.
            </p>
          </div>

          {referenceCode ? (
            <div
              role="status"
              aria-live="polite"
              className="bg-emerald-950/60 border border-emerald-500/40 rounded-none p-8 space-y-4 text-emerald-100 shadow-2xl"
            >
              <div className="flex items-center gap-2 text-lg font-bold text-white">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>ثبت گارانتی با موفقیت انجام شد · کد رهگیری: {referenceCode}</span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-200/90">
                اطلاعات گارانتی دستگاه شما در سامانه مرکزی خدمات پس از فروش شرکت بتا ثبت گردید و پس از بررسی کارشناسان تایید نهایی خواهد شد.
              </p>
              <button
                type="button"
                onClick={() => setReferenceCode(null)}
                className="px-5 py-2.5 rounded-none bg-white text-slate-950 text-xs font-semibold hover:bg-slate-200 transition-colors"
              >
                ثبت محصول جدید دیگر
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="hud-corner-brackets bg-[#0B0C0F] border border-white/[0.08] rounded-none p-6 sm:p-10 space-y-7 shadow-[0_24px_70px_rgba(0,0,0,0.75)]"
            >
              {error && (
                <div
                  role="alert"
                  className="p-4 rounded-none bg-rose-950/60 border border-rose-500/40 text-xs text-rose-200"
                >
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <h3 className="text-base font-semibold text-white">
                  ۱. مشخصات فنی دستگاه و نصب
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="war-serial"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      شماره سریال محصول *
                    </label>
                    <input
                      id="war-serial"
                      type="text"
                      required
                      value={serialNumber}
                      onChange={(e) => setSerialNumber(e.target.value)}
                      placeholder="مثلاً BETA-B500-90510"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#060709] border border-white/15 rounded-none text-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="war-dealer"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      کد نمایندگی یا نصاب *
                    </label>
                    <input
                      id="war-dealer"
                      type="text"
                      required
                      value={dealerCode}
                      onChange={(e) => setDealerCode(e.target.value)}
                      placeholder="مثلاً TEH-DEALER-14"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#060709] border border-white/15 rounded-none text-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="war-date"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      تاریخ نصب (dd/mm/yyyy) *
                    </label>
                    <input
                      id="war-date"
                      type="text"
                      required
                      value={installationDate}
                      onChange={(e) => setInstallationDate(e.target.value)}
                      placeholder="14/11/2026"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#060709] border border-white/15 rounded-none text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-5 border-t border-white/[0.08]">
                <h3 className="text-base font-semibold text-white">
                  ۲. مشخصات خریدار و نشانی محل نصب
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="war-first"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      نام *
                    </label>
                    <input
                      id="war-first"
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#060709] border border-white/15 rounded-none text-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="war-last"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      نام خانوادگی *
                    </label>
                    <input
                      id="war-last"
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#060709] border border-white/15 rounded-none text-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="war-email"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      پست الکترونیک (ایمیل) *
                    </label>
                    <input
                      id="war-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#060709] border border-white/15 rounded-none text-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="war-phone"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      شماره موبایل / تلفن تماس *
                    </label>
                    <input
                      id="war-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#060709] border border-white/15 rounded-none text-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="war-street"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      نشانی دقیق محل نصب (خیابان، کوچه، پلاک) *
                    </label>
                    <input
                      id="war-street"
                      type="text"
                      required
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#060709] border border-white/15 rounded-none text-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="war-line2"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      توضیحات تکمیلی آدرس / واحد (اختیاری)
                    </label>
                    <input
                      id="war-line2"
                      type="text"
                      value={addressLine2}
                      onChange={(e) => setAddressLine2(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#060709] border border-white/15 rounded-none text-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="war-suburb"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      شهر / منطقه *
                    </label>
                    <input
                      id="war-suburb"
                      type="text"
                      required
                      value={suburb}
                      onChange={(e) => setSuburb(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#060709] border border-white/15 rounded-none text-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="war-state"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      استان *
                    </label>
                    <input
                      id="war-state"
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#060709] border border-white/15 rounded-none text-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="war-postcode"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      کد پستی *
                    </label>
                    <input
                      id="war-postcode"
                      type="text"
                      required
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#060709] border border-white/15 rounded-none text-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="war-country"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      کشور *
                    </label>
                    <select
                      id="war-country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#060709] border border-white/15 rounded-none text-white"
                    >
                      <option value="ایران">ایران (Iran)</option>
                      <option value="Australia">استرالیا (Australia Branch)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-3">
                <p className="text-xs text-slate-400">
                  کلیه محصولات ثبت‌شده مشمول ضوابط رسمی گارانتی و خدمات پس از فروش شرکت بتا (۰۲۱-۸۸۴۰۴۴۰۷) می‌باشند.
                </p>
                <button
                  type="submit"
                  disabled={submitting}
                  className="keep-white-text px-7 py-3 rounded-none bg-[#EC008C] hover:bg-[#d4007d] text-white text-xs sm:text-sm font-semibold shadow-[0_0_24px_rgba(236,0,140,0.35)] transition-colors cursor-pointer"
                >
                  {submitting ? 'در حال ثبت گارانتی...' : 'ثبت نهایی گارانتی محصول'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </SiteShell>
  );
}
