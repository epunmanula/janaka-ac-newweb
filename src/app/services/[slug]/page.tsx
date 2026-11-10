import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  CheckCircle2,
  AlertTriangle,
  Wrench,
  Clock,
  ShieldCheck,
  ArrowRight,
  PhoneCall,
  MessageSquareQuote,
  MapPin,
  HelpCircle,
  ChevronRight,
  Compass,
} from 'lucide-react';
import { dedicatedServices, businessInfo, businessHours, siteUrl } from '@/data/janakaData';
import { Navbar } from '@/components/Navbar';
import { SiteFooter } from '@/components/SiteFooter';
import { MobileActionBar } from '@/components/MobileActionBar';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return dedicatedServices.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = dedicatedServices.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: 'Service Not Found | Janaka Auto AC',
    };
  }

  const pageUrl = `${siteUrl}/services/${service.slug}`;

  return {
    title: service.seoTitle,
    description: service.metaDescription,
    keywords: [...service.keywords, ...service.sinhalaKeywords],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: 'article',
      url: pageUrl,
      title: service.seoTitle,
      description: service.metaDescription,
      siteName: businessInfo.name,
      locale: 'en_LK',
      images: [
        {
          url: `${siteUrl}${service.image}`,
          width: 1200,
          height: 630,
          alt: service.imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: service.seoTitle,
      description: service.metaDescription,
      images: [`${siteUrl}${service.image}`],
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = dedicatedServices.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const pageUrl = `${siteUrl}/services/${service.slug}`;

  // Structured Data Schema Graphs
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: service.title,
    description: service.metaDescription,
    serviceType: 'Automotive Air Conditioning Repair',
    provider: {
      '@type': 'AutoRepair',
      name: businessInfo.name,
      telephone: businessInfo.phoneRaw,
      url: siteUrl,
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
    },
    areaServed: [
      { '@type': 'City', name: 'Gampaha' },
      { '@type': 'AdministrativeArea', name: 'Western Province' },
      { '@type': 'Country', name: 'Sri Lanka' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: service.title,
      itemListElement: service.whatIsIncluded.map((item, i) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: item,
        },
      })),
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: `${siteUrl}/#services`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.title,
        item: pageUrl,
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  // Other related services for cross-linking
  const otherServices = dedicatedServices.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar />

      <main className="min-h-screen bg-[#021824] pt-24 pb-20 text-white">
        {/* Breadcrumb Navigation */}
        <div className="border-b border-[#126782]/25 bg-[#02141F]/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-xs font-mono text-[#8FAEC0] sm:px-6 lg:px-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-[#38BDF8]/60" />
            <Link href="/#services" className="hover:text-white transition-colors">
              Services
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-[#38BDF8]/60" />
            <span className="text-[#38BDF8] truncate">{service.title}</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative isolate overflow-hidden border-b border-[#126782]/30 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#2586A3]/40 bg-[#06354B]/60 px-3.5 py-1 text-xs font-mono font-medium tracking-wide text-[#38BDF8] uppercase">
                  <span>Specialized Service {service.number}</span>
                  <span className="text-white/40">•</span>
                  <span>Miriswatta, Gampaha</span>
                </div>

                <h1 className="mt-5 font-wide text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {service.h1}
                </h1>

                <p className="mt-3 text-base font-medium text-[#38BDF8] sm:text-lg">
                  {service.tagline}
                </p>

                <p className="mt-5 text-base leading-relaxed text-[#A2B8C2] sm:text-lg">
                  {service.overview}
                </p>

                {/* Primary Action Buttons */}
                <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
                  <a
                    href={businessInfo.phoneHref}
                    className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#126782] via-[#1B7796] to-[#126782] px-7 py-4 text-sm font-semibold text-white shadow-xl shadow-[#021824]/80 border border-[#2586A3]/40 transition-all hover:brightness-110 active:translate-y-px"
                  >
                    <PhoneCall className="h-4 w-4" />
                    <span>Call Technician ({businessInfo.phoneDisplay})</span>
                  </a>

                  <a
                    href={businessInfo.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 px-7 py-4 text-sm font-semibold text-[#25D366] hover:bg-[#25D366]/20 transition-all active:translate-y-px"
                  >
                    <MessageSquareQuote className="h-4 w-4" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>

                {/* Quick Trust Highlights */}
                <div className="mt-8 flex flex-wrap items-center gap-6 pt-6 border-t border-[#126782]/25 text-xs text-[#8FAEC0]">
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-[#38BDF8]" />
                    100% Genuine Gas Guaranteed
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#10B981]" />
                    Tue–Sun (8:30 AM – 6:00 PM)
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#F59E0B]" />
                    366 Miriswatta Rd, Gampaha
                  </span>
                </div>
              </div>

              {/* Service Visual Preview */}
              <div className="lg:col-span-5">
                <div className="relative overflow-hidden rounded-2xl border border-[#17465E] bg-[#032333]/70 p-3 shadow-2xl backdrop-blur-md">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#021824] via-transparent to-transparent opacity-70" />
                  </div>
                  <div className="p-4">
                    <p className="font-mono text-xs uppercase tracking-wider text-[#38BDF8]">
                      Workshop Inspection Bay
                    </p>
                    <p className="mt-1 text-sm text-[#CDE6F5]">
                      Precision manifold gauges & digital leak sniffers calibrated to factory OEM specs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Symptoms & Inclusions Grid */}
        <section className="py-16 sm:py-20 border-b border-[#126782]/30 bg-[#031c2b]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Problem Symptoms Card */}
              <div className="rounded-2xl border border-[#E11D48]/30 bg-gradient-to-b from-[#1F1218]/40 to-[#021824]/90 p-6 sm:p-8">
                <div className="inline-flex items-center gap-2 rounded-lg border border-[#E11D48]/40 bg-[#E11D48]/10 px-3 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-[#FDA4AF]">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  <span>Warning Symptoms</span>
                </div>
                <h2 className="mt-4 font-wide text-2xl font-bold text-white sm:text-3xl">
                  Signs Your Car Needs This Service
                </h2>
                <p className="mt-2 text-sm text-[#A2B8C2]">
                  If your vehicle exhibits any of these symptoms in Gampaha traffic, driving without an inspection risks escalating costly compressor damage:
                </p>

                <ul className="mt-6 space-y-3.5">
                  {service.symptoms.map((symptom) => (
                    <li key={symptom} className="flex items-start gap-3 text-sm text-[#CDE6F5]/90">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E11D48]/20 text-[#FDA4AF] mt-0.5">
                        ✕
                      </span>
                      <span>{symptom}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What We Deliver Card */}
              <div className="rounded-2xl border border-[#2586A3]/40 bg-gradient-to-b from-[#06354B]/50 to-[#021824]/90 p-6 sm:p-8">
                <div className="inline-flex items-center gap-2 rounded-lg border border-[#38BDF8]/40 bg-[#38BDF8]/10 px-3 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-[#38BDF8]">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Precision Deliverables</span>
                </div>
                <h2 className="mt-4 font-wide text-2xl font-bold text-white sm:text-3xl">
                  What Our Inspection Includes
                </h2>
                <p className="mt-2 text-sm text-[#A2B8C2]">
                  Every vehicle undergoes a disciplined, rigorous multi-point climate audit using genuine equipment:
                </p>

                <ul className="mt-6 space-y-3.5">
                  {service.whatIsIncluded.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[#CDE6F5]">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[#38BDF8] mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 5-Step Diagnostic & Repair Process */}
        <section className="py-16 sm:py-20 border-b border-[#126782]/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#2586A3]/30 bg-[#06354B]/50 px-3.5 py-1 text-xs font-mono font-medium tracking-wider text-[#38BDF8] uppercase">
                <Wrench className="h-3.5 w-3.5" />
                <span>Standard Operating Procedure</span>
              </div>
              <h2 className="mt-4 font-wide text-3xl font-bold text-white sm:text-4xl">
                Our 5-Step Precision Engineering Process
              </h2>
              <p className="mt-3 text-base text-[#A2B8C2]">
                We treat automotive climate control as an exact thermal science. Here is how we ensure your repair lasts:
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {service.processSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="relative rounded-2xl border border-[#17465E]/60 bg-[#02141F]/80 p-6 backdrop-blur-sm hover:border-[#38BDF8]/40 transition-colors"
                >
                  <div className="font-mono text-3xl font-bold text-[#126782]/70">
                    0{index + 1}
                  </div>
                  <h3 className="mt-3 font-wide text-lg font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#A2B8C2]">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service FAQs */}
        <section className="py-16 sm:py-20 border-b border-[#126782]/30 bg-[#031c2b]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#2586A3]/30 bg-[#06354B]/50 px-3.5 py-1 text-xs font-mono font-medium tracking-wider text-[#38BDF8] uppercase">
                <HelpCircle className="h-3.5 w-3.5" />
                <span>Service Specific Questions</span>
              </div>
              <h2 className="mt-4 font-wide text-3xl font-bold text-white sm:text-4xl">
                Frequently Asked Questions: {service.title}
              </h2>
            </div>

            <div className="mt-10 space-y-4">
              {service.faqs.map((faq) => (
                <div
                  key={faq.q}
                  className="rounded-xl border border-[#17465E]/70 bg-[#021824]/80 p-6 backdrop-blur-sm"
                >
                  <h3 className="text-base font-semibold text-white sm:text-lg">
                    {faq.q}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#A2B8C2] sm:text-base">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Other Related Services */}
        <section className="py-16 sm:py-20 border-b border-[#126782]/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#38BDF8]">
                  Complete Workshop Scope
                </p>
                <h2 className="mt-2 font-wide text-2xl font-bold text-white sm:text-3xl">
                  Related Automotive A/C Services
                </h2>
              </div>
              <Link
                href="/#services"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#38BDF8] hover:underline"
              >
                <span>View Full Catalog</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {otherServices.map((other) => (
                <Link
                  key={other.slug}
                  href={`/services/${other.slug}`}
                  className="group rounded-2xl border border-[#17465E]/60 bg-[#02141F]/80 p-6 transition-all duration-300 hover:border-[#38BDF8]/60 hover:bg-[#032333]"
                >
                  <span className="font-mono text-xs font-semibold text-[#38BDF8]">
                    Service {other.number}
                  </span>
                  <h3 className="mt-2 font-wide text-lg font-bold text-white group-hover:text-[#38BDF8] transition-colors">
                    {other.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#8FAEC0] line-clamp-3">
                    {other.overview}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#38BDF8]">
                    <span>Learn More</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Workshop Booking Banner */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-[#2586A3]/40 bg-gradient-to-r from-[#06354B] via-[#032333] to-[#021824] p-8 sm:p-12 shadow-2xl">
              <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-8">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#38BDF8]/10 px-3 py-1 font-mono text-xs font-medium text-[#38BDF8]">
                    <Compass className="h-3.5 w-3.5" />
                    <span>Direct Workshop Visit in Miriswatta</span>
                  </span>
                  <h2 className="mt-4 font-wide text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                    Ready to Restore Ice-Cold Air Conditioning?
                  </h2>
                  <p className="mt-3 text-sm sm:text-base text-[#A2B8C2] max-w-2xl">
                    Drive in to 366 Minuwangoda–Miriswatta Road, Gampaha for a prompt manifold pressure diagnostic. Covered bays available for cars, SUVs, and commercial vans.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-4 text-xs text-[#8FAEC0]">
                    <span>🕒 {businessHours.openDays}: {businessHours.hours}</span>
                    <span>🚫 {businessHours.closed}</span>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-3">
                  <a
                    href={businessInfo.phoneHref}
                    className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#126782] to-[#1B7796] py-3.5 px-6 text-sm font-semibold text-white shadow-lg hover:brightness-110 transition-all text-center"
                  >
                    <PhoneCall className="h-4 w-4" />
                    <span>Call {businessInfo.phoneDisplay}</span>
                  </a>
                  <a
                    href={businessInfo.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 py-3.5 px-6 text-sm font-semibold text-[#25D366] hover:bg-[#25D366]/20 transition-all text-center"
                  >
                    <MessageSquareQuote className="h-4 w-4" />
                    <span>WhatsApp Inquiry</span>
                  </a>
                  <a
                    href={businessInfo.googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border border-[#17465E] bg-[#02141F]/80 py-3 px-6 text-xs font-semibold text-[#CDE6F5] hover:border-[#38BDF8] transition-all text-center"
                  >
                    <MapPin className="h-3.5 w-3.5 text-[#38BDF8]" />
                    <span>Get Directions on Google Maps</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <MobileActionBar />
    </>
  );
}
