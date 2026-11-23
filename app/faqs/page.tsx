import Link from 'next/link';
import { PageHero } from '@/components/PageHero';
import { OpenConsultationButton } from '@/components/OpenConsultationButton';
import { VideoConsultationCard } from '@/components/VideoConsultationCard';
import { WhatsAppCard } from '@/components/WhatsAppCard';
import { 
  ChevronDown, 
  ShieldCheck, 
  Receipt, 
  Plane, 
  HeartHandshake, 
  Lock, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  MessageSquare,
  Sparkles
} from 'lucide-react';

export const metadata = {
  title: 'FAQs: Treatment in India | Your Medicare Trip',
  description:
    'Answers to common questions about safety, costs, visas, recovery and follow-up when travelling to India for treatment with Your Medicare Trip.',
  alternates: {
    canonical: 'https://www.yourmedicaretrip.com/faqs',
  },
  openGraph: {
    title: 'FAQs: Medical Treatment in India | Your Medicare Trip',
    description:
      'Answers to common questions about safety, costs, visas, recovery and follow-up when travelling to India for treatment with Your Medicare Trip.',
    url: 'https://www.yourmedicaretrip.com/faqs',
    siteName: 'Your Medicare Trip',
    images: [{ url: '/images/hero/airport.jpg', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQs: Medical Treatment in India | Your Medicare Trip',
    description:
      'Answers to common questions about safety, costs, visas, recovery and follow-up when travelling to India for treatment with Your Medicare Trip.',
    images: ['/images/hero/airport.jpg'],
  },
};

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

interface FAQGroup {
  category: string;
  icon: React.ElementType;
  items: FAQItem[];
}

const FAQ_GROUPS: FAQGroup[] = [
  {
    category: 'Safety & quality',
    icon: ShieldCheck,
    items: [
      {
        question: 'Is the medical care provided through Your Medicare Trip safe?',
        answer:
          'We work with established, accredited hospitals in Mohali and with experienced specialists, and a senior doctor reviews every case before a plan is sent. Every operation carries some risk; your specialist will explain the risks of your treatment during the consultation, and you will have their answers in writing.',
      },
      {
        question: 'Who actually treats me?',
        answer:
          'Independent, registered doctors at our partner hospitals. Your Medicare Trip is a care facilitator: we plan and coordinate your trip, advocate for you, and look after everything around the treatment.',
      },
      {
        question: "Can I see the hospital's accreditation and the doctor's qualifications?",
        answer:
          "Yes. They are shared with your treatment plan, and you can ask for them at any stage.",
      },
    ],
  },
  {
    category: 'Planning & costs',
    icon: Receipt,
    items: [
      {
        question: 'How much will my treatment cost?',
        answer: (
          <span>
            Starting prices are on our{' '}
            <Link href="/treatments" className="text-[#095458] underline font-semibold hover:text-[#0b383e]">
              treatments page
            </Link>
            . Your exact cost depends on your medical reports, so after your consultation you will receive a written, itemised quote, usually within 48 hours.
          </span>
        ),
      },
      {
        question: 'How do payments work?',
        answer:
          'Payments are staged at agreed points rather than taken as a single lump sum. Each stage and amount is clearly shown in your quote before you book anything.',
      },
      {
        question: "What if the cost changes once I'm in India?",
        answer:
          'If your doctor recommends something different after examining you, you will see the revised figure and the clinical reason for it before anything changes. Nothing extra happens without your agreement.',
      },
      {
        question: 'Do I need a referral from my own doctor?',
        answer:
          'No. It helps to share any letters or diagnostic reports you already have, but no GP referral is required.',
      },
    ],
  },
  {
    category: 'Travel & visas',
    icon: Plane,
    items: [
      {
        question: 'Which visa do I need?',
        answer:
          "Most patients travel on an Indian e-Medical Visa, and family members on an e-Medical Attendant Visa. We provide the hospital's official visa invitation letter and guide you through the application. Always check current rules on the official Government of India e-Visa portal.",
      },
      {
        question: 'Can someone travel with me?',
        answer:
          'Yes, and for surgery we strongly recommend it. We arrange accommodation, meals, and transport for your travelling companion as well.',
      },
      {
        question: 'How do I get to Chandigarh?',
        answer:
          'Most patients fly into Delhi and take a short 45-minute connecting flight to Chandigarh (IXC). Your coordinator plans the best route with you, and our chauffeur meets you at the airport arrivals.',
      },
    ],
  },
  {
    category: 'During your stay',
    icon: HeartHandshake,
    items: [
      {
        question: 'What happens when I arrive in India?',
        answer:
          'Your dedicated coordinator meets you at the airport and drives you to your accommodation. From then on they manage transfers, appointments, meals, and housekeeping, so you can focus entirely on your treatment and rest.',
      },
      {
        question: 'How is recovery managed after surgery?',
        answer:
          'After discharge you move to a private recovery suite with nursing on hand, daily physiotherapy, meals planned with your doctor, and a physician on call 24/7.',
      },
      {
        question: 'Will there be language barriers?',
        answer:
          'English, Hindi, and Punjabi are widely spoken across all partner hospital teams. Professional Arabic, Bengali, and Russian interpreters are available upon request.',
      },
      {
        question: 'Is halal or vegetarian food available?',
        answer:
          "Yes. Your daily meals are prepared around your doctor's clinical instructions and your personal dietary preferences, including halal, vegetarian, and diabetic options.",
      },
    ],
  },
  {
    category: 'After you return home',
    icon: Sparkles,
    items: [
      {
        question: 'Will I be on my own after I return home?',
        answer:
          'No. Before you depart India, your coordinator books follow-up video calls with your specialist. You keep your coordinator as your direct contact for any concerns, and we share your complete medical records and discharge summary with your local GP or consultant.',
      },
      {
        question: 'What if I have a problem after I get home?',
        answer: (
          <span>
            Message your coordinator on WhatsApp and they will involve your specialist the same day. In a medical emergency, go to your nearest emergency department immediately and take your discharge summary with you, then notify us.{' '}
            <Link href="/aftercare" className="text-[#095458] underline font-semibold hover:text-[#0b383e]">
              Learn more about aftercare
            </Link>
            .
          </span>
        ),
      },
    ],
  },
  {
    category: 'Your data & privacy',
    icon: Lock,
    items: [
      {
        question: 'How do you protect my medical information?',
        answer: (
          <span>
            We collect only what is strictly necessary to plan your care, share it solely with the registered doctors and hospitals directly involved in your treatment, and protect it under India&apos;s Digital Personal Data Protection Act, 2023. See our{' '}
            <Link href="/privacy-policy" className="text-[#095458] underline font-semibold hover:text-[#0b383e]">
              Privacy Policy
            </Link>
            .
          </span>
        ),
      },
    ],
  },
];

export default function FaqsPage() {
  // Generate JSON-LD Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_GROUPS.flatMap((group) =>
      group.items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: typeof item.answer === 'string' ? item.answer : item.question,
        },
      }))
    ),
  };

  return (
    <>
      {/* Structured Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-[#fafcfb] pb-24">
        <PageHero
          compact
          breadcrumbs={[{ label: 'FAQs' }]}
          title={
            <>
              Frequently asked{' '}
              <span className="px-2.5 py-0.5 rounded-lg inline-block bg-[rgba(139,210,234,0.28)]">
                questions
              </span>
            </>
          }
          lede="Straight answers to what patients ask us most. If yours isn't here, ask our medical care team directly on WhatsApp."
        />

        <div className="relative z-10 max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Category Quick Pills */}
          <div className="mb-12 flex flex-wrap gap-2">
            {FAQ_GROUPS.map((group) => (
              <a
                key={group.category}
                href={`#${group.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white border border-[#e6ecea] text-[#0b383e] hover:border-[#8bd2ea] hover:bg-[#f0f6f5] transition-all shadow-xs"
              >
                {group.category}
              </a>
            ))}
          </div>

          {/* FAQ Accordion Groups */}
          <div className="space-y-12 sm:space-y-16">
            {FAQ_GROUPS.map((group) => {
              const Icon = group.icon;
              const groupId = group.category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
              return (
                <section key={group.category} id={groupId} className="scroll-mt-28">
                  <div className="flex items-center gap-3 mb-6 pb-3 border-b border-[#e6ecea]">
                    <span
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: 'var(--color-lime-tint, #dcf1f8)',
                        color: 'var(--color-primary, #0b383e)',
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </span>
                    <h2
                      className="text-xl sm:text-2xl font-bold tracking-tight"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      {group.category}
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {group.items.map((item, idx) => (
                      <details
                        key={idx}
                        className="group bg-white border border-[#e6ecea] rounded-2xl p-5 sm:p-6 shadow-xs hover:border-[#8bd2ea] transition-all cursor-pointer open:shadow-md"
                      >
                        <summary className="flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-high list-none select-none">
                          <span style={{ color: 'var(--color-primary)' }}>
                            {item.question}
                          </span>
                          <span className="w-8 h-8 rounded-full bg-[#f8fafa] flex items-center justify-center shrink-0 transition-transform group-open:rotate-180">
                            <ChevronDown className="w-4 h-4 text-medium" />
                          </span>
                        </summary>
                        <div className="mt-4 pt-4 border-t border-[#f1f4f4] text-[16px] text-medium leading-relaxed font-normal">
                          <p>{item.answer}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          {/* Still Have a Question Callout */}
          <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-white border border-[#e6ecea] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold text-[#0b383e]">
                Still have a question?
              </h3>
              <p className="text-[16px] text-medium leading-relaxed mt-1">
                Message our care team on WhatsApp or send us an enquiry directly.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm text-white shadow-sm hover:opacity-95 transition-opacity"
                style={{ backgroundColor: '#008329' }}
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp Us
              </a>
              <OpenConsultationButton
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm text-[#0b383e] bg-[#f0f6f5] hover:bg-[#e4eff1] transition-colors cursor-pointer"
              >
                <span>Contact Form</span>
                <ArrowRight className="w-4 h-4" />
              </OpenConsultationButton>
            </div>
          </div>

          {/* CTA Band */}
          <section
            className="mt-16 sm:mt-24 rounded-3xl p-8 sm:p-12 lg:p-14 text-white relative overflow-hidden shadow-xl"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            <div
              aria-hidden="true"
              className="absolute top-0 right-0 w-96 h-96 bg-[#8bd2ea]/10 rounded-full blur-3xl pointer-events-none"
            />

            <div className="relative z-10 max-w-2xl">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                Ready to plan{' '}
                <span className="text-[#8bd2ea]">your treatment?</span>
              </h2>
              <p className="mt-3 text-base text-white/80 leading-relaxed font-normal">
                Book a free 30-minute video consultation. A coordinator and a doctor go through your case and tell you honestly whether travelling for treatment makes sense.
              </p>

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
    </>
  );
}

