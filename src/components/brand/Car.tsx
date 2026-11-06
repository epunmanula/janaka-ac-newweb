'use client';

import React, { useId } from 'react';
import { motion, type MotionValue } from 'framer-motion';

/**
 * Original precision sports fastback sedan, drawn facing right in a 640×200 box.
 * Geometry is shared with the cooling-system diagram and arrival animation.
 */
export const CAR_VIEWBOX = '0 0 640 200';

export const CAR_BODY_PATH =
  'M46 149 C40 146 38 140 38 132 L40 116 C41 106 48 100 60 98 L168 90 C196 86 222 66 256 54 ' +
  'C290 42 340 38 384 40 C418 42 440 50 462 64 C478 74 494 84 510 90 L586 100 C604 103 614 110 616 122 ' +
  'L615 136 C614 144 608 148 598 149 L528 149 A38 38 0 0 0 452 149 L188 149 A38 38 0 0 0 112 149 Z';

export const CAR_GLASS_PATH =
  'M200 91 C226 72 252 60 282 53 C312 47 350 46 384 47 C410 49 432 57 452 70 L482 90 Z';

export const WHEELS = [
  { cx: 150, cy: 149 },
  { cx: 490, cy: 149 },
] as const;

interface WheelProps {
  cx: number;
  cy: number;
  rimId: string;
  rotorId: string;
  rotate?: MotionValue<number>;
}

const Wheel: React.FC<WheelProps> = ({ cx, cy, rimId, rotorId, rotate }) => (
  <g>
    {/* Performance Tire */}
    <circle cx={cx} cy={cy} r={32} fill="#040a12" />
    <circle cx={cx} cy={cy} r={30} fill="none" stroke="#172330" strokeWidth={2.4} />

    {/* Cross-Drilled Brake Rotor */}
    <circle cx={cx} cy={cy} r={24} fill={`url(#${rotorId})`} stroke="#475569" strokeWidth={0.8} />

    {/* Thermodynamic Amber Performance Caliper */}
    <path
      d={`M${cx - 16} ${cy - 18} C${cx - 10} ${cy - 24} ${cx - 2} ${cy - 26} ${cx + 6} ${cy - 24} L${cx + 4} ${cy - 14} C${cx - 2} ${cy - 16} ${cx - 8} ${cy - 14} ${cx - 12} ${cy - 10} Z`}
      fill="#fb8500"
      stroke="#ffb703"
      strokeWidth={0.8}
    />

    {/* Rotating Turbine Alloy Rim */}
    <motion.g style={rotate ? { rotate, transformOrigin: `${cx}px ${cy}px` } : undefined}>
      <circle cx={cx} cy={cy} r={22} fill={`url(#${rimId})`} />
      {/* 5 Double Turbine Spokes */}
      {[0, 72, 144, 216, 288].map((angle) => (
        <g key={angle} transform={`rotate(${angle + 36} ${cx} ${cy})`}>
          <path
            d={`M${cx - 2.8} ${cy - 5} L${cx - 4.8} ${cy - 20.5} L${cx + 4.8} ${cy - 20.5} L${cx + 2.8} ${cy - 5} Z`}
            fill="#06121c"
            stroke="#8ecae6"
            strokeWidth={0.6}
          />
        </g>
      ))}
      {/* Polished Machined Outer Lip */}
      <circle cx={cx} cy={cy} r={22} fill="none" stroke="#e2e8f0" strokeOpacity={0.8} strokeWidth={1.3} />
      {/* Center Hub */}
      <circle cx={cx} cy={cy} r={5.5} fill="#e2e8f0" />
      <circle cx={cx} cy={cy} r={2.2} fill="#021824" />
    </motion.g>
  </g>
);

interface CarProps {
  className?: string;
  /** Wheel rotation in degrees, usually derived from scroll progress. */
  wheelRotate?: MotionValue<number>;
  /** Trailing cold-air streaks behind the car. */
  airflow?: boolean;
  /** Headlight beam on the road ahead. */
  headlights?: boolean;
  title?: string;
}

export const Car: React.FC<CarProps> = ({
  className,
  wheelRotate,
  airflow = false,
  headlights = false,
  title = 'Precision illustrated side profile of a luxury performance sports sedan',
}) => {
  const uid = useId().replace(/:/g, '');
  const ids = {
    body: `body-${uid}`,
    rim: `rim-${uid}`,
    rotor: `rotor-${uid}`,
    edge: `edge-${uid}`,
    glass: `glass-${uid}`,
    beam: `beam-${uid}`,
    shadow: `shadow-${uid}`,
    underglow: `underglow-${uid}`,
  };

  return (
    <svg viewBox={CAR_VIEWBOX} className={className} role="img" aria-label={title} overflow="visible">
      <defs>
        {/* Nordic Metallic Paint Gradient */}
        <linearGradient id={ids.body} x1="0" y1="38" x2="0" y2="150" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8ecae6" />
          <stop offset="12%" stopColor="#3d7a99" />
          <stop offset="35%" stopColor="#126782" />
          <stop offset="68%" stopColor="#023047" />
          <stop offset="100%" stopColor="#011420" />
        </linearGradient>

        {/* Laser Shoulder Highlight */}
        <linearGradient id={ids.edge} x1="40" y1="0" x2="618" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8ecae6" stopOpacity="0.1" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="78%" stopColor="#219ebc" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#8ecae6" stopOpacity="1" />
        </linearGradient>

        {/* Ceramic Tinted Glass */}
        <linearGradient id={ids.glass} x1="200" y1="44" x2="480" y2="92" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#050e17" />
          <stop offset="50%" stopColor="#0d2235" />
          <stop offset="100%" stopColor="#1b4566" />
        </linearGradient>

        {/* Projector Matrix Headlight Beam */}
        <linearGradient id={ids.beam} x1="616" y1="0" x2="920" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#dff6ff" stopOpacity="0.75" />
          <stop offset="30%" stopColor="#219ebc" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#219ebc" stopOpacity="0" />
        </linearGradient>

        {/* Deep Ground Contact Shadow */}
        <radialGradient id={ids.shadow} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#000000" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>

        {/* Atmospheric Cyan Underglow */}
        <radialGradient id={ids.underglow} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#219ebc" stopOpacity="0.4" />
          <stop offset="70%" stopColor="#126782" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#021824" stopOpacity="0" />
        </radialGradient>

        {/* Machined Rim Radial Gradient */}
        <radialGradient id={ids.rim} cx="35%" cy="30%" r="90%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#94a3b8" />
          <stop offset="85%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </radialGradient>

        {/* Slotted Brake Rotor */}
        <radialGradient id={ids.rotor} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="70%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#1e293b" />
        </radialGradient>
      </defs>

      {/* Ground Contact Shadow & Cyan Ambient Underglow */}
      <ellipse cx="328" cy="182" rx="300" ry="12" fill={`url(#${ids.shadow})`} />
      <ellipse cx="330" cy="178" rx="250" ry="8" fill={`url(#${ids.underglow})`} />

      {/* Matrix Headlight Beam Projection */}
      {headlights && <path d="M615 113 L920 86 L920 178 L615 128 Z" fill={`url(#${ids.beam})`} />}

      {/* Aerodynamic Airflow Wake */}
      {airflow && (
        <g fill="none" stroke="#219ebc" strokeLinecap="round" strokeWidth={1.6} opacity={0.85} aria-hidden="true">
          <path className="airflow-line" d="M605 54 C480 26 260 22 -40 42" strokeOpacity={0.75} />
          <path className="airflow-line" style={{ animationDelay: '-0.9s' }} d="M565 78 C430 60 250 56 -60 68" strokeOpacity={0.45} />
          <path className="airflow-line" style={{ animationDelay: '-1.7s' }} d="M40 120 C-20 118 -80 116 -160 118" strokeOpacity={0.55} />
          <path className="airflow-line" style={{ animationDelay: '-0.4s' }} d="M60 100 C0 96 -60 94 -140 96" strokeOpacity={0.35} />
        </g>
      )}

      {/* Main Sculpted Body Shell */}
      <path d={CAR_BODY_PATH} fill={`url(#${ids.body})`} />

      {/* Ceramic Tinted Windows */}
      <path d={CAR_GLASS_PATH} fill={`url(#${ids.glass})`} />

      {/* Dual Reflection Sheen on Glass */}
      <path d="M298 48 L350 45 L316 86 L270 87 Z" fill="#ffffff" fillOpacity={0.09} />
      <path d="M410 52 L438 60 L418 86 L392 86 Z" fill="#ffffff" fillOpacity={0.05} />

      {/* B-Pillar & Rear Quarter Dividers */}
      <path d="M336 44 L346 44 L344 90 L336 90 Z" fill="#061019" />
      <path d="M440 62 L446 65 L436 88 L430 88 Z" fill="#061019" opacity="0.8" />

      {/* Laser Chrome Shoulder Crease Highlight */}
      <path
        d="M60 98 L168 90 C196 86 222 66 256 54 C290 42 340 38 384 40 C418 42 440 50 462 64 C478 74 494 84 510 90 L586 100 C604 103 614 110 616 122"
        fill="none"
        stroke={`url(#${ids.edge})`}
        strokeWidth={1.6}
      />

      {/* Dynamic Body Feature Lines */}
      <path d="M62 106 C200 98 420 100 604 110" fill="none" stroke="#8ecae6" strokeOpacity={0.3} strokeWidth={1.2} />
      <path d="M188 132 C260 130 380 130 450 134" fill="none" stroke="#219ebc" strokeOpacity={0.25} strokeWidth={1} />

      {/* Lower Aero Sill with Winglet */}
      <path d="M188 142 L450 142" stroke="#021824" strokeWidth="3" />
      <path d="M448 138 L454 144 L448 144 Z" fill="#219ebc" opacity="0.75" />

      {/* Door Shut Lines */}
      <g stroke="#03101c" strokeWidth={1.2} fill="none" opacity="0.85">
        <path d="M232 91 L230 146" />
        <path d="M343 91 L343 147" />
        <path d="M470 91 C474 109 474 129 470 146" />
      </g>

      {/* Flush Cyber Door Handles with Cyan Glow */}
      <rect x="296" y="101" width="20" height="3.5" rx="1.75" fill="#0b2438" stroke="#219ebc" strokeWidth="0.7" />
      <rect x="412" y="101" width="20" height="3.5" rx="1.75" fill="#0b2438" stroke="#219ebc" strokeWidth="0.7" />

      {/* Aerodynamic Digital Side Mirror */}
      <path d="M468 82 C476 75 490 77 493 86 L474 89 Z" fill="#091b29" stroke="#8ecae6" strokeOpacity="0.6" strokeWidth={1} />

      {/* Jewel-Eye Matrix LED Headlights */}
      <path d="M588 102 C600 104 610 108 616 116 L597 114 C592 112 589 108 588 102 Z" fill="#dff6ff" />
      <circle cx="598" cy="110" r="2.2" fill="#219ebc" />
      <circle cx="605" cy="112" r="2.2" fill="#ffffff" />
      <circle cx="612" cy="114" r="1.8" fill="#dff6ff" />
      {/* Cyan DRL Eyebrow */}
      <path d="M586 102 L616 114" stroke="#8ecae6" strokeWidth="1.8" strokeLinecap="round" />

      {/* Continuous Red Cyber Tail Light Bar */}
      <path d="M40 112 L58 104 L62 111 L42 118 Z" fill="#ef4444" />
      <path d="M39 112 L57 104" stroke="#ff7878" strokeWidth="1.2" />

      {/* Front Honeycomb Lower Intake & Splitter */}
      <path d="M598 128 L616 128 L614 138 L600 138 Z" fill="#030b12" />
      <path d="M594 140 L618 140" stroke="#219ebc" strokeWidth="1.4" opacity="0.8" />

      {/* Interactive Rotating Wheels */}
      {WHEELS.map((w) => (
        <Wheel key={w.cx} cx={w.cx} cy={w.cy} rimId={ids.rim} rotorId={ids.rotor} rotate={wheelRotate} />
      ))}
    </svg>
  );
};
