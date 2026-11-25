import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { sendChatMessage } from './chatService';
import type { SendChatMessagePayload, ChatApiResponse } from './types';

export const chatQueryKeys = {
  chat: ['chat'] as const,
  sendMessage: ['chat', 'send-message'] as const,
};

/**
 * React Query mutation hook for sending messages to the AI chatbot API.
 */
export function useSendChatMessage(
  options?: UseMutationOptions<ChatApiResponse, Error, SendChatMessagePayload>
) {
  return useMutation({
    mutationKey: chatQueryKeys.sendMessage,
    mutationFn: (payload: SendChatMessagePayload) => sendChatMessage(payload),
    ...options,
  });
}
