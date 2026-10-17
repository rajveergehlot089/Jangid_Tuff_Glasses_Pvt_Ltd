import { Plus_Jakarta_Sans, Noto_Sans_Devanagari } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppFloat from '@/components/layout/WhatsAppFloat';
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

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://jangidtuffglasses.in'),
  title: {
    default: `${COMPANY.name} | Architectural Glass, Mirrors & Partitions in Jodhpur`,
    template: `%s | ${COMPANY.nameShort}`,
  },
  description: COMPANY.description,
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
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://jangidtuffglasses.in',
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
  const jsonLd = generateStructuredData();

  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${notoSansDevanagari.variable} h-full scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans text-[#132b45] bg-white antialiased selection:bg-[#0878d1] selection:text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
