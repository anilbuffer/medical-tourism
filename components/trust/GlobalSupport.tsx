"use client";

import React, { useState } from "react";
import { useCare } from "@/context/CareContext";
import { GLOBAL_DESKS, GlobalDesk } from "@/data/mockData";
import {
  Globe2,
  Phone,
  MessageSquare,
  Video,
  Mail,
  Clock,
  Sparkles,
  ArrowRight,
  UserCheck,
} from "lucide-react";

export const GlobalSupport = () => {
  const { t, language, openChat } = useCare();
  const [selectedDesk, setSelectedDesk] = useState<GlobalDesk>(GLOBAL_DESKS[0]);

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#2ECDC5] mb-2">
            {t.support.eyebrow}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3851A2] tracking-tight leading-tight">
            {t.support.heading}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500 leading-relaxed max-w-2xl mx-auto">
            {t.support.subheading}
          </p>
        </div>

        {/* 4 Contact Channels Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <a
            href="https://wa.me/971501234567"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-[#2ECDC5] hover:shadow-lg transition-all flex items-center gap-3 group"
          >
            <div className="w-11 h-11 rounded-xl bg-[#2ECDC5]/15 text-[#1DA89F] flex items-center justify-center group-hover:bg-[#2ECDC5] group-hover:text-white transition-colors">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-[#2ECDC5]">
                {t.support.whatsappChat}
              </div>
              <div className="text-[11px] text-slate-500">Immediate coordinator reply</div>
            </div>
          </a>

          <button
            onClick={() => openChat("I'd like to schedule a phone call with the care desk.")}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-[#3F4EB4] hover:shadow-lg transition-all flex items-center gap-3 group text-left rtl:text-right"
          >
            <div className="w-11 h-11 rounded-xl bg-[#3F4EB4]/10 text-[#3F4EB4] flex items-center justify-center group-hover:bg-[#3F4EB4] group-hover:text-white transition-colors">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700">
                {t.support.callDesk}
              </div>
              <div className="text-[11px] text-slate-500">24/7 International helpline</div>
            </div>
          </button>

          <button
            onClick={() => openChat("I want to book an exploratory video consultation.")}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-[#283593] hover:shadow-lg transition-all flex items-center gap-3 group text-left rtl:text-right"
          >
            <div className="w-11 h-11 rounded-xl bg-[#283593]/10 text-[#283593] flex items-center justify-center group-hover:bg-[#283593] group-hover:text-white transition-colors">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-[#3F4EB4]">
                {t.support.videoDesk}
              </div>
              <div className="text-[11px] text-slate-500">HD Virtual Consultation</div>
            </div>
          </button>

          <button
            onClick={() => openChat("I want to send my medical enquiry via email.")}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-[#2ECDC5] hover:shadow-lg transition-all flex items-center gap-3 group text-left rtl:text-right"
          >
            <div className="w-11 h-11 rounded-xl bg-[#2ECDC5]/10 text-[#1DA89F] flex items-center justify-center group-hover:bg-[#2ECDC5] group-hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-[#2ECDC5]">
                {t.support.emailDesk}
              </div>
              <div className="text-[11px] text-slate-500">care@vedara.health</div>
            </div>
          </button>
        </div>

        {/* Global Desks Grid */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-extrabold text-slate-900">
              Regional International Desks
            </h3>
            <span className="text-xs text-slate-500 font-semibold">
              Localized timezone support & native languages
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {GLOBAL_DESKS.map((desk) => (
              <button
                key={desk.code}
                onClick={() => setSelectedDesk(desk)}
                className={`p-4 rounded-2xl border text-left rtl:text-right transition-all flex flex-col justify-between ${
                  selectedDesk.code === desk.code
                    ? "bg-[#3F4EB4]/10 border-[#3F4EB4] ring-2 ring-[#3F4EB4]/20"
                    : "bg-slate-50/70 border-slate-200/80 hover:bg-slate-100"
                }`}
              >
                <div>
                  <div className="text-2xl mb-2">{desk.flag}</div>
                  <div className="text-xs font-extrabold text-slate-900">
                    {language === "ar" ? desk.countryAr : desk.country}
                  </div>
                  <div className="text-[10px] text-slate-500">{desk.city}</div>
                </div>

                <div className="pt-3 mt-2 border-t border-slate-200/80 text-[10px] font-bold text-[#3F4EB4]">
                  {desk.phone}
                </div>
              </button>
            ))}
          </div>

          {/* Selected Desk Detail Banner */}
          <div className="mt-6 p-4 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{selectedDesk.flag}</span>
              <div>
                <span className="font-bold text-[#2ECDC5]">
                  {selectedDesk.country} Coordination Officer: {selectedDesk.coordinator}
                </span>
                <span className="block text-[11px] text-slate-300">
                  Operating Timezone: {selectedDesk.timeZone} · Direct WhatsApp: {selectedDesk.whatsapp}
                </span>
              </div>
            </div>

            <button
              onClick={() => openChat(`Connecting with ${selectedDesk.country} desk (${selectedDesk.coordinator})`)}
              className="px-5 py-2.5 bg-[#2ECDC5] hover:bg-[#283593] hover:text-white text-slate-950 font-extrabold rounded-xl shrink-0 transition-colors shadow-md"
            >
              Connect to {selectedDesk.code} Desk
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
