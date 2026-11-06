'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { businessInfo, servicesData } from '@/data/janakaData';

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="relative isolate overflow-hidden bg-[#FFFFFF] py-24 sm:py-32 border-b border-[#E5E3DE]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="services-title"
          index="01"
          eyebrow="Specialist Services"
          title="Specialist care for every part of your car's A/C."
          intro="Air-conditioning is all we do. Every job starts by diagnosing why your system isn't cooling — then we repair what is actually at fault."
          tone="light"
        />

        {/* Editorial Automotive Service Catalogue */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.08} className="h-full">
              <div className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[#E5E3DE] bg-[#F6F4EF]/70 p-6 transition-all duration-300 hover:border-[#2586A3]/60 hover:bg-[#FFFFFF] hover:shadow-lg hover:shadow-[#123D4A]/5">
                <div>
                  {/* Genuine Photography */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[#E5E3DE] bg-[#EFECE6]">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 rounded-md bg-[#123D4A]/90 backdrop-blur-xs px-2.5 py-1 font-mono text-[11px] font-bold tracking-wider text-white">
                      SERVICE {service.number}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="mt-6">
                    <h3 className="font-display text-xl font-bold text-[#24282B] group-hover:text-[#123D4A] transition-colors leading-snug">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#71818A]">
                      {service.summary}
                    </p>
                  </div>

                  {/* What's Included */}
                  <ul className="mt-5 space-y-2.5 border-t border-[#E5E3DE] pt-4 text-xs font-medium text-[#24282B]">
                    {service.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#2586A3] mt-0.5" aria-hidden="true" />
                        <span className="leading-tight">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Direct Action */}
                <div className="mt-6 pt-4 border-t border-[#E5E3DE]">
                  <a
                    href={`${businessInfo.whatsappUrl}?text=${encodeURIComponent(
                      `Hello Janaka Auto AC, I would like to inquire about your ${service.title} service for my vehicle.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-between rounded-lg border border-[#E5E3DE] bg-[#FFFFFF] px-4 py-3 text-xs font-semibold text-[#123D4A] shadow-xs transition-all duration-200 group-hover:border-[#2586A3] group-hover:bg-[#123D4A] group-hover:text-white"
                  >
                    <span>Inquire About This Service</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Diagnostic Consultation Banner */}
        <Reveal delay={0.2} className="mt-14">
          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-[#E5E3DE] bg-[#F6F4EF] p-8 sm:flex-row sm:items-center sm:p-10 shadow-xs">
            <div className="max-w-2xl">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#2586A3]">
                Free Diagnostic Advice
              </span>
              <h3 className="mt-2 font-display text-xl sm:text-2xl font-bold text-[#24282B]">
                Not sure what is wrong with your car&apos;s cooling?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#71818A]">
                Describe your symptoms on WhatsApp — whether it&apos;s warm air at idle, strange compressor noises, or weak vent airflow. We&apos;ll advise honestly on what to check before you visit.
              </p>
            </div>
            <a
              href={`${businessInfo.whatsappUrl}?text=${encodeURIComponent(
                "Hello Janaka Auto AC, my car's air conditioning isn't cooling properly. Can you advise me?"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2.5 rounded-md bg-[#123D4A] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#2586A3] active:translate-y-px"
            >
              <span>Ask on WhatsApp</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
