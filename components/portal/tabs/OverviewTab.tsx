"use client";

import React, { useState } from "react";
import { PatientCase } from "@/types/portal";
import {
  Calendar,
  Clock,
  MapPin,
  MessageSquare,
  DollarSign,
  ChevronRight,
  CheckCircle2,
  FileText,
  AlertTriangle,
  Activity,
  Heart,
  Send,
  X,
  Sparkles,
} from "lucide-react";

interface OverviewTabProps {
  patientCase: PatientCase;
  onNavigateTab: (tabId: string) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ patientCase, onNavigateTab }) => {
  const [selectedActivity, setSelectedActivity] = useState<any | null>(null);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Extract first name (e.g. "Robert" from "Robert Vance")
  const firstName = patientCase.patientName.split(" ")[0] || "Robert";

  // Activity Feed items strictly matching the mockup
  const activityFeed = [
    {
      id: "act-1",
      type: "visit_completed",
      icon: CheckCircle2,
      iconColor: "text-[#2ECDC5]",
      iconBg: "bg-[#2ECDC5]/10",
      title: "Visit completed",
      timestamp: "Today at 1:00 PM",
      description: "Good morning overall. I was assisted with bathing and dressing.",
      details: {
        caregiver: "Sarah Jenkins (Primary Caregiver)",
        tasksCompleted: [
          "Assisted bathing & dressing",
          "Morning vitals check: BP 122/80",
          "Prescribed medications administered",
        ],
        notes: "Patient was in high spirits. All mobility exercises completed without discomfort.",
      },
    },
    {
      id: "act-2",
      type: "care_plan_updated",
      icon: FileText,
      iconColor: "text-[#3F4EB4]",
      iconBg: "bg-[#3F4EB4]/10",
      title: "Care plan updated",
      timestamp: "Yesterday",
      description: "Added focus on fall prevention.",
      details: {
        caregiver: "Dr. Naresh Trehan / Care Team",
        tasksCompleted: [
          "Updated post-operative protocol",
          "Added non-slip footwear instructions",
          "Scheduled 48h physical therapy check",
        ],
        notes: "Care plan modified following cardiac valve telemetry review.",
      },
    },
    {
      id: "act-3",
      type: "incident_reported",
      icon: AlertTriangle,
      iconColor: "text-amber-500",
      iconBg: "bg-amber-50",
      title: "Incident reported",
      timestamp: "Jul 21",
      description: "Minor skin tear on arm, cleaned and bandaged.",
      details: {
        caregiver: "Sarah Jenkins",
        tasksCompleted: [
          "Wound antiseptic cleaning",
          "Applied sterile hydrocolloid dressing",
          "Logged in clinical telemetry",
        ],
        notes: "No signs of infection. Monitored for 24 hours with full resolution.",
      },
    },
    {
      id: "act-4",
      type: "visit_completed",
      icon: CheckCircle2,
      iconColor: "text-[#2ECDC5]",
      iconBg: "bg-[#2ECDC5]/10",
      title: "Visit completed",
      timestamp: "Jul 21 at 5:00 PM",
      description: "Helped me with my afternoon medication. We played a few hands of cards after lunch.",
      details: {
        caregiver: "Marcus Thorne",
        tasksCompleted: [
          "Administered afternoon dosage",
          "Hydration assessment",
          "Recreational companionship",
        ],
        notes: "Patient had good appetite and normal resting heart rate (72 bpm).",
      },
    },
  ];

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    setFeedbackSubmitted(true);
    setTimeout(() => {
      setFeedbackSubmitted(false);
      setIsFeedbackOpen(false);
      setFeedbackText("");
    }, 1600);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* 01. Greeting & Top Action Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Good morning, <span className="text-[#00897B] font-black">{firstName}</span>
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Here&apos;s what&apos;s happening today.
          </p>
        </div>

        {/* 1 Document Needs Signature Alert Badge */}
        <button
          onClick={() => onNavigateTab("consents")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#FFF1F2] border border-[#FECDD3] text-[#E11D48] hover:bg-rose-100/80 transition-all shadow-xs self-start sm:self-auto group"
        >
          <FileText className="w-4 h-4 text-[#E11D48] shrink-0" />
          <span className="text-xs font-bold tracking-tight">1 Document Needs Signature</span>
        </button>
      </div>

      {/* 02. Dark Hero Status Tracker Card (Matches Homepage Midnight Theme) */}
      <div className="bg-gradient-to-br from-[#071321] via-[#0B192C] to-[#0E1F40] rounded-3xl p-6 sm:p-7 text-white shadow-2xl border border-slate-800/80 relative overflow-hidden">
        {/* Ambient Cyan glow matching Homepage */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2ECDC5]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2.5 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 backdrop-blur-sm">
            <Clock className="w-3.5 h-3.5 text-[#2ECDC5]" />
            <span>Today&apos;s Visit • 9:00 AM - 1:00 PM</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-xs font-semibold text-amber-300">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>On the way • ETA: 12 mins</span>
          </div>
        </div>

        {/* Progress Tracker Stepper */}
        <div className="my-8">
          <div className="relative">
            {/* Background Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-700/60 -translate-y-1/2 rounded-full" />
            {/* Active Progress Line (Cyan / Electric Blue gradient with glow) */}
            <div className="absolute top-1/2 left-0 w-[42%] h-1 bg-gradient-to-r from-[#2ECDC5] to-[#3F4EB4] -translate-y-1/2 rounded-full shadow-[0_0_14px_#2ECDC5]" />

            {/* Steps */}
            <div className="relative flex justify-between items-center text-xs font-semibold text-slate-300">
              {/* Step 1: Scheduled */}
              <div className="flex flex-col items-center">
                <span className="text-[11px] sm:text-xs text-slate-300 mb-2">Scheduled</span>
                <div className="w-2.5 h-2.5 rounded-full bg-[#2ECDC5] ring-4 ring-[#071321]" />
              </div>

              {/* Step 2: En Route (Active) */}
              <div className="flex flex-col items-center">
                <span className="text-[11px] sm:text-xs text-white font-bold mb-2">En Route</span>
                <div className="w-3.5 h-3.5 rounded-full bg-[#2ECDC5] ring-4 ring-[#071321] shadow-[0_0_10px_#2ECDC5]" />
              </div>

              {/* Step 3: In Progress */}
              <div className="flex flex-col items-center">
                <span className="text-[11px] sm:text-xs text-slate-400 mb-2">In Progress</span>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-600 ring-4 ring-[#071321]" />
              </div>

              {/* Step 4: Completed */}
              <div className="flex flex-col items-center">
                <span className="text-[11px] sm:text-xs text-slate-400 mb-2">Completed</span>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-600 ring-4 ring-[#071321]" />
              </div>
            </div>
          </div>
        </div>

        {/* Assigned Primary Caregiver Mini Card */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="inline-flex items-center gap-3 bg-white/10 px-4 py-2.5 rounded-2xl border border-white/10 backdrop-blur-sm">
            <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-[#3F4EB4] to-[#283593] ring-1 ring-[#2ECDC5]/40 flex items-center justify-center font-bold text-white text-sm">
              <span>S</span>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#2ECDC5] rounded-full ring-2 ring-[#071321]" />
            </div>
            <div>
              <div className="text-xs font-black text-white leading-tight">Sarah Jenkins</div>
              <div className="text-[11px] text-slate-300 flex items-center gap-1">
                <Heart className="w-3 h-3 text-[#2ECDC5]" />
                <span>Primary Caregiver</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab("messages")}
            className="hidden sm:inline-flex items-center gap-2 text-xs font-bold text-[#2ECDC5] hover:text-teal-200 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat with Sarah</span>
          </button>
        </div>
      </div>

      {/* 03. 3 Quick Summary / Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Next Visit */}
        <div
          onClick={() => onNavigateTab("consultation")}
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-[#2ECDC5]/50 transition-all flex items-center justify-between cursor-pointer group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#2ECDC5]/10 text-[#00897B] border border-[#2ECDC5]/20 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-medium text-slate-500">Next Visit</div>
              <div className="text-base font-extrabold text-slate-900">Tomorrow, 9:00 AM</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#00897B] group-hover:translate-x-0.5 transition-all" />
        </div>

        {/* Card 2: Unread Messages */}
        <div
          onClick={() => onNavigateTab("messages")}
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-[#3F4EB4]/40 transition-all flex items-center justify-between cursor-pointer group relative"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#3F4EB4]/10 text-[#283593] border border-[#3F4EB4]/20 flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-medium text-slate-500">Unread Messages</div>
              <div className="text-base font-extrabold text-slate-900">2</div>
            </div>
          </div>
          {/* Notification Cyan Dot */}
          <div className="w-2.5 h-2.5 rounded-full bg-[#2ECDC5] shadow-xs" />
        </div>

        {/* Card 3: Balance */}
        <div
          onClick={() => onNavigateTab("payments")}
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-[#2ECDC5]/50 transition-all flex items-center justify-between cursor-pointer group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#2ECDC5]/10 text-[#00897B] border border-[#2ECDC5]/20 flex items-center justify-center shrink-0">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-medium text-slate-500">Balance</div>
              <div className="text-base font-extrabold text-slate-900">$120.00</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#00897B] group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>

      {/* 04. Two-Column Main Feed & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Wide, ~65%): Recent Activity Feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2 pb-1">
            <Activity className="w-4 h-4 text-[#00897B]" />
            <h2 className="text-base font-extrabold text-slate-900">Recent Activity Feed</h2>
          </div>

          <div className="space-y-3">
            {activityFeed.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:shadow-sm hover:border-slate-300 transition-all"
                >
                  <div className="flex items-start gap-3.5">
                    <div className={`w-10 h-10 rounded-2xl ${item.iconBg} ${item.iconColor} flex items-center justify-center shrink-0 mt-0.5`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-sm font-extrabold text-slate-900">{item.title}</h3>
                        <span className="text-xs text-slate-400 whitespace-nowrap">{item.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.description}</p>
                      <button
                        onClick={() => setSelectedActivity(item)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#00897B] hover:text-[#283593] mt-2.5 transition-colors"
                      >
                        <span>View details</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (~35%): Upcoming + My Care Team */}
        <div className="space-y-6">
          {/* Upcoming Section */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <h2 className="text-base font-extrabold text-slate-900">Upcoming</h2>
              <button
                onClick={() => onNavigateTab("consultation")}
                className="text-[#00897B] hover:text-[#283593]"
                title="View All Upcoming"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Event 1 */}
              <div className="p-3.5 bg-slate-50/70 rounded-2xl border border-slate-100 space-y-2">
                <div className="text-xs font-bold text-slate-900">Tomorrow, Jul 22</div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>9:00 AM - 1:00 PM</span>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <div className="w-6 h-6 rounded-full bg-[#2ECDC5]/15 text-[#00897B] text-[10px] font-bold flex items-center justify-center">
                    S
                  </div>
                  <span className="text-xs font-semibold text-slate-700">Sarah Jenkins</span>
                </div>
              </div>

              {/* Event 2 */}
              <div className="p-3.5 bg-slate-50/70 rounded-2xl border border-slate-100 space-y-2">
                <div className="text-xs font-bold text-slate-900">Friday, Jul 24</div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>8:00 AM - 1:00 PM</span>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <div className="w-6 h-6 rounded-full bg-[#3F4EB4]/15 text-[#283593] text-[10px] font-bold flex items-center justify-center">
                    M
                  </div>
                  <span className="text-xs font-semibold text-slate-700">Marcus Thorne</span>
                </div>
              </div>
            </div>
          </div>

          {/* My Care Team Section */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h2 className="text-base font-extrabold text-slate-900">My Care Team</h2>

            {/* Member 1: Sarah Jenkins */}
            <div className="flex items-center justify-between p-3.5 bg-slate-50/70 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-[#2ECDC5]/15 text-[#00897B] font-bold flex items-center justify-center text-sm ring-1 ring-[#2ECDC5]/30">
                  <span>S</span>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#2ECDC5] rounded-full ring-2 ring-white" />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900">Sarah Jenkins</div>
                  <div className="text-[11px] text-slate-500">Primary Caregiver</div>
                </div>
              </div>

              <button
                onClick={() => onNavigateTab("messages")}
                className="w-8 h-8 rounded-xl bg-[#2ECDC5]/10 text-[#00897B] hover:bg-[#2ECDC5] hover:text-slate-950 flex items-center justify-center transition-all"
                title="Message Sarah Jenkins"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>

            {/* Member 2: Dr. Naresh Trehan */}
            <div className="flex items-center justify-between p-3.5 bg-slate-50/70 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-[#3F4EB4]/15 text-[#283593] font-bold flex items-center justify-center text-sm ring-1 ring-[#3F4EB4]/30">
                  <span>N</span>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#2ECDC5] rounded-full ring-2 ring-white" />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900">Dr. Naresh Trehan</div>
                  <div className="text-[11px] text-slate-500">Chief Surgeon</div>
                </div>
              </div>

              <button
                onClick={() => onNavigateTab("messages")}
                className="w-8 h-8 rounded-xl bg-[#3F4EB4]/10 text-[#283593] hover:bg-[#283593] hover:text-white flex items-center justify-center transition-all"
                title="Message Dr. Trehan"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Right "Give Feedback" Button matching homepage signature CTA gradient */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsFeedbackOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#2ECDC5] via-[#3F4EB4] to-[#283593] hover:from-[#283593] hover:to-[#2ECDC5] text-white font-bold text-xs shadow-xl shadow-[#283593]/35 hover:scale-105 active:scale-95 transition-all"
        >
          <MessageSquare className="w-4 h-4 text-amber-300" />
          <span>Give Feedback</span>
        </button>
      </div>

      {/* Activity Details Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-xl ${selectedActivity.iconBg} ${selectedActivity.iconColor} flex items-center justify-center`}>
                  {React.createElement(selectedActivity.icon, { className: "w-4 h-4" })}
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">{selectedActivity.title}</h3>
                  <p className="text-[11px] text-slate-400">{selectedActivity.timestamp}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedActivity(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-2xl">
                <span className="text-slate-500 font-medium">Logged By:</span>
                <p className="font-bold text-slate-900 mt-0.5">{selectedActivity.details.caregiver}</p>
              </div>

              <div>
                <span className="text-slate-500 font-medium">Tasks / Protocols Logged:</span>
                <ul className="mt-1.5 space-y-1">
                  {selectedActivity.details.tasksCompleted.map((task: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2ECDC5]" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-[#2ECDC5]/10 border border-[#2ECDC5]/20 rounded-2xl">
                <span className="text-[#00897B] font-bold">Clinical Care Note:</span>
                <p className="text-slate-700 mt-0.5">{selectedActivity.details.notes}</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedActivity(null)}
                className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Give Feedback Modal */}
      {isFeedbackOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#2ECDC5]/15 text-[#00897B] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#00897B]" />
                </div>
                <h3 className="text-sm font-extrabold text-slate-900">Share Your Care Feedback</h3>
              </div>
              <button
                onClick={() => setIsFeedbackOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {feedbackSubmitted ? (
              <div className="p-6 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-[#00897B] mx-auto animate-bounce" />
                <p className="text-sm font-extrabold text-slate-900">Thank You for Your Feedback!</p>
                <p className="text-xs text-slate-500">Your care coordinator and nursing team have received your note.</p>
              </div>
            ) : (
              <form onSubmit={handleSendFeedback} className="space-y-3">
                <p className="text-xs text-slate-600 leading-relaxed">
                  How was your experience with today&apos;s visit and care team? Your feedback directly helps us ensure the highest standard of international medical care.
                </p>
                <textarea
                  rows={4}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Type your feedback or request here..."
                  className="w-full p-3 rounded-2xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#2ECDC5] resize-none"
                  required
                />
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsFeedbackOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#2ECDC5] via-[#3F4EB4] to-[#283593] hover:from-[#283593] hover:to-[#2ECDC5] text-white text-xs font-bold shadow-md shadow-[#283593]/30 flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Feedback</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
