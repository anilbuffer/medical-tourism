'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CountryOption, COUNTRIES } from '@/components/Navbar';
import {
  ConsultationProvider,
  ConsultationModalGlobal,
  useConsultation,
  useConsultationModal,
  type ConsultationContextType,
} from '@/components/providers/ConsultationProvider';
import { ChatProvider, useChat, type ChatContextType, type ChatRequest } from '@/components/providers/ChatProvider';
import { AiChatDrawer } from '@/components/AiChatDrawer';
import { FloatingAiWidget } from '@/components/FloatingAiWidget';

export { useConsultation, useConsultationModal, type ConsultationContextType };
export { useChat, type ChatContextType, type ChatRequest };

interface CountryContextType {
  selectedCountry: CountryOption;
  setSelectedCountry: (country: CountryOption) => void;
}

const CountryContext = createContext<CountryContextType | null>(null);

export function useCountry() {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error('useCountry must be used within AppProviders');
  }
  return context;
}

export function AppProviders({ children }: { children: ReactNode }) {
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(COUNTRIES[0]);

  return (
    <ConsultationProvider>
      <CountryContext.Provider
        value={{
          selectedCountry,
          setSelectedCountry,
        }}
      >
        <ChatProvider>
          {children}
          <ConsultationModalGlobal />
          <AiChatDrawer />
          <FloatingAiWidget />
        </ChatProvider>
      </CountryContext.Provider>
    </ConsultationProvider>
  );
}
