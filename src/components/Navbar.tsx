'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Phone, Menu, X, ArrowUpRight, MessageCircle } from 'lucide-react';
import { businessInfo } from '@/data/janakaData';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#gallery', label: 'Gallery' },
    { href: '#about', label: 'About Us' },
    { href: '#contact', label: 'Book & Contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-[#121212]/95 backdrop-blur-lg border-b border-[#2b2b2b] shadow-2xl'
          : 'bg-[#121212]/90 backdrop-blur-md border-b border-[#222222]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Brand Logo & Title */}
        <div className="flex items-center space-x-3.5">
          <a
            href="#"
            className="flex items-center space-x-3.5 text-left group focus:outline-none"
          >
            <div className="relative h-11 w-16 sm:h-12 sm:w-20 flex-shrink-0 flex items-center justify-center">
              <Image
                src="/janaka-logo-emblem.png"
                alt="Janaka Auto AC Logo"
                fill
                sizes="(max-width: 640px) 64px, 80px"
                className="object-contain filter drop-shadow-[0_0_12px_rgba(0,180,255,0.35)] drop-shadow-[0_1px_2px_rgba(255,255,255,0.2)] group-hover:scale-105 group-hover:drop-shadow-[0_0_18px_rgba(0,210,255,0.6)] transition-all duration-300"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif-editorial text-xl sm:text-2xl tracking-wide text-[#F5F4EF] group-hover:text-white transition-colors leading-none">
                {businessInfo.name}
              </span>
              <span className="font-mono-editorial text-[9px] uppercase tracking-[0.26em] text-[#888888] mt-1 group-hover:text-[#aaaaaa] transition-colors">
                PRECISION AUTOMOTIVE CLIMATE ENGINEERING
              </span>
            </div>
          </a>

          <span className="hidden lg:inline-block font-mono-editorial text-[10px] uppercase tracking-[0.25em] text-[#666666] border-l border-[#2e2e2e] pl-3 py-0.5">
            GAMPAHA • SRI LANKA
          </span>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs uppercase tracking-[0.2em] text-[#888888] hover:text-[#F5F4EF] transition-colors duration-200 py-1 font-mono-editorial"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Controls: Direct Call & WhatsApp */}
        <div className="hidden sm:flex items-center space-x-3">
          <a
            href={businessInfo.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-xs font-mono-editorial uppercase tracking-wider text-emerald-400 border border-[#23452f] hover:border-emerald-500/60 bg-[#14231a] px-3.5 py-2.5 rounded-sm transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>

          <a
            href={`tel:${businessInfo.phoneRaw}`}
            className="flex items-center space-x-2 text-xs font-mono-editorial uppercase tracking-wider bg-[#F5F4EF] text-[#121212] px-4 py-2.5 rounded-sm font-semibold hover:bg-white hover:shadow-lg transition-all"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{businessInfo.phone}</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center space-x-2 sm:hidden">
          <a
            href={`tel:${businessInfo.phoneRaw}`}
            className="p-2.5 bg-[#F5F4EF] text-[#121212] rounded-sm"
            aria-label="Call hotline"
          >
            <Phone className="w-4 h-4" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#888888] hover:text-[#F5F4EF] focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#222222] bg-[#141414] px-6 py-6 space-y-5">
          <div className="pb-3 border-b border-[#222222] flex items-center justify-between">
            <div className="relative h-9 w-32">
              <Image
                src="/janaka-logo-wide.png"
                alt="Janaka Auto AC"
                fill
                sizes="140px"
                className="object-contain object-left filter drop-shadow-[0_0_8px_rgba(0,180,255,0.3)]"
              />
            </div>
            <span className="font-mono-editorial text-[9px] uppercase tracking-wider text-emerald-400 bg-[#16251b] px-2 py-0.5 rounded border border-[#23452f]">
              Open Today
            </span>
          </div>

          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-left text-xs uppercase tracking-[0.2em] py-1.5 text-[#888888] hover:text-[#F5F4EF] font-mono-editorial"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-4 border-t border-[#222222] flex flex-col gap-3">
            <span className="font-mono-editorial text-xs text-[#888888]">
              {businessInfo.address}
            </span>

            <div className="flex items-center justify-between pt-2">
              <a
                href={businessInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono-editorial text-emerald-400 flex items-center space-x-1"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={`tel:${businessInfo.phoneRaw}`}
                className="text-xs font-mono-editorial text-[#F5F4EF] flex items-center space-x-1.5"
              >
                <span>{businessInfo.phone}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
