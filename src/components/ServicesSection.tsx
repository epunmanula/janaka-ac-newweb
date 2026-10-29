'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { businessInfo, servicesData } from '@/data/janakaData';
import { SectionBlend } from '@/components/SectionBlend';

export const ServicesSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const rowRefs = useRef<(HTMLElement | null)[]>([]);
  const active = servicesData[activeIndex];

  // The service crossing the middle of the viewport drives the sticky photo
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveIndex(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    rowRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" aria-labelledby="services-title" className="relative isolate bg-cool py-24 text-navy-950 md:py-32">
      <SectionBlend from="var(--color-navy-950)" edge="top" />
      <SectionBlend from="var(--color-graphite)" edge="bottom" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="services-title"
          index="01"
          eyebrow="Services"
          title="Specialist care for every part of your car's A/C."
          intro="Air-conditioning is all we do. Each job starts by finding out why the system isn't cooling — then we repair what's actually at fault."
        />

        <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          {/* Sticky photograph (desktop) */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <figure>
                <div className="relative aspect-[4/5] w-full max-w-[440px] overflow-hidden bg-navy-900">
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={active.image + active.id}
                      initial={{ opacity: 0, scale: 1.06 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0"
                    >
                      <Image src={active.image} alt={active.imageAlt} fill sizes="440px" className="object-cover" />
                    </motion.div>
                  </AnimatePresence>
                  <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-950/70 to-transparent" />
                  <span className="absolute bottom-4 left-4 font-mono text-[11px] uppercase tracking-[0.18em] text-white">
                    {active.number} / {String(servicesData.length).padStart(2, '0')}
                  </span>
                </div>
                <figcaption className="mt-3 max-w-[440px] text-xs leading-relaxed text-steel">
                  From the Janaka Auto AC workshop — {active.imageAlt.charAt(0).toLowerCase() + active.imageAlt.slice(1)}.
                </figcaption>
              </figure>
            </div>
          </div>

          {/* Service list */}
          <ol className="lg:col-span-7">
            {servicesData.map((service, i) => {
              const isActive = i === activeIndex;
              return (
                <li
                  key={service.id}
                  id={`service-${service.id}`}
                  ref={(el) => {
                    rowRefs.current[i] = el;
                  }}
                  data-index={i}
                  onMouseEnter={() => setActiveIndex(i)}
                  className="border-t border-navy-950/12 last:border-b"
                >
                  <Reveal y={16} className="grid gap-5 py-9 sm:grid-cols-[4.5rem_1fr] sm:gap-6 md:py-11">
                    <span
                      className={`font-mono text-sm transition-colors duration-500 ${isActive ? 'text-ice-deep' : 'text-steel/70'}`}
                    >
                      {service.number}
                    </span>
                    <div>
                      <div className="relative mb-6 aspect-[4/3] overflow-hidden bg-navy-900 lg:hidden">
                        <Image src={service.image} alt={service.imageAlt} fill sizes="100vw" className="object-cover" />
                      </div>
                      <h3 className="font-wide text-2xl font-semibold leading-tight tracking-[-0.01em] sm:text-[1.75rem]">
                        {service.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-steel">{service.summary}</p>
                      <ul className="mt-5 grid gap-x-6 gap-y-2 text-sm text-navy-800 sm:grid-cols-2">
                        {service.details.map((d) => (
                          <li key={d} className="flex gap-3">
                            <span aria-hidden="true" className="mt-[0.6em] h-px w-3 shrink-0 bg-ice-deep" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>

        <Reveal className="mt-14 flex flex-col items-start justify-between gap-5 bg-navy-950 px-6 py-7 text-white sm:flex-row sm:items-center sm:px-10">
          <p className="max-w-xl text-base leading-relaxed text-silver">
            <span className="font-semibold text-white">Not sure what the problem is?</span> Describe the symptoms on
            WhatsApp and we&apos;ll advise on the next step.
          </p>
          <a
            href={`${businessInfo.whatsappUrl}?text=${encodeURIComponent("Hello Janaka Auto AC, I'd like advice about my car's A/C.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-2 rounded-[3px] border border-white/25 px-5 py-3 text-sm font-semibold transition-colors hover:border-ice hover:text-ice"
          >
            Ask on WhatsApp
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
};
