"use client";

import React, { useState, useEffect } from "react";
import { useCare } from "@/context/CareContext";
import { CheckCircle2, ArrowLeft, ShieldCheck, Sparkles, AlertCircle, X } from "lucide-react";

export interface ConfidentialAssessmentProps {
  initialTreatment?: string;
  onClose?: () => void;
  isModal?: boolean;
}

export const ConfidentialMedicalAssessment: React.FC<ConfidentialAssessmentProps> = ({
  initialTreatment = "",
  onClose,
  isModal = false,
}) => {
  const { language, openChat } = useCare();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1 State
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [treatment, setTreatment] = useState(initialTreatment || "");
  const [details, setDetails] = useState("");
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);

  // Step 2 State
  const [patientAgeOrDob, setPatientAgeOrDob] = useState("");
  const [doctorPreference, setDoctorPreference] = useState("");
  const [treatmentTimeline, setTreatmentTimeline] = useState("");
  const [preferredHospitalCity, setPreferredHospitalCity] = useState("");

  // Validation Errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [caseId, setCaseId] = useState("");

  // Initialize treatment from props if provided
  useEffect(() => {
    if (initialTreatment && !treatment) {
      setTreatment(initialTreatment);
    }
  }, [initialTreatment, treatment]);

  // Load draft from localStorage on mount (for steps info persistence)
  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem("vedara_assessment_draft");
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        if (parsed.fullName) setFullName(parsed.fullName);
        if (parsed.country) setCountry(parsed.country);
        if (parsed.phone) setPhone(parsed.phone);
        if (parsed.email) setEmail(parsed.email);
        if (parsed.treatment && !initialTreatment) setTreatment(parsed.treatment);
        if (parsed.details) setDetails(parsed.details);
        if (parsed.agreedToPrivacy) setAgreedToPrivacy(parsed.agreedToPrivacy);
        if (parsed.patientAgeOrDob) setPatientAgeOrDob(parsed.patientAgeOrDob);
        if (parsed.doctorPreference) setDoctorPreference(parsed.doctorPreference);
        if (parsed.treatmentTimeline) setTreatmentTimeline(parsed.treatmentTimeline);
        if (parsed.preferredHospitalCity) setPreferredHospitalCity(parsed.preferredHospitalCity);
      }
    } catch (e) {
      console.warn("Could not load assessment draft", e);
    }
  }, [initialTreatment]);

  // Save draft to localStorage on any state change
  useEffect(() => {
    try {
      const draft = {
        fullName,
        country,
        phone,
        email,
        treatment,
        details,
        agreedToPrivacy,
        patientAgeOrDob,
        doctorPreference,
        treatmentTimeline,
        preferredHospitalCity,
      };
      localStorage.setItem("vedara_assessment_draft", JSON.stringify(draft));
    } catch (e) {
      console.warn("Could not save assessment draft", e);
    }
  }, [
    fullName,
    country,
    phone,
    email,
    treatment,
    details,
    agreedToPrivacy,
    patientAgeOrDob,
    doctorPreference,
    treatmentTimeline,
    preferredHospitalCity,
  ]);

  // Step 1 Validation
  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = "Please enter your full name.";
    }

    if (!country || country === "Select" || country === "") {
      newErrors.country = "Please select your country.";
    }

    if (!phone.trim() || phone.trim().length < 6) {
      newErrors.phone = "Please enter a valid phone or WhatsApp number.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!treatment || treatment === "Select" || treatment === "") {
      newErrors.treatment = "Please choose the treatment you are interested in.";
    }

    if (!agreedToPrivacy) {
      newErrors.agreedToPrivacy = "You must agree to the privacy policy to continue.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step 2 Validation
  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!patientAgeOrDob.trim()) {
      newErrors.patientAgeOrDob = "Please provide patient's age or date of birth.";
    }

    if (!doctorPreference) {
      newErrors.doctorPreference = "Please select what kind of doctors to recommend.";
    }

    if (!treatmentTimeline) {
      newErrors.treatmentTimeline = "Please select when you plan for this treatment.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setErrors({});
      setStep(2);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep2()) {
      setIsSubmitting(true);
      setErrors({});

      setTimeout(() => {
        const year = new Date().getFullYear();
        const randomSeq = String(Math.floor(1000 + Math.random() * 9000)).padStart(6, "0");
        const generatedId = `PT-${year}-${randomSeq}`;
        setCaseId(generatedId);

        // Save submitted assessment to persistent storage
        try {
          const submittedRecord = {
            caseId: generatedId,
            submittedAt: new Date().toISOString(),
            fullName,
            country,
            phone,
            email,
            treatment,
            details,
            patientAgeOrDob,
            doctorPreference,
            treatmentTimeline,
            preferredHospitalCity,
          };
          const existing = JSON.parse(localStorage.getItem("vedara_submitted_assessments") || "[]");
          existing.push(submittedRecord);
          localStorage.setItem("vedara_submitted_assessments", JSON.stringify(existing));
          localStorage.removeItem("vedara_assessment_draft");
        } catch (err) {
          console.warn("Could not save submitted record", err);
        }

        setIsSubmitting(false);
        setStep(3);
      }, 900);
    }
  };

  const handleReset = () => {
    setStep(1);
    setFullName("");
    setCountry("");
    setPhone("");
    setEmail("");
    setTreatment("");
    setDetails("");
    setAgreedToPrivacy(false);
    setPatientAgeOrDob("");
    setDoctorPreference("");
    setTreatmentTimeline("");
    setPreferredHospitalCity("");
    setErrors({});
    if (onClose) onClose();
  };

  return (
    <div className="w-full bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border border-slate-100 relative">
      {/* Optional Close Button for Modals */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {/* Top 2-Step Progress Indicator */}
      <div className="grid grid-cols-2 gap-2 mb-8">
        {/* Step 1 Bar */}
        <div className={`h-1.5 rounded-full transition-all duration-300 ${step >= 1 ? "bg-gradient-to-r from-[#2ECDC5] to-[#3F4EB4]" : "bg-slate-200"}`}></div>
        {/* Step 2 Bar */}
        <div className={`h-1.5 rounded-full transition-all duration-300 ${step >= 2 ? "bg-gradient-to-r from-[#3F4EB4] to-[#283593]" : "bg-slate-200"}`}></div>
      </div>

      {/* ================= STEP 1: INITIAL ENQUIRY ================= */}
      {step === 1 && (
        <form onSubmit={handleContinue} className="space-y-5 animate-in fade-in duration-200">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Get a free consultation
            </h2>
            <p className="mt-1 text-sm text-slate-500 leading-relaxed">
              Tell us about your treatment needs — our care team will reach out within 24 hours.
            </p>
          </div>

          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-slate-800">
              Full name
            </label>
            <input
              type="text"
              placeholder="Jane Smith"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (errors.fullName) setErrors({ ...errors, fullName: "" });
              }}
              className={`w-full px-4 py-3 rounded-xl border text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${errors.fullName
                ? "border-red-400 focus:ring-red-300 bg-red-50/20"
                : "border-slate-300 focus:ring-teal-500 focus:border-teal-500"
                }`}
            />
            {errors.fullName && <p className="text-xs text-red-600 font-medium">{errors.fullName}</p>}
          </div>

          {/* Country & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Country */}
            <div className="space-y-1.5">
              <label className="block text-xs sm:text-sm font-semibold text-slate-800">
                Country
              </label>
              <select
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  if (errors.country) setErrors({ ...errors, country: "" });
                }}
                className={`w-full px-4 py-3 rounded-xl border text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 transition-all ${errors.country
                  ? "border-red-400 focus:ring-red-300 bg-red-50/20"
                  : "border-slate-300 focus:ring-teal-500 focus:border-teal-500"
                  }`}
              >
                <option value="">Select</option>
                <option value="United Kingdom">GB UK</option>
                <option value="Canada">CA Canada</option>
                <option value="Australia">AU Australia</option>
                <option value="United Arab Emirates">AE UAE</option>
                <option value="Saudi Arabia">SA Saudi Arabia</option>
                <option value="Qatar">QA Qatar</option>
                <option value="Oman">OM Oman</option>
                <option value="Other">Other Country</option>
              </select>
              {errors.country && <p className="text-xs text-red-600 font-medium">{errors.country}</p>}
            </div>

            {/* Phone / WhatsApp */}
            <div className="space-y-1.5">
              <label className="block text-xs sm:text-sm font-semibold text-slate-800">
                Phone / WhatsApp
              </label>
              <input
                type="tel"
                placeholder="+44 7700 900123"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors({ ...errors, phone: "" });
                }}
                className={`w-full px-4 py-3 rounded-xl border text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${errors.phone
                  ? "border-red-400 focus:ring-red-300 bg-red-50/20"
                  : "border-slate-300 focus:ring-teal-500 focus:border-teal-500"
                  }`}
              />
              {errors.phone && <p className="text-xs text-red-600 font-medium">{errors.phone}</p>}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-slate-800">
              Email
            </label>
            <input
              type="email"
              placeholder="jane@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: "" });
              }}
              className={`w-full px-4 py-3 rounded-xl border text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${errors.email
                ? "border-red-400 focus:ring-red-300 bg-red-50/20"
                : "border-slate-300 focus:ring-teal-500 focus:border-teal-500"
                }`}
            />
            {errors.email && <p className="text-xs text-red-600 font-medium">{errors.email}</p>}
          </div>

          {/* Treatment interested in */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-slate-800">
              Treatment interested in
            </label>
            <select
              value={treatment}
              onChange={(e) => {
                setTreatment(e.target.value);
                if (errors.treatment) setErrors({ ...errors, treatment: "" });
              }}
              className={`w-full px-4 py-3 rounded-xl border text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 transition-all ${errors.treatment
                ? "border-red-400 focus:ring-red-300 bg-red-50/20"
                : "border-slate-300 focus:ring-teal-500 focus:border-teal-500"
                }`}
            >
              <option value="">Select</option>
              <option value="Dental Implants">Dental Implants</option>
              <option value="Cosmetic & Aesthetic">Cosmetic & Aesthetic</option>
              <option value="Ophthalmology / Eye Care">Ophthalmology / Eye Care</option>
              <option value="Orthopedic Procedures">Orthopedic Procedures</option>
              <option value="Fertility / IVF">Fertility / IVF</option>
              <option value="Cardiac Surgery">Cardiac Surgery & Interventions</option>
              <option value="Oncology Care">Oncology & Cancer Therapy</option>
              <option value="Neurosurgery & Spine">Neurosurgery & Spine</option>
              <option value="Organ Transplant">Organ Transplant</option>
              <option value="Other">Other Specialist Care</option>
            </select>
            {errors.treatment && <p className="text-xs text-red-600 font-medium">{errors.treatment}</p>}
          </div>

          {/* Tell us more (optional) */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-slate-800">
              Tell us more (optional)
            </label>
            <textarea
              rows={3}
              placeholder="Any details about your condition or requirements"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all resize-none"
            />
          </div>

          {/* Privacy Agreement Checkbox */}
          <div className="space-y-1">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToPrivacy}
                onChange={(e) => {
                  setAgreedToPrivacy(e.target.checked);
                  if (errors.agreedToPrivacy) setErrors({ ...errors, agreedToPrivacy: "" });
                }}
                className="mt-0.5 w-4 h-4 rounded text-[#3F4EB4] focus:ring-[#3F4EB4] border-slate-300"
              />
              <span className="text-xs text-slate-600 leading-normal">
                I agree to the privacy policy and consent to being contacted about my enquiry.
              </span>
            </label>
            {errors.agreedToPrivacy && (
              <p className="text-xs text-red-600 font-medium pl-6.5">{errors.agreedToPrivacy}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#2ECDC5] via-[#2ECDC5] to-[#2abdb5] hover:from-[#283593] hover:to-[#2ECDC5] text-white font-extrabold text-sm tracking-wider uppercase shadow-lg shadow-[#283593]/20 hover:shadow-xl hover:shadow-[#283593]/30 hover:scale-[1.01] active:scale-[0.99] transition-all"
          >
            CONTINUE
          </button>
        </form>
      )}

      {/* ================= STEP 2: HOSPITAL QUESTIONS ================= */}
      {step === 2 && (
        <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-200">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Thank you. A few more questions for the hospital:
            </h2>
          </div>

          {/* Patient's age or date of birth */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-slate-800">
              Patient&apos;s age or date of birth <span className="text-[#3F4EB4]">*</span>
            </label>
            <input
              type="text"
              placeholder="Example: 30 yrs or 29-05-1985"
              value={patientAgeOrDob}
              onChange={(e) => {
                setPatientAgeOrDob(e.target.value);
                if (errors.patientAgeOrDob) setErrors({ ...errors, patientAgeOrDob: "" });
              }}
              className={`w-full px-4 py-3 rounded-xl border text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${errors.patientAgeOrDob
                  ? "border-red-400 focus:ring-red-300 bg-red-50/20"
                  : "border-slate-300 focus:ring-[#3F4EB4] focus:border-[#3F4EB4]"
                }`}
            />
            {errors.patientAgeOrDob && (
              <p className="text-xs text-red-600 font-medium">{errors.patientAgeOrDob}</p>
            )}
          </div>

          {/* Question 1: Doctor recommendation preference */}
          <div className="space-y-2.5 pt-2">
            <label className="block text-xs sm:text-sm font-semibold text-slate-800">
              1. What kind of doctors shall we recommend you? <span className="text-[#3F4EB4]">*</span>
            </label>
            <div className="space-y-2">
              {[
                {
                  id: "budget",
                  label: "I am looking for the cheapest option, I have a very strict budget.",
                },
                {
                  id: "value",
                  label: "I am somewhat flexible with my budget. I am looking for value for money — good doctor and decent price.",
                },
                {
                  id: "premium",
                  label: "I want the best doctor available. I want 5-star services for myself.",
                },
                {
                  id: "other_doc",
                  label: "Other",
                },
              ].map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${doctorPreference === opt.label
                      ? "border-[#3F4EB4] bg-[#3F4EB4]/5 text-slate-900 font-medium ring-1 ring-[#3F4EB4]/20"
                      : "border-slate-200 hover:bg-slate-50 text-slate-700"
                    }`}
                >
                  <input
                    type="radio"
                    name="doctorPreference"
                    value={opt.label}
                    checked={doctorPreference === opt.label}
                    onChange={() => {
                      setDoctorPreference(opt.label);
                      if (errors.doctorPreference) setErrors({ ...errors, doctorPreference: "" });
                    }}
                    className="mt-1 w-4 h-4 text-[#3F4EB4] focus:ring-[#3F4EB4]"
                  />
                  <span className="text-xs sm:text-sm leading-relaxed">{opt.label}</span>
                </label>
              ))}
            </div>
            {errors.doctorPreference && (
              <p className="text-xs text-red-600 font-medium">{errors.doctorPreference}</p>
            )}
          </div>

          {/* Question 2: Treatment Timeline */}
          <div className="space-y-2.5 pt-2">
            <label className="block text-xs sm:text-sm font-semibold text-slate-800">
              2. How soon do you plan for this treatment? <span className="text-[#3F4EB4]">*</span>
            </label>
            <div className="space-y-2">
              {[
                {
                  id: "later",
                  label: "I am not sure yet. Maybe after 3–4 months.",
                },
                {
                  id: "ready",
                  label: "I already have my dates ready. I am just looking for the right doctor/price from your side.",
                },
                {
                  id: "travel_soon",
                  label: "Once you help me find the right doctor/price, I can travel in the next 30–45 days.",
                },
                {
                  id: "other_time",
                  label: "Other",
                },
              ].map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${treatmentTimeline === opt.label
                      ? "border-[#3F4EB4] bg-[#3F4EB4]/5 text-slate-900 font-medium ring-1 ring-[#3F4EB4]/20"
                      : "border-slate-200 hover:bg-slate-50 text-slate-700"
                    }`}
                >
                  <input
                    type="radio"
                    name="treatmentTimeline"
                    value={opt.label}
                    checked={treatmentTimeline === opt.label}
                    onChange={() => {
                      setTreatmentTimeline(opt.label);
                      if (errors.treatmentTimeline) setErrors({ ...errors, treatmentTimeline: "" });
                    }}
                    className="mt-1 w-4 h-4 text-[#3F4EB4] focus:ring-[#3F4EB4]"
                  />
                  <span className="text-xs sm:text-sm leading-relaxed">{opt.label}</span>
                </label>
              ))}
            </div>
            {errors.treatmentTimeline && (
              <p className="text-xs text-red-600 font-medium">{errors.treatmentTimeline}</p>
            )}
          </div>

          {/* Preferred hospital or city (optional) */}
          <div className="space-y-1.5 pt-2">
            <label className="block text-xs sm:text-sm font-semibold text-slate-800">
              Do you have any preferred hospital or city?
            </label>
            <input
              type="text"
              placeholder="Any preference for hospital or city?"
              value={preferredHospitalCity}
              onChange={(e) => setPreferredHospitalCity(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3F4EB4] focus:border-[#3F4EB4] transition-all"
            />
          </div>

          {/* Action Buttons: Back + SUBMIT */}
          <div className="pt-3 space-y-3">
            <button
              type="button"
              onClick={() => {
                setErrors({});
                setStep(1);
              }}
              className="w-full py-3 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-colors"
            >
              Back
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#2ECDC5] via-[#2ECDC5] to-[#2abdb5] hover:from-[#283593] hover:to-[#2ECDC5] text-white font-extrabold text-sm tracking-wider uppercase shadow-lg shadow-[#283593]/20 hover:shadow-xl hover:shadow-[#283593]/30 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  <span>SUBMITTING...</span>
                </>
              ) : (
                <span>SUBMIT</span>
              )}
            </button>
          </div>
        </form>
      )}

      {/* ================= STEP 3: CONFIRMATION ================= */}
      {step === 3 && (
        <div className="py-8 text-center space-y-6 animate-in zoom-in-95 duration-300">
          {/* Green Checkmark Circle */}
          <div className="w-16 h-16 rounded-full bg-[#2ECDC5]/15 text-[#2ECDC5] flex items-center justify-center mx-auto shadow-inner">
            <svg
              className="w-8 h-8 stroke-current stroke-[3] fill-none"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Request received
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              A care coordinator will review your details and contact you within 24 hours.
            </p>
          </div>

          {/* Assessment Summary Card */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 max-w-md mx-auto text-left rtl:text-right space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs">
              <span className="font-bold text-slate-500 uppercase tracking-wider">Assessment Ref</span>
              <span className="font-mono font-bold text-[#283593] bg-[#3F4EB4]/10 px-2 py-0.5 rounded">
                {caseId || "VED-2026-9021"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-400 block">Patient</span>
                <span className="font-semibold text-slate-800">{fullName || "Jane Smith"}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Treatment</span>
                <span className="font-semibold text-blue-700">{treatment || "Specialized Care"}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Country</span>
                <span className="font-semibold text-slate-800">{country || "Selected Region"}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Contact</span>
                <span className="font-semibold text-slate-800">{phone}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col gap-2.5 max-w-md mx-auto">
            <a
              href="/patient"
              className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#2ECDC5] via-[#2ECDC5] to-[#2abdb5] hover:from-[#283593] hover:to-[#2ECDC5] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Open My Patient Portal Dashboard</span>
            </a>

            <div className="flex gap-2">
              <button
                onClick={() => openChat(`Hello, I just submitted assessment ${caseId} for ${treatment}. Can I speak with coordinator Aisha?`)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-[#3F4EB4]/10 border border-[#3F4EB4]/30 hover:bg-[#3F4EB4]/20 text-[#283593] font-bold text-xs uppercase tracking-wider transition-colors"
              >
                Live Chat Desk
              </button>
              {onClose && (
                <button
                  onClick={handleReset}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
