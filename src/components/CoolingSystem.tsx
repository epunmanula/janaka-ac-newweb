'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CAR_BODY_PATH, CAR_GLASS_PATH } from '@/components/brand/Car';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { coolingComponents } from '@/data/janakaData';
import { PhotoBackdrop } from '@/components/PhotoBackdrop';
import { AnimatedStripes } from '@/components/brand/AnimatedStripes';

// Cut-away of the front half of the car
const VB = { x: 290, y: 30, w: 340, h: 160 };
const pct = (x: number, y: number) => ({
  left: `${((x - VB.x) / VB.w) * 100}%`,
  top: `${((y - VB.y) / VB.h) * 100}%`,
});

// Refrigerant circuit, following the direction of flow
const highSide = [
  { from: 'compressor', d: 'M548 140 C572 138 598 134 606 122' },
  { from: 'condenser', d: 'M606 122 C608 130 598 136 586 136' },
  { from: 'receiver-drier', d: 'M586 136 C556 138 528 118 504 100' },
];
const lowSide = [
  { from: 'expansion-valve', d: 'M504 100 L462 104' },
  { from: 'evaporator', d: 'M462 104 C480 128 516 146 548 140' },
];

export const CoolingSystem: React.FC = () => {
  const [activeId, setActiveId] = useState(coolingComponents[0].id);
  const active = coolingComponents.find((c) => c.id === activeId) ?? coolingComponents[0];

  return (
    <section id="system" aria-labelledby="system-title" className="relative isolate overflow-hidden bg-gradient-to-b from-[#021c2a] via-[#032533] to-[#021926] py-24 text-white border-b border-[#126782]/30 md:py-32">
      <AnimatedStripes variant="ambient" opacity={0.25} />
      <PhotoBackdrop src="/backdrops/system.webp" opacity={0.18} fade="right" base="#021824" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="system-title"
          index="02"
          eyebrow="How your A/C works"
          title="Six parts. One sealed circuit."
          intro="Your car's A/C moves heat out of the cabin by circulating refrigerant through a closed loop. Select a component to see what it does and the symptoms that point to it."
          tone="dark"
        />

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-8">
            <div className="relative" style={{ aspectRatio: `${VB.w} / ${VB.h}` }}>
              <svg
                viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
                className="absolute inset-0 h-full w-full"
                role="img"
                aria-label="Simplified diagram of a car air-conditioning circuit in the front of a vehicle"
              >
                {/* Car outline */}
                <g fill="none" stroke="#aab8c5" strokeOpacity={0.35} strokeWidth={0.8}>
                  <path d={CAR_BODY_PATH} />
                  <path d={CAR_GLASS_PATH} />
                  <circle cx={490} cy={149} r={31} />
                  <circle cx={490} cy={149} r={22} strokeOpacity={0.2} />
                </g>
                <path d="M500 92 L500 146" stroke="#aab8c5" strokeOpacity={0.25} strokeWidth={0.6} strokeDasharray="2 3" />
                <text x={497} y={186} fill="#aab8c5" fillOpacity={0.6} fontSize={5} textAnchor="end" style={{ fontFamily: 'var(--font-mono)' }} letterSpacing={0.6}>
                  CABIN ← FIREWALL → ENGINE BAY
                </text>

                {/* Airflow through the cabin */}
                <g fill="none" stroke="#219ebc" strokeWidth={0.8} strokeLinecap="round">
                  <path className="flow-line" d="M424 118 C436 112 448 108 456 106" strokeOpacity={0.6} />
                  <path className="flow-line" d="M454 100 C420 88 390 84 352 86" strokeOpacity={0.8} />
                  <path className="flow-line" style={{ animationDelay: '-1.2s' }} d="M454 108 C420 104 392 104 352 108" strokeOpacity={0.5} />
                </g>
                <text x={340} y={78} fill="#8ecae6" fontSize={5.5} style={{ fontFamily: 'var(--font-mono)' }} letterSpacing={0.6}>
                  COLD AIR TO VENTS
                </text>

                {/* Heat rejected at the front */}
                <g fill="none" stroke="#fb8500" strokeWidth={0.8} strokeLinecap="round" strokeOpacity={0.85}>
                  <path className="flow-line" d="M614 112 L636 108" />
                  <path className="flow-line" style={{ animationDelay: '-1s' }} d="M616 126 L638 126" />
                </g>
                <text x={628} y={160} fill="#f59e0b" fontSize={5.5} style={{ fontFamily: 'var(--font-mono)' }} letterSpacing={0.6} textAnchor="end">
                  HEAT OUT
                </text>

                {/* Refrigerant lines */}
                {[...highSide.map((l) => ({ ...l, side: 'high' })), ...lowSide.map((l) => ({ ...l, side: 'low' }))].map((line) => (
                  <g key={line.d}>
                    <path d={line.d} fill="none" stroke={line.side === 'high' ? '#f59e0b' : '#38bdf8'} strokeOpacity={0.35} strokeWidth={2.2} />
                    <path
                      className="flow-line"
                      d={line.d}
                      fill="none"
                      stroke={line.side === 'high' ? '#fde68a' : '#38bdf8'}
                      strokeWidth={1.1}
                      strokeLinecap="round"
                    />
                  </g>
                ))}

                {/* Component symbols */}
                {coolingComponents.map((c) => {
                  const on = c.id === active.id;
                  const stroke = on ? '#38bdf8' : '#94a3b8';
                  return (
                    <g key={c.id} opacity={on ? 1 : 0.75}>
                      {on && <circle cx={c.x} cy={c.y} r={13} fill="#38bdf8" fillOpacity={0.16} />}
                      {c.id === 'condenser' && (
                        <g stroke={stroke} strokeWidth={0.8} fill="#202b36">
                          <rect x={601} y={104} width={10} height={36} />
                          {[110, 116, 122, 128, 134].map((y) => (
                            <line key={y} x1={601} x2={611} y1={y} y2={y} strokeOpacity={0.6} />
                          ))}
                        </g>
                      )}
                      {c.id === 'compressor' && (
                        <g stroke={stroke} strokeWidth={0.9} fill="#202b36">
                          <circle cx={c.x} cy={c.y} r={8} />
                          <circle cx={c.x} cy={c.y} r={3.5} />
                        </g>
                      )}
                      {c.id === 'receiver-drier' && <rect x={582} y={128} width={8} height={16} rx={4} stroke={stroke} strokeWidth={0.9} fill="#202b36" />}
                      {c.id === 'expansion-valve' && (
                        <path d={`M${c.x} ${c.y - 6} L${c.x + 6} ${c.y} L${c.x} ${c.y + 6} L${c.x - 6} ${c.y} Z`} stroke={stroke} strokeWidth={0.9} fill="#202b36" />
                      )}
                      {c.id === 'evaporator' && (
                        <g stroke={stroke} strokeWidth={0.8} fill="#202b36">
                          <rect x={455} y={94} width={14} height={20} />
                          {[455 + 3.5, 455 + 7, 455 + 10.5].map((x) => (
                            <line key={x} x1={x} x2={x} y1={94} y2={114} strokeOpacity={0.6} />
                          ))}
                        </g>
                      )}
                      {c.id === 'blower' && (
                        <g stroke={stroke} strokeWidth={0.9} fill="#202b36">
                          <circle cx={c.x} cy={c.y} r={7} />
                          <path d={`M${c.x} ${c.y} L${c.x + 5} ${c.y - 3} M${c.x} ${c.y} L${c.x - 4} ${c.y - 4} M${c.x} ${c.y} L${c.x} ${c.y + 6}`} />
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Hotspots */}
              {coolingComponents.map((c, i) => {
                const on = c.id === active.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setActiveId(c.id)}
                    onMouseEnter={() => setActiveId(c.id)}
                    aria-pressed={on}
                    aria-label={`Show ${c.name}`}
                    className="group absolute flex h-9 w-9 -translate-x-1/2 -translate-y-[170%] items-center justify-center sm:-translate-y-[190%]"
                    style={pct(c.x, c.y)}
                  >
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full border font-mono text-[10px] transition-colors duration-300 ${
                        on ? 'border-ice bg-ice text-navy-950' : 'border-silver/60 bg-graphite text-silver group-hover:border-ice group-hover:text-ice'
                      }`}
                    >
                      {i + 1}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[#a2b8c2]">
              <span className="flex items-center gap-2">
                <span aria-hidden="true" className="h-0.5 w-6 bg-[#fb8500]" /> <span className="text-[#ffb703]">High pressure · Heat extraction</span>
              </span>
              <span className="flex items-center gap-2">
                <span aria-hidden="true" className="h-0.5 w-6 bg-[#219ebc]" /> <span className="text-[#8ecae6]">Low pressure · Chilled vapour</span>
              </span>
            </div>
          </Reveal>

          {/* Selector + details */}
          <Reveal delay={0.1} className="lg:col-span-4">
            <ul className="grid grid-cols-2 gap-px rounded-lg overflow-hidden border border-[#126782]/30 bg-[#021824] sm:grid-cols-3 lg:grid-cols-2" aria-label="A/C components">
              {coolingComponents.map((c, i) => {
                const on = c.id === active.id;
                return (
                  <li key={c.id} className="bg-[#023047]/60">
                    <button
                      type="button"
                      onClick={() => setActiveId(c.id)}
                      aria-pressed={on}
                      aria-controls="component-detail"
                      className={`flex min-h-12 w-full items-center gap-3 px-3 py-3 text-left text-sm transition-colors duration-300 ${
                        on ? 'bg-[#126782] text-white font-semibold' : 'text-[#a2b8c2] hover:bg-[#064261]/60 hover:text-white'
                      }`}
                    >
                      <span className={`font-mono text-[11px] ${on ? 'text-[#8ecae6]' : 'text-[#6b8896]'}`}>0{i + 1}</span>
                      {c.name}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div id="component-detail" aria-live="polite" className="mt-8 min-h-[18rem] rounded-xl border border-[#126782]/30 bg-[#023047]/50 p-6 backdrop-blur-md shadow-xl">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="eyebrow text-[10px] text-[#8ecae6] font-semibold">{active.location}</p>
                  <h3 className="mt-3 font-wide text-2xl font-semibold text-white">{active.name}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[#a2b8c2]">{active.role}</p>
                  <p className="mt-6 eyebrow text-[10px] text-[#219ebc] font-semibold">Signs to mention when you call</p>
                  <ul className="mt-3 space-y-2 text-sm text-[#e0f2fe]">
                    {active.signs.map((s) => (
                      <li key={s} className="flex gap-3">
                        <span aria-hidden="true" className="mt-[0.6em] h-px w-3 shrink-0 bg-[#219ebc]" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
            <p className="mt-6 border-t border-white/10 pt-4 text-xs leading-relaxed text-silver/80">
              Simplified illustration for general guidance. Component layout varies between vehicles, and only an
              inspection can confirm what is wrong with yours.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
