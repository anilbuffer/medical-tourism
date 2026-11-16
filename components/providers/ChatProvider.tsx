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

export type { ChatRequest, ChatContextType };

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

  const value = useMemo(
    () => ({
      isOpen,
      openChat,
      openBooking,
      closeChat,
      heroBarVisible,
      setHeroBarVisible,
      request,
    }),
    [isOpen, openChat, openBooking, closeChat, heroBarVisible, setHeroBarVisible, request]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export default ChatProvider;
