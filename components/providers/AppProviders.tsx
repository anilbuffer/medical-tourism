'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CountryOption, COUNTRIES } from '@/components/Navbar';
import { ConsultationModal } from '@/components/ConsultationModal';
import { ChatProvider, useChat, type ChatContextType, type ChatRequest } from '@/components/providers/ChatProvider';
import { AiChatDrawer } from '@/components/AiChatDrawer';
import { FloatingAiWidget } from '@/components/FloatingAiWidget';

export { useChat, type ChatContextType, type ChatRequest };

interface ConsultationContextType {
  isOpen: boolean;
  preselectedTreatment?: string;
  openConsultation: (treatmentTitle?: string) => void;
  closeConsultation: () => void;
}

interface CountryContextType {
  selectedCountry: CountryOption;
  setSelectedCountry: (country: CountryOption) => void;
}

const ConsultationContext = createContext<ConsultationContextType | null>(null);
const CountryContext = createContext<CountryContextType | null>(null);

export function useConsultation() {
  const context = useContext(ConsultationContext);
  if (!context) {
    throw new Error('useConsultation must be used within AppProviders');
  }
  return context;
}

export function useCountry() {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error('useCountry must be used within AppProviders');
  }
  return context;
}

export function AppProviders({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preselectedTreatment, setPreselectedTreatment] = useState<string | undefined>(undefined);
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(COUNTRIES[0]);

  const openConsultation = (treatmentTitle?: string) => {
    setPreselectedTreatment(treatmentTitle);
    setIsOpen(true);
  };

  const closeConsultation = () => {
    setIsOpen(false);
  };

  return (
    <ConsultationContext.Provider
      value={{
        isOpen,
        preselectedTreatment,
        openConsultation,
        closeConsultation,
      }}
    >
      <CountryContext.Provider
        value={{
          selectedCountry,
          setSelectedCountry,
        }}
      >
        <ChatProvider>
          {children}
          <ConsultationModal
            isOpen={isOpen}
            onClose={closeConsultation}
            preselectedTreatment={preselectedTreatment}
          />
          <AiChatDrawer />
          <FloatingAiWidget />
        </ChatProvider>
      </CountryContext.Provider>
    </ConsultationContext.Provider>
  );
}
