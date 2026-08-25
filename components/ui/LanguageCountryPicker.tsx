"use client";

import React, { useState, useRef, useEffect } from "react";
import { useCare } from "@/context/CareContext";
import { Language, CountryCode } from "@/data/translations";
import { Globe, ChevronDown, Check, Sparkles, MapPin } from "lucide-react";

export interface CountryInfo {
  code: CountryCode;
  shortName: string;
  name: string;
  nameAr: string;
  flag: string;
  currencyCode: string;
  currencySymbol: string;
  dialCode: string;
}

export const SUPPORTED_COUNTRIES: CountryInfo[] = [
  {
    code: "GB",
    shortName: "UK",
    name: "United Kingdom",
    nameAr: "المملكة المتحدة",
    flag: "🇬🇧",
    currencyCode: "GBP",
    currencySymbol: "£",
    dialCode: "+44",
  },
  {
    code: "CA",
    shortName: "Canada",
    name: "Canada",
    nameAr: "كندا",
    flag: "🇨🇦",
    currencyCode: "CAD",
    currencySymbol: "CA$",
    dialCode: "+1",
  },
  {
    code: "AU",
    shortName: "Australia",
    name: "Australia",
    nameAr: "أستراليا",
    flag: "🇦🇺",
    currencyCode: "AUD",
    currencySymbol: "A$",
    dialCode: "+61",
  },
  {
    code: "AE",
    shortName: "UAE",
    name: "United Arab Emirates",
    nameAr: "دولة الإمارات",
    flag: "🇦🇪",
    currencyCode: "AED",
    currencySymbol: "AED",
    dialCode: "+971",
  },
  {
    code: "SA",
    shortName: "Saudi Arabia",
    name: "Saudi Arabia",
    nameAr: "المملكة العربية السعودية",
    flag: "🇸🇦",
    currencyCode: "SAR",
    currencySymbol: "SAR",
    dialCode: "+966",
  },
  {
    code: "QA",
    shortName: "Qatar",
    name: "Qatar",
    nameAr: "دولة قطر",
    flag: "🇶🇦",
    currencyCode: "QAR",
    currencySymbol: "QAR",
    dialCode: "+974",
  },
  {
    code: "OM",
    shortName: "Oman",
    name: "Oman",
    nameAr: "سلطنة عمان",
    flag: "🇴🇲",
    currencyCode: "OMR",
    currencySymbol: "OMR",
    dialCode: "+968",
  },
];

interface LanguageCountryPickerProps {
  lightMode?: boolean;
  compact?: boolean;
  className?: string;
}

export const LanguageCountryPicker: React.FC<LanguageCountryPickerProps> = ({
  lightMode = false,
  compact = false,
  className = "",
}) => {
  const { language, setLanguage, country, setCountry } = useCare();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"language" | "country">("language");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentCountry =
    SUPPORTED_COUNTRIES.find((c) => c.code === country) || SUPPORTED_COUNTRIES[0];

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all border shadow-sm ${
          lightMode
            ? "bg-slate-100/90 text-slate-800 border-slate-200/90 hover:bg-slate-200/80"
            : "bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-teal-400/40"
        } ${isOpen ? "ring-2 ring-teal-400/40 border-teal-400" : ""}`}
        aria-label="Language and Country Selector"
        aria-expanded={isOpen}
      >
        <Globe className="w-3.5 h-3.5 text-teal-400 shrink-0" />
        <span className="font-bold tracking-wider">{language === "ar" ? "AR" : "EN"}</span>
        <ChevronDown
          className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-teal-400" : ""
          }`}
        />
      </button>

      {/* Glassmorphic Dropdown Panel */}
      {isOpen && (
        <div
          className={`absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-80 origin-top-right rounded-2xl shadow-2xl z-50 overflow-hidden border backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150 ${
            lightMode
              ? "bg-white/98 text-slate-900 border-slate-200 shadow-slate-900/15"
              : "bg-[#081729]/98 text-white border-slate-700/80 shadow-slate-950/70"
          }`}
        >
          {/* Header Tab Switcher */}
          <div
            className={`p-2 border-b grid grid-cols-2 gap-1 ${
              lightMode ? "bg-slate-50/80 border-slate-100" : "bg-slate-900/60 border-slate-800"
            }`}
          >
            <button
              onClick={() => setActiveTab("language")}
              className={`py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "language"
                  ? "bg-teal-500 text-slate-950 shadow-sm"
                  : lightMode
                  ? "text-slate-600 hover:bg-slate-200/60"
                  : "text-slate-300 hover:bg-white/10"
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === "ar" ? "اللغة" : "Language"}</span>
            </button>
            <button
              onClick={() => setActiveTab("country")}
              className={`py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "country"
                  ? "bg-teal-500 text-slate-950 shadow-sm"
                  : lightMode
                  ? "text-slate-600 hover:bg-slate-200/60"
                  : "text-slate-300 hover:bg-white/10"
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{language === "ar" ? "الدولة / العملة" : "Country / Currency"}</span>
            </button>
          </div>

          {/* Tab 1: Language Options */}
          {activeTab === "language" && (
            <div className="p-2 space-y-1.5">
              <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-400">
                {language === "ar" ? "اختر لغة العرض" : "Select Display Language"}
              </div>

              {/* English (Default) */}
              <button
                onClick={() => {
                  setLanguage("en");
                  setIsOpen(false);
                }}
                className={`w-full text-left rtl:text-right px-3 py-2.5 rounded-xl text-xs flex items-center justify-between transition-all group ${
                  language === "en"
                    ? lightMode
                      ? "bg-teal-50 text-teal-900 font-bold border border-teal-200"
                      : "bg-teal-500/15 text-teal-300 font-bold border border-teal-500/30"
                    : lightMode
                    ? "text-slate-700 hover:bg-slate-100"
                    : "text-slate-200 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">🌐</span>
                  <div>
                    <div className="font-bold flex items-center gap-1.5">
                      <span>English</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-semibold uppercase">
                        Default
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 block">International (EN)</span>
                  </div>
                </div>
                {language === "en" && <Check className="w-4 h-4 text-teal-400" />}
              </button>

              {/* Arabic */}
              <button
                onClick={() => {
                  setLanguage("ar");
                  setIsOpen(false);
                }}
                className={`w-full text-left rtl:text-right px-3 py-2.5 rounded-xl text-xs flex items-center justify-between transition-all group ${
                  language === "ar"
                    ? lightMode
                      ? "bg-teal-50 text-teal-900 font-bold border border-teal-200"
                      : "bg-teal-500/15 text-teal-300 font-bold border border-teal-500/30"
                    : lightMode
                    ? "text-slate-700 hover:bg-slate-100"
                    : "text-slate-200 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">🌐</span>
                  <div>
                    <div className="font-bold font-arabic">العربية</div>
                    <span className="text-[11px] text-slate-400 block">
                      Arabic · GCC & International
                    </span>
                  </div>
                </div>
                {language === "ar" && <Check className="w-4 h-4 text-teal-400" />}
              </button>
            </div>
          )}

          {/* Tab 2: Country Selection (The 7 target countries) */}
          {activeTab === "country" && (
            <div className="p-2 max-h-72 overflow-y-auto space-y-1">
              <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-400">
                {language === "ar" ? "الدول المعتمدة ومكاتب الدعم" : "Supported Patient Desks"}
              </div>

              {SUPPORTED_COUNTRIES.map((c) => {
                const isSelected = country === c.code;
                return (
                  <button
                    key={c.code}
                    onClick={() => {
                      setCountry(c.code);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left rtl:text-right px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all ${
                      isSelected
                        ? lightMode
                          ? "bg-teal-50 text-teal-900 font-bold border border-teal-200"
                          : "bg-teal-500/15 text-teal-300 font-bold border border-teal-500/30"
                        : lightMode
                        ? "text-slate-700 hover:bg-slate-100"
                        : "text-slate-200 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{c.flag}</span>
                      <div>
                        <div className="font-semibold flex items-center gap-1.5">
                          <span>{language === "ar" ? c.nameAr : c.name}</span>
                          <span className="text-[10px] text-slate-400">({c.shortName})</span>
                        </div>
                        <span className="text-[10px] text-slate-400 block">
                          Currency: <span className="text-teal-400 font-mono font-bold">{c.currencyCode} ({c.currencySymbol})</span> · {c.dialCode}
                        </span>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-teal-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* Dropdown Footer info */}
          <div
            className={`px-3 py-2 border-t text-[10px] flex items-center justify-between ${
              lightMode ? "bg-slate-50 text-slate-500 border-slate-100" : "bg-slate-900/80 text-slate-400 border-slate-800"
            }`}
          >
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-teal-400" />
              <span>7 International Hubs</span>
            </span>
            <span className="font-mono text-teal-400 font-bold">24/7 Concierge</span>
          </div>
        </div>
      )}
    </div>
  );
};
