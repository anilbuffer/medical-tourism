"use client";

import React, { useState } from "react";
import {
  Video,
  Calendar,
  Clock,
  User,
  Building2,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Play,
  FileText,
  Phone,
  MessageSquare,
  HelpCircle,
} from "lucide-react";
import { PatientCase } from "@/types/portal";
import { VideoConsultationSDKModal } from "../../modals/VideoConsultationSDKModal";
import { WhatsAppContactModal } from "../../modals/WhatsAppContactModal";

interface PatientUpcomingVideoViewProps {
  patientCase: PatientCase;
}

export const PatientUpcomingVideoView: React.FC<PatientUpcomingVideoViewProps> = ({
  patientCase,
}) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2ECDC5]/10 text-[#3F4EB4] text-xs font-extrabold uppercase tracking-wider mb-2 border border-[#2ECDC5]/20">
            <Video className="w-3.5 h-3.5 text-[#2ECDC5]" />
            Doctor Appointment
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Video Call with Your Doctor
          </h2>
          <p className="text-slate-500 text-sm mt-1 max-w-xl">
            Meet with Chief Surgeon Dr. Subhash Gupta to review your test results, understand your surgical plan, and ask any questions.
          </p>
        </div>

        <button
          onClick={() => setIsVideoModalOpen(true)}
          className="px-7 py-4 rounded-2xl bg-[#2ECDC5] hover:bg-[#28b8b0] text-slate-950 text-sm font-black flex items-center gap-2.5 shadow-xl shadow-[#2ECDC5]/25 hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
        >
          <Play className="w-4 h-4 fill-slate-950" />
          <span>Join Video Call</span>
        </button>
      </div>

      {/* Confirmed Consultation Card */}
      <div className="bg-gradient-to-br from-[#141d60] via-[#1b2360] to-[#101e76] rounded-3xl p-7 sm:p-9 text-white shadow-xl border border-slate-800 relative overflow-hidden space-y-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2ECDC5]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-64 h-64 bg-[#3F4EB4]/25 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/15 pb-6 relative z-10">
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=180&auto=format&fit=crop&q=80"
              alt="Dr. Subhash Gupta"
              className="w-18 h-18 rounded-2xl object-cover ring-4 ring-[#2ECDC5]/50 shadow-xl"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl text-white">Dr. Subhash Gupta</span>
                <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                  Confirmed Call
                </span>
              </div>
              <div className="text-sm text-slate-200 mt-0.5">
                Chief Liver Transplant Surgeon • Medanta – The Medicity Hospital
              </div>
            </div>
          </div>

          <div className="text-left sm:text-right bg-white/10 sm:bg-transparent p-4 sm:p-0 rounded-2xl border sm:border-0 border-white/15 w-full sm:w-auto">
            <div className="text-xs font-bold text-[#2ECDC5] uppercase tracking-wider">Appointment Date & Time</div>
            <div className="text-2xl font-black text-white mt-0.5">Thursday, Aug 27</div>
            <div className="text-base font-bold text-slate-200">03:30 PM (Your Local Time)</div>
            <div className="text-xs text-slate-300 mt-1">Duration: ~45 Minutes</div>
          </div>
        </div>

        {/* 3 Clear Call Topics */}
        <div className="space-y-2 relative z-10">
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-300 block">
            What you and your doctor will discuss
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-white/10 rounded-2xl border border-white/15 space-y-1.5 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-[#2ECDC5] font-extrabold">
                <CheckCircle2 className="w-4 h-4" />
                <span>1. Test & Scan Review</span>
              </div>
              <p className="text-slate-200 leading-relaxed">
                Reviewing your latest MRI scans and liver reports with you and confirming surgical clearance.
              </p>
            </div>

            <div className="p-4 bg-white/10 rounded-2xl border border-white/15 space-y-1.5 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-[#2ECDC5] font-extrabold">
                <CheckCircle2 className="w-4 h-4" />
                <span>2. Step-by-Step Plan</span>
              </div>
              <p className="text-slate-200 leading-relaxed">
                Explaining the transplant procedure, recovery timeline, and what to expect during your hospital stay.
              </p>
            </div>

            <div className="p-4 bg-white/10 rounded-2xl border border-white/15 space-y-1.5 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-[#2ECDC5] font-extrabold">
                <CheckCircle2 className="w-4 h-4" />
                <span>3. Your Family & Donor</span>
              </div>
              <p className="text-slate-200 leading-relaxed">
                Answering all questions from you and your son Faris, and discussing travel scheduling.
              </p>
            </div>
          </div>
        </div>

        {/* Action Button & Reassurance */}
        <div className="pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10 border-t border-white/15">
          <div className="flex items-center gap-2 text-xs text-slate-200 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2ECDC5] animate-pulse" />
            <span>No download needed. Works smoothly right inside your web browser.</span>
          </div>

          <button
            onClick={() => setIsVideoModalOpen(true)}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#2ECDC5] hover:bg-[#28b8b0] text-slate-950 text-sm font-black shadow-xl shadow-[#2ECDC5]/30 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Video className="w-5 h-5 fill-slate-950" />
            <span>Join Video Room Now</span>
          </button>
        </div>
      </div>

      {/* Helpful Call Preparation Tips */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
            <HelpCircle className="w-6 h-6 text-[#3F4EB4]" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-slate-900">Tips for your video call</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Have your questions written down, and invite family members or living donors to sit with you.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsWhatsAppOpen(true)}
          className="text-xs font-bold text-[#3F4EB4] hover:text-[#283593] hover:underline cursor-pointer transition-colors"
        >
          Need help preparing? Contact Coordinator
        </button>
      </div>

      {/* Video Modal */}
      <VideoConsultationSDKModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        patientCase={patientCase}
      />

      {/* WhatsApp Modal */}
      <WhatsAppContactModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        coordinatorName="Ananya Sharma"
        caseId={patientCase.id}
      />
    </div>
  );
};
