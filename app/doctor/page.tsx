import { Metadata } from "next";
import { PortalProvider } from "@/lib/portal/store";
import { PatientDashboard } from "@/components/portal/PatientDashboard";

export const metadata: Metadata = {
  title: "Chief Surgeon & Specialist Portal | Vedara Care International",
  description:
    "Clinical workspace for surgical candidacy evaluations, DICOM imaging reviews, and secure tele-consultations.",
};

export default function DoctorPortalPage() {
  return (
    <PortalProvider>
      <PatientDashboard portalRole="hospital_doctor" />
    </PortalProvider>
  );
}
