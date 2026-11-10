import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { businessHours, businessInfo, dedicatedServices, blogArticles, navSections } from '@/data/janakaData';
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';

export const SiteFooter: React.FC = () => (
  <footer className="bg-[#02141F] border-t border-[#144B66]/40 pb-28 pt-16 text-[#A2B8C2] md:pb-12">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-10 border-b border-[#144B66]/30 pb-12 sm:grid-cols-2 lg:grid-cols-12">
        {/* Brand & Introduction */}
        <div className="lg:col-span-4">
          <Link href="/" className="relative block h-11 w-56 sm:h-12 sm:w-64">
            <Image
              src="/brand/logo-navbar.webp"
              alt={businessInfo.name}
              fill
              sizes="(max-width: 640px) 224px, 256px"
              className="object-contain object-left filter drop-shadow-[0_2px_12px_rgba(56,189,248,0.35)]"
            />
          </Link>
          <p className="mt-5 max-w-sm text-xs leading-relaxed text-[#8FAEC0]">
            Top-rated vehicle air conditioning specialists in Miriswatta, Gampaha, Sri Lanka. Electronic diagnostics, virgin R134a/R1234yf gas recharging, nitrogen leak detection, and compressor restoration.
          </p>

          <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-mono text-[#38BDF8]">
            <span className="rounded-md border border-[#144B66] bg-[#052436] px-2.5 py-1">
              15+ Yrs Craftsmanship
            </span>
            <span className="rounded-md border border-[#144B66] bg-[#052436] px-2.5 py-1">
              Gampaha District
            </span>
          </div>
        </div>

        {/* Dedicated Services Links */}
        <div className="lg:col-span-3">
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-white">
            Specialist Services
          </p>
          <ul className="mt-4 space-y-2 text-xs">
            {dedicatedServices.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="transition-colors hover:text-[#38BDF8]"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Educational Guides & Navigation */}
        <div className="lg:col-span-2">
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-white">
            Guides & Advice
          </p>
          <ul className="mt-4 space-y-2 text-xs">
            {blogArticles.slice(0, 5).map((article) => (
              <li key={article.slug}>
                <Link
                  href={`/blog/${article.slug}`}
                  className="transition-colors hover:text-[#38BDF8] line-clamp-1"
                  title={article.title}
                >
                  {article.title}
                </Link>
              </li>
            ))}
            <li className="pt-2 border-t border-[#144B66]/30">
              <Link href="/#faq" className="text-[#38BDF8] font-semibold hover:underline">
                View Workshop FAQs →
              </Link>
            </li>
          </ul>
        </div>

        {/* Workshop Location & Hours */}
        <div className="lg:col-span-3">
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-white">
            Workshop Facility
          </p>
          <address className="mt-4 space-y-3 text-xs not-italic leading-relaxed">
            <div className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 shrink-0 text-[#38BDF8] mt-0.5" />
              <div>
                <p className="text-white font-medium">{businessInfo.address}</p>
                <a
                  href={businessInfo.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1 font-semibold text-[#38BDF8] hover:underline"
                >
                  <span>Google Maps Directions</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </div>

            <div className="border-t border-[#144B66]/20 pt-2.5">
              <p className="text-white">
                {businessHours.openDays}: {businessHours.hours}
              </p>
              <p className="text-[#F59E0B] font-semibold mt-0.5">{businessHours.closed}</p>
            </div>

            <div className="border-t border-[#144B66]/20 pt-2.5 flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-[#38BDF8]" />
              <a href={`tel:${businessInfo.phoneRaw}`} className="text-white hover:text-[#38BDF8] font-semibold">
                {businessInfo.phone}
              </a>
            </div>

            <div className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-[#38BDF8]" />
              <a href={`mailto:${businessInfo.email}`} className="text-[#8FAEC0] hover:text-white">
                {businessInfo.email}
              </a>
            </div>
          </address>
        </div>
      </div>

      {/* Legal & Attribution */}
      <div className="flex flex-col gap-4 pt-8 text-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <p>© 2026 {businessInfo.name}. All rights reserved.</p>
          <span className="hidden text-white/20 sm:inline" aria-hidden="true">•</span>
          <p className="text-[#8FAEC0]">Miriswatta, Gampaha, Sri Lanka</p>
          <span className="hidden text-white/20 sm:inline" aria-hidden="true">•</span>
          <p className="flex items-center gap-1.5 text-[#8FAEC0]">
            <span>Designed & Developed by</span>
            <a
              href="https://www.emmelabs.tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-white transition-colors duration-200 hover:text-[#38BDF8] underline decoration-white/20 underline-offset-4 hover:decoration-[#38BDF8]"
            >
              <span>EMME Labs</span>
              <span className="text-[10px] text-[#38BDF8]" aria-hidden="true">↗</span>
            </a>
          </p>
        </div>

        <div className="flex items-center gap-4 text-[#8FAEC0]">
          <Link href="/services/car-ac-repair-gampaha" className="hover:text-white">
            AC Garage Gampaha
          </Link>
          <span>•</span>
          <Link href="/services/car-ac-gas-refilling" className="hover:text-white">
            Car AC Gas Refill
          </Link>
        </div>
      </div>
    </div>
  </footer>
);
