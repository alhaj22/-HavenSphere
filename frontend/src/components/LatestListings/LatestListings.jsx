import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { MapPin, BedDouble, Bath, Maximize, ChevronLeft, ChevronRight, Flame } from "lucide-react";
import { getProperties } from "../../services/api/propertyService";

const LatestListings = () => {
  const scrollRef = useRef(null);
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getProperties({ sort: "-createdAt", limit: 8 });
        setProperties(res.data || []);
      } catch {
        // silent
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 360, behavior: "smooth" });
    }
  };

  const formatPrice = (price) => {
    if (price >= 1000000) return `$${(price / 1000000).toFixed(1)}M`;
    if (price >= 1000) return `$${(price / 1000).toFixed(0)}K`;
    return `$${price}`;
  };

  if (isLoading) {
    return (
      <section className="section-shell">
        <div className="container-shell">
          <div style={{ display: "flex", gap: "1.5rem", overflow: "hidden" }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} style={{
                minWidth: 320, height: 380, borderRadius: "var(--radius-lg)",
                background: "var(--color-bg-card)", border: "1px solid var(--color-border)",
                animation: "var(--animate-shimmer)", backgroundSize: "200% 100%",
                backgroundImage: "linear-gradient(90deg, var(--color-bg-card) 25%, var(--color-bg-elevated) 50%, var(--color-bg-card) 75%)",
                flexShrink: 0,
              }} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!properties.length) return null;

  return (
    <section id="latest" className="section-shell">
      <div className="container-shell">
        <div className="section-head" style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          flexWrap: "wrap", gap: "1rem",
        }}>
          <div>
            <div className="section-kicker" style={{ marginBottom: "0.75rem" }}>
              <Flame size={14} /> Just Listed
            </div>
            <h2 className="section-title" style={{ marginBottom: "0.5rem" }}>
              Latest <span className="gradient-text">Listings</span>
            </h2>
            <p className="section-description">Fresh properties just added to the market — don't miss out.</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <button
              onClick={() => scroll(-1)}
              style={{
                width: 42, height: 42, borderRadius: "var(--radius-md)",
                background: "transparent",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-secondary)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-primary)";
                e.currentTarget.style.color = "var(--color-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border)";
                e.currentTarget.style.color = "var(--color-text-secondary)";
              }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll(1)}
              style={{
                width: 42, height: 42, borderRadius: "var(--radius-md)",
                background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))",
                border: "none",
                color: "var(--color-bg-deep)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", transition: "all 0.2s",
                boxShadow: "0 4px 15px var(--color-primary-glow)",
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="scroll-container"
          style={{
            display: "flex",
            gap: "1.5rem",
            overflowX: "auto",
            paddingBottom: "1rem",
          }}
        >
          {properties.map((property, i) => {
            const isHovered = hoveredId === property._id;
            return (
              <Link
                to={`/properties/${property._id}`}
                key={property._id}
                style={{
                  minWidth: 320,
                  maxWidth: 350,
                  flexShrink: 0,
                  overflow: "hidden",
                  textDecoration: "none",
                  background: "var(--color-bg-card)",
                  border: `1px solid ${isHovered ? "rgba(201,168,76,0.3)" : "var(--color-border)"}`,
                  borderRadius: "var(--radius-lg)",
                  boxShadow: isHovered ? "var(--shadow-glow)" : "var(--shadow-sm)",
                  transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                  transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
                  animation: "var(--animate-fade-up)",
                  animationDelay: `${i * 0.08}s`,
                  opacity: 0,
                }}
                onMouseEnter={() => setHoveredId(property._id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div style={{ position: "relative", height: 210, overflow: "hidden" }}>
                  <img
                    src={property.image}
                    alt={property.title}
                    style={{
                      width: "100%", height: "100%", objectFit: "cover",
                      transition: "transform 0.6s cubic-bezier(0.23,1,0.32,1)",
                      transform: isHovered ? "scale(1.08)" : "scale(1)",
                    }}
                  />
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(180deg, rgba(10,14,26,0.05) 0%, rgba(10,14,26,0.8) 100%)",
                  }} />
                  <span style={{
                    position: "absolute", top: 12, left: 12,
                    background: "rgba(201,168,76,0.12)",
                    color: "var(--color-primary-light)",
                    border: "1px solid rgba(201,168,76,0.2)",
                    borderRadius: "var(--radius-full)",
                    padding: "0.25rem 0.625rem",
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    letterSpacing: "0.03em",
                    backdropFilter: "blur(10px)",
                  }}>
                    {property.badge}
                  </span>
                  <div style={{
                    position: "absolute", bottom: 12, left: 12,
                    fontWeight: 700, fontSize: "1.375rem",
                    color: "var(--color-text-bright)", fontFamily: "var(--font-display)",
                    textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                  }}>{formatPrice(property.price)}</div>
                </div>

                <div style={{ padding: "1.125rem 1.25rem 1.375rem" }}>
                  <h3 style={{
                    fontWeight: 600, fontSize: "1rem",
                    color: isHovered ? "var(--color-primary-light)" : "var(--color-text-bright)",
                    marginBottom: "0.25rem",
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    transition: "color 0.2s",
                  }}>{property.title}</h3>
                  <div style={{
                    display: "flex", alignItems: "center", gap: "0.25rem",
                    color: "var(--color-text-muted)", fontSize: "0.8125rem", marginBottom: "0.875rem",
                  }}>
                    <MapPin size={13} style={{ color: "var(--color-primary)" }} /> {property.location}
                  </div>
                  <div style={{
                    display: "flex", gap: "1rem",
                    borderTop: "1px solid var(--color-border)", paddingTop: "0.75rem",
                  }}>
                    {[
                      { icon: BedDouble, val: `${property.beds}` },
                      { icon: Bath, val: `${property.baths}` },
                      { icon: Maximize, val: property.area },
                    ].map(({ icon: Icon, val }, j) => (
                      <div key={j} style={{
                        display: "flex", alignItems: "center", gap: "0.25rem",
                        fontSize: "0.8125rem", color: "var(--color-text-secondary)",
                      }}>
                        <Icon size={14} style={{ color: "var(--color-primary)" }} /> {val}
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

export default LatestListings;
