"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Language, Currency, DICTIONARY, Translations } from "@/data/translations";
import { Doctor, Hospital, CARE_COORDINATOR } from "@/data/mockData";

export interface ChatMessage {
  id: string;
  sender: "user" | "coordinator" | "system";
  text: string;
  timestamp: string;
}

interface CareContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isRtl: boolean;
  t: Translations;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (usdAmount: number) => string;
  formatPriceRange: (minUsd: number, maxUsd: number) => string;

  // Modals & Drawers
  isIntakeOpen: boolean;
  intakeSpecialty: string;
  openIntake: (specialty?: string) => void;
  closeIntake: () => void;

  isChatOpen: boolean;
  chatMessages: ChatMessage[];
  openChat: (initialQuery?: string) => void;
  closeChat: () => void;
  sendChatMessage: (text: string) => void;

  selectedDoctor: Doctor | null;
  openDoctorModal: (doctor: Doctor) => void;
  closeDoctorModal: () => void;

  selectedHospital: Hospital | null;
  openHospitalModal: (hospital: Hospital) => void;
  closeHospitalModal: () => void;

  isCostCalcOpen: boolean;
  costCalcTreatmentId: string;
  openCostCalc: (treatmentId?: string) => void;
  closeCostCalc: () => void;
}

const CareContext = createContext<CareContextType | undefined>(undefined);

const CURRENCY_RATES: Record<Currency, { symbol: string; rate: number; prefix: boolean }> = {
  USD: { symbol: "$", rate: 1.0, prefix: true },
  AED: { symbol: " AED", rate: 3.67, prefix: false },
  GBP: { symbol: "£", rate: 0.79, prefix: true },
  EUR: { symbol: "€", rate: 0.92, prefix: true },
  INR: { symbol: "₹", rate: 83.5, prefix: true },
};

export const CareProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");
  const [currency, setCurrency] = useState<Currency>("USD");

  const [isIntakeOpen, setIsIntakeOpen] = useState(false);
  const [intakeSpecialty, setIntakeSpecialty] = useState("");

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "init-1",
      sender: "coordinator",
      text: "Hello! I'm Aisha Khan, your Lead International Care Coordinator. How can I assist you with your treatment or travel plans to India today?",
      timestamp: "Just now",
    },
  ]);

  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [isCostCalcOpen, setIsCostCalcOpen] = useState(false);
  const [costCalcTreatmentId, setCostCalcTreatmentId] = useState("");

  const isRtl = language === "ar";
  const t = DICTIONARY[language];

  useEffect(() => {
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language, isRtl]);

  const toggleLanguage = () => {
    const nextLang = language === "en" ? "ar" : "en";
    setLanguage(nextLang);
  };

  const formatPrice = (usdAmount: number): string => {
    const curInfo = CURRENCY_RATES[currency];
    const converted = Math.round(usdAmount * curInfo.rate);

    if (currency === "INR") {
      if (converted >= 100000) {
        return `₹${(converted / 100000).toFixed(1)} Lakh`;
      }
      return `₹${converted.toLocaleString("en-IN")}`;
    }

    if (curInfo.prefix) {
      return `${curInfo.symbol}${converted.toLocaleString("en-US")}`;
    }
    return `${converted.toLocaleString("en-US")}${curInfo.symbol}`;
  };

  const formatPriceRange = (minUsd: number, maxUsd: number): string => {
    return `${formatPrice(minUsd)} – ${formatPrice(maxUsd)}`;
  };

  const openIntake = (specialty?: string) => {
    if (specialty) setIntakeSpecialty(specialty);
    setIsIntakeOpen(true);
  };

  const closeIntake = () => {
    setIsIntakeOpen(false);
    setIntakeSpecialty("");
  };

  const openChat = (initialQuery?: string) => {
    setIsChatOpen(true);
    if (initialQuery) {
      sendChatMessage(initialQuery);
    }
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  const sendChatMessage = (text: string) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: "Just now",
    };

    setChatMessages((prev) => [...prev, userMsg]);

    // Simulated coordinator smart replies
    setTimeout(() => {
      let reply = "";
      const lower = text.toLowerCase();

      if (lower.includes("cost") || lower.includes("price") || lower.includes("package") || lower.includes("تكلفة") || lower.includes("سعر")) {
        reply = language === "ar"
          ? "يسعدني تزويدك بتقدير التكلفة الدقيق. تتراوح تكلفة العمليات في الهند بين 60% إلى 80% أقل مقارنة بالدول الغربية أو العيادات الخاصة. هل تود تقدير لجراحة معينة مثل القلب أو العظام أو أطفال الأنابيب؟"
          : "I'd be glad to share an itemized estimate. Our partner hospitals offer 60% to 80% savings compared to Western or private clinics with all-inclusive packages. Which specific procedure or specialty would you like an estimate for?";
      } else if (lower.includes("visa") || lower.includes("passport") || lower.includes("تأشيرة") || lower.includes("فيزا")) {
        reply = language === "ar"
          ? "بالنسبة للتأشيرة الطبية (M-Visa)، نقوم بإصدار خطاب دعوة رسمي معتمد من المستشفى خلال 12-24 ساعة لتسريع استخراج التأشيرة لك ولمرافقين اثنين."
          : "For the Indian Medical Visa (M-Visa), our team issues an official accredited hospital invitation letter within 12–24 hours, ensuring expedited approval for you and up to 2 companions.";
      } else if (lower.includes("doctor") || lower.includes("consult") || lower.includes("طبيب") || lower.includes("استشارة")) {
        reply = language === "ar"
          ? "يمكننا تنظيم استشارة مرئية عالية الدقة مع كبير الاستشاريين خلال 24 ساعة لمناقشة حالتك مباشرة. يمكنك رفع تقاريرك الطبية لنبدأ فوراً."
          : "We can schedule a direct high-definition video consultation with our Senior Director within 24 hours. Would you like me to reserve a consultation slot for you?";
      } else {
        reply = language === "ar"
          ? `شكراً لتواصلك معنا! لقد استلمت استفسارك وسأقوم بمراجعة التفاصيل الطبية والتنسيق معك فوراً. يمكنك أيضاً تزويدي برقم الواتساب الخاص بك لإرسال ملفات المستشفيات المقترحة.`
          : `Thank you for reaching out! I have received your enquiry. Let me review our senior specialist availability and coordinate the best options for your case. May I also have your preferred WhatsApp number for sending the hospital profiles?`;
      }

      const coordMsg: ChatMessage = {
        id: `coord-${Date.now()}`,
        sender: "coordinator",
        text: reply,
        timestamp: "Just now",
      };

      setChatMessages((prev) => [...prev, coordMsg]);
    }, 900);
  };

  const openDoctorModal = (doctor: Doctor) => setSelectedDoctor(doctor);
  const closeDoctorModal = () => setSelectedDoctor(null);

  const openHospitalModal = (hospital: Hospital) => setSelectedHospital(hospital);
  const closeHospitalModal = () => setSelectedHospital(null);

  const openCostCalc = (treatmentId?: string) => {
    if (treatmentId) setCostCalcTreatmentId(treatmentId);
    setIsCostCalcOpen(true);
  };
  const closeCostCalc = () => {
    setIsCostCalcOpen(false);
    setCostCalcTreatmentId("");
  };

  return (
    <CareContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        isRtl,
        t,
        currency,
        setCurrency,
        formatPrice,
        formatPriceRange,
        isIntakeOpen,
        intakeSpecialty,
        openIntake,
        closeIntake,
        isChatOpen,
        chatMessages,
        openChat,
        closeChat,
        sendChatMessage,
        selectedDoctor,
        openDoctorModal,
        closeDoctorModal,
        selectedHospital,
        openHospitalModal,
        closeHospitalModal,
        isCostCalcOpen,
        costCalcTreatmentId,
        openCostCalc,
        closeCostCalc,
      }}
    >
      {children}
    </CareContext.Provider>
  );
};

export const useCare = () => {
  const context = useContext(CareContext);
  if (!context) {
    throw new Error("useCare must be used within a CareProvider");
  }
  return context;
};
