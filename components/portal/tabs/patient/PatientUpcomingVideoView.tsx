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
} from "lucide-react";
import { PatientCase } from "@/types/portal";
import { VideoConsultationSDKModal } from "../../modals/VideoConsultationSDKModal";

interface PatientUpcomingVideoViewProps {
  patientCase: PatientCase;
}

export const PatientUpcomingVideoView: React.FC<PatientUpcomingVideoViewProps> = ({
  patientCase,
}) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2ECDC5]/10 text-[#3F4EB4] text-xs font-extrabold uppercase tracking-wider mb-2 border border-[#2ECDC5]/20">
            <Video className="w-3.5 h-3.5 text-[#2ECDC5]" />
            Telemedicine & Video Rooms
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Upcoming Video Consultations
          </h2>
          <p className="text-slate-500 text-sm mt-1 max-w-xl">
            Live cross-border surgical tele-consultations with Chief Surgeons, clinical AI live transcription, and test room diagnostics.
          </p>
        </div>

        <button
          onClick={() => setIsVideoModalOpen(true)}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] text-white text-xs font-black flex items-center gap-2 shadow-xl shadow-[#283593]/25 hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Join Video Room (SDK)</span>
        </button>
      </div>

      {/* Confirmed Consultation Card */}
      <div className="bg-gradient-to-br from-[#141d60] via-[#1b2360] to-[#101e76] rounded-3xl p-7 text-white shadow-xl border border-slate-800 relative overflow-hidden space-y-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2ECDC5]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5 relative z-10">
          <div className="flex items-center gap-3.5">
            <img
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80"
              alt="Dr. Subhash Gupta"
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-[#2ECDC5]/60 shadow-lg"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-base text-white">Dr. Subhash Gupta</span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#2ECDC5]/20 text-[#2ECDC5] border border-[#2ECDC5]/30">
                  Confirmed Call
                </span>
              </div>
              <div className="text-xs text-slate-300">
                Chief Liver Transplant Surgeon • Max Healthcare / Medanta The Medicity
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs font-bold text-[#2ECDC5]">Thursday, Aug 27, 2026</div>
            <div className="text-xl font-black text-white">03:30 PM (GST)</div>
            <div className="text-[11px] text-slate-400">Duration: 45 Minutes</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10 text-xs">
          <div className="p-4 bg-white/10 rounded-2xl border border-white/15 space-y-1 backdrop-blur-sm">
            <span className="text-slate-400 font-bold uppercase text-[10px]">Consultation Agenda</span>
            <p className="font-bold text-white leading-relaxed">
              Living Donor Volumetric Evaluation & Hepatectomy Clearance
            </p>
          </div>

          <div className="p-4 bg-white/10 rounded-2xl border border-white/15 space-y-1 backdrop-blur-sm">
            <span className="text-slate-400 font-bold uppercase text-[10px]">Attendant / Companion</span>
            <p className="font-bold text-white leading-relaxed">
              Son Faris Al-Mansoor (Living Donor) joining stream
            </p>
          </div>

          <div className="p-4 bg-white/10 rounded-2xl border border-white/15 space-y-1 backdrop-blur-sm">
            <span className="text-slate-400 font-bold uppercase text-[10px]">SDK Diagnostics</span>
            <div className="flex items-center gap-1.5 text-emerald-300 font-bold mt-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Camera, Mic & WebRTC Ready</span>
            </div>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-10 border-t border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-[#2ECDC5] animate-pulse" />
            <span>Room opens 10 minutes prior to call time for coordinator calibration.</span>
          </div>

          <button
            onClick={() => setIsVideoModalOpen(true)}
            className="px-6 py-3 rounded-2xl bg-[#2ECDC5] text-slate-950 text-xs font-black shadow-lg shadow-[#2ECDC5]/30 hover:bg-[#28b8b0] active:scale-95 transition-all cursor-pointer flex items-center gap-2"
          >
            <Video className="w-4 h-4" />
            <span>Launch Video Consultation Room</span>
          </button>
        </div>
      </div>

      {/* Video Modal */}
      <VideoConsultationSDKModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        patientCase={patientCase}
      />
    </div>
  );
};
