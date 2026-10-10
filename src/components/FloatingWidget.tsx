'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, MapPin, X, Wrench, ArrowUp, Navigation } from 'lucide-react';
import { businessInfo } from '@/data/janakaData';

export const FloatingWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Quick Action Palette */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 w-72 bg-[#161616]/95 backdrop-blur-xl border border-[#2a2a2a] rounded-sm p-5 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-[#252525] pb-3">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="font-mono-editorial text-[11px] uppercase tracking-[0.25em] text-[#888888]">
                  Direct Contact
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#666666] hover:text-[#F5F4EF] transition-colors"
                aria-label="Close widget"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              <a
                href={businessInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3 rounded-sm bg-[#121212] border border-[#24452e] hover:border-emerald-500/50 text-[#F5F4EF] transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span className="font-mono-editorial text-xs uppercase tracking-wider">
                    WhatsApp Chat
                  </span>
                </div>
                <span className="font-mono-editorial text-[10px] text-emerald-400">Online</span>
              </a>

              <a
                href={`tel:${businessInfo.phoneRaw}`}
                className="w-full flex items-center justify-between p-3 rounded-sm bg-[#121212] border border-[#262626] hover:border-[#444444] text-[#F5F4EF] transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-[#c5a059]" />
                  <span className="font-mono-editorial text-xs uppercase tracking-wider">
                    Call Hotline
                  </span>
                </div>
                <span className="font-mono-editorial text-[10px] text-[#888888]">{businessInfo.phone}</span>
              </a>

              <a
                href={businessInfo.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3 rounded-sm bg-[#121212] border border-[#262626] hover:border-[#444444] text-[#F5F4EF] transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <Navigation className="w-4 h-4 text-[#888888]" />
                  <span className="font-mono-editorial text-xs uppercase tracking-wider">
                    Get Directions
                  </span>
                </div>
                <span className="font-mono-editorial text-[10px] text-[#888888]">Miriswatta</span>
              </a>
            </div>

            <div className="pt-2 border-t border-[#222222] flex justify-end">
              <button
                onClick={scrollToTop}
                className="text-[11px] font-mono-editorial text-[#666666] hover:text-[#F5F4EF] uppercase tracking-widest flex items-center space-x-1"
              >
                <ArrowUp className="w-3 h-3" />
                <span>Top of Page</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative flex items-center justify-center w-12 h-12 rounded-full border transition-all duration-300 shadow-2xl focus:outline-none ${
          isOpen
            ? 'bg-[#F5F4EF] text-[#121212] border-[#F5F4EF] rotate-45'
            : 'bg-[#181818] text-[#F5F4EF] border-[#2e2e2e] hover:border-[#888888] hover:bg-[#202020]'
        }`}
        aria-label="Floating Action Menu"
        title="Quick Contact & Location"
      >
        {!isOpen && (
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#121212]" />
        )}
        <Wrench className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-90' : 'group-hover:rotate-12'}`} />
      </button>
    </div>
  );
};
