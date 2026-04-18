import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const CallToAction = () => {
  return (
    <section id="cta" className="section-shell">
      <div className="container-shell">
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "var(--radius-xl)",
            padding: "clamp(3rem, 8vw, 5rem) clamp(2rem, 5vw, 4rem)",
            textAlign: "center",
            background: "linear-gradient(135deg, rgba(201,168,76,0.12) 0%, rgba(10,14,26,0.95) 50%, rgba(224,121,95,0.08) 100%)",
            border: "1px solid rgba(201,168,76,0.15)",
          }}
        >
          {/* Decorative glows */}
          <div style={{
            position: "absolute", top: -50, left: -50,
            width: 200, height: 200, borderRadius: "50%",
            background: "rgba(201,168,76,0.1)", filter: "blur(60px)",
          }} />
          <div style={{
            position: "absolute", bottom: -50, right: -50,
            width: 200, height: 200, borderRadius: "50%",
            background: "rgba(224,121,95,0.08)", filter: "blur(60px)",
          }} />

          <div style={{ position: "relative", zIndex: 2 }}>
            <div className="section-kicker" style={{ margin: "0 auto 1rem" }}>
              <Sparkles size={14} /> Start Your Journey
            </div>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 700,
              color: "var(--color-text-bright)",
              marginBottom: "1rem",
              lineHeight: 1.15,
            }}>
              Ready to Find Your <span className="gradient-text">Dream Home?</span>
            </h2>
            <p style={{
              fontSize: "1.0625rem", color: "var(--color-text-secondary)",
              maxWidth: 480, margin: "0 auto 2rem", lineHeight: 1.7,
            }}>
              Join thousands of happy homeowners. List your property or find your next home with HavenSphere today.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
              <Link to="/register" className="btn btn-primary btn-lg">
                Get Started Free <ArrowRight size={18} />
              </Link>
              <Link to="/properties" className="btn btn-secondary btn-lg">
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
