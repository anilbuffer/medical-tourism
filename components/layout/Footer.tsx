"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCare } from "@/context/CareContext";
import { LanguageCountryPicker } from "@/components/ui/LanguageCountryPicker";
import {
  Globe,
  Phone,
  Mail,
  MessageSquare,
  ShieldCheck,
  Heart,
  ArrowRight,
} from "lucide-react";

export const Footer = () => {
  const { t, language, openIntake, openChat } = useCare();

  return (
    <footer className="bg-gradient-to-b from-[#04272a] via-[#073f43] to-[#021618] text-white pt-20 pb-12 border-t border-[#0b5d63]/40 relative overflow-hidden font-sans">
      {/* Ambient background lighting */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[300px] bg-[#e39b2d]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-[#0b5d63]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-block group">
              <Image
                src="/images/logo/logo-white.png"
                alt="yourMedicareTrip - Your Medical Travel Company"
                width={220}
                height={44}
                className="h-10 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {t.footer.tagline}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <LanguageCountryPicker />
            </div>
          </div>

          {/* Col 1: Care Pathway */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-200 font-heading">
              {t.footer.careHeader}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li>
                <a href="#specialties" className="hover:text-white transition-colors">
                  {t.nav.specialties}
                </a>
              </li>
              <li>
                <a href="#doctors" className="hover:text-white transition-colors">
                  {t.nav.doctors}
                </a>
              </li>
              <li>
                <a href="#hospitals" className="hover:text-white transition-colors">
                  {t.nav.hospitals}
                </a>
              </li>
              <li>
                <a href="#journey" className="hover:text-white transition-colors">
                  Concierge & Recovery
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: Portals & Resources */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-200 font-heading">
              Portals & Resources
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li>
                <Link href="/login?portal=patient" className="text-teal-300 hover:text-white transition-colors flex items-center gap-1 font-bold">
                  <span>Patient Portal Login</span>
                  <span className="text-[10px]">→</span>
                </Link>
              </li>
              <li>
                <Link href="/login?portal=doctor" className="hover:text-white transition-colors">
                  Doctor & Hospital Login
                </Link>
              </li>
              <li>
                <Link href="/login?portal=coordinator" className="hover:text-white transition-colors">
                  Care Coordinator Desk
                </Link>
              </li>
              <li>
                <Link href="/login?portal=finance" className="hover:text-white transition-colors">
                  Finance & Escrow Login
                </Link>
              </li>
              <li>
                <Link href="/login?portal=admin" className="hover:text-white transition-colors">
                  Super Admin Governance
                </Link>
              </li>
              <li>
                <a href="#costs" className="hover:text-white transition-colors">
                  {t.nav.costGuide}
                </a>
              </li>
              <li>
                <a href="#stories" className="hover:text-white transition-colors">
                  {t.nav.patientStories}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: 24/7 International Desk */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-200 font-heading">
              {t.footer.supportHeader}
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-teal-300 hover:underline font-semibold"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp: +91 98765 43210</span>
              </a>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Desk: +91 98765 43210</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>care@yourmedicaretrip.com</span>
              </div>

              <div className="pt-2">
                <a
                  href="/#assessment"
                  className="block w-full py-2.5 px-3 rounded-xl bg-[#0b5d63] hover:bg-[#0e757c] text-white font-bold text-xs shadow-md transition-all text-center uppercase tracking-wider font-heading"
                >
                  {t.nav.startJourney}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Medical & Legal Disclaimer */}
        <div className="py-8 text-[11px] text-slate-500 leading-relaxed space-y-2 border-b border-slate-800/80">
          <p className="font-semibold text-slate-400">Clinical & Coordination Notice:</p>
          <p>{t.footer.medicalDisclaimer}</p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>{t.footer.rights}</div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-slate-400 cursor-pointer">Patient Rights</span>
            <span>·</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span>·</span>
            <span className="hover:text-slate-400 cursor-pointer">HIPAA Protocol</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
