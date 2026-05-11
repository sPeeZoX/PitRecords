import type { Metadata } from "next";
import FoveaPageClient from "./FoveaPageClient";

export const metadata: Metadata = {
  title: "FOVEA — TOGOMORI × MUZZZ",
  description:
    "FOVEA — a seven-track collab EP by TOGOMORI and MUZZZ. Out 2026 on PIT RECORDS.",
};

export default function FoveaPage() {
  return <FoveaPageClient />;
}
