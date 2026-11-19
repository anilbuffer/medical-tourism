import { PageHero } from '@/components/PageHero';
import { OpenConsultationButton } from '@/components/OpenConsultationButton';
import { VideoConsultationCard } from '@/components/VideoConsultationCard';
import { WhatsAppCard } from '@/components/WhatsAppCard';
import { 
  Sparkles, 
  Check, 
  X, 
  Stethoscope, 
  Laptop, 
  Scale, 
  HeartHandshake, 
  ArrowRight, 
  Lock, 
  Clock, 
  CheckCircle2
} from 'lucide-react';

export const metadata = {
  title: 'About Us | Your Medicare Trip',
  description:
    'Your Medicare Trip is a doctor-led medical travel service based in the Chandigarh tricity, coordinating treatment, recovery and follow-up for international patients.',
};

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-[#fafcfb] pb-24">
      <PageHero
        bgImage="/images/hero/about-hero.jpg"
        breadcrumbs={[{ label: 'About us' }]}
        title={
          <>
            About{' '}
            <span className="px-2.5 py-0.5 rounded-lg inline-block bg-[rgba(139,210,234,0.28)]">
              Your Medicare Trip
            </span>
          </>
        }
        lede="A doctor-led medical travel service based in the Chandigarh tricity, built for patients who want to know exactly what they're getting, and who'll look after them once they're home."
      />

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Section 1: Why We Started */}
          <section className="mb-20 sm:mb-28">
            <div className="bg-white border border-[#e6ecea] rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-[0_2px_16px_rgba(11,56,62,0.04)] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              <div className="lg:col-span-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#eef6f5] text-[#0b383e] mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-[#095458]" />
                  Why we started
                </span>
                <h2
                  className="text-[28px] sm:text-[36px] font-bold tracking-tight text-balance leading-tight"
                  style={{ color: 'var(--color-primary)' }}
                >
                  Good hospitals,{' '}
                  <span
                    className="px-2.5 py-0.5 rounded-xl inline-block font-semibold"
                    style={{
                      backgroundColor:
                        'var(--color-heading-highlight, rgba(139, 210, 234, 0.25))',
                      color: 'var(--color-primary)',
                    }}
                  >
                    no one joining the dots
                  </span>
                </h2>
              </div>

              <div className="lg:col-span-7 space-y-4 text-[16px] leading-[28px] text-medium font-normal">
                <p>
                  The Chandigarh tricity has excellent hospitals and experienced specialists. Yet international patients have mostly been routed to Delhi or the southern cities, with no organised service to bring them here.
                </p>
                <p>
                  We started Your Medicare Trip to change that, and to fix the part of medical travel that&apos;s usually an afterthought: what happens after discharge. Too many patients fly home with a bag of reports and no one to call.
                </p>
                <p>
                  So we plan the return journey as carefully as the operation: fit-to-fly checks, complete records, follow-up booked in advance, and a coordinator who stays in touch.
                </p>
              </div>

            </div>
          </section>

          {/* Section 2: What We Are, and Aren't */}
          <section className="mb-20 sm:mb-28">
            <div className="mb-8 sm:mb-10">
              <h2
                className="text-[30px] sm:text-[40px] font-bold tracking-[-1px] leading-tight"
                style={{ color: 'var(--color-primary)' }}
              >
                What we{' '}
                <span
                  className="px-2.5 py-0.5 rounded-xl inline-block font-semibold"
                  style={{
                    backgroundColor:
                      'var(--color-heading-highlight, rgba(139, 210, 234, 0.25))',
                    color: 'var(--color-primary)',
                  }}
                >
                  are, and aren’t
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              
              {/* "We are" Card */}
              <div className="bg-white border border-[#e6ecea] rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 shadow-[0_1px_3px_rgba(11,56,62,0.04)]">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#008329] flex items-center justify-center font-bold">
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <h3
                    className="text-[20px] font-bold tracking-tight"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    We are
                  </h3>
                </div>

                <ul className="space-y-3.5 text-[16px] text-medium leading-relaxed">
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#008329] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </span>
                    <span>A care facilitator: we plan, coordinate and support your treatment trip</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#008329] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </span>
                    <span>Your advocate with the hospital and doctors</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#008329] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </span>
                    <span>Responsible for your travel, stay, transfers and follow-up arrangements</span>
                  </li>
                </ul>
              </div>

              {/* "We aren't" Card */}
              <div className="bg-white border border-[#e6ecea] rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 shadow-[0_1px_3px_rgba(11,56,62,0.04)]">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                    <X className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <h3
                    className="text-[20px] font-bold tracking-tight text-gray-900"
                  >
                    We aren&apos;t
                  </h3>
                </div>

                <ul className="space-y-3.5 text-[16px] text-medium leading-relaxed">
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                      <X className="w-3.5 h-3.5 stroke-[2.5]" />
                    </span>
                    <span>A hospital or clinic. Treatment is provided by independent, registered doctors and hospitals</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                      <X className="w-3.5 h-3.5 stroke-[2.5]" />
                    </span>
                    <span>A substitute for your own doctor&apos;s advice</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                      <X className="w-3.5 h-3.5 stroke-[2.5]" />
                    </span>
                    <span>An insurer</span>
                  </li>
                </ul>
              </div>

            </div>
          </section>

          {/* Section 3: Clinical Leadership */}
          <section className="mb-20 sm:mb-28">
            <div className="bg-white border border-[#e6ecea] rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-[0_2px_16px_rgba(11,56,62,0.04)] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Doctor Image Column */}
              <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
                <div className="relative w-full max-w-[380px] rounded-2xl overflow-hidden shadow-lg border border-gray-100 aspect-[4/5] bg-gray-100">
                  <img
                    src="/img/dr-jaswant-singh.jpg"
                    alt="Dr. Jaswant Singh - Founding Clinical Partner"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                    <div className="font-bold text-lg leading-tight">Dr. Jaswant Singh</div>
                    <div className="text-xs text-white/80 font-medium mt-1">
                      MBBS, MS · Gold Medallist & State Awardee
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio & Details Column */}
              <div className="lg:col-span-7 flex flex-col items-start order-1 lg:order-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#eef6f5] text-[#0b383e] mb-4">
                  <Stethoscope className="w-3.5 h-3.5 text-[#095458]" />
                  Clinical Leadership
                </span>

                <h2
                  className="text-[28px] sm:text-[38px] font-bold tracking-tight text-balance leading-[1.15] mb-4"
                  style={{ color: 'var(--color-primary)' }}
                >
                  Dr. Jaswant Singh,{' '}
                  <span
                    className="px-2.5 py-0.5 rounded-xl inline-block font-semibold"
                    style={{
                      backgroundColor:
                        'var(--color-heading-highlight, rgba(139, 210, 234, 0.25))',
                      color: 'var(--color-primary)',
                    }}
                  >
                    founding clinical partner
                  </span>
                </h2>

                <p className="text-base sm:text-lg leading-relaxed text-medium font-normal mb-6">
                  MBBS, MS (General Surgery). A consultant general and laparoscopic surgeon with more than 25 years of practice, over 5,000 patients operated on, a gold medallist and a State Awardee of the Government of Punjab.
                </p>

                {/* Badges Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full mb-8">
                  <div className="p-3.5 rounded-xl bg-[#f8fafa] border border-[#e1e6e5]">
                    <div className="text-lg font-black text-high">25+ Years</div>
                    <div className="text-xs text-low mt-0.5 font-medium">Surgical Practice</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#f8fafa] border border-[#e1e6e5]">
                    <div className="text-lg font-black text-high">5,000+</div>
                    <div className="text-xs text-low mt-0.5 font-medium">Surgeries Completed</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#f8fafa] border border-[#e1e6e5] col-span-2 sm:col-span-1">
                    <div className="text-lg font-black text-high">Awardee</div>
                    <div className="text-xs text-low mt-0.5 font-medium">Govt. of Punjab</div>
                  </div>
                </div>

                <OpenConsultationButton
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white shadow-sm hover:opacity-95 transition-opacity cursor-pointer"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  <span>Consult with our doctors</span>
                  <ArrowRight className="w-4 h-4" />
                </OpenConsultationButton>
              </div>

            </div>
          </section>

          {/* Section 4: The Team Behind It */}
          <section className="mb-20 sm:mb-28">
            <div className="max-w-2xl mb-8 sm:mb-10">
              <h2
                className="text-[30px] sm:text-[40px] font-bold tracking-[-1px] leading-tight"
                style={{ color: 'var(--color-primary)' }}
              >
                The team{' '}
                <span
                  className="px-2.5 py-0.5 rounded-xl inline-block font-semibold"
                  style={{
                    backgroundColor:
                      'var(--color-heading-highlight, rgba(139, 210, 234, 0.25))',
                    color: 'var(--color-primary)',
                  }}
                >
                  behind it
                </span>
              </h2>
              <p className="mt-3 text-base sm:text-lg text-medium font-normal">
                Your Medicare Trip is run by partners with backgrounds in medicine, healthcare technology, law and community networks, working with a care team on the ground in Mohali.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Card 1: Clinical */}
              <div className="bg-white border border-[#e6ecea] rounded-[24px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(11,56,62,0.04)] hover:shadow-md transition-shadow">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{
                    backgroundColor:
                      'var(--color-heading-highlight, rgba(139, 210, 234, 0.25))',
                    color: 'var(--color-primary)',
                  }}
                >
                  <Stethoscope className="w-6 h-6" />
                </div>
                <h3
                  className="text-[19px] font-bold tracking-tight mb-2"
                  style={{ color: 'var(--color-primary)' }}
                >
                  Clinical
                </h3>
                <p className="text-[16px] leading-[26px] text-medium font-normal">
                  Case review, specialist selection and clinical oversight.
                </p>
              </div>

              {/* Card 2: Technology */}
              <div className="bg-white border border-[#e6ecea] rounded-[24px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(11,56,62,0.04)] hover:shadow-md transition-shadow">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{
                    backgroundColor:
                      'var(--color-heading-highlight, rgba(139, 210, 234, 0.25))',
                    color: 'var(--color-primary)',
                  }}
                >
                  <Laptop className="w-6 h-6" />
                </div>
                <h3
                  className="text-[19px] font-bold tracking-tight mb-2"
                  style={{ color: 'var(--color-primary)' }}
                >
                  Technology
                </h3>
                <p className="text-[16px] leading-[26px] text-medium font-normal">
                  The patient portal, records and secure communication.
                </p>
              </div>

              {/* Card 3: Legal & Compliance */}
              <div className="bg-white border border-[#e6ecea] rounded-[24px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(11,56,62,0.04)] hover:shadow-md transition-shadow">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{
                    backgroundColor:
                      'var(--color-heading-highlight, rgba(139, 210, 234, 0.25))',
                    color: 'var(--color-primary)',
                  }}
                >
                  <Scale className="w-6 h-6" />
                </div>
                <h3
                  className="text-[19px] font-bold tracking-tight mb-2"
                  style={{ color: 'var(--color-primary)' }}
                >
                  Legal &amp; compliance
                </h3>
                <p className="text-[16px] leading-[26px] text-medium font-normal">
                  Agreements, data protection and patient rights.
                </p>
              </div>

              {/* Card 4: Relationships */}
              <div className="bg-white border border-[#e6ecea] rounded-[24px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(11,56,62,0.04)] hover:shadow-md transition-shadow">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{
                    backgroundColor:
                      'var(--color-heading-highlight, rgba(139, 210, 234, 0.25))',
                    color: 'var(--color-primary)',
                  }}
                >
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h3
                  className="text-[19px] font-bold tracking-tight mb-2"
                  style={{ color: 'var(--color-primary)' }}
                >
                  Relationships
                </h3>
                <p className="text-[16px] leading-[26px] text-medium font-normal">
                  Hospital partnerships and community connections abroad.
                </p>
              </div>

            </div>

            <p className="text-xs text-low mt-8 text-center sm:text-left">
              Your Medicare Trip · Registered Office, Mohali, Punjab, India
            </p>
          </section>

          {/* Section 5: CTA Band */}
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

              <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed font-normal">
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

