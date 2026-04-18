import { Building2, Castle, Landmark, TreePine } from "lucide-react";
import { propertyCategories } from "../../data/siteData";

const iconComponents = { Building2, Castle, Landmark, TreePine };

const PropertyCategories = () => {
  return (
    <section className="section-shell" style={{ position: "relative" }}>
      {/* Subtle bg accent */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(201,168,76,0.03), transparent 60%)",
      }} />

      <div className="container-shell" style={{ position: "relative" }}>
        <div className="section-head" style={{ textAlign: "center" }}>
          <div className="section-kicker" style={{ margin: "0 auto 0.75rem" }}>🏠 Categories</div>
          <h2 className="section-title" style={{ marginBottom: "0.5rem" }}>
            Browse by <span className="gradient-text">Property Type</span>
          </h2>
          <p className="section-description" style={{ margin: "0 auto" }}>Find exactly what you're looking for, from modern apartments to sprawling estates.</p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "1.5rem",
        }}>
          {propertyCategories.map((cat, i) => {
            const Icon = iconComponents[cat.icon] || Building2;
            return (
              <div
                key={cat.id}
                className="card-interactive"
                style={{
                  padding: "2rem",
                  textAlign: "center",
                  animation: "var(--animate-fade-up)",
                  animationDelay: `${i * 0.1}s`,
                  opacity: 0,
                }}
              >
                <div style={{
                  width: 64, height: 64, borderRadius: "var(--radius-lg)",
                  background: "rgba(201,168,76,0.1)",
                  border: "1px solid rgba(201,168,76,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 1.25rem",
                }}>
                  <Icon size={28} style={{ color: "var(--color-primary)" }} />
                </div>
                <h3 style={{
                  fontWeight: 600, fontSize: "1.125rem",
                  color: "var(--color-text-bright)", marginBottom: "0.25rem",
                }}>
                  {cat.name}
                </h3>
                <p style={{
                  fontSize: "0.8125rem", color: "var(--color-text-muted)",
                  marginBottom: "0.75rem",
                }}>
                  {cat.description}
                </p>
                <span className="badge badge-gold">{cat.count} listings</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PropertyCategories;
