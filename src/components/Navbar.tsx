'use client';

import React, { useEffect, useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
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

  // Intersection observer to track active section
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
      { rootMargin: '-40% 0px -50% 0px' }
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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'bg-[#FFFFFF]/96 backdrop-blur-md border-b border-[#E5E3DE] shadow-sm'
          : 'bg-[#F6F4EF]/90 backdrop-blur-sm border-b border-[#E5E3DE]/70'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <a
          href="#home"
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2586A3] rounded transition-opacity hover:opacity-90"
          aria-label={`${businessInfo.name} – Return to top`}
        >
          <Logo variant="dark" />
        </a>

        {/* Desktop Navigation */}
        <nav aria-label="Main Navigation" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {desktopLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={isActive ? 'location' : undefined}
                    className={`relative py-1 text-[13.5px] font-medium tracking-[0.01em] transition-colors duration-200 ${
                      isActive ? 'text-[#123D4A] font-semibold' : 'text-[#71818A] hover:text-[#24282B]'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 -bottom-1.5 h-[2px] bg-[#2586A3] rounded-full"
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <a
            href={`tel:${businessInfo.phoneRaw}`}
            className="hidden items-center gap-2 px-3 py-2 text-[13.5px] font-semibold text-[#24282B] hover:text-[#2586A3] transition-colors xl:inline-flex"
          >
            <Phone className="h-4 w-4 text-[#2586A3]" aria-hidden="true" />
            <span>{businessInfo.phone}</span>
          </a>

          <a
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center rounded-md bg-[#123D4A] px-5 py-2.5 text-[13px] font-semibold text-white tracking-[0.02em] shadow-sm transition-all duration-200 hover:bg-[#2586A3] active:translate-y-px"
          >
            Book a Service
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-[#24282B] hover:bg-[#E5E3DE]/50 transition-colors lg:hidden"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="border-t border-[#E5E3DE] bg-[#FFFFFF] px-4 pb-8 pt-4 shadow-xl sm:px-6 lg:hidden"
      >
        <nav aria-label="Mobile Navigation">
          <ul className="divide-y divide-[#E5E3DE]">
            {navSections.map((link, i) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active === link.id ? 'location' : undefined}
                  className={`flex items-baseline justify-between py-4 text-base font-semibold ${
                    active === link.id ? 'text-[#2586A3]' : 'text-[#24282B] hover:text-[#123D4A]'
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-[11px] font-normal text-[#71818A]">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <a
            href={`tel:${businessInfo.phoneRaw}`}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-[#E5E3DE] bg-[#F6F4EF] py-3.5 text-sm font-semibold text-[#24282B] hover:border-[#71818A] transition-colors"
          >
            <Phone className="h-4 w-4 text-[#2586A3]" aria-hidden="true" />
            <span>Call Workshop</span>
          </a>
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center justify-center rounded-md bg-[#123D4A] py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-[#2586A3] transition-colors"
          >
            Book a Service
          </a>
        </div>
      </div>
    </header>
  );
};
