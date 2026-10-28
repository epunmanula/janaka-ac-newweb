'use client';

import React from 'react';
import { motion, MotionConfig } from 'framer-motion';

/** Honour the visitor's reduced-motion setting for every framer-motion animation below. */
export const MotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MotionConfig reducedMotion="user">{children}</MotionConfig>
);

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Vertical travel in px before settling. */
  y?: number;
  as?: 'div' | 'li' | 'article' | 'header';
}

/** One-shot fade/rise when the element first enters the viewport. */
export const Reveal: React.FC<RevealProps> = ({ children, className, delay = 0, y = 24, as = 'div' }) => {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Component>
  );
};
