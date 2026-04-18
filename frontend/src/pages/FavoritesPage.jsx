import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, MapPin, BedDouble, Bath, Maximize, Trash2, Search, ArrowLeft } from "lucide-react";
import { getFavorites, removeFavorite } from "../services/api/favoriteService";
import { useToast } from "../hooks/useToast";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const FavoritesPage = () => {
  const toast = useToast();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getFavorites();
        setFavorites(res.data || []);
      } catch {
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleRemove = async (propertyId) => {
    try {
      await removeFavorite(propertyId);
      setFavorites((prev) => prev.filter((f) => f.property?._id !== propertyId));
      toast.success("Removed from favorites");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to remove");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg-deep)" }}>
      <Header />

      <main style={{ paddingTop: "calc(76px + 2rem)", paddingBottom: "4rem" }}>
        <div className="container-shell" style={{ maxWidth: 1200 }}>
          <Link to="/dashboard" style={{
            display: "inline-flex", alignItems: "center", gap: "0.375rem",
            color: "var(--color-text-muted)", fontSize: "0.875rem",
            marginBottom: "1.5rem", textDecoration: "none",
          }}>
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>

          <div style={{ marginBottom: "2rem" }}>
            <h1 style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
              fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "0.5rem",
              display: "flex", alignItems: "center", gap: "0.75rem",
            }}>
              <Heart size={28} style={{ color: "var(--color-danger)", fill: "var(--color-danger)" }} />
              My <span className="gradient-text">Favorites</span>
            </h1>
            <p style={{ color: "var(--color-text-muted)", fontSize: "1rem" }}>
              Properties you've saved for later.
            </p>
          </div>

          {loading ? (
            <div style={{ display: "flex", justifyContent: "center", padding: "4rem 0" }}>
              <div style={{
                width: 40, height: 40, border: "3px solid var(--color-border)",
                borderTopColor: "var(--color-primary)", borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
              }} />
            </div>
          ) : favorites.length === 0 ? (
            <div style={{
              textAlign: "center", padding: "4rem 2rem",
              background: "var(--color-bg-card)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--color-border)",
            }}>
              <Heart size={48} style={{ color: "var(--color-text-muted)", marginBottom: "1rem" }} />
              <h3 style={{ color: "var(--color-text-bright)", marginBottom: "0.5rem", fontSize: "1.25rem" }}>
                No favorites yet
              </h3>
              <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>
                Browse properties and tap the heart icon to save them here.
              </p>
              <Link to="/properties" className="btn btn-primary">
                <Search size={16} /> Browse Properties
              </Link>
            </div>
          ) : (
            <>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
                {favorites.length} saved {favorites.length === 1 ? "property" : "properties"}
              </p>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "1.5rem",
              }}>
                {favorites.map((fav) => {
                  const property = fav.property;
                  if (!property) return null;
                  return (
                    <div
                      key={fav._id}
                      className="card-interactive"
                      style={{ overflow: "hidden", position: "relative" }}
                    >
                      <Link to={`/properties/${property._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                        <div style={{ position: "relative", height: 210, overflow: "hidden" }}>
                          <img
                            src={property.image || "/images/property1.png"}
                            alt={property.title}
                            style={{
                              width: "100%", height: "100%", objectFit: "cover",
                              transition: "transform 0.5s",
                            }}
                            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                          />
                          <div style={{
                            position: "absolute", inset: 0,
                            background: "linear-gradient(180deg, transparent 50%, rgba(10,14,26,0.8) 100%)",
                          }} />
                          <span className="badge badge-gold" style={{ position: "absolute", top: 12, left: 12 }}>
                            {property.badge || property.type}
                          </span>
                          <div style={{
                            position: "absolute", bottom: 12, left: 12,
                            fontWeight: 700, fontSize: "1.375rem",
                            color: "var(--color-primary-light)",
                            fontFamily: "var(--font-display)",
                          }}>
                            ${property.price?.toLocaleString()}
                          </div>
                        </div>
                        <div style={{ padding: "1.25rem" }}>
                          <h3 style={{
                            fontWeight: 600, fontSize: "1.0625rem",
                            color: "var(--color-text-bright)", marginBottom: "0.375rem",
                          }}>{property.title}</h3>
                          <div style={{
                            display: "flex", alignItems: "center", gap: "0.375rem",
                            color: "var(--color-text-muted)", fontSize: "0.8125rem",
                            marginBottom: "1rem",
                          }}>
                            <MapPin size={14} /> {property.location}
                          </div>
                          <div style={{
                            display: "flex", gap: "1rem",
                            borderTop: "1px solid var(--color-border)", paddingTop: "0.875rem",
                          }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>
                              <BedDouble size={15} style={{ color: "var(--color-primary)" }} /> {property.beds}
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>
                              <Bath size={15} style={{ color: "var(--color-primary)" }} /> {property.baths}
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>
                              <Maximize size={15} style={{ color: "var(--color-primary)" }} /> {property.area}
                            </div>
                          </div>
                        </div>
                      </Link>

                      {/* Remove button */}
                      <button
                        onClick={(e) => { e.stopPropagation(); handleRemove(property._id); }}
                        style={{
                          position: "absolute", top: 12, right: 12,
                          width: 36, height: 36, borderRadius: "50%",
                          background: "rgba(10,14,26,0.7)", backdropFilter: "blur(8px)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          cursor: "pointer", transition: "all 0.2s",
                        }}
                        title="Remove from favorites"
                      >
                        <Heart size={16} style={{ color: "#f87171", fill: "#f87171" }} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FavoritesPage;
