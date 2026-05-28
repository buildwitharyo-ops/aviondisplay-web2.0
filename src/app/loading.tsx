export default function Loading() {
  return (
    <main
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "8rem 1.5rem 6rem",
      }}
    >
      <div
        aria-label="Memuat"
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "2px solid rgba(124,109,255,0.18)",
          borderTopColor: "var(--accent)",
          animation: "avion-spin 0.8s linear infinite",
        }}
      />
      <style>{`@keyframes avion-spin { to { transform: rotate(360deg); } }`}</style>
    </main>
  );
}
