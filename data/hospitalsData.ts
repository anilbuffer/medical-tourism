export interface HospitalSpecialist {
  slug: string;
  name: string;
  role: string;
  specialty: string;
  years: string;
  img: string;
}

export interface HospitalTreatment {
  slug: string;
  name: string;
  tag: string;
  summary: string;
  img: string;
}

export interface Hospital {
  slug: string;
  name: string;
  short: string;
  city: string;
  focus: string;
  img: string;
  badge?: string;
  specialties: string[];
  treatments: string[];
  about: string;
}

export const HOSPITALS: Hospital[] = [
  {
    slug: 'max-super-speciality-mohali',
    name: 'Max Super Speciality Hospital',
    short: 'Max Hospital',
    city: 'Mohali, Punjab',
    focus: 'Multi-speciality care, joint replacement & spine',
    img: '/img/max-mohali.jpg',
    badge: 'JCI & NABH Accredited',
    specialties: ['orthopaedics', 'cosmetic'],
    treatments: ['knee-replacement', 'hip-replacement', 'spine-surgery'],
    about:
      'A large multi-speciality hospital in Phase 6, Mohali. We use it mainly for joint replacement and spine surgery, where patients have orthopaedic surgeons, physiotherapy and critical-care back-up within the same hospital.',
  },
  {
    slug: 'fortis-mohali',
    name: 'Fortis Hospital',
    short: 'Fortis Hospital',
    city: 'Mohali, Punjab',
    focus: 'Multi-speciality care, orthopaedics & fertility',
    img: '/img/fortis-mohali.jpg',
    badge: 'JCI & NABH Accredited',
    specialties: ['orthopaedics', 'fertility'],
    treatments: ['knee-replacement', 'hip-replacement', 'ivf', 'icsi'],
    about:
      'A long-established multi-speciality hospital in Mohali with an international patient department. For our patients it is a regular choice for orthopaedic surgery and for fertility treatment.',
  },
  {
    slug: 'livasa-mohali',
    name: 'Livasa Hospital',
    short: 'Livasa Hospital',
    city: 'Mohali, Punjab',
    focus: 'Multi-speciality care',
    img: '/img/livasa.jpg',
    badge: 'NABH Accredited',
    specialties: ['orthopaedics', 'cosmetic'],
    treatments: ['knee-replacement', 'hip-replacement', 'cosmetic-surgery'],
    about:
      'A modern multi-speciality hospital in Mohali. We arrange planned surgery here when a patient\'s surgeon operates at Livasa or when its theatre schedule and room availability suit the patient\'s travel dates better.',
  },
  {
    slug: 'sohana-mohali',
    name: 'Sohana Hospital',
    short: 'Sohana Hospital',
    city: 'Mohali, Punjab',
    focus: 'Multi-speciality care',
    img: '/img/sohana.jpg',
    badge: 'NABH Accredited',
    specialties: ['orthopaedics', 'eye'],
    treatments: ['knee-replacement', 'hip-replacement', 'cataract-surgery'],
    about:
      'A multi-speciality hospital in Mohali with a calmer pace than the larger corporate hospitals. A good fit for patients who want planned surgery without the scale of a very large campus.',
  },
  {
    slug: 'sangam-netralaya',
    name: 'Sangam Netralaya',
    short: 'Sangam Netralaya',
    city: 'Mohali, Punjab',
    focus: 'Cataract, refractive & retina care',
    img: '/img/hospitals/sangam-netralaya-facade.jpg',
    badge: 'Super-Speciality Eye Care',
    specialties: ['eye'],
    treatments: ['cataract-surgery', 'lasik'],
    about:
      'A dedicated eye hospital. Eye surgery is usually quick, but the pre-operative tests and the follow-up checks matter just as much, so having diagnostics, surgery and review under one roof keeps a short trip simple.',
  },
];

export const TREATMENTS_MAP: Record<string, HospitalTreatment> = {
  'knee-replacement': {
    slug: 'knee-replacement',
    name: 'Knee Replacement',
    tag: 'Orthopaedics',
    summary: 'Total, partial and robotic-assisted knee replacement, planned with your surgeon before you travel.',
    img: '/images/guides/knee-replacement-india.jpeg',
  },
  'hip-replacement': {
    slug: 'hip-replacement',
    name: 'Hip Replacement',
    tag: 'Orthopaedics',
    summary: 'Total hip replacement for arthritis and joint damage, planned before you travel.',
    img: '/img/hero.jpg',
  },
  'spine-surgery': {
    slug: 'spine-surgery',
    name: 'Spine Surgery',
    tag: 'Orthopaedics',
    summary: 'Decompression, discectomy and fusion surgery planned with an experienced spine team.',
    img: '/img/doctor.jpg',
  },
  'ivf': {
    slug: 'ivf',
    name: 'IVF & Fertility Treatment',
    tag: 'Fertility',
    summary: 'Complete IVF cycles in Mohali, planned with your specialist before travel.',
    img: '/img/care-manager.jpg',
  },
  'icsi': {
    slug: 'icsi',
    name: 'ICSI',
    tag: 'Fertility',
    summary: 'Intracytoplasmic sperm injection for male factor subfertility.',
    img: '/img/doctor.jpg',
  },
  'cataract-surgery': {
    slug: 'cataract-surgery',
    name: 'Cataract Surgery',
    tag: 'Eye care',
    summary: 'Day-case cataract surgery with a choice of lens, in about a week in Mohali.',
    img: '/img/hospitals/sangam-netralaya-facade.jpg',
  },
  'lasik': {
    slug: 'lasik',
    name: 'LASIK & Refractive Surgery',
    tag: 'Eye care',
    summary: 'Laser vision correction after a full suitability check. Not everyone is a candidate, and we\'ll tell you.',
    img: '/img/hospitals/sangam-netralaya-facade.jpg',
  },
  'cosmetic-surgery': {
    slug: 'cosmetic-surgery',
    name: 'Cosmetic & Plastic Surgery',
    tag: 'Cosmetic & Plastic Surgery',
    summary: 'Reconstructive and aesthetic surgery planned with consultant plastic surgeons.',
    img: '/img/doctors/dr-vikas-gupta.jpg',
  },
};

export const SPECIALISTS_LIST: (HospitalSpecialist & { treatments: string[] })[] = [
  {
    slug: 'dr-jaswant-singh',
    name: 'Dr. Jaswant Singh',
    role: 'Founding Clinical Partner',
    specialty: 'General & Laparoscopic Surgery',
    years: '25+',
    img: '/img/dr-jaswant-singh.jpg',
    treatments: ['knee-replacement', 'hip-replacement', 'spine-surgery'],
  },
  {
    slug: 'dr-jatinder-singla',
    name: 'Dr. Jatinder Singla',
    role: 'Orthopaedics & Robotic Joint Replacement',
    specialty: 'Orthopaedics',
    years: '20+',
    img: '/img/dr-singla.jpg',
    treatments: ['knee-replacement', 'hip-replacement'],
  },
  {
    slug: 'dr-ashish-ahuja',
    name: 'Dr. Ashish Ahuja',
    role: 'Ophthalmology',
    specialty: 'Eye care',
    years: '16+',
    img: '/img/dr-ashish-ahuja.jpg',
    treatments: ['cataract-surgery', 'lasik'],
  },
  {
    slug: 'dr-vikas-gupta',
    name: 'Dr. Vikas Gupta',
    role: 'Plastic Surgery',
    specialty: 'Cosmetic & Plastic Surgery',
    years: '18+',
    img: '/img/doctors/dr-vikas-gupta.jpg',
    treatments: ['cosmetic-surgery'],
  },
];

