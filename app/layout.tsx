import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CareProvider } from "@/context/CareContext";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "VEDARA | International Care — India's International Care Concierge",
  description:
    "A premium medical-care coordination platform helping international patients discover the right Indian specialists, accredited hospitals, treatment options, and end-to-end travel support.",
  keywords: [
    "Medical Tourism India",
    "International Patient Care",
    "Indian Hospitals",
    "Cardiac Surgery India",
    "Cancer Care India",
    "Orthopedic Surgery India",
    "Medical Visa India",
    "Care Concierge",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="min-h-screen flex flex-col justify-between">
        <CareProvider>
          <AppShell>{children}</AppShell>
        </CareProvider>
      </body>
    </html>
  );
}
