'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CountryOption, COUNTRIES } from '@/data/countriesData';
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

interface AppContextType {
  selectedCountry: CountryOption;
  setSelectedCountry: (country: CountryOption) => void;
  otherComparisonCountry: string;
  setOtherComparisonCountry: (country: string) => void;
  selectedSpecialty: string;
  setSelectedSpecialty: (specialty: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProviders');
  }
  return context;
}

export function useSpecialty() {
  const { selectedSpecialty, setSelectedSpecialty } = useApp();
  return { selectedSpecialty, setSelectedSpecialty };
}

export function useCountry() {
  const {
    selectedCountry,
    setSelectedCountry,
    otherComparisonCountry,
    setOtherComparisonCountry,
  } = useApp();
  return {
    selectedCountry,
    setSelectedCountry,
    otherComparisonCountry,
    setOtherComparisonCountry,
  };
}

export function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(COUNTRIES[0]);
  const [otherComparisonCountry, setOtherComparisonCountry] = useState<string>('Saudi Arabia');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');

  return (
    <QueryClientProvider client={queryClient}>
      <ConsultationProvider>
        <AppContext.Provider
          value={{
            selectedCountry,
            setSelectedCountry,
            otherComparisonCountry,
            setOtherComparisonCountry,
            selectedSpecialty,
            setSelectedSpecialty,
          }}
        >
          <ChatProvider>
            {children}
            <ConsultationModalGlobal />
            <AiChatDrawer />
            <FloatingAiWidget />
          </ChatProvider>
        </AppContext.Provider>
      </ConsultationProvider>
    </QueryClientProvider>
  );
}
