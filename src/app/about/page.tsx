import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About",
  description:
    "PIT RECORDS — an independent label focused on boundary-pushing music, visual storytelling, and underground culture.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
