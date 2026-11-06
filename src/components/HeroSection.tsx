'use client';

import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Car } from '@/components/brand/Car';
import { InfoIcon } from '@/components/brand/InfoIcons';
import { INTRO_DURATION } from '@/components/IntroLoader';
import { businessHours, businessInfo } from '@/data/janakaData';
import { PhotoBackdrop } from '@/components/PhotoBackdrop';
import { AnimatedStripes } from '@/components/brand/AnimatedStripes';

/** Leader-line labels pinned to points on the car (percent of the car's 640×200 box). */
const annotations = [
  { label: 'Cabin air', x: 50, y: 22, lift: 50 },
  { label: 'Evaporator', x: 65.6, y: 42, lift: 85 },
  { label: 'Compressor', x: 77.5, y: 63, lift: 125 },
  // Right-aligned so the label hangs inward at the frame edge
  { label: 'Condenser', x: 85, y: 52, lift: 60, end: true },
];  

const ease = [0.16, 1, 0.3, 1] as const;

export const HeroSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  // Fast snappy entrance
  const start = reduceMotion ? 0.2 : 0.3;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // The car gently glides as the hero scrolls away (delayed start so it remains grounded and visible)
  const carX = useTransform(scrollYProgress, [0.35, 1], ['0%', reduceMotion ? '0%' : '35%']);
  const wheelRotate = useTransform(scrollYProgress, [0.35, 1], [0, reduceMotion ? 0 : 540]);
  const labelsOpacity = useTransform(scrollYProgress, [0.3, 0.7], [1, reduceMotion ? 1 : 0]);
  const copyY = useTransform(scrollYProgress, [0.3, 1], [0, reduceMotion ? 0 : -40]);

  return (
    <section
      id="home"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden bg-[#021824] text-white border-b border-[#126782]/35"
    >
      {/* Jitter-inspired precision animated stripes flow */}
      <AnimatedStripes variant="hero" opacity={0.88} />
      <PhotoBackdrop src="/backdrops/hero.webp" opacity={0.16} fade="left" base="#021824" />

      {/* Hero stage & content */}
      <div className="mx-auto flex flex-1 w-full max-w-7xl flex-col justify-center px-4 pt-[5rem] pb-8 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 py-6 sm:py-8 lg:grid-cols-12 lg:gap-8 lg:py-10">
          <motion.div style={{ y: copyY }} className="relative z-10 lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: start, ease }}
              className="flex flex-wrap items-center gap-3"
            >
              <p className="eyebrow flex items-center gap-3 text-[#219ebc] font-semibold">
                <span aria-hidden="true" className="h-px w-8 bg-[#219ebc]" />
                <span>Automotive A/C Specialists · Gampaha</span>
              </p>
            </motion.div>

            <motion.h1
              id="hero-title"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: start + 0.1, ease }}
              className="mt-6 font-wide text-[2.5rem] font-bold leading-[1.04] tracking-[-0.02em] text-balance text-white sm:text-6xl lg:text-[clamp(3rem,4.5vw,4.4rem)]"
            >
              Car A/C Specialists.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#8ecae6] via-[#219ebc] to-[#126782]">Diagnosed & Repaired Right.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: start + 0.2, ease }}
              className="mt-5 max-w-lg text-base leading-relaxed text-[#a2b8c2] sm:text-lg"
            >
              Car air-conditioning diagnosis, servicing and repairs in Gampaha — from a gas recharge to compressor,
              condenser and leak repairs. We find the cause, explain it clearly, and get your cabin cold again.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: start + 0.3, ease }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-3 rounded-md bg-gradient-to-r from-[#126782] via-[#219ebc] to-[#126782] bg-[length:200%_auto] px-7 py-4 text-sm font-semibold text-white shadow-xl shadow-[#021824]/80 transition-all duration-300 hover:bg-right hover:shadow-[#219ebc]/25 active:translate-y-px"
              >
                Book a Service
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-md border border-[#126782]/50 bg-[#023047]/60 backdrop-blur-md px-7 py-4 text-sm font-semibold text-[#8ecae6] shadow-sm transition-all duration-300 hover:border-[#219ebc] hover:bg-[#064261]/80 hover:text-white active:translate-y-px"
              >
                Explore Our Services
              </a>
            </motion.div>
          </motion.div>

          {/* Car stage */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.4, delay: start + 0.15, ease }}
            className="relative lg:col-span-6 w-full"
          >
            <motion.div style={{ x: carX }} className="relative w-full pt-4 sm:pt-10 lg:pt-12">
              <div className="relative mx-auto w-full max-w-[580px] lg:max-w-none">
                <motion.div style={{ opacity: labelsOpacity }} aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 hidden sm:block">
                  {annotations.map((a) => (
                    <div
                      key={a.label}
                      className={`absolute flex flex-col ${a.end ? 'items-end' : 'items-center'}`}
                      style={{ left: `${a.x}%`, top: `${a.y}%`, transform: `translate(${a.end ? 'calc(-100% + 4px)' : '-50%'}, calc(-100% + 4px))` }}
                    >
                      <span className="eyebrow whitespace-nowrap text-[10px] text-[#8ecae6] font-semibold">{a.label}</span>
                      <span className={`mt-1.5 w-px bg-gradient-to-b from-[#8ecae6] to-[#126782] ${a.end ? 'mr-[3.5px]' : ''}`} style={{ height: a.lift - 22 }} />
                      <span className="h-2 w-2 rounded-full border-2 border-[#219ebc] bg-[#021824]" />
                    </div>
                  ))}
                </motion.div>
                <Car className="relative w-full" wheelRotate={wheelRotate} airflow headlights />
              </div>
              {/* Floor reflection - hidden on mobile to avoid double SVG rendering */}
              <div aria-hidden="true" className="pointer-events-none -mt-[9%] h-24 scale-y-[-1] opacity-[0.14] [mask-image:linear-gradient(to_top,black,transparent_70%)] hidden sm:block">
                <Car className="w-full" title="" />
              </div>
            </motion.div>

            <div aria-hidden="true" className="absolute inset-x-[-20%] bottom-16 h-px bg-gradient-to-r from-transparent via-[#219ebc]/30 to-transparent" />
          </motion.div>
        </div>
      </div>

      {/* Verified business facts - Full-width docked bar */}
      <div className="relative z-20 w-full border-t border-[#126782]/35 bg-[#021824]/95 md:backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 divide-y divide-[#126782]/25 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
            {[
              { icon: 'pin' as const, label: 'Workshop', value: businessInfo.addressShort, hint: 'Get directions', href: businessInfo.googleMapsDirectionsUrl, external: true },
              { icon: 'clock' as const, label: `Open ${businessHours.openDaysShort}`, value: businessHours.hours, hint: businessHours.closed, href: '#contact' },
              { icon: 'phone' as const, label: 'Call or WhatsApp', value: businessInfo.phone, hint: 'Tap to call', href: `tel:${businessInfo.phoneRaw}` },
            ].map((fact) => (
              <a
                key={fact.label}
                href={fact.href}
                {...(fact.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex items-start gap-4 p-5 transition-all duration-300 hover:bg-[#064261]/35 sm:p-6"
              >
                <div className="shrink-0 mt-0.5">
                  <InfoIcon name={fact.icon} tone="dark" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#8ecae6]/70 leading-none">{fact.label}</span>
                  <span className="mt-1.5 block text-sm font-semibold text-white sm:text-[15px] group-hover:text-[#8ecae6] transition-colors leading-snug">{fact.value}</span>
                  <span className="mt-1 block text-xs text-[#219ebc] transition-colors leading-tight">{fact.hint}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
