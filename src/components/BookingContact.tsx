'use client';

import React, { useState } from 'react';
import { ArrowUpRight, MessageCircle, Phone } from 'lucide-react';
import { InfoIcon } from '@/components/brand/InfoIcons';
import { Reveal } from '@/components/motion/Reveal';
import { businessHours, businessInfo } from '@/data/janakaData';
import { SectionEdge } from '@/components/SectionEdge';

const symptomPresets = ['Blowing warm air', 'Gas recharge', 'Noise when A/C is on', 'Weak cooling in traffic', 'Bad smell from vents'];

type FormState = { name: string; phone: string; vehicle: string; date: string; message: string };
type Status = { kind: 'idle' } | { kind: 'error'; message: string } | { kind: 'sent'; url: string };

const emptyForm: FormState = { name: '', phone: '', vehicle: '', date: '', message: '' };

const todayIso = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const isMonday = (iso: string) => iso !== '' && new Date(`${iso}T00:00:00`).getDay() === 1;

const inputClass =
  'w-full rounded-[4px] border border-slate-200 bg-white px-4 py-3 text-[15px] text-navy-950 placeholder:text-slate-400 shadow-sm transition-all duration-200 focus:border-ice-deep focus:outline-none focus:ring-2 focus:ring-sky-500/20';
const labelClass = 'mb-2 block text-[13px] font-semibold text-navy-950';

export const BookingContact: React.FC = () => {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (status.kind === 'error') setStatus({ kind: 'idle' });
  };

  const addSymptom = (symptom: string) =>
    setForm((prev) => ({
      ...prev,
      message: prev.message.includes(symptom) ? prev.message : [prev.message.trim(), symptom].filter(Boolean).join(', '),
    }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const digits = form.phone.replace(/\D/g, '');
    if (!form.name.trim() || !form.vehicle.trim() || !form.message.trim()) {
      setStatus({ kind: 'error', message: 'Please fill in your name, vehicle and what the problem is.' });
      return;
    }
    if (digits.length < 9 || digits.length > 12) {
      setStatus({ kind: 'error', message: 'Please enter a valid phone number, e.g. 071 234 5678.' });
      return;
    }

    const text = [
      `Hello ${businessInfo.name}, I'd like to book a service.`,
      '',
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      `Vehicle: ${form.vehicle.trim()}`,
      `Preferred date: ${form.date || 'Earliest available'}`,
      `Issue: ${form.message.trim()}`,
    ].join('\n');
    const url = `https://wa.me/${businessInfo.whatsappNumber}?text=${encodeURIComponent(text)}`;

    const win = window.open(url, '_blank');
    if (win) win.opener = null;
    else window.location.href = url; // Pop-up blocked: continue in this tab
    setStatus({ kind: 'sent', url });
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate bg-slate-50/50 text-slate-900">
      <SectionEdge from="var(--color-navy-950)" edge="top" />
      <SectionEdge from="var(--color-navy-950)" edge="bottom" />
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Direct contact */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-blue-600 font-semibold">
                <span>06</span>
                <span aria-hidden="true" className="h-px w-8 bg-blue-600" />
                <span>Book & contact</span>
              </p>
              <h2 id="contact-title" className="mt-5 font-wide text-[2.2rem] font-bold leading-[1.04] tracking-[-0.02em] text-slate-950 sm:text-5xl">
                Book a service.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-slate-600">
                Call or WhatsApp the workshop to arrange a time, or send your details with the form and we&apos;ll get
                back to you on WhatsApp.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-9 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <a
                href={`tel:${businessInfo.phoneRaw}`}
                className="inline-flex flex-1 items-center justify-center gap-2.5 rounded-lg bg-blue-600 px-6 py-4 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-700 active:translate-y-px"
              >
                <Phone className="h-4 w-4 text-white" aria-hidden="true" />
                Call {businessInfo.phone}
              </a>
              <a
                href={businessInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2.5 rounded-lg border border-slate-300 bg-white px-6 py-4 text-sm font-semibold text-slate-800 shadow-xs transition-all hover:border-blue-600 hover:text-blue-600 active:translate-y-px"
              >
                <MessageCircle className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                WhatsApp us
              </a>
            </Reveal>

            <Reveal delay={0.15}>
              <dl className="mt-10 divide-y divide-slate-200 border-y border-slate-200 text-[15px]">
                <div className="group flex gap-4 py-5">
                  <InfoIcon name="pin" tone="light" />
                  <div>
                    <dt className="eyebrow text-[10px] text-slate-500 font-semibold">Address</dt>
                    <dd className="mt-1.5 font-medium text-slate-900">{businessInfo.address}</dd>
                    <dd className="mt-1.5">
                      <a
                        href={businessInfo.googleMapsDirectionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:underline"
                      >
                        Get directions <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="group flex gap-4 py-5">
                  <InfoIcon name="clock" tone="light" />
                  <div>
                    <dt className="eyebrow text-[10px] text-slate-500 font-semibold">Opening hours</dt>
                    <dd className="mt-1.5 font-medium text-slate-900">
                      {businessHours.openDays}: {businessHours.hours}
                    </dd>
                    <dd className="text-sm text-slate-500">{businessHours.closed}</dd>
                  </div>
                </div>
                <div className="group flex gap-4 py-5">
                  <InfoIcon name="mail" tone="light" />
                  <div>
                    <dt className="eyebrow text-[10px] text-slate-500 font-semibold">Email</dt>
                    <dd className="mt-1.5 font-medium">
                      <a href={`mailto:${businessInfo.email}`} className="break-all text-slate-900 hover:text-blue-600">
                        {businessInfo.email}
                      </a>
                    </dd>
                  </div>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={0.2} className="mt-8">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-slate-200 shadow-md">
                <iframe
                  title="Map showing the Janaka Auto AC workshop in Gampaha"
                  src={businessInfo.googleMapsEmbedUrl}
                  className="absolute inset-0 h-full w-full border-0 grayscale-[0.35]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>

          {/* Enquiry form */}
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="rounded-xl border border-slate-200/90 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-10">
              <h3 className="font-wide text-2xl font-semibold text-slate-950">Send a service enquiry</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Your details open in WhatsApp, ready to send to the workshop. Nothing is stored on this website.
              </p>

              <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="f-name" className={labelClass}>
                      Your name <span className="text-ice-deep">*</span>
                    </label>
                    <input id="f-name" name="name" autoComplete="name" required value={form.name} onChange={update} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="f-phone" className={labelClass}>
                      Phone number <span className="text-ice-deep">*</span>
                    </label>
                    <input
                      id="f-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      required
                      placeholder="071 234 5678"
                      value={form.phone}
                      onChange={update}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="f-vehicle" className={labelClass}>
                      Vehicle make & model <span className="text-ice-deep">*</span>
                    </label>
                    <input
                      id="f-vehicle"
                      name="vehicle"
                      required
                      placeholder="e.g. Toyota Axio"
                      value={form.vehicle}
                      onChange={update}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="f-date" className={labelClass}>
                      Preferred date
                    </label>
                    <input
                      id="f-date"
                      name="date"
                      type="date"
                      value={form.date}
                      onFocus={(e) => (e.currentTarget.min = todayIso())}
                      onChange={update}
                      aria-describedby={isMonday(form.date) ? 'f-date-note' : undefined}
                      className={inputClass}
                    />
                    {isMonday(form.date) && (
                      <p id="f-date-note" className="mt-2 text-xs font-medium text-[#9a5b00]">
                        We&apos;re closed on Mondays — please pick Tuesday to Sunday.
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="f-message" className={labelClass}>
                    What&apos;s the problem? <span className="text-ice-deep">*</span>
                  </label>
                  <div className="mb-3 flex flex-wrap gap-2" role="group" aria-label="Common symptoms">
                    {symptomPresets.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => addSymptom(s)}
                        className="min-h-9 rounded-[3px] border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-navy-800 transition-all hover:border-ice-deep hover:bg-sky-50 hover:text-ice-deep active:scale-95"
                      >
                        + {s}
                      </button>
                    ))}
                  </div>
                  <textarea
                    id="f-message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Describe what's happening with your A/C"
                    value={form.message}
                    onChange={update}
                    className={inputClass}
                  />
                </div>

                <div aria-live="polite">
                  {status.kind === 'error' && (
                    <p role="alert" className="border-l-2 border-[#c2410c] bg-[#fff4ed] px-4 py-3 text-sm font-medium text-[#9a3412]">
                      {status.message}
                    </p>
                  )}
                  {status.kind === 'sent' && (
                    <div className="border-l-2 border-ice-deep bg-mist/60 px-4 py-3 text-sm text-navy-950">
                      <p className="font-semibold">WhatsApp has opened with your enquiry.</p>
                      <p className="mt-1 text-steel">
                        Press send in WhatsApp to deliver it to the workshop.{' '}
                        <a href={status.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-ice-deep underline underline-offset-2">
                          Didn&apos;t open? Try again
                        </a>
                        .
                      </p>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 hover:shadow-xl active:translate-y-px sm:w-auto"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Send via WhatsApp
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
