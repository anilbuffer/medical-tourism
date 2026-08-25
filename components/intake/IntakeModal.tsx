"use client";

import React, { useState, useEffect } from "react";
import { useCare } from "@/context/CareContext";
import { SPECIALTIES, CARE_COORDINATOR } from "@/data/mockData";
import {
  X,
  CheckCircle2,
  Upload,
  Lock,
  ArrowRight,
  ArrowLeft,
  FileCheck,
  ShieldCheck,
  Sparkles,
  Phone,
  Mail,
  User,
  AlertCircle,
  Calendar,
  Building,
} from "lucide-react";

export const IntakeModal = () => {
  const { isIntakeOpen, closeIntake, intakeSpecialty, language, t } = useCare();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [caseId, setCaseId] = useState("");

  // Form State
  const [specialty, setSpecialty] = useState(intakeSpecialty || "");
  const [conditionDetails, setConditionDetails] = useState("");
  const [preferredCity, setPreferredCity] = useState("Any / Best Match");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("United Arab Emirates");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (intakeSpecialty) {
      setSpecialty(intakeSpecialty);
    }
  }, [intakeSpecialty]);

  if (!isIntakeOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).map((f) => f.name);
      setUploadedFiles((prev) => [...prev, ...files]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const randomId = `VED-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setCaseId(randomId);
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setSubmitted(false);
    setStep(1);
    setSpecialty("");
    setConditionDetails("");
    setFullName("");
    setEmail("");
    setPhone("");
    setUploadedFiles([]);
    closeIntake();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8">
        {/* Top Header Strip */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-300">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-tight text-white font-sans">
                {language === "ar" ? "بدء تقييم الرعاية الطبية" : "Start Your Care Assessment"}
              </h3>
              <p className="text-xs text-teal-300">
                {language === "ar" ? "استشارة وتنسيق طبي مجاني وسري" : "Confidential & Complimentary Care Coordination"}
              </p>
            </div>
          </div>
          <button
            onClick={closeIntake}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar (if not submitted) */}
        {!submitted && (
          <div className="bg-slate-50 border-b border-slate-100 px-6 py-3">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-1.5">
              <span>{step === 1 ? "Step 1 of 3: Medical Need" : step === 2 ? "Step 2 of 3: Diagnostic Files" : "Step 3 of 3: Contact & Logistics"}</span>
              <span className="text-teal-700">{Math.round((step / 3) * 100)}% Complete</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            /* Success State */
            <div className="text-center py-6 space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-emerald-600/20">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="inline-block px-3 py-1 bg-teal-50 text-teal-800 rounded-full text-xs font-extrabold tracking-wider">
                  CASE ID: {caseId}
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900">
                  {language === "ar" ? "تم استلام طلبك بنجاح!" : "Your Care Assessment is Underway"}
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  {language === "ar"
                    ? `قام فريقنا بتعيين منسقة الرعاية ${CARE_COORDINATOR.nameAr} لمراجعة تقاريرك مع كبار الاستشاريين. ستتلقى تفاصيل الخطة العلاجية والتقدير المالي خلال 12-24 ساعة.`
                    : `Our clinical board has assigned ${CARE_COORDINATOR.name} to oversee your case review. You will receive vetted specialist options and indicative cost packages within 12–24 hours.`}
                </p>
              </div>

              {/* Assigned Coordinator Card */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 max-w-md mx-auto flex items-center gap-4 text-left rtl:text-right">
                <img
                  src={CARE_COORDINATOR.avatar}
                  alt={CARE_COORDINATOR.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-teal-500"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-slate-900">
                    {language === "ar" ? CARE_COORDINATOR.nameAr : CARE_COORDINATOR.name}
                  </div>
                  <div className="text-[11px] text-teal-700 font-semibold">
                    {language === "ar" ? CARE_COORDINATOR.roleAr : CARE_COORDINATOR.role}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Languages: {CARE_COORDINATOR.languages.join(" · ")}
                  </div>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="w-full max-w-sm mx-auto py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-all shadow-md"
              >
                {language === "ar" ? "إغلاق والعودة للموقع" : "Close & Return to Portal"}
              </button>
            </div>
          ) : (
            /* Multi-Step Form */
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Medical Specialty / Treatment
                    </label>
                    <select
                      value={specialty}
                      onChange={(e) => setSpecialty(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    >
                      <option value="">Select a specialty or treatment area</option>
                      {SPECIALTIES.map((s) => (
                        <option key={s.id} value={s.name}>
                          {language === "ar" ? s.nameAr : s.name}
                        </option>
                      ))}
                      <option value="Other">Other / General Surgical Enquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Tell us about your current symptoms or diagnosis
                    </label>
                    <textarea
                      rows={3}
                      value={conditionDetails}
                      onChange={(e) => setConditionDetails(e.target.value)}
                      placeholder="e.g. Diagnosed with multi-vessel blockages, seeking beating-heart bypass options and cost estimates..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 placeholder:text-slate-400"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Preferred Destination City in India (Optional)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-semibold">
                      {["Any / Best Match", "New Delhi NCR", "Mumbai", "Bengaluru", "Chennai", "Hyderabad"].map(
                        (city) => (
                          <button
                            type="button"
                            key={city}
                            onClick={() => setPreferredCity(city)}
                            className={`py-2 px-3 rounded-xl border text-center transition-all ${
                              preferredCity === city
                                ? "bg-teal-50 border-teal-500 text-teal-900 font-bold"
                                : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                            }`}
                          >
                            {city}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md transition-all group"
                    >
                      <span>Continue to Step 2</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900">
                      Upload Medical Reports, Scans or Prescriptions
                    </h4>
                    <p className="text-xs text-slate-500">
                      Uploading recent MRI, CT scans, blood work or discharge summaries allows our specialists to provide an accurate second opinion.
                    </p>
                  </div>

                  {/* Dropzone */}
                  <div className="border-2 border-dashed border-slate-300 hover:border-teal-500 rounded-2xl p-6 text-center bg-slate-50 transition-colors relative">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept=".pdf,.jpg,.jpeg,.png,.dicom,.doc,.docx"
                    />
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
                        <Upload className="w-6 h-6" />
                      </div>
                      <div className="text-xs font-bold text-slate-800">
                        Drag & Drop or Click to Upload Scans & Reports
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Supports PDF, DICOM, JPEG, PNG up to 50MB per file
                      </div>
                    </div>
                  </div>

                  {/* Uploaded File List */}
                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-slate-700">Attached Files ({uploadedFiles.length})</div>
                      <div className="space-y-1.5 max-h-32 overflow-y-auto">
                        {uploadedFiles.map((file, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between bg-teal-50/70 border border-teal-200 rounded-xl px-3 py-2 text-xs font-medium text-teal-900"
                          >
                            <div className="flex items-center gap-2 truncate">
                              <FileCheck className="w-4 h-4 text-teal-600 shrink-0" />
                              <span className="truncate">{file}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile(idx)}
                              className="text-slate-400 hover:text-red-500 p-1"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2.5 text-xs text-amber-900">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>Don't have reports right now? You can skip this step and send them to Aisha over WhatsApp later.</span>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md transition-all group"
                    >
                      <span>Continue to Final Step</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900">
                      Your Contact & Care Coordination Details
                    </h4>
                    <p className="text-xs text-slate-500">
                      Our coordinator will connect with you via your preferred channel to present doctor profiles and answers.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Patient / Representative Full Name
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Mohammed Al-Falasi"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Country of Residence
                      </label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="United Arab Emirates">🇦🇪 UAE</option>
                        <option value="Saudi Arabia">🇸🇦 Saudi Arabia</option>
                        <option value="Oman">🇴🇲 Oman</option>
                        <option value="Kuwait">🇰🇼 Kuwait</option>
                        <option value="Qatar">🇶🇦 Qatar</option>
                        <option value="Kenya">🇰🇪 Kenya</option>
                        <option value="Nigeria">🇳🇬 Nigeria</option>
                        <option value="Bangladesh">🇧🇩 Bangladesh</option>
                        <option value="Uzbekistan">🇺🇿 Uzbekistan</option>
                        <option value="United Kingdom">🇬🇧 United Kingdom</option>
                        <option value="United States">🇺🇸 United States</option>
                        <option value="Other">Other Country</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        WhatsApp / Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+971 50 123 4567"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="patient@example.com"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-extrabold text-sm shadow-xl shadow-teal-700/20 disabled:opacity-50 transition-all"
                    >
                      {isSubmitting ? (
                        <span>Analyzing & Matching Specialists...</span>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-amber-300" />
                          <span>Submit My Care Assessment</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>

        {/* Modal Footer Trust Stamp */}
        <div className="bg-slate-50 border-t border-slate-100 px-6 py-3 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-teal-600" />
            <span>256-Bit HIPAA Compliant Medical Privacy</span>
          </div>
          <span>VEDARA International Care</span>
        </div>
      </div>
    </div>
  );
};
