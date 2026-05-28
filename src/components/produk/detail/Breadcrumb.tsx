import Link from "next/link";

type Item = { label: string; href?: string };

export default function Breadcrumb({ items }: { items: Item[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        fontFamily: "var(--font-dm-mono)",
        fontSize: "0.78rem",
        color: "var(--text-muted)",
        marginBottom: "1.5rem",
      }}
    >
      <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  style={{ color: "var(--text-sub)", textDecoration: "none" }}
                >
                  {item.label}
                </Link>
              ) : (
                <span style={{ color: isLast ? "var(--text)" : "var(--text-sub)" }} aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast && <span aria-hidden>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
