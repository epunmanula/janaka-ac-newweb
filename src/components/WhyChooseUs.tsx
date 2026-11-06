'use client';

import React from 'react';
import Image from 'next/image';
import { SectionHeading } from '@/components/SectionHeading';
import { businessHours } from '@/data/janakaData';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const strengths = [
  {
    number: '01',
    title: 'Dedicated Automotive A/C Specialization',
    description:
      'We do not treat car air conditioning as a sideline to engine oil changes or tire work. Our workshop, diagnostic tools, and technician hours are 100% dedicated to vehicle climate control systems.',
  },
  {
    number: '02',
    title: 'Diagnosing the Actual Root Cause',
    description:
      'If your system cools poorly or loses refrigerant repeatedly, topping up gas is a temporary cover-up. We run electronic leak tests and pressure monitoring to locate and fix the real failure.',
  },
  {
    number: '03',
    title: 'Repairing Over Unnecessary Replacement',
    description:
      'Whenever possible, we overhaul compressors, replace worn bearings, rebuild magnetic clutches, and renew O-rings. We only recommend complete new parts when a repair is not technically sound.',
  },
  {
    number: '04',
    title: 'Clear Explanations Before Work Begins',
    description:
      'No surprise charges. After diagnosis, we explain what failed, what needs servicing, what parts are required, and give you an honest upfront price before turning a single bolt.',
  },
  {
    number: '05',
    title: 'Direct Communication with Technicians',
    description:
      'When you call or message +94 71 455 1409, you speak directly with the workshop technicians who diagnose and service your vehicle, ensuring accurate technical guidance.',
  },
  {
    number: '06',
    title: 'Six-Day Weekly Availability',
    description:
      `Open ${businessHours.openDays} from ${businessHours.hours} (closed Mondays). Convenient weekend service availability so you do not have to disrupt your weekday work schedule.`,
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section
      id="why-us"
      aria-labelledby="why-title"
      className="relative overflow-hidden bg-[#FFFFFF] py-24 sm:py-28 md:py-32 border-b border-[#E5E3DE]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="why-title"
          index="04"
          eyebrow="Workshop Principles"
          title="Why Vehicle Owners Choose Janaka Auto AC"
          intro="Automotive air conditioning requires specialized diagnostic instruments, refrigerant handling discipline, and honest craft. Here is how we run our workshop on Miriswatta Road."
          tone="light"
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Visual Asset & Guarantee card */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-[#E5E3DE] bg-[#F6F4EF] shadow-sm">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/condenser-replacement.webp"
                  alt="New condenser and receiver-drier ready for installation"
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-[#123D4A]">
                  <CheckCircle2 className="h-5 w-5 text-[#2586A3]" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">
                    Our Workshop Standard
                  </span>
                </div>
                <h3 className="mt-2 text-lg font-bold text-[#24282B]">
                  No Guesswork. Pressure & Vacuum Verified.
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#71818A]">
                  Every reassembled system is nitrogen leak-checked, vacuum-held to ensure complete moisture removal, and weighed with exact OEM refrigerant and PAG oil specifications.
                </p>

                <div className="mt-6 border-t border-[#E5E3DE] pt-4">
                  <a
                    href="#contact"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#123D4A] px-4 py-3 text-xs font-semibold text-white transition hover:bg-[#2586A3]"
                  >
                    <span>Schedule an A/C Diagnosis</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 6 Strengths Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {strengths.map((s) => (
              <div
                key={s.number}
                className="group rounded-xl border border-[#E5E3DE] bg-[#F6F4EF] p-5 sm:p-6 transition-all hover:border-[#CBD5E1] hover:bg-[#FFFFFF] hover:shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#2586A3]">{s.number}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E5E3DE] group-hover:bg-[#2586A3] transition-colors" />
                </div>
                <h3 className="mt-3 text-base font-bold text-[#24282B] group-hover:text-[#123D4A] transition-colors">
                  {s.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#4B5563]">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
