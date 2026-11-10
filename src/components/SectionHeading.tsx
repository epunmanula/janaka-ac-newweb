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

/** Executive automotive section masthead: luxury badge, authoritative title, and optional intro */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  id,
  index,
  eyebrow,
  title,
  intro,
  tone = 'dark',
}) => {
  const dark = tone === 'dark';

  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
      <Reveal className="lg:col-span-7">
        {/* Luxury Automotive Badge (replaces cheap AI line-and-dots) */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#144B66] bg-[#052436]/80 px-4 py-1 backdrop-blur-md shadow-xs">
          <span className="font-mono text-[10px] font-bold text-[#38BDF8] tracking-widest">{index}</span>
          <span className="h-3 w-px bg-[#144B66]" />
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#CDE6F5]">
            {eyebrow}
          </span>
        </div>

        <h2
          id={id}
          className={`mt-5 font-wide text-[2.2rem] font-bold leading-[1.04] tracking-[-0.025em] text-balance sm:text-[2.75rem] lg:text-5xl ${
            dark ? 'text-white' : 'text-[#021824]'
          }`}
        >
          {title}
        </h2>
      </Reveal>

      {intro && (
        <Reveal delay={0.1} className="lg:col-span-5">
          <p className={`max-w-md text-base leading-relaxed ${dark ? 'text-[#A2B8C2]' : 'text-[#475569]'}`}>
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
};
