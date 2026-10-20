import { Plus_Jakarta_Sans, Noto_Sans_Devanagari } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppFloat from '@/components/layout/WhatsAppFloat';
import MotionProvider from '@/components/layout/MotionProvider';
import { COMPANY } from '@/lib/constants';
import { generateStructuredData } from '@/lib/utils';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '600', '700'],
  variable: '--font-hindi',
  display: 'swap',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://jangid-tuff-glasses-pvt-ltd.vercel.app';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `Toughened Glass & Architectural Glazing Manufacturer in Jodhpur | ${COMPANY.nameShort}`,
    template: `%s | ${COMPANY.nameShort}`,
  },
  description:
    'Jangid Tuff Glasses Private Limited: Leading manufacturer of toughened glass, slim partitions, LED vanity mirrors, shower cubicles, and architectural glass hardware in Jodhpur, Rajasthan.',
  keywords: [
    'glass manufacturer Jodhpur',
    'toughened glass Jodhpur',
    'LED mirrors Jodhpur',
    'glass partitions Rajasthan',
    'architectural glass',
    'shower enclosure Jodhpur',
    'Boranada glass',
    'safety glass Rajasthan',
  ],
  authors: [{ name: COMPANY.name }],
  creator: COMPANY.name,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    title: `${COMPANY.name} | Premium Glass Solutions`,
    description: COMPANY.description,
    siteName: COMPANY.nameShort,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=85',
        width: 1200,
        height: 630,
        alt: `${COMPANY.name} - Architectural Glass Solutions`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: COMPANY.name,
    description: COMPANY.description,
    images: ['https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=85'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo.jpg',
    shortcut: '/logo.jpg',
    apple: '/logo.jpg',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({ children }) {
  const jsonLd = generateStructuredData(SITE_URL);

  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${plusJakartaSans.variable} ${notoSansDevanagari.variable} h-full`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              id="google-analytics"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: window.location.pathname,
                    anonymize_ip: true,
                    allow_google_signals: false,
                    allow_ad_personalization_signals: false
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col font-sans text-[#132b45] bg-white antialiased selection:bg-[#0878d1] selection:text-white"
      >
        <a href="#main-content" className="sr-only focus:not-sr-only">
          <span className="fixed top-3 left-3 z-[100] rounded-full bg-[#08233f] px-5 py-3 text-sm font-bold text-white shadow-xl">
            Skip to main content
          </span>
        </a>
        <MotionProvider>
          <Header />
          <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <Footer />
          <WhatsAppFloat />
        </MotionProvider>
      </body>
    </html>
  );
}
