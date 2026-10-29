'use client';

import React, { useEffect, useState } from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { businessInfo } from '@/data/janakaData';

/** Persistent call / WhatsApp / book actions on phones, shown once the hero CTAs scroll away. */
export const MobileActionBar: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-sky-500/25 bg-[#030b18]/95 backdrop-blur-xl pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-out-expo md:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-hidden={!visible}
    >
      <div className="grid grid-cols-3 text-[13px] font-semibold text-slate-200">
        <a href={`tel:${businessInfo.phoneRaw}`} tabIndex={visible ? 0 : -1} className="flex min-h-14 items-center justify-center gap-2 hover:text-sky-300 transition-colors">
          <Phone className="h-4 w-4 text-sky-400" aria-hidden="true" />
          Call
        </a>
        <a
          href={businessInfo.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visible ? 0 : -1}
          className="flex min-h-14 items-center justify-center gap-2 border-x border-sky-500/20 hover:text-emerald-300 transition-colors"
        >
          <MessageCircle className="h-4 w-4 text-emerald-400" aria-hidden="true" />
          WhatsApp
        </a>
        <a href="#contact" tabIndex={visible ? 0 : -1} className="flex min-h-14 items-center justify-center bg-gradient-to-r from-blue-600 via-sky-600 to-sky-500 text-white font-bold hover:brightness-110 transition-all">
          Book
        </a>
      </div>
    </div>
  );
};
