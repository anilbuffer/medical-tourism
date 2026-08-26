import { Metadata } from "next";
import { PortalProvider } from "@/lib/portal/store";
import { PatientDashboard } from "@/components/portal/PatientDashboard";

export const metadata: Metadata = {
  title: "Patient Portal | Vedara Care International",
  description:
    "Secure HIPAA-compliant international patient portal for tracking medical travel, diagnostic reviews, tele-consultations, all-inclusive quotations, and staged escrow payments.",
};

export default function PatientPortalPage() {
  return (
    <PortalProvider>
      <PatientDashboard portalRole="patient" />
    </PortalProvider>
  );
}
