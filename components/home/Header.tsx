"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCare } from "@/context/CareContext";
import { LanguageCountryPicker } from "@/components/ui/LanguageCountryPicker";
import { Button } from "@/components/ui/button";
import { Globe, Menu, X, PhoneCall } from "lucide-react";

export const Header = () => {
  const { t, openIntake } = useCare();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E4E9ED]" : "bg-white"}`}>
      {/* Top Country Bar - Highlighted */}
      <div className="hidden lg:flex items-center justify-center gap-6 py-2.5 bg-[#0C2338] text-white text-xs">
        <div className="flex items-center gap-2 font-medium">
          <Globe className="w-4 h-4 text-[#0B5D68]" />
          <span>Where are you coming from?</span>
        </div>
        <div className="flex items-center gap-4 font-medium">
           <button className="px-3 py-1 bg-white/20 rounded-full transition-colors font-bold">Kenya</button>
           <button className="hover:bg-white/10 px-3 py-1 rounded-full transition-colors">Nigeria</button>
           <button className="hover:bg-white/10 px-3 py-1 rounded-full transition-colors">Tanzania</button>
           <button className="hover:bg-white/10 px-3 py-1 rounded-full transition-colors">Ethiopia</button>
           <button className="hover:bg-white/10 px-3 py-1 rounded-full transition-colors">Bangladesh</button>
           <button className="hover:bg-white/10 px-3 py-1 rounded-full transition-colors">UAE & Gulf</button>
           <button className="hover:bg-white/10 px-3 py-1 rounded-full transition-colors">Uzbekistan</button>
           <button className="hover:bg-white/10 px-3 py-1 rounded-full transition-colors">UK</button>
           <button className="hover:bg-white/10 px-3 py-1 rounded-full transition-colors">Australia</button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-6">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0B5D68] flex items-center justify-center shadow-md transition-transform">
              <span className="text-white font-black text-lg font-serif">Y</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold tracking-widest text-base sm:text-lg text-[#0C2338]">
                Your Medicare Trip
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-4">
            <a href="#treatments" className="px-3.5 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:text-[#0B5D68] hover:bg-slate-50 transition-all">
              Treatments
            </a>
            <a href="#doctors" className="px-3.5 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:text-[#0B5D68] hover:bg-slate-50 transition-all">
              Doctors
            </a>
            <a href="#hospitals" className="px-3.5 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:text-[#0B5D68] hover:bg-slate-50 transition-all">
              Hospitals
            </a>
            <a href="#journey" className="px-3.5 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:text-[#0B5D68] hover:bg-slate-50 transition-all">
              How It Works
            </a>
          </nav>

          {/* Right Action Utilities */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <button
              onClick={() => openIntake("Book an Appointment")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm bg-[#0B5D68] hover:bg-[#0C2338] text-white transition-colors cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Book an Appointment</span>
            </button>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#0B5D68] hover:bg-slate-50 transition-colors border border-[#DCE6EB]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#DCE6EB] px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-2">
           <div className="flex flex-col gap-2">
             <a href="#treatments" onClick={() => setMobileMenuOpen(false)} className="p-3 rounded-lg bg-slate-50 text-[#0B5D68] font-bold">Treatments</a>
             <a href="#doctors" onClick={() => setMobileMenuOpen(false)} className="p-3 rounded-lg bg-slate-50 text-[#0B5D68] font-bold">Doctors & Hospitals</a>
             <a href="#journey" onClick={() => setMobileMenuOpen(false)} className="p-3 rounded-lg bg-slate-50 text-[#0B5D68] font-bold">How It Works</a>
           </div>
        </div>
      )}
    </header>
  );
};

