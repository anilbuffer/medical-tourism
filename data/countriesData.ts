/**
 * Unified Country & Market Master Data
 * Single source of truth for all country dropdowns, hero markets, and comparison tabs.
 */

import type { CountryOption, Market } from '@/types';
export type { CountryOption, Market };

export const COUNTRIES: CountryOption[] = [
  { code: 'SA', name: 'Saudi Arabia', label: 'Saudi Arabia', market: 'Saudi Arabia', flag: '🇸🇦', flagEmoji: '🇸🇦', city: 'Riyadh' },
  { code: 'BD', name: 'Bangladesh', label: 'Bangladesh', market: 'Bangladesh', flag: '🇧🇩', flagEmoji: '🇧🇩', city: 'Dhaka' },
  { code: 'GB', name: 'UK', label: 'UK', market: 'UK', flag: '🇬🇧', flagEmoji: '🇬🇧', city: 'London' },
  { code: 'AU', name: 'Australia', label: 'Australia', market: 'Australia', flag: '🇦🇺', flagEmoji: '🇦🇺', city: 'Sydney' },
  { code: 'IQ', name: 'Iraq', label: 'Iraq', market: 'Iraq', flag: '🇮🇶', flagEmoji: '🇮🇶', city: 'Baghdad' },
  { code: 'EG', name: 'Egypt', label: 'Egypt', market: 'Egypt', flag: '🇪🇬', flagEmoji: '🇪🇬', city: 'Cairo' },
  { code: 'OT', name: 'Other', label: 'Other', market: 'Other', flag: '🌐', flagEmoji: '🌐', city: 'your home country' },
];

/** All countries available for cost comparison (excludes 'OT' / 'OTHER') */
export const COMPARISON_COUNTRIES = COUNTRIES.filter((c) => c.code !== 'OT' && c.code !== 'OTHER');

export const DEFAULT_MARKETS = COUNTRIES;
