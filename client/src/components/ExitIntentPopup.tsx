/*
 * DESIGN: Sabor Urbano — exit intent popup with flame orange CTA
 */
import { useEffect, useState } from "react";

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !dismissed) {
        setVisible(true);
      }
    };
    document.addEventListener("mouseleave", onMouseLeave);
    return () => document.removeEventListener("mouseleave", onMouseLeave);
  }, [dismissed]);

  const dismiss = () => {
    setVisible(false);
    setDismissed(true);
  };

  const scrollToForm = () => {
    dismiss();
    setTimeout(() => {
      document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "oklch(0 0 0 / 0.7)", backdropFilter: "blur(4px)" }}
      onClick={dismiss}
    >
      <div
        className="relative max-w-md w-full mx-4 rounded-xl overflow-hidden animate-fade-up"
        style={{
          background: "oklch(0.18 0.04 55)",
          border: "1px solid oklch(0.62 0.22 38 / 0.5)",
          boxShadow: "0 24px 60px oklch(0 0 0 / 0.6)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent bar */}
        <div style={{ height: "4px", background: "linear-gradient(90deg, oklch(0.62 0.22 38), oklch(0.85 0.18 85))" }} />

        <div className="p-8 text-center">
          <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🌮</div>
          <h3
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "1.5rem",
              color: "oklch(0.96 0.01 80)",
              marginBottom: "0.5rem",
            }}
          >
            Wait! Don't Leave Hungry
          </h3>
          <p
            style={{
              fontFamily: "'Nunito Sans', sans-serif",
              color: "oklch(0.75 0.02 80)",
              marginBottom: "1.5rem",
              fontSize: "0.95rem",
            }}
          >
            Grab <strong style={{ color: "oklch(0.85 0.18 85)" }}>10% off your first order</strong> before you go. Fresh Latin flavours are waiting for you.
          </p>
          <button onClick={scrollToForm} className="btn-cta btn-cta-pulse w-full justify-center" style={{ fontSize: "1rem" }}>
            🎉 Claim My 10% Discount
          </button>
          <button
            onClick={dismiss}
            style={{
              marginTop: "1rem",
              background: "none",
              border: "none",
              color: "oklch(0.55 0.02 80)",
              fontSize: "0.8rem",
              cursor: "pointer",
              fontFamily: "'Nunito Sans', sans-serif",
            }}
          >
            No thanks, I'll pay full price
          </button>
        </div>
      </div>
    </div>
  );
}
