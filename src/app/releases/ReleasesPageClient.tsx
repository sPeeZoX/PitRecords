"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { releases } from "@/data/releases";
import { artists } from "@/data/artists";
import ReleaseCard from "@/components/ReleaseCard";

type Filter = "ALL" | "TOGOMORI" | "MUZZZ";

export default function ReleasesPageClient() {
  const [filter, setFilter] = useState<Filter>("ALL");

  const filtered = releases.filter((r) => {
    if (filter === "ALL") return true;
    return r.artistSlugs.includes(filter.toLowerCase());
  });

  return (
    <>
      {/* Page Header */}
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
              RELEASES
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="px-6 md:px-12 mb-12 md:mb-20">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex items-center gap-8 border-b border-white/10 pb-0"
          >
            {(["ALL", ...artists.map((a) => a.name)] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs tracking-[0.3em] pb-4 border-b-2 transition-all duration-300 ${
                  filter === f
                    ? "text-white border-white"
                    : "text-white/30 border-transparent hover:text-white/60"
                }`}
              >
                {f}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-24 md:pb-40 px-6 md:px-12">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10"
          >
            {filtered.map((release, i) => (
              <ReleaseCard key={release.id} release={release} index={i} />
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-24">
              <p className="text-white/20 text-sm tracking-[0.3em]">
                NO RELEASES FOUND
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Full release detail — expanded view per release */}
      <section className="py-24 md:py-40 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-white/20 text-xs tracking-[0.4em] mb-16">
            RELEASE DETAILS
          </p>
          <div className="space-y-16">
            {releases.map((release, i) => (
              <motion.div
                key={release.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16 py-12 border-t border-white/5 first:border-t-0"
              >
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                    {release.title}
                  </h3>
                  <p className="text-white/40 text-sm tracking-[0.15em] mb-1">
                    {release.artist}
                  </p>
                  <p className="text-white/20 text-xs tracking-[0.1em]">
                    {release.type} · {release.year}
                  </p>
                </div>

                <div>
                  <p className="text-white/50 leading-relaxed mb-6">
                    {release.description}
                  </p>

                  {release.tracks && (
                    <div className="mb-6">
                      <p className="text-white/20 text-xs tracking-[0.3em] mb-4">
                        TRACKLIST
                      </p>
                      <ol className="space-y-2">
                        {release.tracks.map((track, ti) => (
                          <li
                            key={track}
                            className="text-sm text-white/40 flex items-center gap-4"
                          >
                            <span className="text-white/20 text-xs w-4">
                              {String(ti + 1).padStart(2, "0")}
                            </span>
                            {track}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  <div className="flex items-center gap-6">
                    {release.streamingLinks.spotify && (
                      <a
                        href={release.streamingLinks.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs tracking-[0.2em] text-white/30 hover:text-white transition-colors duration-300 border border-white/10 px-4 py-2 hover:border-white/40"
                      >
                        SPOTIFY
                      </a>
                    )}
                    {release.streamingLinks.soundcloud && (
                      <a
                        href={release.streamingLinks.soundcloud}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs tracking-[0.2em] text-white/30 hover:text-white transition-colors duration-300 border border-white/10 px-4 py-2 hover:border-white/40"
                      >
                        SOUNDCLOUD
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
