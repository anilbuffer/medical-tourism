import Link from 'next/link';
import Image from 'next/image';
import { PageHero } from '@/components/PageHero';
import { DoctorsGrid } from './DoctorsGrid';
import { VideoConsultationCard } from '@/components/VideoConsultationCard';
import { WhatsAppCard } from '@/components/WhatsAppCard';
import { 
  ArrowRight, 
  Stethoscope, 
  Lock, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';

export const metadata = {
  title: 'Our Doctors & Care Team | Your Medicare Trip',
  description:
    'Meet the surgeons, patient care managers and recovery specialists who look after international patients with Your Medicare Trip.',
  alternates: {
    canonical: 'https://www.yourmedicaretrip.com/doctors',
  },
  openGraph: {
    title: 'Our Doctors & Care Team | Your Medicare Trip',
    description:
      'Meet the surgeons, patient care managers and recovery specialists who look after international patients with Your Medicare Trip.',
    url: 'https://www.yourmedicaretrip.com/doctors',
    images: [{ url: '/images/hero/doctors-hero.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Doctors & Care Team | Your Medicare Trip',
    description:
      'Meet the surgeons, patient care managers and recovery specialists who look after international patients with Your Medicare Trip.',
    images: ['/images/hero/doctors-hero.jpg'],
  },
};

export default function DoctorListingPage() {
  return (
    <main className="min-h-screen bg-[#fafcfb] pb-24">
      {/* Signature Hero */}
      <PageHero
        bgImage="/images/hero/doctors-hero.jpg"
        breadcrumbs={[{ label: 'Doctors' }]}
        title={
          <>
            Meet the people{' '}
            <span className="px-2.5 py-0.5 rounded-lg inline-block bg-[rgba(139,210,234,0.28)]">
              behind your care
            </span>
          </>
        }
        lede="Experienced surgeons, a dedicated patient care manager and recovery specialists, guiding every step from the first call to your follow-up at home."
      />

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-20 sm:space-y-28">
        
        {/* ======================================================== */}
        {/* SECTION 1: CLINICAL EXCELLENCE & CARE TEAM GRID          */}
        {/* ======================================================== */}
        <section>
          <DoctorsGrid />
        </section>

        {/* ======================================================== */}
        {/* SECTION 2: DOCTOR-LED SPLIT SECTION                      */}
        {/* ======================================================== */}
        <section className="bg-white border border-[#e6ecea] rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-12 shadow-[0_2px_16px_rgba(11,56,62,0.04)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Text & CTA */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 bg-[#eef6f5] text-[#0b383e] border border-[#d6e9e4]">
                <Stethoscope className="w-4 h-4 text-[#008329]" />
                <span>Doctor-led</span>
              </div>

              <h2
                className="text-[28px] sm:text-[38px] font-bold tracking-tight leading-tight mb-4"
                style={{ color: 'var(--color-primary)' }}
              >
                A senior doctor{' '}
                <span className="px-2.5 py-0.5 rounded-xl inline-block bg-[rgba(139,210,234,0.25)] font-semibold">
                  on every case
                </span>
              </h2>

              <p className="text-[16px] text-medium leading-[28px] font-normal mb-8 max-w-xl">
                Every case is reviewed by our founding clinical partner, Dr. Jaswant Singh, before a plan is sent. You&apos;ll speak to your treating specialist on video before you commit, and a senior doctor is on call throughout your stay.
              </p>

              <Link
                href="/doctors/dr-jaswant-singh"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-bold text-sm bg-[#0b383e] text-white hover:bg-[#0e484f] transition-all shadow-md group"
              >
                <span>Meet Dr. Jaswant Singh</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Right Column: Doctor Photo */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[380px] aspect-[4/4.4] rounded-[24px] overflow-hidden shadow-xl border border-gray-100 bg-gray-50">
                <Image
                  src="/images/doctors/dr-jaswant-singh.jpg"
                  alt="Dr. Jaswant Singh"
                  fill
                  sizes="(max-width: 1024px) 100vw, 380px"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <strong className="block text-lg font-bold">Dr. Jaswant Singh</strong>
                  <span className="text-xs text-white/80 font-medium">Founding Clinical Partner</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 3: CTA BAND                                      */}
        {/* ======================================================== */}
        <section
          className="rounded-[28px] sm:rounded-[36px] overflow-hidden p-8 sm:p-12 lg:p-14 text-white relative shadow-2xl"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          {/* Ambient decoration */}
          <div
            aria-hidden="true"
            className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none"
          />

          <div className="relative z-10 max-w-2xl">
            <h2 className="text-[28px] sm:text-[40px] font-bold tracking-tight leading-[1.15] text-balance">
              Ready to plan{' '}
              <span
                className="px-3 py-0.5 rounded-xl inline-block text-[#0b383e]"
                style={{ backgroundColor: '#8bd2ea' }}
              >
                your treatment?
              </span>
            </h2>

            <p className="mt-4 text-[16px] sm:text-lg text-white/80 leading-relaxed font-normal">
              Book a free 30-minute video consultation. A coordinator and a doctor go through your case and tell you honestly whether travelling for treatment makes sense.
            </p>

            {/* Action Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <VideoConsultationCard />
              <WhatsAppCard />
            </div>

            {/* Trust Strip */}
            <div className="flex flex-wrap items-center gap-6 mt-8 pt-8 border-t border-white/15 text-xs text-white/80 font-medium">
              <span className="inline-flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#8bd2ea]" />
                Confidential consultation
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#8bd2ea]" />
                No waiting lists
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8bd2ea]" />
                No GP referral needed
              </span>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}

