import type { Metadata } from 'next';
import { HeroSection } from '@/components/HeroSection';
import { FindYourTreatmentSection } from '@/components/FindYourTreatmentSection';
import { CareServicesSection } from '@/components/CareServicesSection';
import { TreatmentsSection } from '@/components/TreatmentsSection';
import { WhyTmtcSection } from '@/components/WhyTmtcSection';
import { HospitalsSection } from '@/components/HospitalsSection';
import { DoctorsSection } from '@/components/DoctorsSection';
import { StoriesSection } from '@/components/StoriesSection';
import { PatientGuidesSection } from '@/components/PatientGuidesSection';
import { FaqSection } from '@/components/FaqSection';
import { ContactSection } from '@/components/ContactSection';

export const metadata: Metadata = {
  title: 'Your Medicare Trip | World-Class Medical Care & Surgery in India',
  description:
    'Top specialist doctors and JCI-accredited hospital partners in India. Save up to 70% on orthopaedics, fertility, cardiac & cosmetic procedures with luxury aftercare recovery suites, 24/7 personal concierge, and comprehensive complication insurance.',
  keywords: [
    'medical tourism India',
    'medical care abroad',
    'surgery abroad savings',
    'affordable hip replacement abroad',
    'knee replacement surgery in India',
    'IVF fertility treatment abroad',
    'top doctors in India medical travel',
    'JCI accredited hospitals India',
    'healthcare concierge service',
    'medical travel aftercare recovery suites',
  ],
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-surface-base text-high flex flex-col font-sans transition-colors duration-300">
      {/* Hero Section */}
      <HeroSection />

      {/* Find Your Treatment Accordion Cards (just below hero section) */}
      <FindYourTreatmentSection />

      {/* Concierge & Care Details (SSR) */}
      <CareServicesSection />

      {/* Treatments & Price Comparisons */}
      <TreatmentsSection />

      {/* Leading Hospital Partners */}
      <HospitalsSection />

      {/* Doctors & Clinical Specialists Carousel */}
      <DoctorsSection />

      {/* Why Destination India & International Standards (SSR) */}
      <WhyTmtcSection />

      {/* Patient Video Journeys & Testimonials */}
      <StoriesSection />

      {/* Patient Guides & Travel Advice */}
      <PatientGuidesSection />

      {/* Expert Medical Questions & Answers (SSR) */}
      <FaqSection />

      {/* Consultation Booking & Contact CTA (SSR) */}
      <ContactSection />
    </main>
  );
}
