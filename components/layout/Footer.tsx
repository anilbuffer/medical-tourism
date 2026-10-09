"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCare } from "@/context/CareContext";
import { LanguageCountryPicker } from "@/components/ui/LanguageCountryPicker";
import {
  Phone,
  Mail,
  MessageSquare,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Lock,
  Clock,
  Award,
  Building2,
} from "lucide-react";

export const Footer = () => {
  const { t, openIntake } = useCare();

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      "Hello, I am inquiring about medical treatment and concierge care in India with Your Medicare Trip."
    );
    window.open(`https://wa.me/919876543210?text=${text}`, "_blank");
  };

  return (
    <footer className="bg-[#0A1E30] text-white pt-16 sm:pt-20 pb-12 border-t border-[#DCE6EB]/15 relative overflow-hidden font-sans">
      {/* Ambient background lighting */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[350px] bg-[#0B5D68]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[350px] bg-[#2C7FAF]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Pre-Footer: High-Trust Clinical Assurance Strip */}
        <div className="bg-[#0C273E] rounded-2xl sm:rounded-3xl p-5 xs:p-6 sm:p-8 border border-white/10 mb-12 sm:mb-16 shadow-2xl backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-center">

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0B5D68]/30 border border-[#0B5D68]/50 flex items-center justify-center shrink-0 text-[#14B8A6]">
                <ShieldCheck className="w-6 h-6 text-[#14B8A6]" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-white">JCI &amp; NABH Certified</h4>
                <p className="text-xs text-slate-300">Audited quaternary hospitals in North India</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0B5D68]/30 border border-[#0B5D68]/50 flex items-center justify-center shrink-0 text-[#14B8A6]">
                <Award className="w-6 h-6 text-[#14B8A6]" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-white">Zero Upfront Booking</h4>
                <p className="text-xs text-slate-300">Guaranteed fixed quote before travel</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0B5D68]/30 border border-[#0B5D68]/50 flex items-center justify-center shrink-0 text-[#14B8A6]">
                <Clock className="w-6 h-6 text-[#14B8A6]" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-white">24h Visa Invitation</h4>
                <p className="text-xs text-slate-300">Fast-track official Indian e-Med visa</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0B5D68]/30 border border-[#0B5D68]/50 flex items-center justify-center shrink-0 text-[#14B8A6]">
                <Lock className="w-6 h-6 text-[#14B8A6]" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-white">HIPAA 256-Bit Encrypted</h4>
                <p className="text-xs text-slate-300">100% confidential health data privacy</p>
              </div>
            </div>

          </div>
        </div>

        {/* Main 5-Column Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-white/10">

          {/* Brand & Authority Column (4 Cols on LG) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block group">
              <Image
                src="/images/logo/logo-white.png"
                alt="yourMedicareTrip - Your Medical Travel Company"
                width={230}
                height={46}
                className="h-10 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
              An elevated international medical travel concierge helping global patients access world-class surgical directors, accredited Indian hospital admissions, and end-to-end 1-on-1 care coordination.
            </p>

            {/* Key Trust Pill Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium text-slate-300">
                <CheckCircle2 className="w-3 h-3 text-[#14B8A6]" />
                <span>UK &amp; US Standards</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium text-slate-300">
                <CheckCircle2 className="w-3 h-3 text-[#14B8A6]" />
                <span>Zero Hidden Fees</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium text-slate-300">
                <CheckCircle2 className="w-3 h-3 text-[#14B8A6]" />
                <span>Direct Hospital Invoicing</span>
              </span>
            </div>
          </div>

          {/* Col 2: Quaternary Specialties (2 Cols on LG) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#ECF4F7] font-heading border-l-2 border-[#14B8A6] pl-2.5">
              Specialised Care
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
              <li>
                <a href="#specialties" className="hover:text-white hover:translate-x-0.5 inline-block transition-all">
                  Robotic Joint Replacement
                </a>
              </li>
              <li>
                <a href="#specialties" className="hover:text-white hover:translate-x-0.5 inline-block transition-all">
                  Quaternary Cardiology
                </a>
              </li>
              <li>
                <a href="#specialties" className="hover:text-white hover:translate-x-0.5 inline-block transition-all">
                  Contoura Vision &amp; SMILE
                </a>
              </li>
              <li>
                <a href="#specialties" className="hover:text-white hover:translate-x-0.5 inline-block transition-all">
                  Cosmetic &amp; VASER Surgery
                </a>
              </li>
              <li>
                <a href="#specialties" className="hover:text-white hover:translate-x-0.5 inline-block transition-all">
                  IVF &amp; Advanced Fertility
                </a>
              </li>
              <li>
                <a href="#specialties" className="hover:text-white hover:translate-x-0.5 inline-block transition-all">
                  Full-Arch Dental Implants
                </a>
              </li>
              <li>
                <a href="#specialties" className="hover:text-white hover:translate-x-0.5 inline-block transition-all">
                  Neurosciences &amp; Spine
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Concierge & Patient Journey (2 Cols on LG) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#ECF4F7] font-heading border-l-2 border-[#14B8A6] pl-2.5">
              Patient Journey
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
              <li>
                <a href="#journey" className="hover:text-white hover:translate-x-0.5 inline-block transition-all">
                  Step-by-Step Concierge
                </a>
              </li>
              <li>
                <a href="#costs" className="hover:text-white hover:translate-x-0.5 inline-block transition-all">
                  All-Inclusive Cost Comparison
                </a>
              </li>
              <li>
                <a href="#stay" className="hover:text-white hover:translate-x-0.5 inline-block transition-all">
                  Accommodation &amp; Hotel Stay
                </a>
              </li>
              <li>
                <a href="#doctors" className="hover:text-white hover:translate-x-0.5 inline-block transition-all">
                  Expert Surgical Directors
                </a>
              </li>
              <li>
                <a href="#hospitals" className="hover:text-white hover:translate-x-0.5 inline-block transition-all">
                  Accredited Hospital Network
                </a>
              </li>
              <li>
                <a href="#safety" className="hover:text-white hover:translate-x-0.5 inline-block transition-all">
                  Clinical Feasibility Policy
                </a>
              </li>
              <li>
                <Link href="/guides" className="hover:text-white hover:translate-x-0.5 inline-block transition-all">
                  Clinical Guides &amp; Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Secure Portals & Governance (2 Cols on LG) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#ECF4F7] font-heading border-l-2 border-[#14B8A6] pl-2.5">
              Portals &amp; Hubs
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
              <li>
                <Link
                  href="/login?portal=patient"
                  className="text-[#14B8A6] hover:text-white transition-colors flex items-center gap-1.5 font-bold"
                >
                  <span>Patient Portal Login</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link href="/login?portal=doctor" className="hover:text-white hover:translate-x-0.5 inline-block transition-all">
                  Surgeon &amp; Doctor Hub
                </Link>
              </li>
              <li>
                <Link href="/login?portal=coordinator" className="hover:text-white hover:translate-x-0.5 inline-block transition-all">
                  Care Coordinator Desk
                </Link>
              </li>
              <li>
                <Link href="/login?portal=finance" className="hover:text-white hover:translate-x-0.5 inline-block transition-all">
                  Finance &amp; Escrow Security
                </Link>
              </li>
              <li>
                <Link href="/login?portal=admin" className="hover:text-white hover:translate-x-0.5 inline-block transition-all">
                  Super Admin Governance
                </Link>
              </li>
              <li>
                <Link href="/hospitals" className="hover:text-white hover:translate-x-0.5 inline-block transition-all">
                  Hospital Accreditation Registry
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: 24/7 International Care Desk (2 Cols on LG) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#ECF4F7] font-heading border-l-2 border-[#F0A126] pl-2.5">
              24/7 International Desk
            </h4>

            <div className="space-y-3 text-xs text-slate-300">
              <button
                onClick={handleWhatsApp}
                className="w-full py-2.5 px-3 rounded-xl bg-[#0B5D68]/40 hover:bg-[#0B5D68] border border-[#0B5D68] text-white flex items-center justify-center gap-2 font-heading font-bold text-xs transition-all shadow-sm group cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366] transition-transform group-hover:scale-110" />
                <span>WhatsApp Coordinator</span>
              </button>

              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <Phone className="w-4 h-4 text-[#14B8A6] shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <Mail className="w-4 h-4 text-[#14B8A6] shrink-0" />
                <a href="mailto:care@yourmedicaretrip.com" className="hover:text-white transition-colors truncate">
                  care@yourmedicaretrip.com
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => openIntake("Footer Consultation")}
                  className="w-full py-3 px-3 rounded-xl bg-[#F0A126] hover:bg-[#db8e18] active:scale-[0.99] text-[#000000] font-heading font-bold text-xs shadow-md shadow-[#F0A126]/20 transition-all text-center uppercase tracking-wider cursor-pointer"
                >
                  Book Free Consultation
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Network Accreditation Strip */}
        <div className="py-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2 font-heading font-semibold text-slate-300">
            <Building2 className="w-4 h-4 text-[#14B8A6]" />
            <span>Audited Partner Hospital Network:</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-400">
            <span>Fortis Hospital Mohali</span>
            <span>·</span>
            <span>Max Super Speciality Hospital</span>
            <span>·</span>
            <span>Profile Cosmetic Surgery Institute</span>
            <span>·</span>
            <span>Sangam Netralaya Eye Centre</span>
            <span>·</span>
            <span>Apollo Hospitals</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Your Medicare Trip. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-5 text-xs">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link href="/patient-rights" className="hover:text-white transition-colors">
              Patient Rights
            </Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span>·</span>
            <span className="text-slate-500">HIPAA &amp; NABH Protocol</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
