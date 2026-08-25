"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCare } from "@/context/CareContext";
import { Sparkles, ChevronRight, Calendar, ArrowRight, X, BookOpen, Clock } from "lucide-react";

export interface BlogPost {
  id: string;
  title: string;
  titleAr: string;
  category: string;
  categoryAr: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  excerptAr: string;
  content: string[];
  contentAr: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "medical-visa-guide",
    title: "Medical visa for India: documents, timelines and invitation letters",
    titleAr: "التأشيرة الطبية للهند: المستندات المطلوبة، المواعيد وخطاب الدعوة",
    category: "Travel",
    categoryAr: "السفر والتأشيرات",
    date: "12 Aug 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800",
    excerpt: "Everything international patients need to know about getting an e-Medical visa (M-Visa), attendant visas (MED-X), and hospital invitation letters within 48 hours.",
    excerptAr: "دليل شامل للمرضى الدوليين للحصول على التأشيرة الطبية الإلكترونية وتأشيرات المرافقين وخطابات المستشفيات المعتمدة خلال 48 ساعة.",
    content: [
      "The Indian e-Medical Visa (M-Visa) is an expedited visa category designed specifically for foreign nationals traveling for specialized clinical care.",
      "Key Required Documents: Valid passport (minimum 6 months validity), formal medical invitation letter from an accredited Indian hospital, recent local diagnostic reports, and return flight booking.",
      "Attendants: Up to two medical attendants (spouses, parents, or adult children) can accompany the patient on MED-X visas linked directly to the patient's primary visa.",
      "How Vedara Coordinates: We obtain your stamped hospital invitation letter within 24 hours of clinical case acceptance and guide you through the online consular portal.",
    ],
    contentAr: [
      "تعتبر التأشيرة الطبية الإلكترونية الهندية فئة تأشيرات سريعة ومخصصة للمرضى القادمين لتلقي العلاج في كبرى المستشفيات.",
      "الوثائق المطلوبة: جواز سفر ساري (6 أشهر على الأقل)، خطاب دعوة طبي رسمي صادر من مستشفى معتمد في الهند، التقارير الطبية السابقة، وحجز الطيران.",
      "المرافقون: يُسمح لمرافقين اثنين بالحصول على تأشيرة مرافق طبي (MED-X) مرتبطة بتأشيرة المريض الأساسية.",
      "دور فريق فيدارا: نقوم بإصدار خطاب الدعوة المعتمد من المستشفى خلال 24 ساعة ومساعدتك في كافة خطوات التقديم الإلكتروني.",
    ],
  },
  {
    id: "dental-implants-cost-guide",
    title: "What full-arch dental implants really cost in India in 2026",
    titleAr: "التكلفة الحقيقية لزراعة الأسنان الكاملة (Full-Arch) في الهند 2026",
    category: "Dental",
    categoryAr: "طب الأسنان",
    date: "04 Aug 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800",
    excerpt: "A transparent breakdown of All-on-4 and All-on-6 dental implant packages, titanium vs. zirconia prosthetics, and immediate loading protocols.",
    excerptAr: "تحليل شفاف ومفصل لباقات زراعة الأسنان بالكامل (All-on-4 / All-on-6)، والفرق بين التيتانيوم والزركونيا، والتحميل الفوري.",
    content: [
      "Full-arch dental rehabilitation in India typically costs between $450 per tooth and $4,500–$6,500 for a full fixed jaw arch, compared to $25,000–$40,000 in the UK, US, or Australia.",
      "Leading Implant Systems: Partner dental clinics in Chandigarh utilize internationally certified Swiss (Straumann), Swedish (Nobel Biocare), and German implants with lifetime global warranties.",
      "Digital Guided Surgery: CBCT 3D digital planning ensures pinpoint implant placement and allows immediate temporary teeth within 48 to 72 hours.",
    ],
    contentAr: [
      "تبلغ تكلفة زراعة الأسنان الكاملة في الهند حوالي 450 دولاراً للسن الواحد أو 4500 إلى 6500 دولار للفك الكامل الثابت، مقارنة بأكثر من 25,000 دولار في بريطانيا والولايات المتحدة وأستراليا.",
      "أحدث أنظمة الزراعة: تستخدم مراكز طب الأسنان الشريكة في شانديغار أنظمة زراعة سويسرية (سترومان) وسويدية (نوبل بيوكير) مع ضمان دولي مدى الحياة.",
      "الجراحة الموجهة رقمياً: يضمن التخطيط ثلاثي الأبعاد بالأشعة المقطعية دقة متناهية وإمكانية تركيب أسنان مؤقتة فورية خلال 48 إلى 72 ساعة.",
    ],
  },
  {
    id: "hip-replacement-recovery",
    title: "Recovering from hip replacement abroad: a week-by-week guide",
    titleAr: "التعافي بعد جراحة استبدال مفصل الورك: دليل زمني أسبوعي",
    category: "Orthopedics",
    categoryAr: "جراحة العظام",
    date: "28 Jul 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    excerpt: "From robotic surgery Day 1 to hotel rehab and your fit-to-fly certificate: what international patients can expect during orthopedic recovery.",
    excerptAr: "من اليوم الأول بعد الجراحة الروبوتية إلى التأهيل الفندقي وشهادة اللياقة للطيران: كل ما تحتاج معرفته عن مرحلة التعافي.",
    content: [
      "Week 1 (Hospital & Early Ambulation): Minimally invasive and robotic hip replacement allows patients to stand and take assisted steps within 4–6 hours post-surgery.",
      "Week 2 (Recovery Apartment & Physiotherapy): Transition to a wheelchair-accessible hotel or recovery suite with daily personalized physical therapy sessions.",
      "Fit-to-Fly Certification: Around Day 10–14, your chief orthopedic surgeon conducts a comprehensive mobility review and issues official flight clearance with aisle seating and wheelchair assistance.",
    ],
    contentAr: [
      "الأسبوع الأول (المستشفى والمشي المبكر): تتيح جراحة استبدال مفصل الورك الروبوتية الدقيقة للمريض الوقوف والمشي بمساعدة خلال 4 إلى 6 ساعات بعد العملية.",
      "الأسبوع الثاني (الإقامة الفندقية والعلاج الطبيعي): الانتقال إلى جناح فندقي مجهز مع جلسات علاج طبيعي يومية بإشراف أخصائيين.",
      "شهادة اللياقة للسفر: في اليوم العاشر إلى الرابع عشر، يجري الجراح تقييماً شاملاً للمفصل ويصدر شهادة اللياقة للطيران مع ترتيبات المساعدة بالمطار.",
    ],
  },
  {
    id: "choosing-ivf-clinic",
    title: "Choosing an IVF clinic in India: success rates you should ask for",
    titleAr: "اختيار مركز أطفال الأنابيب في الهند: نسب النجاح والمعايير الأساسية",
    category: "Fertility",
    categoryAr: "علاج العقم وأطفال الأنابيب",
    date: "19 Jul 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800",
    excerpt: "Crucial benchmarks for advanced embryology labs, PGT-A genetic screening, cumulative live birth rates, and fertility concierge care.",
    excerptAr: "أهم المعايير لاختيار مختبرات علم الأجنة المتقدمة، الفحص الجيني PGT-A، ونسب الحمل والولادة التراكمية.",
    content: [
      "Advanced Embryology Facilities: Look for Cleanroom Class 10,000 embryology labs equipped with Time-Lapse (EmbryoScope) incubators and laser-assisted hatching.",
      "Genetic Screening (PGT-A / PGT-M): Pre-implantation genetic testing screens embryos for chromosomal abnormalities, dramatically boosting success rates in patients over 35.",
      "Transparent All-Inclusive Packages: Fixed-price cycles ($3,900–$4,500) covering ICSI, blastocyst culture, freezing, and medication with no hidden diagnostic charges.",
    ],
    contentAr: [
      "مختبرات الأجنة فائقة التطور: ابحث عن مختبرات غرف نظيفة Class 10,000 مزودة بحاضنات ذكية بتقنية التصوير الزمني ومساعدة الليزر على الفقس.",
      "الفحص الجيني قبل الزرع (PGT-A): يضمن فحص الكروموسومات للأجنة زيادة نسب النجاح وتقليل احتمالات الإجهاض خاصة للسيدات فوق سن 35.",
      "باقات شاملة وشفافة: باقات محددة التكلفة (3900 إلى 4500 دولار) تشمل الحقن المجهري، زراعة الكيسة الأريمية، التجميد، والأدوية الأساسية.",
    ],
  },
];

export const BlogSection = () => {
  const { t, language, openIntake } = useCare();
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  return (
    <section id="resources" className="py-20 sm:py-24 bg-[#F8FAFC] border-y border-slate-200/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#2ECDC5] mb-2">
            {t.blog.eyebrow}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3851A2] tracking-tight leading-tight">
            {t.blog.heading}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500 leading-relaxed max-w-2xl">
            {t.blog.subheading}
          </p>
        </div>

        {/* 4 Article Cards Grid (Matching User Screenshot) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={() => setActiveArticle(post)}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md shadow-slate-200/50 hover:shadow-2xl hover:border-[#2ECDC5]/60 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              {/* Top Article Image */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Body Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  {/* Category Pill Tag */}
                  <span className="inline-block px-3 py-1 rounded-full bg-[#3F4EB4]/10 text-[#3F4EB4] text-[11px] font-semibold border border-[#3F4EB4]/20">
                    {language === "ar" ? post.categoryAr : post.category}
                  </span>

                  {/* Article Title */}
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#3F4EB4] transition-colors leading-snug line-clamp-2">
                    {language === "ar" ? post.titleAr : post.title}
                  </h3>
                </div>

                {/* Date */}
                <div className="pt-2 text-xs text-slate-400 font-medium">
                  {post.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Reading Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8 max-h-[90vh] flex flex-col">
            {/* Modal Header Image */}
            <div className="relative h-56 w-full shrink-0">
              <Image
                src={activeArticle.image}
                alt={activeArticle.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent"></div>

              {/* Close Button */}
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Badges on Banner */}
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white text-xs">
                <span className="px-3 py-1 rounded-full bg-[#2ECDC5] text-slate-950 backdrop-blur-md font-bold">
                  {language === "ar" ? activeArticle.categoryAr : activeArticle.category}
                </span>
                <span className="flex items-center gap-1.5 text-slate-200 font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  {activeArticle.date}
                </span>
              </div>
            </div>

            {/* Modal Scrollable Article Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                {language === "ar" ? activeArticle.titleAr : activeArticle.title}
              </h2>

              <p className="text-sm font-semibold text-[#283593] bg-[#3F4EB4]/10 p-4 rounded-2xl border border-[#3F4EB4]/20">
                {language === "ar" ? activeArticle.excerptAr : activeArticle.excerpt}
              </p>

              <div className="space-y-3 pt-2 text-sm text-slate-700 leading-relaxed">
                {(language === "ar" ? activeArticle.contentAr : activeArticle.content).map(
                  (para, idx) => (
                    <p key={idx}>{para}</p>
                  )
                )}
              </div>

              {/* Action Button */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>{activeArticle.readTime}</span>
                </div>

                <button
                  onClick={() => {
                    const treatmentName = activeArticle.title;
                    setActiveArticle(null);
                    openIntake(`Inquiry from Guide: ${treatmentName}`);
                  }}
                  className="w-full sm:w-auto py-3 px-6 rounded-xl bg-[#3F4EB4] hover:bg-[#283593] text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <span>{language === "ar" ? "استشر منسق الرعاية" : "Speak to a Care Coordinator"}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
