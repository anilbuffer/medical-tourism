"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCare } from "@/context/CareContext";
import {
  X,
  Star,
  MapPin,
  Building,
  Award,
  Video,
  Calendar,
  Clock,
  Globe,
  CheckCircle2,
  Lock,
  Sparkles,
} from "lucide-react";

export const DoctorModal = () => {
  const { selectedDoctor, closeDoctorModal, language, openIntake, formatPrice } = useCare();
  const [selectedDate, setSelectedDate] = useState("Tomorrow");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("4:30 PM IST (3:00 PM GST)");
  const [isBooked, setIsBooked] = useState(false);

  if (!selectedDoctor) return null;

  const timeSlots = [
    "11:00 AM IST (9:30 AM GST)",
    "2:00 PM IST (12:30 PM GST)",
    "4:30 PM IST (3:00 PM GST)",
    "6:00 PM IST (4:30 PM GST)",
  ];

  const handleConfirm = () => {
    setIsBooked(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8">
        {/* Top Header */}
        <div className="bg-[#0C2338] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#F0A126] font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#F0A126]" />
            <span>Senior Specialist Profile & Video Consultation</span>
          </div>
          <button
            onClick={closeDoctorModal}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {isBooked ? (
            <div className="text-center py-8 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-[#0B8F83]/15 text-[#0B8F83] rounded-full mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#0C2338] font-heading">
                Video Consultation Slot Reserved!
              </h3>
              <p className="text-sm text-[#6B7C88] max-w-md mx-auto">
                Your consultation request with{" "}
                <span className="font-bold text-[#0C2338]">
                  {language === "ar" ? selectedDoctor.nameAr : selectedDoctor.name}
                </span>{" "}
                has been submitted for {selectedDate} at {selectedTimeSlot}. Aisha Khan will contact you with the secure video room link.
              </p>
              <button
                onClick={() => {
                  setIsBooked(false);
                  closeDoctorModal();
                }}
                className="px-6 py-3 bg-[#0B5D68] hover:bg-[#0C2338] text-white font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              {/* Doctor Bio Header */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shrink-0 ring-4 ring-[#0B5D68]/15 shadow-md">
                  <Image
                    src={selectedDoctor.avatar}
                    alt={selectedDoctor.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="space-y-1.5 text-center sm:text-left rtl:sm:text-right flex-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#ECF4F7] text-[#0B5D68] text-[11px] font-bold">
                      {language === "ar" ? selectedDoctor.specialtyAr : selectedDoctor.specialty}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#ECF4F7] text-[#0C2338] text-[11px] font-bold flex items-center gap-1 border border-[#DCE6EB]">
                      <Star className="w-3 h-3 fill-[#F0A126] text-[#F0A126]" />
                      <span>{selectedDoctor.rating} ({selectedDoctor.reviewsCount} reviews)</span>
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-[#0C2338] font-heading">
                    {language === "ar" ? selectedDoctor.nameAr : selectedDoctor.name}
                  </h3>

                  <p className="text-xs text-[#0B5D68] font-semibold">
                    {language === "ar" ? selectedDoctor.titleAr : selectedDoctor.title}
                  </p>

                  <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-[#6B7C88]">
                    <div className="flex items-center gap-1">
                      <Building className="w-3.5 h-3.5 text-[#0B5D68]" />
                      <span>{language === "ar" ? selectedDoctor.hospitalAr : selectedDoctor.hospital}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#F0A126]" />
                      <span>{language === "ar" ? selectedDoctor.cityAr : selectedDoctor.city}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-[#0B5D68]" />
                      <span>{selectedDoctor.experienceYears}+ Yrs Experience</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio & Credentials */}
              <div className="bg-[#ECF4F7]/40 rounded-2xl p-4 space-y-2 border border-[#DCE6EB] text-xs text-[#6B7C88] leading-relaxed">
                <p>{language === "ar" ? selectedDoctor.bioAr : selectedDoctor.bio}</p>
                <div className="pt-2 border-t border-[#DCE6EB] flex flex-wrap gap-x-4 gap-y-1 text-[11px]">
                  <span className="font-bold text-[#0C2338]">Education:</span>
                  <span>{selectedDoctor.education}</span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px]">
                  <span className="font-bold text-[#0C2338]">Fellowships:</span>
                  <span>{selectedDoctor.fellowships.join(" · ")}</span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px]">
                  <span className="font-bold text-[#0C2338]">Languages:</span>
                  <span className="text-[#0B5D68] font-semibold">{selectedDoctor.languages.join(" · ")}</span>
                </div>
              </div>

              {/* Video Consultation Booking Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#0B5D68]/10 text-[#0B5D68] flex items-center justify-center">
                      <Video className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0C2338] font-heading">Schedule Video Consultation</h4>
                      <p className="text-[11px] text-[#6B7C88]">30-min direct clinical discussion with Senior Specialist</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-[#6B7C88]">Consultation Fee</div>
                    <div className="text-base font-extrabold text-[#0B5D68] font-heading">
                      {formatPrice(selectedDoctor.consultationFeeUsd)}
                    </div>
                  </div>
                </div>

                {/* Day selector */}
                <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
                  {["Tomorrow", "In 2 Days", "In 3 Days"].map((day) => (
                    <button
                      type="button"
                      key={day}
                      onClick={() => setSelectedDate(day)}
                      className={`py-2 px-3 rounded-xl border text-center transition-all cursor-pointer ${selectedDate === day
                        ? "bg-[#0B5D68] border-[#0B5D68] text-white font-bold"
                        : "bg-slate-50 border-[#DCE6EB] text-slate-700 hover:bg-slate-100"
                        }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>

                {/* Time slot selector */}
                <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                  {timeSlots.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`p-2.5 rounded-xl border text-left rtl:text-right transition-all flex items-center gap-2 cursor-pointer ${selectedTimeSlot === slot
                        ? "bg-[#0B5D68]/10 border-[#0B5D68] text-[#0B5D68] font-bold"
                        : "bg-white border-[#DCE6EB] text-slate-700 hover:bg-slate-50"
                        }`}
                    >
                      <Clock className="w-3.5 h-3.5 text-[#F0A126] shrink-0" />
                      <span className="truncate">{slot}</span>
                    </button>
                  ))}
                </div>

                {/* Confirm Action */}
                <div className="pt-2">
                  <button
                    onClick={handleConfirm}
                    className="w-full py-3.5 rounded-xl bg-[#0B5D68] hover:bg-[#0C2338] text-white font-extrabold text-sm shadow-xl shadow-[#0B5D68]/20 transition-all flex items-center justify-center gap-2 tracking-wide font-heading uppercase cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-[#F0A126]" />
                    <span>Confirm Video Consultation Slot</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
