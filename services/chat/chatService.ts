import axios from 'axios';
import { chatApiClient } from './chatClient';
import type { SendChatMessagePayload, ChatApiResponse } from './types';

/**
 * Constant fixed session id for the chatbot conversation.
 */
export const DEFAULT_CHAT_SESSION_ID = 'ymt_fixed_session_default';

/**
 * Sends a chat message to the AI chatbot API with robust error handling for timeouts and network issues.
 *
 * @param payload - Message payload containing message text and session_id
 * @returns AI chatbot response payload (or graceful enquiry fallback if service is unreachable/timed out)
 */
export async function sendChatMessage(
  payload: SendChatMessagePayload
): Promise<ChatApiResponse> {
  try {
    const response = await chatApiClient.post<ChatApiResponse>('/chat', payload);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (
        error.code === 'ECONNABORTED' ||
        error.message?.toLowerCase().includes('timeout')
      ) {
        return {
          reply:
            "I'm taking a bit longer than usual to respond right now. Please fill in our enquiry form with your question, or contact our team directly, and a dedicated coordinator will get back to you.",
          response_type: '',
          session_id: payload.session_id,
          detected_treatment: null,
          rule_id: null,
        };
      }

      if (!error.response) {
        return {
          reply:
            "I'm unable to connect to the assistant service at the moment. Please fill in our enquiry form with your question, or contact our team directly, and a dedicated coordinator will get back to you.",
          response_type: 'enquiry',
          session_id: payload.session_id,
          detected_treatment: null,
          rule_id: null,
        };
      }
    }

    return {
      reply:
        "I don't have that information right now, but our care team can help. Please fill in our enquiry form with your question, or contact our team directly, and a dedicated coordinator will get back to you.",
      response_type: 'enquiry',
      session_id: payload.session_id,
      detected_treatment: null,
      rule_id: null,
    };
  }
}
