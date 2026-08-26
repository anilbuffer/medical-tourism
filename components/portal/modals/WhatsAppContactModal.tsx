"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  Phone,
  Send,
  X,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { PatientCase } from "@/types/portal";

interface WhatsAppContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientCase: PatientCase;
}

export const WhatsAppContactModal: React.FC<WhatsAppContactModalProps> = ({
  isOpen,
  onClose,
  patientCase,
}) => {
  const [message, setMessage] = useState(
    "Hello Ananya, I am following up on my Living Donor Liver Transplant consultation scheduled for Thursday Aug 27."
  );

  if (!isOpen) return null;

  const handleLaunchWhatsApp = () => {
    const encoded = encodeURIComponent(message);
    const phone = "919810188412";
    window.open(`https://wa.me/${phone}?text=${encoded}`, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[120] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-slate-200">
        {/* Header with WhatsApp Branding */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 text-white relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                  alt="Ananya Sharma"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-white/80 shadow-md"
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 ring-2 ring-emerald-800" />
              </div>
              <div>
                <h3 className="font-extrabold text-base leading-tight">Ananya Sharma</h3>
                <div className="text-xs text-emerald-100 font-medium">Assigned Care Coordinator</div>
                <div className="text-[10px] text-emerald-200 flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  <span>Online • Instant WhatsApp Dispatch</span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Input & Quick Chips */}
        <div className="p-6 space-y-4">
          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Instant Message Preview
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
              Quick Templates
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() =>
                  setMessage(
                    "Hi Ananya, could you please confirm the video consultation connection link for Thursday?"
                  )
                }
                className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition-colors cursor-pointer"
              >
                Video Link
              </button>
              <button
                type="button"
                onClick={() =>
                  setMessage(
                    "Hi Ananya, I have uploaded the updated blood work serology. Please verify."
                  )
                }
                className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition-colors cursor-pointer"
              >
                Blood Work
              </button>
              <button
                type="button"
                onClick={() =>
                  setMessage(
                    "Hi Ananya, please confirm the airport VIP chauffeur pickup at Gate 5 on Aug 31."
                  )
                }
                className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition-colors cursor-pointer"
              >
                Airport Pickup
              </button>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100">
            <span className="flex items-center gap-1 font-bold text-emerald-700">
              <ShieldCheck className="w-3.5 h-3.5" />
              Direct Encrypted Line
            </span>
            <span>+91 98101 88412</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <a
              href="tel:+919810188412"
              className="py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>Direct Dial</span>
            </a>

            <button
              onClick={handleLaunchWhatsApp}
              className="py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/25 active:scale-95 transition-all cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Open WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
