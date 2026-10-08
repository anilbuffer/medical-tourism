"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCare } from "@/context/CareContext";
import { TREATMENT_COSTS, TreatmentCost } from "@/data/mockData";
import { CurrencyPicker } from "@/components/ui/CurrencyPicker";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Calendar,
  Search,
  Filter,
  ArrowLeft,
  DollarSign,
  TrendingDown,
} from "lucide-react";

export default function TreatmentsPage() {
  const { t, language, formatPrice, formatPriceRange, openIntake } = useCare();
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Dental Implants",
    "Cosmetic & Aesthetic",
    "Ophthalmology / Eye Care",
    "Orthopedic Procedures",
    "Fertility / IVF",
  ];

  const filtered = TREATMENT_COSTS.filter((tItem) => {
    const matchesCategory = selectedSpecialty === "All" || tItem.specialty === selectedSpecialty;
    const matchesSearch = tItem.name.toLowerCase().includes(searchQuery.toLowerCase()) || tItem.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Back */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0b5d63] hover:text-[#04272a] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            <span>Back to Main Overview</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="bg-gradient-to-br from-[#04272a] via-[#0b5d63] to-[#073c40] text-white rounded-3xl p-8 sm:p-12 mb-10 shadow-xl border border-[#0b5d63]/40">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-[#e39b2d]/40 text-[#e39b2d] text-xs font-bold uppercase tracking-wider backdrop-blur-md font-heading">
              <Sparkles className="w-3.5 h-3.5 text-[#e39b2d]" />
              <span>Verified Hospital Pricing Guide</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-heading">
              Popular Treatments & Cost Estimates
            </h1>
            <p className="text-sm sm:text-base text-teal-100/90 leading-relaxed font-body">
              Explore comprehensive treatment packages, hospital stay durations, and recovery timelines across leading accredited medical centers in India.
            </p>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search treatments (e.g. bypass, knee, IVF)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0b5d63]"
            />
          </div>

          {/* Specialty Filter */}
          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <span className="text-xs font-bold text-slate-500 shrink-0 font-heading">Specialty:</span>
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-[#0b5d63]"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <div className="border-l border-slate-200 pl-3 shrink-0">
              <CurrencyPicker />
            </div>
          </div>
        </div>

        {/* Treatments List */}
        <div className="space-y-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 hover:border-[#0b5d63]/40 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: Info */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#0b5d63]/10 text-[#0b5d63] text-xs font-bold">
                      {language === "ar" ? item.specialtyAr : item.specialty}
                    </span>
                    {item.popular && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-extrabold font-heading">
                        High Demand
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-extrabold text-slate-900 font-heading">
                    {language === "ar" ? item.nameAr : item.name}
                  </h3>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div className="text-slate-500 font-medium">Typical In-Hospital Stay</div>
                      <div className="font-extrabold text-slate-900 mt-0.5 font-heading text-sm">{item.typicalStayDays}</div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div className="text-slate-500 font-medium">Recovery Timeline</div>
                      <div className="font-extrabold text-slate-900 mt-0.5 font-heading text-sm">{item.recoveryWeeks}</div>
                    </div>
                  </div>

                  {/* Inclusions */}
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 font-heading">
                      Package Highlights
                    </div>
                    <ul className="space-y-1.5">
                      {(language === "ar" ? item.inclusionsAr : item.inclusions).slice(0, 3).map((inc, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0b5d63] shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right: Comparative Cost Box & Action */}
                <div className="lg:col-span-6 bg-gradient-to-br from-[#04272a] via-[#07383c] to-[#0b5d63] text-white rounded-2xl p-6 border border-[#0b5d63]/50 shadow-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-bold text-[#e39b2d] uppercase tracking-wider font-heading">
                        Indicative India Package
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-[#e39b2d] font-heading mt-0.5">
                        {formatPriceRange(item.indiaCostUsd.min, item.indiaCostUsd.max)}
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-[#e39b2d]/20 text-[#e39b2d] border border-[#e39b2d]/30 rounded-full text-xs font-bold flex items-center gap-1 font-heading">
                      <TrendingDown className="w-3.5 h-3.5 text-[#e39b2d]" />
                      <span>70%+ Savings</span>
                    </div>
                  </div>

                  {/* Quick Comparative Row */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                      <div className="text-[10px] text-teal-200/70">US Estimate</div>
                      <div className="font-bold text-slate-100 mt-0.5 font-heading">{formatPrice(item.usCostUsd.min)}</div>
                    </div>
                    <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                      <div className="text-[10px] text-teal-200/70">UK Estimate</div>
                      <div className="font-bold text-slate-100 mt-0.5 font-heading">{formatPrice(item.ukCostUsd.min)}</div>
                    </div>
                    <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                      <div className="text-[10px] text-teal-200/70">UAE Estimate</div>
                      <div className="font-bold text-slate-100 mt-0.5 font-heading">{formatPrice(item.uaeCostUsd.min)}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => openIntake(item.name)}
                    className="w-full py-3.5 bg-gradient-to-r from-[#e39b2d] to-[#c7821e] hover:from-[#c7821e] hover:to-[#a35f0b] text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-[#e39b2d]/25 transition-all flex items-center justify-center gap-2 font-heading uppercase tracking-wider"
                  >
                    <span>Request Exact Hospital Quotation</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
