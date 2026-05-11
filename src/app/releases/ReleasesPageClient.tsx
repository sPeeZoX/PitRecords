"use client";

import { motion } from "framer-motion";
import MusicPortfolio, { type PortfolioProject } from "@/components/ui/music-portfolio";

const projectsData: PortfolioProject[] = [
  {
    id: 1,
    artist: "TOGOMORI × MUZZZ",
    album: "FOVEA",
    category: "EP",
    label: "PIT RECORDS",
    year: "2026",
    image: "/images/fovea-cover-1.png",
    href: "/releases/fovea",
    external: false,
  },
  {
    id: 2,
    artist: "TOGOMORI × MUZZZ",
    album: "MY TIME",
    category: "SINGLE",
    label: "PIT RECORDS",
    year: "2025",
    image: "https://i.scdn.co/image/ab67616d0000b2736e30cdbb46b443f71a896e90",
    href: "https://open.spotify.com/album/0Ll9Zv0CUTf6rkYnb8GgUO",
    external: true,
  },
  {
    id: 3,
    artist: "TOGOMORI",
    album: "ON PEUT S'AIMER ENCORE",
    category: "SINGLE",
    label: "PIT RECORDS",
    year: "2025",
    image: "https://i.scdn.co/image/ab67616d0000b273936dc50fbe23a7363b0f877d",
    href: "https://open.spotify.com/album/3nt9gXz80lLluCwMLgQAqL",
    external: true,
  },
  {
    id: 4,
    artist: "MUZZZ",
    album: "BOUNCE",
    category: "SINGLE",
    label: "PIT RECORDS",
    year: "2025",
    image: "https://i.scdn.co/image/ab67616d0000b27373d525d6f66470ae6d5b1bf0",
    href: "https://open.spotify.com/album/3Gsq1ch715JFj72BAUi96Y",
    external: true,
  },
  {
    id: 5,
    artist: "MOVII ft. TOGOMORI",
    album: "SHE",
    category: "FEATURE",
    label: "/",
    year: "2026",
    image: "https://i.scdn.co/image/ab67616d0000b273572b1967627dac34c7f8bc45",
    href: "https://open.spotify.com/track/2sdpvDhsOUwLiIS7T5sj6i",
    external: true,
  },
  {
    id: 6,
    artist: "MOVII ft. MUZZZ",
    album: "VOCALIST",
    category: "FEATURE",
    label: "/",
    year: "2026",
    image: "https://i.scdn.co/image/ab67616d0000b273572b1967627dac34c7f8bc45",
    href: "https://open.spotify.com/track/71ldOsZJTD6SPDuoYOYVDa",
    external: true,
  },
];

const config = {
  timeZone: "Europe/Brussels",
  idleDelay: 4000,
};

export default function ReleasesPageClient() {
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

      {/* Portfolio tracklist */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="pb-40 px-6 md:px-12"
      >
        <div className="max-w-screen-xl mx-auto">
          <MusicPortfolio projects={projectsData} config={config} />
        </div>
      </motion.section>
    </>
  );
}
