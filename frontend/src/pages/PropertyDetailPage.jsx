import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { MapPin, BedDouble, Bath, Maximize, ArrowLeft, Calendar, Star, Send, CheckCircle, Heart } from "lucide-react";
import { getPropertyById } from "../services/api/propertyService";
import { createBooking } from "../services/api/bookingService";
import { toggleFavorite, getFavoriteIds } from "../services/api/favoriteService";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const PropertyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const toast = useToast();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingNotes, setBookingNotes] = useState("");
  const [submittingBooking, setSubmittingBooking] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getPropertyById(id);
        setProperty(res.data || res);
      } catch {
        navigate("/properties");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  // Check if favorited
  useEffect(() => {
    if (user) {
      getFavoriteIds().then((res) => {
        setIsFavorited((res.data || []).includes(id));
      }).catch(() => {});
    }
  }, [user, id]);

  const handleToggleFavorite = async () => {
    if (!user) { toast.info("Please sign in to save favorites"); return; }
    try {
      const res = await toggleFavorite(id);
      setIsFavorited(res.favorited);
      toast.success(res.message);
    } catch { toast.error("Failed to update favorite"); }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login", { state: { from: `/properties/${id}` } });
      return;
    }
    try {
      setSubmittingBooking(true);
      await createBooking({ property: id, date: bookingDate, notes: bookingNotes });
      toast.success("Booking request submitted successfully!");
      setBookingDate("");
      setBookingNotes("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
    } finally {
      setSubmittingBooking(false);
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", background: "var(--color-bg-deep)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          width: 48, height: 48, border: "3px solid var(--color-border)",
          borderTopColor: "var(--color-primary)", borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }} />
      </div>
    );
  }

  if (!property) return null;

  const images = [property.image, ...(property.images || [])].filter(Boolean);

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg-deep)" }}>
      <Header />

      <main style={{ paddingTop: "calc(76px + 2rem)", paddingBottom: "4rem" }}>
        <div className="container-shell">
          {/* Back */}
          <Link to="/properties" style={{
            display: "inline-flex", alignItems: "center", gap: "0.375rem",
            color: "var(--color-text-muted)", fontSize: "0.875rem",
            marginBottom: "1.5rem", textDecoration: "none",
          }}>
            <ArrowLeft size={16} /> Back to Properties
          </Link>

          {/* Favorite button - floating */}
          <button
            onClick={handleToggleFavorite}
            style={{
              position: "fixed", bottom: 24, right: 24, zIndex: 50,
              width: 56, height: 56, borderRadius: "50%",
              background: isFavorited ? "rgba(248,113,113,0.15)" : "var(--color-bg-card)",
              border: isFavorited ? "2px solid rgba(248,113,113,0.3)" : "1px solid var(--color-border)",
              boxShadow: "var(--shadow-lg)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "all 0.3s",
            }}
            title={isFavorited ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart size={22} style={{ color: isFavorited ? "#f87171" : "var(--color-text-secondary)", fill: isFavorited ? "#f87171" : "none", transition: "all 0.2s" }} />
          </button>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 380px",
            gap: "2rem",
            alignItems: "start",
          }}>
            {/* Left Column */}
            <div>
              {/* Image Gallery */}
              <div style={{
                borderRadius: "var(--radius-xl)", overflow: "hidden",
                marginBottom: "1.5rem", position: "relative",
              }}>
                <img
                  src={images[activeImage] || "/images/property1.png"}
                  alt={property.title}
                  style={{
                    width: "100%", height: 420, objectFit: "cover",
                    borderRadius: "var(--radius-xl)",
                  }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(180deg, transparent 70%, rgba(10,14,26,0.4) 100%)",
                  borderRadius: "var(--radius-xl)",
                }} />
                {property.status && property.status !== "available" && (
                  <span className={`badge ${property.status === "sold" ? "badge-danger" : "badge-info"}`}
                    style={{ position: "absolute", top: 16, right: 16 }}>
                    {property.status.toUpperCase()}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div style={{ display: "flex", gap: "0.75rem", marginBottom: "2rem" }}>
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      style={{
                        width: 80, height: 60, borderRadius: "var(--radius-md)",
                        overflow: "hidden", border: i === activeImage
                          ? "2px solid var(--color-primary)"
                          : "2px solid transparent",
                        cursor: "pointer", background: "none", padding: 0,
                        opacity: i === activeImage ? 1 : 0.6,
                        transition: "all 0.2s",
                      }}
                    >
                      <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </button>
                  ))}
                </div>
              )}

              {/* Info */}
              <div className="card-surface" style={{ padding: "2rem", marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "1.25rem" }}>
                  <div>
                    <span className="badge badge-gold" style={{ marginBottom: "0.75rem" }}>{property.badge || property.type}</span>
                    <h1 style={{
                      fontSize: "1.75rem", fontWeight: 700,
                      color: "var(--color-text-bright)", marginBottom: "0.375rem",
                      fontFamily: "var(--font-display)",
                    }}>
                      {property.title}
                    </h1>
                    <div style={{
                      display: "flex", alignItems: "center", gap: "0.375rem",
                      color: "var(--color-text-muted)", fontSize: "0.9375rem",
                    }}>
                      <MapPin size={16} /> {property.location}
                    </div>
                  </div>
                  <div style={{
                    fontSize: "2rem", fontWeight: 800,
                    color: "var(--color-primary)",
                    fontFamily: "var(--font-display)",
                  }}>
                    ${property.price?.toLocaleString()}
                  </div>
                </div>

                {/* Stats */}
                <div style={{
                  display: "flex", gap: "1.5rem", flexWrap: "wrap",
                  padding: "1.25rem 0",
                  borderTop: "1px solid var(--color-border)",
                  borderBottom: "1px solid var(--color-border)",
                  marginBottom: "1.5rem",
                }}>
                  {[
                    { icon: BedDouble, label: "Bedrooms", val: property.beds },
                    { icon: Bath, label: "Bathrooms", val: property.baths },
                    { icon: Maximize, label: "Area", val: property.area },
                  ].map(({ icon: Icon, label, val }, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: "var(--radius-md)",
                        background: "rgba(201,168,76,0.1)",
                        border: "1px solid rgba(201,168,76,0.15)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <Icon size={20} style={{ color: "var(--color-primary)" }} />
                      </div>
                      <div>
                        <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>{label}</div>
                        <div style={{ fontWeight: 600, color: "var(--color-text-bright)" }}>{val}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <h3 style={{ fontWeight: 600, color: "var(--color-text-bright)", marginBottom: "0.75rem" }}>Description</h3>
                <p style={{
                  color: "var(--color-text-secondary)", lineHeight: 1.7,
                  fontSize: "0.9375rem",
                }}>
                  {property.description || "This stunning property offers a perfect blend of modern elegance and comfortable living. Located in a prime area with easy access to amenities, schools, and transportation. The spacious interiors feature premium finishes and abundant natural light throughout."}
                </p>

                {/* Amenities */}
                {property.amenities?.length > 0 && (
                  <div style={{ marginTop: "1.5rem" }}>
                    <h3 style={{ fontWeight: 600, color: "var(--color-text-bright)", marginBottom: "0.75rem" }}>Amenities</h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                      {property.amenities.map((a, i) => (
                        <span key={i} style={{
                          padding: "0.375rem 0.875rem",
                          borderRadius: "var(--radius-full)",
                          background: "rgba(201,168,76,0.08)",
                          border: "1px solid rgba(201,168,76,0.12)",
                          color: "var(--color-text-secondary)",
                          fontSize: "0.8125rem",
                          display: "flex", alignItems: "center", gap: "0.25rem",
                        }}>
                          <CheckCircle size={13} style={{ color: "var(--color-primary)" }} /> {a}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar - Booking */}
            <div style={{ position: "sticky", top: "calc(76px + 2rem)" }}>
              <div className="card-surface" style={{ padding: "1.75rem" }}>
                <h3 style={{
                  fontWeight: 600, fontSize: "1.125rem",
                  color: "var(--color-text-bright)", marginBottom: "1.25rem",
                }}>Schedule a Visit</h3>

                <form onSubmit={handleBooking} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div className="form-group">
                    <label className="form-label">Preferred Date</label>
                    <div style={{ position: "relative" }}>
                      <Calendar size={16} style={{
                        position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
                        color: "var(--color-text-muted)",
                      }} />
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        style={{ width: "100%", paddingLeft: "2.5rem" }}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Notes (Optional)</label>
                    <textarea
                      placeholder="Any specific requirements..."
                      value={bookingNotes}
                      onChange={(e) => setBookingNotes(e.target.value)}
                      rows={3}
                      style={{ width: "100%", resize: "vertical" }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submittingBooking}
                    className="btn btn-primary"
                    style={{ width: "100%" }}
                  >
                    {submittingBooking ? "Submitting..." : (
                      <><Send size={16} /> Book Visit</>
                    )}
                  </button>
                </form>

                {!user && (
                  <p style={{
                    textAlign: "center", fontSize: "0.8125rem",
                    color: "var(--color-text-muted)", marginTop: "0.875rem",
                  }}>
                    <Link to="/login" style={{ color: "var(--color-primary)" }}>Sign in</Link> to schedule a visit.
                  </p>
                )}
              </div>

              {/* Agent Card */}
              <div className="card-surface" style={{ padding: "1.5rem", marginTop: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 700, color: "#0a0e1a", fontSize: "1rem",
                  }}>HS</div>
                  <div>
                    <div style={{ fontWeight: 600, color: "var(--color-text-bright)" }}>HavenSphere Agent</div>
                    <div style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>Verified Expert</div>
                  </div>
                </div>
                <div style={{
                  display: "flex", alignItems: "center", gap: "0.25rem",
                  marginBottom: "0.75rem",
                }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} style={{ color: "#c9a84c", fill: "#c9a84c" }} />
                  ))}
                  <span style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", marginLeft: "0.25rem" }}>5.0</span>
                </div>
                <a href="tel:+15551234567" className="btn btn-secondary" style={{ width: "100%" }}>
                  Contact Agent
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        @media (max-width: 960px) {
          main .container-shell > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PropertyDetailPage;
