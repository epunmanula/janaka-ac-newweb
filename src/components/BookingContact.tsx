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
  'w-full rounded-[3px] border border-navy-950/15 bg-white/70 px-4 py-3 text-[15px] text-navy-950 placeholder:text-steel/60 transition-colors focus:border-ice-deep focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-ice/30';
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
    <section id="contact" aria-labelledby="contact-title" className="relative isolate bg-frost text-navy-950">
      <SectionEdge from="var(--color-navy-950)" edge="top" />
      <SectionEdge from="var(--color-navy-950)" edge="bottom" />
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Direct contact */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-ice-deep">
                <span>06</span>
                <span aria-hidden="true" className="h-px w-8 bg-ice-deep" />
                <span>Book & contact</span>
              </p>
              <h2 id="contact-title" className="mt-5 font-wide text-[2.2rem] font-bold leading-[1.04] tracking-[-0.02em] sm:text-5xl">
                Book a service.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-steel">
                Call or WhatsApp the workshop to arrange a time, or send your details with the form and we&apos;ll get
                back to you on WhatsApp.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-9 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <a
                href={`tel:${businessInfo.phoneRaw}`}
                className="inline-flex flex-1 items-center justify-center gap-2.5 rounded-[3px] bg-navy-950 px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-navy-800 active:translate-y-px"
              >
                <Phone className="h-4 w-4 text-ice" aria-hidden="true" />
                Call {businessInfo.phone}
              </a>
              <a
                href={businessInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2.5 rounded-[3px] border border-navy-950/20 px-6 py-4 text-sm font-semibold transition-colors hover:border-navy-950 active:translate-y-px"
              >
                <MessageCircle className="h-4 w-4 text-ice-deep" aria-hidden="true" />
                WhatsApp us
              </a>
            </Reveal>

            <Reveal delay={0.15}>
              <dl className="mt-10 divide-y divide-navy-950/10 border-y border-navy-950/10 text-[15px]">
                <div className="group flex gap-4 py-5">
                  <InfoIcon name="pin" tone="light" />
                  <div>
                    <dt className="eyebrow text-[10px] text-steel">Address</dt>
                    <dd className="mt-1.5 font-medium">{businessInfo.address}</dd>
                    <dd className="mt-1.5">
                      <a
                        href={businessInfo.googleMapsDirectionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-ice-deep hover:underline"
                      >
                        Get directions <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="group flex gap-4 py-5">
                  <InfoIcon name="clock" tone="light" />
                  <div>
                    <dt className="eyebrow text-[10px] text-steel">Opening hours</dt>
                    <dd className="mt-1.5 font-medium">
                      {businessHours.openDays}: {businessHours.hours}
                    </dd>
                    <dd className="text-sm text-steel">{businessHours.closed}</dd>
                  </div>
                </div>
                <div className="group flex gap-4 py-5">
                  <InfoIcon name="mail" tone="light" />
                  <div>
                    <dt className="eyebrow text-[10px] text-steel">Email</dt>
                    <dd className="mt-1.5 font-medium">
                      <a href={`mailto:${businessInfo.email}`} className="break-all hover:text-ice-deep">
                        {businessInfo.email}
                      </a>
                    </dd>
                  </div>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={0.2} className="mt-8">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-mist">
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
            <div className="border border-white/70 bg-paper/85 p-6 shadow-[0_40px_80px_-50px_rgb(7_21_34/0.35)] sm:p-10">
              <h3 className="font-wide text-2xl font-semibold">Send a service enquiry</h3>
              <p className="mt-2 text-sm leading-relaxed text-steel">
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
                        className="min-h-9 rounded-[3px] border border-navy-950/15 px-3 py-1.5 text-xs font-medium text-navy-800 transition-colors hover:border-ice-deep hover:text-ice-deep"
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
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-[3px] bg-ice px-8 py-4 text-sm font-semibold text-navy-950 transition-colors hover:bg-navy-950 hover:text-white active:translate-y-px sm:w-auto"
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
