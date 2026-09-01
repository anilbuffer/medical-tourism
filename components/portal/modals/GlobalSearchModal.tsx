"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Search,
  X,
  ClipboardList,
  User,
  Stethoscope,
  Building2,
  FileText,
  CreditCard,
  Plane,
  Video,
  ShieldCheck,
  Compass,
  ArrowRight,
  Clock,
  Sparkles,
  ChevronRight,
  Calendar,
  Layers,
} from "lucide-react";
import { usePortal } from "@/lib/portal/store";
import { UserRole } from "@/types/portal";

export interface SearchResultItem {
  id: string;
  category: "request" | "case" | "doctor" | "hospital" | "document" | "navigation";
  title: string;
  subtitle: string;
  tag?: string;
  tagColor?: string;
  badge?: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  action: () => void;
}

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeRole?: UserRole;
  onSelectTab: (tabId: string) => void;
  onSelectCase?: (caseId: string, tabId?: string) => void;
}

// Preset Medical Requests & Service Inquiries Database
const MOCK_REQUESTS = [
  {
    requestNo: "#REQ-8941",
    title: "Visa Extension Request & Embassy Medical Verification Letter",
    patientName: "Tariq Al-Mansoor",
    caseId: "PT-2026-089412",
    priority: "Urgent",
    status: "In Progress",
    destinationTab: "visa_checklist",
  },
  {
    requestNo: "#REQ-8942",
    title: "DICOM Liver MRI Volumetric Analysis & Second Opinion Review",
    patientName: "Tariq Al-Mansoor",
    caseId: "PT-2026-089412",
    priority: "High",
    status: "Completed",
    destinationTab: "docs_vault",
  },
  {
    requestNo: "#REQ-8943",
    title: "Terminal 3 Gate 5 VIP Airport Transfer & Wheelchair Escort",
    patientName: "Tariq Al-Mansoor",
    caseId: "PT-2026-089412",
    priority: "Medium",
    status: "Scheduled",
    destinationTab: "flight_hotel",
  },
  {
    requestNo: "#REQ-8944",
    title: "Milestone 2 Escrow Release - Surgical Admission Deposit ($15,000)",
    patientName: "Tariq Al-Mansoor",
    caseId: "PT-2026-089412",
    priority: "High",
    status: "Pending Escrow",
    destinationTab: "payment_escrow",
  },
  {
    requestNo: "#REQ-8945",
    title: "Pre-Operative Fasting Guidelines & Cardiac Anesthesia Clearance",
    patientName: "Eleanor Vance",
    caseId: "PT-2026-004819",
    priority: "Urgent",
    status: "Open",
    destinationTab: "doctor_opinions",
  },
  {
    requestNo: "#REQ-8946",
    title: "Arabic Medical Interpreter Assignment for Video Consultation",
    patientName: "Tariq Al-Mansoor",
    caseId: "PT-2026-089412",
    priority: "Normal",
    status: "Assigned",
    destinationTab: "upcoming_video",
  },
  {
    requestNo: "#REQ-8947",
    title: "Fortis Cardiology Angiogram Review & CABG Surgical Candidacy",
    patientName: "Eleanor Vance",
    caseId: "PT-2026-004819",
    priority: "Urgent",
    status: "Under Review",
    destinationTab: "triage_queues",
  },
  {
    requestNo: "#REQ-8948",
    title: "Flight EK-512 Re-scheduling and Hotel Booking Sync (Dubai to Chandigarh)",
    patientName: "Elena Rostova",
    caseId: "PT-2026-009104",
    priority: "Normal",
    status: "Open",
    destinationTab: "flight_hotel",
  },
  {
    requestNo: "#REQ-8949",
    title: "Digital Consent Signature Verification Token (LDLT Protocol)",
    patientName: "Carlos Mendoza",
    caseId: "PT-2026-007214",
    priority: "High",
    status: "Completed",
    destinationTab: "legal_consents",
  },
  {
    requestNo: "#REQ-8950",
    title: "Post-Op Wound Healing Check & Structured Recovery Form #3",
    patientName: "Robert Vance",
    caseId: "PT-2026-007214",
    priority: "Medium",
    status: "Submitted",
    destinationTab: "recovery_forms",
  },
];

// Preset Doctors
const MOCK_DOCTORS = [
  {
    id: "doc_gupta",
    name: "Dr. Subhash Gupta",
    role: "Chief Liver Transplant Surgeon",
    hospital: "Medanta – The Medicity",
    department: "Organ Transplant & Hepato-Pancreato-Biliary",
  },
  {
    id: "doc_trehan",
    name: "Dr. Naresh Trehan",
    role: "Chairman & Chief Cardio-Thoracic Surgeon",
    hospital: "Medanta – The Medicity",
    department: "Heart Institute",
  },
  {
    id: "doc_seth",
    name: "Dr. Ashok Seth",
    role: "Chairman of Interventional Cardiology",
    hospital: "Fortis Memorial Research Institute",
    department: "Cardiology",
  },
  {
    id: "doc_vaishya",
    name: "Dr. Sandeep Vaishya",
    role: "Executive Director of Neurosurgery",
    hospital: "Fortis Memorial Research Institute",
    department: "Neuroscience Institute",
  },
  {
    id: "doc_prathap",
    name: "Dr. Prathap C. Reddy",
    role: "Founder & Chairman",
    hospital: "Apollo Hospital",
    department: "Oncology & Multi-Speciality",
  },
];

// Preset Hospitals
const MOCK_HOSPITALS = [
  {
    id: "hosp_medanta",
    name: "Medanta – The Medicity",
    location: "Sector 38, Gurugram, India",
    accreditation: "JCI & NABH Accredited",
  },
  {
    id: "hosp_fortis",
    name: "Fortis Memorial Research Institute (FMRI)",
    location: "Sector 44, Gurugram, India",
    accreditation: "JCI & NABH Accredited",
  },
  {
    id: "hosp_artemis",
    name: "Artemis Hospital",
    location: "Sector 51, Gurugram, India",
    accreditation: "JCI & NABH Accredited",
  },
  {
    id: "hosp_max",
    name: "Max Super Speciality Hospital",
    location: "Saket, New Delhi, India",
    accreditation: "NABH & NABL Accredited",
  },
  {
    id: "hosp_apollo",
    name: "Apollo Hospital",
    location: "Sarita Vihar, New Delhi, India",
    accreditation: "JCI Accredited",
  },
];

// Portal Navigation Pages
const PORTAL_PAGES = [
  { id: "overview", label: "Active Journey Overview", group: "Dashboard", icon: Compass, tab: "overview" },
  { id: "docs_vault", label: "Document Vault & DICOM Scans", group: "My Medical Record", icon: FileText, tab: "docs_vault" },
  { id: "prescriptions_history", label: "Prescriptions & Health History", group: "My Medical Record", icon: FileText, tab: "prescriptions_history" },
  { id: "upcoming_video", label: "Upcoming Video Calls & Tele-Consult", group: "Consultations", icon: Video, tab: "upcoming_video" },
  { id: "doctor_opinions", label: "Doctor Opinions & Written Plans", group: "Consultations", icon: Stethoscope, tab: "doctor_opinions" },
  { id: "package_quote", label: "Package Details & Quotation", group: "Quote & Payments", icon: CreditCard, tab: "package_quote" },
  { id: "payment_escrow", label: "Payment History & Escrow Releases", group: "Quote & Payments", icon: CreditCard, tab: "payment_escrow" },
  { id: "visa_checklist", label: "Visa Checklist & Embassy Letters", group: "Travel & Logistics", icon: Plane, tab: "visa_checklist" },
  { id: "flight_hotel", label: "Flight & Accommodation Details", group: "Travel & Logistics", icon: Plane, tab: "flight_hotel" },
  { id: "concierge_contact", label: "On-Ground Concierge Contact", group: "Travel & Logistics", icon: Building2, tab: "concierge_contact" },
  { id: "discharge_summary", label: "Post-Op Discharge Summary", group: "Recovery & Follow Up", icon: FileText, tab: "discharge_summary" },
  { id: "legal_consents", label: "Forms & Signed Agreements", group: "Forms & Consents", icon: ShieldCheck, tab: "legal_consents" },
  { id: "messages", label: "Patient Messages Desk", group: "Communications", icon: Compass, tab: "messages" },
  { id: "settings", label: "Profile Settings & Account Configuration", group: "Account", icon: Compass, tab: "settings" },
  // Coordinator / Role specific
  { id: "triage_queues", label: "Care Control Center & Triage Queues", group: "Coordinator", icon: Compass, tab: "triage_queues" },
  { id: "kanban_pipeline", label: "Kanban Patient Journey Pipeline", group: "Coordinator", icon: Layers, tab: "kanban_pipeline" },
  { id: "patient_directory", label: "Master Patient Directory", group: "Coordinator", icon: User, tab: "patient_directory" },
  { id: "hospital_handovers", label: "Hospital Handovers & Referrals", group: "Coordinator", icon: Building2, tab: "hospital_handovers" },
];

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  activeRole = "patient",
  onSelectTab,
  onSelectCase,
}) => {
  const { visibleCases, activeCase, setActiveCaseId } = usePortal();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setSearchQuery("");
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Generate indexed search results based on searchQuery
  const searchResults = useMemo<SearchResultItem[]>(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];

    const results: SearchResultItem[] = [];

    // 1. Search Requests & Service Inquiries
    MOCK_REQUESTS.forEach((t) => {
      if (
        t.requestNo.toLowerCase().includes(q) ||
        t.title.toLowerCase().includes(q) ||
        t.patientName.toLowerCase().includes(q) ||
        t.caseId.toLowerCase().includes(q) ||
        t.status.toLowerCase().includes(q)
      ) {
        results.push({
          id: `request-${t.requestNo}`,
          category: "request",
          title: `${t.requestNo}: ${t.title}`,
          subtitle: `Patient: ${t.patientName} (${t.caseId}) • ${t.priority} Priority`,
          badge: t.status,
          tag: "Request",
          tagColor: "bg-blue-50 text-blue-700 border-blue-200",
          icon: ClipboardList,
          iconBg: "bg-blue-50",
          iconColor: "text-blue-600",
          action: () => {
            if (onSelectCase && t.caseId) {
              onSelectCase(t.caseId, t.destinationTab);
            } else {
              onSelectTab(t.destinationTab);
            }
            onClose();
          },
        });
      }
    });

    // 2. Search Cases / Patients
    visibleCases.forEach((c) => {
      if (
        c.id.toLowerCase().includes(q) ||
        c.patientName.toLowerCase().includes(q) ||
        c.patientCountry.toLowerCase().includes(q) ||
        c.treatmentCategory.toLowerCase().includes(q) ||
        c.stage.toLowerCase().includes(q)
      ) {
        results.push({
          id: `case-${c.id}`,
          category: "case",
          title: `${c.patientName} (${c.id})`,
          subtitle: `${c.treatmentCategory} • ${c.patientCountry} • Stage: ${c.stage.toUpperCase()}`,
          badge: c.stage.replace(/_/g, " "),
          tag: "Case",
          tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
          icon: User,
          iconBg: "bg-emerald-50",
          iconColor: "text-emerald-600",
          action: () => {
            if (onSelectCase) {
              onSelectCase(c.id, "overview");
            } else {
              setActiveCaseId(c.id);
              onSelectTab("overview");
            }
            onClose();
          },
        });
      }
    });

    // 3. Search Medical Documents from active & visible cases
    const seenDocs = new Set<string>();
    visibleCases.forEach((c) => {
      c.documents.forEach((doc) => {
        const latestVer = doc.versions && doc.versions.length > 0 ? doc.versions[doc.versions.length - 1] : null;
        const fileName = latestVer?.fileName || `${doc.title}.pdf`;
        const fileSize = latestVer?.fileSize || "1.2 MB";
        const key = `${doc.title}-${fileName}`;
        if (seenDocs.has(key)) return;
        seenDocs.add(key);

        if (
          doc.title.toLowerCase().includes(q) ||
          fileName.toLowerCase().includes(q) ||
          doc.category.toLowerCase().includes(q)
        ) {
          results.push({
            id: `doc-${doc.id}`,
            category: "document",
            title: doc.title,
            subtitle: `${fileName} (${fileSize}) • Case: ${c.patientName}`,
            badge: doc.category.replace(/_/g, " "),
            tag: "Document",
            tagColor: "bg-purple-50 text-purple-700 border-purple-200",
            icon: FileText,
            iconBg: "bg-purple-50",
            iconColor: "text-purple-600",
            action: () => {
              if (onSelectCase) {
                onSelectCase(c.id, "docs_vault");
              } else {
                onSelectTab("docs_vault");
              }
              onClose();
            },
          });
        }
      });
    });

    // 4. Search Doctors & Surgeons
    MOCK_DOCTORS.forEach((d) => {
      if (
        d.name.toLowerCase().includes(q) ||
        d.role.toLowerCase().includes(q) ||
        d.hospital.toLowerCase().includes(q) ||
        d.department.toLowerCase().includes(q)
      ) {
        results.push({
          id: `doctor-${d.id}`,
          category: "doctor",
          title: d.name,
          subtitle: `${d.role} • ${d.hospital}`,
          badge: d.department,
          tag: "Doctor",
          tagColor: "bg-teal-50 text-teal-700 border-teal-200",
          icon: Stethoscope,
          iconBg: "bg-teal-50",
          iconColor: "text-teal-600",
          action: () => {
            onSelectTab("doctor_opinions");
            onClose();
          },
        });
      }
    });

    // 5. Search Hospitals
    MOCK_HOSPITALS.forEach((h) => {
      if (
        h.name.toLowerCase().includes(q) ||
        h.location.toLowerCase().includes(q) ||
        h.accreditation.toLowerCase().includes(q)
      ) {
        results.push({
          id: `hospital-${h.id}`,
          category: "hospital",
          title: h.name,
          subtitle: `${h.location} • ${h.accreditation}`,
          badge: "Accredited",
          tag: "Hospital",
          tagColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
          icon: Building2,
          iconBg: "bg-indigo-50",
          iconColor: "text-indigo-600",
          action: () => {
            onSelectTab("hospital_handovers");
            onClose();
          },
        });
      }
    });

    // 6. Search Navigation & Portal Tabs
    PORTAL_PAGES.forEach((p) => {
      if (
        p.label.toLowerCase().includes(q) ||
        p.group.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q)
      ) {
        results.push({
          id: `nav-${p.id}`,
          category: "navigation",
          title: p.label,
          subtitle: `Portal Section: ${p.group}`,
          badge: "Go to Page",
          tag: "Page",
          tagColor: "bg-amber-50 text-amber-700 border-amber-200",
          icon: p.icon,
          iconBg: "bg-amber-50",
          iconColor: "text-amber-600",
          action: () => {
            onSelectTab(p.tab);
            onClose();
          },
        });
      }
    });

    return results;
  }, [searchQuery, visibleCases, onSelectTab, onSelectCase, setActiveCaseId, onClose]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchResults.length]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (searchResults.length > 0 && searchResults[selectedIndex]) {
        searchResults[selectedIndex].action();
      }
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (resultsContainerRef.current) {
      const activeEl = resultsContainerRef.current.querySelector(
        `[data-result-index="${selectedIndex}"]`
      );
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-start justify-center pt-12 sm:pt-20 px-3 sm:px-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Modal Dialog Container */}
      <div
        className="bg-white rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.22)] border border-slate-200 w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar (Matching Reference Design) */}
        <div className="flex items-center px-4 py-3 sm:py-3.5 gap-3 relative">
          <Search className="w-5 h-5 text-slate-400 shrink-0 ml-1" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search medical cases, requests, or doctors..."
            className="w-full bg-transparent py-1 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none font-normal tracking-tight"
          />

          <div className="flex items-center gap-2 shrink-0">
            {/* Shortcut Badge */}
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[11px] font-mono font-medium text-slate-400 bg-slate-100 border border-slate-200 rounded-md shadow-2xs">
              ⌘K
            </kbd>

            {/* Close Icon Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              title="Close (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Divider Line */}
        <div className="border-b border-slate-100 w-full" />

        {/* Modal Body: Results or Empty Prompt */}
        <div ref={resultsContainerRef} className="flex-1 overflow-y-auto min-h-[220px] max-h-[55vh]">
          {searchQuery.trim() === "" ? (
            /* Reference Empty State Prompt */
            <div className="py-14 sm:py-16 px-6 text-center select-none">
              <p className="text-slate-400 text-sm font-normal">
                Start typing to search medical cases, doctors, records, and service requests across your portal.
              </p>

              {/* Quick Suggestion Chips */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5 max-w-lg mx-auto">
                <span className="text-[11px] font-medium text-slate-400 mr-1">Try searching:</span>
                {[
                  "#REQ-8941",
                  "Tariq Al-Mansoor",
                  "PT-2026-089412",
                  "Liver Transplant",
                  "Dr. Gupta",
                  "Visa Letter",
                  "Escrow Milestone",
                  "Document Vault",
                ].map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setSearchQuery(chip)}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-600 hover:text-slate-900 border border-slate-200/80 transition-colors cursor-pointer"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            /* No Results State */
            <div className="py-14 sm:py-16 px-6 text-center">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-700">No results found</h4>
              <p className="text-xs text-slate-400 mt-1">
                No medical cases, requests, doctors, or records matching &ldquo;{searchQuery}&rdquo;
              </p>
            </div>
          ) : (
            /* Live Results List */
            <div className="p-2 space-y-1">
              {searchResults.map((item, index) => {
                const isSelected = index === selectedIndex;
                const IconComponent = item.icon;

                return (
                  <button
                    key={item.id}
                    type="button"
                    data-result-index={index}
                    onClick={item.action}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full text-left p-3 rounded-2xl flex items-center justify-between gap-3 transition-all cursor-pointer border ${isSelected
                        ? "bg-slate-100/90 border-slate-200/90 shadow-2xs"
                        : "bg-transparent hover:bg-slate-50/80 border-transparent"
                      }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Icon */}
                      <div
                        className={`w-9 h-9 rounded-xl ${item.iconBg} ${item.iconColor} flex items-center justify-center shrink-0 border border-slate-200/60`}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>

                      {/* Title and Subtitle */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-semibold text-slate-900 truncate">
                            {item.title}
                          </span>
                          {item.tag && (
                            <span
                              className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md border shrink-0 ${item.tagColor || "bg-slate-100 text-slate-600 border-slate-200"
                                }`}
                            >
                              {item.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Right Action / Badge */}
                    <div className="flex items-center gap-2 shrink-0">
                      {item.badge && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200/70 text-slate-700 capitalize hidden sm:inline-block">
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${isSelected
                            ? "text-[#3F4EB4] translate-x-0.5"
                            : "text-slate-300 opacity-0 group-hover:opacity-100"
                          }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer / Status Bar (Matching Reference Design) */}
        <div className="border-t border-slate-100 bg-slate-50/80 px-4 py-2.5 flex items-center justify-between text-xs text-slate-500 rounded-b-3xl">
          {/* Left Shortcuts */}
          <div className="flex items-center gap-3 sm:gap-4 text-[11px]">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-white border border-slate-200 rounded shadow-2xs text-slate-600">
                ↑
              </kbd>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-white border border-slate-200 rounded shadow-2xs text-slate-600">
                ↓
              </kbd>
              <span className="ml-1 text-slate-500">navigate</span>
            </span>

            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-white border border-slate-200 rounded shadow-2xs text-slate-600">
                Enter
              </kbd>
              <span className="ml-1 text-slate-500">open</span>
            </span>

            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-white border border-slate-200 rounded shadow-2xs text-slate-600">
                Esc
              </kbd>
              <span className="ml-1 text-slate-500">close</span>
            </span>
          </div>

          {/* Right Status */}
          {searchQuery.trim() !== "" && (
            <div className="text-[11px] font-medium text-slate-400 hidden sm:block">
              {searchResults.length} {searchResults.length === 1 ? "result" : "results"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
