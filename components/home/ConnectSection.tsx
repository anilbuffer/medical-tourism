"use client";

import React, { useState } from "react";
import { UploadCloud, ArrowRight, Lock, ShieldCheck, CheckCircle2, FileText, PhoneCall } from "lucide-react";
import { useCare } from "@/context/CareContext";

export const ConnectSection = () => {
  const { openIntake } = useCare();
  const [dragActive, setDragActive] = useState(false);

  return (
    <section id="assessment" className="py-16 sm:py-24 bg-[#ECF4F7] border-t border-[#DCE6EB] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE6EB] text-[#0B5D68] text-xs font-heading font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Lock className="w-3.5 h-3.5 text-[#0B5D68]" />
            <span>CONFIDENTIAL SURGEON CASE REVIEW</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#0C2338] mb-4 leading-tight">
            Send Us Your Reports. We&apos;ll Tell You Honestly Whether to Come.
          </h2>
          <p className="text-base sm:text-lg text-[#6B7C88] font-normal leading-relaxed">
            100% free and zero commitment. If travelling isn&apos;t clinically sound or advantageous for you, our chief medical director will tell you why and recommend what to ask your local doctor instead.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: What Happens Next Timeline */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-heading font-extrabold text-2xl text-[#0C2338] mb-6">
              Our 4-Step Intake Protocol
            </h3>
            
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-xl bg-[#0B5D68] text-white flex items-center justify-center font-heading font-bold text-sm shrink-0 shadow-md">
                  1
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-[#0C2338] mb-0.5">
                    Within 4 Hours — Intake Confirmation
                  </h4>
                  <p className="text-xs sm:text-sm text-[#6B7C88] leading-relaxed">
                    A dedicated care manager acknowledges your files and verifies if additional MRI scans, X-rays, or blood work are required.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-xl bg-[#0B5D68] text-white flex items-center justify-center font-heading font-bold text-sm shrink-0 shadow-md">
                  2
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-[#0C2338] mb-0.5">
                    Within 24–48 Hours — Senior Specialist Opinion
                  </h4>
                  <p className="text-xs sm:text-sm text-[#6B7C88] leading-relaxed">
                    A Department Chief in your specific specialty personally evaluates your file and drafts a clinical feasibility opinion.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-xl bg-[#0B5D68] text-white flex items-center justify-center font-heading font-bold text-sm shrink-0 shadow-md">
                  3
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-[#0C2338] mb-0.5">
                    By Day Three — Guaranteed Price & Travel Blueprint
                  </h4>
                  <p className="text-xs sm:text-sm text-[#6B7C88] leading-relaxed">
                    You receive an itemised quote with implant brand specifications, in-country duration, and hospital visa invitation letter.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-xl bg-[#0B5D68] text-white flex items-center justify-center font-heading font-bold text-sm shrink-0 shadow-md">
                  4
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-[#0C2338] mb-0.5">
                    Surgeon Video Call & Family Q&A
                  </h4>
                  <p className="text-xs sm:text-sm text-[#6B7C88] leading-relaxed">
                    A direct 1-on-1 video call with your named operating surgeon. Bring your whole family into the room before you ever book a flight.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Secure Upload Box */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#DCE6EB] shadow-xl">
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#ECF4F7] text-[#0B5D68] flex items-center justify-center mx-auto mb-3 border border-[#DCE6EB]">
                  <UploadCloud className="w-7 h-7 text-[#0B5D68]" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-[#0C2338]">
                  Upload Your Reports Online
                </h3>
                <p className="text-xs text-[#6B7C88] mt-1">
                  Supported formats: PDF, JPG, PNG, DICOM / ZIP (Photos of paper reports are fine)
                </p>
              </div>

              {/* Upload Dropzone */}
              <div
                onClick={() => openIntake("Get a Free Treatment Opinion")}
                className="border-2 border-dashed border-[#0B5D68]/40 hover:border-[#0B5D68] bg-[#ECF4F7]/40 hover:bg-[#ECF4F7] rounded-2xl p-8 text-center transition-all cursor-pointer mb-6 group"
              >
                <FileText className="w-8 h-8 text-[#0B5D68] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <div className="font-heading font-bold text-sm text-[#0C2338]">
                  Click here to attach medical reports & imaging
                </div>
                <div className="text-xs text-[#6B7C88] mt-1">
                  Or drag & drop files directly
                </div>
              </div>

              {/* Security info */}
              <div className="space-y-3 pt-2 border-t border-[#DCE6EB]/60 text-xs text-[#6B7C88]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#0B8F83] shrink-0" />
                  <span>256-Bit SSL Encrypted & HIPAA Privacy Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0B8F83] shrink-0" />
                  <span>Only reviewed by licensed surgical specialists</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-5 border-t border-[#DCE6EB] space-y-3">
                <button
                  onClick={() => openIntake("Get a Free Treatment Opinion")}
                  className="w-full py-4 rounded-xl bg-[#F0A126] hover:bg-[#db8e18] text-[#0C2338] font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#F0A126]/25 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Get a Free Treatment Opinion</span>
                  <ArrowRight className="w-4 h-4 text-[#0C2338] stroke-[2.4]" />
                </button>

                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl border border-[#0B8F83]/40 text-[#0B8F83] hover:bg-[#ECF4F7] font-heading font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <span>Prefer WhatsApp? Send Reports Directly</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
