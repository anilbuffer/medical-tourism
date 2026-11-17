import {
  TreatmentCard,
  HospitalCard,
  ServicePillar,
  PatientGuide,
} from '@/types';

export const HERO_CONTENT = {
  headline: {
    line1: "Get World-Class",
    line2: "Medical Care",
    accent: "Abroad",
  },
  subheading:
    "UK & Internationally Doctor-Led Care. Save up to 70% on major procedures with JCI-accredited tertiary hospitals, dedicated 24/7 personal concierges, luxury recovery suites, and integrated post-op follow-up.",
  trustPills: [
    { label: "UK Doctor-Led Care", icon: "ShieldCheck" },
    { label: "Luxury Recovery & Rehabilitation", icon: "HeartHandshake" },
    { label: "Comprehensive Complication Insurance", icon: "Sparkles" },
  ],
  stats: [
    { value: "70%", label: "Average Cost Savings", subtext: "Compared to private UK & US clinics" },
    { value: "15,000+", label: "International Patients", subtext: "Safely treated across 40+ countries" },
    { value: "50+", label: "JCI & NABH Hospitals", subtext: "Top-tier accredited medical centres" },
    { value: "99.2%", label: "Clinical Success Rate", subtext: "Monitored by international medical boards" },
  ],
  ctas: {
    primary: { label: "How It Works", href: "#how-it-works" },
    secondary: { label: "Schedule Free Consultation", href: "#consultation" },
    whatsapp: { label: "Chat on WhatsApp", href: "https://wa.me/447587399811?text=Hello%20Your Medicare Trip%20team,%20I%20would%20like%20to%20inquire%20about%20medical%20treatment%20abroad" },
  },
};

export const SERVICES_CONTENT: ServicePillar[] = [
  {
    id: "care-0",
    label: "24/7 Personal Concierge",
    description: "Your dedicated bilingual personal care manager accompanies you from airport arrival to clinic visits, translation, hotel check-ins, and daily coordination.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    iconName: "UserCheck",
    features: [
      "Dedicated Arabic & English speaking liaison",
      "Priority VIP hospital check-in & paperwork",
      "Local SIM cards, currency exchange & orientation",
      "Family companion support & logistics"
    ],
  },
  {
    id: "care-1",
    label: "Chef-Prepared Nutrition",
    description: "Customized halal culinary care tailored to your surgeon's recovery guidelines, dietary restrictions, and cultural preferences delivered directly to your suite.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80",
    iconName: "Utensils",
    features: [
      "100% Halal certified ingredients & preparation",
      "Nutritional plans designed by clinical dietitians",
      "Specialized soft & liquid diets post-surgery",
      "Room service for patient & travelling companions"
    ],
  },
  {
    id: "care-2",
    label: "24/7 Medical & Physician Support",
    description: "Round-the-clock doctor oversight, in-suite registered nursing care, vitals monitoring, medication administration, and rapid hospital escalation.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    iconName: "Stethoscope",
    features: [
      "Registered nurse stationed at aftercare facility",
      "Daily physician recovery review & dressing changes",
      "Direct hotline to your operating surgeon",
      "Full digital EHR record synchronization"
    ],
  },
  {
    id: "care-3",
    label: "Chauffeur & Travel Logistics",
    description: "Stress-free private luxury ground transport between the airport, accommodation, and hospital appointments in sanitized, wheelchair-accessible vehicles.",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80",
    iconName: "Car",
    features: [
      "Private VIP airport greeting & fast-track clearance",
      "Wheelchair-accessible premium Mercedes/Toyota fleet",
      "All hospital and specialist appointment transfers",
      "Leisure & pharmacy excursion coordination"
    ],
  },
  {
    id: "care-4",
    label: "Luxury Healing Suites",
    description: "Spacious, ergonomic private suites outfitted specifically for post-operative recovery, equipped with orthopedic bedding, grab bars, and ambient quiet.",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    iconName: "Building2",
    features: [
      "High-speed private Wi-Fi and entertainment setup",
      "Anti-slip bathrooms with safety handrails & emergency cords",
      "Separate living zone for visiting family members",
      "Serene private balconies with garden views"
    ],
  },
  {
    id: "care-5",
    label: "Post-Op Physical Rehabilitation",
    description: "Specialized physiotherapy sessions and mobility coaching begun immediately in your suite to accelerate safe healing and shorten recovery times.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    iconName: "Activity",
    features: [
      "Board-certified physiotherapists and rehab specialists",
      "Personalized daily mobility exercises and gait training",
      "Therapeutic lymphatic drainage and swelling management",
      "Take-home digital exercise plan for return journey"
    ],
  },
];

export const TREATMENTS_DATA: TreatmentCard[] = [
  {
    id: "ivf-fertility",
    title: "IVF (In Vitro Fertilisation)",
    category: "fertility",
    savingsPercent: 50,
    typicalStayDays: 14,
    successRate: "72%",
    overview: "Comprehensive IVF cycle including stimulation, egg retrieval, ICSI, blastocyst culture, and embryo transfer under internationally recognised embryologists.",
    locationPrices: [
      { market: "India", flagCode: "in", amount: 2999, currencyCode: "USD", isPrimary: true },
      { market: "Saudi Arabia", flagCode: "sa", amount: 5999, currencyCode: "USD", isPrimary: false },
      { market: "Germany / UK", flagCode: "de", amount: 7999, currencyCode: "USD", isPrimary: false },
    ],
  },
  {
    id: "icsi-procedure",
    title: "ICSI (Intracytoplasmic Sperm Injection)",
    category: "fertility",
    savingsPercent: 55,
    typicalStayDays: 10,
    successRate: "78%",
    overview: "Advanced micromanipulation technique used in severe male factor infertility or previous IVF failures with high fertilization rates.",
    locationPrices: [
      { market: "India", flagCode: "in", amount: 999, currencyCode: "USD", isPrimary: true },
      { market: "Saudi Arabia", flagCode: "sa", amount: 2200, currencyCode: "USD", isPrimary: false },
      { market: "Germany / UK", flagCode: "de", amount: 2800, currencyCode: "USD", isPrimary: false },
    ],
  },
  {
    id: "gi-cancer",
    title: "GI Cancer Surgery (Robotic/Minimally Invasive)",
    category: "oncologysurgery",
    savingsPercent: 77,
    typicalStayDays: 12,
    successRate: "95%",
    overview: "Precision DaVinci robotic or laparoscopic resection of gastrointestinal malignancies conducted by international surgical oncology fellows.",
    locationPrices: [
      { market: "India", flagCode: "in", amount: 4999, currencyCode: "USD", isPrimary: true },
      { market: "Saudi Arabia", flagCode: "sa", amount: 21999, currencyCode: "USD", isPrimary: false },
      { market: "Germany / UK", flagCode: "de", amount: 25999, currencyCode: "USD", isPrimary: false },
    ],
  },
  {
    id: "breast-cancer",
    title: "Breast Cancer Surgery & Reconstruction",
    category: "oncologysurgery",
    savingsPercent: 77,
    typicalStayDays: 8,
    successRate: "98%",
    overview: "Oncoplastic breast surgery, lumpectomy, or mastectomy with immediate cosmetic tissue/implant reconstruction for superior aesthetic and clinical outcomes.",
    locationPrices: [
      { market: "India", flagCode: "in", amount: 2999, currencyCode: "USD", isPrimary: true },
      { market: "Saudi Arabia", flagCode: "sa", amount: 12999, currencyCode: "USD", isPrimary: false },
      { market: "Germany / UK", flagCode: "de", amount: 14999, currencyCode: "USD", isPrimary: false },
    ],
  },
  {
    id: "knee-replacement",
    title: "Knee Replacement (Unilateral / Robotic-Assisted)",
    category: "orthopaedics",
    savingsPercent: 69,
    typicalStayDays: 10,
    successRate: "99%",
    overview: "Sub-millimeter accuracy Stryker Mako robotic total or partial knee arthroplasty using US FDA-approved titanium implants with rapid walking protocols.",
    locationPrices: [
      { market: "India", flagCode: "in", amount: 3999, currencyCode: "USD", isPrimary: true },
      { market: "Saudi Arabia", flagCode: "sa", amount: 12999, currencyCode: "USD", isPrimary: false },
      { market: "Germany / UK", flagCode: "de", amount: 18999, currencyCode: "USD", isPrimary: false },
    ],
  },
  {
    id: "hip-replacement",
    title: "Total Hip Replacement (Ceramic-on-Ceramic)",
    category: "orthopaedics",
    savingsPercent: 72,
    typicalStayDays: 10,
    successRate: "98.5%",
    overview: "Minimally invasive anterior approach hip replacement preserving muscle tissue for pain-free mobility and long implant lifespans exceeding 25 years.",
    locationPrices: [
      { market: "India", flagCode: "in", amount: 4499, currencyCode: "USD", isPrimary: true },
      { market: "Saudi Arabia", flagCode: "sa", amount: 15999, currencyCode: "USD", isPrimary: false },
      { market: "Germany / UK", flagCode: "de", amount: 21500, currencyCode: "USD", isPrimary: false },
    ],
  },
  {
    id: "heart-valve",
    title: "Heart Valve Replacement / Repair (TAVI / Minimally Invasive)",
    category: "cardiacsurgery",
    savingsPercent: 69,
    typicalStayDays: 14,
    successRate: "98.8%",
    overview: "Advanced catheter-based or minimally invasive surgical repair or prosthetic valve replacement led by pioneering cardiac surgical teams.",
    locationPrices: [
      { market: "India", flagCode: "in", amount: 5999, currencyCode: "USD", isPrimary: true },
      { market: "Saudi Arabia", flagCode: "sa", amount: 19500, currencyCode: "USD", isPrimary: false },
      { market: "Germany / UK", flagCode: "de", amount: 28000, currencyCode: "USD", isPrimary: false },
    ],
  },
  {
    id: "cabg-bypass",
    title: "Coronary Artery Bypass (CABG - Beating Heart)",
    category: "cardiacsurgery",
    savingsPercent: 74,
    typicalStayDays: 12,
    successRate: "99.1%",
    overview: "Off-pump beating heart bypass graft using arterial conduits with low stroke risk and expedited physical recuperation.",
    locationPrices: [
      { market: "India", flagCode: "in", amount: 5200, currencyCode: "USD", isPrimary: true },
      { market: "Saudi Arabia", flagCode: "sa", amount: 20000, currencyCode: "USD", isPrimary: false },
      { market: "Germany / UK", flagCode: "de", amount: 29500, currencyCode: "USD", isPrimary: false },
    ],
  },
  {
    id: "brain-tumor",
    title: "Neurosurgery / Brain Tumour Resection",
    category: "neurosurgery",
    savingsPercent: 71,
    typicalStayDays: 14,
    successRate: "94%",
    overview: "Intraoperative MRI and neuronavigation-guided microsurgical excision of complex intracranial lesions preserving essential neurological faculties.",
    locationPrices: [
      { market: "India", flagCode: "in", amount: 6500, currencyCode: "USD", isPrimary: true },
      { market: "Saudi Arabia", flagCode: "sa", amount: 22500, currencyCode: "USD", isPrimary: false },
      { market: "Germany / UK", flagCode: "de", amount: 32000, currencyCode: "USD", isPrimary: false },
    ],
  },
  {
    id: "liver-kidney",
    title: "Organ Transplant (Living Donor Liver / Kidney)",
    category: "organ-transplant",
    savingsPercent: 75,
    typicalStayDays: 28,
    successRate: "96.5%",
    overview: "World-leading transplant units performing laparoscopic donor harvesting with state-of-the-art HEPA-filtered intensive isolation recovery.",
    locationPrices: [
      { market: "India", flagCode: "in", amount: 18500, currencyCode: "USD", isPrimary: true },
      { market: "Saudi Arabia", flagCode: "sa", amount: 65000, currencyCode: "USD", isPrimary: false },
      { market: "Germany / UK", flagCode: "de", amount: 95000, currencyCode: "USD", isPrimary: false },
    ],
  },
  {
    id: "dental-implants",
    title: "All-on-4 / All-on-6 Full Arch Dental Restoration",
    category: "dental",
    savingsPercent: 68,
    typicalStayDays: 7,
    successRate: "99%",
    overview: "Complete same-trip fixed zirconium or porcelain arch reconstruction using Swiss Straumann implants and 3D digital smile design.",
    locationPrices: [
      { market: "India", flagCode: "in", amount: 3200, currencyCode: "USD", isPrimary: true },
      { market: "Saudi Arabia", flagCode: "sa", amount: 10000, currencyCode: "USD", isPrimary: false },
      { market: "Germany / UK", flagCode: "de", amount: 14000, currencyCode: "USD", isPrimary: false },
    ],
  },
  {
    id: "executive-wellness",
    title: "Executive Medical Assessment & Longevity Screening",
    category: "wellness",
    savingsPercent: 70,
    typicalStayDays: 5,
    successRate: "100%",
    overview: "Whole-body 3T MRI, low-dose coronary CT angiography, genetic risk scoring, metabolic biomarkers, and doctor consultation.",
    locationPrices: [
      { market: "India", flagCode: "in", amount: 950, currencyCode: "USD", isPrimary: true },
      { market: "Saudi Arabia", flagCode: "sa", amount: 3200, currencyCode: "USD", isPrimary: false },
      { market: "Germany / UK", flagCode: "de", amount: 4500, currencyCode: "USD", isPrimary: false },
    ],
  },
];

export const HOSPITALS_DATA: HospitalCard[] = [
  {
    id: "max-hospital-mohali",
    name: "Max Super Speciality Hospital",
    city: "Mohali (Chandigarh Tricity)",
    country: "India",
    description: "Multi-Speciality Care, Joint Replacement & Spine. Leading JCI & NABH accredited quaternary care hospital.",
    badge: "JCI & NABH Accredited",
    image: "/img/max-mohali.jpg",
    specialties: ["Joint Replacement", "Spine Surgery", "Robotic Surgery", "Cardiology"],
    accreditations: ["JCI Accredited", "NABH Certified", "NABL Laboratory"],
    stats: { beds: "350+", doctors: "200+", successRate: "99.2%" },
  },
  {
    id: "fortis-hospital-mohali",
    name: "Fortis Hospital",
    city: "Mohali (Chandigarh Tricity)",
    country: "India",
    description: "Multi-Speciality Care, Orthopaedics & Fertility. Flagship tertiary care centre with international patient pavilions.",
    badge: "JCI & NABH Accredited",
    image: "/img/fortis-mohali.jpg",
    specialties: ["Orthopaedics", "Robotic Arthroplasty", "IVF & Fertility", "Cardiac Sciences"],
    accreditations: ["JCI Accredited", "NABH Certified", "GreenOT Certified"],
    stats: { beds: "355+", doctors: "220+", successRate: "99.4%" },
  },
  {
    id: "livasa-hospital-mohali",
    name: "Livasa Hospital",
    city: "Mohali (Chandigarh Tricity)",
    country: "India",
    description: "Multi-Speciality Care & Surgery. Modern clinical excellence and cutting-edge surgical infrastructure.",
    badge: "NABH Accredited",
    image: "/img/livasa.jpg",
    specialties: ["Laparoscopic Surgery", "Gastroenterology", "Neurosciences", "Urology"],
    accreditations: ["NABH Accredited", "NABL Laboratory"],
    stats: { beds: "250+", doctors: "150+", successRate: "98.9%" },
  },
  {
    id: "sohana-hospital-mohali",
    name: "Sohana Hospital",
    city: "Mohali (Chandigarh Tricity)",
    country: "India",
    description: "Multi-Speciality Care & Surgery. Comprehensive medical centre with advanced diagnostics and surgical care.",
    badge: "NABH Accredited",
    image: "/img/sohana.jpg",
    specialties: ["Advanced Surgery", "Critical Care", "Orthopaedics", "Ophthalmology"],
    accreditations: ["NABH Accredited", "NABL Accredited"],
    stats: { beds: "300+", doctors: "180+", successRate: "99.0%" },
  },
  {
    id: "sangam-netralaya-mohali",
    name: "Sangam Netralaya",
    city: "Mohali (Chandigarh Tricity)",
    country: "India",
    description: "Cataract, Refractive & Retina Care. Premier super-speciality eye care and vision correction institute.",
    badge: "Super Speciality Eye Care",
    image: "/img/sangam-netralaya.jpg",
    specialties: ["Cataract Microsurgery", "LASIK & SMILE", "Retina & Vitreous", "Corneal Transplants"],
    accreditations: ["NABH Certified Eye Centre"],
    stats: { beds: "50+", doctors: "30+", successRate: "99.7%" },
  },
];

export const DESTINATION_VIDEOS = [
  {
    id: "dest-1",
    title: "An NHS Leader's Perspective on India",
    subtitle: "Why senior British clinicians recommend Indian tertiary centres for complex surgeries",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=EngW7tLk6R8",
    duration: "4:12 mins",
  },
  {
    id: "dest-2",
    title: "Inside India's JCI-Accredited Private Hospitals",
    subtitle: "A walkthrough of DaVinci surgical suites, VIP international suites, and ICU standards",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
    duration: "5:45 mins",
  },
  {
    id: "dest-3",
    title: "Continuity of Care: From Arrival to Aftercare",
    subtitle: "How our dedicated physicians manage your rehabilitation and return journey home",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
    duration: "3:30 mins",
  },
];

export const AFTERCARE_GALLERY = [
  {
    id: "af-1",
    title: "Private Recovery Deluxe Suite",
    description: "Quiet, temperature-regulated suite with orthopedic beds and ergonomic seating for companions.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "af-2",
    title: "Accessible Safety Bathrooms",
    description: "Anti-slip surfaces, safety grab rails, and emergency assistance cords beside the shower.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "af-3",
    title: "24/7 In-House Nursing Station",
    description: "Round-the-clock registered nurses for scheduled medication, vitals, and surgical site dressings.",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "af-4",
    title: "Physiotherapy & Mobility Studio",
    description: "On-site physical therapy room equipped with resistance bands, parallel bars, and posture trainers.",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "af-5",
    title: "Nutritious Halal Dining Lounge",
    description: "Chef-prepared custom menus tailored for gut recovery and optimal cellular healing.",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "af-6",
    title: "Serene Garden Courtyard",
    description: "Peaceful sunlit courtyard for calm walks and restorative fresh-air recovery moments.",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=80",
  },
];

export const FAQ_DATA = [
  {
    id: "faq-0",
    question: "Is the medical care provided through Your Medicare Trip safe and internationally accredited?",
    answer:
      "Yes, completely. Your Medicare Trip partners exclusively with hospital institutions accredited by JCI (Joint Commission International) and NABH (National Accreditation Board for Hospitals), which represent the global gold standards in patient safety, sterile protocols, and surgical outcomes. Many of our principal surgeons hold UK GMC registrations, American Board certifications, or have completed fellowships at institutions such as the NHS, Mayo Clinic, and Harvard Medical School.",
  },
  {
    id: "faq-1",
    question: "What happens when I arrive at the airport in India?",
    answer:
      "From the moment your flight touches down, you will be met at the arrivals gate by your dedicated Your Medicare Trip personal coordinator holding a personalized sign. You are escorted through baggage collection into a sanitized private chauffeur vehicle and driven directly to our aftercare accommodation or hospital VIP reception. We handle SIM activation, currency exchange, hotel check-in, and all hospital paperwork.",
  },
  {
    id: "faq-2",
    question: "How will my post-surgery recovery be managed?",
    answer:
      "Once discharged from the primary hospital, you transition to our dedicated recovery centre rather than an ordinary hotel. Your room is custom-fitted with orthopedic beds, non-slip flooring, and grab bars. Our registered nurses manage your medications, dressing changes, and vitals 24/7, while daily physical therapists and clinical nutritionists assist your recovery until you are certified fit to fly.",
  },
  {
    id: "faq-3",
    question: "What qualifications do Your Medicare Trip's specialist physicians have?",
    answer:
      "Our medical advisory board and partner hospital doctors are senior consultants with minimum 15 to 25+ years of specialist operative experience. Over 60% of our surgical leads possess dual qualifications from the UK (MRCP/FRCS), United States (FACS), or Germany. We furnish complete CVs, past procedure volumes, and complication rate registries prior to booking.",
  },
  {
    id: "faq-4",
    question: "Will I be on my own once I return to Saudi Arabia or my home country?",
    answer:
      "Not at all. Continuity of care is our central pillar. Prior to departure, you receive comprehensive digital EHR discharge papers, operative notes, imaging files (DICOM), and medication schedules in both English and Arabic. We coordinate follow-up teleconsultations with your operating surgeon at 2 weeks, 6 weeks, and 3 months, and liaise with your local general practitioner or specialist as needed.",
  },
  {
    id: "faq-5",
    question: "How does Your Medicare Trip's Complication Insurance protect me?",
    answer:
      "Every surgical package through Your Medicare Trip includes dedicated medical travel complication insurance coverage. In the rare event of an unforeseen surgical revision or extended hospitalization during your stay, covered medical expenses and accommodation extensions are handled so you and your loved ones do not face unexpected financial stress.",
  },
];

/* ------------------------------------------------------------------ */
/* Patient Guides Data                                                */
/* ------------------------------------------------------------------ */

export const PATIENT_GUIDES: PatientGuide[] = [
  {
    slug: 'recovering-after-surgery-abroad',
    title: 'Recovering after surgery abroad: planning the journey home',
    excerpt: "When it's safe to fly, what to carry home, and how follow-up works once you're back.",
    category: 'recovery',
    categoryLabel: 'Recovery',
    readMins: 7,
    image: '/images/guides/recovering-after-surgery-abroad.jpeg',
  },
  {
    slug: 'knee-replacement-india',
    title: 'Knee replacement in India: costs, recovery and what to expect',
    excerpt: 'Starting prices, how long to plan for, and what a typical stay looks like.',
    category: 'medical',
    categoryLabel: 'Medical Treatments',
    readMins: 9,
    image: '/images/guides/knee-replacement-india.jpeg',
  },
  {
    slug: 'health-checkup-trip-india',
    title: 'Planning a full health check-up around your trip to India',
    excerpt: 'What a comprehensive check-up covers and how to fit it around family or treatment.',
    category: 'checkup',
    categoryLabel: 'Check-ups & Diagnostics',
    readMins: 6,
    image: '/images/guides/health-checkup-trip-india.jpeg',
  },
];

export const PATIENT_GUIDES_DATA = PATIENT_GUIDES;

/* ------------------------------------------------------------------ */
/* WhatsApp Care Team Helpers                                         */
/* ------------------------------------------------------------------ */

export const DEFAULT_WHATSAPP_NUMBER = '447587399811';
export const DEFAULT_WHATSAPP_MESSAGE = "Hi, I'd like to talk to your care team.";

export function getWhatsAppUrl(message: string = DEFAULT_WHATSAPP_MESSAGE): string {
  return `https://wa.me/${DEFAULT_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
