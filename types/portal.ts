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
  | "followup";

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
}

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
}

export interface QuotePackage {
  id: string;
  quoteNumber: string;
  treatmentName: string;
  hospitalName: string;
  doctorName: string;
  city: string;
  totalCostUsd: number;
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
  };
  inclusions: string[];
  exclusions: string[];
  patientDecisionTimestamp?: string;
  patientDeclineReason?: string;
  patientChangeRequestNotes?: string;
}

export type PaymentStageId = "deposit" | "advance" | "final";
export type PaymentStatus = "pending" | "processing" | "completed" | "failed" | "refunded";

export interface PaymentStage {
  id: PaymentStageId;
  name: string;
  percentage: number;
  amountUsd: number;
  dueDate: string;
  status: PaymentStatus;
  cancellationTerms: string;
  refundPolicy: string;
  termsAcceptedAt?: string;
  paidAt?: string;
  transactionId?: string;
  receiptNumber?: string;
  paymentMethod?: "card" | "wire" | "swift" | "crypto";
}

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
}

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
  hasBillingDispute?: boolean;
  billingDisputeNotes?: string;

  // Clinical Summary
  clinicalSummary: {
    chiefComplaint: string;
    diagnosis: string;
    recommendedProcedure: string;
    pastMedicalHistory?: string;
    allergies?: string[];
  };

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
}
