import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PageHero } from '@/components/PageHero';
import { CtaBand } from '@/components/CtaBand';
import { WELLNESS_PROGRAMS } from '@/data/treatmentsData';
import { 
  ArrowRight, 
  Bed, 
  Activity, 
  Leaf, 
  Heart, 
  AlertCircle 
} from 'lucide-react';

export const metadata = {
  title: 'Wellness, Recovery & Rehabilitation | Your Medicare Trip',
  description:
    'Recovery stays, physiotherapy and rehabilitation, and hill retreats near Chandigarh for patients recovering after treatment in India.',
};

const WELLNESS_ICONS: Record<string, React.ReactNode> = {
  bed: <Bed className="w-5 h-5 text-[#008329]" />,
  activity: <Activity className="w-5 h-5 text-[#008329]" />,
  leaf: <Leaf className="w-5 h-5 text-[#008329]" />,
  heart: <Heart className="w-5 h-5 text-[#008329]" />,
};

export default function WellnessPage() {
  return (
    <main className="min-h-screen bg-[#fafcfb]">
      {/* 1. Page Hero */}
      <PageHero
        bgImage="/images/treatments/cat-wellness.jpg"
        breadcrumbs={[
          { label: 'Treatments', href: '/treatments' },
          { label: 'Wellness' },
        ]}
        title={
          <>
            Wellness &amp;{' '}
            <span className="px-2.5 py-0.5 rounded-lg inline-block bg-[rgba(139,210,234,0.28)]">
              recovery
            </span>
          </>
        }
        lede="Recovery is the part of a treatment trip that most people underplan. These programmes give your body the time, support and calm it needs before the journey home."
      />

      {/* 2. Programmes Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 pb-4 border-b border-[#e6ecea]">
            <h2 className="text-[28px] sm:text-[38px] font-bold tracking-tight text-[#0b383e] leading-tight">
              Programmes
            </h2>
            <p className="mt-3 text-[16px] text-gray-700 max-w-2xl font-normal leading-relaxed">
              Usually added to a treatment plan. Your doctor decides what&apos;s appropriate and when.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {WELLNESS_PROGRAMS.map((prog, idx) => (
              <article
                key={idx}
                className="p-7 sm:p-8 rounded-[24px] bg-white border border-[#e6ecea] shadow-[0_1px_3px_rgba(11,56,62,0.04)] hover:shadow-lg hover:-translate-y-1 hover:border-[#8bd2ea] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#eef6f5] flex items-center justify-center mb-5">
                    {WELLNESS_ICONS[prog.icon] || <Leaf className="w-5 h-5 text-[#008329]" />}
                  </div>

                  <h3 className="text-[22px] font-bold text-[#0b383e] tracking-tight mb-3">
                    {prog.name}
                  </h3>

                  <p className="text-[16px] text-gray-700 font-normal leading-[1.7] mb-6">
                    {prog.description}
                  </p>
                </div>

                <ul className="flex flex-wrap gap-2 pt-4 border-t border-[#f0f4f3]">
                  {prog.features.map((feat, fIdx) => (
                    <li
                      key={fIdx}
                      className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#eef6f5] text-[#0b383e] border border-[#d6e9e4]"
                    >
                      {feat}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          {/* Note on Claims Warning Callout */}
          <div className="mt-10 p-6 sm:p-7 rounded-[22px] bg-[#fffbf2] border border-[#f5e4ba] text-[#7a4c00]">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#b26b00] shrink-0 mt-0.5" />
              <p className="text-[15px] sm:text-[16px] leading-[1.7]">
                <strong className="font-bold text-[#7a4c00] mr-2">
                  A note on claims:
                </strong>
                Our wellness programmes support recovery and healthy habits.
                They are not a substitute for medical treatment, and we don&apos;t make claims about curing conditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Section Dim: A Calmer Place to Recover (Split) */}
      <section className="py-16 sm:py-24 bg-[#f4f7f6] border-t border-[#e2ece9]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Split Image */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start order-2 lg:order-1">
              <div className="relative w-full max-w-[460px] aspect-[4/3.8] rounded-[28px] overflow-hidden shadow-xl border border-gray-100 bg-gray-50">
                <Image
                  src="/images/split/split-calm.jpg"
                  alt="Kasauli hills recovery retreat"
                  fill
                  sizes="(max-width: 1024px) 100vw, 460px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Column: Text */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 bg-[#eef6f5] text-[#0b383e] border border-[#d6e9e4]">
                <Leaf className="w-4 h-4 text-[#008329]" />
                <span>Why the setting matters</span>
              </div>

              <h2 className="text-[28px] sm:text-[38px] font-bold tracking-tight text-[#0b383e] leading-tight mb-4">
                A calmer place{' '}
                <span className="px-2.5 py-0.5 rounded-xl inline-block bg-[rgba(139,210,234,0.3)] font-semibold">
                  to recover
                </span>
              </h2>

              <p className="text-[16px] text-gray-700 font-normal leading-[1.75] mb-8 max-w-xl">
                Chandigarh is a planned city with wide roads, green sectors and less noise than a typical metro. The Kasauli hills are about two hours away for patients well enough to spend their last days somewhere quieter.
              </p>

              <Link
                href="/destination"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-bold text-sm bg-[#0b383e] text-white hover:bg-[#0e484f] transition-all shadow-md group"
              >
                <span>About the destination</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bottom CTA Band */}
      <CtaBand />
    </main>
  );
}

