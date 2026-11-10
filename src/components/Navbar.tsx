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
    const onScroll = () => setScrolled(window.scrollY > 20);
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
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
        solid
          ? 'border-b border-[#144B66]/50 bg-[#021824]/95 md:backdrop-blur-md shadow-xl shadow-black/50'
          : 'border-b border-[#144B66]/25 bg-[#021824]/85 md:backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <a
          href="/"
          className="group relative flex items-center shrink-0 h-9 w-[190px] sm:h-10 sm:w-[220px] lg:h-11 lg:w-[245px] transition-transform duration-300 hover:scale-[1.01]"
          aria-label={`${businessInfo.name} – home`}
        >
          <Image
            src="/brand/logo-navbar.webp"
            alt={businessInfo.name}
            fill
            sizes="(max-width: 640px) 190px, (max-width: 1024px) 220px, 245px"
            className="object-contain object-left filter drop-shadow-[0_2px_12px_rgba(56,189,248,0.4)] transition-all duration-300"
            priority
          />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {desktopLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`/#${link.id}`}
                    aria-current={isActive ? 'location' : undefined}
                    className={`group relative py-2 text-[13px] font-medium tracking-wide transition-colors duration-300 ${
                      isActive ? 'text-[#CDE6F5] font-semibold' : 'text-[#A2B8C2] hover:text-white'
                    }`}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 -bottom-0.5 h-[2px] origin-left bg-[#38BDF8] shadow-[0_0_8px_rgba(56,189,248,0.7)] transition-transform duration-300 ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${businessInfo.phoneRaw}`}
            className="hidden items-center gap-2 px-3 py-2 text-[13px] font-medium text-[#E0F2FE] transition-colors hover:text-[#38BDF8] xl:inline-flex"
          >
            <Phone className="h-4 w-4 text-[#38BDF8]" aria-hidden="true" />
            <span>{businessInfo.phone}</span>
          </a>
          <a
            href="/#contact"
            className="hidden rounded-xl bg-gradient-to-r from-[#126782] via-[#1B7796] to-[#126782] px-5 py-2.5 text-xs font-bold text-white shadow-md border border-[#2586A3]/40 transition-all duration-300 hover:brightness-110 active:translate-y-px sm:inline-flex"
          >
            Book a Service
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex h-11 w-11 items-center justify-center text-slate-200 hover:text-[#38BDF8] lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="border-t border-[#144B66]/40 bg-[#021824] px-4 pb-6 pt-2 shadow-2xl sm:px-6 lg:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="divide-y divide-[#144B66]/20">
            {navSections.map((link, i) => (
              <li key={link.id}>
                <a
                  href={`/#${link.id}`}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active === link.id ? 'location' : undefined}
                  className={`flex items-baseline gap-4 py-3.5 font-wide text-lg font-semibold ${
                    active === link.id ? 'text-[#CDE6F5]' : 'text-slate-200 hover:text-white'
                  }`}
                >
                  <span className="font-mono text-[11px] font-normal text-[#8FAEC0]">0{i + 1}</span>
                  <span>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <a
            href={`tel:${businessInfo.phoneRaw}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#144B66] bg-[#052436] py-3.5 text-xs font-semibold text-white hover:border-[#38BDF8] transition-colors"
          >
            <Phone className="h-4 w-4 text-[#38BDF8]" aria-hidden="true" />
            <span>Call Now</span>
          </a>
          <a
            href="/#contact"
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#126782] via-[#1B7796] to-[#126782] py-3.5 text-xs font-bold text-white shadow-md border border-[#2586A3]/40 hover:brightness-110 transition-all"
          >
            Book a Service
          </a>
        </div>
      </div>
    </header>
  );
};
