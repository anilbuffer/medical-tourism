"use client";

import React, { useState } from "react";
import {
  Car,
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  User,
} from "lucide-react";
import { PatientCase } from "@/types/portal";
import { WhatsAppContactModal } from "../../modals/WhatsAppContactModal";

interface PatientConciergeContactViewProps {
  patientCase: PatientCase;
}

export const PatientConciergeContactView: React.FC<PatientConciergeContactViewProps> = ({
  patientCase,
}) => {
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2ECDC5]/10 text-[#3F4EB4] text-xs font-extrabold uppercase tracking-wider mb-2 border border-[#2ECDC5]/20">
            <Car className="w-3.5 h-3.5 text-[#2ECDC5]" />
            On-Ground VIP Concierge Protocol
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            On-Ground Concierge & Chauffeur Tracking
          </h2>
          <p className="text-slate-500 text-sm mt-1 max-w-xl">
            Airport Gate 5 meet-and-greet protocol, private luxury chauffeur details, and 24/7 care coordination desk.
          </p>
        </div>

        <button
          onClick={() => setIsWhatsAppOpen(true)}
          className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center gap-2 shadow-xl shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer shrink-0"
        >
          <ExternalLink className="w-4 h-4" />
          <span>Chat with Care Coordinator</span>
        </button>
      </div>

      {/* Grid: Chauffeur & Coordinator Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chauffeur Arrival Protocol Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#3F4EB4]/10 text-[#3F4EB4] flex items-center justify-center">
                <Car className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">Airport Meet & Greet Chauffeur</h3>
                <span className="text-[11px] text-slate-500">Terminal 3, Gate 5 Arrivals</span>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
              Assigned
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Chauffeur Name:</span>
              <span className="font-extrabold text-slate-900 text-sm">Rajesh Varma</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Direct Mobile:</span>
              <a href="tel:+919811055432" className="font-bold text-[#3F4EB4] hover:underline">
                +91 98110 55432
              </a>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Vehicle:</span>
              <span className="font-bold text-slate-900">Toyota Alphard VIP Executive (DL 1VB 9022)</span>
            </div>

            <div className="p-3.5 bg-teal-50/60 rounded-2xl border border-teal-100 text-teal-950 font-medium leading-relaxed">
              <strong>Arrival Meeting Protocol:</strong> Chauffeur will hold a personalized digital name sign board reading <strong>"VEDARA CARE: TARIQ AL-MANSOOR"</strong> directly outside Terminal 3, Gate 5.
            </div>
          </div>
        </div>

        {/* Assigned Coordinator Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                alt="Ananya Sharma"
                className="w-12 h-12 rounded-2xl object-cover ring-2 ring-[#2ECDC5]/50 shadow-md"
              />
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">Ananya Sharma</h3>
                <div className="text-[11px] text-[#3F4EB4] font-bold">Assigned Care Coordinator Lead</div>
              </div>
            </div>

            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
              Online
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
              <span className="text-slate-500 font-medium">WhatsApp Hotline:</span>
              <span className="font-bold text-emerald-700">+91 98101 88412</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
              <span className="text-slate-500 font-medium">24/7 International Desk:</span>
              <a href="tel:+18008332722" className="font-bold text-[#3F4EB4] hover:underline">
                +1 (800) 833-2722 (Toll Free)
              </a>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => setIsWhatsAppOpen(true)}
                className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>1-Click WhatsApp</span>
              </button>

              <a
                href="tel:+919810188412"
                className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-200"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>Direct Dial</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Modal */}
      <WhatsAppContactModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        patientCase={patientCase}
      />
    </div>
  );
};
