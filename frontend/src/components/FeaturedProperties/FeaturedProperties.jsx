import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, BedDouble, Bath, Maximize, ArrowRight, Sparkles, Heart } from "lucide-react";
import { getProperties } from "../../services/api/propertyService";

const FeaturedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getProperties({ featured: "true", limit: 4 });
        setProperties(res.data || []);
      } catch {
        // fallback silently
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  if (isLoading) {
    return (
      <section className="section-shell">
        <div className="container-shell">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} style={{
                height: 420, borderRadius: "var(--radius-lg)",
                background: "var(--color-bg-card)",
                border: "1px solid var(--color-border)",
                animation: "var(--animate-shimmer)",
                backgroundSize: "200% 100%",
                backgroundImage: "linear-gradient(90deg, var(--color-bg-card) 25%, var(--color-bg-elevated) 50%, var(--color-bg-card) 75%)",
              }} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!properties.length) return null;

  const formatPrice = (price) => {
    if (price >= 1000000) return `$${(price / 1000000).toFixed(1)}M`;
    if (price >= 1000) return `$${(price / 1000).toFixed(0)}K`;
    return `$${price}`;
  };

  return (
    <section id="featured" className="section-shell" style={{ position: "relative" }}>
      {/* Background accent */}
      <div style={{
        position: "absolute", top: 0, right: 0, width: "40%", height: "60%",
        background: "radial-gradient(ellipse at 100% 0%, rgba(201,168,76,0.04), transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="container-shell" style={{ position: "relative" }}>
        {/* Header */}
        <div className="section-head" style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          flexWrap: "wrap", gap: "1rem",
        }}>
          <div>
            <div className="section-kicker" style={{ marginBottom: "0.75rem" }}>
              <Sparkles size={14} /> Featured Collection
            </div>
            <h2 className="section-title" style={{ marginBottom: "0.5rem" }}>
              Premium <span className="gradient-text">Properties</span>
            </h2>
            <p className="section-description">Hand-picked luxury properties from our most exclusive listings, verified by our expert team.</p>
          </div>
          <Link to="/properties" className="btn btn-secondary" style={{
            alignSelf: "flex-end",
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
          }}>
            View All <ArrowRight size={16} />
          </Link>
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1.5rem",
        }}>
          {properties.map((property, i) => {
            const isHovered = hoveredId === property._id;
            return (
              <Link
                to={`/properties/${property._id}`}
                key={property._id}
                className="card-interactive"
                style={{
                  overflow: "hidden",
                  textDecoration: "none",
                  animation: "var(--animate-fade-up)",
                  animationDelay: `${i * 0.1}s`,
                  opacity: 0,
                  position: "relative",
                }}
                onMouseEnter={() => setHoveredId(property._id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Image */}
                <div style={{ position: "relative", height: 240, overflow: "hidden" }}>
                  <img
                    src={property.image}
                    alt={property.title}
                    style={{
                      width: "100%", height: "100%", objectFit: "cover",
                      transition: "transform 0.6s cubic-bezier(0.23,1,0.32,1)",
                      transform: isHovered ? "scale(1.08)" : "scale(1)",
                    }}
                  />
                  {/* Multi-layer gradient */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(180deg, rgba(10,14,26,0.1) 0%, rgba(10,14,26,0.05) 50%, rgba(10,14,26,0.85) 100%)",
                  }} />

                  {/* Top row: badge + favorite */}
                  <div style={{
                    position: "absolute", top: 12, left: 12, right: 12,
                    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                  }}>
                    <span style={{
                      background: "rgba(201,168,76,0.15)",
                      color: "var(--color-primary-light)",
                      border: "1px solid rgba(201,168,76,0.25)",
                      borderRadius: "var(--radius-full)",
                      padding: "0.25rem 0.75rem",
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      backdropFilter: "blur(10px)",
                    }}>
                      {property.badge}
                    </span>
                    <div style={{
                      width: 34, height: 34, borderRadius: "50%",
                      background: "rgba(10,14,26,0.5)",
                      backdropFilter: "blur(10px)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      border: "1px solid rgba(255,255,255,0.1)",
                      transition: "all 0.2s",
                    }}>
                      <Heart size={16} style={{ color: "rgba(255,255,255,0.7)" }} />
                    </div>
                  </div>

                  {/* Price */}
                  <div style={{
                    position: "absolute", bottom: 12, left: 12,
                  }}>
                    <div style={{
                      fontWeight: 700, fontSize: "1.5rem",
                      color: "var(--color-text-bright)",
                      fontFamily: "var(--font-display)",
                      textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                      lineHeight: 1,
                    }}>
                      {formatPrice(property.price)}
                    </div>
                    <div style={{
                      fontSize: "0.6875rem", color: "rgba(255,255,255,0.5)",
                      fontWeight: 500, marginTop: "0.125rem",
                    }}>
                      {property.status === "rented" ? "/month" : ""}
                    </div>
                  </div>

                  {/* Type badge */}
                  <div style={{
                    position: "absolute", bottom: 12, right: 12,
                    background: "rgba(10,14,26,0.6)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "var(--radius-sm)",
                    padding: "0.25rem 0.625rem",
                    fontSize: "0.6875rem",
                    fontWeight: 600,
                    color: "var(--color-text-secondary)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}>
                    {property.type}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: "1.25rem 1.25rem 1.5rem" }}>
                  <h3 style={{
                    fontWeight: 600, fontSize: "1.0625rem",
                    color: "var(--color-text-bright)", marginBottom: "0.375rem",
                    transition: "color 0.2s",
                    ...(isHovered && { color: "var(--color-primary-light)" }),
                  }}>
                    {property.title}
                  </h3>
                  <div style={{
                    display: "flex", alignItems: "center", gap: "0.375rem",
                    color: "var(--color-text-muted)", fontSize: "0.8125rem",
                    marginBottom: "1rem",
                  }}>
                    <MapPin size={13} style={{ color: "var(--color-primary)" }} /> {property.location}
                  </div>

                  {/* Features */}
                  <div style={{
                    display: "flex", gap: "1.25rem",
                    borderTop: "1px solid var(--color-border)",
                    paddingTop: "0.875rem",
                  }}>
                    {[
                      { icon: BedDouble, val: `${property.beds} Beds` },
                      { icon: Bath, val: `${property.baths} Baths` },
                      { icon: Maximize, val: property.area },
                    ].map(({ icon: Icon, val }, j) => (
                      <div key={j} style={{
                        display: "flex", alignItems: "center", gap: "0.375rem",
                        fontSize: "0.8125rem", color: "var(--color-text-secondary)",
                      }}>
                        <Icon size={15} style={{ color: "var(--color-primary)" }} /> {val}
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
