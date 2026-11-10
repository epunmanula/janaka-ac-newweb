'use client';

import React, { useId } from 'react';
import { motion, type MotionValue } from 'framer-motion';

/**
 * Precision illustrated side profile of a luxury performance sports fastback (Honda Civic RS).
 * Calibrated in a 640×200 box with authentic automotive proportions, metallic paint shaders,
 * diamond-cut turbine alloys, and studio floor lighting.
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
    {/* Performance Tire Outer Profile */}
    <circle cx={cx} cy={cy} r={27} fill="#03080e" />
    <circle cx={cx} cy={cy} r={25.5} fill="none" stroke="#0e1722" strokeWidth={2.2} />

    {/* Ventilated Cross-Drilled Brake Rotor */}
    <circle cx={cx} cy={cy} r={20.5} fill={`url(#${rotorId})`} stroke="#334155" strokeWidth={0.8} />

    {/* Precision Rotor Cooling Holes */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
      <circle
        key={angle}
        cx={cx + 14 * Math.cos((angle * Math.PI) / 180)}
        cy={cy + 14 * Math.sin((angle * Math.PI) / 180)}
        r={0.9}
        fill="#0f172a"
      />
    ))}

    {/* Brembo-Style Amber Gold Performance Caliper */}
    <path
      d={`M${cx - 14} ${cy - 16} C${cx - 9} ${cy - 21} ${cx - 2} ${cy - 23} ${cx + 5} ${cy - 21} L${cx + 3} ${cy - 12} C${cx - 2} ${cy - 14} ${cx - 7} ${cy - 12} ${cx - 10} ${cy - 8} Z`}
      fill="#D97706"
      stroke="#F59E0B"
      strokeWidth={0.8}
    />
    <text
      x={cx - 5}
      y={cy - 15}
      fill="#FFFFFF"
      fontSize={3.2}
      fontFamily="monospace"
      fontWeight="bold"
      letterSpacing={0.4}
    >
      RS
    </text>

    {/* Rotating Bi-Color Diamond Cut Alloy Rim */}
    <motion.g style={rotate ? { rotate, transformOrigin: `${cx}px ${cy}px` } : undefined}>
      <circle cx={cx} cy={cy} r={18.2} fill={`url(#${rimId})`} />

      {/* 5 Double V-Spokes with Diamond-Cut Machined Edge */}
      {[0, 72, 144, 216, 288].map((angle) => (
        <g key={angle} transform={`rotate(${angle + 36} ${cx} ${cy})`}>
          {/* Dark Anthracite Inner Pocket */}
          <path
            d={`M${cx - 3.2} ${cy - 5} L${cx - 5.5} ${cy - 16.5} L${cx + 5.5} ${cy - 16.5} L${cx + 3.2} ${cy - 5} Z`}
            fill="#050e17"
            stroke="#1E3A5F"
            strokeWidth={0.5}
          />
          {/* Machined Polished Aluminum Face Ridge */}
          <line
            x1={cx}
            y1={cy - 5}
            x2={cx}
            y2={cy - 16.5}
            stroke="#E2E8F0"
            strokeWidth={1}
            strokeLinecap="round"
          />
        </g>
      ))}

      {/* Polished Machined Outer Lip */}
      <circle cx={cx} cy={cy} r={18.2} fill="none" stroke="#F1F5F9" strokeOpacity={0.9} strokeWidth={1} />
      <circle cx={cx} cy={cy} r={17.2} fill="none" stroke="#0F172A" strokeOpacity={0.7} strokeWidth={0.6} />

      {/* Center Hub & Precision Cap */}
      <circle cx={cx} cy={cy} r={4.6} fill="#E2E8F0" stroke="#0F172A" strokeWidth={0.6} />
      <circle cx={cx} cy={cy} r={2} fill="#0B131E" />
    </motion.g>
  </g>
);

interface CarProps {
  className?: string;
  /** Wheel rotation in degrees, usually derived from scroll progress. */
  wheelRotate?: MotionValue<number>;
  /** Trailing aerodynamic climate airflow streaks behind the car. */
  airflow?: boolean;
  /** Headlight projector beam lighting the road ahead. */
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
    ambientFloor: `floor-${uid}`,
  };

  return (
    <svg viewBox={CAR_VIEWBOX} className={className} role="img" aria-label={title} overflow="visible">
      <defs>
        {/* Luxury Pearlescent Metallic Obsidian Paint (Realistic Automotive Studio Shader) */}
        <linearGradient id={ids.body} x1="0%" y1="0%" x2="100%" y2="85%">
          <stop offset="0%" stopColor="#041B29" />
          <stop offset="18%" stopColor="#082A3E" />
          <stop offset="38%" stopColor="#0F3B54" />
          <stop offset="55%" stopColor="#18506E" />
          <stop offset="72%" stopColor="#1E658C" />
          <stop offset="85%" stopColor="#124866" />
          <stop offset="100%" stopColor="#041926" />
        </linearGradient>

        {/* Liquid Platinum Zenith Studio Reflection (Roof & Shoulder Crease) */}
        <linearGradient id={ids.edge} x1="134" y1="0" x2="554" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.3" />
          <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="65%" stopColor="#BAE6FD" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#7DD3FC" stopOpacity="0.8" />
        </linearGradient>

        {/* Ceramic Privacy Glass with Atmospheric Sky Reflection */}
        <linearGradient id={ids.glass} x1="186" y1="42" x2="432" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#02060B" />
          <stop offset="35%" stopColor="#081420" />
          <stop offset="70%" stopColor="#0E2336" />
          <stop offset="100%" stopColor="#163750" />
        </linearGradient>

        {/* Xenon 6000K Projector Headlight Volumetric Beam with Atmospheric Falloff */}
        <linearGradient id={ids.beam} x1="548" y1="0" x2="880" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.8" />
          <stop offset="25%" stopColor="#38BDF8" stopOpacity="0.25" />
          <stop offset="70%" stopColor="#0284C7" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
        </linearGradient>

        {/* Photorealistic Showroom Ground Contact Shadow */}
        <radialGradient id={ids.shadow} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#000000" stopOpacity="0.6" />
          <stop offset="80%" stopColor="#000000" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>

        {/* Soft Ambient Metallic Floor Reflection (Subtle & Elegant, not loud neon) */}
        <radialGradient id={ids.ambientFloor} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0284C7" stopOpacity="0.16" />
          <stop offset="60%" stopColor="#0369A1" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#021824" stopOpacity="0" />
        </radialGradient>

        {/* Diamond Cut Rim Radial Gradient */}
        <radialGradient id={ids.rim} cx="35%" cy="30%" r="90%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="35%" stopColor="#CBD5E1" />
          <stop offset="70%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0B131E" />
        </radialGradient>

        {/* Slotted Brake Rotor Shader */}
        <radialGradient id={ids.rotor} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="75%" stopColor="#64748B" />
          <stop offset="100%" stopColor="#1E293B" />
        </radialGradient>
      </defs>

      {/* Showroom Floor Studio Shadow & Subtle Floor Ambiance */}
      <ellipse cx="340" cy="164" rx="230" ry="8" fill={`url(#${ids.shadow})`} />
      <ellipse cx="340" cy="162" rx="190" ry="5.5" fill={`url(#${ids.ambientFloor})`} />

      {/* Projector Headlight Beam (shining forward across the tarmac) */}
      {headlights && (
        <path d="M 546 98 L 880 74 L 880 156 L 546 114 Z" fill={`url(#${ids.beam})`} />
      )}

      {/* Aerodynamic Climate Airflow Wake (Sleek stream-tracer lines) */}
      {airflow && (
        <g fill="none" stroke="#38BDF8" strokeLinecap="round" strokeWidth={1.4} opacity={0.7} aria-hidden="true">
          <path className="airflow-line" d="M 530 46 C 410 22 220 20 -20 38" strokeOpacity={0.6} />
          <path className="airflow-line" style={{ animationDelay: '-1s' }} d="M 490 68 C 380 54 210 50 -40 60" strokeOpacity={0.4} />
          <path className="airflow-line" style={{ animationDelay: '-1.8s' }} d="M 136 108 C 80 106 20 106 -60 108" strokeOpacity={0.5} />
          <path className="airflow-line" style={{ animationDelay: '-0.5s' }} d="M 150 90 C 90 88 30 86 -50 88" strokeOpacity={0.3} />
        </g>
      )}

      {/* Main Sculpted Body Shell */}
      <path d={CAR_BODY_PATH} fill={`url(#${ids.body})`} />

      {/* Sport Fastback Aerodynamic Winglet */}
      <path d="M 142 80 L 172 79 L 168 83 L 140 84 Z" fill="#020B12" />
      <path d="M 146 83 L 146 87 L 149 87 L 149 83 Z" fill="#020B12" />
      <path d="M 164 83 L 164 87 L 167 87 L 167 83 Z" fill="#020B12" />

      {/* Ceramic Tinted Greenhouse Windows */}
      <path d={CAR_GLASS_PATH} fill={`url(#${ids.glass})`} />

      {/* Studio Ceiling Strip Light Soft Reflection across Cabin Glass */}
      <path d="M 274 50 L 308 44 L 292 78 L 254 79 Z" fill="#FFFFFF" fillOpacity={0.07} />
      <path d="M 370 46 L 400 56 L 384 77 L 356 77 Z" fill="#FFFFFF" fillOpacity={0.04} />

      {/* A, B & C Pillars (High-Gloss Piano Black) */}
      <path d="M 326 41 L 335 41 L 333 79 L 325 79 Z" fill="#02060B" />
      <path d="M 244 57 L 250 60 L 240 79 L 234 79 Z" fill="#02060B" opacity="0.95" />

      {/* Liquid Platinum Shoulder Crease (Precision Automotive Studio Edge) */}
      <path
        d="M 154 86 L 172 84 C 202 82, 240 64, 272 46 C 300 40, 335 39, 365 41 C 392 44, 418 58, 436 82 C 468 84, 514 88, 544 94 L 550 102"
        fill="none"
        stroke={`url(#${ids.edge})`}
        strokeWidth={1.4}
      />

      {/* Fine Body Swage Lines */}
      <path d="M 148 93 C 240 89 415 87 542 95" fill="none" stroke="#7DD3FC" strokeOpacity={0.25} strokeWidth={1} />
      <path d="M 229 124 C 285 122 395 122 435 126" fill="none" stroke="#0284C7" strokeOpacity={0.2} strokeWidth={0.8} />

      {/* Lower Carbon-Optic Ground Effect Sill */}
      <path d="M 229 136 L 435 136" stroke="#020B12" strokeWidth={3} />
      <path d="M 433 132 L 439 138 L 433 138 Z" fill="#0284C7" opacity="0.8" />

      {/* Laser-Fit Door Shut Lines */}
      <g stroke="#020A12" strokeWidth={1.1} fill="none" opacity="0.85">
        <path d="M 244 79 L 236 138" />
        <path d="M 330 79 L 330 138" />
        <path d="M 428 79 C 431 93 431 116 428 138" />
      </g>

      {/* Aerodynamic Flush Door Handles */}
      <rect x="272" y="88" width="15" height="2.8" rx="1.4" fill="#071E2C" stroke="#0284C7" strokeWidth={0.6} />
      <rect x="368" y="88" width="15" height="2.8" rx="1.4" fill="#071E2C" stroke="#0284C7" strokeWidth={0.6} />

      {/* Aerodynamic Wing Mirror */}
      <path d="M 426 71 C 434 64 445 66 448 75 L 432 78 Z" fill="#061522" stroke="#7DD3FC" strokeOpacity={0.6} strokeWidth={0.8} />

      {/* Jewel-Eye Matrix LED Headlight Cluster */}
      <path d="M 522 93 C 532 95 542 97 548 102 L 534 100 C 528 98 524 95 522 93 Z" fill="#E0F2FE" />
      <circle cx="530" cy="96" r="1.8" fill="#38BDF8" />
      <circle cx="537" cy="98" r="1.8" fill="#FFFFFF" />
      <circle cx="544" cy="99" r="1.5" fill="#E0F2FE" />
      {/* Precision DRL Fiber-Optic Line */}
      <path d="M 520 92 L 548 101" stroke="#BAE6FD" strokeWidth={1.6} strokeLinecap="round" />

      {/* Precision LED Laser Tail Light */}
      <path d="M 132 93 L 146 88 L 148 93 L 134 98 Z" fill="#DC2626" />
      <path d="M 131 93 L 145 88" stroke="#F87171" strokeWidth={1.2} />

      {/* Front Honeycomb Air Dam & Splitter */}
      <path d="M 534 110 L 546 110 L 544 120 L 536 120 Z" fill="#02080E" />
      <path d="M 530 124 L 548 124" stroke="#0284C7" strokeWidth={1.2} opacity="0.8" />

      {/* Front/Rear Rotating Wheels */}
      {WHEELS.map((w) => (
        <Wheel key={w.cx} cx={w.cx} cy={w.cy} rimId={ids.rim} rotorId={ids.rotor} rotate={wheelRotate} />
      ))}
    </svg>
  );
};
