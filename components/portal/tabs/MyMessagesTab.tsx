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
    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_6px_32px_rgba(0,0,0,0.06)] border border-slate-200 flex flex-col h-[75vh] overflow-hidden animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-4 sm:p-6 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#2ECDC5]/40 shadow-xs">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
              alt="Aisha Khan"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <span>Aisha Khan</span>
              <span className="text-[10px] font-bold bg-[#2ECDC5]/15 text-[#3F4EB4] px-2.5 py-0.5 rounded-full border border-[#2ECDC5]/30">
                Lead Coordinator
              </span>
            </div>
            <div className="text-xs text-[#2ECDC5] font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#2ECDC5] animate-pulse" />
              <span>Online • Medanta & Apollo Direct Liaison</span>
            </div>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 font-medium">
          <ShieldCheck className="w-4 h-4 text-[#2ECDC5]" />
          <span>Encrypted Healthcare Channel</span>
        </div>
      </div>

      {/* Messages Thread */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/40">
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
                className={`max-w-md p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm transition-all duration-200 ${isPatient
                    ? "bg-gradient-to-r from-[#071321] via-[#0B1E33] to-[#0D2642] text-white rounded-br-none shadow-md border border-slate-800"
                    : "bg-white/95 text-slate-800 border border-slate-200 rounded-bl-none shadow-xs"
                  }`}
              >
                <p>{msg.text}</p>
                {msg.attachmentName && (
                  <div
                    className={`mt-2 pt-2 border-t flex items-center gap-1.5 text-xs font-semibold ${isPatient ? "border-white/20 text-[#2ECDC5]" : "border-slate-100 text-[#3F4EB4]"
                      }`}
                  >
                    <Paperclip className="w-3.5 h-3.5" />
                    <span>{msg.attachmentName}</span>
                  </div>
                )}
              </div>

              <div className="text-[10px] text-slate-400 mt-0.5 px-1 flex items-center gap-1">
                <CheckCheck className="w-3 h-3 text-[#2ECDC5]" />
                <span>Delivered</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Prompts */}
      <div className="px-4 py-2.5 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2 overflow-x-auto scrollbar-none">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
          Quick Ask:
        </span>
        {quickPrompts.map((q, i) => (
          <button
            key={i}
            onClick={() => setInputText(q)}
            className="px-3.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 hover:text-[#3F4EB4] text-xs font-semibold rounded-full border border-slate-200 shadow-2xs hover:border-[#2ECDC5]/40 whitespace-nowrap transition-all duration-200 cursor-pointer"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form
        onSubmit={handleSend}
        className="p-4 bg-white/95 border-t border-slate-100 flex items-center gap-2.5"
      >
        <button
          type="button"
          onClick={() => setAttachedFile("Updated_Echo_Report_2026.pdf")}
          className={`p-3 rounded-2xl border transition-all cursor-pointer ${attachedFile
              ? "bg-[#2ECDC5]/15 text-[#3F4EB4] border-[#2ECDC5]/40 font-bold"
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
          className="flex-1 bg-slate-50/80 border border-slate-200 rounded-2xl p-3.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none transition-all"
        />

        <button
          type="submit"
          disabled={!inputText.trim()}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#2ECDC5] via-[#2ECDC5] to-[#2abdb5] hover:from-[#283593] hover:to-[#2ECDC5] text-white font-extrabold text-xs shadow-md hover:shadow-xl transition-all duration-300 flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
