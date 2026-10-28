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
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ${
        solid ? 'border-b border-white/8 bg-navy-950/92 backdrop-blur-md' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <a href="#home" className="relative block h-6 w-[130px] shrink-0 sm:h-7 sm:w-[152px]" aria-label={`${businessInfo.name} – back to top`}>
          <Image src="/brand/logo-wide.webp" alt="" fill sizes="152px" className="object-contain object-left" preload />
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
                      isActive ? 'text-white' : 'text-silver hover:text-white'
                    }`}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-ice transition-transform duration-500 ease-out-expo ${
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
            className="hidden items-center gap-2 px-3 py-2 text-[13px] font-medium text-silver transition-colors hover:text-white xl:inline-flex"
          >
            <Phone className="h-4 w-4 text-ice" aria-hidden="true" />
            {businessInfo.phone}
          </a>
          <a
            href="#contact"
            className="hidden rounded-[3px] bg-ice px-4 py-2.5 text-[13px] font-semibold text-navy-950 transition-colors duration-300 hover:bg-white sm:inline-flex"
          >
            Book a Service
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex h-11 w-11 items-center justify-center text-white lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" hidden={!menuOpen} className="border-t border-white/8 bg-navy-950 px-4 pb-6 pt-2 sm:px-6 lg:hidden">
        <nav aria-label="Mobile">
          <ul className="divide-y divide-white/8">
            {navSections.map((link, i) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active === link.id ? 'location' : undefined}
                  className={`flex items-baseline gap-4 py-3.5 font-wide text-lg font-semibold ${
                    active === link.id ? 'text-ice' : 'text-white'
                  }`}
                >
                  <span className="font-mono text-[11px] font-normal text-silver/70">0{i + 1}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <a
            href={`tel:${businessInfo.phoneRaw}`}
            className="inline-flex items-center justify-center gap-2 rounded-[3px] border border-white/15 py-3.5 text-sm font-semibold text-white"
          >
            <Phone className="h-4 w-4 text-ice" aria-hidden="true" />
            Call Now
          </a>
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center justify-center rounded-[3px] bg-ice py-3.5 text-sm font-semibold text-navy-950"
          >
            Book a Service
          </a>
        </div>
      </div>
    </header>
  );
};
