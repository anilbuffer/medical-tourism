'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useChat } from '@/components/providers/ChatProvider';

export interface HeroSearchBoxProps {
  placeholders?: string[];
  className?: string;
  onSearch?: (query: string) => void;
}

const DEFAULT_PLACEHOLDERS = [
  'Ask our AI anything…',
  'e.g. Knee replacement cost?',
  'e.g. Can my mother come too?',
  'e.g. Which hospitals?',
  "e.g. What's in a health check-up?",
];

export const HeroSearchBox: React.FC<HeroSearchBoxProps> = ({
  placeholders = DEFAULT_PLACEHOLDERS,
  className = '',
  onSearch,
}) => {
  const { openChat, setHeroBarVisible } = useChat();
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Rotate animated placeholder every 3200ms when input is empty and not focused
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced || isFocused || query.trim().length > 0 || placeholders.length < 2) {
      return;
    }

    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [isFocused, query, placeholders.length]);

  // Track visibility with IntersectionObserver: rootMargin "-80px 0px 0px 0px"
  // When hero bar is not visible, floating Ask AI button appears
  useEffect(() => {
    const el = formRef.current;
    if (!el || typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroBarVisible(entry.isIntersecting);
      },
      { rootMargin: '-80px 0px 0px 0px' }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      setHeroBarVisible(false);
    };
  }, [setHeroBarVisible]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (onSearch) {
      onSearch(trimmed);
    } else {
      openChat(trimmed || undefined);
    }
    setQuery('');
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <form
      ref={formRef}
      role="search"
      autoComplete="off"
      onSubmit={handleSubmit}
      onClick={handleContainerClick}
      className={`relative z-10 w-full max-w-[620px] mx-auto flex items-center gap-2.5 sm:gap-3 p-1.5 sm:p-2 bg-white/95 dark:bg-white backdrop-blur-md rounded-full shadow-[0_18px_50px_rgba(0,0,0,0.32),0_0_0_1px_rgba(255,255,255,0.45)] focus-within:ring-4 focus-within:ring-[#5cc8e6]/60 focus-within:shadow-[0_20px_55px_rgba(0,0,0,0.38)] transition-all duration-300 text-left cursor-text ${className}`}
    >
      {/* Left Sparkles / AI Badge */}
      <span
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex-none grid place-items-center bg-gradient-to-br from-[#5cc8e6] to-[#2c9c8c] text-white shadow-sm"
        aria-hidden="true"
      >
        <Sparkles className="w-5 h-5 text-white" />
      </span>

      {/* Input Field with Framer Motion Rotating Placeholder */}
      <div className="relative flex-1 min-w-0 flex items-center h-9 sm:h-10">
        <label htmlFor="ymt-hero-ai" className="sr-only">
          Ask our AI assistant
        </label>
        <input
          ref={inputRef}
          id="ymt-hero-ai"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          enterKeyHint="send"
          autoComplete="off"
          className="w-full bg-transparent border-0 outline-none text-[#1f2a33] text-sm sm:text-base font-medium placeholder:text-transparent relative z-10"
        />

        {/* Animated placeholder when empty */}
        {!query && (
          <div className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={placeholderIndex}
                initial={{ opacity: 0, y: 7 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -7 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="text-[#64748b] text-sm sm:text-base font-normal truncate block w-full"
              >
                {placeholders[placeholderIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Submit / Action Arrow Button */}
      <button
        type="submit"
        aria-label="Ask our AI assistant"
        className="flex-none w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-[#5cc8e6] to-[#2c9c8c] hover:brightness-105 text-white shadow-sm hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
      >
        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </button>
    </form>
  );
};

export default HeroSearchBox;
