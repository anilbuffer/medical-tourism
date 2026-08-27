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
  ChevronDown,
  ChevronUp,
  Globe,
  Unlock,
  ArrowRight,
} from "lucide-react";
import { PatientCase } from "@/types/portal";
import { VideoConsultationSDKModal } from "../../modals/VideoConsultationSDKModal";
import { WhatsAppContactModal } from "../../modals/WhatsAppContactModal";

interface PatientUpcomingVideoViewProps {
  patientCase: PatientCase;
  onNavigateTab?: (tabId: string) => void;
}

const PRE_CALL_QUESTIONS = [
  { id: "q1", text: "What are the risks specific to my age and condition?" },
  { id: "q2", text: "What is the expected recovery timeline after transplant?" },
  { id: "q3", text: "What medications will I need before and after surgery?" },
  { id: "q4", text: "Can my son Faris be present in the hospital room?" },
  { id: "q5", text: "What happens if complications arise during the procedure?" },
  { id: "q6", text: "What pre-operative tests are still needed from my side?" },
  { id: "q7", text: "What is the follow-up care schedule after I return to Dubai?" },
];

export const PatientUpcomingVideoView: React.FC<PatientUpcomingVideoViewProps> = ({
  patientCase,
  onNavigateTab,
}) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [agendaOpen, setAgendaOpen] = useState(false);
  const [checkedQuestions, setCheckedQuestions] = useState<Set<string>>(new Set());

  const toggleQuestion = (id: string) => {
    setCheckedQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Check if call outcome shows surgical suitability
  const latestConsult = patientCase.consultation;
  const isSuitableCandidate = latestConsult?.outcome === "suitable";

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Post-Call Unlock Banner — shown when CS marks patient as suitable */}
      {isSuitableCandidate && (
        <div className="flex items-center gap-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-4 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
            <Unlock className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-extrabold text-emerald-800">
              Dr. Gupta has marked you as a suitable transplant candidate
            </div>
            <div className="text-xs text-emerald-600 mt-0.5">
              {latestConsult?.outcomeNotes || "Your package details and payment options are now unlocked."}
            </div>
          </div>
          {onNavigateTab && (
            <button
              onClick={() => onNavigateTab("package_quote")}
              className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition-all cursor-pointer shadow-md"
            >
              View Package <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

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

          {/* Dual Timezone Clock */}
          <div className="space-y-3 text-left sm:text-right">
            <div className="text-xs font-bold text-[#2ECDC5] uppercase tracking-wider">Appointment Date & Time</div>
            <div className="text-2xl font-black text-white">Thursday, Aug 27</div>
            <div className="flex flex-col sm:items-end gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-xs font-bold">
                <Globe className="w-3.5 h-3.5 text-[#2ECDC5]" />
                <span className="text-[#2ECDC5]">02:00 PM</span>
                <span className="text-slate-300">GST — Dubai, UAE</span>
                <span className="text-[10px] text-slate-400 font-medium">(Your Time)</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-400/30 text-xs font-bold">
                <Clock className="w-3.5 h-3.5 text-amber-300" />
                <span className="text-amber-300">03:30 PM</span>
                <span className="text-slate-300">IST — New Delhi, India</span>
                <span className="text-[10px] text-slate-400 font-medium">(Doctor's Time)</span>
              </div>
              <div className="text-xs text-slate-300 mt-1">Duration: ~45 Minutes</div>
            </div>
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

      {/* Pre-Consultation Agenda / Questionnaire */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] overflow-hidden">
        <button
          onClick={() => setAgendaOpen(!agendaOpen)}
          className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-slate-50/50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#3F4EB4]/10 text-[#3F4EB4] flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">Pre-Consultation Agenda</h3>
              <p className="text-xs text-slate-500">
                Check the questions you want to ask Dr. Gupta — {checkedQuestions.size} of {PRE_CALL_QUESTIONS.length} selected
              </p>
            </div>
          </div>
          {agendaOpen ? (
            <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
          )}
        </button>

        {agendaOpen && (
          <div className="px-5 sm:px-6 pb-5 sm:pb-6 space-y-2 border-t border-slate-100 pt-4">
            <p className="text-xs text-slate-500 mb-3">
              High-stress calls can make it easy to forget your questions. Check off what you want to discuss, and we'll remind you 10 minutes before the call.
            </p>
            {PRE_CALL_QUESTIONS.map((q) => (
              <label
                key={q.id}
                className="flex items-start gap-3 p-3.5 rounded-2xl hover:bg-slate-50 cursor-pointer group transition-colors"
              >
                <div
                  onClick={() => toggleQuestion(q.id)}
                  className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                    checkedQuestions.has(q.id)
                      ? "bg-[#1baba4] border-[#1baba4] text-white"
                      : "border-slate-300 group-hover:border-[#1baba4]"
                  }`}
                >
                  {checkedQuestions.has(q.id) && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
                <span
                  className={`text-sm font-medium transition-colors ${
                    checkedQuestions.has(q.id) ? "text-[#1baba4] line-through opacity-60" : "text-slate-800"
                  }`}
                >
                  {q.text}
                </span>
              </label>
            ))}
            {checkedQuestions.size > 0 && (
              <div className="mt-3 p-3 bg-teal-50 border border-teal-100 rounded-xl text-xs text-teal-700 font-medium">
                ✓ {checkedQuestions.size} question{checkedQuestions.size > 1 ? "s" : ""} selected. Your coordinator Ananya will remind you before the call.
              </div>
            )}
          </div>
        )}
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
          className="text-xs font-bold text-[#3F4EB4] hover:text-[#283593] hover:underline cursor-pointer transition-colors whitespace-nowrap"
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
