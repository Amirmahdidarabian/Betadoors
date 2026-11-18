'use client';

import React, { useState } from 'react';

const DEFAULT_PRODUCT_IMAGES: Record<string, string> = {
  motor_pack: '/assets/products/apple_studio/beta_swing_gate_arms.jpg',
  aria_121: '/assets/products/apple_studio/beta_control_simote_gsm.jpg',
  roller_opener: '/assets/products/apple_studio/beta_shutter_side_motor.jpg',
  remote_pack: '/assets/products/apple_studio/beta_z7_gsm_alarm_pack.jpg',
  receiver: '/assets/products/apple_studio/beta_control_simote_gsm.jpg',
  remote: '/assets/products/apple_studio/beta_remotes_collection.jpg',
  sectional_door: '/assets/products/apple_studio/beta_sliding_gate_motor.jpg',
  gate_opener: '/assets/products/apple_studio/beta_swing_gate_arms.jpg',
  keypad: '/assets/products/apple_studio/beta_attendance_uhf_access.jpg',
  hardware_kit: '/assets/products/apple_studio/beta_ups_magnetic_lock.jpg',
};

const UNIFORM_STUDIO_URL_MAP: Record<string, string> = {
  '/assets/aistudio/cat_gate_openers.png':
    '/assets/products/apple_studio/beta_swing_gate_arms.jpg',
  '/assets/aistudio/cat_garage_doors.png':
    '/assets/products/apple_studio/beta_sliding_gate_motor.jpg',
  '/assets/aistudio/cat_door_openers.png':
    '/assets/products/apple_studio/beta_control_simote_gsm.jpg',
  '/assets/aistudio/cat_accessories.png':
    '/assets/products/apple_studio/beta_attendance_uhf_access.jpg',
  '/assets/aistudio/prod_remote.png':
    '/assets/products/apple_studio/beta_remotes_collection.jpg',
  '/assets/aistudio/prod_roller_opener.png':
    '/assets/products/apple_studio/beta_shutter_side_motor.jpg',
  '/assets/aistudio/cat_gates.png':
    '/assets/products/apple_studio/beta_barrier_glass_operator.jpg',
  '/assets/aistudio/prod_remote_pack.png':
    '/assets/products/apple_studio/beta_z7_gsm_alarm_pack.jpg',
  '/assets/aistudio/cat_hardware.png':
    '/assets/products/apple_studio/beta_ups_magnetic_lock.jpg',
  '/assets/aistudio/prod_motor_pack.png':
    '/assets/products/apple_studio/beta_swing_gate_arms.jpg',
  '/assets/aistudio/prod_receiver.png':
    '/assets/products/apple_studio/beta_control_simote_gsm.jpg',
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

export type ProductTechnicalArtworkType =
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

export function ProductTechnicalArtwork({
  type,
  customImageUrl,
  title,
  className = 'w-full h-full',
}: {
  type: ProductTechnicalArtworkType;
  customImageUrl?: string;
  title: string;
  className?: string;
}) {
  const [imgFailed, setImgFailed] = useState(false);

  const mappedCustomUrl = customImageUrl
    ? UNIFORM_STUDIO_URL_MAP[customImageUrl] || customImageUrl
    : undefined;

  const resolvedImageUrl =
    mappedCustomUrl && !LEGACY_IMAGE_OVERRIDES.has(mappedCustomUrl)
      ? mappedCustomUrl
      : DEFAULT_PRODUCT_IMAGES[type];

  const isOfficialBetaAsset =
    resolvedImageUrl?.startsWith('/assets/beta-official/') ?? false;

  if (resolvedImageUrl && !imgFailed) {
    return (
      <div
        className={`studio-artwork-container relative overflow-hidden bg-[#ECECEE] flex items-center justify-center ${className}`}
      >
        <img
          src={resolvedImageUrl}
          alt={title}
          referrerPolicy="no-referrer"
          onError={() => setImgFailed(true)}
          className={
            isOfficialBetaAsset
              ? 'studio-artwork-img w-full h-full object-contain object-center p-4 pt-9 mix-blend-multiply transition-transform duration-500 group-hover:scale-[1.05]'
              : 'studio-artwork-img w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]'
          }
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-[#F5F5F7] flex items-center justify-center ${className}`}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 75% 25%, rgba(236, 0, 140, 0.16), transparent 55%), radial-gradient(circle at 25% 80%, rgba(148, 163, 184, 0.12), transparent 50%)',
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
