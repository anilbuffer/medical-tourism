export type TreatmentCategory =
  | 'all'
  | 'fertility'
  | 'oncologysurgery'
  | 'orthopaedics'
  | 'cardiacsurgery'
  | 'neurosurgery'
  | 'organ-transplant'
  | 'dental'
  | 'wellness';

export interface LocationPrice {
  amount: number;
  isPrimary: boolean;
  market: string;
  flagCode: string;
  currencyCode: string;
}

export interface TreatmentCard {
  id: string;
  title: string;
  category: TreatmentCategory;
  savingsPercent: number;
  locationPrices: LocationPrice[];
  typicalStayDays: number;
  successRate: string;
  overview: string;
}

export interface HospitalCard {
  id: string;
  name: string;
  city: string;
  country: string;
  description: string;
  badge: string;
  image: string;
  specialties: string[];
  accreditations: string[];
  stats: {
    beds: string;
    doctors: string;
    successRate: string;
  };
}

export interface PatientStory {
  id: string;
  category: string;
  name: string;
  treatment: string;
  quote: string;
  originCountry: string;
  originFlagCode: string;
  destinationCountry: string;
  destinationFlagCode: string;
  poster: string;
  youtubeId?: string;
  savings: string;
}

export interface ServicePillar {
  id: string;
  label: string;
  description: string;
  image: string;
  iconName: string;
  features: string[];
}

export interface ThemePreset {
  id: string;
  name: string;
  description: string;
  primary: string;
  primaryHover: string;
  primaryPressed: string;
  secondary: string;
  secondaryHover: string;
  mint: string;
  limeTint: string;
  surfaceBase: string;
  surfaceDim: string;
  surfaceElevated: string;
  surfaceOutline: string;
  high: string;
  medium: string;
  low: string;
}

/* ------------------------------------------------------------------ */
/* Patient Guides Types                                               */
/* ------------------------------------------------------------------ */

export type PatientGuideCategory = 'recovery' | 'medical' | 'checkup';

export interface PatientGuide {
  slug: string;
  title: string;
  excerpt: string;
  category: PatientGuideCategory;
  categoryLabel: string;
  readMins: number;
  image: string;
}

/* ------------------------------------------------------------------ */
/* AI Assistant Types                                                 */
/* ------------------------------------------------------------------ */

export interface ChatRequest {
  kind: 'ask' | 'book';
  question?: string;
  nonce: number;
}

export interface ChatContextType {
  isOpen: boolean;
  openChat: (question?: string) => void;
  openBooking: () => void;
  closeChat: () => void;
  heroBarVisible: boolean;
  setHeroBarVisible: (visible: boolean) => void;
  request: ChatRequest | null;
}
