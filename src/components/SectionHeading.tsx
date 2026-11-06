import React from 'react';
import { Reveal } from '@/components/motion/Reveal';

interface SectionHeadingProps {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  intro?: string;
  tone?: 'light' | 'dark'; // 'light' means light background (dark text), 'dark' means dark background (white text)
}

/** Shared section masthead: numbered eyebrow, headline, and an optional intro set to the right. */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  id,
  index,
  eyebrow,
  title,
  intro,
  tone = 'light',
}) => {
  const isDark = tone === 'dark';

  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
      <Reveal className="lg:col-span-7">
        <p className={`eyebrow flex items-center gap-3 font-semibold ${isDark ? 'text-[#2586A3]' : 'text-[#2586A3]'}`}>
          <span className="font-mono text-[11px] font-bold text-[#123D4A] dark:text-[#2586A3]">{index}</span>
          <span aria-hidden="true" className="h-px w-8 bg-[#2586A3]" />
          <span>{eyebrow}</span>
        </p>
        <h2
          id={id}
          className={`mt-4 font-display text-[2.2rem] font-bold leading-[1.08] tracking-[-0.025em] text-balance sm:text-[2.6rem] lg:text-[2.9rem] ${
            isDark ? 'text-white' : 'text-[#24282B]'
          }`}
          style={{ fontFamily: 'var(--font-display, sans-serif)' }}
        >
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.1} className="lg:col-span-5">
          <p className={`max-w-md text-base leading-relaxed ${isDark ? 'text-[#A2B8C2]' : 'text-[#71818A]'}`}>
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
};
