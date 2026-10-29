import React from 'react';
import Image from 'next/image';
import { Reveal } from '@/components/motion/Reveal';
import { businessHours } from '@/data/janakaData';

const reasons = [
  {
    title: 'A/C is our speciality',
    body: 'We work on car air-conditioning systems every day, so we know how they behave — and how they typically fail.',
  },
  {
    title: 'The cause, not a top-up',
    body: 'If your system keeps losing gas or cooling poorly, we trace why, rather than simply refilling it or swapping parts.',
  },
  {
    title: 'Clear, direct answers',
    body: 'Speak to the workshop directly by phone or WhatsApp. We explain what we found and what we recommend before going ahead.',
  },
  {
    title: 'Open six days a week',
    body: `${businessHours.openDays}, ${businessHours.hours}. Easy to find on the Minuwangoda–Gampaha–Miriswatta Road.`,
  },
];

export const WhyChooseUs: React.FC = () => (
  <section id="why-us" aria-labelledby="why-title" className="relative overflow-hidden bg-gradient-to-b from-sky-50/60 via-white to-slate-50/80 py-24 text-slate-900 border-b border-slate-200/60 md:py-32">
    <div aria-hidden="true" className="absolute -left-48 bottom-0 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgb(2_132_199/0.06),transparent_65%)]" />
    <div className="relative mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
      <div className="lg:col-span-5">
        <Reveal>
          <p className="eyebrow flex items-center gap-3 text-blue-600 font-semibold">
            <span>04</span>
            <span aria-hidden="true" className="h-px w-8 bg-blue-600" />
            <span>Why Janaka Auto AC</span>
          </p>
          <h2 id="why-title" className="mt-5 font-wide text-[2rem] font-bold leading-[1.06] tracking-[-0.02em] text-balance text-slate-950 sm:text-[2.6rem] lg:text-5xl">
            Why bring your car to us.
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-10 hidden lg:block">
          <figure>
            <div className="relative aspect-[4/5] w-full max-w-[360px] overflow-hidden rounded-lg border border-slate-200 shadow-md">
              <Image
                src="/condenser-replacement.webp"
                alt="A new condenser and receiver-drier in the workshop, ready to be fitted"
                fill
                sizes="360px"
                className="object-cover object-[50%_40%]"
              />
            </div>
            <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-slate-500">
              New condenser, ready to fit
            </figcaption>
          </figure>
        </Reveal>
      </div>

      <ol className="grid gap-6 sm:grid-cols-2 lg:col-span-7 lg:self-end">
        {reasons.map((r, i) => (
          <Reveal as="li" key={r.title} delay={i * 0.08} className="group rounded-lg border border-slate-200/90 bg-white p-7 shadow-sm transition-all duration-300 hover:border-blue-400 hover:shadow-md">
            <span className="font-mono text-sm font-bold text-blue-600">0{i + 1}</span>
            <h3 className="mt-3 font-wide text-xl font-semibold leading-snug text-slate-950 group-hover:text-blue-600 transition-colors">{r.title}</h3>
            <p className="mt-2.5 text-[15px] leading-relaxed text-slate-600">{r.body}</p>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
);
