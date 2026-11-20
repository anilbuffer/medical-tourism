import { PageHero } from '@/components/PageHero';
import { VideoConsultationCard } from '@/components/VideoConsultationCard';
import { WhatsAppCard } from '@/components/WhatsAppCard';
import { 
  Languages, 
  UtensilsCrossed, 
  Sun, 
  Trees, 
  FileText, 
  Clock, 
  ArrowRight, 
  Lock, 
  CheckCircle2, 
  Navigation,
  Compass,
  Check
} from 'lucide-react';

export const metadata = {
  title: 'Chandigarh Tricity: Treatment & Recovery Destination | Your Medicare Trip',
  description:
    'Why the Chandigarh tricity (Chandigarh, Mohali, Panchkula) suits treatment and recovery: short airport transfers, calm streets, halal and vegetarian food, and the Kasauli hills nearby.',
  alternates: { canonical: 'https://www.yourmedicaretrip.com/destination' },
  openGraph: {
    title: 'Chandigarh Tricity: Treatment & Recovery Destination | Your Medicare Trip',
    description: 'Why the Chandigarh tricity suits treatment and recovery: short airport transfers, calm streets, halal and vegetarian food, and the Kasauli hills nearby.',
    url: 'https://www.yourmedicaretrip.com/destination',
    type: 'website',
    images: [{ url: '/images/hero/destination-hero.jpg', width: 1200, height: 630, alt: 'Chandigarh Tricity - Recovery Destination' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chandigarh Tricity: Treatment & Recovery Destination | Your Medicare Trip',
    description: 'Why the Chandigarh tricity suits treatment and recovery: short airport transfers, calm streets, halal and vegetarian food, and the Kasauli hills nearby.',
    images: ['/images/hero/destination-hero.jpg'],
  },
};

const COMFORT_CARDS = [
  {
    icon: Languages,
    title: 'Language',
    description:
      'English, Hindi and Punjabi are widely spoken. Arabic, Bengali and Russian interpreters on request.',
    chipBg: 'bg-[#dcf1f8] text-[#0b383e]',
  },
  {
    icon: UtensilsCrossed,
    title: 'Food',
    description:
      'Halal and vegetarian food is easy to find, and your meals during recovery are planned with you.',
    chipBg: 'bg-[#dcf1f8] text-[#0b383e]',
  },
  {
    icon: Sun,
    title: 'Climate',
    description:
      'Pleasant from October to March, hot in May and June, monsoon rain from July to September.',
    chipBg: 'bg-[#eef6f5] text-[#008329]',
  },
  {
    icon: Trees,
    title: 'Space to breathe',
    description:
      'A planned city with green sectors, wide roads and Sukhna Lake for gentle walks once you’re mobile.',
    chipBg: 'bg-[#eef6f5] text-[#095458]',
  },
];

const VISA_CARDS = [
  {
    title: 'e-Medical Visa',
    description:
      'Most nationalities can apply online for an Indian e-Medical Visa. We provide the hospital’s invitation letter you’ll need for the application.',
  },
  {
    title: 'e-Medical Attendant Visa',
    description:
      'Family members travelling with you apply for an attendant visa linked to your application. We help with both.',
  },
];

export default function DestinationPage() {
  return (
    <main className="min-h-screen bg-[#fafcfb] pb-24">
      {/* Signature Hero with Hills Background */}
      <PageHero
        bgImage="/images/hero/destination-hero.jpg"
        breadcrumbs={[{ label: 'Destination & stay' }]}
        title={
          <>
            Treatment in the calm of{' '}
            <span className="px-2.5 py-0.5 rounded-lg inline-block bg-[rgba(139,210,234,0.28)]">
              the Chandigarh tricity
            </span>
          </>
        }
        lede="Chandigarh, Mohali and Panchkula: three neighbouring cities with established hospitals, short drives, and a pace that suits recovery better than a crowded metro."
        facts={[
          'Airport to hospital: about 30 min',
          'English widely spoken',
          'Halal & vegetarian food',
        ]}
      />

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-20 sm:space-y-28">
        
        {/* ======================================================== */}
        {/* SECTION 1: SHORT DRIVES, SIMPLE DAYS & REDESIGNED MAP    */}
        {/* ======================================================== */}
        <section className="bg-white border border-[#e6ecea] rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-12 shadow-[0_2px_16px_rgba(11,56,62,0.04)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-5 flex flex-col items-start">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#eef6f5] text-[#0b383e] mb-4">
                <Navigation className="w-3.5 h-3.5 text-[#095458]" />
                Getting here
              </span>

              <h2
                className="text-[28px] sm:text-[38px] font-bold tracking-tight text-balance leading-[1.15] mb-4"
                style={{ color: 'var(--color-primary)' }}
              >
                Short drives,{' '}
                <span className="px-2.5 py-0.5 rounded-xl inline-block bg-[rgba(139,210,234,0.25)] font-semibold">
                  simple days
                </span>
              </h2>

              <p className="text-[16px] text-medium leading-relaxed font-normal mb-6">
                Chandigarh International Airport (IXC) has domestic connections across India and a limited number of international routes. Most of our patients fly into Delhi and take a short connecting flight; your coordinator plans the route and timings with you.
              </p>

              <ul className="space-y-3.5 w-full">
                <li className="flex items-start gap-3 text-[16px] text-medium leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-[#dcf1f8] text-[#0b383e] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                  <span>Airport to partner hospitals in Mohali: around 30 minutes</span>
                </li>
                <li className="flex items-start gap-3 text-[16px] text-medium leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-[#dcf1f8] text-[#0b383e] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                  <span>Recovery suites close to the hospitals</span>
                </li>
                <li className="flex items-start gap-3 text-[16px] text-medium leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-[#dcf1f8] text-[#0b383e] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                  <span>Kasauli hills about 2 hours away for a quieter final stretch</span>
                </li>
              </ul>
            </div>

            {/* Right Map Card Column (Modernized Transit Visualization) */}
            <div className="lg:col-span-7">
              <div className="rounded-[24px] border border-[#d6e3df] bg-[#f8faf9] p-4 sm:p-6 shadow-sm overflow-hidden">
                
                {/* Header bar of the map card */}
                <div className="flex items-center justify-between pb-3.5 mb-2 border-b border-[#e5eeeb]">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#095458]" />
                    <span className="text-xs font-bold text-[#0b383e] uppercase tracking-wider">
                      Tricity Transit Map
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-gray-500 bg-white px-2.5 py-0.5 rounded-full border border-gray-200">
                    Schematic · Not to scale
                  </span>
                </div>

                {/* Modern Vector Transit Schematic */}
                <div className="relative w-full aspect-[540/390]">
                  <svg
                    viewBox="0 0 540 390"
                    role="img"
                    aria-label="Schematic transit diagram showing Chandigarh, Mohali, Panchkula, Sukhna Lake, Airport IXC, and Kasauli hills"
                    className="w-full h-full select-none"
                  >
                    <defs>
                      {/* Hill gradient */}
                      <linearGradient id="kasauliGradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#98cfc3" />
                        <stop offset="50%" stopColor="#bfe2da" />
                        <stop offset="100%" stopColor="#eaf5f2" />
                      </linearGradient>

                      {/* Lake gradient */}
                      <linearGradient id="lakeGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#8bd2ea" />
                        <stop offset="100%" stopColor="#b4e4f5" />
                      </linearGradient>

                      {/* Soft shadow filter */}
                      <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
                        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0b383e" floodOpacity="0.12" />
                      </filter>
                      <filter id="hubShadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#0b383e" floodOpacity="0.22" />
                      </filter>
                    </defs>

                    {/* Subtle background grid pattern */}
                    <g opacity="0.4">
                      <line x1="30" y1="90" x2="510" y2="90" stroke="#dbe7e4" strokeWidth="1" strokeDasharray="3 6" />
                      <line x1="30" y1="180" x2="510" y2="180" stroke="#dbe7e4" strokeWidth="1" strokeDasharray="3 6" />
                      <line x1="30" y1="270" x2="510" y2="270" stroke="#dbe7e4" strokeWidth="1" strokeDasharray="3 6" />
                      <line x1="130" y1="30" x2="130" y2="360" stroke="#dbe7e4" strokeWidth="1" strokeDasharray="3 6" />
                      <line x1="270" y1="30" x2="270" y2="360" stroke="#dbe7e4" strokeWidth="1" strokeDasharray="3 6" />
                      <line x1="410" y1="30" x2="410" y2="360" stroke="#dbe7e4" strokeWidth="1" strokeDasharray="3 6" />
                    </g>

                    {/* Kasauli Foothills Topography backdrop */}
                    <path
                      d="M260 0 L540 0 L540 130 C490 100 450 115 390 85 C340 60 300 70 260 0 Z"
                      fill="url(#kasauliGradient)"
                      opacity="0.85"
                    />

                    {/* Scenic Highway to Kasauli (~2 hrs) */}
                    <path
                      d="M165 240 C 200 200, 260 160, 340 120 C 390 95, 430 75, 455 50"
                      stroke="#095458"
                      strokeWidth="2.5"
                      strokeDasharray="6 6"
                      fill="none"
                      opacity="0.65"
                    />

                    {/* Airport to Mohali Direct Transfer Route (~30 min) */}
                    <path
                      d="M270 330 C 220 330, 165 300, 165 245"
                      stroke="#0b383e"
                      strokeWidth="3.5"
                      fill="none"
                    />

                    {/* Intra-Tricity Boulevards */}
                    <path
                      d="M165 240 Q 215 190, 275 190"
                      stroke="#8bd2ea"
                      strokeWidth="3"
                      fill="none"
                    />
                    <path
                      d="M275 190 Q 340 190, 395 190"
                      stroke="#8bd2ea"
                      strokeWidth="3"
                      fill="none"
                    />
                    <path
                      d="M275 190 Q 310 145, 335 125"
                      stroke="#8bd2ea"
                      strokeWidth="2.5"
                      strokeDasharray="4 4"
                      fill="none"
                    />

                    {/* Travel Time Badges */}
                    {/* ~30 min Badge */}
                    <g transform="translate(175, 305)">
                      <rect x="-35" y="-12" width="70" height="24" rx="12" fill="#ffffff" stroke="#0b383e" strokeWidth="1.5" filter="url(#softShadow)" />
                      <text x="0" y="4" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0b383e">
                        ~30 min
                      </text>
                    </g>

                    {/* ~2 hrs Badge */}
                    <g transform="translate(430, 85)">
                      <rect x="-32" y="-12" width="64" height="24" rx="12" fill="#ffffff" stroke="#095458" strokeWidth="1.5" filter="url(#softShadow)" />
                      <text x="0" y="4" textAnchor="middle" fontSize="11" fontWeight="800" fill="#095458">
                        ~2 hrs
                      </text>
                    </g>

                    {/* 1. Kasauli Hills Node */}
                    <g transform="translate(450, 42)">
                      <circle cx="0" cy="0" r="18" fill="#ffffff" stroke="#095458" strokeWidth="2" filter="url(#softShadow)" />
                      <path d="M-6 4 L0 -6 L6 4 Z" fill="#095458" />
                      <text x="-25" y="-2" textAnchor="end" fontSize="13" fontWeight="800" fill="#0b383e">
                        Kasauli hills
                      </text>
                      <text x="-25" y="14" textAnchor="end" fontSize="10" fontWeight="600" fill="#586765">
                        Quieter recovery retreat
                      </text>
                    </g>

                    {/* 2. Sukhna Lake Node */}
                    <g transform="translate(345, 120)">
                      <ellipse cx="0" cy="0" rx="34" ry="16" fill="url(#lakeGradient)" stroke="#52b5d4" strokeWidth="1.5" filter="url(#softShadow)" />
                      <text x="0" y="3" textAnchor="middle" fontSize="10" fontWeight="800" fill="#0b383e">
                        Sukhna Lake
                      </text>
                      <text x="0" y="28" textAnchor="middle" fontSize="9" fontWeight="600" fill="#586765">
                        Gentle walks
                      </text>
                    </g>

                    {/* 3. Chandigarh Node (City Beautiful) */}
                    <g transform="translate(275, 190)">
                      <circle cx="0" cy="0" r="42" fill="#ffffff" stroke="#0b383e" strokeWidth="2" filter="url(#softShadow)" />
                      <circle cx="0" cy="0" r="36" fill="#f4faf8" />
                      {/* Architectural grid motif */}
                      <path d="M-15 -15 L15 15 M-15 15 L15 -15" stroke="#d0e2dd" strokeWidth="1.5" />
                      <text x="0" y="-3" textAnchor="middle" fontSize="13" fontWeight="800" fill="#0b383e">
                        Chandigarh
                      </text>
                      <text x="0" y="13" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#095458">
                        City Beautiful
                      </text>
                      <text x="0" y="25" textAnchor="middle" fontSize="8.5" fontWeight="500" fill="#707978">
                        Planned green sectors
                      </text>
                    </g>

                    {/* 4. Mohali Primary Clinical Hub Node */}
                    <g transform="translate(165, 245)">
                      {/* Pulse Ring */}
                      <circle cx="0" cy="0" r="48" fill="#8bd2ea" opacity="0.25" />
                      {/* Main Node */}
                      <circle cx="0" cy="0" r="40" fill="#0b383e" filter="url(#hubShadow)" />
                      <circle cx="0" cy="0" r="36" fill="#0b383e" stroke="#8bd2ea" strokeWidth="1.5" />
                      <text x="0" y="-8" textAnchor="middle" fontSize="13" fontWeight="900" fill="#ffffff">
                        Mohali
                      </text>
                      <text x="0" y="8" textAnchor="middle" fontSize="9" fontWeight="700" fill="#8bd2ea">
                        Partner Hospitals
                      </text>
                      <text x="0" y="20" textAnchor="middle" fontSize="8" fontWeight="600" fill="#d5f1fa">
                        &amp; Recovery Suites
                      </text>
                    </g>

                    {/* 5. Panchkula Node */}
                    <g transform="translate(395, 190)">
                      <circle cx="0" cy="0" r="32" fill="#ffffff" stroke="#0b383e" strokeWidth="2" filter="url(#softShadow)" />
                      <circle cx="0" cy="0" r="27" fill="#f8faf9" />
                      <text x="0" y="0" textAnchor="middle" fontSize="12" fontWeight="800" fill="#0b383e">
                        Panchkula
                      </text>
                      <text x="0" y="14" textAnchor="middle" fontSize="8.5" fontWeight="600" fill="#586765">
                        Tricity Partner
                      </text>
                    </g>

                    {/* 6. Airport (IXC) Terminal Node */}
                    <g transform="translate(270, 330)">
                      <rect x="-75" y="-18" width="150" height="36" rx="18" fill="#8bd2ea" stroke="#0b383e" strokeWidth="2" filter="url(#hubShadow)" />
                      <g transform="translate(-52, 0)">
                        <circle cx="0" cy="0" r="11" fill="#0b383e" />
                        <path d="M-4 1 L2 -5 L4 -5 L0 1 L4 5 L2 5 Z" fill="#8bd2ea" />
                      </g>
                      <text x="12" y="-1" textAnchor="middle" fontSize="12" fontWeight="900" fill="#0b383e">
                        Airport (IXC)
                      </text>
                      <text x="12" y="11" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#072b2f">
                        Arrival Meet &amp; Greet
                      </text>
                    </g>
                  </svg>
                </div>

                {/* Legend / Distance Key Strip */}
                <div className="mt-4 pt-3 border-t border-[#e5eeeb] grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-center text-xs text-gray-700">
                  <div className="p-2 rounded-xl bg-white border border-[#e6ecea] flex items-center justify-center gap-1.5 font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#0b383e] shrink-0" />
                    <span>Airport to Mohali: <strong>~30 min</strong></span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-[#e6ecea] flex items-center justify-center gap-1.5 font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#8bd2ea] shrink-0" />
                    <span>Inter-Tricity: <strong>10–15 min</strong></span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-[#e6ecea] flex items-center justify-center gap-1.5 font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#095458] shrink-0" />
                    <span>Kasauli Hills: <strong>~2 hrs</strong></span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 2: EVERYDAY COMFORT (4 CARDS)                    */}
        {/* ======================================================== */}
        <section>
          <div className="mb-10 sm:mb-12">
            <h2
              className="text-[30px] sm:text-[40px] font-bold tracking-tight leading-tight"
              style={{ color: 'var(--color-primary)' }}
            >
              Everyday{' '}
              <span className="px-2.5 py-0.5 rounded-xl inline-block bg-[rgba(139,210,234,0.25)] font-semibold">
                comfort
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMFORT_CARDS.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-[#e6ecea] rounded-[24px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(11,56,62,0.04)] hover:shadow-lg transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${card.chipBg}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3
                      className="text-[19px] font-bold tracking-tight mb-2.5"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      {card.title}
                    </h3>
                    <p className="text-[16px] leading-[26px] text-medium font-normal">
                      {card.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 3: VISAS & DOCUMENTS (2 CARDS)                   */}
        {/* ======================================================== */}
        <section>
          <div className="mb-8 sm:mb-10">
            <h2
              className="text-[30px] sm:text-[40px] font-bold tracking-tight leading-tight"
              style={{ color: 'var(--color-primary)' }}
            >
              Visas &amp;{' '}
              <span className="px-2.5 py-0.5 rounded-xl inline-block bg-[rgba(139,210,234,0.25)] font-semibold">
                documents
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6">
            {VISA_CARDS.map((visa, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#e6ecea] rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 shadow-[0_1px_3px_rgba(11,56,62,0.04)]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#eef6f5] text-[#095458] flex items-center justify-center font-bold">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3
                    className="text-[20px] font-bold tracking-tight"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {visa.title}
                  </h3>
                </div>
                <p className="text-[16px] leading-relaxed text-medium font-normal">
                  {visa.description}
                </p>
              </div>
            ))}
          </div>

          <p className="text-xs text-low text-center sm:text-left">
            Visa rules change. Always check the current requirements on the official Government of India e-Visa website before applying.
          </p>
        </section>

        {/* ======================================================== */}
        {/* SECTION 4: CTA BAND                                      */}
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
              Start planning{' '}
              <span
                className="px-3 py-0.5 rounded-xl inline-block text-[#0b383e]"
                style={{ backgroundColor: '#8bd2ea' }}
              >
                your trip
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

