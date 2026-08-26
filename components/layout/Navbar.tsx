"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useCare } from "@/context/CareContext";
import { LanguageCountryPicker } from "@/components/ui/LanguageCountryPicker";
import {
  Globe,
  Sparkles,
  Menu,
  X,
  ChevronDown,
  Calculator,
  UserCheck,
  Stethoscope,
  HeartHandshake,
  Compass,
  HelpCircle,
  ShieldCheck,
} from "lucide-react";

export const Navbar = () => {
  const { language, t, openIntake } = useCare();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const exploreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close explore dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (exploreRef.current && !exploreRef.current.contains(e.target as Node)) {
        setExploreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const exploreLinks = [
    {
      title: t.nav.costGuide,
      description: "Treatment cost guide & 70% savings breakdown",
      href: "#costs",
      icon: Calculator,
      badge: t.nav.saveBadge,
    },
    {
      title: t.nav.patientStories,
      description: "Real patient outcomes & video journeys",
      href: "#stories",
      icon: HeartHandshake,
      badge: "Verified",
    },
    {
      title: t.nav.aboutIndia,
      description: "JCI accreditation, savings & infrastructure",
      href: "#why-india",
      icon: Compass,
      badge: "JCI / NABH",
    },
    {
      title: t.nav.support247,
      description: "Visa invitation, airport transfer & VIP care",
      href: "#support",
      icon: ShieldCheck,
      badge: "24/7 Desk",
    },
    {
      title: t.nav.faqNav,
      description: "Common questions, planning & preparation",
      href: "#faq",
      icon: HelpCircle,
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled
        ? "bg-[#071321]/95 backdrop-blur-xl shadow-xl shadow-slate-950/30 py-2.5 border-b border-slate-800/80 text-white"
        : "bg-gradient-to-b from-slate-950/85 via-slate-950/40 to-transparent py-4 text-white"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          {/* 01. Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#3F4EB4] via-[#283593] to-slate-900 flex items-center justify-center shadow-lg shadow-[#283593]/30 ring-1 ring-[#2ECDC5]/40 group-hover:scale-105 transition-transform">
              <span className="text-white font-black text-lg font-serif">V</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 leading-tight">
                <span className="font-extrabold tracking-widest text-base sm:text-lg text-white group-hover:text-[#2ECDC5] transition-colors">
                  {t.nav.brandName}
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#2ECDC5] animate-pulse"></span>
              </div>
              <span className="text-[9px] sm:text-[10px] uppercase font-semibold tracking-wider text-[#2ECDC5]/80 leading-none">
                {t.nav.brandSub}
              </span>
            </div>
          </Link>

          {/* 02. Clean Highlighted Navigation */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-4">
            {/* Treatments Link */}
            <a
              href="#treatments"
              className="px-3.5 py-1.5 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-white/10 transition-all whitespace-nowrap"
            >
              {t.nav.treatments}
            </a>

            {/* Doctors & Hospitals Link */}
            <a
              href="#doctors"
              className="px-3.5 py-1.5 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-white/10 transition-all whitespace-nowrap"
            >
              {t.nav.doctorsHospitals}
            </a>

            {/* How It Works Link */}
            <a
              href="#journey"
              className="px-3.5 py-1.5 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-white/10 transition-all whitespace-nowrap"
            >
              {t.nav.howItWorks}
            </a>

            {/* Explore Dropdown */}
            <div
              className="relative"
              ref={exploreRef}
              onMouseEnter={() => setExploreOpen(true)}
              onMouseLeave={() => setExploreOpen(false)}
            >
              <button
                onClick={() => setExploreOpen(!exploreOpen)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${exploreOpen
                  ? "text-white bg-white/15"
                  : "text-slate-200 hover:text-white hover:bg-white/10"
                  }`}
                aria-expanded={exploreOpen}
              >
                <span>{t.nav.explore}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${exploreOpen ? "rotate-180 text-[#2ECDC5]" : "text-slate-400"
                    }`}
                />
              </button>

              {/* Dropdown Panel */}
              {exploreOpen && (
                <div className="absolute top-full left-0 rtl:left-auto rtl:right-0 mt-2 w-72 rounded-2xl bg-[#0B192C]/95 backdrop-blur-2xl border border-slate-700/70 shadow-2xl shadow-slate-950/60 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="space-y-1">
                    {exploreLinks.map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <a
                          key={item.href}
                          href={item.href}
                          onClick={() => setExploreOpen(false)}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/10 transition-colors group text-left rtl:text-right"
                        >
                          <div className="p-2 rounded-lg bg-[#2ECDC5]/10 text-[#2ECDC5] border border-[#2ECDC5]/20 group-hover:bg-[#2ECDC5] group-hover:text-slate-950 transition-colors shrink-0">
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-xs font-semibold text-slate-100 group-hover:text-[#2ECDC5] transition-colors">
                                {item.title}
                              </span>
                              {item.badge && (
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-[#2ECDC5] border border-[#2ECDC5]/20 whitespace-nowrap">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-400 line-clamp-1 group-hover:text-slate-300">
                              {item.description}
                            </p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* 03. Right Action Utilities (Language + Primary CTA + Login at right end) */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            {/* Language & Country Picker */}
            <LanguageCountryPicker />

            {/* Primary Get Free Quote CTA */}
            <a
              href="/#assessment"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#2ECDC5] via-[#2ECDC5] to-[#2abdb5]  shadow-md shadow-[#283593]/30 hover:shadow-lg hover:shadow-[#283593]/40 hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap"
            >
              <span>{t.nav.startJourney}</span>
            </a>

            {/* Patient Portal / Login Direct Link (Right End) */}
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-white/20 hover:text-white border border-white/15 shadow-xs transition-all whitespace-nowrap"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#2ECDC5]" />
              <span>Login</span>
            </Link>
          </div>

          {/* 04. Mobile Navigation Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageCountryPicker compact={true} />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/10"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 05. Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#071321]/98 backdrop-blur-2xl border-b border-slate-800 px-4 pt-3 pb-6 text-white space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-[#2ECDC5] animate-pulse"></span>
              <span>24/7 International Desk</span>
            </div>
            <LanguageCountryPicker />
          </div>

          {/* Primary Quick Links */}
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-bold col-span-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#2ECDC5]" />
              <span>Login / Patient Portal</span>
            </Link>
            <a
              href="#treatments"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 text-xs font-semibold hover:border-[#3F4EB4]/40"
            >
              <Stethoscope className="w-4 h-4 text-[#2ECDC5]" />
              <span>{t.nav.treatments}</span>
            </a>
            <a
              href="#doctors"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 text-xs font-semibold hover:border-[#3F4EB4]/40"
            >
              <UserCheck className="w-4 h-4 text-[#2ECDC5]" />
              <span>{t.nav.doctorsHospitals}</span>
            </a>
            <a
              href="#journey"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 text-xs font-semibold hover:border-[#3F4EB4]/40 col-span-2"
            >
              <Compass className="w-4 h-4 text-[#2ECDC5]" />
              <span>{t.nav.howItWorks}</span>
            </a>
          </div>

          {/* Explore Extra Links */}
          <div className="pt-1 border-t border-slate-800/80 space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1 mb-1.5">
              {t.nav.explore}
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {exploreLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-2.5 py-2 rounded-lg text-xs text-slate-300 hover:bg-white/5 hover:text-[#2ECDC5] transition-colors"
                >
                  {item.title}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Action CTA */}
          <div className="pt-2">
            <a
              href="/#assessment"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#2ECDC5] via-[#2ECDC5] to-[#2abdb5] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#283593]/40"
            >
              {/* <Sparkles className="w-4 h-4 text-amber-300" /> */}
              <span>{t.nav.startJourney}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
