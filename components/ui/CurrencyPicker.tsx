"use client";

import React, { useState, useRef, useEffect } from "react";
import { useCare } from "@/context/CareContext";
import { Currency } from "@/data/translations";
import { DollarSign, ChevronDown, Check } from "lucide-react";

const CURRENCIES: { code: Currency; label: string; flag: string }[] = [
  { code: "GBP", label: "GBP (£)", flag: "🇬🇧" },
  { code: "CAD", label: "CAD ($)", flag: "🇨🇦" },
  { code: "AUD", label: "AUD ($)", flag: "🇦🇺" },
  { code: "AED", label: "AED (د.إ)", flag: "🇦🇪" },
  { code: "SAR", label: "SAR (ر.س)", flag: "🇸🇦" },
  { code: "QAR", label: "QAR (ر.ق)", flag: "🇶🇦" },
  { code: "OMR", label: "OMR (ر.ع)", flag: "🇴🇲" },
  { code: "USD", label: "USD ($)", flag: "🇺🇸" },
  { code: "EUR", label: "EUR (€)", flag: "🇪🇺" },
  { code: "INR", label: "INR (₹)", flag: "🇮🇳" },
];

export const CurrencyPicker: React.FC<{ lightMode?: boolean }> = ({ lightMode = false }) => {
  const { currency, setCurrency } = useCare();
  const [isOpen, setIsOpen] = useState(false);
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

  const active = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all border ${lightMode
            ? "bg-white/10 text-white border-white/20 hover:bg-white/20"
            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
          }`}
        aria-label="Select Currency"
      >
        <span>{active.flag}</span>
        <span>{active.code}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 origin-top-right rounded-xl bg-white shadow-xl ring-1 ring-black/5 focus:outline-none z-50 py-1.5 border border-slate-100 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Select Currency
          </div>
          {CURRENCIES.map((c) => (
            <button
              key={c.code}
              onClick={() => {
                setCurrency(c.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${currency === c.code
                  ? "bg-teal-50 text-teal-900 font-semibold"
                  : "text-slate-700 hover:bg-slate-50"
                }`}
            >
              <div className="flex items-center gap-2">
                <span>{c.flag}</span>
                <span>{c.label}</span>
              </div>
              {currency === c.code && <Check className="w-3.5 h-3.5 text-teal-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
