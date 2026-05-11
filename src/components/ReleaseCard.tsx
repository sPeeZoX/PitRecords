"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { Release } from "@/data/releases";

interface ReleaseCardProps {
  release: Release;
  index?: number;
}

export default function ReleaseCard({ release, index = 0 }: ReleaseCardProps) {
  const covers = release.covers ?? [release.cover];
  const [coverIndex, setCoverIndex] = useState(0);

  const cycleCover = (e: React.MouseEvent) => {
    if (covers.length <= 1) return;
    e.preventDefault();
    setCoverIndex((prev) => (prev + 1) % covers.length);
  };

  const CardWrapper = release.slug
    ? ({ children }: { children: React.ReactNode }) => (
        <Link href={`/releases/${release.slug}`}>{children}</Link>
      )
    : ({ children }: { children: React.ReactNode }) => <div>{children}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <CardWrapper>
        {/* Cover art */}
        <div
          className="relative aspect-square bg-white/5 overflow-hidden mb-4 cursor-pointer"
          onClick={covers.length > 1 ? cycleCover : undefined}
          title={covers.length > 1 ? "Click to cycle covers" : undefined}
        >
          <Image
            src={covers[coverIndex]}
            alt={`${release.title} cover`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />

          {/* Cover dots for multi-cover releases */}
          {covers.length > 1 && (
            <div className="absolute top-3 right-3 flex gap-1 z-10">
              {covers.map((_, i) => (
                <span
                  key={i}
                  className={`block w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    i === coverIndex ? "bg-white" : "bg-white/30"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Type badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className="text-[10px] tracking-[0.3em] text-white/80 bg-black/60 backdrop-blur-sm px-2 py-1">
              {release.type.toUpperCase()}
            </span>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-10">
            {release.slug && (
              <span className="text-white text-xs tracking-[0.3em] font-medium">
                VIEW MORE
              </span>
            )}
            {release.streamingLinks.spotify && !release.slug && (
              <a
                href={release.streamingLinks.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/90 hover:text-white transition-colors"
                aria-label={`Listen to ${release.title} on Spotify`}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>

        {/* Info */}
        <div>
          <h3 className="font-bold tracking-tight text-lg leading-tight mb-1 group-hover:opacity-60 transition-opacity duration-300">
            {release.title}
          </h3>
          <p className="text-white/40 text-sm tracking-[0.1em]">
            {release.artist}
          </p>
          <p className="text-white/20 text-xs mt-1">{release.year}</p>
        </div>
      </CardWrapper>
    </motion.div>
  );
}
