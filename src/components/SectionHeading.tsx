"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  label?: string;
  title: string;
  className?: string;
}

export default function SectionHeading({ label, title, className = "" }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-12 md:mb-20 ${className}`}
    >
      {label && (
        <p className="text-white/30 text-xs tracking-[0.4em] font-medium uppercase mb-4">
          {label}
        </p>
      )}
      <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none">
        {title}
      </h2>
    </motion.div>
  );
}
