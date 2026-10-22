'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Calendar,
  MessageCircle,
  Phone,
  Star,
  Snowflake,
  Flame,
  ThermometerSnowflake,
  ArrowRight,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { businessInfo, trustMetrics } from '@/data/janakaData';

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative w-full border-b border-[#222222] bg-[#121212] overflow-hidden pt-8 pb-16 md:py-24">
      {/* Background ambient cool glow */}
      <div className="absolute top-1/4 -right-28 w-96 h-96 bg-cyan-950/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 left-1/4 w-96 h-96 bg-blue-950/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-7"
          >
            {/* Top Micro Eyebrow with Active Workshop Badge */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono-editorial text-xs uppercase tracking-[0.25em] text-[#888888] flex items-center space-x-2">
                <span>EST. 2011</span>
                <span className="text-[#444444]">•</span>
                <span>GAMPAHA, SRI LANKA</span>
              </span>

              <span className="inline-flex items-center space-x-1.5 font-mono-editorial text-[10px] uppercase tracking-widest bg-[#15231a] text-emerald-400 border border-[#23452f] px-2.5 py-1 rounded-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Open Today // 8 Bays Active</span>
              </span>
            </div>

            {/* Main Editorial Masthead Headline */}
            <h1 className="font-serif-editorial text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] text-[#F5F4EF] leading-[1.04] tracking-tight">
              Architecting Pure Cool. Elevating Every Journey.
            </h1>

            {/* Editorial Lead Paragraph */}
            <p className="font-serif-editorial text-xl sm:text-2xl text-[#DCD9D0] leading-relaxed max-w-2xl font-light">
              Gampaha&apos;s authoritative automotive climate engineering facility. From micro-leak detection to multi-stage compressor overhauls, we restore factory-standard sub-zero airflow for Japanese, European, and hybrid vehicles.
            </p>

            {/* Direct Primary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {/* Primary: Reserve Bay */}
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center space-x-3 font-mono-editorial text-xs uppercase tracking-[0.2em] bg-[#F5F4EF] text-[#121212] px-7 py-4 rounded-sm font-semibold hover:bg-white transition-all duration-200 shadow-xl hover:shadow-cyan-500/10 group cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#121212]" />
                <span>Book Diagnostic Bay</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#121212] group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Direct WhatsApp Callout */}
              <a
                href={businessInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2.5 font-mono-editorial text-xs uppercase tracking-wider text-[#F5F4EF] border border-[#23452f] bg-[#14231a] hover:bg-[#1a3023] px-6 py-4 rounded-sm transition-all duration-200 group"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>WhatsApp ({businessInfo.phone})</span>
              </a>

              {/* Direct Phone Call */}
              <a
                href={`tel:${businessInfo.phoneRaw}`}
                className="inline-flex items-center justify-center space-x-2 font-mono-editorial text-xs uppercase tracking-wider text-[#888888] hover:text-[#F5F4EF] border border-[#2e2e2e] hover:border-[#555555] px-5 py-4 rounded-sm transition-colors"
                title="Call Hotline"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden xl:inline">Call Hotline</span>
              </a>
            </div>

            {/* Google Rating Micro-Bar */}
            <div className="pt-2 flex items-center space-x-4 text-xs font-mono-editorial text-[#888888]">
              <div className="flex items-center space-x-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-[#F5F4EF]">{trustMetrics.rating} ★ Rating</span>
              <span className="text-[#555555]">•</span>
              <span className="text-[#888888]">{trustMetrics.reviewsCount} Google Verified Reviews</span>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Showcase with Floating Proof Badges */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Main Visual Image Card with Glowing Frame */}
            <div className="relative rounded-sm overflow-hidden border border-[#2e2e2e] bg-[#0c0c0c] shadow-2xl group">
              {/* Cockpit with ice-cold misty AC blast */}
              <div className="relative h-[380px] sm:h-[440px] lg:h-[500px] w-full overflow-hidden">
                <Image
                  src="/hero-car-cockpit.webp"
                  alt="Luxury vehicle climate control cockpit blowing ice-cold freezing mist"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 filter contrast-[1.05] brightness-95"
                />
                {/* Vignette gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/30" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#121212]/50 via-transparent to-transparent" />
              </div>

              {/* FLOATING BADGE 1: Live Tropical vs Sub-Zero Temperature Comparison */}
              <div className="absolute top-4 right-4 z-20 bg-[#121212]/95 backdrop-blur-md border border-[#2d2d2d] p-3 rounded-sm shadow-xl max-w-[200px]">
                <div className="flex items-center justify-between text-[10px] font-mono-editorial text-[#888888] pb-1.5 border-b border-[#222222] mb-2">
                  <span>OUTSIDE HEAT</span>
                  <span className="text-amber-400 font-bold flex items-center">
                    <Flame className="w-3 h-3 mr-0.5 text-amber-500" /> 34°C
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono-editorial">
                  <span className="text-cyan-300 font-semibold flex items-center">
                    <Snowflake className="w-3 h-3 mr-1 text-cyan-400 animate-pulse" /> CABIN VENT
                  </span>
                  <span className="text-cyan-400 font-bold text-sm">4.5°C</span>
                </div>
                <div className="mt-1 text-[9px] font-mono-editorial text-[#777777]">
                  Ice-Cold Guarantee
                </div>
              </div>

              {/* FLOATING BADGE 2: Real Verified Thermometer Photo Card */}
              <div className="absolute bottom-4 left-4 z-20 bg-[#141414]/95 backdrop-blur-md border border-[#333333] p-2.5 rounded-sm shadow-2xl flex items-center space-x-3 max-w-[260px]">
                <div className="relative w-12 h-12 flex-shrink-0 rounded-sm overflow-hidden border border-[#444444]">
                  <Image
                    src="/ac-temp-test.webp"
                    alt="Digital thermometer probe test showing 4.5°C"
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center space-x-1 text-[10px] font-mono-editorial text-cyan-400 font-semibold uppercase">
                    <ThermometerSnowflake className="w-3 h-3" />
                    <span>4.5°C Verified Test</span>
                  </div>
                  <p className="font-mono-editorial text-[9px] text-[#aaaaaa] leading-tight mt-0.5">
                    Real vent probe testing at Miriswatta workshop
                  </p>
                </div>
              </div>

              {/* FLOATING BADGE 3: Workshop Bay Reservation Status */}
              <div className="absolute bottom-4 right-4 z-20 hidden sm:block bg-[#16251b]/95 backdrop-blur-md border border-[#274f35] px-3 py-2 rounded-sm text-right">
                <span className="font-mono-editorial text-[9px] uppercase tracking-wider text-emerald-400 block font-semibold">
                  8 Bays Daily
                </span>
                <span className="font-mono-editorial text-[10px] text-[#F5F4EF] block">
                  Priority Intake
                </span>
              </div>
            </div>

            {/* Below-Image Sri Lankan Popular Vehicle Compatibility Tagline */}
            <div className="mt-3.5 p-3 rounded-sm bg-[#161616] border border-[#222222] flex items-center justify-between text-xs font-mono-editorial text-[#888888]">
              <span className="text-[#666666] uppercase text-[10px] tracking-wider">
                Certified For
              </span>
              <span className="text-[#bbbbbb] text-right text-[11px]">
                Premio • Vezel • Aqua • Axio • Prado • Benz • BMW • KDH
              </span>
            </div>
          </motion.div>
        </div>

        {/* Popular Sri Lankan Vehicles & Guarantee Strip */}
        <div className="mt-12 pt-8 border-t border-[#222222] grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-[#151515] border border-[#202020] rounded-sm hover:border-[#333333] transition-colors">
            <span className="font-serif-editorial text-2xl text-[#F5F4EF] block">Denso OEM</span>
            <span className="font-mono-editorial text-[10px] text-[#777777] uppercase">Factory Authorized Quality</span>
          </div>
          <div className="p-3 bg-[#151515] border border-[#202020] rounded-sm hover:border-cyan-500/40 transition-colors">
            <span className="font-serif-editorial text-2xl text-cyan-400 block">4.5°C Tested</span>
            <span className="font-mono-editorial text-[10px] text-[#777777] uppercase">Sub-Zero Digital Probe</span>
          </div>
          <div className="p-3 bg-[#151515] border border-[#202020] rounded-sm hover:border-emerald-500/40 transition-colors">
            <span className="font-serif-editorial text-2xl text-emerald-400 block">280 PSI Hold</span>
            <span className="font-mono-editorial text-[10px] text-[#777777] uppercase">Dry Nitrogen Leak Test</span>
          </div>
          <div className="p-3 bg-[#151515] border border-[#202020] rounded-sm hover:border-amber-500/40 transition-colors">
            <span className="font-serif-editorial text-2xl text-[#c5a059] block">15+ Years</span>
            <span className="font-mono-editorial text-[10px] text-[#777777] uppercase">Miriswatta, Gampaha</span>
          </div>
        </div>
      </div>
    </section>
  );
};
