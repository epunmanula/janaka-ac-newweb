'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, MessageCircle } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { businessInfo, servicesData } from '@/data/janakaData';

export const ServicesSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const rowRefs = useRef<(HTMLElement | null)[]>([]);
  const active = servicesData[activeIndex];

  // The service crossing the middle of the viewport drives the sticky photo
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveIndex(Number((entry.target as HTMLElement).dataset.index));
          }
        }
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    rowRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="relative isolate overflow-hidden bg-gradient-to-b from-[#021824] via-[#032332] to-[#021824] py-24 text-white md:py-32 border-b border-[#144B66]/40"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="services-title"
          index="01"
          eyebrow="Specialist Service Portfolio"
          title="Engineered Care for Every Car A/C Component"
          intro="Automotive climate control is our singular craft. Every repair begins with electronic diagnostics and pressure verification — then we service what is genuinely at fault."
          tone="dark"
        />

        <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          {/* Sticky photograph (desktop) */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <figure>
                <div className="relative aspect-[4/5] w-full max-w-[440px] overflow-hidden rounded-2xl border border-[#144B66] bg-[#052436] shadow-[0_20px_50px_rgba(2,24,36,0.8)]">
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={active.image + active.id}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={active.image}
                        alt={active.imageAlt}
                        fill
                        sizes="440px"
                        className="object-cover"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Elegant bottom gradient caption shelf */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#021824]/95 via-[#021824]/60 to-transparent"
                  />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="rounded-md border border-[#144B66] bg-[#031B29]/90 px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#CDE6F5] backdrop-blur-md">
                      Service {active.number} / {String(servicesData.length).padStart(2, '0')}
                    </span>
                    <span className="font-mono text-[10px] text-[#8FAEC0] uppercase">
                      Janaka Workshop
                    </span>
                  </div>
                </div>

                <figcaption className="mt-3.5 max-w-[440px] text-xs leading-relaxed text-[#8FAEC0]">
                  Genuine workshop photography — {active.imageAlt.charAt(0).toLowerCase() + active.imageAlt.slice(1)}.
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
                  className={`border-t border-[#144B66]/30 last:border-b transition-colors duration-300 ${
                    isActive ? 'bg-[#052436]/40' : ''
                  }`}
                >
                  <Reveal y={14} className="grid gap-5 py-8 sm:grid-cols-[4rem_1fr] sm:gap-6 md:py-10 px-2 sm:px-4 rounded-xl">
                    <span
                      className={`font-mono text-sm transition-colors duration-300 ${
                        isActive ? 'text-[#38BDF8] font-bold' : 'text-[#6B8896]'
                      }`}
                    >
                      {service.number}
                    </span>

                    <div>
                      {/* Mobile image preview */}
                      <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-xl border border-[#144B66] bg-[#052436] lg:hidden shadow-md">
                        <Image
                          src={service.image}
                          alt={service.imageAlt}
                          fill
                          sizes="100vw"
                          className="object-cover"
                        />
                      </div>

                      <h3
                        className={`font-wide text-2xl font-semibold leading-tight tracking-[-0.015em] transition-colors sm:text-[1.75rem] ${
                          isActive ? 'text-[#CDE6F5]' : 'text-white'
                        }`}
                      >
                        {service.title}
                      </h3>

                      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#A2B8C2]">
                        {service.summary}
                      </p>

                      <ul className="mt-5 grid gap-x-6 gap-y-2.5 text-sm text-[#E0F2FE] sm:grid-cols-2">
                        {service.details.map((d) => (
                          <li key={d} className="flex gap-2.5 items-center">
                            <CheckCircle2 className="h-4 w-4 text-[#38BDF8] shrink-0" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Direct WhatsApp booking trigger for this service */}
                      <div className="mt-6 pt-4 border-t border-[#144B66]/20">
                        <a
                          href={`${businessInfo.whatsappUrl}?text=${encodeURIComponent(
                            `Hello Janaka Auto AC, I would like to enquire about your "${service.title}" service for my vehicle.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-semibold text-[#38BDF8] transition-colors hover:text-[#CDE6F5]"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                          <span>Book this service via WhatsApp</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Diagnostic consultation banner */}
        <Reveal className="mt-14 flex flex-col items-start justify-between gap-6 rounded-2xl border border-[#144B66] bg-gradient-to-r from-[#032332] via-[#052E42] to-[#032332] px-6 py-8 text-white shadow-2xl sm:flex-row sm:items-center sm:px-10 backdrop-blur-md">
          <div className="max-w-xl">
            <h4 className="text-lg font-bold text-white">Unsure What Is Causing The Problem?</h4>
            <p className="mt-1.5 text-sm leading-relaxed text-[#A2B8C2]">
              Describe your symptoms to our technicians on WhatsApp. We will advise whether a simple gas recharge, leak check, or full diagnosis is required before you visit.
            </p>
          </div>

          <a
            href={`${businessInfo.whatsappUrl}?text=${encodeURIComponent(
              "Hello Janaka Auto AC, I'd like diagnostic advice about my car's air-conditioning problem."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#126782] via-[#1B7796] to-[#126782] px-6 py-3.5 text-sm font-semibold text-white shadow-xl border border-[#2586A3]/40 transition-all duration-300 hover:brightness-110 active:translate-y-px"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Consult on WhatsApp</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
};
