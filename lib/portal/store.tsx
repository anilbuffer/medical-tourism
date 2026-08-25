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
} from "../../types/portal";
import { INITIAL_PATIENT_CASES, MOCK_PORTAL_USERS } from "./mockData";
import { applyRowLevelSecurity } from "./rbac";

export interface PortalContextType {
  currentUser: PortalUser | null;
  setCurrentUser: (user: PortalUser | null) => void;
  availableUsers: PortalUser[];
  loginAs: (user: PortalUser) => void;
  logout: () => void;

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
  resetToDefaultData: () => void;
}

const PortalContext = createContext<PortalContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_CASES = "vedara_portal_cases_v1";
const LOCAL_STORAGE_KEY_USER = "vedara_portal_active_user_v1";
const LOCAL_STORAGE_KEY_COUNTER = "vedara_portal_pt_counter_v1";

export const PortalProvider = ({ children }: { children: ReactNode }) => {
  const [allCases, setAllCases] = useState<PatientCase[]>(INITIAL_PATIENT_CASES);
  const [currentUser, setCurrentUserState] = useState<PortalUser | null>(MOCK_PORTAL_USERS[0]);
  const [activeCaseId, setActiveCaseId] = useState<string>("PT-2026-008492");
  const [isHydrated, setIsHydrated] = useState(false);

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
    setActiveCaseId("PT-2026-008492");
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY_CASES, JSON.stringify(INITIAL_PATIENT_CASES));
        localStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify(MOCK_PORTAL_USERS[0]));
        localStorage.setItem(LOCAL_STORAGE_KEY_COUNTER, "8493");
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
      assignedCoordinatorName: "Aisha Khan",

      leadCreatedAt: now.toISOString(),
      slaTargetMinutes: slaMinutes,
      slaExpiresAt,
      slaBreached: false,

      utmSource: utmSource || "direct_portal_intake",
      utmMedium: utmMedium || "organic_web",
      utmCampaign: utmCampaign || "international_patient_inquiry",

      stage: "lead",
      hasBillingDispute: false,

      clinicalSummary: {
        chiefComplaint: notes || `Patient requested assessment for ${treatmentCategory}.`,
        diagnosis: "Pending specialist clinical file review.",
        recommendedProcedure: treatmentCategory,
      },

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
          dueDate: "Upon Quote Acceptance",
          status: "pending",
          cancellationTerms: "Secures hospital appointment and M-Visa invitation dispatch.",
          refundPolicy: "100% refundable with official visa rejection letter.",
        },
        {
          id: "advance",
          name: "Stage 2: Pre-Admission Escrow (60%)",
          percentage: 60,
          amountUsd: 4800,
          dueDate: "7 Days Prior to Departure",
          status: "pending",
          cancellationTerms: "Implant procurement and operating theatre reservation.",
          refundPolicy: "90% refundable up to 72 hrs before travel.",
        },
        {
          id: "final",
          name: "Stage 3: Final Hospital Clearance (25%)",
          percentage: 25,
          amountUsd: 2000,
          dueDate: "On Physical Admission",
          status: "pending",
          cancellationTerms: "Final settlement upon arrival & admission desk check-in.",
          refundPolicy: "Reconciled against final discharge bill.",
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
