export type UserRole =
  | "public"
  | "patient"
  | "hospital_doctor"
  | "customer_support"
  | "finance_accounts"
  | "super_admin";

export interface PortalUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  patientId?: string; // If role === 'patient'
  hospitalId?: string; // If role === 'hospital_doctor'
  doctorId?: string; // If role === 'hospital_doctor'
  assignedQueues?: string[]; // If role === 'customer_support'
  phone?: string;
  country?: string;
  mfaEnforced?: boolean;
  isActive?: boolean;
}

export type PatientJourneyStage =
  | "lead"
  | "contacted"
  | "documents_collected"
  | "hospital_handover"
  | "consultation"
  | "quote"
  | "payment"
  | "booking"
  | "treatment"
  | "followup"
  | "nurture";

// ─── Case Decision (Accept / Decline by Hospital) ───────────────────────────
export type CaseDecisionStatus = "pending_review" | "accepted" | "declined";

// ─── Clinical Workspace (Hospital/Doctor — post-accept) ─────────────────────
export interface ClinicalWorkspace {
  treatmentPlan: string;
  expectedStayDays: number;
  costEstimateUsd: number;
  suitabilityDetermination: "suitable" | "not_suitable" | "needs_more_info" | "pending";
  submittedAt?: string;
  submittedByDoctorId?: string;
  submittedByDoctorName?: string;
  lastUpdatedAt?: string;
}

// ─── Stage History Event (CS Timeline) ──────────────────────────────────────
export interface StageHistoryEvent {
  id: string;
  fromStage: PatientJourneyStage | null;
  toStage: PatientJourneyStage;
  changedAt: string;
  changedByName: string;
  changedByRole: UserRole;
  reason?: string; // Required if skipping stages
}

// ─── CS Notes ────────────────────────────────────────────────────────────────
export interface CsNote {
  id: string;
  text: string;
  createdAt: string;
  authorName: string;
  authorRole: UserRole;
}

// ─── Accreditation Profile ───────────────────────────────────────────────────
export type AccreditationStatus = "active" | "expired" | "pending_renewal" | "not_accredited";

export interface AccreditationProfile {
  hospitalId: string;
  hospitalName: string;
  jciStatus: AccreditationStatus;
  jciExpiry?: string;
  jciDocumentUrl?: string;
  nabhStatus: AccreditationStatus;
  nabhExpiry?: string;
  nabhDocumentUrl?: string;
  lastAuditedAt?: string;
  country: string;
  city: string;
  specialties: string[];
}

// ─── Nurture ────────────────────────────────────────────────────────────────
export type NurtureReason = "declined_by_hospital" | "paused_by_patient" | "budget_mismatch" | "not_ready" | "other";

export interface NurtureEntry {
  reason: NurtureReason;
  notes?: string;
  scheduledFollowUpAt?: string;
  addedAt: string;
  addedByName: string;
}

// ─── Refund Request ──────────────────────────────────────────────────────────
export type RefundStatus = "pending_approval" | "approved" | "rejected" | "processed";

export interface RefundRequest {
  id: string;
  caseId: string;
  paymentStageId: PaymentStageId;
  amountUsd: number;
  reason: string;
  requestedAt: string;
  requestedByName: string;
  status: RefundStatus;
  approvedByName?: string;
  approvedAt?: string;
  notes?: string;
}

// ─── Document Types ───────────────────────────────────────────────────────────
export interface DocumentVersion {
  version: number;
  fileName: string;
  fileSize: string;
  fileType: string;
  uploadedAt: string;
  uploadedBy: string;
  fileUrl?: string;
  csNotes?: string;
}

export type DocumentStatus = "pending_review" | "reviewed" | "incomplete";

export interface PatientDocument {
  id: string;
  title: string;
  category: "medical_report" | "scan_imaging" | "prescription" | "prior_history" | "passport_id" | "discharge_summary" | "other";
  status: DocumentStatus;
  csFeedback?: string;
  currentVersion: number;
  versions: DocumentVersion[];
  requiredForStage?: PatientJourneyStage;
  isRequired?: boolean;
  isCaseScoped?: boolean; // true = belongs to this case only; false = prior history (hospital cannot see if false)
}

// ─── Consent ──────────────────────────────────────────────────────────────────
export type ConsentType =
  | "privacy_data_processing"
  | "hospital_document_sharing"
  | "tele_consultation_terms"
  | "payment_staged_terms";

export interface ConsentRecord {
  id: string;
  consentType: ConsentType;
  title: string;
  description: string;
  agreed: boolean;
  timestamp: string;
  ipAddress: string;
  version: string;
  digitalSignature?: string;
  paymentStageId?: string; // If consentType === 'payment_staged_terms'
}

// ─── Tele-Consultation ────────────────────────────────────────────────────────
export type ConsultationOutcome = "suitable" | "needs_more_info" | "not_suitable" | "pending";

export interface TeleConsultation {
  id: string;
  scheduledAt: string;
  durationMinutes: number;
  doctorName: string;
  doctorSpecialty: string;
  doctorHospital: string;
  doctorAvatar?: string;
  meetingLink: string;
  status: "scheduled" | "completed" | "cancelled";
  outcome: ConsultationOutcome;
  outcomeNotes?: string;
  redirectHospitalOrSpecialty?: string;
  prescriptionSummary?: string;
  diagnosticPreChecklist?: { item: string; completed: boolean }[];
  recordingEnabled: boolean; // OFF by default
  recordingConsentObtained?: boolean;
  recordingJurisdictionChecked?: boolean;
}

// ─── Quote Package ────────────────────────────────────────────────────────────
export type QuoteTier = "basic" | "standard" | "premium";

export interface QuotePackage {
  id: string;
  quoteNumber: string;
  treatmentName: string;
  hospitalName: string;
  doctorName: string;
  city: string;
  totalCostUsd: number;
  tier?: QuoteTier;
  status: "draft" | "sent" | "accepted" | "declined" | "change_requested";
  createdAt: string;
  validUntil: string;
  costBreakdown: {
    hospitalChargesUsd: number;
    surgeonAndAnesthesiaUsd: number;
    implantsAndMedicationUsd: number;
    stayAndIcuUsd: number;
    vipConciergeAndLogisticsUsd: number;
    companionStayUsd: number;
    coordinationFeeUsd?: number;
    travelAssistanceUsd?: number;
    supportLayerUsd?: number;
  };
  inclusions: string[];
  exclusions: string[];
  patientDecisionTimestamp?: string;
  patientDeclineReason?: string;
  patientChangeRequestNotes?: string;
}

// ─── Payment ──────────────────────────────────────────────────────────────────
export type PaymentStageId = "deposit" | "advance" | "final" | "intake_deposit" | "booking_deposit";
export type PaymentStatus = "pending" | "processing" | "completed" | "failed" | "refunded" | "disputed";

export interface PaymentStage {
  id: PaymentStageId;
  name: string;
  percentage: number;
  amountUsd: number;
  currency?: string;
  dueDate: string;
  status: PaymentStatus;
  cancellationTerms: string;
  refundPolicy: string;
  termsAcceptedAt?: string;
  paidAt?: string;
  transactionId?: string; // Gateway reference only — no raw card data (PCI-DSS)
  receiptNumber?: string;
  paymentMethod?: "card" | "wire" | "swift" | "crypto";
  gatewayReference?: string; // Gateway transaction ID for reconciliation
  reconciled?: boolean;
  reconciliationMismatch?: boolean;
}

// ─── Logistics ────────────────────────────────────────────────────────────────
export interface LogisticsItinerary {
  doctorAppointmentDate: string;
  doctorAppointmentTime: string;
  hospitalAddress: string;
  flightDetails?: {
    flightNumber: string;
    airline: string;
    arrivalDate: string;
    arrivalTime: string;
    terminal: string;
  };
  hotelDetails?: {
    name: string;
    address: string;
    checkIn: string;
    checkOut: string;
    roomType: string;
    bookingReference: string;
  };
  airportPickup?: {
    driverName: string;
    contactPhone: string;
    vehicleType: string;
    vehicleNumber: string;
    pickupLocation: string;
  };
  coordinatorContact: {
    name: string;
    phone: string;
    whatsapp: string;
    email: string;
    avatar?: string;
  };
  visaDocumentChecklist: {
    country: string;
    passportValidityRequired: string;
    mInvitationLetterReady: boolean;
    embassySubmissionUrl: string;
    requiredItems: { id: string; name: string; completed: boolean; note: string }[];
  };
}

// ─── Messages ─────────────────────────────────────────────────────────────────
export type MessageChannel = "whatsapp" | "email" | "portal" | "internal_note";

export interface InPortalMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: "patient" | "cs_coordinator" | "doctor" | "system";
  text: string;
  timestamp: string;
  attachmentUrl?: string;
  attachmentName?: string;
  isRead: boolean;
  channel?: MessageChannel;
  mentionedRoles?: string[];
}


// ─── Recovery ─────────────────────────────────────────────────────────────────
export interface RecoveryCheckIn {
  id: string;
  submittedAt: string;
  daysPostOp: number;
  painLevel: number; // 1 to 10
  mobilityStatus: "bedrest" | "walking_assisted" | "walking_independently" | "full_normal";
  incisionHealing: "clean_dry" | "slight_redness" | "discharge_noted" | "swelling";
  feverReported: boolean;
  medicationAdherence: "taking_as_prescribed" | "missed_doses" | "side_effects_felt";
  patientNotes?: string;
  coordinatorAcknowledged: boolean;
  coordinatorReply?: string;
}

// ─── Audit Log ────────────────────────────────────────────────────────────────
export interface AuditLog {
  id: string;
  caseId: string;
  action: string;
  actorName: string;
  actorRole: UserRole;
  timestamp: string;
  details?: string;
  ipAddress?: string;
}

// ─── Billing Dispute Access Grant ────────────────────────────────────────────
export interface BillingDisputeAccessGrant {
  caseId: string;
  grantedAt: string;
  grantedByName: string;
  reason: string;
  expiresAt?: string;
}

// ─── Core Patient Case ────────────────────────────────────────────────────────
export interface PatientCase {
  id: string; // PT-YYYY-NNNNNN
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  patientCountry: string;
  preferredLanguage: string;
  treatmentCategory: string;
  preferredContactTime?: string;
  entryPath: "general_enquiry" | "hospital_referred" | "doctor_referred";
  referredHospitalId?: string;
  referredDoctorId?: string;
  assignedHospitalId?: string;
  assignedDoctorId?: string;
  assignedQueue: string; // e.g. "Cardiology_Tier1", "Oncology_EMEA"
  assignedCoordinatorName: string;
  lastContactAt?: string;

  // SLA tracking
  leadCreatedAt: string;
  slaTargetMinutes: number;
  slaExpiresAt: string;
  slaBreached: boolean;

  // UTM / CAC Parameters
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;

  // Journey & Clinical Status
  stage: PatientJourneyStage;

  // Hospital Accept / Decline
  caseDecisionStatus: CaseDecisionStatus;
  declineReason?: string;
  acceptedAt?: string;
  declinedAt?: string;
  acceptedByDoctorId?: string;
  acceptedByDoctorName?: string;

  // Clinical Summary
  clinicalSummary: {
    chiefComplaint: string;
    diagnosis: string;
    recommendedProcedure: string;
    pastMedicalHistory?: string;
    allergies?: string[];
  };

  // Clinical Workspace (hospital, post-accept) — separate from CS communication
  clinicalWorkspace?: ClinicalWorkspace;

  // Stage history (full timeline)
  stageHistory: StageHistoryEvent[];

  // CS Notes (free-text, append-only)
  csNotes: CsNote[];

  // Nurture
  nurtureEntry?: NurtureEntry;

  // Billing Dispute
  hasBillingDispute?: boolean;
  billingDisputeNotes?: string;
  billingDisputeAccessGrants?: BillingDisputeAccessGrant[];

  // Sub-modules
  documents: PatientDocument[];
  consents: ConsentRecord[];
  consultation?: TeleConsultation;
  quote?: QuotePackage;
  payments: PaymentStage[];
  itinerary?: LogisticsItinerary;
  messages: InPortalMessage[];
  recoveryCheckIns: RecoveryCheckIn[];
  auditLogs: AuditLog[];
  refundRequests?: RefundRequest[];
}

// ─── System Config Types ──────────────────────────────────────────────────────
export interface ConsentTextVersion {
  id: string;
  consentType: ConsentType;
  country: string;
  version: string;
  text: string;
  uploadedAt: string;
  uploadedByName: string;
  isActive: boolean;
}

export interface VisaChecklistRule {
  id: string;
  patientHomeCountry: string;
  requiredDocuments: { name: string; mandatory: boolean; note?: string }[];
  lastUpdatedAt: string;
}

export interface RefundCancellationRule {
  id: string;
  paymentStage: PaymentStageId;
  hospitalId?: string; // null = default rule
  description: string;
  refundPercentage: number;
  conditions: string;
  lastUpdatedAt: string;
}

export interface SlaThreshold {
  market: string;
  tier1Minutes: number;
  tier2Minutes: number;
  escalationMinutes: number;
}

// ─── Patient Portal Revised Architecture Types ──────────────────────────────
export type PatientTab =
  | "overview"
  // My Medical Record
  | "docs_vault"
  | "prescriptions_history"
  | "documents"
  // Consultations
  | "upcoming_video"
  | "doctor_opinions"
  | "consultation"
  // Quote & Payments
  | "package_quote"
  | "payment_escrow"
  | "quote"
  | "payments"
  // Travel & Logistics
  | "visa_checklist"
  | "flight_hotel"
  | "concierge_contact"
  | "booking"
  // Recovery & Follow Up
  | "discharge_summary"
  | "recovery_forms"
  | "recovery"
  | "post_treatment"
  // Privacy & Consents
  | "legal_consents"
  | "consents"
  // Messaging
  | "messages";

export type PatientNavGroup =
  | "dashboard_group"
  | "medical_records_group"
  | "consultations_group"
  | "quote_payments_group"
  | "travel_logistics_group"
  | "recovery_group"
  | "privacy_consents_group";

// ─── Super Admin Revised Architecture Types ──────────────────────────────────
export type AdminTab =
  | "dashboard_overview"
  // User & Access Management (RBAC)
  | "internal_staff"
  | "hospital_doctors"
  | "role_permission_matrix"
  // Compliance & Legal Engine
  | "consent_versioning"
  | "visa_rules"
  | "refund_escrow_rules"
  | "accreditation_registry"
  // Case Journey & Queues
  | "case_master_directory"
  | "sla_escalation_engine"
  | "nurture_queue"
  // Financial & Payments Ledger
  | "gateway_escrow"
  | "commission_payouts"
  | "refund_approvals"
  // System Audit & Logs
  | "system_audit_trail"
  | "security_mfa_logs"
  | "marketing_utm_analytics"
  // System Configuration
  | "geo_sla_timers"
  | "routing_automation";

export type AdminNavGroup =
  | "dashboard_group"
  | "user_rbac_group"
  | "compliance_legal_group"
  | "case_queues_group"
  | "financial_ledger_group"
  | "system_audit_group"
  | "system_config_group";

export interface SecurityMfaLog {
  id: string;
  timestamp: string;
  eventType:
    | "mfa_challenge_success"
    | "mfa_challenge_failed"
    | "mfa_enforced"
    | "login_success"
    | "login_failed"
    | "privilege_escalation_attempt"
    | "session_revoked"
    | "password_reset";
  userId: string;
  userName: string;
  userRole: UserRole;
  ipAddress: string;
  geoCountry: string;
  deviceInfo: string;
  threatLevel: "normal" | "medium" | "high" | "critical";
  status: "success" | "blocked" | "flagged";
  details: string;
}

export interface HospitalPayoutBatch {
  id: string;
  hospitalId: string;
  hospitalName: string;
  caseCount: number;
  grossAmountUsd: number;
  platformFeePercentage: number;
  platformFeeUsd: number;
  netPayoutUsd: number;
  bankSwiftCode: string;
  bankIban: string;
  status: "pending_approval" | "processing" | "disbursed" | "on_hold";
  periodStart: string;
  periodEnd: string;
  initiatedAt: string;
  approvedByName?: string;
  approvedAt?: string;
}

export interface QueueRoutingRule {
  id: string;
  name: string;
  keywords: string[];
  specialty: string;
  targetQueue: string;
  priorityLevel: "Critical" | "High" | "Medium" | "Standard";
  targetCoordinatorLead: string;
  autoEscalateMinutes: number;
  active: boolean;
}
