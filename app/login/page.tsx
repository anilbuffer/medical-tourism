import { Metadata } from "next";
import { PortalProvider } from "@/lib/portal/store";
import { LoginPageClient } from "../../components/portal/LoginPageClient";

export const metadata: Metadata = {
  title: "Login | Vedara Care International Patient Portal",
  description:
    "Sign in to your secure Vedara International Patient Portal, Tele-Consultation Desk, Care Coordination Queue, or Hospital Dashboard.",
};

export default function LoginPage() {
  return (
    <PortalProvider>
      <LoginPageClient />
    </PortalProvider>
  );
}
