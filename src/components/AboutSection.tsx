'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Reveal } from '@/components/motion/Reveal';
import { businessHours, businessInfo } from '@/data/janakaData';

export const AboutSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const mainY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [40, -40]);
  const insetY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [90, -70]);

  return (
    <section id="about" ref={ref} aria-labelledby="about-title" className="overflow-hidden bg-white py-24 text-navy-950 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
        {/* Photographs */}
        <div className="relative lg:col-span-6">
          <motion.figure style={{ y: mainY }} className="relative w-[82%] max-w-[460px]">
            <div className="relative aspect-[3/4] overflow-hidden bg-mist">
              <Image
                src="/workshop-exterior.webp"
                alt="The Janaka Auto AC workshop building with its covered service bays, Gampaha"
                fill
                sizes="(max-width: 1024px) 82vw, 460px"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-steel">
              The workshop · {businessInfo.addressShort}
            </figcaption>
          </motion.figure>
          <motion.div
            style={{ y: insetY }}
            className="absolute bottom-6 right-0 w-[46%] max-w-[260px] border-[6px] border-white shadow-[0_30px_60px_-30px_rgb(7_21_34/0.45)] sm:bottom-12"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-mist">
              <Image
                src="/workshop-vehicles.webp"
                alt="Customer cars in the covered service bays"
                fill
                sizes="260px"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Story */}
        <div className="flex flex-col justify-center lg:col-span-6 lg:pl-8">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-ice-deep">
              <span>03</span>
              <span aria-hidden="true" className="h-px w-8 bg-ice-deep" />
              <span>About the garage</span>
            </p>
            <h2 id="about-title" className="mt-5 font-wide text-[2rem] font-bold leading-[1.06] tracking-[-0.02em] text-balance sm:text-[2.6rem] lg:text-5xl">
              A dedicated car A/C workshop in Gampaha.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-8 space-y-5 text-[17px] leading-relaxed text-steel">
            <p>
              {businessInfo.name} is an automotive air-conditioning workshop on the Minuwangoda–Gampaha–Miriswatta
              Road. Car A/C is our speciality — not a sideline to general repairs.
            </p>
            <p>
              Cars, SUVs and vans come to us for everything from a gas recharge to compressor and condenser work. Our
              approach is simple: find the cause first, explain it in plain terms, then carry out the repair.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <dl className="mt-10 grid grid-cols-2 border-t border-navy-950/12">
              <div className="border-r border-navy-950/12 py-5 pr-4">
                <dt className="eyebrow text-[10px] text-steel">Opening hours</dt>
                <dd className="mt-2 text-sm font-semibold">
                  {businessHours.openDays}
                  <span className="block font-normal text-steel">{businessHours.hours}</span>
                </dd>
              </div>
              <div className="py-5 pl-5">
                <dt className="eyebrow text-[10px] text-steel">Find us</dt>
                <dd className="mt-2 text-sm font-semibold">
                  Miriswatta, Gampaha
                  <a
                    href={businessInfo.googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block font-normal text-ice-deep underline decoration-ice-deep/30 underline-offset-4 transition-colors hover:decoration-ice-deep"
                  >
                    Get directions
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
