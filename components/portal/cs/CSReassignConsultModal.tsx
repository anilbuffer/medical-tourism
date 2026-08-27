"use client";

import React, { useState } from "react";
import {
  Video,
  UserCheck,
  Calendar,
  Clock,
  Building2,
  CheckCircle2,
  X,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { PatientCase } from "@/types/portal";
import { usePortal } from "@/lib/portal/store";

interface CSReassignConsultModalProps {
  isOpen: boolean;
  onClose: () => void;
  consultationItem: {
    time: string;
    patientName: string;
    doctorName: string;
    hospital: string;
    caseId?: string;
    patientCase?: PatientCase;
  };
}

export const CSReassignConsultModal: React.FC<CSReassignConsultModalProps> = ({
  isOpen,
  onClose,
  consultationItem,
}) => {
  const { addCsNote } = usePortal();

  const [doctorName, setDoctorName] = useState(consultationItem.doctorName);
  const [hospitalName, setHospitalName] = useState(consultationItem.hospital);
  const [timeSlot, setTimeSlot] = useState(consultationItem.time);
  const [reason, setReason] = useState("Doctor requested 30m slot adjustment for emergency case");
  const [notifyPatient, setNotifyPatient] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (consultationItem.caseId) {
      addCsNote(
        consultationItem.caseId,
        `[Consultation Reassigned] New Doctor: ${doctorName} (${hospitalName}) at ${timeSlot}. Reason: ${reason}`
      );
    }
    setIsSaved(true);
    setTimeout(() => {
      onClose();
      setIsSaved(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-[130] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden border border-slate-200 flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#101955] via-[#1b2360] to-[#141d60] p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-[#2ECDC5] ring-1 ring-white/20">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base leading-tight">Reassign Tele-Consultation</h3>
              <p className="text-xs text-slate-300">
                Patient: <strong className="text-white">{consultationItem.patientName}</strong>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 space-y-4 flex-1 overflow-y-auto">
          {/* Current Info */}
          <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 text-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Current Booking
              </span>
              <span className="font-extrabold text-slate-800">
                {consultationItem.time} • {consultationItem.doctorName} ({consultationItem.hospital})
              </span>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 font-bold text-[10px]">
              Active Slot
            </span>
          </div>

          {/* Select Doctor */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Select Super-Specialist Doctor</label>
            <select
              value={doctorName}
              onChange={(e) => {
                setDoctorName(e.target.value);
                if (e.target.value.includes("Gupta") || e.target.value.includes("Trehan")) {
                  setHospitalName("Medanta");
                } else if (e.target.value.includes("Seth") || e.target.value.includes("Raina")) {
                  setHospitalName("Fortis");
                } else {
                  setHospitalName("Apollo");
                }
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 font-bold focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none cursor-pointer"
            >
              <option value="Dr. Subhash Gupta">Dr. Subhash Gupta — Chief Liver Transplant Surgeon (Medanta)</option>
              <option value="Dr. Naresh Trehan">Dr. Naresh Trehan — Chairman Cardiovascular Surgery (Medanta)</option>
              <option value="Dr. Ashok Seth">Dr. Ashok Seth — Chairman Interventional Cardiology (Fortis)</option>
              <option value="Dr. Vinod Raina">Dr. Vinod Raina — Executive Director Oncology (Fortis)</option>
              <option value="Dr. Ashok Rajgopal">Dr. Ashok Rajgopal — Chairman Robotic Orthopedics (Apollo)</option>
            </select>
          </div>

          {/* Time Slot Picker */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">New Consultation Time Slot</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                "Today 14:30 IST",
                "Today 16:00 IST",
                "Today 17:00 IST",
                "Today 18:30 IST",
                "Tomorrow 11:30 IST",
                "Tomorrow 15:00 IST",
              ].map((slot) => {
                const isSelected = timeSlot === slot;
                return (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setTimeSlot(slot)}
                    className={`py-2 px-2.5 rounded-xl text-[11px] font-bold text-center border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#101955] text-white border-[#101955] shadow-xs"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reason for Reassignment */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Reason for Reassignment</label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Schedule conflict, doctor operating theater overrun..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none"
            />
          </div>

          {/* Auto-Notify Patient via WhatsApp & SMS */}
          <div className="bg-emerald-50 rounded-2xl p-3.5 border border-emerald-200">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={notifyPatient}
                onChange={(e) => setNotifyPatient(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
              />
              <div>
                <span className="text-xs font-bold text-emerald-950 block">
                  Instantly Send WhatsApp &amp; SMS Update to Patient
                </span>
                <span className="text-[11px] text-emerald-700">
                  Sends automatic calendar invite and WebRTC room link in patient's preferred language.
                </span>
              </div>
            </label>
          </div>

          {/* Footer Actions */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#101955] hover:bg-[#1a2770] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-[#2ECDC5]" />
              <span>{isSaved ? "Reassigned!" : "Confirm Reassignment"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
