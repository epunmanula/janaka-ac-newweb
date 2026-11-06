import React from 'react';
import { Reveal } from '@/components/motion/Reveal';

interface SectionHeadingProps {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  intro?: string;
  tone?: 'light' | 'dark';
}

/** Shared section masthead: numbered eyebrow, headline, and an optional intro set to the right. */
export const SectionHeading: React.FC<SectionHeadingProps> = ({ id, index, eyebrow, title, intro, tone = 'dark' }) => {
  const dark = tone === 'dark';
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
      <Reveal className="lg:col-span-7">
        <p className={`eyebrow flex items-center gap-3 ${dark ? 'text-[#219ebc] font-semibold' : 'text-ice-deep'}`}>
          <span>{index}</span>
          <span aria-hidden="true" className={`h-px w-8 ${dark ? 'bg-[#219ebc]' : 'bg-ice-deep'}`} />
          <span>{eyebrow}</span>
        </p>
        <h2
          id={id}
          className={`mt-5 font-wide text-[2rem] font-bold leading-[1.06] tracking-[-0.02em] text-balance sm:text-[2.6rem] lg:text-5xl ${
            dark ? 'text-white' : 'text-navy-950'
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.1} className="lg:col-span-5">
          <p className={`max-w-md text-base leading-relaxed ${dark ? 'text-[#a2b8c2]' : 'text-steel'}`}>{intro}</p>
        </Reveal>
      )}
    </div>
  );
};
