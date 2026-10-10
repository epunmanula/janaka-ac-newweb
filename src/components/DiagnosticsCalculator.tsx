'use client';

import React, { useState } from 'react';
import { Stethoscope, MessageSquare, AlertCircle, Clock, Wrench } from 'lucide-react';
import { diagnosticVehicleCategories, diagnosticSymptoms, businessInfo } from '@/data/janakaData';

export const DiagnosticsCalculator: React.FC = () => {
  const [selectedVehicleId, setSelectedVehicleId] = useState(diagnosticVehicleCategories[0].id);
  const [selectedSymptomId, setSelectedSymptomId] = useState(diagnosticSymptoms[0].id);

  const currentVehicle =
    diagnosticVehicleCategories.find((v) => v.id === selectedVehicleId) || diagnosticVehicleCategories[0];
  const currentSymptom =
    diagnosticSymptoms.find((s) => s.id === selectedSymptomId) || diagnosticSymptoms[0];

  const isHybrid = currentVehicle.id === 'hybrid';

  const whatsappMessage = encodeURIComponent(
    `Hello Janaka Auto AC,\n\nI used your online Diagnostic Troubleshooter:\n- Vehicle Category: ${currentVehicle.name} (${currentVehicle.examples})\n- Observed Issue: ${currentSymptom.label}\n- Preliminary Finding: ${currentSymptom.cause}\n- Recommended Procedure: ${currentSymptom.remedy}\n\nCould you please let me know when I can bring my vehicle to 366 Miriswatta Road, Gampaha for an inspection?`
  );

  return (
    <section id="diagnostics" className="w-full py-20 md:py-28 border-b border-[#222222] bg-[#141414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#222222] pb-8 mb-12 gap-6">
          <div>
            <span className="font-mono-editorial text-xs uppercase tracking-[0.25em] text-[#888888] block mb-2">
              INTERACTIVE ADVISORY // DIAGNOSTIC MATRIX
            </span>
            <h2 className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl text-[#F5F4EF] leading-tight">
              Climate Troubleshooter
            </h2>
          </div>
          <p className="font-serif-editorial text-lg sm:text-xl text-[#888888] max-w-md">
            Select your vehicle classification and observed issue to receive an immediate technical analysis and workshop action plan.
          </p>
        </div>

        {/* Diagnostic Wizard Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Step 1 & Step 2 Selectors */}
          <div className="lg:col-span-7 space-y-8 bg-[#121212] border border-[#222222] p-6 sm:p-8 rounded-sm">
            {/* Step 1 */}
            <div>
              <label className="font-mono-editorial text-xs uppercase tracking-[0.2em] text-[#888888] block mb-3">
                STEP 01 // Select Vehicle Category
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {diagnosticVehicleCategories.map((v) => {
                  const isSelected = selectedVehicleId === v.id;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVehicleId(v.id)}
                      className={`text-left p-3.5 rounded-sm border transition-all text-xs font-mono-editorial ${
                        isSelected
                          ? 'border-[#F5F4EF] bg-[#222222] text-[#F5F4EF] font-medium shadow-sm'
                          : 'border-[#222222] bg-[#161616] text-[#888888] hover:border-[#383838]'
                      }`}
                    >
                      <span className="font-semibold block text-[#F5F4EF] mb-0.5">{v.name}</span>
                      <span className="text-[10px] text-[#777777] block line-clamp-1">{v.examples}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2 */}
            <div className="pt-6 border-t border-[#222222]">
              <label className="font-mono-editorial text-xs uppercase tracking-[0.2em] text-[#888888] block mb-3">
                STEP 02 // Select Observed Symptom
              </label>
              <div className="space-y-2.5">
                {diagnosticSymptoms.map((s) => {
                  const isSelected = selectedSymptomId === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSymptomId(s.id)}
                      className={`w-full text-left p-4 rounded-sm border transition-all flex items-start space-x-3.5 ${
                        isSelected
                          ? 'border-[#F5F4EF] bg-[#202020] text-[#F5F4EF]'
                          : 'border-[#222222] bg-[#161616] text-[#888888] hover:border-[#333333]'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                          isSelected ? 'bg-[#F5F4EF]' : 'bg-[#444444]'
                        }`}
                      />
                      <div>
                        <p
                          className={`font-serif-editorial text-base sm:text-lg leading-snug ${
                            isSelected ? 'text-[#F5F4EF]' : 'text-[#999999]'
                          }`}
                        >
                          {s.label}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Preliminary Assessment Dossier */}
          <div className="lg:col-span-5 bg-[#171717] border border-[#262626] p-6 sm:p-8 rounded-sm flex flex-col justify-between space-y-6 shadow-xl">
            <div>
              <div className="flex items-center justify-between border-b border-[#2a2a2a] pb-4 mb-6">
                <span className="font-mono-editorial text-xs text-[#888888] tracking-widest uppercase flex items-center space-x-2">
                  <Stethoscope className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Technical Findings</span>
                </span>
                <span className="text-[10px] font-mono-editorial px-2 py-0.5 rounded bg-[#222222] text-[#888888] uppercase">
                  Live Matrix
                </span>
              </div>

              <span className="text-[11px] font-mono-editorial text-[#c5a059] uppercase tracking-wider block mb-1">
                Vehicle: {currentVehicle.name} ({currentVehicle.examples})
              </span>

              <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[#F5F4EF] leading-snug mb-4">
                {currentSymptom.label.split('(')[0]}
              </h3>

              {/* Probable Cause Box */}
              <div className="p-4 bg-[#121212] border border-[#262626] rounded-sm mb-4 space-y-2">
                <span className="text-[10px] font-mono-editorial uppercase tracking-wider text-[#888888] block">
                  Probable Root Cause
                </span>
                <p className="font-serif-editorial text-base sm:text-lg text-[#DCD9D0] leading-relaxed">
                  {currentSymptom.cause}
                </p>
              </div>

              {/* Recommended Workshop Remedy */}
              <div className="p-4 bg-[#121212] border border-[#262626] rounded-sm mb-5 space-y-2">
                <span className="text-[10px] font-mono-editorial uppercase tracking-wider text-emerald-400 block flex items-center space-x-1">
                  <Wrench className="w-3 h-3" />
                  <span>Recommended Workshop Procedure</span>
                </span>
                <p className="font-mono-editorial text-xs text-[#bbbbbb] leading-relaxed">
                  {currentSymptom.remedy}
                </p>
              </div>

              {/* Hybrid High-Voltage Alert if applicable */}
              {isHybrid && (
                <div className="p-3 bg-[#241a12] border border-[#543b1e] rounded-sm mb-4 flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <p className="font-mono-editorial text-[11px] text-amber-300 leading-snug">
                    Hybrid Alert: High-voltage electric scroll compressor strictly requires dielectric POE synthetic oil to prevent insulation breakdown.
                  </p>
                </div>
              )}

              {/* Matrix Spec Breakdown */}
              <div className="space-y-2.5 text-xs font-mono-editorial text-[#888888]">
                <div className="flex items-center justify-between py-1.5 border-b border-[#252525]">
                  <span>Severity Rating:</span>
                  <span className="text-amber-400 font-semibold">{currentSymptom.severity}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-[#252525]">
                  <span>Estimated Time:</span>
                  <span className="text-[#F5F4EF] flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-[#c5a059]" />
                    <span>{currentSymptom.estTime}</span>
                  </span>
                </div>
                <div className="flex items-start justify-between py-1.5 border-b border-[#252525]">
                  <span className="w-1/3">Key Consideration:</span>
                  <span className="text-[#aaaaaa] text-right w-2/3">{currentVehicle.consideration}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#2a2a2a]">
              <a
                href={`https://wa.me/94714551409?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center space-x-2.5 font-mono-editorial text-xs uppercase tracking-[0.2em] bg-[#F5F4EF] text-[#121212] px-6 py-3.5 rounded-sm font-semibold hover:bg-white transition-all shadow-lg"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Send Assessment to WhatsApp</span>
              </a>
              <p className="text-[10px] font-mono-editorial text-[#666666] text-center mt-2.5 uppercase tracking-wider">
                Direct transmission to Master Technician Janaka (+94 71 455 1409)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
