import { UserCheck, ShieldCheck, Lock, Headphones } from "lucide-react";
import { whyChooseUs } from "../../data/siteData";

const iconComponents = { UserCheck, ShieldCheck, Lock, Headphones };

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="section-shell" style={{ position: "relative" }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, var(--color-bg-deep), var(--color-bg-dark), var(--color-bg-deep))",
      }} />

      <div className="container-shell" style={{ position: "relative" }}>
        <div className="section-head" style={{ textAlign: "center" }}>
          <div className="section-kicker" style={{ margin: "0 auto 0.75rem" }}>⭐ Why Us</div>
          <h2 className="section-title" style={{ marginBottom: "0.5rem" }}>
            Why Choose <span className="gradient-text">HavenSphere</span>
          </h2>
          <p className="section-description" style={{ margin: "0 auto" }}>Industry-leading technology combined with expert knowledge to deliver exceptional experiences.</p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "1.5rem",
        }}>
          {whyChooseUs.map((item, i) => {
            const Icon = iconComponents[item.icon] || ShieldCheck;
            return (
              <div
                key={item.id}
                className="card-surface"
                style={{
                  padding: "2rem",
                  position: "relative",
                  overflow: "hidden",
                  animation: "var(--animate-fade-up)",
                  animationDelay: `${i * 0.1}s`,
                  opacity: 0,
                }}
              >
                {/* Glow */}
                <div style={{
                  position: "absolute", top: -20, right: -20,
                  width: 100, height: 100, borderRadius: "50%",
                  background: "rgba(201,168,76,0.05)",
                  filter: "blur(30px)",
                }} />

                <div style={{
                  width: 56, height: 56, borderRadius: "var(--radius-lg)",
                  background: "linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))",
                  border: "1px solid rgba(201,168,76,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "1.25rem",
                }}>
                  <Icon size={24} style={{ color: "var(--color-primary)" }} />
                </div>

                <div style={{
                  fontSize: "1.75rem", fontWeight: 800,
                  color: "var(--color-primary)",
                  fontFamily: "var(--font-display)",
                  marginBottom: "0.375rem",
                }}>{item.stat}</div>

                <h3 style={{
                  fontWeight: 600, fontSize: "1.0625rem",
                  color: "var(--color-text-bright)",
                  marginBottom: "0.5rem",
                }}>{item.title}</h3>

                <p style={{
                  fontSize: "0.875rem", color: "var(--color-text-muted)",
                  lineHeight: 1.6,
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
