import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { OpenConsultationButton } from '@/components/OpenConsultationButton';
import { VideoConsultationCard } from '@/components/VideoConsultationCard';
import { WhatsAppCard } from '@/components/WhatsAppCard';
import { 
  DOCTORS, 
  DOCTOR_TREATMENTS_MAP 
} from '@/data/doctorsData';
import { HOSPITALS } from '@/data/hospitalsData';
import { 
  Check, 
  ArrowRight, 
  Lock, 
  Clock, 
  CheckCircle2, 
  Stethoscope,
  User,
  GraduationCap,
  Building2,
  Award,
  Sparkles,
  Trophy,
  Users,
  ShieldCheck,
  BookOpen,
  FileText,
} from 'lucide-react';

interface DoctorPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return DOCTORS.map((d) => ({
    slug: d.slug,
  }));
}

export async function generateMetadata({ params }: DoctorPageProps) {
  const { slug } = await params;
  const doctor = DOCTORS.find((d) => d.slug === slug);
  if (!doctor) return {};

  const expText = doctor.years ? `with ${doctor.years} of experience` : 'specialist';
  const hospitalObj = HOSPITALS.find((h) => h.slug === doctor.hospital);
  const hospText = hospitalObj ? `at ${hospitalObj.name}, ${hospitalObj.city}` : 'in Mohali, Punjab';

  return {
    title: `${doctor.name} | Your Medicare Trip`,
    description: `${doctor.name}, ${doctor.specialty} ${expText} ${hospText}. Video consultations and surgery coordination for international patients.`,
  };
}

export default async function DoctorDetailPage({ params }: DoctorPageProps) {
  const { slug } = await params;
  const doctor = DOCTORS.find((d) => d.slug === slug);

  if (!doctor) {
    notFound();
  }

  const hospitalObj = HOSPITALS.find((h) => h.slug === doctor.hospital);
  const hospitalDisplayName = hospitalObj ? hospitalObj.name : (
    doctor.hospital === 'fortis-mohali' ? 'Fortis Hospital' :
    doctor.hospital === 'max-super-speciality-mohali' ? 'Max Super Speciality Hospital' :
    doctor.hospital === 'landmark-chandigarh' ? 'Landmark Hospital' :
    doctor.hospital === 'livasa-mohali' ? 'Livasa Hospital' : 'Partner Hospital'
  );
  const hospitalCity = hospitalObj?.city ? hospitalObj.city.split(',')[0] : 'Mohali';

  // Treatments mapped
  const treatments = doctor.treatments
    .map((tSlug) => DOCTOR_TREATMENTS_MAP[tSlug])
    .filter(Boolean);

  const heroFacts = [
    doctor.department ? `${doctor.department}` : (doctor.years ? `${doctor.years} experience` : `${doctor.specialty} Specialist`),
    doctor.years ? `${doctor.years} experience` : null,
    `${hospitalDisplayName}, ${hospitalCity}`,
  ].filter(Boolean) as string[];

  return (
    <main id="main" className="min-h-screen bg-[#fafcfb]">
      {/* ======================================================== */}
      {/* 1. COMPACT SPLIT HERO (Matches dist/doctors/*.html)       */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden text-white bg-[#0b383e] pt-[140px] sm:pt-[150px] pb-14 sm:pb-16 isolate">
        {/* Subtle radial ambient highlight */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            background:
              'radial-gradient(900px 420px at 85% 0%, rgba(139, 210, 234, 0.22), transparent 60%), linear-gradient(180deg, rgba(7, 43, 46, 0.70) 0%, rgba(11, 56, 62, 0.86) 70%, rgba(11, 56, 62, 0.96) 100%)',
          }}
        />

        <div className="max-w-[1160px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-14 items-center">
            
            {/* Left Content */}
            <div>
              {/* Breadcrumb Navigation */}
              <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs sm:text-[13px] text-white/65 mb-5 sm:mb-6">
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <span className="opacity-50">/</span>
                <Link href="/doctors" className="hover:text-white transition-colors">
                  Doctors
                </Link>
                <span className="opacity-50">/</span>
                <span className="text-white font-medium" aria-current="page">
                  {doctor.name}
                </span>
              </nav>

              {/* Eyebrow */}
              <div className="mb-3">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/12 text-[#d5f1fa] border border-white/22">
                  <Stethoscope className="w-3.5 h-3.5 text-[#8bd2ea]" />
                  <span>{doctor.specialty}</span>
                </span>
              </div>

              {/* Display Title */}
              <h1 className="text-[34px] sm:text-[46px] lg:text-[54px] font-extrabold tracking-[-0.03em] leading-[1.08] text-white text-balance">
                {doctor.name}
              </h1>

              {/* Lede */}
              <p className="mt-3 text-base sm:text-lg text-white/85 font-normal">
                {doctor.role}
              </p>

              {/* Hero Facts */}
              <ul className="flex flex-wrap gap-2.5 mt-6">
                {heroFacts.map((fact, idx) => (
                  <li
                    key={idx}
                    className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/18 text-xs sm:text-[13px] font-bold text-white shadow-xs"
                  >
                    {fact}
                  </li>
                ))}
                {doctor.registration && (
                  <li className="px-3.5 py-1.5 rounded-full bg-[#008329]/25 border border-[#008329]/40 text-xs sm:text-[13px] font-bold text-[#d4f7dc] shadow-xs flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#6ee7b7]" />
                    <span>Reg: {doctor.registration}</span>
                  </li>
                )}
              </ul>

              {/* Action CTA */}
              <div className="mt-8">
                <OpenConsultationButton
                  treatmentTitle={doctor.specialty}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm bg-[#8bd2ea] text-[#0b383e] hover:bg-[#a2ddf0] transition-colors shadow-md cursor-pointer"
                >
                  <span>Book a consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </OpenConsultationButton>
              </div>
            </div>

            {/* Right Split Photo */}
            <div className="flex justify-start lg:justify-end items-center">
              <div className="relative rounded-[24px] overflow-hidden shadow-2xl border border-white/20 bg-gray-100 max-w-[400px] max-h-[420px]">
                {doctor.img ? (
                  <Image
                    src={doctor.img}
                    alt={doctor.name}
                    width={400}
                    height={420}
                    priority
                    unoptimized
                    className="w-auto h-auto max-w-[400px] max-h-[420px] object-cover object-top"
                  />
                ) : (
                  <div className="w-[360px] max-w-full aspect-[4/4.2] flex flex-col items-center justify-center bg-gradient-to-b from-[#0e484f] to-[#072b2e] text-white select-none">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center shadow-lg">
                      <User className="w-16 h-16 sm:w-20 sm:h-20 text-white/70 stroke-[1.5]" />
                    </div>
                    {doctor.initials && (
                      <span className="mt-3 text-sm font-bold tracking-widest text-white/50 uppercase">
                        {doctor.initials}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. DETAIL SECTION: PROSE + ASIDE                          */}
      {/* ======================================================== */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#eef2f1]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-12 lg:gap-14 items-start">
            
            {/* Left Column: Clean Typography & Clinical Profile */}
            <div className="space-y-12">
              
              {/* 1. About Section (Conditional) */}
              {doctor.bio && doctor.bio.length > 0 && (
                <div className="border-b border-[#eef2f1] pb-10">
                  <h2 className="text-[24px] sm:text-[28px] font-bold tracking-tight text-[#0b383e] flex items-center gap-2.5 mb-5">
                    <User className="w-6 h-6 text-[#095458]" />
                    <span>About {doctor.name}</span>
                  </h2>
                  <div className="space-y-4 text-[16px] text-gray-700 leading-[1.8] font-normal">
                    {doctor.bio.map((paragraph, idx) => (
                      <p
                        key={idx}
                        className={
                          idx === 0
                            ? 'text-[17px] text-gray-800 font-medium leading-[1.8]'
                            : ''
                        }
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. Clinical Focus & Speciality Interests (Conditional) */}
              {doctor.specialityInterests && doctor.specialityInterests.length > 0 && (
                <div className="border-b border-[#eef2f1] pb-10">
                  <h2 className="text-[24px] sm:text-[28px] font-bold tracking-tight text-[#0b383e] flex items-center gap-2.5 mb-5">
                    <Sparkles className="w-6 h-6 text-[#095458]" />
                    <span>Clinical Focus &amp; Speciality Interests</span>
                  </h2>
                  <div className="flex flex-wrap gap-2.5">
                    {doctor.specialityInterests.map((interest, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[14px] sm:text-[15px] font-medium bg-[#eef7fa] text-[#0b383e] border border-[#d6ecf2]"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#095458]" />
                        <span>{interest}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Specialized Procedures & Surgical Treatments (Conditional) */}
              {doctor.procedures && doctor.procedures.length > 0 && (
                <div className="border-b border-[#eef2f1] pb-10">
                  <h2 className="text-[24px] sm:text-[28px] font-bold tracking-tight text-[#0b383e] flex items-center gap-2.5 mb-5">
                    <Stethoscope className="w-6 h-6 text-[#095458]" />
                    <span>Procedures &amp; Surgical Treatments</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {doctor.procedures.map((proc, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3.5 rounded-[16px] bg-[#f8faf9] border border-[#e8eeec]"
                      >
                        <span className="w-5 h-5 rounded-full bg-[#e1f5fe] text-[#0277bd] flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                        <span className="text-[14px] sm:text-[15px] text-gray-800 font-medium leading-snug">
                          {proc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Highlights & Clinical Expertise (Conditional) */}
              {doctor.highlights && doctor.highlights.length > 0 && (
                <div className="border-b border-[#eef2f1] pb-10">
                  <h2 className="text-[24px] sm:text-[28px] font-bold tracking-tight text-[#0b383e] flex items-center gap-2.5 mb-5">
                    <Award className="w-6 h-6 text-[#095458]" />
                    <span>Key Expertise &amp; Highlights</span>
                  </h2>
                  <div className="grid grid-cols-1 gap-3">
                    {doctor.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3.5 p-4 rounded-[18px] bg-[#f8faf9] border border-[#e8eeec] hover:border-[#cde0dc] transition-colors"
                      >
                        <span className="w-6 h-6 rounded-full bg-[#dcf1f8] text-[#0b383e] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </span>
                        <span className="text-[15px] sm:text-[16px] text-gray-800 leading-snug font-medium">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. Work Experience & Hospital Appointments (Conditional) */}
              {doctor.experience && doctor.experience.length > 0 && (
                <div className="border-b border-[#eef2f1] pb-10">
                  <h2 className="text-[24px] sm:text-[28px] font-bold tracking-tight text-[#0b383e] flex items-center gap-2.5 mb-5">
                    <Building2 className="w-6 h-6 text-[#095458]" />
                    <span>Hospital Appointments &amp; Experience</span>
                  </h2>
                  <div className="space-y-3">
                    {doctor.experience.map((exp, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3.5 p-4 rounded-[18px] bg-white border border-[#e6ecea] shadow-xs hover:border-[#d2e0dc] transition-colors"
                      >
                        <div className="w-8 h-8 rounded-xl bg-[#eef7fa] text-[#095458] flex items-center justify-center shrink-0 mt-0.5">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <p className="text-[15px] sm:text-[16px] text-[#0b383e] font-semibold leading-relaxed">
                          {exp}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 6. Education & Medical Training (Conditional) */}
              {doctor.quals && doctor.quals.length > 0 && (
                <div className="border-b border-[#eef2f1] pb-10">
                  <h2 className="text-[24px] sm:text-[28px] font-bold tracking-tight text-[#0b383e] flex items-center gap-2.5 mb-5">
                    <GraduationCap className="w-6 h-6 text-[#095458]" />
                    <span>Education &amp; Medical Training</span>
                  </h2>
                  <div className="space-y-3">
                    {doctor.quals.map((qual, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3.5 p-4 rounded-[18px] bg-[#f8faf9] border border-[#e8eeec]"
                      >
                        <div className="w-7 h-7 rounded-lg bg-[#e3f2fd] text-[#095458] flex items-center justify-center shrink-0 mt-0.5">
                          <GraduationCap className="w-4 h-4" />
                        </div>
                        <span className="text-[15px] sm:text-[16px] text-gray-800 font-medium leading-relaxed">
                          {qual}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 7. Research Papers & Publications (Conditional) */}
              {doctor.publications && doctor.publications.length > 0 && (
                <div className="border-b border-[#eef2f1] pb-10">
                  <h2 className="text-[24px] sm:text-[28px] font-bold tracking-tight text-[#0b383e] flex items-center gap-2.5 mb-5">
                    <BookOpen className="w-6 h-6 text-[#095458]" />
                    <span>Research Papers &amp; Publications</span>
                  </h2>
                  <div className="space-y-3">
                    {doctor.publications.map((paper, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3.5 p-4 rounded-[18px] bg-[#f8faf9] border border-[#e8eeec]"
                      >
                        <div className="w-7 h-7 rounded-lg bg-[#e0f2fe] text-[#0369a1] flex items-center justify-center shrink-0 mt-0.5">
                          <FileText className="w-4 h-4" />
                        </div>
                        <span className="text-[15px] sm:text-[16px] text-gray-800 font-medium leading-relaxed">
                          {paper}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 8. Awards & Accolades (Conditional) */}
              {doctor.awards && doctor.awards.length > 0 && (
                <div className="border-b border-[#eef2f1] pb-10">
                  <h2 className="text-[24px] sm:text-[28px] font-bold tracking-tight text-[#0b383e] flex items-center gap-2.5 mb-5">
                    <Trophy className="w-6 h-6 text-[#b45309]" />
                    <span>Awards &amp; Accolades</span>
                  </h2>
                  <div className="space-y-3">
                    {doctor.awards.map((award, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3.5 p-4 rounded-[18px] bg-[#fffbeb] border border-[#fef3c7]"
                      >
                        <div className="w-7 h-7 rounded-lg bg-[#fef3c7] text-[#b45309] flex items-center justify-center shrink-0 mt-0.5">
                          <Trophy className="w-4 h-4" />
                        </div>
                        <span className="text-[15px] sm:text-[16px] text-[#92400e] font-semibold leading-relaxed">
                          {award}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 9. Professional Memberships & Fellowships (Conditional) */}
              {doctor.memberships && doctor.memberships.length > 0 && (
                <div className="border-b border-[#eef2f1] pb-10">
                  <h2 className="text-[24px] sm:text-[28px] font-bold tracking-tight text-[#0b383e] flex items-center gap-2.5 mb-5">
                    <Users className="w-6 h-6 text-[#095458]" />
                    <span>Professional Memberships &amp; Fellowships</span>
                  </h2>
                  <div className="space-y-2.5">
                    {doctor.memberships.map((membership, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3.5 rounded-[16px] bg-[#f8faf9] border border-[#e8eeec]"
                      >
                        <div className="w-6 h-6 rounded-full bg-[#e0f2fe] text-[#0369a1] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                        <span className="text-[14px] sm:text-[15px] text-gray-800 font-medium leading-relaxed">
                          {membership}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 10. Specialized Treatments (Conditional: Rendered when doctor has associated treatments) */}
              {treatments.length > 0 && (
                <div className="border-b border-[#eef2f1] pb-10">
                  <h2 className="text-[24px] sm:text-[28px] font-bold tracking-tight text-[#0b383e] flex items-center gap-2.5 mb-5">
                    <Sparkles className="w-6 h-6 text-[#095458]" />
                    <span>Specialized Treatments</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {treatments.map((treatment) => (
                      <Link
                        key={treatment.slug}
                        href={`/treatments/${treatment.slug}`}
                        className="group bg-white border border-[#e6ecea] rounded-[22px] overflow-hidden shadow-[0_1px_3px_rgba(11,56,62,0.04)] hover:shadow-lg hover:-translate-y-1 hover:border-[#d3dcdb] transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                            <Image
                              src={treatment.img}
                              alt={treatment.name}
                              fill
                              sizes="(max-width: 768px) 100vw, 360px"
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-3.5 left-3.5">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-white/95 backdrop-blur-xs text-[#0b383e] shadow-xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#008329]" />
                                {treatment.tag}
                              </span>
                            </div>
                          </div>
                          <div className="p-5 flex flex-col gap-1.5">
                            <h3 className="text-[18px] font-bold text-[#0b383e] group-hover:text-[#095458] transition-colors leading-snug">
                              {treatment.name}
                            </h3>
                            <p className="text-[14px] text-gray-600 leading-relaxed font-normal">
                              {treatment.summary}
                            </p>
                          </div>
                        </div>
                        <div className="px-5 pb-5 pt-2 flex items-center justify-between text-xs font-bold text-[#0b383e] group-hover:text-[#095458]">
                          <span>{treatment.priceNote || 'See details'}</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* 11. How a consultation works */}
              <div>
                <h2 className="text-[24px] sm:text-[28px] font-bold tracking-tight text-[#0b383e] flex items-center gap-2.5 mb-5">
                  <Clock className="w-6 h-6 text-[#095458]" />
                  <span>How a Consultation Works</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      step: '01',
                      title: 'Send Reports & Imaging',
                      desc: 'Share your recent medical records, scans, or test results through your personal coordinator.'
                    },
                    {
                      step: '02',
                      title: 'Doctor Pre-Review',
                      desc: `${doctor.shortName} personally reviews your diagnostic tests to evaluate surgical feasibility.`
                    },
                    {
                      step: '03',
                      title: '30-Min Video Consultation',
                      desc: 'Discuss surgical techniques, expected recovery, hospital options, and ask all your questions.'
                    },
                    {
                      step: '04',
                      title: 'Written Care Plan & Quote',
                      desc: 'Receive a complete, itemized surgical plan, schedule, and transparent quote within 48 hours.'
                    }
                  ].map((item) => (
                    <div
                      key={item.step}
                      className="p-5 rounded-[20px] bg-white border border-[#e6ecea] shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        <span className="inline-block text-[11px] font-extrabold tracking-widest text-[#008329] bg-[#e8f8ee] px-2.5 py-0.5 rounded-full mb-3">
                          STEP {item.step}
                        </span>
                        <h4 className="text-[16px] font-bold text-[#0b383e] mb-1.5">
                          {item.title}
                        </h4>
                        <p className="text-[14px] text-gray-600 leading-relaxed font-normal">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Sticky Aside */}
            <aside className="space-y-5 lg:sticky lg:top-28">
              
              {/* At a glance Card */}
              <div className="bg-white border border-[#e6ecea] rounded-[24px] p-6 shadow-xs">
                <h3 className="text-[17px] font-extrabold text-[#0b383e] mb-3 flex items-center justify-between">
                  <span>At a glance</span>
                  <span className="w-2 h-2 rounded-full bg-[#008329]" />
                </h3>
                <dl className="divide-y divide-dashed divide-[#e6ecea] text-sm">
                  {doctor.department && (
                    <div className="flex justify-between py-2.5">
                      <dt className="text-gray-500 font-normal">Department</dt>
                      <dd className="font-bold text-[#0b383e] text-right">{doctor.department}</dd>
                    </div>
                  )}
                  <div className="flex justify-between py-2.5">
                    <dt className="text-gray-500 font-normal">Specialty</dt>
                    <dd className="font-bold text-[#0b383e] text-right">{doctor.specialty}</dd>
                  </div>
                  {doctor.years && (
                    <div className="flex justify-between py-2.5">
                      <dt className="text-gray-500 font-normal">Experience</dt>
                      <dd className="font-bold text-[#0b383e] text-right">{doctor.years} years</dd>
                    </div>
                  )}
                  {doctor.hospital && (
                    <div className="flex justify-between py-2.5">
                      <dt className="text-gray-500 font-normal">Hospital</dt>
                      <dd className="font-bold text-[#0b383e] text-right">
                        {hospitalDisplayName}
                      </dd>
                    </div>
                  )}
                  {doctor.registration && (
                    <div className="flex justify-between py-2.5">
                      <dt className="text-gray-500 font-normal">Registration</dt>
                      <dd className="font-bold text-[#008329] text-right flex items-center gap-1 justify-end">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{doctor.registration}</span>
                      </dd>
                    </div>
                  )}
                  <div className="flex justify-between py-2.5">
                    <dt className="text-gray-500 font-normal">Languages</dt>
                    <dd className="font-bold text-[#0b383e] text-right">English, Hindi, Punjabi</dd>
                  </div>
                </dl>
              </div>

              {/* Consultation Assistance Card */}
              <div className="bg-[#0b383e] text-white rounded-[24px] p-6 shadow-md">
                <h4 className="text-base font-bold mb-2">Need advice on choosing a specialist?</h4>
                <p className="text-xs text-white/80 leading-relaxed mb-4">
                  Speak with our clinical coordinator to review your case and find the ideal specialist for your procedure.
                </p>
                <OpenConsultationButton
                  treatmentTitle={doctor.specialty}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs bg-[#8bd2ea] text-[#0b383e] hover:bg-[#a2ddf0] transition-colors shadow-sm cursor-pointer"
                >
                  <span>Request Specialist Review</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </OpenConsultationButton>
              </div>

            </aside>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. CTA BAND (Matches dist/doctors/*.html)                 */}
      {/* ======================================================== */}
      <section className="py-20 sm:py-24 bg-[#eef6f5] text-center border-t border-[#e2ece9]">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6">
          <h2 className="text-[32px] sm:text-[40px] font-bold text-[#0b383e] tracking-tight leading-tight">
            Ready to plan{' '}
            <span className="px-2.5 py-0.5 rounded-xl inline-block bg-[rgba(139,210,234,0.35)] font-semibold">
              your treatment?
            </span>
          </h2>

          <p className="mt-3.5 text-base sm:text-lg text-gray-700 max-w-2xl mx-auto font-normal leading-relaxed">
            Book a free 30-minute video consultation. A coordinator and a doctor go through your case and tell you honestly whether travelling for treatment makes sense.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[640px] mx-auto mt-9 text-left">
            <VideoConsultationCard variant="dark" treatmentTitle={doctor.specialty} />
            <WhatsAppCard variant="bordered" />
          </div>

          {/* Trust Strip */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-9 pt-7 border-t border-[#d8e5e1] text-xs sm:text-[13px] text-gray-600 font-medium">
            <span className="inline-flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#008329]" />
              <span>Confidential consultation</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#008329]" />
              <span>No waiting lists</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#008329]" />
              <span>No GP referral needed</span>
            </span>
          </div>
        </div>
      </section>

    </main>
  );
}
