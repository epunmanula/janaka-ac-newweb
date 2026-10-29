'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Menu, Phone, X } from 'lucide-react';
import { businessInfo, navSections } from '@/data/janakaData';

const desktopLinks = navSections.filter((s) => s.id !== 'home');

export const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the section occupying the middle band of the viewport
  useEffect(() => {
    const sections = navSections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-500 ${
        solid
          ? 'border-b border-slate-200/90 bg-white/95 backdrop-blur-md shadow-sm'
          : 'border-b border-slate-200/60 bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <a href="#home" className="relative block h-6 w-[130px] shrink-0 sm:h-7 sm:w-[152px]" aria-label={`${businessInfo.name} – back to top`}>
          <Image src="/janaka-logo-wide.png" alt={businessInfo.name} fill sizes="152px" className="object-contain object-left" preload />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {desktopLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={isActive ? 'location' : undefined}
                    className={`group relative py-2 text-[13px] font-medium tracking-wide transition-colors duration-300 ${
                      isActive ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-blue-600'
                    }`}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 -bottom-0.5 h-[2px] origin-left bg-blue-600 transition-transform duration-500 ease-out-expo ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${businessInfo.phoneRaw}`}
            className="hidden items-center gap-2 px-3 py-2 text-[13px] font-medium text-slate-700 transition-colors hover:text-blue-600 xl:inline-flex"
          >
            <Phone className="h-4 w-4 text-blue-600" aria-hidden="true" />
            {businessInfo.phone}
          </a>
          <a
            href="#contact"
            className="hidden rounded-[4px] bg-blue-600 px-4 py-2.5 text-[13px] font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600/25 sm:inline-flex"
          >
            Book a Service
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex h-11 w-11 items-center justify-center text-slate-800 hover:text-blue-600 lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" hidden={!menuOpen} className="border-t border-slate-200 bg-white px-4 pb-6 pt-2 shadow-lg sm:px-6 lg:hidden">
        <nav aria-label="Mobile">
          <ul className="divide-y divide-slate-100">
            {navSections.map((link, i) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active === link.id ? 'location' : undefined}
                  className={`flex items-baseline gap-4 py-3.5 font-wide text-lg font-semibold ${
                    active === link.id ? 'text-blue-600' : 'text-slate-800 hover:text-blue-600'
                  }`}
                >
                  <span className="font-mono text-[11px] font-normal text-slate-400">0{i + 1}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <a
            href={`tel:${businessInfo.phoneRaw}`}
            className="inline-flex items-center justify-center gap-2 rounded-[4px] border border-slate-300 py-3.5 text-sm font-semibold text-slate-800 hover:border-blue-600 hover:text-blue-600 transition-colors"
          >
            <Phone className="h-4 w-4 text-blue-600" aria-hidden="true" />
            Call Now
          </a>
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center justify-center rounded-[4px] bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 transition-colors"
          >
            Book a Service
          </a>
        </div>
      </div>
    </header>
  );
};
