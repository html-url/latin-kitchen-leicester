/*
 * DESIGN PHILOSOPHY: Sabor Urbano — Urban Latin Fusion
 * Dark espresso (#1C1008) base, flame orange (#FF6B2B) CTAs, golden yellow (#FFD23F) accents.
 * Syne (display) + Nunito Sans (body). Diagonal section dividers, high-contrast, conversion-focused.
 *
 * SECTIONS:
 * 1. Hero — full-bleed food image, headline, CTA, trust badges
 * 2. Social Proof — reviews + hygiene badge
 * 3. Menu Highlights — food cards with images
 * 4. Why Latin Kitchen — differentiation
 * 5. Lead Capture — 10% off form (CRITICAL)
 * 6. Location — map embed + directions
 * 7. CTA Strip — urgency repeat
 * 8. Footer
 */

import { useState, useRef, useEffect } from "react";
import StickyHeader from "@/components/StickyHeader";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import { MapView } from "@/components/Map";
import { toast } from "sonner";

// Asset URLs
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663533711603/kmEmeLQDAVu74ynNDpVKzD/hero-food-FNeeJqU4Bdqju8H9reDWnh.webp";
const TACOS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663533711603/kmEmeLQDAVu74ynNDpVKzD/tacos-closeup-gYLqygtevGNii6PVQ6Na8t.webp";
const PLANTAINS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663533711603/kmEmeLQDAVu74ynNDpVKzD/plantains-bowl-DbLjaV8Va9qDk9WYnVKCFh.webp";
const BURRITO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663533711603/kmEmeLQDAVu74ynNDpVKzD/burrito-wrap-M5QZrjZq8RPw5wvxVg27dq.webp";
const RESTAURANT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663533711603/kmEmeLQDAVu74ynNDpVKzD/restaurant-vibe-PQYF5AAZVEhoi6rQLMwGMs.webp";

// Intersection observer hook for scroll animations
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function AnimatedSection({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.65s ease, transform 0.65s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── HERO SECTION ────────────────────────────────────────────────────────────
function HeroSection() {
  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "oklch(0.14 0.04 55)",
      }}
    >
      {/* Background food image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${HERO_IMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          opacity: 0.35,
        }}
      />
      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(105deg, oklch(0.14 0.04 55 / 0.97) 0%, oklch(0.14 0.04 55 / 0.85) 50%, oklch(0.14 0.04 55 / 0.4) 100%)",
        }}
      />

      <div className="container relative z-10" style={{ paddingTop: "7rem", paddingBottom: "5rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Left: Copy */}
          <div>
            {/* Urgency badge */}
            <div
              className="animate-slide-left"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                background: "oklch(0.62 0.22 38 / 0.15)",
                border: "1px solid oklch(0.62 0.22 38 / 0.5)",
                borderRadius: "9999px",
                padding: "0.35rem 1rem",
                marginBottom: "1.5rem",
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "oklch(0.85 0.18 85)",
                fontFamily: "'Syne', sans-serif",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              ⚡ Limited-Time Offer — 10% Off First Order
            </div>

            <h1
              className="section-headline animate-slide-left"
              style={{
                fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
                color: "oklch(0.99 0.01 85)",
                marginBottom: "1.25rem",
                animationDelay: "0.1s",
                opacity: 0,
                animationFillMode: "forwards",
              }}
            >
              Authentic Latin American{" "}
              <span style={{ color: "oklch(0.85 0.18 85)" }}>Street Food</span>{" "}
              in the Heart of Leicester
            </h1>

            <p
              className="animate-slide-left"
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: "1.1rem",
                color: "oklch(0.78 0.02 80)",
                lineHeight: 1.7,
                marginBottom: "2rem",
                maxWidth: "520px",
                animationDelay: "0.2s",
                opacity: 0,
                animationFillMode: "forwards",
              }}
            >
              Fresh, bold, and homemade South American & Mexican dishes — fast, affordable, and packed with flavour.
            </p>

            {/* CTA Button */}
            <div
              className="animate-slide-left"
              style={{ marginBottom: "2rem", animationDelay: "0.3s", opacity: 0, animationFillMode: "forwards" }}
            >
              <button
                onClick={scrollToForm}
                className="btn-cta btn-cta-pulse"
                style={{ fontSize: "1.05rem", padding: "1rem 2.2rem" }}
              >
                🎉 Get 10% Off Your First Order
              </button>
            </div>

            {/* Trust Badges */}
            <div
              className="animate-slide-left"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.6rem",
                animationDelay: "0.4s",
                opacity: 0,
                animationFillMode: "forwards",
              }}
            >
              <span className="trust-badge">⭐ 5-Star Hygiene Rated</span>
              <span className="trust-badge">🌱 Vegan & Gluten-Free Options</span>
              <span className="trust-badge">🥙 Fresh Made Daily</span>
            </div>
          </div>

          {/* Right: Food image card */}
          <div
            className="animate-slide-right"
            style={{
              position: "relative",
              opacity: 0,
              animationFillMode: "forwards",
              animationDelay: "0.2s",
            }}
          >
            <div
              style={{
                borderRadius: "1rem",
                overflow: "hidden",
                boxShadow: "0 32px 80px oklch(0 0 0 / 0.6), 0 0 0 1px oklch(0.62 0.22 38 / 0.2)",
                position: "relative",
              }}
            >
              <img
                src={HERO_IMG}
                alt="Authentic Latin American food spread — tacos, burritos, plantains"
                style={{ width: "100%", display: "block", aspectRatio: "4/3", objectFit: "cover" }}
              />
              {/* Overlay badge */}
              <div
                style={{
                  position: "absolute",
                  bottom: "1rem",
                  left: "1rem",
                  background: "oklch(0.14 0.04 55 / 0.9)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid oklch(0.62 0.22 38 / 0.4)",
                  borderRadius: "0.5rem",
                  padding: "0.6rem 1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span style={{ fontSize: "1.2rem" }}>🏆</span>
                <div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "oklch(0.85 0.18 85)" }}>
                    Food Hygiene Rating
                  </div>
                  <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.75rem", color: "oklch(0.75 0.02 80)" }}>
                    ⭐⭐⭐⭐⭐ 5 / 5 — Very Good
                  </div>
                </div>
              </div>
            </div>

            {/* Floating accent */}
            <div
              style={{
                position: "absolute",
                top: "-1rem",
                right: "-1rem",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "oklch(0.62 0.22 38 / 0.15)",
                border: "2px solid oklch(0.62 0.22 38 / 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
              }}
            >
              🌮
            </div>
          </div>
        </div>
      </div>

      {/* Bottom diagonal */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "80px",
          background: "oklch(0.18 0.04 55)",
          clipPath: "polygon(0 100%, 100% 0, 100% 100%)",
        }}
      />

      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

// ─── SOCIAL PROOF SECTION ────────────────────────────────────────────────────
function SocialProofSection() {
  const reviews = [
    { text: "Fresh, authentic, and full of flavour every time. Best street food in Leicester!", author: "Sarah M.", stars: 5 },
    { text: "Hidden gem — amazing food and the friendliest owner. I come back every week.", author: "James T.", stars: 5 },
    { text: "Best Latin food in Leicester, hands down. The tacos are absolutely incredible.", author: "Priya K.", stars: 5 },
  ];

  return (
    <section
      id="reviews"
      style={{
        background: "oklch(0.18 0.04 55)",
        paddingTop: "5rem",
        paddingBottom: "5rem",
      }}
    >
      <div className="container">
        <AnimatedSection style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ fontFamily: "'Syne', sans-serif", color: "oklch(0.62 0.22 38)", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            What Locals Are Saying
          </p>
          <h2 className="section-headline" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "oklch(0.96 0.01 80)" }}>
            Loved by <span style={{ color: "oklch(0.85 0.18 85)" }}>Leicester Locals</span>
          </h2>
        </AnimatedSection>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
            marginBottom: "3rem",
          }}
        >
          {reviews.map((review, i) => (
            <AnimatedSection
              key={i}
              style={{
                background: "oklch(0.22 0.04 55)",
                border: "1px solid oklch(0.28 0.04 55)",
                borderRadius: "0.75rem",
                padding: "1.75rem",
                position: "relative",
                transition: "border-color 0.2s, transform 0.2s",
              }}
            >
              <div style={{ fontSize: "1.1rem", marginBottom: "0.75rem" }}>
                {"⭐".repeat(review.stars)}
              </div>
              <p
                style={{
                  fontFamily: "'Nunito Sans', sans-serif",
                  fontSize: "1rem",
                  color: "oklch(0.85 0.02 80)",
                  lineHeight: 1.65,
                  marginBottom: "1rem",
                  fontStyle: "italic",
                }}
              >
                "{review.text}"
              </p>
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  color: "oklch(0.62 0.22 38)",
                }}
              >
                — {review.author}
              </div>
              {/* Decorative quote mark */}
              <div
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1.25rem",
                  fontSize: "3rem",
                  color: "oklch(0.62 0.22 38 / 0.12)",
                  fontFamily: "serif",
                  lineHeight: 1,
                  userSelect: "none",
                }}
              >
                "
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Trust reinforcement */}
        <AnimatedSection>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                background: "oklch(0.22 0.04 55)",
                border: "1px solid oklch(0.85 0.18 85 / 0.3)",
                borderRadius: "0.5rem",
                padding: "0.75rem 1.5rem",
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>🏆</span>
              <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "oklch(0.85 0.18 85)" }}>
                  5-Star Food Hygiene Rating
                </div>
                <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.78rem", color: "oklch(0.65 0.02 80)" }}>
                  Rated "Very Good" by Leicester City Council
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                background: "oklch(0.22 0.04 55)",
                border: "1px solid oklch(0.62 0.22 38 / 0.3)",
                borderRadius: "0.5rem",
                padding: "0.75rem 1.5rem",
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>❤️</span>
              <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "oklch(0.96 0.01 80)" }}>
                  Regular Local Customers
                </div>
                <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.78rem", color: "oklch(0.65 0.02 80)" }}>
                  Growing through word-of-mouth & community love
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── MENU HIGHLIGHTS SECTION ─────────────────────────────────────────────────
function MenuSection() {
  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const menuItems = [
    {
      emoji: "🌮",
      name: "Tacos & Burritos",
      desc: "Corn tortillas or flour wraps loaded with seasoned meat, fresh salsa, avocado, and cilantro.",
      img: TACOS_IMG,
      tag: "Most Popular",
    },
    {
      emoji: "🍗",
      name: "Pollo a la Plancha",
      desc: "Grilled chicken marinated in Latin spices, served with rice, beans, and fresh sides.",
      img: RESTAURANT_IMG,
      tag: "House Special",
    },
    {
      emoji: "🍌",
      name: "Patacones",
      desc: "Golden crispy fried plantains — naturally gluten-free, perfectly salted, utterly addictive.",
      img: PLANTAINS_IMG,
      tag: "Gluten-Free",
    },
    {
      emoji: "🌯",
      name: "Wraps & Rice Bowls",
      desc: "Fresh wraps and vibrant rice bowls with black beans, corn, salsa, and your choice of protein.",
      img: BURRITO_IMG,
      tag: "Vegan Option",
    },
  ];

  return (
    <section
      id="menu"
      style={{
        background: "oklch(0.14 0.04 55)",
        paddingTop: "6rem",
        paddingBottom: "6rem",
        position: "relative",
      }}
    >
      {/* Top diagonal */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "80px",
          background: "oklch(0.18 0.04 55)",
          clipPath: "polygon(0 0, 100% 0, 100% 100%)",
          zIndex: 1,
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <AnimatedSection style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ fontFamily: "'Syne', sans-serif", color: "oklch(0.62 0.22 38)", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Our Menu
          </p>
          <h2 className="section-headline" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "oklch(0.96 0.01 80)" }}>
            Customer <span style={{ color: "oklch(0.85 0.18 85)" }}>Favourites</span>
          </h2>
          <p style={{ fontFamily: "'Nunito Sans', sans-serif", color: "oklch(0.65 0.02 80)", marginTop: "0.75rem", maxWidth: "500px", margin: "0.75rem auto 0" }}>
            Every dish is made fresh daily with authentic Latin American ingredients and recipes.
          </p>
        </AnimatedSection>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
            marginBottom: "3rem",
          }}
        >
          {menuItems.map((item, i) => (
            <AnimatedSection
              key={i}
              style={{
                background: "oklch(0.18 0.04 55)",
                border: "1px solid oklch(0.28 0.04 55)",
                borderRadius: "0.75rem",
                overflow: "hidden",
                cursor: "default",
              }}
            >
              {/* Food image */}
              <div style={{ position: "relative", overflow: "hidden" }}>
                <img
                  src={item.img}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.4s ease",
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLImageElement).style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => ((e.target as HTMLImageElement).style.transform = "scale(1)")}
                />
                {/* Tag */}
                <div
                  style={{
                    position: "absolute",
                    top: "0.75rem",
                    left: "0.75rem",
                    background: "oklch(0.62 0.22 38)",
                    color: "white",
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.72rem",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    padding: "0.25rem 0.65rem",
                    borderRadius: "9999px",
                  }}
                >
                  {item.tag}
                </div>
              </div>
              <div style={{ padding: "1.25rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <span style={{ fontSize: "1.3rem" }}>{item.emoji}</span>
                  <h3
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 700,
                      fontSize: "1.05rem",
                      color: "oklch(0.96 0.01 80)",
                    }}
                  >
                    {item.name}
                  </h3>
                </div>
                <p
                  style={{
                    fontFamily: "'Nunito Sans', sans-serif",
                    fontSize: "0.88rem",
                    color: "oklch(0.65 0.02 80)",
                    lineHeight: 1.6,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA under menu */}
        <AnimatedSection style={{ textAlign: "center" }}>
          <button onClick={scrollToForm} className="btn-cta" style={{ fontSize: "1rem" }}>
            🎉 Get 10% Off Your First Order
          </button>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── WHY LATIN KITCHEN SECTION ───────────────────────────────────────────────
function WhySection() {
  const reasons = [
    { icon: "🌽", title: "Naturally Gluten-Free", desc: "Our corn-based dishes are naturally gluten-free — no compromises, just authentic flavour." },
    { icon: "🕌", title: "Halal-Conscious", desc: "Prepared with halal-conscious practices so everyone can enjoy with confidence." },
    { icon: "🥗", title: "Vegan Options", desc: "Plenty of plant-based choices packed with flavour — not an afterthought." },
    { icon: "🇲🇽", title: "Truly Authentic", desc: "Real Latin American recipes, not generic fast food. Every bite tells a story." },
    { icon: "⚡", title: "Fast & Affordable", desc: "Premium flavours at street-food prices. Eat well without breaking the bank." },
    { icon: "🌱", title: "Fresh Every Day", desc: "Made fresh daily from quality ingredients. No shortcuts, no frozen shortcuts." },
  ];

  return (
    <section
      id="about"
      style={{
        background: "oklch(0.18 0.04 55)",
        paddingTop: "6rem",
        paddingBottom: "6rem",
        position: "relative",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
          }}
          className="why-grid"
        >
          {/* Left: Image */}
          <AnimatedSection>
            <div
              style={{
                borderRadius: "1rem",
                overflow: "hidden",
                boxShadow: "0 24px 60px oklch(0 0 0 / 0.5)",
                position: "relative",
              }}
            >
              <img
                src={RESTAURANT_IMG}
                alt="Latin Kitchen Leicester restaurant interior"
                style={{ width: "100%", display: "block", aspectRatio: "4/3", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, oklch(0.14 0.04 55 / 0.6) 0%, transparent 60%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "1.25rem",
                  left: "1.25rem",
                  right: "1.25rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: "1.1rem",
                    color: "white",
                    marginBottom: "0.25rem",
                  }}
                >
                  Leicester City Centre
                </div>
                <div
                  style={{
                    fontFamily: "'Nunito Sans', sans-serif",
                    fontSize: "0.85rem",
                    color: "oklch(0.85 0.18 85)",
                  }}
                >
                  📍 9, Leicester LE1 5HJ — Easy access from shopping district
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right: Reasons */}
          <div>
            <AnimatedSection style={{ marginBottom: "2rem" }}>
              <p style={{ fontFamily: "'Syne', sans-serif", color: "oklch(0.62 0.22 38)", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                Why Choose Us
              </p>
              <h2 className="section-headline" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: "oklch(0.96 0.01 80)" }}>
                Why <span style={{ color: "oklch(0.85 0.18 85)" }}>Latin Kitchen?</span>
              </h2>
            </AnimatedSection>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {reasons.map((r, i) => (
                <AnimatedSection
                  key={i}
                  style={{
                    background: "oklch(0.22 0.04 55)",
                    border: "1px solid oklch(0.28 0.04 55)",
                    borderRadius: "0.625rem",
                    padding: "1.1rem",
                    transition: "border-color 0.2s",
                  }}
                >
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.4rem" }}>{r.icon}</div>
                  <div
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      color: "oklch(0.96 0.01 80)",
                      marginBottom: "0.3rem",
                    }}
                  >
                    {r.title}
                  </div>
                  <p
                    style={{
                      fontFamily: "'Nunito Sans', sans-serif",
                      fontSize: "0.8rem",
                      color: "oklch(0.62 0.02 80)",
                      lineHeight: 1.5,
                    }}
                  >
                    {r.desc}
                  </p>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .why-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ─── CTA STRIP ───────────────────────────────────────────────────────────────
function CTAStrip({ id }: { id?: string }) {
  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id={id}
      style={{
        background: "linear-gradient(135deg, oklch(0.62 0.22 38) 0%, oklch(0.52 0.22 38) 100%)",
        padding: "3.5rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle at 20% 50%, oklch(1 0 0 / 0.06) 0%, transparent 50%), radial-gradient(circle at 80% 50%, oklch(1 0 0 / 0.06) 0%, transparent 50%)",
        }}
      />
      <div className="container" style={{ position: "relative", textAlign: "center" }}>
        <div style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>🌮</div>
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
            color: "white",
            marginBottom: "0.5rem",
          }}
        >
          Ready to Taste the Difference?
        </h2>
        <p
          style={{
            fontFamily: "'Nunito Sans', sans-serif",
            color: "oklch(1 0 0 / 0.85)",
            marginBottom: "1.75rem",
            fontSize: "1rem",
          }}
        >
          Limited-time offer — claim your 10% discount before it expires.
        </p>
        <button
          onClick={scrollToForm}
          style={{
            background: "white",
            color: "oklch(0.52 0.22 38)",
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "1rem",
            padding: "0.9rem 2rem",
            borderRadius: "0.375rem",
            border: "none",
            cursor: "pointer",
            transition: "transform 0.15s, box-shadow 0.2s",
            boxShadow: "0 4px 20px oklch(0 0 0 / 0.2)",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.transform = "translateY(-2px)";
            (e.target as HTMLElement).style.boxShadow = "0 8px 28px oklch(0 0 0 / 0.3)";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.transform = "translateY(0)";
            (e.target as HTMLElement).style.boxShadow = "0 4px 20px oklch(0 0 0 / 0.2)";
          }}
        >
          🎉 Get 10% Off Your First Order
        </button>
      </div>
    </section>
  );
}

// ─── LEAD CAPTURE SECTION ────────────────────────────────────────────────────
function LeadCaptureSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Please enter your name and email.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("🎉 Your 10% discount is on its way!");
    }, 1200);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "oklch(0.22 0.04 55)",
    border: "1px solid oklch(0.32 0.04 55)",
    borderRadius: "0.375rem",
    padding: "0.85rem 1rem",
    color: "oklch(0.96 0.01 80)",
    fontFamily: "'Nunito Sans', sans-serif",
    fontSize: "0.95rem",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  return (
    <section
      id="lead-form"
      style={{
        background: "oklch(0.14 0.04 55)",
        paddingTop: "6rem",
        paddingBottom: "6rem",
        position: "relative",
      }}
    >
      {/* Top diagonal */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "80px",
          background: "oklch(0.18 0.04 55)",
          clipPath: "polygon(0 0, 100% 0, 0 100%)",
          zIndex: 1,
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div
          style={{
            maxWidth: "560px",
            margin: "0 auto",
          }}
        >
          <AnimatedSection style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                background: "oklch(0.62 0.22 38 / 0.15)",
                border: "1px solid oklch(0.62 0.22 38 / 0.4)",
                borderRadius: "9999px",
                padding: "0.35rem 1rem",
                marginBottom: "1rem",
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "oklch(0.85 0.18 85)",
                fontFamily: "'Syne', sans-serif",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              ⚡ Limited-Time Offer
            </div>
            <h2 className="section-headline" style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", color: "oklch(0.96 0.01 80)", marginBottom: "0.75rem" }}>
              Unlock <span style={{ color: "oklch(0.62 0.22 38)" }}>10% Off</span> Your First Meal
            </h2>
            <p style={{ fontFamily: "'Nunito Sans', sans-serif", color: "oklch(0.65 0.02 80)", fontSize: "0.95rem" }}>
              Join our community and get exclusive deals, new menu drops, and your first-order discount.
            </p>
          </AnimatedSection>

          {submitted ? (
            <AnimatedSection>
              <div
                style={{
                  background: "oklch(0.22 0.04 55)",
                  border: "1px solid oklch(0.62 0.22 38 / 0.5)",
                  borderRadius: "1rem",
                  padding: "3rem 2rem",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎉</div>
                <h3
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: "1.4rem",
                    color: "oklch(0.85 0.18 85)",
                    marginBottom: "0.75rem",
                  }}
                >
                  You're In! Discount Unlocked
                </h3>
                <p
                  style={{
                    fontFamily: "'Nunito Sans', sans-serif",
                    color: "oklch(0.75 0.02 80)",
                    fontSize: "0.95rem",
                    lineHeight: 1.65,
                  }}
                >
                  Check your inbox for your <strong style={{ color: "oklch(0.96 0.01 80)" }}>10% off code</strong>. We'll also keep you updated on new menu drops and exclusive deals.
                </p>
                <div style={{ marginTop: "1.5rem", fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.85rem", color: "oklch(0.55 0.02 80)" }}>
                  📍 Come visit us at 9, Leicester LE1 5HJ
                </div>
              </div>
            </AnimatedSection>
          ) : (
            <AnimatedSection>
              <form
                onSubmit={handleSubmit}
                style={{
                  background: "oklch(0.18 0.04 55)",
                  border: "1px solid oklch(0.28 0.04 55)",
                  borderRadius: "1rem",
                  padding: "2.5rem",
                  boxShadow: "0 16px 50px oklch(0 0 0 / 0.3)",
                }}
              >
                <div style={{ marginBottom: "1.25rem" }}>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      color: "oklch(0.75 0.02 80)",
                      marginBottom: "0.4rem",
                    }}
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sarah"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    style={inputStyle}
                    className="input-flame"
                  />
                </div>

                <div style={{ marginBottom: "1.25rem" }}>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      color: "oklch(0.75 0.02 80)",
                      marginBottom: "0.4rem",
                    }}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    style={inputStyle}
                    className="input-flame"
                  />
                </div>

                <div style={{ marginBottom: "1.75rem" }}>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      color: "oklch(0.75 0.02 80)",
                      marginBottom: "0.4rem",
                    }}
                  >
                    Phone Number{" "}
                    <span style={{ fontWeight: 400, color: "oklch(0.5 0.02 80)" }}>(optional)</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="07xxx xxxxxx"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    style={inputStyle}
                    className="input-flame"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-cta btn-cta-pulse"
                  style={{ width: "100%", justifyContent: "center", fontSize: "1rem", opacity: loading ? 0.8 : 1 }}
                >
                  {loading ? "⏳ Sending..." : "🎉 Get My Discount"}
                </button>

                <p
                  style={{
                    textAlign: "center",
                    marginTop: "1rem",
                    fontFamily: "'Nunito Sans', sans-serif",
                    fontSize: "0.78rem",
                    color: "oklch(0.5 0.02 80)",
                  }}
                >
                  🔒 No spam. Just offers, new menu drops & exclusive deals.
                </p>
              </form>
            </AnimatedSection>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── LOCATION SECTION ────────────────────────────────────────────────────────
function LocationSection() {
  const [mapReady, setMapReady] = useState(false);

  return (
    <section
      id="location"
      style={{
        background: "oklch(0.18 0.04 55)",
        paddingTop: "5rem",
        paddingBottom: "5rem",
      }}
    >
      <div className="container">
        <AnimatedSection style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ fontFamily: "'Syne', sans-serif", color: "oklch(0.62 0.22 38)", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Find Us
          </p>
          <h2 className="section-headline" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "oklch(0.96 0.01 80)" }}>
            Visit Us <span style={{ color: "oklch(0.85 0.18 85)" }}>Today</span>
          </h2>
        </AnimatedSection>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.5fr",
            gap: "2.5rem",
            alignItems: "start",
          }}
          className="location-grid"
        >
          {/* Info panel */}
          <AnimatedSection>
            <div
              style={{
                background: "oklch(0.22 0.04 55)",
                border: "1px solid oklch(0.28 0.04 55)",
                borderRadius: "0.75rem",
                padding: "2rem",
              }}
            >
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem", color: "oklch(0.85 0.18 85)", marginBottom: "0.5rem" }}>
                  📍 Address
                </div>
                <p style={{ fontFamily: "'Nunito Sans', sans-serif", color: "oklch(0.85 0.02 80)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                  9, Leicester LE1 5HJ<br />
                  Inside Leicester city centre arcade<br />
                  <span style={{ color: "oklch(0.65 0.02 80)", fontSize: "0.85rem" }}>🚶 Easy access from shopping district</span>
                </p>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem", color: "oklch(0.85 0.18 85)", marginBottom: "0.5rem" }}>
                  📞 Phone
                </div>
                <a
                  href="tel:07948758037"
                  style={{
                    fontFamily: "'Nunito Sans', sans-serif",
                    color: "oklch(0.62 0.22 38)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  07948 758037
                </a>
              </div>

              <div style={{ marginBottom: "2rem" }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem", color: "oklch(0.85 0.18 85)", marginBottom: "0.5rem" }}>
                  🕐 Opening Hours
                </div>
                <div style={{ fontFamily: "'Nunito Sans', sans-serif", color: "oklch(0.75 0.02 80)", fontSize: "0.9rem", lineHeight: 1.8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Monday – Friday</span>
                    <span style={{ color: "oklch(0.85 0.02 80)" }}>11:00 – 21:00</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Saturday</span>
                    <span style={{ color: "oklch(0.85 0.02 80)" }}>11:00 – 21:00</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Sunday</span>
                    <span style={{ color: "oklch(0.65 0.02 80)" }}>Closed</span>
                  </div>
                </div>
              </div>

              <a
                href="https://www.google.com/maps/place/9,+Latin+Kitchen,+Leicester+LE1+5HJ"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta"
                style={{ width: "100%", justifyContent: "center", fontSize: "0.9rem" }}
              >
                🗺️ Get Directions on Google Maps
              </a>
            </div>
          </AnimatedSection>

          {/* Map */}
          <AnimatedSection>
            <div
              style={{
                borderRadius: "0.75rem",
                overflow: "hidden",
                border: "1px solid oklch(0.28 0.04 55)",
                height: "380px",
                position: "relative",
              }}
            >
              <MapView
                initialCenter={{ lat: 52.6369, lng: -1.1398 }}
                initialZoom={16}
                className="w-full h-full"
                onMapReady={(map) => {
                  setMapReady(true);
                  const latLng = { lat: 52.6369, lng: -1.1398 };
                  new google.maps.marker.AdvancedMarkerElement({
                    position: latLng,
                    map,
                    title: "Latin Kitchen Leicester",
                  });
                }}
              />
              {!mapReady && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "oklch(0.22 0.04 55)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "oklch(0.65 0.02 80)",
                    fontFamily: "'Nunito Sans', sans-serif",
                  }}
                >
                  Loading map...
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .location-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer() {
  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      style={{
        background: "oklch(0.11 0.04 55)",
        borderTop: "1px solid oklch(0.22 0.04 55)",
        paddingTop: "3rem",
        paddingBottom: "2rem",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2.5rem",
            marginBottom: "2.5rem",
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "1.3rem",
                color: "oklch(0.85 0.18 85)",
                marginBottom: "0.5rem",
              }}
            >
              Latin Kitchen
            </div>
            <div
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: "0.85rem",
                color: "oklch(0.55 0.02 80)",
                marginBottom: "1rem",
                lineHeight: 1.6,
              }}
            >
              Authentic Latin American & Mexican street food in the heart of Leicester.
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "oklch(0.22 0.04 55)",
                  border: "1px solid oklch(0.28 0.04 55)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1rem",
                  textDecoration: "none",
                  transition: "border-color 0.2s",
                }}
              >
                📸
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "0.85rem",
                color: "oklch(0.75 0.02 80)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              Contact
            </div>
            <div
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: "0.88rem",
                color: "oklch(0.6 0.02 80)",
                lineHeight: 1.8,
              }}
            >
              <div>📍 9, Leicester LE1 5HJ</div>
              <div>
                📞{" "}
                <a href="tel:07948758037" style={{ color: "oklch(0.62 0.22 38)", textDecoration: "none" }}>
                  07948 758037
                </a>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "0.85rem",
                color: "oklch(0.75 0.02 80)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              Opening Hours
            </div>
            <div
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: "0.88rem",
                color: "oklch(0.6 0.02 80)",
                lineHeight: 1.8,
              }}
            >
              <div>Mon – Fri: 11:00 – 21:00</div>
              <div>Saturday: 11:00 – 21:00</div>
              <div style={{ color: "oklch(0.45 0.02 80)" }}>Sunday: Closed</div>
            </div>
          </div>

          {/* CTA */}
          <div>
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "0.85rem",
                color: "oklch(0.75 0.02 80)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              Special Offer
            </div>
            <p
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: "0.85rem",
                color: "oklch(0.6 0.02 80)",
                marginBottom: "1rem",
                lineHeight: 1.6,
              }}
            >
              First-time customer? Get 10% off your first order.
            </p>
            <button
              onClick={scrollToForm}
              className="btn-cta"
              style={{ fontSize: "0.82rem", padding: "0.6rem 1.2rem" }}
            >
              🎉 Claim Discount
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid oklch(0.18 0.04 55)",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <div
            style={{
              fontFamily: "'Nunito Sans', sans-serif",
              fontSize: "0.78rem",
              color: "oklch(0.42 0.02 80)",
            }}
          >
            © {new Date().getFullYear()} Latin Kitchen Leicester. All rights reserved.
          </div>
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
            }}
          >
            {["⭐ 5-Star Hygiene", "🌱 Vegan Options", "🕌 Halal-Conscious"].map((badge) => (
              <span
                key={badge}
                style={{
                  fontFamily: "'Nunito Sans', sans-serif",
                  fontSize: "0.72rem",
                  color: "oklch(0.5 0.02 80)",
                  background: "oklch(0.16 0.04 55)",
                  padding: "0.2rem 0.6rem",
                  borderRadius: "9999px",
                  border: "1px solid oklch(0.22 0.04 55)",
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── MAIN HOME PAGE ───────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div style={{ background: "oklch(0.14 0.04 55)", minHeight: "100vh" }}>
      <StickyHeader />
      <ExitIntentPopup />

      <HeroSection />
      <SocialProofSection />
      <MenuSection />
      <CTAStrip />
      <WhySection />
      <LeadCaptureSection />
      <LocationSection />
      <CTAStrip id="cta-bottom" />
      <Footer />
    </div>
  );
}
