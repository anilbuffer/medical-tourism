"use client";

import React, { useState } from "react";
import { PatientCase, TeleConsultation, ConsultationOutcome } from "@/types/portal";
import {
  Video,
  Calendar,
  Clock,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  XCircle,
  FileText,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  Share2,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Building2,
} from "lucide-react";

interface MyConsultationTabProps {
  patientCase: PatientCase;
}

export const MyConsultationTab: React.FC<MyConsultationTabProps> = ({ patientCase }) => {
  const consult = patientCase.consultation;

  // Interactive Video Call Simulation State
  const [isVideoRoomOpen, setIsVideoRoomOpen] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCamOff, setIsCamOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [simulatedCallTime, setSimulatedCallTime] = useState("14:28");

  const getOutcomeBadge = (outcome: ConsultationOutcome) => {
    switch (outcome) {
      case "suitable":
        return (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1">
            <div className="flex items-center gap-2 font-bold text-sm text-emerald-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Outcome: Candidate Confirmed SUITABLE for Procedure</span>
            </div>
            <p className="text-xs text-emerald-700 leading-relaxed">
              Dr. Trehan’s surgical evaluation team has cleared your case for all-inclusive hospital admission and procedure planning.
            </p>
          </div>
        );
      case "needs_more_info":
        return (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1">
            <div className="flex items-center gap-2 font-bold text-sm text-amber-800">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <span>Outcome: Additional Clinical Reports Required</span>
            </div>
            <p className="text-xs text-amber-700 leading-relaxed">
              The specialist requests supplementary high-contrast slice scans or updated lab panels before finalizing surgical candidacy.
            </p>
          </div>
        );
      case "not_suitable":
        return (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 space-y-1">
            <div className="flex items-center gap-2 font-bold text-sm text-rose-800">
              <XCircle className="w-5 h-5 text-rose-600" />
              <span>Outcome: Surgical Procedure Not Recommended</span>
            </div>
            <p className="text-xs text-rose-700 leading-relaxed">
              Based on the diagnostic review, this specific surgical procedure is not advised. Redirect notes & alternative non-invasive treatments are listed below.
            </p>
          </div>
        );
      case "pending":
      default:
        return (
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 space-y-1">
            <div className="flex items-center gap-2 font-bold text-sm text-blue-800">
              <Clock className="w-5 h-5 text-blue-600" />
              <span>Outcome: Pending Specialist Video Consultation</span>
            </div>
            <p className="text-xs text-blue-700 leading-relaxed">
              Clinical outcome and procedural suitability will be issued immediately following your scheduled video consultation.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2ECDC5]/10 text-[#3F4EB4] text-xs font-bold tracking-wider uppercase mb-2 border border-[#2ECDC5]/20">
            <Video className="w-3.5 h-3.5 text-[#2ECDC5]" />
            HD Telemedicine Consultation Desk
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Specialist Video Consultation & Second Opinion
          </h2>
          <p className="text-slate-500 text-sm mt-1 max-w-xl">
            Live encrypted video session with your assigned Chief Surgeon to evaluate diagnostic imaging, clarify treatment details, and confirm clinical suitability.
          </p>
        </div>

        <button
          onClick={() => setIsVideoRoomOpen(true)}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#2ECDC5] via-[#2ECDC5] to-[#2abdb5] hover:from-[#283593] hover:to-[#2ECDC5] text-white font-extrabold text-sm shadow-xl shadow-[#283593]/25 hover:scale-105 transition-all duration-300 flex items-center gap-2.5 shrink-0 cursor-pointer"
        >
          <Video className="w-5 h-5" />
          <span>Launch Telehealth Video Room</span>
        </button>
      </div>

      {/* Main Consultation Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Doctor & Consultation Meta */}
        <div className="lg:col-span-2 bg-white/95 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] transition-all duration-300 space-y-6">
          {/* Doctor Profile Card */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-5 bg-gradient-to-r from-slate-50 via-indigo-50/20 to-teal-50/20 rounded-2xl border border-slate-200 shadow-xs">
            <div className="w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-white shadow-md shrink-0">
              <img
                src={
                  consult?.doctorAvatar ||
                  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80"
                }
                alt={consult?.doctorName || "Doctor"}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <div className="text-xs font-extrabold text-[#3F4EB4] uppercase tracking-wider">
                Assigned Specialist & Hospital Chair
              </div>
              <h3 className="text-xl font-black text-slate-900">
                {consult?.doctorName || "Dr. Naresh Trehan"}
              </h3>
              <p className="text-xs font-semibold text-slate-600">
                {consult?.doctorSpecialty || "Chief Cardiac Surgeon & Chairman"}
              </p>
              <p className="text-xs text-slate-500 flex items-center gap-1.5 pt-0.5">
                <Building2 className="w-3.5 h-3.5 text-[#2ECDC5]" />
                <span>{consult?.doctorHospital || "Medanta - The Medicity, Gurugram"}</span>
              </p>
            </div>
          </div>

          {/* Appointment Schedule Time */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#3F4EB4]" />
                <span>Scheduled Date</span>
              </div>
              <div className="text-sm font-extrabold text-slate-900 mt-1">
                {consult?.scheduledAt ? new Date(consult.scheduledAt).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" }) : "Scheduled for Tomorrow"}
              </div>
            </div>

            <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#2ECDC5]" />
                <span>Time & Duration</span>
              </div>
              <div className="text-sm font-extrabold text-slate-900 mt-1">
                {consult?.durationMinutes || 40} Minutes (HD Video)
              </div>
            </div>

            <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2ECDC5]" />
                <span>Security Protocol</span>
              </div>
              <div className="text-sm font-extrabold text-[#3F4EB4] mt-1">
                End-to-End Encrypted
              </div>
            </div>
          </div>

          {/* Post-Consultation Outcome Card */}
          <div className="space-y-3 pt-2">
            <h4 className="text-base font-extrabold text-slate-900">
              Clinical Evaluation & Suitability Outcome
            </h4>
            {getOutcomeBadge(consult?.outcome || "suitable")}

            {consult?.outcomeNotes && (
              <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-1.5">
                <strong className="block font-extrabold text-slate-900">
                  Doctor&apos;s Clinical Assessment Notes:
                </strong>
                <p className="leading-relaxed">{consult.outcomeNotes}</p>
                {consult.prescriptionSummary && (
                  <div className="mt-2 pt-2 border-t border-slate-200 text-[#3F4EB4] font-semibold">
                    Advice / Pre-Op Instructions: {consult.prescriptionSummary}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Pre-Consultation Diagnostic Checklist */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] transition-all duration-300 space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Sparkles className="w-4 h-4 text-[#2ECDC5]" />
            <h3 className="font-extrabold text-slate-900 text-base">Pre-Consultation Checklist</h3>
          </div>
          <p className="text-xs text-slate-500">
            Items prepared and verified by coordinator Aisha Khan prior to doctor call:
          </p>

          <div className="space-y-3">
            {[
              { label: "High-resolution DICOM / MRI slice loop uploaded", done: true },
              { label: "Blood chemistry & renal profile verified", done: true },
              { label: "Current medication & allergy schedule documented", done: true },
              { label: "English / Russian medical interpreter assigned", done: true },
              { label: "High-speed camera & microphone connection verified", done: true },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#2ECDC5] shrink-0 mt-0.5" />
                <span className="font-medium">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={() => setIsVideoRoomOpen(true)}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#2ECDC5] via-[#2ECDC5] to-[#2abdb5] hover:from-[#283593] hover:to-[#2ECDC5] text-white font-extrabold text-xs shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Video className="w-4 h-4" />
              <span>Enter Video Meeting Room</span>
            </button>
          </div>
        </div>
      </div>

      {/* ================= Interactive Embedded Telehealth Video Room ================= */}
      {isVideoRoomOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-lg animate-in fade-in">
          <div className="bg-slate-900 rounded-3xl max-w-4xl w-full h-[85vh] shadow-2xl border border-slate-700 flex flex-col overflow-hidden text-white">
            {/* Top Bar */}
            <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                <div>
                  <div className="font-bold text-sm text-white flex items-center gap-2">
                    <span>Clinical Video Session: {consult?.doctorName || "Dr. Naresh Trehan"}</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                      SECURE TELEHEALTH
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Patient: {patientCase.patientName} ({patientCase.id}) • Time elapsed: {simulatedCallTime}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsVideoRoomOpen(false)}
                className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all"
              >
                <PhoneOff className="w-3.5 h-3.5" />
                <span>Leave Session</span>
              </button>
            </div>

            {/* Video Canvas Body */}
            <div className="flex-1 p-4 grid grid-cols-1 md:grid-cols-3 gap-4 overflow-hidden bg-slate-950 relative">
              {/* Main Doctor Screen */}
              <div className="md:col-span-2 relative rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&auto=format&fit=crop&q=80"
                  alt="Doctor Stream"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-slate-950/70 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-white border border-white/10">
                  {consult?.doctorName || "Dr. Naresh Trehan"} (Senior Surgeon)
                </div>
                <div className="absolute bottom-4 left-4 bg-emerald-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-semibold text-emerald-300 border border-emerald-500/30 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Echo Sizing Loop: 24.5mm Annulus Confirmed</span>
                </div>
              </div>

              {/* Sidebar: Patient Self-View & Clinical Live Chat */}
              <div className="flex flex-col gap-4">
                {/* Self View */}
                <div className="h-44 rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 relative flex items-center justify-center">
                  {!isCamOff ? (
                    <img
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80"
                      alt="Self stream"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-slate-400 text-xs font-bold flex flex-col items-center gap-1">
                      <VideoOff className="w-6 h-6" />
                      <span>Camera Paused</span>
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 bg-slate-950/70 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-white">
                    You (Patient)
                  </div>
                </div>

                {/* Live Consultation Note Stream */}
                <div className="flex-1 rounded-2xl bg-slate-900/90 border border-slate-800 p-3.5 flex flex-col justify-between text-xs">
                  <div className="space-y-2 overflow-y-auto">
                    <div className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">
                      Live Clinical Notes
                    </div>
                    <div className="p-2.5 bg-slate-800/80 rounded-xl text-slate-300 text-[11px] leading-relaxed border border-slate-700/50">
                      <strong>Dr. Trehan:</strong> &quot;Patient exhibits ideal femoral artery caliber for a smooth transfemoral approach. 4-day hospital stay recommended.&quot;
                    </div>
                  </div>

                  <div className="pt-2 text-[10px] text-slate-500 text-center">
                    Session is medically transcribed & archived in Document Vault
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Controls Bar */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-center gap-4">
              <button
                onClick={() => setIsMicMuted(!isMicMuted)}
                className={`p-3.5 rounded-2xl transition-all ${isMicMuted ? "bg-rose-600 text-white" : "bg-slate-800 hover:bg-slate-700 text-white"
                  }`}
                title="Toggle Mic"
              >
                {isMicMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setIsCamOff(!isCamOff)}
                className={`p-3.5 rounded-2xl transition-all ${isCamOff ? "bg-rose-600 text-white" : "bg-slate-800 hover:bg-slate-700 text-white"
                  }`}
                title="Toggle Video"
              >
                {isCamOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setIsScreenSharing(!isScreenSharing)}
                className={`p-3.5 rounded-2xl transition-all ${isScreenSharing ? "bg-teal-600 text-white" : "bg-slate-800 hover:bg-slate-700 text-white"
                  }`}
                title="Share Medical Scans"
              >
                <Share2 className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsVideoRoomOpen(false)}
                className="px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs flex items-center gap-2 transition-all shadow-lg"
              >
                <PhoneOff className="w-4 h-4" />
                <span>End Consultation</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
