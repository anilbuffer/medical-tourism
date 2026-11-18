'use client';

// Re-export SpecialtiesSection for full backward compatibility
export {
  SpecialtiesSection as FindYourTreatmentSection,
  SpecialtiesSection,
  SPECIALTIES_PILLARS as TREATMENT_PILLARS,
} from './SpecialtiesSection';

export type {
  SpecialtiesSectionProps as FindYourTreatmentSectionProps,
  SpecialtiesSectionProps,
  SpecialtyPillar as TreatmentPillar,
} from './SpecialtiesSection';

import { SpecialtiesSection } from './SpecialtiesSection';
export default SpecialtiesSection;
