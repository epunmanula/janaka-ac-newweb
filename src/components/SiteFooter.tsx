import React from 'react';
import Image from 'next/image';
import { businessHours, businessInfo, navSections } from '@/data/janakaData';

export const SiteFooter: React.FC = () => (
  <footer className="bg-navy-950 pb-28 pt-16 text-silver md:pb-32">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="relative h-12 w-52 sm:w-60">
            <Image
              src="/janaka-logo-wide.png"
              alt={businessInfo.name}
              fill
              sizes="(max-width: 640px) 210px, 240px"
              className="object-contain object-left filter drop-shadow-[0_0_14px_rgba(0,180,255,0.3)]"
            />
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed">
            Automotive air-conditioning diagnosis, servicing and repairs in Gampaha, Sri Lanka. {businessInfo.subTagline}
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <p className="eyebrow text-[10px] text-white">Explore</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm md:grid-cols-1">
            {navSections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="transition-colors hover:text-white">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="eyebrow text-[10px] text-white">Workshop</p>
          <address className="mt-4 space-y-2.5 text-sm not-italic leading-relaxed">
            <p>{businessInfo.address}</p>
            <p>
              {businessHours.openDays}, {businessHours.hours}
              <br />
              {businessHours.closed}
            </p>
            <p>
              <a href={`tel:${businessInfo.phoneRaw}`} className="text-white transition-colors hover:text-ice">
                {businessInfo.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${businessInfo.email}`} className="break-all transition-colors hover:text-white">
                {businessInfo.email}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="flex flex-col gap-4 pt-8 text-xs sm:flex-row sm:items-center sm:justify-between">
        <p>
          © 2026 {businessInfo.name}. All rights reserved.
        </p>
        <ul className="flex gap-6">
          <li>
            <a href={businessInfo.facebookUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
              Facebook
            </a>
          </li>
          <li>
            <a href={businessInfo.tiktokUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
              TikTok
            </a>
          </li>
          <li>
            <a href={businessInfo.googleMapsPlaceUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
              Google Maps
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
);
