export interface CreateLeadPayload {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  treatmentCategory: string;
  notes: string;
  privacyConsentGiven: boolean;
}

export interface LeadData {
  id: string;
}

export interface CreateLeadResponse {
  success: boolean;
  message: string;
  data: LeadData;
}

export interface ApiValidationErrorItem {
  field: string;
  messages: string[];
}

export interface ApiErrorResponse {
  success: boolean;
  statusCode?: number;
  message: string;
  errors?: ApiValidationErrorItem[];
  path?: string;
  timestamp?: string;
  requestId?: string;
}

