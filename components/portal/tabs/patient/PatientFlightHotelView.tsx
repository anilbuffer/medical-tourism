"use client";

import React, { useState } from "react";
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
  Phone,
  MessageSquare,
  Hotel,
} from "lucide-react";
import { PatientCase } from "@/types/portal";
import { WhatsAppContactModal } from "../../modals/WhatsAppContactModal";

interface PatientFlightHotelViewProps {
  patientCase: PatientCase;
}

export const PatientFlightHotelView: React.FC<PatientFlightHotelViewProps> = ({
  patientCase,
}) => {
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2ECDC5]/10 text-[#3F4EB4] text-xs font-extrabold uppercase tracking-wider mb-2 border border-[#2ECDC5]/20">
            <Plane className="w-3.5 h-3.5 text-[#2ECDC5]" />
            Your Travel Details
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Flight & Hotel Stay
          </h2>
          <p className="text-slate-500 text-sm mt-1 max-w-xl">
            Confirmed flight itinerary to Delhi and your 5-Star executive apartment booking for you and your companion.
          </p>
        </div>

        <button
          onClick={() => setIsWhatsAppOpen(true)}
          className="px-5 py-3 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer shrink-0"
        >
          <Phone className="w-4 h-4 text-emerald-600" />
          <span>Need flight/hotel changes?</span>
        </button>
      </div>

      {/* Flight & Hotel Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Flight Details Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#3F4EB4]/10 text-[#3F4EB4] flex items-center justify-center">
                <Plane className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Your Flight to Delhi</h3>
                <span className="text-[11px] text-slate-500">Dubai (DXB) → Delhi (DEL)</span>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
              Confirmed
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Airline & Flight:</span>
              <span className="font-extrabold text-slate-900 text-sm">Emirates (EK-512)</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Landing in Delhi:</span>
              <span className="font-bold text-slate-900">Monday, Aug 31 at 04:15 AM (IST)</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Arrival Terminal:</span>
              <span className="font-bold text-slate-900">Terminal 3 (International Arrivals)</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Passengers:</span>
              <span className="font-bold text-slate-900">Tariq Al-Mansoor & Faris Al-Mansoor</span>
            </div>
          </div>
        </div>

        {/* 5-Star Hotel Details Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <Hotel className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900">5-Star Apartment Suite</h3>
                <span className="text-[11px] text-slate-500">For Companion & Post-Op Stay</span>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-50 text-amber-800 border border-amber-200">
              Reserved & Paid
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Hotel Partner:</span>
              <span className="font-extrabold text-slate-900 text-sm">The Oberoi Gurugram</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Room Type:</span>
              <span className="font-bold text-slate-900">Executive Suite with Kitchenette</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Dates of Stay:</span>
              <span className="font-bold text-slate-900">Aug 31 – Sep 18 (18 Nights)</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Distance to Hospital:</span>
              <span className="font-bold text-emerald-700">5 minutes from Medanta (Free Chauffeur)</span>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Modal */}
      <WhatsAppContactModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        coordinatorName="Ananya Sharma"
        caseId={patientCase.id}
      />
    </div>
  );
};
