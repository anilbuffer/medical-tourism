'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  MessageCircle,
  Calendar,
  RotateCcw,
  X,
  Send,
} from 'lucide-react';
import { useChat } from '@/components/providers/ChatProvider';
import { useConsultation } from '@/components/providers/AppProviders';

interface ChatMessage {
  id: string;
  from: 'user' | 'bot';
  text: string;
}

const INITIAL_BOT_MESSAGE: ChatMessage = {
  id: 'initial',
  from: 'bot',
  text: 'Hi, I’m the Your Medicare Trip AI assistant. How can I help you today?',
};

const AI_FALLBACK_REPLY = 'Ai will be integrated soon';

export const AiChatDrawer: React.FC = () => {
  const { isOpen, closeChat, request } = useChat();
  const { openConsultation } = useConsultation();
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_BOT_MESSAGE]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastNonceRef = useRef<number | null>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const appendMessage = useCallback((msg: ChatMessage) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  const handleSendMessage = useCallback(
    (rawText: string) => {
      const text = rawText.trim();
      if (!text) return;

      appendMessage({
        id: String(Date.now() + Math.random()),
        from: 'user',
        text,
      });

      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
        appendMessage({
          id: String(Date.now() + Math.random()),
          from: 'bot',
          text: AI_FALLBACK_REPLY,
        });
      }, 500);

      timeoutsRef.current.push(timer);
    },
    [appendMessage]
  );

  // Handle incoming search query from Hero or booking trigger
  useEffect(() => {
    if (!isOpen) return;

    if (request && lastNonceRef.current !== request.nonce) {
      lastNonceRef.current = request.nonce;
      if (request.kind === 'book') {
        openConsultation('Ask AI Assistant');
        closeChat();
      } else if (request.question) {
        handleSendMessage(request.question);
      }
    }

    const timer = setTimeout(() => {
      inputRef.current?.focus({ preventScroll: true });
    }, 120);

    return () => clearTimeout(timer);
  }, [isOpen, request, handleSendMessage, openConsultation, closeChat]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  // Auto-scroll to bottom of messages container
  useEffect(() => {
    const el = messagesContainerRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, isTyping]);

  // Escape key closes chat
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeChat();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeChat]);

  const handleReset = () => {
    timeoutsRef.current.forEach(clearTimeout);
    setIsTyping(false);
    setMessages([INITIAL_BOT_MESSAGE]);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputValue;
    setInputValue('');
    handleSendMessage(query);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop on mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeChat}
            className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-[2px] sm:hidden"
            aria-hidden="true"
          />

          {/* Chat Window Panel */}
          <motion.div
            role="dialog"
            aria-label="AI assistant"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            className="fixed right-0 sm:right-6 bottom-0 sm:bottom-6 z-[1000] w-full sm:w-[410px] h-[100dvh] sm:h-[min(640px,calc(100dvh-48px))] flex flex-col bg-white sm:rounded-2xl shadow-[0_24px_60px_rgba(11,40,40,0.25),0_0_0_1px_rgba(11,40,40,0.08)] overflow-hidden font-sans border-0 sm:border border-slate-100"
          >
            {/* Header */}
            <header className="flex items-center gap-3 p-3.5 sm:p-4 bg-[#0e2433] text-white flex-none">
              <span className="w-10 h-10 rounded-xl flex-none grid place-items-center bg-gradient-to-br from-[#5cc8e6] to-[#2c9c8c] text-white shadow-sm">
                <Sparkles className="w-5 h-5" />
              </span>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 font-bold text-[15px] leading-tight text-white">
                  <span>AI Assistant</span>
                  <span className="text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded bg-gradient-to-r from-[#5cc8e6] to-[#2c9c8c] text-white uppercase">
                    AI
                  </span>
                </div>
                <small className="block text-xs text-[#a9c3d3] leading-tight">
                  Instant answers · 24/7
                </small>
              </div>

              <button
                type="button"
                onClick={handleReset}
                aria-label="Start over"
                title="Start over"
                className="w-8 h-8 rounded-lg text-[#c9dbe5] hover:text-white hover:bg-white/10 grid place-items-center transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={closeChat}
                aria-label="Close chat"
                title="Close"
                className="w-8 h-8 rounded-lg text-[#c9dbe5] hover:text-white hover:bg-white/10 grid place-items-center transition-colors cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </header>

            {/* Top Action Strip */}
            <div className="grid grid-cols-2 gap-2 p-2.5 bg-[#f3f8fc] border-b border-[#e6ecea] flex-none">
              <a
                href="#"
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-[#25D366] text-white text-xs font-bold hover:brightness-105 transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Talk to a person
              </a>

              <button
                type="button"
                onClick={() => {
                  closeChat();
                  openConsultation('Ask AI Assistant');
                }}
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-white text-[#0e2433] border-[1.5px] border-[#0e2433] hover:bg-[#0e2433] hover:text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                Book a Consultation
              </button>
            </div>

            {/* Messages Body */}
            <div
              ref={messagesContainerRef}
              aria-live="polite"
              className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 overscroll-contain bg-white"
            >
              {messages.map((message) => {
                if (message.from === 'user') {
                  return (
                    <div
                      key={message.id}
                      className="self-end flex max-w-[85%] ml-auto"
                    >
                      <div className="bg-[#0e2433] text-white rounded-[14px_4px_14px_14px] p-3 text-sm leading-relaxed shadow-sm">
                        {message.text}
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={message.id} className="self-start flex gap-2 max-w-[94%]">
                    <span className="w-7 h-7 rounded-lg flex-none grid place-items-center mt-0.5 shadow-xs bg-[#e6f4fa] text-[#2c9c8c]">
                      <Sparkles className="w-3.5 h-3.5" />
                    </span>

                    <div className="border border-[#e6ecea] bg-[#f8faf9] rounded-[4px_14px_14px_14px] p-3.5 text-sm leading-relaxed text-[#2b2b2b] shadow-xs">
                      {message.text}
                    </div>
                  </div>
                );
              })}

              {/* Bot typing indicator */}
              {isTyping && (
                <div className="self-start flex gap-2">
                  <span className="w-7 h-7 rounded-lg flex-none grid place-items-center mt-0.5 bg-[#e6f4fa] text-[#2c9c8c]">
                    <Sparkles className="w-3.5 h-3.5" />
                  </span>
                  <div
                    className="bg-[#f8faf9] border border-[#e6ecea] rounded-[4px_14px_14px_14px] py-3 px-4 flex items-center gap-1.5 shadow-xs"
                    aria-label="AI is typing"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#99bbbb] animate-pulse" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#99bbbb] animate-pulse [animation-delay:200ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#99bbbb] animate-pulse [animation-delay:400ms]" />
                  </div>
                </div>
              )}
            </div>

            {/* Footer Input Area */}
            <footer className="p-2.5 sm:p-3 border-t border-[#e6ecea] bg-white flex-none">
              <form
                onSubmit={handleFormSubmit}
                autoComplete="off"
                className="flex items-center gap-2 border-[1.5px] border-[#e6ecea] focus-within:border-[#5cc8e6] rounded-xl p-1 pl-3.5 bg-white transition-colors"
              >
                <label htmlFor="ymt-chat-input" className="sr-only">
                  Your message
                </label>
                <input
                  id="ymt-chat-input"
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask our AI anything…"
                  enterKeyHint="send"
                  className="flex-1 bg-transparent border-0 outline-none text-sm text-[#1f2937] placeholder:text-gray-400 py-1"
                />
                <button
                  type="submit"
                  aria-label="Send"
                  disabled={!inputValue.trim()}
                  className="w-8 h-8 rounded-lg bg-[#0e2433] hover:bg-[#13324a] disabled:opacity-30 disabled:cursor-not-allowed text-white grid place-items-center transition-all cursor-pointer flex-none shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>

              <p className="text-[11px] text-gray-400 text-center mt-1.5 leading-tight">
                Answers are AI-generated from our website. General information only, not medical advice.
              </p>
            </footer>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AiChatDrawer;
