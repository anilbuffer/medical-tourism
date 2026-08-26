import { Metadata } from "next";
import { PortalProvider } from "@/lib/portal/store";
import { PatientDashboard } from "@/components/portal/PatientDashboard";

export const metadata: Metadata = {
  title: "Super Admin Governance Console | Vedara Care International",
  description:
    "Executive Governance Console for RBAC permissions, international HIPAA compliance audit logs, SLA monitoring, and escrow vaults.",
};

export default function AdminPortalPage() {
  return (
    <PortalProvider>
      <PatientDashboard portalRole="super_admin" />
    </PortalProvider>
  );
}
