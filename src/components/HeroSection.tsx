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
      className="relative isolate overflow-hidden bg-navy-950 text-white"
    >
      {/* Studio lighting */}
      <PhotoBackdrop src="/backdrops/hero.webp" opacity={0.42} fade="left" />
      <div
        aria-hidden="true"
        className="absolute -right-40 -top-40 -z-10 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgb(53_200_244/0.16),transparent_62%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-[linear-gradient(to_bottom,transparent,rgb(16_42_67/0.55))]"
      />

      <div className="mx-auto grid min-h-[100svh] max-w-7xl grid-rows-[1fr_auto] px-4 pt-[4.5rem] sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 py-12 lg:grid-cols-12 lg:gap-6 lg:py-16">
          <motion.div style={{ y: copyY }} className="relative z-10 lg:col-span-6">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: start, ease }}
              className="eyebrow flex items-center gap-3 text-ice"
            >
              <span aria-hidden="true" className="h-px w-8 bg-ice" />
              Automotive A/C Specialists · Gampaha
            </motion.p>

            <motion.h1
              id="hero-title"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: start + 0.1, ease }}
              className="mt-6 font-wide text-[2.6rem] font-bold leading-[1.02] tracking-[-0.02em] text-balance sm:text-6xl lg:text-[clamp(3rem,4.6vw,4.5rem)]"
            >
              Precision Cooling.
              <span className="block text-silver">Exceptional Comfort.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: start + 0.2, ease }}
              className="mt-6 max-w-lg text-base leading-relaxed text-silver sm:text-lg"
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
                className="group inline-flex items-center justify-center gap-3 rounded-[3px] bg-ice px-7 py-4 text-sm font-semibold text-navy-950 transition-colors duration-300 hover:bg-white active:translate-y-px"
              >
                Book a Service
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-[3px] border border-white/20 px-7 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:border-white/60 active:translate-y-px"
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
                      <span className="eyebrow whitespace-nowrap text-[10px] text-silver">{a.label}</span>
                      <span className={`mt-1.5 w-px bg-gradient-to-b from-silver/60 to-ice ${a.end ? 'mr-[3.5px]' : ''}`} style={{ height: a.lift - 22 }} />
                      <span className="h-2 w-2 rounded-full border border-ice bg-navy-950" />
                    </div>
                  ))}
                </motion.div>
                <Car className="relative w-full" wheelRotate={wheelRotate} airflow headlights />
              </div>
              {/* Floor reflection */}
              <div aria-hidden="true" className="pointer-events-none -mt-[9%] h-24 scale-y-[-1] opacity-[0.14] [mask-image:linear-gradient(to_top,black,transparent_70%)]">
                <Car className="w-full" wheelRotate={wheelRotate} title="" />
              </div>
            </motion.div>
            <div aria-hidden="true" className="absolute inset-x-[-20%] bottom-24 h-px bg-gradient-to-r from-transparent via-silver/30 to-transparent" />
          </motion.div>
        </div>

        {/* Verified business facts */}
        <ul className="grid gap-px border-t border-white/10 sm:grid-cols-3">
          {[
            { icon: 'pin' as const, label: 'Workshop', value: businessInfo.addressShort, hint: 'Get directions', href: businessInfo.googleMapsDirectionsUrl, external: true },
            { icon: 'clock' as const, label: `Open ${businessHours.openDaysShort}`, value: businessHours.hours, hint: businessHours.closed, href: '#contact' },
            { icon: 'phone' as const, label: 'Call or WhatsApp', value: businessInfo.phone, hint: 'Tap to call', href: `tel:${businessInfo.phoneRaw}` },
          ].map((fact) => (
            <li key={fact.label}>
              <a
                href={fact.href}
                {...(fact.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex items-center gap-4 py-5 transition-colors duration-300 sm:px-5 sm:first:pl-0"
              >
                <InfoIcon name={fact.icon} />
                <span className="min-w-0">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-silver/75">{fact.label}</span>
                  <span className="mt-1 block truncate text-[15px] font-semibold text-white">{fact.value}</span>
                  <span className="mt-0.5 block text-xs text-silver/70 transition-colors group-hover:text-ice">{fact.hint}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
};
