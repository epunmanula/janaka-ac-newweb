'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Phone,
  Calendar,
  ArrowRight,
  ThermometerSnowflake,
  ShieldCheck,
  Star,
  Award,
  Zap,
  MessageCircle,
  MapPin,
  CheckCircle2,
  Flame,
  Snowflake,
} from 'lucide-react';
import { businessInfo, trustMetrics } from '@/data/janakaData';

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  const [isOpenNow, setIsOpenNow] = useState(true);

  // Compute live workshop status based on Sri Lanka Time (UTC+05:30)
  // Monday: Closed. Tue-Sun: 8:30 AM to 6:00 PM
  useEffect(() => {
    try {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const slDate = new Date(utc + 3600000 * 5.5);
      const day = slDate.getDay();
      const hour = slDate.getHours();
      const minute = slDate.getMinutes();
      const timeDecimal = hour + minute / 60;

      const isWorkshopHours = day !== 1 && timeDecimal >= 8.5 && timeDecimal < 18.0;
      setIsOpenNow(isWorkshopHours);
    } catch {
      setIsOpenNow(true);
    }
  }, []);

  return (
    <section className="relative w-full pt-12 pb-16 md:pt-16 md:pb-24 border-b border-[#222222] overflow-hidden bg-[#121212]">
      {/* Ambient background glow & cold mist lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/4 w-[650px] h-[550px] bg-gradient-to-br from-[#0066cc]/15 via-[#0e2740]/10 to-transparent blur-[120px] opacity-70" />
        <div className="absolute top-1/3 right-10 w-[500px] h-[450px] bg-gradient-to-bl from-[#c5a059]/10 via-transparent to-transparent blur-[100px] opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Metadata Strip with Sinhala Accent */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-6 mb-8 border-b border-[#222222]/80">
          <div className="inline-flex items-center space-x-2.5">
            <span className={`w-2 h-2 rounded-full ${isOpenNow ? 'bg-emerald-400' : 'bg-amber-400'} animate-pulse`} />
            <span className="font-mono-editorial text-xs uppercase tracking-widest text-[#aaaaaa]">
              {isOpenNow
                ? 'WORKSHOP ACTIVE // GAMPAHA INTAKE BAY OPEN'
                : 'WORKSHOP CLOSED // OPENS TUE–SUN AT 8:30 AM'}
            </span>
            <span className="text-[#444444] hidden sm:inline">•</span>
            <span className="text-[#888888] font-mono-editorial text-xs hidden sm:inline">
              366 Miriswatta Road, Gampaha
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-sans-editorial text-[11px] text-[#c5a059] bg-[#1a1814] border border-[#3d321d] px-2.5 py-0.5 rounded-sm">
              ජානක ඔටෝ ඒසී — ගම්පහ
            </span>
            <span className="font-mono-editorial text-[10px] text-[#777777] uppercase tracking-wider hidden md:inline">
              Est. 15+ Years
            </span>
          </div>
        </div>

        {/* 2-Column Hero Grid: Left Content, Right Visual Masterpiece */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headlines & Lankan Appeal */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Sinhala Tropical Heat Notice Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-sm bg-[#161d26] border border-[#1e344d] text-cyan-300 text-xs font-mono-editorial">
              <ThermometerSnowflake className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
              <span>BEAT SRI LANKA&apos;S 34°C HEAT → 4.5°C SUB-ZERO CHILL</span>
            </div>

            {/* Massive Headline */}
            <h1 className="font-serif-editorial text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.2rem] text-[#F5F4EF] leading-[0.96] tracking-tight font-normal">
              Keep Cool.{' '}
              <span className="italic block sm:inline font-serif-editorial text-[#F5F4EF] hover:text-white transition-colors">
                Drive Comfortable.
              </span>
            </h1>

            {/* Sinhala & English Description connecting with Lankan drivers */}
            <div className="space-y-3">
              <p className="font-serif-editorial text-xl sm:text-2xl text-[#E8E6DF] leading-relaxed">
                Architecting Pure Cool. Elevating Every Journey.
              </p>
              <p className="font-sans-editorial text-sm sm:text-base text-[#aaaaaa] leading-relaxed max-w-xl">
                ලංකාවේ දැඩි දහවල් රස්නයට ඔබේ වාහනයේ A/C එක මදිද? නියමිත පීඩනයට පිරිසිදු 100% Virgin ගෑස් පිරවීම, කොම්ප්‍රෙෂර් අලුත්වැඩියාව සහ 280 PSI නයිට්‍රජන් කාන්දු පරීක්ෂාව සමඟ අයිස් වගේ සීතලක් ලබාගන්න.
              </p>
              <p className="font-mono-editorial text-xs text-[#888888] leading-relaxed max-w-xl">
                Denso OEM precision diagnostics, variable displacement overhauls, and sub-zero 4.5°C vent output validation at 366 Miriswatta Road, Gampaha.
              </p>
            </div>

            {/* Lankan Driver Trust Value Grid (4 Key Highlights) */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono-editorial">
              <div className="p-3 rounded-sm bg-[#151515] border border-[#252525] flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[#F5F4EF] font-semibold block">100% Virgin R134a</span>
                  <span className="text-[10px] text-[#777777]">බාල හෝ ව්‍යාජ ගෑස් නැත</span>
                </div>
              </div>

              <div className="p-3 rounded-sm bg-[#151515] border border-[#252525] flex items-start space-x-2">
                <Zap className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[#F5F4EF] font-semibold block">Hybrid / EV POE Oil</span>
                  <span className="text-[10px] text-[#777777]">Prius, Vezel, Aqua, Leaf</span>
                </div>
              </div>

              <div className="p-3 rounded-sm bg-[#151515] border border-[#252525] flex items-start space-x-2">
                <Snowflake className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[#F5F4EF] font-semibold block">4.5°C Vent Guarantee</span>
                  <span className="text-[10px] text-[#777777]">ඩිජිටල් තර්මෝමීටර් පරීක්ෂාව</span>
                </div>
              </div>

              <div className="p-3 rounded-sm bg-[#151515] border border-[#252525] flex items-start space-x-2">
                <Award className="w-4 h-4 text-[#c5a059] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[#F5F4EF] font-semibold block">Same-Day Service</span>
                  <span className="text-[10px] text-[#777777]">එදිනම සාදා භාරදීම</span>
                </div>
              </div>
            </div>

            {/* Action Buttons: High-Contrast Primary & WhatsApp */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              {/* Primary: Inverted Cream */}
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center space-x-2 font-mono-editorial text-xs uppercase tracking-[0.2em] bg-[#F5F4EF] text-[#121212] px-7 py-4 rounded-sm font-semibold hover:bg-white hover:shadow-2xl transition-all duration-200 active:scale-[0.98]"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Bay</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>

              {/* WhatsApp Quick CTA in Rich Emerald */}
              <a
                href={businessInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2.5 font-mono-editorial text-xs uppercase tracking-[0.18em] bg-[#122e1e] hover:bg-[#183d28] text-emerald-300 border border-[#235834] px-6 py-4 rounded-sm font-semibold transition-all shadow-lg group"
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
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Main Visual Image Card with Glowing Frame */}
            <div className="relative rounded-sm overflow-hidden border border-[#2e2e2e] bg-[#0c0c0c] shadow-2xl group">
              {/* Cockpit with ice-cold misty AC blast */}
              <div className="relative h-[420px] sm:h-[480px] lg:h-[520px] w-full overflow-hidden">
                <Image
                  src="/hero-car-cockpit.jpg"
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

              {/* FLOATING BADGE 1: Live Tropical vs Sub-Zero Temperature Comparison (Top-Right) */}
              <div className="absolute top-4 right-4 z-20 bg-[#121212]/90 backdrop-blur-md border border-[#2d2d2d] p-3 rounded-sm shadow-xl max-w-[200px]">
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

              {/* FLOATING BADGE 2: Real Verified Thermometer Photo Card (Bottom-Left) */}
              <div className="absolute bottom-4 left-4 z-20 bg-[#141414]/95 backdrop-blur-md border border-[#333333] p-2.5 rounded-sm shadow-2xl flex items-center space-x-3 max-w-[260px]">
                <div className="relative w-12 h-12 flex-shrink-0 rounded-sm overflow-hidden border border-[#444444]">
                  <Image
                    src="/ac-temp-test.jpg"
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

              {/* FLOATING BADGE 3: Workshop Bay Reservation Status (Bottom-Right) */}
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
          <div className="p-3 bg-[#151515] border border-[#202020] rounded-sm">
            <span className="font-serif-editorial text-2xl text-[#F5F4EF] block">Denso OEM</span>
            <span className="font-mono-editorial text-[10px] text-[#777777] uppercase">Factory Authorized Quality</span>
          </div>
          <div className="p-3 bg-[#151515] border border-[#202020] rounded-sm">
            <span className="font-serif-editorial text-2xl text-cyan-400 block">4.5°C Tested</span>
            <span className="font-mono-editorial text-[10px] text-[#777777] uppercase">Sub-Zero Digital Probe</span>
          </div>
          <div className="p-3 bg-[#151515] border border-[#202020] rounded-sm">
            <span className="font-serif-editorial text-2xl text-emerald-400 block">280 PSI Hold</span>
            <span className="font-mono-editorial text-[10px] text-[#777777] uppercase">Dry Nitrogen Leak Test</span>
          </div>
          <div className="p-3 bg-[#151515] border border-[#202020] rounded-sm">
            <span className="font-serif-editorial text-2xl text-[#c5a059] block">15+ Years</span>
            <span className="font-mono-editorial text-[10px] text-[#777777] uppercase">Miriswatta, Gampaha</span>
          </div>
        </div>
      </div>
    </section>
  );
};
