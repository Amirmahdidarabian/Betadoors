import type {
  AuditLogEntry,
  BrandSettings,
  CmsPageRecord,
  EnquirySubmission,
  ManualDownloadItem,
  OrderRecord,
  RedirectRule,
  ServiceRegistrationSubmission,
  ShopProduct,
  WarrantySubmission,
} from './types';

export const INITIAL_BRAND_SETTINGS: BrandSettings = {
  siteName: 'شرکت بتا (BETA.IR)',
  companyName: 'شرکت بتا (بتا صنعت ایلیا)',
  tagline: 'وقتی بتا می‌خری خیالت راحته، چون برند می‌خری... · سرعت در خدمات، کیفیت در محصول، نوآوری در طراحی',
  headOfficeAddress: 'ایران، تهران، اتوبان صیاد شیرازی، خروجی مسیل باختر، پلاک ۱۲، کد پستی: ۱۶۳۱۹-۳۵۷۱۱',
  headOffice: 'تهران، اتوبان صیاد شیرازی، خروجی مسیل باختر، پلاک ۱۲ (کد پستی: ۱۶۳۱۹-۳۵۷۱۱)',
  logoUrl: '/assets/aistudio/beta_sanat_illia_logo_a790e2da.png',
  customLogoUrl: '/assets/aistudio/beta_sanat_illia_logo_a790e2da.png',
  logoVariant: 'official_mark',
  useCustomSvgLogo: true,
  primaryAccentHex: '#EC008C',
  secondaryAccentHex: '#0F172A',
  secondaryGlowHex: '#A855F7',
  displayFontFamily: 'Vazirmatn',
  bodyFontFamily: 'Vazirmatn',
  customFontWoff2Url: null,
  customFontLicenseVerified: false,
  phone: '021-88404407',
  email: 'info@beta.ir',
  timezone: 'Asia/Tehran',
  announcementText:
    'شرکت بتا (BETA.IR) · دفتر مرکزی: تهران، اتوبان صیاد شیرازی، خروجی مسیل باختر، پلاک ۱۲ · تلفن: ۰۲۱-۸۸۴۰۴۴۰۷ الی ۴۰۹',
  footerTagline:
    'وقتی بتا می‌خری خیالت راحته، چون برند می‌خری... سرعت در خدمات، کیفیت در محصول، نوآوری در طراحی.',
  motionPreset: 'editorial_reveal',
  heroConfig: {
    videoUrl: '/assets/aistudio/logo_motion_ec8a3dd9.mp4',
    posterUrl: '/assets/aistudio/logo_motion_poster.jpg',
    width: 1920,
    height: 1080,
    aspectRatio: '16:9',
    headline: 'وقتی بتا می‌خری، خیالت راحته.',
    subheadline:
      'نسل جدید جک‌های پارکینگی، مدارهای هوشمند و سیستم‌های امنیتی.',
    primaryCtaLabel: 'کاتالوگ محصولات',
    primaryCtaHref: '/products/',
    secondaryCtaLabel: 'خرید آنلاین',
    secondaryCtaHref: '/shop/',
    autoplayMuted: true,
    autoplayMutedLoop: true,
    loop: true,
    captionTranscriptText:
      'نمای حرکتی محصولات اتوماسیون، جک پارکینگی، موتور کرکره برقی و سیستم‌های کنترل تردد شرکت بتا (BETA.IR).',
    revisionNumber: 1,
    history: [
      {
        revisionNumber: 1,
        updatedAt: '2026-11-16T08:00:00.000Z',
        updatedBy: 'admin@betadoors.com.au',
        headline: 'وقتی بتا می‌خری، خیالت راحته.',
        videoUrl: '/assets/aistudio/logo_motion_ec8a3dd9.mp4',
        posterUrl: '/assets/aistudio/logo_motion_poster.jpg',
      },
    ],
  },
  siteCopy: {
    topRibbonNotice:
      'شرکت بتا (BETA.IR) · دفتر مرکزی: تهران، اتوبان صیاد شیرازی، خروجی مسیل باختر، پلاک ۱۲ · تلفن: ۰۲۱-۸۸۴۰۴۴۰۷',
    headerCtaLabel: 'مشاوره و فروش',
    footerBlurb:
      'شرکت بتا (تاسیس ۱۳۸۰)؛ پیشرو در طراحی و تولید جک پارکینگی، مدار کنترل، حضور و غیاب، موتور کرکره و سیستم‌های امنیتی.',
    bentoBadgeText: 'محصولات منتخب بتا',
    bentoTitle: 'طراحی مهندسی. قدرت ماندگار.',
    bentoSubtitle:
      'نسل جدید اتوماسیون ورودی و سیستم‌های الکترونیکی شرکت بتا.',
    catalogBadgeText: 'کاتالوگ رسمی شرکت بتا',
    catalogTitle: 'خانواده محصولات بتا.',
    catalogSubtitle:
      '۹ گروه تخصصی با بیش از ۳۰۰ محصول همراه با گارانتی معتبر شرکت بتا.',
    featuredSectionTitle: 'سفارش آنلاین پکیج‌های بتا.',
    featuredSectionSubtitle:
      'پکیج‌های آماده نصب با گارانتی معتبر و پشتیبانی فنی مستقیم دفتر مرکزی تهران.',
    enquirySectionTitle: 'مشاوره فنی و فروش سازمانی.',
    enquirySectionSubtitle:
      'کارشناسان شرکت بتا (۰۲۱-۸۸۴۰۴۴۰۷) آماده پاسخگویی به شما هستند.',
  },
};

export const INITIAL_SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: 'shop_motor_pack',
    slug: 'motor-pack',
    path: '/product/motor-pack/',
    name: 'پک جک پارکینگی بتا (F350)',
    sku: 'BETA-GATE-PACK',
    shortDescription:
      'پکیج کامل دو بازوی الکترومکانیکی (یا موتور ریلی)، مدار کنترل هوشمند، فتوسل، فلاشر و ۲ عدد ریموت بتا.',
    description:
      'درب بازکن‌های اتوماتیک شرکت بتا در مدل‌های بازویی (F350، MPC TITAN-400، MPC TITAN-600، F600) و ریلی (F-550M و F-500) برای درب‌های مسکونی و مجتمع‌های پرتردد طراحی شده‌اند.',
    categorySlug: 'uncategorized',
    priceCents: 65000,
    maxPriceCents: 73000,
    currency: 'AUD',
    stockCount: 18,
    requiresVariant: true,
    variants: [
      {
        id: 'v_800',
        label: '800N',
        sku: 'BETA-F350-PACK',
        priceCents: 65000,
        stockCount: 7,
      },
      {
        id: 'v_1200',
        label: '1200N',
        sku: 'BETA-F600-PRO',
        priceCents: 69000,
        stockCount: 6,
      },
      {
        id: 'v_1500',
        label: '1500N',
        sku: 'BETA-F550M-SLIDE',
        priceCents: 73000,
        stockCount: 5,
      },
    ],
    features: [
      'بازوهای مقاوم در برابر نفوذ آب و گردوغبار (IP54) با خلاص‌کن ایمن',
      'مدار کنترل هوشمند بتا با قابلیت تنظیم فورس و نرم‌ایست دو سرعته',
      'همراه با فتوسل ایمنی، فلاشر LED، ۲ عدد ریموت بتا و یراق‌آلات نصب',
      'سازگار با رسیور سیم‌کارتی سیموت و آنتن برد بلند UHF پارکینگی',
    ],
    packContents: [
      '۲ عدد بازوی جک پارکینگی بتا (یا موتور گیربکس ریلی با ۴ متر ریل)',
      '۱ عدد تابلو فرمان میکروپروسسوری بتا با نمایشگر دیجیتال',
      '۱ جفت چشمی فتوسل ایمنی + ۱ عدد فلاشر LED تابان بتا',
      '۲ عدد ریموت کنترل بتا + پک کامل یراق‌آلات و راهنمای نصب',
    ],
    specs: [
      { label: 'مدل‌های قابل انتخاب', value: '800N (F350 / TITAN-400) | 1200N (F600) | 1500N (F-550M)', verified: true },
      { label: 'ولتاژ کاری سیستم', value: '220V AC / 24V DC', verified: true },
      { label: 'ظرفیت هر لنگه درب', value: 'تا ۳.۵ متر و وزن ۴۰۰ الی ۶۰۰ کیلوگرم (ریلی تا ۱۵۰۰ کیلوگرم)', verified: true },
      { label: 'مدار فرمان سازگار', value: 'Rock-S / ROCK / Solid / BT1', verified: true },
      { label: 'فرکانس ریموت', value: '433.92 MHz', verified: true },
      { label: 'گارانتی و خدمات', value: 'گارانتی معتبر شرکت بتا (۲ تا ۷ روز کاری)', verified: true },
    ],
    imageSvgType: 'motor_pack',
    customImageUrl: '/assets/products/apple_studio/beta_swing_gate_arms.jpg',
    relatedProductIds: ['shop_roller_opener', 'shop_remote_pack', 'shop_receiver'],
    reviews: [
      {
        id: 'rev_1',
        authorName: 'مهندس رضایی (تهران)',
        rating: 5,
        comment:
          'جک F350 و F600 بتا بسیار نرم و بی‌صدا کار می‌کنند و بردهای سری Rock تنظیمات دقیقی دارند.',
        createdAt: '2026-10-18T09:30:00Z',
        status: 'approved',
      },
    ],
  },
  {
    id: 'shop_roller_opener',
    slug: 'roller-door-opener',
    path: '/product/roller-door-opener/',
    name: 'پک موتور کرکره ساید بتا UPS هوشمند',
    sku: 'BETA-SIDE-UPS600',
    shortDescription:
      'موتور کرکره برقی ساید (1000Kg) مجهز به برق اضطراری UPS، زنجیر خلاص‌کن، مرکز کنترل و ۲ ریموت.',
    description:
      'موتورهای کرکره برقی بتا در دو خانواده ساید با UPS و توبولار عرضه می‌شوند و در زمان قطع برق بدون وقفه از طریق باتری بکاپ عمل می‌کنند.',
    categorySlug: 'uncategorized',
    priceCents: 59000,
    currency: 'AUD',
    stockCount: 22,
    requiresVariant: false,
    variants: [],
    features: [
      'مجهز به برق اضطراری هوشمند (UPS ۲۴ ولت) هنگام قطع برق',
      'سیم‌پیچ تمام مس با گیربکس صنعتی و ترمز ضد سقوط (Anti-Drop)',
      'مرکز کنترل ساید New Face یا سیم‌کارتی با اپلیکیشن موبایل',
      'همراه با صفحه پلیت فولادی، زنجیر خلاص‌کن و ۲ عدد ریموت بتا',
    ],
    packContents: [
      '۱ عدد موتور کرکره ساید بتا با گیربکس و ترمز ایمنی',
      '۱ عدد پک برق اضطراری UPS بتا با باتری بکاپ',
      '۱ عدد مدار کنترل ساید بتا + ۲ عدد ریموت بتا + صفحه پلیت',
    ],
    specs: [
      { label: 'ظرفیت موتور ساید', value: '300Kg / 500Kg / 600Kg / 1000Kg', verified: true },
      { label: 'مدل‌های توبولار', value: '60N.m / 100N.m / 120N.m / 140N.m', verified: true },
      { label: 'مدار فرمان', value: 'مرکز کنترل ساید UPS بتا / سیم‌کارتی GSM', verified: true },
      { label: 'اپلیکیشن موبایل', value: 'GSM Side Full Ch Multi (اندروید و iOS)', verified: true },
    ],
    imageSvgType: 'roller_opener',
    customImageUrl: '/assets/products/apple_studio/beta_shutter_side_motor.jpg',
    relatedProductIds: ['shop_motor_pack', 'shop_receiver', 'shop_remote'],
    reviews: [],
  },
  {
    id: 'shop_remote_pack',
    slug: 'remote-pack',
    path: '/product/remote-pack/',
    name: 'پک دزدگیر اماکن سیم‌کارتی Z7-GSM Plus',
    sku: 'BETA-Z7-GSM-PACK',
    shortDescription:
      'پنل مرکزی دزدگیر سیم‌کارتی و خط ثابت بتا با اپلیکیشن فارسی موبایل، ۲ چشمی دیجیتال، آژیر و ۲ ریموت.',
    description:
      'دزدگیر اماکن Z7-GSM Plus و B1 Ultimate Plus راهکار هوشمند حفاظت از منازل و فروشگاه‌ها با ماژول سیم‌کارت داخلی و اپلیکیشن اختصاصی موبایل هستند.',
    categorySlug: 'uncategorized',
    priceCents: 24000,
    currency: 'AUD',
    stockCount: 30,
    requiresVariant: false,
    variants: [],
    features: [
      'پشتیبانی همزمان از سیم‌کارت (GSM) و خط تلفن ثابت شهری',
      'اپلیکیشن فارسی Z7-GSM Multi برای اندروید و وب‌اپ آیفون',
      'پشتیبانی از سنسورهای باسیم و بی‌سیم با تفکیک زون هوشمند',
      'سازگار با چشمی‌های حرکتی بتا (G20 / G15) و مگنت بی‌سیم',
    ],
    packContents: [
      '۱ عدد پنل مرکزی دزدگیر Z7-GSM Plus بتا',
      '۲ عدد ریموت کنترل برد بالا بتا + ۲ عدد چشمی دیجیتال G20',
      '۱ عدد بلندگوی آژیر و باتری بکاپ ۱۲ ولت + راهنمای نصب',
    ],
    specs: [
      { label: 'مدل دستگاه', value: 'Z7-GSM Plus / B1 Ultimate Plus', verified: true },
      { label: 'ارتباط مخابراتی', value: 'سیم‌کارت GSM + خط تلفن ثابت', verified: true },
      { label: 'اپلیکیشن موبایل', value: 'Z7-GSM Multi (اندروید و iOS)', verified: true },
      { label: 'تغذیه پشتیبان', value: 'شارژر هوشمند باتری ۱۲ ولت داخلی', verified: true },
    ],
    imageSvgType: 'remote_pack',
    customImageUrl: '/assets/products/apple_studio/beta_z7_gsm_alarm_pack.jpg',
    relatedProductIds: ['shop_receiver', 'shop_remote', 'shop_motor_pack'],
    reviews: [],
  },
  {
    id: 'shop_receiver',
    slug: 'receiver',
    path: '/product/receiver/',
    name: 'پک مدار فرمان و رسیور سیم‌کارتی سیموت',
    sku: 'BETA-SIMOTE-GSM',
    shortDescription:
      'تابلو فرمان دیجیتال به همراه رسیور سیم‌کارتی اسمارت سیموت، آنتن تقویتی، چشمی فتوسل و ۲ عدد ریموت بتا.',
    description:
      'رسیور سیم‌کارتی سیموت (Simote) امکان باز و بسته کردن انواع درب اتوماتیک و تجهیزات برقی را بدون محدودیت مسافت با موبایل فراهم می‌سازد.',
    categorySlug: 'uncategorized',
    priceCents: 9000,
    currency: 'AUD',
    stockCount: 42,
    requiresVariant: false,
    variants: [],
    compatibilityNote:
      'قابل نصب روی تمامی مدارهای جک پارکینگی، کرکره برقی، راهبند و قفل‌های برقی.',
    features: [
      'کنترل درب با تماس تلفنی، پیامک و اپلیکیشن Smart Simote',
      'اپلیکیشن اختصاصی برای اندروید و وب‌اپلیکیشن آیفون (iOS)',
      'گیرنده رادیویی 433MHz داخلی جهت پشتیبانی همزمان از ریموت',
      'موجود در نسخه‌های ۲ رله، اسمارت پلاس، ۴ رله و ۸ رله صنعتی',
    ],
    packContents: [
      '۱ عدد رسیور سیم‌کارتی اسمارت سیموت پلاس بتا + مدار فرمان',
      '۱ عدد آنتن تقویتی GSM + ۱ جفت فتوسل + ۲ عدد ریموت بتا',
    ],
    specs: [
      { label: 'تعداد رله', value: '۲ رله (موجود در مدل‌های ۴ و ۸ رله صنعتی)', verified: true },
      { label: 'مد عملکرد', value: 'لحظه‌ای (پالسی)، چفتی و تایمردار', verified: true },
      { label: 'اپلیکیشن موبایل', value: 'Smart Simote (اندروید و iOS)', verified: true },
      { label: 'گیرنده رادیویی', value: '433.92 MHz', verified: true },
    ],
    imageSvgType: 'receiver',
    customImageUrl: '/assets/products/apple_studio/beta_control_simote_gsm.jpg',
    relatedProductIds: ['shop_remote_pack', 'shop_remote', 'shop_motor_pack'],
    reviews: [],
  },
  {
    id: 'shop_remote',
    slug: 'remote',
    path: '/product/remote/',
    name: 'پک ریموت کنترل و فتوسل ایمنی فابریک بتا',
    sku: 'BETA-REM-2018',
    shortDescription:
      'مجموعه ۴ عدد ریموت استیل بتا، گیرنده رادیویی دیجیتال ۲ کاناله، چشمی فتوسل مادون قرمز و فلاشر LED.',
    description:
      'شرکت بتا بیش از ۲۵ مدل ریموت کنترل شامل سری لرنینگ (2018، 2007، 2024)، هاپینگ ضدکپی (2011) و بلوتوثی (2025) را با بالاترین کیفیت تولید می‌کند.',
    categorySlug: 'uncategorized',
    priceCents: 6000,
    currency: 'AUD',
    stockCount: 95,
    requiresVariant: false,
    variants: [],
    features: [
      'فریم استیل مستحکم با درپوش کشویی محافظ دکمه‌ها',
      'فرکانس دقیق 433.92MHz با برد بالا و مصرف بهینه باتری',
      'سازگار با تمامی مدارهای جک، کرکره، راهبند و دزدگیر بتا',
    ],
    packContents: [
      '۴ عدد ریموت کنترل اصلی بتا + گیرنده ۲ کاناله + جفت فتوسل و فلاشر',
    ],
    specs: [
      { label: 'فرکانس کاری', value: '433.92 MHz SAW Stabilized', verified: true },
      { label: 'تعداد کلیدها', value: '۴ کلید با کاور کشویی', verified: true },
      { label: 'کدینگ موجود', value: 'Learning (2018) | Hopping (2011) | Bluetooth (2025)', verified: true },
    ],
    imageSvgType: 'remote',
    customImageUrl: '/assets/products/apple_studio/beta_remotes_collection.jpg',
    relatedProductIds: ['shop_remote_pack', 'shop_receiver', 'shop_motor_pack'],
    reviews: [],
  },
  {
    id: 'shop_sliding_pack',
    slug: 'sliding-gate-pack',
    path: '/product/motor-pack/',
    name: 'پک موتور درب ریلی بتا (F-550M)',
    sku: 'BETA-SLIDE-F550M',
    shortDescription:
      'موتور گیربکس صنعتی درب کشویی تا ۱۵۰۰ کیلوگرم به همراه ریل فولادی دنده‌شانه‌ای، برد دیجیتال، فتوسل و ۲ ریموت.',
    description:
      'موتور درب ریلی F-550M و F-500 بتا با گیربکس صنعتی و ریل فولادی گالوانیزه برای درب‌های کشویی مجتمع‌های مسکونی، تجاری و کارخانجات طراحی شده است.',
    categorySlug: 'uncategorized',
    priceCents: 71000,
    maxPriceCents: 84000,
    currency: 'AUD',
    stockCount: 14,
    requiresVariant: true,
    variants: [
      {
        id: 'v_800',
        label: '800N',
        sku: 'BETA-F500-SLIDE',
        priceCents: 71000,
        stockCount: 6,
      },
      {
        id: 'v_1200',
        label: '1200N',
        sku: 'BETA-F550M-SLIDE',
        priceCents: 76000,
        stockCount: 5,
      },
      {
        id: 'v_1500',
        label: '1500N',
        sku: 'BETA-F550M-IND',
        priceCents: 84000,
        stockCount: 3,
      },
    ],
    features: [
      'گیربکس صنعتی مقاوم با خلاص‌کن کلیدی ایمن هنگام قطع برق',
      'همراه با ۴ متر ریل فولادی دنده‌شانه‌ای گالوانیزه',
      'تابلو فرمان هوشمند با تنظیم نرم‌ایست (Soft Stop) و فورس دیجیتال',
    ],
    packContents: [
      '۱ عدد موتور گیربکس درب ریلی F-550M بتا + ۴ شاخه ریل فولادی',
      '۱ عدد مدار کنترل دیجیتال + ۱ جفت فتوسل + ۲ عدد ریموت بتا',
    ],
    specs: [
      { label: 'حداکثر وزن درب', value: '۱۰۰۰ تا ۱۵۰۰ کیلوگرم', verified: true },
      { label: 'جنس چرخ‌دنده و ریل', value: 'فولاد آبکاری شده ضد سایش', verified: true },
      { label: 'درجه حفاظت', value: 'IP54 مقاوم در برابر باران و گردوغبار', verified: true },
    ],
    imageSvgType: 'sectional_door',
    customImageUrl: '/assets/products/apple_studio/beta_sliding_gate_motor.jpg',
    relatedProductIds: ['shop_motor_pack', 'shop_roller_opener', 'shop_receiver'],
    reviews: [],
  },
];

export const INITIAL_MANUALS: ManualDownloadItem[] = [
  {
    id: 'manual_asterion',
    label: 'کاتالوگ و راهنمای نصب جک‌های پارکینگی و مدار کنترل Rock-S / BT1 بتا',
    modelName: 'MPC TITAN-400 / F600 / F-550M / Rock-S',
    version: '4.2',
    fileSizeKb: 2480,
    wpOriginalUrl: 'https://www.beta.ir/form/main?id=13',
    localDownloadPath: '/api/manuals/manual_asterion',
    summary:
      'راهنمای کامل نصب مکانیکی بازوها، سیم‌کشی ترمینال‌های مدار کنترل Rock-S، ROCK، Solid و BT1، تنظیم تایم اول و دوم (نرم‌ایست)، ست کردن ریموت و اتصال فتوسل و قفل برقی.',
    published: true,
    updatedAt: '2026-11-10T08:00:00Z',
  },
  {
    id: 'manual_rdo',
    label: 'اپلیکیشن‌ها و راهنمای رسیورهای سیم‌کارتی سیموت (Smart Simote 2/4/8 Relay)',
    modelName: 'Smart Simote Plus / Simote 4CH & 8CH Industrial',
    version: '3.8',
    fileSizeKb: 3120,
    wpOriginalUrl: 'https://www.beta.ir/form/main?id=5',
    localDownloadPath: '/api/manuals/manual_rdo',
    summary:
      'راهنمای کدهای پیامکی، سیم‌کشی رله‌های خروجی، تعریف مدیر اول و دوم، ثبت کاربران و راهنمای نصب اپلیکیشن اندروید و وب‌اپلیکیشن آیفون Smart Simote.',
    published: true,
    updatedAt: '2026-11-10T08:00:00Z',
  },
  {
    id: 'manual_safety_beams',
    label: 'راهنمای نصب و برنامه‌ریزی دستگاه حضور و غیاب، اکسس کنترل و آنتن UHF بتا',
    modelName: 'BETA 2209 / 1206TW / UHF S51-T51-Z51 / C02-S02',
    version: '3.1',
    fileSizeKb: 2890,
    wpOriginalUrl: 'https://www.beta.ir/form/main?id=13',
    localDownloadPath: '/api/manuals/manual_safety_beams',
    summary:
      'نقشه سیم‌کشی قفل‌های برقی و مگنتی، تنظیمات شبکه دستگاه‌های حضور و غیاب سری 2201 تا 2209، کارتخوان‌های اکسس کنترل 1204 تا 1226 و زاویه نصب آنتن‌های برد بلند UHF پارکینگی.',
    published: true,
    updatedAt: '2026-11-10T08:00:00Z',
  },
  {
    id: 'manual_receiver',
    label: 'راهنمای نصب دزدگیر اماکن سیم‌کارتی Z7-GSM Plus / B1 Ultimate و موتور کرکره ساید',
    modelName: 'Z7-GSM Plus / Z5-GSM / B1 Ultimate Plus / GSM Side F-CH',
    version: '2.9',
    fileSizeKb: 2150,
    wpOriginalUrl: 'https://www.beta.ir/form/main?id=5',
    localDownloadPath: '/api/manuals/manual_receiver',
    summary:
      'دفترچه راهنمای سیم‌کشی زون‌ها، چشمی‌های حرکتی، مگنت بی‌سیم، تنظیمات سیم‌کارت و اپلیکیشن موبایل Z7-GSM Multi و مرکز کنترل موتور کرکره ساید UPS بتا.',
    published: true,
    updatedAt: '2026-11-10T08:00:00Z',
  },
];

export const INITIAL_REDIRECTS: RedirectRule[] = [
  {
    id: 'red_truncated_sectional',
    oldPath: '/sectional-and-ti',
    destinationPath: '/sectional-and-tilt-door-opener-range/',
    statusCode: 301,
    notes: 'تغییر مسیر خودکار آدرس قدیمی به صفحه درب بازکن‌های اتوماتیک بتا.',
  },
  {
    id: 'red_truncated_sectional_slash',
    oldPath: '/sectional-and-ti/',
    destinationPath: '/sectional-and-tilt-door-opener-range/',
    statusCode: 301,
    notes: 'تغییر مسیر خودکار آدرس قدیمی با اسلش انتهایی.',
  },
];

function createPage(
  partial: Omit<
    CmsPageRecord,
    | 'status'
    | 'publishedRevision'
    | 'draftRevision'
    | 'updatedAt'
    | 'sections'
    | 'canonicalPath'
    | 'noindex'
    | 'highlights'
    | 'revisions'
  > & {
    canonicalPath?: string;
    noindex?: boolean;
    highlights?: string[];
    revisions?: CmsPageRecord['revisions'];
    sections?: CmsPageRecord['sections'];
  }
): CmsPageRecord {
  const resolvedSections: CmsPageRecord['sections'] = partial.sections ?? [
    {
      id: `sec_${partial.id}_overview`,
      type: 'feature_highlights',
      title: `${partial.title} — مهندسی و تولید شرکت بتا`,
      subtitle: partial.leadDescription,
      enabled: true,
      order: 1,
      motionPreset: 'editorial_reveal',
      items: (partial.highlights ?? []).map((h, i) => ({
        id: `item_${partial.id}_${i}`,
        title: h,
        description:
          'طراحی و تولید شده مطابق با استانداردهای کنترل کیفیت شرکت بتا همراه با گارانتی معتبر و پشتیبانی فنی.',
        tag: `ویژگی ۰${i + 1}`,
      })),
    },
    {
      id: `sec_${partial.id}_enquiry`,
      type: 'enquiry_section',
      title: 'مشاوره فنی و فروش سازمانی.',
      subtitle:
        'کارشناسان شرکت بتا (۰۲۱-۸۸۴۰۴۴۰۷) آماده پاسخگویی به سوالات فنی و درخواست‌های نمایندگی هستند.',
      enabled: true,
      order: 2,
      motionPreset: 'subtle_fade',
    },
  ];

  return {
    ...partial,
    canonicalPath: partial.canonicalPath ?? partial.slug,
    noindex: partial.noindex ?? false,
    highlights: partial.highlights ?? [],
    status: 'published',
    publishedRevision: 1,
    draftRevision: 1,
    updatedAt: '2026-11-16T08:00:00Z',
    sections: resolvedSections,
    revisions: partial.revisions ?? [
      {
        revision: 1,
        savedAt: '2026-11-16T08:00:00Z',
        author: 'admin@beta.ir',
        note: 'Initial Persian RTL publication',
        title: partial.title,
        leadDescription: partial.leadDescription,
        sections: resolvedSections,
      },
    ],
  };
}

export const INITIAL_PAGES: CmsPageRecord[] = [
  createPage({
    id: 'home',
    slug: '/',
    title: 'شرکت بتا (BETA.IR) — جک پارکینگی، مدار کنترل و سیستم‌های امنیتی',
    seoTitle: 'شرکت بتا (BETA.IR) | جک پارکینگی، مدار کنترل، حضور و غیاب، کرکره برقی و دزدگیر',
    seoDescription:
      'وب‌سایت رسمی شرکت بتا (تاسیس ۱۳۸۰)؛ تولیدکننده جک پارکینگی، مدار کنترل، رسیور سیم‌کارتی سیموت، دستگاه حضور و غیاب، ریموت کنترل، موتور کرکره، راهبند و دزدگیر اماکن.',
    category: 'core',
    template: 'home',
    leadDescription:
      'وقتی بتا می‌خری، خیالت راحته. سرعت در خدمات، کیفیت در محصول، نوآوری در طراحی.',
    sections: [
      {
        id: 'home_hero_16x9',
        type: 'hero_video',
        title: 'نمای ویدئویی ۱۶:۹ محصولات شرکت بتا',
        subtitle: 'نمایش تمام‌صفحه ۱۶:۹ تجهیزات اتوماسیون و الکترونیک بتا.',
        enabled: true,
        order: 1,
        motionPreset: 'hero_reveal',
      },
      {
        id: 'home_defi_bento_insights',
        type: 'defi_bento_insights',
        title: 'طراحی مهندسی. قدرت ماندگار.',
        subtitle:
          'نسل جدید اتوماسیون ورودی و سیستم‌های الکترونیکی شرکت بتا.',
        enabled: true,
        order: 2,
        motionPreset: 'stagger_cards',
      },
      {
        id: 'home_categories',
        type: 'category_grid',
        title: 'خانواده محصولات بتا.',
        subtitle:
          '۹ گروه تخصصی با بیش از ۳۰۰ محصول الکترونیکی و اتوماسیون.',
        enabled: true,
        order: 3,
        motionPreset: 'stagger_cards',
      },
      {
        id: 'home_featured_aria',
        type: 'featured_aria_121',
        title: 'سفارش آنلاین پکیج‌های بتا.',
        subtitle:
          'پکیج‌های آماده نصب با گارانتی معتبر شرکت بتا.',
        enabled: true,
        order: 4,
        motionPreset: 'fade_up',
      },
      {
        id: 'home_enquiry',
        type: 'enquiry_section',
        title: 'ارتباط با دفتر مرکزی بتا.',
        subtitle:
          'تهران، اتوبان صیاد شیرازی، خروجی مسیل باختر، پلاک ۱۲ · تلفن: ۰۲۱-۸۸۴۰۴۴۰۷',
        enabled: true,
        order: 5,
        motionPreset: 'fade_up',
      },
    ],
  }),

  createPage({
    id: 'about_us',
    slug: '/about-us/',
    title: 'درباره شرکت بتا (تاسیس ۱۳۸۰)',
    seoTitle: 'درباره شرکت بتا | بیش از دو دهه نوآوری در صنعت الکترونیک و اتوماسیون ایران',
    seoDescription:
      'آشنایی با تاریخچه شرکت بتا (بتا صنعت ایلیا)، پیام مدیرعامل مهندس ایرج مقاصدی، واحد تحقیق و توسعه، تولید و خدمات پس از فروش.',
    category: 'core',
    template: 'corporate',
    leadDescription:
      'شرکت بتا در سال ۱۳۸۰ فعالیت خود را با طراحی و تولید بردهای الکترونیکی، درب بازکن‌های اتوماتیک پارکینگی، سیستم‌های کنترل تردد، ریموت کنترل، راهبند، موتور کرکره و دزدگیر اماکن آغاز نمود.',
    highlights: [
      'بیش از ۲۴ سال سابقه مستمر در طراحی و تولید محصولات الکترونیکی و اتوماسیون در ایران (از سال ۱۳۸۰)',
      'تولید بیش از ۳۰۰ مدل محصول در ۹ خانواده تخصصی با واحد تحقیق و توسعه (R&D) مستقل',
      'شبکه گسترده نمایندگان فروش و خدمات پس از فروش در سراسر ایران به همراه شعبه بین‌المللی در ملبورن استرالیا',
      'واحد خدمات پس از فروش تخصصی با تعهد پاسخگویی ۲ الی ۷ روز کاری در دفتر مرکزی تهران',
    ],
  }),

  createPage({
    id: 'services_hub',
    slug: '/services/',
    title: 'خدمات پس از فروش و پشتیبانی فنی شرکت بتا',
    seoTitle: 'خدمات پس از فروش شرکت بتا | شرایط گارانتی، تعمیرات تخصصی برد و موتور و پشتیبانی فنی',
    seoDescription:
      'شرایط پذیرش و گارانتی محصولات شرکت بتا، تعمیر تخصصی مدار کنترل، جک پارکینگی، موتور کرکره، دزدگیر و دستگاه‌های حضور و غیاب در ۲ الی ۷ روز کاری.',
    category: 'services',
    template: 'service_hub',
    leadDescription:
      'واحد خدمات پس از فروش شرکت بتا با بهره‌گیری از مهندسان الکترونیک و تجهیزات تست پیشرفته، کلیه محصولات تولیدی بتا را در کوتاه‌ترین زمان (۲ الی ۷ روز کاری) عیب‌یابی و پشتیبانی می‌نماید.',
    highlights: [
      'پذیرش و تعمیر تخصصی کلیه بردهای کنترل، رسیورهای سیم‌کارتی، دزدگیرها و دستگاه‌های حضور و غیاب بتا',
      'سرویس و بازسازی کامل جک‌های بازویی و ریلی (MPC TITAN، F600، F-550M) و موتورهای کرکره برقی',
      'ارائه خدمات گارانتی و وارانتی در مدت زمان ۲ الی ۷ روز کاری از تاریخ تحویل به واحد خدمات',
      'پشتیبانی تلفنی نصابان و همکاران جهت تنظیمات برد، کددهی ریموت و راه‌اندازی اپلیکیشن‌های موبایل',
    ],
  }),

  createPage({
    id: 'products_hub',
    slug: '/products/',
    title: 'کاتالوگ جامع محصولات شرکت بتا (BETA.IR)',
    seoTitle: 'محصولات شرکت بتا | جک پارکینگی، مدار کنترل، حضور و غیاب، ریموت، موتور کرکره، راهبند و دزدگیر',
    seoDescription:
      'مشاهده ۹ گروه اصلی محصولات شرکت بتا شامل درب بازکن اتوماتیک، مدار کنترل، حضور و غیاب و اکسس کنترل، ریموت کنترل، موتور کرکره، راهبند، اپراتور شیشه برقی، دزدگیر اماکن و قفل برقی/UPS.',
    category: 'products_overview',
    template: 'category_hub',
    leadDescription:
      'متنوع‌ترین سبد محصولات اتوماسیون ورودی، الکترونیک، کنترل تردد و سیستم‌های حفاظتی ساخت شرکت بتا.',
    highlights: [
      'درب بازکن اتوماتیک: جک بازویی (MPC TITAN-400/600، F600، BETA-400، FAB-400، MAX-400)، ریلی (F-550M، F-500) و زیرسقفی (F390-G)',
      'مدار کنترل و رسیور: برد جک (Rock-S، ROCK، Solid، BT1)، برد کرکره (New Face، GSM-FCH) و رسیور سیم‌کارتی سیموت ۲/۴/۸ رله',
      'حضور و غیاب و اکسس کنترل: دستگاه تشخیص چهره و اثرانگشت (2201-2209)، کارتخوان (1206TW)، آنتن UHF برد بلند (S51/T51/Z51) و دستگیره دیجیتال',
      'موتور کرکره، راهبند، اپراتور شیشه برقی Target، دزدگیر اماکن سیم‌کارتی Z7-GSM Plus، ریموت کنترل و UPS',
    ],
  }),

  // 1. درب بازکن اتوماتیک و جک پارکینگی
  createPage({
    id: 'garage_door_range',
    slug: '/garage-door-range/',
    title: 'درب بازکن‌های اتوماتیک پارکینگی بتا (بازویی، ریلی و زیرسقفی)',
    seoTitle: 'درب بازکن اتوماتیک بتا | جک بازویی MPC TITAN، F600، موتور ریلی F-550M و زیرسقفی F390-G',
    seoDescription:
      'مشخصات فنی انواع جک پارکینگی بازویی، موتور ریلی و زیرسقفی سکشنال شرکت بتا به همراه متعلقات، قفل برقی و یراق‌آلات.',
    category: 'garage_doors',
    template: 'category_hub',
    leadDescription:
      'مجموعه کامل درب بازکن‌های اتوماتیک بازویی، ریلی و زیرسقفی شرکت بتا برای درب‌های پارکینگی تک‌لنگه، دولنگه و کشویی با تردد بالا.',
    highlights: [
      'جک بازویی: MPC TITAN-400، MPC TITAN-600، F600، BETA-400، BETTA FAB-400، BETTA MAX-400، بتا لاین و LIFE',
      'موتور درب ریلی: مدل‌های قدرتمند F-550M، F-500 و لایف LIFE ACER به همراه ریل فولادی گالوانیزه',
      'درب بازکن زیرسقفی و سکشنال: مدل F390-G مناسب پارکینگ‌های با ارتفاع سقف کوتاه',
      'متعلقات اصلی: قفل برقی کله‌گاوی سیزا، ترانس ۲۴ ولت F600 و پک یراق‌آلات فولادی F-600 / MPC / BSI',
    ],
    specs: [
      { label: 'مدل‌های بازویی', value: 'MPC TITAN-400 / TITAN-600 / F600 / BETA-400 / FAB-400 / MAX-400', verified: true },
      { label: 'مدل‌های ریلی', value: 'BETA F-550M / BETA F-500 / LIFE ACER', verified: true },
      { label: 'مدل زیرسقفی', value: 'BETA F390-G Overhead Sectional', verified: true },
      { label: 'درجه حفاظت محیطی', value: 'IP54 مقاوم در برابر رطوبت و گردوغبار', verified: true },
    ],
  }),
  createPage({
    id: 'insulated_sectional_doors',
    slug: '/insulated-sectional-garage-doors/',
    title: 'جک پارکینگی بازویی بتا (MPC TITAN-400 / 600 و F600)',
    seoTitle: 'جک پارکینگی بازویی بتا | مدل‌های MPC TITAN-400، TITAN-600، F600، BETA-400 و FAB-400',
    seoDescription:
      'بررسی تخصصی جک‌های بازویی پارکینگی شرکت بتا مناسب درب‌های دولنگه و تک‌لنگه تا وزن ۶۰۰ کیلوگرم در هر لنگه.',
    category: 'garage_doors',
    template: 'product_family',
    parentSlug: '/garage-door-range/',
    leadDescription:
      'جک‌های بازویی الکتروگیربکسی بتا با شفت فولادی ضدزنگ، گیربکس برنجی/فولادی کم‌صدا و مدار کنترل هوشمند دو سرعته.',
    highlights: [
      'مدل MPC TITAN-400 و TITAN-600: کورس شفت ۴۰ و ۶۰ سانتی‌متر، مناسب درب‌های عریض و سنگین',
      'مدل F600 بتا: کارکرد فوق‌العاده نرم و بی‌صدا با قابلیت پشتیبانی از برق اضطراری ۲۴ ولت',
      'مدل‌های BETA-400، BETTA FAB-400، BETTA MAX-400 و بتا لاین: اقتصادی، بادوام و مناسب مجتمع‌های مسکونی',
    ],
    specs: [
      { label: 'کورس حرکتی شفت', value: '۴۰۰ میلی‌متر (TITAN-400) و ۶۰۰ میلی‌متر (TITAN-600 / F600)', verified: true },
      { label: 'حداکثر وزن هر لنگه', value: '۴۰۰ تا ۶۰۰ کیلوگرم', verified: true },
      { label: 'سیستم خلاص‌کن', value: 'کلید خلاص‌کن اختصاصی و آلنی ایمن', verified: true },
    ],
  }),
  createPage({
    id: 'single_skin_sectional_doors',
    slug: '/single-skin-sectional-garage-doors/',
    title: 'موتور درب ریلی پارکینگی بتا (مدل F-550M و F-500)',
    seoTitle: 'موتور ریلی پارکینگی بتا | مدل F-550M، F-500 و LIFE ACER همراه با ریل فولادی',
    seoDescription:
      'موتور گیربکس درب ریلی و کشویی شرکت بتا مدل F-550M و F-500 مجهز به مدار کنترل ریلی Rock-S و میکروسوئیچ حد کورس.',
    category: 'garage_doors',
    template: 'product_family',
    parentSlug: '/garage-door-range/',
    leadDescription:
      'موتورهای درب ریلی بتا برای درب‌های کشویی پارکینگ‌ها، کارخانجات و ورودی‌های صنعتی با تردد بالا طراحی شده‌اند.',
    highlights: [
      'گیربکس صنعتی قدرتمند با چرخ‌دنده فولادی و خلاص‌کن کلیدی ضدسرقت',
      'مجهز به مرکز کنترل ریلی Rock-S بتا با تنظیم فورس، نرم‌ایست و بسته شدن خودکار',
      'ارائه به همراه ریل فولادی دنده‌شانه‌ای گالوانیزه در متراژ دلخواه',
    ],
    specs: [
      { label: 'مدل‌های موجود', value: 'BETA F-550M / BETA F-500 / LIFE ACER', verified: true },
      { label: 'مدار فرمان داخلی', value: 'مرکز کنترل ریلی Rock-S بتا', verified: true },
    ],
  }),
  createPage({
    id: 'roller_garage_doors',
    slug: '/roller-garage-doors/',
    title: 'درب بازکن زیرسقفی بتا مدل F390-G و متعلقات جک',
    seoTitle: 'درب بازکن زیرسقفی F390-G بتا و یراق‌آلات نصب | قفل برقی و ریل فولادی',
    seoDescription:
      'اپراتور درب زیرسقفی و سکشنال بتا مدل F390-G به همراه قفل برقی کله‌گاوی سیزا، ترانس ۲۴ ولت و یراق‌آلات F-600/MPC.',
    category: 'garage_doors',
    template: 'product_family',
    parentSlug: '/garage-door-range/',
    leadDescription:
      'درب بازکن زیرسقفی F390-G برای درب‌های سکشنال و زیرسقفی با حرکت ریلی سقفی و روشنایی LED خودکار.',
    highlights: [
      'موتور ۲۴ ولت DC کم‌صدا با ریل سقفی و سیستم تشخیص مانع هوشمند',
      'عرضه انواع متعلقات اورجینال شامل یراق F-600، یراق MPC، یراق BSI، قفل برقی سیزا و ترانس F600',
    ],
  }),

  // 2. مدار کنترل و رسیورهای سیم‌کارتی
  createPage({
    id: 'garage_door_opener_categories',
    slug: '/garage-door-opener-catagories/',
    title: 'مدار کنترل جک، کرکره برقی و رسیورهای سیم‌کارتی سیموت بتا',
    seoTitle: 'مدار کنترل بتا | مرکز کنترل جک Rock-S / BT1، برد کرکره برقی و رسیور سیم‌کارتی سیموت',
    seoDescription:
      'تولیدکننده انواع مرکز کنترل درب بازکن بازویی و ریلی، مدار کنترل کرکره برقی ساید و توبولار و رسیورهای سیم‌کارتی سیموت ۲، ۴ و ۸ رله.',
    category: 'garage_door_openers',
    template: 'category_hub',
    leadDescription:
      'قلب تپنده سیستم‌های اتوماسیون بتا؛ بردهای میکروپروسسوری دقیق با حفاظت نوسان برق و قابلیت کنترل با موبایل.',
    highlights: [
      'مرکز کنترل درب بازکن بازویی و ریلی: Rock-S، ROCK، Solid، BT1، Target و بردهای ۲۴ ولت DC',
      'مرکز کنترل کرکره برقی: ساید UPSدار New Face، فول کانال سیم‌کارتی GSM-FCH، ساید فول سیم‌کارتی، ۵ کانال SMD و ۹۹ کانال',
      'رسیور سیم‌کارتی سیموت (Simote): ۲ رله، اسمارت سیموت پلاس، ۴ رله صنعتی و ۸ رله صنعتی سیم‌کارتی',
      'رسیورهای رادیویی صنعتی تک‌رله تا ۸ رله و بردهای راهبند B101F / B400 / B300',
    ],
  }),
  createPage({
    id: 'sectional_and_tilt_opener_range',
    slug: '/sectional-and-tilt-door-opener-range/',
    title: 'مرکز کنترل درب بازکن بتا (سری Rock-S / ROCK / Solid / BT1) و رسیور سیموت',
    seoTitle: 'مرکز کنترل جک پارکینگی بتا مدل Rock-S، ROCK، Solid، BT1 و رسیور سیم‌کارتی سیموت',
    seoDescription:
      'مشخصات فنی مدارهای فرمان جک بازویی و ریلی شرکت بتا با نمایشگر دیجیتال، تنظیم فورس و تایم دو سرعته.',
    category: 'garage_door_openers',
    template: 'product_family',
    parentSlug: '/garage-door-opener-catagories/',
    leadDescription:
      'مدارهای کنترل سری Rock-S، ROCK، Solid و BT1 بتا با برنامه‌ریزی دیجیتال، قابلیت فست‌کلوز (بسته شدن سریع پس از عبور خودرو) و خروجی قفل برقی.',
    highlights: [
      'تنظیم مستقل زمان کارکرد و زمان نرم‌ایست (دو سرعته) برای هر بازو به صورت دیجیتال',
      'ورودی مجزا برای چشمی فتوسل بازشو و بسته‌شو + قابلیت فعال‌سازی فست‌کلوز (Fast Close)',
      'حافظه گیرنده رادیویی با ظرفیت بالا و سازگار با رسیور سیم‌کارتی Smart Simote Plus',
    ],
    specs: [
      { label: 'مدل‌های برد جک', value: 'Rock-S (ریلی) | ROCK | Solid | BT1 | Target | 24V DC', verified: true },
      { label: 'مدل‌های رسیور سیم‌کارتی', value: 'سیموت ۲ رله | اسمارت سیموت پلاس | سیموت ۴ و ۸ رله صنعتی', verified: true },
      { label: 'ولتاژ ورودی', value: '220V AC / 50Hz با فیوزهای محافظتی مجزا', verified: true },
    ],
  }),
  createPage({
    id: 'roller_door_opener_range',
    slug: '/roller-door-opener-range/',
    title: 'موتور کرکره برقی ساید و توبولار بتا + مرکز کنترل کرکره',
    seoTitle: 'موتور کرکره برقی بتا | موتور ساید 300 تا 1000 کیلوگرم UPSدار و موتور توبولار 60 تا 140 نیوتن',
    seoDescription:
      'انواع موتور کرکره برقی ساید AC و DC با UPS و موتور توبولار بتا به همراه مدار کنترل فول کانال سیم‌کارتی.',
    category: 'garage_door_openers',
    template: 'product_family',
    parentSlug: '/garage-door-opener-catagories/',
    leadDescription:
      'موتورهای کرکره برقی ساید و توبولار شرکت بتا مناسب فروشگاه‌ها، پارکینگ‌های مجتمع‌ها و سوله‌های صنعتی بزرگ.',
    highlights: [
      'موتور ساید AC بتا در ظرفیت‌های 300Kg، 600Kg و 1000Kg با سیم‌پیچ مس و گیربکس صنعتی',
      'موتور ساید DC-24V بتا در ظرفیت‌های 300Kg و 500Kg همراه با پک برق اضطراری UPS هوشمند',
      'موتور توبولار بتا در قدرت‌های 60N.m، 100N.m، 120N.m و 140N.m با خلاص‌کن دستی',
      'مرکز کنترل موتور ساید UPS بتا New Face و ساید فول سیم‌کارتی GSM Side F-CH',
    ],
    specs: [
      { label: 'موتورهای ساید AC', value: 'BETA 300Kg / 600Kg / 1000Kg', verified: true },
      { label: 'موتورهای ساید UPSدار', value: 'BETA DC-24V 300Kg / 500Kg با باتری بکاپ', verified: true },
      { label: 'موتورهای توبولار', value: '60N.m / 100N.m / 120N.m / 140N.m', verified: true },
    ],
  }),

  // 3. راهبند اتوماتیک و اپراتور شیشه برقی
  createPage({
    id: 'gate_opener_brands',
    slug: '/gate-opener-brands/',
    title: 'راهبندهای اتوماتیک پارکینگی و اپراتورهای شیشه برقی بتا',
    seoTitle: 'راهبند اتوماتیک بتا (B600 / B400 / B800) و اپراتور شیشه برقی Target و بازویی',
    seoDescription:
      'انواع راهبند بوم‌دار تلسکوپی، LEDدار و فنسی شرکت بتا به همراه اپراتورهای درب شیشه‌ای اتوماتیک ریلی و بازویی و چشمی رادار.',
    category: 'gate_openers',
    template: 'category_hub',
    leadDescription:
      'کنترل ورودی مجتمع‌ها، سازمان‌ها، عوارضی‌ها و مراکز تجاری با راهبندهای صنعتی و اپراتورهای شیشه برقی بتا.',
    highlights: [
      'راهبندهای اتوماتیک بوم‌دار: مدل‌های B600، B400 تلسکوپی، B400 با بوم LEDدار، B300، B501، B502، B601 و B800',
      'راهبند فنسی (حصاری) و راهبند تبلیغاتی به همراه دتکتور لوپ القایی تک‌حلقه و دوحلقه بتا',
      'اپراتور شیشه برقی ریلی: مدل Target، مدل Target با موتور دانکر آلمان و مدل 105 بریزی',
      'اپراتور شیشه برقی بازویی: مدل‌های 1808، 1808TT، 1902 و 1910 + رادارهای BEA، Combo، Zenix و BETA',
    ],
  }),
  createPage({
    id: 'beta_gate_opener_range',
    slug: '/beta-gate-opener-range/',
    title: 'راهبندهای اتوماتیک شرکت بتا (سری B600 / B400 / B800 و راهبند فنسی)',
    seoTitle: 'راهبند اتوماتیک بتا | راهبند بوم تلسکوپی B600، B400 LEDدار، B800 و راهبند فنسی',
    seoDescription:
      'مشخصات فنی راهبندهای تردد بالا شرکت بتا با بوم تلسکوپی ۴ تا ۶ متری، بوم LEDدار، پایه بوم و لوپ دتکتور.',
    category: 'gate_openers',
    template: 'product_family',
    parentSlug: '/gate-opener-brands/',
    leadDescription:
      'راهبندهای الکترومکانیکی بتا با سیکل تردد نامحدود، بوم آلومینیومی تلسکوپی و سازگاری کامل با آنتن‌های برد بلند UHF پارکینگی.',
    highlights: [
      'راهبند B600 و B400 با بوم تلسکوپی قابل تنظیم و نوار ضربه‌گیر ایمنی',
      'راهبند B400 با بوم LEDدار قرمز/سبز جهت دید کامل در شب و محیط‌های مسقف',
      'راهبند فنسی (حصاری) جهت انسداد کامل ارتفاعی ورودی‌های امنیتی و سازمانی',
      'سازگار با بردهای راهبند B101F / B400 / B300 و دتکتور لوپ القایی بتا',
    ],
    specs: [
      { label: 'مدل‌های راهبند بتا', value: 'B600 / B400 / B300 / B501 / B502 / B601 / B800 / فنسی', verified: true },
      { label: 'طول بوم تلسکوپی', value: '۳ تا ۶ متر (سفارشی، ساده و LEDدار)', verified: true },
      { label: 'زمان باز و بسته شدن', value: '۲ الی ۶ ثانیه (قابل تنظیم)', verified: true },
    ],
  }),
  createPage({
    id: 'life_gate_opener_range',
    slug: '/life-gate-opener-range/',
    title: 'اپراتورهای شیشه برقی ریلی و بازویی بتا (سری Target / 1808 / رادار BEA)',
    seoTitle: 'اپراتور شیشه برقی بتا | اپراتور ریلی Target، موتور دانکر، بازویی 1808 و چشمی رادار',
    seoDescription:
      'اپراتور درب اتوماتیک شیشه‌ای ریلی Target، اپراتور بازویی 1808/1902، چشمی رادار مایکروویو و کلید ۵ حالته.',
    category: 'gate_openers',
    template: 'product_family',
    parentSlug: '/gate-opener-brands/',
    leadDescription:
      'اپراتورهای درب اتوماتیک شیشه‌ای بتا برای فروشگاه‌ها، بانک‌ها، بیمارستان‌ها و مراکز تجاری پرتردد.',
    highlights: [
      'اپراتور شیشه برقی ریلی Target و نسخه Target Support Dunker Motor با کارکرد فوق‌العاده بی‌صدا',
      'اپراتورهای بازویی 1808، 1808TT، 1902 و 1910 مناسب درب‌های لولایی اداری و بیمارستانی',
      'چشمی‌ها و رادارهای دقیق: رادار BEA بلژیک، رادار کمبو (حرکتی + پرده‌ای)، Zenix و چشمی پرده‌ای ایمنی',
    ],
    specs: [
      { label: 'مدل‌های ریلی', value: 'Target Standard / Target Dunker Support / 105 Breezy', verified: true },
      { label: 'مدل‌های بازویی', value: 'BETA 1808 / 1808TT / 1902 / 1910', verified: true },
    ],
  }),

  // 4. حضور و غیاب، اکسس کنترل، UHF و دستگیره دیجیتال
  createPage({
    id: 'gate_categories',
    slug: '/gate-catagories/',
    title: 'دستگاه حضور و غیاب، اکسس کنترل، آنتن UHF و دستگیره دیجیتال بتا',
    seoTitle: 'دستگاه حضور و غیاب و اکسس کنترل بتا | تشخیص چهره 2209، کارتخوان 1206TW، آنتن UHF و دستگیره دیجیتال',
    seoDescription:
      'مجموعه کامل سیستم‌های کنترل تردد شرکت بتا شامل دستگاه حضور و غیاب تشخیص چهره و اثرانگشت، اکسس کنترل، آنتن برد بلند UHF پارکینگی و دستگیره هوشمند.',
    category: 'gates',
    template: 'category_hub',
    leadDescription:
      'مدیریت هوشمند تردد پرسنل، خودروها و آسانسورها با نسل جدید دستگاه‌های حضور و غیاب، کارتخوان‌های ضدآب و آنتن‌های UHF شرکت بتا.',
    highlights: [
      'دستگاه حضور و غیاب تشخیص چهره، اثرانگشت، کارت و رمز: مدل‌های 2209، 2208، 2207، 2201 تا 2206 و 1209 تا 1211',
      'اکسس کنترل و کارتخوان مستقل/تحت شبکه: مدل‌های 1206TW، 1204 تا 1226، کنترل دسترسی آسانسور Vorudex و برد دو درب C02/S02',
      'آنتن برد بلند UHF پارکینگی: مدل‌های S51، T51، Z51، Mini Long Range و تگ‌های برچسبی ضدسرقت خودرو',
      'دستگیره‌های دیجیتال هوشمند (مدل‌های 3301، 4401، 4402، 5501، 5502) و کلیدهای خروج لمسی و بدون تماس (No-Touch)',
    ],
  }),
  createPage({
    id: 'swing_gates',
    slug: '/swing-gates/',
    title: 'دستگاه حضور و غیاب تشخیص چهره و اثرانگشت بتا + اکسس کنترل',
    seoTitle: 'دستگاه حضور و غیاب بتا (مدل 2209 / 2208) و اکسس کنترل کارتخوان و اثرانگشتی',
    seoDescription:
      'مشخصات فنی دستگاه‌های حضور و غیاب تشخیص چهره و اثرانگشت بتا، اکسس کنترل آسانسور Vorudex و کارتخوان‌های ضدآب.',
    category: 'gates',
    template: 'product_family',
    parentSlug: '/gate-catagories/',
    leadDescription:
      'دستگاه‌های حضور و غیاب و کنترل دسترسی شرکت بتا با الگوریتم سریع تشخیص چهره و اثرانگشت، ارتباط شبکه TCP/IP، WiFi و فلش دیسک.',
    highlights: [
      'دستگاه حضور و غیاب تشخیص چهره، اثرانگشت، کارت و رمز مدل 2209 و 2208 با منوی فارسی و سخنگو',
      'اکسس کنترل‌های ضدآب فلزی و لمسی مدل 1206TW، 1208، 1214، 1222 و 1226 مناسب فضای بیرونی',
      'مرکز کنترل دسترسی دو درب تحت شبکه C02 و S02 + سیستم کنترل دسترسی طبقات آسانسور Vorudex',
    ],
    specs: [
      { label: 'مدل‌های حضور و غیاب', value: 'BETA 2209 / 2208 / 2207 / 2201–2206 / 1209–1211', verified: true },
      { label: 'مدل‌های اکسس کنترل', value: '1206TW / 1204–1226 / Vorudex / WiGate / C02 & S02', verified: true },
    ],
  }),
  createPage({
    id: 'sliding_gates',
    slug: '/sliding-gates/',
    title: 'آنتن برد بلند UHF پارکینگی (S51 / T51 / Z51) و دستگیره دیجیتال بتا',
    seoTitle: 'آنتن برد بلند UHF بتا (مدل S51، T51، Z51) و دستگیره دیجیتال هوشمند',
    seoDescription:
      'سیستم کنترل تردد خودرویی برد بلند UHF پارکینگی بتا به همراه تگ شیشه‌ای خودرو و دستگیره‌های دیجیتال 3301 تا 5502.',
    category: 'gates',
    template: 'product_family',
    parentSlug: '/gate-catagories/',
    leadDescription:
      'باز شدن خودکار درب پارکینگ و راهبند بدون نیاز به فشردن ریموت با آنتن‌های برد بلند UHF بتا.',
    highlights: [
      'آنتن‌های برد بلند UHF پارکینگی در مدل‌های S51، T51، Z51، Mini Long Range و مدل LEDدار با برد قرائت تا ۱۲ متر',
      'انواع کارت و تگ برچسبی UHF پشت شیشه و چراغ خودرو با رمزنگاری امنیتی',
      'دستگیره‌های دیجیتال هوشمند 3301، 4401، 4402، 5501 و 5502 (اثرانگشت، کارت، رمز و کلید مکانیکی)',
    ],
  }),

  // 5. ریموت کنترل و سیستم‌های امنیتی / دزدگیر اماکن
  createPage({
    id: 'accessories',
    slug: '/accessories/',
    title: 'ریموت کنترل‌های بتا و سیستم‌های امنیتی / دزدگیر اماکن (Z7-GSM)',
    seoTitle: 'ریموت کنترل بتا (لرنینگ، هاپینگ، بلوتوثی) و دزدگیر اماکن سیم‌کارتی Z7-GSM Plus',
    seoDescription:
      'کاتالوگ کامل ریموت کنترل‌های کد لرنینگ، هاپینگ و بلوتوثی بتا به همراه دزدگیر اماکن سیم‌کارتی Z7-GSM Plus، چشمی حرکتی و مگنت بی‌سیم.',
    category: 'accessories',
    template: 'product_family',
    leadDescription:
      'تولید بیش از ۲۵ مدل ریموت کنترل صنعتی و خودرویی به همراه نسل جدید دزدگیرهای اماکن سیم‌کارتی شرکت بتا.',
    highlights: [
      'ریموت لرنینگ کد بتا: مدل‌های 2018، 2006، 2007، 2013، 2014، 2016، 2017، 2024، 207، MPC و برد بلند آنتن‌دار',
      'ریموت هاپینگ و رولینگ کد ضدکپی: مدل‌های 2011، Go-mini، Life و ریموت دیجیتالی ۹۹ کانال',
      'ریموت بلوتوثی و خودرویی: مدل‌های 2025، طرح آزرا (AZERA)، ریموت نور بالا ماشین و I-KEY',
      'دزدگیر اماکن و تلفن‌کننده: مدل‌های Z7-GSM Plus، Z5-GSM، Z7-Line، B1 Ultimate Plus، B1 ECO و چشمی‌های G9/G15/G20',
    ],
    specs: [
      { label: 'فرکانس کاری ریموت‌ها', value: '433.92 MHz / 315 MHz (کد لرنینگ، هاپینگ و بلوتوثی)', verified: true },
      { label: 'مدل‌های دزدگیر اماکن', value: 'Z7-GSM Plus / Z5-GSM / Z7-Line / B1 Ultimate Plus / B1 ECO / Quad', verified: true },
      { label: 'چشمی‌ها و سنسورها', value: 'G9 / G15 / G20 / Bravo2 / GL-10 / Pro476 / مگنت بی‌سیم GAP G3', verified: true },
    ],
  }),

  // 6. آرام‌بند، قفل برقی، UPS و متعلقات
  createPage({
    id: 'hardware',
    slug: '/hardware/',
    title: 'برق اضطراری UPS، قفل برقی و مگنتی، فلاشر و چشمی فتوسل بتا',
    seoTitle: 'UPS بتا، قفل برقی و الکترومغناطیسی، جاقفلی برقی، فلاشر تابان و فتوسل',
    seoDescription:
      'انواع دستگاه برق اضطراری UPS جک و کرکره (۱۲ و ۲۴ ولت)، قفل الکترومغناطیسی ۲۸۰ کیلویی، قفل الکترومکانیکی، جاقفلی برقی، فلاشر و فتوسل بتا.',
    category: 'hardware',
    template: 'product_family',
    leadDescription:
      'تجهیزات مکمل ایمنی، قفل‌های برقی و سیستم‌های تامین برق اضطراری (UPS) شرکت بتا برای انواع درب‌های اتوماتیک.',
    highlights: [
      'دستگاه برق اضطراری UPS بتا در مدل‌های ۱۲ ولت و ۲۴ ولت مخصوص جک پارکینگی، اپراتور شیشه‌ای و کرکره برقی',
      'قفل الکترومغناطیسی (مگنت) ۲۸۰ کیلوگرم به همراه براکت Z&L و U شکل + قفل EL-150 و قفل شیشه میرال',
      'قفل الکترومکانیکی ۵ سیم، جاقفلی برقی (مقابل برقی) بتا و قفل برقی کله‌گاوی سیزا',
      'فلاشرهای LED تابان و اسلیم بتا، چشمی فتوسل مادون قرمز و منبع تغذیه سوئیچینگ ۱۲ ولت',
    ],
    specs: [
      { label: 'مدل‌های UPS بتا', value: 'UPS 12V / UPS 24V / UPS موتور ساید کرکره', verified: true },
      { label: 'قفل‌های برقی و مگنتی', value: 'مگنت 280Kg / قفل EL-150 / قفل ۵ سیم / مقابل برقی بتا', verified: true },
    ],
  }),

  // Support, Manuals, Apps & Calculators
  createPage({
    id: 'manuals_hub',
    slug: '/beta-doors-manuals/',
    title: 'دانلود اپلیکیشن‌های موبایل، کاتالوگ‌ها و نقشه‌های سیم‌کشی بردهای بتا',
    seoTitle: 'دانلود اپلیکیشن بتا (Smart Simote / Z7-GSM) و کاتالوگ راهنمای نصب بردها و جک‌های بتا',
    seoDescription:
      'مرکز دانلود رسمی شرکت بتا (beta.ir)؛ دریافت مستقیم اپلیکیشن‌های اندروید و وب‌اپ آیفون (Smart Simote، Z7-GSM، B1 Ultimate) و دفترچه راهنمای نصب بردها.',
    category: 'support',
    template: 'manuals_hub',
    leadDescription:
      'دریافت مستقیم نرم‌افزارهای موبایل (اندروید و iOS)، دفترچه‌های راهنمای نصب و نقشه‌های سیم‌کشی تخصصی محصولات شرکت بتا.',
  }),
  createPage({
    id: 'beta_smart_support',
    slug: '/beta-smart-support/',
    title: 'بانک سوالات متداول فنی (FAQ) و راهنمای برنامه‌ریزی محصولات بتا',
    seoTitle: 'سوالات متداول فنی شرکت بتا (beta.ir/faq) | آموزش ست کردن ریموت، تنظیم برد جک و دزدگیر',
    seoDescription:
      'پاسخ رسمی به سوالات متداول فنی درباره جک پارکینگی، مدار کنترل، موتور کرکره، دزدگیر اماکن Z7-GSM، رسیور سیم‌کارتی سیموت و دستگاه حضور و غیاب بتا.',
    category: 'support',
    template: 'support_form',
    leadDescription:
      'راهنمای گام‌به‌گام عیب‌یابی، نحوه کددهی و پاک کردن حافظه ریموت‌ها، تنظیم فورس و تایم بردهای کنترل و رفع خطاهای رایج.',
  }),
  createPage({
    id: 'warranty_registration',
    slug: '/warranty-registration/',
    title: 'ثبت گارانتی محصولات شرکت بتا',
    seoTitle: 'ثبت گارانتی و شماره سریال محصولات شرکت بتا | واحد خدمات پس از فروش',
    seoDescription:
      'ثبت آنلاین شماره سریال، کد نمایندگی و تاریخ نصب محصولات شرکت بتا جهت بهره‌مندی از خدمات گارانتی.',
    category: 'support',
    template: 'support_form',
    leadDescription:
      'مشخصات شماره سریال دستگاه، کد نماینده یا نصاب و تاریخ نصب محصول بتا را جهت ثبت در سامانه خدمات پس از فروش وارد نمایید.',
  }),
  createPage({
    id: 'register_to_service',
    slug: '/register-to-service/',
    title: 'فرم پذیرش تعمیر و خدمات پس از فروش شرکت بتا',
    seoTitle: 'ثبت درخواست تعمیر و خدمات پس از فروش شرکت بتا | ارسال مدارک و شرح ایراد دستگاه',
    seoDescription:
      'ثبت آنلاین درخواست تعمیر و سرویس محصولات شرکت بتا به همراه بارگذاری تصویر فاکتور یا کارت گارانتی (حداکثر ۱۰ مگابایت).',
    category: 'support',
    template: 'support_form',
    leadDescription:
      'مطابق ضوابط واحد خدمات پس از فروش شرکت بتا، فقط محصولات بتا پذیرش می‌شوند و مدت زمان ارائه خدمات در واحد گارانتی ۲ الی ۷ روز کاری می‌باشد.',
  }),
  createPage({
    id: 'spring_estimator',
    slug: '/garage-door-spring-estimator/',
    title: 'محاسبه‌گر هوشمند انتخاب جک پارکینگی و موتور کرکره بتا',
    seoTitle: 'محاسبه‌گر انتخاب جک پارکینگی و موتور کرکره برقی بتا بر اساس ابعاد و وزن درب',
    seoDescription:
      'ابزار مهندسی محاسبه و پیشنهاد مدل مناسب جک بازویی، موتور ریلی یا موتور کرکره ساید/توبولار بتا بر اساس عرض، ارتفاع، وزن و میزان تردد روزانه درب.',
    category: 'support',
    template: 'calculator',
    leadDescription:
      'ابعاد، وزن تقریبی و تعداد تردد روزانه درب را وارد کنید تا مدل دقیق جک پارکینگی یا موتور کرکره بتا محاسبه و به فرم استعلام پیوست شود.',
  }),
  createPage({
    id: 'contact_us',
    slug: '/contact-us/',
    title: 'تماس با شرکت بتا — دفتر مرکزی تهران و شعبه استرالیا',
    seoTitle: 'تماس با شرکت بتا (beta.ir) | آدرس دفتر مرکزی تهران، تلفن‌های فروش و خدمات پس از فروش',
    seoDescription:
      'آدرس دفتر مرکزی شرکت بتا: تهران، اتوبان صیاد شیرازی، خروجی مسیل باختر، پلاک ۱۲ | تلفن: ۰۲۱-۸۸۴۰۴۴۰۷ الی ۴۰۹ | ایمیل: info@beta.ir.',
    category: 'core',
    template: 'contact',
    leadDescription:
      'کارشناسان واحد فروش، امور نمایندگان و خدمات پس از فروش شرکت بتا شنبه تا چهارشنبه از ساعت ۸:۰۰ الی ۱۷:۳۰ آماده پاسخگویی هستند.',
  }),

  // Commerce routes
  createPage({
    id: 'shop_hub',
    slug: '/shop/',
    title: 'فروشگاه آنلاین محصولات شرکت بتا',
    seoTitle: 'فروشگاه آنلاین بتا | خرید پک جک پارکینگی، موتور کرکره ساید، دزدگیر Z7-GSM، سیموت و ریموت',
    seoDescription:
      'بررسی مشخصات و ثبت سفارش آنلاین پکیج‌های جک پارکینگی، موتور کرکره ساید UPSدار، دزدگیر اماکن سیم‌کارتی Z7-GSM Plus، رسیور سیموت و ریموت‌های اصلی بتا.',
    category: 'commerce',
    template: 'commerce',
    leadDescription:
      'مشاهده قیمت و مشخصات فنی ۵ پکیج اصلی و پرمصرف شرکت بتا همراه با ارسال به سراسر کشور و گارانتی معتبر.',
  }),
  createPage({
    id: 'shop_category_uncategorized',
    slug: '/product-category/uncategorized/',
    title: 'آرشیو محصولات فروشگاهی بتا',
    seoTitle: 'لیست محصولات فروشگاهی شرکت بتا',
    seoDescription: 'مشاهده کلیه اقلام قابل سفارش در فروشگاه آنلاین شرکت بتا.',
    category: 'commerce',
    template: 'commerce',
    leadDescription: 'نمایش کلیه پکیج‌ها و تجهیزات اتوماسیون موجود در فروشگاه آنلاین بتا.',
  }),
  createPage({
    id: 'cart_page',
    slug: '/cart/',
    title: 'سبد خرید',
    seoTitle: 'سبد خرید | فروشگاه آنلاین شرکت بتا',
    seoDescription: 'بررسی اقلام انتخابی و ادامه فرآیند ثبت سفارش در فروشگاه شرکت بتا.',
    category: 'commerce',
    template: 'commerce',
    leadDescription: 'اقلام انتخاب‌شده در سبد خرید خود را بررسی و جهت تکمیل سفارش اقدام نمایید.',
  }),
  createPage({
    id: 'checkout_page',
    slug: '/checkout/',
    title: 'تکمیل اطلاعات و ثبت نهایی سفارش',
    seoTitle: 'ثبت نهایی سفارش | فروشگاه آنلاین شرکت بتا',
    seoDescription: 'ثبت مشخصات تحویل‌گیرنده و آدرس ارسال جهت صدور پیش‌فاکتور و ثبت سفارش محصولات بتا.',
    category: 'commerce',
    template: 'commerce',
    leadDescription: 'اطلاعات تماس و آدرس دقیق ارسال سفارش را وارد نمایید.',
  }),
  createPage({
    id: 'my_account_page',
    slug: '/my-account/',
    title: 'حساب کاربری مشتریان و نمایندگان',
    seoTitle: 'حساب کاربری و پیگیری سفارشات | شرکت بتا',
    seoDescription: 'مشاهده سوابق سفارشات، وضعیت گارانتی و درخواست‌های خدمات پس از فروش در پرتال مشتریان بتا.',
    category: 'commerce',
    template: 'commerce',
    leadDescription: 'پیگیری سفارشات ثبت‌شده، وضعیت گارانتی محصولات و سوابق خدمات پس از فروش.',
  }),
  createPage({
    id: 'privacy_policy_page',
    slug: '/privacy-policy/',
    title: 'حریم خصوصی و قوانین استفاده از وب‌سایت شرکت بتا',
    seoTitle: 'حریم خصوصی و قوانین | شرکت بتا (BETA.IR)',
    seoDescription: 'سیاست حفظ حریم خصوصی اطلاعات مشتریان، نمایندگان و کاربران وب‌سایت رسمی شرکت بتا.',
    category: 'legal',
    template: 'legal',
    leadDescription: 'اصول حفاظت از اطلاعات مشتریان، فرم‌های ثبت گارانتی و سفارشات آنلاین در شرکت بتا.',
  }),

  // 11 Regional & Specialist Service Corridors (localized for Iran / Tehran & Provincial Hubs while preserving URL slugs)
  ...[
    {
      slug: '/garage-doors-broadmeadows/',
      suburb: 'تهران (دفتر مرکزی مسیل باختر)',
      postcode: '16319-35711',
      region: 'مرکز فروش و خدمات پس از فروش تهران',
      serviceType: 'نصب، گارانتی و تعمیرات تخصصی محصولات بتا در تهران',
    },
    {
      slug: '/garage-doors-bundoora/',
      suburb: 'شمال و شرق تهران (رسالت، پاسداران، شمیرانات)',
      postcode: '16319',
      region: 'پوشش خدمات شمال و شرق تهران',
      serviceType: 'سرویس جک پارکینگی، اپراتور شیشه‌ای و راهبند بتا',
    },
    {
      slug: '/garage-doors-Craigieburn/',
      suburb: 'غرب تهران و کرج (استان البرز)',
      postcode: '31497',
      region: 'نمایندگی و خدمات غرب تهران و البرز',
      serviceType: 'پخش و پشتیبانی جک بازویی، موتور کرکره و دزدگیر بتا',
    },
    {
      slug: '/garage-doors-epping/',
      suburb: 'شهرک‌های صنعتی تهران (جاده مخصوص، خاوران، شمس‌آباد)',
      postcode: '13878',
      region: 'واحد پروژه‌های صنعتی و سازمانی',
      serviceType: 'موتور کرکره ساید صنعتی، راهبند و آنتن UHF پارکینگی',
    },
    {
      slug: '/garage-doors-essendon/',
      suburb: 'اصفهان و منطقه مرکزی ایران',
      postcode: '81465',
      region: 'شبکه نمایندگان استان اصفهان',
      serviceType: 'فروش و خدمات محصولات اتوماسیون و کنترل تردد بتا',
    },
    {
      slug: '/garage-doors-mickleham/',
      suburb: 'مشهد و خراسان رضوی',
      postcode: '91375',
      region: 'شبکه نمایندگان شمال شرق کشور',
      serviceType: 'پخش عمده ریموت، مدار کنترل، جک و سیستم‌های امنیتی بتا',
    },
    {
      slug: '/garage-doors-pascoe-vale/',
      suburb: 'تبریز و شمال غرب کشور',
      postcode: '51368',
      region: 'شبکه نمایندگان آذربایجان شرقی و غربی',
      serviceType: 'تامین درب بازکن اتوماتیک، موتور کرکره و راهبند بتا',
    },
    {
      slug: '/garage-doors-preston/',
      suburb: 'شیراز و استان فارس',
      postcode: '71345',
      region: 'شبکه نمایندگان جنوب کشور',
      serviceType: 'فروش و پشتیبانی سیستم‌های حضور و غیاب، جک و دزدگیر بتا',
    },
    {
      slug: '/garage-doors-reservoir/',
      suburb: 'مازندران و گیلان (شمال کشور)',
      postcode: '48161',
      region: 'شبکه نمایندگان استان‌های شمالی',
      serviceType: 'جک‌های پارکینگی ضدآب IP54، دزدگیر سیم‌کارتی و سیموت بتا',
    },
    {
      slug: '/garage-doors-thomastown/',
      suburb: 'اهواز و استان خوزستان',
      postcode: '61335',
      region: 'شبکه نمایندگان جنوب غرب کشور',
      serviceType: 'موتورهای صنعتی گرمسیری، راهبند و مدارهای کنترل بتا',
    },
    {
      slug: '/commercial-shutter-repairs-melbourne/',
      suburb: 'شعبه بین‌المللی استرالیا (ملبورن - Campbellfield VIC)',
      postcode: '3061',
      region: 'BETA DOORS Australia Branch',
      serviceType: 'شعبه رسمی شرکت بتا در ملبورن استرالیا (5/1730 Hume Hwy)',
    },
  ].map((loc, idx) =>
    createPage({
      id: `local_${idx + 1}`,
      slug: loc.slug,
      title: `${loc.serviceType} — ${loc.suburb}`,
      seoTitle: `${loc.serviceType} در ${loc.suburb} | شرکت بتا (BETA.IR)`,
      seoDescription: `نمایندگی فروش، مشاوره فنی و خدمات پس از فروش محصولات شرکت بتا در ${loc.suburb}. تلفن دفتر مرکزی: ۰۲۱-۸۸۴۰۴۴۰۷ الی ۴۰۹.`,
      category: 'local_services',
      template: 'local_service',
      leadDescription: `ارائه کلیه محصولات شرکت بتا شامل جک پارکینگی، مدار کنترل، رسیور سیم‌کارتی سیموت، حضور و غیاب، موتور کرکره، راهبند و دزدگیر اماکن در ${loc.suburb} (${loc.region}).`,
      location: {
        name: loc.suburb,
        postcode: loc.postcode,
      },
      serviceType: loc.serviceType,
      highlights: [
        `تامین مستقیم محصولات اصلی شرکت بتا در ${loc.suburb} با گارانتی معتبر شرکتی`,
        'پشتیبانی فنی نصابان و همکاران جهت راه‌اندازی مدارهای کنترل، آنتن UHF و دستگاه‌های حضور و غیاب',
        'ارسال سریع قطعات یدکی، بردهای الکترونیکی، ریموت کنترل و موتورهای کرکره برقی',
      ],
    })
  ),
];

export const INITIAL_ENQUIRIES: EnquirySubmission[] = [
  {
    id: 'enq_seed_101',
    referenceCode: 'BETA-ENQ-1001',
    createdAt: '2026-11-14T22:15:00Z',
    name: 'مهندس محمدی',
    suburb: 'تهران - سعادت‌آباد',
    company: 'مجتمع مسکونی پارسیان',
    email: 'mohammadi@example.ir',
    phone: '09121234567',
    serviceType: 'Motor Replacement',
    message:
      'درخواست استعلام قیمت جک بازویی F600 بتا به همراه آنتن برد بلند UHF مدل S51 برای درب ورودی مجتمع ۴۰ واحدی.',
    sourcePagePath: '/garage-door-range/',
    status: 'triaged',
    assignedTo: 'support@beta.ir',
    internalNotes: ['لیست قیمت و کاتالوگ فنی ارسال شد.'],
  },
];

export const INITIAL_WARRANTIES: WarrantySubmission[] = [
  {
    id: 'war_seed_201',
    referenceCode: 'BETA-WAR-2001',
    createdAt: '2026-11-13T04:10:00Z',
    serialNumber: 'BETA-TITAN400-99412',
    dealerCode: 'TEH-DEALER-08',
    installationDate: '12/11/2026',
    firstName: 'علی',
    lastName: 'کریمی',
    email: 'karimi@example.ir',
    phone: '09123456789',
    street: 'خیابان شریعتی، بالاتر از سیدخندان، پلاک ۴۴',
    addressLine2: '',
    suburb: 'تهران',
    state: 'تهران',
    postcode: '1631935711',
    country: 'Iran',
    status: 'registered',
    assignedTo: 'support@beta.ir',
    internalNotes: ['شماره سریال جک MPC TITAN-400 و کد نمایندگی تایید شد.'],
  },
];

export const INITIAL_SERVICE_REGISTRATIONS: ServiceRegistrationSubmission[] = [
  {
    id: 'srv_seed_301',
    referenceCode: 'BETA-SRV-3001',
    createdAt: '2026-11-12T06:45:00Z',
    serialNumber: 'BETA-Z7GSM-88301',
    installationDate: '15/06/2025',
    firstName: 'رضا',
    lastName: 'احمدی',
    email: 'ahmadi@example.ir',
    phone: '09129876543',
    street: 'اتوبان صیاد شیرازی، خروجی مسیل باختر',
    addressLine2: '',
    suburb: 'تهران',
    state: 'تهران',
    postcode: '1631935711',
    country: 'Iran',
    proofAttachment: {
      id: 'proof_seed_01',
      fileName: 'factor-kharid-beta.pdf',
      mimeType: 'application/pdf',
      sizeBytes: 348160,
      uploadedAt: '2026-11-12T06:45:00Z',
      privateStorageKey: 'private_quarantine/proof_seed_01_factor-kharid-beta.pdf',
    },
    status: 'scheduled',
    assignedTo: 'support@beta.ir',
    internalNotes: ['درخواست سرویس در واحد گارانتی ثبت شد (مدت زمان بررسی ۲ الی ۷ روز کاری).'],
  },
];

export const INITIAL_ORDERS: OrderRecord[] = [
  {
    id: 'ord_seed_401',
    orderNumber: 'BETA-ORD-9001',
    confirmationToken: 'tok_beta_order_9001_verified',
    createdAt: '2026-11-14T01:20:00Z',
    customerId: 'cust_demo_01',
    customerName: 'حسین رضوی',
    customerEmail: 'razavi@example.ir',
    customerPhone: '09121112233',
    shippingAddress: {
      street: 'خیابان ولیعصر، بالاتر از میدان ونک، پلاک ۸۸',
      suburb: 'تهران',
      state: 'تهران',
      postcode: '19697',
    },
    items: [
      {
        productId: 'shop_motor_pack',
        productSlug: 'motor-pack',
        name: 'پک کامل جک پارکینگی بازویی و ریلی بتا (سری MPC TITAN / F600 / F550)',
        variantLabel: '1200N',
        sku: 'BETA-F600-PRO',
        unitPriceCents: 69000,
        quantity: 1,
      },
    ],
    subtotalCents: 69000,
    shippingCents: 0,
    gstIncludedCents: 6273,
    totalCents: 69000,
    paymentStatus: 'paid_sandbox',
    fulfilmentStatus: 'processing',
    idempotencyKey: 'idem_seed_9001',
  },
];

export const INITIAL_AUDIT_LOG: AuditLogEntry[] = [
  {
    id: 'aud_01',
    timestamp: '2026-11-16T08:00:00Z',
    actorEmail: 'admin@beta.ir',
    actorRole: 'administrator',
    action: 'SYSTEM_BOOTSTRAP_IRAN_FA',
    entityType: 'brand_settings',
    entityId: 'global',
    summary:
      'راه‌اندازی نسخه فارسی وب‌سایت رسمی شرکت بتا (BETA.IR) با کاتالوگ کامل محصولات، اپلیکیشن‌ها و خدمات پس از فروش.',
  },
];
