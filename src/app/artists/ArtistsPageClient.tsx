"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Instagram, ExternalLink, Music } from "lucide-react";
import { artists } from "@/data/artists";
import { releases } from "@/data/releases";

export default function ArtistsPageClient() {
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
              ARTISTS
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Artist Sections */}
      {artists.map((artist, index) => {
        const artistReleases = releases.filter(
          (r) => r.artistSlugs.includes(artist.slug)
        );

        return (
          <section
            key={artist.id}
            id={artist.slug}
            className={`py-24 md:py-40 px-6 md:px-12 border-t border-white/5 ${
              index % 2 === 1 ? "bg-white/[0.01]" : ""
            }`}
          >
            <div className="max-w-screen-xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-start">
                {/* Image placeholder */}
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className={index % 2 === 1 ? "md:order-2" : ""}
                >
                  <div className="aspect-[3/4] bg-white/5 relative overflow-hidden">
                    <Image
                      src={artist.image}
                      alt={artist.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                </motion.div>

                {/* Info */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.9,
                    delay: 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`${index % 2 === 1 ? "md:order-1" : ""} flex flex-col justify-center`}
                >
                  <p className="text-white/30 text-xs tracking-[0.4em] mb-4">
                    {artist.genre}
                  </p>
                  <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-4">
                    {artist.name}
                  </h2>
                  <p className="text-white/40 text-base md:text-xl tracking-wide mb-8 italic">
                    &ldquo;{artist.tagline}&rdquo;
                  </p>
                  <p className="text-white/60 leading-relaxed text-base md:text-lg mb-12 max-w-lg">
                    {artist.bio}
                  </p>

                  {/* Releases */}
                  {artistReleases.length > 0 && (
                    <div className="mb-12">
                      <p className="text-white/20 text-xs tracking-[0.3em] mb-6">
                        RELEASES
                      </p>
                      <div className="space-y-3">
                        {artistReleases.map((release) => (
                          <div
                            key={release.id}
                            className="flex items-center justify-between py-3 border-b border-white/5 group"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-8 h-8 bg-white/5 flex items-center justify-center">
                                <Music className="w-3 h-3 text-white/30" />
                              </div>
                              <div>
                                <p className="text-sm font-medium tracking-wide">
                                  {release.title}
                                </p>
                                <p className="text-white/30 text-xs">
                                  {release.type} · {release.year}
                                </p>
                              </div>
                            </div>
                            {release.streamingLinks.spotify && (
                              <a
                                href={release.streamingLinks.spotify}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/20 hover:text-white transition-colors duration-300"
                                aria-label={`Listen to ${release.title} on Spotify`}
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Socials */}
                  <div className="flex items-center gap-6">
                    {artist.socials.instagram && (
                      <a
                        href={artist.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white/30 text-xs tracking-[0.2em] hover:text-white transition-colors duration-300"
                      >
                        <Instagram className="w-4 h-4" />
                        INSTAGRAM
                      </a>
                    )}
                    {artist.socials.spotify && (
                      <a
                        href={artist.socials.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white/30 text-xs tracking-[0.2em] hover:text-white transition-colors duration-300"
                      >
                        <ExternalLink className="w-4 h-4" />
                        SPOTIFY
                      </a>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Bottom CTA */}
      <section className="py-24 md:py-40 px-6 md:px-12 border-t border-white/5 text-center">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-white/30 text-xs tracking-[0.4em] mb-6">
              MORE COMING
            </p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
              STAY TUNED.
            </h2>
            <Link
              href="/releases"
              className="inline-flex items-center gap-3 text-xs tracking-[0.3em] border border-white/20 px-8 py-4 hover:bg-white hover:text-black transition-all duration-400"
            >
              SEE ALL RELEASES
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
