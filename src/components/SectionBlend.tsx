import React from 'react';

interface SectionBlendProps {
  /** Colour of the neighbouring dark section. */
  from: string;
  edge: 'top' | 'bottom';
}

// Edge tone of `bg-cool`, where the blend must land exactly
const LIGHT_EDGE = '#e3eaf2';

/**
 * Soft "cold mist" seam where a dark section meets a light one, instead of a hard cut.
 * Runs through solid blues rather than fading translucent navy, which would turn grey.
 * Sits behind content (parent needs `relative isolate`) and inside the section's padding.
 */
export const SectionBlend: React.FC<SectionBlendProps> = ({ from, edge }) => (
  <div
    aria-hidden="true"
    className={`pointer-events-none absolute inset-x-0 -z-10 h-28 md:h-44 ${edge === 'top' ? 'top-0' : 'bottom-0'}`}
    style={{
      background: `linear-gradient(in oklab to ${edge === 'top' ? 'bottom' : 'top'}, ${from} 0%, color-mix(in oklab, ${from} 55%, #1b4a68) 20%, #3f6a88 42%, #8eabc2 66%, #c9d7e4 84%, ${LIGHT_EDGE} 100%)`,
    }}
  />
);
