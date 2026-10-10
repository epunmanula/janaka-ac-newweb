'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { servicesData } from '@/data/janakaData';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ServicesBentoProps {
  onSelectServiceForBooking: (serviceName: string) => void;
}

export const ServicesBento: React.FC<ServicesBentoProps> = ({
  onSelectServiceForBooking,
}) => {
  return (
    <section id="services" className="w-full py-20 md:py-28 border-b border-[#222222] bg-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#222222] pb-8 mb-12 gap-6">
          <div>
            <span className="font-mono-editorial text-xs uppercase tracking-[0.25em] text-[#888888] block mb-2">
              TECHNICAL PORTFOLIO // 6 CORE PROCEDURES
            </span>
            <h2 className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl text-[#F5F4EF] leading-tight">
              Engineered Climate Solutions
            </h2>
          </div>
          <p className="font-serif-editorial text-lg sm:text-xl text-[#888888] max-w-md">
            Factory-grade diagnostics, overhaul, and thermodynamic calibration tailored for Sri Lanka’s demanding tropical humidity.
          </p>
        </div>

        {/* 6-Card Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service, index) => {
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative bg-[#151515] hover:bg-[#181818] border border-[#222222] hover:border-[#383838] p-7 sm:p-8 rounded-sm transition-all duration-300 flex flex-col justify-between shadow-lg"
              >
                <div>
                  {/* Top Bar with Number & Spec */}
                  <div className="flex items-center justify-between border-b border-[#222222] pb-4 mb-5">
                    <span className="font-mono-editorial text-xs text-[#888888] tracking-widest uppercase font-medium">
                      PROCEDURE // {service.number}
                    </span>
                    <span className="font-mono-editorial text-[10px] tracking-wider uppercase px-2.5 py-1 rounded bg-[#1e1e1e] text-[#c5a059] border border-[#2c2c2c]">
                      {service.techSpec}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[#F5F4EF] leading-snug tracking-tight mb-3 group-hover:text-white transition-colors">
                    {service.title}
                  </h3>

                  {/* Summary */}
                  <p className="font-serif-editorial text-base text-[#DCD9D0] leading-relaxed mb-5">
                    {service.summary}
                  </p>

                  {/* Benefit Callout */}
                  <div className="mb-5 p-3 rounded-sm bg-[#121212] border border-[#262626]">
                    <span className="font-mono-editorial text-[10px] text-emerald-400 uppercase tracking-widest block mb-1">
                      Key Engineering Benefit
                    </span>
                    <p className="font-mono-editorial text-xs text-[#aaaaaa] leading-relaxed">
                      {service.benefit}
                    </p>
                  </div>

                  {/* Bullet Points */}
                  <ul className="space-y-2 pt-3 border-t border-[#202020] mb-6">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5 text-xs font-mono-editorial text-[#888888]">
                        <span className="text-[#555555] mt-0.5">•</span>
                        <span className="leading-relaxed text-[#999999]">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Card Footer */}
                <div className="pt-5 border-t border-[#222222] flex items-center justify-between">
                  <span className="font-mono-editorial text-[11px] text-[#666666] tracking-wider uppercase">
                    EST. {service.duration}
                  </span>

                  <button
                    onClick={() => onSelectServiceForBooking(service.title)}
                    className="inline-flex items-center space-x-1.5 text-xs font-mono-editorial uppercase tracking-widest text-[#F5F4EF] hover:text-[#c5a059] transition-colors group-hover:translate-x-1 duration-200"
                  >
                    <span>Book Bay</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
