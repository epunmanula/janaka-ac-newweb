'use client';

import React, { useEffect, useState } from 'react';
import { MessageCircle, Phone, Calendar } from 'lucide-react';
import { businessInfo } from '@/data/janakaData';

/** Persistent call / WhatsApp / book actions on phones, shown once the hero CTAs scroll away. */
export const MobileActionBar: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.5);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-[#144B66]/60 bg-[#021824]/98 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(0,0,0,0.7)] transition-transform duration-300 ease-out md:hidden backdrop-blur-md ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-hidden={!visible}
    >
      <div className="grid grid-cols-3 text-xs font-semibold text-slate-200">
        <a
          href={`tel:${businessInfo.phoneRaw}`}
          tabIndex={visible ? 0 : -1}
          className="flex min-h-14 items-center justify-center gap-2 hover:text-[#38BDF8] transition-colors"
        >
          <Phone className="h-4 w-4 text-[#38BDF8]" aria-hidden="true" />
          <span>Call Now</span>
        </a>
        <a
          href={businessInfo.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visible ? 0 : -1}
          className="flex min-h-14 items-center justify-center gap-2 border-x border-[#144B66]/40 hover:text-emerald-300 transition-colors"
        >
          <MessageCircle className="h-4 w-4 text-[#10B981]" aria-hidden="true" />
          <span>WhatsApp</span>
        </a>
        <a
          href="#contact"
          tabIndex={visible ? 0 : -1}
          className="flex min-h-14 items-center justify-center gap-1.5 bg-gradient-to-r from-[#126782] via-[#1B7796] to-[#126782] text-white font-bold transition-all hover:brightness-110 active:brightness-95"
        >
          <Calendar className="h-4 w-4" />
          <span>Book</span>
        </a>
      </div>
    </div>
  );
};
