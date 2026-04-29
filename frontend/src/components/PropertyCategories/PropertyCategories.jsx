import { useNavigate } from "react-router-dom";
import { Building2, Castle, Landmark, TreePine, ArrowUpRight, Grid3x3 } from "lucide-react";
import { propertyCategories } from "../../data/siteData";

const iconComponents = { Building2, Castle, Landmark, TreePine };

const gradients = [
  "linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.03))",
  "linear-gradient(135deg, rgba(224,121,95,0.12), rgba(224,121,95,0.03))",
  "linear-gradient(135deg, rgba(96,165,250,0.12), rgba(96,165,250,0.03))",
  "linear-gradient(135deg, rgba(52,211,153,0.12), rgba(52,211,153,0.03))",
];

const accentColors = [
  "var(--color-primary)",
  "var(--color-accent)",
  "var(--color-info)",
  "var(--color-success)",
];

const PropertyCategories = () => {
  const navigate = useNavigate();

  return (
    <section className="section-shell" style={{ position: "relative" }}>
      {/* Background */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(201,168,76,0.03), transparent 60%)",
      }} />

      <div className="container-shell" style={{ position: "relative" }}>
        <div className="section-head" style={{ textAlign: "center" }}>
          <div className="section-kicker" style={{ margin: "0 auto 0.75rem" }}>
            <Grid3x3 size={14} /> Browse Categories
          </div>
          <h2 className="section-title" style={{ marginBottom: "0.5rem" }}>
            Explore by <span className="gradient-text">Property Type</span>
          </h2>
          <p className="section-description" style={{ margin: "0 auto" }}>
            Find exactly what you're looking for, from modern apartments to sprawling estates.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "1.5rem",
        }}>
          {propertyCategories.map((cat, i) => {
            const Icon = iconComponents[cat.icon] || Building2;
            return (
              <div
                key={cat.id}
                onClick={() => navigate(`/properties?type=${cat.name.slice(0, -1)}`)}
                style={{
                  padding: "2rem",
                  background: "var(--color-bg-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                  cursor: "pointer",
                  transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
                  animation: "var(--animate-fade-up)",
                  animationDelay: `${i * 0.1}s`,
                  opacity: 0,
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)";
                  e.currentTarget.style.boxShadow = "0 0 30px rgba(201,168,76,0.1), 0 10px 40px rgba(0,0,0,0.3)";
                  e.currentTarget.style.transform = "translateY(-6px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-border)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Corner accent */}
                <div style={{
                  position: "absolute", top: -30, right: -30,
                  width: 80, height: 80, borderRadius: "50%",
                  background: gradients[i % gradients.length],
                  filter: "blur(20px)",
                }} />

                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: "var(--radius-lg)",
                    background: gradients[i % gradients.length],
                    border: `1px solid ${accentColors[i % accentColors.length]}20`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon size={26} style={{ color: accentColors[i % accentColors.length] }} />
                  </div>
                  <ArrowUpRight size={18} style={{ color: "var(--color-text-muted)", transition: "all 0.2s" }} />
                </div>

                <h3 style={{
                  fontWeight: 600, fontSize: "1.125rem",
                  color: "var(--color-text-bright)", marginBottom: "0.375rem",
                }}>
                  {cat.name}
                </h3>
                <p style={{
                  fontSize: "0.8125rem", color: "var(--color-text-muted)",
                  marginBottom: "1rem", lineHeight: 1.6,
                }}>
                  {cat.description}
                </p>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.375rem 0.75rem",
                  background: "rgba(201,168,76,0.06)",
                  border: "1px solid rgba(201,168,76,0.12)",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "var(--color-primary)",
                }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: "var(--color-primary)",
                  }} />
                  {cat.count} listings
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PropertyCategories;
