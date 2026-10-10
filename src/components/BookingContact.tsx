'use client';

import React, { useState } from 'react';
import {
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  Calendar,
  Check,
  Mail,
  ArrowUpRight,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { businessInfo, businessHours, bookingSlotsData, trustMetrics } from '@/data/janakaData';

interface BookingContactProps {
  initialService?: string;
}

export const BookingContact: React.FC<BookingContactProps> = ({
  initialService = '',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    vehicle: '',
    service: initialService || '',
    timeSlot: bookingSlotsData[0].time,
    date: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hello Janaka Auto AC,\n\nI would like to reserve a workshop bay session:\n- Name: ${formData.name || 'Valued Client'}\n- Phone: ${formData.phone || 'Direct'}\n- Vehicle: ${formData.vehicle || 'Not specified'}\n- Service / Issue: ${formData.service || 'Comprehensive A/C Diagnostics'}\n- Preferred Slot: ${formData.timeSlot}\n- Preferred Date: ${formData.date || 'Earliest Available'}\n- Notes: ${formData.notes || 'None'}\n\nPlease confirm availability for 366 Miriswatta Road, Gampaha.`
    );
    window.open(`https://wa.me/94714551409?text=${msg}`, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="contact" className="w-full py-20 md:py-28 border-b border-[#222222] bg-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#222222] pb-8 mb-12 gap-6">
          <div>
            <span className="font-mono-editorial text-xs uppercase tracking-[0.25em] text-[#888888] block mb-2">
              RESERVE WORKSHOP BAY // {trustMetrics.dailyBayCapacity}
            </span>
            <h2 className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl text-[#F5F4EF] leading-tight">
              Book Your Diagnostic Session
            </h2>
          </div>
          <p className="font-serif-editorial text-lg sm:text-xl text-[#888888] max-w-md">
            Reserve an inspection bay with Master Technician Janaka. Booked arrivals receive priority intake with zero queue waiting.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Booking Form */}
          <div className="lg:col-span-7 bg-[#151515] border border-[#222222] p-8 sm:p-10 rounded-sm shadow-xl">
            <div className="flex items-center justify-between border-b border-[#262626] pb-4 mb-6">
              <span className="font-mono-editorial text-xs uppercase tracking-wider text-[#888888]">
                Bay Reservation Form
              </span>
              <span className="text-[10px] font-mono-editorial text-emerald-400 bg-[#16251b] px-2.5 py-1 rounded border border-[#23452f]">
                Same-Day Intake Available
              </span>
            </div>

            <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="font-mono-editorial text-[11px] uppercase tracking-wider text-[#888888] block mb-2">
                    Driver / Owner Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Nuwan Jayasuriya"
                    className="w-full bg-[#181818] border border-[#2e2e2e] focus:border-[#888888] text-[#F5F4EF] px-4 py-3 rounded-sm font-sans-editorial text-sm focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="font-mono-editorial text-[11px] uppercase tracking-wider text-[#888888] block mb-2">
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. 071 455 1409"
                    className="w-full bg-[#181818] border border-[#2e2e2e] focus:border-[#888888] text-[#F5F4EF] px-4 py-3 rounded-sm font-mono-editorial text-sm focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="font-mono-editorial text-[11px] uppercase tracking-wider text-[#888888] block mb-2">
                    Vehicle Make & Model *
                  </label>
                  <input
                    type="text"
                    required
                    name="vehicle"
                    value={formData.vehicle}
                    onChange={handleInputChange}
                    placeholder="e.g. Toyota Premio / Vezel / BMW"
                    className="w-full bg-[#181818] border border-[#2e2e2e] focus:border-[#888888] text-[#F5F4EF] px-4 py-3 rounded-sm font-sans-editorial text-sm focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="font-mono-editorial text-[11px] uppercase tracking-wider text-[#888888] block mb-2">
                    Preferred Appointment Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full bg-[#181818] border border-[#2e2e2e] focus:border-[#888888] text-[#F5F4EF] px-4 py-3 rounded-sm font-mono-editorial text-sm focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Time Slots Selector */}
              <div>
                <label className="font-mono-editorial text-[11px] uppercase tracking-wider text-[#888888] block mb-2">
                  Select Workshop Bay Time Slot
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {bookingSlotsData.map((slot) => {
                    const isSelected = formData.timeSlot === slot.time;
                    return (
                      <button
                        type="button"
                        key={slot.time}
                        onClick={() => setFormData((prev) => ({ ...prev, timeSlot: slot.time }))}
                        className={`text-left p-3 rounded-sm border transition-all text-xs font-mono-editorial ${
                          isSelected
                            ? 'border-[#F5F4EF] bg-[#222222] text-[#F5F4EF]'
                            : 'border-[#282828] bg-[#181818] text-[#888888] hover:border-[#444444]'
                        }`}
                      >
                        <span className="font-bold block text-[#F5F4EF]">{slot.time}</span>
                        <span className="text-[10px] text-[#777777] block mt-0.5">{slot.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="font-mono-editorial text-[11px] uppercase tracking-wider text-[#888888] block mb-2">
                  Reported Symptom or Required Service
                </label>
                <textarea
                  rows={3}
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  placeholder="Describe your issue (e.g. Blowing warm air at idle, grinding clutch noise, gas refill and nitrogen leak check)"
                  className="w-full bg-[#181818] border border-[#2e2e2e] focus:border-[#888888] text-[#F5F4EF] px-4 py-3 rounded-sm font-sans-editorial text-sm focus:outline-none transition-colors"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-4 items-center">
                <button
                  type="submit"
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center space-x-2 font-mono-editorial text-xs uppercase tracking-[0.2em] bg-[#F5F4EF] text-[#121212] px-8 py-4 rounded-sm font-semibold hover:bg-white transition-all shadow-xl"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Reserve via WhatsApp</span>
                </button>

                <a
                  href={`tel:${businessInfo.phoneRaw}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 font-mono-editorial text-xs uppercase tracking-[0.2em] text-[#F5F4EF] border border-[#333333] hover:border-[#888888] px-6 py-4 rounded-sm transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#888888]" />
                  <span>Call Hotline</span>
                </a>
              </div>

              {submitted && (
                <div className="p-4 bg-[#142319] border border-[#23452f] rounded-sm text-xs font-mono-editorial text-emerald-400 flex items-center space-x-2">
                  <Check className="w-4 h-4" />
                  <span>Opening WhatsApp with your booking details. Master Technician Janaka will confirm promptly.</span>
                </div>
              )}
            </form>
          </div>

          {/* Workshop Contact Details & Interactive Map Card */}
          <div className="lg:col-span-5 bg-[#151515] border border-[#222222] p-8 sm:p-10 rounded-sm space-y-6 shadow-xl">
            <div>
              <span className="font-mono-editorial text-xs text-[#888888] uppercase tracking-[0.2em] block mb-2">
                WORKSHOP HEADQUARTERS
              </span>
              <h3 className="font-serif-editorial text-3xl text-[#F5F4EF] mb-1">
                {businessInfo.name}
              </h3>
              <span className="font-serif-editorial text-lg text-[#c5a059] block mb-3">
                {businessInfo.nameSinhala}
              </span>
              <p className="font-serif-editorial text-base text-[#DCD9D0] leading-relaxed">
                Specialized automotive air conditioning diagnostic facility located on the primary Minuwangoda–Miriswatta corridor in Gampaha.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-[#222222] text-sm">
              <div className="flex items-start space-x-3.5">
                <MapPin className="w-4 h-4 text-[#c5a059] mt-1 flex-shrink-0" />
                <div>
                  <span className="font-mono-editorial text-xs text-[#888888] uppercase block">Workshop Address</span>
                  <span className="font-serif-editorial text-base text-[#F5F4EF]">
                    {businessInfo.address}
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <Phone className="w-4 h-4 text-[#c5a059] mt-1 flex-shrink-0" />
                <div>
                  <span className="font-mono-editorial text-xs text-[#888888] uppercase block">Phone & WhatsApp</span>
                  <a href={`tel:${businessInfo.phoneRaw}`} className="font-serif-editorial text-lg text-[#F5F4EF] hover:text-white">
                    {businessInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <Mail className="w-4 h-4 text-[#c5a059] mt-1 flex-shrink-0" />
                <div>
                  <span className="font-mono-editorial text-xs text-[#888888] uppercase block">Email Address</span>
                  <a href={`mailto:${businessInfo.email}`} className="font-serif-editorial text-base text-[#F5F4EF] hover:text-white">
                    {businessInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <Clock className="w-4 h-4 text-[#c5a059] mt-1 flex-shrink-0" />
                <div>
                  <span className="font-mono-editorial text-xs text-[#888888] uppercase block">Operating Schedule</span>
                  <span className="font-serif-editorial text-base text-[#F5F4EF] block">
                    Tuesday – Sunday: {businessHours.tuesdayToSunday}
                  </span>
                  <span className="font-mono-editorial text-xs text-amber-400 block mt-0.5">
                    Monday Closed (Workshop Maintenance & Calibration)
                  </span>
                </div>
              </div>
            </div>

            {/* Google Map Embed Iframe */}
            <div className="pt-4 border-t border-[#222222]">
              <div className="w-full h-44 rounded-sm overflow-hidden border border-[#2b2b2b] bg-[#121212]">
                <iframe
                  title="Janaka Auto AC Workshop Location Map"
                  src={businessInfo.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(90%)' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Social and Navigation Links */}
            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={businessInfo.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center space-x-1.5 font-mono-editorial text-xs uppercase tracking-wider border border-[#333333] hover:border-[#888888] hover:bg-[#1a1a1a] text-[#F5F4EF] py-3 px-3 rounded-sm transition-all"
              >
                <MapPin className="w-3.5 h-3.5 text-[#888888]" />
                <span>Get Directions</span>
              </a>

              <a
                href={businessInfo.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-1.5 font-mono-editorial text-xs uppercase tracking-wider border border-[#333333] hover:border-[#888888] hover:bg-[#1a1a1a] text-[#F5F4EF] py-3 px-4 rounded-sm transition-all"
              >
                <svg className="w-3.5 h-3.5 fill-current text-blue-400" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Facebook</span>
              </a>

              <a
                href={businessInfo.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-1.5 font-mono-editorial text-xs uppercase tracking-wider border border-[#333333] hover:border-[#888888] hover:bg-[#1a1a1a] text-[#F5F4EF] py-3 px-4 rounded-sm transition-all"
              >
                <span>TikTok</span>
                <ExternalLink className="w-3 h-3 text-[#888888]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
