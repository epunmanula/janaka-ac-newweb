'use client';

import React from 'react';

interface AnimatedStripesProps {
  className?: string;
  /** Opacity of the stripes layer, default 0.85 */
  opacity?: number;
  /** Whether to show the top and bottom gradient fades into the background */
  fadeEdges?: boolean;
  /** Direction of the drift: 'forward' (left-to-right slant) or 'reverse' */
  direction?: 'forward' | 'reverse';
  /** Preset variant: 'hero' (multi-layer rich depth) or 'ambient' (subtler for content sections) */
  variant?: 'hero' | 'ambient';
}

/**
 * Animated Stripes Background
 * Inspired by Jitter Motion Design ("Animated Stripes")
 * Precision-crafted with Nordic Petrol, Deep Marine & Arctic Cerulean laminar bands.
 * 100% GPU-accelerated CSS keyframe transforms for 60fps/120fps fluid motion.
 */
export const AnimatedStripes: React.FC<AnimatedStripesProps> = ({
  className = '',
  opacity = 0.85,
  fadeEdges = true,
  direction = 'forward',
  variant = 'hero',
}) => {
  const isHero = variant === 'hero';

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none ${className}`}
      style={{ opacity, contain: 'strict' }}
    >
      {/* Deep canvas foundation */}
      <div className="absolute inset-0 bg-[#021824]" />

      {/* Skewed Stage for Jitter-style 24-degree angled stripes */}
      <div className="absolute -inset-x-20 -inset-y-16 flex items-center justify-center overflow-hidden [transform:skewX(-20deg)_scale(1.1)] md:-inset-x-40 md:-inset-y-32 md:[transform:skewX(-24deg)_scale(1.2)]">
        {/* Layer 1: Wide Deep Petrol & Marine Oceanic Bands (Slow ambient glide) */}
        <div
          className={`stripes-layer-slow absolute flex h-full will-change-transform ${
            direction === 'reverse' ? 'animate-stripes-reverse-slow' : 'animate-stripes-slow'
          }`}
          style={{ width: '3600px' }}
        >
          {/* Repeated twice for infinite seamless loop (1800px cycle) */}
          {[0, 1].map((copy) => (
            <div key={copy} className="flex h-full w-[1800px] shrink-0">
              {/* Wide deep petrol block */}
              <div className="h-full w-[260px] bg-[#023047]/90" />
              <div className="h-full w-[80px] bg-[#043b57]/80" />
              <div className="h-full w-[180px] bg-[#064768]/75" />
              <div className="h-full w-[40px] bg-[#023047]/95" />
              <div className="h-full w-[220px] bg-[#085277]/70" />
              <div className="h-full w-[110px] bg-[#03344d]/85" />
              <div className="h-full w-[310px] bg-[#02283a]/90" />
              <div className="h-full w-[140px] bg-[#064261]/80" />
              <div className="h-full w-[250px] bg-[#0a587e]/65" />
              <div className="h-full w-[210px] bg-[#022e44]/90" />
            </div>
          ))}
        </div>

        {/* Layer 2: Mid-Tone Nordic Teal & Ice Cerulean Accent Stripes */}
        <div
          className={`stripes-layer-fast absolute flex h-full will-change-transform ${
            direction === 'reverse' ? 'animate-stripes-reverse-fast' : 'animate-stripes-fast'
          }`}
          style={{ width: '3200px' }}
        >
          {/* Repeated twice for infinite seamless loop (1600px cycle) */}
          {[0, 1].map((copy) => (
            <div key={copy} className="flex h-full w-[1600px] shrink-0">
              <div className="h-full w-[140px] bg-[#126782]/45" />
              {/* Hairline Arctic Cyan Pinstripe */}
              <div className="h-full w-[2px] bg-[#8ecae6] opacity-90" />
              <div className="h-full w-[210px] bg-transparent" />
              {/* Cerulean Accent Ribbon */}
              <div className="h-full w-[65px] bg-[#219ebc]/35" />
              <div className="h-full w-[1.5px] bg-[#219ebc] opacity-90" />
              <div className="h-full w-[280px] bg-transparent" />
              {/* Jitter signature Sea Teal band */}
              <div className="h-full w-[120px] bg-[#126782]/50" />
              <div className="h-full w-[3px] bg-[#8ecae6]/60" />
              <div className="h-full w-[190px] bg-transparent" />
              <div className="h-full w-[85px] bg-[#177797]/40" />
              {/* Fine precision streak */}
              <div className="h-full w-[2px] bg-[#219ebc]/80" />
              <div className="h-full w-[240px] bg-transparent" />
              <div className="h-full w-[150px] bg-[#0e5673]/40" />
              <div className="h-full w-[111.5px] bg-transparent" />
            </div>
          ))}
        </div>

        {/* Layer 3: High-Frequency Micro Pinstripes (Hero only, desktop only for max mobile performance) */}
        {isHero && (
          <div
            className="stripes-layer-micro absolute hidden md:flex h-full will-change-transform animate-stripes-micro"
            style={{ width: '2800px' }}
          >
            {[0, 1].map((copy) => (
              <div key={copy} className="flex h-full w-[1400px] shrink-0">
                <div className="h-full w-[340px] bg-transparent" />
                <div className="h-full w-[1px] bg-[#8ecae6] opacity-80" />
                <div className="h-full w-[420px] bg-transparent" />
                <div className="h-full w-[1.5px] bg-[#219ebc] opacity-80" />
                <div className="h-full w-[290px] bg-transparent" />
                <div className="h-full w-[1px] bg-[#8ecae6]/60" />
                <div className="h-full w-[346.5px] bg-transparent" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Atmospheric Vignette & Reading Contrast Masks */}
      {fadeEdges && (
        <>
          {/* Vertical fade to blend with neighboring sections */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, #021824 0%, transparent 18%, transparent 82%, #021824 100%)',
            }}
          />
          {/* Subtle directional vignette: gives text on the left pristine readability */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, #021824 0%, rgba(2, 24, 36, 0.75) 35%, rgba(2, 24, 36, 0.3) 70%, rgba(2, 24, 36, 0.6) 100%)',
            }}
          />
          {/* Radial depth focus */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 70% 45%, transparent 20%, rgba(2, 24, 36, 0.6) 80%)',
            }}
          />
        </>
      )}
    </div>
  );
};

