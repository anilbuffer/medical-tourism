"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { PortalUser } from "@/types/portal";
import { usePortal } from "@/lib/portal/store";
import {
  Users,
  ChevronDown,
  ShieldCheck,
  Check,
  UserCheck,
  Stethoscope,
  DollarSign,
  Key,
  Lock,
} from "lucide-react";

export const getPortalPathForRole = (role: string) => {
  switch (role) {
    case "patient":
      return "/patient";
    case "customer_support":
      return "/customer";
    case "hospital_doctor":
      return "/hospital";
    case "finance_accounts":
      return "/finance";
    case "super_admin":
      return "/superadmin";
    default:
      return "/patient";
  }
};

export const PersonaSwitcher: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { currentUser, availableUsers, loginAs, activeCase, setActiveCaseId } = usePortal();
  const [isOpen, setIsOpen] = useState(false);

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "patient":
        return <Users className="w-3.5 h-3.5 text-[#2ECDC5]" />;
      case "hospital_doctor":
        return <Stethoscope className="w-3.5 h-3.5 text-[#3F4EB4]" />;
      case "customer_support":
        return <UserCheck className="w-3.5 h-3.5 text-[#283593]" />;
      case "finance_accounts":
        return <DollarSign className="w-3.5 h-3.5 text-[#2ECDC5]" />;
      case "super_admin":
        return <Key className="w-3.5 h-3.5 text-[#3F4EB4]" />;
      default:
        return <Lock className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "patient":
        return "Patient Portal";
      case "hospital_doctor":
        return "Chief Surgeon";
      case "customer_support":
        return "Care Coordinator";
      case "finance_accounts":
        return "Finance & Escrow";
      case "super_admin":
        return "Super Admin";
      default:
        return "Portal User";
    }
  };

  const handleSelectPersona = (user: PortalUser) => {
    loginAs(user);
    if (user.role === "patient" && user.patientId) {
      setActiveCaseId(user.patientId);
    }
    setIsOpen(false);
    const targetPath = getPortalPathForRole(user.role);
    if (pathname !== targetPath) {
      router.push(targetPath);
    }
  };

  // Dynamic patient name binding if role is patient
  const displayName =
    currentUser?.role === "patient"
      ? activeCase?.patientName || currentUser?.name || "Tariq Al-Mansoor"
      : currentUser?.name || "Select Persona";

  const displayAvatar =
    currentUser?.avatar ||
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80";

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold shadow-xs transition-all cursor-pointer"
        title="Switch Demonstration Persona & Test RBAC Row-Level Security"
      >
        <div className="w-6 h-6 rounded-full overflow-hidden ring-1 ring-[#2ECDC5]/60 shrink-0">
          <img
            src={displayAvatar}
            alt={displayName}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-left hidden sm:block">
          <div className="text-[10px] text-[#3F4EB4] uppercase font-black tracking-wider leading-none">
            {getRoleLabel(currentUser?.role || "patient")}
          </div>
          <div className="text-xs font-extrabold text-slate-900 leading-tight">
            {displayName}
          </div>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 ml-1 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <>
          {/* Click-outside backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* 100% Solid Opaque Dropdown Card */}
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.22)] border border-slate-200 p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150 text-slate-900">
            <div className="px-3 py-2.5 mb-1.5 text-[11px] uppercase tracking-wider font-extrabold text-slate-500 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
              <span>Switch RBAC Persona</span>
              <span className="text-[10px] font-bold text-[#3F4EB4] bg-[#3F4EB4]/10 px-2 py-0.5 rounded-md">
                Demo Mode
              </span>
            </div>

            <div className="space-y-1.5 max-h-[70vh] overflow-y-auto">
              {availableUsers.map((user) => {
                const isSelected = currentUser?.id === user.id;

                return (
                  <button
                    key={user.id}
                    onClick={() => handleSelectPersona(user)}
                    className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer border ${isSelected
                      ? " bg-gradient-to-r from-[#1d8983] via-[#1baba4] to-[#1d8983] text-white font-bold shadow-md border-transparent"
                      : "bg-slate-50/70 hover:bg-slate-100 text-slate-800 hover:text-slate-900 border-slate-100 hover:border-slate-200"
                      }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-slate-200 shrink-0">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className={`text-xs font-black leading-tight ${isSelected ? "text-white" : "text-slate-900"}`}>
                          {user.name}
                        </div>
                        <div
                          className={`text-[10px] flex items-center gap-1 font-bold ${isSelected ? "text-cyan-100" : "text-[#3F4EB4]"
                            }`}
                        >
                          {getRoleIcon(user.role)}
                          <span>{getRoleLabel(user.role)}</span>
                        </div>
                      </div>
                    </div>

                    {isSelected && <Check className="w-4 h-4 text-white shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
