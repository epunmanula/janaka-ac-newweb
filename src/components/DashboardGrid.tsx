'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, ArrowUpRight, MessageCircle } from 'lucide-react';
import { businessInfo, businessHours, trustMetrics } from '@/data/janakaData';

export const DashboardGrid: React.FC = () => {
  return (
    <div className="w-full border-b border-[#222222] bg-[#121212]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#222222]">
          {/* Column 1: LOCATION */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between group hover:bg-[#151515] transition-colors duration-200"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono-editorial text-xs uppercase tracking-[0.25em] text-[#888888] font-medium">
                  WORKSHOP LOCATION
                </span>
                <MapPin className="w-3.5 h-3.5 text-[#666666] group-hover:text-cyan-400 transition-colors" />
              </div>

              <h3 className="font-serif-editorial text-2xl sm:text-3xl lg:text-[1.75rem] text-[#F5F4EF] leading-snug tracking-tight mb-2">
                {businessInfo.address}
              </h3>

              <p className="font-mono-editorial text-xs text-[#777777] tracking-wider uppercase mt-1">
                Miriswatta Corridor • Direct Highway Access
              </p>
            </div>

            <div className="pt-8 flex items-center justify-between">
              <span className="text-[11px] font-mono-editorial text-[#555555] uppercase tracking-widest">
                Gampaha District
              </span>
              <div className="flex items-center space-x-3">
                <a
                  href={businessInfo.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-xs font-mono-editorial text-[#888888] hover:text-[#F5F4EF] transition-colors uppercase tracking-wider"
                >
                  <span>Directions</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Column 2: HOTLINE & DIGITAL DESK */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between group hover:bg-[#151515] transition-colors duration-200"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono-editorial text-xs uppercase tracking-[0.25em] text-[#888888] font-medium">
                  DIRECT HOTLINE & EMAIL
                </span>
                <Phone className="w-3.5 h-3.5 text-[#666666] group-hover:text-emerald-400 transition-colors" />
              </div>

              <a
                href={`tel:${businessInfo.phoneRaw}`}
                className="font-serif-editorial text-2xl sm:text-3xl lg:text-[1.85rem] text-[#F5F4EF] leading-snug tracking-tight mb-2 block hover:text-white transition-colors"
              >
                {businessInfo.phone}
              </a>

              <a
                href={`mailto:${businessInfo.email}`}
                className="font-mono-editorial text-xs text-[#777777] hover:text-[#aaaaaa] tracking-wider block transition-colors"
              >
                {businessInfo.email}
              </a>
            </div>

            <div className="pt-8 flex items-center justify-between">
              <span className="text-[11px] font-mono-editorial text-[#555555] uppercase tracking-widest">
                Voice, SMS & WhatsApp
              </span>
              <a
                href={businessInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-xs font-mono-editorial text-emerald-400/90 hover:text-emerald-300 transition-colors uppercase tracking-wider"
              >
                <MessageCircle className="w-3 h-3" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </motion.div>

          {/* Column 3: OPERATING HOURS & CAPACITY */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between group hover:bg-[#151515] transition-colors duration-200"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono-editorial text-xs uppercase tracking-[0.25em] text-[#888888] font-medium">
                  BUSINESS HOURS & INTAKE
                </span>
                <Clock className="w-3.5 h-3.5 text-[#666666] group-hover:text-amber-400 transition-colors" />
              </div>

              <h3 className="font-serif-editorial text-xl sm:text-2xl lg:text-[1.65rem] text-[#F5F4EF] leading-snug tracking-tight mb-2">
                Tue – Sun: {businessHours.tuesdayToSunday}
              </h3>

              <p className="font-mono-editorial text-xs text-amber-400/90 tracking-wider">
                Monday: Closed for Workshop Maintenance
              </p>
            </div>

            <div className="pt-8 flex items-center justify-between">
              <span className="flex items-center space-x-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono-editorial tracking-widest uppercase bg-[#18231c] text-[#6ee7b7] border border-[#23452f]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />
                <span>{trustMetrics.dailyBayCapacity}</span>
              </span>
              <span className="text-[11px] font-mono-editorial text-[#555555] uppercase tracking-widest">
                Priority Bays
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
