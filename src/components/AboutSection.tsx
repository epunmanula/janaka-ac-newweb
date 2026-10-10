'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle, MapPin, ShieldCheck, Award, Zap, ThermometerSnowflake } from 'lucide-react';
import { businessInfo, trustMetrics } from '@/data/janakaData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="w-full py-20 md:py-28 border-b border-[#222222] bg-[#141414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono-editorial text-xs uppercase tracking-[0.25em] text-[#888888] block">
              HERITAGE OF PRECISION // {trustMetrics.experienceYears} IN GAMPAHA
            </span>

            <h2 className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl text-[#F5F4EF] leading-tight">
              Excellence in Automotive Thermodynamics
            </h2>

            <p className="font-serif-editorial text-xl sm:text-2xl text-[#DCD9D0] leading-relaxed">
              At Janaka Auto AC in Gampaha, automotive air conditioning is treated not as arbitrary topping up, but as a calibrated thermodynamic science. From Japanese family sedans and high-voltage hybrids to German prestige cruisers, every climate system demands microscopic leak integrity, exact vacuum evacuation, and uncompromised lubricant purity.
            </p>

            <p className="font-serif-editorial text-lg text-[#999999] leading-relaxed">
              Equipped with 280 PSI digital dry nitrogen pressure testing, automated recovery stations, and 100% virgin R134a/R1234yf refrigerants, our workshop validates every repaired vehicle to our signature sub-zero vent standard — achieving an ice-cold 4.5°C cabin output even under blistering mid-day Sri Lankan heat.
            </p>

            {/* Workshop image highlight banner */}
            <div className="relative h-48 sm:h-60 w-full rounded-sm overflow-hidden border border-[#2b2b2b] my-4 shadow-lg">
              <Image
                src="/workshop-exterior.webp"
                alt="Janaka Auto AC Workshop in Miriswatta, Gampaha"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-4">
                <span className="font-mono-editorial text-xs text-[#F5F4EF] flex items-center space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>{businessInfo.address}</span>
                </span>
              </div>
            </div>

            {/* Badges list */}
            <div className="pt-2 flex flex-wrap gap-3 text-xs font-mono-editorial text-[#888888]">
              {trustMetrics.badges.map((badge, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-2 border border-[#262626] bg-[#121212] px-3.5 py-2 rounded-sm"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <div>
                    <span className="text-[#F5F4EF] font-medium block">{badge.title}</span>
                    <span className="text-[10px] text-[#777777] block">{badge.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Metrics Ledger */}
          <div className="lg:col-span-5 bg-[#121212] border border-[#262626] p-8 sm:p-10 rounded-sm space-y-8 shadow-2xl">
            <div className="border-b border-[#222222] pb-6">
              <span className="font-mono-editorial text-xs text-[#888888] uppercase tracking-[0.2em] block mb-2">
                VERIFIED EXPERIENCE
              </span>
              <div className="font-serif-editorial text-5xl sm:text-6xl text-[#F5F4EF]">
                15+ Years
              </div>
              <p className="font-mono-editorial text-xs text-[#666666] uppercase mt-2">
                Over 10,000+ Japanese, European & Hybrid Vehicles Serviced
              </p>
            </div>

            <div className="border-b border-[#222222] pb-6">
              <span className="font-mono-editorial text-xs text-[#888888] uppercase tracking-[0.2em] block mb-2">
                VENT TEMPERATURE BENCHMARK
              </span>
              <div className="font-serif-editorial text-5xl sm:text-6xl text-cyan-400">
                4.5°C
              </div>
              <p className="font-mono-editorial text-xs text-[#666666] uppercase mt-2">
                Sub-Zero Digital Vent Output Verified Under Ambient Heat
              </p>
            </div>

            <div className="border-b border-[#222222] pb-6">
              <span className="font-mono-editorial text-xs text-[#888888] uppercase tracking-[0.2em] block mb-2">
                PURITY ASSURANCE
              </span>
              <div className="font-serif-editorial text-5xl sm:text-6xl text-[#c5a059]">
                100% Pure
              </div>
              <p className="font-mono-editorial text-xs text-[#666666] uppercase mt-2">
                Virgin Denso / Sanden Specification Gas & Dielectric POE Oil
              </p>
            </div>

            <div>
              <span className="font-mono-editorial text-xs text-[#888888] uppercase tracking-[0.2em] block mb-2">
                GOOGLE REVIEWS RATING
              </span>
              <div className="font-serif-editorial text-5xl sm:text-6xl text-[#F5F4EF]">
                4.9 ★★★★★
              </div>
              <p className="font-mono-editorial text-xs text-[#666666] uppercase mt-2">
                {trustMetrics.reviewsCount} Google Verified Driver Testimonials in Miriswatta, Gampaha
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
