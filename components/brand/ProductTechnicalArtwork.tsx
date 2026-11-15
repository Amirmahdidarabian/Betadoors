'use client';

import React, { useState } from 'react';

const DEFAULT_PRODUCT_IMAGES: Record<string, string> = {
  motor_pack: '/assets/products/shop_motor_pack_16x9_1794669608385.jpg',
  aria_121: '/assets/products/cat_aria_121_opener_16x9_1794669517262.jpg',
  roller_opener: '/assets/products/cat_roller_opener_16x9_1794669523562.jpg',
  remote_pack: '/assets/products/shop_remote_pack_16x9_1794669534982.jpg',
  receiver: '/assets/products/shop_receiver_16x9_1794669538614.jpg',
  remote: '/assets/products/shop_remote_single_16x9_1794669538842.jpg',
  sectional_door: '/assets/products/cat_sectional_door_16x9_1794669513770.jpg',
  gate_opener: '/assets/products/cat_gate_opener_16x9_1794669526901.jpg',
  keypad: '/assets/products/cat_smart_keypad_16x9_1794669528157.jpg',
  hardware_kit: '/assets/products/cat_hardware_kit_16x9_1794669530976.jpg',
};

const LEGACY_IMAGE_OVERRIDES: Set<string> = new Set([
  '/assets/products/betadoors_motor_pack_render_1794666177547.jpg',
  '/assets/products/betadoors_roller_opener_render_1794666179927.jpg',
  '/assets/products/betadoors_remote_pack_render_1794666181623.jpg',
  '/assets/products/betadoors_receiver_render_1794666183005.jpg',
  '/assets/products/betadoors_remote_render_1794666185334.jpg',
  '/assets/betadoors_ref/home_garage_door.png',
  '/assets/betadoors_ref/home_hero_door.webp',
  '/assets/betadoors_ref/home_gate_opener.png',
  '/assets/betadoors_ref/home_keypad.png',
  '/assets/betadoors_ref/home_hardware_kit.png',
]);

export function ProductTechnicalArtwork({
  type,
  customImageUrl,
  title,
  className = 'w-full h-full',
}: {
  type:
    | 'motor_pack'
    | 'receiver'
    | 'remote'
    | 'remote_pack'
    | 'roller_opener'
    | 'aria_121'
    | 'sectional_door'
    | 'gate_opener'
    | 'keypad'
    | 'hardware_kit';
  customImageUrl?: string;
  title: string;
  className?: string;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const resolvedImageUrl =
    customImageUrl && !LEGACY_IMAGE_OVERRIDES.has(customImageUrl)
      ? customImageUrl
      : DEFAULT_PRODUCT_IMAGES[type];

  if (resolvedImageUrl && !imgFailed) {
    return (
      <div
        className={`studio-artwork-container relative overflow-hidden bg-[#12141A] ${className}`}
      >
        <img
          src={resolvedImageUrl}
          alt={title}
          referrerPolicy="no-referrer"
          onError={() => setImgFailed(true)}
          className="studio-artwork-img w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div
          aria-hidden="true"
          className="studio-artwork-vignette pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08090C]/35 via-transparent to-transparent"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-slate-100 dark:bg-[#0D0F14] flex items-center justify-center ${className}`}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 75% 25%, rgba(236, 0, 140, 0.22), transparent 55%), radial-gradient(circle at 25% 80%, rgba(148, 163, 184, 0.15), transparent 50%)',
        }}
      />
      <svg
        viewBox="0 0 400 300"
        className="relative z-10 w-full h-full p-6"
        role="img"
        aria-label={title}
      >
        <defs>
          <linearGradient id="metalGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#272B36" />
            <stop offset="50%" stopColor="#161922" />
            <stop offset="100%" stopColor="#0B0D12" />
          </linearGradient>
          <linearGradient id="magentaAccent" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#EC008C" />
            <stop offset="100%" stopColor="#FF4DB8" />
          </linearGradient>
        </defs>

        {type === 'motor_pack' || type === 'aria_121' ? (
          <g>
            <rect x="40" y="65" width="320" height="14" rx="4" fill="#1E2330" stroke="#334155" strokeWidth="1" />
            <line x1="55" y1="72" x2="345" y2="72" stroke="#EC008C" strokeWidth="1.5" strokeDasharray="6 4" />
            <rect x="115" y="95" width="170" height="115" rx="18" fill="url(#metalGrad)" stroke="#475569" strokeWidth="1.5" />
            <rect x="135" y="112" width="130" height="44" rx="8" fill="#090B0E" stroke="#334155" strokeWidth="1" />
            <rect x="150" y="128" width="60" height="6" rx="3" fill="url(#magentaAccent)" />
            <text x="200" y="185" textAnchor="middle" fill="#F8FAFC" fontSize="13" fontWeight="700" fontFamily="monospace">
              800N · 1200N · 1500N
            </text>
          </g>
        ) : null}
      </svg>
    </div>
  );
}
