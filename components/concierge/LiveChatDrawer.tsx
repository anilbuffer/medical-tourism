"use client";

import React, { useState, useRef, useEffect } from "react";
import { useCare } from "@/context/CareContext";
import { CARE_COORDINATOR } from "@/data/mockData";
import {
  X,
  Send,
  Sparkles,
  Phone,
  MessageSquare,
  ShieldCheck,
  CheckCheck,
  Bot,
  User,
  Paperclip,
} from "lucide-react";

export const LiveChatDrawer = () => {
  const { isChatOpen, closeChat, chatMessages, sendChatMessage, language } = useCare();
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isChatOpen]);

  if (!isChatOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendChatMessage(inputText);
    setInputText("");
  };

  const quickPrompts = [
    language === "ar" ? "كم تبلغ تكلفة عملية القلب؟" : "What is the cost of heart surgery?",
    language === "ar" ? "كيف أحصل على التأشيرة الطبية؟" : "How do I get a Medical Visa (M-Visa)?",
    language === "ar" ? "أود حجز استشارة مع د. ميهتا" : "I'd like a video consult with Dr. Mehta",
    language === "ar" ? "هل يمكن لعائلتي السفر معي؟" : "Can my family travel with me as attendants?",
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l rtl:border-l-0 rtl:border-r border-slate-200 animate-in slide-in-from-right rtl:slide-in-from-left duration-300">
          {/* Header */}
          <div className="bg-[#0C2338] text-white p-4 sm:p-5 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={CARE_COORDINATOR.avatar}
                  alt={CARE_COORDINATOR.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-[#F0A126]"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#0B8F83] ring-2 ring-[#0C2338]"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-extrabold text-sm text-white font-heading">
                    {language === "ar" ? CARE_COORDINATOR.nameAr : CARE_COORDINATOR.name}
                  </h4>
                  <span className="text-[10px] bg-[#F0A126]/20 text-[#F0A126] px-2 py-0.2 rounded-full font-bold">
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-[#ECF4F7]/80">
                  {language === "ar" ? CARE_COORDINATOR.roleAr : CARE_COORDINATOR.role}
                </p>
              </div>
            </div>

            <button
              onClick={closeChat}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Info Bar */}
          <div className="bg-[#ECF4F7] px-4 py-2 border-b border-[#DCE6EB] flex items-center justify-between text-[11px] text-[#0B5D68]">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F0A126]" />
              <span className="font-medium">Direct 1:1 Medical Concierge</span>
            </div>
            <span className="font-bold text-[#0B5D68]">Replies in &lt; 15 mins</span>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FCFDFD]">
            {chatMessages.map((msg) => {
              const isUser = msg.sender === "user";
              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`}
                >
                  {!isUser && (
                    <img
                      src={CARE_COORDINATOR.avatar}
                      alt="Coordinator"
                      className="w-7 h-7 rounded-full object-cover mb-1 ring-1 ring-[#0B5D68] shrink-0"
                    />
                  )}
                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-sm ${isUser
                      ? "bg-[#0B5D68] text-white rounded-br-none"
                      : "bg-white text-[#0C2338] border border-[#DCE6EB] rounded-bl-none"
                      }`}
                  >
                    <p>{msg.text}</p>
                    <div
                      className={`text-[9px] mt-1 flex items-center justify-end gap-1 ${isUser ? "text-teal-200" : "text-[#6B7C88]"
                        }`}
                    >
                      <span>{msg.timestamp}</span>
                      {isUser && <CheckCheck className="w-3 h-3 text-[#F0A126]" />}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Query Prompts */}
          <div className="p-3 bg-white border-t border-[#DCE6EB] space-y-1.5">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#6B7C88]">
              Suggested Questions:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {quickPrompts.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => sendChatMessage(q)}
                  className="px-2.5 py-1 rounded-lg bg-[#ECF4F7] hover:bg-[#0B5D68]/15 hover:text-[#0B5D68] text-[11px] text-[#0C2338] font-medium transition-colors border border-[#DCE6EB] text-left rtl:text-right cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-[#DCE6EB] flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                language === "ar"
                  ? "اكتب رسالتك لعائشة خان..."
                  : "Type your care question for Aisha..."
              }
              className="flex-1 px-4 py-2.5 rounded-xl border border-[#DCE6EB] text-xs sm:text-sm text-[#0C2338] focus:outline-none focus:ring-2 focus:ring-[#0B5D68]"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 rounded-xl bg-[#0B5D68] hover:bg-[#0C2338] disabled:opacity-40 text-white shadow-md transition-all shrink-0 cursor-pointer"
            >
              <Send className="w-4 h-4 rtl:rotate-180" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
