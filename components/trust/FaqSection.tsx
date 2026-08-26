"use client";

import React, { useState } from "react";
import { useCare } from "@/context/CareContext";
import { FAQ_LIST, FAQItem } from "@/data/mockData";
import {
  ChevronDown,
  Search,
  Sparkles,
  HelpCircle,
  MessageSquare,
} from "lucide-react";

export const FaqSection = () => {
  const { t, language, openChat } = useCare();
  const [searchQuery, setSearchQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(FAQ_LIST[0].id);

  const filteredFaqs = FAQ_LIST.filter((item) => {
    const q = language === "ar" ? item.questionAr : item.question;
    const a = language === "ar" ? item.answerAr : item.answer;
    const term = searchQuery.toLowerCase();
    return q.toLowerCase().includes(term) || a.toLowerCase().includes(term);
  });

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/70 text-[#0D9488] text-xs font-bold uppercase tracking-wider mb-3">
            {t.faq.eyebrow}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {t.faq.heading}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500 leading-relaxed max-w-2xl mx-auto">
            {t.faq.subheading}
          </p>

          {/* Search Box */}
          <div className="mt-8 relative max-w-xl mx-auto">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 rtl:left-auto rtl:right-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.faq.searchPlaceholder}
              className="w-full pl-12 pr-4 rtl:pl-4 rtl:pr-12 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2ECDC5] focus:bg-white transition-all shadow-sm"
            />
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${isOpen
                  ? "bg-slate-50/80 border-[#2ECDC5] shadow-md ring-1 ring-[#2ECDC5]/20"
                  : "bg-white border-slate-200/80 hover:border-teal-300"
                  }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left rtl:text-right p-5 sm:p-6 flex items-center justify-between gap-4 font-extrabold text-sm sm:text-base text-slate-900 cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? "text-teal-600" : "text-slate-400"}`} />
                    <span>{language === "ar" ? faq.questionAr : faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-teal-600" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100/60 animate-in fade-in duration-200">
                    <p>{language === "ar" ? faq.answerAr : faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-12 p-6 rounded-2xl bg-teal-50 border border-teal-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left rtl:sm:text-right">
          <div>
            <h4 className="text-sm font-bold text-teal-950">Have a specific question about your condition?</h4>
            <p className="text-xs text-teal-700 mt-0.5">Our international care team is available 24/7 on WhatsApp & Chat.</p>
          </div>
          <button
            onClick={() => openChat("I have a question about planning my medical travel.")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-[#2ECDC5] via-[#5EEAD4] to-[#2ECDC5] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm shrink-0 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat with Care Coordinator</span>
          </button>
        </div>
      </div>
    </section>
  );
};
