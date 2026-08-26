"use client";

import React from "react";
import {
  Plane,
  Building,
  Calendar,
  Clock,
  Car,
  CheckCircle2,
  MapPin,
  Sparkles,
  Users,
  ShieldCheck,
} from "lucide-react";
import { PatientCase } from "@/types/portal";

interface PatientFlightHotelViewProps {
  patientCase: PatientCase;
}

export const PatientFlightHotelView: React.FC<PatientFlightHotelViewProps> = ({
  patientCase,
}) => {
  const itinerary = patientCase.itinerary;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2ECDC5]/10 text-[#3F4EB4] text-xs font-extrabold uppercase tracking-wider mb-2 border border-[#2ECDC5]/20">
            <Plane className="w-3.5 h-3.5 text-[#2ECDC5]" />
            VIP Concierge & Travel Logistics
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Flight & Accommodation Details
          </h2>
          <p className="text-slate-500 text-sm mt-1 max-w-xl">
            Flight manifest, 5-Star executive suite booking, and airport reception protocol in Delhi.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-700 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>Concierge Transfer Confirmed</span>
        </div>
      </div>

      {/* Flight & Hotel Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Flight Details Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#3F4EB4]/10 text-[#3F4EB4] flex items-center justify-center">
                <Plane className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">Inbound Flight Manifest</h3>
                <span className="text-[11px] text-slate-500">Dubai (DXB) → Delhi (DEL)</span>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
              Confirmed
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Flight Number:</span>
              <span className="font-extrabold text-slate-900 text-sm">EK-512 (Emirates)</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Arrival Schedule:</span>
              <span className="font-bold text-slate-900">Aug 31, 2026 at 04:15 AM (IST)</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Arrival Terminal:</span>
              <span className="font-bold text-slate-900">Terminal 3 (DEL International)</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Attendants / Companions:</span>
              <span className="font-bold text-slate-900">1 Escort (Faris Al-Mansoor)</span>
            </div>
          </div>
        </div>

        {/* 5-Star Hotel Details Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <Building className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">Executive Apartment Suite</h3>
                <span className="text-[11px] text-slate-500">Attendant & Post-Op Recovery</span>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-50 text-amber-800 border border-amber-200">
              5-Star Reserved
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Hotel Partner:</span>
              <span className="font-extrabold text-slate-900">The Oberoi Gurugram</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Room Category:</span>
              <span className="font-bold text-slate-900">Executive Suite with Kitchenette</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Stay Duration:</span>
              <span className="font-bold text-slate-900">Aug 31 – Sep 18, 2026 (18 Nights)</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Booking Reference:</span>
              <span className="font-mono font-bold text-slate-900">OB-MED-89412-UAE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
