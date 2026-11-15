'use client';

import React, { useId, useState } from 'react';
import { ALLOWED_ENQUIRY_SERVICES, validateEnquiryInput } from '@/lib/domain-logic';
import { useBetaDoors } from '@/components/providers/BetaDoorsProvider';

export function EnquiryForm({
  sourcePagePath = '/',
  productContext,
  calculatorContext,
  heading = 'Lodge a Service, Product or Trade Enquiry',
  subheading = 'Direct routing to our Campbellfield operations desk (1300 238 243 · sales@betadoors.com.au). Select your required service topic below.',
}: {
  sourcePagePath?: string;
  productContext?: string;
  calculatorContext?: string;
  heading?: string;
  subheading?: string;
}) {
  const formUid = useId();
  const { mutateServer } = useBetaDoors();

  const [name, setName] = useState('');
  const [suburb, setSuburb] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState(''); // Unselected placeholder by default per Section 10
  const [message, setMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    const check = validateEnquiryInput({
      name,
      suburb,
      email,
      phone,
      serviceType,
      message,
    });
    if (!check.ok) {
      setFieldErrors(check.errors);
      return;
    }
    setFieldErrors({});
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
        setServerError(String(res.error || 'Could not save enquiry.'));
      } else {
        setSubmittedRef(String(res.referenceCode));
        setName('');
        setSuburb('');
        setCompany('');
        setEmail('');
        setPhone('');
        setServiceType('');
        setMessage('');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      aria-labelledby={`${formUid}-heading`}
      className="hud-corner-brackets brand-animated-border bg-[#0B0C10] border border-white/10 rounded-xl p-5 sm:p-8 lg:p-10"
    >
      <div className="max-w-3xl space-y-2">
        <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#ff7ac6]">
          <span className="w-1.5 h-1.5 bg-[#EC008C]" />
          <span>CAMPBELLFIELD VIC 3061 // DIRECT OPERATIONS DESK</span>
        </div>
        <h2
          id={`${formUid}-heading`}
          className="text-2xl sm:text-3xl font-semibold text-white tracking-tight"
        >
          {heading}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{subheading}</p>

        {(productContext || calculatorContext) && (
          <div className="mt-4 text-xs text-slate-300 bg-white/5 border border-white/10 rounded-md px-4 py-2.5">
            {productContext && <span>Product Context: {productContext}</span>}
            {productContext && calculatorContext && <span aria-hidden="true"> · </span>}
            {calculatorContext && <span>Spring Context: {calculatorContext}</span>}
          </div>
        )}
      </div>

      {submittedRef ? (
        <div
          role="status"
          aria-live="polite"
          className="mt-6 bg-emerald-950/50 border border-emerald-500/40 rounded-xl p-6 text-emerald-100 space-y-2"
        >
          <p className="text-base font-semibold">
            Enquiry Persisted · Reference {submittedRef}
          </p>
          <p className="text-xs text-emerald-200/90">
            Your enquiry has been recorded in the BETA DOORS workflow database and queued for our Campbellfield support team.
          </p>
          <button
            type="button"
            onClick={() => setSubmittedRef(null)}
            className="mt-2 px-4 py-2 text-xs font-medium bg-emerald-500 text-slate-950 rounded-lg hover:bg-emerald-400 transition-colors"
          >
            Submit Another Enquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
          {serverError && (
            <div
              role="alert"
              className="p-3.5 rounded-lg bg-rose-950/60 border border-rose-500/40 text-xs text-rose-200"
            >
              {serverError}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor={`${formUid}-name`}
                className="block text-xs font-medium text-slate-300 mb-1.5"
              >
                Your Name *
              </label>
              <input
                id={`${formUid}-name`}
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Liam Carter"
                className="w-full px-3.5 py-2.5 text-sm bg-[#08090C] border border-white/15 rounded-lg text-white placeholder:text-slate-600 focus:outline-none focus:border-[#EC008C]"
              />
              {fieldErrors.name && (
                <p role="alert" className="mt-1 text-xs text-rose-400">
                  {fieldErrors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor={`${formUid}-suburb`}
                className="block text-xs font-medium text-slate-300 mb-1.5"
              >
                Suburb *
              </label>
              <input
                id={`${formUid}-suburb`}
                type="text"
                required
                value={suburb}
                onChange={(e) => setSuburb(e.target.value)}
                placeholder="e.g. Campbellfield 3061"
                className="w-full px-3.5 py-2.5 text-sm bg-[#08090C] border border-white/15 rounded-lg text-white placeholder:text-slate-600 focus:outline-none focus:border-[#EC008C]"
              />
              {fieldErrors.suburb && (
                <p role="alert" className="mt-1 text-xs text-rose-400">
                  {fieldErrors.suburb}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor={`${formUid}-email`}
                className="block text-xs font-medium text-slate-300 mb-1.5"
              >
                Email *
              </label>
              <input
                id={`${formUid}-email`}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com.au"
                className="w-full px-3.5 py-2.5 text-sm bg-[#08090C] border border-white/15 rounded-lg text-white placeholder:text-slate-600 focus:outline-none focus:border-[#EC008C]"
              />
              {fieldErrors.email && (
                <p role="alert" className="mt-1 text-xs text-rose-400">
                  {fieldErrors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor={`${formUid}-phone`}
                className="block text-xs font-medium text-slate-300 mb-1.5"
              >
                Phone *
              </label>
              <input
                id={`${formUid}-phone`}
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0412 345 678 or 03 9000 0000"
                className="w-full px-3.5 py-2.5 text-sm bg-[#08090C] border border-white/15 rounded-lg text-white placeholder:text-slate-600 focus:outline-none focus:border-[#EC008C]"
              />
              {fieldErrors.phone && (
                <p role="alert" className="mt-1 text-xs text-rose-400">
                  {fieldErrors.phone}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor={`${formUid}-company`}
                className="block text-xs font-medium text-slate-300 mb-1.5"
              >
                Company (Optional)
              </label>
              <input
                id={`${formUid}-company`}
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Trade / Commercial entity name"
                className="w-full px-3.5 py-2.5 text-sm bg-[#08090C] border border-white/15 rounded-lg text-white placeholder:text-slate-600 focus:outline-none focus:border-[#EC008C]"
              />
            </div>

            <div>
              <label
                htmlFor={`${formUid}-service`}
                className="block text-xs font-medium text-slate-300 mb-1.5"
              >
                Type Of Service *
              </label>
              <select
                id={`${formUid}-service`}
                required
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-[#08090C] border border-white/15 rounded-lg text-white focus:outline-none focus:border-[#EC008C]"
              >
                <option value="">Select required service or enquiry topic...</option>
                {ALLOWED_ENQUIRY_SERVICES.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {fieldErrors.serviceType && (
                <p role="alert" className="mt-1 text-xs text-rose-400">
                  {fieldErrors.serviceType}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor={`${formUid}-message`}
              className="block text-xs font-medium text-slate-300 mb-1.5"
            >
              Message / Door Details
            </label>
            <textarea
              id={`${formUid}-message`}
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Include door type (sectional, roller, tilt, gate), approximate dimensions, or symptoms..."
              className="w-full px-3.5 py-2.5 text-sm bg-[#08090C] border border-white/15 rounded-lg text-white placeholder:text-slate-600 focus:outline-none focus:border-[#EC008C]"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <p className="text-xs text-slate-400">
              Submitted enquiries are stored durably in local sandbox storage before notification dispatch.
            </p>
            <button
              type="submit"
              disabled={submitting}
              className="keep-white-text px-6 py-2.5 text-xs font-mono font-semibold uppercase tracking-wider text-white bg-[#EC008C] rounded-md hover:bg-[#d4007d] transition-colors disabled:opacity-50 whitespace-nowrap cursor-pointer"
            >
              {submitting ? 'SUBMITTING...' : 'SUBMIT ENQUIRY'}
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
