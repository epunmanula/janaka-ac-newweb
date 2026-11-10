'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, PhoneCall, MessageSquareQuote } from 'lucide-react';
import { homepageFAQs, businessInfo } from '@/data/janakaData';
import { trackPhoneCall, trackWhatsAppClick } from '@/lib/analytics';

export const HomepageFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homepageFAQs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative isolate py-20 lg:py-28 overflow-hidden bg-[#031c2b] text-white border-t border-[#126782]/30"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#2586A3]/30 bg-[#06354B]/50 px-3.5 py-1 text-xs font-mono font-medium tracking-wider text-[#38BDF8] uppercase">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Answers & Diagnostics</span>
          </div>
          <h2
            id="faq-heading"
            className="mt-4 font-wide text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Frequently Asked Questions on Car A/C Repair in Gampaha
          </h2>
          <p className="mt-4 text-base text-[#A2B8C2] sm:text-lg">
            Straightforward technical answers about vehicle air conditioning issues, gas refilling, compressor restoration, and booking your inspection at Miriswatta.
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            {homepageFAQs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.q}
                  className={`rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? 'border-[#38BDF8]/40 bg-[#06354B]/40 shadow-lg shadow-[#021824]/50'
                      : 'border-[#17465E]/50 bg-[#021824]/60 hover:border-[#2586A3]/40 hover:bg-[#032333]/70'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left"
                  >
                    <span className="text-base sm:text-lg font-semibold text-white">
                      {faq.q}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-transform duration-300 ${
                        isOpen
                          ? 'rotate-180 border-[#38BDF8] bg-[#126782] text-white'
                          : 'border-[#17465E] bg-[#032333] text-[#A2B8C2]'
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-6 sm:px-6 sm:pb-7 text-sm sm:text-base leading-relaxed text-[#CDE6F5]/90 border-t border-[#126782]/20 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Quick Help Aside Card */}
          <div className="lg:col-span-4 rounded-2xl border border-[#2586A3]/30 bg-gradient-to-b from-[#06354B]/60 to-[#021824]/90 p-6 sm:p-8 backdrop-blur-md">
            <h3 className="font-wide text-xl font-bold text-white">
              Have a Specific A/C Problem?
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#A2B8C2]">
              Don&apos;t risk expensive compressor seizure by ignoring weak cooling, belt squeals, or unpleasant cabin odors. Speak directly to our lead climate technician.
            </p>

            <div className="mt-6 space-y-3">
              <a
                href={businessInfo.phoneHref}
                onClick={() => trackPhoneCall('faq_sidebar')}
                className="flex items-center justify-center gap-3 w-full rounded-xl bg-gradient-to-r from-[#126782] to-[#1B7796] py-3.5 px-4 text-sm font-semibold text-white shadow-md hover:brightness-110 transition-all"
              >
                <PhoneCall className="h-4 w-4" />
                <span>Call {businessInfo.phoneDisplay}</span>
              </a>

              <a
                href={businessInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('faq_sidebar')}
                className="flex items-center justify-center gap-3 w-full rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 py-3.5 px-4 text-sm font-semibold text-[#25D366] hover:bg-[#25D366]/20 transition-all"
              >
                <MessageSquareQuote className="h-4 w-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            <div className="mt-6 pt-5 border-t border-[#126782]/30 text-xs text-[#8FAEC0] space-y-1.5">
              <p>📍 366 Minuwangoda–Miriswatta Rd, Gampaha</p>
              <p>🕒 Tue – Sun: 8:30 AM – 6:00 PM</p>
              <p>🔒 100% Genuine Refrigerant Guarantee</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
