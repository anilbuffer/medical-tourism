import { TREATMENT_COSTS, type TreatmentCostData } from './treatmentCosts';
export { TREATMENT_COSTS, type TreatmentCostData };

import type {
  TreatmentOption,
  TreatmentFact,
  TreatmentTimelineStep,
  TreatmentItem,
  CheckupPackage,
  WellnessProgram,
  SpecialtyItem,
} from '@/types';

export type {
  TreatmentOption,
  TreatmentFact,
  TreatmentTimelineStep,
  TreatmentItem,
  CheckupPackage,
  WellnessProgram,
  SpecialtyItem,
};

export const SPECIALTIES: SpecialtyItem[] = [
  {
    "id": "orthopaedics",
    "name": "Orthopaedics",
    "icon": "bone",
    "treatments": [
      "Knee Replacement",
      "Hip Replacement",
      "ACL Reconstruction",
      "Anterior Cervical Discectomy & Fusion (ACDF)",
      "Minimally Invasive Spine Surgery"
    ]
  },
  {
    "id": "cosmetic",
    "name": "Cosmetic Surgery",
    "icon": "scalpel",
    "treatments": [
      "Rhinoplasty",
      "Breast Implants",
      "Hair Transplant",
      "Liposuction",
      "Tummy Tuck"
    ]
  },
  {
    "id": "eye",
    "name": "Ophthalmology",
    "icon": "eye",
    "treatments": [
      "Cataract Surgery",
      "LASIK & Refractive Surgery",
      "Vitrectomy",
      "Cornea Transplant"
    ]
  },
  {
    "id": "dental",
    "name": "Dental Implants",
    "icon": "tooth",
    "treatments": [
      "Dental Implants",
      "Full Mouth Implants",
      "Smile Design"
    ]
  },
  {
    "id": "fertility",
    "name": "Fertility",
    "icon": "baby",
    "treatments": [
      "IVF",
      "ICSI"
    ]
  },
  {
    "id": "cardiac",
    "name": "Cardiac Sciences",
    "icon": "heart",
    "treatments": [
      "Coronary Angioplasty & Stenting",
      "Coronary Artery Bypass (CABG)",
      "Heart Valve Replacement & Repair",
      "Cardiac Pacemaker & AICD Implantation"
    ]
  }
];

export const TREATMENTS: TreatmentItem[] = [
  {
    "slug": "knee-replacement",
    "name": "Knee Replacement",
    "spec": "orthopaedics",
    "specName": "Orthopaedics",
    "priceFrom": 3000,
    "saving": "~68%",
    "addon": false,
    "img": "/images/treatments/knee-replacement.jpg",
    "summary": "Total, partial and robotic-assisted knee replacement, planned with your surgeon before you travel.",
    "intro": "Knee replacement is one of the most common reasons people travel to India for surgery, and one of the easiest to plan well in advance. Your surgeon reviews your X-rays before you book anything, so you arrive knowing which operation you are having and what the recovery plan looks like.",
    "options": [
      {
        "title": "Total knee replacement",
        "description": "All three compartments of the joint are resurfaced. The usual choice for advanced arthritis."
      },
      {
        "title": "Partial (unicompartmental) replacement",
        "description": "Only the worn part of the knee is replaced. Suitable for patients with damage limited to one side."
      },
      {
        "title": "Robotic-assisted replacement",
        "description": "The surgeon uses a robotic arm to plan and guide precision bone cuts."
      },
      {
        "title": "Bilateral replacement",
        "description": "Both knees can sometimes be done in one admission or a few days apart, based on overall health."
      }
    ],
    "suited": [
      "Arthritis causing severe pain that limits walking or sleep",
      "Pain not controlled by medication, injections or physiotherapy",
      "Long waiting lists or high costs in home country"
    ],
    "facts": [
      {
        "label": "Time in India",
        "value": "3–4 weeks"
      },
      {
        "label": "Hospital stay",
        "value": "3–5 nights"
      },
      {
        "label": "Walking",
        "value": "With support from day 1–2"
      },
      {
        "label": "Fit to fly",
        "value": "Decided by your surgeon"
      }
    ],
    "timeline": [
      {
        "period": "Days 1–2",
        "description": "Arrival, pre-operative tests, meeting your surgeon and anaesthetist."
      },
      {
        "period": "Day 2–3",
        "description": "Surgery. Standing with support within 24 hours."
      },
      {
        "period": "Days 3–7",
        "description": "In-hospital recovery and physiotherapy, then transfer to recovery suite."
      },
      {
        "period": "Weeks 2–3",
        "description": "Daily physiotherapy, wound check and stitch removal."
      },
      {
        "period": "Week 3–4",
        "description": "Final fit-to-fly assessment, discharge summary and home care plan."
      }
    ],
    "included": [
      "Surgeon's and anaesthetist's fees",
      "US FDA-approved implant (type agreed in written quote)",
      "Hospital stay in private en-suite room",
      "Pre-operative tests and post-op physiotherapy",
      "Airport pickup and dedicated patient coordinator"
    ],
    "excluded": [
      "Flights and visa fees",
      "Extra recovery nights beyond the package",
      "Treatment of unrelated incidental medical conditions"
    ],
    "doctors": [
      "dr-jatinder-singla",
      "dr-manuj-wadhwa"
    ],
    "guide": "knee-replacement-india",
    "note": null,
    "hospitals": [
      "max-super-speciality-mohali",
      "fortis-mohali",
      "livasa-mohali"
    ],
    "priceMode": "starting"
  },
  {
    "slug": "hip-replacement",
    "name": "Hip Replacement",
    "spec": "orthopaedics",
    "specName": "Orthopaedics",
    "priceFrom": 6000,
    "saving": "~40%",
    "addon": false,
    "img": "/images/treatments/hip-replacement.jpg",
    "summary": "Total hip replacement and ceramic joint restoration with physiotherapy built into your stay.",
    "intro": "Hip replacement relieves persistent joint pain and restores mobility when the hip is damaged by arthritis, trauma or avascular necrosis. Your surgeon assesses MRI and X-ray imaging in a direct video consultation before you fly.",
    "options": [
      {
        "title": "Total hip replacement",
        "description": "The ball and socket are replaced with durable ceramic/titanium components."
      },
      {
        "title": "Minimally invasive anterior approach",
        "description": "Muscle-sparing surgical approach allowing accelerated initial recovery."
      },
      {
        "title": "Revision hip replacement",
        "description": "Specialised replacement of previous implants that have experienced wear."
      }
    ],
    "suited": [
      "Hip arthritis that restricts walking, sitting or sleep",
      "Avascular necrosis (AVN) of the femoral head",
      "Previous hip implant wear requiring revision"
    ],
    "facts": [
      {
        "label": "Time in India",
        "value": "3–4 weeks"
      },
      {
        "label": "Hospital stay",
        "value": "3–5 nights"
      },
      {
        "label": "Walking",
        "value": "With walker from day 1–2"
      },
      {
        "label": "Fit to fly",
        "value": "Decided by your surgeon"
      }
    ],
    "timeline": [
      {
        "period": "Days 1–2",
        "description": "Hospital admission, cross-match labs and surgeon consultation."
      },
      {
        "period": "Day 2–3",
        "description": "Surgery performed in modular laminar airflow operating theatre."
      },
      {
        "period": "Days 3–6",
        "description": "Monitored hospital stay with guided mobilization."
      },
      {
        "period": "Weeks 2–3",
        "description": "Outpatient physiotherapy and incision checks."
      },
      {
        "period": "Week 3–4",
        "description": "Fit-to-fly clearance, medical report and departure."
      }
    ],
    "included": [
      "Surgeon and anaesthetist fees",
      "High-grade ceramic/titanium hip prosthesis",
      "Hospital room charges and nursing care",
      "Physiotherapy sessions during hospital stay",
      "Airport transfers and personal care manager"
    ],
    "excluded": [
      "International airfare and visas",
      "Additional non-package medications",
      "Extended hotel stay beyond clinical recommendation"
    ],
    "doctors": [
      "dr-jatinder-singla",
      "dr-manuj-wadhwa"
    ],
    "guide": null,
    "note": null,
    "hospitals": [
      "max-super-speciality-mohali",
      "fortis-mohali",
      "livasa-mohali"
    ],
    "priceMode": "starting"
  },
  {
    "slug": "acl-reconstruction",
    "name": "ACL Reconstruction",
    "spec": "orthopaedics",
    "specName": "Orthopaedics",
    "priceFrom": 1500,
    "priceTo": 7000,
    "saving": "~69%",
    "addon": false,
    "img": "/images/treatments/acl-reconstruction.jpg",
    "summary": "Arthroscopic minimally invasive ligament repair and reconstruction with dedicated sports rehab.",
    "intro": "Anterior Cruciate Ligament (ACL) reconstruction restores knee stability following sports injury or trauma. Using keyhole arthroscopy and autograft or allograft techniques, orthopaedic sports medicine specialists rebuild the torn ligament.",
    "options": [
      {
        "title": "Hamstring autograft",
        "description": "Tendon graft harvested through a minor incision for natural biocompatibility."
      },
      {
        "title": "Bone-patellar tendon-bone (BTB)",
        "description": "Strong graft option frequently preferred by high-demand athletes."
      },
      {
        "title": "Combined ACL + Meniscus repair",
        "description": "Simultaneous repair of accompanying meniscus tears during the same arthroscopy."
      }
    ],
    "suited": [
      "Torn ACL with unstable giving-way knee sensation",
      "Athletes seeking return to active sports",
      "Active individuals unable to pivot or run without pain"
    ],
    "facts": [
      {
        "label": "Time in India",
        "value": "10–14 days"
      },
      {
        "label": "Hospital stay",
        "value": "1–2 nights"
      },
      {
        "label": "Walking",
        "value": "Crutches with brace immediately"
      },
      {
        "label": "Fit to fly",
        "value": "After 7–10 days"
      }
    ],
    "timeline": [
      {
        "period": "Day 1",
        "description": "Pre-op sports injury clinic evaluation and MRI review."
      },
      {
        "period": "Day 2",
        "description": "Keyhole arthroscopic surgery."
      },
      {
        "period": "Day 3–4",
        "description": "Post-op brace fitting and initial knee bending exercises."
      },
      {
        "period": "Days 5–10",
        "description": "Supervised outpatient rehabilitation sessions."
      },
      {
        "period": "Day 10–12",
        "description": "Fit-to-fly review and structured 6-month home exercise protocol."
      }
    ],
    "included": [
      "Arthroscopic surgical procedure and theatre fees",
      "Fixation implants (interference screws/endobuttons)",
      "Standard private hospital stay",
      "Knee brace and initial physiotherapy",
      "Airport transfers and coordinator support"
    ],
    "excluded": [
      "Flights and visa costs",
      "Extended specialized rehabilitation weeks",
      "Unrelated diagnostic investigations"
    ],
    "doctors": [
      "dr-jatinder-singla",
      "dr-manuj-wadhwa"
    ],
    "guide": null,
    "note": null,
    "hospitals": [
      "max-super-speciality-mohali",
      "fortis-mohali",
      "livasa-mohali"
    ],
    "priceMode": "range"
  },
  {
    "slug": "acdf-surgery",
    "name": "Anterior Cervical Discectomy & Fusion (ACDF)",
    "spec": "orthopaedics",
    "specName": "Orthopaedics",
    "priceFrom": 7000,
    "priceTo": 13500,
    "saving": "~26%",
    "addon": false,
    "img": "/images/treatments/acdf-surgery.jpg",
    "summary": "Cervical spine decompression and stabilization for herniated discs and severe neck nerve pain.",
    "intro": "ACDF is an established, highly effective surgical procedure to relieve spinal cord or nerve root compression in the neck. Through a small, cosmetic anterior incision, the damaged disc is removed and replaced with a fusion cage to restore spinal alignment.",
    "options": [
      {
        "title": "Single-level ACDF",
        "description": "Decompression of a single compressed cervical disc level with titanium/PEEK cage."
      },
      {
        "title": "Multi-level ACDF",
        "description": "Treatment of consecutive disc prolapses causing myelopathy or radiculopathy."
      },
      {
        "title": "Artificial cervical disc replacement",
        "description": "Motion-preserving alternative suitable for select candidates."
      }
    ],
    "suited": [
      "Cervical disc herniation causing arm numbness or shooting pain",
      "Cervical spondylosis unresponsive to conservative therapies",
      "Loss of hand dexterity or strength from spinal cord pressure"
    ],
    "facts": [
      {
        "label": "Time in India",
        "value": "2–3 weeks"
      },
      {
        "label": "Hospital stay",
        "value": "2–4 nights"
      },
      {
        "label": "Walking",
        "value": "Next day with cervical collar"
      },
      {
        "label": "Fit to fly",
        "value": "10–14 days post-op"
      }
    ],
    "timeline": [
      {
        "period": "Day 1",
        "description": "Pre-anaesthetic workup and spinal MRI review by neurosurgeon."
      },
      {
        "period": "Day 2",
        "description": "Microscopic anterior cervical surgery under neural monitoring."
      },
      {
        "period": "Days 3–5",
        "description": "In-hospital monitoring, mobilization, and swallowing assessment."
      },
      {
        "period": "Week 2",
        "description": "Incision check, collar verification, and post-op cervical X-rays."
      },
      {
        "period": "Week 3",
        "description": "Final neuro evaluation and safe flight certification."
      }
    ],
    "included": [
      "Neurosurgeon and surgical team fees",
      "US FDA/CE certified cervical fusion implants & cage",
      "Intraoperative neuromonitoring safety equipment",
      "Hospital stay and nursing care",
      "Transfers and dedicated bilingual coordinator"
    ],
    "excluded": [
      "International flights and travel insurance",
      "Long-term post-discharge medications",
      "Extended recovery accommodation"
    ],
    "doctors": [
      "dr-vineet-saggar"
    ],
    "guide": null,
    "note": null,
    "hospitals": [
      "livasa-mohali",
      "max-super-speciality-mohali"
    ],
    "priceMode": "range"
  },
  {
    "slug": "minimal-invasive-spine-surgery",
    "name": "Minimally Invasive Spine Surgery",
    "spec": "orthopaedics",
    "specName": "Orthopaedics",
    "priceFrom": 7000,
    "priceTo": 13500,
    "saving": "~7%",
    "addon": false,
    "img": "/images/treatments/minimal-invasive-spine-surgery.jpg",
    "summary": "Endoscopic and tubular lumbar decompression, microdiscectomy and keyhole spinal stabilization.",
    "intro": "Minimally invasive spine surgery (MISS) treats disc herniations, sciatica, and lumbar canal stenosis through incisions under an inch wide. Muscle-splitting tubular retractors spare back muscles, reducing post-operative pain and enabling rapid return to walking.",
    "options": [
      {
        "title": "Microscopic / Endoscopic discectomy",
        "description": "Keyhole removal of herniated disc fragment causing sciatica."
      },
      {
        "title": "MIS lumbar decompression (laminotomy)",
        "description": "Unclamping pinched lumbar nerve roots in spinal canal stenosis."
      },
      {
        "title": "MIS lumbar fusion (TLIF)",
        "description": "Per-cutaneous pedicle screw fixation and interbody fusion for spinal instability."
      }
    ],
    "suited": [
      "Sciatica and radiating leg pain resisting non-surgical therapy",
      "Lumbar canal stenosis limiting walking distance",
      "Spondylolisthesis or recurrent disc protrusion"
    ],
    "facts": [
      {
        "label": "Time in India",
        "value": "2–3 weeks"
      },
      {
        "label": "Hospital stay",
        "value": "2–3 nights"
      },
      {
        "label": "Walking",
        "value": "Day 1 with lumbar support"
      },
      {
        "label": "Fit to fly",
        "value": "10–14 days post-op"
      }
    ],
    "timeline": [
      {
        "period": "Day 1",
        "description": "Neuro/spine consultant review and fresh radiological checks."
      },
      {
        "period": "Day 2",
        "description": "Minimally invasive procedure using high-definition microscope."
      },
      {
        "period": "Days 3–4",
        "description": "Pain management and guided walking in hospital."
      },
      {
        "period": "Days 5–10",
        "description": "Recovery suite recuperation and gentle core physio."
      },
      {
        "period": "Days 11–14",
        "description": "Wound inspection, clearance for flight, and ergonomics guidance."
      }
    ],
    "included": [
      "Surgical procedure, microscope use, and anaesthesia",
      "Spine implants (where fusion is clinically specified)",
      "Standard private hospital stay",
      "Post-operative spinal brace",
      "Dedicated coordinator and all city transfers"
    ],
    "excluded": [
      "Airfare and visa expenses",
      "Additional MRI scans if requested beyond protocol",
      "Personal incidental expenses"
    ],
    "doctors": [
      "dr-vineet-saggar"
    ],
    "guide": null,
    "note": null,
    "hospitals": [
      "livasa-mohali",
      "max-super-speciality-mohali"
    ],
    "priceMode": "range"
  },
  {
    "slug": "rhinoplasty",
    "name": "Rhinoplasty",
    "spec": "cosmetic",
    "specName": "Cosmetic Surgery",
    "priceFrom": 500,
    "saving": "~86%",
    "addon": false,
    "img": "/images/treatments/rhinoplasty.jpg",
    "summary": "Cosmetic and functional nose reshaping by board-certified plastic surgeons for natural facial harmony.",
    "intro": "Rhinoplasty refines the shape, proportion, and breathing function of the nose. Your surgeon evaluates high-resolution facial photos, discusses aesthetic preferences over video, and uses open or closed techniques to sculpt bone and cartilage with precision.",
    "options": [
      {
        "title": "Aesthetic rhinoplasty",
        "description": "Refining the dorsal hump, tip definition, or nasal width."
      },
      {
        "title": "Septorhinoplasty",
        "description": "Correcting a deviated septum to resolve breathing obstruction alongside cosmetic enhancement."
      },
      {
        "title": "Revision rhinoplasty",
        "description": "Secondary reconstruction using cartilage grafts from ear or rib."
      }
    ],
    "suited": [
      "Disproportionate dorsal hump or bulbous/drooping nasal tip",
      "Crooked nose or breathing difficulties following prior fracture",
      "Desire for balanced facial aesthetics"
    ],
    "facts": [
      {
        "label": "Time in India",
        "value": "10–12 days"
      },
      {
        "label": "Hospital stay",
        "value": "1 night"
      },
      {
        "label": "Splint removal",
        "value": "Day 7"
      },
      {
        "label": "Fit to fly",
        "value": "Day 8–10"
      }
    ],
    "timeline": [
      {
        "period": "Day 1",
        "description": "In-person consultation and computerized facial analysis."
      },
      {
        "period": "Day 2",
        "description": "Surgery under general anaesthesia with protective splint application."
      },
      {
        "period": "Day 3",
        "description": "Discharge to hotel or recovery suite."
      },
      {
        "period": "Day 7",
        "description": "Splint and internal silicone splint removal; swelling review."
      },
      {
        "period": "Day 9–10",
        "description": "Fit-to-fly examination and nasal care guidelines."
      }
    ],
    "included": [
      "Plastic surgeon and anaesthetist fees",
      "Operating theatre charges and overnight stay",
      "Nasal splint, dressings, and follow-up reviews",
      "Airport pickup and drop-off",
      "Dedicated coordinator support"
    ],
    "excluded": [
      "Flights and travel visas",
      "Non-prescribed skincare products",
      "Hotel stay beyond hospital night"
    ],
    "doctors": [
      "dr-vikas-gupta"
    ],
    "guide": null,
    "note": null,
    "hospitals": [
      "livasa-mohali",
      "max-super-speciality-mohali"
    ],
    "priceMode": "starting"
  },
  {
    "slug": "breast-implants",
    "name": "Breast Implants",
    "spec": "cosmetic",
    "specName": "Cosmetic Surgery",
    "priceFrom": 1500,
    "saving": "~73%",
    "addon": false,
    "img": "/images/treatments/breast-implants.jpg",
    "summary": "Breast augmentation using premium US FDA-approved silicone gel implants tailored to your anatomy.",
    "intro": "Breast augmentation enhances volume, symmetry, and contour using cohesive silicone gel implants (Mentor/Motiva). In your initial tele-consultation, the surgeon details profile options, incision placements (inframammary, periareolar, or transaxillary), and pocket placement.",
    "options": [
      {
        "title": "Submuscular implant placement",
        "description": "Placed beneath the pectoral muscle for soft transitions and natural mammography."
      },
      {
        "title": "Dual-plane technique",
        "description": "Optimized placement for natural upper fullness and lower pole stretch."
      },
      {
        "title": "Augmentation with mastopexy",
        "description": "Combining volume restoration with breast lift for sagging tissue."
      }
    ],
    "suited": [
      "Loss of breast fullness post-pregnancy or weight changes",
      "Naturally asymmetrical or smaller breast size",
      "Desire for proportional upper-body contour"
    ],
    "facts": [
      {
        "label": "Time in India",
        "value": "10–14 days"
      },
      {
        "label": "Hospital stay",
        "value": "1 night"
      },
      {
        "label": "Recovery garment",
        "value": "Worn for 4–6 weeks"
      },
      {
        "label": "Fit to fly",
        "value": "Day 8–10"
      }
    ],
    "timeline": [
      {
        "period": "Day 1",
        "description": "Surgeon sizing session and pre-op blood/ultrasound panel."
      },
      {
        "period": "Day 2",
        "description": "Surgery in dedicated sterile cosmetic operating suite."
      },
      {
        "period": "Day 3",
        "description": "Discharge in supportive surgical bra."
      },
      {
        "period": "Day 7",
        "description": "Wound inspection and suture check."
      },
      {
        "period": "Day 10",
        "description": "Final clearance, implant serial warranty registration, and departure."
      }
    ],
    "included": [
      "Surgeon and anaesthetist fees",
      "US FDA-approved silicone implants with manufacturer warranty",
      "1 night private hospital accommodation",
      "First post-surgical compression bra",
      "Airport transfers and coordinator"
    ],
    "excluded": [
      "Flights and visa costs",
      "Additional cosmetic surgical garments",
      "Incidental non-package tests"
    ],
    "doctors": [
      "dr-vikas-gupta"
    ],
    "guide": null,
    "note": null,
    "hospitals": [
      "livasa-mohali",
      "max-super-speciality-mohali"
    ],
    "priceMode": "starting"
  },
  {
    "slug": "hair-transplant",
    "name": "Hair Transplant",
    "spec": "cosmetic",
    "specName": "Cosmetic Surgery",
    "priceFrom": 1200,
    "saving": "~45%",
    "addon": false,
    "img": "/images/treatments/hair-transplant.jpg",
    "summary": "Advanced scarless FUE and Direct Hair Implantation (DHI) with high density natural hairlines.",
    "intro": "Follicular Unit Extraction (FUE) and Sapphire DHI transplant individual healthy hair follicles from the donor area to areas of thinning or recession. Performed under local anaesthesia with minimal discomfort, the procedure delivers natural, lifelong hair growth.",
    "options": [
      {
        "title": "Sapphire FUE",
        "description": "Ultra-fine sapphire blades create micro-channels for dense packing and quick healing."
      },
      {
        "title": "Direct Hair Implantation (DHI)",
        "description": "Choi implanter pen technique for direct graft insertion without separate incisions."
      },
      {
        "title": "Beard / Eyebrow restoration",
        "description": "Specialized precision grafting for facial hair density."
      }
    ],
    "suited": [
      "Male or female pattern hair loss (Norwood scale II to VI)",
      "Receding hairline or crown thinning with adequate donor hair",
      "Beard patchiness or scar concealment"
    ],
    "facts": [
      {
        "label": "Time in India",
        "value": "5–7 days"
      },
      {
        "label": "Hospital stay",
        "value": "Outpatient / Day care"
      },
      {
        "label": "First wash",
        "value": "Day 3 at clinic"
      },
      {
        "label": "Fit to fly",
        "value": "Day 3–4"
      }
    ],
    "timeline": [
      {
        "period": "Day 1",
        "description": "Arrival, hairline mapping, and microscopic donor count."
      },
      {
        "period": "Day 2",
        "description": "Graft extraction and implantation session (3,000–4,500 grafts)."
      },
      {
        "period": "Day 3",
        "description": "First gentle medical hair wash and scalp inspection."
      },
      {
        "period": "Day 4–5",
        "description": "Post-care kit demonstration, head protection, and flight clearance."
      }
    ],
    "included": [
      "Full graft extraction & implantation procedure",
      "Local anaesthesia and PRP session for graft vitality",
      "Post-procedure shampoo, lotion, and neck pillow",
      "Clinic follow-up and washing guidance",
      "Airport transfers and coordinator"
    ],
    "excluded": [
      "Flights and visas",
      "Long-term oral hair medications (Finasteride/Minoxidil)",
      "Hotel accommodations"
    ],
    "doctors": [
      "dr-vikas-gupta"
    ],
    "guide": null,
    "note": null,
    "hospitals": [
      "livasa-mohali",
      "max-super-speciality-mohali"
    ],
    "priceMode": "starting"
  },
  {
    "slug": "liposuction",
    "name": "Liposuction",
    "spec": "cosmetic",
    "specName": "Cosmetic Surgery",
    "priceFrom": 1500,
    "priceTo": 7000,
    "saving": "~62%",
    "addon": false,
    "img": "/images/treatments/liposuction.jpg",
    "summary": "VASER ultrasound and Power-Assisted Liposuction (PAL) for high-definition body contouring.",
    "intro": "VASER and ultrasound-assisted liposuction safely liquefies and removes stubborn localized fat deposits resistant to diet and exercise. The procedure sculpts areas like the abdomen, flanks, back, thighs, and chin with skin retraction benefits.",
    "options": [
      {
        "title": "VASER Hi-Def sculpting",
        "description": "Ultrasound energy emulsifies fat for precise athletic contouring."
      },
      {
        "title": "360 Liposuction (Abdomen & Flanks)",
        "description": "Circumferential torso contouring for a tapered waistline."
      },
      {
        "title": "Submental (double chin) liposuction",
        "description": "Targeted keyhole fat removal beneath the jawline for sharp definition."
      }
    ],
    "suited": [
      "Normal to near-normal weight individuals with localized fat deposits",
      "Good skin elasticity without excessive loose skin folds",
      "Desire for targeted waist, back, or thigh refinement"
    ],
    "facts": [
      {
        "label": "Time in India",
        "value": "10–14 days"
      },
      {
        "label": "Hospital stay",
        "value": "1–2 nights"
      },
      {
        "label": "Garment wear",
        "value": "4–6 weeks"
      },
      {
        "label": "Fit to fly",
        "value": "Day 8–10"
      }
    ],
    "timeline": [
      {
        "period": "Day 1",
        "description": "In-person contour marking and ultrasound check."
      },
      {
        "period": "Day 2",
        "description": "VASER liposuction under general/sedation anaesthesia."
      },
      {
        "period": "Day 3–4",
        "description": "Discharge in custom medical compression garment."
      },
      {
        "period": "Day 7",
        "description": "Drain removal (if placed) and lymphatic drainage massage."
      },
      {
        "period": "Day 10",
        "description": "Review and travel authorization."
      }
    ],
    "included": [
      "Operating surgeon and anaesthesia charges",
      "Hospital room and overnight nursing care",
      "First medical grade compression garment",
      "Post-procedure dressing changes",
      "Airport transfers and coordinator"
    ],
    "excluded": [
      "Flights and travel visa",
      "Extra compression garments",
      "Additional hotel nights"
    ],
    "doctors": [
      "dr-vikas-gupta"
    ],
    "guide": null,
    "note": null,
    "hospitals": [
      "livasa-mohali",
      "max-super-speciality-mohali"
    ],
    "priceMode": "range"
  },
  {
    "slug": "tummy-tuck",
    "name": "Tummy Tuck",
    "spec": "cosmetic",
    "specName": "Cosmetic Surgery",
    "priceFrom": 500,
    "priceTo": 6000,
    "saving": "~91%",
    "addon": false,
    "img": "/images/treatments/tummy-tuck.jpg",
    "summary": "Abdominoplasty to remove loose excess skin and repair separated abdominal wall muscles.",
    "intro": "A tummy tuck (abdominoplasty) flattens and tightens the abdomen by excising sagging stretched skin, eliminating excess fat, and suturing separated rectus abdominis muscles (diastasis recti), frequently after pregnancy or massive weight loss.",
    "options": [
      {
        "title": "Full abdominoplasty",
        "description": "Muscle tightening, belly button repositioning, and complete lower abdominal skin excision."
      },
      {
        "title": "Mini abdominoplasty",
        "description": "Targeted lower tummy tightening below the navel for minor laxity."
      },
      {
        "title": "Lipoabdominoplasty",
        "description": "Combined flank liposuction with muscle plication and skin tightening."
      }
    ],
    "suited": [
      "Separated abdominal muscles (diastasis recti) post-childbirth",
      "Persistent loose apron of skin following major weight loss",
      "Desire for a flat, toned, stable abdominal profile"
    ],
    "facts": [
      {
        "label": "Time in India",
        "value": "2–3 weeks"
      },
      {
        "label": "Hospital stay",
        "value": "2–3 nights"
      },
      {
        "label": "Mobilization",
        "value": "Day 1–2 (bent slightly)"
      },
      {
        "label": "Fit to fly",
        "value": "Day 12–14"
      }
    ],
    "timeline": [
      {
        "period": "Day 1",
        "description": "Pre-surgical planning, measurements, and systemic blood tests."
      },
      {
        "period": "Day 2",
        "description": "Abdominoplasty with muscle plication."
      },
      {
        "period": "Days 3–4",
        "description": "Hospital recovery, pain pump monitoring, and assisted walking."
      },
      {
        "period": "Week 2",
        "description": "Drain removal, incision dressing, and compression check."
      },
      {
        "period": "Days 14–16",
        "description": "Final assessment, scar therapy protocol, and return flight."
      }
    ],
    "included": [
      "Surgical procedure, muscle repair, and anaesthesia",
      "Hospital room stay with full nursing support",
      "Abdominal binder / compression garment",
      "Drain management and wound care",
      "Airport transfers and coordinator"
    ],
    "excluded": [
      "Flights and visa fees",
      "Scar management silicone gels",
      "Extended hotel stay beyond clinical recommendation"
    ],
    "doctors": [
      "dr-vikas-gupta"
    ],
    "guide": null,
    "note": null,
    "hospitals": [
      "livasa-mohali",
      "max-super-speciality-mohali"
    ],
    "priceMode": "range"
  },
  {
    "slug": "cataract-surgery",
    "name": "Cataract Surgery",
    "spec": "eye",
    "specName": "Ophthalmology",
    "priceFrom": 250,
    "priceTo": 1100,
    "saving": "~84%",
    "addon": false,
    "img": "/images/treatments/cataract-surgery.jpg",
    "summary": "Bladeless phacoemulsification and advanced multifocal/toric lens implants for clear sight.",
    "intro": "Modern cataract surgery is a 15-minute, stitch-free outpatient procedure. The cloudy natural crystalline lens is gently broken up using ultrasound (phacoemulsification) or femtosecond laser and replaced with a custom foldable intraocular lens (IOL).",
    "options": [
      {
        "title": "Monofocal IOL",
        "description": "Clear distance vision with glasses typically needed for reading."
      },
      {
        "title": "Multifocal / Trifocal IOL",
        "description": "Independence from glasses for distance, intermediate (computer), and near reading."
      },
      {
        "title": "Toric IOL",
        "description": "Correction of corneal astigmatism alongside cataract removal."
      }
    ],
    "suited": [
      "Cloudy, dim, or hazy vision interfering with driving or reading",
      "Sensitivity to light glare or halos around headlights",
      "Cataracts in one or both eyes"
    ],
    "facts": [
      {
        "label": "Time in India",
        "value": "5–7 days"
      },
      {
        "label": "Hospital stay",
        "value": "Day care / None"
      },
      {
        "label": "Procedure time",
        "value": "15–20 minutes per eye"
      },
      {
        "label": "Fit to fly",
        "value": "Day 4–5"
      }
    ],
    "timeline": [
      {
        "period": "Day 1",
        "description": "Detailed optical biometry and IOL power calculation."
      },
      {
        "period": "Day 2",
        "description": "Surgery on primary eye under topical drop anaesthesia."
      },
      {
        "period": "Day 3–4",
        "description": "Post-op check (and second eye procedure if bilateral)."
      },
      {
        "period": "Day 5–6",
        "description": "Final slit-lamp exam, prescription drop schedule, and flight authorization."
      }
    ],
    "included": [
      "Surgeon fee and modular ophthalmic suite usage",
      "Foldable intraocular lens (model specified in quote)",
      "Standard pre-op biometry and follow-up examinations",
      "Protective eye shield and post-op eye drops",
      "Airport pickup and coordination"
    ],
    "excluded": [
      "Flights and visa costs",
      "Long-term artificial tear drops",
      "Hotel accommodations"
    ],
    "doctors": [
      "dr-ashish-ahuja"
    ],
    "guide": null,
    "note": null,
    "hospitals": [
      "sohana-mohali",
      "livasa-mohali"
    ],
    "priceMode": "range"
  },
  {
    "slug": "lasik",
    "name": "LASIK & Refractive Surgery",
    "spec": "eye",
    "specName": "Ophthalmology",
    "priceFrom": 1500,
    "priceTo": 7000,
    "saving": "~6%",
    "addon": false,
    "img": "/images/treatments/lasik.jpg",
    "summary": "Bladeless Femto-LASIK, SMILE and Contoura Vision for permanent freedom from spectacles.",
    "intro": "Refractive surgery reshapes the cornea using ultra-precise cold laser pulses to correct nearsightedness (myopia), farsightedness (hyperopia), and astigmatism. Most patients achieve 20/20 vision by the following morning.",
    "options": [
      {
        "title": "Contoura Vision (Topography-Guided)",
        "description": "Maps 22,000 unique corneal points for ultra-sharp high-definition correction."
      },
      {
        "title": "Femto-LASIK (Bladeless)",
        "description": "Computer-guided laser flap creation with rapid next-day visual recovery."
      },
      {
        "title": "SMILE (Keyhole)",
        "description": "Flapless, micro-incision procedure leaving the outer corneal layers untouched."
      }
    ],
    "suited": [
      "Adults over 18 with stable vision prescription for at least 1 year",
      "Nearsightedness, farsightedness, or astigmatism",
      "Normal corneal thickness and healthy ocular surface"
    ],
    "facts": [
      {
        "label": "Time in India",
        "value": "5–7 days"
      },
      {
        "label": "Hospital stay",
        "value": "Day care / 2 hours"
      },
      {
        "label": "Vision recovery",
        "value": "Clear sight within 24 hours"
      },
      {
        "label": "Fit to fly",
        "value": "Day 4–5"
      }
    ],
    "timeline": [
      {
        "period": "Day 1",
        "description": "Corneal topography, pachymetry thickness test, and dilated check."
      },
      {
        "period": "Day 2",
        "description": "Bilateral laser treatment (10 minutes total)."
      },
      {
        "period": "Day 3",
        "description": "Day-1 slit lamp review and corneal flap inspection."
      },
      {
        "period": "Day 5",
        "description": "Final visual acuity check and safe travel sign-off."
      }
    ],
    "included": [
      "Laser suite and refractive specialist fees",
      "Bilateral procedure with disposable patient interfaces",
      "Post-op eye drops and UV-protective sunglasses",
      "In-person clinical checkups during your stay",
      "All airport transfers and coordination"
    ],
    "excluded": [
      "Air tickets and visa fees",
      "Hotel accommodation",
      "Treatment for unrelated ocular issues"
    ],
    "doctors": [
      "dr-ashish-ahuja"
    ],
    "guide": null,
    "note": null,
    "hospitals": [
      "sohana-mohali",
      "livasa-mohali"
    ],
    "priceMode": "range"
  },
  {
    "slug": "vitrectomy",
    "name": "Vitrectomy",
    "spec": "eye",
    "specName": "Ophthalmology",
    "priceFrom": 500,
    "priceTo": 6000,
    "saving": "~87%",
    "addon": false,
    "img": "/images/treatments/vitrectomy.jpg",
    "summary": "Microsurgical vitreoretinal surgery for retinal detachment, vitreous hemorrhage and macular tears.",
    "intro": "Vitrectomy is a delicate microsurgical procedure in which the vitreous gel is cleared from the posterior chamber of the eye to repair retinal detachments, clear diabetic bleeding, or seal macular holes using gas or silicone oil tamponades.",
    "options": [
      {
        "title": "25G/27G Sutureless vitrectomy",
        "description": "Ultra-fine gauge keyhole retinal surgery with self-sealing incisions."
      },
      {
        "title": "Retinal detachment repair",
        "description": "Vitrectomy combined with endolaser photocoagulation and gas bubble support."
      },
      {
        "title": "Macular hole surgery",
        "description": "Delicate internal limiting membrane (ILM) peeling to restore central vision."
      }
    ],
    "suited": [
      "Retinal tears or full retinal detachment threatening vision",
      "Non-clearing vitreous hemorrhage in diabetic retinopathy",
      "Macular hole or epiretinal membrane with distorted central sight"
    ],
    "facts": [
      {
        "label": "Time in India",
        "value": "2–3 weeks"
      },
      {
        "label": "Hospital stay",
        "value": "Day care or 1 night"
      },
      {
        "label": "Head positioning",
        "value": "Specific posture if gas used"
      },
      {
        "label": "Fit to fly",
        "value": "Dependent on gas bubble absorption"
      }
    ],
    "timeline": [
      {
        "period": "Day 1",
        "description": "High-resolution retinal OCT and indirect ophthalmoscopy."
      },
      {
        "period": "Day 2",
        "description": "Microscopic vitrectomy with laser/gas placement."
      },
      {
        "period": "Days 3–7",
        "description": "Daily retinal monitoring and guided head positioning."
      },
      {
        "period": "Week 2–3",
        "description": "Gas absorption check and clear-to-fly assessment."
      }
    ],
    "included": [
      "Vitreoretinal surgeon and theatre charges",
      "Endolaser, micro-instruments, and intraocular tamponades",
      "Specialist follow-ups and retinal imaging scans",
      "Transfers and dedicated care coordinator"
    ],
    "excluded": [
      "Flights and visa costs",
      "Silicone oil removal surgery (if required months later)",
      "Extended hotel stay"
    ],
    "doctors": [
      "dr-ashish-ahuja"
    ],
    "guide": null,
    "note": null,
    "hospitals": [
      "sohana-mohali",
      "livasa-mohali"
    ],
    "priceMode": "range"
  },
  {
    "slug": "cornea-transplant",
    "name": "Cornea Transplant",
    "spec": "eye",
    "specName": "Ophthalmology",
    "priceFrom": 500,
    "priceTo": 6000,
    "saving": "~91%",
    "addon": false,
    "img": "/images/treatments/cornea-transplant.jpg",
    "summary": "Full-thickness (PK) and selective lamellar (DMEK/DSAEK) corneal grafting with certified donor tissue.",
    "intro": "Corneal transplantation (keratoplasty) replaces cloudy, scarred, or thinned corneal tissue with healthy donor tissue from accredited eye banks. Advanced partial-thickness lamellar techniques (DSAEK/DMEK) target only the damaged layers for faster visual recovery.",
    "options": [
      {
        "title": "DMEK / DSAEK (Endothelial)",
        "description": "Micro-thin replacement of inner endothelial cells with minimal sutures."
      },
      {
        "title": "DALK (Deep Anterior Lamellar)",
        "description": "Outer layer grafting preserving the recipient's natural inner endothelium."
      },
      {
        "title": "Full-thickness PK (Penetrating)",
        "description": "Standard replacement of all corneal layers for dense full-depth scars."
      }
    ],
    "suited": [
      "Corneal scarring from trauma, infection, or prior surgery",
      "Keratoconus unresponsive to cross-linking or specialized lenses",
      "Fuchs' endothelial dystrophy causing chronic corneal edema"
    ],
    "facts": [
      {
        "label": "Time in India",
        "value": "2–3 weeks"
      },
      {
        "label": "Hospital stay",
        "value": "1 night"
      },
      {
        "label": "Donor tissue",
        "value": "Certified tested bank cornea"
      },
      {
        "label": "Fit to fly",
        "value": "Day 10–14"
      }
    ],
    "timeline": [
      {
        "period": "Day 1",
        "description": "Slit-lamp confocal microscopy and donor tissue matching."
      },
      {
        "period": "Day 2",
        "description": "Keratoplasty under operating microscope."
      },
      {
        "period": "Days 3–6",
        "description": "Graft adherence verification and anti-rejection drop initiation."
      },
      {
        "period": "Days 7–14",
        "description": "Corneal curvature check, suture tension review, and travel clearance."
      }
    ],
    "included": [
      "Corneal transplant specialist fees",
      "Certified donor corneal graft from accredited eye bank",
      "Hospital facility fee and overnight observation",
      "Post-operative medications and follow-up reviews",
      "Airport transfers and coordinator"
    ],
    "excluded": [
      "Airfare and visa",
      "Long-term post-transplant immunosuppressive drops",
      "Extended hotel stay"
    ],
    "doctors": [
      "dr-ashish-ahuja"
    ],
    "guide": null,
    "note": null,
    "hospitals": [
      "sohana-mohali",
      "livasa-mohali"
    ],
    "priceMode": "range"
  },
  {
    "slug": "dental-implants",
    "name": "Dental Implants",
    "spec": "dental",
    "specName": "Dental Implants",
    "priceFrom": 500,
    "priceTo": 1200,
    "saving": "~29%",
    "addon": false,
    "img": "/images/treatments/dental-implants.jpg",
    "summary": "Single and multi-tooth titanium and ceramic implants with custom CAD/CAM zirconia crowns.",
    "intro": "Dental implants provide permanent, root-anchored replacements for missing teeth that look, feel, and function like natural teeth. Using high-precision 3D CBCT scans and guided surgical splints, implants are placed safely into the jawbone.",
    "options": [
      {
        "title": "Single tooth implant",
        "description": "Grade-5 titanium or ceramic post with custom abutment and zirconia crown."
      },
      {
        "title": "Immediate load implant",
        "description": "Placement of temporary crown on the day of implant fixture insertion."
      },
      {
        "title": "Implant with bone grafting",
        "description": "Ridge preservation or sinus lift for areas with compromised bone volume."
      }
    ],
    "suited": [
      "One or more missing teeth affecting chewing or speech",
      "Loose partial dentures or inability to wear conventional bridges",
      "Healthy gums and sufficient jawbone support"
    ],
    "facts": [
      {
        "label": "Time in India",
        "value": "7–10 days"
      },
      {
        "label": "Hospital stay",
        "value": "Outpatient"
      },
      {
        "label": "Material",
        "value": "Swiss/German titanium & Zirconia"
      },
      {
        "label": "Fit to fly",
        "value": "Day 3–4"
      }
    ],
    "timeline": [
      {
        "period": "Day 1",
        "description": "3D CBCT scanning and digital implant positioning plan."
      },
      {
        "period": "Day 2",
        "description": "Guided implant placement under painless local anaesthesia."
      },
      {
        "period": "Days 3–4",
        "description": "Post-op tissue healing check and temporary prosthesis."
      },
      {
        "period": "Days 5–7",
        "description": "Final digital impression and departure clearance."
      }
    ],
    "included": [
      "Implantologist fees and sterile dental suite usage",
      "Premium titanium implant fixture (Straumann/Nobel Biocare)",
      "High-resolution 3D CBCT imaging scans",
      "Post-operative antibiotics and healing check",
      "Airport transfers and coordinator"
    ],
    "excluded": [
      "Flights and visa costs",
      "Subsequent travel for second stage permanent crown if spaced months apart",
      "Hotel accommodation"
    ],
    "doctors": [
      "dr-jaswant-singh"
    ],
    "guide": null,
    "note": null,
    "hospitals": [
      "sohana-mohali",
      "livasa-mohali"
    ],
    "priceMode": "range"
  },
  {
    "slug": "full-mouth-implants",
    "name": "Full Mouth Implants",
    "spec": "dental",
    "specName": "Dental Implants",
    "priceFrom": 1500,
    "priceTo": 7000,
    "saving": "~84%",
    "addon": false,
    "img": "/images/treatments/full-mouth-implants.jpg",
    "summary": "All-on-4 and All-on-6 full arch rehabilitation restoring complete smile and bite function.",
    "intro": "Full-mouth dental rehabilitation replaces all teeth across the upper, lower, or both jaws using strategically angled implants. By anchoring a full zirconia bridge onto 4 or 6 implants, patients receive a fixed, beautiful set of non-removable teeth in a single trip.",
    "options": [
      {
        "title": "All-on-4 protocol",
        "description": "4 implants supporting a full arch prosthesis without extensive bone grafting."
      },
      {
        "title": "All-on-6 protocol",
        "description": "6 implants providing superior bite force distribution in solid bone."
      },
      {
        "title": "Zygomatic implants",
        "description": "Specialized cheekbone-anchored implants for severely resorbed upper jaws."
      }
    ],
    "suited": [
      "Complete or near-complete tooth loss in upper or lower jaw",
      "Severe terminal periodontitis with mobile failing teeth",
      "Frustration with slipping, uncomfortable removable dentures"
    ],
    "facts": [
      {
        "label": "Time in India",
        "value": "10–14 days"
      },
      {
        "label": "Hospital stay",
        "value": "Day care / 1 night"
      },
      {
        "label": "Immediate teeth",
        "value": "Fixed within 48–72 hours"
      },
      {
        "label": "Fit to fly",
        "value": "Day 8–10"
      }
    ],
    "timeline": [
      {
        "period": "Day 1",
        "description": "Full mouth digital scanning, CBCT analysis, and virtual smile setup."
      },
      {
        "period": "Day 2",
        "description": "Extraction of remaining failing teeth and implant placement."
      },
      {
        "period": "Days 3–4",
        "description": "Fitting and delivery of fixed provisional full-arch bridge."
      },
      {
        "period": "Days 5–8",
        "description": "Bite adjustment, gum healing review, and comfort verification."
      },
      {
        "period": "Day 10",
        "description": "Final check, hygiene kit, and travel authorization."
      }
    ],
    "included": [
      "Complete surgical procedure and sedation/anaesthesia",
      "4 or 6 titanium implants per arch",
      "Fixed provisional full-arch CAD/CAM bridge",
      "All surgical guides, CBCT scans, and follow-ups",
      "Airport transfers and coordinator"
    ],
    "excluded": [
      "Flights and travel visas",
      "Secondary return trip for final monolithic zirconia bridge if staged",
      "Hotel accommodations"
    ],
    "doctors": [
      "dr-jaswant-singh"
    ],
    "guide": null,
    "note": null,
    "hospitals": [
      "sohana-mohali",
      "livasa-mohali"
    ],
    "priceMode": "range"
  },
  {
    "slug": "smile-design",
    "name": "Smile Design",
    "spec": "dental",
    "specName": "Dental Implants",
    "priceFrom": 500,
    "priceTo": 6000,
    "saving": "~91%",
    "addon": false,
    "img": "/images/treatments/smile-design.jpg",
    "summary": "Digital Smile Design (DSD), porcelain veneers, and CAD/CAM ceramic crowns for radiant smiles.",
    "intro": "Digital Smile Design (DSD) uses facial photography, 3D scanning, and CAD/CAM precision ceramics to customize the shape, length, alignment, and color of your teeth. You review and test-drive your virtual new smile before any porcelain veneers are bonded.",
    "options": [
      {
        "title": "Porcelain laminate veneers",
        "description": "Ultra-thin custom E.max porcelain shells bonded to the front teeth."
      },
      {
        "title": "Full ceramic crowns",
        "description": "High-strength zirconia or lithium disilicate crowns for worn/broken teeth."
      },
      {
        "title": "Composite bonding & contouring",
        "description": "Conservative aesthetic touch-ups for minor gaps and chipping."
      }
    ],
    "suited": [
      "Discolored, stained teeth that cannot be lightened by whitening",
      "Chipped, worn, uneven, or mildly crowded anterior teeth",
      "Gaps between teeth or desire for an aesthetically symmetrical Hollywood smile"
    ],
    "facts": [
      {
        "label": "Time in India",
        "value": "7–10 days"
      },
      {
        "label": "Hospital stay",
        "value": "Outpatient"
      },
      {
        "label": "Sessions",
        "value": "3 clinical visits"
      },
      {
        "label": "Fit to fly",
        "value": "Day 6–7"
      }
    ],
    "timeline": [
      {
        "period": "Day 1",
        "description": "High-definition facial photography, 3D intraoral scan, and digital smile design."
      },
      {
        "period": "Day 2",
        "description": "In-mouth mock-up test drive and minimal preparation."
      },
      {
        "period": "Days 3–5",
        "description": "Lab fabrication in dental CAD/CAM milling center."
      },
      {
        "period": "Day 6",
        "description": "Try-in and permanent bonding of veneers/crowns."
      },
      {
        "period": "Day 7",
        "description": "Bite polish, photographs, and departure clearance."
      }
    ],
    "included": [
      "Cosmetic dentist fees and digital studio sessions",
      "Custom E.max/Zirconia veneers or crowns",
      "Temporary trial veneers and bonding cements",
      "Bite equilibration and night-guard protection",
      "Airport transfers and coordinator"
    ],
    "excluded": [
      "Flights and travel visas",
      "Preliminary root canal treatments (if previously required)",
      "Hotel accommodations"
    ],
    "doctors": [
      "dr-jaswant-singh"
    ],
    "guide": null,
    "note": null,
    "hospitals": [
      "sohana-mohali",
      "livasa-mohali"
    ],
    "priceMode": "range"
  },
  {
    "slug": "ivf",
    "name": "IVF",
    "spec": "fertility",
    "specName": "Fertility",
    "priceFrom": 4200,
    "priceTo": 6500,
    "saving": "~50%",
    "addon": false,
    "img": "/images/treatments/ivf.jpg",
    "summary": "Full IVF cycles with blastocyst culture and specialist planning around your travel dates.",
    "intro": "In vitro fertilisation (IVF) helps couples who have not conceived naturally. The entire cycle — ovarian stimulation, egg collection, fertilisation in an accredited embryology laboratory, and embryo transfer — is planned in advance around your travel window.",
    "options": [
      {
        "title": "Standard IVF cycle",
        "description": "Stimulation, egg retrieval, laboratory fertilisation and fresh blastocyst transfer."
      },
      {
        "title": "Freeze-all cycle",
        "description": "Embryos are vitrified for transfer in a subsequent cycle, giving the body time to settle."
      },
      {
        "title": "IVF with donor eggs",
        "description": "Egg donation through registered clinics with full legal compliance."
      }
    ],
    "suited": [
      "Blocked, damaged or absent fallopian tubes",
      "Unexplained infertility after trying for over a year",
      "Ovulation disorders including PCOS resisting medications"
    ],
    "facts": [
      {
        "label": "Time in India",
        "value": "2–3 weeks"
      },
      {
        "label": "Hospital stay",
        "value": "Day care only"
      },
      {
        "label": "Egg collection",
        "value": "Day 12–14 of cycle"
      },
      {
        "label": "Fit to fly",
        "value": "1–2 days after transfer"
      }
    ],
    "timeline": [
      {
        "period": "Weeks before",
        "description": "Video consultation, hormonal test review, and starting stimulation at home or on arrival."
      },
      {
        "period": "Days 1–8",
        "description": "Monitoring scans and injections in Mohali."
      },
      {
        "period": "Day 10–12",
        "description": "Egg retrieval under sedation and fertilization."
      },
      {
        "period": "Days 13–17",
        "description": "Embryo culture to day-5 blastocyst stage."
      },
      {
        "period": "Day 15–18",
        "description": "Embryo transfer and clearance to travel home."
      }
    ],
    "included": [
      "Fertility specialist consultations and ultrasound scans",
      "Egg retrieval procedure under short anaesthesia",
      "Standard laboratory IVF and blastocyst culture",
      "Embryo transfer procedure",
      "Airport pickup and coordination"
    ],
    "excluded": [
      "Stimulation medications and injections (quoted separately)",
      "Embryo freezing and annual storage fees",
      "Flights and accommodation"
    ],
    "doctors": [
      "dr-jaswant-singh"
    ],
    "guide": null,
    "note": null,
    "hospitals": [
      "fortis-mohali",
      "livasa-mohali"
    ],
    "priceMode": "range"
  },
  {
    "slug": "icsi",
    "name": "ICSI",
    "spec": "fertility",
    "specName": "Fertility",
    "priceFrom": 1500,
    "priceTo": 3200,
    "saving": null,
    "addon": true,
    "img": "/images/treatments/icsi.jpg",
    "summary": "Intracytoplasmic sperm injection for male-factor infertility, combined with an IVF cycle.",
    "intro": "Intracytoplasmic sperm injection (ICSI) is a specialized micromanipulation technique where a single healthy sperm is injected directly into each mature egg. It is the primary recommendation when male factor issues are identified.",
    "options": [
      {
        "title": "Standard ICSI",
        "description": "Direct injection of selected sperm into mature oocytes."
      },
      {
        "title": "Surgical sperm retrieval (TESA/PESA)",
        "description": "Retrieving sperm directly from the testicle where none are present in semen."
      }
    ],
    "suited": [
      "Low sperm count, low motility, or abnormal morphology",
      "Previous IVF cycle with poor or absent fertilisation",
      "Use of frozen sperm with limited motility"
    ],
    "facts": [
      {
        "label": "Procedure type",
        "value": "Laboratory add-on to IVF"
      },
      {
        "label": "Timing",
        "value": "Same day as egg collection"
      },
      {
        "label": "Recovery",
        "value": "No extra physical recovery for patient"
      },
      {
        "label": "Fit to fly",
        "value": "Same as IVF timeline"
      }
    ],
    "timeline": [
      {
        "period": "Same as IVF",
        "description": "Egg retrieval happens under the standard IVF protocol."
      },
      {
        "period": "Laboratory day",
        "description": "Senior embryologist injects individual sperm under high-power microscope."
      },
      {
        "period": "Next morning",
        "description": "Fertilisation check and culture to blastocyst stage."
      }
    ],
    "included": [
      "Embryologist micromanipulation fees",
      "ICSI micropipettes and laboratory usage",
      "Fertilisation assessment report"
    ],
    "excluded": [
      "Underlying IVF cycle costs",
      "Surgical sperm retrieval procedures (TESA/PESA) if needed",
      "Medications"
    ],
    "doctors": [
      "dr-jaswant-singh"
    ],
    "guide": null,
    "note": null,
    "hospitals": [
      "fortis-mohali",
      "livasa-mohali"
    ],
    "priceMode": "range"
  },
  {
    "slug": "coronary-angioplasty",
    "name": "Coronary Angioplasty & Stenting",
    "spec": "cardiac",
    "specName": "Cardiac Sciences",
    "priceFrom": 4500,
    "priceTo": null,
    "priceMode": "review",
    "saving": "~44%",
    "addon": false,
    "img": "/images/treatments/coronary-angioplasty.jpg",
    "summary": "Percutaneous coronary intervention (PTCA) with US FDA-approved drug-eluting stents and intravascular imaging guidance.",
    "intro": "Coronary angioplasty restores arterial blood flow to the heart muscle without open surgery. Senior interventional cardiologists in Mohali and Chandigarh perform advanced transradial procedures using high-precision drug-eluting stents (DES), rotational atherectomy, and intravascular ultrasound (IVUS / OCT) guidance.",
    "options": [
      {
        "title": "Transradial Coronary Angioplasty (TRI)",
        "description": "Stent placement performed via the wrist artery, allowing immediate post-procedure mobility and minimal puncture site discomfort."
      },
      {
        "title": "Complex Bifurcation & Multi-Vessel Stenting",
        "description": "Specialised bifurcation techniques with dedicated dual-stent or provisional stenting for branched coronary lesions."
      },
      {
        "title": "Rotational Atherectomy & Intravascular Lithotripsy (IVL)",
        "description": "Shockwave balloon or high-speed diamond burr plaque modification to safely open heavily calcified coronary blockages."
      },
      {
        "title": "Imaging-Guided Stenting (IVUS & OCT)",
        "description": "Real-time intravascular ultrasound and optical coherence tomography for micrometer-accurate stent expansion and wall apposition."
      }
    ],
    "suited": [
      "Angina or chest tightness with confirmed coronary artery blockages",
      "Patients diagnosed with single or multi-vessel coronary artery disease",
      "Post-heart attack patients needing elective or planned secondary stenting",
      "Patients seeking cutting-edge radial access and US FDA/CE marked drug-eluting stents"
    ],
    "facts": [
      {
        "label": "Time in India",
        "value": "7–10 days"
      },
      {
        "label": "Hospital stay",
        "value": "1–2 nights"
      },
      {
        "label": "Mobility",
        "value": "Walking within 4–6 hours (radial)"
      },
      {
        "label": "Fit to fly",
        "value": "5–7 days post-procedure"
      }
    ],
    "timeline": [
      {
        "period": "Day 1",
        "description": "Arrival, hospital registration, baseline blood work, ECG, and echocardiogram."
      },
      {
        "period": "Day 2",
        "description": "Coronary angiography and immediate angioplasty/stenting in the cardiac catheterisation lab. Overnight monitoring in CCU/step-down."
      },
      {
        "period": "Day 3",
        "description": "Post-procedure review, puncture site dressing check, and transfer to private recovery accommodation."
      },
      {
        "period": "Days 4–6",
        "description": "Rest, gentle walking, cardiologist follow-up, and titration of dual antiplatelet therapy (DAPT)."
      },
      {
        "period": "Day 7",
        "description": "Final medical clearance, discharge CD/angiography report, fit-to-fly certificate, and travel home."
      }
    ],
    "included": [
      "Primary interventional cardiologist and cath lab team fees",
      "Digital biplane catheterisation lab facility charges",
      "US FDA or CE-approved drug-eluting stent (type itemised in written quote)",
      "Pre-operative cardiac blood markers, 2D echo, and baseline ECG",
      "Overnight cardiac telemetry / critical care observation stay",
      "Dedicated international patient manager and airport private transfers"
    ],
    "excluded": [
      "Complex calcification accessories (Rotablator burrs or IVL balloons) unless specified",
      "Additional stents beyond the agreed surgical treatment plan",
      "Long-term take-home antiplatelet and cholesterol medications",
      "Personal companion stay expenses"
    ],
    "doctors": [
      "dr-puneet-verma",
      "dr-jagmohan-singh-varma",
      "dr-rakesh-kumar-jaswal",
      "dr-harinder-k-bali",
      "dr-arvind-kaul",
      "dr-rakesh-sharma",
      "dr-karun-behal"
    ],
    "guide": null,
    "note": "A senior cardiologist reviews your existing angiogram and clinical history on video before your travel dates are scheduled.",
    "hospitals": [
      "ace-heart-institute",
      "fortis-mohali",
      "max-super-speciality-mohali",
      "livasa-mohali"
    ]
  },
  {
    "slug": "coronary-artery-bypass-cabg",
    "name": "Coronary Artery Bypass (CABG)",
    "spec": "cardiac",
    "specName": "Cardiac Sciences",
    "priceFrom": 4000,
    "priceTo": null,
    "priceMode": "review",
    "saving": "~78%",
    "addon": false,
    "img": "/images/treatments/coronary-artery-bypass-cabg.jpg",
    "summary": "Off-pump beating-heart bypass grafting (OPCAB) and minimally invasive cardiac surgery by accredited CTVS chiefs.",
    "intro": "Coronary Artery Bypass Grafting (CABG) reroutes blood around clogged arteries using healthy blood vessels from your chest or leg. Partner hospitals in Mohali specialize in 'beating-heart' off-pump surgery, which avoids the heart-lung machine to reduce recovery time, minimize blood loss, and significantly lower neurological complications.",
    "options": [
      {
        "title": "Off-Pump Beating Heart CABG (OPCAB)",
        "description": "The surgeon bypasses blocked arteries while the heart continues to beat naturally, using advanced cardiac stabilizers."
      },
      {
        "title": "Total Arterial Revascularization",
        "description": "Utilises bilateral internal mammary arteries (LIMA/RIMA) and radial conduits for superior long-term bypass graft patency."
      },
      {
        "title": "Minimally Invasive Direct Coronary Bypass (MIDCAB)",
        "description": "Small left thoracotomy incision without sternotomy for isolated left anterior descending (LAD) artery disease."
      },
      {
        "title": "Combined CABG & Valve Surgery",
        "description": "Simultaneous coronary revascularization and aortic/mitral valve repair or replacement in a single operative session."
      }
    ],
    "suited": [
      "Multi-vessel coronary artery disease involving three or more arteries",
      "Left Main Coronary Artery (LMCA) stenosis not optimal for stenting",
      "Diabetic patients with diffuse coronary atherosclerosis",
      "Patients needing durable, lifetime arterial revascularization"
    ],
    "facts": [
      {
        "label": "Time in India",
        "value": "2–3 weeks"
      },
      {
        "label": "Hospital stay",
        "value": "5–7 nights (2 in CTVS ICU)"
      },
      {
        "label": "First walking",
        "value": "Assisted standing by Day 2"
      },
      {
        "label": "Fit to fly",
        "value": "14–18 days post-op"
      }
    ],
    "timeline": [
      {
        "period": "Days 1–2",
        "description": "Hospital admission, repeat coronary angiogram review, pulmonary function test, carotid ultrasound, and anaesthetic evaluation."
      },
      {
        "period": "Day 3",
        "description": "Bypass surgery in modular cardiac operating suite. Transfer to dedicated CTVS Intensive Care Unit."
      },
      {
        "period": "Days 4–5",
        "description": "Extubation, removal of chest drains, assisted mobilization, and transfer to cardiac step-down ward."
      },
      {
        "period": "Days 6–8",
        "description": "In-hospital chest physiotherapy, spirometry exercises, wound inspection, and discharge to recovery hotel."
      },
      {
        "period": "Weeks 2–3",
        "description": "Outpatient echocardiogram, sternal healing check, fit-to-fly assessment, and discharge handover documentation."
      }
    ],
    "included": [
      "Chief Cardiothoracic Surgeon, associate surgeon and cardiac anaesthetist fees",
      "Dedicated modular cardiac operating theatre usage and perfusionist team",
      "2 nights stay in CTVS Intensive Care Unit with 1:1 dedicated nursing",
      "4–5 nights stay in private en-suite recovery room",
      "In-hospital cardiac rehabilitation and respiratory physiotherapy",
      "Airport transfers and dedicated patient care manager throughout"
    ],
    "excluded": [
      "Unexpected extended ICU stay beyond agreed protocol",
      "Blood product transfusions (if cross-matching beyond routine limits required)",
      "Take-home post-discharge medications"
    ],
    "doctors": [
      "dr-ts-mahant-team",
      "dr-shashi-jindal",
      "dr-anumeet-bagga",
      "dr-ishant-singla",
      "dr-ambuj-choudhary"
    ],
    "guide": null,
    "note": "Our partner CTVS departments have NABH and JCI accreditation with recorded CABG surgical mortality rates below 1%.",
    "hospitals": [
      "fortis-mohali",
      "max-super-speciality-mohali",
      "livasa-mohali"
    ]
  },
  {
    "slug": "heart-valve-replacement",
    "name": "Heart Valve Replacement & Repair",
    "spec": "cardiac",
    "specName": "Cardiac Sciences",
    "priceFrom": 8000,
    "priceTo": null,
    "priceMode": "review",
    "saving": "~60%",
    "addon": false,
    "img": "/images/treatments/heart-valve-replacement.jpg",
    "summary": "Transcatheter Aortic Valve Replacement (TAVR/TAVI) and surgical repair/replacement for aortic and mitral valve disease.",
    "intro": "Diseased heart valves restrict blood flow or leak backwards, causing fatigue, shortness of breath, and heart failure. Leading centres in Mohali offer both minimally invasive catheter-based TAVR/TAVI and open valve reconstruction with imported mechanical or biological tissue prostheses.",
    "options": [
      {
        "title": "Transcatheter Aortic Valve Replacement (TAVR / TAVI)",
        "description": "A new aortic valve is guided through the femoral artery in the groin without opening the chest or using heart-lung bypass."
      },
      {
        "title": "Surgical Aortic Valve Replacement (SAVR)",
        "description": "Excision of calcified aortic valve and replacement with premium tissue (bovine/porcine) or mechanical prosthetic valve."
      },
      {
        "title": "Mitral Valve Repair / Annuloplasty",
        "description": "Preserving the native mitral valve using artificial chordae and an annuloplasty ring for optimal long-term ventricle function."
      },
      {
        "title": "Minimally Invasive Valve Surgery (MICS)",
        "description": "Keyhole right mini-thoracotomy approach sparing the breastbone for rapid return to daily mobility."
      }
    ],
    "suited": [
      "Severe calcific aortic valve stenosis causing syncope or dyspnoea",
      "Elderly or intermediate-to-high surgical risk patients seeking catheter-based TAVR",
      "Severe mitral regurgitation or stenosis suitable for repair or replacement",
      "Patients needing lifetime prosthetic valve solutions with international warranty"
    ],
    "facts": [
      {
        "label": "Time in India",
        "value": "10–14 days (TAVR) or 2–3 weeks (Surgical)"
      },
      {
        "label": "Hospital stay",
        "value": "2–3 nights (TAVR) or 5–7 nights (Surgical)"
      },
      {
        "label": "Recovery",
        "value": "Walk within 24 hours (TAVR)"
      },
      {
        "label": "Fit to fly",
        "value": "Approved by cardiologist"
      }
    ],
    "timeline": [
      {
        "period": "Days 1–2",
        "description": "Pre-procedural transoesophageal echocardiogram (TEE), CT aortic root protocol, and heart team review."
      },
      {
        "period": "Day 3",
        "description": "TAVR or surgical valve procedure in hybrid cardiac suite. ICU observation."
      },
      {
        "period": "Days 4–5",
        "description": "Echocardiogram validation of new valve gradient, mobilization, and transfer to private room."
      },
      {
        "period": "Days 6–9",
        "description": "Anticoagulation / INR calibration (if mechanical valve), recovery check, and discharge."
      },
      {
        "period": "Days 10–14",
        "description": "Final echocardiography report, prosthetic valve registry card, fit-to-fly clearance, and travel."
      }
    ],
    "included": [
      "Multidisciplinary Heart Team (Surgeon, Interventionalist & Cardiac Anaesthetist) fees",
      "Advanced Hybrid Operating Suite or modular cardiac theatre facility fees",
      "Approved biological or mechanical valve prosthesis (model specified in written quote)",
      "Intra-operative Transoesophageal Echocardiogram (TEE) monitoring",
      "Private room and cardiac ICU accommodation",
      "Airport VIP assistance and local medical concierge"
    ],
    "excluded": [
      "TAVR prosthetic valve cost when choosing special imported balloon-expandable / self-expanding systems (itemised in advance)",
      "Extended anticoagulation medication kits after discharge"
    ],
    "doctors": [
      "dr-puneet-verma",
      "dr-anumeet-bagga",
      "dr-rakesh-sharma",
      "dr-gagandip-singh",
      "dr-kapil-k-chattree",
      "dr-ishant-singla"
    ],
    "guide": null,
    "note": "Every patient receives a formal manufacturer prosthesis passport specifying the model, serial number, and international warranty.",
    "hospitals": [
      "ace-heart-institute",
      "fortis-mohali",
      "max-super-speciality-mohali",
      "livasa-mohali"
    ]
  },
  {
    "slug": "pacemaker-aicd-implantation",
    "name": "Cardiac Pacemaker & AICD Implantation",
    "spec": "cardiac",
    "specName": "Cardiac Sciences",
    "priceFrom": 8000,
    "priceTo": null,
    "priceMode": "review",
    "saving": "~56%",
    "addon": false,
    "img": "/images/treatments/pacemaker-aicd-implantation.jpg",
    "summary": "Permanent pacemakers, AICDs and CRT devices for heart block, arrhythmias and heart failure management.",
    "intro": "Cardiac rhythm management devices regulate irregular heartbeats and prevent sudden cardiac death. In partner hospitals, senior cardiac electrophysiologists implant cutting-edge single/dual-chamber pacemakers, automated implantable cardioverter defibrillators (AICD), and cardiac resynchronization therapy (CRT-P / CRT-D) devices with digital remote monitoring.",
    "options": [
      {
        "title": "Dual-Chamber Pacemaker (DDDR)",
        "description": "Sensors synchronize the right atrium and ventricle to correct symptomatic bradycardia and complete heart block."
      },
      {
        "title": "Automated Implantable Cardioverter Defibrillator (AICD)",
        "description": "Monitors heart rhythm continuously and delivers a life-saving internal shock if ventricular tachycardia or fibrillation occurs."
      },
      {
        "title": "Cardiac Resynchronization Therapy (CRT-D / CRT-P)",
        "description": "Triple-lead biventricular device designed for patients with reduced ejection fraction heart failure to coordinate ventricular pumping."
      },
      {
        "title": "Leadless Pacemaker (Micra)",
        "description": "Miniaturized capsule implanted directly into the heart muscle via a femoral catheter, leaving no chest scar or lead wires."
      }
    ],
    "suited": [
      "Sick sinus syndrome or high-grade atrioventricular (AV) heart block",
      "Survivors of cardiac arrest or patients at high risk of ventricular arrhythmias",
      "Heart failure patients with left bundle branch block (LBBB) and low EF (<35%)",
      "Patients needing device replacement or battery generator change"
    ],
    "facts": [
      {
        "label": "Time in India",
        "value": "7–10 days"
      },
      {
        "label": "Hospital stay",
        "value": "1–2 nights"
      },
      {
        "label": "Procedure duration",
        "value": "60–90 minutes under local anaesthesia"
      },
      {
        "label": "Fit to fly",
        "value": "5–7 days post-implant"
      }
    ],
    "timeline": [
      {
        "period": "Day 1",
        "description": "Arrival, Holter monitor review, echocardiogram, routine blood screen, and electrophysiology consultation."
      },
      {
        "period": "Day 2",
        "description": "Device implantation under local anaesthesia with conscious sedation in the cardiac cath lab. Overnight telemetry."
      },
      {
        "period": "Day 3",
        "description": "Chest X-ray to verify lead positioning, digital device interrogation and programming. Discharge to private hotel."
      },
      {
        "period": "Days 4–6",
        "description": "Puncture wound inspection, arm mobility review, and home care education."
      },
      {
        "period": "Day 7",
        "description": "Final device programming report, international pacemaker ID card issuance, fit-to-fly clearance."
      }
    ],
    "included": [
      "Senior Cardiac Electrophysiologist and cath lab technician fees",
      "Cardiac catheterisation lab facility and fluoroscopy guidance",
      "Device generator and transvenous pacing/defibrillation leads (Medtronic/Abbott/Boston Scientific)",
      "Overnight cardiac observation stay with telemetry",
      "Post-implant programmer calibration and printed report",
      "Airport pickup, hotel drop, and English/Arabic coordination"
    ],
    "excluded": [
      "MRI-conditional or leadless upgrades unless chosen in advance",
      "Take-home oral cardiac medications"
    ],
    "doctors": [
      "dr-puneet-verma",
      "dr-sudheer-saxena",
      "dr-jagmohan-singh-varma",
      "dr-kapil-k-chattree",
      "dr-gagandip-singh"
    ],
    "guide": null,
    "note": "Patients receive an international manufacturer device ID card enabling security screening clearance at all global airports.",
    "hospitals": [
      "ace-heart-institute",
      "fortis-mohali",
      "max-super-speciality-mohali",
      "livasa-mohali"
    ]
  }
];

export const CHECKUPS: CheckupPackage[] = [
  {
    "name": "Essential Health Check",
    "description": "A sensible baseline for adults with no specific concerns.",
    "tests": [
      "Full blood count, kidney and liver function",
      "Blood sugar (fasting and HbA1c)",
      "Lipid profile and thyroid",
      "ECG and chest X-ray",
      "Consultation with a physician"
    ],
    "duration": "Half a day",
    "price": "On request"
  },
  {
    "name": "Comprehensive Executive Check",
    "description": "For people over 40, or anyone who wants a thorough picture.",
    "tests": [
      "Everything in Essential",
      "Ultrasound of the abdomen",
      "Echocardiogram and treadmill test",
      "Vitamin D and B12",
      "Eye and dental screening",
      "Physician review of all results"
    ],
    "duration": "1 day",
    "price": "On request"
  },
  {
    "name": "Heart Health Assessment",
    "description": "For a family history of heart disease, or risk factors such as diabetes or high blood pressure.",
    "tests": [
      "ECG, echocardiogram and treadmill test",
      "Cardiac risk blood markers",
      "Lipid profile and HbA1c",
      "Cardiologist consultation",
      "CT coronary angiography if advised"
    ],
    "duration": "1 day",
    "price": "On request"
  },
  {
    "name": "Women's Health Check",
    "description": "Age-appropriate screening for women.",
    "tests": [
      "Core blood tests and thyroid",
      "Pelvic ultrasound",
      "Mammogram or breast ultrasound (age-dependent)",
      "Pap smear",
      "Bone density scan (age-dependent)",
      "Gynaecologist consultation"
    ],
    "duration": "1 day",
    "price": "On request"
  },
  {
    "name": "Senior Health Check (60+)",
    "description": "Focused on the conditions that matter most later in life.",
    "tests": [
      "Comprehensive blood panel",
      "Cardiac screening",
      "Bone density scan",
      "Hearing and vision checks",
      "Memory and balance screening",
      "Physician review"
    ],
    "duration": "1\u20132 days",
    "price": "On request"
  },
];

export const WELLNESS_PROGRAMS: WellnessProgram[] = [
  {
    "name": "Post-surgery recovery stay",
    "icon": "bed",
    "description": "A private en-suite recovery suite with nursing on hand, so you leave hospital to somewhere calm and set up for recovery rather than a standard hotel room.",
    "features": [
      "24/7 nursing cover",
      "Doctor-approved meals",
      "Daily coordinator visits"
    ]
  },
  {
    "name": "Physiotherapy & rehabilitation",
    "icon": "activity",
    "description": "Daily one-to-one sessions with certified physiotherapists after joint, spine or other surgery, with a written home programme for when you leave.",
    "features": [
      "Daily sessions",
      "Progress notes for your home physio",
      "Mobility aids arranged"
    ]
  },
  {
    "name": "Hill recovery retreat",
    "icon": "leaf",
    "description": "Once your doctor is happy for you to leave the city, some patients spend the last part of their stay in the Kasauli hills, about two hours away, before flying home.",
    "features": [
      "Quieter, cooler air",
      "Transfers arranged",
      "Coordinator stays in touch"
    ]
  },
  {
    "name": "Lifestyle & prevention programme",
    "icon": "heart",
    "description": "Built around a health check-up: nutrition advice, an exercise plan and follow-up calls, for people who want to act on their results.",
    "features": [
      "Dietitian consultation",
      "Exercise plan",
      "Follow-up video calls"
    ]
  },
];

export const TREATMENTS_SECTION = {
  "headingLine1": "Clear starting prices,",
  "headingLine2": "itemised before you travel",
  "viewAllLabel": "Send Enquiry",
  "viewAllHref": "#",
  "defaultCurrencyCode": "USD",
  "currencies": [
    {
      "code": "USD",
      "label": "USD",
      "symbol": "$$"
    }
  ],
  "categories": [
    {
      "label": "All",
      "value": "all"
    },
    {
      "label": "Orthopaedics",
      "value": "orthopaedics"
    },
    {
      "label": "Cosmetic Surgery",
      "value": "cosmetic"
    },
    {
      "label": "Ophthalmology",
      "value": "eye"
    },
    {
      "label": "Dental Implants",
      "value": "dental"
    },
    {
      "label": "Fertility",
      "value": "fertility"
    }
  ],
  "cards": [
    { id: "card-knee-replacement", slug: "knee-replacement", category: "orthopaedics" },
    { id: "card-hip-replacement", slug: "hip-replacement", category: "orthopaedics" },
    { id: "card-acl-reconstruction", slug: "acl-reconstruction", category: "orthopaedics" },
    { id: "card-acdf-surgery", slug: "acdf-surgery", category: "orthopaedics" },
    { id: "card-minimal-invasive-spine", slug: "minimal-invasive-spine-surgery", category: "orthopaedics" },
    { id: "card-rhinoplasty", slug: "rhinoplasty", category: "cosmetic" },
    { id: "card-breast-implants", slug: "breast-implants", category: "cosmetic" },
    { id: "card-hair-transplant", slug: "hair-transplant", category: "cosmetic" },
    { id: "card-liposuction", slug: "liposuction", category: "cosmetic" },
    { id: "card-tummy-tuck", slug: "tummy-tuck", category: "cosmetic" },
    { id: "card-cataract", slug: "cataract-surgery", category: "eye" },
    { id: "card-lasik", slug: "lasik", category: "eye" },
    { id: "card-vitrectomy", slug: "vitrectomy", category: "eye" },
    { id: "card-cornea-transplant", slug: "cornea-transplant", category: "eye" },
    { id: "card-dental-implants", slug: "dental-implants", category: "dental" },
    { id: "card-full-mouth-implants", slug: "full-mouth-implants", category: "dental" },
    { id: "card-smile-design", slug: "smile-design", category: "dental" },
    { id: "card-ivf", slug: "ivf", category: "fertility" },
    { id: "card-icsi", slug: "icsi", category: "fertility" },
  ].map((cfg) => {
    const tc = TREATMENT_COSTS[cfg.slug];
    return {
      id: cfg.id,
      title: tc?.title || cfg.slug,
      category: cfg.category,
      href: `/treatments/${cfg.slug}`,
      priceMode: "range" as const,
      priceRange: tc?.priceRange || null,
      savingsPercent: tc?.savingsPercent || 65,
      locationPrices: tc?.locationPrices || [],
    };
  })
};
