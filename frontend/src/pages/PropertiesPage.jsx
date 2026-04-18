import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, MapPin, BedDouble, Bath, Maximize, SlidersHorizontal, X, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { getProperties } from "../services/api/propertyService";
import { getFavoriteIds, toggleFavorite } from "../services/api/favoriteService";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import HeaderComponent from "../components/Header/Header";
import FooterComponent from "../components/Footer/Footer";

const PropertiesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const toast = useToast();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState([]);

  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    type: searchParams.get("type") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    beds: searchParams.get("beds") || "",
    status: searchParams.get("status") || "",
    page: Number(searchParams.get("page")) || 1,
  });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const params = {};
        if (filters.search) params.search = filters.search;
        if (filters.type) params.type = filters.type;
        if (filters.minPrice) params.minPrice = filters.minPrice;
        if (filters.maxPrice) params.maxPrice = filters.maxPrice;
        if (filters.beds) params.beds = filters.beds;
        if (filters.status) params.status = filters.status;
        params.page = filters.page;
        params.limit = 12;

        const res = await getProperties(params);
        if (Array.isArray(res)) {
          setProperties(res);
        } else {
          setProperties(res.data || []);
          setPagination(res.pagination || null);
        }
      } catch {
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [filters.page, filters.type, filters.status]);

  // Load favorite IDs
  useEffect(() => {
    if (user) {
      getFavoriteIds().then((res) => setFavoriteIds(res.data || [])).catch(() => {});
    }
  }, [user]);

  const handleToggleFavorite = async (e, propertyId) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) { toast.info("Please sign in to save favorites"); return; }
    try {
      const res = await toggleFavorite(propertyId);
      if (res.favorited) {
        setFavoriteIds((prev) => [...prev, propertyId]);
      } else {
        setFavoriteIds((prev) => prev.filter((id) => id !== propertyId));
      }
    } catch { toast.error("Failed to update favorite"); }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setFilters((p) => ({ ...p, page: 1 }));
    const params = {};
    Object.entries(filters).forEach(([k, v]) => { if (v && k !== "page") params[k] = v; });
    setSearchParams(params);
    // Trigger refetch
    setFilters((p) => ({ ...p }));
  };

  const clearFilters = () => {
    setFilters({ search: "", type: "", minPrice: "", maxPrice: "", beds: "", status: "", page: 1 });
    setSearchParams({});
  };

  const propertyTypes = ["Apartment", "Villa", "House", "Townhouse", "Penthouse", "Commercial", "Land"];

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg-deep)" }}>
      <HeaderComponent />

      {/* Hero Section */}
      <section style={{
        paddingTop: "calc(76px + 3rem)",
        paddingBottom: "2rem",
        background: "linear-gradient(180deg, rgba(201,168,76,0.05) 0%, transparent 100%)",
      }}>
        <div className="container-shell">
          <h1 style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "0.5rem",
          }}>
            Explore <span className="gradient-text">Properties</span>
          </h1>
          <p style={{ color: "var(--color-text-muted)", fontSize: "1rem" }}>
            Discover your perfect property from our curated collection.
          </p>

          {/* Search */}
          <form onSubmit={handleSearch} style={{
            display: "flex", gap: "0.75rem", marginTop: "1.5rem", flexWrap: "wrap",
          }}>
            <div style={{
              flex: 1, minWidth: 250, position: "relative",
              display: "flex", alignItems: "center",
            }}>
              <Search size={16} style={{
                position: "absolute", left: 12, color: "var(--color-text-muted)",
              }} />
              <input
                type="text"
                placeholder="Search by location, title..."
                value={filters.search}
                onChange={(e) => setFilters((p) => ({ ...p, search: e.target.value }))}
                style={{ width: "100%", paddingLeft: "2.5rem" }}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              <Search size={16} /> Search
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              <SlidersHorizontal size={16} /> Filters
            </button>
          </form>

          {/* Filters Panel */}
          {filtersOpen && (
            <div style={{
              marginTop: "1rem",
              padding: "1.5rem",
              background: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-lg)",
              animation: "slideDown 0.2s ease",
            }}>
              <div style={{
                display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                gap: "1rem",
              }}>
                <div className="form-group">
                  <label className="form-label">Type</label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters((p) => ({ ...p, type: e.target.value, page: 1 }))}
                    style={{ width: "100%" }}
                  >
                    <option value="">All Types</option>
                    {propertyTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Min Price ($)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={filters.minPrice}
                    onChange={(e) => setFilters((p) => ({ ...p, minPrice: e.target.value }))}
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Max Price ($)</label>
                  <input
                    type="number"
                    placeholder="Any"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters((p) => ({ ...p, maxPrice: e.target.value }))}
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Bedrooms</label>
                  <select
                    value={filters.beds}
                    onChange={(e) => setFilters((p) => ({ ...p, beds: e.target.value }))}
                    style={{ width: "100%" }}
                  >
                    <option value="">Any</option>
                    {[1, 2, 3, 4, 5].map((b) => <option key={b} value={b}>{b}+</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters((p) => ({ ...p, status: e.target.value, page: 1 }))}
                    style={{ width: "100%" }}
                  >
                    <option value="">All</option>
                    <option value="available">Available</option>
                    <option value="sold">Sold</option>
                    <option value="rented">Rented</option>
                  </select>
                </div>
              </div>
              <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
                <button onClick={handleSearch} className="btn btn-primary btn-sm">Apply Filters</button>
                <button onClick={clearFilters} className="btn btn-ghost btn-sm">
                  <X size={14} /> Clear All
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Results */}
      <section style={{ paddingBottom: "4rem" }}>
        <div className="container-shell">
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center", padding: "4rem 0" }}>
              <div style={{
                width: 40, height: 40, border: "3px solid var(--color-border)",
                borderTopColor: "var(--color-primary)", borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
              }} />
            </div>
          ) : properties.length === 0 ? (
            <div style={{
              textAlign: "center", padding: "4rem 2rem",
              background: "var(--color-bg-card)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--color-border)",
            }}>
              <Search size={48} style={{ color: "var(--color-text-muted)", marginBottom: "1rem" }} />
              <h3 style={{ color: "var(--color-text-bright)", marginBottom: "0.5rem" }}>No properties found</h3>
              <p style={{ color: "var(--color-text-muted)" }}>Try adjusting your filters or search query.</p>
              <button onClick={clearFilters} className="btn btn-primary" style={{ marginTop: "1rem" }}>Clear Filters</button>
            </div>
          ) : (
            <>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
                Showing {properties.length} {pagination ? `of ${pagination.total}` : ""} properties
              </p>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "1.5rem",
              }}>
                {properties.map((property) => (
                  <Link
                    key={property._id || property.id}
                    to={`/properties/${property._id || property.id}`}
                    className="card-interactive"
                    style={{ overflow: "hidden", textDecoration: "none" }}
                  >
                    <div style={{ position: "relative", height: 210, overflow: "hidden" }}>
                      <img
                        src={property.image || "/images/property1.png"}
                        alt={property.title}
                        style={{
                          width: "100%", height: "100%", objectFit: "cover",
                          transition: "transform 0.5s",
                        }}
                        onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                        onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                      />
                      <div style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(180deg, transparent 50%, rgba(10,14,26,0.8) 100%)",
                      }} />
                      <span className="badge badge-gold" style={{ position: "absolute", top: 12, left: 12 }}>
                        {property.badge || property.type}
                      </span>
                      {property.status && property.status !== "available" && (
                        <span className={`badge ${property.status === "sold" ? "badge-danger" : "badge-info"}`}
                          style={{ position: "absolute", top: 12, right: 12 }}>
                          {property.status}
                        </span>
                      )}
                      {/* Favorite Button */}
                      <button
                        onClick={(e) => handleToggleFavorite(e, property._id || property.id)}
                        style={{
                          position: "absolute", top: 12, right: property.status && property.status !== "available" ? 80 : 12,
                          width: 36, height: 36, borderRadius: "50%",
                          background: "rgba(10,14,26,0.6)", backdropFilter: "blur(8px)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          cursor: "pointer", transition: "all 0.2s", zIndex: 2,
                        }}
                        title={favoriteIds.includes(property._id || property.id) ? "Remove from favorites" : "Add to favorites"}
                      >
                        <Heart
                          size={16}
                          style={{
                            color: favoriteIds.includes(property._id || property.id) ? "#f87171" : "rgba(255,255,255,0.7)",
                            fill: favoriteIds.includes(property._id || property.id) ? "#f87171" : "none",
                            transition: "all 0.2s",
                          }}
                        />
                      </button>
                      <div style={{
                        position: "absolute", bottom: 12, left: 12,
                        fontWeight: 700, fontSize: "1.375rem",
                        color: "var(--color-primary-light)",
                        fontFamily: "var(--font-display)",
                      }}>
                        ${property.price?.toLocaleString() || property.price}
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
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.pages > 1 && (
                <div style={{
                  display: "flex", justifyContent: "center", alignItems: "center",
                  gap: "0.5rem", marginTop: "2.5rem",
                }}>
                  <button
                    onClick={() => setFilters((p) => ({ ...p, page: p.page - 1 }))}
                    disabled={filters.page <= 1}
                    className="btn btn-secondary btn-sm"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span style={{ color: "var(--color-text-secondary)", fontSize: "0.875rem", padding: "0 0.75rem" }}>
                    Page {pagination.page} of {pagination.pages}
                  </span>
                  <button
                    onClick={() => setFilters((p) => ({ ...p, page: p.page + 1 }))}
                    disabled={filters.page >= pagination.pages}
                    className="btn btn-secondary btn-sm"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <FooterComponent />
    </div>
  );
};

export default PropertiesPage;
