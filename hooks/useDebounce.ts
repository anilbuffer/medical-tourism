'use client';

import { useState, useEffect } from 'react';

/**
 * A custom hook that delays updating the debounced value until after `delay` ms
 * have elapsed since the last time the input value changed.
 *
 * @template T - Type of the value being debounced
 * @param value - The input value to debounce
 * @param delay - Delay in milliseconds before updating debounced value (default: 300ms)
 * @returns The debounced value
 *
 * @example
 * ```tsx
 * const [query, setQuery] = useState('');
 * const debouncedQuery = useDebounce(query, 300);
 * ```
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // If delay is zero or negative, update immediately
    if (delay <= 0) {
      setDebouncedValue(value);
      return;
    }

    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;

