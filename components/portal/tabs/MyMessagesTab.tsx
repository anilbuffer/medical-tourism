"use client";

import React, { useState } from "react";
import { PatientCase, InPortalMessage } from "@/types/portal";
import { usePortal } from "@/lib/portal/store";
import {
  MessageSquare,
  Send,
  Paperclip,
  Clock,
  CheckCheck,
  ShieldCheck,
  User,
  Sparkles,
  Phone,
} from "lucide-react";

interface MyMessagesTabProps {
  patientCase: PatientCase;
}

export const MyMessagesTab: React.FC<MyMessagesTabProps> = ({ patientCase }) => {
  const { sendPortalMessage } = usePortal();
  const [inputText, setInputText] = useState("");
  const [attachedFile, setAttachedFile] = useState<string | undefined>(undefined);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    sendPortalMessage(patientCase.id, inputText, attachedFile);
    setInputText("");
    setAttachedFile(undefined);
  };

  const quickPrompts = [
    "Can you verify when my M-Visa invitation letter will arrive?",
    "Could we add one additional companion for hotel room booking?",
    "What time is our pre-operative blood test scheduled?",
    "Are specialized dietary meals provided at Medanta hospital?",
  ];

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 flex flex-col h-[75vh] overflow-hidden animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-teal-500/30">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
              alt="Aisha Khan"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <span>Aisha Khan</span>
              <span className="text-[10px] font-bold bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full">
                Lead Coordinator
              </span>
            </div>
            <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Online • Medanta & Apollo Direct Liaison</span>
            </div>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Encrypted Healthcare Channel</span>
        </div>
      </div>

      {/* Messages Thread */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/50">
        {patientCase.messages.map((msg) => {
          const isPatient = msg.senderRole === "patient";

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isPatient ? "items-end" : "items-start"}`}
            >
              <div className="text-[11px] text-slate-400 font-medium mb-1 px-1">
                {msg.senderName} • {msg.timestamp}
              </div>

              <div
                className={`max-w-md p-4 rounded-3xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                  isPatient
                    ? "bg-[#0E1F40] text-white rounded-br-none"
                    : "bg-white text-slate-800 border border-slate-200 rounded-bl-none"
                }`}
              >
                <p>{msg.text}</p>
                {msg.attachmentName && (
                  <div
                    className={`mt-2 pt-2 border-t flex items-center gap-1.5 text-xs font-semibold ${
                      isPatient ? "border-white/20 text-teal-300" : "border-slate-100 text-teal-700"
                    }`}
                  >
                    <Paperclip className="w-3.5 h-3.5" />
                    <span>{msg.attachmentName}</span>
                  </div>
                )}
              </div>

              <div className="text-[10px] text-slate-400 mt-0.5 px-1 flex items-center gap-1">
                <CheckCheck className="w-3 h-3 text-teal-600" />
                <span>Delivered</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Prompts */}
      <div className="px-4 py-2 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2 overflow-x-auto scrollbar-none">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
          Quick Ask:
        </span>
        {quickPrompts.map((q, i) => (
          <button
            key={i}
            onClick={() => setInputText(q)}
            className="px-3 py-1 bg-white hover:bg-teal-50 text-slate-700 hover:text-teal-900 text-xs font-semibold rounded-full border border-slate-200 whitespace-nowrap transition-all"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form
        onSubmit={handleSend}
        className="p-4 bg-white border-t border-slate-100 flex items-center gap-2"
      >
        <button
          type="button"
          onClick={() => setAttachedFile("Updated_Echo_Report_2026.pdf")}
          className={`p-2.5 rounded-xl border transition-all ${
            attachedFile
              ? "bg-teal-50 text-teal-700 border-teal-200 font-bold"
              : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
          }`}
          title="Attach Document"
        >
          <Paperclip className="w-4 h-4" />
        </button>

        <input
          type="text"
          placeholder={
            attachedFile
              ? `Attached: ${attachedFile}. Type your note...`
              : "Type a secure message to your coordinator Aisha..."
          }
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
        />

        <button
          type="submit"
          disabled={!inputText.trim()}
          className="px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
