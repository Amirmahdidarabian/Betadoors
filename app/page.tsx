'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SiteShell } from '@/components/layout/SiteShell';
import { Hero16By9Showcase } from '@/components/hero/Hero16By9Showcase';
import {
  DefiBentoInsightsSection,
  FeaturedAriaAndShopSection,
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
          <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
              return null;
            case 'enquiry_section':
              return (
                <div
                  key={sec.id}
                  className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-16"
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
    <Suspense fallback={<div className="min-h-screen bg-[#F5F5F7] dark:bg-[#000000]" />}>
      <HomeContent />
    </Suspense>
  );
}
