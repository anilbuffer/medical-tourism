"use client";

import React, { useState } from "react";
import { UploadCloud, ArrowRight, Lock, CheckCircle2, ShieldCheck, FileText, PhoneCall, Sparkles, ShieldAlert, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCare } from "@/context/CareContext";

export const AltConnectSection = () => {
  const { openChat } = useCare();
  const [submitted, setSubmitted] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    userType: "The patient",
    email: "",
    phone: "",
    location: "",
    language: "English",
    message: "",
    consent: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <section id="connect" className="py-24 sm:py-32 bg-gradient-to-b from-[#03081E] via-[#07173D] to-[#020512] text-white relative overflow-hidden">
      {/* Dynamic Ambient Gradient Lights */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-vedara-cyan/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[600px] h-[600px] bg-vedara-blue/25 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(46,205,197,0.15),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-[2px] w-10 bg-vedara-gold-muted" />
            <p className="text-vedara-gold-muted font-bold text-xs uppercase tracking-[0.25em]">
              LET&apos;S CONNECT
            </p>
            <div className="h-[2px] w-10 bg-vedara-gold-muted" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white mb-6 leading-tight">
            Send us the reports. We&apos;ll tell you honestly whether to come.
          </h2>
          <p className="text-slate-300 max-w-3xl mx-auto text-base sm:text-lg font-light leading-relaxed">
            It costs nothing and commits you to nothing. If travelling isn&apos;t the right answer we&apos;ll say so, and tell you what to ask your own doctor instead.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* Left Column: What happens next */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-8 pb-3 border-b border-white/10">
                <h3 className="text-2xl font-serif font-bold text-white">
                  What happens next
                </h3>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-vedara-cyan/15 text-vedara-cyan text-[11px] font-bold border border-vedara-cyan/30">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Encrypted Channel</span>
                </span>
              </div>
              
              <div className="space-y-8">
                {/* Step 1 */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-vedara-cyan/30 to-vedara-blue/50 border border-vedara-cyan/40 flex items-center justify-center font-bold text-white shrink-0 shadow-md">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-white mb-1">Today.</h4>
                    <p className="text-slate-300 text-sm leading-relaxed font-light">
                      We reply and tell you which records are still missing.
                    </p>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-vedara-cyan/30 to-vedara-blue/50 border border-vedara-cyan/40 flex items-center justify-center font-bold text-white shrink-0 shadow-md">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-white mb-1">Within 24 hours for urgent cases.</h4>
                    <p className="text-slate-300 text-sm leading-relaxed font-light">
                      A specialist in the relevant field reads the file and gives a written opinion.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-vedara-cyan/30 to-vedara-blue/50 border border-vedara-cyan/40 flex items-center justify-center font-bold text-white shrink-0 shadow-md">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-white mb-1">By day three.</h4>
                    <p className="text-slate-300 text-sm leading-relaxed font-light">
                      An itemised quote and a visa invitation letter — or a written explanation of why we&apos;ve said no.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-vedara-cyan/30 to-vedara-blue/50 border border-vedara-cyan/40 flex items-center justify-center font-bold text-white shrink-0 shadow-md">
                    4
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-white mb-1">Then, if it&apos;s a &apos;yes&apos;.</h4>
                    <p className="text-slate-300 text-sm leading-relaxed font-light">
                      A video call with the treating doctor, with your whole family in the room and an interpreter if you want one.
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout Banner */}
              <div className="mt-10 p-5 rounded-2xl bg-white/[0.06] border border-white/15 backdrop-blur-md flex items-center justify-between shadow-lg">
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>Prefer to chat on WhatsApp?</span>
                    <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-xs text-vedara-cyan font-medium mt-0.5">Instant response from Lead Coordinator</div>
                </div>
                <button
                  type="button"
                  onClick={() => openChat("Hi Aisha, I'm reaching out directly from the web portal to discuss treatment options.")}
                  className="px-4 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-all cursor-pointer shadow-sm hover:scale-105"
                >
                  Message Aisha
                </button>
              </div>
            </div>

            {/* Compliance Guarantee */}
            <div className="mt-10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl p-6 rounded-2xl border border-white/10 flex gap-4">
              <Lock className="w-6 h-6 text-vedara-gold-muted shrink-0 mt-0.5" />
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Records are encrypted, stored in the EU, and handled under India&apos;s DPDP Act 2023, the UK GDPR and equivalent local rules. Shared only with the clinician you approve. Data Protection Officer: dpo@mycaretourindia.com
              </p>
            </div>
          </div>

          {/* Right Column: High-Tech Intake Form Container */}
          <div className="lg:col-span-7 bg-gradient-to-b from-[#0B1C42]/95 via-[#071434]/95 to-[#030A1C]/95 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 border-2 border-cyan-500/30 shadow-[0_0_60px_rgba(46,205,197,0.15)]">
            {submitted ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-6 border border-emerald-500/40 shadow-glow">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-white mb-3">Reports Received</h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed mb-8">
                  Thank you, {formData.name || "Patient"}. Our Lead International Care Coordinator has received your details and will review your file today.
                </p>
                <Button
                  variant="gold"
                  size="lg"
                  onClick={() => setSubmitted(false)}
                  className="text-vedara-deep font-bold rounded-xl"
                >
                  Send another inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                      Your name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#031126]/80 border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-vedara-gold transition-colors"
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                      You are
                    </label>
                    <select
                      value={formData.userType}
                      onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
                      className="w-full bg-[#031126]/80 border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-vedara-gold transition-colors"
                    >
                      <option className="bg-slate-900 text-white">The patient</option>
                      <option className="bg-slate-900 text-white">Family/Friend</option>
                      <option className="bg-slate-900 text-white">Doctor</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                      Email address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#031126]/80 border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-vedara-gold transition-colors"
                      placeholder="you@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                      Phone / WhatsApp (including country code)
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#031126]/80 border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-vedara-gold transition-colors"
                      placeholder="+44 7700 900077"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                      Where are you now?
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full bg-[#031126]/80 border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-vedara-gold transition-colors"
                      placeholder="e.g. London, UK"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                      Language you&apos;d prefer to speak
                    </label>
                    <select
                      value={formData.language}
                      onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                      className="w-full bg-[#031126]/80 border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-vedara-gold transition-colors"
                    >
                      <option className="bg-slate-900 text-white">English</option>
                      <option className="bg-slate-900 text-white">Arabic</option>
                      <option className="bg-slate-900 text-white">French</option>
                      <option className="bg-slate-900 text-white">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Tell us what&apos;s happening
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#031126]/80 border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-vedara-gold transition-colors resize-none"
                    placeholder="Brief description of symptoms, diagnosis, or scheduled surgery..."
                  />
                </div>

                {/* File Upload Box */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Scans, reports, biopsy results
                  </label>
                  <label
                    onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragActive(false);
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        setFileName(e.dataTransfer.files[0].name);
                      }
                    }}
                    className={`w-full border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer flex flex-col items-center gap-2 ${
                      dragActive
                        ? "border-vedara-cyan bg-vedara-cyan/15"
                        : "border-white/20 bg-white/[0.02] hover:bg-white/[0.06] hover:border-vedara-cyan/60"
                    }`}
                  >
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png,.dicom,.zip"
                    />
                    <UploadCloud className="w-8 h-8 text-vedara-gold" />
                    {fileName ? (
                      <div className="flex items-center gap-2 text-vedara-cyan text-sm font-bold">
                        <FileText className="w-4 h-4" />
                        <span>{fileName}</span>
                      </div>
                    ) : (
                      <>
                        <span className="text-sm text-slate-200 font-semibold">
                          Drag and drop or browse files
                        </span>
                        <span className="text-xs text-slate-400">
                          MRI, CT, X-ray films, pathology reports (PDF, JPG, PNG)
                        </span>
                      </>
                    )}
                  </label>
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-1 shrink-0 accent-vedara-gold cursor-pointer"
                  />
                  <label htmlFor="consent" className="text-xs text-slate-300 cursor-pointer select-none leading-relaxed">
                    I&apos;m happy for Vedara to hold and review this health information to organise my care.
                  </label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="gold"
                  size="xl"
                  className="w-full text-vedara-deep font-bold rounded-xl shadow-xl mt-4"
                >
                  <span>Send reports</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </form>
            )}
          </div>
          
        </div>
      </div>
    </section>
  );
};
