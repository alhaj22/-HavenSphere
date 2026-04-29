import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Home, Star, Shield, Users, TrendingUp, ChevronRight } from "lucide-react";
import { stats } from "../../data/siteData";

const Hero = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyType, setPropertyType] = useState("all");

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (propertyType !== "all") params.set("type", propertyType);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        paddingTop: "76px",
      }}
    >
      {/* Multi-layered background */}
      <div style={{
        position: "absolute", inset: 0,
        background: `
          radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201,168,76,0.1), transparent 60%),
          radial-gradient(ellipse 60% 50% at 90% 80%, rgba(224,121,95,0.06), transparent 50%),
          radial-gradient(ellipse 40% 40% at 10% 60%, rgba(96,165,250,0.04), transparent 50%)
        `,
      }} />

      {/* Animated orbs */}
      <div style={{
        position: "absolute", top: "8%", right: "8%", width: 500, height: 500,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)",
        border: "1px solid rgba(201,168,76,0.06)",
        animation: "float 10s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", left: "5%", width: 300, height: 300,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(224,121,95,0.03) 0%, transparent 70%)",
        border: "1px solid rgba(224,121,95,0.05)",
        animation: "float 8s ease-in-out infinite 3s",
      }} />
      <div style={{
        position: "absolute", top: "50%", left: "50%", width: 200, height: 200,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(96,165,250,0.02) 0%, transparent 70%)",
        animation: "float 12s ease-in-out infinite 1s",
      }} />

      {/* Noise texture overlay */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
        opacity: 0.5,
        pointerEvents: "none",
      }} />

      <div className="container-shell" style={{ position: "relative", zIndex: 2, width: "100%" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          {/* Floating badge */}
          <div
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.625rem",
              background: "rgba(201,168,76,0.08)",
              border: "1px solid rgba(201,168,76,0.15)",
              borderRadius: "var(--radius-full)",
              padding: "0.5rem 1.25rem",
              marginBottom: "2rem",
              animation: "var(--animate-fade-up)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div style={{
              width: 8, height: 8, borderRadius: "50%",
              background: "var(--color-success)",
              boxShadow: "0 0 8px rgba(52,211,153,0.5)",
              animation: "pulse-glow 2s ease-in-out infinite",
            }} />
            <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-primary)", letterSpacing: "0.03em" }}>
              #1 Trusted Real Estate Platform
            </span>
            <TrendingUp size={14} style={{ color: "var(--color-primary)" }} />
          </div>

          {/* Main headline */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.75rem, 7vw, 5rem)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "var(--color-text-bright)",
              marginBottom: "1.75rem",
              animation: "var(--animate-fade-up)",
              animationDelay: "0.1s",
              opacity: 0,
            }}
          >
            Discover Your{" "}
            <span style={{
              background: "linear-gradient(135deg, #c9a84c 0%, #e0c774 40%, #c9a84c 80%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontStyle: "italic",
            }}>Perfect</span>
            <br />
            <span style={{ color: "var(--color-text-bright)" }}>Dream Home</span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "clamp(1.0625rem, 2vw, 1.3125rem)",
              color: "var(--color-text-secondary)",
              maxWidth: 580,
              margin: "0 auto 3rem",
              lineHeight: 1.75,
              animation: "var(--animate-fade-up)",
              animationDelay: "0.2s",
              opacity: 0,
            }}
          >
            Explore luxury properties curated by expert agents. Browse{" "}
            <span style={{
              color: "var(--color-primary)",
              fontWeight: 600,
              borderBottom: "1px dashed rgba(201,168,76,0.4)",
              paddingBottom: 2,
            }}>15,000+</span>{" "}
            verified listings across <span style={{ color: "var(--color-text-bright)", fontWeight: 500 }}>50+ cities</span> worldwide.
          </p>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            style={{
              display: "flex",
              alignItems: "stretch",
              background: "rgba(21,29,53,0.9)",
              border: "1px solid rgba(201,168,76,0.12)",
              borderRadius: "var(--radius-xl)",
              padding: "0.375rem",
              maxWidth: 680,
              margin: "0 auto 3.5rem",
              boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 30px rgba(201,168,76,0.06)",
              animation: "var(--animate-fade-up)",
              animationDelay: "0.3s",
              opacity: 0,
              backdropFilter: "blur(20px)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", flex: 1, gap: "0.625rem", padding: "0 1rem" }}>
              <MapPin size={18} style={{ color: "var(--color-primary)", flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Search by city, neighborhood, or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1, border: "none", background: "transparent",
                  padding: "0.875rem 0", fontSize: "0.9375rem",
                  color: "var(--color-text-primary)", outline: "none",
                }}
              />
            </div>
            <div style={{
              borderLeft: "1px solid rgba(255,255,255,0.06)",
              display: "flex", alignItems: "center",
              padding: "0 0.875rem",
            }}>
              <Home size={16} style={{ color: "var(--color-text-muted)", marginRight: "0.5rem" }} />
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                style={{
                  border: "none", background: "transparent",
                  color: "var(--color-text-secondary)", fontSize: "0.875rem",
                  outline: "none", cursor: "pointer",
                }}
              >
                <option value="all">All Types</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="House">House</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                borderRadius: "calc(var(--radius-xl) - 0.25rem)",
                padding: "0.875rem 2rem",
                fontSize: "0.9375rem",
                fontWeight: 600,
              }}
            >
              <Search size={18} />
              <span className="hidden-mobile">Search</span>
            </button>
          </form>

          {/* Quick links */}
          <div style={{
            display: "flex", justifyContent: "center", gap: "0.625rem", flexWrap: "wrap",
            marginBottom: "3.5rem",
            animation: "var(--animate-fade-up)", animationDelay: "0.4s", opacity: 0,
          }}>
            <span style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", marginRight: "0.25rem" }}>Popular:</span>
            {["New York", "Miami", "Los Angeles", "Chicago", "San Francisco"].map((city) => (
              <button
                key={city}
                onClick={() => { setSearchQuery(city); }}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "var(--radius-full)",
                  padding: "0.25rem 0.75rem",
                  color: "var(--color-text-secondary)",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "rgba(201,168,76,0.3)";
                  e.target.style.color = "var(--color-primary)";
                  e.target.style.background = "rgba(201,168,76,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "rgba(255,255,255,0.06)";
                  e.target.style.color = "var(--color-text-secondary)";
                  e.target.style.background = "rgba(255,255,255,0.04)";
                }}
              >
                {city}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1rem",
              maxWidth: 640,
              margin: "0 auto 3rem",
              animation: "var(--animate-fade-up)",
              animationDelay: "0.5s",
              opacity: 0,
            }}
            className="hero-stats-grid"
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                style={{
                  textAlign: "center",
                  padding: "1.25rem 0.75rem",
                  background: "rgba(21,29,53,0.6)",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid rgba(255,255,255,0.04)",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s",
                }}
              >
                <div style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 800,
                  color: "var(--color-primary)", fontFamily: "var(--font-display)",
                  lineHeight: 1,
                  marginBottom: "0.25rem",
                }}>{stat.value}</div>
                <div style={{
                  fontSize: "0.75rem", color: "var(--color-text-muted)",
                  fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em",
                }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Trust row */}
          <div style={{
            display: "flex", justifyContent: "center", gap: "2.5rem", flexWrap: "wrap",
            animation: "var(--animate-fade-up)", animationDelay: "0.6s", opacity: 0,
          }}>
            {[
              { icon: Shield, text: "100% Verified Listings" },
              { icon: Users, text: "Expert Trusted Agents" },
              { icon: Star, text: "5-Star Customer Rated" },
            ].map(({ icon: Icon, text }, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "0.5rem",
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "var(--radius-sm)",
                  background: "rgba(201,168,76,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon size={14} style={{ color: "var(--color-primary)" }} />
                </div>
                <span style={{
                  color: "var(--color-text-muted)", fontSize: "0.8125rem", fontWeight: 500,
                }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
        animation: "float 3s ease-in-out infinite",
      }}>
        <span style={{ fontSize: "0.6875rem", color: "var(--color-text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Scroll</span>
        <ChevronRight size={16} style={{ color: "var(--color-primary)", transform: "rotate(90deg)" }} />
      </div>

      <style>{`
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .hero-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
