"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  UploadCloud,
  ArrowRight,
  Lock,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Sparkles,
  X,
  MessageSquare,
  Check
} from "lucide-react";
import { useCare } from "@/context/CareContext";
import { BrandIcon } from "@/components/ui/BrandLogo";

// Bespoke Circular Rotating Stamp Badge matching the reference design
const CircularStampBadge = () => (
  <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center select-none pointer-events-none">
    {/* Rotating SVG Curved Text */}
    <svg
      className="w-full h-full animate-[spin_20s_linear_infinite]"
      viewBox="0 0 120 120"
      aria-hidden="true"
    >
      <defs>
        <path
          id="stampCirclePath"
          d="M 60, 60 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
        />
      </defs>
      <text className="text-[9.5px] uppercase font-bold tracking-[0.24em] fill-[#0C2338]">
        <textPath href="#stampCirclePath">
          GET IN TOUCH • 24/7 MEDICAL DESK •
        </textPath>
      </text>
    </svg>
    {/* Center Dark Circle with Brand Icon */}
    <div className="absolute w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#0C2338] text-white flex items-center justify-center shadow-lg border-2 border-white">
      <BrandIcon variant="white" className="w-6 h-6 sm:w-7 sm:h-7" />
    </div>
  </div>
);

export const ConnectSection = () => {
  const { openIntake } = useCare();
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [condition, setCondition] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const names = Array.from(files).map((f) => f.name);
    setSelectedFiles((prev) => [...prev, ...names]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert("Please agree to the confidential medical data review.");
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      openIntake("Confidential Surgeon Case Review");
      setSubmitted(false);
    }, 1500);
  };

  const intakeSteps = [
    {
      num: "1",
      title: "Within 4 Hours — Intake Confirmation",
    },
    {
      num: "2",
      title: "Within 24–48 Hours — Senior Specialist Opinion",
    },
    {
      num: "3",
      title: "By Day Three — Guaranteed Price & Travel Blueprint",
    },
    {
      num: "4",
      title: "Surgeon Video Call & Family Q&A",
    },
  ];

  return (
    <section
      id="assessment"
      className="w-full relative overflow-hidden bg-[#F5F7F6] border-t border-[#DCE6EB] font-sans"
    >
      {/* 01. Desktop Edge-to-Edge Split Background */}
      <div className="hidden lg:grid absolute inset-0 grid-cols-12 pointer-events-none">
        {/* Left half: Soft warm clinical cream */}
        <div className="col-span-6 bg-[#F5F7F6]" />

        {/* Right half: Full-bleed Chief Surgeon Consultation Photograph */}
        <div className="col-span-6 relative bg-slate-900 overflow-hidden">
          <Image
            src="/images/connect/surgeon-consultation.jpg"
            alt="Chief surgeon consulting international patient on treatment plan"
            fill
            priority
            sizes="50vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        </div>
      </div>

      {/* 02. Content Layer Aligned with 1580px Container Grid */}
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">

          {/* ======================================================== */}
          {/* LEFT COLUMN: Heading, Protocol & Bedside Photo with Stamp */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 flex flex-col justify-between">

            {/* Header Area matching reference typography */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ECF4F7] border border-[#DCE6EB] text-[#0B5D68] text-xs font-heading font-bold uppercase tracking-wider mb-4 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse" />
                <Lock className="w-3.5 h-3.5 text-[#0B5D68]" />
                <span>CONFIDENTIAL SURGEON CASE REVIEW</span>
              </div>

              {/* Main Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-heading font-extrabold text-[#0C2338] leading-[1.15] mb-4 tracking-tight">
                Send Us Your Reports. We&apos;ll Tell You Honestly Whether to Come.
              </h2>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-[#6B7C88] leading-relaxed max-w-xl mb-8 font-normal">
                100% free and zero commitment. If travelling isn&apos;t clinically sound or advantageous for you, our chief medical director will tell you why and recommend what to ask your local doctor instead.
              </p>
            </div>

            {/* Our 4-Step Intake Protocol Grid */}
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-[#0B5D68]" />
                <h3 className="font-heading font-extrabold text-sm sm:text-base text-[#0C2338] uppercase tracking-wide">
                  Our 4-Step Intake Protocol
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {intakeSteps.map((step) => (
                  <div
                    key={step.num}
                    className="bg-[#ECF4F7] rounded-xl px-3.5 py-3 border border-[#DCE6EB] shadow-xs flex items-center gap-3 hover:border-[#0B5D68]/40 hover:bg-white transition-all group"
                  >
                    <span className="w-8 h-8 rounded-lg bg-[#ffffff] text-[#0B5D68] flex items-center justify-center font-heading font-bold text-xs shrink-0 shadow-xs group-hover:bg-[#07434B] transition-colors">
                      {step.num}
                    </span>
                    <h4 className="font-heading font-bold text-xs sm:text-[13px] text-[#0C2338] leading-snug">
                      {step.title}
                    </h4>
                  </div>
                ))}
              </div>
            </div>

            {/* Lower Bedside Care Photo & Circular Stamp Badge */}
            <div className="relative mt-2">
              <div className="relative w-full h-[260px] sm:h-[320px] rounded-3xl overflow-hidden shadow-xl border border-white bg-slate-100">
                <Image
                  src="/images/connect/care-bedside.jpg"
                  alt="Compassionate nurse providing dedicated bedside care to patient"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Circular Rotating Stamp Badge Positioned at the top-right corner */}
              <div className="absolute -top-10 sm:-top-12 -right-4 sm:-right-6 z-20">
                <CircularStampBadge />
              </div>
            </div>

          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: Floating Form Card Over Surgeon Photo      */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">

            {/* Mobile-only background image block */}
            <div className="block lg:hidden relative w-full h-[280px] rounded-3xl overflow-hidden mb-6 shadow-md">
              <Image
                src="/images/connect/surgeon-consultation.jpg"
                alt="Chief surgeon consulting international patient"
                fill
                sizes="100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Floating White Form Card matching reference card */}
            <div className="w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 lg:p-9 shadow-[0_25px_60px_rgba(12,35,56,0.18)] border border-[#DCE6EB]/80 text-[#0C2338] relative z-20">

              {/* Form Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0B5D68] animate-pulse" />
                  <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#0B5D68]">
                    Direct Surgeon Evaluation
                  </span>
                </div>
                <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0C2338] tracking-tight leading-tight">
                  Upload Your Reports Online
                </h3>
                <p className="text-xs text-[#6B7C88] mt-1.5 leading-relaxed">
                  Supported formats: PDF, JPG, PNG, DICOM / ZIP (Photos of paper reports are fine)
                </p>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-[#0C2338] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Robert Jenkins"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F7F6] border border-[#DCE6EB] text-sm text-[#0C2338] placeholder-slate-400 focus:outline-none focus:border-[#0B5D68] focus:bg-white transition-all shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-[#0C2338] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="robert@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F7F6] border border-[#DCE6EB] text-sm text-[#0C2338] placeholder-slate-400 focus:outline-none focus:border-[#0B5D68] focus:bg-white transition-all shadow-2xs"
                    />
                  </div>
                </div>

                {/* Telephone & Subject/Condition Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-[#0C2338] mb-1">
                      Telephone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F7F6] border border-[#DCE6EB] text-sm text-[#0C2338] placeholder-slate-400 focus:outline-none focus:border-[#0B5D68] focus:bg-white transition-all shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-[#0C2338] mb-1">
                      Treatment / Condition
                    </label>
                    <input
                      type="text"
                      value={condition}
                      onChange={(e) => setCondition(e.target.value)}
                      placeholder="e.g. Knee, Cardiac, Spine..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F7F6] border border-[#DCE6EB] text-sm text-[#0C2338] placeholder-slate-400 focus:outline-none focus:border-[#0B5D68] focus:bg-white transition-all shadow-2xs"
                    />
                  </div>
                </div>

                {/* Drag & Drop File Upload Zone */}
                <div>
                  <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-[#0C2338] mb-1">
                    Attach Medical Reports &amp; Imaging
                  </label>
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragActive(true);
                    }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragActive(false);
                      handleFiles(e.dataTransfer.files);
                    }}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${dragActive
                      ? "border-[#0B5D68] bg-[#ECF4F7]"
                      : "border-[#0B5D68]/30 hover:border-[#0B5D68] bg-[#F5F7F6] hover:bg-[#ECF4F7]/60"
                      }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      className="hidden"
                      onChange={(e) => handleFiles(e.target.files)}
                    />
                    <UploadCloud className="w-6 h-6 text-[#0B5D68] mx-auto mb-1.5" />
                    <div className="font-heading font-bold text-xs text-[#0C2338]">
                      Click here to attach medical reports &amp; imaging
                    </div>
                    <div className="text-[11px] text-[#6B7C88] mt-0.5">
                      Or drag &amp; drop files directly
                    </div>
                  </div>

                  {/* Selected files chip list */}
                  {selectedFiles.length > 0 && (
                    <div className="mt-2 space-y-1.5 max-h-24 overflow-y-auto pr-1">
                      {selectedFiles.map((name, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#ECF4F7] text-xs text-[#0C2338]"
                        >
                          <span className="truncate max-w-[240px] flex items-center gap-1.5 font-medium">
                            <FileText className="w-3.5 h-3.5 text-[#0B5D68] shrink-0" />
                            {name}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeFile(idx)}
                            className="text-slate-400 hover:text-red-500 cursor-pointer p-0.5"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Security and HIPAA compliance info */}
                <div className="space-y-1.5 pt-1 text-[11px] text-[#6B7C88]">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#0B5D68] shrink-0" />
                    <span>256-Bit SSL Encrypted &amp; HIPAA Privacy Compliant</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0B5D68] shrink-0" />
                    <span>Only reviewed by licensed surgical specialists</span>
                  </div>
                </div>

                {/* Agreement Checkbox */}
                <label className="flex items-start gap-2.5 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 rounded text-[#0B5D68] focus:ring-[#0B5D68] accent-[#0B5D68]"
                  />
                  <span className="text-[11px] text-[#6B7C88] leading-tight">
                    I agree that my submitted data is being collected and stored confidentially for surgical feasibility evaluation.
                  </span>
                </label>

                {/* Primary Action Button 1 & Secondary Action Button 2 */}
                <div className="pt-2 space-y-2.5">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-[#F0A126] hover:bg-[#db8e18] text-[#0C2338] font-heading font-extrabold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#F0A126]/20 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                  >
                    {submitted ? (
                      <span className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#0C2338]" />
                        Reports Submitted! Opening Case File...
                      </span>
                    ) : (
                      <>
                        <span>Get a Free Treatment Opinion</span>
                        <ArrowRight className="w-4 h-4 text-[#0C2338] stroke-[2.5]" />
                      </>
                    )}
                  </button>

                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-[#0B5D68] hover:bg-[#07434B] text-white font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-2 text-center"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#14B8A6]" />
                    <span>Prefer WhatsApp? Send Reports Directly</span>
                  </a>
                </div>

              </form>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
