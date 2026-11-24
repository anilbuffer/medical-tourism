export type ReferralSourceType =
  | 'internet_search'
  | 'youtube'
  | 'social_media'
  | 'partner'
  | 'other';

export interface ReferralSourceOption {
  value: ReferralSourceType;
  label: string;
  partnerId: string | null;
}

export interface ReferralSourcesResponse {
  success: boolean;
  message: string;
  data: ReferralSourceOption[];
}

export interface CreateLeadPayload {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  treatmentCategory: string;
  notes?: string;
  privacyConsentGiven: boolean;
  referralSource: ReferralSourceType;
  referralPartnerId?: string;
  referralSourceOther?: string;
  preferredContactTime?: string;
  preferredCity?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
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
