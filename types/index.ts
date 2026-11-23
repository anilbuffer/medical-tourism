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
  maxAmount?: number;
  range?: string;
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

/* ------------------------------------------------------------------ */
/* Patient Guides Types                                               */
/* ------------------------------------------------------------------ */

export type PatientGuideCategory = 'recovery' | 'medical' | 'checkup';

export interface PatientGuide {
  slug: string;
  title: string;
  excerpt: string;
  category: PatientGuideCategory | string;
  categoryLabel: string;
  readMins: number;
  image: string;
}

export interface GuideSection {
  title: string;
  content: string;
}

export interface GuideItem {
  slug: string;
  title: string;
  cat: string;
  mins: number;
  img: string;
  desc: string;
  sections: GuideSection[];
}

/* ------------------------------------------------------------------ */
/* Country & Market Types                                             */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/* Navigation Types                                                   */
/* ------------------------------------------------------------------ */

export type NavLink = {
  label: string;
  href: string;
  description?: string;
  target?: string;
  rel?: string;
  isConsultation?: boolean;
};

export type NavItem = NavLink & {
  children?: NavLink[];
  sectionId?: string;
};

export type NavGroup = {
  title: string;
  links: NavLink[];
};

/* ------------------------------------------------------------------ */
/* Doctor Types                                                       */
/* ------------------------------------------------------------------ */

export interface DoctorTreatment {
  slug: string;
  name: string;
  tag: string;
  summary: string;
  img: string;
  priceNote?: string;
}

export interface Doctor {
  slug: string;
  name: string;
  role: string;
  specialty: string;
  department?: string;
  experience?: string[];
  years: string | null;
  img: string | null;
  quals: string[];
  highlights: string[];
  treatments: string[];
  bio: string[];
  shortName: string;
  initials?: string;
  group?: string;
  groupLabel?: string;
  hospital?: string | null;
  type?: 'doctor';
  awards?: string[];
  memberships?: string[];
  specialityInterests?: string[];
  publications?: string[];
  procedures?: string[];
  registration?: string | null;
  gender?: string | null;
}

export interface DoctorMember {
  slug: string | null;
  name: string;
  role: string;
  specialty: string;
  department?: string;
  experience?: string[];
  group: string;
  groupLabel: string;
  years: string | null;
  img: string | null;
  initials: string;
  hospital: string | null;
  type: 'doctor' | 'care';
}

/* ------------------------------------------------------------------ */
/* Hospital Types                                                     */
/* ------------------------------------------------------------------ */

export interface HospitalSpecialist {
  slug: string;
  name: string;
  role: string;
  specialty: string;
  years: string;
  img: string;
}

export interface HospitalTreatment {
  slug: string;
  name: string;
  tag: string;
  summary: string;
  img: string;
}

export interface Hospital {
  slug: string;
  name: string;
  short: string;
  city: string;
  focus: string;
  img: string;
  badge?: string;
  specialties: string[];
  treatments: string[];
  about: string;
}

/* ------------------------------------------------------------------ */
/* Treatment Costs & Specialty Types                                  */
/* ------------------------------------------------------------------ */

export interface TreatmentCostData {
  slug: string;
  title: string;
  priceFrom: number;
  priceTo: number;
  priceRange: string;
  savingsPercent: number;
  locationPrices: LocationPrice[];
}

export interface TreatmentOption {
  title: string;
  description: string;
}

export interface TreatmentFact {
  label: string;
  value: string;
}

export interface TreatmentTimelineStep {
  period: string;
  description: string;
}

export interface TreatmentItem {
  slug: string;
  name: string;
  spec: string;
  specName: string;
  priceFrom: number | null;
  priceTo?: number | null;
  priceMode?: 'starting' | 'range' | 'review';
  saving?: string | null;
  addon?: boolean;
  img: string;
  summary: string;
  intro: string;
  options: TreatmentOption[];
  suited: string[];
  facts: TreatmentFact[];
  timeline: TreatmentTimelineStep[];
  included: string[];
  excluded: string[];
  doctors: string[];
  guide?: string | null;
  note?: string | null;
  hospitals: string[];
}

export interface CheckupPackage {
  name: string;
  description: string;
  tests: string[];
  duration: string;
  price: string;
}

export interface WellnessProgram {
  name: string;
  icon: string;
  description: string;
  features: string[];
}

export interface SpecialtyItem {
  id: string;
  name: string;
  icon: string;
  treatments: string[];
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
