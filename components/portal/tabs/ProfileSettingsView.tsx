"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  Bell,
  ShieldCheck,
  MapPin,
  Upload,
  Save,
  Check,
  AlertCircle,
  SlidersHorizontal,
  Lock,
  Smartphone,
  Mail,
  Key,
  Globe,
  Building2,
  Stethoscope,
  DollarSign,
  FileCheck,
  Clock,
  CheckCircle2,
  Phone,
  Shield,
} from "lucide-react";
import { usePortal } from "@/lib/portal/store";
import { UserRole } from "@/types/portal";

interface ProfileSettingsViewProps {
  userRole?: UserRole;
  onNavigateTab?: (tabId: string) => void;
}

export const ProfileSettingsView: React.FC<ProfileSettingsViewProps> = ({
  userRole = "patient",
  onNavigateTab,
}) => {
  const { currentUser, setCurrentUser, activeCase, currency, setCurrency, language, setLanguage } =
    usePortal();

  const effectiveRole = userRole || currentUser?.role || "patient";

  const [activeSubTab, setActiveSubTab] = useState<
    "personal_profile" | "notifications" | "security" | "role_specific"
  >("personal_profile");

  // Split current user name into first and last
  const nameParts = (currentUser?.name || "Tariq Al-Mansoor").split(" ");
  const defaultFirstName = nameParts[0] || "Tariq";
  const defaultLastName = nameParts.slice(1).join(" ") || "Al-Mansoor";

  // Form states for Personal Profile
  const [firstName, setFirstName] = useState(defaultFirstName);
  const [lastName, setLastName] = useState(defaultLastName);
  const [email, setEmail] = useState(currentUser?.email || "tariq.mansoor@alnoor.ae");
  const [phone, setPhone] = useState(currentUser?.phone || "+971 50 123 4567");
  const [avatarUrl, setAvatarUrl] = useState(
    currentUser?.avatar ||
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
  );

  // Address fields
  const [streetAddress, setStreetAddress] = useState(
    effectiveRole === "patient"
      ? "Villa 42, Al-Raha Beach Boulevard, Sector 4"
      : "Medanta Medicity Complex, CH Bakhtawar Singh Rd"
  );
  const [city, setCity] = useState(
    effectiveRole === "patient" ? "Abu Dhabi" : "Gurugram"
  );
  const [state, setState] = useState(
    effectiveRole === "patient" ? "Abu Dhabi" : "Haryana"
  );
  const [zipCode, setZipCode] = useState(
    effectiveRole === "patient" ? "98101" : "122001"
  );
  const [country, setCountry] = useState(
    currentUser?.country || (effectiveRole === "patient" ? "United Arab Emirates" : "India")
  );

  // Role specific fields
  const [passportNumber, setPassportNumber] = useState("N8941202");
  const [emergencyContactName, setEmergencyContactName] = useState("Faris Al-Mansoor (Son)");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("+971 50 987 6543");
  const [bloodGroup, setBloodGroup] = useState("B+ Positive");
  const [doctorRegId, setDoctorRegId] = useState("MCI-2004-98412-HPB");
  const [hospitalAffiliation, setHospitalAffiliation] = useState("Medanta – The Medicity");
  const [coordinatorId, setCoordinatorId] = useState("VDR-CS-104");
  const [assignedDesks, setAssignedDesks] = useState("MENA Arabic Desk • Executive VIP");
  const [financeOfficerId, setFinanceOfficerId] = useState("FIN-ESCROW-08");
  const [bankSwift, setBankSwift] = useState("HDFC0000122 / IN98214");

  // Notifications toggles
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [whatsAppAlerts, setWhatsAppAlerts] = useState(true);
  const [videoConsultAlerts, setVideoConsultAlerts] = useState(true);
  const [escrowAlerts, setEscrowAlerts] = useState(true);
  const [digestFrequency, setDigestFrequency] = useState("instant");

  // Security states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mfaEnabled, setMfaEnabled] = useState(currentUser?.mfaEnforced ?? false);

  // Saving state & alert banner
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Synchronize initial values if currentUser changes
  useEffect(() => {
    if (currentUser) {
      const parts = (currentUser.name || "").split(" ");
      setFirstName(parts[0] || "");
      setLastName(parts.slice(1).join(" ") || "");
      setEmail(currentUser.email || "");
      setPhone(currentUser.phone || "");
      if (currentUser.avatar) setAvatarUrl(currentUser.avatar);
      if (currentUser.country) setCountry(currentUser.country);
      setMfaEnabled(currentUser.mfaEnforced || false);
    }
  }, [currentUser]);

  // Handle Save Profile
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
      if (currentUser && setCurrentUser) {
        setCurrentUser({
          ...currentUser,
          name: fullName || currentUser.name,
          email: email.trim() || currentUser.email,
          phone: phone.trim() || currentUser.phone,
          avatar: avatarUrl,
          country: country.trim() || currentUser.country,
          mfaEnforced: mfaEnabled,
        });
      }
      setIsSaving(false);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 4000);
    }, 400);
  };

  // Handle Avatar Change (Simulated Upload)
  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setAvatarUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Role Badge and Kicker configuration
  const roleConfig = {
    patient: {
      kicker: "PERSONAL SETTINGS",
      title: "Settings & Configuration",
      subtitle: "Manage your personal profile, notification preferences, and account security.",
      profileTabLabel: "Personal Profile",
      roleTabLabel: "Medical Passport & Travel",
      roleTabDesc: "Passport details, emergency contact & allergies",
    },
    customer_support: {
      kicker: "CARE COORDINATOR SETTINGS",
      title: "Settings & Configuration",
      subtitle: "Manage your coordinator profile, queue routing preferences, and SLA notifications.",
      profileTabLabel: "Coordinator Profile",
      roleTabLabel: "Queue Routing & Desks",
      roleTabDesc: "Assigned language desks, shifts & SLA alerts",
    },
    hospital_doctor: {
      kicker: "CHIEF SURGEON SETTINGS",
      title: "Settings & Configuration",
      subtitle: "Manage your clinical profile, hospital credentials, and consultation availability.",
      profileTabLabel: "Clinical Profile",
      roleTabLabel: "Clinical Credentials & Hospital",
      roleTabDesc: "Surgical license, hospital privileges & OPD hours",
    },
    finance_accounts: {
      kicker: "FINANCE & ESCROW SETTINGS",
      title: "Settings & Configuration",
      subtitle: "Manage your accounting desk details, payout authorization, and currency preferences.",
      profileTabLabel: "Finance Officer Profile",
      roleTabLabel: "Escrow Gateway & Payouts",
      roleTabDesc: "Settlement account, threshold limits & bank SWIFT",
    },
    super_admin: {
      kicker: "SUPER ADMIN SETTINGS",
      title: "Settings & Configuration",
      subtitle: "Manage system governance, root administrator credentials, and platform security.",
      profileTabLabel: "Administrator Profile",
      roleTabLabel: "System Governance & Audit",
      roleTabDesc: "Audit retention, RBAC enforcement & platform keys",
    },
  }[effectiveRole] || {
    kicker: "PERSONAL SETTINGS",
    title: "Settings & Configuration",
    subtitle: "Manage your personal profile, notification preferences, and account security.",
    profileTabLabel: "Personal Profile",
    roleTabLabel: "Role Preferences",
    roleTabDesc: "Custom settings for your role",
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16 animate-in fade-in duration-200">
      {/* Top Banner / Header Card (Matching Image 3) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="flex items-center gap-2 text-[#00A884] font-black text-xs uppercase tracking-widest mb-1.5">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#00A884]" />
          <span>{roleConfig.kicker}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {roleConfig.title}
        </h1>
        <p className="text-sm text-slate-500 font-medium mt-1">
          {roleConfig.subtitle}
        </p>

        {/* Success Toast */}
        {showSuccessToast && (
          <div className="mt-4 p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between gap-3 text-emerald-800 text-xs font-bold animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Profile settings have been saved successfully.</span>
            </div>
            <button
              onClick={() => setShowSuccessToast(false)}
              className="text-emerald-700 hover:text-emerald-900 text-xs cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>

      {/* Main Grid: Left Navigation Column + Right Tab Content (Matching Image 3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Sub-Navigation Sidebar */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-3 border border-slate-200 shadow-sm space-y-1.5">
          {/* Tab 1: Personal Profile */}
          <button
            type="button"
            onClick={() => setActiveSubTab("personal_profile")}
            className={`w-full text-left p-3.5 rounded-2xl flex items-start gap-3 transition-all cursor-pointer ${
              activeSubTab === "personal_profile"
                ? "bg-[#00A884] text-white shadow-md font-semibold"
                : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <div
              className={`p-2 rounded-xl shrink-0 ${
                activeSubTab === "personal_profile"
                  ? "bg-white/20 text-white"
                  : "bg-emerald-50 text-emerald-700"
              }`}
            >
              <User className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div
                className={`text-sm font-bold leading-tight ${
                  activeSubTab === "personal_profile" ? "text-white" : "text-slate-900"
                }`}
              >
                {roleConfig.profileTabLabel}
              </div>
              <div
                className={`text-xs mt-0.5 ${
                  activeSubTab === "personal_profile" ? "text-emerald-100" : "text-slate-400"
                }`}
              >
                Manage your personal details
              </div>
            </div>
          </button>

          {/* Tab 2: Notifications & Alerts */}
          <button
            type="button"
            onClick={() => setActiveSubTab("notifications")}
            className={`w-full text-left p-3.5 rounded-2xl flex items-start gap-3 transition-all cursor-pointer ${
              activeSubTab === "notifications"
                ? "bg-[#00A884] text-white shadow-md font-semibold"
                : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <div
              className={`p-2 rounded-xl shrink-0 ${
                activeSubTab === "notifications"
                  ? "bg-white/20 text-white"
                  : "bg-blue-50 text-blue-700"
              }`}
            >
              <Bell className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div
                className={`text-sm font-bold leading-tight ${
                  activeSubTab === "notifications" ? "text-white" : "text-slate-900"
                }`}
              >
                Notifications & Alerts
              </div>
              <div
                className={`text-xs mt-0.5 ${
                  activeSubTab === "notifications" ? "text-emerald-100" : "text-slate-400"
                }`}
              >
                System alerts, SMS & email routing
              </div>
            </div>
          </button>

          {/* Tab 3: Security & Passwords */}
          <button
            type="button"
            onClick={() => setActiveSubTab("security")}
            className={`w-full text-left p-3.5 rounded-2xl flex items-start gap-3 transition-all cursor-pointer ${
              activeSubTab === "security"
                ? "bg-[#00A884] text-white shadow-md font-semibold"
                : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <div
              className={`p-2 rounded-xl shrink-0 ${
                activeSubTab === "security"
                  ? "bg-white/20 text-white"
                  : "bg-indigo-50 text-indigo-700"
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div
                className={`text-sm font-bold leading-tight ${
                  activeSubTab === "security" ? "text-white" : "text-slate-900"
                }`}
              >
                Security & Passwords
              </div>
              <div
                className={`text-xs mt-0.5 ${
                  activeSubTab === "security" ? "text-emerald-100" : "text-slate-400"
                }`}
              >
                Password policy, MFA settings
              </div>
            </div>
          </button>

          {/* Tab 4: Role Specific Tab */}
          <button
            type="button"
            onClick={() => setActiveSubTab("role_specific")}
            className={`w-full text-left p-3.5 rounded-2xl flex items-start gap-3 transition-all cursor-pointer ${
              activeSubTab === "role_specific"
                ? "bg-[#00A884] text-white shadow-md font-semibold"
                : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <div
              className={`p-2 rounded-xl shrink-0 ${
                activeSubTab === "role_specific"
                  ? "bg-white/20 text-white"
                  : "bg-teal-50 text-teal-700"
              }`}
            >
              {effectiveRole === "hospital_doctor" ? (
                <Stethoscope className="w-4 h-4" />
              ) : effectiveRole === "finance_accounts" ? (
                <DollarSign className="w-4 h-4" />
              ) : (
                <FileCheck className="w-4 h-4" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div
                className={`text-sm font-bold leading-tight ${
                  activeSubTab === "role_specific" ? "text-white" : "text-slate-900"
                }`}
              >
                {roleConfig.roleTabLabel}
              </div>
              <div
                className={`text-xs mt-0.5 truncate ${
                  activeSubTab === "role_specific" ? "text-emerald-100" : "text-slate-400"
                }`}
              >
                {roleConfig.roleTabDesc}
              </div>
            </div>
          </button>
        </div>

        {/* Right Tab Content Area */}
        <div className="lg:col-span-8 space-y-6">
          {/* ========================================================================= */}
          {/* TAB 1: PERSONAL PROFILE (Matching Image 3)                                */}
          {/* ========================================================================= */}
          {activeSubTab === "personal_profile" && (
            <form onSubmit={handleSaveProfile} className="space-y-6">
              {/* Card 1: Basic Information */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                {/* Section Header */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#00A884] flex items-center justify-center font-bold">
                    <User className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    Basic Information
                  </h3>
                </div>

                {/* Avatar and Input Fields */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pt-1">
                  {/* Avatar Frame & Upload */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-slate-100 border-2 border-slate-200 overflow-hidden flex items-center justify-center relative shadow-xs">
                      {avatarUrl ? (
                        <img
                          src={avatarUrl}
                          alt="Profile Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-10 h-10 text-slate-300" />
                      )}
                    </div>

                    {/* Hidden input for real file picking */}
                    <label className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-bold text-[#00A884] hover:text-[#008f70] cursor-pointer transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Change Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Inputs Grid */}
                  <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* First Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A884]/30 focus:border-[#00A884] transition-all"
                        required
                      />
                    </div>

                    {/* Last Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A884]/30 focus:border-[#00A884] transition-all"
                        required
                      />
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A884]/30 focus:border-[#00A884] transition-all"
                        required
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone Number"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A884]/30 focus:border-[#00A884] transition-all"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Address (Matching Image 3) */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                {/* Section Header */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#00A884] flex items-center justify-center font-bold">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900">Address</h3>
                </div>

                <div className="space-y-4">
                  {/* Street Address */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      placeholder="Street Address, Building, Apartment"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A884]/30 focus:border-[#00A884] transition-all"
                    />
                  </div>

                  {/* City, State, Zip, Country */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        City
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A884]/30 focus:border-[#00A884] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        State
                      </label>
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="State / Province"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A884]/30 focus:border-[#00A884] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        placeholder="ZIP / Postal Code"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A884]/30 focus:border-[#00A884] transition-all"
                      />
                    </div>
                  </div>

                  {/* Country Field */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Country / Region
                    </label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="Country / Region"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A884]/30 focus:border-[#00A884] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Action Bar (Matching Image 3) */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigateTab) onNavigateTab("overview");
                  }}
                  className="px-6 py-2.5 rounded-2xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-sm font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-2xl bg-[#00A884] hover:bg-[#008f70] active:scale-[0.98] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? "Saving..." : "Save Profile"}</span>
                </button>
              </div>
            </form>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: NOTIFICATIONS & ALERTS                                             */}
          {/* ========================================================================= */}
          {activeSubTab === "notifications" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    Notifications & Routing Preferences
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Configure real-time SMS, Email, and WhatsApp communication channels.
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-2 divide-y divide-slate-100">
                {/* Email Alerts Toggle */}
                <div className="flex items-center justify-between pt-3">
                  <div>
                    <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-600" />
                      <span>Email Notifications</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Receive diagnostic opinions, quota approvals, and payment receipts via email.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailAlerts}
                    onChange={(e) => setEmailAlerts(e.target.checked)}
                    className="w-5 h-5 accent-[#00A884] rounded-md cursor-pointer"
                  />
                </div>

                {/* WhatsApp Alerts Toggle */}
                <div className="flex items-center justify-between pt-3">
                  <div>
                    <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-emerald-600" />
                      <span>WhatsApp Instant Notifications</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Direct WhatsApp updates for flight arrivals, gate pick-ups, and urgent doctor calls.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={whatsAppAlerts}
                    onChange={(e) => setWhatsAppAlerts(e.target.checked)}
                    className="w-5 h-5 accent-[#00A884] rounded-md cursor-pointer"
                  />
                </div>

                {/* SMS Broadcast Toggle */}
                <div className="flex items-center justify-between pt-3">
                  <div>
                    <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-purple-600" />
                      <span>SMS Security & Emergency Routing</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      High-priority 2FA tokens and emergency triage escalation codes.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={smsAlerts}
                    onChange={(e) => setSmsAlerts(e.target.checked)}
                    className="w-5 h-5 accent-[#00A884] rounded-md cursor-pointer"
                  />
                </div>

                {/* Video Consultation Alerts */}
                <div className="flex items-center justify-between pt-3">
                  <div>
                    <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-600" />
                      <span>Tele-Consultation 15-Minute Reminders</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Automated calendar reminders before video room link goes live.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={videoConsultAlerts}
                    onChange={(e) => setVideoConsultAlerts(e.target.checked)}
                    className="w-5 h-5 accent-[#00A884] rounded-md cursor-pointer"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowSuccessToast(true);
                    setTimeout(() => setShowSuccessToast(false), 3000);
                  }}
                  className="px-6 py-2.5 rounded-2xl bg-[#00A884] hover:bg-[#008f70] text-white text-sm font-bold shadow-md transition-all cursor-pointer"
                >
                  Save Notification Preferences
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: SECURITY & PASSWORDS                                               */}
          {/* ========================================================================= */}
          {activeSubTab === "security" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    Security & Authentication
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Manage passwords, 2FA hardware keys, and active session tokens.
                  </p>
                </div>
              </div>

              {/* Password Change Form */}
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A884]/30 focus:border-[#00A884] transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A884]/30 focus:border-[#00A884] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A884]/30 focus:border-[#00A884] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* 2FA / MFA Section */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                    <Key className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">
                      Two-Factor Authentication (2FA)
                    </div>
                    <div className="text-xs text-slate-500">
                      Require OTP code on sign-in for HIPAA audit compliance.
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMfaEnabled(!mfaEnabled)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    mfaEnabled
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                  }`}
                >
                  {mfaEnabled ? "Enabled" : "Enable 2FA"}
                </button>
              </div>

              {/* Active Sessions */}
              <div className="pt-2">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Active Login Session
                </h4>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <div>
                      <span className="font-bold text-slate-900">
                        Chrome on Windows (Current Browser)
                      </span>
                      <div className="text-slate-500 text-[11px]">
                        IP: 185.124.91.42 • Session Active
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                    Active Now
                  </span>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowSuccessToast(true);
                    setTimeout(() => setShowSuccessToast(false), 3000);
                  }}
                  className="px-6 py-2.5 rounded-2xl bg-[#00A884] hover:bg-[#008f70] text-white text-sm font-bold shadow-md transition-all cursor-pointer"
                >
                  Update Security Settings
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: ROLE SPECIFIC PROSPECTIVE SETTINGS                                 */}
          {/* ========================================================================= */}
          {activeSubTab === "role_specific" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#00A884] flex items-center justify-center font-bold">
                  {effectiveRole === "hospital_doctor" ? (
                    <Stethoscope className="w-4 h-4" />
                  ) : effectiveRole === "finance_accounts" ? (
                    <DollarSign className="w-4 h-4" />
                  ) : (
                    <Building2 className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    {roleConfig.roleTabLabel}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {roleConfig.roleTabDesc}
                  </p>
                </div>
              </div>

              {/* Patient Role Perspective */}
              {effectiveRole === "patient" && (
                <div className="space-y-4 pt-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Passport Number
                      </label>
                      <input
                        type="text"
                        value={passportNumber}
                        onChange={(e) => setPassportNumber(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-medium text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Blood Group
                      </label>
                      <input
                        type="text"
                        value={bloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-medium text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Primary Emergency Contact
                      </label>
                      <input
                        type="text"
                        value={emergencyContactName}
                        onChange={(e) => setEmergencyContactName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-medium text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Emergency Phone Number
                      </label>
                      <input
                        type="tel"
                        value={emergencyContactPhone}
                        onChange={(e) => setEmergencyContactPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-medium text-slate-900"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Doctor Role Perspective */}
              {effectiveRole === "hospital_doctor" && (
                <div className="space-y-4 pt-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Medical Council Registration No.
                      </label>
                      <input
                        type="text"
                        value={doctorRegId}
                        onChange={(e) => setDoctorRegId(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-medium text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Hospital Affiliation
                      </label>
                      <input
                        type="text"
                        value={hospitalAffiliation}
                        onChange={(e) => setHospitalAffiliation(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-medium text-slate-900"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Coordinator Role Perspective */}
              {effectiveRole === "customer_support" && (
                <div className="space-y-4 pt-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Coordinator Staff ID
                      </label>
                      <input
                        type="text"
                        value={coordinatorId}
                        onChange={(e) => setCoordinatorId(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-medium text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Assigned Triage Desks
                      </label>
                      <input
                        type="text"
                        value={assignedDesks}
                        onChange={(e) => setAssignedDesks(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-medium text-slate-900"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Finance Role Perspective */}
              {effectiveRole === "finance_accounts" && (
                <div className="space-y-4 pt-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Finance Officer Identifier
                      </label>
                      <input
                        type="text"
                        value={financeOfficerId}
                        onChange={(e) => setFinanceOfficerId(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-medium text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Escrow Settlement Bank SWIFT
                      </label>
                      <input
                        type="text"
                        value={bankSwift}
                        onChange={(e) => setBankSwift(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-medium text-slate-900"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Super Admin Role Perspective */}
              {effectiveRole === "super_admin" && (
                <div className="space-y-4 pt-1">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-slate-900">
                        Immutable Security Audit Retention
                      </div>
                      <div className="text-xs text-slate-500">
                        Retain all cryptographic event logs and consent signatures for 7 years.
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg">
                      Enforced
                    </span>
                  </div>
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowSuccessToast(true);
                    setTimeout(() => setShowSuccessToast(false), 3000);
                  }}
                  className="px-6 py-2.5 rounded-2xl bg-[#00A884] hover:bg-[#008f70] text-white text-sm font-bold shadow-md transition-all cursor-pointer"
                >
                  Save Role Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
