import { Metadata } from "next";
import { PortalProvider } from "@/lib/portal/store";
import { PatientDashboard } from "@/components/portal/PatientDashboard";

export const metadata: Metadata = {
  title: "Finance & Escrow Desk | Vedara Care International",
  description:
    "Multi-currency escrow ledger, international SWIFT wire reconciliation, and milestone disbursement vault.",
};

export default function FinancePortalPage() {
  return (
    <PortalProvider>
      <PatientDashboard portalRole="finance_accounts" />
    </PortalProvider>
  );
}
