'use client';

import React from 'react';
import Link from 'next/link';
import {
  Eye,
  ShoppingCart,
  Info,
  ChevronLeft,
  CheckCircle2,
} from 'lucide-react';
import { motion } from 'motion/react';
import { ProductTechnicalArtwork } from '@/components/brand/ProductTechnicalArtwork';

export interface BetaReferenceProductCardProps {
  id: string;
  sku: string;
  title: string;
  priceText: string;
  description: string;
  href: string;
  artworkType:
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
  /** 'select_model' renders full-width "انتخاب مدل و خرید <" pill; 'direct_add' renders split "افزودن به سبد خرید" + "جزئیات" pills */
  ctaMode: 'select_model' | 'direct_add';
  onQuickView?: () => void;
  onAddToCart?: () => void;
  addedFeedbackText?: string;
  index?: number;
}

export function BetaReferenceProductCard({
  sku,
  title,
  priceText,
  description,
  href,
  artworkType,
  customImageUrl,
  ctaMode,
  onQuickView,
  onAddToCart,
  addedFeedbackText,
  index = 0,
}: BetaReferenceProductCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.55,
        delay: (index % 2) * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="apple-card group rounded-[40px] bg-white dark:bg-[#161617] border border-black/[0.04] dark:border-white/[0.08] p-3 sm:p-3.5 pb-6 sm:pb-7 flex flex-col justify-between shadow-[0_20px_50px_rgba(15,23,42,0.06)]"
    >
      <div>
        {/* Top Studio Flat-Lay Stage with Uniform 4-Corner Border Radius & Overlaid Header Badges */}
        <div className="relative rounded-[28px] overflow-hidden bg-[#ECECEE]">
          {/* Overlaid Top Row Directly Over the Studio Image (Zero Seam) */}
          <div className="absolute top-3.5 inset-x-4 z-20 flex items-center justify-between gap-2 pointer-events-none">
            {/* Right in RTL: "موجود در انبار" followed by green dot on its left */}
            <div className="pointer-events-auto inline-flex items-center gap-2 text-[13px] sm:text-[14px] font-extrabold text-[#1E293B]">
              <span style={{ color: '#1E293B' }}>موجود در انبار</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] inline-block shrink-0 shadow-[0_0_8px_rgba(34,197,94,0.45)]" />
            </div>

            {/* Left in RTL: White Pill "مشاهده سریع" with Eye icon on its left */}
            {onQuickView ? (
              <button
                type="button"
                onClick={onQuickView}
                className="pointer-events-auto quick-view-pill inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-[0_6px_18px_rgba(15,23,42,0.08)] border border-black/[0.03] text-[13px] sm:text-[14px] font-extrabold text-[#1E293B] hover:scale-105 transition-transform cursor-pointer"
              >
                <span>مشاهده سریع</span>
                <Eye className="w-4 h-4 text-[#1E293B] stroke-[2.2]" />
              </button>
            ) : (
              <Link
                href={href}
                className="pointer-events-auto quick-view-pill inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-[0_6px_18px_rgba(15,23,42,0.08)] border border-black/[0.03] text-[13px] sm:text-[14px] font-extrabold text-[#1E293B] hover:scale-105 transition-transform"
              >
                <span>مشاهده سریع</span>
                <Eye className="w-4 h-4 text-[#1E293B] stroke-[2.2]" />
              </Link>
            )}
          </div>

          {/* Full-Bleed Flat-Lay Studio Kit Image */}
          <Link
            href={href}
            className="block relative w-full aspect-[16/10] overflow-hidden"
          >
            <ProductTechnicalArtwork
              type={artworkType}
              customImageUrl={customImageUrl}
              title={title}
              className="w-full h-full"
            />
          </Link>
        </div>

        {/* Card Body Content */}
        <div className="px-3.5 sm:px-5 pt-4">
          {/* SKU + Horizontal Hairline (LTR Left-Aligned) */}
          <div dir="ltr" className="flex items-center gap-4 text-left">
            <span className="text-[12px] sm:text-[13px] font-bold tracking-wider text-[#64748B] dark:text-[#94A3B8] uppercase">
              {sku}
            </span>
            <span className="h-[1.5px] w-28 sm:w-36 bg-[#E2E8F0] dark:bg-white/[0.12]" />
          </div>

          {/* Right-Aligned Title + Magenta Price + 2-Line Description */}
          <div className="text-right space-y-2 pt-2.5">
            <h3 className="text-[21px] sm:text-[25px] font-black text-[#0F172A] dark:text-white leading-[1.35]">
              <Link
                href={href}
                className="hover:text-[#EC008C] transition-colors"
              >
                {title}
              </Link>
            </h3>

            <div className="text-[22px] sm:text-[26px] font-black text-[#EC008C] tabular-nums whitespace-nowrap pt-0.5">
              {priceText}
            </div>

            <p className="text-[13.5px] sm:text-[15px] font-medium text-[#64748B] dark:text-[#A1A1A6] leading-[1.8] line-clamp-2">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA Action Row */}
      <div className="px-3.5 sm:px-5 pt-6">
        {addedFeedbackText ? (
          <div
            role="status"
            className="keep-white-text w-full h-[52px] sm:h-[56px] px-6 rounded-full bg-emerald-600 text-white text-[15px] sm:text-[16px] font-extrabold flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>{addedFeedbackText}</span>
          </div>
        ) : ctaMode === 'select_model' ? (
          <Link
            href={href}
            className="apple-pill-btn keep-white-text w-full h-[52px] sm:h-[56px] px-6 rounded-full bg-[#EC008C] hover:bg-[#d4007d] text-white text-[15.5px] sm:text-[17px] font-extrabold shadow-[0_12px_28px_rgba(236,0,140,0.32)] flex items-center justify-center gap-2"
          >
            <span>انتخاب مدل و خرید</span>
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </Link>
        ) : (
          <div className="flex items-center gap-3 sm:gap-3.5">
            <button
              type="button"
              onClick={onAddToCart}
              className="apple-pill-btn keep-white-text flex-1 h-[52px] sm:h-[56px] px-5 rounded-full bg-[#EC008C] hover:bg-[#d4007d] text-white text-[15.5px] sm:text-[17px] font-extrabold shadow-[0_12px_28px_rgba(236,0,140,0.32)] flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5 stroke-[2.2]" />
              <span>افزودن به سبد خرید</span>
            </button>

            <Link
              href={href}
              className="apple-pill-btn shrink-0 h-[52px] sm:h-[56px] px-5 sm:px-6 rounded-full bg-[#F8FAFC] dark:bg-[#242426] hover:bg-[#F1F5F9] dark:hover:bg-white/15 border border-[#CBD5E1] dark:border-white/[0.16] text-[#0F172A] dark:text-white text-[14.5px] sm:text-[15.5px] font-extrabold flex items-center justify-center gap-2"
            >
              <Info className="w-5 h-5 stroke-[2.2]" />
              <span>جزئیات</span>
            </Link>
          </div>
        )}
      </div>
    </motion.article>
  );
}
