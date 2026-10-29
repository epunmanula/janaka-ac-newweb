import React from 'react';

interface SectionEdgeProps {
  /** Solid colour of the neighbouring dark section. */
  from: string;
  edge: 'top' | 'bottom';
}

/**
 * Angled cut where a dark section meets a light one — a flat wedge of the dark colour
 * with an ice pinstripe along the slope, like a body line on a car. No gradients.
 * Sits inside the light section's padding (parent needs `relative isolate`).
 */
export const SectionEdge: React.FC<SectionEdgeProps> = ({ from, edge }) => {
  const top = edge === 'top';
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 10"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 -z-10 h-10 w-full md:h-16 ${top ? 'top-0' : 'bottom-0'}`}
    >
      {top ? (
        <>
          {/* Deep on the left, shallow on the right */}
          <polygon points="0,0 100,0 100,3 0,10" fill={from} />
          <line x1="58" y1="7.14" x2="100" y2="4.2" stroke="#35c8f4" strokeWidth={2} vectorEffect="non-scaling-stroke" />
        </>
      ) : (
        <>
          {/* Mirrored rise toward the right, so the page reads as one continuous line */}
          <polygon points="0,10 100,10 100,0 0,7" fill={from} />
          <line x1="0" y1="5.8" x2="42" y2="2.86" stroke="#35c8f4" strokeWidth={2} vectorEffect="non-scaling-stroke" />
        </>
      )}
    </svg>
  );
};
