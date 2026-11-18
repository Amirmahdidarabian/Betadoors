'use client';

import React from 'react';
import { useBetaDoors } from '@/components/providers/BetaDoorsProvider';

const BETA_LOGO_LIGHT_PATH = '/assets/aistudio/beta_logo_light.png';
const BETA_LOGO_DARK_PATH = '/assets/aistudio/beta_logo_dark.png';

export function BetaDoorsLogo({
  className = 'h-10 w-auto',
  variant = 'adaptive',
}: {
  className?: string;
  variant?: 'adaptive' | 'dark_surface' | 'light_surface';
  showWordmark?: boolean;
}) {
  const { brand } = useBetaDoors();

  return (
    <span
      role="img"
      aria-label={brand.siteName || 'شرکت بتا'}
      className={`inline-flex items-center select-none ${className}`}
    >
      {/* Official BETA Transparent Adaptive Logo Mark Only (No text wordmark) */}
      <span className="relative inline-flex items-center justify-center h-10 sm:h-11 w-auto shrink-0 transition-transform duration-300 ease-out hover:scale-105">
        {variant === 'dark_surface' ? (
          <img
            src={BETA_LOGO_DARK_PATH}
            alt={brand.siteName || 'BETA'}
            referrerPolicy="no-referrer"
            className="h-10 sm:h-11 w-auto object-contain"
          />
        ) : variant === 'light_surface' ? (
          <img
            src={BETA_LOGO_LIGHT_PATH}
            alt={brand.siteName || 'BETA'}
            referrerPolicy="no-referrer"
            className="h-10 sm:h-11 w-auto object-contain"
          />
        ) : (
          <>
            <img
              src={BETA_LOGO_LIGHT_PATH}
              alt={brand.siteName || 'BETA'}
              referrerPolicy="no-referrer"
              className="h-10 sm:h-11 w-auto object-contain block dark:hidden"
            />
            <img
              src={BETA_LOGO_DARK_PATH}
              alt={brand.siteName || 'BETA'}
              referrerPolicy="no-referrer"
              className="h-10 sm:h-11 w-auto object-contain hidden dark:block"
            />
          </>
        )}
      </span>
    </span>
  );
}
