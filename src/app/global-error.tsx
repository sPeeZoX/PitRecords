"use client";

import { useEffect } from "react";

export default function GlobalError({
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
    <html lang="en">
      <body style={{ background: "#000", color: "#fff", fontFamily: "sans-serif" }}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "24px",
          }}
        >
          <p style={{ opacity: 0.2, fontSize: "11px", letterSpacing: "0.5em", marginBottom: "24px" }}>
            PIT RECORDS
          </p>
          <h2 style={{ fontSize: "clamp(4rem,12vw,10rem)", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.05em", opacity: 0.1, marginBottom: "24px" }}>
            ERROR
          </h2>
          <p style={{ opacity: 0.4, fontSize: "13px", letterSpacing: "0.2em", marginBottom: "48px" }}>
            CRITICAL ERROR — PLEASE RELOAD
          </p>
          <button
            onClick={reset}
            style={{
              fontSize: "11px",
              letterSpacing: "0.3em",
              border: "1px solid rgba(255,255,255,0.2)",
              padding: "16px 32px",
              background: "transparent",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            RELOAD
          </button>
        </div>
      </body>
    </html>
  );
}
