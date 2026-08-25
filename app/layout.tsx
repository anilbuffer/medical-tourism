import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CareProvider } from "@/context/CareContext";
import { AppShell } from "@/components/layout/AppShell";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

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
    <html lang="en" className={`${plusJakarta.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col justify-between font-sans antialiased">
        <CareProvider>
          <AppShell>{children}</AppShell>
        </CareProvider>
      </body>
    </html>
  );
}
