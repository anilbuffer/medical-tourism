"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCare } from "@/context/CareContext";
import { LanguageCountryPicker } from "@/components/ui/LanguageCountryPicker";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  PhoneCall,
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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 font-sans ${scrolled
        ? "bg-[#04272a]/95 backdrop-blur-xl shadow-xl shadow-slate-950/40 border-b border-[#0b5d63]/40 text-white"
        : "bg-gradient-to-b from-[#04272a]/95 via-[#073f43]/85 to-transparent text-white"
        }`}
    >
      {/* Top International Patient Banner */}
      <div className="hidden lg:flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 border-b border-white/10 text-xs">
        <div className="flex items-center gap-2 font-medium text-slate-200">
          <Globe className="w-3.5 h-3.5 text-[#e39b2d]" />
          <span className="font-semibold text-slate-200">International Care Concierge:</span>
          <span className="text-slate-300">Direct Patient Coordination for India</span>
        </div>
        <div className="flex items-center gap-3 text-slate-300 font-medium text-[11px]">
           <span className="text-slate-400">Popular origins:</span>
           <span className="px-2.5 py-0.5 bg-[#e39b2d] text-slate-950 font-bold rounded-full">UK</span>
           <span className="px-2 py-0.5 bg-white/10 rounded-full hover:bg-white/20 cursor-pointer">Australia</span>
           <span className="px-2 py-0.5 bg-white/10 rounded-full hover:bg-white/20 cursor-pointer">Kenya</span>
           <span className="px-2 py-0.5 bg-white/10 rounded-full hover:bg-white/20 cursor-pointer">UAE & Gulf</span>
           <span className="px-2 py-0.5 bg-white/10 rounded-full hover:bg-white/20 cursor-pointer">Nigeria</span>
           <span className="px-2 py-0.5 bg-white/10 rounded-full hover:bg-white/20 cursor-pointer">Canada</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-6">
          {/* 01. Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <Image
              src="/images/logo/logo-white.png"
              alt="yourMedicareTrip - Your Medical Travel Company"
              width={220}
              height={44}
              className="h-9 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </Link>

          {/* 02. Clean Highlighted Navigation */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-4">
            {/* Treatments Link */}
            <a
              href="#treatments"
              className="px-3.5 py-1.5 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-white/10 transition-all whitespace-nowrap"
            >
              Treatments
            </a>

            {/* Doctors & Hospitals Link */}
            <a
              href="#doctors"
              className="px-3.5 py-1.5 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-white/10 transition-all whitespace-nowrap"
            >
              Doctors
            </a>
            <a
              href="#doctors"
              className="px-3.5 py-1.5 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-white/10 transition-all whitespace-nowrap"
            >
              Hospitals
            </a>

            {/* How It Works Link */}
            <a
              href="#journey"
              className="px-3.5 py-1.5 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-white/10 transition-all whitespace-nowrap"
            >
              How It Works
            </a>

            {/* Explore Dropdown */}
            <div
              className="relative"
              ref={exploreRef}
              onMouseEnter={() => setExploreOpen(true)}
            >
              <button
                onClick={() => setExploreOpen(!exploreOpen)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-white/10 transition-all cursor-pointer whitespace-nowrap"
                aria-expanded={exploreOpen}
              >
                <span>{t.nav.explore}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    exploreOpen ? "rotate-180 text-vedara-cyan" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {exploreOpen && (
                <div
                  onMouseLeave={() => setExploreOpen(false)}
                  className="absolute top-full left-0 mt-2 w-80 rounded-2xl bg-dark-4 border border-teal-500/40 shadow-2xl shadow-black ring-1 ring-white/10 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="space-y-1">
                    {exploreLinks.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <a
                          key={idx}
                          href={item.href}
                          onClick={() => setExploreOpen(false)}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-dark-3 transition-colors group cursor-pointer"
                        >
                          <div className="w-8 h-8 rounded-lg bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-vedara-cyan group-hover:bg-vedara-cyan group-hover:text-slate-950 transition-colors shrink-0 mt-0.5">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1 mb-0.5">
                              <span className="text-xs font-bold text-white group-hover:text-vedara-cyan transition-colors">
                                {item.title}
                              </span>
                              {item.badge && (
                                <Badge variant="teal" size="sm" className="text-[9px] font-bold px-1.5 py-0.5">
                                  {item.badge}
                                </Badge>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-300 line-clamp-1 group-hover:text-slate-200">
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

          {/* 03. Right Action Utilities */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-emerald-400 hover:text-white bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>24/7 WhatsApp</span>
            </a>

            <button
              onClick={() => openIntake()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-[#e39b2d] hover:bg-[#a35f0b] hover:text-white transition-all shadow-md shadow-[#e39b2d]/25 cursor-pointer uppercase tracking-wider font-heading"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Get Free Quote</span>
            </button>
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
        <div className="lg:hidden bg-dark-5/98 backdrop-blur-2xl border-b border-slate-800 px-4 pt-3 pb-6 text-white space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-vedara-cyan animate-pulse"></span>
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
              <ShieldCheck className="w-4 h-4 text-vedara-cyan" />
              <span>Login / Patient Portal</span>
            </Link>
            <a
              href="#treatments"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 text-xs font-semibold hover:border-vedara-blue/40"
            >
              <Stethoscope className="w-4 h-4 text-vedara-cyan" />
              <span>{t.nav.treatments}</span>
            </a>
            <a
              href="#doctors"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 text-xs font-semibold hover:border-vedara-blue/40"
            >
              <UserCheck className="w-4 h-4 text-vedara-cyan" />
              <span>{t.nav.doctorsHospitals}</span>
            </a>
            <a
              href="#journey"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 text-xs font-semibold hover:border-vedara-blue/40 col-span-2"
            >
              <Compass className="w-4 h-4 text-vedara-cyan" />
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
                  className="px-2.5 py-2 rounded-lg text-xs text-slate-300 hover:bg-white/5 hover:text-vedara-cyan transition-colors"
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
              className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-mid1 via-teal-mid2 to-teal-mid1 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-vedara-slate/40"
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
