'use client';

import React, { useEffect, useState } from 'react';
import { MessageCircle, Phone, Calendar } from 'lucide-react';
import { businessInfo } from '@/data/janakaData';

/** Persistent call / WhatsApp / book actions on mobile devices, shown once hero scrolls away. */
export const MobileActionBar: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.5);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-[#E5E3DE] bg-[#FFFFFF] pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgba(0,0,0,0.08)] transition-transform duration-300 ease-out md:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-hidden={!visible}
    >
      <div className="grid grid-cols-3 text-xs font-semibold text-[#24282B]">
        <a
          href="tel:+94714551409"
          tabIndex={visible ? 0 : -1}
          className="flex min-h-14 items-center justify-center gap-1.5 transition-colors hover:text-[#2586A3] active:bg-[#F6F4EF]"
        >
          <Phone className="h-4 w-4 text-[#2586A3]" aria-hidden="true" />
          <span>Call Now</span>
        </a>
        <a
          href={businessInfo.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visible ? 0 : -1}
          className="flex min-h-14 items-center justify-center gap-1.5 border-x border-[#E5E3DE] transition-colors hover:text-[#25D366] active:bg-[#F6F4EF]"
        >
          <MessageCircle className="h-4 w-4 text-[#25D366]" aria-hidden="true" />
          <span>WhatsApp</span>
        </a>
        <a
          href="#contact"
          tabIndex={visible ? 0 : -1}
          className="flex min-h-14 items-center justify-center gap-1.5 bg-[#123D4A] text-white font-bold transition-all hover:bg-[#2586A3] active:bg-[#0B252E]"
        >
          <Calendar className="h-4 w-4" />
          <span>Book</span>
        </a>
      </div>
    </div>
  );
};
