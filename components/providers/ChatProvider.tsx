'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from 'react';
import type { ChatRequest, ChatContextType } from '@/types';
import {
  useSendChatMessage,
  DEFAULT_CHAT_SESSION_ID,
  type ChatMessage,
  type ChatApiResponse,
} from '@/services/chat';

export type { ChatRequest, ChatContextType, ChatMessage };

const INITIAL_BOT_MESSAGE: ChatMessage = {
  id: 'initial',
  from: 'bot',
  text: 'Hi, I’m the Your Medicare Trip AI assistant. How can I help you today?',
  timestamp: Date.now(),
};

const ChatContext = createContext<ChatContextType | null>(null);

export function useChat(): ChatContextType {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used inside <ChatProvider>');
  }
  return context;
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [heroBarVisible, setHeroBarVisible] = useState(true);
  const [request, setRequest] = useState<ChatRequest | null>(null);

  // Chat conversation state stored inside context
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_BOT_MESSAGE]);

  // Fixed session_id as specified: don't need to change it again and again
  const sessionId = DEFAULT_CHAT_SESSION_ID;

  // TanStack Query: useMutation for chat API integration
  const chatMutation = useSendChatMessage({
    onSuccess: (response: ChatApiResponse) => {
      const botMessageId = `bot_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const botMessage: ChatMessage = {
        id: botMessageId,
        from: 'bot',
        text: response.reply,
        responseType: response.response_type,
        detectedTreatment: response.detected_treatment,
        ruleId: response.rule_id,
        sessionId: response.session_id || sessionId,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, botMessage]);
    },
    onError: (err: unknown) => {
      console.warn('Chatbot API error:', err instanceof Error ? err.message : String(err));
      const fallbackErrorMessage =
        "I don't have that information right now, but our care team can help. Please fill in our enquiry form with your question, or contact our team directly, and a dedicated coordinator will get back to you.";

      const botErrorMessage: ChatMessage = {
        id: `bot_err_${Date.now()}`,
        from: 'bot',
        text: fallbackErrorMessage,
        responseType: 'enquiry',
        timestamp: Date.now(),
        isError: true,
      };

      setMessages((prev) => [...prev, botErrorMessage]);
    },
  });

  const isLoading = chatMutation.isPending;
  const error = chatMutation.error
    ? chatMutation.error instanceof Error
      ? chatMutation.error.message
      : 'Failed to reach AI service.'
    : null;

  const openChat = useCallback((question?: string) => {
    setIsOpen(true);
    setRequest({
      kind: 'ask',
      question: question?.trim() || undefined,
      nonce: Date.now() + Math.random(),
    });
  }, []);

  const openBooking = useCallback(() => {
    setIsOpen(true);
    setRequest({
      kind: 'book',
      nonce: Date.now() + Math.random(),
    });
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const resetChat = useCallback(() => {
    chatMutation.reset();
    setMessages([INITIAL_BOT_MESSAGE]);
  }, [chatMutation]);

  const sendMessage = useCallback(
    async (rawText: string) => {
      const text = rawText.trim();
      if (!text || chatMutation.isPending) return;

      const userMessageId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const userMessage: ChatMessage = {
        id: userMessageId,
        from: 'user',
        text,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMessage]);

      chatMutation.mutate({
        message: text,
        session_id: sessionId,
      });
    },
    [chatMutation, sessionId]
  );

  const value = useMemo(
    () => ({
      isOpen,
      openChat,
      openBooking,
      closeChat,
      heroBarVisible,
      setHeroBarVisible,
      request,
      messages,
      isLoading,
      error,
      sessionId,
      sendMessage,
      resetChat,
    }),
    [
      isOpen,
      openChat,
      openBooking,
      closeChat,
      heroBarVisible,
      setHeroBarVisible,
      request,
      messages,
      isLoading,
      error,
      sessionId,
      sendMessage,
      resetChat,
    ]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export default ChatProvider;
