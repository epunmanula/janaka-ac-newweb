'use client';

import React, { useState, useEffect } from 'react';
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Mail,
  ArrowUpRight,
  Send,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { businessHours, businessInfo } from '@/data/janakaData';

const servicesOptions = [
  'General A/C Diagnosis',
  'A/C Gas Recharge (R134a / R1234yf)',
  'Compressor Repair or Overhaul',
  'Nitrogen Leak Detection',
  'Condenser & Evaporator Service',
  'Airflow, Cabin Filter & Blower',
  'Other / Unsure',
];

const symptomPresets = [
  'Blowing warm air',
  'Gas leaks out repeatedly',
  'Noise when A/C is turned on',
  'Weak cooling in traffic',
  'Unpleasant smell from vents',
  'Weak cabin airflow',
];

type FormState = {
  name: string;
  phone: string;
  vehicle: string;
  service: string;
  date: string;
  message: string;
};

type Status = { kind: 'idle' } | { kind: 'error'; message: string } | { kind: 'sent'; url: string };

const emptyForm: FormState = {
  name: '',
  phone: '',
  vehicle: '',
  service: servicesOptions[0],
  date: '',
  message: '',
};

const isMonday = (iso: string) => iso !== '' && new Date(`${iso}T00:00:00`).getDay() === 1;

export const BookingContact: React.FC = () => {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [minDate, setMinDate] = useState<string>('');

  useEffect(() => {
    const d = new Date();
    setMinDate(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
        d.getDate()
      ).padStart(2, '0')}`
    );
  }, []);

  const update = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (status.kind === 'error') setStatus({ kind: 'idle' });
  };

  const toggleSymptom = (symptom: string) => {
    setForm((prev) => {
      const parts = prev.message
        ? prev.message.split(', ').filter((s) => s.trim().length > 0)
        : [];
      const exists = parts.includes(symptom);
      const nextParts = exists ? parts.filter((s) => s !== symptom) : [...parts, symptom];
      return { ...prev, message: nextParts.join(', ') };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const digits = form.phone.replace(/\D/g, '');

    if (!form.name.trim() || !form.vehicle.trim()) {
      setStatus({
        kind: 'error',
        message: 'Please provide your name and vehicle make/model.',
      });
      return;
    }
    if (digits.length < 9 || digits.length > 12) {
      setStatus({
        kind: 'error',
        message: 'Please enter a valid phone number (e.g. 071 455 1409).',
      });
      return;
    }

    const text = [
      `*New Service Enquiry — Janaka Auto AC*`,
      `---------------------------------`,
      `*Name:* ${form.name.trim()}`,
      `*Phone:* ${form.phone.trim()}`,
      `*Vehicle:* ${form.vehicle.trim()}`,
      `*Service:* ${form.service}`,
      `*Preferred Date:* ${form.date || 'Earliest available'}`,
      `*Issue / Symptoms:* ${form.message.trim() || 'General inspection required'}`,
      `---------------------------------`,
      `Sent via janakaac.vercel.app`,
    ].join('\n');

    const url = `https://wa.me/${businessInfo.whatsappNumber}?text=${encodeURIComponent(text)}`;

    const win = window.open(url, '_blank');
    if (win) {
      win.opener = null;
    } else {
      window.location.href = url;
    }
    setStatus({ kind: 'sent', url });
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative overflow-hidden bg-[#FFFFFF] py-24 sm:py-28 md:py-32 border-b border-[#E5E3DE]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="contact-title"
          index="06"
          eyebrow="Workshop Direct Booking"
          title="Schedule an Inspection or Speak to Us"
          intro="Have your car A/C checked by specialists. Call or WhatsApp directly, or fill in your vehicle details to send an instant pre-filled WhatsApp booking to the workshop."
          tone="light"
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Workshop Contact & Location */}
          <div className="space-y-8 lg:col-span-5">
            {/* Quick action buttons */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="tel:+94714551409"
                className="inline-flex flex-1 items-center justify-center gap-2.5 rounded-xl bg-[#123D4A] px-6 py-4 text-sm font-semibold text-white shadow-xs transition hover:bg-[#2586A3]"
              >
                <Phone className="h-4 w-4" />
                <span>Call {businessInfo.phone}</span>
              </a>

              <a
                href={businessInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2.5 rounded-xl bg-[#25D366] px-6 py-4 text-sm font-semibold text-white shadow-xs transition hover:bg-[#1EBE5D]"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Direct WhatsApp</span>
              </a>
            </div>

            {/* Business Details List */}
            <div className="rounded-2xl border border-[#E5E3DE] bg-[#F6F4EF] p-6 space-y-5">
              <div className="flex items-start gap-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FFFFFF] text-[#2586A3] border border-[#E5E3DE]">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#71818A]">
                    Workshop Address
                  </h4>
                  <p className="mt-1 text-sm font-semibold text-[#24282B]">{businessInfo.address}</p>
                  <a
                    href={businessInfo.googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-flex items-center gap-1 text-xs font-bold text-[#2586A3] hover:underline"
                  >
                    <span>Get Directions via Google Maps</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
              </div>

              <div className="border-t border-[#E5E3DE] pt-4 flex items-start gap-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FFFFFF] text-[#2586A3] border border-[#E5E3DE]">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#71818A]">
                    Operating Hours
                  </h4>
                  <p className="mt-1 text-sm font-semibold text-[#24282B]">
                    {businessHours.openDays}: {businessHours.hours}
                  </p>
                  <p className="text-xs font-semibold text-[#EA580C] mt-0.5">
                    {businessHours.closed}
                  </p>
                </div>
              </div>

              <div className="border-t border-[#E5E3DE] pt-4 flex items-start gap-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FFFFFF] text-[#2586A3] border border-[#E5E3DE]">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#71818A]">
                    Email Inquiries
                  </h4>
                  <a
                    href={`mailto:${businessInfo.email}`}
                    className="mt-1 block text-sm font-semibold text-[#24282B] hover:text-[#2586A3]"
                  >
                    {businessInfo.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="overflow-hidden rounded-2xl border border-[#E5E3DE] bg-[#FFFFFF] shadow-xs">
              <div className="relative aspect-[16/10] w-full">
                <iframe
                  title="Janaka Auto AC Workshop Location Map"
                  src={businessInfo.googleMapsEmbedUrl}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="p-3 bg-[#FFFFFF] flex items-center justify-between">
                <span className="font-mono text-[11px] text-[#71818A]">
                  Miriswatta, Gampaha · Western Province
                </span>
                <a
                  href={businessInfo.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#2586A3] hover:underline"
                >
                  Open Full Map
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive WhatsApp Booking Form */}
          <div className="rounded-2xl border border-[#E5E3DE] bg-[#FFFFFF] p-6 sm:p-8 lg:col-span-7 shadow-xs">
            <div className="border-b border-[#E5E3DE] pb-5">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#2586A3]">
                Direct Workshop Channel
              </span>
              <h3 className="mt-1 font-serif text-2xl font-bold text-[#24282B]">
                Send a Service Enquiry
              </h3>
              <p className="mt-1.5 text-xs text-[#71818A] leading-relaxed">
                Fill in your car details below. Submitting will format and launch a ready-to-send WhatsApp message directly to our workshop manager.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
              {/* Name & Phone */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="f-name" className="block text-xs font-semibold text-[#24282B] mb-1.5">
                    Your Name <span className="text-[#EA580C]">*</span>
                  </label>
                  <input
                    id="f-name"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Kasun Perera"
                    value={form.name}
                    onChange={update}
                    className="w-full rounded-xl border border-[#E5E3DE] bg-[#F6F4EF] px-4 py-2.5 text-sm text-[#24282B] placeholder:text-[#94A3B8] focus:border-[#2586A3] focus:bg-[#FFFFFF] focus:outline-none transition"
                  />
                </div>

                <div>
                  <label htmlFor="f-phone" className="block text-xs font-semibold text-[#24282B] mb-1.5">
                    Phone / WhatsApp Number <span className="text-[#EA580C]">*</span>
                  </label>
                  <input
                    id="f-phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="e.g. 071 455 1409"
                    value={form.phone}
                    onChange={update}
                    className="w-full rounded-xl border border-[#E5E3DE] bg-[#F6F4EF] px-4 py-2.5 text-sm text-[#24282B] placeholder:text-[#94A3B8] focus:border-[#2586A3] focus:bg-[#FFFFFF] focus:outline-none transition"
                  />
                </div>
              </div>

              {/* Vehicle & Service Type */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="f-vehicle" className="block text-xs font-semibold text-[#24282B] mb-1.5">
                    Vehicle Make & Model <span className="text-[#EA580C]">*</span>
                  </label>
                  <input
                    id="f-vehicle"
                    name="vehicle"
                    type="text"
                    required
                    placeholder="e.g. Toyota Premio / Vezel"
                    value={form.vehicle}
                    onChange={update}
                    className="w-full rounded-xl border border-[#E5E3DE] bg-[#F6F4EF] px-4 py-2.5 text-sm text-[#24282B] placeholder:text-[#94A3B8] focus:border-[#2586A3] focus:bg-[#FFFFFF] focus:outline-none transition"
                  />
                </div>

                <div>
                  <label htmlFor="f-service" className="block text-xs font-semibold text-[#24282B] mb-1.5">
                    Required Service
                  </label>
                  <select
                    id="f-service"
                    name="service"
                    value={form.service}
                    onChange={update}
                    className="w-full rounded-xl border border-[#E5E3DE] bg-[#F6F4EF] px-4 py-2.5 text-sm text-[#24282B] focus:border-[#2586A3] focus:bg-[#FFFFFF] focus:outline-none transition"
                  >
                    {servicesOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Preferred Date */}
              <div>
                <label htmlFor="f-date" className="block text-xs font-semibold text-[#24282B] mb-1.5">
                  Preferred Appointment Date
                </label>
                <input
                  id="f-date"
                  name="date"
                  type="date"
                  value={form.date}
                  min={minDate}
                  onChange={update}
                  className="w-full rounded-xl border border-[#E5E3DE] bg-[#F6F4EF] px-4 py-2.5 text-sm text-[#24282B] focus:border-[#2586A3] focus:bg-[#FFFFFF] focus:outline-none transition"
                />
                {isMonday(form.date) && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#EA580C]">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    We are closed on Mondays. Please choose Tuesday through Sunday.
                  </p>
                )}
              </div>

              {/* Quick Symptom Tags */}
              <div>
                <label className="block text-xs font-semibold text-[#24282B] mb-1.5">
                  Select Symptoms (Optional)
                </label>
                <div className="flex flex-wrap gap-2">
                  {symptomPresets.map((sym) => {
                    const active = form.message.includes(sym);
                    return (
                      <button
                        key={sym}
                        type="button"
                        onClick={() => toggleSymptom(sym)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                          active
                            ? 'bg-[#123D4A] text-white'
                            : 'bg-[#F6F4EF] text-[#71818A] hover:bg-[#E5E3DE] hover:text-[#24282B] border border-[#E5E3DE]'
                        }`}
                      >
                        {sym}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message / Problem Description */}
              <div>
                <label htmlFor="f-message" className="block text-xs font-semibold text-[#24282B] mb-1.5">
                  Additional Notes / Describe The Issue
                </label>
                <textarea
                  id="f-message"
                  name="message"
                  rows={3}
                  placeholder="Tell us what you notice: e.g. cooling drops when idling at traffic lights, fan sounds loud, etc."
                  value={form.message}
                  onChange={update}
                  className="w-full rounded-xl border border-[#E5E3DE] bg-[#F6F4EF] p-4 text-sm text-[#24282B] placeholder:text-[#94A3B8] focus:border-[#2586A3] focus:bg-[#FFFFFF] focus:outline-none transition"
                />
              </div>

              {/* Status alerts */}
              {status.kind === 'error' && (
                <div className="flex items-center gap-2 rounded-xl bg-[#FEF2F2] p-3 text-xs text-[#991B1B] border border-[#FEE2E2]">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{status.message}</span>
                </div>
              )}

              {status.kind === 'sent' && (
                <div className="flex items-center gap-2 rounded-xl bg-[#F0FDF4] p-3 text-xs text-[#166534] border border-[#DCFCE7]">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>
                    WhatsApp opened! If the chat did not launch automatically,{' '}
                    <a href={status.url} target="_blank" rel="noopener noreferrer" className="underline font-bold">
                      click here to send
                    </a>
                    .
                  </span>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#123D4A] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#2586A3] shadow-xs active:translate-y-px"
              >
                <Send className="h-4 w-4" />
                <span>Send Enquiry via WhatsApp</span>
              </button>

              <p className="text-center text-[11px] text-[#71818A]">
                No hidden data storage. Launches WhatsApp directly to message the workshop manager.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
