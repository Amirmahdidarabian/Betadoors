'use client';

import React from 'react';
import { SiteShell } from '@/components/layout/SiteShell';
import { ShopListingView } from '@/components/shop/ShopListingView';

export default function ShopPage() {
  return (
    <SiteShell>
      <ShopListingView />
    </SiteShell>
  );
}
