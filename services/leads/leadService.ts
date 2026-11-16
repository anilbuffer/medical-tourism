import { apiClient } from '@/services/apiClient';
import type { CreateLeadPayload, CreateLeadResponse } from './types';

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

