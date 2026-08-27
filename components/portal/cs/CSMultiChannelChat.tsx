"use client";

import React, { useState, useEffect } from "react";
import { PatientCase, InPortalMessage, MessageChannel } from "@/types/portal";
import { usePortal } from "@/lib/portal/store";
import {
  MessageSquare,
  Mail,
  Lock,
  StickyNote,
  Send,
  Sparkles,
  Paperclip,
  CheckCheck,
  Check,
  AtSign,
  User,
  Shield,
  Phone,
} from "lucide-react";

interface CSMultiChannelChatProps {
  patientCase: PatientCase;
  initialChannel?: MessageChannel;
  initialTemplateText?: string;
}

export const CSMultiChannelChat: React.FC<CSMultiChannelChatProps> = ({
  patientCase,
  initialChannel = "whatsapp",
  initialTemplateText,
}) => {
  const { sendMultiChannelMessage, currentUser } = usePortal();

  const [activeChannel, setActiveChannel] = useState<MessageChannel>(initialChannel);
  const [messageText, setMessageText] = useState<string>(initialTemplateText || "");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [sendSuccessMsg, setSendSuccessMsg] = useState<string>("");

  useEffect(() => {
    if (initialTemplateText) {
      setMessageText(initialTemplateText);
    }
  }, [initialTemplateText]);

  // Pre-configured Quick Templates matching requirements
  const QUICK_TEMPLATES: { id: string; name: string; channel: MessageChannel; text: string }[] = [
    {
      id: "tpl_mri_missing",
      name: "Request Missing MRI Scan Page",
      channel: "whatsapp",
      text: `Marhaban ${patientCase.patientName}! Dr. Subhash Gupta's team has reviewed your uploaded abdominal files. However, Page 2 of the Blood Work Report (Viral Serology HCV/HBV + INR Coagulation assay) is missing from the scan. Please upload it directly via your portal so we can finalize your surgical evaluation.`,
    },
    {
      id: "tpl_teleconsult_link",
      name: "Tele-Consultation Video Room Link",
      channel: "whatsapp",
      text: `Dear ${patientCase.patientName}, your cross-border telemedicine consultation with Dr. Subhash Gupta has been confirmed. Please join 10 minutes prior using your secure room link: https://vedaracare.health/teleconsult/ved-live-${patientCase.id.slice(-5)}. Our technical care officer will be on standby.`,
    },
    {
      id: "tpl_visa_invite",
      name: "e-Medical Visa Invitation Issued",
      channel: "email",
      text: `Dear ${patientCase.patientName},\n\nWe are pleased to inform you that your official Indian Ministry of External Affairs (MEA) e-Medical Visa Invitation Code has been generated: MEA/MED/2026/${patientCase.id.slice(-6)}.\n\nYou and your medical attendant may now complete the online application at https://indianvisaonline.gov.in/evisa/tvoa.html. Our concierge desk is available 24/7 for assistance.`,
    },
    {
      id: "tpl_quote_ready",
      name: "Package Quote Ready for Review",
      channel: "portal",
      text: `Hello ${patientCase.patientName}, your comprehensive all-inclusive surgical package quotation has been prepared and published to your portal. It includes your hospital stay, surgeon fees, executive attendant suite, and VIP airport chauffeur pickup.`,
    },
    {
      id: "tpl_chauffeur_greet",
      name: "Airport Reception & Chauffeur Protocol",
      channel: "whatsapp",
      text: `Welcome to your medical journey with Vedara Care! Upon arrival at DEL Terminal 3, your dedicated private chauffeur Rajesh Varma (+91 98110 55432) will greet you at Arrivals Gate 5 holding a personalized name sign. Your Toyota Alphard VIP vehicle is DL 1VB 9022.`,
    },
  ];

  const handleSelectTemplate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tplId = e.target.value;
    setSelectedTemplate(tplId);
    const found = QUICK_TEMPLATES.find((t) => t.id === tplId);
    if (found) {
      setMessageText(found.text);
      setActiveChannel(found.channel);
    }
  };

  const handleInsertMention = (tag: string) => {
    setMessageText((prev) => (prev ? `${prev} @${tag} ` : `@${tag} `));
  };

  const handleSend = () => {
    if (!messageText.trim()) return;

    // Detect any @mentions
    const matches = messageText.match(/@([\w-]+)/g);
    const mentionedRoles = matches ? matches.map((m) => m.replace("@", "")) : undefined;

    sendMultiChannelMessage(
      patientCase.id,
      activeChannel,
      messageText,
      activeChannel === "email" ? patientCase.patientEmail : patientCase.patientPhone,
      mentionedRoles
    );

    setMessageText("");
    setSelectedTemplate("");
    setSendSuccessMsg(
      activeChannel === "internal_note"
        ? "✓ Internal Staff Note logged to audit trail."
        : `✓ Message dispatched via ${activeChannel.toUpperCase()} to ${patientCase.patientName}.`
    );
    setTimeout(() => setSendSuccessMsg(""), 4000);
  };

  // Filter messages or show all
  const filteredMessages = patientCase.messages || [];

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Communication Center Top Banner */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-extrabold text-base text-slate-900">
              Communication Center — Case {patientCase.id}
            </h3>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              Multi-Channel Live
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Omni-channel patient engagement: WhatsApp Business, Verified Email, Portal Threads &amp; Internal Staff Notes.
          </p>
        </div>

        {/* Quick Contact Badges */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
            <Phone className="w-3.5 h-3.5 text-[#25D366]" />
            <span className="font-bold">{patientCase.patientPhone}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
            <Mail className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-bold">{patientCase.patientEmail}</span>
          </div>
        </div>
      </div>

      {sendSuccessMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between animate-in fade-in">
          <span>{sendSuccessMsg}</span>
          <span className="text-[10px] text-emerald-600">Delivered &amp; Audit Logged</span>
        </div>
      )}

      {/* Main Split Grid: Message History & Composer */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[550px]">
        {/* Channel Switcher Header Bar */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 bg-slate-200/70 p-1 rounded-2xl">
            <button
              onClick={() => setActiveChannel("whatsapp")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeChannel === "whatsapp"
                  ? "bg-[#25D366] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Business</span>
            </button>

            <button
              onClick={() => setActiveChannel("email")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeChannel === "email"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </button>

            <button
              onClick={() => setActiveChannel("portal")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeChannel === "portal"
                  ? "bg-[#101955] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Patient Portal</span>
            </button>

            <button
              onClick={() => setActiveChannel("internal_note")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeChannel === "internal_note"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <StickyNote className="w-3.5 h-3.5" />
              <span>Internal Note (@Mentions)</span>
            </button>
          </div>

          {/* Quick Templates Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 hidden sm:inline">Templates:</span>
            <select
              value={selectedTemplate}
              onChange={handleSelectTemplate}
              className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-xs focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none cursor-pointer"
            >
              <option value="">⚡ Select Quick Template ▾</option>
              {QUICK_TEMPLATES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.channel.toUpperCase()})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Message Thread Stream */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 max-h-[380px] bg-slate-50/40">
          {filteredMessages.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              No messages recorded yet in this case thread. Send the first update below.
            </div>
          ) : (
            filteredMessages.map((msg) => {
              const isInternal =
                msg.channel === "internal_note" ||
                msg.senderName?.includes("[INTERNAL]") ||
                msg.text?.startsWith("@");

              const isCoordinator =
                msg.senderRole === "cs_coordinator" || msg.senderRole === "system";

              return (
                <div
                  key={msg.id}
                  className={`flex ${
                    isInternal
                      ? "justify-center"
                      : isCoordinator
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs shadow-xs space-y-1.5 ${
                      isInternal
                        ? "bg-purple-50 border border-purple-200 text-purple-900 w-full"
                        : isCoordinator
                        ? msg.channel === "whatsapp"
                          ? "bg-[#DCF8C6] text-slate-900 border border-[#b2e293]"
                          : msg.channel === "email"
                          ? "bg-blue-50 text-blue-950 border border-blue-200"
                          : "bg-[#101955] text-white"
                        : "bg-white text-slate-900 border border-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 text-[10px]">
                      <div className="font-extrabold flex items-center gap-1.5">
                        {isInternal ? (
                          <span className="px-2 py-0.5 rounded-full bg-purple-200 text-purple-800 font-bold uppercase tracking-wider">
                            Internal Staff Note
                          </span>
                        ) : msg.channel === "whatsapp" ? (
                          <span className="text-[#075E54] font-bold flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" /> WhatsApp
                          </span>
                        ) : msg.channel === "email" ? (
                          <span className="text-blue-700 font-bold flex items-center gap-1">
                            <Mail className="w-3 h-3" /> Email
                          </span>
                        ) : (
                          <span className={isCoordinator ? "text-[#2ECDC5]" : "text-slate-600"}>
                            {msg.senderName}
                          </span>
                        )}
                        <span>{msg.senderName}</span>
                      </div>

                      <span
                        className={`text-[10px] ${
                          isCoordinator && msg.channel !== "whatsapp" && msg.channel !== "email"
                            ? "text-slate-300"
                            : "text-slate-400"
                        }`}
                      >
                        {typeof msg.timestamp === "string" && msg.timestamp.includes("T")
                          ? new Date(msg.timestamp).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : msg.timestamp}
                      </span>
                    </div>

                    <p className="leading-relaxed whitespace-pre-line font-medium">
                      {msg.text}
                    </p>

                    {msg.mentionedRoles && msg.mentionedRoles.length > 0 && (
                      <div className="flex items-center gap-1 pt-1">
                        <span className="text-[10px] text-purple-700 font-bold">Tagged:</span>
                        {msg.mentionedRoles.map((role) => (
                          <span
                            key={role}
                            className="text-[9px] font-bold px-2 py-0.5 bg-purple-200 text-purple-900 rounded-md font-mono"
                          >
                            @{role}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Message Composer & Mentions Tag Bar */}
        <div className="p-4 bg-white border-t border-slate-200 space-y-3">
          {/* Quick Mention Shortcuts Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-[11px] font-bold text-slate-400 shrink-0 flex items-center gap-1">
              <AtSign className="w-3 h-3" /> Mention:
            </span>
            {[
              "finance-team",
              "dr-gupta",
              "dr-rajgopal",
              "concierge-desk",
              "aisha-lead",
              "visa-officer",
            ].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleInsertMention(tag)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-purple-100 hover:text-purple-800 text-slate-600 text-[11px] font-mono font-bold transition-colors cursor-pointer shrink-0"
              >
                @{tag}
              </button>
            ))}
          </div>

          {/* Textarea and Send Bar */}
          <div className="flex gap-2">
            <textarea
              rows={2}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={
                activeChannel === "internal_note"
                  ? "Write internal staff note (e.g. @finance-team check deposit status for PT-2026-089412)..."
                  : `Type ${activeChannel.toUpperCase()} message to ${patientCase.patientName}...`
              }
              className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none resize-none"
            />

            <button
              onClick={handleSend}
              disabled={!messageText.trim()}
              className={`px-5 rounded-2xl font-black text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer disabled:opacity-50 ${
                activeChannel === "whatsapp"
                  ? "bg-[#25D366] hover:bg-[#20bd5a] text-slate-950"
                  : activeChannel === "email"
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : activeChannel === "internal_note"
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "bg-[#101955] hover:bg-[#1c2770] text-white"
              }`}
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
