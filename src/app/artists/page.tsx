import type { Metadata } from "next";
import ArtistsPageClient from "./ArtistsPageClient";

export const metadata: Metadata = {
  title: "Artists",
  description:
    "TOGOMORI and MUZZZ — the artists of PIT RECORDS. Boundary-pushing music from the underground.",
};

export default function ArtistsPage() {
  return <ArtistsPageClient />;
}
