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
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-slate-200/90 bg-white/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] transition-transform duration-500 ease-out-expo md:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-hidden={!visible}
    >
      <div className="grid grid-cols-3 text-[13px] font-semibold text-slate-800">
        <a href={`tel:${businessInfo.phoneRaw}`} tabIndex={visible ? 0 : -1} className="flex min-h-14 items-center justify-center gap-2 hover:text-blue-600 transition-colors">
          <Phone className="h-4 w-4 text-blue-600" aria-hidden="true" />
          Call
        </a>
        <a
          href={businessInfo.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visible ? 0 : -1}
          className="flex min-h-14 items-center justify-center gap-2 border-x border-slate-200 hover:text-emerald-600 transition-colors"
        >
          <MessageCircle className="h-4 w-4 text-emerald-600" aria-hidden="true" />
          WhatsApp
        </a>
        <a href="#contact" tabIndex={visible ? 0 : -1} className="flex min-h-14 items-center justify-center bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors">
          Book
        </a>
      </div>
    </div>
  );
};
