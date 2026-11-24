export const queryKeys = {
  referralSources: ['public', 'referral-sources'] as const,
} as const;

export type QueryKeys = typeof queryKeys;
