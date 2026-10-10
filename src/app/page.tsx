'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { DashboardGrid } from '@/components/DashboardGrid';
import { ServicesBento } from '@/components/ServicesBento';
import { DiagnosticsCalculator } from '@/components/DiagnosticsCalculator';
import { GalleryReviews } from '@/components/GalleryReviews';
import { AboutSection } from '@/components/AboutSection';
import { BookingContact } from '@/components/BookingContact';
import { FloatingWidget } from '@/components/FloatingWidget';
import { businessInfo, businessHours } from '@/data/janakaData';
import { ExternalLink, MapPin, Phone, Mail } from 'lucide-react';

export default function Home() {
  const [selectedService, setSelectedService] = useState<string>('');

  const handleSelectServiceForBooking = (serviceName: string) => {
    setSelectedService(serviceName);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBooking = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#F5F4EF] selection:bg-[#F5F4EF] selection:text-[#121212] flex flex-col relative film-grain">
      {/* 1. TOP NAVIGATION BAR */}
      <Navbar />

      <main className="flex-1 flex flex-col">
        {/* 2. EDITORIAL HERO SECTION */}
        <HeroSection onOpenBooking={handleOpenBooking} />

        {/* 3. 3-COLUMN STATUS DASHBOARD */}
        <DashboardGrid />

        {/* 4. SERVICES BENTO GRID SECTION (6 CORE SERVICES) */}
        <ServicesBento onSelectServiceForBooking={handleSelectServiceForBooking} />

        {/* 5. INTERACTIVE DIAGNOSTICS & TROUBLESHOOTER */}
        <DiagnosticsCalculator />

        {/* 6. REAL WORKSHOP GALLERY & VERIFIED REVIEWS */}
        <GalleryReviews />

        {/* 7. HERITAGE & QUALITY STANDARDS */}
        <AboutSection />

        {/* 8. WORKSHOP BAY BOOKING & CONTACT */}
        <BookingContact initialService={selectedService} />
      </main>

      {/* EDITORIAL FOOTER */}
      <footer className="w-full border-t border-[#222222] bg-[#0c0c0c] py-14 px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#1c1c1c]">
            <div className="flex items-center space-x-3.5">
              <div className="relative w-11 h-11 flex-shrink-0">
                <Image
                  src="/janakaacneewlog-removebg-preview.png"
                  alt="Janaka Auto AC Emblem"
                  fill
                  sizes="44px"
                  className="object-contain filter drop-shadow-[0_2px_8px_rgba(0,102,204,0.4)]"
                />
              </div>
              <div>
                <span className="font-serif-editorial text-2xl sm:text-3xl text-[#F5F4EF] tracking-wide block">
                  {businessInfo.name}
                </span>
                <p className="font-mono-editorial text-xs text-[#888888] tracking-widest uppercase mt-0.5">
                  {businessInfo.tagline}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 font-mono-editorial text-xs text-[#888888]">
              <a href="#services" className="hover:text-[#F5F4EF] transition-colors">Services</a>
              <a href="#diagnostics" className="hover:text-[#F5F4EF] transition-colors">Diagnostics</a>
              <a href="#gallery" className="hover:text-[#F5F4EF] transition-colors">Gallery</a>
              <a href="#about" className="hover:text-[#F5F4EF] transition-colors">About</a>
              <a href="#contact" className="hover:text-[#F5F4EF] transition-colors">Book Bay</a>
              <a
                href={businessInfo.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors flex items-center space-x-1"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Facebook</span>
              </a>
              <a
                href={businessInfo.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F5F4EF] transition-colors flex items-center space-x-1"
              >
                <span>TikTok</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono-editorial text-[#666666] gap-4">
            <p>© 2026 {businessInfo.name}. All rights reserved. Western Province, Sri Lanka.</p>
            <div className="flex flex-wrap items-center space-x-4">
              <span className="text-[#888888]">{businessInfo.address}</span>
              <span>•</span>
              <a href={`tel:${businessInfo.phoneRaw}`} className="text-[#888888] hover:text-[#F5F4EF]">
                {businessInfo.phone}
              </a>
              <span>•</span>
              <a href={`mailto:${businessInfo.email}`} className="text-[#888888] hover:text-[#F5F4EF]">
                {businessInfo.email}
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* 9. FLOATING ACTION WIDGET BUTTON (BOTTOM-RIGHT CORNER) */}
      <FloatingWidget />
    </div>
  );
}
