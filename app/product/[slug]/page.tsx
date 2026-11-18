'use client';

import React, { use, useState } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  CheckCircle2,
  AlertCircle,
  Wrench,
} from 'lucide-react';
import { SiteShell } from '@/components/layout/SiteShell';
import { useBetaDoors } from '@/components/providers/BetaDoorsProvider';
import { formatAudCents } from '@/lib/domain-logic';
import { ProductTechnicalArtwork } from '@/components/brand/ProductTechnicalArtwork';
import { EnquiryForm } from '@/components/forms/EnquiryForm';

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { products, addToCart, mutateServer } = useBetaDoors();

  const product = products.find((p) => p.slug === slug);

  const [variantLabel, setVariantLabel] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<
    'description' | 'specs' | 'reviews' | 'installation'
  >('description');
  const [cartError, setCartError] = useState<string | null>(null);
  const [cartSuccess, setCartSuccess] = useState<string | null>(null);

  // Review state
  const [revName, setRevName] = useState('');
  const [revRating, setRevRating] = useState(5);
  const [revComment, setRevComment] = useState('');
  const [revSubmitted, setRevSubmitted] = useState(false);

  if (!product) {
    return (
      <SiteShell>
        <div dir="rtl" className="px-6 py-20 max-w-4xl mx-auto text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">محصول مورد نظر یافت نشد</h1>
          <p className="text-sm text-slate-400">
            محصول درخواستی در فهرست فروشگاه شرکت بتا یافت نشد. می‌توانید به صفحه فروشگاه بازگردید.
          </p>
          <Link
            href="/shop/"
            className="keep-white-text inline-flex items-center gap-2 px-5 py-2.5 rounded-none bg-[#EC008C] text-white text-xs font-semibold"
          >
            بازگشت به فروشگاه بتا
          </Link>
        </div>
      </SiteShell>
    );
  }

  const matchedVariant = product.requiresVariant
    ? product.variants.find((v) => v.label === variantLabel) ?? null
    : null;

  const displayedPriceCents = matchedVariant
    ? matchedVariant.priceCents
    : product.priceCents;

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
    setCartError(null);
    setCartSuccess(null);
    const res = addToCart(
      product,
      product.requiresVariant ? variantLabel : null,
      quantity
    );
    if (!res.ok) {
      setCartError(res.error);
      return;
    }
    setCartSuccess(
      `${quantity} عدد «${product.name}${variantLabel ? ` (${variantLabel})` : ''}» به سبد خرید اضافه شد.`
    );
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!revName.trim() || !revComment.trim()) return;
    await mutateServer('submit_product_review', {
      productSlug: product.slug,
      authorName: revName,
      rating: revRating,
      comment: revComment,
    });
    setRevSubmitted(true);
    setRevName('');
    setRevComment('');
  };

  const relatedProducts = products.filter((p) =>
    product.relatedProductIds.includes(p.id)
  );

  return (
    <SiteShell>
      <div dir="rtl" className="px-4 sm:px-8 lg:px-12 py-10 max-w-7xl mx-auto space-y-14">
        {/* Breadcrumb */}
        <nav aria-label="مسیر صفحه" className="text-xs text-slate-400 flex items-center gap-2">
          <Link href="/" className="hover:text-white">صفحه اصلی</Link>
          <span aria-hidden="true">/</span>
          <Link href="/shop/" className="hover:text-white">فروشگاه آنلاین</Link>
          <span aria-hidden="true">/</span>
          <span className="text-slate-200">{product.name}</span>
        </nav>

        {/* Contiguous Purchase Module */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Gallery */}
          <div className="lg:col-span-6 hud-corner-brackets bg-[#12141A] border border-white/10 rounded-none overflow-hidden aspect-video w-full">
            <ProductTechnicalArtwork
              type={product.imageSvgType}
              customImageUrl={product.customImageUrl}
              title={product.name}
              className="w-full h-full"
            />
          </div>

          {/* Purchase Module */}
          <div className="lg:col-span-6 hud-corner-brackets bg-[#0F1117] border border-white/10 rounded-none p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <div className="text-xs font-mono text-slate-400">
                کد فنی: {matchedVariant ? matchedVariant.sku : product.sku} · موجودی انبار مرکزی:{' '}
                {matchedVariant ? matchedVariant.stockCount : product.stockCount} عدد
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                {product.name}
              </h1>
              <div
                data-testid="pdp-displayed-price"
                className="text-2xl sm:text-3xl font-bold text-[#ff7ac6] font-mono tabular-nums pt-1"
              >
                {product.requiresVariant && !matchedVariant && product.maxPriceCents
                  ? `${formatAudCents(product.priceCents)} تا ${formatAudCents(product.maxPriceCents)}`
                  : formatAudCents(displayedPriceCents)}
              </div>
              <p className="text-xs text-slate-400">
                قیمت مصوب فروش آنلاین شرکت بتا (همراه با گارانتی و خدمات پس از فروش معتبر).
              </p>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {product.shortDescription}
            </p>

            {product.compatibilityNote && (
              <div className="p-3.5 rounded-none bg-amber-950/40 border border-amber-500/30 text-xs text-amber-200 leading-relaxed">
                <strong>نکته فنی و سازگاری:</strong> {product.compatibilityNote}
              </div>
            )}

            <form onSubmit={handleAddToCart} noValidate className="space-y-5 pt-2 border-t border-white/10">
              {cartError && (
                <div
                  role="alert"
                  className="p-3.5 rounded-none bg-rose-950/60 border border-rose-500/40 text-xs text-rose-200 flex items-center gap-2"
                >
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{cartError}</span>
                </div>
              )}

              {cartSuccess && (
                <div
                  role="status"
                  aria-live="polite"
                  className="p-3.5 rounded-none bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-100 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{cartSuccess}</span>
                  </div>
                  <Link href="/cart/" className="underline font-semibold text-white whitespace-nowrap">
                    مشاهده سبد خرید ←
                  </Link>
                </div>
              )}

              {product.requiresVariant && (
                <div>
                  <label
                    htmlFor="motor-pack-variant-select"
                    className="block text-xs font-semibold text-slate-200 mb-2"
                  >
                    انتخاب ظرفیت و مدل جک پارکینگی *
                  </label>
                  <select
                    id="motor-pack-variant-select"
                    required
                    value={variantLabel}
                    onChange={(e) => {
                      setVariantLabel(e.target.value);
                      setCartError(null);
                    }}
                    className="w-full px-4 py-3 text-sm bg-[#08090C] border border-white/15 rounded-none text-white focus:outline-none focus:border-[#EC008C]"
                  >
                    <option value="">یک گزینه را انتخاب کنید (800N/B400، 1200N/B500 یا 1500N/B550)...</option>
                    {product.variants.map((v) => (
                      <option key={v.id} value={v.label}>
                        {v.label} — {formatAudCents(v.priceCents)} ({v.stockCount} عدد موجود)
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex flex-wrap items-end gap-4">
                <div className="w-28">
                  <label
                    htmlFor="pdp-quantity-input"
                    className="block text-xs font-medium text-slate-300 mb-1.5"
                  >
                    تعداد
                  </label>
                  <input
                    id="pdp-quantity-input"
                    type="number"
                    min={1}
                    max={20}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#08090C] border border-white/15 rounded-none text-white tabular-nums"
                  />
                </div>

                <button
                  type="submit"
                  className="keep-white-text flex-1 inline-flex items-center justify-center gap-2 py-3 px-6 rounded-none bg-[#EC008C] hover:bg-[#d4007d] text-white text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>افزودن به سبد خرید</span>
                </button>
              </div>
            </form>

            {/* Pack Contents & Installation CTA */}
            <div className="pt-4 border-t border-white/10 space-y-3 text-xs text-slate-300">
              <div className="font-semibold text-white">اقلام همراه در بسته‌بندی و ویژگی‌ها:</div>
              <ul className="space-y-1.5 text-slate-400">
                {product.packContents.map((item) => (
                  <li key={item}>· {item}</li>
                ))}
              </ul>
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('installation')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#EC008C] hover:text-pink-400 cursor-pointer"
                >
                  <Wrench className="w-3.5 h-3.5" />
                  <span>درخواست معرفی نصاب مجاز یا مشاوره نصب ←</span>
                </button>
                <span className="text-slate-500 font-mono">SKU: {product.sku}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Detail Tabs */}
        <div className="hud-corner-brackets bg-[#0F1117] border border-white/10 rounded-none overflow-hidden">
          <div
            role="tablist"
            aria-label="تب‌های مشخصات محصول"
            className="flex flex-wrap border-b border-white/10 bg-[#0B0D13] px-4 pt-3 gap-2"
          >
            {(
              [
                { id: 'description', label: 'توضیحات و معرفی فنی' },
                { id: 'specs', label: 'جدول مشخصات فنی' },
                { id: 'reviews', label: `دیدگاه خریداران (${product.reviews.length})` },
                { id: 'installation', label: 'درخواست نصب و مشاوره فنی' },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                role="tab"
                type="button"
                aria-selected={activeTab === t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-4 py-2.5 text-xs sm:text-sm font-medium rounded-none transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === t.id
                    ? 'bg-[#0F1117] text-white border-t border-x border-white/10'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="p-6 sm:p-8">
            {activeTab === 'description' && (
              <div className="max-w-3xl space-y-4 text-sm text-slate-300 leading-relaxed">
                <h2 className="text-lg font-semibold text-white">
                  معرفی و بررسی فنی {product.name}
                </h2>
                <p>{product.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  {product.features.map((feat) => (
                    <div
                      key={feat}
                      className="p-4 rounded-none bg-[#08090C] border border-white/10 text-xs text-slate-200 font-medium"
                    >
                      {feat}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="max-w-3xl space-y-4">
                <h2 className="text-lg font-semibold text-white">
                  جدول مشخصات فنی و استانداردهای محصول
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-slate-400">
                        <th className="py-3 pl-4">مشخصه فنی</th>
                        <th className="py-3 px-4">مقدار / توضیح</th>
                        <th className="py-3 pr-4">وضعیت کنترل کیفیت</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 text-slate-200">
                      {product.specs.map((sp) => (
                        <tr key={sp.label}>
                          <td className="py-3 pl-4 font-medium">{sp.label}</td>
                          <td className="py-3 px-4 font-mono">{sp.value}</td>
                          <td className="py-3 pr-4 text-emerald-400">
                            {sp.verified ? 'تایید شده در آزمایشگاه QC بتا' : 'در حال بازبینی'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-6 space-y-4">
                  <h2 className="text-lg font-semibold text-white">
                    دیدگاه مشتریان و نصابان ({product.reviews.length})
                  </h2>
                  {product.reviews.length === 0 ? (
                    <p className="text-xs text-slate-400">
                      هنوز دیدگاهی برای {product.name} ثبت نشده است. اولین دیدگاه را ثبت نمایید.
                    </p>
                  ) : (
                    product.reviews.map((r) => (
                      <div
                        key={r.id}
                        className="p-4 rounded-none bg-[#08090C] border border-white/10 space-y-1.5"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-white">{r.authorName}</span>
                          <span className="font-mono text-amber-400">
                            {'★'.repeat(r.rating)} ({r.rating}/5)
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">{r.comment}</p>
                      </div>
                    ))
                  )}
                </div>

                <div className="lg:col-span-6 bg-[#08090C] border border-white/10 rounded-none p-5 space-y-4">
                  <h3 className="text-sm font-semibold text-white">
                    ثبت دیدگاه و تجربه نصب محصول
                  </h3>
                  {revSubmitted ? (
                    <p className="text-xs text-emerald-300">
                      با تشکر! دیدگاه شما ثبت شد و پس از تایید واحد پشتیبانی نمایش داده خواهد شد.
                    </p>
                  ) : (
                    <form onSubmit={handleReviewSubmit} className="space-y-3 text-xs">
                      <div>
                        <label htmlFor="rev-name" className="block text-slate-300 mb-1">
                          نام و نام خانوادگی *
                        </label>
                        <input
                          id="rev-name"
                          type="text"
                          required
                          value={revName}
                          onChange={(e) => setRevName(e.target.value)}
                          className="w-full px-3 py-2 rounded-none bg-[#0F1117] border border-white/15 text-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="rev-rating" className="block text-slate-300 mb-1">
                          امتیاز (۱ تا ۵ ستاره) *
                        </label>
                        <select
                          id="rev-rating"
                          value={revRating}
                          onChange={(e) => setRevRating(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-none bg-[#0F1117] border border-white/15 text-white"
                        >
                          <option value={5}>۵ ستاره — عالی</option>
                          <option value={4}>۴ ستاره — خوب</option>
                          <option value={3}>۳ ستاره — متوسط</option>
                          <option value={2}>۲ ستاره — ضعیف</option>
                          <option value={1}>۱ ستاره — بسیار ضعیف</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="rev-comment" className="block text-slate-300 mb-1">
                          متن دیدگاه *
                        </label>
                        <textarea
                          id="rev-comment"
                          rows={3}
                          required
                          value={revComment}
                          onChange={(e) => setRevComment(e.target.value)}
                          className="w-full px-3 py-2 rounded-none bg-[#0F1117] border border-white/15 text-white"
                        />
                      </div>
                      <button
                        type="submit"
                        className="keep-white-text px-4 py-2 rounded-none bg-[#EC008C] text-white font-semibold cursor-pointer"
                      >
                        ارسال دیدگاه
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'installation' && (
              <EnquiryForm
                sourcePagePath={product.path}
                productContext={`${product.name}${variantLabel ? ` (${variantLabel})` : ''} — SKU ${product.sku}`}
                heading={`درخواست مشاوره نصب یا پیش‌فاکتور برای ${product.name}`}
                subheading="کارشناسان فنی شرکت بتا آماده پاسخگویی و معرفی نمایندگان مجاز نصب در شهر شما هستند."
              />
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section aria-labelledby="related-heading" className="space-y-6">
            <h2 id="related-heading" className="text-xl sm:text-2xl font-bold text-white">
              سایر محصولات مرتبط شرکت بتا
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  href={rel.path}
                  className="hud-corner-brackets bg-[#0F1117] border border-white/10 hover:border-[#EC008C]/50 rounded-none overflow-hidden flex flex-col justify-between p-4 space-y-3 transition"
                >
                  <div className="aspect-video w-full rounded-none overflow-hidden border border-white/10 bg-[#12141A]">
                    <ProductTechnicalArtwork
                      type={rel.imageSvgType}
                      customImageUrl={rel.customImageUrl}
                      title={rel.name}
                      className="w-full h-full"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{rel.name}</div>
                    <div className="text-xs font-mono text-[#ff7ac6] tabular-nums mt-1">
                      {formatAudCents(rel.priceCents)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </SiteShell>
  );
}
