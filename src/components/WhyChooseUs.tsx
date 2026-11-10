import React from 'react';
import Image from 'next/image';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { businessHours } from '@/data/janakaData';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const reasons = [
  {
    number: '01',
    title: '100% Automotive A/C Focus',
    body: 'We do not dilute our time with oil changes or general mechanical repairs. Our technicians and diagnostic equipment specialize purely in automotive refrigerant cycles.',
  },
  {
    number: '02',
    title: 'Diagnosing Root Causes, Not Just Gas Top-ups',
    body: 'If your system repeatedly loses gas, topping up is a temporary cover-up. We run electronic leak testing and vacuum holds to fix the real source of the leak.',
  },
  {
    number: '03',
    title: 'Repairing Over Costly Replacement',
    body: 'Whenever mechanically sound, we overhaul compressors, renew bearings, and replace O-rings. We never force expensive complete unit replacements if a repair solves the problem.',
  },
  {
    number: '04',
    title: 'Direct Technician Consultation',
    body: 'Speak directly with the workshop technicians by phone or WhatsApp. We explain what was found, what is required, and give you clear pricing before work begins.',
  },
  {
    number: '05',
    title: 'Six-Day Service Availability',
    body: `Open ${businessHours.openDays} from ${businessHours.hours} (closed Mondays). Convenient weekend availability so you do not have to disrupt your work schedule.`,
  },
];

export const WhyChooseUs: React.FC = () => (
  <section
    id="why-us"
    aria-labelledby="why-title"
    className="relative overflow-hidden bg-gradient-to-b from-[#021824] via-[#032332] to-[#021824] py-24 text-white border-b border-[#144B66]/40 md:py-32"
  >
    <div className="relative mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
      {/* Left Column: Heading & Workshop Asset */}
      <div className="lg:col-span-5">
        <SectionHeading
          id="why-title"
          index="04"
          eyebrow="Workshop Principles"
          title="Why Vehicle Owners Rely on Janaka Auto AC"
          tone="dark"
        />

        <Reveal delay={0.1} className="mt-8 hidden lg:block">
          <figure>
            <div className="relative aspect-[4/3] w-full max-w-[420px] overflow-hidden rounded-2xl border border-[#144B66] bg-[#052436] shadow-xl">
              <Image
                src="/condenser-replacement.webp"
                alt="New condenser and receiver-drier in the workshop ready for installation"
                fill
                sizes="420px"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[#8FAEC0]">
              Quality OEM & Aftermarket Replacement Parts
            </figcaption>
          </figure>

          <div className="mt-6 rounded-xl border border-[#144B66]/60 bg-[#052436]/60 p-4">
            <div className="flex items-center gap-2 text-[#38BDF8]">
              <CheckCircle2 className="h-4 w-4" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider">
                Pressure-Tested Standard
              </span>
            </div>
            <p className="mt-1.5 text-xs text-[#A2B8C2] leading-relaxed">
              Every reassembled system is nitrogen leak-checked, vacuum-held, and weighed with exact OEM refrigerant specifications.
            </p>
          </div>
        </Reveal>
      </div>

      {/* Right Column: 5 Principles Cards */}
      <ol className="grid gap-4 sm:grid-cols-2 lg:col-span-7 lg:self-end">
        {reasons.map((r, i) => (
          <Reveal
            as="li"
            key={r.title}
            delay={i * 0.06}
            className="group rounded-2xl border border-[#144B66] bg-[#052436]/80 backdrop-blur-md p-6 shadow-xl transition-all duration-300 hover:border-[#38BDF8]/60 hover:bg-[#07334C]/90"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#38BDF8]">{r.number}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#144B66] group-hover:bg-[#38BDF8] transition-colors" />
            </div>
            <h3 className="mt-3 font-wide text-lg font-bold leading-snug text-white group-hover:text-[#CDE6F5] transition-colors">
              {r.title}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-[#A2B8C2]">{r.body}</p>
          </Reveal>
        ))}

        {/* CTA Card */}
        <Reveal
          as="li"
          delay={0.3}
          className="rounded-2xl border border-[#38BDF8]/40 bg-gradient-to-br from-[#063953] to-[#032332] p-6 shadow-xl flex flex-col justify-between"
        >
          <div>
            <span className="font-mono text-xs font-bold text-[#38BDF8]">BOOKING</span>
            <h3 className="mt-2 font-wide text-lg font-bold text-white">Have Your A/C Inspected</h3>
            <p className="mt-1.5 text-xs text-[#CDE6F5] leading-relaxed">
              Speak directly with our technicians to schedule an inspection at our Gampaha bays.
            </p>
          </div>
          <a
            href="#contact"
            className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-white hover:text-[#38BDF8] transition-colors"
          >
            <span>Go to Booking & Contact</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </Reveal>
      </ol>
    </div>
  </section>
);
