"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const values = [
  {
    number: "01",
    title: "SOUND FIRST",
    description:
      "Every decision flows from the music. We don't chase trends — we archive moments.",
  },
  {
    number: "02",
    title: "NO COMPROMISE",
    description:
      "Creative control stays with the artists. Full stop.",
  },
  {
    number: "03",
    title: "UNDERGROUND ROOTS",
    description:
      "Built from the ground up. We know where we come from and we don't forget it.",
  },
  {
    number: "04",
    title: "VISUAL LANGUAGE",
    description:
      "Music is inseparable from image. PIT RECORDS treats visual identity as a core discipline.",
  },
];

export default function AboutPageClient() {
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
              ABOUT
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Mission statement */}
      <section className="py-24 md:py-40 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <p className="text-2xl md:text-3xl lg:text-4xl leading-snug text-white/80 font-light tracking-tight">
              PIT RECORDS is an independent label focused on boundary-pushing
              music, visual storytelling, and underground culture.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 md:py-40 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid md:grid-cols-[1fr_2fr] gap-16 md:gap-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-white/20 text-xs tracking-[0.4em] mb-4">THE STORY</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                WHERE IT<br />STARTED
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 text-white/50 leading-relaxed text-base md:text-lg"
            >
              {/* Replace with actual label story */}
              <p>
                PIT RECORDS was born from a simple conviction: the best music
                gets made when nobody is looking. No algorithm. No brief. No
                compromise. Just artists given the space and trust to create
                exactly what they hear in their heads.
              </p>
              <p>
                Founded by artists for artists, PIT RECORDS operates outside the
                mainstream — not out of rebellion, but out of necessity. The
                underground isn&apos;t a marketing position. It&apos;s where honest
                music lives.
              </p>
              <p>
                Our roster is small by design. Every artist on PIT RECORDS is a
                collaborator, not a product. We invest in careers, not singles.
                We build legacies, not moments.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-40 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 md:mb-24"
          >
            <p className="text-white/20 text-xs tracking-[0.4em] mb-4">PRINCIPLES</p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              WHAT WE STAND FOR
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-px bg-white/5">
            {values.map((value, i) => (
              <motion.div
                key={value.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="bg-black p-10 md:p-14"
              >
                <p className="text-white/20 text-xs tracking-[0.3em] mb-6">
                  {value.number}
                </p>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                  {value.title}
                </h3>
                <p className="text-white/40 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats row */}
      <section className="py-16 md:py-24 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "2", label: "ARTISTS" },
              { number: "4+", label: "RELEASES" },
              { number: "2024", label: "FOUNDED" },
              { number: "∞", label: "AMBITION" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <p className="text-4xl md:text-6xl font-bold tracking-tighter mb-2">
                  {stat.number}
                </p>
                <p className="text-white/30 text-xs tracking-[0.3em]">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-40 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              WANT IN?
            </h2>
            <p className="text-white/40 mt-4 max-w-md">
              We&apos;re always looking for artists and collaborators who share our vision.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-4 text-sm tracking-[0.3em] bg-white text-black px-10 py-5 hover:bg-white/80 transition-all duration-400 font-medium whitespace-nowrap"
            >
              CONTACT US
              <ArrowUpRight className="w-5 h-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
