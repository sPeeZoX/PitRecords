import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About",
  description:
    "PIT RECORDS — an independent collective focused on boundary-pushing music, visual storytelling, and underground culture.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
