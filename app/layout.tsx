import type { Metadata } from "next";
import { Mulish, Kalam } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-mulish",
  display: "swap",
});

const kalam = Kalam({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-kalam",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Your Medicare Trip | World-Class Medical Care Abroad",
  description:
    "Top specialist doctors and accredited world-class hospital partners in India, up to 70% lower costs, 24/7 personal concierge, recovery suites, and comprehensive complication insurance with Your Medicare Trip.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${mulish.variable} ${kalam.variable} font-sans scroll-smooth antialiased`}>
      <body className="min-h-screen bg-surface-base text-high flex flex-col font-sans selection:bg-secondary/30 selection:text-primary">
        <AppProviders>
          <Navbar />
          {children}
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
