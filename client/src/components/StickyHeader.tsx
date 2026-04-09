/*
 * DESIGN: Sabor Urbano — sticky header fades in on scroll, flame orange CTA always visible
 */
import { useEffect, useState } from "react";

export default function StickyHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "oklch(0.14 0.04 55 / 0.97)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid oklch(0.28 0.04 55)" : "none",
        transform: scrolled ? "translateY(0)" : "translateY(0)",
        boxShadow: scrolled ? "0 2px 20px oklch(0 0 0 / 0.4)" : "none",
      }}
    >
      <div className="container flex items-center justify-between py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "1.2rem",
              color: "oklch(0.85 0.18 85)",
              letterSpacing: "-0.01em",
            }}
          >
            Latin Kitchen
          </span>
          <span
            style={{
              fontFamily: "'Nunito Sans', sans-serif",
              fontSize: "0.75rem",
              color: "oklch(0.65 0.02 80)",
              fontWeight: 400,
            }}
          >
            Leicester
          </span>
        </div>

        {/* Nav links — desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {["Menu", "About", "Location"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "oklch(0.75 0.02 80)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "oklch(0.96 0.01 80)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "oklch(0.75 0.02 80)")
              }
            >
              {item}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <button onClick={scrollToForm} className="btn-cta" style={{ fontSize: "0.85rem", padding: "0.55rem 1.2rem" }}>
          🎉 Get 10% Off
        </button>
      </div>
    </header>
  );
}
