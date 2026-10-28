import type { Metadata, Viewport } from 'next';
import { Archivo, JetBrains_Mono, Manrope } from 'next/font/google';
import { businessHours, businessInfo, siteUrl } from '@/data/janakaData';
import './globals.css';

const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#071522',
};

const description =
  'Automotive air-conditioning specialists in Gampaha, Sri Lanka. A/C diagnosis, gas recharge, leak detection, compressor and condenser repairs. Open Tuesday to Sunday.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Janaka Auto AC – Car A/C Specialists | Gampaha, Sri Lanka',
  description,
  keywords: [
    'Janaka Auto AC',
    'Car AC Repair Gampaha',
    'Auto Air Conditioning Sri Lanka',
    'Car AC Gas Refill Miriswatta',
    'Car AC Compressor Repair',
    'Automotive Climate Control Gampaha',
  ],
  authors: [{ name: businessInfo.name }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: businessInfo.name,
    title: 'Janaka Auto AC – Precision Cooling. Exceptional Comfort.',
    description,
    locale: 'en_LK',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Janaka Auto AC – Keep cool. Drive comfortable.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Janaka Auto AC – Car A/C Specialists in Gampaha',
    description,
    images: ['/og.jpg'],
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'AutoRepair',
  name: businessInfo.name,
  url: siteUrl,
  image: `${siteUrl}/og.jpg`,
  logo: `${siteUrl}/brand/logo-wide.webp`,
  telephone: businessInfo.phoneRaw,
  email: businessInfo.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: businessInfo.streetAddress,
    addressLocality: businessInfo.locality,
    addressCountry: businessInfo.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: businessInfo.geo.lat,
    longitude: businessInfo.geo.lng,
  },
  hasMap: businessInfo.googleMapsPlaceUrl,
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: businessHours.opens,
      closes: businessHours.closes,
    },
  ],
  sameAs: [businessInfo.facebookUrl],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${manrope.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
