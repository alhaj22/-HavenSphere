import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, Home, Calendar, User, Shield, LogOut, Settings, Building2, Clock, ArrowRight, Eye, Heart } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { getBookings } from "../services/api/bookingService";
import Header from "../components/Header/Header";

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getBookings();
        setBookings(res.data || res || []);
      } catch {
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const recentBookings = Array.isArray(bookings) ? bookings.slice(0, 5) : [];

  const statusBadge = (status) => {
    const map = {
      pending: "badge-warning",
      confirmed: "badge-success",
      cancelled: "badge-danger",
    };
    return map[status] || "badge-info";
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg-deep)" }}>
      <Header />
      <main style={{ paddingTop: "calc(76px + 2rem)", paddingBottom: "4rem" }}>
        <div className="container-shell" style={{ maxWidth: 1100 }}>
          {/* Welcome */}
          <div style={{
            background: "linear-gradient(135deg, rgba(201,168,76,0.1) 0%, rgba(10,14,26,0.9) 100%)",
            border: "1px solid rgba(201,168,76,0.15)",
            borderRadius: "var(--radius-xl)",
            padding: "2.5rem",
            marginBottom: "2rem",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: -40, right: -40,
              width: 150, height: 150, borderRadius: "50%",
              background: "rgba(201,168,76,0.08)", filter: "blur(40px)",
            }} />
            <div style={{ position: "relative" }}>
              <div style={{
                display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem",
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700, fontSize: "1.25rem", color: "#0a0e1a",
                }}>
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                  <h1 style={{
                    fontSize: "1.5rem", fontWeight: 700,
                    color: "var(--color-text-bright)", marginBottom: "0.125rem",
                  }}>
                    Welcome back, {user?.name?.split(" ")[0]}!
                  </h1>
                  <p style={{ color: "var(--color-text-muted)", fontSize: "0.9375rem" }}>
                    {user?.role === "admin" ? "Administrator" : "Member"} • {user?.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1rem",
            marginBottom: "2rem",
          }}>
            {[
              { icon: Home, label: "Browse Properties", to: "/properties", color: "#c9a84c" },
              { icon: User, label: "My Profile", to: "/profile", color: "#60a5fa" },
              { icon: Heart, label: "My Favorites", to: "/favorites", color: "#f87171" },
              { icon: Calendar, label: "My Bookings", to: "#bookings", color: "#34d399" },
              ...(user?.role === "admin" ? [{ icon: Shield, label: "Admin Panel", to: "/admin", color: "#a78bfa" }] : []),
            ].map((item, i) => (
              <Link
                key={i}
                to={item.to}
                className="card-interactive"
                style={{
                  padding: "1.5rem", textDecoration: "none",
                  display: "flex", flexDirection: "column", alignItems: "center",
                  textAlign: "center", gap: "0.75rem",
                }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: "var(--radius-md)",
                  background: `${item.color}15`,
                  border: `1px solid ${item.color}25`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <item.icon size={22} style={{ color: item.color }} />
                </div>
                <span style={{ fontWeight: 600, color: "var(--color-text-bright)", fontSize: "0.9375rem" }}>
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Recent Bookings */}
          <div id="bookings" className="card-surface" style={{ overflow: "hidden" }}>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "1.25rem 1.5rem",
              borderBottom: "1px solid var(--color-border)",
            }}>
              <h2 style={{ fontWeight: 600, fontSize: "1.125rem", color: "var(--color-text-bright)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Calendar size={18} style={{ color: "var(--color-primary)" }} /> Recent Bookings
              </h2>
            </div>
            <div style={{ padding: "0.5rem" }}>
              {loading ? (
                <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
                  <div style={{
                    width: 32, height: 32, border: "3px solid var(--color-border)",
                    borderTopColor: "var(--color-primary)", borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                  }} />
                </div>
              ) : recentBookings.length === 0 ? (
                <div style={{ textAlign: "center", padding: "3rem 2rem" }}>
                  <Calendar size={40} style={{ color: "var(--color-text-muted)", marginBottom: "0.75rem" }} />
                  <p style={{ color: "var(--color-text-muted)" }}>No bookings yet.</p>
                  <Link to="/properties" className="btn btn-primary btn-sm" style={{ marginTop: "0.75rem" }}>
                    Browse Properties
                  </Link>
                </div>
              ) : (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Property</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((b) => (
                      <tr key={b._id}>
                        <td>
                          <span style={{ fontWeight: 500, color: "var(--color-text-bright)" }}>
                            {b.property?.title || "Property"}
                          </span>
                        </td>
                        <td>{new Date(b.date).toLocaleDateString()}</td>
                        <td>
                          <span className={`badge ${statusBadge(b.status)}`}>{b.status}</span>
                        </td>
                        <td>{new Date(b.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
