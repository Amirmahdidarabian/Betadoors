import type { Metadata } from 'next';
import {
  Plus_Jakarta_Sans,
  DM_Sans,
  JetBrains_Mono,
} from 'next/font/google';
import './globals.css';
import { BetaDoorsProvider } from '@/components/providers/BetaDoorsProvider';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-body',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'BETA DOORS — Garage Doors, Gate Automation & CMS',
  description:
    'Australian garage doors, roller and sectional door openers, gate automation, local Melbourne repairs, online shop, and persistent staff CMS workspace.',
  openGraph: {
    title: 'BETA DOORS — Garage Doors, Gate Automation & CMS',
    description:
      'Australian garage doors, roller and sectional door openers, gate automation, local Melbourne repairs, online shop, and persistent staff CMS workspace.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BETA DOORS — Garage Doors, Gate Automation & CMS',
    description:
      'Australian garage doors, roller and sectional door openers, gate automation, local Melbourne repairs, online shop, and persistent staff CMS workspace.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-AU"
      className={`dark ${plusJakarta.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body
        suppressHydrationWarning
        style={{ fontFamily: 'var(--font-body), sans-serif' }}
        className="bg-[#08090C] text-slate-100 antialiased"
      >
        <BetaDoorsProvider>{children}</BetaDoorsProvider>
      </body>
    </html>
  );
}
