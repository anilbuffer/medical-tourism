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
    <section id="faqs" className="py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#2ECDC5] mb-2">
            {t.faq.eyebrow}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3851A2] tracking-tight leading-tight">
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
                  : "bg-white border-slate-200/80 hover:border-slate-300"
                  }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left rtl:text-right p-5 sm:p-6 flex items-center justify-between gap-4 font-extrabold text-sm sm:text-base text-slate-900"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? "text-[#3F4EB4]" : "text-slate-400"}`} />
                    <span>{language === "ar" ? faq.questionAr : faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#3F4EB4]" : ""
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
        <div className="mt-12 p-6 rounded-2xl bg-[#3F4EB4]/10 border border-[#3F4EB4]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left rtl:sm:text-right">
          <div>
            <h4 className="text-sm font-bold text-[#283593]">Have a specific question about your condition?</h4>
            <p className="text-xs text-[#3F4EB4] mt-0.5">Our international care team is available 24/7 on WhatsApp & Chat.</p>
          </div>
          <button
            onClick={() => openChat()}
            className="px-5 py-2.5 rounded-xl bg-[#3F4EB4] hover:bg-[#283593] text-white text-xs font-bold shadow-md transition-all shrink-0 flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Ask a Coordinator</span>
          </button>
        </div>
      </div>
    </section>
  );
};
