"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { usePortal } from "@/lib/portal/store";
import {
  X,
  Sparkles,
  ShieldCheck,
  Clock,
  Send,
  Building2,
  UserCheck,
  CheckCircle2,
  FileText,
  Lock,
  ArrowRight,
  Globe,
  Phone,
  Mail,
  Copy,
  Check,
} from "lucide-react";

interface PublicIntakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEntryPath?: "general_enquiry" | "hospital_referred" | "doctor_referred";
  initialHospitalId?: string;
  initialDoctorId?: string;
  initialTreatment?: string;
}

export const PublicIntakeModal: React.FC<PublicIntakeModalProps> = ({
  isOpen,
  onClose,
  initialEntryPath = "general_enquiry",
  initialHospitalId = "hosp_medanta",
  initialDoctorId = "doc_trehan",
  initialTreatment = "",
}) => {
  const router = useRouter();
  const { createNewLead, loginAs } = usePortal();

  const [entryPath, setEntryPath] = useState<"general_enquiry" | "hospital_referred" | "doctor_referred">(
    initialEntryPath
  );
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("United Kingdom");
  const [treatmentCategory, setTreatmentCategory] = useState(
    initialTreatment || "Cardiology & Cardiac Surgery"
  );
  const [preferredContactTime, setPreferredContactTime] = useState("Morning (09:00 - 12:00)");
  const [selectedHospital, setSelectedHospital] = useState(initialHospitalId);
  const [selectedDoctor, setSelectedDoctor] = useState(initialDoctorId);
  const [notes, setNotes] = useState("");
  const [privacyAgreed, setPrivacyAgreed] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedCaseId, setSubmittedCaseId] = useState<string | null>(null);
  const [submittedCaseData, setSubmittedCaseData] = useState<any>(null);
  const [copiedId, setCopiedId] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !privacyAgreed) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const { patientId, newCase } = createNewLead({
        fullName,
        email,
        phone,
        country,
        treatmentCategory,
        preferredContactTime,
        entryPath,
        referredHospitalId: entryPath === "hospital_referred" ? selectedHospital : undefined,
        referredDoctorId: entryPath === "doctor_referred" ? selectedDoctor : undefined,
        notes,
        utmSource: "direct_marketing_portal",
        utmMedium: "web_intake_form",
        utmCampaign: "international_medical_travel",
      });

      setSubmittedCaseId(patientId);
      setSubmittedCaseData(newCase);
      setIsSubmitting(false);
    }, 700);
  };

  const handleCopyId = () => {
    if (submittedCaseId) {
      navigator.clipboard.writeText(submittedCaseId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const handleAccessPortalDirectly = () => {
    if (submittedCaseData) {
      // Auto login as this new patient
      loginAs({
        id: `user_${submittedCaseData.id}`,
        name: submittedCaseData.patientName,
        email: submittedCaseData.patientEmail,
        role: "patient",
        patientId: submittedCaseData.id,
        country: submittedCaseData.patientCountry,
        phone: submittedCaseData.patientPhone,
      });
      onClose();
      router.push("/patient");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#0E1F40] via-[#1A365D] to-[#0A8982] p-6 sm:p-8 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-semibold tracking-wider uppercase mb-3 border border-emerald-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            Fast-Track Public Intake Desk
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Begin Your International Treatment
          </h2>
          <p className="text-slate-300 text-sm mt-1 max-w-xl">
            Get an instant permanent Patient ID, guaranteed 45-min SLA coordinator review, and itemized hospital estimates.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {!submittedCaseId ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Entry Path Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Entry Routing Path
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setEntryPath("general_enquiry")}
                    className={`p-3 rounded-xl text-xs font-semibold border flex flex-col items-center gap-1.5 transition-all ${
                      entryPath === "general_enquiry"
                        ? "bg-[#0E1F40] text-white border-[#0E1F40] shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <Globe className="w-4 h-4" />
                    <span>General Inquiry</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEntryPath("hospital_referred")}
                    className={`p-3 rounded-xl text-xs font-semibold border flex flex-col items-center gap-1.5 transition-all ${
                      entryPath === "hospital_referred"
                        ? "bg-[#0E1F40] text-white border-[#0E1F40] shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Hospital Referred</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEntryPath("doctor_referred")}
                    className={`p-3 rounded-xl text-xs font-semibold border flex flex-col items-center gap-1.5 transition-all ${
                      entryPath === "doctor_referred"
                        ? "bg-[#0E1F40] text-white border-[#0E1F40] shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Doctor Referred</span>
                  </button>
                </div>
              </div>

              {/* Conditional Selection for Hospital / Doctor Path */}
              {entryPath === "hospital_referred" && (
                <div className="p-3.5 bg-blue-50/70 rounded-2xl border border-blue-100 animate-in fade-in">
                  <label className="block text-xs font-bold text-blue-900 mb-1">
                    Select Target Hospital
                  </label>
                  <select
                    value={selectedHospital}
                    onChange={(e) => setSelectedHospital(e.target.value)}
                    className="w-full bg-white border border-blue-200 text-slate-900 text-sm rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 font-medium"
                  >
                    <option value="hosp_medanta">Medanta The Medicity (Gurugram / Delhi NCR)</option>
                    <option value="hosp_apollo">Apollo Hospitals (Chennai & Delhi)</option>
                    <option value="hosp_fortis">Fortis Memorial Research Institute (FMRI)</option>
                    <option value="hosp_artemis">Artemis Hospital (Gurugram)</option>
                    <option value="hosp_max">Max Super Speciality Hospital (Saket)</option>
                  </select>
                </div>
              )}

              {entryPath === "doctor_referred" && (
                <div className="p-3.5 bg-indigo-50/70 rounded-2xl border border-indigo-100 animate-in fade-in">
                  <label className="block text-xs font-bold text-indigo-900 mb-1">
                    Select Target Specialist
                  </label>
                  <select
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                    className="w-full bg-white border border-indigo-200 text-slate-900 text-sm rounded-xl p-2.5 focus:ring-2 focus:ring-indigo-500 font-medium"
                  >
                    <option value="doc_trehan">Dr. Naresh Trehan (Cardiac Surgeon - Medanta)</option>
                    <option value="doc_ashok_rajgopal">Dr. Ashok Rajgopal (Robotic Joint Surgery - Apollo)</option>
                    <option value="doc_vinod_raina">Dr. Vinod Raina (Medical Oncology - Fortis)</option>
                    <option value="doc_arvinder_soin">Dr. A. S. Soin (Liver Transplant - Medanta)</option>
                    <option value="doc_anuradha_kapur">Dr. Anuradha Kapur (Advanced IVF & Fertility)</option>
                  </select>
                </div>
              )}

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Patient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Elena Rostova"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="e.g. elena@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 pl-10 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="+44 7700 900142"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 pl-10 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Patient Home Country *
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                  >
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Oman">Oman</option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Germany">Germany</option>
                    <option value="Other">Other Country</option>
                  </select>
                </div>
              </div>

              {/* Treatment Category & Preferred Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Treatment Category *
                  </label>
                  <select
                    value={treatmentCategory}
                    onChange={(e) => setTreatmentCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 font-medium focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                  >
                    <option value="Cardiology & Cardiac Surgery">Cardiology & Cardiac Surgery</option>
                    <option value="Orthopedics & Robotic Joint Replacement">Orthopedics & Joint Replacement</option>
                    <option value="Oncology & CyberKnife Radiosurgery">Oncology & Cancer Therapy</option>
                    <option value="Neurology & Spine Surgery">Neurology & Spine Surgery</option>
                    <option value="Organ Transplant (Liver / Kidney)">Organ Transplant (Liver / Kidney)</option>
                    <option value="IVF & Advanced Fertility Care">IVF & Advanced Fertility</option>
                    <option value="Cosmetic & Reconstructive Surgery">Cosmetic & Reconstructive</option>
                    <option value="Dental Implants & Full Reconstruction">Dental Implants & Full Mouth</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Preferred Coordinator Callback Time
                  </label>
                  <select
                    value={preferredContactTime}
                    onChange={(e) => setPreferredContactTime(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                  >
                    <option value="Immediate / As soon as possible">Immediate / As soon as possible</option>
                    <option value="Morning (09:00 - 12:00)">Morning (09:00 - 12:00 local time)</option>
                    <option value="Afternoon (12:00 - 17:00)">Afternoon (12:00 - 17:00 local time)</option>
                    <option value="Evening (17:00 - 21:00)">Evening (17:00 - 21:00 local time)</option>
                  </select>
                </div>
              </div>

              {/* Brief Clinical Note */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Brief Medical Summary or Symptoms (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Diagnosed with severe aortic valve stenosis, looking for non-invasive TAVR options."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all resize-none"
                />
              </div>

              {/* Privacy Consent Checkbox */}
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <input
                  type="checkbox"
                  id="privacy_intake_agree"
                  checked={privacyAgreed}
                  onChange={(e) => setPrivacyAgreed(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-slate-300 cursor-pointer"
                />
                <label htmlFor="privacy_intake_agree" className="text-xs text-slate-600 leading-relaxed cursor-pointer">
                  I agree to the secure HIPAA/GDPR health record transmission and request my dedicated coordinator assignment and permanent Patient ID.
                </label>
              </div>

              {/* Submit CTA */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <Lock className="w-4 h-4 text-emerald-600" />
                  <span>256-Bit Encrypted Healthcare Cloud</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !fullName || !email || !phone}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#0E1F40] via-[#1A365D] to-[#0A8982] hover:from-[#132A56] hover:to-[#0C9F97] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Generating Patient ID...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit & Generate Patient ID</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Submission Success State */
            <div className="text-center py-6 space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-700 font-extrabold bg-emerald-100/80 px-3 py-1 rounded-full">
                  Inquiry Registered & Routed
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-2">
                  Welcome to Vedara Care, {submittedCaseData?.patientName}!
                </h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto mt-1">
                  Your permanent Medical Tourism Patient ID has been issued. A confirmation has been dispatched to {submittedCaseData?.patientEmail}.
                </p>
              </div>

              {/* Patient ID Highlight Card */}
              <div className="max-w-md mx-auto p-4 bg-gradient-to-br from-slate-900 to-[#0E1F40] rounded-2xl text-white shadow-xl border border-slate-700">
                <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
                  Your Permanent Patient ID
                </div>
                <div className="flex items-center justify-center gap-3">
                  <span className="font-mono text-2xl sm:text-3xl font-black tracking-wider text-emerald-400">
                    {submittedCaseId}
                  </span>
                  <button
                    onClick={handleCopyId}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all text-xs flex items-center gap-1"
                    title="Copy Patient ID"
                  >
                    {copiedId ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-1 text-amber-300 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    SLA Clock: 45m Coordinator Call
                  </span>
                  <span className="text-slate-400">Queue: {submittedCaseData?.assignedQueue}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={handleAccessPortalDirectly}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>Open My Patient Portal Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all"
                >
                  Return to Website
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
