import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Home, ArrowRight, Star, Shield, Users } from "lucide-react";
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
      {/* Background effects */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 80% 60% at 50% 10%, rgba(201,168,76,0.08), transparent 60%), radial-gradient(ellipse 60% 40% at 80% 70%, rgba(224,79,95,0.05), transparent 50%)",
      }} />
      <div style={{
        position: "absolute", top: "15%", right: "5%", width: 400, height: 400,
        borderRadius: "50%", border: "1px solid rgba(201,168,76,0.08)",
        animation: "float 8s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", bottom: "20%", left: "3%", width: 250, height: 250,
        borderRadius: "50%", border: "1px solid rgba(201,168,76,0.05)",
        animation: "float 6s ease-in-out infinite 2s",
      }} />

      <div className="container-shell" style={{ position: "relative", zIndex: 2, width: "100%" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          {/* Kicker */}
          <div className="section-kicker" style={{ marginBottom: "1.5rem", animation: "var(--animate-fade-up)" }}>
            <Star size={14} /> #1 Real Estate Marketplace
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6vw, 4.25rem)",
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: "var(--color-text-bright)",
              marginBottom: "1.5rem",
              animation: "var(--animate-fade-up)",
              animationDelay: "0.1s",
              opacity: 0,
            }}
          >
            Find Your Perfect{" "}
            <span className="gradient-text" style={{ fontStyle: "italic" }}>Dream Home</span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              color: "var(--color-text-secondary)",
              maxWidth: 540,
              margin: "0 auto 2.5rem",
              lineHeight: 1.7,
              animation: "var(--animate-fade-up)",
              animationDelay: "0.2s",
              opacity: 0,
            }}
          >
            Discover luxury properties handpicked by our expert agents. Browse{" "}
            <span style={{ color: "var(--color-primary)" }}>15,000+</span> verified listings across 50+ cities.
          </p>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            style={{
              display: "flex",
              alignItems: "stretch",
              background: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-xl)",
              padding: "0.375rem",
              maxWidth: 640,
              margin: "0 auto 3rem",
              boxShadow: "var(--shadow-lg)",
              animation: "var(--animate-fade-up)",
              animationDelay: "0.3s",
              opacity: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", flex: 1, gap: "0.5rem", padding: "0 0.75rem" }}>
              <MapPin size={18} style={{ color: "var(--color-primary)", flexShrink: 0 }} />
              <input
                type="text"
                placeholder="City, neighborhood, or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1, border: "none", background: "transparent",
                  padding: "0.75rem 0", fontSize: "0.9375rem",
                  color: "var(--color-text-primary)", outline: "none",
                }}
              />
            </div>
            <div style={{
              borderLeft: "1px solid var(--color-border)",
              display: "flex", alignItems: "center",
              padding: "0 0.75rem",
            }}>
              <Home size={16} style={{ color: "var(--color-text-muted)", marginRight: "0.375rem" }} />
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
              style={{ borderRadius: "calc(var(--radius-xl) - 0.25rem)", padding: "0.75rem 1.5rem" }}
            >
              <Search size={18} />
              <span className="hidden-mobile">Search</span>
            </button>
          </form>

          {/* Stats Row */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "clamp(1.5rem, 4vw, 3rem)",
              flexWrap: "wrap",
              animation: "var(--animate-fade-up)",
              animationDelay: "0.5s",
              opacity: 0,
            }}
          >
            {stats.map((stat, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{
                  fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800,
                  color: "var(--color-primary)", fontFamily: "var(--font-display)",
                }}>{stat.value}</div>
                <div style={{
                  fontSize: "0.8125rem", color: "var(--color-text-muted)",
                  fontWeight: 500,
                }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div style={{
            display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap",
            marginTop: "3rem", animation: "var(--animate-fade-up)", animationDelay: "0.6s", opacity: 0,
          }}>
            {[
              { icon: Shield, text: "100% Verified" },
              { icon: Users, text: "Trusted Agents" },
              { icon: Star, text: "5-Star Rated" },
            ].map(({ icon: Icon, text }, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "0.5rem",
                color: "var(--color-text-muted)", fontSize: "0.8125rem",
              }}>
                <Icon size={16} style={{ color: "var(--color-primary)" }} />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
