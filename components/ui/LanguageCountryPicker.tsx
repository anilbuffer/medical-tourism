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
        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all border shadow-sm cursor-pointer ${lightMode
          ? "bg-slate-100 text-slate-900 border-slate-300 hover:bg-slate-200"
          : "bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/30"
          } ${isOpen ? "ring-2 ring-[#F0A126] border-[#F0A126]" : ""}`}
        aria-label="Language and Country Selector"
        aria-expanded={isOpen}
      >
        <Globe className="w-3.5 h-3.5 text-[#F0A126] shrink-0" />
        <span className="font-extrabold tracking-wider text-white">
          {language === "ar" ? "العربية (AR)" : "EN"}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-white/70 transition-transform duration-200 ${isOpen ? "rotate-180 text-[#F0A126]" : ""
            }`}
        />
      </button>

      {/* Solid High-Contrast Dropdown Panel */}
      {isOpen && (
        <div
          className={`absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-96 origin-top-right rounded-2xl shadow-2xl z-50 overflow-hidden border animate-in fade-in zoom-in-95 duration-150 ${lightMode
            ? "bg-white text-slate-900 border-slate-200 shadow-slate-900/25"
            : "bg-[#0C2338] text-white border-white/20 shadow-2xl shadow-black ring-1 ring-white/10"
            }`}
        >
          {/* Header Tab Switcher */}
          <div
            className={`p-2 border-b grid grid-cols-2 gap-1.5 ${lightMode ? "bg-slate-100 border-slate-200" : "bg-[#081827] border-white/10"
              }`}
          >
            <button
              onClick={() => setActiveTab("language")}
              className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${activeTab === "language"
                ? "bg-[#F0A126] text-[#0C2338] font-extrabold shadow-md"
                : lightMode
                  ? "text-slate-700 hover:bg-slate-200 font-semibold"
                  : "text-slate-300 hover:text-white hover:bg-white/10 font-semibold"
                }`}
            >
              <Globe className="w-4 h-4" />
              <span>{language === "ar" ? "اللغة" : "Language"}</span>
            </button>
            <button
              onClick={() => setActiveTab("country")}
              className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${activeTab === "country"
                ? "bg-[#F0A126] text-[#0C2338] font-extrabold shadow-md"
                : lightMode
                  ? "text-slate-700 hover:bg-slate-200 font-semibold"
                  : "text-slate-300 hover:text-white hover:bg-white/10 font-semibold"
                }`}
            >
              <MapPin className="w-4 h-4" />
              <span>{language === "ar" ? "الدولة والعملة" : "Country / Currency"}</span>
            </button>
          </div>

          {/* Tab 1: Language Options */}
          {activeTab === "language" && (
            <div className="p-3 space-y-2 bg-[#0C2338]">
              <div className="px-2 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#F0A126]">
                {language === "ar" ? "اختر لغة العرض" : "Select Display Language"}
              </div>

              {/* English (Default) */}
              <button
                onClick={() => {
                  setLanguage("en");
                  setIsOpen(false);
                }}
                className={`w-full text-left rtl:text-right px-3.5 py-3 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer group ${language === "en"
                  ? "bg-white/10 text-white font-bold border-2 border-[#F0A126] shadow-md"
                  : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${language === "en" ? "bg-[#F0A126] text-[#0C2338]" : "bg-white/15 text-white"
                    }`}>
                    EN
                  </div>
                  <div>
                    <div className="font-extrabold text-sm text-white flex items-center gap-2">
                      <span>English</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold uppercase border border-emerald-400/30">
                        Default
                      </span>
                    </div>
                    <span className="text-xs text-slate-200 block mt-0.5 font-medium">
                      International (EN)
                    </span>
                  </div>
                </div>
                {language === "en" && (
                  <div className="w-5 h-5 rounded-full bg-[#F0A126] text-[#0C2338] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </button>

              {/* Arabic */}
              <button
                onClick={() => {
                  setLanguage("ar");
                  setIsOpen(false);
                }}
                className={`w-full text-left rtl:text-right px-3.5 py-3 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer group ${language === "ar"
                  ? "bg-white/10 text-white font-bold border-2 border-[#F0A126] shadow-md"
                  : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${language === "ar" ? "bg-[#F0A126] text-[#0C2338]" : "bg-white/15 text-white"
                    }`}>
                    AR
                  </div>
                  <div>
                    <div className="font-extrabold text-sm text-white font-arabic">
                      العربية (Arabic)
                    </div>
                    <span className="text-xs text-slate-200 block mt-0.5 font-medium">
                      GCC & International · الدعم الكامل
                    </span>
                  </div>
                </div>
                {language === "ar" && (
                  <div className="w-5 h-5 rounded-full bg-[#F0A126] text-[#0C2338] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </button>
            </div>
          )}

          {/* Tab 2: Country Selection (The 7 target countries) */}
          {activeTab === "country" && (
            <div className="p-3 max-h-80 overflow-y-auto space-y-1.5 bg-[#0C2338]">
              <div className="px-2 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#F0A126]">
                {language === "ar" ? "الدول المعتمدة ومكاتب الدعم" : "Supported Patient Desks & Currency"}
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
                    className={`w-full text-left rtl:text-right px-3.5 py-2.5 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${isSelected
                      ? "bg-white/10 text-white font-bold border-2 border-[#F0A126]"
                      : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl shrink-0">{c.flag}</span>
                      <div>
                        <div className="font-bold text-white flex items-center gap-1.5 text-sm">
                          <span>{language === "ar" ? c.nameAr : c.name}</span>
                          <span className="text-xs text-slate-300 font-normal">({c.shortName})</span>
                        </div>
                        <span className="text-[11px] text-slate-300 block mt-0.5">
                          Currency: <span className="text-[#F0A126] font-mono font-bold">{c.currencyCode} ({c.currencySymbol})</span> · {c.dialCode}
                        </span>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-[#F0A126] text-[#0C2338] flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Dropdown Footer Info */}
          <div
            className={`px-4 py-2.5 border-t text-[11px] font-semibold flex items-center justify-between ${lightMode ? "bg-slate-100 text-slate-700 border-slate-200" : "bg-[#081827] text-slate-200 border-white/10"
              }`}
          >
            <span className="flex items-center gap-1.5 text-slate-200">
              <Sparkles className="w-3.5 h-3.5 text-[#F0A126]" />
              <span>7 International Desks</span>
            </span>
            <span className="font-mono text-[#F0A126] font-bold">24/7 Live Concierge</span>
          </div>
        </div>
      )}
    </div>
  );
};
