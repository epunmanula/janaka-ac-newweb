import React from 'react';

interface PhotoBackdropProps {
  /** Pre-blurred, colour-graded image from /public/backdrops (blur is baked in, not done by the browser). */
  src: string;
  opacity?: number;
  /** Which side fades into the section colour so text stays on a clean background. */
  fade?: 'left' | 'right' | 'center';
  /** The section's background colour, which every edge fades into. */
  base?: string;
}

/** A workshop photo softened into light and shadow behind a dark section. */
export const PhotoBackdrop: React.FC<PhotoBackdropProps> = ({
  src,
  opacity = 0.35,
  fade = 'left',
  base = 'var(--color-navy-950)',
}) => {
  const sideFade =
    fade === 'center'
      ? `radial-gradient(ellipse at center, transparent 15%, ${base} 78%)`
      : `linear-gradient(to ${fade === 'left' ? 'right' : 'left'}, ${base} 15%, transparent 68%)`;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 scale-110 bg-cover bg-center" style={{ backgroundImage: `url(${src})`, opacity }} />
      <div className="absolute inset-0" style={{ background: sideFade }} />
      <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${base} 0%, transparent 28%, transparent 62%, ${base} 100%)` }} />
    </div>
  );
};
