import { useState } from "react";
import { Star, Quote, MessageSquareHeart, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "../../data/siteData";

const Testimonials = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const next = () => setActiveIdx((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActiveIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="section-shell" style={{ position: "relative" }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 80% 60% at 30% 50%, rgba(201,168,76,0.04), transparent 60%)",
      }} />

      <div className="container-shell" style={{ position: "relative" }}>
        <div className="section-head" style={{ textAlign: "center" }}>
          <div className="section-kicker" style={{ margin: "0 auto 0.75rem" }}>
            <MessageSquareHeart size={14} /> Testimonials
          </div>
          <h2 className="section-title" style={{ marginBottom: "0.5rem" }}>
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="section-description" style={{ margin: "0 auto" }}>
            Real stories from happy homeowners who found their dream property through HavenSphere.
          </p>
        </div>

        {/* Desktop grid + Mobile carousel */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
          gap: "1.5rem",
        }} className="testimonial-grid">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              style={{
                padding: "1.75rem",
                position: "relative",
                background: "var(--color-bg-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-lg)",
                animation: "var(--animate-fade-up)",
                animationDelay: `${i * 0.1}s`,
                opacity: 0,
                transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(201,168,76,0.2)";
                e.currentTarget.style.boxShadow = "0 0 30px rgba(201,168,76,0.06)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Quote watermark */}
              <Quote size={60} style={{
                color: "rgba(201,168,76,0.04)",
                position: "absolute", top: -5, right: -5,
                transform: "rotate(10deg)",
              }} />

              {/* Rating */}
              <div style={{ display: "flex", gap: "0.125rem", marginBottom: "1.125rem" }}>
                {Array.from({ length: 5 }, (_, j) => (
                  <Star
                    key={j}
                    size={15}
                    style={{
                      color: j < t.rating ? "#c9a84c" : "var(--color-text-muted)",
                      fill: j < t.rating ? "#c9a84c" : "none",
                    }}
                  />
                ))}
              </div>

              {/* Text */}
              <p style={{
                fontSize: "0.9375rem", color: "var(--color-text-secondary)",
                lineHeight: 1.75, marginBottom: "1.5rem",
                fontStyle: "italic",
                position: "relative",
              }}>
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div style={{
                display: "flex", alignItems: "center", gap: "0.75rem",
                borderTop: "1px solid var(--color-border)",
                paddingTop: "1.25rem",
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700, fontSize: "0.8125rem", color: "#0a0e1a",
                  flexShrink: 0,
                }}>
                  {t.initials}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9375rem", color: "var(--color-text-bright)" }}>{t.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
