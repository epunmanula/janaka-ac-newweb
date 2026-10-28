'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Car } from '@/components/brand/Car';
import { navSections } from '@/data/janakaData';

const stops = navSections.filter((s) => s.id !== 'home');

/**
 * Desktop/tablet scroll companion: a slim road along the bottom of the viewport.
 * Each stop sits at the scroll position where its section reaches the header, so the
 * car arrives at "Services" exactly when the Services section arrives on screen.
 */
export const RouteRail: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.4 });
  const progress = reduceMotion ? scrollYProgress : smooth;

  const carX = useTransform(progress, (p) => `${p * 100}%`);
  const wheelRotate = useTransform(progress, [0, 1], [0, reduceMotion ? 0 : 4200]);

  const [positions, setPositions] = useState<number[]>([]);
  const [visible, setVisible] = useState(false);
  const [reached, setReached] = useState(-1);

  // Measure where each section starts as a fraction of total scroll distance
  useEffect(() => {
    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      setPositions(
        stops.map((s) => {
          const el = document.getElementById(s.id);
          if (!el) return 0;
          const top = el.getBoundingClientRect().top + window.scrollY - 72;
          return Math.min(1, Math.max(0, top / max));
        })
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    return () => observer.disconnect();
  }, []);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const hero = document.getElementById('home');
    const arrival = document.getElementById('arrival');
    const pastHero = hero ? y > hero.offsetHeight * 0.65 : y > 400;
    // Hand over to the garage scene once it is on screen
    const beforeArrival = arrival ? arrival.getBoundingClientRect().top > window.innerHeight * 0.75 : true;
    const next = pastHero && beforeArrival;
    if (next !== visible) setVisible(next);
  });

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    let idx = -1;
    positions.forEach((pos, i) => {
      if (p >= pos - 0.002) idx = i;
    });
    if (idx !== reached) setReached(idx);
  });

  return (
    <motion.nav
      aria-label="Page route"
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 24 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
      className="fixed bottom-5 left-1/2 z-40 hidden w-[min(820px,calc(100%-48px))] -translate-x-1/2 md:block"
    >
      <div className="rounded-[3px] border border-white/10 bg-navy-950/95 px-6 pb-2.5 pt-7 shadow-[0_18px_40px_-18px_rgb(7_21_34/0.7)]">
        <div className="relative h-5">
          {/* Road */}
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-white/15" />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-[-3px] h-px bg-[repeating-linear-gradient(to_right,rgb(170_184_197/0.25)_0_10px,transparent_10px_22px)]"
          />
          <motion.div
            aria-hidden="true"
            style={{ scaleX: progress }}
            className="absolute inset-x-0 bottom-0 h-px origin-left bg-ice"
          />

          {/* Stops */}
          <ol className="absolute inset-0">
            {stops.map((stop, i) => (
              <li
                key={stop.id}
                className="absolute bottom-0 -translate-x-1/2"
                style={{ left: `${(positions[i] ?? (i + 1) / (stops.length + 1)) * 100}%` }}
              >
                <a
                  href={`#${stop.id}`}
                  aria-current={reached === i ? 'location' : undefined}
                  className="group flex -translate-y-[calc(100%-4px)] flex-col items-center gap-1.5 px-1"
                >
                  <span
                    className={`whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.14em] transition-colors duration-300 ${
                      reached === i ? 'text-white' : reached > i ? 'text-silver' : 'text-silver/55 group-hover:text-silver'
                    }`}
                  >
                    {stop.label}
                  </span>
                  <span
                    className={`h-2 w-2 rounded-full border transition-colors duration-300 ${
                      reached >= i ? 'border-ice bg-ice' : 'border-silver/50 bg-navy-950'
                    }`}
                  />
                </a>
              </li>
            ))}
          </ol>

          {/* The car */}
          <motion.div aria-hidden="true" style={{ x: carX }} className="pointer-events-none absolute inset-x-0 bottom-[-2px]">
            <div className="w-14 -translate-x-1/2">
              <Car className="w-full" wheelRotate={wheelRotate} title="" />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};
