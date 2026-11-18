'use client';

import React, { useId, useState } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  Send,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';
import { ALLOWED_ENQUIRY_SERVICES } from '@/lib/domain-logic';
import { useBetaDoors } from '@/components/providers/BetaDoorsProvider';

const PERSIAN_SERVICE_LABELS: Record<
  (typeof ALLOWED_ENQUIRY_SERVICES)[number],
  string
> = {
  'Commercial Door Service/Repairs':
    'درب بازکن اتوماتیک (جک بازویی MPC TITAN / F600 / ریلی F-550M)',
  'Motor Replacement':
    'مدار کنترل جک و کرکره + رسیور سیم‌کارتی سیموت (Simote)',
  'Spring Replacement':
    'دستگاه حضور و غیاب، اکسس کنترل، آنتن UHF و دستگیره دیجیتال',
  'Gate Repairs':
    'موتور کرکره برقی (ساید با UPS / توبولار) و راهبند B600 / B400',
  'Garage Door Repairs':
    'اپراتور شیشه برقی (Target / بازویی 1808) و رادار چشمی',
  'New Door Installation':
    'دزدگیر اماکن سیم‌کارتی (Z7-GSM Plus / B1 Ultimate) و ریموت کنترل',
  'Become a Dealer':
    'درخواست اخذ نمایندگی فروش یا لیست قیمت همکاری',
  'Questions about a product':
    'خدمات پس از فروش، گارانتی، تعمیرات برد یا مشاوره فنی محصول',
};

export interface EnquiryFormProps {
  sourcePagePath: string;
  productContext?: string;
  calculatorContext?: string;
  heading?: string;
  subheading?: string;
  compact?: boolean;
}

export function EnquiryForm({
  sourcePagePath,
  productContext,
  calculatorContext,
  heading = 'مشاوره فنی و فروش سازمانی.',
  subheading = 'کارشناسان فروش و پشتیبانی فنی شرکت بتا (۰۲۱-۸۸۴۰۴۴۰۷ · info@beta.ir) پاسخگوی شما هستند.',
  compact = false,
}: EnquiryFormProps) {
  const formUid = useId();
  const { mutateServer } = useBetaDoors();

  const [name, setName] = useState('');
  const [suburb, setSuburb] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState<string>('');
  const [message, setMessage] = useState('');

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setServerError(null);
    setSubmitting(true);

    try {
      const res = await mutateServer('submit_enquiry', {
        name,
        suburb,
        company,
        email,
        phone,
        serviceType,
        message,
        sourcePagePath,
        productContext,
        calculatorContext,
      });

      if (!res.ok) {
        if (res.errors && typeof res.errors === 'object') {
          setFieldErrors(res.errors as Record<string, string>);
        } else {
          setServerError(
            String(
              res.error ||
                'خطا در بررسی اطلاعات فرم. لطفاً فیلدها را بررسی کنید.'
            )
          );
        }
        return;
      }

      setSubmittedRef(String(res.referenceCode || 'BETA-ENQ-OK'));
      setName('');
      setSuburb('');
      setCompany('');
      setEmail('');
      setPhone('');
      setServiceType('');
      setMessage('');
    } catch {
      setServerError('خطا در برقراری ارتباط با سرور. لطفاً مجدداً تلاش کنید.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submittedRef) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-3xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/40 p-7 sm:p-9 text-emerald-900 dark:text-emerald-100 space-y-4"
      >
        <div className="flex items-center gap-2.5 text-emerald-700 dark:text-emerald-300 font-bold text-lg">
          <CheckCircle2 className="w-6 h-6 shrink-0" />
          <span>درخواست شما با موفقیت در سامانه شرکت بتا ثبت شد</span>
        </div>
        <p className="text-base leading-relaxed">
          کد پیگیری شما:{' '}
          <strong className="px-3 py-1 rounded-full bg-emerald-600 text-white keep-white-text">
            {submittedRef}
          </strong>
          . درخواست شما برای واحد فروش و پشتیبانی فنی دفتر مرکزی تهران ارسال
          گردید.
        </p>
        <button
          type="button"
          onClick={() => setSubmittedRef(null)}
          className="text-sm font-bold underline text-emerald-700 dark:text-emerald-300 cursor-pointer"
        >
          ثبت یک درخواست جدید دیگر
        </button>
      </div>
    );
  }

  return (
    <section
      aria-labelledby={`${formUid}-heading`}
      className={`rounded-3xl bg-white dark:bg-[#161617] border border-black/[0.06] dark:border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.04)] ${
        compact ? 'p-6 sm:p-8' : 'p-7 sm:p-12'
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Right Column in RTL: Context & Direct Tehran Contact */}
        <div className="lg:col-span-5 space-y-5">
          <div className="text-sm font-bold text-[#EC008C]">
            ارتباط مستقیم با دفتر مرکزی شرکت بتا
          </div>
          <h2
            id={`${formUid}-heading`}
            className="text-2xl sm:text-3xl font-bold text-[#1D1D1F] dark:text-white tracking-tight leading-snug"
          >
            {heading}
          </h2>
          <p className="text-base text-[#515154] dark:text-[#A1A1A6] leading-relaxed">
            {subheading}
          </p>

          {(productContext || calculatorContext) && (
            <div className="p-4 rounded-2xl bg-[#F5F5F7] dark:bg-[#1D1D1F] text-sm space-y-1">
              <div className="font-bold text-[#EC008C]">
                محصول / پارامترهای انتخاب‌شده:
              </div>
              {productContext && (
                <div className="text-[#1D1D1F] dark:text-white font-medium">
                  {productContext}
                </div>
              )}
              {calculatorContext && (
                <div className="text-[#515154] dark:text-[#A1A1A6]">
                  {calculatorContext}
                </div>
              )}
            </div>
          )}

          <div className="space-y-3 text-sm text-[#515154] dark:text-[#A1A1A6] bg-[#F5F5F7] dark:bg-[#1D1D1F] p-5 rounded-2xl">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#EC008C] shrink-0 mt-1" />
              <span>
                دفتر مرکزی: تهران، اتوبان صیاد شیرازی، خروجی مسیل باختر، پلاک ۱۲
                (کد پستی: ۱۶۳۱۹-۳۵۷۱۱)
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#EC008C] shrink-0" />
              <span>
                تلفن‌های ویژه:{' '}
                <a
                  href="tel:02188404407"
                  dir="ltr"
                  className="font-bold text-[#1D1D1F] dark:text-white hover:text-[#EC008C]"
                >
                  021-88404407
                </a>{' '}
                الی <span dir="ltr">409</span>
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#EC008C] shrink-0" />
              <span>
                ایمیل رسمی:{' '}
                <a
                  href="mailto:info@beta.ir"
                  className="font-bold text-[#1D1D1F] dark:text-white hover:text-[#EC008C]"
                >
                  info@beta.ir
                </a>
              </span>
            </div>
          </div>
        </div>

        {/* Left Column in RTL: Validated Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="lg:col-span-7 space-y-5"
        >
          {serverError && (
            <div
              role="alert"
              className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-500/40 text-sm text-rose-800 dark:text-rose-200 flex items-center gap-2.5"
            >
              <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
              <span>{serverError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor={`${formUid}-name`}
                className="block text-sm font-semibold text-[#1D1D1F] dark:text-white mb-2"
              >
                نام و نام خانوادگی *
              </label>
              <input
                id={`${formUid}-name`}
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-invalid={Boolean(fieldErrors.name)}
                placeholder="مثال: مهندس علی رضایی"
                className="w-full px-4 py-3 text-base bg-[#F5F5F7] dark:bg-[#1D1D1F] border border-black/[0.08] dark:border-white/15 rounded-2xl text-[#1D1D1F] dark:text-white placeholder:text-[#86868B] focus:outline-none focus:border-[#EC008C]"
              />
              {fieldErrors.name && (
                <p role="alert" className="mt-1.5 text-xs text-rose-500">
                  {fieldErrors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor={`${formUid}-suburb`}
                className="block text-sm font-semibold text-[#1D1D1F] dark:text-white mb-2"
              >
                شهر / منطقه *
              </label>
              <input
                id={`${formUid}-suburb`}
                name="suburb"
                type="text"
                required
                value={suburb}
                onChange={(e) => setSuburb(e.target.value)}
                aria-invalid={Boolean(fieldErrors.suburb)}
                placeholder="مثال: تهران - سعادت‌آباد"
                className="w-full px-4 py-3 text-base bg-[#F5F5F7] dark:bg-[#1D1D1F] border border-black/[0.08] dark:border-white/15 rounded-2xl text-[#1D1D1F] dark:text-white placeholder:text-[#86868B] focus:outline-none focus:border-[#EC008C]"
              />
              {fieldErrors.suburb && (
                <p role="alert" className="mt-1.5 text-xs text-rose-500">
                  {fieldErrors.suburb}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor={`${formUid}-company`}
                className="block text-sm font-semibold text-[#1D1D1F] dark:text-white mb-2"
              >
                نام شرکت / فروشگاه / مجتمع (اختیاری)
              </label>
              <input
                id={`${formUid}-company`}
                name="company"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="مثال: فروشگاه اتوماسیون نوین"
                className="w-full px-4 py-3 text-base bg-[#F5F5F7] dark:bg-[#1D1D1F] border border-black/[0.08] dark:border-white/15 rounded-2xl text-[#1D1D1F] dark:text-white placeholder:text-[#86868B] focus:outline-none focus:border-[#EC008C]"
              />
            </div>

            <div>
              <label
                htmlFor={`${formUid}-phone`}
                className="block text-sm font-semibold text-[#1D1D1F] dark:text-white mb-2"
              >
                شماره موبایل یا تلفن ثابت *
              </label>
              <input
                id={`${formUid}-phone`}
                name="phone"
                type="tel"
                required
                dir="ltr"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                aria-invalid={Boolean(fieldErrors.phone)}
                placeholder="0912 345 6789"
                className="w-full px-4 py-3 text-base bg-[#F5F5F7] dark:bg-[#1D1D1F] border border-black/[0.08] dark:border-white/15 rounded-2xl text-[#1D1D1F] dark:text-white placeholder:text-[#86868B] focus:outline-none focus:border-[#EC008C] text-left tabular-nums"
              />
              {fieldErrors.phone && (
                <p role="alert" className="mt-1.5 text-xs text-rose-500">
                  {fieldErrors.phone}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor={`${formUid}-email`}
                className="block text-sm font-semibold text-[#1D1D1F] dark:text-white mb-2"
              >
                آدرس ایمیل *
              </label>
              <input
                id={`${formUid}-email`}
                name="email"
                type="email"
                required
                dir="ltr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={Boolean(fieldErrors.email)}
                placeholder="info@example.ir"
                className="w-full px-4 py-3 text-base bg-[#F5F5F7] dark:bg-[#1D1D1F] border border-black/[0.08] dark:border-white/15 rounded-2xl text-[#1D1D1F] dark:text-white placeholder:text-[#86868B] focus:outline-none focus:border-[#EC008C] text-left"
              />
              {fieldErrors.email && (
                <p role="alert" className="mt-1.5 text-xs text-rose-500">
                  {fieldErrors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor={`${formUid}-service`}
                className="block text-sm font-semibold text-[#1D1D1F] dark:text-white mb-2"
              >
                موضوع درخواست / گروه محصول *
              </label>
              <select
                id={`${formUid}-service`}
                name="serviceType"
                required
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                aria-invalid={Boolean(fieldErrors.serviceType)}
                className="w-full px-4 py-3 text-base bg-[#F5F5F7] dark:bg-[#1D1D1F] border border-black/[0.08] dark:border-white/15 rounded-2xl text-[#1D1D1F] dark:text-white focus:outline-none focus:border-[#EC008C]"
              >
                <option value="" disabled>
                  انتخاب موضوع یا گروه محصول...
                </option>
                {ALLOWED_ENQUIRY_SERVICES.map((srv) => (
                  <option key={srv} value={srv}>
                    {PERSIAN_SERVICE_LABELS[srv] || srv}
                  </option>
                ))}
              </select>
              {fieldErrors.serviceType && (
                <p role="alert" className="mt-1.5 text-xs text-rose-500">
                  {fieldErrors.serviceType}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor={`${formUid}-message`}
              className="block text-sm font-semibold text-[#1D1D1F] dark:text-white mb-2"
            >
              توضیحات تکمیلی (مدل دستگاه، تعداد، ابعاد درب یا شرح درخواست)
            </label>
            <textarea
              id={`${formUid}-message`}
              name="message"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="مدل محصول مورد نظر، تعداد مورد نیاز یا سوال فنی خود را بنویسید..."
              className="w-full px-4 py-3 text-base bg-[#F5F5F7] dark:bg-[#1D1D1F] border border-black/[0.08] dark:border-white/15 rounded-2xl text-[#1D1D1F] dark:text-white placeholder:text-[#86868B] focus:outline-none focus:border-[#EC008C]"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">
              پاسخگویی مستقیم توسط واحد فروش و پشتیبانی فنی شرکت بتا (تهران).
            </p>
            <button
              type="submit"
              disabled={submitting}
              className="keep-white-text inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#EC008C] hover:bg-[#d4007d] disabled:opacity-50 text-white text-base font-bold transition-colors cursor-pointer shadow-[0_8px_20px_rgba(236,0,140,0.28)]"
            >
              <Send className="w-4 h-4" />
              <span>
                {submitting ? 'در حال ارسال...' : 'ثبت و ارسال درخواست'}
              </span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
