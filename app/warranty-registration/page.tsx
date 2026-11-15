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
  const [state, setState] = useState('VIC');
  const [postcode, setPostcode] = useState('');
  const [country, setCountry] = useState('Australia');

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
        setError(String(res.error || 'Validation failed.'));
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
        ariaLabel="BETA DOORS Warranty Registration 16:9 Hero Stage"
        badgeText="Official BETA DOORS Product Protection · Australian Consumer Law"
        badgeHref="#warranty-registration-form"
        headlinePrimary="BETA DOORS Warranty"
        headlineGradient="Registration Portal"
        subheadline="Enjoy peace of mind with our 7-year warranty on Garage Door Openers and 5-year warranty on Roller Door Openers. Register your product serial number, dealer code, and installation date below."
        primaryCtaLabel="Register Serial Number"
        primaryCtaHref="#warranty-registration-form"
        secondaryCtaLabel="Register to Service"
        secondaryCtaHref="/register-to-service"
        scrollTargetId="warranty-registration-form"
        topLeftNode={{
          label: 'Sectional Openers',
          metric: '7 Years Warranty',
          href: '/sectional-and-tilt-door-opener-range',
        }}
        topRightNode={{
          label: 'Roller Openers',
          metric: '5 Years Warranty',
          href: '/roller-door-opener-range',
        }}
        bottomLeftNode={{
          label: 'Serial Validation',
          metric: 'Dealer Verified',
          href: '#warranty-registration-form',
        }}
        bottomRightNode={{
          label: 'Annual Servicing',
          metric: 'Proof Upload',
          href: '/register-to-service',
        }}
        horizonSlides={[
          { label: '01/04 . Warranty Registration', tag: 'Serial Number & Dealer Code Verification' },
          { label: '02/04 . 7-Year Opener Warranty', tag: 'Sectional & Tilt Door Openers (1000N–1500N)' },
          { label: '03/04 . 5-Year RDO Warranty', tag: 'Roller Door Openers (1000N–1800N)' },
          { label: '04/04 . Australian Consumer Law', tag: 'Campbellfield VIC Support Desk (1300 238 243)' },
        ]}
      />

      {/* 2. DeFi Bento Warranty Coverage Strip + Interactive Registration Form */}
      <div
        id="warranty-registration-form"
        className="px-4 sm:px-8 lg:px-12 py-12 max-w-[1440px] mx-auto space-y-12"
      >
        {/* 3-Card DeFi Bento Coverage Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-[24px] bg-[#0B0C0F] border border-white/[0.08] p-6 space-y-3 shadow-[0_20px_50px_rgba(0,0,0,0.65)]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#EC008C]">
                GARAGE DOOR OPENERS
              </span>
              <Award className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-light text-white tabular-nums">7 Years Warranty</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enjoy peace of mind with our 7-year warranty on BETA DOORS sectional and tilt garage door openers (1000N, 1200N, and 1500N models).
            </p>
          </div>

          <div className="rounded-[24px] bg-[#0B0C0F] border border-white/[0.08] p-6 space-y-3 shadow-[0_20px_50px_rgba(0,0,0,0.65)]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#EC008C]">
                ROLLER DOOR OPENERS
              </span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-light text-white tabular-nums">5 Years Warranty</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Backed by a 5-year warranty for long-term reliability across our 1000N to 1800N residential and heavy-duty roller door operators.
            </p>
          </div>

          <div className="rounded-[24px] bg-[#0B0C0F] border border-white/[0.08] p-6 space-y-3 shadow-[0_20px_50px_rgba(0,0,0,0.65)]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                SERVICE &amp; MANUALS
              </span>
              <Wrench className="w-4 h-4 text-[#EC008C]" />
            </div>
            <div className="text-xl font-semibold text-white">Need Service or Manuals?</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Upload purchase proof to book a service visit or download official PDF installation manuals.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <Link
                href="/register-to-service"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs text-white"
              >
                <span>Register to Service</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/beta-doors-manuals"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs text-white"
              >
                <FileText className="w-3.5 h-3.5 text-[#EC008C]" />
                <span>PDF Manuals</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Registration Form Container */}
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-2 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-[#EC008C]" />
              <span>OFFICIAL WARRANTY REGISTRATION FORM</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-semibold text-white tracking-tight">
              Register Your BETA DOORS Product
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Enter your BETA DOORS product serial number, authorised dealer code, and Australian installation date (<code className="font-mono text-slate-200">dd/mm/yyyy</code>).
            </p>
          </div>

          {referenceCode ? (
            <div
              role="status"
              aria-live="polite"
              className="bg-emerald-950/60 border border-emerald-500/40 rounded-[26px] p-8 space-y-4 text-emerald-100 shadow-2xl"
            >
              <div className="flex items-center gap-2 text-lg font-bold text-white">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Warranty Registration Submitted · Reference {referenceCode}</span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-200/90">
                Your registration has been recorded in state <code className="font-mono">submitted</code> for verification by our Campbellfield support staff in the Admin Workspace.
              </p>
              <button
                type="button"
                onClick={() => setReferenceCode(null)}
                className="px-5 py-2.5 rounded-full bg-white text-slate-950 text-xs font-semibold hover:bg-slate-200 transition-colors"
              >
                Register Another Unit
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-[#0B0C0F] border border-white/[0.08] rounded-[28px] p-6 sm:p-10 space-y-7 shadow-[0_24px_70px_rgba(0,0,0,0.75)]"
            >
              {error && (
                <div
                  role="alert"
                  className="p-4 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-200"
                >
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <h3 className="text-base font-semibold text-white">
                  1. Installation &amp; Serial Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="war-serial"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      Product serial number *
                    </label>
                    <input
                      id="war-serial"
                      type="text"
                      required
                      value={serialNumber}
                      onChange={(e) => setSerialNumber(e.target.value)}
                      placeholder="e.g. BD-ARIA121-90510"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#060709] border border-white/15 rounded-xl text-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="war-dealer"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      Dealer code *
                    </label>
                    <input
                      id="war-dealer"
                      type="text"
                      required
                      value={dealerCode}
                      onChange={(e) => setDealerCode(e.target.value)}
                      placeholder="e.g. VIC-DEALER-14"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#060709] border border-white/15 rounded-xl text-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="war-date"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      Installation date (dd/mm/yyyy) *
                    </label>
                    <input
                      id="war-date"
                      type="text"
                      required
                      value={installationDate}
                      onChange={(e) => setInstallationDate(e.target.value)}
                      placeholder="14/11/2026"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#060709] border border-white/15 rounded-xl text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-5 border-t border-white/[0.08]">
                <h3 className="text-base font-semibold text-white">
                  2. Customer &amp; Address Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="war-first"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      First Name *
                    </label>
                    <input
                      id="war-first"
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#060709] border border-white/15 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="war-last"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      Last Name *
                    </label>
                    <input
                      id="war-last"
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#060709] border border-white/15 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="war-email"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      Email *
                    </label>
                    <input
                      id="war-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#060709] border border-white/15 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="war-phone"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      Phone *
                    </label>
                    <input
                      id="war-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#060709] border border-white/15 rounded-xl text-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="war-street"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      Street Address *
                    </label>
                    <input
                      id="war-street"
                      type="text"
                      required
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#060709] border border-white/15 rounded-xl text-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="war-line2"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      Address Line 2 (Optional)
                    </label>
                    <input
                      id="war-line2"
                      type="text"
                      value={addressLine2}
                      onChange={(e) => setAddressLine2(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#060709] border border-white/15 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="war-suburb"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      Suburb / City *
                    </label>
                    <input
                      id="war-suburb"
                      type="text"
                      required
                      value={suburb}
                      onChange={(e) => setSuburb(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#060709] border border-white/15 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="war-state"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      State / Province / Region *
                    </label>
                    <input
                      id="war-state"
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#060709] border border-white/15 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="war-postcode"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      Postcode / ZIP *
                    </label>
                    <input
                      id="war-postcode"
                      type="text"
                      required
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#060709] border border-white/15 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="war-country"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      Country *
                    </label>
                    <select
                      id="war-country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#060709] border border-white/15 rounded-xl text-white"
                    >
                      <option value="Australia">Australia</option>
                      <option value="New Zealand">New Zealand</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-3">
                <p className="text-xs text-slate-400">
                  All products come with guarantees that cannot be excluded under the Australian Consumer Law.
                </p>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-7 py-3 rounded-full bg-white hover:bg-slate-200 text-slate-950 text-xs sm:text-sm font-semibold shadow-[0_0_30px_rgba(255,255,255,0.22)] transition-colors"
                >
                  {submitting ? 'Submitting Warranty...' : 'Submit Warranty Registration'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </SiteShell>
  );
}
