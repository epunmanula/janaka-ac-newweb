'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { DriftWall } from '@/components/DriftWall';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { galleryItems } from '@/data/janakaData';

export const Gallery: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'drift' | 'grid'>('grid');
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      setViewMode('drift');
    }
  }, []);

  const driftItems = useMemo(
    () =>
      galleryItems.map((item) => ({
        src: item.thumb || item.image,
        alt: item.title,
        label: item.title,
        category: item.category,
      })),
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
    <section
      id="gallery"
      aria-labelledby="gallery-title"
      className="relative isolate bg-gradient-to-b from-[#021824] via-[#032332] to-[#021824] py-24 text-white border-b border-[#144B66]/40 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="gallery-title"
          index="05"
          eyebrow="From The Service Bays"
          title="Authentic Workshop Photography · Gampaha"
          intro="Photographs taken on-site at our Miriswatta workshop — the service bays, manifold equipment, component inventory, and vehicles in service."
          tone="dark"
        />

        <Reveal className="mt-12 flex justify-end">
          <div role="group" aria-label="Gallery view mode" className="inline-flex rounded-xl border border-[#144B66] bg-[#052436]/90 p-1 shadow-lg backdrop-blur-md">
            {(['drift', 'grid'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setViewMode(mode)}
                aria-pressed={viewMode === mode}
                className={`min-h-9 px-4 rounded-lg font-mono text-[11px] uppercase tracking-[0.14em] transition-all ${
                  viewMode === mode
                    ? 'bg-[#144B66] text-white font-bold border border-[#38BDF8]/40 shadow-sm'
                    : 'text-[#8FAEC0] hover:text-white'
                }`}
              >
                {mode === 'drift' ? '3D Wall' : 'Grid'}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-6">
          {viewMode === 'drift' ? (
            <DriftWall
              items={driftItems}
              tileWidth={280}
              tileHeight={190}
              gap={18}
              speed={28}
              tilt={11}
              turn={-7}
              depth={70}
              parallax={0.4}
              lift={35}
              onSelectPhoto={open}
            />
          ) : (
            <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {galleryItems.map((item, i) => (
                <Reveal as="li" key={item.id} delay={(i % 3) * 0.06}>
                  <button type="button" onClick={() => open(i)} className="group block w-full text-left">
                    <span className="relative block aspect-[4/3] overflow-hidden rounded-2xl border border-[#144B66] bg-[#052436] shadow-xl backdrop-blur-sm transition-all duration-300 group-hover:border-[#38BDF8]/60 group-hover:scale-[1.02]">
                      <Image
                        src={item.image}
                        alt={item.caption}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </span>
                    <span className="mt-3.5 flex items-baseline justify-between gap-4">
                      <span className="font-wide text-base font-bold text-white group-hover:text-[#CDE6F5] transition-colors">
                        {item.title}
                      </span>
                      <span className="font-mono shrink-0 text-[10px] uppercase font-bold text-[#38BDF8]">
                        {item.category}
                      </span>
                    </span>
                  </button>
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {photo && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-[#02141F]/96 backdrop-blur-md p-3 sm:p-8"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={photo.title}
          >
            <div className="relative flex max-h-full w-full max-w-3xl flex-col" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between pb-3 text-white border-b border-[#144B66]/40 mb-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#CDE6F5]">
                  {String((selected ?? 0) + 1).padStart(2, '0')} / {String(galleryItems.length).padStart(2, '0')} · {photo.category}
                </span>
                <div className="flex items-center gap-1.5">
                  <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="p-2 text-[#A2B8C2] hover:text-white rounded-lg hover:bg-[#144B66]/40 transition">
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button type="button" onClick={() => step(1)} aria-label="Next photo" className="p-2 text-[#A2B8C2] hover:text-white rounded-lg hover:bg-[#144B66]/40 transition">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <button ref={closeRef} type="button" onClick={close} aria-label="Close photo" className="ml-1 p-2 text-[#A2B8C2] hover:text-white rounded-lg hover:bg-[#144B66]/40 transition">
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="relative h-[60vh] w-full overflow-hidden rounded-xl bg-black border border-[#144B66]">
                <Image src={photo.image} alt={photo.caption} fill sizes="(max-width: 768px) 100vw, 768px" className="object-contain" priority />
              </div>

              <div className="pt-4 text-white">
                <h3 className="font-wide text-xl font-bold">{photo.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-[#A2B8C2]">{photo.caption}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
