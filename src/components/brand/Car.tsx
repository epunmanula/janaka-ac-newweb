'use client';

import React, { useId } from 'react';
import { motion, type MotionValue } from 'framer-motion';

/**
 * Original side-profile sports sedan, drawn facing right in a 640×200 box.
 * Geometry is shared with the cooling-system diagram so both read as the same car.
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
  rotate?: MotionValue<number>;
}

const Wheel: React.FC<WheelProps> = ({ cx, cy, rimId, rotate }) => (
  <g>
    <circle cx={cx} cy={cy} r={31} fill="#060d14" />
    <circle cx={cx} cy={cy} r={29} fill="none" stroke="#1d2a36" strokeWidth={2} />
    <motion.g style={rotate ? { rotate } : undefined}>
      <circle cx={cx} cy={cy} r={22} fill={`url(#${rimId})`} />
      {[0, 72, 144, 216, 288].map((angle) => (
        <path
          key={angle}
          d={`M${cx - 2.6} ${cy - 5} L${cx - 4.5} ${cy - 20.5} L${cx + 4.5} ${cy - 20.5} L${cx + 2.6} ${cy - 5} Z`}
          fill="#0a121a"
          transform={`rotate(${angle + 36} ${cx} ${cy})`}
        />
      ))}
      <circle cx={cx} cy={cy} r={22} fill="none" stroke="#c9d4de" strokeOpacity={0.55} strokeWidth={1.2} />
      <circle cx={cx} cy={cy} r={5} fill="#c9d4de" />
      <circle cx={cx} cy={cy} r={2} fill="#0a121a" />
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
  title = 'Illustrated side profile of a sports sedan',
}) => {
  const uid = useId().replace(/:/g, '');
  const ids = {
    body: `body-${uid}`,
    rim: `rim-${uid}`,
    edge: `edge-${uid}`,
    glass: `glass-${uid}`,
    beam: `beam-${uid}`,
    shadow: `shadow-${uid}`,
  };

  return (
    <svg viewBox={CAR_VIEWBOX} className={className} role="img" aria-label={title} overflow="visible">
      <defs>
        <linearGradient id={ids.body} x1="0" y1="40" x2="0" y2="150" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#6d8093" />
          <stop offset="0.28" stopColor="#33475a" />
          <stop offset="0.62" stopColor="#18273a" />
          <stop offset="1" stopColor="#0a131d" />
        </linearGradient>
        <linearGradient id={ids.edge} x1="40" y1="0" x2="616" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#aab8c5" stopOpacity="0.1" />
          <stop offset="0.55" stopColor="#e8f1f8" stopOpacity="0.9" />
          <stop offset="1" stopColor="#35c8f4" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id={ids.glass} x1="200" y1="46" x2="480" y2="92" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0b1724" />
          <stop offset="0.6" stopColor="#14283c" />
          <stop offset="1" stopColor="#1f4560" />
        </linearGradient>
        <radialGradient id={ids.rim} cx="0.35" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#e9eff4" />
          <stop offset="0.5" stopColor="#8d9caa" />
          <stop offset="1" stopColor="#3b4855" />
        </radialGradient>
        <linearGradient id={ids.beam} x1="616" y1="0" x2="900" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#dff6ff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#35c8f4" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={ids.shadow} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#000" stopOpacity="0.55" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="328" cy="182" rx="300" ry="10" fill={`url(#${ids.shadow})`} />

      {headlights && <path d="M612 112 L900 92 L900 168 L612 124 Z" fill={`url(#${ids.beam})`} />}

      {airflow && (
        <g fill="none" stroke="#35c8f4" strokeLinecap="round" strokeWidth={1.4} aria-hidden="true">
          <path className="airflow-line" d="M600 58 C480 30 260 26 -40 46" strokeOpacity={0.55} />
          <path className="airflow-line" style={{ animationDelay: '-0.9s' }} d="M560 80 C430 64 250 60 -60 72" strokeOpacity={0.35} />
          <path className="airflow-line" style={{ animationDelay: '-1.7s' }} d="M40 120 C-20 118 -80 116 -160 118" strokeOpacity={0.45} />
          <path className="airflow-line" style={{ animationDelay: '-0.4s' }} d="M60 100 C0 96 -60 94 -140 96" strokeOpacity={0.3} />
        </g>
      )}

      {/* Body */}
      <path d={CAR_BODY_PATH} fill={`url(#${ids.body})`} />
      <path d={CAR_GLASS_PATH} fill={`url(#${ids.glass})`} />
      {/* Glass sheen */}
      <path d="M300 50 L352 47 L318 88 L272 89 Z" fill="#ffffff" fillOpacity={0.06} />
      {/* B-pillar */}
      <path d="M338 46 L348 46 L346 92 L338 92 Z" fill="#0b141e" />

      {/* Upper body edge highlight */}
      <path
        d="M60 98 L168 90 C196 86 222 66 256 54 C290 42 340 38 384 40 C418 42 440 50 462 64 C478 74 494 84 510 90 L586 100 C604 103 614 110 616 122"
        fill="none"
        stroke={`url(#${ids.edge})`}
        strokeWidth={1.4}
      />
      {/* Shoulder line */}
      <path d="M62 106 C200 98 420 100 604 110" fill="none" stroke="#dce7f0" strokeOpacity={0.22} strokeWidth={1.2} />
      {/* Sill */}
      <path d="M192 140 L448 140" stroke="#03080d" strokeOpacity={0.7} strokeWidth={2} />

      {/* Door shut lines & handles */}
      <g stroke="#04090f" strokeOpacity={0.75} strokeWidth={1.2} fill="none">
        <path d="M232 92 L230 146" />
        <path d="M343 92 L343 147" />
        <path d="M470 92 C474 110 474 130 470 146" />
      </g>
      <rect x="298" y="103" width="18" height="3" rx="1.5" fill="#c9d4de" fillOpacity={0.5} />
      <rect x="412" y="103" width="18" height="3" rx="1.5" fill="#c9d4de" fillOpacity={0.5} />

      {/* Mirror */}
      <path d="M470 84 C478 77 492 79 494 88 L476 91 Z" fill="#1b2a39" stroke="#aab8c5" strokeOpacity={0.35} strokeWidth={0.8} />

      {/* Lights */}
      <path d="M588 104 C600 106 610 110 614 117 L597 115 C592 113 589 109 588 104 Z" fill="#e6f8ff" />
      <path d="M590 106 L612 115" stroke="#35c8f4" strokeWidth={1} />
      <path d="M40 112 L58 104 L62 111 L42 118 Z" fill="#b8343f" />

      {/* Front intake */}
      <path d="M598 130 L614 130 L613 138 L600 138 Z" fill="#050b11" />

      {WHEELS.map((w) => (
        <Wheel key={w.cx} cx={w.cx} cy={w.cy} rimId={ids.rim} rotate={wheelRotate} />
      ))}
    </svg>
  );
};
