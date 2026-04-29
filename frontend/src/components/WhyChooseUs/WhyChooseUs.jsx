import { Award, UserCheck, ShieldCheck, Lock, Headphones } from "lucide-react";
import { whyChooseUs } from "../../data/siteData";

const iconComponents = { UserCheck, ShieldCheck, Lock, Headphones };

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="section-shell" style={{ position: "relative" }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, var(--color-bg-deep), var(--color-bg-dark), var(--color-bg-deep))",
      }} />

      {/* Decorative grid lines */}
      <div style={{
        position: "absolute", inset: 0, overflow: "hidden", opacity: 0.02,
        backgroundImage: `
          linear-gradient(rgba(201,168,76,1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }} />

      <div className="container-shell" style={{ position: "relative" }}>
        <div className="section-head" style={{ textAlign: "center" }}>
          <div className="section-kicker" style={{ margin: "0 auto 0.75rem" }}>
            <Award size={14} /> Why Us
          </div>
          <h2 className="section-title" style={{ marginBottom: "0.5rem" }}>
            Why Choose <span className="gradient-text">HavenSphere</span>
          </h2>
          <p className="section-description" style={{ margin: "0 auto" }}>
            Industry-leading technology combined with expert knowledge to deliver exceptional experiences.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
          gap: "1.5rem",
        }}>
          {whyChooseUs.map((item, i) => {
            const Icon = iconComponents[item.icon] || ShieldCheck;
            return (
              <div
                key={item.id}
                style={{
                  padding: "2rem",
                  position: "relative",
                  overflow: "hidden",
                  background: "var(--color-bg-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                  animation: "var(--animate-fade-up)",
                  animationDelay: `${i * 0.1}s`,
                  opacity: 0,
                  transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(201,168,76,0.25)";
                  e.currentTarget.style.boxShadow = "0 0 40px rgba(201,168,76,0.08), 0 8px 30px rgba(0,0,0,0.3)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-border)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Corner glow */}
                <div style={{
                  position: "absolute", top: -30, right: -30,
                  width: 120, height: 120, borderRadius: "50%",
                  background: "rgba(201,168,76,0.04)",
                  filter: "blur(40px)",
                  transition: "opacity 0.3s",
                }} />

                {/* Number watermark */}
                <div style={{
                  position: "absolute", top: 10, right: 16,
                  fontFamily: "var(--font-display)",
                  fontSize: "4rem", fontWeight: 800,
                  color: "rgba(201,168,76,0.04)",
                  lineHeight: 1,
                  userSelect: "none",
                }}>0{i + 1}</div>

                <div style={{
                  width: 52, height: 52, borderRadius: "var(--radius-lg)",
                  background: "linear-gradient(135deg, rgba(201,168,76,0.12), rgba(201,168,76,0.04))",
                  border: "1px solid rgba(201,168,76,0.12)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "1.5rem",
                }}>
                  <Icon size={24} style={{ color: "var(--color-primary)" }} />
                </div>

                <div style={{
                  fontSize: "2rem", fontWeight: 800,
                  color: "var(--color-primary)",
                  fontFamily: "var(--font-display)",
                  marginBottom: "0.25rem",
                  lineHeight: 1.1,
                }}>{item.stat}</div>

                <h3 style={{
                  fontWeight: 600, fontSize: "1.0625rem",
                  color: "var(--color-text-bright)",
                  marginBottom: "0.625rem",
                }}>{item.title}</h3>

                <p style={{
                  fontSize: "0.875rem", color: "var(--color-text-muted)",
                  lineHeight: 1.65, margin: 0,
                }}>{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
