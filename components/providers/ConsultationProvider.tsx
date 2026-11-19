'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ConsultationModal } from '@/components/ConsultationModal';

export interface ConsultationContextType {
  isOpen: boolean;
  setOpen: (open: boolean, treatmentTitle?: string) => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openConsultation: (treatmentTitle?: string) => void;
  closeConsultation: () => void;
  preselectedTreatment?: string;
  setPreselectedTreatment: (treatment?: string) => void;
}

const ConsultationContext = createContext<ConsultationContextType | null>(null);

export function useConsultation() {
  const context = useContext(ConsultationContext);
  if (!context) {
    throw new Error('useConsultation must be used within AppProviders or ConsultationProvider');
  }
  return context;
}

export function useConsultationModal() {
  return useConsultation();
}

export function ConsultationModalGlobal() {
  const { isOpen, closeConsultation, preselectedTreatment } = useConsultation();
  return (
    <ConsultationModal
      isOpen={isOpen}
      onClose={closeConsultation}
      preselectedTreatment={preselectedTreatment}
    />
  );
}

export function ConsultationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preselectedTreatment, setPreselectedTreatment] = useState<string | undefined>(undefined);

  const setOpen = (open: boolean, treatmentTitle?: string) => {
    if (treatmentTitle !== undefined) {
      setPreselectedTreatment(treatmentTitle);
    }
    setIsOpen(open);
  };

  const openConsultation = (treatmentTitle?: string) => {
    setOpen(true, treatmentTitle);
  };

  const closeConsultation = () => {
    setOpen(false);
  };

  return (
    <ConsultationContext.Provider
      value={{
        isOpen,
        setOpen,
        setIsOpen,
        openConsultation,
        closeConsultation,
        preselectedTreatment,
        setPreselectedTreatment,
      }}
    >
      {children}
    </ConsultationContext.Provider>
  );
}
