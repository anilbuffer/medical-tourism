export type Language = "en" | "ar";
export type Currency = "USD" | "GBP" | "CAD" | "AUD" | "AED" | "SAR" | "QAR" | "OMR" | "EUR" | "INR";
export type CountryCode = "GB" | "CA" | "AU" | "AE" | "SA" | "QA" | "OM";

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
    explore: string;
    doctorsHospitals: string;
    saveBadge: string;
    faqNav: string;
    onlineBadge: string;
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
    transparentPricing: string;
    dedicatedCoordinator: string;
    noHiddenCosts: string;
    verifiedHospitals: string;
    visaAssistance: string;
    saveUpTo70: string;
    onTreatment: string;
    jciNabhAccredited: string;
    freeConsultation: string;
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
  popularTreatments: {
    eyebrow: string;
    heading: string;
    subheading: string;
    startingFrom: string;
    dental: string;
    cosmetic: string;
    eye: string;
    ortho: string;
    fertility: string;
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
  blog: {
    eyebrow: string;
    heading: string;
    subheading: string;
    viewAll: string;
    readTime: string;
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
  floatingBar: {
    whatsapp: string;
    reportReview: string;
    callDesk: string;
  };
  estimatorWidget: {
    eyebrow: string;
    heading: string;
    step1: string;
    step2: string;
    step3: string;
    treatmentLabel: string;
    countryLabel: string;
    flightTime: string;
    visaDuration: string;
    costInIndia: string;
    costAtHome: string;
    savings: string;
    emailLabel: string;
    emailPlaceholder: string;
    submitBtn: string;
    successMessage: string;
  };
  exitIntent: {
    heading: string;
    subheading: string;
    nameLabel: string;
    namePlaceholder: string;
    contactLabel: string;
    contactPlaceholder: string;
    downloadBtn: string;
    successMessage: string;
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
      startJourney: "Get Free Quote",
      talkCoordinator: "Talk to Coordinator",
      explore: "Explore",
      doctorsHospitals: "Doctors & Hospitals",
      saveBadge: "Save ~70%",
      faqNav: "FAQs & Guide",
      onlineBadge: "Online",
    },
    hero: {
      eyebrow: "JCI & NABH accredited network",
      headline: "World-Class Care. Personally Coordinated.",
      subheadline:
        "From your first medical enquiry to specialist consultation, hospital coordination, travel assistance and follow-up care — one dedicated team helps you navigate your journey to India.",
      primaryCta: "Get Free Quote",
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
      transparentPricing: "Transparent Pricing",
      dedicatedCoordinator: "Dedicated Care Coordinator",
      noHiddenCosts: "No Hidden Costs",
      verifiedHospitals: "50+ Verified Hospitals",
      visaAssistance: "Medical Visa Assistance",
      saveUpTo70: "Save up to 70%",
      onTreatment: "On Treatment",
      jciNabhAccredited: "JCI & NABH Accredited",
      freeConsultation: "Free Consultation",
    },
    quickEntry: {
      heading: "How Can We Help You Today?",
      subheading: "Choose your starting point. Our care team is ready to guide you immediately.",
      card1Title: "Find Treatment",
      card1Desc: "Explore 50+ advanced treatment options, procedures and recovery timelines in India.",
      card1Cta: "Explore Treatments",
      card2Title: "Find a Specialist",
      card2Desc: "Connect with board-certified Indian specialists matched to your precise medical condition.",
      card2Cta: "Find a Doctor",
      card3Title: "Get a Medical Opinion",
      card3Desc: "Securely share your scans and reports to receive a clinical evaluation within 24 hours.",
      card3Cta: "Get an Opinion",
      card4Title: "Plan Treatment in India",
      card4Desc: "Let our concierge team organize your medical visa, hospital admission, and VIP travel.",
      card4Cta: "Plan My Journey",
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
      submitBtn: "Begin My Care Assessment",
      trustNote: "🔒 Your health records are encrypted and shared only with authorized clinical teams.",
    },
    journey: {
      eyebrow: "OUR PROCESS",
      heading: "How Vedara India Care Works",
      subheading: "Six guided steps from your first message to your recovery at home — with one coordinator accountable throughout.",
      step1Title: "Submit Inquiry",
      step1Desc: "Share your reports and treatment needs through a short secure form.",
      step2Title: "Consultation & Documents",
      step2Desc: "Your coordinator collects medical records and verifies eligibility.",
      step3Title: "Tele-Consultation with Doctor",
      step3Desc: "Speak directly with shortlisted specialists before you commit.",
      step4Title: "Treatment Plan & Visa/Travel Planning",
      step4Desc: "Fixed-cost plan, medical visa invitation and travel scheduling.",
      step5Title: "Travel & Treatment",
      step5Desc: "Airport pickup, accommodation, interpreter and in-hospital support.",
      step6Title: "Recovery & Follow-up",
      step6Desc: "Post-op reviews, discharge summary and follow-up from home.",
    },
    popularTreatments: {
      eyebrow: "OUR SPECIALTIES",
      heading: "Popular Treatments",
      subheading: "Five priority services delivered by accredited Indian hospitals at transparent, fixed package prices.",
      startingFrom: "Starting from",
      dental: "Dental Implants",
      cosmetic: "Cosmetic & Aesthetic",
      eye: "Ophthalmology / Eye Care",
      ortho: "Orthopedic Procedures",
      fertility: "Fertility / IVF",
    },
    specialties: {
      eyebrow: "MEDICAL EXPERTISE",
      heading: "Specialized Care in Chandigarh",
      subheading: "Access internationally trained specialists across Chandigarh's premier tertiary medical disciplines and hospital centers.",
      viewAll: "Explore All Specialties",
      avgStay: "Avg Stay:",
      successRate: "Success Rate:",
      explore: "Explore Care Options",
    },
    doctors: {
      eyebrow: "DISTINGUISHED CLINICIANS",
      heading: "The Right Specialist Changes Everything.",
      subheading:
        "Find experienced Chandigarh specialists matched to your medical condition, preferred location, and language requirements.",
      experience: "Years Experience",
      languages: "Languages:",
      videoAvailable: "🟢 Video Consultation Available",
      viewProfile: "View Full Profile",
      requestConsult: "Request Consultation",
    },
    hospitals: {
      eyebrow: "CHANDIGARH TRICITY NETWORK",
      heading: "Premier Chandigarh Hospitals. Coordinated Around You.",
      subheading:
        "We partner exclusively with accredited quaternary care institutes in Chandigarh and Mohali equipped with advanced robotic and surgical suites.",
      exploreNetwork: "Explore Chandigarh Hospitals",
      beds: "Beds Capacity",
      surgeons: "Surgeons",
      viewDetails: "View Hospital Amenities",
    },
    cost: {
      eyebrow: "FINANCIAL CLARITY & TRUST",
      heading: "Care you can verify, costs you can plan",
      subheading:
        "Accredited hospitals, fixed quotes and human support — plus honest cost comparisons against your home country.",
      typicalStay: "Typical Hospital Stay:",
      recoveryTime: "Est. Recovery Timeline:",
      estimatedCost: "Indicative Package Range:",
      compareTitle: "Average treatment cost comparison (USD)",
      disclaimer: "Indicative package prices. Final quotes are issued by the treating hospital.",
      exploreBtn: "Calculate Custom Package Estimate",
    },
    blog: {
      eyebrow: "RESOURCES",
      heading: "Plan your treatment with confidence",
      subheading: "Guides on visas, costs, recovery and choosing the right hospital.",
      viewAll: "View All Guides & Resources",
      readTime: "min read",
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
      cta: "Explore Concierge Services",
    },
    coordinator: {
      eyebrow: "HUMAN-CENTERED CARE",
      heading: "You Never Have to Navigate It Alone.",
      languages: "Languages Spoken:",
      role: "Lead International Patient Care Coordinator",
      messageBtn: "Message Aisha Directly",
      responseSpeed: "Typical reply in < 15 minutes",
    },
    caseStudy: {
      eyebrow: "PATIENT JOURNEY STORY",
      heading: "From Dubai to Chandigarh. One Coordinated Journey.",
      subheading: "How Ahmed R. navigated complex cardiac surgery with zero stress through Vedara's dedicated concierge.",
      readMore: "Read More Patient Journeys",
    },
    opinion: {
      eyebrow: "SECOND MEDICAL OPINION",
      heading: "Not Sure Where to Begin? Start With Your Scans.",
      subheading:
        "Upload your recent MRI, CT scan, biopsy, or doctor's prescription. Our multidisciplinary panel provides an expert clinical assessment within 24-48 hours.",
      cta: "Request a Free Medical Opinion",
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
      cta: "Start My Care Journey Now",
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
      primaryBtn: "Start Your Care Journey",
      secondaryBtn: "Talk to a Care Coordinator",
      channels: "Instant assistance available via WhatsApp · Direct Phone · HD Video Consultation",
    },
    footer: {
      tagline: "India's premier international care coordination platform. Connecting global families to India's finest medical minds.",
      careHeader: "Specialized Care",
      resourcesHeader: "Patient Resources",
      companyHeader: "About Vedara",
      supportHeader: "24/7 International Desk",
      rights: "© 2026 Vedara International Care. All rights reserved.",
      medicalDisclaimer: "Vedara is a medical travel facilitation and care coordination platform. We do not provide direct medical diagnosis. Care and treatments are provided by licensed partner hospitals and clinicians.",
    },
    floatingBar: {
      whatsapp: "WhatsApp Us",
      reportReview: "Free Report Review",
      callDesk: "Call Desk",
    },
    estimatorWidget: {
      eyebrow: "INSTANT ESTIMATE",
      heading: "Medical Cost & Flight Estimator",
      step1: "1. Select Treatment & Country",
      step2: "2. View Savings & Logistics",
      step3: "3. Get Detailed Estimate",
      treatmentLabel: "Select Treatment / Procedure",
      countryLabel: "Your Home Country",
      flightTime: "Est. Flight Time",
      visaDuration: "Medical Visa (M-Visa) Processing",
      costInIndia: "Cost in India",
      costAtHome: "Cost at Home",
      savings: "Est. Savings",
      emailLabel: "Email Address",
      emailPlaceholder: "Enter your email",
      submitBtn: "Email Me This Estimate",
      successMessage: "Estimate sent successfully! Check your inbox.",
    },
    exitIntent: {
      heading: "Not ready to travel yet?",
      subheading: "Download our Free 2026 Medical Travel Guide for India (Includes Hospital Cost Comparisons & Visa Checklist).",
      nameLabel: "Your Name",
      namePlaceholder: "Enter your name",
      contactLabel: "Email or WhatsApp",
      contactPlaceholder: "Where should we send it?",
      downloadBtn: "Download Guide Now",
      successMessage: "Thank you! Your guide is on its way.",
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
      startJourney: "احصل على عرض سعر مجاني",
      talkCoordinator: "تحدث مع المنسق",
      explore: "استكشف المزيد",
      doctorsHospitals: "الأطباء والمستشفيات",
      saveBadge: "وفر ~70%",
      faqNav: "الأسئلة الشائعة",
      onlineBadge: "متاح الآن",
    },
    hero: {
      eyebrow: "رعاية المرضى الدوليين · الهند",
      headline: "رعاية طبية عالمية المستوى. منسقة خصيصاً لك.",
      subheadline:
        "من استفسارك الطبي الأول إلى استشارة كبار الاستشاريين، وتنسيق المستشفى، وتسهيل السفر والتأشيرة، والمتابعة بعد العودة — فريق متخصص يرافقك خطوة بخطوة في رحلتك إلى الهند.",
      primaryCta: "احصل على عرض سعر مجاني",
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
      transparentPricing: "تسعير شفاف ومباشر",
      dedicatedCoordinator: "منسق رعاية مخصص",
      noHiddenCosts: "بدون أي تكاليف خفية",
      verifiedHospitals: "+50 مستشفى معتمد",
      visaAssistance: "المساعدة في التأشيرة الطبية",
      saveUpTo70: "وفّر حتى 70%",
      onTreatment: "على العلاج",
      jciNabhAccredited: "معتمد من JCI و NABH",
      freeConsultation: "استشارة مجانية",
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
      submitBtn: "بدء التقييم الطبي الفوري",
      trustNote: "🔒 يتم تشفير بياناتك الطبية ومشاركتها فقط مع الاستشاريين المعتمدين لحالتك.",
    },
    journey: {
      eyebrow: "منهجية الرعاية",
      heading: "كيف تعمل رعاية فيدارا في الهند",
      subheading: "ست خطوات ميسرة ومدروسة من رسالتك الأولى حتى تمام تعافيك في بلدك — مع منسق طبي خاص يرافقك طوال الرحلة.",
      step1Title: "إرسال الاستفسار",
      step1Desc: "شارك تقاريرك الطبية واحتياجاتك العلاجية عبر استمارة آمنة وسريعة.",
      step2Title: "الاستشارة وتدقيق الوثائق",
      step2Desc: "يجمع منسقك الطبي السجلات الطبية ويتحقق من ملائمة الخيارات العلاجية.",
      step3Title: "استشارة مرئية مع الطبيب",
      step3Desc: "تحدث مباشرة مع كبار الاستشاريين المرشحين قبل اتخاذ قرار السفر.",
      step4Title: "الخطة العلاجية وتجهيز السفر",
      step4Desc: "خطة علاجية بأسعار محددة، وتأشيرة علاجية معتمدة، وجدولة المواعيد والسفر.",
      step5Title: "السفر والرعاية بالمستشفى",
      step5Desc: "استقبال بالمطار، إقامة فندقية مهيأة، مترجم خاص ومرافقة يومية بالمستشفى.",
      step6Title: "التعافي والمتابعة",
      step6Desc: "مراجعات دورية، تقارير الخروج الرقمية، ومتابعة طبية مستمرة بعد عودتك لمنزلك.",
    },
    popularTreatments: {
      eyebrow: "تخصصاتنا الرائدة",
      heading: "العلاجات الأكثر طلباً",
      subheading: "خمس خدمات طبية ذات أولوية تقدمها مستشفيات هندية معتمدة دولياً بأسعار باقات شفافة ومحددة.",
      startingFrom: "تبدأ من",
      dental: "زراعة الأسنان",
      cosmetic: "التجميل والترميم",
      eye: "طب وجراحة العيون",
      ortho: "جراحة العظام والمفاصل",
      fertility: "علاج العقم وأطفال الأنابيب",
    },
    specialties: {
      eyebrow: "الخبرات الطبية التخصصية",
      heading: "رعاية تخصصية رائدة في شانديغار",
      subheading: "نخبة من كبار الأطباء والاستشاريين ومستشفيات مدينة شانديغار الحاصلة على أعلى الاعتمادات العالمية.",
      viewAll: "عرض كافة التخصصات ←",
      avgStay: "متوسط الإقامة:",
      successRate: "نسبة النجاح:",
      explore: "استكشف خيارات العلاج ←",
    },
    doctors: {
      eyebrow: "نخبة الأطباء الاستشاريين",
      heading: "الطبيب المناسب يصنع كل الفارق.",
      subheading: "اختر من بين أمهر الجراحين والاستشاريين في شانديغار المتوافقين مع احتياجاتك ولغتك.",
      experience: "سنوات خبرة",
      languages: "اللغات:",
      videoAvailable: "🟢 استشارة مرئية متاحة عن بعد",
      viewProfile: "الملف التعريفي الكامل",
      requestConsult: "طلب استشارة طبية",
    },
    hospitals: {
      eyebrow: "شبكة مستشفيات شانديغار الكبرى",
      heading: "أرقى مستشفيات شانديغار. مهيأة لراحتك.",
      subheading: "شراكات حصرية مع كبرى المستشفيات في شانديغار وموهالي الحاصلة على الاعتمادات الدولية وتجهيزات الروبوت الجراحي.",
      exploreNetwork: "استكشف مستشفيات شانديغار ←",
      beds: "سعة الأسرة",
      surgeons: "جراح متخصص",
      viewDetails: "تفاصيل وخدمات المستشفى ←",
    },
    cost: {
      eyebrow: "شفافية التكاليف والثقة",
      heading: "رعاية موثوقة، وتكاليف واضحة ومدروسة",
      subheading: "مستشفيات معتمدة، باقات أسعار محددة، ومرافقة شخصية — مع مقارنة شفافة للتكاليف مع بلدك.",
      typicalStay: "مدة الإقامة بالمستشفى:",
      recoveryTime: "فترة التعافي المتوقعة:",
      estimatedCost: "نطاق التكلفة التقديري:",
      compareTitle: "مقارنة متوسط تكلفة العلاج (بالدولار الأمريكي)",
      disclaimer: "ملاحظة: أسعار باقات استرشادية. يتم إصدار العروض المالية النهائية من المستشفى المعالج.",
      exploreBtn: "احسب تكلفة باقتك المخصصة ←",
    },
    blog: {
      eyebrow: "دليل وإرشادات السفر الطبي",
      heading: "خطط لرحلتك العلاجية بكل ثقة",
      subheading: "أدلة شاملة حول التأشيرة العلاجية، التكاليف، فترة النقاهة واختيار المستشفى المناسب.",
      viewAll: "عرض كافة المقالات والأدلة ←",
      readTime: "دقائق للقراءة",
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
      heading: "من دبي إلى شانديغار. رحلة رعاية منسقة بالكامل.",
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
      primaryBtn: "ابدأ رحلة علاجك الآن",
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
    floatingBar: {
      whatsapp: "راسلنا واتساب",
      reportReview: "مراجعة التقارير مجاناً",
      callDesk: "اتصل بالمكتب",
    },
    estimatorWidget: {
      eyebrow: "تقدير فوري",
      heading: "حاسبة التكلفة الطبية ورحلة الطيران",
      step1: "1. اختر العلاج وبلد الإقامة",
      step2: "2. عرض التوفير والتفاصيل",
      step3: "3. احصل على التقدير المفصل",
      treatmentLabel: "اختر العلاج / الإجراء الطيبي",
      countryLabel: "بلد الإقامة",
      flightTime: "مدة الرحلة التقديرية",
      visaDuration: "استخراج التأشيرة الطبية",
      costInIndia: "التكلفة في الهند",
      costAtHome: "التكلفة في بلدك",
      savings: "التوفير التقديري",
      emailLabel: "البريد الإلكتروني",
      emailPlaceholder: "أدخل بريدك الإلكتروني",
      submitBtn: "أرسل لي هذا التقدير",
      successMessage: "تم إرسال التقدير بنجاح! راجع صندوق الوارد.",
    },
    exitIntent: {
      heading: "لست مستعداً للسفر بعد؟",
      subheading: "حمل دليل السفر الطبي المجاني لعام 2026 إلى الهند (يحتوي على مقارنات تكلفة المستشفيات وقائمة التأشيرة).",
      nameLabel: "الاسم الكريم",
      namePlaceholder: "أدخل اسمك",
      contactLabel: "البريد أو رقم الواتساب",
      contactPlaceholder: "أين نرسل الدليل؟",
      downloadBtn: "حمل الدليل الآن",
      successMessage: "شكراً لك! سيتم إرسال الدليل فوراً.",
    },
  },
};
