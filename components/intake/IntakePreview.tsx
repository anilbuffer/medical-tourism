"use client";

import React, { useState } from "react";
import { useCare } from "@/context/CareContext";
import { SPECIALTIES } from "@/data/mockData";
import {
  Upload,
  Lock,
  ArrowRight,
  CheckCircle2,
  FileCheck,
  Stethoscope,
  Phone,
  Sparkles,
} from "lucide-react";

export const IntakePreview = () => {
  const { t, language, openIntake } = useCare();
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [hasUploadedFile, setHasUploadedFile] = useState(false);
  const [fileName, setFileName] = useState("");
  const [countryCode, setCountryCode] = useState("+971");
  const [phone, setPhone] = useState("");

  const handleFileSimulate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
      setHasUploadedFile(true);
    }
  };

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    openIntake(selectedSpecialty);
  };

  return (
    <section id="intake-preview" className="py-20 bg-white relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-[#0A1A2E] rounded-3xl p-8 sm:p-12 lg:p-14 text-white shadow-2xl border border-slate-800 relative overflow-hidden">
          {/* Top subtle line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-amber-400 to-emerald-500"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Header info */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Confidential Medical Assessment</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {t.intakePreview.heading}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {t.intakePreview.subheading}
              </p>

              <div className="pt-4 space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Clinical review by Board-Certified Indian Specialists</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Turnaround under 24 hours with transparent cost packages</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>No obligation & complete medical privacy</span>
                </div>
              </div>
            </div>

            {/* Right 3-Step Interactive Form */}
            <div className="lg:col-span-7">
              <form
                onSubmit={handleStart}
                className="bg-white/5 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6"
              >
                {/* Step 01: Specialty Selector */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-teal-300">
                    {t.intakePreview.step1Title}
                  </label>
                  <p className="text-xs text-slate-300">{t.intakePreview.step1Desc}</p>
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                  >
                    <option value="">{t.intakePreview.step1Placeholder}</option>
                    {SPECIALTIES.map((spec) => (
                      <option key={spec.id} value={spec.name}>
                        {language === "ar" ? spec.nameAr : spec.name}
                      </option>
                    ))}
                    <option value="other">Other Medical Specialization</option>
                  </select>
                </div>

                {/* Step 02: Upload Simulation */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-teal-300">
                    {t.intakePreview.step2Title}
                  </label>
                  <p className="text-xs text-slate-300">{t.intakePreview.step2Desc}</p>

                  <div className="relative border-2 border-dashed border-slate-700 hover:border-teal-500/50 rounded-xl p-4 text-center transition-colors bg-slate-900/40">
                    <input
                      type="file"
                      id="mini-intake-file"
                      onChange={handleFileSimulate}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept=".pdf,.jpg,.jpeg,.png,.dicom"
                    />
                    {hasUploadedFile ? (
                      <div className="flex items-center justify-center gap-2 text-teal-400 text-xs font-semibold">
                        <FileCheck className="w-5 h-5 text-emerald-400" />
                        <span>Attached: {fileName}</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2 text-slate-300 text-xs font-semibold">
                        <Upload className="w-4 h-4 text-teal-400" />
                        <span>{t.intakePreview.step2UploadBtn} (PDF, Scans, JPG)</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Step 03: Contact Reach */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-teal-300">
                    {t.intakePreview.step3Title}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="col-span-1 px-3 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="+971">🇦🇪 UAE (+971)</option>
                      <option value="+966">🇸🇦 KSA (+966)</option>
                      <option value="+968">🇴🇲 Oman (+968)</option>
                      <option value="+254">🇰🇪 Kenya (+254)</option>
                      <option value="+234">🇳🇬 Nigeria (+234)</option>
                      <option value="+880">🇧🇩 BD (+880)</option>
                      <option value="+998">🇺🇿 UZB (+998)</option>
                      <option value="+44">🇬🇧 UK (+44)</option>
                      <option value="+1">🇺🇸 USA (+1)</option>
                    </select>
                    <input
                      type="tel"
                      placeholder="50 123 4567 (WhatsApp)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="col-span-2 px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                {/* CTA & Trust note */}
                <div className="pt-2 space-y-3">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl text-sm sm:text-base font-bold text-slate-950 bg-gradient-to-r from-teal-300 via-teal-200 to-emerald-300 hover:from-teal-200 hover:to-emerald-200 shadow-xl shadow-teal-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 group"
                  >
                    <span>{t.intakePreview.submitBtn}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                    <Lock className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>{t.intakePreview.trustNote}</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
