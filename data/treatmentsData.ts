export interface TreatmentOption {
  title: string;
  description: string;
}

export interface TreatmentFact {
  label: string;
  value: string;
}

export interface TreatmentTimelineStep {
  period: string;
  description: string;
}

export interface TreatmentItem {
  slug: string;
  name: string;
  spec: string;
  specName: string;
  priceFrom: number | null;
  priceTo?: number | null;
  saving?: string | null;
  addon?: boolean;
  img: string;
  summary: string;
  intro: string;
  options: TreatmentOption[];
  suited: string[];
  facts: TreatmentFact[];
  timeline: TreatmentTimelineStep[];
  included: string[];
  excluded: string[];
  doctors: string[];
  guide?: string | null;
  note?: string | null;
  hospitals: string[];
}

export interface CheckupPackage {
  name: string;
  description: string;
  tests: string[];
  duration: string;
  price: string;
}

export interface WellnessProgram {
  name: string;
  icon: string;
  description: string;
  features: string[];
}

export interface SpecialtyItem {
  id: string;
  name: string;
  icon: string;
  treatments: string[];
}

export const SPECIALTIES: SpecialtyItem[] = [
  {
    id: "orthopaedics",
    name: "Orthopaedics",
    icon: "bone",
    treatments: ["Knee Replacement", "Hip Replacement", "Spine Surgery"]
  },
  {
    id: "fertility",
    name: "Fertility",
    icon: "baby",
    treatments: ["IVF", "ICSI"]
  },
  {
    id: "eye",
    name: "Eye care",
    icon: "eye",
    treatments: ["Cataract Surgery", "LASIK & Refractive Surgery"]
  },
  {
    id: "dental",
    name: "Dental",
    icon: "tooth",
    treatments: ["Dental Implants"]
  },
  {
    id: "cosmetic",
    name: "Cosmetic & Plastic Surgery",
    icon: "scalpel",
    treatments: ["Cosmetic & Plastic Surgery"]
  },
];

export const TREATMENTS: TreatmentItem[] = [
  {
    "slug": "knee-replacement",
    "name": "Knee Replacement",
    "spec": "orthopaedics",
    "specName": "Orthopaedics",
    "priceFrom": 3999,
    "priceTo": 12999,
    "saving": "~69%",
    "addon": false,
    "img": "/images/guides/knee-replacement-india.jpeg",
    "summary": "Total, partial and robotic-assisted knee replacement, planned with your surgeon before you travel.",
    "intro": "Knee replacement is one of the most common reasons people travel to India for surgery, and one of the easiest to plan well in advance. Your surgeon reviews your X-rays before you book anything, so you arrive knowing which operation you are having and what the recovery plan looks like.",
    "options": [
      {
        "title": "Total knee replacement",
        "description": "All three compartments of the joint are resurfaced. The usual choice for advanced arthritis."
      },
      {
        "title": "Partial (unicompartmental) replacement",
        "description": "Only the worn part of the knee is replaced. Suitable for some patients with damage limited to one side; recovery is often quicker."
      },
      {
        "title": "Robotic-assisted replacement",
        "description": "The surgeon uses a robotic arm to plan and guide the bone cuts. Availability depends on the hospital."
      },
      {
        "title": "Both knees (bilateral)",
        "description": "Both knees can sometimes be done in one admission or a few days apart. Your surgeon decides based on your overall health."
      }
    ],
    "suited": [
      "Arthritis causing pain that limits walking or sleep",
      "Pain not controlled by medication, injections or physiotherapy",
      "Long waiting lists or high costs at home"
    ],
    "facts": [
      {
        "label": "Time in India",
        "value": "3\u20134 weeks"
      },
      {
        "label": "Hospital stay",
        "value": "3\u20135 nights"
      },
      {
        "label": "Walking",
        "value": "With support from day 1\u20132"
      },
      {
        "label": "Fit to fly",
        "value": "Decided by your surgeon"
      }
    ],
    "timeline": [
      {
        "period": "Days 1\u20132",
        "description": "Arrival, pre-operative tests, meeting your surgeon and anaesthetist."
      },
      {
        "period": "Day 2\u20133",
        "description": "Surgery. Most patients stand with support within a day."
      },
      {
        "period": "Days 3\u20137",
        "description": "Hospital stay with daily physiotherapy, then discharge to your recovery suite."
      },
      {
        "period": "Weeks 2\u20133",
        "description": "Daily physiotherapy, wound check, stitch or clip removal."
      },
      {
        "period": "Week 3\u20134",
        "description": "Fit-to-fly review, discharge summary and a home exercise plan."
      }
    ],
    "included": [
      "Surgeon's and anaesthetist's fees",
      "Implant (type agreed in your quote)",
      "Hospital stay and standard room",
      "Pre-operative tests",
      "In-hospital physiotherapy",
      "Airport transfers and a dedicated coordinator"
    ],
    "excluded": [
      "Flights and visa fees",
      "Recovery-suite nights beyond those in your quote",
      "Treatment of unrelated conditions found during tests"
    ],
    "doctors": [
      "dr-jatinder-singla"
    ],
    "guide": "knee-replacement-india",
    "note": null,
    "hospitals": [
      "max-super-speciality-mohali",
      "fortis-mohali",
      "livasa-mohali",
      "sohana-mohali"
    ]
  },
  {
    "slug": "hip-replacement",
    "name": "Hip Replacement",
    "spec": "orthopaedics",
    "specName": "Orthopaedics",
    "priceFrom": null,
    "priceTo": null,
    "saving": null,
    "addon": false,
    "img": "/images/treatments/medical.jpeg",
    "summary": "Total hip replacement and revision surgery, with physiotherapy built into your stay.",
    "intro": "Hip replacement relieves pain and restores movement when the joint is worn by arthritis or damaged by an old injury. The planning is similar to knee replacement: your surgeon reviews your X-rays first and agrees the implant and approach with you over video.",
    "options": [
      {
        "title": "Total hip replacement",
        "description": "The ball and socket are both replaced. The standard operation for advanced arthritis."
      },
      {
        "title": "Revision hip replacement",
        "description": "Replacing an earlier implant that has worn or loosened. Needs detailed imaging before a quote can be given."
      }
    ],
    "suited": [
      "Hip arthritis that limits walking, sleep or daily tasks",
      "Avascular necrosis of the hip",
      "A previous hip replacement that has worn"
    ],
    "facts": [
      {
        "label": "Time in India",
        "value": "3\u20134 weeks"
      },
      {
        "label": "Hospital stay",
        "value": "3\u20135 nights"
      },
      {
        "label": "Walking",
        "value": "With support from day 1\u20132"
      },
      {
        "label": "Fit to fly",
        "value": "Decided by your surgeon"
      }
    ],
    "timeline": [
      {
        "period": "Days 1\u20132",
        "description": "Arrival, tests and consultations."
      },
      {
        "period": "Day 2\u20133",
        "description": "Surgery."
      },
      {
        "period": "Days 3\u20137",
        "description": "Hospital stay with daily physiotherapy."
      },
      {
        "period": "Weeks 2\u20133",
        "description": "Recovery suite, physiotherapy, wound review."
      },
      {
        "period": "Week 3\u20134",
        "description": "Fit-to-fly review and handover documents."
      }
    ],
    "included": [
      "Surgeon's and anaesthetist's fees",
      "Implant (type agreed in your quote)",
      "Hospital stay",
      "Pre-operative tests",
      "In-hospital physiotherapy",
      "Airport transfers and coordinator"
    ],
    "excluded": [
      "Flights and visa fees",
      "Extra recovery nights",
      "Unrelated treatment"
    ],
    "doctors": [
      "dr-jatinder-singla"
    ],
    "guide": null,
    "note": null,
    "hospitals": [
      "max-super-speciality-mohali",
      "fortis-mohali",
      "livasa-mohali",
      "sohana-mohali"
    ]
  },
  {
    "slug": "spine-surgery",
    "name": "Spine Surgery",
    "spec": "orthopaedics",
    "specName": "Orthopaedics",
    "priceFrom": null,
    "priceTo": null,
    "saving": null,
    "addon": false,
    "img": "/images/hero/doctor.jpg",
    "summary": "Disc, decompression and fusion surgery, only after a specialist has reviewed your MRI.",
    "intro": "Spine surgery covers a wide range of operations, and not every back problem needs one. We start with a specialist review of your recent MRI and symptoms. If surgery is not the right answer, we will say so.",
    "options": [
      {
        "title": "Discectomy / microdiscectomy",
        "description": "Removing the part of a disc that presses on a nerve."
      },
      {
        "title": "Decompression (laminectomy)",
        "description": "Making more room for nerves in a narrowed spinal canal."
      },
      {
        "title": "Spinal fusion",
        "description": "Joining two or more vertebrae to stabilise the spine."
      }
    ],
    "suited": [
      "Sciatica or arm pain from a disc problem that hasn't settled",
      "Spinal stenosis limiting walking distance",
      "Instability confirmed on imaging"
    ],
    "facts": [
      {
        "label": "Time in India",
        "value": "2\u20134 weeks"
      },
      {
        "label": "Hospital stay",
        "value": "2\u20136 nights"
      },
      {
        "label": "Imaging needed",
        "value": "MRI within 6 months"
      },
      {
        "label": "Fit to fly",
        "value": "Decided by your surgeon"
      }
    ],
    "timeline": [
      {
        "period": "Before travel",
        "description": "MRI and symptom review by a spine surgeon; video consultation."
      },
      {
        "period": "Days 1\u20132",
        "description": "Arrival, tests, consultation."
      },
      {
        "period": "Day 2\u20133",
        "description": "Surgery."
      },
      {
        "period": "Following days",
        "description": "Hospital stay, then recovery suite with physiotherapy."
      },
      {
        "period": "Before flying",
        "description": "Review, discharge summary and home plan."
      }
    ],
    "included": [
      "Surgeon's and anaesthetist's fees",
      "Hospital stay",
      "Implants where needed (agreed in quote)",
      "Pre-operative tests",
      "Physiotherapy in hospital",
      "Transfers and coordinator"
    ],
    "excluded": [
      "Flights and visa fees",
      "Extra recovery nights",
      "Unrelated treatment"
    ],
    "doctors": [],
    "guide": null,
    "note": null,
    "hospitals": [
      "max-super-speciality-mohali"
    ]
  },
  {
    "slug": "ivf",
    "name": "IVF",
    "spec": "fertility",
    "specName": "Fertility",
    "priceFrom": 2999,
    "priceTo": 5999,
    "saving": "~50%",
    "addon": false,
    "img": "/images/treatments/medical.jpeg",
    "summary": "In-vitro fertilisation planned around one trip, with monitoring scans and the lab in the same hospital.",
    "intro": "IVF needs careful timing. Most of the planning, including tests and the medication protocol, can start at home, so the time you spend in India is kept as short as the cycle allows. You'll talk to the fertility specialist on video before you commit to anything.",
    "options": [
      {
        "title": "IVF with fresh embryo transfer",
        "description": "Egg collection, fertilisation in the lab, and transfer a few days later in the same trip."
      },
      {
        "title": "IVF with frozen embryo transfer",
        "description": "Embryos are frozen and transferred in a later cycle. This can mean a second, shorter trip."
      },
      {
        "title": "Donor programmes",
        "description": "Where Indian law allows. Discussed case by case with the clinic."
      }
    ],
    "suited": [
      "Couples who have been trying for a year or more (six months if over 35)",
      "Blocked or damaged fallopian tubes",
      "Unexplained infertility after earlier treatment"
    ],
    "facts": [
      {
        "label": "Time in India",
        "value": "About 3 weeks"
      },
      {
        "label": "Start",
        "value": "Tests and protocol at home"
      },
      {
        "label": "Procedures",
        "value": "Day-care, no overnight stay"
      },
      {
        "label": "Partner",
        "value": "Needed in India for some days"
      }
    ],
    "timeline": [
      {
        "period": "At home",
        "description": "Blood tests and scans; protocol agreed with the specialist on video."
      },
      {
        "period": "Days 1\u201310",
        "description": "Arrival around the start of stimulation; monitoring scans every few days."
      },
      {
        "period": "Around day 12",
        "description": "Egg collection under light sedation."
      },
      {
        "period": "3\u20135 days later",
        "description": "Embryo transfer, or freezing for a later transfer."
      },
      {
        "period": "After transfer",
        "description": "Rest days, then home. The pregnancy test is done about two weeks later."
      }
    ],
    "included": [
      "Specialist consultations",
      "Monitoring scans",
      "Egg collection and lab work",
      "Embryo transfer",
      "Coordinator and transfers"
    ],
    "excluded": [
      "Stimulation medication (quoted separately as dosage varies)",
      "Flights and visa fees",
      "Embryo freezing and storage unless listed"
    ],
    "doctors": [],
    "guide": null,
    "note": null,
    "hospitals": [
      "fortis-mohali"
    ]
  },
  {
    "slug": "icsi",
    "name": "ICSI",
    "spec": "fertility",
    "specName": "Fertility",
    "priceFrom": 999,
    "priceTo": null,
    "saving": null,
    "addon": true,
    "img": "/images/treatments/medical.jpeg",
    "summary": "A single sperm injected into each egg. Added to an IVF cycle, usually for male-factor infertility.",
    "intro": "ICSI (intracytoplasmic sperm injection) is a laboratory step added to IVF. Instead of mixing eggs and sperm, the embryologist injects a single sperm into each mature egg. The price shown is the cost of the ICSI step on top of an IVF cycle.",
    "options": [
      {
        "title": "ICSI with IVF",
        "description": "Carried out on the day of egg collection, inside the same IVF cycle."
      }
    ],
    "suited": [
      "Low sperm count or poor motility",
      "Previous IVF with poor fertilisation",
      "Using frozen or surgically retrieved sperm"
    ],
    "facts": [
      {
        "label": "Price shown",
        "value": "Add-on to IVF"
      },
      {
        "label": "Time in India",
        "value": "Same as IVF"
      },
      {
        "label": "Done",
        "value": "In the lab, same day as egg collection"
      },
      {
        "label": "Decision",
        "value": "Made with your specialist"
      }
    ],
    "timeline": [
      {
        "period": "Before travel",
        "description": "Semen analysis at home; specialist recommends whether ICSI is needed."
      },
      {
        "period": "Collection day",
        "description": "Eggs collected; ICSI performed in the lab."
      },
      {
        "period": "Following days",
        "description": "Embryo development monitored."
      },
      {
        "period": "Transfer",
        "description": "Fresh or frozen transfer as planned."
      }
    ],
    "included": [
      "ICSI laboratory procedure",
      "Embryologist's fees"
    ],
    "excluded": [
      "The IVF cycle itself (quoted separately)",
      "Medication",
      "Flights and visa fees"
    ],
    "doctors": [],
    "guide": null,
    "note": null,
    "hospitals": [
      "fortis-mohali"
    ]
  },
  {
    "slug": "cataract-surgery",
    "name": "Cataract Surgery",
    "spec": "eye",
    "specName": "Eye care",
    "priceFrom": null,
    "priceTo": null,
    "saving": null,
    "addon": false,
    "img": "/img/sangam-netralaya.jpg",
    "summary": "Day-case cataract surgery with a choice of lens, in about a week in Mohali.",
    "intro": "Cataract surgery replaces the clouded natural lens of the eye with a clear artificial one. It is a short day-case procedure, and the whole trip, including measurements and follow-up checks, usually fits into about a week.",
    "options": [
      {
        "title": "Monofocal lens",
        "description": "Clear distance vision; most people still use reading glasses."
      },
      {
        "title": "Toric lens",
        "description": "Corrects astigmatism as well as the cataract."
      },
      {
        "title": "Multifocal / extended-depth lens",
        "description": "Aims to reduce dependence on glasses at more than one distance. Not suitable for every eye."
      }
    ],
    "suited": [
      "Cloudy or blurred vision affecting reading or driving",
      "Glare from headlights",
      "Frequent changes in glasses prescription"
    ],
    "facts": [
      {
        "label": "Time in India",
        "value": "About 1 week"
      },
      {
        "label": "Procedure",
        "value": "Day-case, around 20\u201330 min"
      },
      {
        "label": "Both eyes",
        "value": "Usually a few days apart"
      },
      {
        "label": "Fit to fly",
        "value": "After the first review"
      }
    ],
    "timeline": [
      {
        "period": "Day 1",
        "description": "Arrival and eye measurements."
      },
      {
        "period": "Day 2",
        "description": "Surgery on the first eye; home the same day."
      },
      {
        "period": "Day 3",
        "description": "First check."
      },
      {
        "period": "Days 4\u20136",
        "description": "Second eye if planned, then a final review."
      }
    ],
    "included": [
      "Surgeon's fees",
      "Lens (type agreed in quote)",
      "Pre-operative measurements",
      "Post-operative checks while in India",
      "Coordinator and transfers"
    ],
    "excluded": [
      "Flights and visa fees",
      "Hotel nights beyond the plan",
      "New glasses if needed later"
    ],
    "doctors": [
      "dr-ashish-ahuja"
    ],
    "guide": null,
    "note": null,
    "hospitals": [
      "sohana-mohali",
      "sangam-netralaya"
    ]
  },
  {
    "slug": "lasik",
    "name": "LASIK & Refractive Surgery",
    "spec": "eye",
    "specName": "Eye care",
    "priceFrom": null,
    "priceTo": null,
    "saving": null,
    "addon": false,
    "img": "/img/sangam-netralaya.jpg",
    "summary": "Laser vision correction after a full suitability check. Not everyone is a candidate, and we'll tell you.",
    "intro": "Refractive surgery reshapes the cornea so you rely less on glasses or contact lenses. Suitability depends on corneal thickness, prescription stability and eye health, so a detailed assessment comes first. If you are not a good candidate, the surgeon will tell you and explain the alternatives.",
    "options": [
      {
        "title": "LASIK",
        "description": "A thin flap is created and the cornea reshaped with a laser."
      },
      {
        "title": "PRK / surface treatments",
        "description": "No flap; often used for thinner corneas. Recovery is slower."
      },
      {
        "title": "Phakic lens implants",
        "description": "For high prescriptions unsuitable for laser treatment."
      }
    ],
    "suited": [
      "Adults with a stable prescription for at least a year",
      "Healthy corneas of adequate thickness",
      "People who find glasses or contacts limiting"
    ],
    "facts": [
      {
        "label": "Time in India",
        "value": "About 1 week"
      },
      {
        "label": "Procedure",
        "value": "Both eyes, same day"
      },
      {
        "label": "Contacts",
        "value": "Stop wearing before testing"
      },
      {
        "label": "Assessment",
        "value": "Decides suitability"
      }
    ],
    "timeline": [
      {
        "period": "Day 1",
        "description": "Full suitability assessment."
      },
      {
        "period": "Day 2",
        "description": "Procedure, if suitable."
      },
      {
        "period": "Day 3",
        "description": "First review."
      },
      {
        "period": "Day 5\u20136",
        "description": "Final review before flying."
      }
    ],
    "included": [
      "Suitability assessment",
      "Procedure fees",
      "Reviews while in India",
      "Coordinator and transfers"
    ],
    "excluded": [
      "Flights and visa fees",
      "Hotel nights beyond the plan"
    ],
    "doctors": [
      "dr-ashish-ahuja"
    ],
    "guide": null,
    "note": null,
    "hospitals": [
      "sangam-netralaya"
    ]
  },
  {
    "slug": "dental-implants",
    "name": "Dental Implants",
    "spec": "dental",
    "specName": "Dental",
    "priceFrom": null,
    "priceTo": null,
    "saving": null,
    "addon": false,
    "img": "/images/hero/doctor.jpg",
    "summary": "Single and full-arch implants, usually across two visits, planned from your scans.",
    "intro": "A dental implant is a titanium post placed in the jaw that supports a crown, bridge or full set of teeth. Because the bone needs time to heal around the implant, treatment usually takes two shorter visits a few months apart. Some patients are suitable for faster protocols, which the dentist will discuss after seeing your scans.",
    "options": [
      {
        "title": "Single tooth implant",
        "description": "One implant and crown replacing a missing tooth."
      },
      {
        "title": "Implant-supported bridge",
        "description": "Two or more implants supporting several teeth."
      },
      {
        "title": "Full-arch (e.g. All-on-4 / All-on-6)",
        "description": "A fixed set of teeth on four to six implants."
      }
    ],
    "suited": [
      "One or more missing teeth",
      "Loose or uncomfortable dentures",
      "Enough jawbone, or willingness to have bone grafting"
    ],
    "facts": [
      {
        "label": "Visits",
        "value": "Usually 2"
      },
      {
        "label": "First visit",
        "value": "About 1 week"
      },
      {
        "label": "Second visit",
        "value": "After 3\u20136 months"
      },
      {
        "label": "Scans",
        "value": "OPG or CBCT needed"
      }
    ],
    "timeline": [
      {
        "period": "Before travel",
        "description": "Send a recent OPG or CBCT scan for planning."
      },
      {
        "period": "Visit 1",
        "description": "Examination, implant placement, temporary teeth where possible."
      },
      {
        "period": "Healing",
        "description": "3\u20136 months at home while the implants integrate."
      },
      {
        "period": "Visit 2",
        "description": "Final crowns or bridge fitted and adjusted."
      }
    ],
    "included": [
      "Dentist's fees",
      "Implants and abutments (brand agreed in quote)",
      "Temporary and final prosthesis",
      "Coordinator and transfers"
    ],
    "excluded": [
      "Bone grafting unless listed",
      "Flights and visa fees for both visits"
    ],
    "doctors": [],
    "guide": null,
    "note": "Our dental partner clinic is confirmed with your quote.",
    "hospitals": []
  },
  {
    "slug": "cosmetic-surgery",
    "name": "Cosmetic & Plastic Surgery",
    "spec": "cosmetic",
    "specName": "Cosmetic & Plastic Surgery",
    "priceFrom": null,
    "priceTo": null,
    "saving": null,
    "addon": false,
    "img": "/images/hero/doctor.jpg",
    "summary": "Body and facial procedures with an unhurried consultation first, and enough recovery time before you fly.",
    "intro": "Cosmetic surgery is elective, which means there is time to get it right. You'll have a video consultation with the plastic surgeon before booking, talk through realistic results and scarring, and agree how long you need to stay in India before it is safe to fly.",
    "options": [
      {
        "title": "Body contouring",
        "description": "Liposuction, abdominoplasty (tummy tuck)."
      },
      {
        "title": "Breast surgery",
        "description": "Augmentation, reduction, uplift."
      },
      {
        "title": "Facial procedures",
        "description": "Rhinoplasty, eyelid surgery, facelift."
      },
      {
        "title": "Reconstructive procedures",
        "description": "Scar revision and post-weight-loss surgery."
      }
    ],
    "suited": [
      "Adults in good general health",
      "Realistic expectations of the result",
      "Non-smokers, or willing to stop before surgery"
    ],
    "facts": [
      {
        "label": "Time in India",
        "value": "1\u20133 weeks"
      },
      {
        "label": "Depends on",
        "value": "Procedure and combination"
      },
      {
        "label": "Consultation",
        "value": "Video, before booking"
      },
      {
        "label": "Fit to fly",
        "value": "Decided by your surgeon"
      }
    ],
    "timeline": [
      {
        "period": "Before travel",
        "description": "Photos and medical history; video consultation."
      },
      {
        "period": "Days 1\u20132",
        "description": "Arrival, tests, in-person consultation."
      },
      {
        "period": "Day 2\u20133",
        "description": "Surgery."
      },
      {
        "period": "Following days",
        "description": "Recovery suite, dressing changes, garment fitting."
      },
      {
        "period": "Before flying",
        "description": "Final review and aftercare instructions."
      }
    ],
    "included": [
      "Surgeon's and anaesthetist's fees",
      "Hospital or day-care stay",
      "Pre-operative tests",
      "First compression garment where needed",
      "Coordinator and transfers"
    ],
    "excluded": [
      "Flights and visa fees",
      "Extra recovery nights"
    ],
    "doctors": [
      "dr-vikas-gupta"
    ],
    "guide": null,
    "note": null,
    "hospitals": [
      "livasa-mohali"
    ]
  },
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
