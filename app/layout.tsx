import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import './globals.css';
import { BetaDoorsProvider } from '@/components/providers/BetaDoorsProvider';

const vazirmatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  variable: '--font-vazirmatn',
  display: 'swap',
});

export const metadata: Metadata = {
  title:
    'شرکت بتا (BETA.IR) | تولیدکننده درب بازکن اتوماتیک، مدار کنترل، حضور و غیاب، موتور کرکره، راهبند و سیستم‌های امنیتی',
  description:
    'وب‌سایت رسمی شرکت بتا (بتا صنعت ایلیا - تاسیس ۱۳۸۰)؛ طراح و تولیدکننده جک پارکینگی بازویی و ریلی، مدار کنترل، رسیور سیم‌کارتی سیموت، دستگاه حضور و غیاب و اکسس کنترل، ریموت کنترل، موتور کرکره، راهبند، اپراتور شیشه برقی و دزدگیر اماکن Z7-GSM. دفتر مرکزی: تهران، اتوبان صیاد شیرازی، خروجی مسیل باختر، پلاک ۱۲ | تلفن: ۰۲۱-۸۸۴۰۴۴۰۷ الی ۴۰۹.',
  openGraph: {
    title:
      'شرکت بتا (BETA.IR) | درب بازکن اتوماتیک، مدار کنترل، حضور و غیاب و سیستم‌های امنیتی',
    description:
      'وقتی بتا می‌خری خیالت راحته، چون برند می‌خری... سرعت در خدمات، کیفیت در محصول، نوآوری در طراحی. مشاهده کاتالوگ کامل محصولات بتا، دانلود اپلیکیشن‌ها و نقشه‌های برد و ثبت گارانتی.',
    type: 'website',
    locale: 'fa_IR',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fa"
      dir="rtl"
      data-font="iransans"
      suppressHydrationWarning
      className={vazirmatn.variable}
    >
      <body className="min-h-screen antialiased selection:bg-[#EC008C] selection:text-white">
        <BetaDoorsProvider>{children}</BetaDoorsProvider>
      </body>
    </html>
  );
}
