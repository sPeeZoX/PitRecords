"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram, Mail } from "lucide-react";

const navLinks = [
  { href: "/artists", label: "Artists" },
  { href: "/releases", label: "Releases" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-block hover:opacity-60 transition-opacity duration-300"
              aria-label="PIT RECORDS — Home"
            >
              <Image
                src="/logo-white.png"
                alt="PIT RECORDS"
                width={100}
                height={50}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="mt-5 text-white/30 text-xs leading-relaxed max-w-xs">
              Underground sound. No compromise.
              <br />
              Independent music label.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-white/20 text-xs tracking-[0.3em] mb-6">NAVIGATE</p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 text-sm hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white/20 text-xs tracking-[0.3em] mb-6">CONNECT</p>
            <div className="space-y-4">
              <a
                href="mailto:contact@pitrecords.org"
                className="flex items-center gap-3 text-white/50 text-sm hover:text-white transition-colors duration-300"
              >
                <Mail className="w-4 h-4" />
                contact@pitrecords.org
              </a>
              <a
                href="https://instagram.com/thepit_off"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/50 text-sm hover:text-white transition-colors duration-300"
              >
                <Instagram className="w-4 h-4" />
                @thepit_off
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-white/5"
        >
          <p className="text-white/20 text-xs tracking-[0.2em]">
            © 2025 PIT RECORDS. ALL RIGHTS RESERVED.
          </p>
          <p className="text-white/10 text-xs tracking-[0.2em]">
            PITRECORDS.ORG
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
