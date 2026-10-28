'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Car } from '@/components/brand/Car';

/** Final scene of the scroll story: the car pulls into the workshop bay. */
export const ArrivalScene: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end 0.85'] });

  const carX = useTransform(scrollYProgress, [0, 0.85], reduceMotion ? ['0%', '0%'] : ['-100%', '0%']);
  const wheelRotate = useTransform(scrollYProgress, [0, 0.85], [0, reduceMotion ? 0 : 1100]);
  const lampOpacity = useTransform(scrollYProgress, [0.4, 0.9], reduceMotion ? [1, 1] : [0.25, 1]);
  const captionOpacity = useTransform(scrollYProgress, [0.8, 1], reduceMotion ? [1, 1] : [0, 1]);

  return (
    <div id="arrival" ref={ref} className="relative overflow-hidden bg-navy-950 text-white">
      <div aria-hidden="true" className="tech-grid absolute inset-0 opacity-60 [mask-image:linear-gradient(to_top,black,transparent)]" />
      <div className="relative mx-auto h-[260px] max-w-7xl sm:h-[340px] lg:h-[400px]">
        {/* Workshop bay */}
        <div aria-hidden="true" className="absolute bottom-10 right-4 top-10 w-[62%] sm:right-6 sm:w-[54%] lg:right-8">
          <div className="absolute inset-x-0 top-0 h-[3px] origin-left -skew-y-2 bg-silver/60" />
          <div className="absolute bottom-0 left-0 top-1 w-[3px] bg-silver/40" />
          <div className="absolute bottom-0 right-0 top-0 w-[3px] bg-silver/40" />
          <div className="absolute inset-x-[3px] bottom-0 top-1 bg-gradient-to-b from-navy-800/70 to-navy-900/30" />
          <motion.div style={{ opacity: lampOpacity }} className="absolute left-[58%] top-1 h-full w-[60%] -translate-x-1/2">
            <div className="mx-auto h-2 w-8 bg-silver/80" />
            <div className="mx-auto h-full w-full bg-[radial-gradient(ellipse_at_top,rgb(223_246_255/0.28),transparent_70%)] [clip-path:polygon(42%_0,58%_0,100%_100%,0_100%)]" />
          </motion.div>
          <div className="absolute -top-8 left-4 hidden w-[40%] max-w-[170px] sm:block">
            <div className="relative aspect-[900/166]">
              <Image src="/brand/logo-wide.webp" alt="" fill sizes="180px" className="object-contain" />
            </div>
          </div>
        </div>

        {/* Road */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-10 h-px bg-silver/30" />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-[34px] h-px bg-[repeating-linear-gradient(to_right,rgb(170_184_197/0.3)_0_14px,transparent_14px_30px)]"
        />

        {/* Car */}
        <motion.div style={{ x: carX }} className="absolute inset-x-0 bottom-[22px]">
          <div className="ml-[34%] w-[56%] sm:ml-[44%] sm:w-[46%] lg:ml-[48%] lg:w-[40%]">
            <Car className="w-full" wheelRotate={wheelRotate} headlights title="Illustrated car arriving at the Janaka Auto AC workshop" />
          </div>
        </motion.div>

        <motion.p
          style={{ opacity: captionOpacity }}
          className="absolute left-4 top-10 max-w-[13rem] font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-silver sm:left-6 sm:max-w-[14rem] lg:left-8"
        >
          <span className="text-ice">Destination</span>
          <br />
          366 Miriswatta Road, Gampaha
        </motion.p>
      </div>
    </div>
  );
};
