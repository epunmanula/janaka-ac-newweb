'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { businessHours, businessInfo } from '@/data/janakaData';
import { Award, ArrowUpRight, Clock, MapPin } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const mainY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [35, -35]);
  const insetY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [75, -55]);

  return (
    <section
      id="about"
      ref={ref}
      aria-labelledby="about-title"
      className="relative isolate overflow-hidden bg-gradient-to-b from-[#021824] via-[#032332] to-[#021824] py-24 text-white border-b border-[#144B66]/40 md:py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8 items-center">
        {/* Genuine Workshop Photographs */}
        <div className="relative lg:col-span-6">
          <motion.figure style={{ y: mainY }} className="relative w-[84%] max-w-[460px]">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-[#144B66] bg-[#052436] shadow-2xl">
              <Image
                src="/workshop-exterior.webp"
                alt="Janaka Auto AC workshop facility with covered service bays in Gampaha"
                fill
                sizes="(max-width: 1024px) 84vw, 460px"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#8FAEC0]">
              Workshop Facility · {businessInfo.addressShort}
            </figcaption>
          </motion.figure>

          {/* Secondary Inset Workshop Photo */}
          <motion.div
            style={{ y: insetY }}
            className="absolute bottom-6 right-0 w-[48%] max-w-[260px] overflow-hidden rounded-2xl border-[3px] border-[#144B66] shadow-[0_20px_50px_rgba(2,24,36,0.8)] bg-[#052436] sm:bottom-10"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/workshop-vehicles.webp"
                alt="Vehicles being serviced under covered workshop bays"
                fill
                sizes="260px"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Workshop Credibility & Heritage */}
        <div className="flex flex-col justify-center lg:col-span-6 lg:pl-6">
          <SectionHeading
            id="about-title"
            index="03"
            eyebrow="The Specialist Workshop"
            title="A Dedicated Car A/C Specialist in Gampaha"
            tone="dark"
          />

          <Reveal delay={0.1} className="mt-8 space-y-4 text-base leading-relaxed text-[#A2B8C2]">
            <p>
              {businessInfo.name} is an automotive air-conditioning workshop situated on the Minuwangoda–Gampaha–Miriswatta Road. Vehicle climate control is our full-time focus — not a sideline to general mechanical servicing.
            </p>
            <p>
              Passenger sedans, SUVs, and commercial vans come to our covered service bays for everything from precision gas recharges to compressor overhauls and electronic leak detection. Our approach is grounded in craft: diagnose the root failure first, explain it clearly to you, and execute the repair with durable components.
            </p>
          </Reveal>

          <Reveal delay={0.2} className="mt-8">
            <dl className="grid grid-cols-2 border-t border-[#144B66]/30">
              <div className="border-r border-[#144B66]/30 py-5 pr-4">
                <dt className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#8FAEC0]">
                  <Clock className="h-3 w-3 text-[#38BDF8]" />
                  <span>Opening Hours</span>
                </dt>
                <dd className="mt-1.5 text-sm font-semibold text-white">
                  {businessHours.openDays}
                  <span className="block font-normal text-xs text-[#8FAEC0]">{businessHours.hours}</span>
                  <span className="block font-semibold text-xs text-[#F59E0B] mt-0.5">{businessHours.closed}</span>
                </dd>
              </div>

              <div className="py-5 pl-5">
                <dt className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#8FAEC0]">
                  <MapPin className="h-3 w-3 text-[#38BDF8]" />
                  <span>Workshop Location</span>
                </dt>
                <dd className="mt-1.5 text-sm font-semibold text-white">
                  Miriswatta, Gampaha
                  <a
                    href={businessInfo.googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-[#38BDF8] hover:text-[#CDE6F5] hover:underline"
                  >
                    <span>Google Maps Directions</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </dd>
              </div>
            </dl>

            {/* Prestigious Experience Badge (Replaces cheesy yellow star) */}
            <div className="mt-6 flex items-center gap-3.5 rounded-xl border border-[#D97706]/40 bg-gradient-to-r from-[#D97706]/15 via-[#052436] to-[#052436] p-4 text-xs shadow-md">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#D97706]/20 border border-[#D97706]/50 text-[#F59E0B]">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">
                  15+ Years Specialized Automotive Climate Experience
                </p>
                <p className="text-xs text-[#A2B8C2]">
                  Dedicated service bays on Minuwangoda–Gampaha–Miriswatta Road
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
