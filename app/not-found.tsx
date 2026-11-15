import React from 'react';
import Link from 'next/link';
import { SiteShell } from '@/components/layout/SiteShell';

export default function NotFound() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-[960px] px-4 py-24 text-center sm:px-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 font-mono text-xs text-slate-300">
          HTTP 404 • ROUTE NOT FOUND
        </div>
        <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          This Door Path Is Not Registered
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400">
          Explore the BETA DOORS Australian catalogue, online shop, downloadable PDF manuals, or book a Greater Melbourne technician below.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-white px-6 py-3 text-xs font-semibold text-black transition hover:bg-slate-200"
          >
            Return to Homepage
          </Link>
          <Link
            href="/shop/"
            className="rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-xs font-medium text-white transition hover:bg-white/[0.08]"
          >
            Open Online Shop
          </Link>
          <Link
            href="/admin/"
            className="rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-xs font-medium text-white transition hover:bg-white/[0.08]"
          >
            Admin CMS Studio
          </Link>
        </div>
      </div>
    </SiteShell>
  );
}
