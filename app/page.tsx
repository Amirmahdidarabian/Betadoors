'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SiteShell } from '@/components/layout/SiteShell';
import { Hero16By9Showcase } from '@/components/hero/Hero16By9Showcase';
import {
  DefiBentoInsightsSection,
  FeaturedAriaAndShopSection,
  OrbitalWorkflowSection,
  ProductFamilyGridSection,
} from '@/components/sections/HomeSections';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { useBetaDoors } from '@/components/providers/BetaDoorsProvider';

function HomeContent() {
  const searchParams = useSearchParams();
  const previewToken = searchParams.get('previewToken');
  const { pages } = useBetaDoors();

  const homePage = pages.find((p) => p.id === 'home' || p.slug === '/');
  const isPreview = Boolean(previewToken);
  const activeSections = (
    isPreview && homePage?.draftSections
      ? homePage.draftSections
      : homePage?.sections || []
  )
    .filter((s) => s.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <SiteShell
      previewBanner={
        isPreview && homePage
          ? {
              isDraftPreview: true,
              pageSlug: '/',
              revision: homePage.draftRevision,
            }
          : null
      }
    >
      {activeSections.length === 0 ? (
        <>
          <Hero16By9Showcase />
          <DefiBentoInsightsSection />
          <ProductFamilyGridSection />
          <FeaturedAriaAndShopSection />
          <OrbitalWorkflowSection />
          <div className="w-full max-w-[1760px] mx-auto px-3 sm:px-5 lg:px-7 py-12">
            <EnquiryForm sourcePagePath="/" />
          </div>
        </>
      ) : (
        activeSections.map((sec) => {
          switch (sec.type) {
            case 'hero_video':
              return <Hero16By9Showcase key={sec.id} />;
            case 'defi_bento_insights':
              return <DefiBentoInsightsSection key={sec.id} />;
            case 'category_grid':
              return <ProductFamilyGridSection key={sec.id} />;
            case 'featured_aria_121':
              return <FeaturedAriaAndShopSection key={sec.id} />;
            case 'orbital_workflow':
              return <OrbitalWorkflowSection key={sec.id} />;
            case 'enquiry_section':
              return (
                <div
                  key={sec.id}
                  className="w-full max-w-[1760px] mx-auto px-3 sm:px-5 lg:px-7 py-12"
                >
                  <EnquiryForm
                    sourcePagePath="/"
                    heading={sec.title}
                    subheading={sec.subtitle}
                  />
                </div>
              );
            default:
              return null;
          }
        })
      )}
    </SiteShell>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#08090C]" />}>
      <HomeContent />
    </Suspense>
  );
}
