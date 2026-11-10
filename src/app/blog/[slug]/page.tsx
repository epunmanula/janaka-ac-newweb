import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  BookOpen,
  Calendar,
  Clock,
  UserCheck,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  PhoneCall,
  MessageSquareQuote,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { blogArticles, businessInfo, businessHours, siteUrl } from '@/data/janakaData';
import { Navbar } from '@/components/Navbar';
import { SiteFooter } from '@/components/SiteFooter';
import { MobileActionBar } from '@/components/MobileActionBar';

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = blogArticles.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: 'Guide Not Found | Janaka Auto AC',
    };
  }

  const pageUrl = `${siteUrl}/blog/${article.slug}`;

  return {
    title: article.seoTitle,
    description: article.metaDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: 'article',
      url: pageUrl,
      title: article.seoTitle,
      description: article.metaDescription,
      siteName: businessInfo.name,
      locale: 'en_LK',
      publishedTime: article.publishedDate,
      modifiedTime: article.updatedDate,
      authors: [article.author],
      images: [
        {
          url: `${siteUrl}${article.image}`,
          width: 1200,
          height: 630,
          alt: article.imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.seoTitle,
      description: article.metaDescription,
      images: [`${siteUrl}${article.image}`],
    },
  };
}

export default async function BlogArticlePage({ params }: BlogPageProps) {
  const { slug } = await params;
  const article = blogArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const pageUrl = `${siteUrl}/blog/${article.slug}`;

  // Schema.org Article structured data
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${pageUrl}#article`,
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.publishedDate,
    dateModified: article.updatedDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
    image: `${siteUrl}${article.image}`,
    author: {
      '@type': 'Organization',
      name: article.author,
      url: siteUrl,
    },
    publisher: {
      '@type': 'AutoRepair',
      name: businessInfo.name,
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/janaka-logo-wide.png`,
      },
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
        name: 'Guides & Advice',
        item: `${siteUrl}/#faq`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: pageUrl,
      },
    ],
  };

  const faqSchema =
    article.faqs && article.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: article.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.a,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <Navbar />

      <main className="min-h-screen bg-[#021824] pt-24 pb-20 text-white">
        {/* Breadcrumbs */}
        <div className="border-b border-[#126782]/25 bg-[#02141F]/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-5xl items-center gap-2 px-4 py-3 text-xs font-mono text-[#8FAEC0] sm:px-6 lg:px-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-[#38BDF8]/60" />
            <Link href="/#faq" className="hover:text-white transition-colors">
              Guides & Advice
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-[#38BDF8]/60" />
            <span className="text-[#38BDF8] truncate">{article.title}</span>
          </div>
        </div>

        {/* Article Header */}
        <article className="mx-auto max-w-4xl px-4 pt-12 sm:px-6 lg:px-8">
          <header className="border-b border-[#126782]/30 pb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#2586A3]/40 bg-[#06354B]/60 px-3.5 py-1 text-xs font-mono font-medium tracking-wide text-[#38BDF8] uppercase">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Automotive Climate Engineering Guide</span>
            </div>

            <h1 className="mt-5 font-wide text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              {article.title}
            </h1>

            {/* Author Meta Line */}
            <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-[#8FAEC0]">
              <span className="flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-[#38BDF8]" />
                {article.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#10B981]" />
                Updated: {article.updatedDate}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#F59E0B]" />
                {article.readTime}
              </span>
            </div>

            {/* Excerpt Lead */}
            <p className="mt-8 text-lg font-medium leading-relaxed text-[#CDE6F5] border-l-4 border-[#38BDF8] pl-5 bg-[#06354B]/20 py-3 rounded-r-xl">
              {article.excerpt}
            </p>
          </header>

          {/* Article Visual */}
          <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[#17465E] shadow-2xl">
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#021824] via-transparent to-transparent opacity-60" />
          </div>

          {/* Article Body Content */}
          <div className="mt-12 space-y-12">
            {article.sections.map((section, idx) => (
              <section key={section.heading} className="space-y-4">
                <h2 className="font-wide text-2xl font-bold text-white sm:text-3xl">
                  {section.heading}
                </h2>

                <div className="space-y-4 text-base sm:text-lg leading-relaxed text-[#A2B8C2]">
                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                {section.keyTakeaways && section.keyTakeaways.length > 0 && (
                  <div className="mt-6 rounded-2xl border border-[#2586A3]/35 bg-[#032333]/70 p-5 sm:p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#38BDF8]">
                      <Sparkles className="h-4 w-4" />
                      <span>Key Workshop Takeaways</span>
                    </div>
                    <ul className="mt-3 space-y-2.5">
                      {section.keyTakeaways.map((takeaway, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-3 text-sm text-[#CDE6F5]">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#38BDF8] mt-0.5" />
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Article FAQs (if present) */}
          {article.faqs && article.faqs.length > 0 && (
            <section className="mt-16 pt-12 border-t border-[#126782]/30">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#38BDF8]">
                <HelpCircle className="h-4 w-4" />
                <span>Frequently Asked Questions</span>
              </div>
              <h2 className="mt-3 font-wide text-2xl font-bold text-white sm:text-3xl">
                Common Questions on this Topic
              </h2>

              <div className="mt-8 space-y-4">
                {article.faqs.map((faq) => (
                  <div
                    key={faq.q}
                    className="rounded-xl border border-[#17465E] bg-[#031c2b] p-6 backdrop-blur-sm"
                  >
                    <h3 className="text-base font-semibold text-white sm:text-lg">
                      {faq.q}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#A2B8C2] sm:text-base">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Related Workshop Services */}
          {article.relatedServices && article.relatedServices.length > 0 && (
            <section className="mt-16 pt-12 border-t border-[#126782]/30">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#38BDF8]">
                Professional Repair Solutions
              </p>
              <h2 className="mt-2 font-wide text-2xl font-bold text-white sm:text-3xl">
                Related Services at Janaka Auto AC Gampaha
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {article.relatedServices.map((rel) => (
                  <Link
                    key={rel.title}
                    href={rel.href}
                    className="group rounded-xl border border-[#17465E] bg-[#02141F] p-5 transition-all hover:border-[#38BDF8]/60 hover:bg-[#032333]"
                  >
                    <h3 className="font-wide text-base font-bold text-white group-hover:text-[#38BDF8] transition-colors">
                      {rel.title}
                    </h3>
                    <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#38BDF8]">
                      <span>View Service Details</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Direct Technician Consultation Banner */}
          <section className="mt-16 rounded-3xl border border-[#2586A3]/40 bg-gradient-to-r from-[#06354B] via-[#032333] to-[#021824] p-8 sm:p-10 shadow-2xl">
            <h2 className="font-wide text-2xl font-bold text-white sm:text-3xl">
              Experiencing A/C Trouble on the Road?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#A2B8C2]">
              Visit Janaka Auto AC at 366 Minuwangoda–Miriswatta Road, Gampaha for honest manifold pressure diagnostics. We welcome drivers from Gampaha, Yakkala, Minuwangoda, Kadawatha, and Colombo.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href={businessInfo.phoneHref}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#126782] to-[#1B7796] px-6 py-3.5 text-sm font-semibold text-white shadow-lg hover:brightness-110 transition-all"
              >
                <PhoneCall className="h-4 w-4" />
                <span>Call {businessInfo.phoneDisplay}</span>
              </a>

              <a
                href={businessInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 px-6 py-3.5 text-sm font-semibold text-[#25D366] hover:bg-[#25D366]/20 transition-all"
              >
                <MessageSquareQuote className="h-4 w-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={businessInfo.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[#17465E] bg-[#02141F] px-5 py-3 text-xs font-semibold text-[#CDE6F5] hover:border-[#38BDF8] transition-all"
              >
                <MapPin className="h-3.5 w-3.5 text-[#38BDF8]" />
                <span>Google Maps Directions</span>
              </a>
            </div>
          </section>
        </article>
      </main>

      <SiteFooter />
      <MobileActionBar />
    </>
  );
}

