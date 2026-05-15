"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

type Status = "idle" | "sending" | "sent" | "error";

export default function AftershockPageClient() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status !== "idle") return;

    setStatus("sending");
    try {
      const res = await fetch("/api/presave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* Back link */}
      <div className="fixed top-24 left-6 md:left-12 z-40">
        <Link
          href="/releases"
          className="flex items-center gap-2 text-white/30 hover:text-white text-xs tracking-[0.2em] transition-colors duration-300"
        >
          <ArrowLeft className="w-3 h-3" />
          RELEASES
        </Link>
      </div>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col justify-end pt-32 pb-16 md:pb-24 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/aftershock-cover.png"
            alt="AFTERSHOCK background"
            fill
            className="object-cover scale-110"
            style={{ filter: "blur(60px) brightness(0.15)" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-screen-xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-3 mb-8"
          >
            <span className="text-white/30 text-xs tracking-[0.4em]">PIT RECORDS</span>
            <span className="text-white/10 text-xs">·</span>
            <span className="text-white/30 text-xs tracking-[0.4em]">EP · 2026</span>
            <span className="text-white/10 text-xs">·</span>
            <span className="text-white/30 text-xs tracking-[0.4em]">DROPPING 16.05.2026</span>
          </motion.div>

          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(3.5rem,14vw,13rem)] font-bold leading-none tracking-tighter"
            >
              AFTERSHOCK
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/50 text-base md:text-xl tracking-wide font-medium"
          >
            MUZZZ
          </motion.p>
        </div>
      </section>

      {/* ── ARTWORK ──────────────────────────────────────────── */}
      <section className="py-24 md:py-40 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12 md:mb-20"
          >
            <p className="text-white/20 text-xs tracking-[0.4em] mb-4">ARTWORK</p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">THE COVERS.</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative aspect-square overflow-hidden mb-3">
                <Image
                  src="/images/aftershock-cover.png"
                  alt="AFTERSHOCK — Front Cover"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <p className="text-white/30 text-xs tracking-[0.3em]">FRONT COVER</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative aspect-square overflow-hidden mb-3">
                <Image
                  src="/images/aftershock-tracklist.png"
                  alt="AFTERSHOCK — Back Cover"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <p className="text-white/30 text-xs tracking-[0.3em]">BACK COVER · TRACKLIST</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── GET NOTIFIED ─────────────────────────────────────── */}
      <section className="py-24 md:py-40 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-white/20 text-xs tracking-[0.4em] mb-6">GET NOTIFIED</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
                BE FIRST<br />WHEN IT DROPS.
              </h2>
              <p className="text-white/40 text-sm leading-relaxed">
                Midnight 16.05.2026. Drop your email and we&apos;ll
                hit you the second AFTERSHOCK is live.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <AnimatePresence mode="wait">
                {status === "sent" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="text-white/30 text-xs tracking-[0.4em] mb-4">
                      YOU&apos;RE ON THE LIST
                    </p>
                    <p className="text-2xl md:text-3xl font-medium text-white/80">
                      We&apos;ll see you at midnight.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div>
                      <label
                        htmlFor="presave-email"
                        className="block text-white/30 text-xs tracking-[0.3em] mb-4"
                      >
                        YOUR EMAIL
                      </label>
                      <input
                        id="presave-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        required
                        className="w-full bg-transparent border-b border-white/20 focus:border-white/60 outline-none text-white placeholder:text-white/20 text-base py-3 transition-colors duration-300"
                      />
                    </div>

                    {status === "error" && (
                      <p className="text-red-400/70 text-xs tracking-[0.2em]">
                        SOMETHING WENT WRONG. TRY AGAIN.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="group flex items-center gap-3 text-xs tracking-[0.3em] bg-white text-black px-8 py-4 hover:bg-white/80 transition-all duration-300 font-medium disabled:opacity-50"
                    >
                      {status === "sending" ? "SENDING..." : "NOTIFY ME"}
                      {status === "idle" && (
                        <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300" />
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ARTIST ───────────────────────────────────────────── */}
      <section className="py-24 md:py-40 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-white/20 text-xs tracking-[0.4em] mb-12 md:mb-16">
            THE ARTIST
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Link
              href="/artists#muzzz"
              className="group bg-black block p-10 md:p-16 hover:bg-white/[0.02] transition-colors duration-300 border border-white/5"
            >
              <p className="text-white/20 text-xs tracking-[0.3em] mb-4">PRIMARY ARTIST</p>
              <div className="flex items-center justify-between">
                <h3 className="text-3xl md:text-5xl font-bold tracking-tight">MUZZZ</h3>
                <ArrowUpRight className="w-6 h-6 text-white/20 group-hover:text-white group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
