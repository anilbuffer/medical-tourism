import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CareProvider } from "@/context/CareContext";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "Your Medicare Trip | International Care — India's International Care Concierge",
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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/logo-icon.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col justify-between font-sans antialiased">
        <CareProvider>
          <AppShell>{children}</AppShell>
        </CareProvider>
      </body>
    </html>
  );
}
