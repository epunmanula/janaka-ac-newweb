'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { DriftWall } from '@/components/DriftWall';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { galleryItems } from '@/data/janakaData';
import { SectionBlend } from '@/components/SectionBlend';

export const Gallery: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'drift' | 'grid'>('drift');
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const driftItems = useMemo(
    () => galleryItems.map((item) => ({ src: item.thumb || item.image, alt: item.title, label: item.title, category: item.category })),
    []
  );

  const open = (index: number) => {
    openerRef.current = document.activeElement as HTMLElement | null;
    setSelected(index);
  };
  const close = useCallback(() => {
    setSelected(null);
    openerRef.current?.focus();
  }, []);
  const step = useCallback(
    (dir: 1 | -1) => setSelected((i) => (i === null ? i : (i + dir + galleryItems.length) % galleryItems.length)),
    []
  );

  useEffect(() => {
    if (selected === null) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected, close, step]);

  const photo = selected !== null ? galleryItems[selected] : null;

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="relative isolate bg-cool py-24 text-navy-950 md:py-32">
      <SectionBlend from="var(--color-navy-950)" edge="top" />
      <SectionBlend from="var(--color-navy-950)" edge="bottom" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="gallery-title"
          index="05"
          eyebrow="From the workshop"
          title="Real jobs. Real bays. Gampaha."
          intro="Photographs taken at the Janaka Auto AC workshop — the service bays, equipment and work in progress."
        />

        <Reveal className="mt-12 flex justify-end">
          <div role="group" aria-label="Gallery view" className="inline-flex border border-navy-950/15 p-1">
            {(['drift', 'grid'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setViewMode(mode)}
                aria-pressed={viewMode === mode}
                className={`min-h-10 px-4 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
                  viewMode === mode ? 'bg-navy-950 text-white' : 'text-steel hover:text-navy-950'
                }`}
              >
                {mode === 'drift' ? '3D Wall' : 'Grid'}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-4">
          {viewMode === 'drift' ? (
            <DriftWall
              items={driftItems}
              tileWidth={280}
              tileHeight={190}
              gap={18}
              speed={30}
              tilt={13}
              turn={-9}
              depth={80}
              parallax={0.5}
              lift={45}
              onSelectPhoto={open}
            />
          ) : (
            <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {galleryItems.map((item, i) => (
                <Reveal as="li" key={item.id} delay={(i % 3) * 0.06}>
                  <button type="button" onClick={() => open(i)} className="group block w-full text-left">
                    <span className="relative block aspect-[4/5] overflow-hidden bg-mist">
                      <Image
                        src={item.image}
                        alt={item.caption}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                        className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
                      />
                    </span>
                    <span className="mt-4 flex items-baseline justify-between gap-4">
                      <span className="font-wide text-lg font-semibold group-hover:text-ice-deep">{item.title}</span>
                      <span className="eyebrow shrink-0 text-[10px] text-steel">{item.category}</span>
                    </span>
                  </button>
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </div>

      <AnimatePresence>
        {photo && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-950/96 p-3 sm:p-8"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={photo.title}
          >
            <div className="relative flex max-h-full w-full max-w-3xl flex-col" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between pb-3 text-white">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-silver">
                  {String((selected ?? 0) + 1).padStart(2, '0')} / {String(galleryItems.length).padStart(2, '0')} · {photo.category}
                </span>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="p-2.5 text-silver hover:text-white">
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button type="button" onClick={() => step(1)} aria-label="Next photo" className="p-2.5 text-silver hover:text-white">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <button ref={closeRef} type="button" onClick={close} aria-label="Close photo" className="ml-2 p-2.5 text-silver hover:text-white">
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="relative h-[62vh] w-full bg-black">
                <Image src={photo.image} alt={photo.caption} fill sizes="(max-width: 768px) 100vw, 768px" className="object-contain" />
              </div>
              <div className="pt-4 text-white">
                <h3 className="font-wide text-xl font-semibold">{photo.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-silver">{photo.caption}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
