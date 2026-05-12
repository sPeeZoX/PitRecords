"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { releases, type Release } from "@/data/releases";
import TeamMemberCard from "@/components/ui/team-member-card";
import SectionHeading from "@/components/SectionHeading";
import { GlobePulse } from "@/components/ui/cobe-globe-pulse";
import { SpecialText } from "@/components/ui/special-text";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*";

// ── Marquee with per-letter scramble on hover ────────────────────────────────
function MarqueeScramble({ text, className }: { text: string; className?: string }) {
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const scrambleChar = (index: number) => {
    const el = charRefs.current[index];
    if (!el) return;
    const original = text[index];
    let frame = 0;
    const timer = setInterval(() => {
      frame++;
      if (frame >= 8) {
        clearInterval(timer);
        el.textContent = original;
      } else {
        el.textContent = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }
    }, 40);
  };

  return (
    <span className={className}>
      {text.split("").map((char, i) =>
        char === " " || char === "·" ? (
          <span key={i}>{char}</span>
        ) : (
          <span
            key={i}
            ref={el => { charRefs.current[i] = el; }}
            onMouseEnter={() => scrambleChar(i)}
          >
            {char}
          </span>
        )
      )}
    </span>
  );
}

// ── Featured release card (FOVEA) ────────────────────────────────────────────
function FeaturedRelease({ release }: { release: Release }) {
  const covers = release.covers ?? [release.cover];
  const [idx, setIdx] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startCycle = () => {
    if (covers.length <= 1) return;
    timerRef.current = setInterval(() => setIdx(p => (p + 1) % covers.length), 600);
  };
  const stopCycle = () => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  };

  const href = release.slug ? `/releases/${release.slug}` : "#";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={href} className="group block border border-white/[0.06] overflow-hidden">
        <div className="grid md:grid-cols-2">

          {/* Cover */}
          <div
            className="relative aspect-square overflow-hidden"
            onMouseEnter={startCycle}
            onMouseLeave={stopCycle}
          >
            <Image
              src={covers[idx]}
              alt={release.title}
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

            {/* Cover cycle indicators */}
            {covers.length > 1 && (
              <div className="absolute bottom-5 left-5 flex gap-2 z-10 pointer-events-none">
                {covers.map((_, i) => (
                  <span
                    key={i}
                    className={`block h-[3px] rounded-full transition-all duration-400 ${
                      i === idx ? "w-6 bg-white" : "w-1.5 bg-white/30"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Corner bracket */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/30 pointer-events-none" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/30 pointer-events-none" />
          </div>

          {/* Info panel */}
          <div className="relative flex flex-col justify-between p-8 md:p-14 overflow-hidden bg-white/[0.015]">
            {/* Blurred cover bleed — very subtle */}
            <div
              className="absolute inset-0 opacity-[0.06] pointer-events-none transition-all duration-1000"
              style={{
                backgroundImage: `url(${covers[idx]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(60px)",
              }}
            />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-10">
                <span className="text-[10px] tracking-[0.4em] text-white/50 border border-white/10 px-2.5 py-1">
                  {release.type.toUpperCase()}
                </span>
                <span className="text-white/20 text-xs tracking-[0.2em]">{release.year}</span>
              </div>

              <h3 className="text-[clamp(3.5rem,8vw,7.5rem)] font-bold tracking-tighter leading-[0.88] mb-5">
                {release.title}
              </h3>

              <p className="text-white/40 text-sm tracking-[0.3em] uppercase mb-8">
                {release.artist}
              </p>

              <p className="text-white/25 text-sm leading-relaxed max-w-xs hidden md:block">
                {release.description}
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-between pt-6 mt-8 md:mt-0 border-t border-white/[0.07]">
              <span className="text-xs tracking-[0.35em] text-white/30 group-hover:text-white transition-colors duration-500">
                VIEW RELEASE
              </span>
              <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300" />
            </div>
          </div>

        </div>
      </Link>
    </motion.div>
  );
}

// ── Compact release row (remaining releases) ─────────────────────────────────
function ReleaseRow({ release, index, num }: { release: Release; index: number; num?: number }) {
  const isExternal = !release.slug;
  const href = release.slug
    ? `/releases/${release.slug}`
    : (release.streamingLinks.spotify ?? "#");
  const numRef = useRef<HTMLSpanElement>(null);
  const displayNum = String(num ?? index + 2).padStart(2, "0");

  const scrambleNum = () => {
    const el = numRef.current;
    if (!el) return;
    let frame = 0;
    const timer = setInterval(() => {
      frame++;
      if (frame >= 8) {
        clearInterval(timer);
        el.textContent = displayNum;
      } else {
        el.textContent =
          SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)] +
          SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }
    }, 40);
  };

  return (
    <motion.a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={scrambleNum}
      className="flex items-center gap-4 md:gap-6 py-5 border-b border-white/[0.05] hover:bg-white/[0.025] group transition-colors duration-300 px-3 -mx-3"
    >
      <span
        ref={numRef}
        className="text-white/20 text-xs font-mono w-5 shrink-0 tabular-nums"
      >
        {displayNum}
      </span>

      <div className="relative w-10 h-10 shrink-0 overflow-hidden bg-white/5">
        <Image
          src={release.cover}
          alt={release.title}
          fill
          className="object-cover"
          sizes="40px"
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium tracking-wide truncate group-hover:text-white/60 transition-colors duration-300">
          {release.title}
        </p>
        <p className="text-white/25 text-xs tracking-[0.1em] truncate mt-0.5">
          {release.artist}
        </p>
      </div>

      <span className="text-white/15 text-[10px] tracking-[0.25em] hidden md:block shrink-0">
        {release.type.toUpperCase()}
      </span>

      <span className="text-white/15 text-xs tabular-nums shrink-0">
        {release.year}
      </span>

      <ArrowUpRight className="w-4 h-4 text-white/10 group-hover:text-white/50 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300 shrink-0" />
    </motion.a>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <>
      {/* ─── HERO ────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-end overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.04)_0%,_transparent_60%)]" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.4 }}
          className="absolute inset-x-0 top-16 flex justify-center md:inset-x-auto md:right-0 md:top-0 md:bottom-0 md:w-1/2 md:items-center z-10 pointer-events-auto"
        >
          <GlobePulse className="w-[270px] sm:w-[340px] md:w-full md:max-w-[580px]" />
        </motion.div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-20 max-w-screen-xl mx-auto w-full px-6 md:px-12 pb-16 md:pb-24 pointer-events-none"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/30 text-xs tracking-[0.5em] mb-6 md:mb-8"
          >
            EST. 2024 — INDEPENDENT COLLECTIVE
          </motion.p>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(4rem,10vw,10rem)] leading-none tracking-tighter text-white"
            >
              <SpecialText delay={0.2} speed={22} className="text-[clamp(4rem,10vw,10rem)] font-bold tracking-tighter">
                PIT
              </SpecialText>
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(4rem,10vw,10rem)] leading-none tracking-tighter text-white"
            >
              <SpecialText delay={0.35} speed={22} className="text-[clamp(4rem,10vw,10rem)] font-bold tracking-tighter">
                RECORDS
              </SpecialText>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row items-start md:items-end gap-8 mt-6 md:mt-10 md:w-1/2"
          >
            <p className="text-white/50 text-base md:text-lg tracking-[0.1em] max-w-sm">
              UNDERGROUND SOUND. NO COMPROMISE.
            </p>
            <Link
              href="/artists"
              className="group flex items-center gap-3 text-xs tracking-[0.3em] text-white/60 hover:text-white transition-colors duration-300 shrink-0 pointer-events-auto"
            >
              DISCOVER ARTISTS
              <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-6 md:left-12 flex items-center gap-3 z-30"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4 text-white/30" />
          </motion.div>
          <p className="text-white/20 text-[10px] tracking-[0.3em]">SCROLL</p>
        </motion.div>
      </section>

      {/* ─── ARTISTS ─────────────────────────────────────────────── */}
      <section className="py-24 md:py-40 px-6 md:px-12">
        <div className="max-w-screen-xl mx-auto">
          <SectionHeading label="Our Roster" title="THE ARTISTS" />
          <TeamMemberCard
            position="left"
            jobPosition="EXPERIMENTAL / DARK ELECTRONIC"
            firstName="TOGOMORI"
            imageUrl="/images/togomori.png"
            description="Sonic architect pushing the limits of experimental sound design and underground electronic music. Raw, deliberate, and uncompromising."
            href="/artists#togomori"
          />
          <TeamMemberCard
            position="right"
            jobPosition="NOISE / EXPERIMENTAL HIP-HOP"
            firstName="MUZZZ"
            imageUrl="https://i.scdn.co/image/ab6761610000e5eb93d7705c0e1d4820ec657b24"
            description="Operates at the intersection of noise, hip-hop, and avant-garde production. Every track feels like a transmission from another dimension."
            href="/artists#muzzz"
          />
        </div>
      </section>

      {/* ─── MARQUEE DIVIDER ─────────────────────────────────────── */}
      <div className="py-8 border-y border-white/10 overflow-hidden">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-16 whitespace-nowrap"
        >
          {[...Array(6)].map((_, i) => (
            <MarqueeScramble
              key={i}
              text="WHAT COMES AFTER · FOVEA HAS BEEN OPENED · SHOCK HAS BEEN FELT ·  "
              className="text-white text-5xl md:text-7xl font-bold tracking-tighter shrink-0 cursor-default select-none"
            />
          ))}
        </motion.div>
      </div>

      {/* ─── LATEST RELEASES ─────────────────────────────────────── */}
      <section className="py-24 md:py-40 px-6 md:px-12">
        <div className="max-w-screen-xl mx-auto">

          <div className="flex items-end justify-between mb-12 md:mb-16">
            <SectionHeading label="Discography" title="LATEST RELEASES" className="mb-0" />
            <Link
              href="/releases"
              className="hidden md:flex items-center gap-2 text-xs tracking-[0.3em] text-white/40 hover:text-white transition-colors duration-300 group shrink-0 ml-8"
            >
              ALL RELEASES
              <ArrowUpRight className="w-3 h-3 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300" />
            </Link>
          </div>

          {/* Featured — FOVEA */}
          <FeaturedRelease release={releases[0]} />

          {/* Remaining releases */}
          <div className="mt-1">
            {releases.slice(1, 4).map((release, i) => (
              <ReleaseRow key={release.id} release={release} index={i} />
            ))}
          </div>

          <div className="mt-10 md:hidden">
            <Link
              href="/releases"
              className="flex items-center gap-2 text-xs tracking-[0.3em] text-white/40 hover:text-white transition-colors duration-300 group"
            >
              ALL RELEASES
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

        </div>
      </section>

      {/* ─── FEATURES ────────────────────────────────────────────── */}
      <section className="py-24 md:py-40 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-end justify-between mb-12 md:mb-16">
            <SectionHeading label="Collaborations" title="FEATURES" className="mb-0" />
          </div>
          <div>
            {releases.slice(4).map((release, i) => (
              <ReleaseRow key={release.id} release={release} index={i} num={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT PREVIEW ───────────────────────────────────────── */}
      <section className="py-24 md:py-40 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-white/30 text-xs tracking-[0.4em] mb-6">THE COLLECTIVE</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-8">
                BUILT IN THE<br />UNDERGROUND.
              </h2>
              <p className="text-white/50 leading-relaxed text-base md:text-lg max-w-md mb-10">
                PIT RECORDS is an independent collective focused on boundary-pushing
                music, visual storytelling, and underground culture.
              </p>
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 text-xs tracking-[0.3em] border border-white/20 px-8 py-4 hover:bg-white hover:text-black transition-all duration-400"
              >
                OUR STORY
                <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="hidden md:flex aspect-square bg-white/[0.03] border border-white/5 items-center justify-center p-12"
            >
              <Image
                src="/logo-white.png"
                alt="PIT RECORDS"
                width={400}
                height={200}
                className="w-full h-auto object-contain opacity-20"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CONTACT CTA ─────────────────────────────────────────── */}
      <section className="py-24 md:py-40 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-screen-xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-white/30 text-xs tracking-[0.5em] mb-8">WORK WITH US</p>
            <h2 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter leading-none mb-10">
              LET&apos;S BUILD<br />SOMETHING.
            </h2>
            <p className="text-white/40 text-base md:text-lg max-w-lg mx-auto mb-12">
              Artists, collaborators, visual artists, engineers — reach out.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-4 text-sm tracking-[0.3em] bg-white text-black px-10 py-5 hover:bg-white/80 transition-all duration-400 font-medium"
            >
              GET IN TOUCH
              <ArrowUpRight className="w-5 h-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
