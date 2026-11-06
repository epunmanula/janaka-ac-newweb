'use client';

import React from 'react';
import Image from 'next/image';
import { SectionHeading } from '@/components/SectionHeading';
import { businessHours, businessInfo } from '@/data/janakaData';
import { Wrench, ShieldCheck, MapPin, Clock, ArrowUpRight } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative overflow-hidden bg-[#F6F4EF] py-24 sm:py-28 md:py-32 border-b border-[#E5E3DE]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="about-title"
          index="03"
          eyebrow="Specialist Automotive Workshop"
          title="15+ Years Dedicated to Car Climate Control"
          intro="Janaka Auto AC operates with one clear specialization: automotive air conditioning. We do not run a general repair shop with A/C as a sideline — vehicle cooling is our daily craftsmanship."
          tone="light"
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Editorial Photography Composition */}
          <div className="relative lg:col-span-6">
            <div className="grid grid-cols-12 gap-4">
              {/* Main Exterior Facility Photo */}
              <div className="col-span-12 overflow-hidden rounded-2xl border border-[#E5E3DE] bg-[#FFFFFF] shadow-sm">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src="/workshop-exterior.webp"
                    alt="Janaka Auto AC workshop facility on Miriswatta Road, Gampaha"
                    fill
                    sizes="(max-width: 1024px) 100vw, 550px"
                    className="object-cover"
                  />
                </div>
                <div className="p-4 bg-[#FFFFFF]">
                  <p className="font-mono text-xs uppercase tracking-wider text-[#71818A]">
                    Primary Facility · {businessInfo.addressShort}
                  </p>
                  <p className="text-sm font-semibold text-[#24282B]">
                    Covered Service Bays for Passenger Sedans, SUVs & Commercial Vans
                  </p>
                </div>
              </div>

              {/* Supporting Workshop Photos */}
              <div className="col-span-6 overflow-hidden rounded-xl border border-[#E5E3DE] bg-[#FFFFFF] shadow-sm">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/workshop-vehicles.webp"
                    alt="Vehicles being serviced in covered bays"
                    fill
                    sizes="(max-width: 1024px) 50vw, 260px"
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <span className="font-mono text-[10px] uppercase text-[#71818A]">Active Service</span>
                  <p className="text-xs font-medium text-[#24282B]">Diagnostic bays in action</p>
                </div>
              </div>

              <div className="col-span-6 overflow-hidden rounded-xl border border-[#E5E3DE] bg-[#FFFFFF] shadow-sm">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/ac-repair-job.webp"
                    alt="Technician performing precision climate repair"
                    fill
                    sizes="(max-width: 1024px) 50vw, 260px"
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <span className="font-mono text-[10px] uppercase text-[#71818A]">Hands-on Craft</span>
                  <p className="text-xs font-medium text-[#24282B]">Precision component repair</p>
                </div>
              </div>
            </div>

            {/* Experience Badge */}
            <div className="absolute -bottom-4 -right-2 sm:bottom-4 sm:right-4 rounded-xl border border-[#E5E3DE] bg-[#123D4A] p-4 text-white shadow-xl">
              <span className="font-mono text-2xl font-bold text-[#FFFFFF]">15+</span>
              <p className="font-mono text-[11px] uppercase tracking-wider text-[#99D5E8]">
                Years of Specialist Practice
              </p>
              <p className="text-[10px] text-white/80">Est. Gampaha, Sri Lanka</p>
            </div>
          </div>

          {/* Workshop Story & Core Practice */}
          <div className="lg:col-span-6 lg:pl-6">
            <h3 className="font-serif text-2xl font-bold text-[#24282B] sm:text-3xl">
              Specialized diagnosis. Transparent pricing. Real workshop craft.
            </h3>

            <div className="mt-6 space-y-4 text-sm leading-relaxed text-[#4B5563] sm:text-base">
              <p>
                Located along the Minuwangoda–Gampaha–Miriswatta Road, Janaka Auto AC has provided dependable automotive air conditioning solutions to vehicle owners across the Western Province for more than fifteen years.
              </p>
              <p>
                Our philosophy is simple: we never suggest replacing expensive parts like compressors or condensers when a precise repair, fresh seal, or magnetic clutch service solves the root issue. We identify the true failure cause, explain it to you honestly, and execute the work with durable parts.
              </p>
            </div>

            {/* Three Workshop Credibility Pillars */}
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-4 rounded-xl border border-[#E5E3DE] bg-[#FFFFFF] p-4 shadow-xs">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F6F4EF] text-[#123D4A]">
                  <Wrench className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#24282B]">100% Automotive Climate Focus</h4>
                  <p className="mt-1 text-xs text-[#71818A] leading-relaxed">
                    We do not dilute our time with general oil changes or body work. Our technicians specialize entirely in high and low pressure refrigerant cycles, compressors, electrical climate controls, and cabin air quality.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-[#E5E3DE] bg-[#FFFFFF] p-4 shadow-xs">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F6F4EF] text-[#123D4A]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#24282B]">Explain First, Repair Second</h4>
                  <p className="mt-1 text-xs text-[#71818A] leading-relaxed">
                    Every vehicle undergoes pressure gauge and electronic diagnostic verification. You receive an upfront explanation and quotation before we proceed.
                  </p>
                </div>
              </div>
            </div>

            {/* Location & Hours Card */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-[#E5E3DE] bg-[#FFFFFF] p-4">
                <div className="flex items-center gap-2 text-[#71818A]">
                  <Clock className="h-4 w-4 text-[#2586A3]" />
                  <span className="font-mono text-[11px] uppercase tracking-wider">Operating Schedule</span>
                </div>
                <p className="mt-2 text-sm font-bold text-[#24282B]">{businessHours.openDays}</p>
                <p className="text-xs text-[#71818A]">{businessHours.hours}</p>
                <p className="text-xs font-semibold text-[#EA580C] mt-1">{businessHours.closed}</p>
              </div>

              <div className="rounded-xl border border-[#E5E3DE] bg-[#FFFFFF] p-4">
                <div className="flex items-center gap-2 text-[#71818A]">
                  <MapPin className="h-4 w-4 text-[#2586A3]" />
                  <span className="font-mono text-[11px] uppercase tracking-wider">Workshop Location</span>
                </div>
                <p className="mt-2 text-sm font-bold text-[#24282B]">366 Miriswatta Road</p>
                <p className="text-xs text-[#71818A]">Gampaha, Western Province</p>
                <a
                  href={businessInfo.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#2586A3] hover:underline"
                >
                  <span>Open in Google Maps</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
