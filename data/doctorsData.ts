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
  department?: string;
  experience?: string[];
  years: string | null;
  img: string | null;
  quals: string[];
  highlights: string[];
  treatments: string[];
  bio: string[];
  shortName: string;
  initials?: string;
  group?: string;
  groupLabel?: string;
  hospital?: string | null;
  type?: 'doctor';
}

export const DOCTORS: Doctor[] = [
  {
    slug: 'dr-jaswant-singh',
    name: 'Dr. Jaswant Singh',
    role: 'Founding Clinical Partner',
    specialty: 'General & Laparoscopic Surgery',
    department: 'General & Laparoscopic Surgery',
    group: 'surgery',
    groupLabel: 'Surgery, ENT & Gynae',
    years: '25+',
    img: '/img/dr-jaswant-singh.jpg',
    initials: 'JS',
    hospital: null,
    type: 'doctor',
    shortName: 'Dr. Singh',
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
    role: 'Orthopaedics & Robotic Joint Replacement',
    specialty: 'Orthopaedics',
    department: 'Orthopaedics',
    group: 'ortho',
    groupLabel: 'Orthopaedics',
    years: '20+',
    img: '/img/dr-singla.jpg',
    initials: 'JS',
    hospital: null,
    type: 'doctor',
    shortName: 'Dr. Singla',
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
    role: 'Ophthalmology',
    specialty: 'Eye care',
    department: 'Ophthalmology',
    group: 'eye',
    groupLabel: 'Eye Care',
    years: '16+',
    img: '/img/dr-ashish-ahuja.jpg',
    initials: 'AA',
    hospital: null,
    type: 'doctor',
    shortName: 'Dr. Ahuja',
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
    role: 'Plastic Surgery',
    specialty: 'Cosmetic & Plastic Surgery',
    department: 'Plastic Surgery',
    group: 'plastic',
    groupLabel: 'Plastic Surgery',
    years: '18+',
    img: '/img/doctors/dr-vikas-gupta.jpg',
    initials: 'VG',
    hospital: null,
    type: 'doctor',
    shortName: 'Dr. Gupta',
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
    {
    slug: 'dr-harinder-k-bali',
    name: 'Dr. Harinder K. Bali',
    role: 'Chairman, Cardiac Sciences',
    specialty: 'Interventional Cardiology',
    department: 'Cardiology',
    group: 'cardiac',
    groupLabel: 'Cardiac Sciences',
    years: '38+',
    img: '/img/doctors/dr-harinder-k-bali.jpeg',
    initials: 'HB',
    hospital: 'livasa-mohali',
    type: 'doctor',
    shortName: 'Dr. Bali',
    quals: [
          "MD (Medicine) - Gold Medalist, PGIMER Chandigarh",
          "DM (Cardiology) - PGIMER Chandigarh",
          "Fellow of the American College of Cardiology (FACC)",
          "Fellow of the Society for Cardiovascular Angiography and Interventions (FSCAI)"
    ],
    highlights: [
          "Over 38 years of experience in clinical and interventional cardiology",
          "Pioneered Primary Angioplasty for acute heart attacks in Northern India",
          "Performed more than 20,000 coronary interventions as chief operator",
          "Expert in CRT-D, biventricular pacemakers, and ICD device implantations",
          "Specialist in TAVI/TAVR, carotid stenting, and endovascular repair of aortic aneurysms"
    ],
    experience: [
          "Former Additional Professor of Cardiology, PGIMER Chandigarh",
          "Former Director of Cardiology, Fortis Hospitals, Mohali",
          "Former Chairman of Cardiac Sciences, Paras Healthcare",
          "Chairman of Cardiac Sciences, Livasa Hospitals"
    ],
    treatments: [],
    bio: [
          "Dr. Harinder K. Bali is one of India's most distinguished interventional cardiologists with over 38 years of clinical leadership. He introduced Primary Angioplasty for the emergency management of heart attacks in northern India and has performed over 20,000 coronary interventions as primary operator.",
          "A former Additional Professor at PGIMER Chandigarh, Dr. Bali is internationally recognized for complex coronary artery interventions, biventricular pacemakers (CRT-P/CRT-D), TAVI/TAVR, endovascular stent grafting for aortic aneurysms, and carotid artery stenting.",
          "For international patients seeking cardiac treatment, Dr. Bali conducts detailed pre-arrival reviews of angiograms and echocardiograms, structuring individualized procedural and recovery pathways."
    ],
  },
    {
    slug: 'dr-arvind-kaul',
    name: 'Dr. Arvind Kaul',
    role: 'Director, Cardiology',
    specialty: 'Interventional Cardiology',
    department: 'Cardiology',
    group: 'cardiac',
    groupLabel: 'Cardiac Sciences',
    years: '25+',
    img: '/img/doctors/dr-arvind-kaul.png',
    initials: 'AK',
    hospital: 'livasa-mohali',
    type: 'doctor',
    shortName: 'Dr. Kaul',
    quals: [
          "MBBS - Government Medical College, Jammu",
          "MD (Internal Medicine) - PGIMER, Chandigarh",
          "DM (Cardiology) - AIIMS, New Delhi",
          "Fellow of the Cardiological Society of India (FCSI)"
    ],
    highlights: [
          "Over 25 years of advanced practice in interventional cardiology",
          "Alumnus of AIIMS New Delhi and PGIMER Chandigarh",
          "Specialist in primary angioplasty, multi-vessel PCI, and complex bifurcation lesions",
          "Extensive expertise in pacemaker, ICD, and CRT implantation",
          "Pioneer in structural heart procedures including TAVR and ASD/PDA closures"
    ],
    experience: [
          "Director - Cardiology, Shalby Hospital, Mohali",
          "Director - Cardiology, Paras Hospital, Panchkula",
          "Senior Consultant & Head of Cardiology, Alchemist Hospital, Panchkula",
          "Senior Consultant & Interventional Cardiologist, Silver Oaks Cardiac Centre"
    ],
    treatments: [],
    bio: [
          "Dr. Arvind Kaul brings more than 25 years of comprehensive cardiology expertise, having received his super-specialty DM training at the prestigious All India Institute of Medical Sciences (AIIMS), New Delhi.",
          "He specializes in high-risk complex coronary interventions, emergency primary angioplasties, cardiac pacing, and structural heart repairs. His patient-first philosophy ensures overseas visitors receive clear, evidence-based recommendations and minimally invasive treatment options.",
          "His international patient protocols include complete cardiac workups, telemedicine pre-evaluations, and post-procedural tele-monitoring after return to their home country."
    ],
  },
    {
    slug: 'dr-ishant-singla',
    name: 'Dr. Ishant Singla',
    role: 'Cardiothoracic & Vascular Surgery',
    specialty: 'CTVS & Minimal Access Surgery',
    department: 'CTVS',
    group: 'cardiac',
    groupLabel: 'Cardiac Sciences',
    years: '12+',
    img: '/img/doctors/dr-ishant-singla.jpeg',
    initials: 'IS',
    hospital: 'livasa-mohali',
    type: 'doctor',
    shortName: 'Dr. Singla',
    quals: [
          "MBBS",
          "MS (General Surgery)",
          "M.Ch. (Cardiothoracic and Vascular Surgery)",
          "Fellowship in Robotic and Minimally Invasive Cardiac Surgery (MICS)"
    ],
    highlights: [
          "Over 12 years of specialized surgical practice in cardiac and vascular care",
          "Fellowship-trained in robotic and minimally invasive cardiac surgery",
          "Specialist in keyhole beating heart bypass surgery (OPCABG)",
          "Expert in minimally invasive heart valve repair and replacement",
          "Advanced thoracic resections and peripheral vascular bypass reconstructions"
    ],
    experience: [
          "Consultant CTVS, Ojas Hospital, Panchkula",
          "Associate Consultant in Robotic & MICS Program, Apollo Hospitals, Bangalore",
          "Consultant CTVS, Shalby Hospital & Grecian Hospital, Mohali",
          "Associate Consultant, Metromas Hospital, Jaipur"
    ],
    treatments: [],
    bio: [
          "Dr. Ishant Singla is an accomplished cardiothoracic and vascular surgeon with dedicated sub-specialization in robotic and minimally invasive cardiac procedures.",
          "He specializes in keyhole beating-heart coronary artery bypass grafting, minimally invasive aortic and mitral valve surgeries, and peripheral vascular salvage, allowing patients to recover with smaller incisions and significantly less blood loss.",
          "He works closely with overseas patients to evaluate surgical fitness prior to travel and orchestrates coordinated in-hospital and post-discharge recuperation."
    ],
  },
    {
    slug: 'dr-raka-kaushal',
    name: 'Dr. Raka Kaushal',
    role: 'Senior Director, Nephrology & Renal Transplant',
    specialty: 'Nephrology & Renal Transplant',
    department: 'Nephrology',
    group: 'kidney',
    groupLabel: 'Kidney & Urology',
    years: '20+',
    img: '/img/doctors/dr-raka-kaushal.jpeg',
    initials: 'RK',
    hospital: 'livasa-mohali',
    type: 'doctor',
    shortName: 'Dr. Kaushal',
    quals: [
          "MBBS - Maulana Azad Medical College, New Delhi",
          "MD (Medicine) - Maulana Azad Medical College, New Delhi",
          "DM (Nephrology) - Sanjay Gandhi PGI (SGPGI), Lucknow",
          "Fellow of the Indian Society of Nephrology (FISN)"
    ],
    highlights: [
          "Over two decades of clinical leadership in nephrology and renal transplantation",
          "Supervised more than 800 successful kidney transplants and 100,000+ dialysis sessions",
          "Pioneered ABO-incompatible kidney transplantation protocols in the region",
          "Established one of Northern India's largest modern dialysis and renal intensive care units",
          "Expert in continuous renal replacement therapy (CRRT) and slow low-efficiency dialysis (SLED)"
    ],
    experience: [
          "Senior Director, Nephrology & Renal Transplant, Livasa Hospital, Mohali",
          "Pioneered establishment of advanced nephrology and dialysis centers across Punjab",
          "Lead Transplant Nephrologist for domestic and international recipient-donor programs"
    ],
    treatments: [],
    bio: [
          "Dr. Raka Kaushal is a celebrated nephrologist with over 20 years of clinical mastery, trained at Maulana Azad Medical College and Sanjay Gandhi Postgraduate Institute of Medical Sciences (SGPGI).",
          "She has overseen nearly 800 successful kidney transplants and over 100,000 dialysis treatments. Dr. Kaushal is one of the few nephrologists in India to implement successful ABO-incompatible kidney transplant programs, offering hope to patients without matched donors.",
          "Her comprehensive care covers advanced chronic kidney disease (CKD), glomerulonephritis management, peritoneal dialysis, and post-transplant immunosuppression optimization."
    ],
  },
    {
    slug: 'dr-vineet-saggar',
    name: 'Dr. Vineet Saggar',
    role: 'Director, Neuro & Spine Surgery',
    specialty: 'Neurosurgery & Spine',
    department: 'Neuro Surgery',
    group: 'neuro',
    groupLabel: 'Neuro & Spine',
    years: '20+',
    img: '/img/doctors/dr-vineet-saggar.jpeg',
    initials: 'VS',
    hospital: 'livasa-mohali',
    type: 'doctor',
    shortName: 'Dr. Saggar',
    quals: [
          "MBBS - Maulana Azad Medical College, New Delhi",
          "MS (General Surgery) - Safdarjung Hospital, New Delhi",
          "M.Ch. (Neurosurgery) - PGIMER, Chandigarh",
          "Fellowship in Minimally Invasive Spine Surgery & Neuro-Endoscopy"
    ],
    highlights: [
          "Director of Neuro & Spine Surgery with over 20 years of surgical experience",
          "Trained at India's top medical institutes: Maulana Azad, Safdarjung, and PGIMER Chandigarh",
          "More than 5,000 successful brain, cranial, and spinal surgeries performed",
          "Specialist in endoscopic spine surgery, microscopic discectomies, and spinal fusion",
          "Expert in awake craniotomy, complex brain tumor resections, and skull-base neurosurgery"
    ],
    experience: [
          "Director - Neuro & Spine Surgery, Livasa Hospital, Mohali",
          "Former Senior Consultant Neurosurgeon at Fortis Hospital and Max Healthcare",
          "Senior surgical faculty and mentor in minimally invasive neurosurgical techniques"
    ],
    treatments: ["spine-surgery"],
    bio: [
          "Dr. Vineet Saggar is a renowned neurosurgeon and spine surgeon with two decades of high-volume surgical expertise. Having trained at Maulana Azad, Safdarjung, and PGIMER Chandigarh, he has performed over 5,000 brain and spine operations.",
          "His primary clinical focus is on minimally invasive and endoscopic procedures for brain tumors, spinal disc herniations, spinal stenosis, and complex cranial trauma, ensuring rapid mobilization and minimal postoperative discomfort.",
          "For international patients, Dr. Saggar conducts meticulous MRI/CT scan reviews to clarify whether surgery is genuinely necessary and proposes the least invasive intervention."
    ],
  },
    {
    slug: 'dr-manuj-wadhwa',
    name: 'Dr. Manuj Wadhwa',
    role: 'Chairman & Executive Director, Orthopaedics & Joint Replacement',
    specialty: 'Orthopaedics & Joint Replacement',
    department: 'Orthopaedics',
    group: 'ortho',
    groupLabel: 'Orthopaedics',
    years: '25+',
    img: '/img/doctors/dr-manuj-wadhwa.jpeg',
    initials: 'MW',
    hospital: 'livasa-mohali',
    type: 'doctor',
    shortName: 'Dr. Wadhwa',
    quals: [
          "MBBS - Gold Medalist",
          "MS (Orthopaedics)",
          "M.Ch. (Orthopaedics) - United Kingdom",
          "Fellowship in Joint Replacement & Arthroscopy (USA, Germany, Australia, Switzerland)"
    ],
    highlights: [
          "Over 25 years in orthopaedic surgery with 40,000+ joint replacements performed",
          "World record holder for highest number of joint replacements conducted in a single decade",
          "Pioneer of fast-track robotic-assisted knee and hip replacement in Northern India",
          "Pioneered customized patient-specific knee instrumentation and high-flexion implants",
          "Recipient of numerous prestigious awards including the Rashtriya Ratan Award"
    ],
    experience: [
          "Chairman & Executive Director, Livasa Bone & Joint Institute",
          "Former Director & Head of Orthopaedics, Max Super Speciality Hospital, Mohali",
          "Lead Arthroplasty Consultant for elite athletes and international patients"
    ],
    treatments: ["knee-replacement","hip-replacement"],
    bio: [
          "Dr. Manuj Wadhwa is an internationally renowned orthopaedic surgeon who has performed over 40,000 knee and hip replacements over a 25-year surgical career.",
          "Recognized with world records for surgical volume and clinical precision, Dr. Wadhwa pioneered rapid recovery protocols in joint replacement, enabling patients to stand and walk within hours of surgery with minimal tissue disruption.",
          "He provides international patients with customized implant selections, digital robotic pre-planning, and structured recovery care."
    ],
  },
    {
    slug: 'dr-robin-bohat',
    name: 'Dr. Robin Bohat',
    role: 'Consultant, Orthopaedics & Joint Replacement',
    specialty: 'Orthopaedics & Sports Injury',
    department: 'Orthopaedics',
    group: 'ortho',
    groupLabel: 'Orthopaedics',
    years: '10+',
    img: '/img/doctors/dr-robin-bohat.jpeg',
    initials: 'RB',
    hospital: 'livasa-mohali',
    type: 'doctor',
    shortName: 'Dr. Bohat',
    quals: [
          "MBBS",
          "MS (Orthopaedics)",
          "Fellowship in Arthroscopy and Sports Injury",
          "Fellowship in Joint Replacement Surgery"
    ],
    highlights: [
          "Over 10 years of focused orthopaedic surgical practice",
          "Specialist in arthroscopic knee ligament reconstruction (ACL, PCL, Meniscus)",
          "Expertise in primary and revision knee and hip arthroplasties",
          "Comprehensive management of complex articular trauma and fractures",
          "Dedicated sports injury rehabilitation and joint preservation programs"
    ],
    experience: [
          "Consultant Orthopaedic Surgeon, Livasa Hospital, Mohali",
          "Consultant Orthopaedics in major regional trauma and joint care centers"
    ],
    treatments: ["knee-replacement"],
    bio: [
          "Dr. Robin Bohat is a fellowship-trained orthopaedic surgeon specializing in arthroscopic sports surgery, keyhole ligament reconstruction, and joint replacement.",
          "He brings advanced training in minimally invasive joint preservation techniques, ensuring patients with athletic injuries or early osteoarthritis recover mobility quickly.",
          "Dr. Bohat works closely with physiotherapists to establish personalized rehabilitation schedules for patients traveling from abroad."
    ],
  },
    {
    slug: 'dr-deepak-chadha',
    name: 'Dr. Deepak Chadha',
    role: 'Consultant Neurologist & Epileptologist',
    specialty: 'Neurology & Epilepsy',
    department: 'Neurologist and Epileptiologist',
    group: 'neuro',
    groupLabel: 'Neuro & Spine',
    years: '15+',
    img: '/img/doctors/dr-deepak-chadha.png',
    initials: 'DC',
    hospital: 'livasa-mohali',
    type: 'doctor',
    shortName: 'Dr. Chadha',
    quals: [
          "MBBS",
          "MD (General Medicine)",
          "DM (Neurology)",
          "Specialized Fellowship in Clinical Epileptology and Video EEG"
    ],
    highlights: [
          "Senior Neurologist with over 15 years of dedicated neurological practice",
          "Sub-specialized in medical and pre-surgical evaluation of refractory epilepsy",
          "Expert in acute ischemic stroke intervention and neuro-critical care",
          "Specialist in movement disorders (Parkinson's disease), neuropathy, and headache disorders",
          "Advanced proficiency in electrophysiology, EMG, nerve conduction studies, and long-term EEG"
    ],
    experience: [
          "Senior Consultant Neurologist, Livasa Hospital, Mohali",
          "Senior Neurologist across leading tertiary care neurology hospitals in Punjab"
    ],
    treatments: [],
    bio: [
          "Dr. Deepak Chadha is an experienced neurologist and clinical epileptologist with more than 15 years of clinical practice diagnosing and managing complex central and peripheral nervous system disorders.",
          "His primary expertise includes intractable epilepsy, stroke rehabilitation, neuromuscular disorders, autoimmune encephalitis, and headache syndromes. He utilizes state-of-the-art neuro-diagnostic equipment to craft precise medical management strategies.",
          "International patients consult Dr. Chadha for comprehensive secondary opinions on seizure control, diagnostic workups, and targeted medication adjustments."
    ],
  },
    {
    slug: 'dr-sonal',
    name: 'Dr. Sonal',
    role: 'Consultant, Pulmonary Medicine',
    specialty: 'Pulmonology & Sleep Medicine',
    department: 'Pulmonologist',
    group: 'chest',
    groupLabel: 'Pulmonology',
    years: '6+',
    img: '/img/doctors/dr-sonal.jpeg',
    initials: 'S',
    hospital: 'livasa-mohali',
    type: 'doctor',
    shortName: 'Dr. Sonal',
    quals: [
          "MBBS",
          "MD (Pulmonary Medicine)",
          "DNB (Respiratory Diseases)",
          "Fellowship in Interventional Pulmonology & Sleep Disorders",
          "Member of the European Respiratory Society (ERS)"
    ],
    highlights: [
          "Over 6 years of focused clinical experience in respiratory and sleep medicine",
          "Expert in flexible bronchoscopy, transbronchial lung biopsy, and EBUS diagnostics",
          "Specialist in asthma, chronic obstructive pulmonary disease (COPD), and pulmonary fibrosis (ILD)",
          "Comprehensive diagnostic evaluation and CPAP titration for obstructive sleep apnoea",
          "Published author in prominent national and international respiratory journals"
    ],
    experience: [
          "Consultant, Pulmonary Medicine, Livasa Hospital, Mohali",
          "Senior Resident in Pulmonary Medicine at premier tertiary healthcare centers"
    ],
    treatments: [],
    bio: [
          "Dr. Sonal is a consultant in pulmonary medicine and sleep disorders specializing in diagnostic and interventional chest medicine.",
          "She offers thorough clinical assessments for chronic cough, breathlessness, asthma, COPD, and sleep apnea, incorporating non-invasive lung function testing, sleep studies, and minimally invasive airway procedures.",
          "For overseas travelers requiring pre-operative pulmonary clearance or chronic respiratory management, Dr. Sonal provides comprehensive evaluation plans."
    ],
  },
    {
    slug: 'dr-kritarth',
    name: 'Dr. Kritarth',
    role: 'Consultant, Pulmonary & Critical Care Medicine',
    specialty: 'Pulmonary & Critical Care',
    department: 'Pulmonologist',
    group: 'chest',
    groupLabel: 'Pulmonology',
    years: '8+',
    img: '/img/doctors/dr-kritarth.jpeg',
    initials: 'K',
    hospital: 'livasa-mohali',
    type: 'doctor',
    shortName: 'Dr. Kritarth',
    quals: [
          "MBBS",
          "MD (Pulmonary Medicine)",
          "Indian Diploma in Critical Care Medicine (IDCCM)",
          "European Diploma in Adult Respiratory Medicine (EDARM)"
    ],
    highlights: [
          "Over 8 years of intensive respiratory and critical care management experience",
          "Certified with European Diploma in Adult Respiratory Medicine",
          "Expert in pleural disease management, chest drain insertions, and medical thoracoscopy",
          "Specialist in respiratory failure, ARDS, and complex pulmonary infections",
          "Advanced training in lung ultrasound, bronchoscopic diagnostics, and mechanical ventilation"
    ],
    experience: [
          "Consultant, Pulmonary & Critical Care Medicine, Livasa Hospital, Mohali",
          "Intensivist and Pulmonologist at apex tertiary care hospitals"
    ],
    treatments: [],
    bio: [
          "Dr. Kritarth is a pulmonary medicine and critical care specialist dedicated to treating severe lung diseases and managing acute respiratory distress.",
          "Holding the prestigious European Diploma in Adult Respiratory Medicine (EDARM), he specializes in interventional pulmonology, intercostal drainages, and specialized medical management of interstitial lung disease, pneumonia, and sleep-disordered breathing.",
          "He assists international patients who need comprehensive lung function testing, second opinions on complex lung shadows or nodules, and post-illness rehabilitation."
    ],
  },
    {
    slug: 'dr-avinash-srivastava',
    name: 'Dr. Avinash Srivastava',
    role: 'Senior Director, Urology & Kidney Transplant',
    specialty: 'Urology & Kidney Transplant',
    department: 'Urologist',
    group: 'kidney',
    groupLabel: 'Kidney & Urology',
    years: '20+',
    img: '/img/doctors/dr-avinash-srivastava.jpeg',
    initials: 'AS',
    hospital: 'livasa-mohali',
    type: 'doctor',
    shortName: 'Dr. Srivastava',
    quals: [
          "MBBS",
          "MS (General Surgery)",
          "M.Ch. (Urology)",
          "Fellowship in Endourology and Laparoscopic Urological Surgery",
          "Member of the Urological Society of India (USI)"
    ],
    highlights: [
          "Senior Director with over 20 years of surgical expertise in urology and transplantation",
          "Extensive track record in living-donor renal transplant surgeries and laparoscopic donor nephrectomies",
          "Pioneer in laser prostatectomies (HoLEP/TURP) and advanced stone surgery (RIRS & Mini-PCNL)",
          "Expert in reconstructive urology, urethral stricture repair, and uro-oncological procedures",
          "Performed thousands of minimally invasive endourological operations"
    ],
    experience: [
          "Senior Director, Urology & Kidney Transplant, Livasa Hospital, Mohali",
          "Former Head of Urology at major regional tertiary teaching hospitals"
    ],
    treatments: [],
    bio: [
          "Dr. Avinash Srivastava is a distinguished urologist and kidney transplant surgeon with over two decades of clinical mastery in minimally invasive endourology and renal surgery.",
          "He specializes in laser stone removals using flexible ureterorenoscopy (RIRS), holmium laser enucleation of the prostate (HoLEP), laparoscopic donor nephrectomies, and bladder tumor resections.",
          "For international patients, Dr. Srivastava offers quick-recovery, scarless, or keyhole procedures designed to resolve urinary conditions with minimal downtime."
    ],
  },
    {
    slug: 'dr-sakshi-srivastava',
    name: 'Dr. Sakshi Srivastava',
    role: 'Consultant, Robotic & Laparoscopic Gynaecology',
    specialty: 'Gynaecology & Robotic Surgery',
    department: 'Robotic Gynecologist',
    group: 'surgery',
    groupLabel: 'Surgery, ENT & Gynae',
    years: '12+',
    img: '/img/doctors/dr-sakshi-srivastava.png',
    initials: 'SS',
    hospital: 'livasa-mohali',
    type: 'doctor',
    shortName: 'Dr. Srivastava',
    quals: [
          "MBBS",
          "MS (Obstetrics & Gynaecology)",
          "Fellowship in Minimal Access Surgery (FMAS)",
          "Certified Robotic Gynaecological Surgeon",
          "Fellowship in Reproductive Medicine & Infertility"
    ],
    highlights: [
          "Over 12 years of specialized surgical practice in gynaecology",
          "Expert in robotic and advanced laparoscopic uterine-preserving surgeries",
          "Specialist in laparoscopic hysterectomies, myomectomies, and ovarian cystectomies",
          "Advanced treatment of severe endometriosis, adenomyosis, and chronic pelvic pain",
          "Fertility-enhancing minimally invasive endoscopic procedures"
    ],
    experience: [
          "Consultant Gynaecologist & Robotic Surgeon, Livasa Hospital, Mohali",
          "Senior Consultant in Minimally Invasive Gynaecology at leading women's healthcare centers"
    ],
    treatments: [],
    bio: [
          "Dr. Sakshi Srivastava is a consultant gynaecologist specializing in robotic and laparoscopic keyhole procedures for benign gynaecological disorders.",
          "Her surgical focus includes robotic-assisted myomectomies (fibroid removal), minimally invasive total laparoscopic hysterectomies, and radical excision of deep infiltrating endometriosis with minimal blood loss and fast convalescence.",
          "International patients benefit from her holistic approach that prioritizes uterine conservation and fertility preservation wherever clinically viable."
    ],
  },
    {
    slug: 'dr-jagpal-pandher',
    name: 'Dr. Jagpal Pandher',
    role: 'Consultant, Rheumatology & Clinical Immunology',
    specialty: 'Rheumatology',
    department: 'Rheumatology',
    group: 'rheum',
    groupLabel: 'Rheumatology',
    years: '15+',
    img: '/img/doctors/dr-jagpal-pandher.jpeg',
    initials: 'JP',
    hospital: 'livasa-mohali',
    type: 'doctor',
    shortName: 'Dr. Pandher',
    quals: [
          "MBBS",
          "MD (Medicine)",
          "Post-Doctoral Fellowship in Clinical Rheumatology",
          "Life Member of the Indian Rheumatology Association (IRA)"
    ],
    highlights: [
          "Over 15 years of dedicated practice in clinical rheumatology and autoimmune diseases",
          "Expert in targeted biologic therapy for rheumatoid arthritis and ankylosing spondylitis",
          "Specialist in lupus (SLE), scleroderma, vasculitis, and Sjogren's syndrome",
          "Skilled in ultrasound-guided joint injections and synovial fluid aspiration",
          "Structured multidisciplinary management of osteoporosis and metabolic bone diseases"
    ],
    experience: [
          "Consultant Rheumatologist, Livasa Hospital, Mohali",
          "Senior Rheumatology Consultant across premier medical networks in Punjab and North India"
    ],
    treatments: [],
    bio: [
          "Dr. Jagpal Pandher is a consultant rheumatologist specializing in the diagnosis and evidence-based treatment of autoimmune and musculoskeletal disorders.",
          "He has broad expertise in modern biologic and small-molecule treatments for rheumatoid arthritis, psoriatic arthritis, ankylosing spondylitis, and systemic lupus erythematosus (SLE), helping prevent irreversible joint and organ damage.",
          "Overseas patients consult Dr. Pandher for in-depth diagnostic clarification, biologic protocol formulation, and coordinated long-term management."
    ],
  },
    {
    slug: 'dr-jatin-sarin',
    name: 'Dr. Jatin Sarin',
    role: 'Director, Medical Oncology',
    specialty: 'Medical Oncology & Precision Medicine',
    department: 'Medical Oncologist',
    group: 'onco',
    groupLabel: 'Oncology & Haematology',
    years: '25+',
    img: '/img/doctors/dr-jatin-sarin.jpeg',
    initials: 'JS',
    hospital: 'livasa-mohali',
    type: 'doctor',
    shortName: 'Dr. Sarin',
    quals: [
          "MBBS",
          "MD (Internal Medicine)",
          "DM (Medical Oncology)",
          "Certified by the European Society for Medical Oncology (ESMO)",
          "Member of American Society of Clinical Oncology (ASCO)"
    ],
    highlights: [
          "Over 25 years of recognized expertise in clinical oncology and cancer therapeutics",
          "Pioneer in targeted therapies, precision oncology, and cancer immunotherapy in the region",
          "Principal Investigator in numerous international oncology clinical trials",
          "Multidisciplinary tumor board leader for lung, breast, GI, and haematological malignancies",
          "Extensive international experience delivering personalized, evidence-based cancer regimens"
    ],
    experience: [
          "Director, Medical Oncology, Livasa Hospital, Mohali",
          "Former Head of Medical Oncology at leading regional cancer institutes",
          "Invited speaker and faculty at major international oncology conferences"
    ],
    treatments: [],
    bio: [
          "Dr. Jatin Sarin is one of Northern India's most revered medical oncologists, possessing over 25 years of experience treating solid tumors and haematological cancers.",
          "Certified by the European Society for Medical Oncology (ESMO), Dr. Sarin specializes in next-generation targeted molecular therapy, cancer immunotherapy, and individualized chemotherapy protocols designed to maximize clinical response while preserving quality of life.",
          "For international cancer patients, Dr. Sarin coordinates multidisciplinary tumor board reviews and establishes comprehensive pre-travel and ongoing medical oncology treatment schedules."
    ],
  },
    {
    slug: 'dr-vijay-bansal',
    name: 'Dr. Vijay Bansal',
    role: 'Director, Surgical Oncology',
    specialty: 'Surgical Oncology',
    department: 'Surgical Oncologist',
    group: 'onco',
    groupLabel: 'Oncology & Haematology',
    years: '18+',
    img: '/img/doctors/dr-vijay-bansal.jpeg',
    initials: 'VB',
    hospital: 'livasa-mohali',
    type: 'doctor',
    shortName: 'Dr. Bansal',
    quals: [
          "MBBS",
          "MS (General Surgery)",
          "M.Ch. (Surgical Oncology)",
          "Fellow of the International College of Surgeons (FICS)",
          "Fellowship in Minimal Access Cancer Surgery"
    ],
    highlights: [
          "Director of Surgical Oncology with over 18 years of specialized cancer surgical experience",
          "More than 4,000 complex oncological surgeries performed with high surgical precision",
          "Specialist in breast-conserving surgery, oncoplasty, and sentinel lymph node biopsies",
          "Expert in head and neck cancer resections, microvascular reconstructions, and thyroidectomies",
          "Advanced gastrointestinal and thoracic cancer resections (HIPEC, PIPAC, and esophagectomies)"
    ],
    experience: [
          "Director, Surgical Oncology, Livasa Hospital, Mohali",
          "Former Chief Surgical Oncologist at leading tertiary cancer centers and teaching hospitals"
    ],
    treatments: [],
    bio: [
          "Dr. Vijay Bansal is a prominent surgical oncologist with over 18 years of experience in radical, organ-sparing, and minimally invasive cancer surgeries.",
          "He specializes in onco-plastic breast surgery, head and neck resections with reconstructive flaps, and comprehensive gastrointestinal cancer operations. His surgical philosophy balances rigorous oncological clearance with aesthetic and functional preservation.",
          "Overseas patients receive clear surgical roadmaps, anticipated recovery timeframes, and dedicated post-operative monitoring."
    ],
  },
    {
    slug: 'dr-meenakshi-mittal',
    name: 'Dr. Meenakshi Mittal',
    role: 'Director, Radiation Oncology',
    specialty: 'Radiation Oncology',
    department: 'Radiation Oncologist',
    group: 'onco',
    groupLabel: 'Oncology & Haematology',
    years: '23+',
    img: '/img/doctors/dr-meenakshi-mittal.jpeg',
    initials: 'MM',
    hospital: 'livasa-mohali',
    type: 'doctor',
    shortName: 'Dr. Mittal',
    quals: [
          "MBBS",
          "MD (Radiotherapy / Radiation Oncology)",
          "Specialized Training in Image-Guided Radiotherapy (IGRT) and Stereotactic Radiosurgery (SRS/SBRT)",
          "Member of Association of Radiation Oncologists of India (AROI)"
    ],
    highlights: [
          "Over 23 years of specialized leadership in modern radiation oncology",
          "Pioneer in high-precision radiotherapy modalities: IMRT, IGRT, VMAT, and CT/MRI-based brachytherapy",
          "Specialist in breast, prostate, head & neck, and gynaecological malignancies",
          "Former Course Coordinator for Post-Graduate Oncology Programs and Principal Investigator in Cancer Registries",
          "Active educator in public cancer awareness and early detection initiatives"
    ],
    experience: [
          "Director, Radiation Oncology, Livasa Hospital, Mohali",
          "Senior Radiation Oncologist and Course Coordinator at Mohan Dai Oswal Cancer Hospital",
          "Principal Investigator in the Punjab Cancer Registry Programme"
    ],
    treatments: [],
    bio: [
          "Dr. Meenakshi Mittal is an accomplished radiation oncologist with 23 years of dedicated clinical practice in high-precision radiation treatments.",
          "She specializes in image-guided radiotherapy (IGRT), intensity-modulated radiotherapy (IMRT), volumetric modulated arc therapy (VMAT), and stereotactic radiosurgery (SRS/SBRT). These modern technologies enable focused radiation delivery directly to tumor sites while sparing critical healthy adjacent tissue.",
          "Dr. Mittal works with international oncology patients to structure efficient, highly focused radiation schedules that minimize duration of stay abroad."
    ],
  },
    {
    slug: 'dr-manika-saluja-parekh',
    name: 'Dr. Manika Saluja Parekh',
    role: 'Consultant, ENT & Head-Neck Surgery',
    specialty: 'ENT & Implant Otology',
    department: 'ENT Surgeon',
    group: 'surgery',
    groupLabel: 'Surgery, ENT & Gynae',
    years: '15+',
    img: '/img/doctors/dr-manika-saluja-parekh.jpeg',
    initials: 'MP',
    hospital: 'livasa-mohali',
    type: 'doctor',
    shortName: 'Dr. Parekh',
    quals: [
          "MBBS",
          "MS (ENT / Otorhinolaryngology)",
          "Fellowship in Implant Otology & Cochlear Implants",
          "Member of the Association of Otolaryngologists of India (AOI)"
    ],
    highlights: [
          "Over 15 years of surgical experience in otorhinolaryngology and head-neck surgery",
          "Fellowship-trained in implant otology and advanced middle ear microscopic reconstruction",
          "Expert in functional endoscopic sinus surgery (FESS), septoplasty, and turbinoplasty",
          "Specialist in tympanoplasty, mastoidectomy, and stapes surgery for hearing restoration",
          "Comprehensive management of pediatric ENT disorders, tonsillectomy, and sleep apnea"
    ],
    experience: [
          "Consultant ENT Surgeon, Livasa Hospital, Mohali",
          "Senior ENT Specialist across major regional and national ENT referral hospitals"
    ],
    treatments: [],
    bio: [
          "Dr. Manika Saluja Parekh is an expert ENT surgeon with 15 years of specialized clinical experience in ear, nose, and throat diseases and head-neck surgery.",
          "She holds a super-specialized fellowship in implant otology and performs delicate microscopic ear surgeries (tympanoplasty, mastoidectomy) and endoscopic sinus interventions (FESS) to treat chronic sinusitis, hearing loss, and nasal obstruction.",
          "For travelers seeking ear or sinus procedures, Dr. Parekh plans compact, efficient surgical itineraries that permit safe flying within days."
    ],
  },
    {
    slug: 'dr-ajay-singh',
    name: 'Dr. Ajay Singh',
    role: 'Consultant, Neurosurgery & Spine Surgery',
    specialty: 'Neurosurgery & Spine Surgery',
    department: 'Spine Surgeon',
    group: 'neuro',
    groupLabel: 'Neuro & Spine',
    years: '5+',
    img: '/img/doctors/dr-ajay-singh.jpeg',
    initials: 'AS',
    hospital: 'livasa-mohali',
    type: 'doctor',
    shortName: 'Dr. Singh',
    quals: [
          "MBBS",
          "MS (General Surgery)",
          "M.Ch. (Neurosurgery)",
          "Specialized Training in MISS & Endoscopic Spine Surgery",
          "Member of Neurological Society of India (NSI)"
    ],
    highlights: [
          "Specialist in endoscopic and minimally invasive spine surgeries (MISS)",
          "Expert in keyhole lumbar discectomy, spinal decompression, and dynamic spinal fixations",
          "Proficient in microscopic brain tumor resections, trauma neurosurgery, and cranial decompression",
          "Former Senior Resident at SMS Medical College, Jaipur",
          "Focus on rapid postoperative ambulation and minimal soft-tissue disruption"
    ],
    experience: [
          "Consultant Neurosurgeon, Livasa Hospital, Mohali",
          "Former Consultant Neurosurgeon at Ivy Hospital (Mohali & Amritsar)",
          "Former Consultant Neurosurgeon at Healing Hospital and Bahra Hospital",
          "Ex-Senior Resident, SMS Medical College, Jaipur"
    ],
    treatments: ["spine-surgery"],
    bio: [
          "Dr. Ajay Singh is a skilled neurosurgeon and spine specialist focusing on minimally invasive spine surgery (MISS) and microscopic neuro-interventions.",
          "He performs endoscopic discectomies, spinal instrumentation, and cranial tumor surgeries using cutting-edge keyhole techniques designed to minimize tissue trauma and expedite physical rehabilitation.",
          "International patients requiring spine evaluations can send MRI scans for Dr. Singh's direct pre-travel assessment."
    ],
  },
    {
    slug: 'dr-srinath-shankar-rathod',
    name: 'Dr. Srinath Shankar Rathod',
    role: 'Senior Consultant, General & Minimal Access Surgery',
    specialty: 'General & Minimal Access Surgery',
    department: 'Robotic General Surgeon',
    group: 'surgery',
    groupLabel: 'Surgery, ENT & Gynae',
    years: '10+',
    img: '/img/doctors/dr-srinath-shankar-rathod.jpeg',
    initials: 'SR',
    hospital: 'livasa-mohali',
    type: 'doctor',
    shortName: 'Dr. Rathod',
    quals: [
          "MBBS",
          "MS (General Surgery) - PGIMER, Chandigarh",
          "Fellow in Minimal Access Surgery (FMAS)",
          "Fellow of the Association of Minimal Access Surgeons of India (AMASI)"
    ],
    highlights: [
          "Over a decade of surgical experience trained at the premier PGIMER Chandigarh",
          "Specialist in laparoscopic hernia repairs (TEP, TAPP, and ventral hernia repairs)",
          "Expert in laparoscopic cholecystectomy (gallbladder) and laparoscopic appendectomy",
          "Trained in robotic-assisted abdominal wall reconstructions and gastrointestinal surgeries",
          "Focus on day-care and short-stay surgical procedures with aesthetic wound closure"
    ],
    experience: [
          "Senior Consultant & Associate Director, General & Laparoscopic Surgery, Livasa Hospital",
          "Former Surgical Specialist at PGIMER, Chandigarh"
    ],
    treatments: [],
    bio: [
          "Dr. Srinath Shankar Rathod is a general and laparoscopic surgeon trained at PGIMER Chandigarh, with more than 10 years of surgical experience.",
          "He specializes in keyhole abdominal surgeries, complex laparoscopic hernia reconstructions, gallbladder removals, and emergency surgical care. His minimal-access techniques ensure minimal scarring, minimal pain, and rapid discharge.",
          "Dr. Rathod ensures overseas patients enjoy streamlined pre-operative clearance, smooth operative care, and prompt fit-to-fly certifications."
    ],
  },
    {
    slug: 'dr-yogendra-kumar',
    name: 'Dr. Yogendra Kumar',
    role: 'Senior Consultant, Gastroenterology & Hepatology',
    specialty: 'Gastroenterology & Hepatology',
    department: 'Gastroenterologist & Hepatologist',
    group: 'gastro',
    groupLabel: 'Gastro & Liver',
    years: '8+',
    img: '/img/doctors/dr-yogendra-kumar.jpeg',
    initials: 'YK',
    hospital: 'livasa-mohali',
    type: 'doctor',
    shortName: 'Dr. Kumar',
    quals: [
          "MBBS - Government Medical College (PMCH, Dhanbad)",
          "MD (Internal Medicine) - PGIMER, Chandigarh",
          "DM (Hepatology) - PGIMER, Chandigarh",
          "Member of Indian National Association for Study of the Liver (INASL)"
    ],
    highlights: [
          "Super-specialized in Hepatology from the apex institute PGIMER Chandigarh",
          "Over 8 years of clinical practice in advanced liver diseases and digestive disorders",
          "Expert in viral hepatitis (Hepatitis B & C), cirrhosis, fatty liver disease, and liver failure",
          "Proficient in diagnostic and therapeutic upper GI endoscopy, colonoscopy, and variceal banding",
          "Specialist in pancreatico-biliary disorders and chronic inflammatory bowel diseases (IBD)"
    ],
    experience: [
          "Senior Consultant, Gastroenterology & Hepatology, Livasa Hospital, Mohali",
          "Specialist Hepatologist and Gastroenterologist at PGIMER Chandigarh"
    ],
    treatments: [],
    bio: [
          "Dr. Yogendra Kumar is a PGIMER-trained hepatologist and gastroenterologist dedicated to comprehensive management of liver and digestive tract diseases.",
          "He specializes in viral hepatitis, non-alcoholic fatty liver disease (NAFLD), cirrhosis management, and diagnostic endoscopies, delivering clear medical plans based on the latest international guidelines.",
          "Dr. Kumar provides overseas patients with thorough evaluations and long-term care plans for chronic digestive and hepatobiliary conditions."
    ],
  },
    {
    slug: 'dr-pankaj-kapoor',
    name: 'Dr. Pankaj Kapoor',
    role: 'Associate Director, Gastroenterology & Hepatology',
    specialty: 'Gastroenterology & Interventional Endoscopy',
    department: 'Gastroenterologist & Hepatologist',
    group: 'gastro',
    groupLabel: 'Gastro & Liver',
    years: '13+',
    img: '/img/doctors/dr-pankaj-kapoor.jpeg',
    initials: 'PK',
    hospital: 'livasa-mohali',
    type: 'doctor',
    shortName: 'Dr. Kapoor',
    quals: [
          "MBBS - Indira Gandhi Medical College (IGMC), Shimla",
          "MD (Internal Medicine) - PGIMER, Chandigarh",
          "DM (Gastroenterology) - PGIMER, Chandigarh",
          "Member of Society of Gastrointestinal Endoscopy of India (SGEI)"
    ],
    highlights: [
          "Over 13 years of advanced clinical practice in gastroenterology and therapeutic endoscopy",
          "Super-specialist in ERCP (bile duct stone extraction and biliary stenting)",
          "Expert in diagnostic and therapeutic Endoscopic Ultrasound (EUS)",
          "Specialist in acute and chronic pancreatitis, GI bleeds, and luminal stentings",
          "Performed thousands of complex upper and lower endoscopic procedures"
    ],
    experience: [
          "Associate Director, Gastroenterology & Hepatology, Livasa Hospital, Mohali",
          "Former Consultant Gastroenterologist at Paras Hospital and Ojas Superspeciality Hospital, Panchkula",
          "Consultant Gastroenterologist at Ivy Hospital, Hoshiarpur"
    ],
    treatments: [],
    bio: [
          "Dr. Pankaj Kapoor is an accomplished gastroenterologist and interventional endoscopist with over 13 years of advanced clinical experience, trained at PGIMER Chandigarh.",
          "He is widely recognized for his expertise in therapeutic ERCP, endoscopic ultrasound (EUS) with fine-needle aspiration, and the management of difficult bile duct stones, pancreatitis, and gastrointestinal cancers.",
          "International patients consult Dr. Kapoor for complex diagnostic endoscopic evaluations and minimally invasive gastrointestinal procedures."
    ],
  },
    {
    slug: 'dr-akash-gandotra',
    name: 'Dr. Akash Gandotra',
    role: 'Senior Consultant, Gastroenterology & Liver Transplant Specialist',
    specialty: 'Gastroenterology, Hepatology & Liver Transplant',
    department: 'Gastroenterologist & Hepatologist',
    group: 'gastro',
    groupLabel: 'Gastro & Liver',
    years: '10+',
    img: '/img/doctors/dr-akash-gandotra.png',
    initials: 'AG',
    hospital: 'livasa-mohali',
    type: 'doctor',
    shortName: 'Dr. Gandotra',
    quals: [
          "MBBS - ASCOMS, Jammu",
          "MD (Internal Medicine) - Government Medical College (GMC), Jammu",
          "DM (Hepatology) - PGIMER, Chandigarh",
          "Fellowship in Bariatric Endoscopy - IRCAD, Indore/France"
    ],
    highlights: [
          "Over 10 years of clinical and procedural experience in gastroenterology and hepatology",
          "Trained in Hepatology at PGIMER Chandigarh with fellowship in bariatric endoscopy",
          "Specialist in liver transplantation assessment, living donor evaluations, and post-transplant care",
          "Expert in non-surgical endoscopic bariatric treatments for obesity and metabolic syndrome",
          "Advanced diagnostic colonoscopy, polypectomy, and therapeutic endoscopy"
    ],
    experience: [
          "Consultant Gastroenterologist & Liver Transplant Specialist, Paras Health, Panchkula",
          "Senior Resident, DM Hepatology, PGIMER Chandigarh",
          "Consultant at Parvati Devi Hospital, Amritsar",
          "Senior Resident, Sharda Hospital and Adesh Medical College"
    ],
    treatments: [],
    bio: [
          "Dr. Akash Gandotra is a PGIMER-trained hepatologist and certified bariatric endoscopist with over 10 years of clinical and interventional practice.",
          "He provides comprehensive evaluations for liver transplant candidates and recipients, as well as minimally invasive endoscopic bariatric solutions for weight management and non-alcoholic steatohepatitis (NASH).",
          "He assists overseas visitors with detailed liver health assessments, endoscopic screenings, and personalized digestive health programs."
    ],
  },
    {
    slug: 'dr-mukesh-chawla',
    name: 'Dr. Mukesh Chawla',
    role: 'Senior Consultant, Clinical Haematology & Bone Marrow Transplant',
    specialty: 'Haematology & Bone Marrow Transplant',
    department: 'Hematology',
    group: 'onco',
    groupLabel: 'Oncology & Haematology',
    years: '12+',
    img: '/img/doctors/dr-mukesh-chawla.jpeg',
    initials: 'MC',
    hospital: 'livasa-mohali',
    type: 'doctor',
    shortName: 'Dr. Chawla',
    quals: [
          "MBBS",
          "MD (Internal Medicine)",
          "DrNB (Clinical Haematology) - National Board of Examinations",
          "Fellowship in Bone Marrow Transplantation (BMT)",
          "Member of the Indian Society of Haematology and Blood Transfusion (ISHBT)"
    ],
    highlights: [
          "Over 12 years of specialized clinical experience in haematology and stem cell transplantation",
          "Expert in treatment of acute and chronic leukemias (AML, ALL, CML, CLL)",
          "Specialist in Hodgkin & Non-Hodgkin lymphomas and multiple myeloma",
          "Advanced management of myelodysplastic syndrome (MDS) and aplastic anemia",
          "Comprehensive autologous and allogeneic bone marrow transplantation programs"
    ],
    experience: [
          "Senior Consultant, Clinical Haematology & BMT Physician, Livasa Hospital, Mohali",
          "Senior Haematologist and BMT Consultant at leading tertiary blood cancer institutions"
    ],
    treatments: [],
    bio: [
          "Dr. Mukesh Chawla is a specialist clinical haematologist and bone marrow transplant physician with more than 12 years of clinical excellence.",
          "He specializes in managing malignant and non-malignant blood conditions including leukemia, lymphoma, multiple myeloma, thalassemia, and aplastic anemia. He is experienced in conducting autologous and allogeneic stem cell transplants.",
          "For overseas patients requiring hematology consultations or bone marrow transplant planning, Dr. Chawla conducts rigorous diagnostic reviews and treatment sequencing."
    ],
  },
];

export const DOCTOR_TREATMENTS_MAP: Record<string, DoctorTreatment> = {
  'knee-replacement': {
    slug: 'knee-replacement',
    name: 'Knee Replacement',
    tag: 'Orthopaedics',
    summary: 'Total, partial and robotic-assisted knee replacement, planned with your surgeon before you travel.',
    img: '/images/treatments/knee-replacement.jpg',
    priceNote: 'From $3,999',
  },
  'hip-replacement': {
    slug: 'hip-replacement',
    name: 'Hip Replacement',
    tag: 'Orthopaedics',
    summary: 'Total hip replacement and revision surgery, with physiotherapy built into your stay.',
    img: '/images/treatments/hip-replacement.jpg',
    priceNote: 'See details',
  },
  'cataract-surgery': {
    slug: 'cataract-surgery',
    name: 'Cataract Surgery',
    tag: 'Eye care',
    summary: 'Day-case cataract surgery with a choice of lens, in about a week in Mohali.',
    img: '/images/treatments/cataract-surgery.jpg',
    priceNote: 'See details',
  },
  'lasik': {
    slug: 'lasik',
    name: 'LASIK & Refractive Surgery',
    tag: 'Eye care',
    summary: "Laser vision correction after a full suitability check. Not everyone is a candidate, and we'll tell you.",
    img: '/images/treatments/lasik.jpg',
    priceNote: 'See details',
  },
  'cosmetic-surgery': {
    slug: 'cosmetic-surgery',
    name: 'Cosmetic & Plastic Surgery',
    tag: 'Cosmetic & Plastic Surgery',
    summary: 'Body and facial procedures with an unhurried consultation first, and enough recovery time before you fly.',
    img: '/images/treatments/cosmetic-surgery.jpg',
    priceNote: 'See details',
  },
};
