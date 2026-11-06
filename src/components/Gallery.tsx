'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn, Camera } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { galleryItems } from '@/data/janakaData';

export const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const categories = ['All', 'Workshop', 'Diagnosis', 'Components', 'Repairs', 'Completed'];

  const filteredItems =
    selectedCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const nextImage = useCallback(() => {
    setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % filteredItems.length));
  }, [filteredItems.length]);

  const prevImage = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev - 1 + filteredItems.length) % filteredItems.length
    );
  }, [filteredItems.length]);

  // Keyboard navigation
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, closeLightbox, nextImage, prevImage]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) nextImage();
      else prevImage();
    }
    touchStartX.current = null;
  };

  const currentPhoto = selectedIndex !== null ? filteredItems[selectedIndex] : null;

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-title"
      className="relative overflow-hidden bg-[#F6F4EF] py-24 sm:py-28 md:py-32 border-b border-[#E5E3DE]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="gallery-title"
          index="05"
          eyebrow="Workshop Visuals"
          title="Real Workshop. Genuine Craftsmanship."
          intro="Photographs taken on site at our Gampaha facility — our covered bays, manifold testing stations, component inventory, and vehicles in service."
          tone="light"
        />

        {/* Category Filter Pills */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-b border-[#E5E3DE] pb-5">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSelectedIndex(null);
                }}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#123D4A] text-white shadow-xs'
                    : 'bg-[#FFFFFF] text-[#71818A] hover:bg-[#E5E3DE] hover:text-[#24282B] border border-[#E5E3DE]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-[#71818A]">
            <Camera className="h-3.5 w-3.5 text-[#2586A3]" />
            <span>{filteredItems.length} Authentic Photographs</span>
          </div>
        </div>

        {/* Responsive Gallery Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-[#E5E3DE] bg-[#FFFFFF] shadow-xs transition-all duration-300 hover:border-[#CBD5E1] hover:shadow-md"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E5E3DE]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#123D4A] backdrop-blur-xs">
                    <ZoomIn className="h-3.5 w-3.5" />
                    Expand Photo
                  </span>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="rounded-md bg-[#123D4A]/90 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-xs">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-serif text-base font-bold text-[#24282B] group-hover:text-[#123D4A] transition-colors">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-[#71818A] line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {currentPhoto && selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B252E]/90 p-4 md:p-8 backdrop-blur-md"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Toolbar */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-10">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-semibold tracking-wider text-[#99D5E8]">
                  {String(selectedIndex + 1).padStart(2, '0')} /{' '}
                  {String(filteredItems.length).padStart(2, '0')}
                </span>
                <span className="rounded-full bg-white/20 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider">
                  {currentPhoto.category}
                </span>
              </div>

              <button
                onClick={closeLightbox}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                aria-label="Close photo viewer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Previous Button */}
            <button
              onClick={prevImage}
              className="absolute left-4 z-10 hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={nextImage}
              className="absolute right-4 z-10 hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              aria-label="Next photo"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Center Photo & Caption */}
            <div className="relative max-h-[85vh] max-w-5xl overflow-hidden rounded-2xl bg-[#123D4A] shadow-2xl">
              <div className="relative h-[55vh] sm:h-[65vh] w-[90vw] max-w-4xl">
                <Image
                  src={currentPhoto.image}
                  alt={currentPhoto.title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>

              <div className="border-t border-white/10 bg-[#0B252E] p-4 sm:p-5 text-white">
                <h4 className="font-serif text-lg font-bold">{currentPhoto.title}</h4>
                <p className="mt-1 text-xs text-[#99D5E8]">{currentPhoto.caption}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
