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
              <span className="font-extrabold text-slate-900 text-sm">
                {patientCase.itinerary?.flightDetails ? `${patientCase.itinerary.flightDetails.airline} (${patientCase.itinerary.flightDetails.flightNumber})` : "Emirates (EK-512)"}
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Landing in Delhi:</span>
              <span className="font-bold text-slate-900">
                {patientCase.itinerary?.flightDetails ? `${patientCase.itinerary.flightDetails.arrivalDate} at ${patientCase.itinerary.flightDetails.arrivalTime}` : "Monday, Aug 31 at 04:15 AM (IST)"}
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Arrival Terminal:</span>
              <span className="font-bold text-slate-900">
                {patientCase.itinerary?.flightDetails?.terminal || "Terminal 3 (International Arrivals)"}
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Passengers:</span>
              <span className="font-bold text-slate-900">{patientCase.patientName} & Faris Al-Mansoor</span>
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
              <span className="font-extrabold text-slate-900 text-sm">
                {patientCase.itinerary?.hotelDetails?.name || "The Oberoi Gurugram"}
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Room Type:</span>
              <span className="font-bold text-slate-900">
                {patientCase.itinerary?.hotelDetails?.roomType || "Executive Suite with Kitchenette"}
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Dates of Stay:</span>
              <span className="font-bold text-slate-900">
                {patientCase.itinerary?.hotelDetails ? `${patientCase.itinerary.hotelDetails.checkIn} – ${patientCase.itinerary.hotelDetails.checkOut}` : "Aug 31 – Sep 18"}
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Distance to Hospital:</span>
              <span className="font-bold text-emerald-700">5 minutes from Medanta (Free Chauffeur)</span>
            </div>
          </div>
        </div>
      </div>

      {/* VIP Flight Tracker */}
      <div className="bg-gradient-to-br from-[#141d60] via-[#1b2360] to-[#101e76] rounded-3xl p-6 sm:p-7 text-white shadow-xl border border-slate-800 relative overflow-hidden space-y-4">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#2ECDC5]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#2ECDC5]/20 flex items-center justify-center">
              <Plane className="w-5 h-5 text-[#2ECDC5]" />
            </div>
            <div>
              <div className="text-sm font-black text-white">Live Flight Tracker</div>
              <div className="text-[11px] text-slate-300">EK-512 · Dubai (DXB) → Delhi (DEL)</div>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-extrabold text-emerald-300">On Time</span>
          </div>
        </div>

        <div className="relative z-10">
          {/* Flight Progress Bar */}
          <div className="flex items-center gap-4 mb-3">
            <div className="text-center">
              <div className="text-lg font-black text-white">DXB</div>
              <div className="text-[10px] text-slate-400">Dubai</div>
              <div className="text-xs font-bold text-slate-300">11:45 PM</div>
            </div>
            <div className="flex-1 relative">
              <div className="h-1 bg-white/10 rounded-full">
                <div className="h-1 bg-gradient-to-r from-[#2ECDC5] to-blue-400 rounded-full" style={{ width: "62%" }} />
              </div>
              <div className="absolute top-[-14px]" style={{ left: "58%" }}>
                <Plane className="w-5 h-5 text-[#2ECDC5] -rotate-12" />
              </div>
              <div className="text-center mt-3 text-[10px] text-slate-400">
                ~3h 22min remaining · Altitude 37,000 ft
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg font-black text-white">DEL</div>
              <div className="text-[10px] text-slate-400">Delhi</div>
              <div className="text-xs font-bold text-[#2ECDC5]">04:15 AM</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-center">
              <div className="text-slate-400">Flight</div>
              <div className="font-black text-white">EK-512</div>
            </div>
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-center">
              <div className="text-slate-400">Terminal</div>
              <div className="font-black text-white">T3 · Gate 5</div>
            </div>
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-center">
              <div className="text-slate-400">Passengers</div>
              <div className="font-black text-white">2 · Business</div>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Arabic Interpreter Card */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2ECDC5] to-[#1baba4] flex items-center justify-center text-white font-black text-2xl shadow-lg">
              س
            </div>
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-black text-lg text-slate-900">Sana Haidari</h3>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-[#3F4EB4]/10 text-[#3F4EB4] border border-[#3F4EB4]/20">Personal Arabic Coordinator</span>
            </div>
            <p className="text-slate-500 text-sm mt-1">
              مرحباً تارق، أنا سنا، منسقتك العربية في دلهي — I am your Arabic coordinator in Delhi, here to make every moment comfortable for you and your son.
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <button
                onClick={() => setIsWhatsAppOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-700 font-black text-xs transition-colors cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                WhatsApp Sana
              </button>
              <button
                onClick={() => {}}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#3F4EB4]/10 hover:bg-[#3F4EB4]/20 text-[#3F4EB4] font-black text-xs transition-colors cursor-pointer"
              >
                <span>🎤</span>
                Play Audio Intro
              </button>
              <div className="text-[11px] text-slate-400 font-medium">Available 24/7 in Delhi · Arabic & English</div>
            </div>
          </div>
        </div>
      </div>
      <WhatsAppContactModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        coordinatorName="Ananya Sharma"
        caseId={patientCase.id}
      />
    </div>
  );
};
