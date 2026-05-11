import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GrainOverlay from "@/components/GrainOverlay";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "PIT RECORDS",
    template: "%s | PIT RECORDS",
  },
  description:
    "Independent music label featuring TOGOMORI and MUZZZ. Underground sound. No compromise.",
  keywords: [
    "PIT RECORDS",
    "TOGOMORI",
    "MUZZZ",
    "underground music",
    "independent label",
    "experimental music",
  ],
  openGraph: {
    title: "PIT RECORDS",
    description: "Underground sound. No compromise.",
    type: "website",
    url: "https://pitrecords.org",
    images: [{ url: "/logo-white.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PIT RECORDS",
    description: "Underground sound. No compromise.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className="bg-black text-white antialiased">
        <GrainOverlay />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
