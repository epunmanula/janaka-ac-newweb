'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUpRight, MessageCircle, Phone, Clock, MapPin, Mail, AlertCircle, CheckCircle2, Send } from 'lucide-react';
import { InfoIcon } from '@/components/brand/InfoIcons';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { businessHours, businessInfo } from '@/data/janakaData';

const symptomPresets = [
  'Blowing warm air',
  'Gas recharge required',
  'Noise when A/C is turned on',
  'Weak cooling in traffic',
  'Unpleasant odour from vents',
  'Weak cabin airflow',
];

type FormState = { name: string; phone: string; vehicle: string; date: string; message: string };
type Status = { kind: 'idle' } | { kind: 'error'; message: string } | { kind: 'sent'; url: string };

const emptyForm: FormState = { name: '', phone: '', vehicle: '', date: '', message: '' };

const isMonday = (iso: string) => iso !== '' && new Date(`${iso}T00:00:00`).getDay() === 1;

const inputClass =
  'w-full rounded-xl border border-[#144B66] bg-[#021824]/90 px-4 py-3 text-sm text-white placeholder:text-[#64748B] shadow-inner transition-all duration-200 focus:border-[#38BDF8] focus:outline-none focus:ring-1 focus:ring-[#38BDF8]/40';
const labelClass = 'mb-2 block text-xs font-semibold uppercase tracking-wider text-[#CDE6F5]';

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

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (status.kind === 'error') setStatus({ kind: 'idle' });
  };

  const addSymptom = (symptom: string) =>
    setForm((prev) => ({
      ...prev,
      message: prev.message.includes(symptom)
        ? prev.message
        : [prev.message.trim(), symptom].filter(Boolean).join(', '),
    }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const digits = form.phone.replace(/\D/g, '');
    if (!form.name.trim() || !form.vehicle.trim() || !form.message.trim()) {
      setStatus({ kind: 'error', message: 'Please provide your name, vehicle and what the problem is.' });
      return;
    }
    if (digits.length < 9 || digits.length > 12) {
      setStatus({ kind: 'error', message: 'Please enter a valid phone number, e.g. 071 455 1409.' });
      return;
    }

    const text = [
      `*Service Booking Enquiry — Janaka Auto AC*`,
      `---------------------------------`,
      `*Name:* ${form.name.trim()}`,
      `*Phone:* ${form.phone.trim()}`,
      `*Vehicle:* ${form.vehicle.trim()}`,
      `*Preferred Date:* ${form.date || 'Earliest available'}`,
      `*Reported Issue:* ${form.message.trim()}`,
      `---------------------------------`,
      `Sent via www.janakaac.lk`,
    ].join('\n');
    const url = `https://wa.me/${businessInfo.whatsappNumber}?text=${encodeURIComponent(text)}`;

    const win = window.open(url, '_blank');
    if (win) win.opener = null;
    else window.location.href = url;
    setStatus({ kind: 'sent', url });
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative isolate overflow-hidden bg-gradient-to-b from-[#021824] via-[#032332] to-[#021824] text-white py-24 md:py-32 border-b border-[#144B66]/40"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="contact-title"
          index="06"
          eyebrow="Direct Workshop Concierge"
          title="Schedule an Inspection or Consult on WhatsApp"
          intro="Have your car A/C checked by dedicated specialists. Call directly, chat on WhatsApp, or send your vehicle details below for an immediate response."
          tone="dark"
        />

        <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Direct contact column */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal className="flex flex-col gap-3 sm:flex-row">
              <a
                href={`tel:${businessInfo.phoneRaw}`}
                className="inline-flex flex-1 items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#126782] via-[#1B7796] to-[#126782] px-6 py-4 text-sm font-semibold text-white shadow-xl border border-[#2586A3]/40 transition-all hover:brightness-110 active:translate-y-px"
              >
                <Phone className="h-4 w-4" />
                <span>Call {businessInfo.phone}</span>
              </a>

              <a
                href={businessInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2.5 rounded-xl border border-[#10B981]/50 bg-[#063327]/80 px-6 py-4 text-sm font-semibold text-[#6EE7B7] shadow-md transition-all hover:border-[#10B981] hover:text-white active:translate-y-px"
              >
                <MessageCircle className="h-4 w-4 text-[#10B981]" />
                <span>Direct WhatsApp</span>
              </a>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="rounded-2xl border border-[#144B66] bg-[#031B29]/90 p-6 space-y-5 backdrop-blur-md">
                <div className="flex gap-4 items-start">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#052436] border border-[#144B66] text-[#38BDF8]">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#8FAEC0]">Workshop Location</span>
                    <p className="mt-1 text-sm font-semibold text-white">{businessInfo.address}</p>
                    <a
                      href={businessInfo.googleMapsDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-[#38BDF8] hover:text-[#CDE6F5] hover:underline"
                    >
                      <span>Get directions via Google Maps</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>

                <div className="border-t border-[#144B66]/30 pt-4 flex gap-4 items-start">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#052436] border border-[#144B66] text-[#38BDF8]">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#8FAEC0]">Service Schedule</span>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {businessHours.openDays}: {businessHours.hours}
                    </p>
                    <p className="text-xs font-semibold text-[#F59E0B] mt-0.5">{businessHours.closed}</p>
                  </div>
                </div>

                <div className="border-t border-[#144B66]/30 pt-4 flex gap-4 items-start">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#052436] border border-[#144B66] text-[#38BDF8]">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#8FAEC0]">Direct Email</span>
                    <a href={`mailto:${businessInfo.email}`} className="mt-1 block text-sm font-medium text-white hover:text-[#38BDF8]">
                      {businessInfo.email}
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Embedded Google Map */}
            <Reveal delay={0.2}>
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[#144B66] shadow-xl">
                <iframe
                  title="Map showing the Janaka Auto AC workshop in Gampaha"
                  src={businessInfo.googleMapsEmbedUrl}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>

          {/* Service Booking Enquiry Form */}
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="rounded-2xl border border-[#144B66] bg-[#032332]/95 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
              <div className="border-b border-[#144B66]/40 pb-4">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#38BDF8]">
                  Instant WhatsApp Booking
                </span>
                <h3 className="mt-1 font-wide text-2xl font-bold text-white">Send a Service Enquiry</h3>
                <p className="mt-1.5 text-xs text-[#A2B8C2] leading-relaxed">
                  Your vehicle details will open in WhatsApp, pre-formatted and ready to send directly to our workshop manager.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="f-name" className={labelClass}>
                      Your Name <span className="text-[#F59E0B]">*</span>
                    </label>
                    <input
                      id="f-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      placeholder="e.g. Kasun Perera"
                      value={form.name}
                      onChange={update}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="f-phone" className={labelClass}>
                      Phone Number <span className="text-[#F59E0B]">*</span>
                    </label>
                    <input
                      id="f-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      required
                      placeholder="071 455 1409"
                      value={form.phone}
                      onChange={update}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="f-vehicle" className={labelClass}>
                      Vehicle Make & Model <span className="text-[#F59E0B]">*</span>
                    </label>
                    <input
                      id="f-vehicle"
                      name="vehicle"
                      required
                      placeholder="e.g. Toyota Premio / Vezel"
                      value={form.vehicle}
                      onChange={update}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="f-date" className={labelClass}>
                      Preferred Appointment Date
                    </label>
                    <input
                      id="f-date"
                      name="date"
                      type="date"
                      min={minDate}
                      value={form.date}
                      onChange={update}
                      className={inputClass}
                    />
                    {isMonday(form.date) && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#F59E0B]">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        We are closed on Mondays — please pick Tuesday to Sunday.
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="f-message" className={labelClass}>
                    Reported Issue / Symptoms <span className="text-[#F59E0B]">*</span>
                  </label>
                  <div className="mb-3 flex flex-wrap gap-2" role="group" aria-label="Common symptoms">
                    {symptomPresets.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => addSymptom(s)}
                        className="rounded-lg border border-[#144B66] bg-[#052436] px-3 py-1.5 text-xs font-medium text-[#CDE6F5] transition-all hover:border-[#38BDF8] hover:text-white active:scale-95"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <textarea
                    id="f-message"
                    name="message"
                    rows={3}
                    required
                    placeholder="Describe what you notice: e.g. cooling drops when idling, unusual blower noise, etc."
                    value={form.message}
                    onChange={update}
                    className={inputClass}
                  />
                </div>

                {status.kind === 'error' && (
                  <div className="flex items-center gap-2 rounded-xl bg-red-950/60 p-3 text-xs text-red-200 border border-red-800">
                    <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                    <span>{status.message}</span>
                  </div>
                )}

                {status.kind === 'sent' && (
                  <div className="flex items-center gap-2 rounded-xl bg-emerald-950/60 p-3 text-xs text-emerald-200 border border-emerald-800">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                    <span>
                      WhatsApp opened! If the chat did not launch automatically,{' '}
                      <a href={status.url} target="_blank" rel="noopener noreferrer" className="underline font-bold">
                        click here to send
                      </a>
                      .
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#126782] via-[#1B7796] to-[#126782] px-6 py-4 text-sm font-semibold text-white shadow-xl border border-[#2586A3]/40 transition-all hover:brightness-110 active:translate-y-px"
                >
                  <Send className="h-4 w-4" />
                  <span>Send Enquiry via WhatsApp</span>
                </button>

                <p className="text-center text-[11px] text-[#8FAEC0]">
                  Direct WhatsApp dispatch to the Janaka workshop manager. Zero third-party data tracking.
                </p>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
