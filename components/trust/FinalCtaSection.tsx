"use client";

import React from "react";
import { useCare } from "@/context/CareContext";
import { Sparkles, MessageSquare, ArrowRight, ShieldCheck, Phone, Video } from "lucide-react";

export const FinalCtaSection = () => {
  const { t, language, openIntake, openChat } = useCare();

  return (
    <section className="py-24 bg-gradient-to-b from-[#031126] via-[#06203D] to-[#0A2E50] text-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2ECDC5]/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#0D9488]/20 to-[#0284C7]/20 border border-[#2ECDC5]/40 text-[#2ECDC5] text-xs font-bold uppercase tracking-wider backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{t.finalCta.eyebrow}</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-sans">
          {t.finalCta.heading || "Better Care Should Feel Less Complicated."}
        </h2>

        <p className="text-slate-200/90 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          {t.finalCta.subheading || "Tell us what you need. One dedicated team will guide you to India's finest healthcare."}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => openIntake()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 rounded-xl text-base font-bold text-slate-950 bg-gradient-to-r from-[#2ECDC5] via-[#5EEAD4] to-[#2ECDC5] shadow-2xl shadow-[#2ECDC5]/25 hover:scale-[1.02] active:scale-[0.98] transition-all group cursor-pointer"
          >
            <span>{t.finalCta.primaryBtn}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => openChat()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-sm font-semibold text-white bg-slate-900/80 hover:bg-slate-800 border border-teal-500/30 hover:border-[#2ECDC5] backdrop-blur-md transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-[#2ECDC5]" />
            <span>{t.finalCta.secondaryBtn}</span>
          </button>
        </div>

        {/* Channel Badges */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2ECDC5] animate-pulse"></span>
            <span>WhatsApp Immediate Reply</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-[#2ECDC5]" />
            <span>Direct 24/7 International Desk</span>
          </div>
          <div className="flex items-center gap-2">
            <Video className="w-3.5 h-3.5 text-[#2ECDC5]" />
            <span>Direct Specialist Video Consultation</span>
          </div>
        </div>
      </div>
    </section>
  );
};

