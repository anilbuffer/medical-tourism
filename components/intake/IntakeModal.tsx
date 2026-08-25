"use client";

import React from "react";
import { useCare } from "@/context/CareContext";
import { ConfidentialMedicalAssessment } from "@/components/intake/ConfidentialMedicalAssessment";

export const IntakeModal = () => {
  const { isIntakeOpen, closeIntake, intakeSpecialty } = useCare();

  if (!isIntakeOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl my-6">
        <ConfidentialMedicalAssessment
          initialTreatment={intakeSpecialty}
          onClose={closeIntake}
          isModal={true}
        />
      </div>
    </div>
  );
};
