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
  {
    slug: 'landmark-chandigarh',
    name: 'Landmark Hospital',
    short: 'Landmark Hospital',
    city: 'Sector 33-C, Chandigarh',
    focus: 'Plastic & cosmetic surgery, orthopaedics & fertility care',
    img: '/img/livasa.jpg',
    badge: 'NABH Accredited',
    specialties: ['cosmetic', 'orthopaedics', 'fertility', 'eye'],
    treatments: ['cosmetic-surgery', 'knee-replacement', 'cataract-surgery'],
    about:
      'A premier multi-speciality hospital in Sector 33-C, Chandigarh, renowned for cosmetic and reconstructive plastic surgery, orthopaedic care, and dedicated surgical facilities for planned procedures.',
  },
  {
    slug: 'ace-heart-institute',
    name: 'ACE Heart & Vascular Institute',
    short: 'ACE Heart Institute',
    city: 'Sector 69, Mohali, Punjab',
    focus: 'Cardiovascular & chest medicine, complex angioplasty, TAVR & structural heart interventions',
    img: '/img/hospitals/ace-heart-hospital.jpg',
    badge: 'Super-Speciality Heart Institute',
    specialties: ['cardiac'],
    treatments: ['coronary-angioplasty', 'heart-valve-replacement', 'pacemaker-aicd-implantation'],
    about:
      'Established in 2007, ACE Heart & Vascular Institute (Advanced Cardiovascular Enterprise) is a leading tertiary care cardiovascular and chest medicine center in Sector 69, Mohali, Punjab. With over 16 years of clinical excellence, the institute is equipped with cutting-edge cardiac catheterization laboratories featuring Fractional Flow Reserve (FFR) and Intravascular Ultrasound (IVUS). It is the first private hospital north of Delhi to offer coronary lasers and the exclusive provider of ECMO facilities in the Tricity. ACE runs a world-class structural heart disease center specializing in Transcatheter Aortic Valve Replacement (TAVR/TAVI), CAVI, and MitraClip TMVr under the leadership of Dr. Puneet Verma. The hospital delivers 24x7 emergency cardiac care, dedicated primary angioplasty, and compassionate patient support with an affordable, cost-effective approach.',
  },
];

export const TREATMENTS_MAP: Record<string, HospitalTreatment> = {
  'knee-replacement': {
    slug: 'knee-replacement',
    name: 'Knee Replacement',
    tag: 'Orthopaedics',
    summary: 'Total, partial and robotic-assisted knee replacement, planned with your surgeon before you travel.',
    img: '/images/treatments/knee-replacement.jpg',
  },
  'hip-replacement': {
    slug: 'hip-replacement',
    name: 'Hip Replacement',
    tag: 'Orthopaedics',
    summary: 'Total hip replacement for arthritis and joint damage, planned before you travel.',
    img: '/images/treatments/hip-replacement.jpg',
  },
  'spine-surgery': {
    slug: 'spine-surgery',
    name: 'Spine Surgery',
    tag: 'Orthopaedics',
    summary: 'Decompression, discectomy and fusion surgery planned with an experienced spine team.',
    img: '/images/treatments/spine-surgery.jpg',
  },
  'minimal-invasive-spine-surgery': {
    slug: 'minimal-invasive-spine-surgery',
    name: 'Minimally Invasive Spine Surgery',
    tag: 'Orthopaedics',
    summary: 'Keyhole lumbar decompression and microdiscectomy planned with experienced spine team.',
    img: '/images/treatments/spine-surgery.jpg',
  },
  'acdf-surgery': {
    slug: 'acdf-surgery',
    name: 'Anterior Cervical Discectomy & Fusion (ACDF)',
    tag: 'Orthopaedics',
    summary: 'Cervical spine decompression and fusion for neck disc herniations and nerve impingement.',
    img: '/images/treatments/spine-surgery.jpg',
  },
  'rhinoplasty': {
    slug: 'rhinoplasty',
    name: 'Rhinoplasty',
    tag: 'Cosmetic Surgery',
    summary: 'Cosmetic and functional nasal reshaping by experienced plastic surgeons.',
    img: '/images/treatments/cosmetic-surgery.jpg',
  },
  'breast-implants': {
    slug: 'breast-implants',
    name: 'Breast Implants',
    tag: 'Cosmetic Surgery',
    summary: 'Breast augmentation using US FDA-approved cohesive silicone gel implants.',
    img: '/images/treatments/cosmetic-surgery.jpg',
  },
  'hair-transplant': {
    slug: 'hair-transplant',
    name: 'Hair Transplant',
    tag: 'Cosmetic Surgery',
    summary: 'Scarless FUE and DHI graft transplantation for natural hair restoration.',
    img: '/images/treatments/cosmetic-surgery.jpg',
  },
  'ivf': {
    slug: 'ivf',
    name: 'IVF & Fertility Treatment',
    tag: 'Fertility',
    summary: 'Complete IVF cycles in Mohali, planned with your specialist before travel.',
    img: '/images/treatments/ivf.jpg',
  },
  'icsi': {
    slug: 'icsi',
    name: 'ICSI',
    tag: 'Fertility',
    summary: 'Intracytoplasmic sperm injection for male factor subfertility.',
    img: '/images/treatments/icsi.jpg',
  },
  'cataract-surgery': {
    slug: 'cataract-surgery',
    name: 'Cataract Surgery',
    tag: 'Eye care',
    summary: 'Day-case cataract surgery with a choice of lens, in about a week in Mohali.',
    img: '/images/treatments/cataract-surgery.jpg',
  },
  'lasik': {
    slug: 'lasik',
    name: 'LASIK & Refractive Surgery',
    tag: 'Eye care',
    summary: 'Laser vision correction after a full suitability check. Not everyone is a candidate, and we\'ll tell you.',
    img: '/images/treatments/lasik.jpg',
  },
  'cosmetic-surgery': {
    slug: 'cosmetic-surgery',
    name: 'Cosmetic & Plastic Surgery',
    tag: 'Cosmetic & Plastic Surgery',
    summary: 'Reconstructive and aesthetic surgery planned with consultant plastic surgeons.',
    img: '/images/treatments/cosmetic-surgery.jpg',
  },
  'coronary-angioplasty': {
    slug: 'coronary-angioplasty',
    name: 'Coronary Angioplasty & Stenting',
    tag: 'Cardiac Sciences',
    summary: 'Complex coronary angioplasty, transradial wrist-access stenting and emergency PCI with IVUS/FFR precision.',
    img: '/images/treatments/cat-medical.jpg',
  },
  'heart-valve-replacement': {
    slug: 'heart-valve-replacement',
    name: 'Heart Valve Replacement & Repair (TAVR/TAVI)',
    tag: 'Structural Heart',
    summary: 'Minimally invasive catheter-based TAVR/TAVI and MitraClip TMVr valve interventions without open-heart surgery.',
    img: '/images/treatments/cat-medical.jpg',
  },
  'pacemaker-aicd-implantation': {
    slug: 'pacemaker-aicd-implantation',
    name: 'Cardiac Pacemaker & AICD Implantation',
    tag: 'Electrophysiology',
    summary: 'Permanent pacemakers, AICDs, and biventricular CRT-D implants for arrhythmias and heart failure management.',
    img: '/images/treatments/cat-medical.jpg',
  },
};

export const SPECIALISTS_LIST: (HospitalSpecialist & { treatments: string[] })[] = [
  {
    slug: 'dr-puneet-verma',
    name: 'Dr. Puneet Verma',
    role: 'Director & Chief Interventional Cardiologist',
    specialty: 'Interventional Cardiology & Structural Heart',
    years: '28+',
    img: '/img/doctors/dr-puneet-verma.jpg',
    treatments: ['coronary-angioplasty', 'heart-valve-replacement', 'pacemaker-aicd-implantation'],
  },
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

export const HOSPITALS_SECTION = {
  "headingLine1": "Partner hospitals,",
  "headingLine2": "in the Chandigarh tricity",
  "subtitle": "Expert care in the calm of the Chandigarh tricity.",
  "viewAllLabel": "View All",
  "viewAllHref": "/hospitals",
  "countries": [
    {
      "id": "all",
      "label": "All",
      "badge": null
    },
    {
      "id": "mohali",
      "label": "Mohali (Chandigarh)",
      "badge": "Premier"
    }
  ],
  "cards": [
    {
      "id": "max-hospital-mohali",
      "name": "Max Super Speciality Hospital",
      "country": "mohali",
      "location": "Mohali, Punjab",
      "description": "Multi-Speciality Care, Joint Replacement & Spine",
      "badge": "JCI & NABH Accredited",
      "href": "/hospitals/max-super-speciality-mohali",
      "image": {
        "src": "/img/max-mohali.jpg",
        "width": 1200,
        "height": 800
      }
    },
    {
      "id": "fortis-hospital-mohali",
      "name": "Fortis Hospital",
      "country": "mohali",
      "location": "Mohali, Punjab",
      "description": "Multi-Speciality Care, Orthopaedics & Fertility",
      "badge": "JCI & NABH Accredited",
      "href": "/hospitals/fortis-mohali",
      "image": {
        "src": "/img/fortis-mohali.jpg",
        "width": 1200,
        "height": 800
      }
    },
    {
      "id": "livasa-hospital-mohali",
      "name": "Livasa Hospital",
      "country": "mohali",
      "location": "Mohali, Punjab",
      "description": "Multi-Speciality Care & Surgery",
      "badge": "NABH Accredited",
      "href": "/hospitals/livasa-mohali",
      "image": {
        "src": "/img/livasa.jpg",
        "width": 1200,
        "height": 800
      }
    },
    {
      "id": "sohana-hospital-mohali",
      "name": "Sohana Hospital",
      "country": "mohali",
      "location": "Mohali, Punjab",
      "description": "Multi-Speciality Care & Surgery",
      "badge": "NABH Accredited",
      "href": "/hospitals/sohana-mohali",
      "image": {
        "src": "/img/sohana.jpg",
        "width": 1200,
        "height": 800
      }
    },
    {
      "id": "sangam-netralaya-mohali",
      "name": "Sangam Netralaya",
      "country": "mohali",
      "location": "Mohali, Punjab",
      "description": "Cataract, Refractive & Retina Care",
      "badge": "Advanced Eye Care",
      "href": "/hospitals/sangam-netralaya",
      "image": {
        "src": "/img/hospitals/sangam-netralaya-facade.jpg",
        "width": 1200,
        "height": 800
      }
    },
    {
      "id": "landmark-hospital-chandigarh",
      "name": "Landmark Hospital",
      "country": "mohali",
      "location": "Sector 33-C, Chandigarh",
      "description": "Plastic & Cosmetic Surgery, Orthopaedics & Fertility Care",
      "badge": "NABH Accredited",
      "href": "/hospitals/landmark-chandigarh",
      "image": {
        "src": "/img/livasa.jpg",
        "width": 1200,
        "height": 800
      }
    },
    {
      "id": "ace-heart-institute",
      "name": "ACE Heart & Vascular Institute",
      "country": "mohali",
      "location": "Sector 69, Mohali, Punjab",
      "description": "Cardiovascular Sciences, Complex Angioplasty, TAVR & Structural Heart Care",
      "badge": "Super-Speciality Heart Institute",
      "href": "/hospitals/ace-heart-institute",
      "image": {
        "src": "/img/hospitals/ace-heart-hospital.jpg",
        "width": 1024,
        "height": 836
      }
    }
  ]
};
