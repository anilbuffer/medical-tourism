"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCare } from "@/context/CareContext";
import { LanguageCountryPicker } from "@/components/ui/LanguageCountryPicker";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BrandLogo } from "@/components/ui/BrandLogo";
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
  ArrowRight,
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
        ? "bg-[#0C2338]/95 backdrop-blur-2xl shadow-xl border-b border-white/15 text-white"
        : "bg-[#0C2338]/85 backdrop-blur-xl shadow-md border-b border-white/10 text-white"
        }`}
    >
      {/* 01. Pre-Header Top Utility Bar - Trust & 24/7 Helpline */}
      <div className="hidden lg:block bg-[#081827]/90 border-b border-white/10 py-1.5 text-xs text-slate-300">
        <div className="max-w-[1580px] mx-auto mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0B8F83] animate-pulse" />
              <span className="font-semibold text-white/90">NABH & JCI Accredited Hospital Network</span>
            </div>
            <span className="text-white/20">•</span>
            <div className="flex items-center gap-1.5 text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-[#F0A126]" />
              <span>Save Up to 70% vs US/UK &bull; Zero Waiting Lists</span>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/90 font-medium">24/7 International Desk:</span>
              <span className="text-emerald-400 group-hover:text-emerald-300 font-bold">+91 98765 43210</span>
            </a>
            <span className="text-white/20">|</span>
            <LanguageCountryPicker />
          </div>
        </div>
      </div>

      {/* 02. Main Navbar */}
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 py-2 sm:py-3.5">
        <div className="flex items-center justify-between gap-4 sm:gap-8">
          {/* Brand Logo - Vector HD Sharp */}
          <Link href="/" className="flex items-center gap-3 group shrink-0" aria-label="yourMedicareTrip Home">
            <BrandLogo variant="white" className="h-9 sm:h-12 w-auto" />
          </Link>

          {/* Clean Spacious Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium">
            <a
              href="#treatments"
              className="px-4 py-2 rounded-full text-slate-200 hover:text-white hover:bg-white/10 transition-all whitespace-nowrap"
            >
              Treatments
            </a>
            <a
              href="#doctors"
              className="px-4 py-2 rounded-full text-slate-200 hover:text-white hover:bg-white/10 transition-all whitespace-nowrap"
            >
              Doctors
            </a>
            <a
              href="#hospitals"
              className="px-4 py-2 rounded-full text-slate-200 hover:text-white hover:bg-white/10 transition-all whitespace-nowrap"
            >
              Hospitals
            </a>
            <a
              href="#journey"
              className="px-4 py-2 rounded-full text-slate-200 hover:text-white hover:bg-white/10 transition-all whitespace-nowrap"
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
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-slate-200 hover:text-white hover:bg-white/10 transition-all cursor-pointer whitespace-nowrap"
                aria-expanded={exploreOpen}
              >
                <span>{t.nav.explore}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${exploreOpen ? "rotate-180 text-[#F0A126]" : ""
                    }`}
                />
              </button>

              {/* Dropdown Menu */}
              {exploreOpen && (
                <div
                  onMouseLeave={() => setExploreOpen(false)}
                  className="absolute top-full left-0 mt-2 w-80 rounded-2xl bg-[#0C2338]/95 backdrop-blur-2xl border border-[#DCE6EB]/20 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="space-y-1">
                    {exploreLinks.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <a
                          key={idx}
                          href={item.href}
                          onClick={() => setExploreOpen(false)}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/10 transition-colors group cursor-pointer"
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#0B5D68]/25 border border-[#0B5D68]/40 flex items-center justify-center text-[#F0A126] group-hover:bg-[#0B5D68] group-hover:text-white transition-colors shrink-0 mt-0.5">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1 mb-0.5">
                              <span className="text-xs font-bold text-white group-hover:text-[#F0A126] transition-colors">
                                {item.title}
                              </span>
                              {item.badge && (
                                <Badge variant="outline" size="sm" className="text-[9px] font-bold px-1.5 py-0.5 border-[#F0A126]/40 text-[#F0A126]">
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

          {/* 03. Right Action Utilities - High-Contrast Premium Buttons */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {/* Button 1: 24/7 WhatsApp Pill */}
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-500/60 transition-all shadow-sm group"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="group-hover:text-white transition-colors">24/7 WhatsApp</span>
            </a>

            {/* Button 2: Radiant Primary CTA Button - Gold Accent for Maximum Conversion */}
            <button
              onClick={() => openIntake()}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold text-[#0C2338] bg-gradient-to-r from-[#F0A126] to-[#FBBF24] hover:from-[#db8e18] hover:to-[#f0a126] active:scale-95 transition-all shadow-lg shadow-[#F0A126]/20 hover:shadow-xl hover:shadow-[#F0A126]/35 cursor-pointer uppercase tracking-wider font-heading"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#0C2338] stroke-[2.5]" />
              <span className="text-[#0C2338]">Book Consultation</span>
            </button>
          </div>

          {/* 04. Mobile Navigation Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => openIntake()}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold text-[#0C2338] bg-[#F0A126] font-heading shadow-md"
            >
              Book Now
            </button>
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
        <div className="lg:hidden bg-[#0C2338]/98 backdrop-blur-2xl border-b border-white/10 px-4 pt-3 pb-6 text-white space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse"></span>
              <span>24/7 International Desk</span>
            </div>
            <LanguageCountryPicker />
          </div>

          {/* Primary Quick Links */}
          <div className="grid grid-cols-2 gap-2">
            <a
              href="#treatments"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 text-xs font-semibold hover:border-[#0B5D68]/40"
            >
              <Stethoscope className="w-4 h-4 text-[#F0A126]" />
              <span>Treatments</span>
            </a>
            <a
              href="#doctors"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 text-xs font-semibold hover:border-[#0B5D68]/40"
            >
              <UserCheck className="w-4 h-4 text-[#F0A126]" />
              <span>Doctors</span>
            </a>
            <a
              href="#hospitals"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 text-xs font-semibold hover:border-[#0B5D68]/40"
            >
              <ShieldCheck className="w-4 h-4 text-[#F0A126]" />
              <span>Hospitals</span>
            </a>
            <a
              href="#journey"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 text-xs font-semibold hover:border-[#0B5D68]/40"
            >
              <Compass className="w-4 h-4 text-[#F0A126]" />
              <span>How It Works</span>
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
                  className="px-2.5 py-2 rounded-lg text-xs text-slate-300 hover:bg-white/5 hover:text-[#0B5D68] transition-colors"
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
              className="w-full py-3 rounded-xl bg-[#0B5D68] hover:bg-[#0C2338] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#0B5D68]/30 transition-all font-heading"
            >
              <span>Book an Appointment</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
