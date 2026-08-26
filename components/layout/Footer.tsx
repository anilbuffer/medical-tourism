"use client";

import React from "react";
import Link from "next/link";
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
    <footer className="bg-[#040A10] text-white pt-20 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-slate-800/80">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#283593] to-[#3F4EB4] flex items-center justify-center shadow-lg border border-[#2ECDC5]/30">
                <span className="text-white font-bold text-lg font-serif">V</span>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold tracking-widest text-lg text-white">
                  {t.nav.brandName}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#2ECDC5]">
                  {t.nav.brandSub}
                </span>
              </div>
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
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2ECDC5]">
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
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2ECDC5]">
              Portals & Resources
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li>
                <Link href="/login?portal=patient" className="text-[#2ECDC5] hover:text-white transition-colors flex items-center gap-1 font-bold">
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
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2ECDC5]">
              {t.footer.supportHeader}
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <a
                href="https://wa.me/971501234567"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#2ECDC5] hover:underline font-semibold"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp: +971 50 123 4567</span>
              </a>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#2ECDC5] shrink-0" />
                <span>Desk: +971 4 800 VEDARA</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#2ECDC5] shrink-0" />
                <span>care@vedara.health</span>
              </div>

              <div className="pt-2">
                <a
                  href="/#assessment"
                  className="block w-full py-2.5 px-3 rounded-xl  bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] text-white font-bold text-xs shadow-md shadow-[#283593]/30 transition-all text-center"
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
