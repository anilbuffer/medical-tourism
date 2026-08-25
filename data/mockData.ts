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
    specialty: "Orthopedics & Joint Replacement",
    specialtyAr: "طب العظام والمفاصل",
    typicalStayDays: "4 – 7 Days",
    recoveryWeeks: "3 – 5 Weeks",
    indiaCostUsd: { min: 3800, max: 5800 },
    usCostUsd: { min: 38000, max: 52000 },
    ukCostUsd: { min: 18000, max: 24000 },
    uaeCostUsd: { min: 19000, max: 26000 },
    inclusions: [
      "FDA-approved US-imported Titanium/Oxinium Implant",
      "Robotic surgical navigation system fees",
      "4–5 days private room hospital stay",
      "Pre-operative diagnostics & physiotherapy sessions",
      "Airport VIP transfers & dedicated care concierge",
    ],
    inclusionsAr: [
      "مفصل صناعي أمريكي معتمد من التيتانيوم/الأوكسينيوم",
      "رسوم الملاحة الجراحية الروبوتية المتقدمة",
      "إقامة 4-5 أيام في غرفة خاصة بالمستشفى",
      "الفحوصات الشاملة وجلسات العلاج الطبيعي التأهيلي",
      "استقبال وتوديع VIP في المطار ومرافق خاص",
    ],
    popular: true,
  },
  {
    id: "cardiac-cabg",
    name: "Coronary Artery Bypass Grafting (CABG)",
    nameAr: "جراحة مجازة الشريان التاجي (قلب مفتوح / نابض)",
    specialty: "Cardiac Sciences",
    specialtyAr: "علوم القلب",
    typicalStayDays: "7 – 10 Days",
    recoveryWeeks: "4 – 6 Weeks",
    indiaCostUsd: { min: 5400, max: 8500 },
    usCostUsd: { min: 85000, max: 140000 },
    ukCostUsd: { min: 32000, max: 48000 },
    uaeCostUsd: { min: 35000, max: 52000 },
    inclusions: [
      "Senior Cardiac Surgeon & Perfusionist team charges",
      "Beating-heart / minimally invasive approach",
      "2 days dedicated Cardiac ICU + 6 days private deluxe room",
      "Post-discharge tele-cardiology follow-up for 6 months",
      "Medical visa facilitation for patient & 2 attendants",
    ],
    inclusionsAr: [
      "أتعاب كبار جراحي القلب وفريق العناية المركزة",
      "تقنية القلب النابض طفيفة التوغل لتسريع التعافي",
      "يومان في العناية المركزة للقلب + 6 أيام في غرفة خاصة فاخرة",
      "متابعة دورية عن بعد مع استشاري القلب لمدة 6 أشهر",
      "تسهيل التأشيرة الطبية للمريض واثنين من المرافقين",
    ],
    popular: true,
  },
  {
    id: "ivf-icsi",
    name: "Advanced IVF + ICSI Cycle",
    nameAr: "دورة علاج العقم وأطفال الأنابيب مع الحقن المجهري",
    specialty: "Women's & Children's Health",
    specialtyAr: "صحة المرأة والإخصاب",
    typicalStayDays: "Outpatient (14–21 days total stay in India)",
    recoveryWeeks: "1 – 2 Weeks",
    indiaCostUsd: { min: 2200, max: 3600 },
    usCostUsd: { min: 18000, max: 28000 },
    ukCostUsd: { min: 9000, max: 15000 },
    uaeCostUsd: { min: 9500, max: 14000 },
    inclusions: [
      "Complete hormonal profiling and ovarian stimulation monitoring",
      "Egg retrieval procedure & advanced ICSI fertilization",
      "Embryo blastocyst culture & laser-assisted hatching",
      "Embryo transfer and medication for first trimester",
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
    id: "liver-transplant",
    name: "Living Donor Liver Transplant",
    nameAr: "عملية زراعة الكبد من متبرع حي",
    specialty: "Transplant Medicine",
    specialtyAr: "طب زراعة الأعضاء",
    typicalStayDays: "18 – 24 Days",
    recoveryWeeks: "8 – 12 Weeks",
    indiaCostUsd: { min: 24000, max: 33000 },
    usCostUsd: { min: 350000, max: 550000 },
    ukCostUsd: { min: 140000, max: 210000 },
    uaeCostUsd: { min: 160000, max: 240000 },
    inclusions: [
      "Full donor & recipient pre-transplant surgical workup",
      "Simultaneous dual-theatre donor hepatectomy & recipient transplant",
      "7 days dedicated Isolation Transplant ICU stay",
      "14 days private sterile recovery suite",
      "Government authorization committee & legal clearance support",
    ],
    inclusionsAr: [
      "الفحوصات الجراحية والمناعية الشاملة للمتبرع والمريض",
      "جراحة استئصال وزراعة الكبد في غرفتي عمليات متزامنتين",
      "7 أيام في العناية المركزة المعقمة لزراعة الأعضاء",
      "14 يوماً في جناح تعافي خاص عالي التعقيم",
      "إنهاء إجراءات الموافقات الحكومية ولجنة زراعة الأعضاء الرسمية",
    ],
    popular: false,
  },
  {
    id: "spine-fusion",
    name: "Minimally Invasive Spine Fusion (TLIF)",
    nameAr: "تثبيت فقرات العمود الفقري بالتدخل المحدود (TLIF)",
    specialty: "Neurosciences & Spine",
    specialtyAr: "المخ والعمود الفقري",
    typicalStayDays: "4 – 6 Days",
    recoveryWeeks: "3 – 5 Weeks",
    indiaCostUsd: { min: 4600, max: 7200 },
    usCostUsd: { min: 65000, max: 95000 },
    ukCostUsd: { min: 26000, max: 38000 },
    uaeCostUsd: { min: 28000, max: 42000 },
    inclusions: [
      "Intraoperative O-arm 3D imaging navigation",
      "US-imported Titanium pedicle screws & PEEK cage",
      "5 days inpatient stay in private deluxe room",
      "Custom rehabilitation and ergonomic training",
      "Direct coordinator assistance & translation",
    ],
    inclusionsAr: [
      "الملاحة الجراحية ثلاثية الأبعاد O-arm لضمان دقة تثبيت المسامير",
      "مسامير تيتانيوم وقفص PEEK مستورد عالي الجودة",
      "إقامة 5 أيام في غرفة خاصة فاخرة بالمستشفى",
      "برنامج تأهيل حركي وعلاج طبيعي مخصص",
      "مساعدة مباشرة من منسق الرعاية والمترجم",
    ],
    popular: false,
  },
];

export const PATIENT_CASE_STUDIES: PatientCaseStudy[] = [
  {
    id: "ahmed-dubai",
    patientName: "Ahmed R.",
    patientNameAr: "أحمد ر.",
    country: "United Arab Emirates",
    countryAr: "دولة الإمارات العربية المتحدة",
    flag: "🇦🇪",
    condition: "Complex Multi-Vessel Coronary Disease & Valve Regurgitation",
    conditionAr: "تضيق معقد في الشرايين التاجية وارتجاع الصمام الميترالي",
    specialist: "Dr. Arjun Mehta",
    hospital: "Fortis Hospital, Chandigarh City",
    timeline: [
      {
        stage: "Day 01 · Dubai",
        stageAr: "اليوم 01 · دبي",
        details: "Submitted angiography CD & reports on Vedara portal. Received detailed clinical assessment and second opinion from Chandigarh medical board within 16 hours.",
        detailsAr: "تقديم تقارير القسطرة عبر منصة فيدارا، والحصول على التقييم الطبي من أطباء شانديغار خلال 16 ساعة فقط.",
        location: "Dubai, UAE",
      },
      {
        stage: "Day 03 · Tele-Consultation",
        stageAr: "اليوم 03 · استشارة مرئية",
        details: "Live 35-minute video call with Dr. Arjun Mehta and care coordinator Aisha Khan to explain the beating-heart approach and answer all family questions.",
        detailsAr: "جلسة فيديو مباشرة لمدة 35 دقيقة مع الدكتور أرجون والمنسقة عائشة لشرح تفاصيل العملية والإجابة على استفسارات الأسرة.",
        location: "Online Video",
      },
      {
        stage: "Day 06 · Arrival at Chandigarh (IXC)",
        stageAr: "اليوم 06 · الوصول إلى شانديغار",
        details: "VIP tarmac assistance at Chandigarh Int'l Airport (IXC), fast-track immigration with Medical Visa, and private chauffeur directly to Fortis Hospital Chandigarh.",
        detailsAr: "استقبال VIP في مطار شانديغار الدولي وتسهيل إجراءات الدخول، والنقل بسيارة خاصة مباشرة إلى مستشفى فورتيس.",
        location: "Chandigarh City, India",
      },
      {
        stage: "Day 08 · Surgery & Procedure",
        stageAr: "اليوم 08 · الجراحة الدقيقة",
        details: "Successful 4-vessel off-pump bypass (CABG) + minimally invasive mitral valve repair in Fortis modular OT suite. Extubated in under 4 hours.",
        detailsAr: "إجراء عملية مجازة الشريان التاجي على القلب النابض وترميم الصمام بنجاح تام في مستشفى فورتيس شانديغار.",
        location: "Fortis Hospital Chandigarh",
      },
      {
        stage: "Day 13 · Discharge & Healing Suite",
        stageAr: "اليوم 13 · الخروج وجناح التعافي",
        details: "Discharged to partner 5-star long-stay hotel suite in Chandigarh with daily visits by Vedara physiotherapy nurse.",
        detailsAr: "الانتقال إلى الجناح الفندقي الفاخر المخصص للتعافي في شانديغار مع زيارة يومية لممرضة العلاج الطبيعي من فيدارا.",
        location: "Chandigarh City",
      },
      {
        stage: "Day 18 · Safe Return to Dubai",
        stageAr: "اليوم 18 · العودة السالمة لدبي",
        details: "Fit-to-fly certificate issued. Follow-up cardiology telemedicine schedule synced with local Dubai cardiologist.",
        detailsAr: "إصدار شهادة السفر، وتنسيق جدول المتابعة الطبية عن بعد مع طبيب القلب في دبي.",
        location: "Dubai, UAE",
      },
    ],
    quote: "I was deeply anxious about traveling for heart surgery. Having Aisha Khan coordinate every doctor meeting, hospital room in Chandigarh, and airport transfer made it feel as comfortable as receiving treatment at home, but with world-leading surgical expertise.",
    quoteAr: "كنت قلقاً جداً من السفر لإجراء جراحة دقيقة بالقلب، لكن وجود منسقة الرعاية عائشة خان وتنسيقها لكل التفاصيل في شانديغار جعل التجربة في غاية السلاسة والراحة وكأننا بين أهلنا، وبأعلى كفاءة طبية عالمية.",
    stats: {
      duration: "18 Days Total",
      consultations: "4 Specialist Sessions",
      coordinator: "1 Dedicated Facilitator",
      savings: "74% vs. Private UAE Care",
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
    condition: "Severe Multi-Level Degenerative Lumbar Spine Disease",
    conditionAr: "انزلاق غضروفي قطني متعدد المستويات وتضيق القناة الشوكية",
    specialist: "Dr. Rohan Kapoor",
    hospital: "Paras Health Super Speciality Hospital, Chandigarh",
    timeline: [
      {
        stage: "Week 1 · Nairobi",
        stageAr: "الأسبوع 1 · نيروبي",
        details: "Unable to walk for 6 months. Sent MRI scans to Vedara team and received surgical recommendation for endoscopic decompression in Chandigarh.",
        detailsAr: "عدم القدرة على المشي لعدة أشهر. إرسال صور الرنين المغناطيسي لشبكة فيدارا وتلقي خطة الجراحة في شانديغار.",
        location: "Nairobi, Kenya",
      },
      {
        stage: "Week 2 · Chandigarh",
        stageAr: "الأسبوع 2 · شانديغار",
        details: "Robotic minimally invasive spine fusion at Paras Health Chandigarh. Walking with support within 24 hours of surgery.",
        detailsAr: "إجراء جراحة تثبيت الفقرات بالروبوت في مستشفى باراس شانديغار والتمكن من المشي بمساعدة خلال 24 ساعة فقط.",
        location: "Paras Health Chandigarh",
      },
      {
        stage: "Week 3 · Return to Nairobi",
        stageAr: "الأسبوع 3 · العودة لنيروبي",
        details: "Pain-free discharge and remote rehab monitoring through Vedara patient portal.",
        detailsAr: "الخروج التام بدون أي آلام ومتابعة برنامج التأهيل الحركي عن بعد عبر المنصة.",
        location: "Nairobi, Kenya",
      },
    ],
    quote: "After months of debilitating back pain in Nairobi, the team in Chandigarh gave me my life back. The cost was a fraction of European options and the hospital felt like a 5-star hotel.",
    quoteAr: "بعد أشهر من الألم والمعاناة في نيروبي، أعاد لي الفريق الطبي في شانديغار القدرة على المشي والحياة الطبيعية. المستشفى كان في قمة الفخامة والتكلفة معقولة جداً.",
    stats: {
      duration: "12 Days Total",
      consultations: "3 Sessions",
      coordinator: "1 Dedicated Facilitator",
      savings: "80% vs. UK/Europe",
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
