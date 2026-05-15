import type { Metadata } from "next";
import AftershockPageClient from "./AftershockPageClient";

export const metadata: Metadata = {
  title: "AFTERSHOCK — MUZZZ",
  description:
    "AFTERSHOCK — the new EP by MUZZZ. Dropping midnight 16/05/2026 on PIT RECORDS.",
};

export default function AftershockPage() {
  return <AftershockPageClient />;
}
