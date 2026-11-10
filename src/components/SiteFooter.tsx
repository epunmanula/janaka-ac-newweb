import React from 'react';
import { Logo } from '@/components/brand/Logo';
import { businessHours, businessInfo, navSections } from '@/data/janakaData';
import { Phone, MessageCircle, Mail, MapPin, ArrowUpRight } from 'lucide-react';

export const SiteFooter: React.FC = () => (
  <footer className="bg-[#0B252E] border-t border-[#123D4A] pb-28 pt-16 text-[#A0B1BA] md:pb-12">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Top 3-column layout */}
      <div className="grid gap-12 border-b border-[#1A4350] pb-12 md:grid-cols-12">
        {/* Brand & Identity */}
        <div className="md:col-span-5">
          <Logo variant="light" />
          <p className="mt-5 max-w-sm text-xs leading-relaxed text-[#A0B1BA]">
            Specialist automotive air-conditioning workshop located on Minuwangoda–Gampaha–Miriswatta Road. Over 15 years of dedicated climate control diagnostics, gas recharging, compressor repairs, and leak tracing.
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold text-white">
            <a
              href="tel:+94714551409"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#123D4A] px-3.5 py-2 hover:bg-[#2586A3] transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-[#99D5E8]" />
              <span>+94 71 455 1409</span>
            </a>
            <a
              href={businessInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#123D4A] px-3.5 py-2 hover:bg-[#25D366] transition-colors"
            >
              <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" />
              <span>WhatsApp Workshop</span>
            </a>
          </div>
        </div>

        {/* Quick Navigation Links */}
        <nav aria-label="Footer" className="md:col-span-3">
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-white">
            Quick Navigation
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-xs md:grid-cols-1">
            {navSections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="transition-colors hover:text-white">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Workshop Contact & Hours */}
        <div className="md:col-span-4">
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-white">
            Workshop Information
          </p>
          <address className="mt-4 space-y-3 text-xs not-italic leading-relaxed">
            <div className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 shrink-0 text-[#2586A3] mt-0.5" />
              <div>
                <p className="text-white font-medium">{businessInfo.address}</p>
                <a
                  href={businessInfo.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1 font-semibold text-[#99D5E8] hover:underline"
                >
                  <span>Google Maps Directions</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </div>

            <div className="flex items-start gap-2.5 border-t border-[#1A4350] pt-2.5">
              <span className="font-mono text-[#2586A3]">HRS:</span>
              <div>
                <p className="text-white">
                  {businessHours.openDays}: {businessHours.hours}
                </p>
                <p className="text-[#EA580C] font-semibold">{businessHours.closed}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 border-t border-[#1A4350] pt-2.5">
              <Mail className="h-4 w-4 shrink-0 text-[#2586A3] mt-0.5" />
              <a
                href={`mailto:${businessInfo.email}`}
                className="text-white transition-colors hover:text-[#99D5E8]"
              >
                {businessInfo.email}
              </a>
            </div>
          </address>
        </div>
      </div>

      {/* Bottom Legal & Attribution */}
      <div className="flex flex-col gap-4 pt-8 text-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <p>© 2026 {businessInfo.name}. All rights reserved.</p>
          <span className="hidden text-white/20 sm:inline" aria-hidden="true">
            •
          </span>
          <span className="font-mono text-[11px] text-[#2586A3]">v1.2 · Luxury Minimalism</span>
          <span className="hidden text-white/20 sm:inline" aria-hidden="true">
            •
          </span>
          <p className="flex items-center gap-1.5 text-[#A0B1BA]">
            <span>Designed & Developed by</span>
            <a
              href="https://www.emmelabs.tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-white transition-colors hover:text-[#99D5E8] underline decoration-white/20 underline-offset-4 hover:decoration-[#99D5E8]"
            >
              <span>EMME Labs</span>
              <span className="text-[10px] text-[#2586A3]">↗</span>
            </a>
          </p>
        </div>

        {/* Social channels */}
        <ul className="flex items-center gap-6">
          <li>
            <a
              href={businessInfo.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              Facebook
            </a>
          </li>
          <li>
            <a
              href={businessInfo.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              TikTok
            </a>
          </li>
          <li>
            <a
              href={businessInfo.googleMapsPlaceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              Google Maps
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
);
