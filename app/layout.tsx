import type { Metadata } from "next";
import { Mulish, Kalam } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MedicalBusinessJsonLd } from "@/components/seo/MedicalBusinessJsonLd";

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
  metadataBase: new URL("https://www.yourmedicaretrip.com"),
  title: {
    default: "Your Medicare Trip | World-Class Medical Care Abroad",
    template: "%s | Your Medicare Trip",
  },
  description:
    "Top specialist doctors and accredited world-class hospital partners in India, up to 70% lower costs, 24/7 personal concierge, recovery suites, and comprehensive complication insurance with Your Medicare Trip.",
  // No layout-level canonical — each page sets its own via alternates.canonical
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.yourmedicaretrip.com",
    siteName: "Your Medicare Trip",
    title: "Your Medicare Trip | World-Class Medical Care Abroad",
    description:
      "Top specialist doctors and accredited world-class hospital partners in India, up to 70% lower costs, 24/7 personal concierge, recovery suites, and comprehensive complication insurance with Your Medicare Trip.",
    images: [
      {
        url: "/images/hero/airport.jpg",
        width: 1200,
        height: 630,
        alt: "Your Medicare Trip - World-Class Medical Care Abroad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Medicare Trip | World-Class Medical Care Abroad",
    description:
      "Top specialist doctors and accredited world-class hospital partners in India, up to 70% lower costs, 24/7 personal concierge, recovery suites, and comprehensive complication insurance with Your Medicare Trip.",
    images: ["/images/hero/airport.jpg"],
  },
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
      <head>
        <MedicalBusinessJsonLd />
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtm.js?id=GTM-WVWNLSF2"
        />
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `}
        </Script>
      </head>
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
