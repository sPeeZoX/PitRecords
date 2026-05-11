"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface MobileMenuProps {
  links: { href: string; label: string }[];
  onClose: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function MobileMenu({ links, onClose }: MobileMenuProps) {
  return (
    <motion.div
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-40 bg-black flex flex-col justify-between px-8 md:px-16 pt-28 pb-12"
    >
      {/* Nav links */}
      <motion.ul
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex flex-col gap-3"
      >
        {links.map((link) => (
          <motion.li key={link.href} variants={itemVariants}>
            <Link
              href={link.href}
              onClick={onClose}
              className="block text-5xl md:text-7xl font-bold tracking-tighter text-white/70 hover:text-white transition-colors duration-200 leading-tight"
            >
              {link.label}
            </Link>
          </motion.li>
        ))}
      </motion.ul>

      {/* Bottom row: logo + contact info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.5 }}
        className="flex items-end justify-between"
      >
        <Image
          src="/logo-white.png"
          alt="PIT RECORDS"
          width={80}
          height={40}
          className="h-8 w-auto object-contain opacity-20"
        />
        <div className="text-right">
          <p className="text-white/20 text-xs tracking-[0.3em]">© 2025 PIT RECORDS</p>
          <p className="text-white/20 text-xs tracking-[0.2em] mt-1">PITRECORDS.ORG</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
