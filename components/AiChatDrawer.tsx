'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  MessageCircle,
  Calendar,
  RotateCcw,
  X,
  Send,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { useChat } from '@/components/providers/ChatProvider';
import { useConsultation } from '@/components/providers/AppProviders';

export const AiChatDrawer: React.FC = () => {
  const {
    isOpen,
    closeChat,
    request,
    messages,
    isLoading,
    sendMessage,
    resetChat,
  } = useChat();
  const { openConsultation } = useConsultation();
  const [inputValue, setInputValue] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastNonceRef = useRef<number | null>(null);

  // Handle incoming search query from Hero or booking trigger
  useEffect(() => {
    if (!isOpen) return;

    if (request && lastNonceRef.current !== request.nonce) {
      lastNonceRef.current = request.nonce;
      if (request.kind === 'book') {
        closeChat();
        openConsultation('Ask AI Assistant');
      } else if (request.question) {
        sendMessage(request.question);
      }
    }

    const timer = setTimeout(() => {
      inputRef.current?.focus({ preventScroll: true });
    }, 120);

    return () => clearTimeout(timer);
  }, [isOpen, request, sendMessage, openConsultation, closeChat]);

  // Auto-scroll to bottom of messages container
  useEffect(() => {
    const el = messagesContainerRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, isLoading]);

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
    resetChat();
    inputRef.current?.focus();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputValue.trim();
    if (!query || isLoading) return;
    setInputValue('');
    sendMessage(query);
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
            className={`fixed right-0 sm:right-6 bottom-0 sm:bottom-6 z-[1000] w-full flex flex-col bg-white sm:rounded-2xl shadow-[0_24px_60px_rgba(11,40,40,0.25),0_0_0_1px_rgba(11,40,40,0.08)] overflow-hidden font-sans border-0 sm:border border-slate-100 transition-all duration-300 ease-in-out ${
              isExpanded
                ? 'sm:w-[760px] sm:max-w-[calc(100vw-48px)] h-[100dvh] sm:h-[min(820px,calc(100dvh-48px))]'
                : 'sm:w-[410px] h-[100dvh] sm:h-[min(640px,calc(100dvh-48px))]'
            }`}
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
                onClick={() => setIsExpanded((prev) => !prev)}
                aria-label={isExpanded ? 'Minimize chat' : 'Maximize chat'}
                title={isExpanded ? 'Minimize' : 'Maximize'}
                className="w-8 h-8 rounded-lg text-[#c9dbe5] hover:text-white hover:bg-white/10 grid place-items-center transition-colors cursor-pointer flex-none"
              >
                {isExpanded ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
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

                const isEnquiry = message.responseType === 'enquiry';

                return (
                  <div key={message.id} className="self-start flex gap-2 max-w-[94%]">
                    <span className="w-7 h-7 rounded-lg flex-none grid place-items-center mt-0.5 shadow-xs bg-[#e6f4fa] text-[#2c9c8c]">
                      <Sparkles className="w-3.5 h-3.5" />
                    </span>

                    <div className="flex flex-col gap-2 min-w-0">
                      <div className="border border-[#e6ecea] bg-[#f8faf9] rounded-[4px_14px_14px_14px] p-3.5 text-sm leading-relaxed text-[#2b2b2b] shadow-xs">
                        {message.text}
                      </div>

                      {/* Enquiry button below response when response_type is enquiry */}
                      {isEnquiry && (
                        <button
                          type="button"
                          onClick={() => {
                            closeChat();
                            openConsultation(message.detectedTreatment || undefined);
                          }}
                          className="self-start inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0e2433] hover:bg-[#13324a] text-white text-xs font-semibold shadow-xs hover:shadow-sm transition-all cursor-pointer mt-0.5"
                        >
                          <Calendar className="w-3.5 h-3.5 text-[#5cc8e6]" />
                          <span>Open Consultation Form</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Bot typing / processing loader */}
              {isLoading && (
                <div className="self-start flex gap-2">
                  <span className="w-7 h-7 rounded-lg flex-none grid place-items-center mt-0.5 bg-[#e6f4fa] text-[#2c9c8c]">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  </span>
                  <div
                    className="bg-[#f8faf9] border border-[#e6ecea] rounded-[4px_14px_14px_14px] py-3 px-4 flex items-center gap-1.5 shadow-xs"
                    aria-label="AI is thinking"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#2c9c8c] animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 rounded-full bg-[#2c9c8c] animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 rounded-full bg-[#2c9c8c] animate-bounce" />
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
                  disabled={isLoading}
                  placeholder={isLoading ? 'AI is replying…' : 'Ask our AI anything…'}
                  enterKeyHint="send"
                  className="flex-1 bg-transparent border-0 outline-none text-sm text-[#1f2937] placeholder:text-gray-400 py-1 disabled:opacity-60"
                />
                <button
                  type="submit"
                  aria-label="Send"
                  disabled={!inputValue.trim() || isLoading}
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
