/**
 * Unified Country & Market Master Data
 * Single source of truth for all country dropdowns, hero markets, and comparison tabs.
 */

export interface CountryOption {
  code: string;
  name: string;
  label: string;
  market: string;
  flag: string;
  flagEmoji: string;
  city: string;
  flagSrc?: string;
}

export type Market = CountryOption;

export const COUNTRIES: CountryOption[] = [
  { code: 'AE', name: 'UAE', label: 'UAE', market: 'UAE', flag: '🇦🇪', flagEmoji: '🇦🇪', city: 'Dubai' },
  { code: 'SA', name: 'Saudi Arabia', label: 'Saudi Arabia', market: 'Saudi Arabia', flag: '🇸🇦', flagEmoji: '🇸🇦', city: 'Riyadh' },
  { code: 'TR', name: 'Turkey', label: 'Turkey', market: 'Turkey', flag: '🇹🇷', flagEmoji: '🇹🇷', city: 'Istanbul' },
  { code: 'TH', name: 'Thailand', label: 'Thailand', market: 'Thailand', flag: '🇹🇭', flagEmoji: '🇹🇭', city: 'Bangkok' },
  { code: 'DE', name: 'Germany', label: 'Germany', market: 'Germany', flag: '🇩🇪', flagEmoji: '🇩🇪', city: 'Berlin' },
  { code: 'OM', name: 'Oman', label: 'Oman', market: 'Oman', flag: '🇴🇲', flagEmoji: '🇴🇲', city: 'Muscat' },
  { code: 'EG', name: 'Egypt', label: 'Egypt', market: 'Egypt', flag: '🇪🇬', flagEmoji: '🇪🇬', city: 'Cairo' },
  { code: 'OT', name: 'Other', label: 'Other', market: 'Other', flag: '🌐', flagEmoji: '🌐', city: 'your home country' },
];

/** All countries available for cost comparison (excludes 'OT' / 'OTHER') */
export const COMPARISON_COUNTRIES = COUNTRIES.filter((c) => c.code !== 'OT' && c.code !== 'OTHER');

export const DEFAULT_MARKETS = COUNTRIES;
