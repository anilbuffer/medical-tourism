"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { usePortal } from "@/lib/portal/store";
import { MOCK_PORTAL_USERS } from "@/lib/portal/mockData";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  User,
  UserCheck,
  Stethoscope,
  DollarSign,
  Key,
  Sparkles,
  ArrowLeft,
  Clock,
  Check,
  Building2,
  Activity,
  FileText,
  Globe,
} from "lucide-react";

const LoginPageContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginAs } = usePortal();

  // Available Demo Personas & Portals with dynamically tailored content
  const demoRoles = [
    {
      id: "patient",
      title: "Patient Portal",
      subtitle: "Patient View & Travel",
      portalBadge: "Patient Medical Portal",
      titleLine1: "SEAMLESS GLOBAL",
      titleLine2: "PATIENT CARE JOURNEY.",
      portalDescription:
        "Access your medical records, tele-consultation room, all-inclusive hospital quotes, travel itineraries, and visa clearance documents.",
      icon: User,
      bgImage:
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1400&auto=format&fit=crop&q=80",
      pills: [
        { icon: Clock, label: "45m Review SLA" },
        { icon: ShieldCheck, label: "Encrypted Health Vault" },
        { icon: DollarSign, label: "Escrow Protected Booking" },
      ],
      socialProof: {
        count: "50k+",
        label: "Trusted by 1,200+ International Patients",
        avatars: [
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
        ],
      },
      user:
        MOCK_PORTAL_USERS.find((u) => u.id === "user_patient_robert") ||
        MOCK_PORTAL_USERS[0],
    },
    {
      id: "coordinator",
      title: "Care Coordinator",
      subtitle: "Triage & CS Queue",
      portalBadge: "Coordinator Workspace",
      titleLine1: "INTELLIGENT",
      titleLine2: "CARE COORDINATION.",
      portalDescription:
        "Review patient diagnostic uploads, manage SLA triage queues, coordinate with partner surgical boards, and issue itemized quotations.",
      icon: UserCheck,
      bgImage:
        "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1400&auto=format&fit=crop&q=80",
      pills: [
        { icon: Clock, label: "45m Coordinator SLA" },
        { icon: ShieldCheck, label: "HIPAA, JCI & NABH Protocols" },
        { icon: Building2, label: "Multi-Hospital Triage Queue" },
      ],
      socialProof: {
        count: "48",
        label: "Managing 48 Active International Cases",
        avatars: [
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80",
        ],
      },
      user:
        MOCK_PORTAL_USERS.find((u) => u.role === "customer_support") ||
        MOCK_PORTAL_USERS[3],
    },
    {
      id: "surgeon",
      title: "Chief Surgeon",
      subtitle: "Specialist & Hospital",
      portalBadge: "Doctor & Hospital Portal",
      titleLine1: "SPECIALIST",
      titleLine2: "CLINICAL EVALUATION.",
      portalDescription:
        "Evaluate patient radiological imaging (DICOM / MRI), document surgical candidacy opinions, and host secure HD tele-consultations.",
      icon: Stethoscope,
      bgImage:
        "https://images.unsplash.com/photo-1551076805-e1869033e561?w=1400&auto=format&fit=crop&q=80",
      pills: [
        { icon: Stethoscope, label: "DICOM & Scan Diagnostic Viewer" },
        { icon: Sparkles, label: "AI Pre-Surgery Feasibility" },
        { icon: ShieldCheck, label: "1-on-1 Encrypted Tele-Consult" },
      ],
      socialProof: {
        count: "98%",
        label: "98.4% Surgical Recommendation Accuracy",
        avatars: [
          "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=80&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&auto=format&fit=crop&q=80",
        ],
      },
      user:
        MOCK_PORTAL_USERS.find((u) => u.role === "hospital_doctor") ||
        MOCK_PORTAL_USERS[4],
    },
    {
      id: "finance",
      title: "Finance & Escrow",
      subtitle: "Escrow & Staging",
      portalBadge: "Finance & Escrow Desk",
      titleLine1: "TRANSPARENT",
      titleLine2: "ESCROW & RECONCILIATION.",
      portalDescription:
        "Manage staged escrow deposits, verify international swift wires, release milestone funds upon surgeon sign-off, and audit hospital bills.",
      icon: DollarSign,
      bgImage:
        "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1400&auto=format&fit=crop&q=80",
      pills: [
        { icon: DollarSign, label: "Staged Escrow Milestone Release" },
        { icon: ShieldCheck, label: "Multi-Currency Wire Verification" },
        { icon: Check, label: "Itemized Hospital Bill Audits" },
      ],
      socialProof: {
        count: "$3M+",
        label: "$3.4M+ International Escrow Cleared",
        avatars: [
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&auto=format&fit=crop&q=80",
        ],
      },
      user:
        MOCK_PORTAL_USERS.find((u) => u.role === "finance_accounts") ||
        MOCK_PORTAL_USERS[5],
    },
    {
      id: "admin",
      title: "Super Admin",
      subtitle: "System Control",
      portalBadge: "Executive Governance",
      titleLine1: "SYSTEM-WIDE",
      titleLine2: "GOVERNANCE & AUDIT.",
      portalDescription:
        "Oversee global hospital network partnerships, doctor credential verifications, role-based permissions, and international HIPAA compliance audit logs.",
      icon: Key,
      bgImage:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&auto=format&fit=crop&q=80",
      pills: [
        { icon: Key, label: "Role-Based Access Control (RBAC)" },
        { icon: ShieldCheck, label: "Global HIPAA & GDPR Audit Logs" },
        { icon: Building2, label: "50+ JCI Accredited Network" },
      ],
      socialProof: {
        count: "99.9%",
        label: "99.99% Enterprise Uptime & Compliance",
        avatars: [
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&auto=format&fit=crop&q=80",
        ],
      },
      user:
        MOCK_PORTAL_USERS.find((u) => u.role === "super_admin") ||
        MOCK_PORTAL_USERS[6],
    },
  ];

  // State
  const [selectedRoleIndex, setSelectedRoleIndex] = useState<number>(0);
  const [email, setEmail] = useState<string>("robert.vance@gmail.com");
  const [password, setPassword] = useState<string>("••••••••••••");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Check query params to pre-select appropriate portal (e.g. ?portal=doctor or ?portal=coordinator)
  useEffect(() => {
    const portalParam = searchParams.get("portal")?.toLowerCase();
    if (portalParam) {
      let foundIndex = -1;
      if (
        portalParam.includes("doc") ||
        portalParam.includes("surgeon") ||
        portalParam.includes("hosp")
      ) {
        foundIndex = demoRoles.findIndex((r) => r.id === "surgeon");
      } else if (
        portalParam.includes("coord") ||
        portalParam.includes("cs") ||
        portalParam.includes("support")
      ) {
        foundIndex = demoRoles.findIndex((r) => r.id === "coordinator");
      } else if (
        portalParam.includes("finance") ||
        portalParam.includes("escrow") ||
        portalParam.includes("bill")
      ) {
        foundIndex = demoRoles.findIndex((r) => r.id === "finance");
      } else if (portalParam.includes("admin")) {
        foundIndex = demoRoles.findIndex((r) => r.id === "admin");
      } else if (portalParam.includes("patient")) {
        foundIndex = demoRoles.findIndex((r) => r.id === "patient");
      }

      if (foundIndex >= 0) {
        setSelectedRoleIndex(foundIndex);
        const targetUser = demoRoles[foundIndex].user;
        if (targetUser) {
          setEmail(targetUser.email);
          setPassword("password123");
        }
      }
    }
  }, [searchParams]);

  const handleSelectRole = (index: number) => {
    setSelectedRoleIndex(index);
    const targetUser = demoRoles[index].user;
    if (targetUser) {
      setEmail(targetUser.email);
      setPassword("password123");
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const targetUser =
      demoRoles[selectedRoleIndex]?.user || MOCK_PORTAL_USERS[0];
    loginAs(targetUser);

    const redirectUrl = searchParams.get("redirect") || "/patient";
    setTimeout(() => {
      router.push(redirectUrl);
    }, 600);
  };

  const currentRole = demoRoles[selectedRoleIndex] || demoRoles[0];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#071321] text-white">
      {/* 01. Left Column: Feature Narrative & Role Selector Strip (Home Banner Style) */}
      <div className="lg:w-3/5 xl:w-[62%] relative flex flex-col justify-between p-6 sm:p-10 lg:p-14 bg-gradient-to-b from-[#071321] via-[#0B1E33] to-[#0D2642] overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800/80">
        {/* Ambient Lights & Texture */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#3F4EB4]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#2ECDC5]/10 rounded-full blur-3xl pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />

        {/* Dynamic Ambient Background Hospital Image Overlay */}
        <div
          key={currentRole.id}
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-20 pointer-events-none transition-all duration-700 ease-in-out"
          style={{
            backgroundImage: `url('${currentRole.bgImage}')`,
          }}
        />

        {/* Top Role Selector Strip */}
        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2ECDC5]">
              <Sparkles className="w-3.5 h-3.5 text-[#2ECDC5]" />
              <span>Select Portal / Workspace Role:</span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
              Common unified gateway for all portals
            </span>
          </div>

          {/* Quick Role Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {demoRoles.map((role, idx) => {
              const IconComponent = role.icon;
              const isSelected = selectedRoleIndex === idx;

              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => handleSelectRole(idx)}
                  className={`p-3 rounded-2xl text-left border transition-all duration-300 relative group ${
                    isSelected
                      ? "bg-white/15 border-[#2ECDC5] text-white shadow-lg shadow-[#2ECDC5]/20 ring-1 ring-[#2ECDC5] scale-[1.02]"
                      : "bg-white/5 border-white/10 hover:bg-white/10 text-slate-300 hover:text-white hover:scale-[1.01]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-[#2ECDC5] text-slate-950 font-black"
                          : "bg-white/10 text-[#2ECDC5] group-hover:bg-[#2ECDC5]/20"
                      }`}
                    >
                      <IconComponent className="w-3.5 h-3.5" />
                    </div>
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-[#2ECDC5] animate-in fade-in zoom-in-75 duration-200" />
                    )}
                  </div>
                  <div className="text-xs font-bold truncate leading-tight">
                    {role.title}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">
                    {role.subtitle}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center Headline & Dynamic Value Proposition (Changes with Selected Role) */}
        <div
          key={`narrative-${currentRole.id}`}
          className="relative z-10 py-10 lg:py-14 space-y-6 max-w-2xl animate-in fade-in slide-in-from-left-4 duration-300"
        >
          {/* Active Portal Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2ECDC5]/10 border border-[#2ECDC5]/30 text-[#2ECDC5] text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2ECDC5]" />
            <span>Unified Gateway • {currentRole.portalBadge}</span>
          </div>

          {/* Main Title (Dynamic per role) */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] text-white">
            {currentRole.titleLine1} <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#2ECDC5] via-[#5ADBD5] to-[#2ECDC5] bg-clip-text text-transparent">
              {currentRole.titleLine2}
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
            {currentRole.portalDescription}
          </p>

          {/* Dynamic Feature Highlight Pills per role */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {currentRole.pills.map((pill, pIdx) => {
              const PillIcon = pill.icon;
              return (
                <div
                  key={pIdx}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-200 backdrop-blur-sm hover:bg-white/10 transition-colors"
                >
                  <PillIcon className="w-3.5 h-3.5 text-[#2ECDC5]" />
                  <span>{pill.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Dynamic Social Proof Badge */}
        <div className="relative z-10 pt-4 flex items-center justify-between border-t border-white/10">
          <div
            key={`proof-${currentRole.id}`}
            className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-2xl border border-white/10 backdrop-blur-sm animate-in fade-in duration-300"
          >
            <div className="flex -space-x-2 overflow-hidden">
              {currentRole.socialProof.avatars.map((av, avIdx) => (
                <img
                  key={avIdx}
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-[#071321] object-cover"
                  src={av}
                  alt="User"
                />
              ))}
              <div className="inline-flex h-6 w-6 rounded-full ring-2 ring-[#071321] bg-[#2ECDC5] text-slate-950 font-black text-[9px] items-center justify-center">
                {currentRole.socialProof.count}
              </div>
            </div>
            <span className="text-xs font-bold text-slate-200">
              {currentRole.socialProof.label}
            </span>
          </div>

          <Link
            href="/"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to website</span>
          </Link>
        </div>
      </div>

      {/* 02. Right Column: Authentication Card Form */}
      <div className="lg:w-2/5 xl:w-[38%] bg-white text-slate-900 flex flex-col justify-between p-6 sm:p-10 lg:p-12">
        {/* Top Header Logo */}
        <div className="flex items-center justify-between pb-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3F4EB4] via-[#283593] to-slate-900 flex items-center justify-center shadow-lg shadow-[#283593]/30 ring-1 ring-[#2ECDC5]/40 group-hover:scale-105 transition-transform">
              <span className="text-white font-black text-lg font-serif">V</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-extrabold tracking-widest text-base text-slate-900 group-hover:text-[#2ECDC5] transition-colors">
                  VEDARA
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#2ECDC5] animate-pulse"></span>
              </div>
              <span className="text-[9px] uppercase font-semibold tracking-wider text-[#00897B] leading-none mt-0.5">
                International Care
              </span>
            </div>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <span>Back to Home</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Form Container */}
        <div className="my-auto py-6 space-y-6 max-w-md w-full mx-auto">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-[#00897B]"></span>
              <span>Signing into: {currentRole.portalBadge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Welcome</span>
              <span className="text-2xl">👋</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Please sign in to access your authorized workspace.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Authorized Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@vedaracare.com"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2ECDC5] focus:border-[#2ECDC5] transition-all bg-slate-50/50"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-10 py-3 rounded-2xl border border-slate-200 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2ECDC5] focus:border-[#2ECDC5] transition-all bg-slate-50/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-[#00897B] focus:ring-[#2ECDC5] accent-[#00897B]"
                />
                <span className="text-slate-600 font-medium">Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => alert("Password reset link has been dispatched to your email.")}
                className="font-bold text-[#00897B] hover:text-[#283593] transition-colors underline underline-offset-2"
              >
                Forgot your password?
              </button>
            </div>

            {/* Submit CTA Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#2948C9] via-[#1E74D4] to-[#2ECDC5] hover:from-[#233FA8] hover:via-[#1964B5] hover:to-[#26B3AC] text-white font-bold text-[14px] shadow-lg shadow-[#2948C9]/25 hover:shadow-xl hover:shadow-[#2ECDC5]/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 group cursor-pointer disabled:opacity-75 disabled:pointer-events-none"
            >
              <span>{isSubmitting ? "Authenticating..." : `Sign in to ${currentRole.title}`}</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-slate-400 font-medium">
                New to Vedara Care?
              </span>
            </div>
          </div>

          {/* Create Account Button */}
          <Link
            href="/#assessment"
            className="w-full py-3 rounded-2xl bg-[#E6F8F3] hover:bg-[#D2F2E9] text-[#00897B] border border-[#2ECDC5]/30 font-bold text-xs flex items-center justify-center gap-2 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Create an account / Free Assessment</span>
          </Link>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-slate-100 text-center text-[11px] text-slate-400">
          Copyright © 2026 Vedara Care International LLC. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export const LoginPageClient: React.FC = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#071321] text-white flex items-center justify-center">Loading portal login...</div>}>
      <LoginPageContent />
    </Suspense>
  );
};

export default LoginPageClient;
