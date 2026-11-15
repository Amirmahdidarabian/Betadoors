'use client';

import React, { useState } from 'react';
import { CheckCircle2, Upload, Lock } from 'lucide-react';
import { SiteShell } from '@/components/layout/SiteShell';
import { useBetaDoors } from '@/components/providers/BetaDoorsProvider';

export default function ServiceRegistrationPage() {
  const { mutateServer } = useBetaDoors();

  const [serialNumber, setSerialNumber] = useState('');
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
  const [selectedFile, setSelectedFile] = useState<{
    fileName: string;
    mimeType: string;
    sizeBytes: number;
  } | null>({
    fileName: 'tax-invoice-campbellfield.pdf',
    mimeType: 'application/pdf',
    sizeBytes: 412000,
  });

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [referenceCode, setReferenceCode] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setSelectedFile({
      fileName: f.name,
      mimeType: f.type || 'application/pdf',
      sizeBytes: f.size,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await mutateServer('submit_service_registration', {
        serialNumber,
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
        file: selectedFile,
      });
      if (!res.ok) {
        setError(String(res.error || 'Service registration failed.'));
      } else {
        setReferenceCode(String(res.referenceCode));
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SiteShell>
      <div className="px-4 sm:px-8 lg:px-12 py-12 max-w-4xl mx-auto space-y-10">
        <div className="border-b border-white/10 pb-6 space-y-2">
          <div className="text-xs text-slate-400">
            Service Support &amp; Private Purchase Evidence · /register-to-service/ (gform_3)
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Register to Service
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Register your installed BETA DOORS product and upload a proof of purchase. Per Section 8.3 &amp; Appendix B.1 #9, customer evidence uploads are strictly capped at <strong className="text-white">10 MB</strong> (PDF, JPEG, or PNG) and stored in private role-protected storage.
          </p>
        </div>

        {referenceCode ? (
          <div
            role="status"
            aria-live="polite"
            className="bg-emerald-950/60 border border-emerald-500/40 rounded-2xl p-8 space-y-3 text-emerald-100"
          >
            <div className="flex items-center gap-2 text-lg font-bold text-white">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Service Registration Recorded · Reference {referenceCode}</span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-200/90">
              Your proof of purchase (<code className="font-mono">{selectedFile?.fileName}</code>) is stored in private storage and can only be retrieved by authorised Support Staff or Administrators.
            </p>
            <button
              type="button"
              onClick={() => setReferenceCode(null)}
              className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 text-xs font-semibold"
            >
              Submit Another Service Registration
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-[#0F1117] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6"
          >
            {error && (
              <div
                role="alert"
                className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-200"
              >
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="srv-serial"
                  className="block text-xs font-medium text-slate-300 mb-1.5"
                >
                  Product serial number *
                </label>
                <input
                  id="srv-serial"
                  type="text"
                  required
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  placeholder="e.g. BD-RDO1000-88412"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#08090C] border border-white/15 rounded-lg text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="srv-date"
                  className="block text-xs font-medium text-slate-300 mb-1.5"
                >
                  Installation date (dd/mm/yyyy) *
                </label>
                <input
                  id="srv-date"
                  type="text"
                  required
                  value={installationDate}
                  onChange={(e) => setInstallationDate(e.target.value)}
                  placeholder="14/11/2026"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#08090C] border border-white/15 rounded-lg text-white font-mono"
                />
              </div>

              <div>
                <label
                  htmlFor="srv-first"
                  className="block text-xs font-medium text-slate-300 mb-1.5"
                >
                  First Name *
                </label>
                <input
                  id="srv-first"
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#08090C] border border-white/15 rounded-lg text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="srv-last"
                  className="block text-xs font-medium text-slate-300 mb-1.5"
                >
                  Last Name *
                </label>
                <input
                  id="srv-last"
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#08090C] border border-white/15 rounded-lg text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="srv-email"
                  className="block text-xs font-medium text-slate-300 mb-1.5"
                >
                  Email *
                </label>
                <input
                  id="srv-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#08090C] border border-white/15 rounded-lg text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="srv-phone"
                  className="block text-xs font-medium text-slate-300 mb-1.5"
                >
                  Phone *
                </label>
                <input
                  id="srv-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#08090C] border border-white/15 rounded-lg text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="srv-street"
                  className="block text-xs font-medium text-slate-300 mb-1.5"
                >
                  Street Address *
                </label>
                <input
                  id="srv-street"
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#08090C] border border-white/15 rounded-lg text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="srv-suburb"
                  className="block text-xs font-medium text-slate-300 mb-1.5"
                >
                  Suburb / City *
                </label>
                <input
                  id="srv-suburb"
                  type="text"
                  required
                  value={suburb}
                  onChange={(e) => setSuburb(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#08090C] border border-white/15 rounded-lg text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="srv-state"
                    className="block text-xs font-medium text-slate-300 mb-1.5"
                  >
                    State *
                  </label>
                  <input
                    id="srv-state"
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#08090C] border border-white/15 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="srv-postcode"
                    className="block text-xs font-medium text-slate-300 mb-1.5"
                  >
                    Postcode *
                  </label>
                  <input
                    id="srv-postcode"
                    type="text"
                    required
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#08090C] border border-white/15 rounded-lg text-white"
                  />
                </div>
              </div>
            </div>

            {/* Required Purchase Proof Upload (Capped at 10 MB, private access) */}
            <div className="p-5 rounded-xl bg-[#08090C] border border-white/15 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <label
                  htmlFor="srv-proof-upload"
                  className="text-xs font-semibold text-white flex items-center gap-2"
                >
                  <Upload className="w-4 h-4 text-[#EC008C]" />
                  <span>Upload a proof of purchase * (Max 10 MB · PDF, JPEG, PNG)</span>
                </label>
                <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
                  <Lock className="w-3 h-3" /> Private Quarantine Storage
                </span>
              </div>
              <input
                id="srv-proof-upload"
                type="file"
                required
                accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                onChange={handleFileChange}
                className="block w-full text-xs text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20"
              />
              {selectedFile && (
                <div className="text-xs text-slate-400 font-mono">
                  Selected: {selectedFile.fileName} ({selectedFile.mimeType},{' '}
                  {Math.round(selectedFile.sizeBytes / 1024)} KB)
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-3 rounded-full bg-[#EC008C] hover:bg-[#d4007d] text-white text-sm font-semibold transition-colors"
            >
              {submitting ? 'Validating & Saving...' : 'Submit Service Registration'}
            </button>
          </form>
        )}
      </div>
    </SiteShell>
  );
}
