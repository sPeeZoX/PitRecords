import type { Metadata } from "next";
import ReleasesPageClient from "./ReleasesPageClient";

export const metadata: Metadata = {
  title: "Releases",
  description:
    "Full discography of PIT RECORDS artists — TOGOMORI and MUZZZ.",
};

export default function ReleasesPage() {
  return <ReleasesPageClient />;
}
