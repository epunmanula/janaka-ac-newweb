import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
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

const metaDescription =
  'Top-rated Car AC Garage in Gampaha, Sri Lanka. Specialized automotive air conditioning repairs, genuine R134a/R1234yf gas recharging, nitrogen leak testing, compressor overhauls & climate diagnostics at Miriswatta. 15+ years experience.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Car AC Garage in Gampaha | Janaka Auto AC Sri Lanka',
    template: '%s | Janaka Auto AC Gampaha',
  },
  description: metaDescription,
  keywords: [
    'AC Garage Gampaha',
    'Gampaha AC',
    'Gampaha Garage AC',
    'Car AC Repair Gampaha',
    'Car AC Service Gampaha',
    'Car AC Gas Refill Gampaha',
    'Auto AC Gampaha',
    'Vehicle AC Repair Gampaha',
    'Best AC Garage in Sri Lanka',
    'Car AC Repair Sri Lanka',
    'Car AC Gas Refill Sri Lanka',
    'Car AC Compressor Repair Sri Lanka',
    'Janaka Auto AC',
    'Miriswatta Gampaha AC garage',
    'වාහන AC රෙපයාර් ගම්පහ',
  ],
  authors: [{ name: businessInfo.name, url: siteUrl }],
  creator: businessInfo.name,
  publisher: businessInfo.name,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: businessInfo.name,
    title: 'Car AC Garage in Gampaha | Janaka Auto AC Sri Lanka',
    description: metaDescription,
    locale: 'en_LK',
    images: [
      {
        url: `${siteUrl}/og.jpg`,
        width: 1200,
        height: 630,
        alt: 'Janaka Auto AC – Specialist Car Air Conditioning Garage in Miriswatta, Gampaha',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Car AC Garage in Gampaha | Janaka Auto AC',
    description: metaDescription,
    images: [`${siteUrl}/og.jpg`],
  },
  verification: {
    google: 'b437797fb60cd181',
  },
  other: {
    'geo.region': 'LK-1',
    'geo.placename': 'Gampaha, Miriswatta',
    'geo.position': '7.085055;80.0085464',
    'ICBM': '7.085055, 80.0085464',
  },
};

// Comprehensive Local Business & Entity Schema Graph
const rootSchemaGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AutoRepair',
      '@id': `${siteUrl}/#autorepair`,
      name: businessInfo.name,
      alternateName: ['Janaka Auto Air Conditioning', 'Janaka AC Miriswatta', 'ජානක ඔටෝ AC'],
      url: siteUrl,
      image: `${siteUrl}/og.jpg`,
      logo: `${siteUrl}/janaka-logo-wide.png`,
      telephone: businessInfo.phoneRaw,
      email: businessInfo.email,
      priceRange: '$$',
      currenciesAccepted: 'LKR',
      paymentAccepted: 'Cash, Bank Transfer',
      address: {
        '@type': 'PostalAddress',
        streetAddress: businessInfo.streetAddress,
        addressLocality: businessInfo.locality,
        addressRegion: 'Western Province',
        postalCode: '11000',
        addressCountry: 'LK',
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
      areaServed: [
        {
          '@type': 'AdministrativeArea',
          name: 'Gampaha District',
        },
        {
          '@type': 'AdministrativeArea',
          name: 'Western Province',
        },
        {
          '@type': 'Country',
          name: 'Sri Lanka',
        },
      ],
      sameAs: [businessInfo.facebookUrl],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Janaka Auto AC',
      description: metaDescription,
      publisher: {
        '@id': `${siteUrl}/#autorepair`,
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${siteUrl}/services/{search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-7N9R3P2LK1';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${manrope.variable} ${jetbrains.variable}`}>
      <head>
        <link rel="canonical" href={siteUrl} />
      </head>
      <body className="min-h-screen antialiased bg-[#021824] text-white">
        {/* GA4 Scripts */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootSchemaGraph) }}
        />
        {children}
      </body>
    </html>
  );
}
