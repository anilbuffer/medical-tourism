export interface DoctorTreatment {
  slug: string;
  name: string;
  tag: string;
  summary: string;
  img: string;
  priceNote?: string;
}

export interface Doctor {
  slug: string;
  name: string;
  role: string;
  specialty: string;
  years: string;
  img: string;
  quals: string[];
  highlights: string[];
  treatments: string[];
  bio: string[];
  shortName: string;
}

export interface CareMember {
  id: string;
  name: string;
  role: string;
  years: string;
  img: string;
  tag: 'care' | 'recovery';
}

export const DOCTORS: Doctor[] = [
  {
    slug: 'dr-jaswant-singh',
    name: 'Dr. Jaswant Singh',
    shortName: 'Dr. Singh',
    role: 'Founding Clinical Partner',
    specialty: 'General & Laparoscopic Surgery',
    years: '25+',
    img: '/img/dr-jaswant-singh.jpg',
    quals: [
      'MBBS',
      'MS (General Surgery)',
      'Consultant General & Laparoscopic Surgeon',
    ],
    highlights: [
      'More than 25 years in surgical practice',
      '5,000+ patients operated on',
      'Gold medallist',
      'State Awardee, Government of Punjab',
      'Served as physician to the Chief Minister of Punjab for over a decade',
    ],
    treatments: [],
    bio: [
      "Dr. Jaswant Singh is a consultant general and laparoscopic surgeon with more than 25 years of practice in Punjab. He is the founding clinical partner of Your Medicare Trip and the doctor who reviews how every patient's case is planned.",
      'In practice that means he looks at the reports you send before a quote goes out, checks that the specialist and hospital proposed are the right fit, and stays involved if anything during your stay needs a senior clinical decision. Patients and their families can ask to speak with him directly.',
    ],
  },
  {
    slug: 'dr-jatinder-singla',
    name: 'Dr. Jatinder Singla',
    shortName: 'Dr. Singla',
    role: 'Orthopaedics & Robotic Joint Replacement',
    specialty: 'Orthopaedics',
    years: '20+',
    img: '/img/dr-singla.jpg',
    quals: [],
    highlights: [
      'More than 20 years in orthopaedic surgery',
      'Knee and hip replacement, including robotic-assisted surgery',
    ],
    treatments: ['knee-replacement', 'hip-replacement'],
    bio: [
      'Dr. Jatinder Singla is an orthopaedic surgeon with more than 20 years of experience, focused on knee and hip replacement, including robotic-assisted procedures.',
      'For international patients he reviews X-rays and scans before travel, so the type of implant and the approach are agreed in the video consultation rather than after you arrive.',
    ],
  },
  {
    slug: 'dr-ashish-ahuja',
    name: 'Dr. Ashish Ahuja',
    shortName: 'Dr. Ahuja',
    role: 'Ophthalmology',
    specialty: 'Eye care',
    years: '16+',
    img: '/img/dr-ashish-ahuja.jpg',
    quals: [],
    highlights: [
      'More than 16 years in ophthalmology',
      'Cataract and refractive surgery',
    ],
    treatments: ['cataract-surgery', 'lasik'],
    bio: [
      'Dr. Ashish Ahuja is an ophthalmologist with more than 16 years of experience in cataract and refractive surgery.',
      'Eye surgery trips are short, so he plans the pre-operative measurements, the procedure and the first post-operative checks to fit into roughly a week in Mohali.',
    ],
  },
  {
    slug: 'dr-vikas-gupta',
    name: 'Dr. Vikas Gupta',
    shortName: 'Dr. Gupta',
    role: 'Plastic Surgery',
    specialty: 'Cosmetic & Plastic Surgery',
    years: '18+',
    img: '/img/dr-vikas-gupta.jpg',
    quals: [],
    highlights: [
      'More than 18 years in plastic surgery',
      'Cosmetic and reconstructive procedures',
    ],
    treatments: ['cosmetic-surgery'],
    bio: [
      'Dr. Vikas Gupta is a plastic surgeon with more than 18 years of experience across cosmetic and reconstructive surgery.',
      'He insists on an unhurried video consultation before anything is booked, covering realistic outcomes, scarring, and how long you need to stay before flying home.',
    ],
  },
];

export const CARE_TEAM_MEMBERS: CareMember[] = [
  {
    id: 'care-manager',
    name: 'Patient Care Manager',
    role: 'Your single point of contact',
    years: '10+',
    img: '/img/care-manager.jpg',
    tag: 'care',
  },
  {
    id: 'international-desk',
    name: 'International Patient Desk',
    role: 'Visa, travel & stay',
    years: '12+',
    img: '/img/transfers.jpg',
    tag: 'care',
  },
  {
    id: 'physio',
    name: 'Physiotherapist',
    role: 'Daily rehabilitation',
    years: '14+',
    img: '/img/physio.jpg',
    tag: 'recovery',
  },
  {
    id: 'recovery-nurse',
    name: 'Recovery Nurse',
    role: 'Recovery-stay nursing',
    years: '15+',
    img: '/img/doctor.jpg',
    tag: 'recovery',
  },
];

export const DOCTOR_TREATMENTS_MAP: Record<string, DoctorTreatment> = {
  'knee-replacement': {
    slug: 'knee-replacement',
    name: 'Knee Replacement',
    tag: 'Orthopaedics',
    summary: 'Total, partial and robotic-assisted knee replacement, planned with your surgeon before you travel.',
    img: '/images/guides/knee-replacement-india.jpeg',
    priceNote: 'From $3,999',
  },
  'hip-replacement': {
    slug: 'hip-replacement',
    name: 'Hip Replacement',
    tag: 'Orthopaedics',
    summary: 'Total hip replacement and revision surgery, with physiotherapy built into your stay.',
    img: '/images/treatments/medical.jpeg',
    priceNote: 'See details',
  },
  'cataract-surgery': {
    slug: 'cataract-surgery',
    name: 'Cataract Surgery',
    tag: 'Eye care',
    summary: 'Day-case cataract surgery with a choice of lens, in about a week in Mohali.',
    img: '/img/sangam-netralaya.jpg',
    priceNote: 'See details',
  },
  'lasik': {
    slug: 'lasik',
    name: 'LASIK & Refractive Surgery',
    tag: 'Eye care',
    summary: "Laser vision correction after a full suitability check. Not everyone is a candidate, and we'll tell you.",
    img: '/img/sangam-netralaya.jpg',
    priceNote: 'See details',
  },
  'cosmetic-surgery': {
    slug: 'cosmetic-surgery',
    name: 'Cosmetic & Plastic Surgery',
    tag: 'Cosmetic & Plastic Surgery',
    summary: 'Body and facial procedures with an unhurried consultation first, and enough recovery time before you fly.',
    img: '/images/hero/doctor.jpg',
    priceNote: 'See details',
  },
};

