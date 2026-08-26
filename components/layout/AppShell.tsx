"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { IntakeModal } from "@/components/intake/IntakeModal";
import { DoctorModal } from "@/components/medical/DoctorModal";
import { LiveChatDrawer } from "@/components/concierge/LiveChatDrawer";
import { FloatingQuickBar } from "@/components/ui/FloatingQuickBar";
import { ExitIntentModal } from "@/components/trust/ExitIntentModal";

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const pathname = usePathname();
  const portalPaths = ["/patient", "/login", "/customer", "/hospital", "/finance"];
  const isPortal = pathname ? portalPaths.some(p => pathname.startsWith(p)) : false;

  if (isPortal) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />

      {/* Interactive Global Modals & Drawers */}
      <IntakeModal />
      <DoctorModal />
      <LiveChatDrawer />
      <FloatingQuickBar />
      <ExitIntentModal />
    </>
  );
};
