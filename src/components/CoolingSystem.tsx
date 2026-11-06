'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SectionHeading } from '@/components/SectionHeading';
import { coolingComponents } from '@/data/janakaData';
import { Phone, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

interface ComponentDetail {
  id: string;
  name: string;
  location: string;
  role: string;
  signs: string[];
  serviceNote: string;
}

const componentDetails: Record<string, string> = {
  compressor:
    'We inspect pulley bearing play, clutch coil resistance, internal reed valves, and high/low operating pressures before deciding on repair vs replacement.',
  condenser:
    'We pressure-test for micro-punctures from road debris and flush blocked parallel micro-channels to restore optimal thermal rejection.',
  'receiver-drier':
    'Desiccant packs become saturated after system depressurization. We install fresh receiver-driers during major services to protect compressor valves from moisture acid.',
  'expansion-valve':
    'We diagnose thermal bulb responsiveness and superheat calibration when pressures freeze lines or prevent liquid vaporization.',
  evaporator:
    'Located inside the dashboard HVAC core. We use electronic halogen sniffing and nitrogen hold-testing to locate microscopic leaks without guesswork.',
  blower:
    'We test motor current draw, blower resistor steps, and inspect cabin micro-filters for particulate loading and bacterial odour formation.',
};

export const CoolingSystem: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(coolingComponents[0].id);
  const active = coolingComponents.find((c) => c.id === activeId) ?? coolingComponents[0];
  const serviceNote = componentDetails[active.id] || '';

  return (
    <section
      id="system"
      aria-labelledby="system-title"
      className="relative overflow-hidden bg-[#FFFFFF] py-24 sm:py-28 md:py-32 border-b border-[#E5E3DE]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="system-title"
          index="02"
          eyebrow="Technical Circuit Architecture"
          title="How Car Air Conditioning Works"
          intro="Vehicle climate control is a closed, pressurized thermodynamic loop that extracts heat from the passenger cabin and releases it into outside air. Select any component below to inspect its role and failure symptoms."
          tone="light"
        />

        {/* Legend */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-b border-[#E5E3DE] pb-4">
          <div className="flex flex-wrap items-center gap-6 font-mono text-xs uppercase tracking-wider">
            <span className="flex items-center gap-2 text-[#9A3412]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#EA580C]" />
              High Pressure · Heat Extraction (Engine Bay)
            </span>
            <span className="flex items-center gap-2 text-[#0369A1]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#0284C7]" />
              Low Pressure · Chilled Air (Passenger Cabin)
            </span>
          </div>
          <span className="text-xs text-[#71818A]">Click any part on the diagram or tabs</span>
        </div>

        {/* Main interactive area: Technical Blueprint + Detail panel */}
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left: Technical Schematic Diagram */}
          <div className="rounded-2xl border border-[#E5E3DE] bg-[#F6F4EF] p-5 sm:p-7 lg:col-span-7">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#71818A]">
                Schematic: Closed Refrigerant Circuit (R134a / R1234yf)
              </span>
              <span className="rounded bg-[#FFFFFF] px-2.5 py-1 font-mono text-[10px] text-[#24282B] border border-[#E5E3DE]">
                ISO 14224 Standard
              </span>
            </div>

            {/* SVG Circuit Schematic */}
            <div className="relative w-full overflow-hidden rounded-xl bg-[#FFFFFF] p-2 sm:p-4 border border-[#E5E3DE]">
              <svg
                viewBox="0 0 700 420"
                className="w-full h-auto"
                role="img"
                aria-label="Technical vehicle air conditioning circuit diagram"
              >
                <defs>
                  {/* Grid pattern for technical drafting feel */}
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#F1F0EC" strokeWidth="0.8" />
                  </pattern>
                  <marker
                    id="arrow-high"
                    viewBox="0 0 10 10"
                    refX="6"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1 L 8 5 L 0 9 z" fill="#EA580C" />
                  </marker>
                  <marker
                    id="arrow-low"
                    viewBox="0 0 10 10"
                    refX="6"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1 L 8 5 L 0 9 z" fill="#0284C7" />
                  </marker>
                </defs>

                <rect width="700" height="420" fill="url(#grid)" />

                {/* Firewall Partition dividing Engine Bay and Cabin */}
                <line
                  x1="390"
                  y1="30"
                  x2="390"
                  y2="390"
                  stroke="#CBD5E1"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <text
                  x="380"
                  y="45"
                  fill="#94A3B8"
                  fontSize="10"
                  fontFamily="monospace"
                  textAnchor="end"
                  fontWeight="bold"
                  letterSpacing="1"
                >
                  ENGINE BAY (FRONT)
                </text>
                <text
                  x="400"
                  y="45"
                  fill="#94A3B8"
                  fontSize="10"
                  fontFamily="monospace"
                  textAnchor="start"
                  fontWeight="bold"
                  letterSpacing="1"
                >
                  PASSENGER CABIN
                </text>

                {/* PIPING: HIGH PRESSURE (Amber/Orange line) */}
                {/* Compressor -> Condenser */}
                <path
                  d="M 250 310 L 110 310 L 110 160"
                  fill="none"
                  stroke="#EA580C"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  markerEnd="url(#arrow-high)"
                />
                {/* Condenser -> Receiver Drier */}
                <path
                  d="M 110 90 L 110 70 L 250 70"
                  fill="none"
                  stroke="#EA580C"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Receiver Drier -> Expansion Valve */}
                <path
                  d="M 310 70 L 460 70 L 460 110"
                  fill="none"
                  stroke="#EA580C"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  markerEnd="url(#arrow-high)"
                />

                {/* PIPING: LOW PRESSURE (Ice Blue line) */}
                {/* Expansion Valve -> Evaporator */}
                <path
                  d="M 460 150 L 460 190"
                  fill="none"
                  stroke="#0284C7"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  markerEnd="url(#arrow-low)"
                />
                {/* Evaporator -> Compressor */}
                <path
                  d="M 460 270 L 460 340 L 290 340 L 290 310"
                  fill="none"
                  stroke="#0284C7"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  markerEnd="url(#arrow-low)"
                />

                {/* COMPONENT 1: COMPRESSOR */}
                <g
                  className="cursor-pointer transition-transform duration-200"
                  onClick={() => setActiveId('compressor')}
                >
                  <rect
                    x="240"
                    y="275"
                    width="100"
                    height="70"
                    rx="8"
                    fill={activeId === 'compressor' ? '#123D4A' : '#FFFFFF'}
                    stroke={activeId === 'compressor' ? '#2586A3' : '#CBD5E1'}
                    strokeWidth={activeId === 'compressor' ? '2.5' : '1.5'}
                  />
                  <circle
                    cx="260"
                    cy="310"
                    r="16"
                    fill={activeId === 'compressor' ? '#2586A3' : '#F1F5F9'}
                  />
                  <text
                    x="290"
                    y="305"
                    fill={activeId === 'compressor' ? '#FFFFFF' : '#24282B'}
                    fontSize="11"
                    fontWeight="bold"
                  >
                    Compressor
                  </text>
                  <text
                    x="290"
                    y="322"
                    fill={activeId === 'compressor' ? '#99D5E8' : '#71818A'}
                    fontSize="9"
                    fontFamily="monospace"
                  >
                    01 · Pump
                  </text>
                </g>

                {/* COMPONENT 2: CONDENSER */}
                <g
                  className="cursor-pointer transition-transform duration-200"
                  onClick={() => setActiveId('condenser')}
                >
                  <rect
                    x="60"
                    y="90"
                    width="100"
                    height="70"
                    rx="8"
                    fill={activeId === 'condenser' ? '#123D4A' : '#FFFFFF'}
                    stroke={activeId === 'condenser' ? '#2586A3' : '#CBD5E1'}
                    strokeWidth={activeId === 'condenser' ? '2.5' : '1.5'}
                  />
                  {/* Radiator coil lines */}
                  <line
                    x1="75"
                    y1="105"
                    x2="145"
                    y2="105"
                    stroke={activeId === 'condenser' ? '#99D5E8' : '#94A3B8'}
                    strokeWidth="1.5"
                  />
                  <line
                    x1="75"
                    y1="115"
                    x2="145"
                    y2="115"
                    stroke={activeId === 'condenser' ? '#99D5E8' : '#94A3B8'}
                    strokeWidth="1.5"
                  />
                  <line
                    x1="75"
                    y1="125"
                    x2="145"
                    y2="125"
                    stroke={activeId === 'condenser' ? '#99D5E8' : '#94A3B8'}
                    strokeWidth="1.5"
                  />
                  <text
                    x="110"
                    y="145"
                    fill={activeId === 'condenser' ? '#FFFFFF' : '#24282B'}
                    fontSize="11"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    Condenser
                  </text>
                  <text
                    x="110"
                    y="157"
                    fill={activeId === 'condenser' ? '#99D5E8' : '#71818A'}
                    fontSize="9"
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    02 · Heat Release
                  </text>
                </g>

                {/* COMPONENT 3: RECEIVER-DRIER */}
                <g
                  className="cursor-pointer transition-transform duration-200"
                  onClick={() => setActiveId('receiver-drier')}
                >
                  <rect
                    x="220"
                    y="45"
                    width="90"
                    height="50"
                    rx="8"
                    fill={activeId === 'receiver-drier' ? '#123D4A' : '#FFFFFF'}
                    stroke={activeId === 'receiver-drier' ? '#2586A3' : '#CBD5E1'}
                    strokeWidth={activeId === 'receiver-drier' ? '2.5' : '1.5'}
                  />
                  <text
                    x="265"
                    y="68"
                    fill={activeId === 'receiver-drier' ? '#FFFFFF' : '#24282B'}
                    fontSize="11"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    Receiver-Drier
                  </text>
                  <text
                    x="265"
                    y="83"
                    fill={activeId === 'receiver-drier' ? '#99D5E8' : '#71818A'}
                    fontSize="9"
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    03 · Filter & Dry
                  </text>
                </g>

                {/* COMPONENT 4: EXPANSION VALVE */}
                <g
                  className="cursor-pointer transition-transform duration-200"
                  onClick={() => setActiveId('expansion-valve')}
                >
                  <rect
                    x="415"
                    y="105"
                    width="90"
                    height="45"
                    rx="8"
                    fill={activeId === 'expansion-valve' ? '#123D4A' : '#FFFFFF'}
                    stroke={activeId === 'expansion-valve' ? '#2586A3' : '#CBD5E1'}
                    strokeWidth={activeId === 'expansion-valve' ? '2.5' : '1.5'}
                  />
                  <text
                    x="460"
                    y="126"
                    fill={activeId === 'expansion-valve' ? '#FFFFFF' : '#24282B'}
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    Expansion Valve
                  </text>
                  <text
                    x="460"
                    y="140"
                    fill={activeId === 'expansion-valve' ? '#99D5E8' : '#71818A'}
                    fontSize="9"
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    04 · Pressure Drop
                  </text>
                </g>

                {/* COMPONENT 5: EVAPORATOR */}
                <g
                  className="cursor-pointer transition-transform duration-200"
                  onClick={() => setActiveId('evaporator')}
                >
                  <rect
                    x="415"
                    y="190"
                    width="90"
                    height="80"
                    rx="8"
                    fill={activeId === 'evaporator' ? '#123D4A' : '#FFFFFF'}
                    stroke={activeId === 'evaporator' ? '#2586A3' : '#CBD5E1'}
                    strokeWidth={activeId === 'evaporator' ? '2.5' : '1.5'}
                  />
                  {/* Evaporator chilling fins */}
                  <line
                    x1="430"
                    y1="205"
                    x2="490"
                    y2="205"
                    stroke={activeId === 'evaporator' ? '#99D5E8' : '#0284C7'}
                    strokeWidth="1.5"
                  />
                  <line
                    x1="430"
                    y1="215"
                    x2="490"
                    y2="215"
                    stroke={activeId === 'evaporator' ? '#99D5E8' : '#0284C7'}
                    strokeWidth="1.5"
                  />
                  <line
                    x1="430"
                    y1="225"
                    x2="490"
                    y2="225"
                    stroke={activeId === 'evaporator' ? '#99D5E8' : '#0284C7'}
                    strokeWidth="1.5"
                  />
                  <text
                    x="460"
                    y="245"
                    fill={activeId === 'evaporator' ? '#FFFFFF' : '#24282B'}
                    fontSize="11"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    Evaporator
                  </text>
                  <text
                    x="460"
                    y="260"
                    fill={activeId === 'evaporator' ? '#99D5E8' : '#71818A'}
                    fontSize="9"
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    05 · Cabin Cooling
                  </text>
                </g>

                {/* COMPONENT 6: BLOWER MOTOR & CABIN FILTER */}
                <g
                  className="cursor-pointer transition-transform duration-200"
                  onClick={() => setActiveId('blower')}
                >
                  <rect
                    x="535"
                    y="190"
                    width="125"
                    height="80"
                    rx="8"
                    fill={activeId === 'blower' ? '#123D4A' : '#FFFFFF'}
                    stroke={activeId === 'blower' ? '#2586A3' : '#CBD5E1'}
                    strokeWidth={activeId === 'blower' ? '2.5' : '1.5'}
                  />
                  {/* Airflow arrows into cabin */}
                  <path
                    d="M 505 230 L 535 230"
                    stroke="#0284C7"
                    strokeWidth="2"
                    strokeDasharray="3 3"
                  />
                  <text
                    x="597"
                    y="222"
                    fill={activeId === 'blower' ? '#FFFFFF' : '#24282B'}
                    fontSize="11"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    Blower & Filter
                  </text>
                  <text
                    x="597"
                    y="238"
                    fill={activeId === 'blower' ? '#99D5E8' : '#71818A'}
                    fontSize="9"
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    06 · Cabin Air Delivery
                  </text>
                  <text
                    x="597"
                    y="254"
                    fill={activeId === 'blower' ? '#E2F3F9' : '#0284C7'}
                    fontSize="8"
                    fontWeight="600"
                    textAnchor="middle"
                  >
                    → Chilled Air To Vents
                  </text>
                </g>
              </svg>
            </div>

            {/* Quick selector buttons below diagram */}
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {coolingComponents.map((c, i) => {
                const isSelected = c.id === active.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setActiveId(c.id)}
                    className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-left transition-all ${
                      isSelected
                        ? 'border-[#2586A3] bg-[#123D4A] text-white shadow-sm'
                        : 'border-[#E5E3DE] bg-[#FFFFFF] text-[#24282B] hover:border-[#CBD5E1]'
                    }`}
                  >
                    <span
                      className={`font-mono text-[11px] font-bold ${
                        isSelected ? 'text-[#99D5E8]' : 'text-[#71818A]'
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <span className="truncate text-xs font-medium">{c.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Focused Technical Detail Inspection Card */}
          <div className="rounded-2xl border border-[#E5E3DE] bg-[#FFFFFF] p-6 sm:p-8 lg:col-span-5 shadow-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-center justify-between border-b border-[#E5E3DE] pb-4">
                  <div>
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#2586A3]">
                      Component #{coolingComponents.findIndex((c) => c.id === active.id) + 1}
                    </span>
                    <h3 className="mt-1 font-serif text-2xl font-bold text-[#24282B]">
                      {active.name}
                    </h3>
                  </div>
                  <span className="rounded-full bg-[#F6F4EF] px-3 py-1 font-mono text-[11px] text-[#71818A] border border-[#E5E3DE]">
                    Automotive A/C
                  </span>
                </div>

                {/* Location */}
                <div className="mt-5">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#71818A]">
                    Vehicle Location
                  </p>
                  <p className="mt-1 text-sm font-medium text-[#24282B]">{active.location}</p>
                </div>

                {/* Function / Role */}
                <div className="mt-5">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#71818A]">
                    Engineering Role
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[#4B5563]">{active.role}</p>
                </div>

                {/* Failure Symptoms */}
                <div className="mt-6 rounded-xl bg-[#FFF7ED] p-4 border border-[#FFEDD5]">
                  <div className="flex items-center gap-2 text-[#9A3412]">
                    <AlertCircle className="h-4 w-4" />
                    <p className="font-mono text-[11px] font-bold uppercase tracking-wider">
                      Common Failure Symptoms
                    </p>
                  </div>
                  <ul className="mt-3 space-y-2">
                    {active.signs.map((sign, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#7C2D12]">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#EA580C]" />
                        <span>{sign}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Workshop Diagnostics Note */}
                <div className="mt-5 rounded-xl bg-[#F6F4EF] p-4 border border-[#E5E3DE]">
                  <div className="flex items-center gap-2 text-[#123D4A]">
                    <CheckCircle2 className="h-4 w-4 text-[#2586A3]" />
                    <p className="font-mono text-[11px] font-bold uppercase tracking-wider">
                      How Janaka Auto AC Inspects It
                    </p>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[#4B5563]">{serviceNote}</p>
                </div>

                {/* Direct Action */}
                <div className="mt-6 pt-5 border-t border-[#E5E3DE] flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#71818A]">Experiencing these symptoms?</p>
                    <a
                      href="tel:+94714551409"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#123D4A] hover:text-[#2586A3]"
                    >
                      <Phone className="h-3 w-3" />
                      +94 71 455 1409
                    </a>
                  </div>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#123D4A] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#2586A3]"
                  >
                    <span>Book Inspection</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
