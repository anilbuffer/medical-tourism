export type Language = "en" | "ar";
export type Currency = "USD" | "AED" | "GBP" | "EUR" | "INR";

export interface Translations {
  nav: {
    brandName: string;
    brandSub: string;
    treatments: string;
    specialties: string;
    doctors: string;
    hospitals: string;
    howItWorks: string;
    patientStories: string;
    aboutIndia: string;
    costGuide: string;
    support247: string;
    startJourney: string;
    talkCoordinator: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    trust1: string;
    trust1Label: string;
    trust2: string;
    trust2Label: string;
    trust3: string;
    trust3Label: string;
    trust4: string;
    trust4Label: string;
    coordinatorAssigned: string;
    specialistMatch: string;
    nextStep: string;
    videoConsult: string;
  };
  quickEntry: {
    heading: string;
    subheading: string;
    card1Title: string;
    card1Desc: string;
    card1Cta: string;
    card2Title: string;
    card2Desc: string;
    card2Cta: string;
    card3Title: string;
    card3Desc: string;
    card3Cta: string;
    card4Title: string;
    card4Desc: string;
    card4Cta: string;
  };
  intakePreview: {
    heading: string;
    subheading: string;
    step1Title: string;
    step1Desc: string;
    step1Placeholder: string;
    step2Title: string;
    step2Desc: string;
    step2UploadBtn: string;
    step3Title: string;
    step3Desc: string;
    submitBtn: string;
    trustNote: string;
  };
  journey: {
    eyebrow: string;
    heading: string;
    subheading: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
    step5Title: string;
    step5Desc: string;
    step6Title: string;
    step6Desc: string;
  };
  specialties: {
    eyebrow: string;
    heading: string;
    subheading: string;
    viewAll: string;
    avgStay: string;
    successRate: string;
    explore: string;
  };
  doctors: {
    eyebrow: string;
    heading: string;
    subheading: string;
    experience: string;
    languages: string;
    videoAvailable: string;
    viewProfile: string;
    requestConsult: string;
  };
  hospitals: {
    eyebrow: string;
    heading: string;
    subheading: string;
    exploreNetwork: string;
    beds: string;
    surgeons: string;
    viewDetails: string;
  };
  cost: {
    eyebrow: string;
    heading: string;
    subheading: string;
    typicalStay: string;
    recoveryTime: string;
    estimatedCost: string;
    compareTitle: string;
    disclaimer: string;
    exploreBtn: string;
  };
  whyIndia: {
    eyebrow: string;
    heading: string;
    subheading: string;
    pillar1Title: string;
    pillar1Desc: string;
    pillar2Title: string;
    pillar2Desc: string;
    pillar3Title: string;
    pillar3Desc: string;
    pillar4Title: string;
    pillar4Desc: string;
    pillar5Title: string;
    pillar5Desc: string;
  };
  concierge: {
    eyebrow: string;
    heading: string;
    subheading: string;
    perk1Title: string;
    perk1Desc: string;
    perk2Title: string;
    perk2Desc: string;
    perk3Title: string;
    perk3Desc: string;
    perk4Title: string;
    perk4Desc: string;
    perk5Title: string;
    perk5Desc: string;
    perk6Title: string;
    perk6Desc: string;
    cta: string;
  };
  coordinator: {
    eyebrow: string;
    heading: string;
    languages: string;
    role: string;
    messageBtn: string;
    responseSpeed: string;
  };
  caseStudy: {
    eyebrow: string;
    heading: string;
    subheading: string;
    readMore: string;
  };
  opinion: {
    eyebrow: string;
    heading: string;
    subheading: string;
    cta: string;
    disclaimer: string;
  };
  support: {
    eyebrow: string;
    heading: string;
    subheading: string;
    whatsappChat: string;
    callDesk: string;
    videoDesk: string;
    emailDesk: string;
  };
  whatNext: {
    eyebrow: string;
    heading: string;
    subheading: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
    step5Title: string;
    step5Desc: string;
    cta: string;
  };
  trust: {
    eyebrow: string;
    heading: string;
    pillar1Title: string;
    pillar1Desc: string;
    pillar2Title: string;
    pillar2Desc: string;
    pillar3Title: string;
    pillar3Desc: string;
    policyLinks: string;
  };
  faq: {
    eyebrow: string;
    heading: string;
    subheading: string;
    searchPlaceholder: string;
  };
  finalCta: {
    eyebrow: string;
    heading: string;
    subheading: string;
    primaryBtn: string;
    secondaryBtn: string;
    channels: string;
  };
  footer: {
    tagline: string;
    careHeader: string;
    resourcesHeader: string;
    companyHeader: string;
    supportHeader: string;
    rights: string;
    medicalDisclaimer: string;
  };
}

export const DICTIONARY: Record<Language, Translations> = {
  en: {
    nav: {
      brandName: "VEDARA",
      brandSub: "International Care",
      treatments: "Treatments",
      specialties: "Specialties",
      doctors: "Doctors",
      hospitals: "Hospitals",
      howItWorks: "How It Works",
      patientStories: "Patient Stories",
      aboutIndia: "Why India",
      costGuide: "Cost Calculator",
      support247: "24/7 Care Support",
      startJourney: "Start Your Care Journey →",
      talkCoordinator: "Talk to a Coordinator",
    },
    hero: {
      eyebrow: "INTERNATIONAL PATIENT CARE · INDIA",
      headline: "World-Class Care. Personally Coordinated.",
      subheadline:
        "From your first medical enquiry to specialist consultation, hospital coordination, travel assistance and follow-up care — one dedicated team helps you navigate your journey to India.",
      primaryCta: "Start Your Care Journey →",
      secondaryCta: "Talk to a Care Coordinator",
      trust1: "15+ Years",
      trust1Label: "Healthcare Network",
      trust2: "120+ Specialist",
      trust2Label: "Senior Doctors",
      trust3: "25+ Partner",
      trust3Label: "JCI & NABH Hospitals",
      trust4: "18+ Countries",
      trust4Label: "Patients Served",
      coordinatorAssigned: "Care Coordinator Assigned",
      specialistMatch: "Specialist Match Found",
      nextStep: "Next Step: Tele-Consultation",
      videoConsult: "Confirmed with Dr. Arjun Mehta · Tomorrow",
    },
    quickEntry: {
      heading: "How Can We Help You Today?",
      subheading: "Choose your starting point. Our care team is ready to guide you immediately.",
      card1Title: "Find Treatment",
      card1Desc: "Explore 50+ advanced treatment options, procedures and recovery timelines in India.",
      card1Cta: "Explore Treatments →",
      card2Title: "Find a Specialist",
      card2Desc: "Connect with board-certified Indian specialists matched to your precise medical condition.",
      card2Cta: "Find a Doctor →",
      card3Title: "Get a Medical Opinion",
      card3Desc: "Securely share your scans and reports to receive a clinical evaluation within 24 hours.",
      card3Cta: "Get an Opinion →",
      card4Title: "Plan Treatment in India",
      card4Desc: "Let our concierge team organize your medical visa, hospital admission, and VIP travel.",
      card4Cta: "Plan My Journey →",
    },
    intakePreview: {
      heading: "Your Journey Starts With One Conversation.",
      subheading:
        "Tell us what you need. Our clinical team will understand your requirements, review your medical records, and guide you toward the right next step.",
      step1Title: "Step 01 — Care Needs",
      step1Desc: "What treatment or medical specialty are you seeking?",
      step1Placeholder: "Select a specialty or condition",
      step2Title: "Step 02 — Medical Information",
      step2Desc: "Upload MRI, CT scans, blood reports or previous diagnosis.",
      step2UploadBtn: "+ Upload Medical Reports",
      step3Title: "Step 03 — How to Reach You",
      step3Desc: "Your country & phone number (WhatsApp preferred).",
      submitBtn: "Begin My Care Assessment →",
      trustNote: "🔒 Your health records are encrypted and shared only with authorized clinical teams.",
    },
    journey: {
      eyebrow: "END-TO-END PATIENT PATHWAY",
      heading: "One Journey. One Care Team.",
      subheading: "A seamless, transparent pathway designed to keep you informed, supported, and confident at every step.",
      step1Title: "01 — Share Your Case",
      step1Desc: "Tell us about your symptoms and securely upload your previous diagnostic reports.",
      step2Title: "02 — Meet the Right Specialist",
      step2Desc: "Our medical review board pairs you with vetted senior consultants and top hospital departments.",
      step3Title: "03 — Understand Your Options",
      step3Desc: "Receive transparent treatment plans, hospital choices, indicative costs, and video consultations.",
      step4Title: "04 — Prepare Your Journey",
      step4Desc: "Priority Medical Visa (M-Visa) facilitation, flight assistance, and curated recovery accommodation.",
      step5Title: "05 — Receive Care in India",
      step5Desc: "Airport welcome, private transport, and your dedicated care coordinator by your side in the hospital.",
      step6Title: "06 — Continue Care at Home",
      step6Desc: "Organized digital health records, post-procedure telemedicine, and continuity of care with your hometown doctor.",
    },
    specialties: {
      eyebrow: "MEDICAL EXPERTISE",
      heading: "Specialized Care Across India",
      subheading: "Access internationally trained specialists across India's most advanced tertiary medical disciplines.",
      viewAll: "Explore All Specialties →",
      avgStay: "Avg Stay:",
      successRate: "Success Rate:",
      explore: "Explore Care Options →",
    },
    doctors: {
      eyebrow: "DISTINGUISHED CLINICIANS",
      heading: "The Right Specialist Changes Everything.",
      subheading:
        "Find experienced Indian specialists matched to your medical condition, preferred location, and language requirements.",
      experience: "Years Experience",
      languages: "Languages:",
      videoAvailable: "🟢 Video Consultation Available",
      viewProfile: "View Full Profile",
      requestConsult: "Request Consultation",
    },
    hospitals: {
      eyebrow: "CENTERS OF EXCELLENCE",
      heading: "Trusted Hospitals. Coordinated Around Your Care.",
      subheading:
        "We partner exclusively with accredited quaternary care institutes equipped with the world's most advanced medical technology.",
      exploreNetwork: "Explore Our Hospital Network →",
      beds: "Beds Capacity",
      surgeons: "Surgeons",
      viewDetails: "View Hospital Amenities →",
    },
    cost: {
      eyebrow: "FINANCIAL CLARITY",
      heading: "Know What to Expect Before You Travel",
      subheading:
        "Treatment costs vary by condition and hospital. We provide transparent indicative packages so you can plan with certainty.",
      typicalStay: "Typical Hospital Stay:",
      recoveryTime: "Est. Recovery Timeline:",
      estimatedCost: "Indicative Package Range:",
      compareTitle: "Global Cost Comparison (Estimated)",
      disclaimer: "Note: Indicative estimates based on standard clinical pathways. Final quotes determined by treating hospital.",
      exploreBtn: "Calculate Custom Package Estimate →",
    },
    whyIndia: {
      eyebrow: "GLOBAL HEALTHCARE DESTINATION",
      heading: "Why International Patients Choose India",
      subheading: "Evidence-driven healthcare that blends clinical excellence with unmatched accessibility.",
      pillar1Title: "World-Class Clinical Expertise",
      pillar1Desc: "Tens of thousands of doctors trained in the US, UK, and Europe performing high-volume complex surgeries with benchmark success rates.",
      pillar2Title: "Cutting-Edge Infrastructure",
      pillar2Desc: "Equipped with Da Vinci Xi robotic surgery, Proton Beam radiation, PET-MRI, and state-of-the-art hybrid catheterization suites.",
      pillar3Title: "Zero Waiting Times",
      pillar3Desc: "Immediate specialist access and scheduled surgeries without months on waiting lists for critical procedures.",
      pillar4Title: "Transparent Value",
      pillar4Desc: "Receive world-standard treatment at 60% to 85% lower cost compared to North America, Europe, or private GCC clinics.",
      pillar5Title: "Warm Concierge Hospitality",
      pillar5Desc: "Dedicated international patient wings, multilingual interpreters, cultural cuisine options, and high nurse-to-patient ratios.",
    },
    concierge: {
      eyebrow: "LUXURY CARE COORDINATION",
      heading: "Care Doesn't Stop at the Hospital Door.",
      subheading: "Your treatment is one part of the journey. Our concierge team coordinates every detail around it.",
      perk1Title: "VIP Airport Welcome",
      perk1Desc: "Personalized airport tarmac reception and private vehicle transfer directly to hospital or hotel.",
      perk2Title: "Private Chauffeur Transfers",
      perk2Desc: "Dedicated on-call transportation for all medical appointments and companion travel.",
      perk3Title: "Curated Healing Stays",
      perk3Desc: "Partner 4-star & 5-star long-stay hotel suites tailored for recovery with hygienic kitchenettes.",
      perk4Title: "Multilingual Interpreters",
      perk4Desc: "Native Arabic, French, Russian, and Bengali speaking patient companions throughout consultations.",
      perk5Title: "Priority Medical Visa (M-Visa)",
      perk5Desc: "Official hospital invitation letters and visa liaison ensuring approval in under 48 hours.",
      perk6Title: "Dedicated Care Coordinator",
      perk6Desc: "One single dedicated point of contact who manages scheduling, hospital liaison, and peace of mind.",
      cta: "Explore Concierge Services →",
    },
    coordinator: {
      eyebrow: "HUMAN-CENTERED CARE",
      heading: "You Never Have to Navigate It Alone.",
      languages: "Languages Spoken:",
      role: "Lead International Patient Care Coordinator",
      messageBtn: "Message Aisha Directly →",
      responseSpeed: "Typical reply in < 15 minutes",
    },
    caseStudy: {
      eyebrow: "PATIENT JOURNEY STORY",
      heading: "From Dubai to Delhi. One Coordinated Journey.",
      subheading: "How Ahmed R. navigated complex cardiac surgery with zero stress through Vedara's dedicated concierge.",
      readMore: "Read More Patient Journeys →",
    },
    opinion: {
      eyebrow: "SECOND MEDICAL OPINION",
      heading: "Not Sure Where to Begin? Start With Your Scans.",
      subheading:
        "Upload your recent MRI, CT scan, biopsy, or doctor's prescription. Our multidisciplinary panel provides an expert clinical assessment within 24-48 hours.",
      cta: "Request a Free Medical Opinion →",
      disclaimer: "Medical opinions are provided by qualified specialists. Our care team does not replace your treating physician.",
    },
    support: {
      eyebrow: "GLOBAL PATIENT DESK",
      heading: "Wherever You Are, We're Ready to Help.",
      subheading: "Reach our international coordination desks across the GCC, Africa, Central Asia, and Europe.",
      whatsappChat: "Chat on WhatsApp",
      callDesk: "Call International Desk",
      videoDesk: "Book Video Call",
      emailDesk: "Send Medical Enquiry",
    },
    whatNext: {
      eyebrow: "CLEAR EXPECTATIONS",
      heading: "What Happens After You Enquire?",
      subheading: "We make your initial steps clear, reassuring, and completely pressure-free.",
      step1Title: "01 — We Listen to Your Needs",
      step1Desc: "A care coordinator contacts you within 15 minutes to understand your medical history and travel goals.",
      step2Title: "02 — We Review Your Reports",
      step2Desc: "Our senior medical panel reviews your clinical records and identifies top specialized consultants.",
      step3Title: "03 — We Present Clear Options",
      step3Desc: "You receive 2–3 doctor profiles, hospital choices, and transparent itemized cost packages.",
      step4Title: "04 — You Decide With Confidence",
      step4Desc: "Attend a live video consultation with the chosen surgeon to finalize your treatment plan.",
      step5Title: "05 — We Coordinate Every Mile",
      step5Desc: "Visas, flights, airport welcome, and bedside coordination handled effortlessly.",
      cta: "Start My Care Journey Now →",
    },
    trust: {
      eyebrow: "PATIENT PRIVACY & INTEGRITY",
      heading: "Your Health Information Deserves Utmost Privacy.",
      pillar1Title: "Bank-Grade Encryption",
      pillar1Desc: "All diagnostic reports and personal identifiers are stored using HIPAA-compliant AES-256 encryption.",
      pillar2Title: "Authorized Medical Access Only",
      pillar2Desc: "Your files are shared strictly with verified treating surgeons and hospital departments.",
      pillar3Title: "Zero Hidden Markups",
      pillar3Desc: "All medical payments are settled directly with the treating hospital with transparent invoices.",
      policyLinks: "Privacy Policy · Patient Rights · HIPAA Compliance · Data Protection Protocol",
    },
    faq: {
      eyebrow: "COMMON QUESTIONS",
      heading: "Frequently Asked Questions",
      subheading: "Everything you need to know about traveling to India for world-class medical care.",
      searchPlaceholder: "Search any question (e.g. visa, cost, recovery, language)...",
    },
    finalCta: {
      eyebrow: "YOUR JOURNEY STARTS HERE",
      heading: "Better Care Should Feel Less Complicated.",
      subheading: "Tell us what you need. One dedicated team will guide you to India's finest healthcare.",
      primaryBtn: "Start Your Care Journey →",
      secondaryBtn: "Talk to a Care Coordinator",
      channels: "Instant assistance available via WhatsApp · Direct Phone · HD Video Consultation",
    },
    footer: {
      tagline: "India's premier international patient care coordination platform. Connecting global families with India's finest medical minds.",
      careHeader: "Specialized Care",
      resourcesHeader: "Patient Resources",
      companyHeader: "About Vedara",
      supportHeader: "24/7 International Desk",
      rights: "© 2026 Vedara International Care. All rights reserved.",
      medicalDisclaimer: "Vedara is a medical care facilitation and coordination platform. We do not provide direct medical advice, diagnosis, or treatment. Medical opinions and care are delivered by licensed partner hospitals and practitioners.",
    },
  },
  ar: {
    nav: {
      brandName: "فيدارا",
      brandSub: "الرعاية الدولية المنسقة",
      treatments: "العلاجات",
      specialties: "التخصصات الطبية",
      doctors: "الأطباء الاستشاريون",
      hospitals: "المستشفيات المعتمدة",
      howItWorks: "كيف نعمل",
      patientStories: "تجارب المرضى",
      aboutIndia: "لماذا الهند",
      costGuide: "حاسبة التكاليف",
      support247: "دعم الرعاية 24/7",
      startJourney: "ابدأ رحلة علاجك →",
      talkCoordinator: "تحدث مع منسق الرعاية",
    },
    hero: {
      eyebrow: "رعاية المرضى الدوليين · الهند",
      headline: "رعاية طبية عالمية المستوى. منسقة خصيصاً لك.",
      subheadline:
        "من استفسارك الطبي الأول إلى استشارة كبار الاستشاريين، وتنسيق المستشفى، وتسهيل السفر والتأشيرة، والمتابعة بعد العودة — فريق متخصص يرافقك خطوة بخطوة في رحلتك إلى الهند.",
      primaryCta: "ابدأ رحلة علاجك الآن →",
      secondaryCta: "تحدث مع منسق الرعاية",
      trust1: "+15 عاماً",
      trust1Label: "شبكة الرعاية الموثوقة",
      trust2: "+120 طبيب",
      trust2Label: "استشاريون معتمدون",
      trust3: "+25 مستشفى",
      trust3Label: "معتمدة دولياً JCI",
      trust4: "+18 دولة",
      trust4Label: "مرضى من مختلف الدول",
      coordinatorAssigned: "تم تعيين منسق الرعاية",
      specialistMatch: "تم مطابقة الطبيب الاستشاري",
      nextStep: "الخطوة التالية: استشارة مرئية",
      videoConsult: "مؤكدة مع د. أرجون ميهتا · غداً",
    },
    quickEntry: {
      heading: "كيف يمكننا مساعدتك اليوم؟",
      subheading: "اختر نقطة البداية المناسبة. فريقنا الطبي المتخصص جاهز لإرشادك فوراً.",
      card1Title: "البحث عن علاج",
      card1Desc: "استكشف أكثر من 50 إجراءً جراحياً وعلاجياً متقدماً مع تفاصيل فترات التعافي.",
      card1Cta: "استكشف العلاجات ←",
      card2Title: "البحث عن طبيب استشاري",
      card2Desc: "تواصل مع نخبة من كبار أطباء الهند الحاصلين على بوردات أمريكية وبريطانية.",
      card2Cta: "ابحث عن طبيب ←",
      card3Title: "طلب رأي طبي ثانٍ",
      card3Desc: "ارفع تقاريرك وصورك الإشعاعية للحصول على تقييم طبي معتمد خلال 24 ساعة.",
      card3Cta: "اطلب رأياً طبياً ←",
      card4Title: "تخطيط السفر للعلاج",
      card4Desc: "دع فريق الكونسيرج يتولى ترتيب التأشيرة الطبية، والاستقبال، والإقامة الفندقية.",
      card4Cta: "خطط لرحلتك ←",
    },
    intakePreview: {
      heading: "رحلتك العلاجية تبدأ بمحادثة واحدة.",
      subheading:
        "أخبرنا باحتياجاتك الصحية. سيقوم فريقنا بمراجعة تقاريرك الطبية ومطابقتها مع أفضل الاستشاريين والمستشفيات المناسبة لحالتك.",
      step1Title: "الخطوة 01 — التخصص المطلوب",
      step1Desc: "ما هو التخصص الطبي أو الإجراء الذي تبحث عنه؟",
      step1Placeholder: "اختر التخصص أو الحالة الطبية",
      step2Title: "الخطوة 02 — التقارير الطبية",
      step2Desc: "ارفع صور الرنين المغناطيسي، الأشعة المقطعية، أو تقارير الفحوصات.",
      step2UploadBtn: "+ رفع التقارير والملفات الطبية",
      step3Title: "الخطوة 03 — وسيلة التواصل",
      step3Desc: "حدد دولتك ورقم هاتفك (يفضل واتساب لسرعة التواصل).",
      submitBtn: "بدء التقييم الطبي الفوري →",
      trustNote: "🔒 يتم تشفير بياناتك الطبية ومشاركتها فقط مع الاستشاريين المعتمدين لحالتك.",
    },
    journey: {
      eyebrow: "مسار المريض المتكامل",
      heading: "رحلة واحدة. فريق رعاية متكامل.",
      subheading: "مسار واضح ومريح مصمم ليمنحك ولعائلتك الطمأنينة الكاملة والدعم في كل لحظة.",
      step1Title: "01 — مشاركة الحالة والتقارير",
      step1Desc: "أرسل تفاصيل حالتك الصحية وتقاريرك الطبية السابقة بأمان عبر المنصة.",
      step2Title: "02 — مطابقة الطبيب المناسب",
      step2Desc: "تقوم لجنتنا الطبية بمطابقة حالتك مع أفضل الاستشاريين والمستشفيات المتخصصة.",
      step3Title: "03 — فهم الخيارات والتكاليف",
      step3Desc: "احصل على خطة علاجية مفصلة، وتقدير شفاف للتكاليف، واستشارة مرئية مع الطبيب.",
      step4Title: "04 — تجهيز السفر والتأشيرة",
      step4Desc: "استخراج خطاب التأشيرة الطبية المعتمد، وحجز الإقامة الفندقية المناسبة للتعافي.",
      step5Title: "05 — تلقي العلاج في الهند",
      step5Desc: "استقبال VIP في المطار، ووجود منسق الرعاية الشخصي بجانبك في المستشفى.",
      step6Title: "06 — استمرار المتابعة في بلدك",
      step6Desc: "مزامنة سجلك الطبي الرقمي، وجلسات متابعة مرئية دورية مع طبيبك الجراح بعد العودة.",
    },
    specialties: {
      eyebrow: "الخبرات الطبية التخصصية",
      heading: "رعاية تخصصية فائقة في الهند",
      subheading: "أحدث المراكز الطبية التخصصية التي تستقبل المرضى من مختلف دول العالم.",
      viewAll: "عرض كافة التخصصات ←",
      avgStay: "متوسط الإقامة:",
      successRate: "نسبة النجاح:",
      explore: "استكشف خيارات العلاج ←",
    },
    doctors: {
      eyebrow: "نخبة الأطباء الاستشاريين",
      heading: "الطبيب المناسب يصنع كل الفارق.",
      subheading: "اختر من بين أمهر الجراحين والاستشاريين في الهند المتوافقين مع احتياجاتك ولغتك.",
      experience: "سنوات خبرة",
      languages: "اللغات:",
      videoAvailable: "🟢 استشارة مرئية متاحة عن بعد",
      viewProfile: "الملف التعريفي الكامل",
      requestConsult: "طلب استشارة طبية",
    },
    hospitals: {
      eyebrow: "مراكز التميز الطبي",
      heading: "مستشفيات موثوقة. مهيأة لراحتك.",
      subheading: "شراكات حصرية مع كبرى المستشفيات الحاصلة على أعلى الاعتمادات الدولية وتجهيزات غرف العمليات الذكية.",
      exploreNetwork: "استكشف شبكة مستشفياتنا ←",
      beds: "سعة الأسرة",
      surgeons: "جراح متخصص",
      viewDetails: "تفاصيل وخدمات المستشفى ←",
    },
    cost: {
      eyebrow: "شفافية التكاليف",
      heading: "اعرف التكاليف بوضوح قبل السفر",
      subheading: "نقدم باقات تقديرية واضحة ومفصلة لتمكينك من التخطيط المالي بكل ثقة وراحة بال.",
      typicalStay: "مدة الإقامة بالمستشفى:",
      recoveryTime: "فترة التعافي المتوقعة:",
      estimatedCost: "نطاق التكلفة التقديري:",
      compareTitle: "مقارنة التكاليف العالمية (تقديرية)",
      disclaimer: "ملاحظة: هذه الأسعار استرشادية، ويتم تأكيد التكلفة النهائية بناءً على التقرير الطبي وخطة المستشفى.",
      exploreBtn: "احسب تكلفة باقتك المخصصة ←",
    },
    whyIndia: {
      eyebrow: "وجهة الرعاية الصحية العالمية",
      heading: "لماذا يختار المرضى الدوليون الهند؟",
      subheading: "منظومة رعاية صحية مبنية على الأدلة والريادة السريرية بتكلفة في متناول الجميع.",
      pillar1Title: "كفاءة طبية عالمية",
      pillar1Desc: "أطباء وجراحون تدربوا في أكبر المراكز الأمريكية والبريطانية ويجرون آلاف العمليات سنوياً بنجاح مشهود.",
      pillar2Title: "أحدث التقنيات الطبية",
      pillar2Desc: "أجهزة روبوت دافنشي، والعلاج الإشعاعي بالبروتون، وغرف القسطرة الهجينة المتطورة.",
      pillar3Title: "بدون قوائم انتظار",
      pillar3Desc: "إمكانية بدء الفحوصات والعمليات الجراحية فور وصولك دون أي تأخير أو انتظار طويل.",
      pillar4Title: "قيمة وتوفير حقيقي",
      pillar4Desc: "توفير يصل إلى 70% إلى 85% مقارنة بالعلاج في الولايات المتحدة أو أوروبا أو العيادات الخاصة بالخليج.",
      pillar5Title: "ضيافة كونسيرج متكاملة",
      pillar5Desc: "أجنحة مخصصة للمرضى الدوليين، مترجمون مرافقون باللغة العربية، وطعام حلال ورعاية تمريضية مكثفة.",
    },
    concierge: {
      eyebrow: "خدمات الكونسيرج الفاخرة",
      heading: "الرعاية لا تتوقف عند أبواب المستشفى.",
      subheading: "علاجك هو خطوة واحدة في رحلتك. فريق الكونسيرج يتولى تنسيق كل ما يحيط بها لراحتك التامة.",
      perk1Title: "استقبال VIP في المطار",
      perk1Desc: "استقبال شخصي عند بوابة الطائرة وتوفير سيارة خاصة لنقلك مباشرة إلى وجهتك.",
      perk2Title: "مواصلات خاصة وسائق خاص",
      perk2Desc: "سيارة تحت الطلب لك ولمرافقيك للتنقل بين الفندق والمستشفى والمواعيد الطبية.",
      perk3Title: "إقامة فندقية مخصصة للتعافي",
      perk3Desc: "شقق فندقية وأجنحة 4 و 5 نجوم مهيأة للمرضى ومجهزة بمطابخ لضمان الراحة التامة.",
      perk4Title: "مترجمون مرافقون بالعربية",
      perk4Desc: "مترجم شخصي يرافقك في كافة المقابلات الطبية والمستشفى لضمان وضوح كل معلومة.",
      perk5Title: "تسهيل التأشيرة الطبية السريعة",
      perk5Desc: "إصدار خطابات الدعوة الطبية المعتمدة لإنهاء التأشيرة خلال أقل من 48 ساعة.",
      perk6Title: "منسق رعاية مخصص",
      perk6Desc: "شخص واحد مخصص لحالتك مسؤول عن إدارة كافة المواعيد والتنسيق مع الأطباء لتنعم بالراحة.",
      cta: "استكشف خدمات الكونسيرج ←",
    },
    coordinator: {
      eyebrow: "رعاية إنسانية قريبة منك",
      heading: "لن تضطر لخوض هذه التجربة بمفردك.",
      languages: "اللغات المتحدث بها:",
      role: "كبيرة منسقي رعاية المرضى الدوليين",
      messageBtn: "راسل عائشة مباشرة عبر واتساب ←",
      responseSpeed: "متوسط الرد في أقل من 15 دقيقة",
    },
    caseStudy: {
      eyebrow: "قصة نجاح واقعية",
      heading: "من دبي إلى دلهي. رحلة رعاية منسقة بالكامل.",
      subheading: "كيف أجرى أحمد ر. جراحة القلب المعقدة بنجاح تام وبأعلى درجات الراحة عبر منسقي فيدارا.",
      readMore: "قراءة المزيد من تجارب المرضى ←",
    },
    opinion: {
      eyebrow: "طلب رأي طبي ثانٍ",
      heading: "لست متأكداً من أين تبدأ؟ ابدأ بتقاريرك الطبية.",
      subheading:
        "ارفع صور الرنين المغناطيسي أو الأشعة المقطعية أو تقارير الفحوصات، وسيقوم مجلسنا الطبي بتقديم تقرير استشاري شامل خلال 24-48 ساعة.",
      cta: "اطلب رأياً طبياً مجانياً الآن ←",
      disclaimer: "الآراء الطبية مقدمة من أطباء استشاريين مرخصين. فريقنا ينسق الرعاية ولا يقدم بديلاً عن الفحص السريري المباشر.",
    },
    support: {
      eyebrow: "مكاتب الخدمة الدولية",
      heading: "أينما كنت، نحن جاهزون لمساعدتك.",
      subheading: "تواصل مع مكاتبنا الدولية في دول الخليج، والشرق الأوسط، وأفريقيا، وآسيا وأوروبا.",
      whatsappChat: "تواصل عبر واتساب",
      callDesk: "اتصال بالمكتب الدولي",
      videoDesk: "حجز موعد استشارة مرئية",
      emailDesk: "إرسال التقارير عبر البريد",
    },
    whatNext: {
      eyebrow: "خطوات واضحة ومريحة",
      heading: "ماذا يحدث بعد إرسال استفسارك؟",
      subheading: "نجعل خطواتك الأولى واضحة، مطمئنة، وبدون أي ضغوط أو التزامات.",
      step1Title: "01 — نفهم احتياجاتك الطبية",
      step1Desc: "يتواصل معك منسق الرعاية خلال 15 دقيقة للاستماع لحالتك وأهدافك العلاجية.",
      step2Title: "02 — نراجع تقاريرك الطبية",
      step2Desc: "يقوم فريقنا الطبي بدراسة ملفك واختيار أفضل الاستشاريين المتخصصين في الهند.",
      step3Title: "03 — نعرض عليك خيارات واضحة",
      step3Desc: "تتلقى ملفات 2 إلى 3 استشاريين، وخيارات المستشفيات وتفاصيل التكلفة الدقيقة.",
      step4Title: "04 — تقرر بكل ثقة واطمئنان",
      step4Desc: "يمكنك عقد جلسة فيديو مباشرة مع الجراح لمناقشة الخطة قبل اتخاذ أي قرار.",
      step5Title: "05 — ننسق كل تفاصيل الرحلة",
      step5Desc: "نتولى التأشيرات، وحجوزات السفر، والاستقبال بالمطار، ومرافقتك في المستشفى.",
      cta: "ابدأ رحلة علاجك الآن ←",
    },
    trust: {
      eyebrow: "أمان وخصوصية المريض",
      heading: "معلوماتك الصحية تحظى بأعلى معايير الخصوصية.",
      pillar1Title: "تشفير بيانات فائق الأمان",
      pillar1Desc: "تخزين كافة التقارير الطبية باستخدام أعلى بروتوكولات التشفير المتوافقة مع معايير HIPAA و GDPR.",
      pillar2Title: "صلاحيات طبية مقيدة فقط",
      pillar2Desc: "مشاركة تقاريرك فقط مع الأطباء الجراحين ولجنة المستشفى المختصة بعلاجك.",
      pillar3Title: "بدون أي رسوم خفية",
      pillar3Desc: "سداد كافة فواتير العلاج يتم مباشرة مع المستشفى المعالج مع فواتير تفصيلية واضحة.",
      policyLinks: "سياسة الخصوصية · حقوق المريض · معايير HIPAA · حماية البيانات الشخصية",
    },
    faq: {
      eyebrow: "الأسئلة الشائعة",
      heading: "كل ما تود معرفته عن رحلة العلاج",
      subheading: "إجابات واضحة ومفصلة عن السفر إلى الهند لتلقي أفضل رعاية طبية.",
      searchPlaceholder: "ابحث في الأسئلة (مثل: التأشيرة، التكاليف، المرافقين، المترجم)...",
    },
    finalCta: {
      eyebrow: "رحلتك تبدأ هنا",
      heading: "الحصول على رعاية طبية ممتازة يجب أن يكون سهلاً ومطمئناً.",
      subheading: "أخبرنا بما تحتاجه، وسيتولى فريقنا المتخصص إرشادك لأفضل كفاءات الهند الطبية.",
      primaryBtn: "ابدأ رحلة علاجك الآن →",
      secondaryBtn: "تحدث مع منسق الرعاية",
      channels: "متاحون للتواصل الفوري عبر واتساب · الهاتف المباشر · الاستشارة المرئية",
    },
    footer: {
      tagline: "منصة تنسيق الرعاية الطبية الدولية الرائدة في الهند. نربط العائلات العالمية بأمهر العقول الطبية في الهند.",
      careHeader: "الرعاية التخصصية",
      resourcesHeader: "مصادر المريض",
      companyHeader: "عن فيدارا",
      supportHeader: "المكتب الدولي 24/7",
      rights: "© 2026 فيدارا للرعاية الدولية. جميع الحقوق محفوظة.",
      medicalDisclaimer: "فيدارا هي منصة لتنسيق وتسهيل الرعاية الطبية والسفر العلاجي. نحن لا نقدم تشخيصاً طبياً مباشراً، وإنما تقدم الرعاية والعلاجات من قبل المستشفيات والأطباء المرخصين.",
    },
  },
};
