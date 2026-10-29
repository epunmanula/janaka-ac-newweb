'use client';

import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Car } from '@/components/brand/Car';
import { InfoIcon } from '@/components/brand/InfoIcons';
import { INTRO_DURATION } from '@/components/IntroLoader';
import { businessHours, businessInfo } from '@/data/janakaData';
import { PhotoBackdrop } from '@/components/PhotoBackdrop';

/** Leader-line labels pinned to points on the car (percent of the car's 640×200 box). */
const annotations = [
  { label: 'Cabin air', x: 56, y: 30, lift: 54 },
  { label: 'Evaporator', x: 72, y: 52, lift: 92 },
  { label: 'Compressor', x: 85.6, y: 67, lift: 128 },
  // Right-aligned so the label hangs inward at the frame edge
  { label: 'Condenser', x: 94.6, y: 61, lift: 60, end: true },
];

const ease = [0.16, 1, 0.3, 1] as const;

export const HeroSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  // Begin as the intro curtain lifts
  const start = reduceMotion ? 0.7 : INTRO_DURATION - 0.55;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // The car pulls away to the right as the hero scrolls out of view
  const carX = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '62%']);
  const wheelRotate = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 1080]);
  const labelsOpacity = useTransform(scrollYProgress, [0, 0.18], [1, reduceMotion ? 1 : 0]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -80]);

  return (
    <section
      id="home"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-gradient-to-b from-sky-50/70 via-white to-slate-50/50 text-slate-900 border-b border-slate-200/80"
    >
      {/* Studio lighting */}
      <PhotoBackdrop src="/backdrops/hero.webp" opacity={0.12} fade="left" />
      <div
        aria-hidden="true"
        className="absolute -right-40 -top-40 -z-10 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgb(2_132_199/0.08),transparent_65%)]"
      />

      <div className="mx-auto grid min-h-[100svh] max-w-7xl grid-rows-[1fr_auto] px-4 pt-[4.5rem] sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 py-12 lg:grid-cols-12 lg:gap-6 lg:py-16">
          <motion.div style={{ y: copyY }} className="relative z-10 lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: start, ease }}
              className="flex flex-wrap items-center gap-3"
            >
              <p className="eyebrow flex items-center gap-3 text-blue-600 font-semibold">
                <span aria-hidden="true" className="h-px w-8 bg-blue-600" />
                <span>Automotive A/C Specialists · Gampaha</span>
              </p>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-amber-800 font-semibold shadow-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span>Sub-Zero 4.5°C Standard</span>
              </span>
            </motion.div>

            <motion.h1
              id="hero-title"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: start + 0.1, ease }}
              className="mt-6 font-wide text-[2.6rem] font-bold leading-[1.02] tracking-[-0.02em] text-balance text-slate-950 sm:text-6xl lg:text-[clamp(3rem,4.6vw,4.5rem)]"
            >
              Precision Cooling.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600">Exceptional Comfort.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: start + 0.2, ease }}
              className="mt-6 max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg"
            >
              Car air-conditioning diagnosis, servicing and repairs in Gampaha — from a gas recharge to compressor,
              condenser and leak repairs. We find the cause, explain it clearly, and get your cabin cold again.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: start + 0.3, ease }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-3 rounded-[4px] bg-blue-600 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:bg-blue-700 hover:shadow-blue-600/35 active:translate-y-px"
              >
                Book a Service
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-[4px] border border-slate-300 bg-white px-7 py-4 text-sm font-semibold text-slate-800 shadow-sm transition-all duration-300 hover:border-blue-600 hover:text-blue-600 active:translate-y-px"
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
            className="relative lg:col-span-6"
          >
            <motion.div style={{ x: carX }} className="relative -mr-[12%] w-[112%] pt-16 sm:-mr-[4%] sm:w-[104%] lg:-mr-[4%] lg:w-[106%] lg:pt-24">
              <div className="relative">
                <motion.div style={{ opacity: labelsOpacity }} aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 hidden sm:block">
                  {annotations.map((a) => (
                    <div
                      key={a.label}
                      className={`absolute flex flex-col ${a.end ? 'items-end' : 'items-center'}`}
                      style={{ left: `${a.x}%`, top: `${a.y}%`, transform: `translate(${a.end ? 'calc(-100% + 4px)' : '-50%'}, calc(-100% + 4px))` }}
                    >
                      <span className="eyebrow whitespace-nowrap text-[10px] text-slate-600 font-semibold">{a.label}</span>
                      <span className={`mt-1.5 w-px bg-gradient-to-b from-slate-400 to-blue-600 ${a.end ? 'mr-[3.5px]' : ''}`} style={{ height: a.lift - 22 }} />
                      <span className="h-2 w-2 rounded-full border-2 border-blue-600 bg-white" />
                    </div>
                  ))}
                </motion.div>
                <Car className="relative w-full" wheelRotate={wheelRotate} airflow headlights />
              </div>
              {/* Floor reflection */}
              <div aria-hidden="true" className="pointer-events-none -mt-[9%] h-24 scale-y-[-1] opacity-[0.08] [mask-image:linear-gradient(to_top,black,transparent_70%)]">
                <Car className="w-full" wheelRotate={wheelRotate} title="" />
              </div>
            </motion.div>
            <div aria-hidden="true" className="absolute inset-x-[-20%] bottom-24 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
          </motion.div>
        </div>

        {/* Verified business facts */}
        <ul className="grid gap-px border-t border-slate-200 bg-white/80 sm:grid-cols-3">
          {[
            { icon: 'pin' as const, label: 'Workshop', value: businessInfo.addressShort, hint: 'Get directions', href: businessInfo.googleMapsDirectionsUrl, external: true },
            { icon: 'clock' as const, label: `Open ${businessHours.openDaysShort}`, value: businessHours.hours, hint: businessHours.closed, href: '#contact' },
            { icon: 'phone' as const, label: 'Call or WhatsApp', value: businessInfo.phone, hint: 'Tap to call', href: `tel:${businessInfo.phoneRaw}` },
          ].map((fact) => (
            <li key={fact.label}>
              <a
                href={fact.href}
                {...(fact.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex items-center gap-4 py-5 transition-colors duration-300 sm:px-5 sm:first:pl-0 hover:bg-sky-50/60"
              >
                <InfoIcon name={fact.icon} tone="light" />
                <span className="min-w-0">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">{fact.label}</span>
                  <span className="mt-1 block truncate text-[15px] font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{fact.value}</span>
                  <span className="mt-0.5 block text-xs text-blue-600 transition-colors">{fact.hint}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
};
