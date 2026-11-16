'use client';

import React, { useEffect, useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Loader2, AlertCircle } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { useCountry } from '@/components/providers/AppProviders';
import {
  createLead,
  type CreateLeadPayload,
  type ApiErrorResponse,
} from '@/services/leads';

/* ------------------------------------------------------------------ */
/* Phone formatting & validation helpers (International format)      */
/* ------------------------------------------------------------------ */

/**
 * Standard international phone validation:
 * Allows optional leading '+', digits, spaces, hyphens, and parentheses.
 * Ensures total digit count is between 7 and 16 digits.
 */
export function isValidInternationalPhone(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  if (digits.length < 7 || digits.length > 16) return false;
  return /^\+?[\d\s\-()]{7,25}$/.test(value.trim());
}

export function cleanPhone(value: string): string {
  const trimmed = value.trim();
  const hasPlus = trimmed.startsWith('+');
  const digits = trimmed.replace(/\D/g, '');
  return hasPlus ? `+${digits}` : digits;
}

/* ------------------------------------------------------------------ */
/* Form Schema & Types (Zod)                                          */
/* ------------------------------------------------------------------ */

export const consultationSchema = z.object({
  // Part 1 fields
  fullName: z
    .string()
    .trim()
    .min(2, 'Please enter your full name'),
  country: z
    .string()
    .trim()
    .min(1, 'Please select your country')
    .refine((val) => val !== 'Select', 'Please select your country'),
  phone: z
    .string()
    .trim()
    .min(1, 'Please enter your phone number')
    .refine(
      (val) => isValidInternationalPhone(val),
      'Please enter a valid phone number (7 to 16 digits with optional +, spaces, or hyphens)'
    ),
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address'),
  treatmentCategory: z
    .string()
    .trim()
    .min(1, 'Please select a treatment')
    .refine((val) => val !== 'Select', 'Please select a treatment'),
  tellUsMore: z.string(),
  privacyConsentGiven: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the privacy policy to continue',
  }),

  // Part 2 fields
  patientAgeOrDob: z
    .string()
    .trim()
    .min(1, "Please provide the patient's age or date of birth"),
  doctorBudgetPreference: z
    .string()
    .min(1, 'Please select a doctor recommendation preference'),
  treatmentTimeline: z
    .string()
    .min(1, 'Please select your planned timeline'),
  preferredHospitalOrCity: z.string(),
});

export type ConsultationFormValues = z.infer<typeof consultationSchema>;

/* ------------------------------------------------------------------ */
/* Constants & Options                                                */
/* ------------------------------------------------------------------ */

const COUNTRY_OPTIONS = [
  'Oman',
  'United States',
  'United Kingdom',
  'UAE',
  'Saudi Arabia',
  'Canada',
  'Germany',
  'Bangladesh',
  'Nigeria',
  'Kenya',
  'Uzbekistan',
  'India',
  'Australia',
  'Other',
];

const TREATMENT_OPTIONS = [
  'Header Free Medical Opinion',
  'Joint Replacement',
  'Robotic Knee Replacement',
  'Spine Surgery',
  'Fertility & IVF',
  'Dental Care',
  'Eye Care',
  'Cosmetic & Plastic Surgery',
  'Cardiology & Heart Surgery',
  'GI & Oncology Surgery',
  'Organ Transplant',
  'Other Medical Specialty',
];

const DOCTOR_BUDGET_OPTIONS = [
  'I am looking for the cheapest option, I have a very strict budget.',
  'I am somewhat flexible with my budget. I am looking for value for money — good doctor and decent price.',
  'I want the best doctor available. I want 5-star services for myself.',
  'Other',
];

const TIMELINE_OPTIONS = [
  'I am not sure yet. Maybe after 3–4 months.',
  'I already have my dates ready. I am just looking for the right doctor/price from your side.',
  'Once you help me find the right doctor/price, I can travel in the next 30–45 days.',
  'Other',
];

/* ------------------------------------------------------------------ */
/* Modal Component                                                    */
/* ------------------------------------------------------------------ */

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedTreatment?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  preselectedTreatment,
}) => {
  const { selectedCountry } = useCountry();
  const titleId = useId();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [referenceId, setReferenceId] = useState<string>('PT-2026-000178');
  const [submittedData, setSubmittedData] = useState<ConsultationFormValues | null>(null);

  const defaultTreatment = preselectedTreatment || 'Header Free Medical Opinion';
  const defaultCountry = selectedCountry?.name || 'Oman';

  const {
    register,
    handleSubmit,
    control,
    trigger,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationSchema),
    mode: 'onTouched',
    defaultValues: {
      fullName: '',
      country: defaultCountry,
      phone: '',
      email: '',
      treatmentCategory: defaultTreatment,
      tellUsMore: '',
      privacyConsentGiven: false,
      patientAgeOrDob: '',
      doctorBudgetPreference: '',
      treatmentTimeline: '',
      preferredHospitalOrCity: '',
    },
  });

  // Keep defaults updated when preselected treatment or country changes
  useEffect(() => {
    if (preselectedTreatment) {
      setValue('treatmentCategory', preselectedTreatment);
    }
  }, [preselectedTreatment, setValue]);

  useEffect(() => {
    if (selectedCountry?.name) {
      setValue('country', selectedCountry.name);
    }
  }, [selectedCountry, setValue]);

  // Handle Close & Reset
  const handleClose = () => {
    setStep(1);
    setApiError(null);
    setSubmittedData(null);
    reset();
    onClose();
  };

  // Step 1 -> Step 2 validation
  const handleContinue = async () => {
    setApiError(null);
    const valid = await trigger([
      'fullName',
      'country',
      'phone',
      'email',
      'treatmentCategory',
      'privacyConsentGiven',
    ]);

    if (valid) {
      setStep(2);
    }
  };

  // Step 2 Submission to API
  const onSubmit = async (data: ConsultationFormValues) => {
    setApiError(null);
    setIsSubmitting(true);

    try {
      const formattedPhone = cleanPhone(data.phone) || data.phone.trim();

      // Build structured notes format
      const noteParts: string[] = [];
      if (data.tellUsMore?.trim()) {
        noteParts.push(data.tellUsMore.trim());
      }
      if (data.patientAgeOrDob?.trim()) {
        noteParts.push(`Age / DOB: ${data.patientAgeOrDob.trim()}`);
      }
      if (data.doctorBudgetPreference) {
        noteParts.push(`Budget: ${data.doctorBudgetPreference}`);
      }
      if (data.treatmentTimeline) {
        noteParts.push(`Timeline: ${data.treatmentTimeline}`);
      }
      if (data.preferredHospitalOrCity?.trim()) {
        noteParts.push(`Preferred city: ${data.preferredHospitalOrCity.trim()}`);
      }

      const notes = noteParts.join('\n');

      const payload: CreateLeadPayload = {
        fullName: data.fullName.trim(),
        email: data.email.trim(),
        phone: formattedPhone,
        country: data.country,
        treatmentCategory: data.treatmentCategory,
        notes,
        privacyConsentGiven: true,
      };

      const result = await createLead(payload);

      if (result.success && result.data?.id) {
        setReferenceId(result.data.id);
        setSubmittedData({
          ...data,
          phone: data.phone.trim(),
        });
        setStep(3);
      } else {
        setApiError(result.message || 'Failed to submit enquiry. Please try again.');
      }
    } catch (err: unknown) {
      if (axios.isAxiosError<ApiErrorResponse>(err)) {
        const errorMsg =
          err.response?.data?.message ||
          (Array.isArray(err.response?.data?.errors)
            ? err.response?.data?.errors
                .map((e) => e.messages?.join(', '))
                .filter(Boolean)
                .join('; ')
            : null) ||
          err.message ||
          'Failed to submit enquiry. Please check your details and try again.';
        setApiError(errorMsg);
      } else {
        setApiError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative w-full max-w-2xl rounded-3xl bg-white shadow-2xl border border-[#e1e6e5] overflow-hidden my-auto max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
          >
            {/* Top Progress Bar & Close Button */}
            <div className="pt-5 px-6 pb-2 flex-none">
              <div className="flex items-center justify-between gap-4">
                {/* 2-Segment Progress Bar */}
                <div className="flex-1 flex items-center gap-2">
                  <div
                    className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                      step >= 1 ? 'bg-[#0b383e]' : 'bg-gray-200'
                    }`}
                  />
                  <div
                    className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                      step >= 2 ? 'bg-[#0b383e]' : 'bg-gray-200'
                    }`}
                  />
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={handleClose}
                  aria-label="Close modal"
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 flex items-center justify-center transition-colors cursor-pointer flex-none"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-6 pt-3 overflow-y-auto flex-1">
              {/* ------------------------------------------------------------ */}
              {/* PART 1 (Image 1)                                             */}
              {/* ------------------------------------------------------------ */}
              {step === 1 && (
                <div>
                  <h2
                    id={titleId}
                    className="text-2xl sm:text-[26px] font-black text-[#0b383e] tracking-tight leading-snug mb-1"
                  >
                    Get a Free Treatment Opinion
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                    Tell us about your treatment needs — our care team will reach out within 24 hours.
                  </p>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleContinue();
                    }}
                    className="space-y-4"
                  >
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1.5">
                        Full name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter full name"
                        {...register('fullName')}
                        className={`w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none bg-white placeholder:text-gray-400 ${
                          errors.fullName
                            ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                            : 'border-gray-200 focus:border-[#0b383e] focus:ring-2 focus:ring-[#0b383e]/10'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-xs text-red-600 font-medium">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>

                    {/* Country & Phone (2 Columns) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {/* Country */}
                      <div>
                        <label className="block text-xs font-bold text-gray-800 mb-1.5">
                          Country
                        </label>
                        <select
                          {...register('country')}
                          className={`w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none bg-white ${
                            errors.country
                              ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                              : 'border-gray-200 focus:border-[#0b383e] focus:ring-2 focus:ring-[#0b383e]/10'
                          }`}
                        >
                          <option value="Select">Select</option>
                          {COUNTRY_OPTIONS.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                        {errors.country && (
                          <p className="mt-1 text-xs text-red-600 font-medium">
                            {errors.country.message}
                          </p>
                        )}
                      </div>

                      {/* Phone / WhatsApp (International format) */}
                      <div>
                        <label className="block text-xs font-bold text-gray-800 mb-1.5">
                          Phone / WhatsApp
                        </label>
                        <Controller
                          name="phone"
                          control={control}
                          render={({ field }) => (
                            <input
                              type="tel"
                              placeholder="Enter phone number (e.g. +968 9123 4567)"
                              value={field.value}
                              onChange={(e) => {
                                const sanitized = e.target.value.replace(
                                  /[^\d\s+\-()]/g,
                                  ''
                                );
                                field.onChange(sanitized);
                              }}
                              className={`w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none bg-white placeholder:text-gray-400 ${
                                errors.phone
                                  ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                                  : 'border-gray-200 focus:border-[#0b383e] focus:ring-2 focus:ring-[#0b383e]/10'
                              }`}
                            />
                          )}
                        />
                        {errors.phone && (
                          <p className="mt-1 text-xs text-red-600 font-medium">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="Enter email address"
                        {...register('email')}
                        className={`w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none bg-white placeholder:text-gray-400 ${
                          errors.email
                            ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                            : 'border-gray-200 focus:border-[#0b383e] focus:ring-2 focus:ring-[#0b383e]/10'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-600 font-medium">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Treatment interested in */}
                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1.5">
                        Treatment interested in
                      </label>
                      <select
                        {...register('treatmentCategory')}
                        className={`w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none bg-white ${
                          errors.treatmentCategory
                            ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                            : 'border-gray-200 focus:border-[#0b383e] focus:ring-2 focus:ring-[#0b383e]/10'
                        }`}
                      >
                        <option value="Select">Select</option>
                        {TREATMENT_OPTIONS.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                      {errors.treatmentCategory && (
                        <p className="mt-1 text-xs text-red-600 font-medium">
                          {errors.treatmentCategory.message}
                        </p>
                      )}
                    </div>

                    {/* Tell us more (optional) */}
                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1.5">
                        Tell us more (optional)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Enter any details about your condition or requirements"
                        {...register('tellUsMore')}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0b383e] focus:ring-2 focus:ring-[#0b383e]/10 text-sm transition-all outline-none bg-white placeholder:text-gray-400 resize-none"
                      />
                    </div>

                    {/* Consent Checkbox */}
                    <div>
                      <label className="flex items-start gap-2.5 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          {...register('privacyConsentGiven')}
                          className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#0b383e] focus:ring-[#0b383e] accent-[#0b383e] cursor-pointer"
                        />
                        <span className="text-xs text-gray-600 leading-tight">
                          I agree to the privacy policy and consent to being contacted about my enquiry.
                        </span>
                      </label>
                      {errors.privacyConsentGiven && (
                        <p className="mt-1 text-xs text-red-600 font-medium">
                          {errors.privacyConsentGiven.message}
                        </p>
                      )}
                    </div>

                    {/* Continue Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-3.5 px-6 rounded-xl bg-[#0b383e] hover:bg-[#095458] text-white font-extrabold tracking-wider text-xs uppercase shadow-md hover:shadow-lg transition-all cursor-pointer"
                      >
                        CONTINUE
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* ------------------------------------------------------------ */}
              {/* PART 2 (Image 2)                                             */}
              {/* ------------------------------------------------------------ */}
              {step === 2 && (
                <div>
                  <h2
                    id={titleId}
                    className="text-2xl sm:text-[25px] font-black text-[#0b383e] tracking-tight leading-snug mb-5"
                  >
                    Thank you. A few more questions for the hospital:
                  </h2>

                  {apiError && (
                    <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-none text-red-600" />
                      <span>{apiError}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Patient Age or DOB */}
                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1.5">
                        Patient&apos;s age or date of birth <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter age or date of birth (e.g. 30 yrs or 29-05-1985)"
                        {...register('patientAgeOrDob')}
                        className={`w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none bg-white placeholder:text-gray-400 ${
                          errors.patientAgeOrDob
                            ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                            : 'border-gray-200 focus:border-[#0b383e] focus:ring-2 focus:ring-[#0b383e]/10'
                        }`}
                      />
                      {errors.patientAgeOrDob && (
                        <p className="mt-1 text-xs text-red-600 font-medium">
                          {errors.patientAgeOrDob.message}
                        </p>
                      )}
                    </div>

                    {/* Question 1: Doctor Budget Preference */}
                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-2">
                        1. What kind of doctors shall we recommend you?{' '}
                        <span className="text-red-500">*</span>
                      </label>
                      <Controller
                        name="doctorBudgetPreference"
                        control={control}
                        render={({ field }) => (
                          <div className="space-y-2">
                            {DOCTOR_BUDGET_OPTIONS.map((opt) => {
                              const isChecked = field.value === opt;
                              return (
                                <label
                                  key={opt}
                                  onClick={() => field.onChange(opt)}
                                  className={`flex items-start gap-3 p-3.5 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all ${
                                    isChecked
                                      ? 'border-[#0b383e] bg-[#0b383e]/5 ring-1 ring-[#0b383e]'
                                      : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/60'
                                  }`}
                                >
                                  <div
                                    className={`w-4 h-4 rounded-full border flex items-center justify-center flex-none mt-0.5 ${
                                      isChecked
                                        ? 'border-[#0b383e]'
                                        : 'border-gray-300'
                                    }`}
                                  >
                                    {isChecked && (
                                      <div className="w-2 h-2 rounded-full bg-[#0b383e]" />
                                    )}
                                  </div>
                                  <span className="text-gray-800 leading-snug">
                                    {opt}
                                  </span>
                                </label>
                              );
                            })}
                          </div>
                        )}
                      />
                      {errors.doctorBudgetPreference && (
                        <p className="mt-1 text-xs text-red-600 font-medium">
                          {errors.doctorBudgetPreference.message}
                        </p>
                      )}
                    </div>

                    {/* Question 2: Treatment Timeline */}
                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-2">
                        2. How soon do you plan for this treatment?{' '}
                        <span className="text-red-500">*</span>
                      </label>
                      <Controller
                        name="treatmentTimeline"
                        control={control}
                        render={({ field }) => (
                          <div className="space-y-2">
                            {TIMELINE_OPTIONS.map((opt) => {
                              const isChecked = field.value === opt;
                              return (
                                <label
                                  key={opt}
                                  onClick={() => field.onChange(opt)}
                                  className={`flex items-start gap-3 p-3.5 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all ${
                                    isChecked
                                      ? 'border-[#0b383e] bg-[#0b383e]/5 ring-1 ring-[#0b383e]'
                                      : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/60'
                                  }`}
                                >
                                  <div
                                    className={`w-4 h-4 rounded-full border flex items-center justify-center flex-none mt-0.5 ${
                                      isChecked
                                        ? 'border-[#0b383e]'
                                        : 'border-gray-300'
                                    }`}
                                  >
                                    {isChecked && (
                                      <div className="w-2 h-2 rounded-full bg-[#0b383e]" />
                                    )}
                                  </div>
                                  <span className="text-gray-800 leading-snug">
                                    {opt}
                                  </span>
                                </label>
                              );
                            })}
                          </div>
                        )}
                      />
                      {errors.treatmentTimeline && (
                        <p className="mt-1 text-xs text-red-600 font-medium">
                          {errors.treatmentTimeline.message}
                        </p>
                      )}
                    </div>

                    {/* Preferred Hospital or City */}
                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1.5">
                        Do you have any preferred hospital or city?
                      </label>
                      <input
                        type="text"
                        placeholder="Enter preferred hospital or city"
                        {...register('preferredHospitalOrCity')}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0b383e] focus:ring-2 focus:ring-[#0b383e]/10 text-sm transition-all outline-none bg-white placeholder:text-gray-400"
                      />
                    </div>

                    {/* Back & Submit Buttons */}
                    <div className="pt-2 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setApiError(null);
                          setStep(1);
                        }}
                        className="px-6 py-3.5 rounded-xl border border-gray-300 hover:bg-gray-100 text-gray-700 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 py-3.5 px-6 rounded-xl bg-[#0b383e] hover:bg-[#095458] text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>SUBMITTING...</span>
                          </>
                        ) : (
                          <span>SUBMIT</span>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* ------------------------------------------------------------ */}
              {/* PART 3 (Image 3 - Success Screen)                            */}
              {/* ------------------------------------------------------------ */}
              {step === 3 && (
                <div className="text-center py-2 sm:py-4">
                  {/* Green Checkmark Circle */}
                  <div className="w-16 h-16 rounded-full bg-[#e8f4f2] text-[#0b383e] flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Check className="w-8 h-8 stroke-[2.8]" />
                  </div>

                  {/* Title & Subtitle */}
                  <h2
                    id={titleId}
                    className="text-2xl sm:text-3xl font-black text-[#0b383e] tracking-tight mb-2"
                  >
                    Request received
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 max-w-sm mx-auto mb-6 leading-relaxed">
                    A care coordinator will review your details and contact you within 24 hours.
                  </p>

                  {/* Assessment Reference Card */}
                  <div className="rounded-2xl border border-gray-200/90 bg-[#f8fafa] p-5 text-left mb-6 shadow-xs">
                    {/* Header Row */}
                    <div className="flex items-center justify-between pb-3 border-b border-gray-200/80 mb-3.5">
                      <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                        ASSESSMENT REF
                      </span>
                      <span className="px-3 py-1 rounded-md text-xs font-mono font-bold bg-[#e8f4f2] text-[#0b383e] border border-[#b9dcd5]/60">
                        {referenceId}
                      </span>
                    </div>

                    {/* 2-Column Grid */}
                    <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
                      <div>
                        <span className="block text-[11px] text-gray-500 font-medium mb-0.5">
                          Patient
                        </span>
                        <span className="font-bold text-gray-900 break-words">
                          {submittedData?.fullName}
                        </span>
                      </div>

                      <div>
                        <span className="block text-[11px] text-gray-500 font-medium mb-0.5">
                          Treatment
                        </span>
                        <span className="font-bold text-[#0b383e] break-words">
                          {submittedData?.treatmentCategory}
                        </span>
                      </div>

                      <div>
                        <span className="block text-[11px] text-gray-500 font-medium mb-0.5">
                          Country
                        </span>
                        <span className="font-bold text-gray-900">
                          {submittedData?.country}
                        </span>
                      </div>

                      <div>
                        <span className="block text-[11px] text-gray-500 font-medium mb-0.5">
                          Contact
                        </span>
                        <span className="font-bold text-gray-900">
                          {submittedData?.phone}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={handleClose}
                    className="w-full py-3.5 px-6 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    CLOSE
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
