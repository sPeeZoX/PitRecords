"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="text-white/20 text-xs tracking-[0.5em] mb-6">PIT RECORDS</p>
      <h2 className="text-[clamp(4rem,12vw,10rem)] font-bold leading-none tracking-tighter text-white/10 mb-6">
        ERROR
      </h2>
      <p className="text-white/40 text-sm tracking-[0.2em] mb-12">
        SOMETHING WENT WRONG
      </p>
      <div className="flex items-center gap-6">
        <button
          onClick={reset}
          className="text-xs tracking-[0.3em] border border-white/20 px-8 py-4 hover:bg-white hover:text-black transition-all duration-400"
        >
          TRY AGAIN
        </button>
        <Link
          href="/"
          className="text-xs tracking-[0.3em] text-white/40 hover:text-white transition-colors duration-300"
        >
          RETURN HOME
        </Link>
      </div>
    </div>
  );
}
