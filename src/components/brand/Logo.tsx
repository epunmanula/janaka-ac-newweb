import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark'; // 'light' for dark backgrounds (white text), 'dark' for light backgrounds (graphite text)
  compact?: boolean;
}

/**
 * Janaka Auto AC — Precision Vector Brand Identity
 * Inspired by the genuine workshop emblem: precision mechanical circle, interlocking JA architecture,
 * and three aerodynamic climate cooling ribbons flowing through the core.
 */
export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'dark',
  compact = false,
}) => {
  const isLight = variant === 'light';

  const textPrimary = isLight ? '#FFFFFF' : '#24282B';
  const textSecondary = isLight ? '#A2B8C2' : '#71818A';
  const ringStroke = isLight ? '#2586A3' : '#123D4A';
  const waveColor = '#2586A3';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Precision Automotive A/C Emblem */}
      <svg
        viewBox="0 0 44 44"
        className="h-10 w-10 shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Outer Precision Ring */}
        <circle cx="22" cy="22" r="20" stroke={ringStroke} strokeWidth="2.4" />
        
        {/* Inner Technical Inset */}
        <circle cx="22" cy="22" r="16.5" stroke={isLight ? '#123D4A' : '#E5E3DE'} strokeWidth="1" strokeDasharray="3 3" />

        {/* Structural Monogram (Interlocking J & A lines) */}
        <path
          d="M14 14 L22 8 L30 14 M22 8 L22 36"
          stroke={ringStroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.25"
        />

        {/* Triple Dynamic Air Conditioning Cooling Waves */}
        <path
          d="M8 17 C13 13, 17 21, 23 17 C29 13, 33 21, 36 17"
          stroke={waveColor}
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M6 22 C12 18, 16 26, 22 22 C28 18, 32 26, 38 22"
          stroke={isLight ? '#FFFFFF' : '#123D4A'}
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M8 27 C13 23, 17 31, 23 27 C29 23, 33 31, 36 27"
          stroke={waveColor}
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>

      {/* Typography Lockup */}
      {!compact && (
        <div className="flex flex-col leading-none">
          <span
            className="font-display text-[1.125rem] font-extrabold tracking-[0.06em] uppercase"
            style={{ color: textPrimary, fontFamily: 'var(--font-display, sans-serif)' }}
          >
            JANAKA <span style={{ color: '#2586A3' }}>AUTO AC</span>
          </span>
          <span
            className="mt-1 font-mono text-[9px] font-semibold tracking-[0.24em] uppercase"
            style={{ color: textSecondary }}
          >
            Car A/C Specialists · Gampaha
          </span>
        </div>
      )}
    </div>
  );
};
