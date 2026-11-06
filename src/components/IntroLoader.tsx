'use client';

import React, { useEffect, useState } from 'react';
import { PhotoBackdrop } from '@/components/PhotoBackdrop';

/** Seconds until the intro curtain has fully lifted. */
export const INTRO_DURATION = 1.4;

/**
 * Brand intro shown while the page loads. Snappy and pointer-transparent so it never blocks interactions.
 * Automatically unmounts itself to free DOM and GPU resources.
 */
export const IntroLoader: React.FC = () => {
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="intro pointer-events-none" aria-hidden="true">
      <PhotoBackdrop src="/backdrops/arrival.webp" opacity={0.28} fade="center" />
      <div className="intro-content relative flex flex-col items-center">
        <div className="relative grid h-40 w-40 place-items-center sm:h-48 sm:w-48">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90">
            <circle cx="50" cy="50" r="47" fill="none" stroke="rgb(170 184 197 / 0.12)" strokeWidth="0.6" />
            <circle className="intro-ring" cx="50" cy="50" r="47" fill="none" stroke="#38bdf8" strokeWidth="0.9" strokeLinecap="round" pathLength={100} />
          </svg>
          {/* eslint-disable-next-line @next/next/no-img-element -- must paint before hydration */}
          <img src="/brand/globe.webp" alt="" width={320} height={211} className="intro-mark w-[62%]" />
        </div>
        <p className="intro-word mt-8 overflow-hidden font-wide text-xl font-bold tracking-[0.18em] text-white sm:text-2xl">
          <span>JANAKA AUTO AC</span>
        </p>
        <p className="intro-tag mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-silver">Keep cool · Drive comfortable</p>
        <span className="intro-bar mt-8 block h-px w-40 origin-left bg-ice" />
      </div>
    </div>
  );
};
