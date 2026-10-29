import React from 'react';

export type InfoIconName = 'pin' | 'clock' | 'phone' | 'mail';

/** Duotone line icons drawn for the brand: a tinted fill under a fine stroke. */
const glyphs: Record<InfoIconName, React.ReactNode> = {
  pin: (
    <>
      <ellipse cx="12" cy="20.5" rx="5" ry="1.4" fill="currentColor" fillOpacity={0.25} stroke="none" />
      <path d="M12 2.8a6.4 6.4 0 0 0-6.4 6.4c0 4.6 6.4 10.6 6.4 10.6s6.4-6 6.4-10.6A6.4 6.4 0 0 0 12 2.8Z" fill="currentColor" fillOpacity={0.18} />
      <circle cx="12" cy="9.2" r="2.3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.6" fill="currentColor" fillOpacity={0.18} />
      <path d="M12 7v5.2l3.4 2" />
      <path d="M12 3.4v1.4M20.6 12h-1.4M12 20.6v-1.4M3.4 12h1.4" strokeOpacity={0.5} />
    </>
  ),
  phone: (
    <>
      <path
        d="M5.2 3.6h3l1.6 4.2-2 1.4a10.6 10.6 0 0 0 7 7l1.4-2 4.2 1.6v3a1.8 1.8 0 0 1-1.9 1.8A16.8 16.8 0 0 1 3.4 5.5a1.8 1.8 0 0 1 1.8-1.9Z"
        fill="currentColor"
        fillOpacity={0.18}
      />
      <path d="M14.6 3.8a6 6 0 0 1 5.6 5.6M14.4 7a3 3 0 0 1 2.6 2.6" strokeOpacity={0.6} />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5.4" width="18" height="13.2" rx="2" fill="currentColor" fillOpacity={0.18} />
      <path d="m3.6 6.6 8.4 6.4 8.4-6.4" />
    </>
  ),
};

interface InfoIconProps {
  name: InfoIconName;
  tone?: 'dark' | 'light';
  className?: string;
}

/** Icon set in a square tile; the tile lights up when a parent `.group` is hovered. */
export const InfoIcon: React.FC<InfoIconProps> = ({ name, tone = 'dark', className = '' }) => (
  <span
    aria-hidden="true"
    className={`relative grid h-11 w-11 shrink-0 place-items-center rounded-[4px] border transition-all duration-300 ${
      tone === 'dark'
        ? 'border-sky-500/25 bg-sky-500/10 text-ice group-hover:border-ice group-hover:bg-ice group-hover:text-navy-950 group-hover:shadow-[0_0_16px_rgba(56,189,248,0.35)]'
        : 'border-sky-700/20 bg-sky-50 text-ice-deep group-hover:border-ice-deep group-hover:bg-ice-deep group-hover:text-white group-hover:shadow-[0_4px_12px_rgba(2,132,199,0.2)]'
    } ${className}`}
  >
    <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      {glyphs[name]}
    </svg>
  </span>
);
