"use client";

import React from "react";
import { CheckCircle2, ShieldCheck, HeartHandshake, Scale } from "lucide-react";

export const HowWeArePaid = () => {
  const points = [
    {
      icon: Scale,
      title: "Flat fee, not a commission",
      description:
        "You pay a transparent, fixed coordination fee for our team's end-to-end travel logistics, express medical visa, and 24/7 dedicated bedside concierge.",
    },
    {
      icon: ShieldCheck,
      title: "Disclosed upfront, in writing",
      description:
        "Every single cost is itemized in your written quote before you book a flight. No surprise add-ons, no hidden administration markups, and no currency spread fees.",
    },
    {
      icon: HeartHandshake,
      title: "Identical at every hospital",
      description:
        "Our fee is exactly identical regardless of which quaternary hospital or chief surgeon you choose. We have zero incentive to bias your clinical decisions.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-vedara-gold-muted font-bold text-xs uppercase tracking-widest mb-3">
            UNCOMPROMISING INTEGRITY
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-vedara-deep mb-4">
            How we&apos;re paid.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Most medical brokers take a secret 15–25% commission on your hospital bill.
            We believe that creates a dangerous conflict of interest. We do things differently.
          </p>
        </div>

        {/* 3 Unified Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 rounded-3xl p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-vedara-gold shadow-xs mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-3">
                    {pt.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {pt.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-2 text-xs font-bold text-vedara-deep">
                  <CheckCircle2 className="w-4 h-4 text-vedara-gold" />
                  <span>Guaranteed in writing</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance Banner */}
        <div className="bg-dark-1 rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-vedara-gold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-base sm:text-lg text-white">
                You pay the hospital directly for your clinical care.
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                No markups. No percentage of your treatment cost. Clean, independent patient advocacy.
              </p>
            </div>
          </div>

          <a
            href="#connect"
            className="shrink-0 px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10 text-white text-xs font-bold transition-colors"
          >
            Review our patient charter &rarr;
          </a>
        </div>

      </div>
    </section>
  );
};
