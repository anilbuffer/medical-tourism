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
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-teal-800"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            <span>Back to Main Overview</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-[#0B1E33] text-white rounded-3xl p-8 sm:p-12 mb-10 shadow-xl border border-slate-800">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2ECDC5]/10 border border-[#2ECDC5]/30 text-[#2ECDC5] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Transparent Medical Packages</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Treatments & Cost Transparency Guide
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore indicative pricing, hospital stay lengths, recovery expectations, and global savings across India's top quaternary medical institutes.
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
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Specialty Filter */}
          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <span className="text-xs font-bold text-slate-500 shrink-0">Specialty:</span>
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500"
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
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 hover:border-teal-400 shadow-card hover:shadow-luxury-hover transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: Info */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#3F4EB4]/10 text-[#3F4EB4] text-xs font-bold">
                      {language === "ar" ? item.specialtyAr : item.specialty}
                    </span>
                    {item.popular && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-extrabold">
                        High Demand
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-extrabold text-slate-900">
                    {language === "ar" ? item.nameAr : item.name}
                  </h3>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div className="text-slate-500">Typical In-Hospital Stay</div>
                      <div className="font-extrabold text-slate-900 mt-0.5">{item.typicalStayDays}</div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div className="text-slate-500">Recovery Timeline</div>
                      <div className="font-extrabold text-slate-900 mt-0.5">{item.recoveryWeeks}</div>
                    </div>
                  </div>

                  {/* Inclusions */}
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Package Highlights
                    </div>
                    <ul className="space-y-1.5">
                      {(language === "ar" ? item.inclusionsAr : item.inclusions).slice(0, 3).map((inc, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2ECDC5] shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right: Comparative Cost Box & Action */}
                <div className="lg:col-span-6 bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-bold text-[#2ECDC5] uppercase tracking-wider">
                        Indicative India Package
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-[#2ECDC5] font-sans mt-0.5">
                        {formatPriceRange(item.indiaCostUsd.min, item.indiaCostUsd.max)}
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-bold flex items-center gap-1">
                      <TrendingDown className="w-3.5 h-3.5" />
                      <span>70%+ Savings</span>
                    </div>
                  </div>

                  {/* Quick Comparative Row */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-white/5 p-2 rounded-lg">
                      <div className="text-[10px] text-slate-400">US Estimate</div>
                      <div className="font-bold text-slate-200 mt-0.5">{formatPrice(item.usCostUsd.min)}</div>
                    </div>
                    <div className="bg-white/5 p-2 rounded-lg">
                      <div className="text-[10px] text-slate-400">UK Estimate</div>
                      <div className="font-bold text-slate-200 mt-0.5">{formatPrice(item.ukCostUsd.min)}</div>
                    </div>
                    <div className="bg-white/5 p-2 rounded-lg">
                      <div className="text-[10px] text-slate-400">UAE Estimate</div>
                      <div className="font-bold text-slate-200 mt-0.5">{formatPrice(item.uaeCostUsd.min)}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => openIntake(item.name)}
                    className="w-full py-3.5  bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] text-white font-extrabold text-xs rounded-xl shadow-lg shadow-[#283593]/20 transition-all flex items-center justify-center gap-2"
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
