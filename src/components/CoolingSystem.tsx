'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CAR_BODY_PATH, CAR_GLASS_PATH } from '@/components/brand/Car';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { coolingComponents } from '@/data/janakaData';
import { PhotoBackdrop } from '@/components/PhotoBackdrop';
import { AlertCircle, CheckCircle2, Phone } from 'lucide-react';

// Cut-away view of the front half of the vehicle
const VB = { x: 260, y: 30, w: 340, h: 160 };
const pct = (x: number, y: number) => ({
  left: `${((x - VB.x) / VB.w) * 100}%`,
  top: `${((y - VB.y) / VB.h) * 100}%`,
});

// Refrigerant circuit, following the thermodynamic flow
const highSide = [
  { from: 'compressor', d: 'M496 126 C514 126 534 122 542 112' },
  { from: 'condenser', d: 'M542 112 C542 118 536 122 528 122' },
  { from: 'receiver-drier', d: 'M528 122 C496 122 464 104 436 92' },
];
const lowSide = [
  { from: 'expansion-valve', d: 'M436 92 L410 96' },
  { from: 'evaporator', d: 'M410 96 C428 114 466 128 496 126' },
];

const diagnosticNotes: Record<string, string> = {
  compressor:
    'We check high/low gauge pressures, magnetic clutch coil resistance, and bearing play before determining whether a repair or overhaul is needed.',
  condenser:
    'We pressure-test micro-tubes for road grit punctures and inspect fin blockage that causes cooling to weaken in traffic.',
  'receiver-drier':
    'Desiccant filters absorb acid and moisture. We renew this whenever the circuit is opened for major repairs to protect the compressor.',
  'expansion-valve':
    'We test thermal bulb metering calibration if lines freeze or cabin temperature fluctuates erratically.',
  evaporator:
    'Located deep under the dashboard. We use electronic halogen sniffing and nitrogen hold-testing to locate microscopic leaks without guesswork.',
  blower:
    'We test motor current draw, blower resistor steps, and inspect cabin micro-filters for particulate loading and bacteria.',
};

export const CoolingSystem: React.FC = () => {
  const [activeId, setActiveId] = useState(coolingComponents[0].id);
  const active = coolingComponents.find((c) => c.id === activeId) ?? coolingComponents[0];
  const diagnosticNote = diagnosticNotes[active.id] || '';

  return (
    <section
      id="system"
      aria-labelledby="system-title"
      className="relative isolate overflow-hidden bg-gradient-to-b from-[#021824] via-[#032332] to-[#021824] py-24 text-white border-b border-[#144B66]/40 md:py-32"
    >
      <PhotoBackdrop src="/backdrops/system.webp" opacity={0.15} fade="right" base="#021824" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="system-title"
          index="02"
          eyebrow="Technical Circuit Architecture"
          title="Six Components. One Closed Thermodynamic Loop."
          intro="Automotive air conditioning moves heat out of your cabin by circulating pressurized refrigerant through a closed circuit. Select any component below to see its function and common failure signs."
          tone="dark"
        />

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-12">
          {/* Left: Cutaway Blueprint Diagram */}
          <Reveal className="lg:col-span-8">
            <div className="rounded-2xl border border-[#144B66] bg-[#031B29]/90 p-4 sm:p-6 backdrop-blur-md shadow-2xl">
              <div className="mb-4 flex items-center justify-between border-b border-[#144B66]/40 pb-3">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#CDE6F5]">
                  Automotive Refrigerant Circuit Schematic
                </span>
                <span className="rounded-md border border-[#144B66] bg-[#052436] px-2.5 py-0.5 font-mono text-[10px] text-[#38BDF8]">
                  ISO 14224
                </span>
              </div>

              <div className="relative" style={{ aspectRatio: `${VB.w} / ${VB.h}` }}>
                <svg
                  viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
                  className="absolute inset-0 h-full w-full"
                  role="img"
                  aria-label="Technical vehicle air conditioning circuit blueprint"
                >
                  {/* Vehicle Blueprint Silhouette */}
                  <g fill="none" stroke="#475569" strokeOpacity={0.6} strokeWidth={0.8}>
                    <path d={CAR_BODY_PATH} />
                    <path d={CAR_GLASS_PATH} />
                    <circle cx={468} cy={138} r={27} stroke="#334155" />
                    <circle cx={468} cy={138} r={18} strokeOpacity={0.4} strokeDasharray="2 2" />
                  </g>

                  {/* Firewall Boundary */}
                  <path
                    d="M432 80 L432 140"
                    stroke="#94A3B8"
                    strokeOpacity={0.4}
                    strokeWidth={0.8}
                    strokeDasharray="2 3"
                  />
                  <text
                    x={428}
                    y={178}
                    fill="#94A3B8"
                    fontSize={5}
                    textAnchor="end"
                    style={{ fontFamily: 'var(--font-mono)' }}
                    letterSpacing={0.6}
                    fontWeight="bold"
                  >
                    CABIN ← FIREWALL → ENGINE BAY
                  </text>

                  {/* Chilled cabin airflow */}
                  <g fill="none" stroke="#38BDF8" strokeWidth={0.9} strokeLinecap="round">
                    <path className="flow-line" d="M375 108 C388 104 398 100 406 98" strokeOpacity={0.5} />
                    <path className="flow-line" d="M406 92 C378 84 350 82 320 84" strokeOpacity={0.8} />
                    <path className="flow-line" style={{ animationDelay: '-1.2s' }} d="M406 100 C378 96 350 96 320 100" strokeOpacity={0.5} />
                  </g>
                  <text
                    x={312}
                    y={76}
                    fill="#CDE6F5"
                    fontSize={5.5}
                    style={{ fontFamily: 'var(--font-mono)' }}
                    letterSpacing={0.6}
                  >
                    CHILLED AIR TO VENTS
                  </text>

                  {/* Exterior heat rejected at condenser */}
                  <g fill="none" stroke="#F59E0B" strokeWidth={0.9} strokeLinecap="round" strokeOpacity={0.85}>
                    <path className="flow-line" d="M548 106 L570 102" />
                    <path className="flow-line" style={{ animationDelay: '-1s' }} d="M550 116 L572 116" />
                  </g>
                  <text
                    x={565}
                    y={144}
                    fill="#F59E0B"
                    fontSize={5.5}
                    style={{ fontFamily: 'var(--font-mono)' }}
                    letterSpacing={0.6}
                    textAnchor="end"
                  >
                    HEAT EXTRACTION
                  </text>

                  {/* High and Low pressure refrigerant lines */}
                  {[...highSide.map((l) => ({ ...l, side: 'high' })), ...lowSide.map((l) => ({ ...l, side: 'low' }))].map((line) => (
                    <g key={line.d}>
                      <path
                        d={line.d}
                        fill="none"
                        stroke={line.side === 'high' ? '#D97706' : '#0284C7'}
                        strokeOpacity={0.35}
                        strokeWidth={2.4}
                      />
                      <path
                        className="flow-line"
                        d={line.d}
                        fill="none"
                        stroke={line.side === 'high' ? '#F59E0B' : '#38BDF8'}
                        strokeWidth={1.2}
                        strokeLinecap="round"
                      />
                    </g>
                  ))}

                  {/* Component geometric icons */}
                  {coolingComponents.map((c) => {
                    const on = c.id === active.id;
                    const stroke = on ? '#38BDF8' : '#64748B';
                    return (
                      <g key={c.id} opacity={on ? 1 : 0.75} className="cursor-pointer" onClick={() => setActiveId(c.id)}>
                        {on && <circle cx={c.x} cy={c.y} r={13} fill="#0284C7" fillOpacity={0.25} />}

                        {c.id === 'condenser' && (
                          <g stroke={stroke} strokeWidth={0.9} fill="#052436">
                            <rect x={540} y={96} width={8} height={32} rx={1} />
                            {[102, 108, 114, 120, 126].map((y) => (
                              <line key={y} x1={540} x2={548} y1={y} y2={y} strokeOpacity={0.6} />
                            ))}
                          </g>
                        )}
                        {c.id === 'compressor' && (
                          <g stroke={stroke} strokeWidth={1} fill="#052436">
                            <circle cx={c.x} cy={c.y} r={8} />
                            <circle cx={c.x} cy={c.y} r={3.5} stroke={stroke} />
                          </g>
                        )}
                        {c.id === 'receiver-drier' && (
                          <rect x={524} y={114} width={8} height={16} rx={4} stroke={stroke} strokeWidth={0.9} fill="#052436" />
                        )}
                        {c.id === 'expansion-valve' && (
                          <path
                            d={`M${c.x} ${c.y - 6} L${c.x + 6} ${c.y} L${c.x} ${c.y + 6} L${c.x - 6} ${c.y} Z`}
                            stroke={stroke}
                            strokeWidth={0.9}
                            fill="#052436"
                          />
                        )}
                        {c.id === 'evaporator' && (
                          <g stroke={stroke} strokeWidth={0.9} fill="#052436">
                            <rect x={403} y={86} width={14} height={20} rx={1} />
                            {[403 + 3.5, 403 + 7, 403 + 10.5].map((x) => (
                              <line key={x} x1={x} x2={x} y1={86} y2={106} strokeOpacity={0.6} />
                            ))}
                          </g>
                        )}
                        {c.id === 'blower' && (
                          <g stroke={stroke} strokeWidth={1} fill="#052436">
                            <circle cx={c.x} cy={c.y} r={7} />
                            <path d={`M${c.x} ${c.y} L${c.x + 5} ${c.y - 3} M${c.x} ${c.y} L${c.x - 4} ${c.y - 4} M${c.x} ${c.y} L${c.x} ${c.y + 6}`} />
                          </g>
                        )}
                      </g>
                    );
                  })}
                </svg>

                {/* Hotspot buttons */}
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
                        className={`flex h-6 w-6 items-center justify-center rounded-full border font-mono text-[10px] font-bold transition-all ${
                          on
                            ? 'border-[#38BDF8] bg-[#38BDF8] text-[#021824] shadow-[0_0_12px_rgba(56,189,248,0.6)]'
                            : 'border-[#144B66] bg-[#052436] text-[#A2B8C2] group-hover:border-[#38BDF8] group-hover:text-white'
                        }`}
                      >
                        {i + 1}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Technical Legend */}
              <div className="mt-5 flex flex-wrap gap-x-8 gap-y-2 border-t border-[#144B66]/30 pt-3 font-mono text-[11px] uppercase tracking-[0.14em]">
                <span className="flex items-center gap-2 text-[#F59E0B]">
                  <span aria-hidden="true" className="h-1 w-6 rounded-full bg-[#EA580C]" />
                  <span>High Pressure · Heat Extraction</span>
                </span>
                <span className="flex items-center gap-2 text-[#38BDF8]">
                  <span aria-hidden="true" className="h-1 w-6 rounded-full bg-[#0284C7]" />
                  <span>Low Pressure · Chilled Vapour</span>
                </span>
              </div>
            </div>
          </Reveal>

          {/* Right: Component Selector & Diagnostic Specification */}
          <Reveal delay={0.1} className="lg:col-span-4">
            <ul className="grid grid-cols-2 gap-px rounded-xl overflow-hidden border border-[#144B66] bg-[#02141F] sm:grid-cols-3 lg:grid-cols-2">
              {coolingComponents.map((c, i) => {
                const on = c.id === active.id;
                return (
                  <li key={c.id} className="bg-[#052436]/70">
                    <button
                      type="button"
                      onClick={() => setActiveId(c.id)}
                      aria-pressed={on}
                      className={`flex min-h-12 w-full items-center gap-2.5 px-3 py-3 text-left text-xs transition-colors ${
                        on
                          ? 'bg-[#144B66] text-white font-bold'
                          : 'text-[#A2B8C2] hover:bg-[#07354E] hover:text-white'
                      }`}
                    >
                      <span className={`font-mono text-[10px] ${on ? 'text-[#38BDF8]' : 'text-[#64748B]'}`}>
                        0{i + 1}
                      </span>
                      <span className="truncate">{c.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 min-h-[20rem] rounded-2xl border border-[#144B66] bg-[#032332]/90 p-6 backdrop-blur-md shadow-2xl">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#38BDF8]">
                    {active.location}
                  </span>
                  <h3 className="mt-2 font-wide text-2xl font-bold text-white">{active.name}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#A2B8C2]">{active.role}</p>

                  <div className="mt-5 rounded-xl border border-[#144B66]/60 bg-[#021824]/60 p-3.5">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#F59E0B] flex items-center gap-1.5">
                      <AlertCircle className="h-3.5 w-3.5" />
                      Failure Signs to Watch For
                    </p>
                    <ul className="mt-2.5 space-y-1.5 text-xs text-[#E0F2FE]">
                      {active.signs.map((s) => (
                        <li key={s} className="flex gap-2 items-start">
                          <span className="mt-1 h-1 w-1 rounded-full bg-[#38BDF8] shrink-0" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 rounded-xl border border-[#144B66]/40 bg-[#052436]/50 p-3.5">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#CDE6F5] flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#38BDF8]" />
                      Workshop Testing Standard
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#A2B8C2]">{diagnosticNote}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
