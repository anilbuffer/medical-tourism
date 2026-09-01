"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from "react";
import {
  PatientCase,
  PortalUser,
  PatientJourneyStage,
  PatientDocument,
  DocumentVersion,
  ConsentRecord,
  ConsentType,
  PaymentStageId,
  RecoveryCheckIn,
  InPortalMessage,
  AuditLog,
  ConsultationOutcome,
  ClinicalWorkspace,
  StageHistoryEvent,
  CsNote,
  NurtureEntry,
  BillingDisputeAccessGrant,
  RefundRequest,
} from "../../types/portal";
import { INITIAL_PATIENT_CASES, MOCK_PORTAL_USERS } from "./mockData";
import { applyRowLevelSecurity } from "./rbac";

export type PortalCurrency = "USD" | "GBP" | "AED";
export type PortalLanguage = "en" | "ar" | "fr";

export interface PortalContextType {
  currentUser: PortalUser | null;
  setCurrentUser: (user: PortalUser | null) => void;
  availableUsers: PortalUser[];
  loginAs: (user: PortalUser) => void;
  logout: () => void;

  // Personalization
  currency: PortalCurrency;
  setCurrency: (c: PortalCurrency) => void;
  formatCurrency: (amountUsd: number, overrideCurrency?: PortalCurrency) => string;
  language: PortalLanguage;
  setLanguage: (l: PortalLanguage) => void;

  // All Cases (Filtered by RBAC)
  allCases: PatientCase[];
  visibleCases: PatientCase[];

  // Active Case (for Patient View or Selected CS/Doctor Case)
  activeCase: PatientCase | null;
  setActiveCaseId: (id: string) => void;

  // Actions
  createNewLead: (params: {
    fullName: string;
    email: string;
    phone: string;
    country: string;
    treatmentCategory: string;
    preferredContactTime?: string;
    entryPath: "general_enquiry" | "hospital_referred" | "doctor_referred";
    referredHospitalId?: string;
    referredDoctorId?: string;
    notes?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
  }) => { patientId: string; newCase: PatientCase };

  uploadDocument: (
    caseId: string,
    docTitle: string,
    category: PatientDocument["category"],
    fileName: string,
    fileSize: string,
    existingDocId?: string
  ) => void;

  recordConsent: (
    caseId: string,
    consentType: ConsentType,
    title: string,
    description: string,
    paymentStageId?: string
  ) => void;

  updateConsultationOutcome: (
    caseId: string,
    outcome: ConsultationOutcome,
    outcomeNotes: string,
    redirectHospitalOrSpecialty?: string
  ) => void;

  respondToQuote: (
    caseId: string,
    decision: "accepted" | "declined" | "change_requested",
    reasonOrNotes?: string
  ) => void;

  payStage: (
    caseId: string,
    stageId: PaymentStageId,
    paymentMethod: "card" | "wire" | "swift" | "crypto"
  ) => { success: boolean; transactionId: string; receiptNumber: string };

  submitRecoveryReport: (
    caseId: string,
    data: Omit<RecoveryCheckIn, "id" | "submittedAt" | "coordinatorAcknowledged">
  ) => void;

  sendPortalMessage: (caseId: string, text: string, attachmentName?: string) => void;

  updateDocumentReviewStatus: (
    caseId: string,
    docId: string,
    status: "reviewed" | "incomplete",
    csFeedback: string
  ) => void;

  updateCaseStage: (caseId: string, stage: PatientJourneyStage) => void;

  // Hospital Portal actions
  acceptCase: (caseId: string) => void;
  declineCase: (caseId: string, reason: string) => void;
  saveClinicalWorkspace: (caseId: string, workspace: Omit<ClinicalWorkspace, 'submittedAt' | 'submittedByDoctorId' | 'submittedByDoctorName' | 'lastUpdatedAt'>) => void;
  toggleConsultationRecording: (caseId: string, enabled: boolean, consentObtained?: boolean) => void;
  requestDocumentViaCs: (caseId: string, docTitle: string, note: string) => void;

  // CS Portal actions
  addCsNote: (caseId: string, text: string) => void;
  updateStageWithReason: (caseId: string, stage: PatientJourneyStage, reason?: string) => void;
  moveToNurture: (caseId: string, entry: Omit<NurtureEntry, 'addedAt' | 'addedByName'>) => void;
  bulkAssignCases: (caseIds: string[], coordinatorName: string) => void;
  bulkUpdateStage: (caseIds: string[], stage: PatientJourneyStage) => void;
  bulkSendMessage: (caseIds: string[], text: string) => void;
  claimNextUnassignedLead: (coordinatorName?: string) => string | null;
  savePackageQuote: (caseId: string, customQuote: Partial<import("../../types/portal").QuotePackage>) => void;
  sendMultiChannelMessage: (
    caseId: string,
    channel: import("../../types/portal").MessageChannel,
    text: string,
    recipient?: string,
    mentionedRoles?: string[]
  ) => void;
  retriggerConsentRequest: (caseId: string, consentType: ConsentType) => void;
  updateItineraryDetails: (caseId: string, itinerary: Partial<import("../../types/portal").LogisticsItinerary>) => void;

  // Finance actions
  initiateRefund: (caseId: string, paymentStageId: PaymentStageId, amountUsd: number, reason: string) => void;
  grantBillingDisputeAccess: (caseId: string, reason: string) => void;

  resetToDefaultData: () => void;
}

const PortalContext = createContext<PortalContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_CASES = "vedara_portal_cases_v2";
const LOCAL_STORAGE_KEY_USER = "vedara_portal_active_user_v2";
const LOCAL_STORAGE_KEY_COUNTER = "vedara_portal_pt_counter_v2";

export const PortalProvider = ({ children }: { children: ReactNode }) => {
  const [allCases, setAllCases] = useState<PatientCase[]>(INITIAL_PATIENT_CASES);
  const [currentUser, setCurrentUserState] = useState<PortalUser | null>(MOCK_PORTAL_USERS[0]);
  const [activeCaseId, setActiveCaseId] = useState<string>("PT-2026-089412");
  const [currency, setCurrency] = useState<PortalCurrency>("USD");
  const [language, setLanguage] = useState<PortalLanguage>("en");
  const [isHydrated, setIsHydrated] = useState(false);

  // Currency Converter helper
  const formatCurrency = (amountUsd: number, overrideCurrency?: PortalCurrency): string => {
    const activeCurr = overrideCurrency || currency;
    switch (activeCurr) {
      case "GBP": {
        const converted = Math.round(amountUsd * 0.79);
        return `£${converted.toLocaleString("en-US")}`;
      }
      case "AED": {
        const converted = Math.round(amountUsd * 3.67);
        return `AED ${converted.toLocaleString("en-US")}`;
      }
      default: {
        return `$${amountUsd.toLocaleString("en-US")} USD`;
      }
    }
  };

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const storedCases = localStorage.getItem(LOCAL_STORAGE_KEY_CASES);
        if (storedCases) {
          setAllCases(JSON.parse(storedCases));
        } else {
          localStorage.setItem(LOCAL_STORAGE_KEY_CASES, JSON.stringify(INITIAL_PATIENT_CASES));
        }

        const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY_USER);
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setCurrentUserState(parsedUser);
          if (parsedUser.role === "patient" && parsedUser.patientId) {
            setActiveCaseId(parsedUser.patientId);
          }
        }
      }
    } catch (e) {
      console.warn("Storage sync error", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(LOCAL_STORAGE_KEY_CASES, JSON.stringify(allCases));
      }
    } catch (e) {
      console.warn("Could not save cases to localStorage", e);
    }
  }, [allCases, isHydrated]);

  const setCurrentUser = (user: PortalUser | null) => {
    setCurrentUserState(user);
    if (typeof window !== "undefined") {
      try {
        if (user) {
          localStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify(user));
        } else {
          localStorage.removeItem(LOCAL_STORAGE_KEY_USER);
        }
      } catch { }
    }
    if (user?.role === "patient" && user.patientId) {
      setActiveCaseId(user.patientId);
    }
  };

  const loginAs = (user: PortalUser) => {
    setCurrentUser(user);
    if (user.role === "patient" && user.patientId) {
      setActiveCaseId(user.patientId);
    } else {
      const allowed = applyRowLevelSecurity(allCases, user);
      if (allowed.length > 0) {
        setActiveCaseId(allowed[0].id);
      }
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const resetToDefaultData = () => {
    setAllCases(INITIAL_PATIENT_CASES);
    setCurrentUser(MOCK_PORTAL_USERS[0]);
    setActiveCaseId("PT-2026-089412");
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY_CASES, JSON.stringify(INITIAL_PATIENT_CASES));
        localStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify(MOCK_PORTAL_USERS[0]));
        localStorage.setItem(LOCAL_STORAGE_KEY_COUNTER, "89413");
      } catch { }
    }
  };

  const visibleCases = useMemo(() => {
    return applyRowLevelSecurity(allCases, currentUser);
  }, [allCases, currentUser]);

  const activeCase = useMemo(() => {
    if (!currentUser) return null;
    if (currentUser.role === "patient") {
      return visibleCases.find((c) => c.id === currentUser.patientId) || visibleCases[0] || null;
    }
    return visibleCases.find((c) => c.id === activeCaseId) || visibleCases[0] || null;
  }, [currentUser, visibleCases, activeCaseId]);

  const generateSequentialPatientId = (): string => {
    const year = new Date().getFullYear();
    let currentCounter = 8500;
    try {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY_COUNTER);
        if (saved) {
          currentCounter = parseInt(saved, 10) + 1;
        }
        localStorage.setItem(LOCAL_STORAGE_KEY_COUNTER, currentCounter.toString());
      }
    } catch { }
    const seqPadded = String(currentCounter).padStart(6, "0");
    return `PT-${year}-${seqPadded}`;
  };

  const createNewLead = ({
    fullName,
    email,
    phone,
    country,
    treatmentCategory,
    preferredContactTime,
    entryPath,
    referredHospitalId,
    referredDoctorId,
    notes,
    utmSource,
    utmMedium,
    utmCampaign,
  }: {
    fullName: string;
    email: string;
    phone: string;
    country: string;
    treatmentCategory: string;
    preferredContactTime?: string;
    entryPath: "general_enquiry" | "hospital_referred" | "doctor_referred";
    referredHospitalId?: string;
    referredDoctorId?: string;
    notes?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
  }) => {
    const patientId = generateSequentialPatientId();
    const now = new Date();

    let assignedQueue = "General_Global";
    if (treatmentCategory.toLowerCase().includes("cardiac") || treatmentCategory.toLowerCase().includes("heart")) {
      assignedQueue = "Cardiology_Tier1";
    } else if (treatmentCategory.toLowerCase().includes("cancer") || treatmentCategory.toLowerCase().includes("oncol")) {
      assignedQueue = "Oncology_EMEA";
    } else if (
      treatmentCategory.toLowerCase().includes("ortho") ||
      treatmentCategory.toLowerCase().includes("joint") ||
      treatmentCategory.toLowerCase().includes("knee")
    ) {
      assignedQueue = "Orthopedics_MENA";
    }

    const slaMinutes = ["United Kingdom", "United States", "Canada", "Australia", "United Arab Emirates", "Saudi Arabia"].includes(country)
      ? 45
      : 60;
    const slaExpiresAt = new Date(now.getTime() + slaMinutes * 60 * 1000).toISOString();

    const newCase: PatientCase = {
      id: patientId,
      patientName: fullName,
      patientEmail: email,
      patientPhone: phone,
      patientCountry: country,
      preferredLanguage: "English",
      treatmentCategory,
      preferredContactTime: preferredContactTime || "Morning (09:00 - 12:00)",
      entryPath,
      referredHospitalId,
      referredDoctorId,
      assignedHospitalId: referredHospitalId || "hosp_medanta",
      assignedDoctorId: referredDoctorId || "doc_trehan",
      assignedQueue,
      assignedCoordinatorName: "",

      leadCreatedAt: now.toISOString(),
      slaTargetMinutes: slaMinutes,
      slaExpiresAt,
      slaBreached: false,

      utmSource: utmSource || "direct_portal_intake",
      utmMedium: utmMedium || "organic_web",
      utmCampaign: utmCampaign || "international_patient_inquiry",

      stage: "lead",
      caseDecisionStatus: "pending_review",
      hasBillingDispute: false,

      clinicalSummary: {
        chiefComplaint: notes || `Patient requested assessment for ${treatmentCategory}.`,
        diagnosis: "Pending specialist clinical file review.",
        recommendedProcedure: treatmentCategory,
      },

      stageHistory: [
        {
          id: `sh_${Date.now()}`,
          fromStage: null,
          toStage: "lead",
          changedAt: now.toISOString(),
          changedByName: fullName,
          changedByRole: "public",
        },
      ],
      csNotes: [],

      documents: [],
      consents: [
        {
          id: `cst_lead_${Date.now()}`,
          consentType: "privacy_data_processing",
          title: "Intake Privacy & Cross-Border Health Data Processing",
          description: "Consent captured at public intake submission.",
          agreed: true,
          timestamp: now.toISOString(),
          ipAddress: "Verified Web Submission",
          version: "v2.4",
          digitalSignature: `${fullName} (Digital Intake)`,
        },
      ],

      payments: [
        {
          id: "deposit",
          name: "Stage 1: Commitment Deposit (15%)",
          percentage: 15,
          amountUsd: 1200,
          currency: "USD",
          dueDate: "Upon Quote Acceptance",
          status: "pending",
          cancellationTerms: "Secures hospital appointment and M-Visa invitation dispatch.",
          refundPolicy: "100% refundable with official visa rejection letter.",
          gatewayReference: "",
          reconciled: false,
        },
        {
          id: "advance",
          name: "Stage 2: Pre-Admission Escrow (60%)",
          percentage: 60,
          amountUsd: 4800,
          currency: "USD",
          dueDate: "7 Days Prior to Departure",
          status: "pending",
          cancellationTerms: "Implant procurement and operating theatre reservation.",
          refundPolicy: "90% refundable up to 72 hrs before travel.",
          gatewayReference: "",
          reconciled: false,
        },
        {
          id: "final",
          name: "Stage 3: Final Hospital Clearance (25%)",
          percentage: 25,
          amountUsd: 2000,
          currency: "USD",
          dueDate: "On Physical Admission",
          status: "pending",
          cancellationTerms: "Final settlement upon arrival & admission desk check-in.",
          refundPolicy: "Reconciled against final discharge bill.",
          gatewayReference: "",
          reconciled: false,
        },
      ],

      messages: [
        {
          id: `msg_welcome_${Date.now()}`,
          senderId: "coord_aisha",
          senderName: "Aisha Khan (Lead Coordinator)",
          senderRole: "cs_coordinator",
          text: `Welcome to Vedara Care, ${fullName}! Your permanent Patient ID is ${patientId}. I am your dedicated international coordinator. Please upload your previous medical scans or prescriptions in the Documents tab so our specialists can prepare your treatment options.`,
          timestamp: "Just now",
          isRead: false,
        },
      ],

      recoveryCheckIns: [],
      refundRequests: [],
      auditLogs: [
        {
          id: `aud_${Date.now()}`,
          caseId: patientId,
          action: "PUBLIC_INTAKE_SUBMITTED",
          actorName: fullName,
          actorRole: "public",
          timestamp: now.toISOString(),
          details: `Inquiry submitted for ${treatmentCategory}. SLA clock started (${slaMinutes}m).`,
        },
      ],
    };

    setAllCases((prev) => [newCase, ...prev]);

    return { patientId, newCase };
  };

  const uploadDocument = (
    caseId: string,
    docTitle: string,
    category: PatientDocument["category"],
    fileName: string,
    fileSize: string,
    existingDocId?: string
  ) => {
    const now = new Date().toISOString();
    const actor = currentUser ? currentUser.name : "Patient";

    setAllCases((prev) =>
      prev.map((c) => {
        if (c.id !== caseId) return c;

        let updatedDocs = [...c.documents];
        if (existingDocId) {
          updatedDocs = updatedDocs.map((doc: PatientDocument) => {
            if (doc.id === existingDocId) {
              const nextVer = doc.currentVersion + 1;
              const newVersionObj: DocumentVersion = {
                version: nextVer,
                fileName,
                fileSize,
                fileType: "application/pdf",
                uploadedAt: now,
                uploadedBy: actor,
              };
              return {
                ...doc,
                status: "pending_review",
                csFeedback: undefined,
                currentVersion: nextVer,
                versions: [newVersionObj, ...doc.versions],
              };
            }
            return doc;
          });
        } else {
          const newDoc: PatientDocument = {
            id: `doc_${Date.now()}`,
            title: docTitle,
            category,
            status: "pending_review",
            currentVersion: 1,
            versions: [
              {
                version: 1,
                fileName,
                fileSize,
                fileType: "application/pdf",
                uploadedAt: now,
                uploadedBy: actor,
              },
            ],
          };
          updatedDocs.push(newDoc);
        }

        let newStage = c.stage;
        if (c.stage === "lead" || c.stage === "contacted") {
          newStage = "documents_collected";
        }

        const audit: AuditLog = {
          id: `aud_${Date.now()}`,
          caseId,
          action: "DOCUMENT_UPLOADED",
          actorName: actor,
          actorRole: currentUser?.role || "patient",
          timestamp: now,
          details: `Uploaded ${fileName} for ${docTitle}.`,
        };

        return {
          ...c,
          stage: newStage,
          documents: updatedDocs,
          auditLogs: [audit, ...c.auditLogs],
        };
      })
    );
  };

  const recordConsent = (
    caseId: string,
    consentType: ConsentType,
    title: string,
    description: string,
    paymentStageId?: string
  ) => {
    const now = new Date().toISOString();
    const actor = currentUser?.name || "Patient";

    setAllCases((prev) =>
      prev.map((c) => {
        if (c.id !== caseId) return c;

        const newConsent: ConsentRecord = {
          id: `cst_${Date.now()}`,
          consentType,
          title,
          description,
          agreed: true,
          timestamp: now,
          ipAddress: "157.240.241.35 (Encrypted Signature)",
          version: "v2.4",
          digitalSignature: `${actor} (Verified Digital Consent)`,
          paymentStageId,
        };

        const audit: AuditLog = {
          id: `aud_${Date.now()}`,
          caseId,
          action: "CONSENT_RECORDED",
          actorName: actor,
          actorRole: currentUser?.role || "patient",
          timestamp: now,
          details: `Consented to: ${title}`,
        };

        return {
          ...c,
          consents: [...c.consents, newConsent],
          auditLogs: [audit, ...c.auditLogs],
        };
      })
    );
  };

  const updateConsultationOutcome = (
    caseId: string,
    outcome: ConsultationOutcome,
    outcomeNotes: string,
    redirectHospitalOrSpecialty?: string
  ) => {
    const now = new Date().toISOString();
    const doctorName = currentUser?.name || "Specialist Doctor";

    setAllCases((prev) =>
      prev.map((c) => {
        if (c.id !== caseId) return c;

        const updatedConsultation = c.consultation
          ? {
            ...c.consultation,
            status: "completed" as const,
            outcome,
            outcomeNotes,
            redirectHospitalOrSpecialty,
          }
          : undefined;

        let nextStage = c.stage;
        if (outcome === "suitable") {
          nextStage = "quote";
        }

        const audit: AuditLog = {
          id: `aud_${Date.now()}`,
          caseId,
          action: "CONSULTATION_OUTCOME_RECORDED",
          actorName: doctorName,
          actorRole: "hospital_doctor",
          timestamp: now,
          details: `Tele-consultation outcome set to ${outcome.toUpperCase()}: ${outcomeNotes.slice(0, 50)}...`,
        };

        return {
          ...c,
          stage: nextStage,
          consultation: updatedConsultation,
          auditLogs: [audit, ...c.auditLogs],
        };
      })
    );
  };

  const respondToQuote = (
    caseId: string,
    decision: "accepted" | "declined" | "change_requested",
    reasonOrNotes?: string
  ) => {
    const now = new Date().toISOString();
    const actor = currentUser?.name || "Patient";

    setAllCases((prev) =>
      prev.map((c) => {
        if (c.id !== caseId || !c.quote) return c;

        let nextStage = c.stage;
        let quoteStatus = c.quote.status;

        if (decision === "accepted") {
          nextStage = "payment";
          quoteStatus = "accepted";
        } else if (decision === "declined") {
          quoteStatus = "declined";
        } else {
          quoteStatus = "change_requested";
        }

        const updatedQuote = {
          ...c.quote,
          status: quoteStatus,
          patientDecisionTimestamp: now,
          patientDeclineReason: decision === "declined" ? reasonOrNotes : undefined,
          patientChangeRequestNotes: decision === "change_requested" ? reasonOrNotes : undefined,
        };

        const audit: AuditLog = {
          id: `aud_${Date.now()}`,
          caseId,
          action: `QUOTE_${decision.toUpperCase()}`,
          actorName: actor,
          actorRole: "patient",
          timestamp: now,
          details: `Quote ${decision}. Notes: ${reasonOrNotes || "None"}`,
        };

        return {
          ...c,
          stage: nextStage,
          quote: updatedQuote,
          auditLogs: [audit, ...c.auditLogs],
        };
      })
    );
  };

  const payStage = (
    caseId: string,
    stageId: PaymentStageId,
    paymentMethod: "card" | "wire" | "swift" | "crypto"
  ) => {
    const now = new Date().toISOString();
    const txnId = `TXN_${paymentMethod.toUpperCase()}_${Math.floor(100000000 + Math.random() * 900000000)}`;
    const receiptNo = `REC-2026-${caseId.replace("PT-2026-", "")}-${stageId === "deposit" ? "01" : stageId === "advance" ? "02" : "03"}`;
    const actor = currentUser?.name || "Patient";

    setAllCases((prev) =>
      prev.map((c) => {
        if (c.id !== caseId) return c;

        const updatedPayments = c.payments.map((p) => {
          if (p.id === stageId) {
            return {
              ...p,
              status: "completed" as const,
              paidAt: now,
              termsAcceptedAt: p.termsAcceptedAt || now,
              transactionId: txnId,
              receiptNumber: receiptNo,
              paymentMethod,
            };
          }
          return p;
        });

        let nextStage = c.stage;
        if (stageId === "deposit" || stageId === "advance") {
          nextStage = "booking";
        } else if (stageId === "final") {
          nextStage = "treatment";
        }

        const audit: AuditLog = {
          id: `aud_${Date.now()}`,
          caseId,
          action: `PAYMENT_STAGE_${stageId.toUpperCase()}_SUCCESS`,
          actorName: actor,
          actorRole: currentUser?.role || "patient",
          timestamp: now,
          details: `Paid ${stageId} successfully. Txn: ${txnId}, Receipt: ${receiptNo}`,
        };

        return {
          ...c,
          stage: nextStage,
          payments: updatedPayments,
          auditLogs: [audit, ...c.auditLogs],
        };
      })
    );

    return { success: true, transactionId: txnId, receiptNumber: receiptNo };
  };

  const submitRecoveryReport = (
    caseId: string,
    data: Omit<RecoveryCheckIn, "id" | "submittedAt" | "coordinatorAcknowledged">
  ) => {
    const now = new Date().toISOString();
    const newCheckIn: RecoveryCheckIn = {
      ...data,
      id: `rec_${Date.now()}`,
      submittedAt: now,
      coordinatorAcknowledged: false,
    };

    setAllCases((prev) =>
      prev.map((c) => {
        if (c.id !== caseId) return c;
        return {
          ...c,
          stage: "followup",
          recoveryCheckIns: [newCheckIn, ...c.recoveryCheckIns],
        };
      })
    );
  };

  const sendPortalMessage = (caseId: string, text: string, attachmentName?: string) => {
    const senderRole =
      currentUser?.role === "customer_support"
        ? "cs_coordinator"
        : currentUser?.role === "hospital_doctor"
          ? "doctor"
          : "patient";
    const senderName = currentUser?.name || "Patient";

    const newMsg: InPortalMessage = {
      id: `msg_${Date.now()}`,
      senderId: currentUser?.id || "user_patient",
      senderName,
      senderRole,
      text,
      timestamp: "Just now",
      attachmentName,
      isRead: false,
    };

    setAllCases((prev) =>
      prev.map((c) => {
        if (c.id !== caseId) return c;
        return {
          ...c,
          messages: [...c.messages, newMsg],
        };
      })
    );
  };

  const updateDocumentReviewStatus = (
    caseId: string,
    docId: string,
    status: "reviewed" | "incomplete",
    csFeedback: string
  ) => {
    const now = new Date().toISOString();
    const reviewerName = currentUser?.name || "Care Coordinator";

    setAllCases((prev) =>
      prev.map((c) => {
        if (c.id !== caseId) return c;

        const updatedDocs = c.documents.map((doc: PatientDocument) => {
          if (doc.id === docId) {
            return {
              ...doc,
              status,
              csFeedback,
            };
          }
          return doc;
        });

        const audit: AuditLog = {
          id: `aud_${Date.now()}`,
          caseId,
          action: `DOCUMENT_REVIEW_${status.toUpperCase()}`,
          actorName: reviewerName,
          actorRole: currentUser?.role || "customer_support",
          timestamp: now,
          details: `Doc ID ${docId} marked ${status}: ${csFeedback}`,
        };

        return {
          ...c,
          documents: updatedDocs,
          auditLogs: [audit, ...c.auditLogs],
        };
      })
    );
  };

  const updateCaseStage = (caseId: string, stage: PatientJourneyStage) => {
    setAllCases((prev) =>
      prev.map((c) => {
        if (c.id !== caseId) return c;
        return { ...c, stage };
      })
    );
  };

  // ─── Hospital Portal Actions ─────────────────────────────────────────────────

  const acceptCase = (caseId: string) => {
    const now = new Date().toISOString();
    const doctorName = currentUser?.name || "Doctor";
    const doctorId = currentUser?.doctorId || currentUser?.id || "";
    setAllCases((prev) =>
      prev.map((c) => {
        if (c.id !== caseId) return c;
        const audit: AuditLog = {
          id: `aud_${Date.now()}`,
          caseId,
          action: "CASE_ACCEPTED_BY_HOSPITAL",
          actorName: doctorName,
          actorRole: "hospital_doctor",
          timestamp: now,
          details: `Case accepted. Clinical workspace unlocked. Timestamped to ${doctorName}.`,
        };
        return {
          ...c,
          caseDecisionStatus: "accepted" as const,
          acceptedAt: now,
          acceptedByDoctorId: doctorId,
          acceptedByDoctorName: doctorName,
          stage: c.stage === "hospital_handover" ? "consultation" : c.stage,
          auditLogs: [audit, ...c.auditLogs],
        };
      })
    );
  };

  const declineCase = (caseId: string, reason: string) => {
    const now = new Date().toISOString();
    const doctorName = currentUser?.name || "Doctor";
    setAllCases((prev) =>
      prev.map((c) => {
        if (c.id !== caseId) return c;
        const audit: AuditLog = {
          id: `aud_${Date.now()}`,
          caseId,
          action: "CASE_DECLINED_BY_HOSPITAL",
          actorName: doctorName,
          actorRole: "hospital_doctor",
          timestamp: now,
          details: `Declined. Reason: ${reason}. Case moved to Nurture queue for CS follow-up.`,
        };
        const stageEvent: StageHistoryEvent = {
          id: `sh_${Date.now()}`,
          fromStage: c.stage,
          toStage: "nurture",
          changedAt: now,
          changedByName: doctorName,
          changedByRole: "hospital_doctor",
          reason,
        };
        return {
          ...c,
          caseDecisionStatus: "declined" as const,
          declineReason: reason,
          declinedAt: now,
          stage: "nurture",
          stageHistory: [...c.stageHistory, stageEvent],
          auditLogs: [audit, ...c.auditLogs],
        };
      })
    );
  };

  const saveClinicalWorkspace = (
    caseId: string,
    workspace: Omit<ClinicalWorkspace, 'submittedAt' | 'submittedByDoctorId' | 'submittedByDoctorName' | 'lastUpdatedAt'>
  ) => {
    const now = new Date().toISOString();
    const doctorName = currentUser?.name || "Doctor";
    const doctorId = currentUser?.doctorId || currentUser?.id || "";
    setAllCases((prev) =>
      prev.map((c) => {
        if (c.id !== caseId) return c;
        const fullWorkspace: ClinicalWorkspace = {
          ...workspace,
          submittedAt: c.clinicalWorkspace?.submittedAt || now,
          submittedByDoctorId: c.clinicalWorkspace?.submittedByDoctorId || doctorId,
          submittedByDoctorName: c.clinicalWorkspace?.submittedByDoctorName || doctorName,
          lastUpdatedAt: now,
        };
        const audit: AuditLog = {
          id: `aud_${Date.now()}`,
          caseId,
          action: "CLINICAL_WORKSPACE_SAVED",
          actorName: doctorName,
          actorRole: "hospital_doctor",
          timestamp: now,
          details: `Treatment plan updated. LOS: ${workspace.expectedStayDays}d, Cost: $${workspace.costEstimateUsd}, Suitability: ${workspace.suitabilityDetermination.toUpperCase()}. Record timestamped to ${doctorName} account — system of record for clinical liability.`,
        };
        const quoteUpdate = c.quote
          ? {
              ...c.quote,
              totalCostUsd: workspace.costEstimateUsd || c.quote.totalCostUsd,
              costBreakdown: {
                ...c.quote.costBreakdown,
                hospitalChargesUsd: workspace.costEstimateUsd
                  ? Math.round(workspace.costEstimateUsd * 0.6)
                  : c.quote.costBreakdown.hospitalChargesUsd,
                surgeonAndAnesthesiaUsd: workspace.costEstimateUsd
                  ? Math.round(workspace.costEstimateUsd * 0.4)
                  : c.quote.costBreakdown.surgeonAndAnesthesiaUsd,
              },
            }
          : undefined;

        return {
          ...c,
          clinicalWorkspace: fullWorkspace,
          quote: quoteUpdate,
          auditLogs: [audit, ...c.auditLogs],
        };
      })
    );
  };

  const requestDocumentViaCs = (caseId: string, docTitle: string, note: string) => {
    const now = new Date().toISOString();
    const doctorName = currentUser?.name || "Dr. Subhash Gupta";
    setAllCases((prev) =>
      prev.map((c) => {
        if (c.id !== caseId) return c;
        const csNote: CsNote = {
          id: `note_${Date.now()}`,
          text: `🚩 CLINICAL DOCUMENT REQUEST from ${doctorName}: Missing diagnostic scan/page for "${docTitle}". Notes: ${note}`,
          createdAt: now,
          authorName: doctorName,
          authorRole: "hospital_doctor",
        };
        const audit: AuditLog = {
          id: `aud_${Date.now()}`,
          caseId,
          action: "DOCUMENT_CLARIFICATION_REQUESTED",
          actorName: doctorName,
          actorRole: "hospital_doctor",
          timestamp: now,
          details: `Requested missing pages for ${docTitle} via CS desk: ${note}`,
        };
        const updatedDocs = c.documents.map((d) => {
          if (d.title.toLowerCase() === docTitle.toLowerCase() || d.id === docTitle) {
            return {
              ...d,
              status: "incomplete" as const,
              csFeedback: `🟡 Missing details requested by ${doctorName}: ${note}`,
            };
          }
          return d;
        });
        return {
          ...c,
          csNotes: [csNote, ...c.csNotes],
          documents: updatedDocs,
          auditLogs: [audit, ...c.auditLogs],
        };
      })
    );
  };

  const toggleConsultationRecording = (caseId: string, enabled: boolean, consentObtained?: boolean) => {
    const now = new Date().toISOString();
    const doctorName = currentUser?.name || "Doctor";
    setAllCases((prev) =>
      prev.map((c) => {
        if (c.id !== caseId || !c.consultation) return c;
        const audit: AuditLog = {
          id: `aud_${Date.now()}`,
          caseId,
          action: enabled ? "RECORDING_ENABLED" : "RECORDING_DISABLED",
          actorName: doctorName,
          actorRole: "hospital_doctor",
          timestamp: now,
          details: enabled
            ? `Recording ENABLED. Consent obtained: ${consentObtained ? 'YES' : 'NO'}. Jurisdiction check required.`
            : `Recording DISABLED by ${doctorName}.`,
        };
        return {
          ...c,
          consultation: {
            ...c.consultation,
            recordingEnabled: enabled,
            recordingConsentObtained: consentObtained ?? c.consultation.recordingConsentObtained,
          },
          auditLogs: [audit, ...c.auditLogs],
        };
      })
    );
  };

  // ─── CS Portal Actions ───────────────────────────────────────────────────────

  const addCsNote = (caseId: string, text: string) => {
    const now = new Date().toISOString();
    const authorName = currentUser?.name || "CS Agent";
    const authorRole = currentUser?.role || "customer_support";
    setAllCases((prev) =>
      prev.map((c) => {
        if (c.id !== caseId) return c;
        const newNote: CsNote = {
          id: `note_${Date.now()}`,
          text,
          createdAt: now,
          authorName,
          authorRole,
        };
        return { ...c, csNotes: [newNote, ...c.csNotes] };
      })
    );
  };

  const updateStageWithReason = (caseId: string, stage: PatientJourneyStage, reason?: string) => {
    const now = new Date().toISOString();
    const changedByName = currentUser?.name || "CS Agent";
    const changedByRole = currentUser?.role || "customer_support";
    setAllCases((prev) =>
      prev.map((c) => {
        if (c.id !== caseId) return c;
        const stageEvent: StageHistoryEvent = {
          id: `sh_${Date.now()}`,
          fromStage: c.stage,
          toStage: stage,
          changedAt: now,
          changedByName,
          changedByRole,
          reason,
        };
        const audit: AuditLog = {
          id: `aud_${Date.now()}`,
          caseId,
          action: "STAGE_OVERRIDE",
          actorName: changedByName,
          actorRole: changedByRole,
          timestamp: now,
          details: `Stage changed from ${c.stage} to ${stage}. Reason: ${reason || 'Normal progression'}.`,
        };
        return {
          ...c,
          stage,
          stageHistory: [...c.stageHistory, stageEvent],
          auditLogs: [audit, ...c.auditLogs],
        };
      })
    );
  };

  const moveToNurture = (caseId: string, entry: Omit<NurtureEntry, 'addedAt' | 'addedByName'>) => {
    const now = new Date().toISOString();
    const agentName = currentUser?.name || "CS Agent";
    setAllCases((prev) =>
      prev.map((c) => {
        if (c.id !== caseId) return c;
        const nurtureEntry: NurtureEntry = { ...entry, addedAt: now, addedByName: agentName };
        const stageEvent: StageHistoryEvent = {
          id: `sh_${Date.now()}`,
          fromStage: c.stage,
          toStage: "nurture",
          changedAt: now,
          changedByName: agentName,
          changedByRole: "customer_support",
          reason: entry.notes,
        };
        const audit: AuditLog = {
          id: `aud_${Date.now()}`,
          caseId,
          action: "MOVED_TO_NURTURE",
          actorName: agentName,
          actorRole: "customer_support",
          timestamp: now,
          details: `Case moved to Nurture queue. Reason: ${entry.reason}. Follow-up: ${entry.scheduledFollowUpAt || 'TBD'}.`,
        };
        return {
          ...c,
          stage: "nurture",
          nurtureEntry,
          stageHistory: [...c.stageHistory, stageEvent],
          auditLogs: [audit, ...c.auditLogs],
        };
      })
    );
  };

  // ─── Finance Actions ─────────────────────────────────────────────────────────

  const bulkAssignCases = (caseIds: string[], coordinatorName: string) => {
    const now = new Date().toISOString();
    const actorName = currentUser?.name || "CS Agent";
    setAllCases((prev) =>
      prev.map((c) => {
        if (!caseIds.includes(c.id)) return c;
        const audit: AuditLog = {
          id: `aud_${Date.now()}_${Math.random()}`,
          caseId: c.id,
          action: "BULK_ASSIGN",
          actorName,
          actorRole: currentUser?.role || "customer_support",
          timestamp: now,
          details: `Assigned to ${coordinatorName} via bulk action.`,
        };
        return { ...c, assignedCoordinatorName: coordinatorName, auditLogs: [audit, ...c.auditLogs] };
      })
    );
  };

  const bulkUpdateStage = (caseIds: string[], stage: PatientJourneyStage) => {
    const now = new Date().toISOString();
    const actorName = currentUser?.name || "CS Agent";
    const actorRole = currentUser?.role || "customer_support";
    setAllCases((prev) =>
      prev.map((c) => {
        if (!caseIds.includes(c.id)) return c;
        const stageEvent: StageHistoryEvent = {
          id: `sh_${Date.now()}_${Math.random()}`,
          fromStage: c.stage,
          toStage: stage,
          changedAt: now,
          changedByName: actorName,
          changedByRole: actorRole,
          reason: "Bulk stage update",
        };
        const audit: AuditLog = {
          id: `aud_${Date.now()}_${Math.random()}`,
          caseId: c.id,
          action: "BULK_STAGE_UPDATE",
          actorName,
          actorRole,
          timestamp: now,
          details: `Stage changed from ${c.stage} to ${stage} via bulk action.`,
        };
        return {
          ...c,
          stage,
          stageHistory: [...c.stageHistory, stageEvent],
          auditLogs: [audit, ...c.auditLogs],
        };
      })
    );
  };

  const bulkSendMessage = (caseIds: string[], text: string) => {
    const senderRole = currentUser?.role === "customer_support" ? "cs_coordinator" : "patient";
    const senderName = currentUser?.name || "CS Agent";
    setAllCases((prev) =>
      prev.map((c) => {
        if (!caseIds.includes(c.id)) return c;
        const newMsg: InPortalMessage = {
          id: `msg_${Date.now()}_${Math.random()}`,
          senderId: currentUser?.id || "user_cs",
          senderName,
          senderRole,
          text,
          timestamp: "Just now",
          isRead: false,
        };
        return { ...c, messages: [...c.messages, newMsg] };
      })
    );
  };

  const claimNextUnassignedLead = (coordinatorName?: string): string | null => {
    const assignedName = coordinatorName || currentUser?.name || "Care Coordinator";
    const now = new Date().toISOString();
    
    // Find unassigned case (or first lead)
    const targetCase = allCases.find((c) => !c.assignedCoordinatorName || c.stage === "lead");
    if (!targetCase) return null;

    setAllCases((prev) =>
      prev.map((c) => {
        if (c.id !== targetCase.id) return c;
        const stageEvent: StageHistoryEvent = {
          id: `sh_${Date.now()}`,
          fromStage: c.stage,
          toStage: c.stage === "lead" ? "contacted" : c.stage,
          changedAt: now,
          changedByName: assignedName,
          changedByRole: currentUser?.role || "customer_support",
          reason: "Claimed via 1-Click Fast Claim Desk",
        };
        const audit: AuditLog = {
          id: `aud_${Date.now()}`,
          caseId: c.id,
          action: "LEAD_CLAIMED",
          actorName: assignedName,
          actorRole: currentUser?.role || "customer_support",
          timestamp: now,
          details: `Lead claimed by ${assignedName}. Assigned to queue: ${c.assignedQueue}.`,
        };
        return {
          ...c,
          assignedCoordinatorName: assignedName,
          stage: c.stage === "lead" ? "contacted" : c.stage,
          stageHistory: [...c.stageHistory, stageEvent],
          auditLogs: [audit, ...c.auditLogs],
        };
      })
    );

    setActiveCaseId(targetCase.id);
    return targetCase.id;
  };

  const savePackageQuote = (caseId: string, customQuote: Partial<import("../../types/portal").QuotePackage>) => {
    const now = new Date().toISOString();
    const actorName = currentUser?.name || "Care Coordinator";

    setAllCases((prev) =>
      prev.map((c) => {
        if (c.id !== caseId) return c;
        const existingQuote = c.quote || {
          id: `qte_${c.id}_${Date.now()}`,
          quoteNumber: `VED-QT-${Date.now().toString().slice(-5)}`,
          treatmentName: c.treatmentCategory,
          hospitalName: c.assignedHospitalId || "Medanta – The Medicity",
          doctorName: c.assignedDoctorId || "Lead Surgeon",
          city: "Delhi NCR, India",
          totalCostUsd: 25000,
          tier: "standard" as const,
          status: "draft" as const,
          createdAt: now,
          validUntil: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString(),
          costBreakdown: {
            hospitalChargesUsd: 8500,
            surgeonAndAnesthesiaUsd: 9000,
            implantsAndMedicationUsd: 5500,
            stayAndIcuUsd: 2000,
            vipConciergeAndLogisticsUsd: 0,
            companionStayUsd: 0,
            coordinationFeeUsd: 0,
            travelAssistanceUsd: 0,
            supportLayerUsd: 0,
          },
          inclusions: [],
          exclusions: [],
        };

        const mergedQuote = {
          ...existingQuote,
          ...customQuote,
          lastUpdatedAt: now,
        };

        const audit: AuditLog = {
          id: `aud_${Date.now()}`,
          caseId,
          action: "PACKAGE_QUOTE_CONFIGURED",
          actorName,
          actorRole: currentUser?.role || "customer_support",
          timestamp: now,
          details: `Package Quote #${mergedQuote.quoteNumber} configured. Tier: ${mergedQuote.tier || 'standard'}. Total: $${mergedQuote.totalCostUsd} USD. Status: ${mergedQuote.status}.`,
        };

        return {
          ...c,
          quote: mergedQuote,
          stage: mergedQuote.status === "sent" ? "quote" : c.stage,
          auditLogs: [audit, ...c.auditLogs],
        };
      })
    );
  };

  const sendMultiChannelMessage = (
    caseId: string,
    channel: import("../../types/portal").MessageChannel,
    text: string,
    recipient?: string,
    mentionedRoles?: string[]
  ) => {
    const senderRole = currentUser?.role === "customer_support" ? "cs_coordinator" : "patient";
    const senderName = currentUser?.name || "Care Coordinator";
    const now = new Date().toISOString();

    const newMsg: InPortalMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      senderId: currentUser?.id || "user_cs",
      senderName: channel === "internal_note" ? `[INTERNAL] ${senderName}` : senderName,
      senderRole,
      text,
      timestamp: now,
      isRead: false,
      channel,
      mentionedRoles,
    };

    const audit: AuditLog = {
      id: `aud_${Date.now()}`,
      caseId,
      action: `MESSAGE_SENT_${channel.toUpperCase()}`,
      actorName: senderName,
      actorRole: currentUser?.role || "customer_support",
      timestamp: now,
      details: `Dispatched via ${channel.toUpperCase()} ${recipient ? `to ${recipient}` : ''}. ${mentionedRoles?.length ? `Tagged: ${mentionedRoles.join(', ')}` : ''}`,
    };

    setAllCases((prev) =>
      prev.map((c) => {
        if (c.id !== caseId) return c;
        return {
          ...c,
          messages: [...c.messages, newMsg],
          auditLogs: [audit, ...c.auditLogs],
        };
      })
    );
  };

  const retriggerConsentRequest = (caseId: string, consentType: ConsentType) => {
    const now = new Date().toISOString();
    const actorName = currentUser?.name || "Care Coordinator";

    setAllCases((prev) =>
      prev.map((c) => {
        if (c.id !== caseId) return c;
        const audit: AuditLog = {
          id: `aud_${Date.now()}`,
          caseId,
          action: "CONSENT_RETRIGGERED",
          actorName,
          actorRole: currentUser?.role || "customer_support",
          timestamp: now,
          details: `Re-sent digital consent signature request for: ${consentType}. Link dispatched via SMS & Email.`,
        };

        const autoMsg: InPortalMessage = {
          id: `msg_${Date.now()}`,
          senderId: "system",
          senderName: "Vedara Compliance Desk",
          senderRole: "system",
          text: `A digital signature request for "${consentType.replace(/_/g, ' ')}" has been dispatched to your registered contact. Please review and sign.`,
          timestamp: now,
          isRead: false,
          channel: "portal",
        };

        return {
          ...c,
          messages: [...c.messages, autoMsg],
          auditLogs: [audit, ...c.auditLogs],
        };
      })
    );
  };

  const updateItineraryDetails = (caseId: string, itinerary: Partial<import("../../types/portal").LogisticsItinerary>) => {
    const now = new Date().toISOString();
    const actorName = currentUser?.name || "Care Coordinator";

    setAllCases((prev) =>
      prev.map((c) => {
        if (c.id !== caseId) return c;
        const existing = c.itinerary || {
          doctorAppointmentDate: "2026-09-01",
          doctorAppointmentTime: "10:00 AM IST",
          hospitalAddress: "Medanta – The Medicity, Gurugram, Delhi NCR",
          coordinatorContact: {
            name: "Ananya Sharma",
            phone: "+91 98101 88412",
            whatsapp: "+91 98101 88412",
            email: "ananya.sharma@vedaracare.com",
          },
          visaDocumentChecklist: {
            country: c.patientCountry,
            passportValidityRequired: "6 Months",
            mInvitationLetterReady: true,
            embassySubmissionUrl: "https://indianvisaonline.gov.in/evisa/tvoa.html",
            requiredItems: [],
          },
        };

        const merged = {
          ...existing,
          ...itinerary,
        };

        const audit: AuditLog = {
          id: `aud_${Date.now()}`,
          caseId,
          action: "ITINERARY_UPDATED",
          actorName,
          actorRole: currentUser?.role || "customer_support",
          timestamp: now,
          details: `Travel, Visa, and Concierge logistics updated.`,
        };

        return {
          ...c,
          itinerary: merged,
          auditLogs: [audit, ...c.auditLogs],
        };
      })
    );
  };

  const initiateRefund = (caseId: string, paymentStageId: PaymentStageId, amountUsd: number, reason: string) => {
    const now = new Date().toISOString();
    const requesterName = currentUser?.name || "Finance";
    const newRefund: RefundRequest = {
      id: `refund_${Date.now()}`,
      caseId,
      paymentStageId,
      amountUsd,
      reason,
      requestedAt: now,
      requestedByName: requesterName,
      status: amountUsd > 2000 ? "pending_approval" : "approved",
    };
    const audit: AuditLog = {
      id: `aud_${Date.now()}`,
      caseId,
      action: "REFUND_INITIATED",
      actorName: requesterName,
      actorRole: "finance_accounts",
      timestamp: now,
      details: `Refund of $${amountUsd} initiated for stage ${paymentStageId}. Reason: ${reason}. Status: ${newRefund.status}.`,
    };
    setAllCases((prev) =>
      prev.map((c) => {
        if (c.id !== caseId) return c;
        return {
          ...c,
          refundRequests: [...(c.refundRequests || []), newRefund],
          auditLogs: [audit, ...c.auditLogs],
        };
      })
    );
  };

  const grantBillingDisputeAccess = (caseId: string, reason: string) => {
    const now = new Date().toISOString();
    const granterName = currentUser?.name || "Finance";
    const grant: BillingDisputeAccessGrant = {
      caseId,
      grantedAt: now,
      grantedByName: granterName,
      reason,
      expiresAt: new Date(Date.now() + 48 * 3600 * 1000).toISOString(),
    };
    const audit: AuditLog = {
      id: `aud_${Date.now()}`,
      caseId,
      action: "BILLING_DISPUTE_ACCESS_GRANTED",
      actorName: granterName,
      actorRole: "finance_accounts",
      timestamp: now,
      details: `Clinical record access GRANTED for billing dispute review. Reason: ${reason}. Expires: 48h. This action is logged and not default visibility.`,
    };
    setAllCases((prev) =>
      prev.map((c) => {
        if (c.id !== caseId) return c;
        return {
          ...c,
          hasBillingDispute: true,
          billingDisputeNotes: reason,
          billingDisputeAccessGrants: [...(c.billingDisputeAccessGrants || []), grant],
          auditLogs: [audit, ...c.auditLogs],
        };
      })
    );
  };

  return (
    <PortalContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        availableUsers: MOCK_PORTAL_USERS,
        loginAs,
        logout,
        allCases,
        visibleCases,
        activeCase,
        setActiveCaseId,
        currency,
        setCurrency,
        formatCurrency,
        language,
        setLanguage,
        createNewLead,
        uploadDocument,
        recordConsent,
        updateConsultationOutcome,
        respondToQuote,
        payStage,
        submitRecoveryReport,
        sendPortalMessage,
        updateDocumentReviewStatus,
        updateCaseStage,
        // Hospital
        acceptCase,
        declineCase,
        saveClinicalWorkspace,
        toggleConsultationRecording,
        requestDocumentViaCs,
        // CS
        addCsNote,
        updateStageWithReason,
        moveToNurture,
        bulkAssignCases,
        bulkUpdateStage,
        bulkSendMessage,
        claimNextUnassignedLead,
        savePackageQuote,
        sendMultiChannelMessage,
        retriggerConsentRequest,
        updateItineraryDetails,
        // Finance
        initiateRefund,
        grantBillingDisputeAccess,
        resetToDefaultData,
      }}
    >
      {children}
    </PortalContext.Provider>
  );
};

export const usePortal = () => {
  const ctx = useContext(PortalContext);
  if (!ctx) {
    throw new Error("usePortal must be used within a PortalProvider");
  }
  return ctx;
};

