"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";

const TARGET = new Date("2026-05-16T00:00:00").getTime();

function getTimeLeft() {
  const diff = Math.max(0, TARGET - Date.now());
  return {
    hours: Math.floor(diff / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
    done: diff === 0,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function AftershockPopup() {
  const [visible, setVisible] = useState(false);
  const [time, setTime] = useState(getTimeLeft());
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.toLowerCase().includes("aftershock")) return;
    const dismissed = localStorage.getItem("aftershock-popup-v1");
    if (dismissed) return;
    const timer = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

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
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            {/* Countdown overlay on the cover */}
            {!time.done && (
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white/40 text-[9px] tracking-[0.4em] mb-2">DROPPING IN</p>
                <div className="flex items-start gap-1">
                  {[
                    { value: time.hours, label: "H" },
                    { value: time.minutes, label: "M" },
                    { value: time.seconds, label: "S" },
                  ].map(({ value, label }, i) => (
                    <div key={label} className="flex items-start">
                      {i > 0 && (
                        <span className="text-white/30 text-2xl font-bold leading-none mx-0.5 mt-0.5">
                          :
                        </span>
                      )}
                      <div className="flex flex-col items-center">
                        <span className="text-3xl font-bold tabular-nums tracking-tighter leading-none">
                          {pad(value)}
                        </span>
                        <span className="text-white/30 text-[8px] tracking-[0.25em] mt-0.5">
                          {label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="p-5">
            <p className="text-white/30 text-[10px] tracking-[0.4em] mb-1">MUZZZ · EP</p>
            <h3 className="text-xl font-bold tracking-tight mb-4">AFTERSHOCK</h3>

            <Link
              href="/releases/AFTERSHOCK"
              onClick={dismiss}
              className="block w-full text-center bg-white text-black text-[10px] tracking-[0.35em] px-4 py-3 hover:bg-white/90 transition-colors font-semibold"
            >
              {time.done ? "STREAM NOW" : "GET EXCLUSIVE INFO"}
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
