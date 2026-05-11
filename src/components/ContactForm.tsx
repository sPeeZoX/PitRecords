"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    // Replace with your preferred form service (Formspree, Resend, etc.)
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      // Example: Formspree endpoint — replace YOUR_FORM_ID
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-transparent border-b border-white/20 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/60 transition-colors duration-300 text-sm tracking-wide";

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-8"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <input
            type="text"
            name="name"
            placeholder="YOUR NAME"
            required
            className={inputClass}
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="YOUR EMAIL"
            required
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <input
          type="text"
          name="subject"
          placeholder="SUBJECT"
          className={inputClass}
        />
      </div>

      <div>
        <textarea
          name="message"
          placeholder="YOUR MESSAGE"
          required
          rows={5}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={status === "sending" || status === "sent"}
          className="group flex items-center gap-3 text-sm tracking-[0.3em] font-medium border border-white/30 px-8 py-4 hover:bg-white hover:text-black transition-all duration-400 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {status === "idle" && (
            <>
              SEND MESSAGE
              <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
            </>
          )}
          {status === "sending" && "SENDING..."}
          {status === "sent" && "MESSAGE SENT"}
          {status === "error" && "TRY AGAIN"}
        </button>

        {status === "sent" && (
          <p className="mt-4 text-white/40 text-sm tracking-wide">
            We&apos;ll be in touch soon.
          </p>
        )}
        {status === "error" && (
          <p className="mt-4 text-red-400/60 text-sm tracking-wide">
            Something went wrong. Email us directly at contact@pitrecords.org
          </p>
        )}
      </div>
    </motion.form>
  );
}
