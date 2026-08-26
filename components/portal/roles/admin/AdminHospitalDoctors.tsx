"use client";

import React, { useState, useMemo } from "react";
import { PatientCase, PortalUser, AdminTab } from "@/types/portal";
import { MOCK_PORTAL_USERS, MOCK_ACCREDITATION_PROFILES } from "@/lib/portal/mockData";
import {
  Building2,
  Stethoscope,
  BadgeCheck,
  CheckCircle2,
  AlertTriangle,
  Search,
  Plus,
  Shield,
  Video,
  X,
  ExternalLink,
  Phone,
  Mail,
  Award,
  ShieldCheck,
  Layers,
  Key,
  RotateCcw,
  FileText,
  UserPlus,
  MoreVertical,
  Activity,
} from "lucide-react";

interface AdminHospitalDoctorsProps {
  cases: PatientCase[];
  onNavigateTab?: (tab: AdminTab) => void;
}

export const AdminHospitalDoctors: React.FC<AdminHospitalDoctorsProps> = ({
  cases,
  onNavigateTab,
}) => {
  const [hospitals, setHospitals] = useState(MOCK_ACCREDITATION_PROFILES);
  const [users, setUsers] = useState<PortalUser[]>(MOCK_PORTAL_USERS);
  const [activeTab, setActiveTab] = useState<"doctors" | "hospitals">("doctors");
  const [searchQuery, setSearchQuery] = useState("");
  const [hospitalFilter, setHospitalFilter] = useState<string>("all");
  const [isAddDoctorModalOpen, setIsAddDoctorModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<PortalUser | null>(null);
  const [actionNotif, setActionNotif] = useState<string | null>(null);

  // Form State
  const [newDoctorName, setNewDoctorName] = useState("");
  const [newDoctorEmail, setNewDoctorEmail] = useState("");
  const [newDoctorHospital, setNewDoctorHospital] = useState("hosp_medanta");
  const [newDoctorSpecialty, setNewDoctorSpecialty] = useState("Cardiac Surgery");

  const showNotification = (msg: string) => {
    setActionNotif(msg);
    setTimeout(() => {
      setActionNotif(null);
    }, 4000);
  };

  const doctorUsers = useMemo(() => {
    return users.filter((u) => u.role === "hospital_doctor");
  }, [users]);

  const filteredDoctors = useMemo(() => {
    return doctorUsers.filter((doc) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        doc.name.toLowerCase().includes(q) ||
        doc.email.toLowerCase().includes(q) ||
        (doc.hospitalId && doc.hospitalId.toLowerCase().includes(q));

      const matchesHosp = hospitalFilter === "all" || doc.hospitalId === hospitalFilter;
      return matchesSearch && matchesHosp;
    });
  }, [doctorUsers, searchQuery, hospitalFilter]);

  const getDoctorCaseCount = (docId?: string) => {
    if (!docId) return 0;
    return cases.filter((c) => c.assignedDoctorId === docId || c.referredDoctorId === docId).length;
  };

  const handleAddDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDoctorName || !newDoctorEmail) return;

    const newDoc: PortalUser = {
      id: `user_doc_${Date.now()}`,
      name: newDoctorName,
      email: newDoctorEmail,
      role: "hospital_doctor",
      hospitalId: newDoctorHospital,
      doctorId: `doc_${Date.now()}`,
      country: "India",
      mfaEnforced: true,
      isActive: true,
      avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80",
    };

    setUsers((prev) => [...prev, newDoc]);
    setIsAddDoctorModalOpen(false);
    setNewDoctorName("");
    setNewDoctorEmail("");
    showNotification(`Clinical specialist account created for ${newDoctorName} (MFA Enforced).`);
  };

  const getHospitalName = (hospId?: string) => {
    const h = hospitals.find((item) => item.hospitalId === hospId);
    return h ? h.hospitalName : "Medanta The Medicity";
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-sans pb-12">
      {/* Toast Notification */}
      {actionNotif && (
        <div className="fixed top-24 right-6 z-50 bg-white text-slate-900 px-4 py-3 rounded-2xl shadow-xl border border-slate-200 flex items-center gap-3 animate-in slide-in-from-top-4 duration-200">
          <div className="w-6 h-6 rounded-full bg-teal-50 text-[#1baba4] flex items-center justify-center shrink-0 border border-teal-200">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold text-slate-800">{actionNotif}</span>
          <button
            onClick={() => setActionNotif(null)}
            className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* TOP HEADER & TITLE BAR */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Hospital Accounts & Specialist Directory
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-[#1baba4] text-[11px] font-bold border border-teal-200/80 flex items-center gap-1">
              <BadgeCheck className="w-3 h-3" />
              JCI & NABH Verified
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Manage partner hospital institutional accounts, chief surgical specialist credentials, and clinical access scopes.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onNavigateTab && onNavigateTab("accreditation_registry")}
            className="px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200/80 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Award className="w-3.5 h-3.5 text-[#1baba4]" />
            <span>Accreditations</span>
          </button>
          <button
            onClick={() => {
              showNotification("Reset hospital accounts to platform defaults.");
            }}
            className="px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-900 border border-slate-200/80 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs text-xs font-medium"
            title="Reset Defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>
      </div>

      {/* TOP 4 KPI METRIC CARDS RIBBON */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#1baba4] flex items-center justify-center shrink-0 border border-teal-100">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 leading-none">{hospitals.length}</div>
            <div className="text-[11px] font-semibold text-slate-500 mt-1">Accredited Partner Hubs</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 leading-none">{doctorUsers.length}</div>
            <div className="text-[11px] font-semibold text-slate-500 mt-1">Authorized Specialists</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#3F4EB4] flex items-center justify-center shrink-0 border border-blue-100">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 leading-none">100%</div>
            <div className="text-[11px] font-semibold text-slate-500 mt-1">JCI / NABH Validated</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 leading-none">18</div>
            <div className="text-[11px] font-semibold text-slate-500 mt-1">Active Tele-Consult Desks</div>
          </div>
        </div>
      </div>

      {/* SUB-NAVIGATION PILL TABS */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab("doctors")}
          className={`px-4 py-2 rounded-2xl font-bold text-xs border flex items-center gap-2 shadow-xs transition-all cursor-pointer ${
            activeTab === "doctors"
              ? "bg-teal-50 text-[#1baba4] border-teal-200/80"
              : "bg-white hover:bg-slate-50 text-slate-600 border-slate-200/80"
          }`}
        >
          <Stethoscope className="w-4 h-4" />
          <span>Specialist Doctors</span>
          <span className="px-2 py-0.5 rounded-full bg-[#1baba4] text-white text-[10px] font-bold">
            {filteredDoctors.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("hospitals")}
          className={`px-4 py-2 rounded-2xl font-bold text-xs border flex items-center gap-2 shadow-xs transition-all cursor-pointer ${
            activeTab === "hospitals"
              ? "bg-teal-50 text-[#1baba4] border-teal-200/80"
              : "bg-white hover:bg-slate-50 text-slate-600 border-slate-200/80"
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Partner Hospital Desks</span>
          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
            {hospitals.length}
          </span>
        </button>
      </div>

      {/* FILTER TOOLBAR & ACTION */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by doctor name, specialty, or hospital..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl pl-9 pr-4 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-[#1baba4] focus:outline-none placeholder-slate-400 font-medium"
          />
        </div>

        <select
          value={hospitalFilter}
          onChange={(e) => setHospitalFilter(e.target.value)}
          className="bg-slate-50 border border-slate-200/80 rounded-2xl px-4 py-2.5 text-xs text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-[#1baba4] cursor-pointer shrink-0"
        >
          <option value="all">All Hospitals ({hospitals.length})</option>
          {hospitals.map((h) => (
            <option key={h.hospitalId} value={h.hospitalId}>
              {h.hospitalName}
            </option>
          ))}
        </select>

        <button
          onClick={() => setIsAddDoctorModalOpen(true)}
          className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] hover:opacity-95 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all shrink-0 hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>Authorize Specialist</span>
        </button>
      </div>

      {/* DOCTORS DIRECTORY TABLE VIEW */}
      {activeTab === "doctors" && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px] font-black tracking-wider bg-slate-50/50">
                  <th className="py-3.5 pl-6">SPECIALIST NAME</th>
                  <th className="py-3.5 px-4">AFFILIATED HOSPITAL</th>
                  <th className="py-3.5 px-4">SCOPE STATUS</th>
                  <th className="py-3.5 px-4">ASSIGNED CASES</th>
                  <th className="py-3.5 px-4">MFA ENFORCED</th>
                  <th className="py-3.5 pr-6 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredDoctors.map((doc) => {
                  const caseCount = getDoctorCaseCount(doc.doctorId);
                  const hospitalName = getHospitalName(doc.hospitalId);

                  return (
                    <tr
                      key={doc.id}
                      className="hover:bg-slate-50/70 transition-colors group cursor-pointer"
                      onClick={() => setSelectedDoctor(doc)}
                    >
                      <td className="py-3.5 pl-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-purple-50 text-purple-700 font-bold text-xs flex items-center justify-center shrink-0 border border-purple-200">
                            Dr
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                              <span>{doc.name}</span>
                              <BadgeCheck className="w-3.5 h-3.5 text-[#1baba4]" />
                            </div>
                            <div className="text-[11px] text-slate-400 font-normal">{doc.email}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 text-slate-800 font-semibold text-xs">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          <span>{hospitalName}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-purple-50 text-purple-800 border border-purple-200">
                          Clinical Lead Tier
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded text-xs">
                          {caseCount} Active Dossiers
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                          <ShieldCheck className="w-3 h-3" /> Enforced
                        </span>
                      </td>

                      <td className="py-3.5 pr-6 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDoctor(doc);
                          }}
                          className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] cursor-pointer transition-colors"
                        >
                          Manage Scope
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* HOSPITAL DESKS CARDS GRID VIEW */}
      {activeTab === "hospitals" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hospitals.map((h) => (
            <div
              key={h.hospitalId}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-teal-50 text-[#1baba4] font-bold text-sm flex items-center justify-center border border-teal-100">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{h.hospitalName}</h3>
                    <div className="text-xs text-slate-400">{h.city}, {h.country}</div>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                  {h.jciStatus === "active" ? "JCI" : (h.nabhStatus === "active" ? "NABH" : "JCI/NABH")} Verified
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2 border-t border-slate-100">
                <div className="p-2 bg-slate-50 rounded-xl border border-slate-200/60">
                  <span className="text-[10px] text-slate-400 font-medium block">Specialists</span>
                  <span className="font-extrabold text-slate-900 text-xs">
                    {doctorUsers.filter((d) => d.hospitalId === h.hospitalId).length || 3}
                  </span>
                </div>
                <div className="p-2 bg-slate-50 rounded-xl border border-slate-200/60">
                  <span className="text-[10px] text-slate-400 font-medium block">Compliance</span>
                  <span className="font-extrabold text-emerald-700 text-xs">100% Valid</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-xl border border-slate-200/60">
                  <span className="text-[10px] text-slate-400 font-medium block">Desk SLA</span>
                  <span className="font-extrabold text-[#3F4EB4] text-xs">&lt; 4.2 hrs</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* AUTHORIZE DOCTOR MODAL */}
      {isAddDoctorModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Authorize Clinical Specialist</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Issue medical report review credentials and tele-consult desk permissions.
                </p>
              </div>
              <button
                onClick={() => setIsAddDoctorModalOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddDoctor} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Doctor Name & Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Ashok Seth, MD, DM"
                  value={newDoctorName}
                  onChange={(e) => setNewDoctorName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-[#1baba4] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Institutional Email</label>
                <input
                  type="email"
                  required
                  placeholder="dr.seth@fortishealthcare.com"
                  value={newDoctorEmail}
                  onChange={(e) => setNewDoctorEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-[#1baba4] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Affiliated Hospital</label>
                  <select
                    value={newDoctorHospital}
                    onChange={(e) => setNewDoctorHospital(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-[#1baba4]"
                  >
                    {hospitals.map((h) => (
                      <option key={h.hospitalId} value={h.hospitalId}>
                        {h.hospitalName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Clinical Specialty</label>
                  <select
                    value={newDoctorSpecialty}
                    onChange={(e) => setNewDoctorSpecialty(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-[#1baba4]"
                  >
                    <option value="Cardiac Surgery">Interventional Cardiology</option>
                    <option value="Oncology">Medical & Surgical Oncology</option>
                    <option value="Orthopedics">Orthopedics & Joint Replacement</option>
                    <option value="Neurosurgery">Neurosurgery & Spine</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddDoctorModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] hover:opacity-95 text-white font-bold text-xs cursor-pointer shadow-sm transition-all"
                >
                  Authorize Specialist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
