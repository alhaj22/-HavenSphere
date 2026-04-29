import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

const CallToAction = () => {
  return (
    <section id="cta" className="section-shell">
      <div className="container-shell">
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "var(--radius-xl)",
            padding: "clamp(3.5rem, 8vw, 5.5rem) clamp(2rem, 5vw, 4rem)",
            textAlign: "center",
            background: `
              linear-gradient(135deg, rgba(201,168,76,0.12) 0%, rgba(10,14,26,0.95) 40%, rgba(10,14,26,0.98) 60%, rgba(224,121,95,0.08) 100%)
            `,
            border: "1px solid rgba(201,168,76,0.12)",
          }}
        >
          {/* Animated decorative elements */}
          <div style={{
            position: "absolute", top: -80, left: -80,
            width: 300, height: 300, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)",
            filter: "blur(40px)",
            animation: "float 8s ease-in-out infinite",
          }} />
          <div style={{
            position: "absolute", bottom: -60, right: -60,
            width: 250, height: 250, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(224,121,95,0.08) 0%, transparent 70%)",
            filter: "blur(40px)",
            animation: "float 10s ease-in-out infinite 2s",
          }} />

          {/* Grid pattern overlay */}
          <div style={{
            position: "absolute", inset: 0, opacity: 0.015,
            backgroundImage: `
              linear-gradient(rgba(201,168,76,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }} />

          <div style={{ position: "relative", zIndex: 2 }}>
            <div className="section-kicker" style={{ margin: "0 auto 1.25rem" }}>
              <Sparkles size={14} /> Start Your Journey
            </div>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "var(--color-text-bright)",
              marginBottom: "1.25rem",
              lineHeight: 1.12,
            }}>
              Ready to Find Your{" "}
              <span style={{
                background: "linear-gradient(135deg, #c9a84c, #e0c774)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>Dream Home?</span>
            </h2>
            <p style={{
              fontSize: "1.0625rem", color: "var(--color-text-secondary)",
              maxWidth: 520, margin: "0 auto 1.75rem", lineHeight: 1.7,
            }}>
              Join thousands of happy homeowners. List your property or find your next home with HavenSphere today.
            </p>

            {/* Feature chips */}
            <div style={{
              display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap",
              marginBottom: "2.5rem",
            }}>
              {["No hidden fees", "Verified listings", "24/7 Support"].map((txt) => (
                <div key={txt} style={{
                  display: "flex", alignItems: "center", gap: "0.375rem",
                  fontSize: "0.8125rem", color: "var(--color-text-secondary)",
                }}>
                  <CheckCircle2 size={14} style={{ color: "var(--color-success)" }} />
                  {txt}
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
              <Link
                to="/register"
                className="btn btn-primary btn-lg"
                style={{
                  boxShadow: "0 6px 25px rgba(201,168,76,0.3)",
                  fontSize: "1rem",
                }}
              >
                Get Started Free <ArrowRight size={18} />
              </Link>
              <Link to="/properties" className="btn btn-secondary btn-lg" style={{ fontSize: "1rem" }}>
                Browse Properties
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
