'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, Clock, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { businessHours, businessInfo } from '@/data/janakaData';

export const HeroSection: React.FC = () => {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-[#F6F4EF] pt-24 lg:pt-28 border-b border-[#E5E3DE]"
    >
      {/* Subtle architectural ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-[#2586A3]/8 blur-[120px]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 py-10 lg:grid-cols-12 lg:gap-12 lg:py-16">
          {/* Left Column: Authoritative Editorial Copy */}
          <div className="lg:col-span-7">
            {/* Specialist Credential Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#E5E3DE] bg-[#FFFFFF] px-3.5 py-1.5 shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-[#2586A3]" />
              <span className="font-mono text-[11px] font-semibold tracking-[0.14em] uppercase text-[#123D4A]">
                Automotive A/C Specialist · Gampaha
              </span>
            </div>

            {/* Headline */}
            <h1
              id="hero-title"
              className="mt-6 font-display text-[2.75rem] font-bold leading-[1.08] tracking-[-0.03em] text-[#24282B] sm:text-5xl lg:text-[3.65rem]"
              style={{ fontFamily: 'var(--font-display, sans-serif)' }}
            >
              Specialist Car Air-Conditioning Diagnosis & Guaranteed Repairs.
            </h1>

            {/* Subtitle / Description */}
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#71818A] sm:text-lg">
              Car air-conditioning diagnosis, servicing, and repairs on Miriswatta Road, Gampaha.
              From refrigerant leak detection to compressor rebuilding and electrical climate repairs —
              we diagnose the actual cause, explain it clearly, and get your cabin ice-cold again.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2.5 rounded-md bg-[#123D4A] px-7 py-4 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#2586A3] active:translate-y-px"
              >
                <span>Book a Service</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </a>

              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-md border border-[#E5E3DE] bg-[#FFFFFF] px-6 py-4 text-sm font-semibold text-[#24282B] shadow-xs transition-all duration-200 hover:border-[#71818A] hover:bg-[#F6F4EF] active:translate-y-px"
              >
                Explore Services
              </a>

              <a
                href={`tel:${businessInfo.phoneRaw}`}
                className="inline-flex items-center gap-2 rounded-md px-4 py-4 text-sm font-semibold text-[#123D4A] hover:text-[#2586A3] transition-colors"
              >
                <Phone className="h-4 w-4 text-[#2586A3]" aria-hidden="true" />
                <span>{businessInfo.phone}</span>
              </a>
            </div>

            {/* Quality Pillars */}
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 pt-6 border-t border-[#E5E3DE] text-xs font-semibold text-[#71818A]">
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#2586A3]" />
                15+ Years Specialization
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#2586A3]" />
                Manifold Pressure Diagnostics
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#2586A3]" />
                Repair Over Replace Policy
              </span>
            </div>
          </div>

          {/* Right Column: Genuine Automotive Photography Composition */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Primary Image: Real Vehicle Climate Cockpit */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[#E5E3DE] bg-[#FFFFFF] shadow-lg shadow-[#123D4A]/6">
                <Image
                  src="/hero-car-cockpit.webp"
                  alt="Vehicle cabin climate control with chilled vent airflow"
                  fill
                  sizes="(max-width: 1024px) 100vw, 520px"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B252E]/70 via-transparent to-transparent" />
                
                {/* Image Overlay Label */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div>
                    <span className="font-mono text-[10px] tracking-wider uppercase text-[#E5E3DE]/80">Climate Restoration</span>
                    <p className="text-sm font-semibold">Ice-cold vent airflow guaranteed</p>
                  </div>
                  <div className="rounded-md bg-[#FFFFFF]/20 backdrop-blur-md px-2.5 py-1 text-xs font-mono font-medium">
                    100% Guaranteed
                  </div>
                </div>
              </div>

              {/* Floating Workshop Badge */}
              <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-4 rounded-xl border border-[#E5E3DE] bg-[#FFFFFF] p-4 shadow-xl shadow-[#24282B]/8 max-w-xs">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-[#E5E3DE]">
                  <Image
                    src="/workshop-exterior.webp"
                    alt="Janaka Auto AC Workshop facility in Gampaha"
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#71818A]">Gampaha Workshop</span>
                  <p className="text-xs font-bold text-[#24282B] leading-snug">Covered Service Bays on Miriswatta Road</p>
                  <p className="mt-0.5 text-[11px] text-[#2586A3] font-medium">Open Tue – Sun · 8:30 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width Verified Business Facts Dock */}
      <div className="w-full border-t border-[#E5E3DE] bg-[#FFFFFF] shadow-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 divide-y divide-[#E5E3DE] sm:grid-cols-3 sm:divide-y-0 sm:divide-x border-x sm:border-x-0 border-[#E5E3DE]">
            {/* Workshop Address */}
            <a
              href={businessInfo.googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 p-6 sm:p-7 transition-colors duration-200 hover:bg-[#F6F4EF]"
            >
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#E5E3DE] bg-[#F6F4EF] text-[#123D4A] group-hover:border-[#2586A3] group-hover:bg-[#123D4A] group-hover:text-white transition-all">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-[#71818A] font-semibold">Workshop</span>
                <p className="mt-1 text-sm font-bold text-[#24282B] group-hover:text-[#2586A3] transition-colors leading-snug">
                  {businessInfo.addressShort}
                </p>
                <span className="mt-1 inline-flex items-center text-xs font-semibold text-[#2586A3]">
                  Get Google Maps Directions →
                </span>
              </div>
            </a>

            {/* Operating Hours */}
            <div className="flex items-start gap-4 p-6 sm:p-7 transition-colors duration-200">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#E5E3DE] bg-[#F6F4EF] text-[#123D4A]">
                <Clock className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-[#71818A] font-semibold">
                  Open {businessHours.openDaysShort}
                </span>
                <p className="mt-1 text-sm font-bold text-[#24282B] leading-snug">
                  {businessHours.hours}
                </p>
                <span className="mt-1 block text-xs font-medium text-[#71818A]">
                  {businessHours.closed}
                </span>
              </div>
            </div>

            {/* Direct Calling & WhatsApp */}
            <a
              href={`tel:${businessInfo.phoneRaw}`}
              className="group flex items-start gap-4 p-6 sm:p-7 transition-colors duration-200 hover:bg-[#F6F4EF]"
            >
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#E5E3DE] bg-[#F6F4EF] text-[#123D4A] group-hover:border-[#2586A3] group-hover:bg-[#123D4A] group-hover:text-white transition-all">
                <Phone className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-[#71818A] font-semibold">Call or WhatsApp</span>
                <p className="mt-1 text-sm font-bold text-[#24282B] group-hover:text-[#2586A3] transition-colors leading-snug">
                  {businessInfo.phone}
                </p>
                <span className="mt-1 inline-flex items-center text-xs font-semibold text-[#2586A3]">
                  Direct Technician Line →
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
