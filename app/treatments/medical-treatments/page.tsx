import React, { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PageHero } from '@/components/PageHero';
import { CtaBand } from '@/components/CtaBand';
import { MedicalTreatmentsFilter } from './MedicalTreatmentsFilter';
import { SPECIALTIES } from '@/data/treatmentsData';
import { OpenConsultationButton } from '@/components/OpenConsultationButton';
import { 
  ArrowRight, 
  ShieldCheck, 
  Check, 
  MessageSquare,
  Bone,
  Eye,
  Smile,
  Sparkles,
  Users
} from 'lucide-react';

export const metadata = {
  title: 'Medical Treatments in India | Your Medicare Trip',
  description:
    'Orthopaedics, fertility, eye care, dental and cosmetic surgery at accredited hospitals in Mohali and Chandigarh, planned with your specialist before travel.',
};

const SPECIALTY_ICONS: Record<string, React.ReactNode> = {
  orthopaedics: <Bone className="w-5 h-5 text-[#0b383e]" />,
  fertility: <Users className="w-5 h-5 text-[#0b383e]" />,
  eye: <Eye className="w-5 h-5 text-[#0b383e]" />,
  dental: <Smile className="w-5 h-5 text-[#0b383e]" />,
  cosmetic: <Sparkles className="w-5 h-5 text-[#0b383e]" />,
};

export default function MedicalTreatmentsPage() {
  return (
    <main className="min-h-screen bg-[#fafcfb]">
      {/* 1. Page Hero */}
      <PageHero
        bgImage="/images/treatments/cat-medical.jpg"
        breadcrumbs={[
          { label: 'Treatments', href: '/treatments' },
          { label: 'Medical treatments' },
        ]}
        title={
          <>
            Medical{' '}
            <span className="px-2.5 py-0.5 rounded-lg inline-block bg-[rgba(139,210,234,0.28)]">
              treatments
            </span>
          </>
        }
        lede="Planned surgery with experienced specialists at partner hospitals in Mohali. Your surgeon reviews your reports and talks to you on video before anything is booked."
        actions={
          <div className="flex flex-wrap items-center gap-3 mt-6 sm:mt-8">
            <OpenConsultationButton
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm bg-[#8bd2ea] text-[#0b383e] hover:bg-[#a2ddf0] transition-colors shadow-sm cursor-pointer"
            >
              <span>Book a free consultation</span>
              <ArrowRight className="w-4 h-4" />
            </OpenConsultationButton>
            <Link
              href="/treatments"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/20"
            >
              <span>See starting prices</span>
            </Link>
          </div>
        }
      />

      {/* 2. Choose a Specialty & Grid */}
      <section className="py-16 sm:py-24">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={null}>
            <MedicalTreatmentsFilter />
          </Suspense>
        </div>
      </section>

      {/* 3. Section Dim: What We Cover */}
      <section className="py-16 sm:py-24 bg-[#f4f7f6] border-t border-[#e2ece9]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 pb-4 border-b border-[#e6ecea]">
            <h2 className="text-[28px] sm:text-[38px] font-bold tracking-tight text-[#0b383e]">
              What we{' '}
              <span className="px-2.5 py-0.5 rounded-xl inline-block bg-[rgba(139,210,234,0.3)] font-semibold">
                cover
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SPECIALTIES.map((spec) => (
              <div
                key={spec.id}
                className="p-7 rounded-[24px] bg-white border border-[#e6ecea] shadow-[0_1px_3px_rgba(11,56,62,0.04)]"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#eef6f5] flex items-center justify-center mb-5">
                  {SPECIALTY_ICONS[spec.id] || <Sparkles className="w-5 h-5 text-[#0b383e]" />}
                </div>
                <h3 className="text-[20px] font-bold text-[#0b383e] tracking-tight mb-2">
                  {spec.name}
                </h3>
                <p className="text-[15px] sm:text-[16px] text-gray-700 font-normal leading-[1.6]">
                  {spec.treatments.join(', ')}
                </p>
              </div>
            ))}

            {/* Not Listed Card */}
            <div className="p-7 rounded-[24px] bg-[#eef6f5] border border-[#d3e9e4] shadow-[0_1px_3px_rgba(11,56,62,0.04)] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-5 text-[#0b383e] shadow-xs">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h3 className="text-[20px] font-bold text-[#0b383e] tracking-tight mb-2">
                  Not listed?
                </h3>
                <p className="text-[15px] sm:text-[16px] text-gray-700 font-normal leading-[1.6]">
                  Tell us what you need. If it&apos;s something our partners do well, we&apos;ll put a plan together; if not, we&apos;ll say so.
                </p>
              </div>
              <div className="pt-6 mt-4">
                <Link
                  href="/enquiry"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#0b383e] hover:text-[#008329] transition-colors"
                >
                  <span>Send an enquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Planned Properly, Not Rushed Split Section */}
      <section className="py-16 sm:py-24 bg-white border-t border-[#e2ece9]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Text & List */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 bg-[#eef6f5] text-[#0b383e] border border-[#d6e9e4]">
                <ShieldCheck className="w-4 h-4 text-[#008329]" />
                <span>Before you travel</span>
              </div>

              <h2 className="text-[28px] sm:text-[38px] font-bold tracking-tight text-[#0b383e] leading-tight mb-6">
                Planned properly,{' '}
                <span className="px-2.5 py-0.5 rounded-xl inline-block bg-[rgba(139,210,234,0.3)] font-semibold">
                  not rushed
                </span>
              </h2>

              <ul className="space-y-3 mb-8">
                {[
                  'Your specialist reviews scans and reports before quoting',
                  'A video consultation so you can ask questions face to face',
                  'A written, itemised quote with what is and isn’t included',
                  'Agreed length of stay and when you’re likely to be fit to fly',
                  'A follow-up plan for when you’re home',
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="grid grid-cols-[22px_1fr] gap-3 text-[16px] text-gray-700 leading-[1.7]"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#dcf1f8] text-[#0b383e] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-bold text-sm bg-[#0b383e] text-white hover:bg-[#0e484f] transition-all shadow-md group"
              >
                <span>How it works</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Right Column: Split Image */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[460px] aspect-[4/3.8] rounded-[28px] overflow-hidden shadow-xl border border-gray-100 bg-gray-50">
                <Image
                  src="/images/split/split-planning.jpg"
                  alt="Doctor reviewing scan reports"
                  fill
                  sizes="(max-width: 1024px) 100vw, 460px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Bottom CTA Band */}
      <CtaBand />
    </main>
  );
}

