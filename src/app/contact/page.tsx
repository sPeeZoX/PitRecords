import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with PIT RECORDS — for artists, collaborators, and press inquiries.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
