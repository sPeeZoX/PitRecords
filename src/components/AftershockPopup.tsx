"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function AftershockPopup() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.toLowerCase().includes("aftershock")) return;

    const dismissed = localStorage.getItem("aftershock-popup-v1");
    if (dismissed) return;

    const timer = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(timer);
  }, [pathname]);

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem("aftershock-popup-v1", "1");
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 40, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 40, y: 20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-50 w-72 bg-black border border-white/10 overflow-hidden shadow-2xl"
        >
          <button
            onClick={dismiss}
            className="absolute top-3 right-3 z-10 text-white/30 hover:text-white transition-colors duration-200 p-1"
            aria-label="Close"
          >
            <X className="w-3 h-3" />
          </button>

          <div className="relative w-full aspect-square">
            <Image
              src="/images/aftershock-cover.png"
              alt="AFTERSHOCK"
              fill
              className="object-cover"
              sizes="288px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>

          <div className="p-5">
            <p className="text-white/30 text-[10px] tracking-[0.4em] mb-1">MUZZZ · EP</p>
            <h3 className="text-xl font-bold tracking-tight mb-1">AFTERSHOCK</h3>
            <p className="text-white/30 text-[10px] tracking-[0.3em] mb-5">
              MIDNIGHT · 16.05.2026
            </p>
            <Link
              href="/releases/AFTERSHOCK"
              onClick={dismiss}
              className="block w-full text-center bg-white text-black text-[10px] tracking-[0.35em] px-4 py-3 hover:bg-white/90 transition-colors font-semibold"
            >
              PRESAVE NOW
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
