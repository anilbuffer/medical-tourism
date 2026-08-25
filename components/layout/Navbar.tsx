"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCare } from "@/context/CareContext";
import { CurrencyPicker } from "@/components/ui/CurrencyPicker";
import {
  Globe,
  PhoneCall,
  MessageSquare,
  Sparkles,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
  Stethoscope,
} from "lucide-react";

export const Navbar = () => {
  const { language, toggleLanguage, t, openIntake, openChat } = useCare();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: t.nav.treatments, href: "#treatments" },
    { label: t.nav.specialties, href: "#specialties" },
    { label: t.nav.doctors, href: "#doctors" },
    { label: t.nav.hospitals, href: "#hospitals" },
    { label: t.nav.howItWorks, href: "#journey" },
    { label: t.nav.costGuide, href: "#costs" },
    { label: t.nav.patientStories, href: "#stories" },
    { label: t.nav.aboutIndia, href: "#why-india" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-slate-200/80"
          : "bg-gradient-to-b from-slate-950/70 via-slate-950/40 to-transparent py-4"
      }`}
    >
      {/* Top Utility Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-600 via-teal-700 to-slate-900 flex items-center justify-center shadow-lg shadow-teal-900/20 ring-1 ring-teal-400/30 group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-lg tracking-wider font-serif">V</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span
                  className={`font-extrabold tracking-widest text-lg transition-colors ${
                    scrolled ? "text-slate-900" : "text-white"
                  }`}
                >
                  {t.nav.brandName}
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></span>
              </div>
              <span
                className={`text-[10px] uppercase font-semibold tracking-wider ${
                  scrolled ? "text-teal-700" : "text-teal-300"
                }`}
              >
                {t.nav.brandSub}
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-teal-500 ${
                  scrolled ? "text-slate-700" : "text-slate-200"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Utilities */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Currency Picker */}
            <CurrencyPicker lightMode={!scrolled} />

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all border ${
                scrolled
                  ? "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  : "bg-white/10 text-white border-white/20 hover:bg-white/20"
              }`}
              title="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-teal-400" />
              <span>{language === "en" ? "العربية" : "English"}</span>
            </button>

            {/* Secondary Coordinator Chat CTA */}
            <button
              onClick={() => openChat()}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
                scrolled
                  ? "bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200"
                  : "bg-white/10 text-white border-white/20 hover:bg-white/20"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-teal-400" />
              <span>{t.nav.talkCoordinator}</span>
            </button>

            {/* Primary Care Journey CTA */}
            <button
              onClick={() => openIntake()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-600 shadow-md shadow-teal-700/25 hover:shadow-lg hover:shadow-teal-600/35 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{t.nav.startJourney}</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleLanguage}
              className={`px-2 py-1 rounded text-xs font-semibold ${
                scrolled ? "bg-slate-100 text-slate-700" : "bg-white/10 text-white"
              }`}
            >
              {language === "en" ? "العربية" : "EN"}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                scrolled ? "text-slate-800 hover:bg-slate-100" : "text-white hover:bg-white/10"
              }`}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 text-white space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>24/7 International Care Desk</span>
            </div>
            <CurrencyPicker lightMode={true} />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-slate-800 hover:text-teal-400 font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openIntake();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-teal-900/30"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{t.nav.startJourney}</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openChat();
              }}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm flex items-center justify-center gap-2 border border-slate-700"
            >
              <MessageSquare className="w-4 h-4 text-teal-400" />
              <span>{t.nav.talkCoordinator}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
