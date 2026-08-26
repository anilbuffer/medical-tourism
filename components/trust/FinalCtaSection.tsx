"use client";

import React from "react";
import { useCare } from "@/context/CareContext";
import { Sparkles, MessageSquare, ArrowRight, ShieldCheck, Phone, Video } from "lucide-react";

export const FinalCtaSection = () => {
  const { t, language, openIntake, openChat } = useCare();

  return (
    <section className="py-24 bg-gradient-to-b from-[#061019] via-[#0B1E33] to-[#040A10] text-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3F4EB4]/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2ECDC5]/10 border border-[#2ECDC5]/30 text-[#2ECDC5] text-xs font-bold uppercase tracking-wider backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{t.finalCta.eyebrow}</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-sans">
          {t.finalCta.heading || "Better Care Should Feel Less Complicated."}
        </h2>

        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          {t.finalCta.subheading || "Tell us what you need. One dedicated team will guide you to India's finest healthcare."}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => openIntake()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-[#2ECDC5] via-[#2ECDC5] to-[#2abdb5]  shadow-2xl shadow-[#283593]/30 hover:scale-[1.02] active:scale-[0.98] transition-all group"
          >
            <span>{t.finalCta.primaryBtn}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => openChat()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 hover:border-[#2ECDC5]/30 backdrop-blur-md transition-all"
          >
            <MessageSquare className="w-4 h-4 text-[#2ECDC5]" />
            <span>{t.finalCta.secondaryBtn}</span>
          </button>
        </div>

        {/* Channel Badges */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2ECDC5]"></span>
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
