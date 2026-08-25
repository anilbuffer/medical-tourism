export interface Specialty {
  id: string;
  name: string;
  nameAr: string;
  icon: string;
  tagline: string;
  taglineAr: string;
  description: string;
  descriptionAr: string;
  treatmentsCount: number;
  procedures: string[];
  successRate: string;
  avgStay: string;
  image: string;
}
export interface Doctor {
  id: string;
  name: string;
  nameAr: string;
  title: string;
  titleAr: string;
  specialty: string;
  specialtyAr: string;
  experienceYears: number;
  hospital: string;
  hospitalAr: string;
  city: string;
  cityAr: string;
  rating: number;
  reviewsCount: number;
  languages: string[];
  languagesAr: string[];
  avatar: string;
  education: string;
  fellowships: string[];
  videoConsultAvailable: boolean;
  nextAvailable: string;
  bio: string;
  bioAr: string;
  consultationFeeUsd: number;
}

export interface Hospital {
  id: string;
  name: string;
  nameAr: string;
  city: string;
  cityAr: string;
  state: string;
  specialties: string[];
  specialtiesAr: string[];
  accreditations: string[];
  bedsCount: number;
  surgeonsCount: number;
  image: string;
  description: string;
  descriptionAr: string;
  internationalLounge: boolean;
  airportDistance: string;
  featured: boolean;
  rating?: number;
  reviewsCount?: number;
}

export interface TreatmentCost {
  id: string;
  name: string;
  nameAr: string;
  specialty: string;
  specialtyAr: string;
  typicalStayDays: string;
  recoveryWeeks: string;
  indiaCostUsd: { min: number; max: number };
  usCostUsd: { min: number; max: number };
  ukCostUsd: { min: number; max: number };
  uaeCostUsd: { min: number; max: number };
  inclusions: string[];
  inclusionsAr: string[];
  popular: boolean;
}

export interface PatientCaseStudy {
  id: string;
  patientName: string;
  patientNameAr: string;
  country: string;
  countryAr: string;
  flag: string;
  condition: string;
  conditionAr: string;
  specialist: string;
  hospital: string;
  timeline: {
    stage: string;
    stageAr: string;
    details: string;
    detailsAr: string;
    location: string;
  }[];
  quote: string;
  quoteAr: string;
  stats: {
    duration: string;
    consultations: string;
    coordinator: string;
    savings: string;
  };
  image: string;
}

export interface CareCoordinator {
  name: string;
  nameAr: string;
  role: string;
  roleAr: string;
  languages: string[];
  languagesAr: string[];
  avatar: string;
  quote: string;
  quoteAr: string;
  responseRate: string;
  activePatients: number;
  whatsappNumber: string;
  verifiedBadge: boolean;
}

export interface GlobalDesk {
  country: string;
  countryAr: string;
  code: string;
  flag: string;
  city: string;
  phone: string;
  whatsapp: string;
  coordinator: string;
  timeZone: string;
}

export interface FAQItem {
  id: string;
  category: "consultation" | "travel" | "cost" | "stay" | "postcare";
  question: string;
  questionAr: string;
  answer: string;
  answerAr: string;
}

// ==========================================
// DATASETS
// ==========================================

export const CARE_COORDINATOR: CareCoordinator = {
  name: "Aisha Khan",
  nameAr: "عائشة خان",
  role: "Lead International Patient Care Coordinator",
  roleAr: "كبيرة منسقي رعاية المرضى الدوليين",
  languages: ["English", "العربية (Arabic)", "Hindi", "Urdu"],
  languagesAr: ["الإنجليزية", "العربية", "الهندية", "الأردية"],
  avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
  quote: "I'll coordinate your appointments, help organize your documents, keep you informed about your next steps, and make sure you have someone caring and trusted by your side throughout your journey.",
  quoteAr: "سأقوم بتنسيق مواعيدك، ومساعدتك في تنظيم مستنداتك الطبية، وإبقائك على اطلاع دائم بخطواتك التالية، وضمان وجود فريق مخلص بجانبك طوال رحلتك إلى الهند.",
  responseRate: "< 15 Mins",
  activePatients: 42,
  whatsappNumber: "+971501234567",
  verifiedBadge: true,
};

export const SPECIALTIES: Specialty[] = [
  {
    id: "dental",
    name: "Dental Implants",
    nameAr: "طب وزراعة الأسنان",
    icon: "Smile",
    tagline: "Full-mouth restoration, All-on-4/6 implants & painless CAD/CAM dentistry",
    taglineAr: "زراعة الأسنان الكاملة، نظام All-on-4/6 وتقنيات CAD/CAM الرقمية",
    description: "Advanced digital implantology, 3D cone beam CT scanning, immediate-load zirconia crowns and full arch rehabilitation with Swiss/German implants.",
    descriptionAr: "زراعة الأسنان الرقمية ثلاثية الأبعاد، تيجان الزركونيا الفورية وإعادة تأهيل الفك بالكامل باستخدام زرعات سويسرية وألمانية معتمدة.",
    treatmentsCount: 14,
    procedures: ["All-on-4 / All-on-6 Implants", "Single & Multi-Tooth Implants", "Zirconia Crowns & Veneers", "Bone Grafting & Sinus Lift", "Full Mouth Rehabilitation"],
    successRate: "99.4%",
    avgStay: "3 - 7 Days",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "cosmetic",
    name: "Cosmetic & Aesthetic",
    nameAr: "جراحة التجميل والترميم",
    icon: "Sparkles",
    tagline: "High-definition body contouring, rhinoplasty & facial rejuvenation",
    taglineAr: "نحت القوام عالي التحديد، تجميل الأنف وتجديد شباب الوجه",
    description: "Board-certified plastic surgeons offering ultra-precise aesthetic transformations, ultrasonic liposuction, breast aesthetics, and reconstructive microsurgery.",
    descriptionAr: "نخبة من جراحي التجميل المعتمدين دولياً لنحت القوام بالموجات الصوتية، تجميل وتنسيق القوام والأنف والوجه بأحدث التقنيات الآمنة.",
    treatmentsCount: 18,
    procedures: ["Rhinoplasty (Nose Reshaping)", "High-Def VASER Liposuction", "Breast Augmentation & Lift", "Facelift & Blepharoplasty", "Tummy Tuck (Abdominoplasty)"],
    successRate: "98.8%",
    avgStay: "4 - 8 Days",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "eye-care",
    name: "Ophthalmology / Eye Care",
    nameAr: "طب وجراحة العيون والليزر",
    icon: "Eye",
    tagline: "Blade-free Contoura Vision LASIK, robotic cataract & vitreoretinal surgery",
    taglineAr: "تصحيح النظر بالفيمتو ليزك كونتورا، إزالة المياه البيضاء بالروبوت وجراحة الشبكية",
    description: "World-class eye institutes equipped with femtosecond laser platforms, robotic cataract systems with trifocal/EDOF lenses, and advanced corneal transplants.",
    descriptionAr: "مراكز عيون متقدمة مجهزة بأحدث أجهزة الليزر العالمية لتصحيح الإبصار وزراعة العدسات ثلاثية البؤرة وعلاج الشبكية والقرنية بدقة متناهية.",
    treatmentsCount: 16,
    procedures: ["Contoura Vision / SMILE LASIK", "Robotic Cataract + Trifocal Lens", "Vitreoretinal Surgery", "Corneal Cross-Linking (CXL)", "Glaucoma Valve Implants"],
    successRate: "99.5%",
    avgStay: "2 - 4 Days",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "orthopedic",
    name: "Orthopedic Procedures",
    nameAr: "جراحة العظام والمفاصل",
    icon: "Activity",
    tagline: "Sub-millimeter robotic knee & hip replacements with rapid recovery",
    taglineAr: "استبدال المفاصل بالروبوت بدقة أجزاء المليمتر والتعافي السريع",
    description: "Utilizing MAKO and CORI robotic navigation for customized joint replacements, ligament repairs, and advanced scoliosis corrections.",
    descriptionAr: "استخدام أنظمة ماكو وكوري الروبوتية المتقدمة لزراعة المفاصل ثلاثية الأبعاد بدقة فائقة واستعادة الحركة الطبيعية خلال أيام.",
    treatmentsCount: 16,
    procedures: ["Robotic Total Knee Replacement", "Anterior Hip Replacement", "Complex Revision Arthroplasty", "Scoliosis Spine Correction", "ACL / Meniscus Arthroscopy"],
    successRate: "98.9%",
    avgStay: "4 - 7 Days",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "fertility",
    name: "Fertility / IVF",
    nameAr: "علاج العقم وأطفال الأنابيب",
    icon: "Baby",
    tagline: "Advanced IVF / ICSI, high-risk fetal medicine & genetic screening",
    taglineAr: "علاج العقم وأطفال الأنابيب المتقدم، طب الأجنة والفحص الجيني PGT-A",
    description: "Pioneering reproductive medicine labs with laser-assisted hatching, PGT-A embryo genetics, and dedicated specialized fertility protocols.",
    descriptionAr: "مختبرات متطورة للحقن المجهري والفحص الجيني للأجنة قبل الغرس، ورعاية فائقة للحمل عالي الخطورة بنسب نجاح مرتفعة.",
    treatmentsCount: 12,
    procedures: ["IVF with ICSI & PGT-A", "Blastocyst Embryo Culture", "Laser-Assisted Hatching", "Egg & Sperm Cryopreservation", "Endometrial Receptivity Array (ERA)"],
    successRate: "74.8%",
    avgStay: "10 - 14 Days",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800",
  },
];

export const DOCTORS: Doctor[] = [
  {
    id: "dr-sameer-malhotra",
    name: "Dr. Sameer Malhotra",
    nameAr: "د. سمير مالهوترا",
    title: "Senior Director & Chief Implantologist — Digital Dentistry",
    titleAr: "كبير المديرين ورئيس قسم زراعة الأسنان الرقمية",
    specialty: "Dental Implants",
    specialtyAr: "طب وزراعة الأسنان",
    experienceYears: 18,
    hospital: "Fortis Hospital Chandigarh",
    hospitalAr: "مستشفى فورتيس شانديغار",
    city: "Chandigarh City",
    cityAr: "مدينة شانديغار",
    rating: 4.98,
    reviewsCount: 450,
    languages: ["English", "Hindi", "Punjabi", "Arabic (Conversational)"],
    languagesAr: ["الإنجليزية", "الهندية", "البنجابية", "العربية (محادثة)"],
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600",
    education: "BDS, MDS (Prosthodontics & Oral Implantology) — PGIMER Chandigarh & Bern University",
    fellowships: ["International Congress of Oral Implantologists (ICOI) USA", "Swiss ITI Fellow"],
    videoConsultAvailable: true,
    nextAvailable: "Tomorrow · 3:30 PM IST (2:00 PM GST)",
    bio: "Over 8,500 successful full-mouth Swiss & German implant restorations and All-on-4/6 immediate load protocols with digital 3D guided surgery for international patients.",
    bioAr: "أكثر من 8500 عملية زراعة أسنان كاملة ناجحة بنظام All-on-4/6 وتقنيات التوجيه الجراحي الرقمي ثلاثي الأبعاد للمرضى الدوليين في شانديغار.",
    consultationFeeUsd: 50,
  },
  {
    id: "dr-ananya-kapoor",
    name: "Dr. Ananya Kapoor",
    nameAr: "د. أنانيا كابور",
    title: "Chief Consultant — Plastic, Cosmetic & Reconstructive Surgery",
    titleAr: "استشارية أولى — جراحة التجميل ونحت القوام والترميم",
    specialty: "Cosmetic & Aesthetic",
    specialtyAr: "جراحة التجميل والترميم",
    experienceYears: 16,
    hospital: "Max Super Speciality Hospital Chandigarh",
    hospitalAr: "مستشفى ماكس التخصصي الفائق شانديغار",
    city: "Chandigarh City",
    cityAr: "مدينة شانديغار",
    rating: 4.97,
    reviewsCount: 390,
    languages: ["English", "Hindi", "Punjabi", "Arabic (Basic)"],
    languagesAr: ["الإنجليزية", "الهندية", "البنجابية", "العربية"],
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600",
    education: "MBBS, MS (General Surgery), M.Ch (Plastic Surgery) — AIIMS & PGIMER",
    fellowships: ["International Society of Aesthetic Plastic Surgery (ISAPS)", "Coupure Centre for Plastic Surgery, Belgium"],
    videoConsultAvailable: true,
    nextAvailable: "Wednesday · 11:00 AM IST (9:30 AM GST)",
    bio: "International authority on high-definition VASER body contouring, rhinoplasty, breast aesthetics, and facial rejuvenation for overseas patients.",
    bioAr: "خبيرة دولية في نحت القوام بالفيزر عالي الدقة، تجميل الأنف، شد الوجه وتنسيق القوام بأحدث المعايير الجراحية العالمية في مدينة شانديغار.",
    consultationFeeUsd: 70,
  },
  {
    id: "dr-vikram-oberoi",
    name: "Dr. Vikram Oberoi",
    nameAr: "د. فيكرام أوبروي",
    title: "Director — Cornea, Refractive LASIK & Robotic Cataract Surgery",
    titleAr: "مدير — طب القرنية وتصحيح النظر بالفيمتو ليزك وإزالة المياه البيضاء",
    specialty: "Ophthalmology / Eye Care",
    specialtyAr: "طب وجراحة العيون والليزر",
    experienceYears: 21,
    hospital: "Healing Super Speciality Hospital",
    hospitalAr: "مستشفى هيلينغ التخصصي شانديغار",
    city: "Chandigarh City",
    cityAr: "مدينة شانديغار",
    rating: 4.99,
    reviewsCount: 520,
    languages: ["English", "Hindi", "Punjabi", "Arabic (Fluent)"],
    languagesAr: ["الإنجليزية", "الهندية", "البنجابية", "العربية (بطلاقة)"],
    avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600",
    education: "MBBS, MS (Ophthalmology), FRCS (Glasgow) — Moorfields Eye Hospital, London",
    fellowships: ["American Academy of Ophthalmology (AAO)", "European Society of Cataract and Refractive Surgeons (ESCRS)"],
    videoConsultAvailable: true,
    nextAvailable: "Tomorrow · 5:00 PM IST (3:30 PM GST)",
    bio: "Pioneered blade-free Contoura Vision LASIK and femtosecond laser cataract surgery with premium trifocal lenses, performing over 20,000 procedures.",
    bioAr: "رائد عمليات تصحيح النظر كونتورا فيجن وفيمتو ليزك وزراعة العدسات ثلاثية البؤرة المتطورة لعلاج المياه البيضاء مع أكثر من 20,000 إجراء ناجح.",
    consultationFeeUsd: 65,
  },
  {
    id: "dr-rohan-kapoor",
    name: "Dr. Rohan Kapoor",
    nameAr: "د. روهان كابور",
    title: "Director — Robotic Joint Replacement & Sports Medicine",
    titleAr: "مدير — جراحة استبدال المفاصل بالروبوت والطب الرياضي",
    specialty: "Orthopedic Procedures",
    specialtyAr: "جراحة العظام والمفاصل",
    experienceYears: 17,
    hospital: "Paras Health Super Speciality Hospital Chandigarh",
    hospitalAr: "مستشفى باراس هيلث التخصصي شانديغار",
    city: "Chandigarh City",
    cityAr: "مدينة شانديغار",
    rating: 4.95,
    reviewsCount: 310,
    languages: ["English", "Hindi", "Punjabi"],
    languagesAr: ["الإنجليزية", "الهندية", "البنجابية"],
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600",
    education: "MBBS, MS (Ortho), M.Ch (Ortho) — UK & PGIMER",
    fellowships: ["Mayo Clinic Robotic Arthroplasty Fellow", "Endo-Klinik Hamburg Spine Fellow"],
    videoConsultAvailable: true,
    nextAvailable: "Thursday · 2:00 PM IST (12:30 PM GST)",
    bio: "Pioneer in robotic sub-millimeter knee alignment and kinematic muscle-sparing joint replacements enabling same-day ambulation for global patients in Chandigarh.",
    bioAr: "رائد في تقنيات محاذاة الركبة بالروبوت واستبدال المفاصل بالحفاظ على العضلات مما يتيح للمريض المشي في نفس يوم الجراحة في مدينة شانديغار.",
    consultationFeeUsd: 70,
  },
  {
    id: "dr-fatima-sengupta",
    name: "Dr. Fatima Al-Zahra Sengupta",
    nameAr: "د. فاطمة الزهراء سينغوبتا",
    title: "Chief Fertility Specialist & Director of Reproductive Medicine",
    titleAr: "رئيسة قسم علاج العقم وأطفال الأنابيب والطب التناسلي",
    specialty: "Fertility / IVF",
    specialtyAr: "علاج العقم وأطفال الأنابيب",
    experienceYears: 20,
    hospital: "Fortis Hospital Chandigarh",
    hospitalAr: "مستشفى فورتيس شانديغار",
    city: "Chandigarh City",
    cityAr: "مدينة شانديغار",
    rating: 4.99,
    reviewsCount: 510,
    languages: ["English", "Arabic (Fluent)", "Hindi", "Punjabi", "Bengali"],
    languagesAr: ["الإنجليزية", "العربية (بطلاقة)", "الهندية", "البنجابية", "البنغالية"],
    avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=600",
    education: "MBBS, MD (OBGYN), Fellowship in Reproductive Medicine — Royal College of Obstetricians and Gynaecologists (FRCOG), UK",
    fellowships: ["American Society for Reproductive Medicine (ASRM)", "Bourn Hall Clinic Fertility Fellow, Cambridge UK"],
    videoConsultAvailable: true,
    nextAvailable: "Tomorrow · 6:00 PM IST (4:30 PM GST)",
    bio: "Fluent Arabic speaker with over 20 years leading reproductive medicine, ICSI, and genetic PGT-A embryo screening for international families visiting Chandigarh.",
    bioAr: "تتحدث العربية بطلاقة ولديها أكثر من 20 عاماً في قيادة برامج أطفال الأنابيب والحقن المجهري والفحص الجيني للأجنة للمرضى من دول الخليج والعالم.",
    consultationFeeUsd: 80,
  },
];

export const HOSPITALS: Hospital[] = [
  {
    id: "apollo-chandigarh",
    name: "Apollo Hospitals & Clinics",
    nameAr: "مستشفيات وعيادات أبولو شانديغار",
    city: "Sector 8C, Chandigarh",
    cityAr: "القطاع 8C، شانديغار",
    state: "Chandigarh City",
    specialties: ["Orthopedics", "Cardiac", "Oncology"],
    specialtiesAr: ["جراحة العظام", "أمراض القلب", "علاج الأورام"],
    accreditations: ["JCI Accredited", "NABH Certified"],
    bedsCount: 220,
    surgeonsCount: 45,
    rating: 4.9,
    reviewsCount: 1240,
    image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=800",
    description: "Premier quaternary care facility in Chandigarh Sector 8C with advanced oncology suites, cardiac hybrid catheterization labs, and dedicated international patient care.",
    descriptionAr: "مركز رعاية متقدم في القطاع 8C في شانديغار يضم أحدث أجنحة الأورام ومختبرات القسطرة الهجينة ورعاية دولية متخصصة.",
    internationalLounge: true,
    airportDistance: "15 Mins from Chandigarh Int'l Airport (IXC)",
    featured: true,
  },
  {
    id: "fortis-chandigarh",
    name: "Fortis Hospital Mohali",
    nameAr: "مستشفى فورتيس موهالي (شانديغار)",
    city: "Mohali, Chandigarh Tricity",
    cityAr: "موهالي، شانديغار تراي سيتي",
    state: "Chandigarh Tricity Hub",
    specialties: ["IVF", "Neurology", "Dental"],
    specialtiesAr: ["أطفال الأنابيب", "جراحة الأعصاب", "طب الأسنان"],
    accreditations: ["JCI Accredited", "NABH Certified", "Green OT Certified"],
    bedsCount: 355,
    surgeonsCount: 68,
    rating: 4.8,
    reviewsCount: 980,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
    description: "Flagship JCI & NABH accredited hospital in Chandigarh Tricity featuring 11 advanced modular OT suites, dedicated robotic surgery center, and IVF fertility lab.",
    descriptionAr: "مستشفى رائد معتمد دولياً من JCI و NABH في شانديغار يضم 11 غرفة عمليات معيارية فائقة التعقيم، ومركزاً لجراحة الروبوت ومختبر أطفال أنابيب متطور.",
    internationalLounge: true,
    airportDistance: "15 Mins from Chandigarh Int'l Airport (IXC)",
    featured: true,
  },
  {
    id: "max-chandigarh",
    name: "Max Super Speciality Hospital",
    nameAr: "مستشفى ماكس التخصصي الفائق",
    city: "Mohali, Chandigarh Tricity",
    cityAr: "موهالي، شانديغار تراي سيتي",
    state: "Chandigarh Tricity Hub",
    specialties: ["Eye Care", "Cosmetic", "Orthopedics"],
    specialtiesAr: ["طب وجراحة العيون", "جراحة التجميل", "جراحة العظام"],
    accreditations: ["NABH Accredited", "NABL Certified", "ISO 9001:2015"],
    bedsCount: 230,
    surgeonsCount: 52,
    rating: 4.8,
    reviewsCount: 860,
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800",
    description: "Multi-class tertiary healthcare institution in Chandigarh equipped with TrueBeam Linac, Da Vinci Xi surgical robot, and ophthalmology & cosmetic surgical units.",
    descriptionAr: "صرح طبي متقدم متعدد الفئات في شانديغار مجهز بتقنية الترو بيم لعلاج الأورام الدقيق، وجراحة دافنشي الروبوتية، ووحدات تجميل وعيون متطورة.",
    internationalLounge: true,
    airportDistance: "20 Mins from Chandigarh Int'l Airport (IXC)",
    featured: true,
  },
  {
    id: "healing-chandigarh",
    name: "Healing Super Speciality Hospital",
    nameAr: "مستشفى هيلينغ التخصصي الفائق",
    city: "Sector 34, Chandigarh",
    cityAr: "القطاع 34، شانديغار",
    state: "Chandigarh Central (Sector 34)",
    specialties: ["Transplant", "Fertility", "Spine"],
    specialtiesAr: ["زراعة الأعضاء", "علاج العقم", "جراحة العمود الفقري"],
    accreditations: ["NABH Accredited", "ISO Certified", "Patient Safety Certified"],
    bedsCount: 150,
    surgeonsCount: 42,
    rating: 4.7,
    reviewsCount: 720,
    image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=800",
    description: "Boutique multi-specialty tertiary center located in Chandigarh (Sector 34), recognized for high-touch personalized doctor attention and rapid recovery minimally invasive surgery.",
    descriptionAr: "مستشفى تخصصي راقٍ في قلب مدينة شانديغار (القطاع 34) يشتهر بالرعاية الفردية الفائقة، وجراحات المناظير والعمود الفقري المتطورة.",
    internationalLounge: true,
    airportDistance: "18 Mins from Chandigarh Int'l Airport (IXC)",
    featured: true,
  },
  {
    id: "eden-chandigarh",
    name: "Eden Critical Care & Multi-Speciality Hospital",
    nameAr: "مستشفى إيدن للرعاية الحرجة والتخصصات المتعددة",
    city: "Industrial Area Phase 1, Chandigarh",
    cityAr: "المنطقة الصناعية المرحلة 1، شانديغار",
    state: "Chandigarh City",
    specialties: ["Critical Care & Trauma", "Neurosurgery", "Interventional Cardiology", "General Surgery"],
    specialtiesAr: ["العناية الحرجة والطوارئ", "جراحة الأعصاب", "القسطرة التداخلية", "الجراحة العامة والمناظير"],
    accreditations: ["NABH Accredited", "NABL Certified"],
    bedsCount: 150,
    surgeonsCount: 40,
    rating: 4.7,
    reviewsCount: 540,
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800",
    description: "Advanced emergency, critical care, and trauma management institute in Chandigarh offering 24/7 dedicated stroke teams, neuro-vascular catheterization labs, and private inpatient rooms.",
    descriptionAr: "معهد متطور لإدارة الطوارئ والرعاية الحرجة والحوادث في شانديغار يضم فرق علاج السكتات الدماغية على مدار الساعة، ومختبرات القسطرة العصبية والوعائية.",
    internationalLounge: false,
    airportDistance: "12 Mins from Chandigarh Int'l Airport (IXC)",
    featured: false,
  },
];

export const TREATMENT_COSTS: TreatmentCost[] = [
  {
    id: "knee-replacement",
    name: "Total Knee Replacement (Robotic)",
    nameAr: "استبدال مفصل الركبة بالكامل (بالروبوت)",
    specialty: "Orthopedic Procedures",
    specialtyAr: "جراحة العظام والمفاصل",
    typicalStayDays: "4 – 7 Days",
    recoveryWeeks: "3 – 5 Weeks",
    indiaCostUsd: { min: 3800, max: 8500 },
    usCostUsd: { min: 38000, max: 49000 },
    ukCostUsd: { min: 15000, max: 21000 },
    uaeCostUsd: { min: 18000, max: 24000 },
    inclusions: [
      "FDA-approved US-imported Titanium/Oxinium Implant",
      "Robotic surgical navigation system fees",
      "4–5 days private deluxe hospital stay",
      "Pre-operative diagnostics & physiotherapy sessions",
      "Airport VIP transfers & dedicated care concierge",
    ],
    inclusionsAr: [
      "مفصل صناعي أمريكي معتمد من التيتانيوم/الأوكسينيوم",
      "رسوم الملاحة الجراحية الروبوتية المتقدمة",
      "إقامة 4-5 أيام في غرفة خاصة فاخرة بالمستشفى",
      "الفحوصات الشاملة وجلسات العلاج الطبيعي التأهيلي",
      "استقبال وتوديع VIP في المطار ومرافق خاص",
    ],
    popular: true,
  },
  {
    id: "hip-replacement",
    name: "Total Hip Replacement (Robotic / Anterior)",
    nameAr: "استبدال مفصل الورك بالكامل (بالروبوت)",
    specialty: "Orthopedic Procedures",
    specialtyAr: "جراحة العظام والمفاصل",
    typicalStayDays: "4 – 7 Days",
    recoveryWeeks: "4 – 6 Weeks",
    indiaCostUsd: { min: 4000, max: 8000 },
    usCostUsd: { min: 35000, max: 48000 },
    ukCostUsd: { min: 16000, max: 22000 },
    uaeCostUsd: { min: 17000, max: 23000 },
    inclusions: [
      "High-durability Ceramic/Titanium bearing surface",
      "Minimally invasive muscle-sparing approach",
      "Private inpatient room & 24/7 specialized nursing",
      "Rehabilitation & gait training therapy",
      "Comprehensive post-discharge follow-up",
    ],
    inclusionsAr: [
      "مفصل سيراميك وتيتانيوم فائق المتانة ومطابق للمواصفات الدولية",
      "تقنية طفيفة التوغل مع الحفاظ على العضلات وسرعة المشي",
      "إقامة في غرفة خاصة مع رعاية تمريضية متخصصة 24/7",
      "جلسات تأهيل حركي وتدريب على المشي الطبيعي",
      "متابعة دورية عن بعد بعد العودة للوطن",
    ],
    popular: true,
  },
  {
    id: "ivf-icsi",
    name: "Advanced IVF + ICSI Cycle",
    nameAr: "دورة علاج العقم وأطفال الأنابيب مع الحقن المجهري",
    specialty: "Fertility / IVF",
    specialtyAr: "علاج العقم وأطفال الأنابيب",
    typicalStayDays: "Outpatient (14–21 days total stay in India)",
    recoveryWeeks: "1 – 2 Weeks",
    indiaCostUsd: { min: 3000, max: 5000 },
    usCostUsd: { min: 20000, max: 30000 },
    ukCostUsd: { min: 9500, max: 15000 },
    uaeCostUsd: { min: 10000, max: 15500 },
    inclusions: [
      "Complete hormonal profiling & follicular monitoring",
      "Ultrasound-guided ovum pick-up (OPU) procedure",
      "Advanced ICSI micro-fertilization & blastocyst culture",
      "Laser-assisted hatching & embryo transfer",
      "Dedicated coordinator & multilingual clinic companion",
    ],
    inclusionsAr: [
      "فحص الهرمونات الشامل ومتابعة التبويض الدقيقة",
      "عملية سحب البويضات والتلقيح المجهري ICSI المتقدم",
      "زراعة الأجنة لمرحلة الكيسة الأريمية وثقب الليزر",
      "نقل الأجنة وتوفير أدوية الدعم الهرموني",
      "مرافقة شخصية ومترجمة خاصة في كافة المواعيد",
    ],
    popular: true,
  },
  {
    id: "dental-implant",
    name: "Single Dental Implant (Osstem / Nobel / Straumann)",
    nameAr: "زراعة الأسنان الفردية (زرعات كورية وسويسرية معتمدة)",
    specialty: "Dental Implants",
    specialtyAr: "طب وزراعة الأسنان",
    typicalStayDays: "3 – 5 Days",
    recoveryWeeks: "1 – 2 Weeks (Osseointegration ongoing)",
    indiaCostUsd: { min: 300, max: 1200 },
    usCostUsd: { min: 3000, max: 5000 },
    ukCostUsd: { min: 2100, max: 3200 },
    uaeCostUsd: { min: 2200, max: 3400 },
    inclusions: [
      "3D CBCT cone-beam digital volumetric scan",
      "Premium Titanium implant fixture (Osstem / Straumann / Nobel Biocare)",
      "Custom titanium abutment & CAD/CAM Zirconia crown",
      "Painless computerized anesthesia system",
      "Lifetime global manufacturer warranty certificate",
    ],
    inclusionsAr: [
      "أشعة مقطعية ثلاثية الأبعاد CBCT لتحديد مكان الزرعة بدقة",
      "زرعة تيتانيوم أصلية (Osstem الكورية أو Straumann السويسرية)",
      "دعامة تيتانيوم مخصصة وتاج زركونيا رقمي CAD/CAM",
      "نظام تخدير موضعي محوسب بدون أي ألم",
      "شهادة ضمان دولية مدى الحياة للزرعة",
    ],
    popular: true,
  },
  {
    id: "full-mouth-rehab",
    name: "Full-Mouth Rehabilitation (All-on-4 / All-on-6)",
    nameAr: "إعادة تأهيل الفم والفكين بالكامل (All-on-4 / All-on-6)",
    specialty: "Dental Implants",
    specialtyAr: "طب وزراعة الأسنان",
    typicalStayDays: "7 – 10 Days",
    recoveryWeeks: "2 – 4 Weeks",
    indiaCostUsd: { min: 4000, max: 12000 },
    usCostUsd: { min: 25000, max: 50000 },
    ukCostUsd: { min: 14000, max: 22000 },
    uaeCostUsd: { min: 15000, max: 24000 },
    inclusions: [
      "Dual-arch 3D digital smile design & CBCT mapping",
      "4 to 6 Swiss/German titanium implants per arch",
      "Immediate-load temporary bridge + final monolithic Zirconia arch",
      "Digital occlusion balancing & bite alignment",
      "Airport chauffeur & bilingual dental care assistant",
    ],
    inclusionsAr: [
      "تصميم الابتسامة الرقمي ثلاثي الأبعاد وتخطيط كامل الفكين",
      "4 إلى 6 زرعات سويسرية/ألمانية لكل فك",
      "تركيب جسر مؤقت فوري + القوس الدائم من الزركونيا الصلب",
      "موازنة العضة وضبط الإطباق الرقمي بدقة",
      "سائق خاص ومساعد مرافق يتحدث العربية طوال العلاج",
    ],
    popular: true,
  },
  {
    id: "lasik-surgery",
    name: "Blade-Free Contoura Vision / SMILE LASIK (Both Eyes)",
    nameAr: "تصحيح النظر بالفيمتو ليزك كونتورا فيجن (للعينين)",
    specialty: "Ophthalmology / Eye Care",
    specialtyAr: "طب وجراحة العيون والليزر",
    typicalStayDays: "Outpatient (Same-Day)",
    recoveryWeeks: "3 – 5 Days",
    indiaCostUsd: { min: 900, max: 2000 },
    usCostUsd: { min: 4000, max: 5500 },
    ukCostUsd: { min: 3000, max: 4200 },
    uaeCostUsd: { min: 2800, max: 4000 },
    inclusions: [
      "Topolyzer corneal topography mapping (22,000 elevation points)",
      "Femtosecond blade-free corneal flap or lenticule extraction",
      "Custom wavefront-guided excimer laser correction",
      "Complete post-op medication bundle & protective eyewear",
      "Post-procedure clarity verification checkups",
    ],
    inclusionsAr: [
      "رسم تضاريس القرنية بدقة 22,000 نقطة قياس ليزرية",
      "إجراء ليزر خالي تماماً من الشفرات الجراحية",
      "تصحيح مخصص عالي الدقة بموجات الواجهة الضوئية",
      "حقيبة قطرات وأدوية ما بعد الليزر ونظارات واقية خاصة",
      "فحوصات التأكد من حدة الإبصار وملاءمة السفر الجوي",
    ],
    popular: true,
  },
  {
    id: "cataract-surgery",
    name: "Robotic Cataract Surgery (Per Eye, Trifocal/EDOF Lens)",
    nameAr: "جراحة إزالة المياه البيضاء بالروبوت مع عدسة ثلاثية البؤرة",
    specialty: "Ophthalmology / Eye Care",
    specialtyAr: "طب وجراحة العيون والليزر",
    typicalStayDays: "Outpatient",
    recoveryWeeks: "1 Week",
    indiaCostUsd: { min: 400, max: 1900 },
    usCostUsd: { min: 3500, max: 4800 },
    ukCostUsd: { min: 3000, max: 4200 },
    uaeCostUsd: { min: 2800, max: 3800 },
    inclusions: [
      "Femtosecond laser-assisted capsulotomy & lens fragmentation",
      "US FDA-approved hydrophobic trifocal / EDOF premium IOL",
      "Optical biometry & anterior segment OCT mapping",
      "Day-care recovery suite with dedicated nurse",
      "Next-day slit lamp review & travel clearance",
    ],
    inclusionsAr: [
      "تفتيت المياه البيضاء بفيمتو ليزر الروبوتي فائق الدقة",
      "زراعة عدسة ثلاثية البؤرة / EDOF أمريكية معتمدة للرؤية القريبة والبعيدة",
      "قياسات العين البصرية المتقدمة وأشعة OCT للقطاع الأمامي",
      "جناح رعاية نهارية خاص مع ممرض مخصص",
      "فحص المصباح الشقي في اليوم التالي ومنح شهادة السفر",
    ],
    popular: true,
  },
  {
    id: "rhinoplasty",
    name: "Advanced Rhinoplasty (Nose Reshaping & Reconstruction)",
    nameAr: "تجميل وترميم الأنف المتقدم (Rhinoplasty)",
    specialty: "Cosmetic & Aesthetic",
    specialtyAr: "جراحة التجميل والترميم",
    typicalStayDays: "4 – 5 Days",
    recoveryWeeks: "1 – 2 Weeks (Final results 6–12 months)",
    indiaCostUsd: { min: 1000, max: 2200 },
    usCostUsd: { min: 8000, max: 14000 },
    ukCostUsd: { min: 6500, max: 9500 },
    uaeCostUsd: { min: 6800, max: 10500 },
    inclusions: [
      "3D Morphing aesthetic simulation & airway endoscopy",
      "Open/closed structural rhinoplasty with ultrasonic Piezo sculpting",
      "Private hospital room & 24h nursing observation",
      "Custom thermoplastic nasal splint & internal silicone splints",
      "Splint removal, lymphatic drainage advice & fit-to-fly clearance",
    ],
    inclusionsAr: [
      "محاكاة رقمية ثلاثية الأبعاد للنتيجة وتنظير مجرى التنفس",
      "جراحة تجميل ونحت عظام الأنف بالموجات فوق الصوتية (Piezo)",
      "غرفة خاصة بالمستشفى وملاحظة تمريضية على مدار 24 ساعة",
      "جبيرة حرارية مخصصة ودعامات سيليكون داخلية مريحة",
      "إزالة الجبيرة وإرشادات تصريف السوائل ومنح تصريح الطيران",
    ],
    popular: true,
  },
  {
    id: "liposuction",
    name: "High-Definition VASER Liposuction (Body Contouring)",
    nameAr: "نحت القوام وتنسيق الجسم بالفيزر عالي الدقة (VASER)",
    specialty: "Cosmetic & Aesthetic",
    specialtyAr: "جراحة التجميل والترميم",
    typicalStayDays: "3 – 5 Days",
    recoveryWeeks: "1 – 2 Weeks",
    indiaCostUsd: { min: 1200, max: 4200 },
    usCostUsd: { min: 7500, max: 13000 },
    ukCostUsd: { min: 5500, max: 8500 },
    uaeCostUsd: { min: 6000, max: 9500 },
    inclusions: [
      "Ultrasound VASER probe fat emulsification technology",
      "Targeted abdominal / flank / athletic line etching",
      "1–2 nights inpatient stay in private recovery suite",
      "Custom medical-grade compression garment (Stage 1 & 2)",
      "Lymphatic drainage massage session & nurse follow-up",
    ],
    inclusionsAr: [
      "إذابة الدهون بالموجات فوق الصوتية (VASER) للحفاظ على الأنسجة",
      "نحت وإبراز عضلات البطن والخصر والمناطق المستهدفة",
      "إقامة ليلة إلى ليلتين في جناح تعافي خاص بالمستشفى",
      "مشد طبي مخصص عالي الجودة للضغط وتسريع الشفاء",
      "جلسة تدليك تصريف لمفاوي ومتابعة تمريضية مستمرة",
    ],
    popular: false,
  },
  {
    id: "tummy-tuck",
    name: "Tummy Tuck (Abdominoplasty with Muscle Repair)",
    nameAr: "شد ترهلات البطن وإصلاح عضلات الجدار البطني",
    specialty: "Cosmetic & Aesthetic",
    specialtyAr: "جراحة التجميل والترميم",
    typicalStayDays: "4 – 6 Days",
    recoveryWeeks: "2 Weeks",
    indiaCostUsd: { min: 1500, max: 3500 },
    usCostUsd: { min: 9000, max: 16000 },
    ukCostUsd: { min: 7000, max: 11000 },
    uaeCostUsd: { min: 7500, max: 12000 },
    inclusions: [
      "Full abdominoplasty with diastasis recti muscle plication",
      "Umbilical transposition & low-bikini scar placement",
      "2–3 nights private deluxe hospital recovery",
      "Post-operative surgical drains & specialized compression garment",
      "Scar optimization protocol & travel clearance",
    ],
    inclusionsAr: [
      "شد ترهلات البطن الكامل مع تقريب وشد عضلات الجدار البطني",
      "إعادة موضعة السرة بدقة وتحديد مسار الجرح أسفل خط البيكيني",
      "إقامة 2-3 ليالٍ في غرفة خاصة ديلوكس للتعافي المريح",
      "مشد ضاغط طبي ورعاية علاجية للوقاية من التورم",
      "بروتوكول تحسين مظهر الندبات ومنح شهادة ملاءمة الطيران",
    ],
    popular: false,
  },
];

export const PATIENT_CASE_STUDIES: PatientCaseStudy[] = [
  {
    id: "tariq-kuwait",
    patientName: "Tariq Al-Mutawa",
    patientNameAr: "طارق المطوع",
    country: "Kuwait",
    countryAr: "دولة الكويت",
    flag: "🇰🇼",
    condition: "Severe Bilateral Knee Osteoarthritis & Mobility Loss",
    conditionAr: "خشونة متقدمة في مفصلي الركبة وصعوبة بالغة في المشي",
    specialist: "Dr. Rohan Kapoor",
    hospital: "Paras Health Super Speciality Hospital, Chandigarh",
    timeline: [
      {
        stage: "Day 01 · Kuwait City",
        stageAr: "اليوم 01 · مدينة الكويت",
        details: "Uploaded knee X-rays and MRI scans to Vedara portal. Received comprehensive robotic arthroplasty plan from Dr. Rohan Kapoor within 12 hours.",
        detailsAr: "رفع صور الأشعة والرنين المغناطيسي عبر منصة فيدارا، وتلقي خطة زراعة المفاصل بالروبوت من الدكتور روهان كابور خلال 12 ساعة.",
        location: "Kuwait City, Kuwait",
      },
      {
        stage: "Day 03 · Tele-Consultation",
        stageAr: "اليوم 03 · استشارة مرئية",
        details: "Live video session with Dr. Rohan Kapoor and care coordinator Aisha Khan to review sub-millimeter implant alignment and rapid-recovery protocol.",
        detailsAr: "جلسة فيديو مباشرة مع الدكتور روهان والمنسقة عائشة خان لشرح تقنية الروبوت وبرنامج التعافي السريع.",
        location: "Online Video",
      },
      {
        stage: "Day 06 · Arrival at Chandigarh (IXC)",
        stageAr: "اليوم 06 · الوصول إلى شانديغار",
        details: "VIP tarmac assistance at Chandigarh Int'l Airport (IXC), expedited Medical Visa clearance, and chauffeured transfer to Paras Health Hospital.",
        detailsAr: "استقبال VIP في مطار شانديغار الدولي وتسهيل إجراءات التأشيرة الطبية، والنقل بسيارة خاصة إلى مستشفى باراس هيلث.",
        location: "Chandigarh City, India",
      },
      {
        stage: "Day 08 · Robotic Joint Replacement",
        stageAr: "اليوم 08 · الجراحة الروبوتية المتقدمة",
        details: "Sub-millimeter robotic total knee replacement with muscle-sparing technique. Up and walking with walker assistance 6 hours post-surgery.",
        detailsAr: "استبدال المفصل بالروبوت بدقة أجزاء المليمتر والحفاظ على العضلات. والتمكن من الوقوف والمشي بمساعدة بعد 6 ساعات فقط.",
        location: "Paras Health Chandigarh",
      },
      {
        stage: "Day 12 · Discharge & Recovery Suite",
        stageAr: "اليوم 12 · الخروج وجناح التعافي",
        details: "Transferred to partner 5-star long-stay hotel suite with daily in-room physiotherapy and gait training exercises.",
        detailsAr: "الانتقال إلى جناح فندقي فاخر 5 نجوم مخصص للتعافي مع جلسات علاج طبيعي يومية وتدريب على صعود السلالم.",
        location: "Chandigarh City",
      },
      {
        stage: "Day 16 · Safe Return to Kuwait",
        stageAr: "اليوم 16 · العودة السالمة للكويت",
        details: "Fit-to-fly certificate issued. Tele-rehab schedule synced with local orthopedic physiotherapist in Kuwait.",
        detailsAr: "إصدار شهادة السفر، ومزامنة جدول التأهيل الحركي عن بعد مع أخصائي العلاج الطبيعي في الكويت.",
        location: "Kuwait City, Kuwait",
      },
    ],
    quote: "I had struggled with severe knee pain for over 5 years. Having Aisha Khan manage every hospital appointment, private suite, and driver in Chandigarh gave my family total peace of mind. I was walking stairs without pain by Day 10.",
    quoteAr: "عانيت من آلام الركبة الشديدة لأكثر من 5 سنوات. وجود منسقة الرعاية عائشة خان وتنسيقها لكل تفاصيل المستشفى والإقامة الفندقية في شانديغار وفر لعائلتي الراحة التامة. استطعت صعود الدرج بدون ألم خلال 10 أيام فقط.",
    stats: {
      duration: "16 Days Total",
      consultations: "3 Specialist Sessions",
      coordinator: "1 Dedicated Facilitator",
      savings: "78% vs. Private Gulf/UK Care",
    },
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "grace-kenya",
    patientName: "Grace M.",
    patientNameAr: "غريس م.",
    country: "Kenya",
    countryAr: "كينيا",
    flag: "🇰🇪",
    condition: "Full-Mouth Dental Restoration & Zirconia Implants",
    conditionAr: "إعادة تأهيل وزراعة كامل الأسنان بتيجان الزركونيا الرقمية",
    specialist: "Dr. Sameer Malhotra",
    hospital: "Fortis Hospital Chandigarh",
    timeline: [
      {
        stage: "Week 1 · Nairobi",
        stageAr: "الأسبوع 1 · نيروبي",
        details: "Submitted dental OPG scans and photos via Vedara portal. Received 3D digital smile design plan and fixed estimate in 24 hours.",
        detailsAr: "إرسال صور الأشعة البانورامية للأسنان عبر المنصة وتلقي خطة تصميم الابتسامة ثلاثية الأبعاد وتقدير التكلفة الثابت.",
        location: "Nairobi, Kenya",
      },
      {
        stage: "Week 2 · Chandigarh",
        stageAr: "الأسبوع 2 · شانديغار",
        details: "Completed All-on-6 digital guided implant placement with painless computerized anesthesia and immediate provisional bridge.",
        detailsAr: "إجراء زراعة الأسنان الرقمية الموجهة بنظام All-on-6 بالتخدير غير المؤلم وتركيب الجسر المؤقت الفوري.",
        location: "Fortis Hospital Chandigarh",
      },
      {
        stage: "Week 3 · Final Zirconia & Return",
        stageAr: "الأسبوع 3 · التركيب النهائي والعودة",
        details: "Precision CAD/CAM Zirconia arch fixed with perfect bite alignment. Returned home smiling with full chewing function.",
        detailsAr: "تثبيت جسر الزركونيا الدائم عالي المتانة بمطابقة تامة للعضة الطبيعية والعودة للوطن بابتسامة مشرقة.",
        location: "Nairobi, Kenya",
      },
    ],
    quote: "Getting full-mouth implants in the UK or US was completely out of budget. In Chandigarh, Dr. Sameer Malhotra used Swiss implants and digital technology at a quarter of the price. The care was extraordinary.",
    quoteAr: "كانت تكلفة زراعة كامل الأسنان في بريطانيا أو أمريكا تفوق ميزانيتي بمراحل. في شانديغار، استخدم الدكتور سمير زرعات سويسرية وتقنيات رقمية فائقة بربع التكلفة. الرعاية كانت استثنائية بكل المقاييس.",
    stats: {
      duration: "10 Days Total",
      consultations: "4 Sessions",
      coordinator: "1 Dedicated Facilitator",
      savings: "76% vs. US/UK Dental Care",
    },
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
  },
];

export interface TrustedCountry {
  code: string;
  name: string;
  nameAr: string;
  flag: string;
  fullName: string;
  dialCode: string;
}

export const TRUSTED_COUNTRIES: TrustedCountry[] = [
  { code: "GB", name: "UK", nameAr: "المملكة المتحدة", flag: "🇬🇧", fullName: "United Kingdom", dialCode: "+44" },
  { code: "CA", name: "Canada", nameAr: "كندا", flag: "🇨🇦", fullName: "Canada", dialCode: "+1" },
  { code: "AU", name: "Australia", nameAr: "أستراليا", flag: "🇦🇺", fullName: "Australia", dialCode: "+61" },
  { code: "AE", name: "UAE", nameAr: "الإمارات", flag: "🇦🇪", fullName: "United Arab Emirates", dialCode: "+971" },
  { code: "SA", name: "Saudi Arabia", nameAr: "المملكة العربية السعودية", flag: "🇸🇦", fullName: "Saudi Arabia", dialCode: "+966" },
  { code: "QA", name: "Qatar", nameAr: "قطر", flag: "🇶🇦", fullName: "Qatar", dialCode: "+974" },
  { code: "OM", name: "Oman", nameAr: "سلطنة عمان", flag: "🇴🇲", fullName: "Oman", dialCode: "+968" },
];

export const GLOBAL_DESKS: GlobalDesk[] = [
  {
    country: "United Kingdom",
    countryAr: "المملكة المتحدة",
    code: "GBR",
    flag: "🇬🇧",
    city: "London",
    phone: "+44 20 7946 VEDARA",
    whatsapp: "+447400123456",
    coordinator: "Sarah Jenkins",
    timeZone: "GMT (UTC+0)",
  },
  {
    country: "Canada",
    countryAr: "كندا",
    code: "CAN",
    flag: "🇨🇦",
    city: "Toronto & Vancouver",
    phone: "+1 416 800 VEDARA",
    whatsapp: "+14165550198",
    coordinator: "David Miller",
    timeZone: "EST (UTC-5)",
  },
  {
    country: "Australia",
    countryAr: "أستراليا",
    code: "AUS",
    flag: "🇦🇺",
    city: "Sydney & Melbourne",
    phone: "+61 2 8000 VEDARA",
    whatsapp: "+61400123456",
    coordinator: "Emma Thompson",
    timeZone: "AEST (UTC+10)",
  },
  {
    country: "United Arab Emirates",
    countryAr: "دولة الإمارات العربية المتحدة",
    code: "UAE",
    flag: "🇦🇪",
    city: "Dubai & Abu Dhabi",
    phone: "+971 4 800 VEDARA",
    whatsapp: "+971501234567",
    coordinator: "Aisha Khan",
    timeZone: "GST (UTC+4)",
  },
  {
    country: "Saudi Arabia",
    countryAr: "المملكة العربية السعودية",
    code: "KSA",
    flag: "🇸🇦",
    city: "Riyadh & Jeddah",
    phone: "+966 11 800 VEDARA",
    whatsapp: "+966501234567",
    coordinator: "Faisal Al-Harbi",
    timeZone: "AST (UTC+3)",
  },
  {
    country: "Qatar",
    countryAr: "دولة قطر",
    code: "QAT",
    flag: "🇶🇦",
    city: "Doha",
    phone: "+974 4400 VEDARA",
    whatsapp: "+97455012345",
    coordinator: "Nasser Al-Kuwari",
    timeZone: "AST (UTC+3)",
  },
  {
    country: "Sultanate of Oman",
    countryAr: "سلطنة عمان",
    code: "OMN",
    flag: "🇴🇲",
    city: "Muscat",
    phone: "+968 24 800 VEDARA",
    whatsapp: "+96890123456",
    coordinator: "Fatima Al-Hassan",
    timeZone: "GST (UTC+4)",
  },
];

export const FAQ_LIST: FAQItem[] = [
  {
    id: "faq-1",
    category: "consultation",
    question: "Can I speak directly with the Indian doctor before traveling?",
    questionAr: "هل يمكنني التحدث مباشرة مع الطبيب الاستشاري في الهند قبل السفر؟",
    answer: "Yes, absolutely. Once our clinical team reviews your medical scans, we arrange a private high-definition video consultation with the senior specialist. You can discuss the treatment strategy, expected recovery time, and ask any questions with your family present.",
    answerAr: "نعم بالتأكيد. بمجرد مراجعة تقاريرك الطبية من قبل فريقنا، نقوم بتنسيق استشارة مرئية عالية الدقة مباشرة مع الطبيب الاستشاري للإجابة على كافة أسئلتكم ومناقشة الخطة العلاجية قبل اتخاذ أي قرار.",
  },
  {
    id: "faq-2",
    category: "travel",
    question: "Do I need to travel to India before getting a medical opinion?",
    questionAr: "هل يجب علي السفر إلى الهند للحصول على الرأي الطبي المعتمد؟",
    answer: "No. You can securely upload your MRI, CT scans, blood reports, or discharge summaries right on this platform. Our medical board and affiliated super-specialists will review them remotely and provide a detailed second opinion report within 24 to 48 hours.",
    answerAr: "لا داعي للسفر أبداً في البداية. يمكنك رفع تقاريرك الطبية والأشعة مباشرة وبشكل آمن عبر موقعنا، وسيقوم مجلسنا الطبي وكبار الاستشاريين بمراجعتها وإرسال تقرير الرأي الطبي الشامل خلال 24 إلى 48 ساعة.",
  },
  {
    id: "faq-3",
    category: "travel",
    question: "Can my family members or attendants travel with me?",
    questionAr: "هل يمكن لأفراد عائلتي أو مرافقيني السفر معي إلى الهند؟",
    answer: "Yes. The Indian Government grants Medical Attendant Visas (MEDX) for up to two companions per patient. Vedara issues official hospital invitation letters for you and your attendants to ensure priority visa stamping within 48 to 72 hours.",
    answerAr: "نعم بكل تأكيد. تمنح حكومة الهند تأشيرات مرافقة طبية (MEDX) لمرافقين اثنين لكل مريض. وتقوم فيدارا بإصدار خطابات الدعوة الرسمية المعتمدة من المستشفى لضمان إصدار التأشيرة بأولوية خلال 48 إلى 72 ساعة.",
  },
  {
    id: "faq-4",
    category: "travel",
    question: "Can you arrange airport pickup and local transportation in India?",
    questionAr: "هل تقومون بترتيب الاستقبال في المطار والنقل الداخلي في الهند؟",
    answer: "Yes. Our concierge team coordinates VIP tarmac airport pickup, seamless ambulance transfer (if medically required), or private chauffeur services between the airport, your hotel, and the hospital throughout your entire stay.",
    answerAr: "نعم. يتولى فريق الكونسيرج لدينا استقبالكم من بوابة المطار، وتوفير سيارة إسعاف مجهزة (إذا لزم الأمر طبياً) أو سيارة خاصة مع سائق للتنقل بين المطار والفندق والمستشفى طوال فترة إقامتكم.",
  },
  {
    id: "faq-5",
    category: "cost",
    question: "Can I get an exact treatment cost estimate before traveling?",
    questionAr: "هل يمكنني الحصول على تقدير دقيق لتكاليف العلاج قبل السفر؟",
    answer: "Yes. Based on your submitted medical records, we provide an itemized indicative cost package covering surgeon fees, hospital stay, implants, ICU days, and diagnostics. Final billing is settled directly with the hospital with total transparency and zero hidden agency markups.",
    answerAr: "نعم. بناءً على التقارير الطبية المقدمة، نقدم لكم باقة تقديرية مفصلة تشمل أتعاب الجراح، وتكلفة الإقامة بالمستشفى، والغرسات الطبية، والعناية المركزة، والفحوصات، وتتم التسوية مباشرة مع المستشفى دون أي رسوم مخفية.",
  },
  {
    id: "faq-6",
    category: "postcare",
    question: "What happens after I return home? How is continuity of care maintained?",
    questionAr: "ماذا يحدث بعد عودتي إلى بلدي؟ وكيف تتم متابعة حالتي الصحية؟",
    answer: "Your care coordinator synchronizes your full digital health records, surgery discharge notes, and imaging. We schedule follow-up telemedicine consultations at 30, 90, and 180 days, and coordinate with your local hometown doctor whenever required.",
    answerAr: "يقوم منسق الرعاية بمزامنة كافة تقاريرك الطبية وتقرير الخروج بدقة. وننظم لك استشارات مرئية للمتابعة بعد 30 و 90 و 180 يوماً مع الجراح المعالج، بالإضافة إلى التنسيق مع طبيبك المحلي في بلدك.",
  },
];
