"use client";

import React, { useState, useEffect } from "react";
import {
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Clock,
  ShieldCheck,
  User,
  Globe,
  FileText,
  CheckCircle2,
  AlertCircle,
  X,
  Sparkles,
} from "lucide-react";
import { PatientCase } from "@/types/portal";
import { usePortal } from "@/lib/portal/store";

interface CSCallDialerModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientCase: PatientCase;
}

export const CSCallDialerModal: React.FC<CSCallDialerModalProps> = ({
  isOpen,
  onClose,
  patientCase,
}) => {
  const { addCsNote } = usePortal();
  const [callState, setCallState] = useState<"ringing" | "connected" | "ended">("ringing");
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(true);
  const [callNotes, setCallNotes] = useState("");
  const [disposition, setDisposition] = useState<string>("connected_docs_requested");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCallState("ringing");
      setDurationSeconds(0);
      setIsMuted(false);
      setCallNotes("");
      setIsSaved(false);
      return;
    }

    // Simulate connection after 2 seconds
    const ringTimer = setTimeout(() => {
      setCallState("connected");
    }, 2000);

    return () => clearTimeout(ringTimer);
  }, [isOpen]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOpen && callState === "connected") {
      interval = setInterval(() => {
        setDurationSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen, callState]);

  if (!isOpen) return null;

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainingSecs.toString().padStart(2, "0")}`;
  };

  const handleEndCall = () => {
    setCallState("ended");
  };

  const handleSaveAndClose = () => {
    if (callNotes.trim()) {
      addCsNote(
        patientCase.id,
        `[VOIP Phone Call - ${formatTimer(durationSeconds)}] Disposition: ${disposition.replace(/_/g, " ")}. Notes: ${callNotes}`
      );
    }
    setIsSaved(true);
    setTimeout(() => {
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-[130] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden border border-slate-200 flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header with Call Status */}
        <div className="bg-gradient-to-r from-[#101955] via-[#1b2360] to-[#141d60] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2ECDC5] to-[#1baba4] flex items-center justify-center text-white font-extrabold text-xl shadow-lg ring-2 ring-white/30">
                {patientCase.patientName.charAt(0)}
              </div>
              <span
                className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#101955] ${
                  callState === "ringing"
                    ? "bg-amber-400 animate-ping"
                    : callState === "connected"
                    ? "bg-emerald-400 animate-pulse"
                    : "bg-slate-400"
                }`}
              />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-lg leading-tight">{patientCase.patientName}</h3>
                <span className="text-[10px] font-mono font-bold bg-white/20 px-2 py-0.5 rounded text-white">
                  {patientCase.id}
                </span>
              </div>
              <div className="text-xs text-slate-300 flex items-center gap-2 mt-0.5 font-medium">
                <span>{patientCase.patientPhone}</span>
                <span>•</span>
                <span>{patientCase.patientCountry}</span>
              </div>
              <div className="text-[11px] text-[#2ECDC5] font-semibold mt-1">
                {patientCase.treatmentCategory}
              </div>
            </div>
          </div>

          {/* Active Call Status Bar */}
          <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  callState === "ringing"
                    ? "bg-amber-400 animate-pulse"
                    : callState === "connected"
                    ? "bg-emerald-400"
                    : "bg-rose-400"
                }`}
              />
              <span className="text-xs font-bold uppercase tracking-wider">
                {callState === "ringing" && "Calling Patient via Secure WebRTC..."}
                {callState === "connected" && "Call Connected • Encrypted Audio"}
                {callState === "ended" && "Call Finished"}
              </span>
            </div>

            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-xs font-mono font-bold">
              <Clock className="w-3.5 h-3.5 text-[#2ECDC5]" />
              <span>{formatTimer(durationSeconds)}</span>
            </div>
          </div>
        </div>

        {/* Call Animation / Controls Area */}
        <div className="p-6 space-y-5 flex-1 overflow-y-auto">
          {callState === "connected" && (
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-end gap-1 h-6">
                  {[40, 70, 30, 90, 60, 100, 45, 80, 50, 75, 95, 30].map((h, i) => (
                    <span
                      key={i}
                      style={{ height: `${h}%` }}
                      className={`w-1 bg-[#2ECDC5] rounded-full transition-all duration-150 ${
                        isMuted ? "opacity-20" : "animate-pulse"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-xs text-slate-600 font-medium">
                  Audio bit-rate: <strong className="text-slate-800">48 kbps Opus</strong> (Loss: 0%)
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                    isMuted
                      ? "bg-rose-100 border-rose-300 text-rose-700 font-bold"
                      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                  title={isMuted ? "Unmute Microphone" : "Mute Microphone"}
                >
                  {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>

                <button
                  type="button"
                  onClick={() => setIsSpeaker(!isSpeaker)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                    !isSpeaker
                      ? "bg-slate-200 border-slate-300 text-slate-500"
                      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                  title={isSpeaker ? "Mute Speaker" : "Enable Speaker"}
                >
                  {isSpeaker ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>

                <button
                  type="button"
                  onClick={handleEndCall}
                  className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                >
                  <PhoneOff className="w-4 h-4" />
                  <span>End Call</span>
                </button>
              </div>
            </div>
          )}

          {callState === "ringing" && (
            <div className="p-8 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50/50 animate-bounce">
                <Phone className="w-7 h-7" />
              </div>
              <div className="font-extrabold text-slate-800 text-sm">Dialing {patientCase.patientPhone}...</div>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Connecting to international gateway with carrier CLI presentation.
              </p>
              <button
                type="button"
                onClick={handleEndCall}
                className="mt-2 px-5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5"
              >
                <PhoneOff className="w-3.5 h-3.5" />
                Cancel Dialing
              </button>
            </div>
          )}

          {/* Disposition & Real-time Call Log Form */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Call Outcome / Disposition
              </label>
              <select
                value={disposition}
                onChange={(e) => setDisposition(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 font-medium focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none cursor-pointer"
              >
                <option value="connected_docs_requested">
                  🟢 Connected — Requested Missing Medical Scans / Records
                </option>
                <option value="connected_consult_scheduled">
                  🟢 Connected — Scheduled Doctor Video Consultation
                </option>
                <option value="connected_quote_discussed">
                  🟢 Connected — Reviewed Treatment Package & Price Quote
                </option>
                <option value="spoke_to_family">
                  🟡 Spoke to Attendant / Family Member (Patient Unavailable)
                </option>
                <option value="voicemail_left">
                  🟡 No Answer — Left Voicemail & Sent WhatsApp Follow-Up
                </option>
                <option value="callback_requested">
                  🟡 Patient Requested Callback at Later Time
                </option>
                <option value="wrong_number">🔴 Invalid / Unreachable Phone Number</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Call Notes & Clinical Observations
              </label>
              <textarea
                rows={3}
                placeholder="Key takeaways from conversation, patient symptoms, travel readiness, accompanying attendant details..."
                value={callNotes}
                onChange={(e) => setCallNotes(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>HIPAA/GDPR Compliant Call Log</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveAndClose}
              className="px-5 py-2 rounded-xl bg-[#101955] hover:bg-[#1a2770] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-[#2ECDC5]" />
              <span>{isSaved ? "Saved!" : "Log Call & Finish"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
