import { PatientCase, PortalUser, UserRole } from "@/types/portal";

/**
 * Row-Level Security (RLS) Query Filter
 * Enforces data isolation and access boundaries at the query layer.
 */
export function applyRowLevelSecurity(
  cases: PatientCase[],
  currentUser: PortalUser | null
): PatientCase[] {
  if (!currentUser) {
    // Unauthenticated / Public -> No case access
    return [];
  }

  switch (currentUser.role) {
    case "super_admin":
      // Super admin has full row access
      return cases;

    case "patient":
      // Patient sees only their own case
      return cases.filter(
        (c) =>
          c.id === currentUser.patientId ||
          c.patientEmail.toLowerCase() === currentUser.email.toLowerCase()
      );

    case "hospital_doctor":
      // Hospital / Doctor sees only explicitly assigned cases
      return cases.filter(
        (c) =>
          (currentUser.hospitalId && c.assignedHospitalId === currentUser.hospitalId) ||
          (currentUser.doctorId && c.assignedDoctorId === currentUser.doctorId) ||
          (currentUser.hospitalId && c.referredHospitalId === currentUser.hospitalId)
      );

    case "customer_support":
      // CS coordinators have global triage visibility across cases, with scope filter for My Queue / Unassigned
      return cases;

    case "finance_accounts":
      // Finance has row access across cases, but clinical fields are redacted
      return cases.map((c) => sanitizeFinanceCaseView(c));

    case "public":
    default:
      return [];
  }
}

/**
 * Field-Level Security Sanitizer for Finance Role
 * Strips clinical details unless case has an active billing dispute.
 */
export function sanitizeFinanceCaseView(patientCase: PatientCase): PatientCase {
  if (patientCase.hasBillingDispute) {
    return patientCase; // Unredacted only for active billing dispute review
  }

  // Deep clone to prevent mutating underlying store
  const sanitized: PatientCase = JSON.parse(JSON.stringify(patientCase));
  
  // Redact clinical notes, medical complaints, and diagnosis
  sanitized.clinicalSummary = {
    chiefComplaint: "[REDACTED - FINANCIAL ACCESS RESTRICTED]",
    diagnosis: "[REDACTED - MEDICAL CONFIDENTIAL]",
    recommendedProcedure: patientCase.treatmentCategory, // High level category only
    pastMedicalHistory: "[REDACTED]",
    allergies: [],
  };

  // Strip clinical document contents (only keep financial / ID records)
  sanitized.documents = sanitized.documents.filter(
    (d) => d.category === "passport_id" || d.category === "other"
  );

  return sanitized;
}

/**
 * Role Permission Checkers
 */
export const RBAC_PERMISSIONS = {
  canEditClinicalFields: (role: UserRole): boolean => {
    return role === "hospital_doctor" || role === "super_admin";
  },
  canReviewDocuments: (role: UserRole): boolean => {
    return role === "customer_support" || role === "hospital_doctor" || role === "super_admin";
  },
  canCreateQuote: (role: UserRole): boolean => {
    return role === "customer_support" || role === "super_admin";
  },
  canProcessPayments: (role: UserRole): boolean => {
    return role === "patient" || role === "finance_accounts" || role === "super_admin";
  },
  canViewFinancialEscrow: (role: UserRole): boolean => {
    return role === "finance_accounts" || role === "super_admin";
  },
  canTriggerSlaOverride: (role: UserRole): boolean => {
    return role === "super_admin" || role === "customer_support";
  },
  canPerformRecoveryCheckin: (role: UserRole): boolean => {
    return role === "patient" || role === "super_admin";
  },
};
