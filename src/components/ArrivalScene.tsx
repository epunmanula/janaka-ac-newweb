'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { easeOut, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Car } from '@/components/brand/Car';
import { PhotoBackdrop } from '@/components/PhotoBackdrop';

/** Final scene of the scroll journey: the car smoothly coasts into the covered Janaka service bay. */
export const ArrivalScene: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  // Smooth speed-ramping deceleration as the car rolls into the workshop spotlight
  const carX = useTransform(
    scrollYProgress,
    [0.1, 0.85],
    reduceMotion ? ['0%', '0%'] : ['-55%', '0%'],
    { ease: easeOut }
  );
  const wheelRotate = useTransform(
    scrollYProgress,
    [0.1, 0.85],
    [0, reduceMotion ? 0 : 420],
    { ease: easeOut }
  );
  const lampOpacity = useTransform(scrollYProgress, [0.35, 0.8], reduceMotion ? [1, 1] : [0.2, 1]);
  const captionOpacity = useTransform(scrollYProgress, [0.65, 0.88], reduceMotion ? [1, 1] : [0, 1]);

  return (
    <div id="arrival" ref={ref} className="relative isolate overflow-hidden bg-[#021824] text-white border-b border-[#144B66]/40">
      <PhotoBackdrop src="/backdrops/arrival.webp" opacity={0.25} fade="left" />

      <div className="relative mx-auto h-[260px] max-w-7xl sm:h-[340px] lg:h-[400px]">
        {/* Covered Service Bay Architecture */}
        <div aria-hidden="true" className="absolute bottom-10 right-4 top-10 w-[62%] sm:right-6 sm:w-[54%] lg:right-8">
          {/* Slanted Roof Beam */}
          <div className="absolute inset-x-0 top-0 h-[2.5px] origin-left -skew-y-2 bg-[#64748B]/60" />
          <div className="absolute bottom-0 left-0 top-1 w-[2px] bg-[#64748B]/40" />
          <div className="absolute bottom-0 right-0 top-0 w-[2px] bg-[#64748B]/40" />
          <div className="absolute inset-x-[2px] bottom-0 top-1 bg-gradient-to-b from-[#032332]/80 to-[#021824]/40" />

          {/* Architectural Overhead LED Bay Fixture */}
          <motion.div style={{ opacity: lampOpacity }} className="absolute left-[58%] top-1 h-full w-[60%] -translate-x-1/2">
            <div className="mx-auto h-2 w-10 rounded-sm bg-[#94A3B8] shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
            <div className="mx-auto h-full w-full bg-[radial-gradient(ellipse_at_top,rgba(224,242,254,0.22),transparent_72%)] [clip-path:polygon(40%_0,60%_0,100%_100%,0_100%)]" />
          </motion.div>

          {/* Workshop Signage */}
          <div className="absolute left-6 top-6 hidden w-[42%] max-w-[190px] sm:block">
            <div className="relative aspect-[5.5/1]">
              <Image
                src="/brand/logo-navbar.webp"
                alt="Janaka Auto AC Workshop Sign"
                fill
                sizes="190px"
                className="object-contain filter drop-shadow-[0_2px_10px_rgba(56,189,248,0.4)]"
              />
            </div>
          </div>
        </div>

        {/* Workshop tarmac line */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-10 h-px bg-[#334155]/60" />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-[34px] h-px bg-[repeating-linear-gradient(to_right,rgba(100,116,139,0.3)_0_14px,transparent_14px_30px)]"
        />

        {/* Car gliding into bay */}
        <motion.div style={{ x: carX }} className="absolute inset-x-0 bottom-[22px]">
          <div className="ml-[34%] w-[56%] sm:ml-[44%] sm:w-[46%] lg:ml-[48%] lg:w-[40%]">
            <Car
              className="w-full"
              wheelRotate={wheelRotate}
              title="Illustrated sports car arriving at the Janaka Auto AC workshop"
            />
          </div>
        </motion.div>

        {/* Destination callout */}
        <motion.div
          style={{ opacity: captionOpacity }}
          className="absolute left-4 top-10 max-w-[14rem] font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-[#8FAEC0] sm:left-6 sm:max-w-[16rem] lg:left-8"
        >
          <span className="text-[#38BDF8] font-bold">Service Destination</span>
          <br />
          <span className="text-white">366 Miriswatta Road, Gampaha</span>
        </motion.div>
      </div>
    </div>
  );
};
