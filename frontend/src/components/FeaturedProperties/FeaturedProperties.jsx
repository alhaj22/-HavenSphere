import { Link } from "react-router-dom";
import { MapPin, BedDouble, Bath, Maximize, ArrowRight } from "lucide-react";
import { featuredProperties } from "../../data/siteData";

const FeaturedProperties = () => {
  return (
    <section id="featured" className="section-shell" style={{ position: "relative" }}>
      <div className="container-shell">
        {/* Header */}
        <div className="section-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div className="section-kicker" style={{ marginBottom: "0.75rem" }}>✦ Featured Collection</div>
            <h2 className="section-title" style={{ marginBottom: "0.5rem" }}>
              Premium <span className="gradient-text">Properties</span>
            </h2>
            <p className="section-description">Hand-picked luxury properties from our most exclusive listings.</p>
          </div>
          <Link to="/properties" className="btn btn-secondary" style={{ alignSelf: "flex-end" }}>
            View All <ArrowRight size={16} />
          </Link>
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1.5rem",
        }}>
          {featuredProperties.map((property, i) => (
            <Link
              to={`/properties/${property.id}`}
              key={property.id}
              className="card-interactive"
              style={{
                overflow: "hidden",
                textDecoration: "none",
                animation: "var(--animate-fade-up)",
                animationDelay: `${i * 0.1}s`,
                opacity: 0,
              }}
            >
              {/* Image */}
              <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
                <img
                  src={property.image}
                  alt={property.title}
                  style={{
                    width: "100%", height: "100%", objectFit: "cover",
                    transition: "transform 0.5s ease",
                  }}
                  onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                  onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(180deg, transparent 50%, rgba(10,14,26,0.8) 100%)",
                }} />
                {/* Badge */}
                <span className="badge badge-gold" style={{
                  position: "absolute", top: 12, left: 12,
                }}>
                  {property.badge}
                </span>
                {/* Price */}
                <div style={{
                  position: "absolute", bottom: 12, left: 12,
                  fontWeight: 700, fontSize: "1.375rem",
                  color: "var(--color-primary-light)",
                  fontFamily: "var(--font-display)",
                }}>
                  {property.price}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "1.25rem" }}>
                <h3 style={{
                  fontWeight: 600, fontSize: "1.0625rem",
                  color: "var(--color-text-bright)", marginBottom: "0.375rem",
                }}>
                  {property.title}
                </h3>
                <div style={{
                  display: "flex", alignItems: "center", gap: "0.375rem",
                  color: "var(--color-text-muted)", fontSize: "0.8125rem",
                  marginBottom: "1rem",
                }}>
                  <MapPin size={14} /> {property.location}
                </div>

                {/* Features row */}
                <div style={{
                  display: "flex", gap: "1rem",
                  borderTop: "1px solid var(--color-border)",
                  paddingTop: "0.875rem",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>
                    <BedDouble size={15} style={{ color: "var(--color-primary)" }} /> {property.beds} Beds
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>
                    <Bath size={15} style={{ color: "var(--color-primary)" }} /> {property.baths} Baths
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>
                    <Maximize size={15} style={{ color: "var(--color-primary)" }} /> {property.area}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
