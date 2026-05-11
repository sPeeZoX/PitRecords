"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Artist } from "@/data/artists";

interface ArtistCardProps {
  artist: Artist;
  index?: number;
}

export default function ArtistCard({ artist, index = 0 }: ArtistCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.9,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link href={`/artists#${artist.slug}`} className="group block">
        {/* Image */}
        <div className="relative overflow-hidden aspect-[3/4] bg-white/5 mb-6">
          <Image
            src={artist.image}
            alt={artist.name}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Arrow */}
          <div className="absolute top-4 right-4 w-10 h-10 border border-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Info */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-1 group-hover:opacity-60 transition-opacity duration-300">
              {artist.name}
            </h3>
            <p className="text-white/40 text-sm tracking-[0.15em]">
              {artist.genre}
            </p>
          </div>
          <ArrowUpRight className="w-5 h-5 text-white/30 mt-1 group-hover:text-white group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300" />
        </div>
      </Link>
    </motion.div>
  );
}
