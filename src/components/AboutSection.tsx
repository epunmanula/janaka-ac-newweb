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
    <section id="about" ref={ref} aria-labelledby="about-title" className="relative isolate overflow-hidden bg-gradient-to-b from-[#021926] via-[#032533] to-[#021c29] py-24 text-white border-b border-[#126782]/30 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
        {/* Photographs */}
        <div className="relative lg:col-span-6">
          <motion.figure style={{ y: mainY }} className="relative w-[82%] max-w-[460px]">
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-[#126782]/40 bg-[#023047] shadow-2xl shadow-black/50">
              <Image
                src="/workshop-exterior.webp"
                alt="The Janaka Auto AC workshop building with its covered service bays, Gampaha"
                fill
                sizes="(max-width: 1024px) 82vw, 460px"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[#8faec0]">
              The workshop · {businessInfo.addressShort}
            </figcaption>
          </motion.figure>
          <motion.div
            style={{ y: insetY }}
            className="absolute bottom-6 right-0 w-[46%] max-w-[260px] overflow-hidden rounded-xl border-[4px] border-[#219ebc]/50 shadow-[0_20px_50px_rgba(2,24,36,0.6)] bg-[#023047] sm:bottom-12"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-slate-900">
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
            <p className="eyebrow flex items-center gap-3 text-[#219ebc] font-semibold">
              <span>03</span>
              <span aria-hidden="true" className="h-px w-8 bg-[#219ebc]" />
              <span>About the garage</span>
            </p>
            <h2 id="about-title" className="mt-5 font-wide text-[2rem] font-bold leading-[1.06] tracking-[-0.02em] text-balance text-white sm:text-[2.6rem] lg:text-5xl">
              A dedicated car A/C workshop in Gampaha.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-8 space-y-5 text-[17px] leading-relaxed text-[#a2b8c2]">
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
            <dl className="mt-10 grid grid-cols-2 border-t border-[#126782]/25">
              <div className="border-r border-[#126782]/25 py-5 pr-4">
                <dt className="eyebrow text-[10px] text-[#8faec0] font-semibold">Opening hours</dt>
                <dd className="mt-2 text-sm font-semibold text-white">
                  {businessHours.openDays}
                  <span className="block font-normal text-[#8faec0]">{businessHours.hours}</span>
                </dd>
              </div>
              <div className="py-5 pl-5">
                <dt className="eyebrow text-[10px] text-[#8faec0] font-semibold">Find us</dt>
                <dd className="mt-2 text-sm font-semibold text-white">
                  Miriswatta, Gampaha
                  <a
                    href={businessInfo.googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block font-medium text-[#219ebc] underline decoration-[#219ebc]/30 underline-offset-4 transition-colors hover:decoration-[#8ecae6] hover:text-[#8ecae6]"
                  >
                    Get directions
                  </a>
                </dd>
              </div>
            </dl>
            <div className="mt-6 flex items-center gap-3 rounded-lg border border-[#fb8500]/50 bg-[#fb8500]/12 px-4 py-3 text-xs shadow-xs">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#fb8500] font-bold text-[10px] text-white">★</span>
              <p className="font-semibold text-white">
                15+ Years Specialized Automotive A/C Experience <span className="font-normal text-[#a2b8c2]">· Miriswatta Road, Gampaha</span>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
