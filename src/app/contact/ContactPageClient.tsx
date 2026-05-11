"use client";

import { motion } from "framer-motion";
import { Mail, Instagram } from "lucide-react";
import ContactForm from "@/components/ContactForm";

const contactInfo = [
  {
    icon: Mail,
    label: "EMAIL",
    value: "contact@pitrecords.org",
    href: "mailto:contact@pitrecords.org",
  },
  {
    icon: Instagram,
    label: "INSTAGRAM",
    // Replace with actual Instagram handle/URL
    value: "@pitrecords",
    href: "https://instagram.com",
  },
];

export default function ContactPageClient() {
  return (
    <>
      {/* Header */}
      <section className="pt-40 md:pt-56 pb-16 md:pb-24 px-6 md:px-12">
        <div className="max-w-screen-xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/30 text-xs tracking-[0.5em] mb-6"
          >
            PIT RECORDS
          </motion.p>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(4rem,12vw,11rem)] font-bold leading-none tracking-tighter"
            >
              CONTACT
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-24 md:py-40 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid md:grid-cols-[1fr_2fr] gap-16 md:gap-24">
            {/* Left — info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-white/30 text-xs tracking-[0.4em] mb-6">
                GET IN TOUCH
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-8">
                LET&apos;S TALK.
              </h2>
              <p className="text-white/40 leading-relaxed mb-12 text-sm md:text-base">
                For artist submissions, collaborations, press inquiries, or
                anything else — reach out directly or use the form.
              </p>

              <div className="space-y-8">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label}>
                      <p className="text-white/20 text-xs tracking-[0.3em] mb-2">
                        {item.label}
                      </p>
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-300 text-sm"
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        {item.value}
                      </a>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Right — form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom tagline */}
      <section className="py-16 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-screen-xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-white/10 text-xs tracking-[0.5em] text-center"
          >
            UNDERGROUND SOUND. NO COMPROMISE.
          </motion.p>
        </div>
      </section>
    </>
  );
}
