import { Link } from "react-router-dom";
import { MapPin, BedDouble, Bath, Maximize, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { latestListings } from "../../data/siteData";
import { useRef } from "react";

const LatestListings = () => {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 340, behavior: "smooth" });
    }
  };

  return (
    <section id="latest" className="section-shell">
      <div className="container-shell">
        <div className="section-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div className="section-kicker" style={{ marginBottom: "0.75rem" }}>🔥 Just Listed</div>
            <h2 className="section-title" style={{ marginBottom: "0.5rem" }}>
              Latest <span className="gradient-text">Listings</span>
            </h2>
            <p className="section-description">Fresh properties just added to the market this week.</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <button onClick={() => scroll(-1)} className="btn btn-secondary btn-sm" style={{ width: 40, height: 40, padding: 0 }}>
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => scroll(1)} className="btn btn-secondary btn-sm" style={{ width: 40, height: 40, padding: 0 }}>
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
          {latestListings.map((property, i) => (
            <Link
              to={`/properties/${property.id}`}
              key={property.id}
              className="card-interactive"
              style={{
                minWidth: 310,
                maxWidth: 340,
                flexShrink: 0,
                overflow: "hidden",
                textDecoration: "none",
                animation: "var(--animate-fade-up)",
                animationDelay: `${i * 0.08}s`,
                opacity: 0,
              }}
            >
              <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
                <img
                  src={property.image}
                  alt={property.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
                  onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                  onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(180deg, transparent 50%, rgba(10,14,26,0.8) 100%)",
                }} />
                <span className="badge badge-gold" style={{ position: "absolute", top: 12, left: 12 }}>
                  {property.badge}
                </span>
                <div style={{
                  position: "absolute", bottom: 12, left: 12,
                  fontWeight: 700, fontSize: "1.25rem",
                  color: "var(--color-primary-light)", fontFamily: "var(--font-display)",
                }}>{property.price}</div>
              </div>

              <div style={{ padding: "1rem 1.25rem" }}>
                <h3 style={{
                  fontWeight: 600, fontSize: "1rem",
                  color: "var(--color-text-bright)", marginBottom: "0.25rem",
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                }}>{property.title}</h3>
                <div style={{
                  display: "flex", alignItems: "center", gap: "0.25rem",
                  color: "var(--color-text-muted)", fontSize: "0.8125rem", marginBottom: "0.875rem",
                }}>
                  <MapPin size={13} /> {property.location}
                </div>
                <div style={{
                  display: "flex", gap: "0.875rem",
                  borderTop: "1px solid var(--color-border)", paddingTop: "0.75rem",
                }}>
                  {[
                    { icon: BedDouble, val: `${property.beds}` },
                    { icon: Bath, val: `${property.baths}` },
                    { icon: Maximize, val: property.area },
                  ].map(({ icon: Icon, val }, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>
                      <Icon size={14} style={{ color: "var(--color-primary)" }} /> {val}
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestListings;
