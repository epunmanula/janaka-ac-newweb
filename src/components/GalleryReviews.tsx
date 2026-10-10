'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryItems, reviewItems, GalleryItem, trustMetrics, businessInfo } from '@/data/janakaData';
import { DriftWall } from '@/components/DriftWall';
import { Star, ArrowUpRight, CheckCircle2, Maximize2, X, LayoutGrid, Eye } from 'lucide-react';

export const GalleryReviews: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);
  const [viewMode, setViewMode] = useState<'drift' | 'grid'>('drift');

  // Prepare items for DriftWall
  const driftItems = galleryItems.map((item) => ({
    src: item.image,
    alt: item.title,
    label: item.title,
    category: item.category,
  }));

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPhoto(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectPhotoByIndex = (index: number) => {
    if (galleryItems[index]) {
      setSelectedPhoto(galleryItems[index]);
    }
  };

  return (
    <section id="gallery" className="w-full py-20 md:py-28 border-b border-[#222222] bg-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* PART 1: 3D ROTATING DRIFT WALL & GALLERY DOSSIER */}
        <div>
          {/* Header & View Mode Switcher */}
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#222222] pb-8 mb-10 gap-6">
            <div>
              <span className="font-mono-editorial text-xs uppercase tracking-[0.25em] text-[#888888] block mb-2">
                AUTHENTIC WORKSHOP DOSSIER // REAL PUBLIC IMAGES
              </span>
              <h2 className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl text-[#F5F4EF] leading-tight">
                The Craft in Practice
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <p className="font-serif-editorial text-base sm:text-lg text-[#888888] max-w-sm hidden lg:block">
                Interactive rotating perspective gallery of operations at 366 Miriswatta Road, Gampaha.
              </p>

              {/* View Switcher Toggle */}
              <div className="flex items-center p-1 bg-[#181818] border border-[#2e2e2e] rounded-sm">
                <button
                  type="button"
                  onClick={() => setViewMode('drift')}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-sm text-xs font-mono-editorial uppercase tracking-wider transition-all ${
                    viewMode === 'drift'
                      ? 'bg-cyan-950/70 text-cyan-300 border border-cyan-500/40 font-semibold'
                      : 'text-[#888888] hover:text-[#F5F4EF]'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>3D Stream</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-sm text-xs font-mono-editorial uppercase tracking-wider transition-all ${
                    viewMode === 'grid'
                      ? 'bg-[#2a2a2a] text-[#F5F4EF] border border-[#444444] font-semibold'
                      : 'text-[#888888] hover:text-[#F5F4EF]'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Grid Catalog</span>
                </button>
              </div>
            </div>
          </div>

          {/* VIEW MODE 1: 3D ROTATING DRIFT WALL (MATCHING janaka-ac-web.vercel.app) */}
          {viewMode === 'drift' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <DriftWall
                items={driftItems}
                tileWidth={280}
                tileHeight={190}
                gap={18}
                speed={34}
                tilt={14}
                turn={-10}
                perspective={1150}
                depth={85}
                parallax={0.55}
                lift={55}
                onSelectPhoto={handleSelectPhotoByIndex}
              />
            </motion.div>
          )}

          {/* VIEW MODE 2: EDITORIAL STATIC 9-IMAGE GRID */}
          {viewMode === 'grid' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {galleryItems.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedPhoto(item)}
                  className="group cursor-pointer bg-[#151515] border border-[#222222] hover:border-[#444444] rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl"
                >
                  {/* Real Image Container */}
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#0c0c0c] border-b border-[#222222]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 filter contrast-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-black/30 opacity-70 group-hover:opacity-40 transition-opacity" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      <span className="font-mono-editorial text-[10px] text-[#F5F4EF] uppercase tracking-widest bg-[#121212]/90 backdrop-blur-md px-2.5 py-1 rounded-sm border border-[#333333]">
                        {item.badge || `ARCHIVE 0${idx + 1}`}
                      </span>
                      <span className="font-mono-editorial text-[10px] text-[#c5a059] uppercase tracking-wider bg-[#181818]/90 backdrop-blur-md px-2 py-0.5 rounded-sm border border-[#2d2d2d]">
                        {item.category}
                      </span>
                    </div>

                    {/* Hover Inspect Icon */}
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <span className="inline-flex items-center space-x-1 font-mono-editorial text-[10px] text-[#F5F4EF] bg-black/80 px-2.5 py-1 rounded-sm border border-[#444444]">
                        <Maximize2 className="w-3 h-3" />
                        <span>Expand</span>
                      </span>
                    </div>
                  </div>

                  {/* Text Metadata */}
                  <div className="p-6">
                    <h4 className="font-serif-editorial text-2xl text-[#F5F4EF] leading-snug mb-2 group-hover:text-white transition-colors">
                      {item.title}
                    </h4>
                    <p className="font-mono-editorial text-xs text-[#888888] leading-relaxed line-clamp-2">
                      {item.caption}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* LIGHTBOX MODAL FOR FULL EXPANDED IMAGE PREVIEW */}
        <AnimatePresence>
          {selectedPhoto && (
            <div
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md cursor-pointer"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full bg-[#161616] border border-[#333333] rounded-sm overflow-hidden shadow-2xl flex flex-col cursor-default"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-4 border-b border-[#262626] bg-[#121212]">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono-editorial text-xs text-[#c5a059] uppercase tracking-wider">
                      {selectedPhoto.category}
                    </span>
                    <span className="text-[#444444]">•</span>
                    <span className="font-mono-editorial text-xs text-[#888888]">
                      {businessInfo.addressShort}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedPhoto(null)}
                    className="text-[#888888] hover:text-[#F5F4EF] transition-colors p-1"
                    aria-label="Close photo preview"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Image */}
                <div className="relative w-full h-[380px] sm:h-[520px] bg-black">
                  <Image
                    src={selectedPhoto.image}
                    alt={selectedPhoto.title}
                    fill
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    className="object-contain"
                    priority
                  />
                </div>

                {/* Caption & Info */}
                <div className="p-6 bg-[#141414] border-t border-[#262626]">
                  <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[#F5F4EF] mb-2">
                    {selectedPhoto.title}
                  </h3>
                  <p className="font-mono-editorial text-xs text-[#aaaaaa] leading-relaxed">
                    {selectedPhoto.caption}
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* PART 2: VERIFIED REVIEWS & RATINGS */}
        <div id="reviews">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#222222] pb-8 mb-12 gap-6">
            <div>
              <span className="font-mono-editorial text-xs uppercase tracking-[0.25em] text-[#888888] block mb-2">
                VERIFIED GOOGLE ENDORSEMENTS
              </span>
              <h2 className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl text-[#F5F4EF] leading-tight">
                Driver Testimonials
              </h2>
            </div>

            {/* Google Rating badge */}
            <div className="flex items-center space-x-4">
              <div className="bg-[#181818] border border-[#2b2b2b] px-4 py-2.5 rounded-sm text-right">
                <div className="flex items-center space-x-1.5 justify-end">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-mono-editorial text-xs font-bold text-[#F5F4EF]">
                    {trustMetrics.rating} ★
                  </span>
                </div>
                <span className="font-mono-editorial text-[10px] text-[#888888] uppercase tracking-wider block mt-0.5">
                  {trustMetrics.reviewsCount} Google Verified Reviews
                </span>
              </div>

              <a
                href={businessInfo.googleMapsPlaceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center space-x-1.5 font-mono-editorial text-xs uppercase tracking-widest text-[#F5F4EF] hover:text-[#c5a059] border border-[#333333] hover:border-[#666666] px-4 py-2.5 rounded-sm transition-colors"
              >
                <span>View on Google Maps</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviewItems.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#151515] border border-[#222222] p-8 sm:p-10 rounded-sm flex flex-col justify-between hover:border-[#333333] transition-colors shadow-lg"
              >
                <div>
                  {/* Top Bar with rating and date */}
                  <div className="flex items-center justify-between border-b border-[#222222] pb-4 mb-6">
                    <div className="flex items-center space-x-1 text-amber-400">
                      {[...Array(review.rating)].map((_, s) => (
                        <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="font-mono-editorial text-xs text-[#666666] uppercase tracking-wider">
                      {review.date}
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="font-serif-editorial text-xl sm:text-2xl text-[#DCD9D0] leading-relaxed mb-8">
                    &ldquo;{review.content}&rdquo;
                  </p>
                </div>

                {/* Reviewer Details */}
                <div className="pt-6 border-t border-[#222222] flex items-center justify-between">
                  <div>
                    <h5 className="font-serif-editorial text-lg text-[#F5F4EF]">
                      {review.name}
                    </h5>
                    <p className="font-mono-editorial text-xs text-[#888888] uppercase tracking-wider mt-0.5">
                      Vehicle: {review.vehicle}
                    </p>
                  </div>

                  <div className="flex items-center space-x-1 font-mono-editorial text-[10px] text-emerald-400 uppercase tracking-widest bg-[#15231a] px-2.5 py-1 rounded border border-[#24452e]">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Google Verified</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
