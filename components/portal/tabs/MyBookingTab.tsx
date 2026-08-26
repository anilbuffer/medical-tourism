"use client";

import React, { useState } from "react";
import { PatientCase, LogisticsItinerary } from "@/types/portal";
import {
  Plane,
  Building2,
  Calendar,
  Clock,
  Car,
  Home,
  FileCheck,
  Download,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  MapPin,
  Phone,
  ExternalLink,
  Award,
  X,
} from "lucide-react";

interface MyBookingTabProps {
  patientCase: PatientCase;
}

export const MyBookingTab: React.FC<MyBookingTabProps> = ({ patientCase }) => {
  const itinerary = patientCase.itinerary;
  const [visaLetterModalOpen, setVisaLetterModalOpen] = useState(false);

  if (!itinerary) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm space-y-4">
        <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
          <Plane className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Travel & Logistics Itinerary Pending</h3>
          <p className="text-slate-500 text-sm max-w-md mx-auto mt-1">
            Your travel itinerary, hotel suite reservation, and official Hospital M-Visa invitation letter will be generated as soon as your commitment deposit is completed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2ECDC5]/10 text-[#3F4EB4] text-xs font-bold tracking-wider uppercase mb-2 border border-[#2ECDC5]/20">
            <Plane className="w-3.5 h-3.5 text-[#2ECDC5]" />
            VIP Concierge & Travel Manifest
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Consolidated Itinerary & Visa Clearance
          </h2>
          <p className="text-slate-500 text-sm mt-1 max-w-xl">
            Complete schedule for doctor check-in, airport VIP chauffeur meet-and-greet, hotel accommodations, and country-tailored Indian Medical Visa (M-Visa) documentation.
          </p>
        </div>

        <button
          onClick={() => setVisaLetterModalOpen(true)}
          className="px-5 py-3.5 rounded-2xl  bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] text-white font-extrabold text-xs shadow-xl shadow-[#283593]/25 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Award className="w-4 h-4 text-amber-300" />
          <span>Download M-Visa Invitation Letter</span>
        </button>
      </div>

      {/* Grid: Itinerary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Doctor Appointment */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-[#3F4EB4]/40 transition-all duration-300 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-[#3F4EB4]/10 text-[#3F4EB4] flex items-center justify-center font-bold border border-[#3F4EB4]/20">
            <Calendar className="w-5 h-5 text-[#3F4EB4]" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Hospital Check-In</div>
            <div className="text-base font-extrabold text-slate-900 mt-1">
              {itinerary.doctorAppointmentDate}
            </div>
            <div className="text-xs font-semibold text-[#3F4EB4] mt-0.5">
              {itinerary.doctorAppointmentTime}
            </div>
          </div>
          <p className="text-xs text-slate-500 line-clamp-2">{itinerary.hospitalAddress}</p>
        </div>

        {/* 2. Flight Inbound */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-[#2ECDC5]/40 transition-all duration-300 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-[#2ECDC5]/10 text-[#3F4EB4] flex items-center justify-center font-bold border border-[#2ECDC5]/20">
            <Plane className="w-5 h-5 text-[#2ECDC5]" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Flight Details</div>
            <div className="text-base font-extrabold text-slate-900 mt-1 truncate">
              {itinerary.flightDetails?.flightNumber || "BA 143 (British Airways)"}
            </div>
            <div className="text-xs font-semibold text-[#3F4EB4] mt-0.5">
              Arrival: {itinerary.flightDetails?.arrivalTime || "08:15 AM IST"}
            </div>
          </div>
          <p className="text-xs text-slate-500">{itinerary.flightDetails?.terminal || "DEL Terminal 3"}</p>
        </div>

        {/* 3. Hotel Suite */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-emerald-300 transition-all duration-300 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold border border-emerald-100">
            <Home className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Hotel / Residence</div>
            <div className="text-base font-extrabold text-slate-900 mt-1 truncate">
              {itinerary.hotelDetails?.name || "The Oberoi Gurugram"}
            </div>
            <div className="text-xs font-semibold text-emerald-700 mt-0.5">
              Ref: {itinerary.hotelDetails?.bookingReference || "OB-MED-8492"}
            </div>
          </div>
          <p className="text-xs text-slate-500 truncate">{itinerary.hotelDetails?.roomType}</p>
        </div>

        {/* 4. Airport Chauffeur */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-[#2ECDC5]/40 transition-all duration-300 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-[#2ECDC5]/10 text-[#2ECDC5] flex items-center justify-center font-bold border border-[#2ECDC5]/20">
            <Car className="w-5 h-5 text-[#2ECDC5]" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">VIP Airport Pickup</div>
            <div className="text-base font-extrabold text-slate-900 mt-1 truncate">
              {itinerary.airportPickup?.driverName || "Dedicated Chauffeur"}
            </div>
            <div className="text-xs font-semibold text-[#3F4EB4] mt-0.5">
              Vehicle: {itinerary.airportPickup?.vehicleNumber || "DL 1ZC 7782"}
            </div>
          </div>
          <p className="text-xs text-slate-500 truncate">{itinerary.airportPickup?.pickupLocation}</p>
        </div>
      </div>

      {/* Country-Specific Visa Checklist */}
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-[0_6px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] transition-all duration-300 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-[#3F4EB4]" />
              <span>Medical Visa (M-Visa) Document Checklist — {itinerary.visaDocumentChecklist.country}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              Passport Rule: {itinerary.visaDocumentChecklist.passportValidityRequired}
            </p>
          </div>

          <a
            href={itinerary.visaDocumentChecklist.embassySubmissionUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3F4EB4] hover:text-[#283593] transition-colors"
          >
            <span>Indian Official e-Visa Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {itinerary.visaDocumentChecklist.requiredItems.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 hover:bg-slate-50 transition-colors flex items-start gap-3"
            >
              <CheckCircle2 className="w-5 h-5 text-[#2ECDC5] shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-slate-900">{item.name}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{item.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= M-Visa Invitation Letter Modal ================= */}
      {visaLetterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Building2 className="w-6 h-6 text-indigo-700" />
                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    Official Indian Medical Visa Invitation Letter (M-Visa)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Hospital Ref: VED/MED/2026/8492 • Ministry of External Affairs Verified
                  </p>
                </div>
              </div>
              <button
                onClick={() => setVisaLetterModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Letter Document Body */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-800 space-y-4 font-serif leading-relaxed">
              <div className="text-center pb-3 border-b border-slate-300 space-y-1">
                <div className="font-sans font-black text-sm uppercase tracking-widest text-slate-900">
                  MEDANTA — THE MEDICITY HOSPITAL
                </div>
                <div className="text-[10px] text-slate-500 font-sans">
                  Sector 38, Gurugram, Haryana 122001, Delhi NCR, India • JCI & NABH Accredited
                </div>
              </div>

              <div className="flex justify-between text-[11px] font-sans font-semibold text-slate-600">
                <span>To: Visa Officer, High Commission of India</span>
                <span>Date: August 25, 2026</span>
              </div>

              <p>
                This is to officially certify that <strong>{patientCase.patientName}</strong>, holder of Passport from <strong>{patientCase.patientCountry}</strong>, has been evaluated and accepted for specialized tertiary medical treatment (<strong>{patientCase.clinicalSummary.recommendedProcedure}</strong>) under the supervision of <strong>Dr. Naresh Trehan</strong>.
              </p>

              <p>
                The planned hospitalization and initial recovery period will commence on <strong>{itinerary.doctorAppointmentDate}</strong>. We hereby request the issuance of an <strong>Expedited Indian Medical Visa (M-Visa)</strong> for the patient and a <strong>Medical Attendant Visa (MX-Visa)</strong> for accompanying family members.
              </p>

              <div className="pt-4 flex justify-between items-end border-t border-slate-200 font-sans text-[11px]">
                <div>
                  <div className="font-bold text-slate-900">Dr. Naresh Trehan</div>
                  <div className="text-slate-500">Chief Cardiac Surgeon & Chairman</div>
                </div>
                <div className="text-right">
                  <div className="text-emerald-700 font-bold">MEDANTA EMBASSY CELL SEAL</div>
                  <div className="text-slate-400 text-[10px]">Verification: QR-MED-8492-OK</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setVisaLetterModalOpen(false)}
                className="flex-1 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Official Letter (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
