"use client";

import React, { useState } from "react";
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

export const PersonaSwitcher: React.FC = () => {
  const { currentUser, availableUsers, loginAs } = usePortal();
  const [isOpen, setIsOpen] = useState(false);

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "patient":
        return <Users className="w-3.5 h-3.5 text-teal-600" />;
      case "hospital_doctor":
        return <Stethoscope className="w-3.5 h-3.5 text-indigo-600" />;
      case "customer_support":
        return <UserCheck className="w-3.5 h-3.5 text-blue-600" />;
      case "finance_accounts":
        return <DollarSign className="w-3.5 h-3.5 text-emerald-600" />;
      case "super_admin":
        return <Key className="w-3.5 h-3.5 text-purple-600" />;
      default:
        return <Lock className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "patient":
        return "Patient Portal";
      case "hospital_doctor":
        return "Hospital / Specialist";
      case "customer_support":
        return "Customer Support (CS)";
      case "finance_accounts":
        return "Finance & Accounts";
      case "super_admin":
        return "Super Admin";
      default:
        return "Portal User";
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200/80 text-slate-900 text-xs font-bold shadow-xs transition-all cursor-pointer"
        title="Switch Demonstration Persona & Test RBAC Row-Level Security"
      >
        <div className="w-6 h-6 rounded-full overflow-hidden ring-1 ring-[#00897B]/40 shrink-0">
          <img
            src={
              currentUser?.avatar ||
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
            }
            alt={currentUser?.name || "User"}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-left hidden sm:block">
          <div className="text-[10px] text-[#00897B] uppercase font-black tracking-wider leading-none">
            {getRoleLabel(currentUser?.role || "patient")}
          </div>
          <div className="text-xs font-extrabold text-slate-900 leading-tight">
            {currentUser?.name || "Select Persona"}
          </div>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white/98 backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150 text-slate-900">
          <div className="p-3 pb-2 text-[10px] uppercase tracking-wider font-extrabold text-slate-400 border-b border-slate-100">
            Switch RBAC Persona
          </div>

          <div className="space-y-1 pt-1">
            {availableUsers.map((user) => {
              const isSelected = currentUser?.id === user.id;

              return (
                <button
                  key={user.id}
                  onClick={() => {
                    loginAs(user);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-2xl flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-[#2ECDC5] via-[#3F4EB4] to-[#283593] text-white font-bold shadow-md"
                      : "hover:bg-slate-100 text-slate-700 hover:text-slate-900"
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
                      <div className="text-xs font-black leading-tight">{user.name}</div>
                      <div
                        className={`text-[10px] flex items-center gap-1 ${
                          isSelected ? "text-cyan-100" : "text-[#00897B]"
                        }`}
                      >
                        {getRoleIcon(user.role)}
                        <span>{getRoleLabel(user.role)}</span>
                      </div>
                    </div>
                  </div>

                  {isSelected && <Check className="w-4 h-4 text-white" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
