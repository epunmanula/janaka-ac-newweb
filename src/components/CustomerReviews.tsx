'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Phone,
  MessageSquareQuote,
  MapPin,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { verifiedCustomerReviews, googleReviewsSummary, CustomerReview } from '@/data/customerReviews';
import { businessInfo } from '@/data/janakaData';
import { trackPhoneCall, trackWhatsAppClick } from '@/lib/analytics';

export const CustomerReviews: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [reviews] = useState<CustomerReview[]>(verifiedCustomerReviews);

  const featuredReview = reviews.find((r) => r.isFeatured) || reviews[0];
  const carouselReviews = reviews.filter((r) => !r.isFeatured);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const offset = direction === 'left' ? -380 : 380;
    scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="relative isolate overflow-hidden bg-gradient-to-b from-[#021824] via-[#032332] to-[#02141F] py-24 text-white md:py-32 border-t border-[#144B66]/40"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 pb-12 border-b border-[#144B66]/30">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#2586A3]/40 bg-[#06354B]/60 px-3.5 py-1 text-xs font-mono font-medium tracking-wide text-[#38BDF8] uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Customer Experiences</span>
            </div>

            <h2
              id="reviews-heading"
              className="mt-4 font-wide text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              Good Work Speaks for Itself.
            </h2>

            <p className="mt-3 text-base sm:text-lg text-[#A2B8C2]">
              Real experiences from drivers who trusted Janaka Auto AC with their vehicle air conditioning.
            </p>
          </div>

          {/* Official Google Rating Score Card */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-2xl border border-[#2586A3]/40 bg-[#021824]/80 p-4 sm:p-5 backdrop-blur-md shadow-xl">
            {/* Google G Logo & Rating */}
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                <svg className="h-6 w-6" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-wide text-2xl font-bold text-white">
                    {googleReviewsSummary.averageRating}
                  </span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-[#8FAEC0]">
                  Based on <strong className="text-white">{googleReviewsSummary.totalReviewCount} verified reviews</strong> on Google Maps
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:border-l sm:border-[#144B66]/50 sm:pl-4">
              <a
                href={googleReviewsSummary.googleMapsWriteReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-[#38BDF8]/40 bg-[#06354B] px-3.5 py-2 text-xs font-semibold text-[#38BDF8] hover:bg-[#126782] hover:text-white transition-all shadow-sm"
              >
                Write a Review
              </a>
              <a
                href={googleReviewsSummary.googleMapsPlaceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-[#8FAEC0] hover:text-white transition-colors p-2"
                title="View official Janaka Auto AC Google Maps Profile"
              >
                <span>Read All</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Featured Hero Review Card (Vikum Samarasinghe) */}
        {featuredReview && (
          <div className="mt-10">
            <div className="relative overflow-hidden rounded-3xl border border-[#2586A3]/50 bg-gradient-to-br from-[#05283B] via-[#031F2E] to-[#021824] p-7 sm:p-10 shadow-2xl backdrop-blur-md">
              <div className="absolute right-6 top-6 text-[#126782]/20 sm:text-[#126782]/30 pointer-events-none" aria-hidden="true">
                <Quote className="h-28 w-28 -rotate-12" />
              </div>

              <div className="relative z-10 max-w-4xl">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="rounded-full bg-[#10B981]/15 border border-[#10B981]/30 px-3 py-0.5 text-[11px] font-semibold text-[#34D399]">
                    Verified Customer
                  </span>
                  {featuredReview.vehicleTag && (
                    <span className="rounded-full bg-[#38BDF8]/15 border border-[#38BDF8]/30 px-3 py-0.5 text-[11px] font-mono text-[#38BDF8]">
                      {featuredReview.vehicleTag}
                    </span>
                  )}
                  {featuredReview.serviceTag && (
                    <span className="rounded-full bg-[#06354B] border border-[#17465E] px-3 py-0.5 text-[11px] text-[#CDE6F5]">
                      {featuredReview.serviceTag}
                    </span>
                  )}
                </div>

                <blockquote className="mt-5 text-lg sm:text-2xl font-medium leading-relaxed text-white">
                  &ldquo;{featuredReview.reviewText}&rdquo;
                </blockquote>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#144B66]/30">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-cyan-600 font-bold text-white shadow-md">
                      {featuredReview.reviewerInitials}
                    </div>
                    <div>
                      <p className="font-wide text-base font-bold text-white">
                        {featuredReview.reviewerName}
                      </p>
                      <p className="text-xs text-[#8FAEC0]">
                        Google Review · {featuredReview.dateText}
                      </p>
                    </div>
                  </div>

                  <a
                    href={featuredReview.googleReviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#38BDF8] hover:underline"
                  >
                    <span>View on Google Maps</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Compact Horizontal Slider / Carousel Section */}
        <div className="mt-12">
          {/* Slider Controls Bar */}
          <div className="flex items-center justify-between pb-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#38BDF8]">
                More Verified Customer Reviews
              </span>
              <span className="hidden sm:inline text-xs text-[#8FAEC0]">• Drag or scroll horizontally</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                aria-label="Scroll reviews left"
                className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all ${
                  canScrollLeft
                    ? 'border-[#2586A3]/40 bg-[#06354B] text-white hover:border-[#38BDF8] hover:bg-[#126782]'
                    : 'border-[#17465E]/30 bg-[#021824]/50 text-white/30 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                aria-label="Scroll reviews right"
                className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all ${
                  canScrollRight
                    ? 'border-[#2586A3]/40 bg-[#06354B] text-white hover:border-[#38BDF8] hover:bg-[#126782]'
                    : 'border-[#17465E]/30 bg-[#021824]/50 text-white/30 cursor-not-allowed'
                }`}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Smooth Snap Scroll Container */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-6 pt-2 scroll-smooth snap-x snap-mandatory scrollbar-none"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {carouselReviews.map((review) => (
              <motion.article
                key={review.id}
                className="w-[320px] sm:w-[360px] shrink-0 snap-start rounded-2xl border border-[#17465E]/70 bg-[#031c2b]/90 p-6 backdrop-blur-sm shadow-lg hover:border-[#38BDF8]/50 hover:bg-[#04253a] transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Rating Stars & Verified Pill */}
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    {review.isLocalGuide && (
                      <span className="rounded-md border border-[#38BDF8]/30 bg-[#38BDF8]/10 px-2 py-0.5 text-[10px] font-mono font-medium text-[#38BDF8]">
                        Local Guide
                      </span>
                    )}
                  </div>

                  {/* Vehicle / Service Tag (if present) */}
                  {(review.vehicleTag || review.serviceTag) && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {review.vehicleTag && (
                        <span className="rounded-md bg-[#021824] border border-[#144B66]/60 px-2 py-0.5 text-[11px] font-mono text-[#CDE6F5]">
                          {review.vehicleTag}
                        </span>
                      )}
                      {review.serviceTag && (
                        <span className="rounded-md bg-[#021824] border border-[#144B66]/60 px-2 py-0.5 text-[11px] text-[#8FAEC0]">
                          {review.serviceTag}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Review Quote Text */}
                  <blockquote className="mt-4 text-sm leading-relaxed text-[#CDE6F5]/90 line-clamp-5">
                    &ldquo;{review.reviewText}&rdquo;
                  </blockquote>
                </div>

                {/* Reviewer Details Footer */}
                <div className="mt-6 pt-4 border-t border-[#144B66]/30 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${review.avatarColor} text-xs font-bold text-white shadow-sm`}
                    >
                      {review.reviewerInitials}
                    </div>
                    <div className="truncate max-w-[170px]">
                      <p className="truncate text-xs font-semibold text-white">
                        {review.reviewerName}
                      </p>
                      <p className="text-[11px] text-[#8FAEC0]">{review.dateText}</p>
                    </div>
                  </div>

                  <a
                    href={review.googleReviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#38BDF8] hover:text-white transition-colors"
                    title="View review on Google Maps"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Section Bottom Closing Area Immediately Leading into Footer */}
        <div className="mt-16 rounded-3xl border border-[#2586A3]/40 bg-gradient-to-r from-[#06354B] via-[#032332] to-[#021824] p-8 sm:p-12 shadow-2xl">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#10B981]/15 px-3 py-1 font-mono text-xs font-medium text-[#34D399]">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Miriswatta, Gampaha Workshop</span>
              </span>

              <h3 className="mt-4 font-wide text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                Your Vehicle Deserves the Right AC Care.
              </h3>

              <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#A2B8C2] max-w-2xl">
                Need help with your vehicle&apos;s air conditioning? Get in touch with Janaka Auto AC in Miriswatta, Gampaha for honest diagnosis, genuine refrigerant, and guaranteed craftsmanship.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <a
                href={`tel:${businessInfo.phoneRaw}`}
                onClick={() => trackPhoneCall('reviews_cta')}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#126782] to-[#1B7796] py-3.5 px-6 text-sm font-semibold text-white shadow-lg hover:brightness-110 transition-all text-center"
              >
                <Phone className="h-4 w-4" />
                <span>Call Now ({businessInfo.phoneDisplay})</span>
              </a>

              <a
                href={businessInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('reviews_cta')}
                className="flex items-center justify-center gap-2 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 py-3.5 px-6 text-sm font-semibold text-[#25D366] hover:bg-[#25D366]/20 transition-all text-center"
              >
                <MessageSquareQuote className="h-4 w-4" />
                <span>WhatsApp Us</span>
              </a>

              <a
                href={businessInfo.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-[#17465E] bg-[#02141F]/80 py-3 px-6 text-xs font-semibold text-[#CDE6F5] hover:border-[#38BDF8] transition-all text-center"
              >
                <MapPin className="h-3.5 w-3.5 text-[#38BDF8]" />
                <span>Get Directions (Miriswatta)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

