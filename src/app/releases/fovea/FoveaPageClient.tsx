"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft, ExternalLink } from "lucide-react";

const covers = [
  {
    src: "/images/fovea-cover-1.png",
    label: "COVER I",
    description: "Two figures face each other — mirror, duality, confrontation.",
  },
  {
    src: "/images/fovea-cover-2.png",
    label: "COVER II",
    description: "A mass in motion, uncontrolled — the weight of sound.",
  },
  {
    src: "/images/fovea-cover-3.png",
    label: "COVER III",
    description: "Gold on silver. Eyes everywhere. The archive.",
  },
];

const tracks = [
  { number: "01", title: "NOT ONE STEP BACK", features: ["MUZZZ"] },
  { number: "02", title: "MY TIME", features: ["MUZZZ"] },
  { number: "03", title: "SYNDROME", features: ["MUZZZ", "MOVII"] },
  { number: "04", title: "FOVEA INTERLUDE", features: ["MUZZZ"] },
  { number: "05", title: "MI AMORE", features: ["MUZZZ"] },
  { number: "06", title: "SPZ", features: ["MUZZZ"] },
  { number: "07", title: "HOMMAGE", features: ["MUZZZ"] },
];

export default function FoveaPageClient() {
  const [activeCover, setActiveCover] = useState(0);

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
        {/* Background — blurred active cover */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCover}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <Image
                src={covers[activeCover].src}
                alt="FOVEA background"
                fill
                className="object-cover scale-110"
                style={{ filter: "blur(60px) brightness(0.15)" }}
                priority
              />
            </motion.div>
          </AnimatePresence>
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
            <span className="text-white/30 text-xs tracking-[0.4em]">7 TRACKS</span>
          </motion.div>

          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(5rem,18vw,16rem)] font-bold leading-none tracking-tighter"
            >
              FOVEA
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6"
          >
            <p className="text-white/50 text-base md:text-xl tracking-wide font-medium">
              TOGOMORI <span className="text-white/40">×</span> MUZZZ
            </p>
            <a
              href="https://open.spotify.com/album/0cvxxxg1B4Up8KV1uRprbE?si=1B1HVuhFRLy-UvBHrg2Y8Q"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-xs tracking-[0.3em] bg-white text-black px-8 py-4 hover:bg-white/80 transition-all duration-300 font-medium"
            >
              LISTEN ON SPOTIFY
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── COVERS ───────────────────────────────────────────── */}
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
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              THREE COVERS.
            </h2>
          </motion.div>

          {/* Main selected cover */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center mb-16 md:mb-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCover}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-square"
              >
                <Image
                  src={covers[activeCover].src}
                  alt={covers[activeCover].label}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-white/20 text-xs tracking-[0.4em] mb-6">
                {covers[activeCover].label}
              </p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeCover}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="text-2xl md:text-3xl text-white/70 leading-snug font-light mb-12"
                >
                  {covers[activeCover].description}
                </motion.p>
              </AnimatePresence>

              {/* Cover selector thumbnails */}
              <div className="flex gap-4">
                {covers.map((cover, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveCover(i)}
                    className={`relative aspect-square w-20 md:w-24 overflow-hidden transition-all duration-300 ${
                      i === activeCover
                        ? "ring-2 ring-white ring-offset-2 ring-offset-black"
                        : "opacity-40 hover:opacity-70"
                    }`}
                    aria-label={`View ${cover.label}`}
                  >
                    <Image
                      src={cover.src}
                      alt={cover.label}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* All 3 covers in a row */}
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            {covers.map((cover, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group cursor-pointer"
                onClick={() => setActiveCover(i)}
              >
                <div
                  className={`relative aspect-square overflow-hidden mb-3 transition-all duration-300 ${
                    i === activeCover ? "ring-1 ring-white/40" : ""
                  }`}
                >
                  <Image
                    src={cover.src}
                    alt={cover.label}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 33vw, 30vw"
                  />
                </div>
                <p className="text-white/30 text-xs tracking-[0.3em]">{cover.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRACKLIST ────────────────────────────────────────── */}
      <section className="py-24 md:py-40 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12 md:mb-16"
          >
            <p className="text-white/20 text-xs tracking-[0.4em] mb-4">TRACKLIST</p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              7 TRACKS.
            </h2>
          </motion.div>

          <div className="space-y-0">
            {tracks.map((track, i) => (
              <motion.div
                key={track.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-between py-5 border-b border-white/5 group hover:border-white/10 transition-colors duration-300"
              >
                <div className="flex items-center gap-6 md:gap-10">
                  <span className="text-white/20 text-sm w-8 shrink-0 font-mono">
                    {track.number}
                  </span>
                  <span className="text-base md:text-lg font-medium tracking-wide group-hover:text-white/70 transition-colors duration-300">
                    {track.title}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {track.features.map((feat) => (
                    <span
                      key={feat}
                      className="text-[10px] tracking-[0.2em] text-white/25 border border-white/10 px-2 py-1"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stream CTA below tracklist */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-12"
          >
            <a
              href="https://open.spotify.com/album/0cvxxxg1B4Up8KV1uRprbE?si=1B1HVuhFRLy-UvBHrg2Y8Q"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 text-xs tracking-[0.3em] border border-white/20 px-8 py-4 hover:bg-white hover:text-black transition-all duration-300"
            >
              STREAM FOVEA
              <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT THE PROJECT ────────────────────────────────── */}
      <section className="py-24 md:py-40 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-white/20 text-xs tracking-[0.4em] mb-6">THE PROJECT</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                THE SHARPEST<br />POINT OF FOCUS.
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 text-white/50 leading-relaxed text-base md:text-lg"
            >
              <p>
                FOVEA is the central point of sharpest vision — the part of the eye where clarity is absolute. That precision is the project&apos;s obsession: every track locked in, no filler, no padding.
              </p>
              <p>
                TOGOMORI and MUZZZ converge across seven tracks that move between tension and release, noise and melody, aggression and intimacy. Three covers, one statement.
              </p>
              <p>
                Features MOVII on SYNDROME.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ARTISTS ──────────────────────────────────────────── */}
      <section className="py-24 md:py-40 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-white/20 text-xs tracking-[0.4em] mb-12 md:mb-16">
            THE ARTISTS
          </p>
          <div className="grid md:grid-cols-2 gap-px bg-white/5">
            {[
              { name: "TOGOMORI", role: "Primary Artist", href: "/artists#togomori" },
              { name: "MUZZZ", role: "Primary Artist", href: "/artists#muzzz" },
            ].map((artist, i) => (
              <motion.div
                key={artist.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
              >
                <Link
                  href={artist.href}
                  className="group bg-black block p-10 md:p-16 hover:bg-white/[0.02] transition-colors duration-300"
                >
                  <p className="text-white/20 text-xs tracking-[0.3em] mb-4">
                    {artist.role}
                  </p>
                  <div className="flex items-center justify-between">
                    <h3 className="text-3xl md:text-5xl font-bold tracking-tight">
                      {artist.name}
                    </h3>
                    <ArrowUpRight className="w-6 h-6 text-white/20 group-hover:text-white group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
