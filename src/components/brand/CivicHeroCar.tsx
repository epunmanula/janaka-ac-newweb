'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, type MotionValue, AnimatePresence } from 'framer-motion';

export interface CivicHotspot {
  id: string;
  name: string;
  desc: string;
  desktopX: number; // Percentage
  desktopY: number; // Percentage
  tag: string;
}

export const CIVIC_HOTSPOTS: CivicHotspot[] = [
  {
    id: 'condenser',
    name: 'Condenser',
    desc: 'Releases heat outside through the front honeycomb grille',
    desktopX: 84,
    desktopY: 74,
    tag: 'Front Grille',
  },
  {
    id: 'compressor',
    name: 'Compressor',
    desc: 'High-pressure refrigerant pump driven by the engine belt',
    desktopX: 68,
    desktopY: 66,
    tag: 'Engine Bay',
  },
  {
    id: 'evaporator',
    name: 'Evaporator Core',
    desc: 'Chills cabin air down to 4.5°C behind the dashboard',
    desktopX: 47,
    desktopY: 46,
    tag: 'Firewall',
  },
  {
    id: 'filter',
    name: 'Cabin Filter',
    desc: 'Traps tropical dust, pollen and micro-particles',
    desktopX: 33,
    desktopY: 40,
    tag: 'Glovebox',
  },
];

interface CivicHeroCarProps {
  carX?: MotionValue<string>;
  labelsOpacity?: MotionValue<number>;
  className?: string;
}

export const CivicHeroCar: React.FC<CivicHeroCarProps> = ({ carX, labelsOpacity, className = '' }) => {
  const [activeSpot, setActiveSpot] = useState<CivicHotspot | null>(null);

  return (
    <div className={`relative w-full ${className}`}>
      <motion.div style={carX ? { x: carX } : undefined} className="relative mx-auto w-full max-w-[620px] lg:max-w-[700px]">
        {/* Ambient chassis underglow & ground shadow */}
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-4 inset-x-8 h-16 sm:h-20">
          {/* Deep ground contact shadow */}
          <div className="absolute inset-x-4 bottom-2 h-10 rounded-[100%] bg-black/85 blur-md" />
          {/* Nordic ice cyan atmospheric glow */}
          <div className="absolute inset-x-8 bottom-0 h-12 rounded-[100%] bg-gradient-to-r from-transparent via-[#219ebc]/30 to-transparent blur-xl" />
        </div>

        {/* Headlight beam projection */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-10%] top-[46%] h-24 w-52 sm:h-32 sm:w-72 -translate-y-1/2 opacity-75 [mask-image:radial-gradient(ellipse_at_left,black_20%,transparent_75%)]"
        >
          <div className="h-full w-full bg-gradient-to-r from-[#dff6ff]/60 via-[#219ebc]/25 to-transparent [clip-path:polygon(0_38%,100%_0,100%_100%,0_62%)]" />
        </div>

        {/* Honda Civic RS Image Container */}
        <div className="relative aspect-[729/402] w-full select-none">
          <Image
            src="/brand/honda-civic-rs.webp"
            alt="Honda Civic RS Sedan in Crystal Black Pearl Metallic, specialist air conditioning service at Janaka Auto AC"
            fill
            priority
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 540px, 700px"
            className="object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)] transition-transform duration-500 hover:scale-[1.01]"
          />

          {/* Interactive Hotspots Layer (Desktop & Tablet) */}
          <motion.div
            style={labelsOpacity ? { opacity: labelsOpacity } : undefined}
            aria-hidden="true"
            className="absolute inset-0 pointer-events-auto hidden sm:block"
          >
            {CIVIC_HOTSPOTS.map((spot) => {
              const isActive = activeSpot?.id === spot.id;
              return (
                <div
                  key={spot.id}
                  className="absolute"
                  style={{ left: `${spot.desktopX}%`, top: `${spot.desktopY}%` }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveSpot(isActive ? null : spot)}
                    onMouseEnter={() => setActiveSpot(spot)}
                    onMouseLeave={() => setActiveSpot(null)}
                    aria-label={`View info about ${spot.name}`}
                    className="group relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center p-2 focus:outline-none"
                  >
                    {/* Radar ping ring */}
                    <span className="absolute h-6 w-6 rounded-full bg-[#219ebc]/30 animate-ping pointer-events-none" />
                    {/* Outer glow ring */}
                    <span className="relative flex h-5 w-5 items-center justify-center rounded-full border border-[#8ecae6] bg-[#021824]/90 shadow-lg shadow-[#219ebc]/50 transition-transform group-hover:scale-125">
                      <span className="h-2 w-2 rounded-full bg-[#219ebc] group-hover:bg-[#ffb703] transition-colors" />
                    </span>
                  </button>

                  {/* Leader line and floating label */}
                  <div
                    className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 flex flex-col items-center pointer-events-none transition-all duration-300 ${
                      isActive ? 'opacity-100 scale-100 z-30' : 'opacity-85 scale-95 z-10'
                    }`}
                  >
                    <div className="rounded-md border border-[#126782]/60 bg-[#021824]/95 px-2.5 py-1 backdrop-blur-md shadow-xl shadow-black/60 whitespace-nowrap">
                      <span className="block font-mono text-[9px] uppercase tracking-wider text-[#8ecae6] font-semibold">
                        {spot.name}
                      </span>
                      {isActive && (
                        <span className="block max-w-[160px] text-[11px] leading-tight text-slate-300 font-sans mt-0.5">
                          {spot.desc}
                        </span>
                      )}
                    </div>
                    {/* Pin needle */}
                    <span className="h-3 w-px bg-gradient-to-b from-[#8ecae6] to-[#219ebc]" />
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Model identification badge */}
        <div className="mt-3 flex items-center justify-between px-2 text-[11px] sm:px-4">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#219ebc]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8ecae6]/80 font-semibold">
              Honda Civic RS · 11th Gen
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
            A/C Diagnostics Platform
          </span>
        </div>

        {/* Mobile-optimized interactive pill carousel / badges */}
        <div className="mt-4 grid grid-cols-2 gap-2 sm:hidden px-1">
          {CIVIC_HOTSPOTS.map((spot) => (
            <div
              key={spot.id}
              className="rounded-lg border border-[#126782]/40 bg-[#023047]/60 p-2.5 backdrop-blur-sm"
            >
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#219ebc]" />
                <span className="font-mono text-[10px] uppercase font-bold text-[#8ecae6]">
                  {spot.name}
                </span>
              </div>
              <p className="mt-1 text-[11px] leading-snug text-slate-300">
                {spot.desc}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

