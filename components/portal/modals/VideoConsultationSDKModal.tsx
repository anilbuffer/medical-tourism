"use client";

import React, { useState, useEffect } from "react";
import {
  Video,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  Sparkles,
  ShieldCheck,
  Stethoscope,
  Volume2,
  FileText,
  MessageSquare,
  Clock,
  Maximize2,
  X,
  Send,
  User,
  Settings,
  CheckCircle2,
} from "lucide-react";
import { PatientCase } from "@/types/portal";

interface VideoConsultationSDKModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientCase: PatientCase;
}

export const VideoConsultationSDKModal: React.FC<VideoConsultationSDKModalProps> = ({
  isOpen,
  onClose,
  patientCase,
}) => {
  const [micActive, setMicActive] = useState(true);
  const [cameraActive, setCameraActive] = useState(true);
  const [activeTab, setActiveTab] = useState<"transcript" | "notes" | "chat">("transcript");
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string; time: string }>>([
    {
      sender: "System",
      text: "Encrypted HIPAA-compliant WebRTC session established (AES-256-GCM).",
      time: "03:29 PM",
    },
    {
      sender: "Care Coordinator Ananya",
      text: "Dr. Subhash Gupta has joined the private medical suite. Audio & Video levels are calibrated.",
      time: "03:30 PM",
    },
  ]);
  const [callDuration, setCallDuration] = useState(145); // in seconds

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const formatDuration = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainder.toString().padStart(2, "0")}`;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      {
        sender: patientCase.patientName,
        text: chatInput.trim(),
        time: "03:32 PM",
      },
    ]);
    setChatInput("");
  };

  return (
    <div className="fixed inset-0 z-[120] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-6xl h-[92vh] max-h-[850px] shadow-2xl flex flex-col overflow-hidden text-white">
        {/* Top Video Header */}
        <div className="h-16 px-6 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2ECDC5] to-[#1baba4] flex items-center justify-center text-white shadow-md">
              <Video className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-white">
                  Tele-Consultation SDK Room • Live Clinical Feed
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  REC • {formatDuration(callDuration)}
                </span>
              </div>
              <span className="text-[11px] text-slate-400">
                Dr. Subhash Gupta (Chief Liver Transplant Surgeon) & Tariq Al-Mansoor
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-950/40 text-emerald-300 border border-emerald-800/50 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>HIPAA / DPDP 256-bit Encrypted</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Video & Split Workspace */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 min-h-0 bg-slate-950/50">
          {/* Main Video Viewport (2 cols) */}
          <div className="lg:col-span-2 p-4 flex flex-col min-h-0 relative">
            {/* Primary Doctor Stream */}
            <div className="flex-1 bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl relative overflow-hidden border border-slate-800 flex items-center justify-center shadow-inner">
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=1200&auto=format&fit=crop&q=80"
                alt="Dr. Subhash Gupta"
                className="w-full h-full object-cover opacity-90"
              />

              {/* Ambient Glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30" />

              {/* Doctor Label Tag */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700 text-xs font-bold">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Dr. Subhash Gupta (Max / Medanta NCR)</span>
                <span className="text-[10px] text-[#2ECDC5] font-normal">Chief Transplant Lead</span>
              </div>

              {/* Audio Waveform Indicator */}
              <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700 text-xs font-bold text-slate-300">
                <Volume2 className="w-3.5 h-3.5 text-[#2ECDC5]" />
                <div className="flex items-center gap-0.5">
                  <span className="w-1 h-3 bg-[#2ECDC5] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1 h-4 bg-[#2ECDC5] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1 h-2 bg-[#2ECDC5] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>

              {/* Self View (Picture-in-Picture) */}
              <div className="absolute bottom-4 right-4 w-44 h-32 bg-slate-900 rounded-xl overflow-hidden border-2 border-slate-700 shadow-2xl relative">
                {cameraActive ? (
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80"
                    alt="Patient Self View"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 bg-slate-900">
                    <VideoOff className="w-6 h-6 mb-1" />
                    <span className="text-[10px]">Camera Off</span>
                  </div>
                )}
                <div className="absolute bottom-1.5 left-1.5 right-1.5 px-2 py-0.5 bg-slate-950/80 rounded-md text-[9px] font-bold text-slate-300 flex items-center justify-between">
                  <span>You (Dubai)</span>
                  <span className={micActive ? "text-emerald-400" : "text-rose-400"}>
                    {micActive ? "Mic On" : "Muted"}
                  </span>
                </div>
              </div>
            </div>

            {/* Video Controls Toolbar */}
            <div className="h-16 pt-3 flex items-center justify-center gap-3 shrink-0">
              <button
                onClick={() => setMicActive(!micActive)}
                className={`p-3.5 rounded-2xl font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  micActive
                    ? "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                    : "bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30"
                }`}
                title={micActive ? "Mute Microphone" : "Unmute Microphone"}
              >
                {micActive ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setCameraActive(!cameraActive)}
                className={`p-3.5 rounded-2xl font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  cameraActive
                    ? "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                    : "bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30"
                }`}
                title={cameraActive ? "Turn Off Camera" : "Turn On Camera"}
              >
                {cameraActive ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </button>

              <button
                onClick={onClose}
                className="px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-xl shadow-rose-600/30 active:scale-95 transition-all cursor-pointer"
              >
                <PhoneOff className="w-4 h-4" />
                <span>Leave Consultation</span>
              </button>
            </div>
          </div>

          {/* Right Sidebar: AI Transcript, Clinical Notes & Chat */}
          <div className="p-4 border-l border-slate-800 flex flex-col min-h-0 bg-slate-900/60">
            {/* Tab Selector */}
            <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 mb-3 shrink-0">
              <button
                onClick={() => setActiveTab("transcript")}
                className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "transcript"
                    ? "bg-gradient-to-r from-[#2ECDC5] to-[#1baba4] text-slate-950 font-black"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                AI Live Transcript
              </button>
              <button
                onClick={() => setActiveTab("notes")}
                className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "notes"
                    ? "bg-gradient-to-r from-[#2ECDC5] to-[#1baba4] text-slate-950 font-black"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Doctor Notes
              </button>
              <button
                onClick={() => setActiveTab("chat")}
                className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "chat"
                    ? "bg-gradient-to-r from-[#2ECDC5] to-[#1baba4] text-slate-950 font-black"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Chat
              </button>
            </div>

            {/* Tab 1: Live AI Transcript */}
            {activeTab === "transcript" && (
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs text-slate-300 scrollbar-thin">
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#2ECDC5]">
                    <span>Dr. Subhash Gupta</span>
                    <span className="text-slate-500 font-normal">03:30 PM</span>
                  </div>
                  <p className="text-slate-200 leading-relaxed">
                    "Good afternoon Mr. Tariq. I have analyzed your Abdominal MRI DICOM series with our surgical committee. The liver volumetric ratio for living donation with your son Faris is optimal at 68%."
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-bold text-teal-300">
                    <span>Tariq Al-Mansoor</span>
                    <span className="text-slate-500 font-normal">03:31 PM</span>
                  </div>
                  <p className="text-slate-200 leading-relaxed">
                    "Thank you Doctor. How soon after arrival in Delhi on Aug 31 will the donor workup and final pre-op clearance be completed?"
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#2ECDC5]">
                    <span>Dr. Subhash Gupta</span>
                    <span className="text-slate-500 font-normal">03:32 PM</span>
                  </div>
                  <p className="text-slate-200 leading-relaxed">
                    "We will review your repeat serology and factor V assays on Day 1. The surgery can be scheduled for Day 3, with 14 days hospital stay in our Private Isolation Suite."
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-[#2ECDC5]/10 border border-[#2ECDC5]/20 flex items-center gap-2 text-[11px] text-[#2ECDC5]">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>Real-time clinical multilingual transcription active (Arabic & English).</span>
                </div>
              </div>
            )}

            {/* Tab 2: Clinical Notes & Pre-Call Checklist */}
            {activeTab === "notes" && (
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs scrollbar-thin">
                <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Surgical Recommendation
                  </span>
                  <p className="font-bold text-white leading-relaxed">
                    Living Donor Liver Transplant (LDLT) • Right Hepatectomy (Living Donor)
                  </p>
                  <p className="text-slate-300 text-[11px]">
                    Expected Stay: 14 Days (ICU Isolation + Private Deluxe Suite)
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Required Action Before Departure
                  </span>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-emerald-300 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Volumetric Liver MRI Cleared</span>
                    </div>
                    <div className="flex items-center gap-2 text-amber-300 text-[11px]">
                      <span className="w-3.5 h-3.5 rounded-full border border-amber-400 flex items-center justify-center text-[9px] font-bold">!</span>
                      <span>Re-upload Blood Work Report (Page 2 missing)</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-300 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Govt e-Medical Visa Issued</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Consultation Chat */}
            {activeTab === "chat" && (
              <div className="flex-1 flex flex-col min-h-0">
                <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 text-xs scrollbar-thin mb-3">
                  {chatMessages.map((msg, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 space-y-0.5">
                      <div className="flex items-center justify-between text-[10px] text-[#2ECDC5] font-bold">
                        <span>{msg.sender}</span>
                        <span className="text-slate-500 font-normal">{msg.time}</span>
                      </div>
                      <p className="text-slate-200">{msg.text}</p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type message to doctor..."
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#2ECDC5]"
                  />
                  <button
                    type="submit"
                    className="p-2 rounded-xl bg-[#2ECDC5] text-slate-950 font-bold hover:bg-[#28b8b0] transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
