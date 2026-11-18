'use client';

import React from 'react';
import { SiteShell } from '@/components/layout/SiteShell';
import { ShopListingView } from '@/components/shop/ShopListingView';

export default function UncategorizedCategoryPage() {
  return (
    <SiteShell>
      <ShopListingView
        heading="آرشیو محصولات فروشگاه بتا"
        subheading="مشاهده و سفارش مستقیم پکیج‌های جک پارکینگی، موتور کرکره، مدار فرمان و تجهیزات بتا."
      />
    </SiteShell>
  );
}
