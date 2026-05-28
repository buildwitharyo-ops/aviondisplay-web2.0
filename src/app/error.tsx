"use client";

import { useEffect } from "react";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "8rem 1.5rem 6rem",
      }}
    >
      <div style={{ maxWidth: 560, width: "100%", textAlign: "center" }}>
        <p
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: "0.78rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--accent-2)",
            margin: "0 0 1rem",
          }}
        >
          Error
        </p>
        <h1
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            color: "var(--text)",
            margin: "0 0 1rem",
          }}
        >
          Terjadi kesalahan
        </h1>
        <p
          style={{
            fontSize: "1rem",
            lineHeight: 1.7,
            color: "var(--text-sub)",
            margin: "0 0 2rem",
          }}
        >
          Maaf, ada masalah saat memuat halaman ini. Coba muat ulang, atau
          hubungi tim AVION jika masalah berlanjut.
        </p>
        <button
          onClick={() => unstable_retry()}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            background: "var(--accent-grad)",
            color: "#fff",
            padding: "0.75rem 1.5rem",
            borderRadius: 10,
            fontSize: "0.9rem",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
          }}
        >
          Coba Lagi
        </button>
      </div>
    </main>
  );
}
