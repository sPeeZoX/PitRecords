"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/artists", label: "ARTISTS" },
  { href: "/releases", label: "RELEASES" },
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/80 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 relative flex items-center justify-center h-16 md:h-20">

          {/* Centered logo */}
          <Link
            href="/"
            className="hover:opacity-60 transition-opacity duration-300"
            aria-label="PIT RECORDS — Home"
          >
            <Image
              src="/logo-white.png"
              alt="PIT RECORDS"
              width={120}
              height={60}
              className="h-10 md:h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Hamburger — always visible, positioned absolute right */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="absolute right-6 md:right-12 flex flex-col gap-[5px] p-1"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-6 h-px bg-white transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-[8px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-px bg-white transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-px bg-white transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[8px]" : ""
              }`}
            />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <MobileMenu links={navLinks} onClose={() => setMenuOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
