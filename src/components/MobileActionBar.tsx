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
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-navy-950 pb-[env(safe-area-inset-bottom)] transition-transform duration-500 ease-out-expo md:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-hidden={!visible}
    >
      <div className="grid grid-cols-3 text-[13px] font-semibold text-white">
        <a href={`tel:${businessInfo.phoneRaw}`} tabIndex={visible ? 0 : -1} className="flex min-h-14 items-center justify-center gap-2">
          <Phone className="h-4 w-4 text-ice" aria-hidden="true" />
          Call
        </a>
        <a
          href={businessInfo.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visible ? 0 : -1}
          className="flex min-h-14 items-center justify-center gap-2 border-x border-white/10"
        >
          <MessageCircle className="h-4 w-4 text-ice" aria-hidden="true" />
          WhatsApp
        </a>
        <a href="#contact" tabIndex={visible ? 0 : -1} className="flex min-h-14 items-center justify-center bg-ice text-navy-950">
          Book
        </a>
      </div>
    </div>
  );
};
