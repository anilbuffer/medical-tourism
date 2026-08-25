"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePortal } from "@/lib/portal/store";
import { PersonaSwitcher } from "./PersonaSwitcher";
import { PublicIntakeModal } from "./PublicIntakeModal";
import { OverviewTab } from "./tabs/OverviewTab";
import { MyDocumentsTab } from "./tabs/MyDocumentsTab";
import { MyConsentsTab } from "./tabs/MyConsentsTab";
import { MyConsultationTab } from "./tabs/MyConsultationTab";
import { MyQuoteTab } from "./tabs/MyQuoteTab";
import { MyPaymentsTab } from "./tabs/MyPaymentsTab";
import { MyBookingTab } from "./tabs/MyBookingTab";
import { MyMessagesTab } from "./tabs/MyMessagesTab";
import { CSQueueView } from "./roles/CSQueueView";
import { HospitalDoctorView } from "./roles/HospitalDoctorView";
import { FinanceView } from "./roles/FinanceView";
import { SuperAdminView } from "./roles/SuperAdminView";
import {
  LayoutDashboard,
  FileText,
  Lock,
  Video,
  CreditCard,
  DollarSign,
  Plane,
  MessageSquare,
  Bell,
  PanelLeft,
  ChevronDown,
  ArrowLeft,
  LogOut,
  X,
  Sparkles,
} from "lucide-react";

export const PatientDashboard: React.FC = () => {
  const {
    currentUser,
    activeCase,
    visibleCases,
    setActiveCaseId,
    logout,
  } = usePortal();

  const [activeTab, setActiveTab] = useState<string>("overview");
  const [isIntakeModalOpen, setIsIntakeModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // If role is CS, Doctor, Finance, or Super Admin -> Render dedicated Role View
  const isCS = currentUser?.role === "customer_support";
  const isDoctor = currentUser?.role === "hospital_doctor";
  const isFinance = currentUser?.role === "finance_accounts";
  const isAdmin = currentUser?.role === "super_admin";

  // The exact 8 side menus requested by user
  const sideMenus = [
    {
      id: "overview",
      label: "Overview",
      icon: LayoutDashboard,
    },
    {
      id: "documents",
      label: "My Documents",
      icon: FileText,
      badge: activeCase?.documents.filter((d) => d.status === "pending_review").length,
    },
    {
      id: "consents",
      label: "My Consents",
      icon: Lock,
    },
    {
      id: "consultation",
      label: "My Consultation",
      icon: Video,
    },
    {
      id: "quote",
      label: "My Quote",
      icon: CreditCard,
    },
    {
      id: "payments",
      label: "My Payments",
      icon: DollarSign,
    },
    {
      id: "booking",
      label: "My Booking & Visa",
      icon: Plane,
    },
    {
      id: "messages",
      label: "Messages",
      icon: MessageSquare,
      badge: activeCase?.messages.filter((m) => !m.isRead && m.senderRole !== "patient").length || 2,
    },
  ];

  const currentTabObj = sideMenus.find((m) => m.id === activeTab) || sideMenus[0];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex">
      {/* 01. Left Sidebar Navigation (Desktop) - Styled Exactly Like Home Banner */}
      <aside
        className={`hidden md:flex flex-col bg-gradient-to-b from-[#071321] via-[#0B1E33] to-[#0D2642] text-white transition-all duration-300 z-40 shrink-0 select-none ${
          sidebarOpen ? "w-64" : "w-20"
        } min-h-screen border-r border-slate-800/80 sticky top-0 h-screen relative`}
      >
        {/* Ambient Banner Glows inside Sidebar */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-48 h-48 bg-[#3F4EB4]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-0 w-48 h-48 bg-[#2ECDC5]/15 rounded-full blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        {/* Edge Toggle Button (Floating cleanly on sidebar border, tri-color symmetric palette) */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="hidden md:flex absolute -right-4 top-6 z-50 w-8 h-8 rounded-full bg-gradient-to-r from-[#2ECDC5] via-[#3F4EB4] to-[#283593] hover:from-[#283593] hover:to-[#2ECDC5] active:scale-95 text-white items-center justify-center shadow-xl ring-2 ring-white transition-all duration-200 hover:scale-110 cursor-pointer"
          title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          <PanelLeft className={`w-4 h-4 text-white transition-transform duration-300 ${!sidebarOpen ? "rotate-180" : ""}`} />
        </button>

        {/* Top Logo / Brand Header */}
        <div className={`h-20 flex items-center border-b border-slate-800/80 relative z-10 transition-all ${sidebarOpen ? "px-5 gap-3" : "justify-center px-2"}`}>
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2ECDC5] via-[#3F4EB4] to-[#283593] flex items-center justify-center shadow-lg shadow-[#283593]/30 ring-1 ring-[#2ECDC5]/50 group-hover:scale-105 transition-transform shrink-0">
              <span className="text-white font-black text-lg font-serif">V</span>
            </div>
            {sidebarOpen && (
              <div className="min-w-0 animate-in fade-in duration-200">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="font-extrabold tracking-widest text-base text-white group-hover:text-[#2ECDC5] transition-colors">
                    VEDARA
                  </span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#2ECDC5] animate-pulse"></span>
                </div>
                <span className="text-[9px] uppercase font-semibold tracking-wider text-[#2ECDC5] leading-tight block mt-0.5">
                  Patient Portal
                </span>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation Menus */}
        <div className="flex-1 overflow-y-auto px-3 py-6 space-y-1.5 scrollbar-none relative z-10">
          {sideMenus.map((menu) => {
            const Icon = menu.icon;
            const isActive = activeTab === menu.id;

            return (
              <button
                key={menu.id}
                onClick={() => {
                  setActiveTab(menu.id);
                }}
                title={!sidebarOpen ? menu.label : undefined}
                className={`w-full flex items-center rounded-2xl text-xs font-bold transition-all relative group cursor-pointer ${
                  sidebarOpen ? "gap-3.5 px-4 py-3" : "justify-center px-0 py-3.5"
                } ${
                  isActive
                    ? "bg-gradient-to-r from-[#2ECDC5] via-[#3F4EB4] to-[#283593] text-white shadow-lg shadow-[#283593]/35 font-extrabold"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? "text-white" : "text-slate-400 group-hover:text-[#2ECDC5]"
                  }`}
                />
                {sidebarOpen && <span className="truncate">{menu.label}</span>}

                {/* Badge Indicator */}
                {typeof menu.badge === "number" && menu.badge > 0 && sidebarOpen && (
                  <span
                    className={`ml-auto px-2 py-0.5 rounded-full text-[10px] font-black ${
                      isActive ? "bg-white text-[#283593]" : "bg-[#2ECDC5] text-slate-950"
                    }`}
                  >
                    {menu.badge}
                  </span>
                )}
                {typeof menu.badge === "number" && menu.badge > 0 && !sidebarOpen && (
                  <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-[#2ECDC5] ring-2 ring-[#0B1E33]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Profile Pill */}
        <div className={`p-3 border-t border-slate-800/80 relative z-30 ${!sidebarOpen ? "flex justify-center" : ""}`}>
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className={`w-full flex items-center rounded-2xl hover:bg-white/10 transition-all text-left cursor-pointer ${
              sidebarOpen ? "gap-3 p-2" : "justify-center p-2"
            }`}
            title={!sidebarOpen ? (activeCase?.patientName || "Patient Profile") : undefined}
          >
            <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-[#2ECDC5] via-[#3F4EB4] to-[#283593] text-white font-bold flex items-center justify-center shrink-0 ring-2 ring-[#2ECDC5]/50 shadow-md">
              <span>{activeCase?.patientName ? activeCase.patientName.charAt(0) : "S"}</span>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#2ECDC5] ring-2 ring-[#071321]" />
            </div>

            {sidebarOpen && (
              <>
                <div className="min-w-0 flex-1 animate-in fade-in duration-200">
                  <div className="text-xs font-black text-white truncate">
                    {activeCase?.patientName || "Robert Vance"}
                  </div>
                  <div className="text-[11px] text-[#2ECDC5] font-bold truncate">Patient View</div>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${profileDropdownOpen ? "rotate-180" : ""}`} />
              </>
            )}
          </button>

          {/* Profile Dropdown Backdrop & Popup */}
          {profileDropdownOpen && (
            <>
              {/* Click-outside backdrop */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setProfileDropdownOpen(false)}
              />

              {/* 100% Solid Opaque Dropdown Card */}
              <div
                className={`absolute bottom-full mb-3 bg-[#0B1E33] rounded-2xl p-2.5 shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-slate-700/90 text-xs space-y-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 text-white ${
                  sidebarOpen ? "left-3 right-3" : "left-3 w-60"
                }`}
              >
                {/* Header with Patient Name */}
                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2.5 mb-1.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2ECDC5] via-[#3F4EB4] to-[#283593] text-white font-bold text-xs flex items-center justify-center shrink-0 ring-1 ring-[#2ECDC5]/60">
                    {activeCase?.patientName ? activeCase.patientName.charAt(0) : "P"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-extrabold text-white text-xs truncate">
                      {activeCase?.patientName || "Patient Profile"}
                    </div>
                    <div className="text-[10px] text-[#2ECDC5] font-bold truncate">
                      {activeCase?.id || "VED-2026"} • {activeCase?.patientCountry || "Active Case"}
                    </div>
                  </div>
                </div>

                <Link
                  href="/"
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 text-white font-bold transition-colors border border-slate-700/40"
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  <ArrowLeft className="w-4 h-4 text-[#2ECDC5] shrink-0" />
                  <span className="text-white font-bold text-xs">Return to Main Site</span>
                </Link>

                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2.5 p-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 hover:text-rose-100 font-bold text-left transition-colors border border-rose-900/40 cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-rose-400 shrink-0" />
                  <span className="text-xs">Sign Out</span>
                </button>
              </div>
            </>
          )}
        </div>
      </aside>

      {/* 02. Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden bg-slate-950/80 backdrop-blur-xs flex">
          <div className="w-72 bg-gradient-to-b from-[#071321] via-[#0B1E33] to-[#0D2642] text-white flex flex-col h-full p-4 space-y-4 animate-in slide-in-from-left duration-200 border-r border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#2ECDC5] via-[#3F4EB4] to-[#283593] flex items-center justify-center font-bold text-white ring-1 ring-[#2ECDC5]/40">
                  V
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-sm text-white tracking-wider">VEDARA</span>
                  <span className="text-[9px] text-[#2ECDC5] uppercase font-semibold">Patient Portal</span>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-1.5">
              {sideMenus.map((menu) => {
                const Icon = menu.icon;
                const isActive = activeTab === menu.id;

                return (
                  <button
                    key={menu.id}
                    onClick={() => {
                      setActiveTab(menu.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-[#2ECDC5] via-[#3F4EB4] to-[#283593] text-white font-extrabold shadow-md"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{menu.label}</span>
                    {typeof menu.badge === "number" && menu.badge > 0 && (
                      <span className="ml-auto px-2 py-0.5 rounded-full text-[10px] bg-[#2ECDC5] text-slate-950 font-black">
                        {menu.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}

      {/* 03. Main Viewport Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Header Bar - Clean Frosted Background & Sticky */}
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 sm:px-8 h-20 flex items-center justify-between gap-4 text-slate-900 shadow-xs transition-all">
          {/* Left Title & Collapse Button */}
          <div className="flex items-center gap-3 sm:gap-4 relative z-10">
            {/* Mobile Menu Toggle Button (Desktop uses the unified edge toggle button) */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 border border-slate-200/80 shadow-xs transition-colors cursor-pointer"
              title="Open Navigation Menu"
            >
              <PanelLeft className="w-4 h-4 text-[#3F4EB4]" />
            </button>

            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {currentTabObj.label}
              </h2>
              <span className="text-[10px] font-bold text-[#3F4EB4] uppercase tracking-widest hidden sm:flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2ECDC5] inline-block animate-pulse" />
                Secure Patient Portal
              </span>
            </div>
          </div>

          {/* Right Header Action Utilities */}
          <div className="flex items-center gap-2.5 sm:gap-3 relative z-10">
            {/* Back to Website (Desktop) */}
            <Link
              href="/"
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 border border-slate-200/80 shadow-xs transition-all group"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#3F4EB4] group-hover:-translate-x-0.5 transition-transform" />
              <span>Main Website</span>
            </Link>

            {/* Persona Switcher (RBAC Tester) */}
            <PersonaSwitcher />

            {/* Notification Bell Button */}
            <button
              onClick={() => setActiveTab("messages")}
              className="relative w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200/80 flex items-center justify-center text-slate-700 shadow-xs transition-all cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4 text-slate-600" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#2ECDC5] ring-2 ring-white" />
            </button>
          </div>
        </header>

        {/* Main Body Content Container */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {/* If CS Role -> CS Queue View */}
          {isCS && (
            <CSQueueView
              cases={visibleCases}
              activeCaseId={activeCase?.id || ""}
              onSelectCase={setActiveCaseId}
            />
          )}

          {/* If Hospital Doctor Role -> Hospital Doctor View */}
          {isDoctor && (
            <HospitalDoctorView
              cases={visibleCases}
              activeCaseId={activeCase?.id || ""}
              onSelectCase={setActiveCaseId}
            />
          )}

          {/* If Finance Role -> Finance View */}
          {isFinance && <FinanceView cases={visibleCases} />}

          {/* If Super Admin Role -> Super Admin View */}
          {isAdmin && <SuperAdminView cases={visibleCases} />}

          {/* Patient View (Default) */}
          {!isCS && !isDoctor && !isFinance && !isAdmin && activeCase && (
            <>
              {activeTab === "overview" && (
                <OverviewTab
                  patientCase={activeCase}
                  onNavigateTab={(tabId) => setActiveTab(tabId)}
                />
              )}
              {activeTab === "documents" && <MyDocumentsTab patientCase={activeCase} />}
              {activeTab === "consents" && <MyConsentsTab patientCase={activeCase} />}
              {activeTab === "consultation" && <MyConsultationTab patientCase={activeCase} />}
              {activeTab === "quote" && (
                <MyQuoteTab
                  patientCase={activeCase}
                  onNavigateToPayments={() => setActiveTab("payments")}
                />
              )}
              {activeTab === "payments" && <MyPaymentsTab patientCase={activeCase} />}
              {activeTab === "booking" && <MyBookingTab patientCase={activeCase} />}
              {activeTab === "messages" && <MyMessagesTab patientCase={activeCase} />}
            </>
          )}
        </main>
      </div>

      {/* Public Intake Modal */}
      <PublicIntakeModal
        isOpen={isIntakeModalOpen}
        onClose={() => setIsIntakeModalOpen(false)}
      />
    </div>
  );
};
