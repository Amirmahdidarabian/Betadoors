'use client';

import React from 'react';
import { ShopListingView } from '@/components/shop/ShopListingView';

export default function UncategorizedCategoryPage() {
  return (
    <ShopListingView
      heading="Uncategorized Archives — BETA DOORS Shop"
      subheading="Preserved legacy WooCommerce archive route (/product-category/uncategorized/) listing all 5 active BETA DOORS shop products."
    />
  );
}
