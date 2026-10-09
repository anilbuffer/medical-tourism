"use client";

import React, { useState } from "react";
import { ArrowRight, Info, ShieldCheck, Check, Sparkles, Building, Car, Mountain } from "lucide-react";
import { useCare } from "@/context/CareContext";

// Custom Bespoke Medical Procedure Icons matching reference style
const HipIcon = () => (
  <svg viewBox="0 0 44 44" fill="none" className="w-10 h-10 shrink-0" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 8C14 6 22 7 24 13C26 7 34 6 38 8C41 14 38 22 34 25C29 28 27 26 26 21"
      stroke="#0C2338"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="#D5EFE3"
    />
    <circle cx="18" cy="22" r="6" stroke="#0C2338" strokeWidth="2.2" fill="#8FE1BC" />
    <circle cx="18" cy="22" r="2.5" fill="#0C2338" />
    <path d="M17 27L12 40" stroke="#0C2338" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const KneeIcon = () => (
  <svg viewBox="0 0 44 44" fill="none" className="w-10 h-10 shrink-0" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17 6V15C17 19 14 20 15 22C16 24 20 24 21 22C22 20 19 19 19 15V6"
      stroke="#0C2338"
      strokeWidth="2.2"
      strokeLinecap="round"
      fill="#D5EFE3"
    />
    <circle cx="22" cy="22" r="7" stroke="#0C2338" strokeWidth="2.2" fill="#8FE1BC" />
    <circle cx="22" cy="22" r="3.5" stroke="#0C2338" strokeWidth="1.8" fill="#ffffff" />
    <path
      d="M16 29C16 27 19 26 22 26C25 26 28 27 28 29L26 39H18L16 29Z"
      stroke="#0C2338"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="#D5EFE3"
    />
  </svg>
);

const IvfIcon = () => (
  <svg viewBox="0 0 44 44" fill="none" className="w-10 h-10 shrink-0" xmlns="http://www.w3.org/2000/svg">
    <circle cx="22" cy="22" r="16" stroke="#0C2338" strokeWidth="2.2" fill="#D5EFE3" fillOpacity="0.5" />
    <path
      d="M24 13C28 13 31 16 31 20C31 24 28 26 26 27C25 28 26 30 23 31C20 32 18 30 19 28C19 26 21 25 21 23C19 23 17 21 17 18C17 15 20 13 24 13Z"
      stroke="#0C2338"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="#8FE1BC"
    />
    <circle cx="25" cy="17" r="1.5" fill="#0C2338" />
  </svg>
);

const RoboticSurgeryIcon = () => (
  <svg viewBox="0 0 44 44" fill="none" className="w-10 h-10 shrink-0" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 7H26M22 7V12" stroke="#0C2338" strokeWidth="2.2" strokeLinecap="round" />
    <rect x="16" y="12" width="12" height="6" rx="2" stroke="#0C2338" strokeWidth="2" fill="#D5EFE3" />
    <path
      d="M17 18L10 25V33M27 18L34 25V33M22 18V31"
      stroke="#0C2338"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="10" cy="34" r="2" stroke="#0C2338" strokeWidth="2" fill="#8FE1BC" />
    <circle cx="22" cy="33" r="2" stroke="#0C2338" strokeWidth="2" fill="#8FE1BC" />
    <circle cx="34" cy="34" r="2" stroke="#0C2338" strokeWidth="2" fill="#8FE1BC" />
  </svg>
);

const MastectomyIcon = () => (
  <svg viewBox="0 0 44 44" fill="none" className="w-10 h-10 shrink-0" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9 11C11 18 11 27 13 33H31C33 27 33 18 35 11"
      stroke="#0C2338"
      strokeWidth="2.2"
      strokeLinecap="round"
      fill="#D5EFE3"
      fillOpacity="0.4"
    />
    <path
      d="M14 20C16 24 20 26 22 22C24 26 28 24 30 20"
      stroke="#0C2338"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <circle cx="18" cy="19" r="1.5" fill="#8FE1BC" />
    <circle cx="26" cy="19" r="1.5" fill="#8FE1BC" />
  </svg>
);

const HysterectomyIcon = () => (
  <svg viewBox="0 0 44 44" fill="none" className="w-10 h-10 shrink-0" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 14C10 11 14 9 18 11L22 13L26 11C30 9 34 11 34 14C34 18 31 20 28 20C26 20 26 23 26 26C26 30 24 33 22 33C20 33 18 30 18 26C18 23 18 20 16 20C13 20 10 18 10 14Z"
      stroke="#0C2338"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="#8FE1BC"
    />
    <circle cx="9" cy="16" r="2.2" stroke="#0C2338" strokeWidth="1.8" fill="#D5EFE3" />
    <circle cx="35" cy="16" r="2.2" stroke="#0C2338" strokeWidth="1.8" fill="#D5EFE3" />
  </svg>
);

const ProstatectomyIcon = () => (
  <svg viewBox="0 0 44 44" fill="none" className="w-10 h-10 shrink-0" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15 11C15 8 29 8 29 11C32 16 31 23 26 25V27H18V25C13 23 12 16 15 11Z"
      stroke="#0C2338"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="#D5EFE3"
      fillOpacity="0.5"
    />
    <path
      d="M17 28C15 30 15 34 18 36C20 37 22 35 22 33C22 35 24 37 26 36C29 34 29 30 27 28H17Z"
      stroke="#0C2338"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="#8FE1BC"
    />
    <path d="M22 25V38" stroke="#0C2338" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const DentalArchIcon = () => (
  <svg viewBox="0 0 44 44" fill="none" className="w-10 h-10 shrink-0" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8 20C8 13 14 9 22 9C30 9 36 13 36 20C36 24 33 26 30 26C26 26 24 24 22 24C20 24 18 26 14 26C11 26 8 24 8 20Z"
      stroke="#0C2338"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="#8FE1BC"
    />
    <path d="M12 26V32M16 26V34M20 24V34M24 24V34M28 26V34M32 26V32" stroke="#0C2338" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const costComparisonData = [
  {
    treatment: "Hip Replacement (U/L)",
    ukPrice: "$19,500",
    dubaiPrice: "$16,000",
    indiaPrice: "$6,500",
    icon: HipIcon,
  },
  {
    treatment: "Knee Replacement (U/L)",
    ukPrice: "$18,500",
    dubaiPrice: "$12,000",
    indiaPrice: "$5,700",
    icon: KneeIcon,
  },
  {
    treatment: "IVF with Donor Eggs",
    ukPrice: "$11,000",
    dubaiPrice: "$9,000",
    indiaPrice: "$5,000",
    icon: IvfIcon,
  },
  {
    treatment: "Robotic Surgery for Endometriosis",
    ukPrice: "$14,000",
    dubaiPrice: "$17,000",
    indiaPrice: "$7,500",
    icon: RoboticSurgeryIcon,
  },
  {
    treatment: "Mastectomy (Breast Cancer Surgery)",
    ukPrice: "$9,000",
    dubaiPrice: "$20,000",
    indiaPrice: "$3,000",
    icon: MastectomyIcon,
  },
  {
    treatment: "Hysterectomy (Uterus Removal)",
    ukPrice: "$10,000",
    dubaiPrice: "$15,000",
    indiaPrice: "$3,500",
    icon: HysterectomyIcon,
  },
  {
    treatment: "Prostatectomy (Prostate Removal)",
    ukPrice: "$13,000",
    dubaiPrice: "$17,000",
    indiaPrice: "$5,500",
    icon: ProstatectomyIcon,
  },
  {
    treatment: "Full Arch Implants (All-on-6)",
    ukPrice: "$11,000",
    dubaiPrice: "$13,000",
    indiaPrice: "$5,000",
    icon: DentalArchIcon,
  },
];

export const CostTransparency = () => {
  const { openIntake } = useCare();

  return (
    <section id="costs" className="py-16 sm:py-24 bg-[#ECF4F7] border-t border-[#DCE6EB] font-sans">
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-4xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE6EB] text-[#0B5D68] text-xs font-heading font-bold uppercase tracking-wider mb-3 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0B5D68]" />
            <span>TRANSPARENT ALL-INCLUSIVE PRICING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#0C2338] mb-4 leading-tight">
            Choose How You Want to Stay
          </h2>
          <p className="text-[#6B7C88] text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
            Two distinct plans. They differ in where you sleep, how you travel, and what you do while you recover — never in who operates on you or the quality of care.
          </p>
        </div>

        {/* Identical Medical Care Guarantee Banner */}
        <div className="mb-14 bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE6EB] shadow-sm">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-[#0B5D68]/10 flex items-center justify-center text-[#0B5D68] shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5 text-[#0B5D68]" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-heading font-bold text-[#0C2338] mb-1">
                Your medical care is identical in both packages
              </h3>
              <p className="text-[#6B7C88] text-xs sm:text-sm leading-relaxed max-w-3xl">
                The plan you select changes your comfort and stay, not your treatment. Nobody gets a junior surgeon, a cheaper implant, or a rushed recovery because of what they choose.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 pt-4 border-t border-[#DCE6EB]/60">
            <div className="flex items-center gap-2.5 text-xs text-[#0C2338] font-medium">
              <span className="text-[#0B8F83] font-bold">✓</span> Same Chief Surgeon & Operating Theatre
            </div>
            <div className="flex items-center gap-2.5 text-xs text-[#0C2338] font-medium">
              <span className="text-[#0B8F83] font-bold">✓</span> Same JCI / NABH Quaternary Hospital
            </div>
            <div className="flex items-center gap-2.5 text-xs text-[#0C2338] font-medium">
              <span className="text-[#0B8F83] font-bold">✓</span> Same US-FDA Approved Implants & Tech
            </div>
            <div className="flex items-center gap-2.5 text-xs text-[#0C2338] font-medium">
              <span className="text-[#0B8F83] font-bold">✓</span> Same Private Inpatient Nursing Care
            </div>
            <div className="flex items-center gap-2.5 text-xs text-[#0C2338] font-medium">
              <span className="text-[#0B8F83] font-bold">✓</span> 6 Months Post-Op Telemedicine
            </div>
            <div className="flex items-center gap-2.5 text-xs text-[#0C2338] font-medium">
              <span className="text-[#0B8F83] font-bold">✓</span> Written Guaranteed Price Quote
            </div>
          </div>
        </div>

        {/* Side-by-Side Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Essential Plan */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#DCE6EB] shadow-md hover:shadow-xl transition-all flex flex-col">
            <div className="inline-block px-3 py-1 bg-[#ECF4F7] text-[#0C2338] text-xs font-heading font-bold rounded-full mb-6 w-max">
              Essential Stay
            </div>
            <h3 className="text-2xl font-heading font-extrabold text-[#0C2338] mb-2">
              Everything you need, nothing you don&apos;t
            </h3>
            <p className="text-[#6B7C88] text-xs sm:text-sm mb-6 leading-relaxed">
              Designed for patients who prefer a streamlined journey, resting in clean vetted 3–4 star suites close to the hospital.
            </p>
            
            <div className="h-px bg-[#DCE6EB] w-full mb-6" />
            
            <p className="text-xs font-heading font-bold uppercase tracking-wider text-[#6B7C88] mb-5">Package Inclusions</p>
            
            <div className="space-y-4 flex-1 text-xs sm:text-sm text-[#0C2338]">
              <div className="flex items-start gap-3">
                <span className="text-[#0B8F83] font-bold mt-0.5">✓</span>
                <div>
                  <h4 className="font-bold text-[#0C2338]">Vetted Hotel Close to Hospital</h4>
                  <p className="text-xs text-[#6B7C88] mt-0.5">Quiet 3–4 star suite with elevator, room service & sanitisation</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#0B8F83] font-bold mt-0.5">✓</span>
                <div>
                  <h4 className="font-bold text-[#0C2338]">Airport Pickup & Return Drop</h4>
                  <p className="text-xs text-[#6B7C88] mt-0.5">Private AC vehicle, wheelchair accommodation available</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#0B8F83] font-bold mt-0.5">✓</span>
                <div>
                  <h4 className="font-bold text-[#0C2338]">All Clinical Transfers</h4>
                  <p className="text-xs text-[#6B7C88] mt-0.5">Pre-op labs, surgeon visits, scans and checkups</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#0B8F83] font-bold mt-0.5">✓</span>
                <div>
                  <h4 className="font-bold text-[#0C2338]">One Family Companion Included</h4>
                  <p className="text-xs text-[#6B7C88] mt-0.5">Companion bed in hospital room & meals during admission</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#0B8F83] font-bold mt-0.5">✓</span>
                <div>
                  <h4 className="font-bold text-[#0C2338]">Daily In-Person Concierge Visit</h4>
                  <p className="text-xs text-[#6B7C88] mt-0.5">Your named coordinator handles all scheduling & questions</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-[#DCE6EB]">
              <button 
                onClick={() => openIntake("Essential Plan")}
                className="w-full py-4 bg-[#F0A126] hover:bg-[#db8e18] text-[#0C2338] font-heading font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#F0A126]/20 cursor-pointer"
              >
                Get Written Quote for Essential
              </button>
              <p className="text-center text-[11px] text-[#6B7C88] mt-3">No commitment or fees until your written plan is ready</p>
            </div>
          </div>

          {/* Premium Concierge Plan */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-[#0B5D68] shadow-xl flex flex-col relative">
            <div className="flex items-center justify-between mb-6">
              <div className="inline-block px-3.5 py-1 bg-[#ECF4F7] text-[#0B5D68] border border-[#DCE6EB] text-xs font-heading font-bold rounded-full">
                Premium Concierge
              </div>
              <span className="px-3 py-1 rounded-full bg-[#F0A126] text-white text-[10px] font-heading font-bold tracking-wider uppercase shadow-xs">
                Most Popular
              </span>
            </div>

            <h3 className="text-2xl font-heading font-extrabold text-[#0C2338] mb-2">
              Room to recover with complete luxury
            </h3>
            <p className="text-[#6B7C88] text-xs sm:text-sm mb-6 leading-relaxed">
              For patients travelling with loved ones who prefer 5-star hospitality, dedicated private chauffeur, and restful post-op scenery.
            </p>
            
            <div className="h-px bg-[#DCE6EB] w-full mb-6" />
            
            <p className="text-xs font-heading font-bold uppercase tracking-wider text-[#0B5D68] mb-5">Everything in Essential, plus</p>
            
            <div className="space-y-4 flex-1 text-xs sm:text-sm text-[#0C2338]">
              <div className="bg-[#ECF4F7] border border-[#DCE6EB] rounded-2xl p-4 flex items-start gap-3">
                <Mountain className="w-5 h-5 text-[#0B5D68] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#0C2338] text-sm">Post-Recovery Himalayan Retreat Option</h4>
                  <p className="text-xs text-[#6B7C88] mt-0.5">Shimla or Kasauli luxury resort stay once surgeon grants fit-to-travel clearance.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-[#0B8F83] font-bold mt-0.5">✓</span>
                <div>
                  <h4 className="font-bold text-[#0C2338]">5-Star Luxury Hotel Accommodation</h4>
                  <p className="text-xs text-[#6B7C88] mt-0.5">Hyatt, Taj or Marriott partner property for you & companion</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-[#0B8F83] font-bold mt-0.5">✓</span>
                <div>
                  <h4 className="font-bold text-[#0C2338]">Dedicated Chauffeur & Luxury Vehicle On-Call</h4>
                  <p className="text-xs text-[#6B7C88] mt-0.5">Exclusive private SUV on call throughout your entire stay</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-[#0B8F83] font-bold mt-0.5">✓</span>
                <div>
                  <h4 className="font-bold text-[#0C2338]">VIP Fast-Track Airport Meet & Greet</h4>
                  <p className="text-xs text-[#6B7C88] mt-0.5">Immigration escort and lounge access upon landing</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-[#DCE6EB]">
              <button 
                onClick={() => openIntake("Premium Plan")}
                className="w-full py-4 bg-[#F0A126] hover:bg-[#db8e18] text-[#0C2338] font-heading font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#F0A126]/20 cursor-pointer"
              >
                Get Written Quote for Premium
              </button>
              <p className="text-center text-[11px] text-[#6B7C88] mt-3">All quotes sent in your local currency (USD, GBP, AUD, CAD)</p>
            </div>
          </div>
        </div>

        {/* Global Cost Comparison Table - Re-architected to match reference layout */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-[#DCE6EB]">
          <div className="mb-8">
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0C2338] mb-2">
              All-Inclusive Cost Comparison
            </h3>
            <p className="text-sm text-[#6B7C88]">
              Direct comparison between an all-in medical travel journey to India vs private out-of-pocket costs in the UK and Dubai.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#DCE6EB]">
            <table className="w-full text-left border-collapse min-w-[720px]">
              <thead>
                <tr className="bg-[#EEF5F7] border-b border-[#DCE6EB]">
                  <th className="py-4 px-6 text-left font-heading italic font-semibold text-[#4A626A] text-sm w-[40%]">
                    Treatment
                  </th>
                  <th className="py-4 px-4 text-center font-heading italic font-semibold text-[#4A626A] text-sm w-[20%]">
                    UK Price
                  </th>
                  <th className="py-4 px-4 text-center font-heading italic font-semibold text-[#4A626A] text-sm w-[20%]">
                    Dubai Price
                  </th>
                  <th className="p-0 text-center w-[20%] align-bottom">
                    <div className="bg-[#07363E] text-white py-3.5 px-3 rounded-t-xl font-heading font-bold italic text-center text-xs sm:text-sm tracking-wide">
                      India (yourMedicareTrip Price)
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5ECEF]">
                {costComparisonData.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <tr
                      key={index}
                      className="hover:bg-slate-50/70 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <IconComponent />
                          <span className="font-heading font-bold text-sm sm:text-[15px] text-[#0C2338]">
                            {item.treatment}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center font-heading font-semibold text-sm sm:text-base text-[#0C2338] tabular-nums">
                        {item.ukPrice}
                      </td>
                      <td className="py-4 px-4 text-center font-heading font-semibold text-sm sm:text-base text-[#0C2338] tabular-nums">
                        {item.dubaiPrice}
                      </td>
                      <td className="py-4 px-4 text-center bg-[#EEF5F7] font-heading font-extrabold text-base sm:text-lg text-[#0B5D68] tabular-nums">
                        {item.indiaPrice}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footnotes & Centered Consultation CTA */}
          <div className="mt-6 pt-2">
            <ul className="text-xs text-[#6B7C88] space-y-1.5 list-disc list-inside font-normal">
              <li>All prices are in USD.</li>
              <li>UK and Dubai prices are indicative.</li>
              <li>yourMedicareTrip prices represent base rates; final cost may vary depending on the treatment plan.</li>
            </ul>

            <div className="mt-8 flex justify-center">
              <button
                onClick={() => openIntake("Cost Comparison Consultation")}
                className="px-8 py-3.5 rounded-full bg-[#07363E] hover:bg-[#0B434D] text-white font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                Book a Free Consultation
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
