'use client';

import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Car } from '@/components/brand/Car';
import { InfoIcon } from '@/components/brand/InfoIcons';
import { businessHours, businessInfo } from '@/data/janakaData';
import { PhotoBackdrop } from '@/components/PhotoBackdrop';
import { AnimatedStripes } from '@/components/brand/AnimatedStripes';

/** Precision technical annotations pinned to automotive climate subsystems */
const annotations = [
  { label: 'CABIN AIR FLOW', sub: 'Chilled Vent Delivery', x: 50, y: 22, lift: 56 },
  { label: 'EVAPORATOR CORE', sub: 'Sub-Dash Absorption', x: 65.6, y: 42, lift: 90 },
  { label: 'COMPRESSOR UNIT', sub: 'High-Side Displacement', x: 77.5, y: 63, lift: 128 },
  { label: 'CONDENSER RAD', sub: 'Front Heat Rejection', x: 85, y: 52, lift: 64, end: true },
];

const ease = [0.16, 1, 0.3, 1] as const;

export const HeroSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const start = reduceMotion ? 0.15 : 0.25;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // Dynamic, speed-ramped launch as the car accelerates and drives off as soon as scrolling starts
  const carX = useTransform(
    scrollYProgress,
    [0, 0.85],
    ['0%', '115%'],
    { ease: (t) => Math.pow(t, 1.6) } // smooth progressive acceleration curve
  );
  const wheelRotate = useTransform(
    scrollYProgress,
    [0, 0.85],
    [0, 1800],
    { ease: (t) => Math.pow(t, 1.4) }
  );
  const labelsOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const copyY = useTransform(scrollYProgress, [0, 0.85], [0, -50]);

  return (
    <section
      id="home"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden bg-[#021824] text-white border-b border-[#126782]/35"
    >
      {/* Precision atmospheric wind-tunnel streamlines */}
      <AnimatedStripes variant="hero" opacity={0.65} />
      <PhotoBackdrop src="/backdrops/hero.webp" opacity={0.14} fade="left" base="#021824" />

      {/* Main hero stage & typography */}
      <div className="mx-auto flex flex-1 w-full max-w-7xl flex-col justify-center px-4 pt-[5.5rem] pb-8 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 py-6 sm:py-8 lg:grid-cols-12 lg:gap-8 lg:py-10">
          {/* Left Column: Authoritative Editorial Copy */}
          <motion.div style={{ y: copyY }} className="relative z-10 lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: start, ease }}
              className="flex flex-wrap items-center gap-3"
            >
              <div className="inline-flex items-center gap-2.5 rounded-full border border-[#17465E] bg-[#032333]/80 px-4 py-1.5 backdrop-blur-md shadow-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#93C5FD]">
                  Automotive Climate Engineering · Gampaha
                </span>
              </div>
            </motion.div>

            <motion.h1
              id="hero-title"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: start + 0.1, ease }}
              className="mt-6 font-wide text-[2.75rem] font-bold leading-[1.03] tracking-[-0.03em] text-balance text-white sm:text-6xl lg:text-[clamp(3.1rem,4.6vw,4.5rem)]"
            >
              Car A/C Specialists.
              <span className="block text-[#CDE6F5] font-medium tracking-[-0.02em]">
                Diagnosed & Repaired Right.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: start + 0.2, ease }}
              className="mt-5 max-w-xl text-base leading-relaxed text-[#A2B8C2] sm:text-lg"
            >
              Automotive air-conditioning diagnosis, gas recharging, and precision mechanical repairs in Gampaha.
              From compressor overhauls and electronic leak detection to complete climate restoration — we identify the true root cause before turning a single bolt.
            </motion.p>

            {/* CTAs & Trust Seals */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: start + 0.3, ease }}
              className="mt-8 flex flex-col gap-3.5 sm:flex-row"
            >
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#126782] via-[#1B7796] to-[#126782] px-7 py-4 text-sm font-semibold text-white shadow-xl shadow-[#021824]/80 border border-[#2586A3]/40 transition-all duration-300 hover:brightness-110 active:translate-y-px"
              >
                <span>Book Service Inspection</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-xl border border-[#17465E] bg-[#032333]/70 backdrop-blur-md px-7 py-4 text-sm font-semibold text-[#CDE6F5] shadow-xs transition-all duration-300 hover:border-[#38BDF8]/60 hover:bg-[#06354B]/80 hover:text-white active:translate-y-px"
              >
                Explore Services Catalogue
              </a>
            </motion.div>

            {/* Trust highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: start + 0.4 }}
              className="mt-8 flex flex-wrap items-center gap-6 pt-6 border-t border-[#126782]/25 text-xs text-[#8FAEC0]"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#38BDF8]" />
                15+ Years Specialized Craft
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                Open 6 Days (Tue – Sun)
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />
                Miriswatta Road, Gampaha
              </span>
            </motion.div>
          </motion.div>

          {/* Right Column: Grounded Luxury Car Stage */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: start + 0.15, ease }}
            className="relative lg:col-span-6 w-full"
          >
            <motion.div style={{ x: carX }} className="relative w-full pt-4 sm:pt-10 lg:pt-12">
              <div className="relative mx-auto w-full max-w-[580px] lg:max-w-none">
                {/* Precision HUD Callout Pins */}
                <motion.div style={{ opacity: labelsOpacity }} aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 hidden sm:block">
                  {annotations.map((a) => (
                    <div
                      key={a.label}
                      className={`absolute flex flex-col ${a.end ? 'items-end' : 'items-center'}`}
                      style={{
                        left: `${a.x}%`,
                        top: `${a.y}%`,
                        transform: `translate(${a.end ? 'calc(-100% + 4px)' : '-50%'}, calc(-100% + 4px))`,
                      }}
                    >
                      <div className="rounded-md border border-[#17465E] bg-[#021824]/90 px-2.5 py-1 backdrop-blur-md shadow-lg">
                        <span className="block font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-[#CDE6F5]">
                          {a.label}
                        </span>
                        <span className="block text-[8px] text-[#8FAEC0] leading-none mt-0.5">
                          {a.sub}
                        </span>
                      </div>
                      <span
                        className={`mt-1.5 w-px bg-gradient-to-b from-[#38BDF8] via-[#126782] to-transparent ${a.end ? 'mr-[3.5px]' : ''}`}
                        style={{ height: a.lift - 26 }}
                      />
                      <span className="h-2 w-2 rounded-full border-2 border-[#38BDF8] bg-[#021824] shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
                    </div>
                  ))}
                </motion.div>

                {/* Main Luxury Car */}
                <Car className="relative w-full" wheelRotate={wheelRotate} airflow headlights />
              </div>

              {/* Showroom Specular Floor Reflection */}
              <div
                aria-hidden="true"
                className="pointer-events-none -mt-[9%] h-24 scale-y-[-1] opacity-[0.14] [mask-image:linear-gradient(to_top,black,transparent_75%)] hidden sm:block"
              >
                <Car className="w-full" wheelRotate={wheelRotate} title="" />
              </div>
            </motion.div>

            {/* Stage Horizon Laser Line */}
            <div aria-hidden="true" className="absolute inset-x-[-15%] bottom-16 h-px bg-gradient-to-r from-transparent via-[#219EBC]/30 to-transparent" />
          </motion.div>
        </div>
      </div>

      {/* Verified Business Facts Dock — Full Width Edge-to-Edge */}
      <div className="relative z-20 w-full border-t border-[#126782]/35 bg-[#021824]/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 divide-y divide-[#126782]/25 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
            {[
              {
                icon: 'pin' as const,
                label: 'Workshop Facility',
                value: businessInfo.addressShort,
                hint: 'Get Google Maps directions',
                href: businessInfo.googleMapsDirectionsUrl,
                external: true,
              },
              {
                icon: 'clock' as const,
                label: `Service Hours · ${businessHours.openDaysShort}`,
                value: businessHours.hours,
                hint: businessHours.closed,
                href: '#contact',
              },
              {
                icon: 'phone' as const,
                label: 'Direct Workshop Call',
                value: businessInfo.phone,
                hint: 'Tap for immediate assistance',
                href: `tel:${businessInfo.phoneRaw}`,
              },
            ].map((fact) => (
              <a
                key={fact.label}
                href={fact.href}
                {...(fact.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex items-start gap-4 p-5 transition-all duration-300 hover:bg-[#064261]/40 sm:p-6"
              >
                <div className="shrink-0 mt-0.5">
                  <InfoIcon name={fact.icon} tone="dark" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#8ECAE6]/75 leading-none">
                    {fact.label}
                  </span>
                  <span className="mt-1.5 block text-sm font-semibold text-white sm:text-[15px] group-hover:text-[#8ECAE6] transition-colors leading-snug">
                    {fact.value}
                  </span>
                  <span className="mt-1 block text-xs text-[#38BDF8] transition-colors leading-tight">
                    {fact.hint}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
