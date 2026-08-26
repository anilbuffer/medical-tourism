import { Metadata } from "next";
import { PortalProvider } from "@/lib/portal/store";
import { PatientDashboard } from "@/components/portal/PatientDashboard";

export const metadata: Metadata = {
  title: "Care Coordinator Desk | Vedara Care International",
  description:
    "International care coordination queue, diagnostic triage, SLA monitor, and quotation desk.",
};

export default function CoordinatorPortalPage() {
  return (
    <PortalProvider>
      <PatientDashboard portalRole="customer_support" />
    </PortalProvider>
  );
}
