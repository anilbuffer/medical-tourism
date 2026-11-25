export type ChatResponseType = 'enquiry' | 'general' | 'treatment' | string;

export interface SendChatMessagePayload {
  message: string;
  session_id: string;
}

export interface ChatApiResponse {
  reply: string;
  response_type?: ChatResponseType;
  detected_treatment?: string | null;
  session_id: string;
  rule_id?: string | null;
}

export interface ChatMessage {
  id: string;
  from: 'user' | 'bot';
  text: string;
  responseType?: ChatResponseType;
  detectedTreatment?: string | null;
  ruleId?: string | null;
  sessionId?: string;
  timestamp?: number;
  isError?: boolean;
}
