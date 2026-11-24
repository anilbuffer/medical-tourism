import { apiClient } from '@/services/apiClient';
import type {
  CreateLeadPayload,
  CreateLeadResponse,
  ReferralSourcesResponse,
} from './types';

/**
 * Retrieves the available referral sources for "Where did you hear about Your Medicare Trip?".
 */
export async function getReferralSources(): Promise<ReferralSourcesResponse> {
  const response = await apiClient.get<ReferralSourcesResponse>(
    '/public/referral-sources'
  );
  return response.data;
}

/**
 * Submits a public lead / consultation enquiry to the API.
 *
 * @param payload - Structured lead details including contact, preferences and notes
 * @returns Response object with success status and assessment/lead ID
 */
export async function createLead(
  payload: CreateLeadPayload
): Promise<CreateLeadResponse> {
  const response = await apiClient.post<CreateLeadResponse>(
    '/public/leads',
    payload
  );
  return response.data;
}
