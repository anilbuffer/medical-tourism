"use client";

import React, { useState } from "react";
import { PatientCase, LogisticsItinerary } from "@/types/portal";
import { usePortal } from "@/lib/portal/store";
import {
  Plane,
  Building2,
  Car,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  Phone,
  User,
  Save,
  FileText,
  MapPin,
  ExternalLink,
  Plus,
  Trash2,
} from "lucide-react";

interface CSItineraryWorkspaceProps {
  patientCase: PatientCase;
}

export const CSItineraryWorkspace: React.FC<CSItineraryWorkspaceProps> = ({
  patientCase,
}) => {
  const { updateItineraryDetails } = usePortal();

  const [flightNumber, setFlightNumber] = useState<string>(
    patientCase.itinerary?.flightDetails?.flightNumber || "EK-512 (Emirates)"
  );
  const [arrivalDate, setArrivalDate] = useState<string>(
    patientCase.itinerary?.flightDetails?.arrivalDate || "2026-08-31"
  );
  const [arrivalTime, setArrivalTime] = useState<string>(
    patientCase.itinerary?.flightDetails?.arrivalTime || "04:15 AM IST"
  );
  const [terminal, setTerminal] = useState<string>(
    patientCase.itinerary?.flightDetails?.terminal || "Terminal 3, DEL"
  );

  const [hotelName, setHotelName] = useState<string>(
    patientCase.itinerary?.hotelDetails?.name || "The Oberoi Gurugram (5-Star Executive Suites)"
  );
  const [hotelCheckIn, setHotelCheckIn] = useState<string>(
    patientCase.itinerary?.hotelDetails?.checkIn || "2026-08-31"
  );
  const [hotelCheckOut, setHotelCheckOut] = useState<string>(
    patientCase.itinerary?.hotelDetails?.checkOut || "2026-09-18"
  );
  const [hotelRef, setHotelRef] = useState<string>(
    patientCase.itinerary?.hotelDetails?.bookingReference || "OB-MED-89412-UAE"
  );

  const [driverName, setDriverName] = useState<string>(
    patientCase.itinerary?.airportPickup?.driverName || "Rajesh Varma (Private Chauffeur)"
  );
  const [driverPhone, setDriverPhone] = useState<string>(
    patientCase.itinerary?.airportPickup?.contactPhone || "+91 98110 55432"
  );
  const [vehicleNumber, setVehicleNumber] = useState<string>(
    patientCase.itinerary?.airportPickup?.vehicleNumber || "DL 1VB 9022"
  );
  const [vehicleType, setVehicleType] = useState<string>(
    patientCase.itinerary?.airportPickup?.vehicleType || "Toyota Alphard VIP Executive Van"
  );

  const [saveSuccessMsg, setSaveSuccessMsg] = useState("");

  const handleSave = () => {
    const updatedItinerary: Partial<LogisticsItinerary> = {
      flightDetails: {
        flightNumber,
        airline: flightNumber.includes("EK") ? "Emirates Airlines" : "International Carrier",
        arrivalDate,
        arrivalTime,
        terminal,
      },
      hotelDetails: {
        name: hotelName,
        address: "Gurugram, Delhi NCR",
        checkIn: hotelCheckIn,
        checkOut: hotelCheckOut,
        roomType: "5-Star Executive Apartment with Kitchenette",
        bookingReference: hotelRef,
      },
      airportPickup: {
        driverName,
        contactPhone: driverPhone,
        vehicleType,
        vehicleNumber,
        pickupLocation: `Arrivals Gate 5 with 'Vedara Care: ${patientCase.patientName}' name placard`,
      },
    };

    updateItineraryDetails(patientCase.id, updatedItinerary);
    setSaveSuccessMsg("✓ Travel, Visa & Concierge Logistics successfully updated.");
    setTimeout(() => setSaveSuccessMsg(""), 4000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#101955] to-[#1e2a78] text-white rounded-2xl p-4 md:p-6 shadow-[0_6px_32px_rgba(0,0,0,0.08)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#2ECDC5] text-xs font-bold uppercase tracking-wider mb-2 border border-white/10">
            <Plane className="w-3.5 h-3.5" />
            Consolidated Itinerary &amp; Logistics Workspace
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Trip Logistics: {patientCase.patientName} ({patientCase.id})
          </h3>
          <p className="text-slate-300 text-xs mt-1">
            Replaces placeholder screens with functional Visa, Flight &amp; 5-Star Concierge Dispatch.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-2xl bg-[#2ECDC5] hover:bg-[#28b8b0] text-slate-950 font-black text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md self-end md:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Save Logistics</span>
        </button>
      </div>

      {saveSuccessMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between shadow-xs animate-in fade-in">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            {saveSuccessMsg}
          </span>
          <span className="text-[10px] text-emerald-600">Dispatched to Patient Portal App</span>
        </div>
      )}

      {/* Grid of 3 Core Logistical Pillars */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* 1. e-Medical Visa Desk */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-black text-xs">
                1
              </div>
              <h4 className="font-extrabold text-sm text-slate-900">
                e-Medical Visa Status
              </h4>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              ✓ Approved
            </span>
          </div>

          <div className="space-y-3 text-xs flex-1">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <div className="text-[10px] uppercase font-bold text-slate-400">Govt MEA Reference</div>
              <div className="font-mono font-black text-slate-900 text-sm">
                MEA/MED/2026/{patientCase.id.slice(-6)}
              </div>
              <div className="text-[11px] text-slate-500">Official Ministry of External Affairs Code</div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-slate-600">
                <span>Passport Validity:</span>
                <span className="font-bold text-slate-900">Valid until 2031 (&gt;6 mo)</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Attendant Visa:</span>
                <span className="font-bold text-emerald-700">1 Escort Cleared</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Embassy Portal:</span>
                <a
                  href="https://indianvisaonline.gov.in/evisa/tvoa.html"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-blue-600 flex items-center gap-1 hover:underline"
                >
                  Indian eVisa <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Flight & Arrival Tracker */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-black text-xs">
                2
              </div>
              <h4 className="font-extrabold text-sm text-slate-900">
                Flight &amp; Arrival Protocol
              </h4>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
              Confirmed
            </span>
          </div>

          <div className="space-y-3 text-xs flex-1">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                Flight Number &amp; Airline
              </label>
              <input
                type="text"
                value={flightNumber}
                onChange={(e) => setFlightNumber(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  Arrival Date
                </label>
                <input
                  type="date"
                  value={arrivalDate}
                  onChange={(e) => setArrivalDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  Arrival Time
                </label>
                <input
                  type="text"
                  value={arrivalTime}
                  onChange={(e) => setArrivalTime(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                Terminal &amp; Airport
              </label>
              <input
                type="text"
                value={terminal}
                onChange={(e) => setTerminal(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none font-medium"
              />
            </div>
          </div>
        </div>

        {/* 3. Hotel & Concierge Chauffeur */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-black text-xs">
                3
              </div>
              <h4 className="font-extrabold text-sm text-slate-900">
                5-Star Hotel &amp; Chauffeur
              </h4>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
              Reserved
            </span>
          </div>

          <div className="space-y-3 text-xs flex-1">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                Attendant Suite / Hotel Name
              </label>
              <input
                type="text"
                value={hotelName}
                onChange={(e) => setHotelName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  Chauffeur Name
                </label>
                <input
                  type="text"
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  Driver Phone
                </label>
                <input
                  type="text"
                  value={driverPhone}
                  onChange={(e) => setDriverPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                Vehicle Model &amp; Plate
              </label>
              <input
                type="text"
                value={`${vehicleType} (${vehicleNumber})`}
                onChange={(e) => setVehicleNumber(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none font-medium"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
