import { Star, Quote } from "lucide-react";
import { testimonials } from "../../data/siteData";

const Testimonials = () => {
  return (
    <section className="section-shell" style={{ position: "relative" }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 80% 60% at 30% 50%, rgba(201,168,76,0.04), transparent 60%)",
      }} />

      <div className="container-shell" style={{ position: "relative" }}>
        <div className="section-head" style={{ textAlign: "center" }}>
          <div className="section-kicker" style={{ margin: "0 auto 0.75rem" }}>💬 Testimonials</div>
          <h2 className="section-title" style={{ marginBottom: "0.5rem" }}>
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="section-description" style={{ margin: "0 auto" }}>Real stories from happy homeowners who found their dream property through HavenSphere.</p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1.5rem",
        }}>
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className="card-surface"
              style={{
                padding: "1.75rem",
                position: "relative",
                animation: "var(--animate-fade-up)",
                animationDelay: `${i * 0.1}s`,
                opacity: 0,
              }}
            >
              <Quote size={24} style={{
                color: "rgba(201,168,76,0.15)",
                position: "absolute", top: 16, right: 16,
              }} />

              {/* Stars */}
              <div style={{ display: "flex", gap: "0.125rem", marginBottom: "1rem" }}>
                {Array.from({ length: 5 }, (_, j) => (
                  <Star
                    key={j}
                    size={16}
                    style={{
                      color: j < t.rating ? "#c9a84c" : "var(--color-text-muted)",
                      fill: j < t.rating ? "#c9a84c" : "none",
                    }}
                  />
                ))}
              </div>

              <p style={{
                fontSize: "0.9375rem", color: "var(--color-text-secondary)",
                lineHeight: 1.7, marginBottom: "1.25rem",
                fontStyle: "italic",
              }}>
                "{t.text}"
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700, fontSize: "0.875rem", color: "#0a0e1a",
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
