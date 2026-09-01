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
  HeartHandshake,
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
            Personal On-Ground Support
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Your Driver & Personal Assistance
          </h2>
          <p className="text-slate-500 text-sm mt-1 max-w-xl">
            Your private chauffeur will meet you at Airport Gate 5. Your care coordinator is on standby 24/7 to assist you.
          </p>
        </div>

        <button
          onClick={() => setIsWhatsAppOpen(true)}
          className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center gap-2 shadow-xl shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer shrink-0"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Message Coordinator</span>
        </button>
      </div>

      {/* Grid: Chauffeur & Coordinator Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chauffeur Arrival Protocol Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#3F4EB4]/10 text-[#3F4EB4] flex items-center justify-center">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Your Airport Driver</h3>
                <span className="text-[11px] text-slate-500">Terminal 3, Gate 5 Arrivals</span>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
              Assigned
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Driver Name:</span>
              <span className="font-extrabold text-slate-900 text-sm">{patientCase.itinerary?.airportPickup?.driverName || "Rajesh Varma"}</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Phone Number:</span>
              <a href={`tel:${patientCase.itinerary?.airportPickup?.contactPhone || "+919811055432"}`} className="font-bold text-[#3F4EB4] hover:underline">
                {patientCase.itinerary?.airportPickup?.contactPhone || "+91 98110 55432"}
              </a>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Car Model:</span>
              <span className="font-bold text-slate-900">
                {patientCase.itinerary?.airportPickup?.vehicleType || "Toyota Alphard VIP Executive Van"} ({patientCase.itinerary?.airportPickup?.vehicleNumber || "DL 1VB 9022"})
              </span>
            </div>

            <div className="p-4 bg-teal-50/70 rounded-2xl border border-teal-100 text-teal-950 font-medium leading-relaxed space-y-1">
              <strong>How to find your driver:</strong>
              <p className="text-[11px] text-teal-900">
                {patientCase.itinerary?.airportPickup?.driverName?.split(" ")[0] || "Rajesh"} will be standing right outside <strong>{patientCase.itinerary?.airportPickup?.pickupLocation || "Terminal 3, Gate 5"}</strong> holding a welcome sign with your name: <strong>"{patientCase.patientName.toUpperCase()}"</strong>.
              </p>
            </div>

            <a
              href="tel:+919811055432"
              className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 border border-slate-200 transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>Call Driver Directly</span>
            </a>
          </div>
        </div>

        {/* Assigned Coordinator Card with Prominent Real Face & Call Me Button */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                  alt="Ananya Sharma"
                  className="w-14 h-14 rounded-2xl object-cover ring-3 ring-[#2ECDC5]/50 shadow-md"
                />
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">Ananya Sharma</h3>
                  <div className="text-xs text-[#3F4EB4] font-bold">Your Personal Care Coordinator</div>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                Online Now
              </span>
            </div>

            <div className="space-y-3 text-xs mt-4">
              <p className="text-slate-600 leading-relaxed font-medium">
                "I am your direct companion for everything in India — from hospital appointments to translation and hotel needs. Press the button below whenever you want to talk."
              </p>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Coordinator Phone:</span>
                  <span className="font-bold text-slate-900">+91 98101 88412</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Toll-Free International:</span>
                  <span className="font-bold text-[#3F4EB4]">+1 (800) 833-2722</span>
                </div>
              </div>
            </div>
          </div>

          {/* Prominent Call & Message Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <a
              href="tel:+919810188412"
              className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#283593]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Call Ananya Now</span>
            </a>

            <button
              onClick={() => setIsWhatsAppOpen(true)}
              className="py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp</span>
            </button>
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
