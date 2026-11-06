'use client';

import React, { useId } from 'react';
import { motion, type MotionValue } from 'framer-motion';

/**
 * Precision illustrated side profile of a modern sports fastback (authentic Honda Civic RS).
 * Facing right in a 640×200 box with balanced proportions and authentic automotive geometry.
 */
export const CAR_VIEWBOX = '0 0 640 200';

export const CAR_BODY_PATH =
  'M 148 140 ' +
  'C 138 136, 134 126, 136 116 ' +
  'L 134 104 ' +
  'C 134 96, 142 90, 154 86 ' +
  'L 172 84 ' +
  'C 202 82, 240 64, 272 46 ' +
  'C 300 40, 335 39, 365 41 ' +
  'C 392 44, 418 58, 436 82 ' +
  'C 468 84, 514 88, 544 94 ' +
  'C 554 96, 556 102, 550 112 ' +
  'L 546 124 ' +
  'C 544 132, 536 138, 522 140 ' +
  'L 501 140 ' +
  'A 33 33 0 0 0 435 140 ' +
  'L 229 140 ' +
  'A 33 33 0 0 0 163 140 ' +
  'Z';

export const CAR_GLASS_PATH =
  'M 432 80 ' +
  'L 362 44 ' +
  'C 334 42, 298 43, 272 48 ' +
  'L 186 82 ' +
  'C 198 82, 214 80, 226 79 ' +
  'L 432 80 ' +
  'Z';

export const WHEELS = [
  { cx: 196, cy: 138 },
  { cx: 468, cy: 138 },
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
    <circle cx={cx} cy={cy} r={27} fill="#040a12" />
    <circle cx={cx} cy={cy} r={25.5} fill="none" stroke="#172330" strokeWidth={2} />

    {/* Cross-Drilled Brake Rotor */}
    <circle cx={cx} cy={cy} r={20} fill={`url(#${rotorId})`} stroke="#475569" strokeWidth={0.8} />

    {/* Amber Performance Caliper */}
    <path
      d={`M${cx - 14} ${cy - 16} C${cx - 9} ${cy - 21} ${cx - 2} ${cy - 23} ${cx + 5} ${cy - 21} L${cx + 3} ${cy - 12} C${cx - 2} ${cy - 14} ${cx - 7} ${cy - 12} ${cx - 10} ${cy - 8} Z`}
      fill="#fb8500"
      stroke="#ffb703"
      strokeWidth={0.8}
    />

    {/* Rotating Turbine Alloy Rim */}
    <motion.g style={rotate ? { rotate, transformOrigin: `${cx}px ${cy}px` } : undefined}>
      <circle cx={cx} cy={cy} r={18} fill={`url(#${rimId})`} />
      {/* 5 Double Turbine Spokes */}
      {[0, 72, 144, 216, 288].map((angle) => (
        <g key={angle} transform={`rotate(${angle + 36} ${cx} ${cy})`}>
          <path
            d={`M${cx - 2.5} ${cy - 5} L${cx - 4.5} ${cy - 16.5} L${cx + 4.5} ${cy - 16.5} L${cx + 2.5} ${cy - 5} Z`}
            fill="#06121c"
            stroke="#8ecae6"
            strokeWidth={0.6}
          />
        </g>
      ))}
      {/* Polished Machined Outer Lip */}
      <circle cx={cx} cy={cy} r={18} fill="none" stroke="#e2e8f0" strokeOpacity={0.8} strokeWidth={1.2} />
      {/* Center Hub */}
      <circle cx={cx} cy={cy} r={4.5} fill="#e2e8f0" />
      <circle cx={cx} cy={cy} r={1.8} fill="#021824" />
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
        <linearGradient id={ids.body} x1="0%" y1="0%" x2="100%" y2="80%">
          <stop offset="0%" stopColor="#02283a" />
          <stop offset="22%" stopColor="#053c58" />
          <stop offset="50%" stopColor="#126782" />
          <stop offset="78%" stopColor="#219ebc" />
          <stop offset="90%" stopColor="#126782" />
          <stop offset="100%" stopColor="#03202e" />
        </linearGradient>

        {/* Laser Shoulder Highlight */}
        <linearGradient id={ids.edge} x1="134" y1="0" x2="554" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8ecae6" stopOpacity="0.2" />
          <stop offset="35%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="75%" stopColor="#219ebc" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#8ecae6" stopOpacity="1" />
        </linearGradient>

        {/* Ceramic Tinted Glass */}
        <linearGradient id={ids.glass} x1="186" y1="42" x2="432" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#03080e" />
          <stop offset="45%" stopColor="#081826" />
          <stop offset="100%" stopColor="#122f47" />
        </linearGradient>

        {/* Projector Matrix Headlight Beam (facing forward to the right) */}
        <linearGradient id={ids.beam} x1="548" y1="0" x2="900" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#dff6ff" stopOpacity="0.85" />
          <stop offset="25%" stopColor="#219ebc" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#219ebc" stopOpacity="0" />
        </linearGradient>

        {/* Deep Ground Contact Shadow */}
        <radialGradient id={ids.shadow} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#000000" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>

        {/* Atmospheric Cyan Underglow */}
        <radialGradient id={ids.underglow} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#219ebc" stopOpacity="0.45" />
          <stop offset="65%" stopColor="#126782" stopOpacity="0.1" />
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
      <ellipse cx="340" cy="164" rx="220" ry="9" fill={`url(#${ids.shadow})`} />
      <ellipse cx="340" cy="161" rx="180" ry="6" fill={`url(#${ids.underglow})`} />

      {/* Matrix Headlight Beam Projection (shining forward to the right) */}
      {headlights && <path d="M 546 98 L 900 72 L 900 162 L 546 114 Z" fill={`url(#${ids.beam})`} />}

      {/* Aerodynamic Airflow Wake trailing off the rear */}
      {airflow && (
        <g fill="none" stroke="#219ebc" strokeLinecap="round" strokeWidth={1.6} opacity={0.85} aria-hidden="true">
          <path className="airflow-line" d="M 530 46 C 410 20 220 18 -20 38" strokeOpacity={0.75} />
          <path className="airflow-line" style={{ animationDelay: '-0.9s' }} d="M 490 70 C 380 54 210 50 -40 62" strokeOpacity={0.45} />
          <path className="airflow-line" style={{ animationDelay: '-1.7s' }} d="M 136 108 C 80 106 20 106 -60 108" strokeOpacity={0.55} />
          <path className="airflow-line" style={{ animationDelay: '-0.4s' }} d="M 150 90 C 90 88 30 86 -50 88" strokeOpacity={0.35} />
        </g>
      )}

      {/* Main Sculpted Body Shell */}
      <path d={CAR_BODY_PATH} fill={`url(#${ids.body})`} />

      {/* Civic RS Black Sport Wing Spoiler */}
      <path d="M 142 80 L 172 79 L 168 83 L 140 84 Z" fill="#020e17" />
      <path d="M 146 83 L 146 87 L 149 87 L 149 83 Z" fill="#020e17" />
      <path d="M 164 83 L 164 87 L 167 87 L 167 83 Z" fill="#020e17" />

      {/* Ceramic Tinted Windows */}
      <path d={CAR_GLASS_PATH} fill={`url(#${ids.glass})`} />

      {/* Dual Reflection Sheen on Glass */}
      <path d="M 274 50 L 308 44 L 292 78 L 254 79 Z" fill="#ffffff" fillOpacity={0.08} />
      <path d="M 370 46 L 400 56 L 384 77 L 356 77 Z" fill="#ffffff" fillOpacity={0.05} />

      {/* B-Pillar & Rear Quarter Dividers */}
      <path d="M 326 41 L 335 41 L 333 79 L 325 79 Z" fill="#03080e" />
      <path d="M 244 57 L 250 60 L 240 79 L 234 79 Z" fill="#03080e" opacity="0.9" />

      {/* Laser Chrome Shoulder Crease Highlight */}
      <path
        d="M 154 86 L 172 84 C 202 82, 240 64, 272 46 C 300 40, 335 39, 365 41 C 392 44, 418 58, 436 82 C 468 84, 514 88, 544 94 L 550 102"
        fill="none"
        stroke={`url(#${ids.edge})`}
        strokeWidth={1.6}
      />

      {/* Dynamic Body Feature Lines */}
      <path d="M 148 93 C 240 89 415 87 542 95" fill="none" stroke="#8ecae6" strokeOpacity={0.35} strokeWidth={1.2} />
      <path d="M 229 124 C 285 122 395 122 435 126" fill="none" stroke="#219ebc" strokeOpacity={0.25} strokeWidth={1} />

      {/* Lower Aero Sill with Winglet */}
      <path d="M 229 136 L 435 136" stroke="#021824" strokeWidth={3} />
      <path d="M 433 132 L 439 138 L 433 138 Z" fill="#219ebc" opacity="0.85" />

      {/* Door Shut Lines */}
      <g stroke="#03101c" strokeWidth={1.2} fill="none" opacity="0.85">
        <path d="M 244 79 L 236 138" />
        <path d="M 330 79 L 330 138" />
        <path d="M 428 79 C 431 93 431 116 428 138" />
      </g>

      {/* Flush Cyber Door Handles */}
      <rect x="272" y="88" width="16" height="3" rx="1.5" fill="#0b2438" stroke="#219ebc" strokeWidth={0.7} />
      <rect x="368" y="88" width="16" height="3" rx="1.5" fill="#0b2438" stroke="#219ebc" strokeWidth={0.7} />

      {/* Aerodynamic Digital Side Mirror */}
      <path d="M 426 71 C 434 64 445 66 448 75 L 432 78 Z" fill="#081724" stroke="#8ecae6" strokeOpacity={0.7} strokeWidth={1} />

      {/* Jewel-Eye Matrix LED Headlights (at front right corner) */}
      <path d="M 522 93 C 532 95 542 97 548 102 L 534 100 C 528 98 524 95 522 93 Z" fill="#dff6ff" />
      <circle cx="530" cy="96" r="2" fill="#219ebc" />
      <circle cx="537" cy="98" r="2" fill="#ffffff" />
      <circle cx="544" cy="99" r="1.6" fill="#dff6ff" />
      {/* Cyan DRL Eyebrow pointing forward */}
      <path d="M 520 92 L 548 101" stroke="#8ecae6" strokeWidth={1.8} strokeLinecap="round" />

      {/* Continuous Red Cyber Tail Light Bar (at rear left corner) */}
      <path d="M 132 93 L 146 88 L 148 93 L 134 98 Z" fill="#ef4444" />
      <path d="M 131 93 L 145 88" stroke="#ff7878" strokeWidth={1.3} />

      {/* Front Honeycomb Lower Intake & Splitter */}
      <path d="M 534 110 L 546 110 L 544 120 L 536 120 Z" fill="#030b12" />
      <path d="M 530 124 L 548 124" stroke="#219ebc" strokeWidth={1.4} opacity="0.85" />

      {/* Interactive Rotating Wheels */}
      {WHEELS.map((w) => (
        <Wheel key={w.cx} cx={w.cx} cy={w.cy} rimId={ids.rim} rotorId={ids.rotor} rotate={wheelRotate} />
      ))}
    </svg>
  );
};
