import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard, Users, Building2, Calendar, Star,
  Search, Plus, Edit, Trash2, Ban, CheckCircle,
  ChevronLeft, ChevronRight, X, LogOut, ArrowLeft,
  BarChart3, Eye, EyeOff, Upload, Image,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import {
  getAnalytics, getAllUsers, createUser, updateUser,
  deleteUser, toggleBlockUser,
  adminGetProperties, adminCreateProperty, adminUpdateProperty,
  adminDeleteProperty, togglePropertyVisibility, uploadImage,
} from "../services/api/adminService";

const PROPERTY_TYPES = ["Apartment", "Villa", "Townhouse", "Penthouse", "House", "Commercial", "Land"];
const PROPERTY_STATUSES = ["available", "sold", "rented"];
const AMENITIES_LIST = ["Pool", "Gym", "Parking", "Security", "Garden", "Elevator", "Balcony", "AC", "WiFi", "Furnished", "Laundry", "Pet Friendly"];

const AdminPage = () => {
  const { user, logout } = useAuth();
  const toast = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Analytics
  const [analytics, setAnalytics] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);

  // Users
  const [users, setUsers] = useState([]);
  const [usersPagination, setUsersPagination] = useState(null);
  const [usersPage, setUsersPage] = useState(1);
  const [usersSearch, setUsersSearch] = useState("");
  const [usersLoading, setUsersLoading] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userForm, setUserForm] = useState({ name: "", email: "", password: "", role: "user" });

  // Properties
  const [properties, setProperties] = useState([]);
  const [propertiesPagination, setPropertiesPagination] = useState(null);
  const [propertiesPage, setPropertiesPage] = useState(1);
  const [propertiesSearch, setPropertiesSearch] = useState("");
  const [propertiesLoading, setPropertiesLoading] = useState(false);
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [propertyForm, setPropertyForm] = useState({
    title: "", description: "", price: "", location: "",
    beds: 1, baths: 1, area: "", type: "Apartment",
    status: "available", badge: "New", isFeatured: false,
    image: "", amenities: [],
  });
  const [uploading, setUploading] = useState(false);

  // Load analytics
  useEffect(() => {
    if (activeTab === "dashboard") loadAnalytics();
  }, [activeTab]);

  // Load users
  useEffect(() => {
    if (activeTab === "users") loadUsers();
  }, [activeTab, usersPage]);

  // Load properties
  useEffect(() => {
    if (activeTab === "properties") loadProperties();
  }, [activeTab, propertiesPage]);

  const loadAnalytics = async () => {
    try {
      setAnalyticsLoading(true);
      const res = await getAnalytics();
      setAnalytics(res.data);
    } catch { toast.error("Failed to load analytics"); }
    finally { setAnalyticsLoading(false); }
  };

  const loadUsers = async () => {
    try {
      setUsersLoading(true);
      const params = { page: usersPage, limit: 10 };
      if (usersSearch) params.search = usersSearch;
      const res = await getAllUsers(params);
      setUsers(res.data || []);
      setUsersPagination(res.pagination || null);
    } catch { toast.error("Failed to load users"); }
    finally { setUsersLoading(false); }
  };

  const loadProperties = async () => {
    try {
      setPropertiesLoading(true);
      const params = { page: propertiesPage, limit: 10 };
      if (propertiesSearch) params.search = propertiesSearch;
      const res = await adminGetProperties(params);
      setProperties(res.data || []);
      setPropertiesPagination(res.pagination || null);
    } catch { toast.error("Failed to load properties"); }
    finally { setPropertiesLoading(false); }
  };

  // ========== User Handlers ==========
  const handleSearchUsers = (e) => { e.preventDefault(); setUsersPage(1); loadUsers(); };

  const handleSaveUser = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await updateUser(editingUser._id, userForm);
        toast.success("User updated!");
      } else {
        await createUser(userForm);
        toast.success("User created!");
      }
      setShowUserModal(false);
      setEditingUser(null);
      setUserForm({ name: "", email: "", password: "", role: "user" });
      loadUsers();
    } catch (err) { toast.error(err.response?.data?.message || "Failed to save user"); }
  };

  const handleDeleteUser = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try { await deleteUser(id); toast.success("User deleted!"); loadUsers(); }
    catch (err) { toast.error(err.response?.data?.message || "Failed to delete user"); }
  };

  const handleToggleBlock = async (id) => {
    try { const res = await toggleBlockUser(id); toast.success(res.message); loadUsers(); }
    catch (err) { toast.error(err.response?.data?.message || "Failed"); }
  };

  const openEditUser = (u) => {
    setEditingUser(u);
    setUserForm({ name: u.name, email: u.email, password: "", role: u.role });
    setShowUserModal(true);
  };

  const openCreateUser = () => {
    setEditingUser(null);
    setUserForm({ name: "", email: "", password: "", role: "user" });
    setShowUserModal(true);
  };

  // ========== Property Handlers ==========
  const handleSearchProperties = (e) => { e.preventDefault(); setPropertiesPage(1); loadProperties(); };

  const handleSaveProperty = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...propertyForm, price: Number(propertyForm.price), beds: Number(propertyForm.beds), baths: Number(propertyForm.baths) };
      if (editingProperty) {
        await adminUpdateProperty(editingProperty._id, payload);
        toast.success("Property updated!");
      } else {
        await adminCreateProperty(payload);
        toast.success("Property created!");
      }
      setShowPropertyModal(false);
      setEditingProperty(null);
      resetPropertyForm();
      loadProperties();
    } catch (err) { toast.error(err.response?.data?.message || "Failed to save property"); }
  };

  const handleDeleteProperty = async (id) => {
    if (!confirm("Are you sure you want to delete this property?")) return;
    try { await adminDeleteProperty(id); toast.success("Property deleted!"); loadProperties(); }
    catch (err) { toast.error(err.response?.data?.message || "Failed to delete property"); }
  };

  const handleToggleVisibility = async (id) => {
    try { const res = await togglePropertyVisibility(id); toast.success(res.message); loadProperties(); }
    catch (err) { toast.error(err.response?.data?.message || "Failed"); }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const res = await uploadImage(file);
      setPropertyForm((p) => ({ ...p, image: res.data.url }));
      toast.success("Image uploaded!");
    } catch (err) { toast.error(err.response?.data?.message || "Upload failed"); }
    finally { setUploading(false); }
  };

  const toggleAmenity = (amenity) => {
    setPropertyForm((p) => ({
      ...p,
      amenities: p.amenities.includes(amenity)
        ? p.amenities.filter((a) => a !== amenity)
        : [...p.amenities, amenity],
    }));
  };

  const openEditProperty = (p) => {
    setEditingProperty(p);
    setPropertyForm({
      title: p.title || "", description: p.description || "", price: p.price || "",
      location: p.location || "", beds: p.beds || 1, baths: p.baths || 1,
      area: p.area || "", type: p.type || "Apartment", status: p.status || "available",
      badge: p.badge || "New", isFeatured: p.isFeatured || false,
      image: p.image || "", amenities: p.amenities || [],
    });
    setShowPropertyModal(true);
  };

  const openCreateProperty = () => {
    setEditingProperty(null);
    resetPropertyForm();
    setShowPropertyModal(true);
  };

  const resetPropertyForm = () => {
    setPropertyForm({
      title: "", description: "", price: "", location: "",
      beds: 1, baths: 1, area: "", type: "Apartment",
      status: "available", badge: "New", isFeatured: false,
      image: "", amenities: [],
    });
  };

  const sidebarItems = [
    { key: "dashboard", icon: BarChart3, label: "Dashboard" },
    { key: "users", icon: Users, label: "Users" },
    { key: "properties", icon: Building2, label: "Properties" },
  ];

  return (
    <div className="admin-layout">
      {/* Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 39, display: "none" }}
          className="mobile-overlay"
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div style={{ padding: "0 1.25rem", marginBottom: "2rem" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
            <div style={{
              width: 36, height: 36, borderRadius: "0.5rem",
              background: "linear-gradient(135deg, #c9a84c, #e0c774)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 800, fontSize: "1rem", color: "#0a0e1a",
              fontFamily: "var(--font-display)",
            }}>H</div>
            <span style={{
              fontFamily: "var(--font-display)", fontWeight: 700,
              fontSize: "1.25rem", color: "var(--color-text-bright)",
            }}>
              Haven<span style={{ color: "var(--color-primary)" }}>Sphere</span>
            </span>
          </Link>
        </div>

        <div style={{ padding: "0 0.75rem", marginBottom: "1rem" }}>
          <span style={{
            fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase",
            letterSpacing: "0.08em", color: "var(--color-text-muted)", padding: "0 0.5rem",
          }}>Admin Menu</span>
        </div>

        <nav style={{ flex: 1, padding: "0 0.75rem" }}>
          {sidebarItems.map((item) => (
            <button
              key={item.key}
              onClick={() => { setActiveTab(item.key); setSidebarOpen(false); }}
              style={{
                display: "flex", alignItems: "center", gap: "0.75rem",
                width: "100%", padding: "0.75rem 0.75rem",
                borderRadius: "var(--radius-md)", border: "none", cursor: "pointer",
                fontSize: "0.9375rem", fontWeight: 500, marginBottom: "0.25rem",
                transition: "all 0.15s",
                background: activeTab === item.key ? "rgba(201,168,76,0.1)" : "transparent",
                color: activeTab === item.key ? "var(--color-primary)" : "var(--color-text-secondary)",
              }}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: "1rem 1.25rem", borderTop: "1px solid var(--color-border)", marginTop: "auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.75rem" }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 700, fontSize: "0.8125rem", color: "#0a0e1a",
            }}>
              {user?.name?.charAt(0).toUpperCase() || "A"}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontWeight: 600, fontSize: "0.8125rem", color: "var(--color-text-bright)",
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
              }}>{user?.name}</div>
              <div style={{ fontSize: "0.6875rem", color: "var(--color-text-muted)" }}>Admin</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Link to="/dashboard" className="btn btn-ghost btn-sm" style={{ flex: 1, fontSize: "0.75rem" }}>
              <ArrowLeft size={14} /> Back
            </Link>
            <button onClick={logout} className="btn btn-ghost btn-sm" style={{ flex: 1, fontSize: "0.75rem", color: "var(--color-danger)" }}>
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="admin-main">
        {/* Mobile Header */}
        <div style={{ display: "none", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }} className="admin-mobile-header">
          <button onClick={() => setSidebarOpen(true)} className="btn btn-secondary btn-sm">
            <LayoutDashboard size={16} /> Menu
          </button>
          <span style={{ fontWeight: 600, color: "var(--color-text-bright)" }}>Admin Panel</span>
        </div>

        {/* ===== DASHBOARD TAB ===== */}
        {activeTab === "dashboard" && (
          <div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "0.5rem" }}>Admin Dashboard</h1>
            <p style={{ color: "var(--color-text-muted)", marginBottom: "2rem" }}>Overview of your platform's key metrics and activity.</p>

            {analyticsLoading ? (
              <div style={{ display: "flex", justifyContent: "center", padding: "4rem" }}>
                <div style={{ width: 40, height: 40, border: "3px solid var(--color-border)", borderTopColor: "var(--color-primary)", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
              </div>
            ) : analytics && (
              <>
                {/* Stats Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
                  {[
                    { label: "Total Users", value: analytics.counts?.users || 0, icon: Users, color: "#60a5fa", bg: "rgba(96,165,250,0.1)" },
                    { label: "Properties", value: analytics.counts?.properties || 0, icon: Building2, color: "#c9a84c", bg: "rgba(201,168,76,0.1)" },
                    { label: "Bookings", value: analytics.counts?.bookings || 0, icon: Calendar, color: "#34d399", bg: "rgba(52,211,153,0.1)" },
                    { label: "Reviews", value: analytics.counts?.reviews || 0, icon: Star, color: "#fbbf24", bg: "rgba(251,191,36,0.1)" },
                  ].map((stat, i) => (
                    <div key={i} className="stat-card">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                          <p style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", marginBottom: "0.375rem" }}>{stat.label}</p>
                          <p style={{ fontSize: "2rem", fontWeight: 800, color: "var(--color-text-bright)", fontFamily: "var(--font-display)", lineHeight: 1 }}>{stat.value}</p>
                        </div>
                        <div style={{ width: 48, height: 48, borderRadius: "var(--radius-md)", background: stat.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <stat.icon size={22} style={{ color: stat.color }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Charts Row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
                  <div className="card-surface" style={{ padding: "1.5rem" }}>
                    <h3 style={{ fontWeight: 600, color: "var(--color-text-bright)", marginBottom: "1.25rem", fontSize: "1rem" }}>Properties by Type</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      {(analytics.propertiesByType || []).map((pt, i) => {
                        const total = analytics.counts?.properties || 1;
                        const pct = Math.round((pt.count / total) * 100);
                        return (
                          <div key={i}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.375rem" }}>
                              <span style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>{pt._id}</span>
                              <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-text-bright)" }}>{pt.count}</span>
                            </div>
                            <div style={{ height: 6, borderRadius: 3, background: "var(--color-bg-dark)", overflow: "hidden" }}>
                              <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, var(--color-primary), var(--color-primary-light))", borderRadius: 3, transition: "width 0.5s ease" }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="card-surface" style={{ padding: "1.5rem" }}>
                    <h3 style={{ fontWeight: 600, color: "var(--color-text-bright)", marginBottom: "1.25rem", fontSize: "1rem" }}>Bookings by Status</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      {(analytics.bookingsByStatus || []).map((bs, i) => {
                        const colorMap = { pending: "#fbbf24", confirmed: "#34d399", cancelled: "#f87171" };
                        const total = analytics.counts?.bookings || 1;
                        const pct = Math.round((bs.count / total) * 100);
                        return (
                          <div key={i}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.375rem" }}>
                              <span style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", textTransform: "capitalize" }}>{bs._id}</span>
                              <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-text-bright)" }}>{bs.count}</span>
                            </div>
                            <div style={{ height: 6, borderRadius: 3, background: "var(--color-bg-dark)", overflow: "hidden" }}>
                              <div style={{ height: "100%", width: `${pct}%`, background: colorMap[bs._id] || "var(--color-primary)", borderRadius: 3, transition: "width 0.5s ease" }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                  <div className="card-surface" style={{ overflow: "hidden" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 1.25rem", borderBottom: "1px solid var(--color-border)" }}>
                      <h3 style={{ fontWeight: 600, color: "var(--color-text-bright)", fontSize: "0.9375rem" }}>Recent Users</h3>
                      <button onClick={() => setActiveTab("users")} className="btn btn-ghost btn-sm" style={{ fontSize: "0.75rem" }}>View All</button>
                    </div>
                    <div style={{ padding: "0.5rem" }}>
                      {(analytics.recentUsers || []).map((u, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.625rem 0.75rem", borderRadius: "var(--radius-md)" }}>
                          <div style={{
                            width: 36, height: 36, borderRadius: "50%",
                            background: u.role === "admin" ? "rgba(201,168,76,0.15)" : "rgba(96,165,250,0.15)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontWeight: 600, fontSize: "0.8125rem",
                            color: u.role === "admin" ? "var(--color-primary)" : "var(--color-info)",
                          }}>
                            {u.name?.charAt(0).toUpperCase()}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 500, fontSize: "0.8125rem", color: "var(--color-text-bright)" }}>{u.name}</div>
                            <div style={{ fontSize: "0.6875rem", color: "var(--color-text-muted)" }}>{u.email}</div>
                          </div>
                          <span className={`badge ${u.role === "admin" ? "badge-gold" : "badge-info"}`} style={{ fontSize: "0.6875rem" }}>{u.role}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="card-surface" style={{ overflow: "hidden" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 1.25rem", borderBottom: "1px solid var(--color-border)" }}>
                      <h3 style={{ fontWeight: 600, color: "var(--color-text-bright)", fontSize: "0.9375rem" }}>Recent Properties</h3>
                      <button onClick={() => setActiveTab("properties")} className="btn btn-ghost btn-sm" style={{ fontSize: "0.75rem" }}>View All</button>
                    </div>
                    <div style={{ padding: "0.5rem" }}>
                      {(analytics.recentProperties || []).map((p, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.625rem 0.75rem", borderRadius: "var(--radius-md)" }}>
                          <div style={{
                            width: 36, height: 36, borderRadius: "var(--radius-md)",
                            background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.15)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}>
                            <Building2 size={16} style={{ color: "var(--color-primary)" }} />
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontWeight: 500, fontSize: "0.8125rem", color: "var(--color-text-bright)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.title}</div>
                            <div style={{ fontSize: "0.6875rem", color: "var(--color-text-muted)" }}>{p.location}</div>
                          </div>
                          <span style={{ fontWeight: 600, fontSize: "0.8125rem", color: "var(--color-primary)" }}>${p.price?.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* ===== USERS TAB ===== */}
        {activeTab === "users" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "0.25rem" }}>User Management</h1>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>Manage all registered users on the platform.</p>
              </div>
              <button onClick={openCreateUser} className="btn btn-primary"><Plus size={16} /> Add User</button>
            </div>

            <form onSubmit={handleSearchUsers} style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div style={{ position: "relative", flex: 1, maxWidth: 400 }}>
                <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} />
                <input type="text" placeholder="Search users..." value={usersSearch} onChange={(e) => setUsersSearch(e.target.value)} style={{ width: "100%", paddingLeft: "2.5rem" }} />
              </div>
              <button type="submit" className="btn btn-secondary btn-sm"><Search size={14} /> Search</button>
            </form>

            <div className="card-surface" style={{ overflow: "hidden" }}>
              {usersLoading ? (
                <div style={{ display: "flex", justifyContent: "center", padding: "3rem" }}>
                  <div style={{ width: 36, height: 36, border: "3px solid var(--color-border)", borderTopColor: "var(--color-primary)", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                </div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>User</th><th>Email</th><th>Role</th><th>Status</th><th>Joined</th><th style={{ textAlign: "right" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => (
                        <tr key={u._id}>
                          <td>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                              <div style={{
                                width: 34, height: 34, borderRadius: "50%",
                                background: u.role === "admin" ? "rgba(201,168,76,0.15)" : "rgba(96,165,250,0.15)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontWeight: 600, fontSize: "0.75rem",
                                color: u.role === "admin" ? "var(--color-primary)" : "var(--color-info)",
                              }}>
                                {u.name?.charAt(0).toUpperCase()}
                              </div>
                              <span style={{ fontWeight: 500, color: "var(--color-text-bright)" }}>{u.name}</span>
                            </div>
                          </td>
                          <td>{u.email}</td>
                          <td><span className={`badge ${u.role === "admin" ? "badge-gold" : "badge-info"}`}>{u.role}</span></td>
                          <td><span className={`badge ${u.isBlocked ? "badge-danger" : "badge-success"}`}>{u.isBlocked ? "Blocked" : "Active"}</span></td>
                          <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                          <td>
                            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.375rem" }}>
                              <button onClick={() => openEditUser(u)} className="btn btn-ghost btn-sm" title="Edit"><Edit size={14} /></button>
                              <button onClick={() => handleToggleBlock(u._id)} className="btn btn-ghost btn-sm" title={u.isBlocked ? "Unblock" : "Block"} style={{ color: u.isBlocked ? "var(--color-success)" : "var(--color-warning)" }}>
                                {u.isBlocked ? <CheckCircle size={14} /> : <Ban size={14} />}
                              </button>
                              {u.role !== "admin" && (
                                <button onClick={() => handleDeleteUser(u._id)} className="btn btn-ghost btn-sm" style={{ color: "var(--color-danger)" }} title="Delete"><Trash2 size={14} /></button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {usersPagination && usersPagination.pages > 1 && (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem", padding: "1rem", borderTop: "1px solid var(--color-border)" }}>
                  <button onClick={() => setUsersPage((p) => Math.max(1, p - 1))} disabled={usersPage <= 1} className="btn btn-secondary btn-sm"><ChevronLeft size={14} /></button>
                  <span style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>Page {usersPagination.page} of {usersPagination.pages}</span>
                  <button onClick={() => setUsersPage((p) => p + 1)} disabled={usersPage >= usersPagination.pages} className="btn btn-secondary btn-sm"><ChevronRight size={14} /></button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== PROPERTIES TAB ===== */}
        {activeTab === "properties" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "0.25rem" }}>Property Management</h1>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>Create, edit, and manage all property listings.</p>
              </div>
              <button onClick={openCreateProperty} className="btn btn-primary"><Plus size={16} /> Add Property</button>
            </div>

            <form onSubmit={handleSearchProperties} style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div style={{ position: "relative", flex: 1, maxWidth: 400 }}>
                <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} />
                <input type="text" placeholder="Search properties..." value={propertiesSearch} onChange={(e) => setPropertiesSearch(e.target.value)} style={{ width: "100%", paddingLeft: "2.5rem" }} />
              </div>
              <button type="submit" className="btn btn-secondary btn-sm"><Search size={14} /> Search</button>
            </form>

            <div className="card-surface" style={{ overflow: "hidden" }}>
              {propertiesLoading ? (
                <div style={{ display: "flex", justifyContent: "center", padding: "3rem" }}>
                  <div style={{ width: 36, height: 36, border: "3px solid var(--color-border)", borderTopColor: "var(--color-primary)", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                </div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Property</th><th>Type</th><th>Price</th><th>Status</th><th>Visibility</th><th>Location</th><th style={{ textAlign: "right" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {properties.map((p) => (
                        <tr key={p._id} style={{ opacity: p.isActive === false ? 0.5 : 1 }}>
                          <td>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                              <div style={{ width: 40, height: 40, borderRadius: "var(--radius-md)", overflow: "hidden", flexShrink: 0 }}>
                                <img src={p.image || "/images/property1.png"} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                              </div>
                              <div style={{ minWidth: 0 }}>
                                <span style={{ fontWeight: 500, color: "var(--color-text-bright)", display: "block", maxWidth: 180, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.title}</span>
                                {p.isFeatured && <span className="badge badge-gold" style={{ fontSize: "0.625rem", padding: "0.125rem 0.5rem" }}>Featured</span>}
                              </div>
                            </div>
                          </td>
                          <td><span className="badge badge-gold">{p.type}</span></td>
                          <td style={{ fontWeight: 600, color: "var(--color-primary)" }}>${p.price?.toLocaleString()}</td>
                          <td>
                            <span className={`badge ${p.status === "available" ? "badge-success" : p.status === "sold" ? "badge-danger" : "badge-info"}`}>{p.status}</span>
                          </td>
                          <td>
                            <span className={`badge ${p.isActive !== false ? "badge-success" : "badge-danger"}`}>
                              {p.isActive !== false ? "Active" : "Hidden"}
                            </span>
                          </td>
                          <td>{p.location}</td>
                          <td>
                            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.375rem" }}>
                              <Link to={`/properties/${p._id}`} className="btn btn-ghost btn-sm" title="View"><Eye size={14} /></Link>
                              <button onClick={() => openEditProperty(p)} className="btn btn-ghost btn-sm" title="Edit"><Edit size={14} /></button>
                              <button onClick={() => handleToggleVisibility(p._id)} className="btn btn-ghost btn-sm" title={p.isActive !== false ? "Hide" : "Show"} style={{ color: p.isActive !== false ? "var(--color-warning)" : "var(--color-success)" }}>
                                {p.isActive !== false ? <EyeOff size={14} /> : <Eye size={14} />}
                              </button>
                              <button onClick={() => handleDeleteProperty(p._id)} className="btn btn-ghost btn-sm" style={{ color: "var(--color-danger)" }} title="Delete"><Trash2 size={14} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {propertiesPagination && propertiesPagination.pages > 1 && (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem", padding: "1rem", borderTop: "1px solid var(--color-border)" }}>
                  <button onClick={() => setPropertiesPage((p) => Math.max(1, p - 1))} disabled={propertiesPage <= 1} className="btn btn-secondary btn-sm"><ChevronLeft size={14} /></button>
                  <span style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>Page {propertiesPagination.page} of {propertiesPagination.pages}</span>
                  <button onClick={() => setPropertiesPage((p) => p + 1)} disabled={propertiesPage >= propertiesPagination.pages} className="btn btn-secondary btn-sm"><ChevronRight size={14} /></button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* ===== USER MODAL ===== */}
      {showUserModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "1rem" }}>
          <div style={{ width: "100%", maxWidth: 480, background: "var(--color-bg-card)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-xl)", padding: "2rem", boxShadow: "var(--shadow-lg)", animation: "var(--animate-scale-in)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2 style={{ fontWeight: 600, fontSize: "1.25rem", color: "var(--color-text-bright)" }}>{editingUser ? "Edit User" : "Create User"}</h2>
              <button onClick={() => setShowUserModal(false)} className="btn btn-ghost btn-sm"><X size={18} /></button>
            </div>
            <form onSubmit={handleSaveUser} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input type="text" value={userForm.name} onChange={(e) => setUserForm((p) => ({ ...p, name: e.target.value }))} style={{ width: "100%" }} required />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" value={userForm.email} onChange={(e) => setUserForm((p) => ({ ...p, email: e.target.value }))} style={{ width: "100%" }} required />
              </div>
              {!editingUser && (
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input type="password" value={userForm.password} onChange={(e) => setUserForm((p) => ({ ...p, password: e.target.value }))} style={{ width: "100%" }} required={!editingUser} placeholder="Min. 6 characters" />
                </div>
              )}
              <div className="form-group">
                <label className="form-label">Role</label>
                <select value={userForm.role} onChange={(e) => setUserForm((p) => ({ ...p, role: e.target.value }))} style={{ width: "100%" }}>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>{editingUser ? "Save Changes" : "Create User"}</button>
                <button type="button" onClick={() => setShowUserModal(false)} className="btn btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===== PROPERTY MODAL ===== */}
      {showPropertyModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "1rem" }}>
          <div style={{ width: "100%", maxWidth: 680, maxHeight: "90vh", overflowY: "auto", background: "var(--color-bg-card)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-xl)", padding: "2rem", boxShadow: "var(--shadow-lg)", animation: "var(--animate-scale-in)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2 style={{ fontWeight: 600, fontSize: "1.25rem", color: "var(--color-text-bright)" }}>{editingProperty ? "Edit Property" : "Create Property"}</h2>
              <button onClick={() => setShowPropertyModal(false)} className="btn btn-ghost btn-sm"><X size={18} /></button>
            </div>
            <form onSubmit={handleSaveProperty} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {/* Image Upload */}
              <div className="form-group">
                <label className="form-label">Property Image</label>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  {propertyForm.image ? (
                    <div style={{ width: 120, height: 80, borderRadius: "var(--radius-md)", overflow: "hidden", border: "1px solid var(--color-border)" }}>
                      <img src={propertyForm.image} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  ) : (
                    <div style={{ width: 120, height: 80, borderRadius: "var(--radius-md)", background: "var(--color-bg-dark)", border: "1px dashed var(--color-border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Image size={24} style={{ color: "var(--color-text-muted)" }} />
                    </div>
                  )}
                  <div style={{ flex: 1 }}>
                    <label className="btn btn-secondary btn-sm" style={{ cursor: "pointer" }}>
                      <Upload size={14} /> {uploading ? "Uploading..." : "Upload Image"}
                      <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} disabled={uploading} />
                    </label>
                    <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "0.375rem" }}>Or paste a URL:</p>
                    <input type="text" placeholder="https://example.com/image.jpg" value={propertyForm.image} onChange={(e) => setPropertyForm((p) => ({ ...p, image: e.target.value }))} style={{ width: "100%", marginTop: "0.25rem", fontSize: "0.8125rem", padding: "0.5rem 0.75rem" }} />
                  </div>
                </div>
              </div>

              {/* Title & Location */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label">Title *</label>
                  <input type="text" value={propertyForm.title} onChange={(e) => setPropertyForm((p) => ({ ...p, title: e.target.value }))} style={{ width: "100%" }} required placeholder="Luxury Villa..." />
                </div>
                <div className="form-group">
                  <label className="form-label">Location *</label>
                  <input type="text" value={propertyForm.location} onChange={(e) => setPropertyForm((p) => ({ ...p, location: e.target.value }))} style={{ width: "100%" }} required placeholder="Downtown, City" />
                </div>
              </div>

              {/* Price, Type, Status */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label">Price ($) *</label>
                  <input type="number" value={propertyForm.price} onChange={(e) => setPropertyForm((p) => ({ ...p, price: e.target.value }))} style={{ width: "100%" }} required placeholder="500000" />
                </div>
                <div className="form-group">
                  <label className="form-label">Type</label>
                  <select value={propertyForm.type} onChange={(e) => setPropertyForm((p) => ({ ...p, type: e.target.value }))} style={{ width: "100%" }}>
                    {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select value={propertyForm.status} onChange={(e) => setPropertyForm((p) => ({ ...p, status: e.target.value }))} style={{ width: "100%" }}>
                    {PROPERTY_STATUSES.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                  </select>
                </div>
              </div>

              {/* Beds, Baths, Area, Badge */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label">Beds</label>
                  <input type="number" min="0" value={propertyForm.beds} onChange={(e) => setPropertyForm((p) => ({ ...p, beds: e.target.value }))} style={{ width: "100%" }} />
                </div>
                <div className="form-group">
                  <label className="form-label">Baths</label>
                  <input type="number" min="0" value={propertyForm.baths} onChange={(e) => setPropertyForm((p) => ({ ...p, baths: e.target.value }))} style={{ width: "100%" }} />
                </div>
                <div className="form-group">
                  <label className="form-label">Area</label>
                  <input type="text" value={propertyForm.area} onChange={(e) => setPropertyForm((p) => ({ ...p, area: e.target.value }))} style={{ width: "100%" }} placeholder="1,200 sqft" />
                </div>
                <div className="form-group">
                  <label className="form-label">Badge</label>
                  <input type="text" value={propertyForm.badge} onChange={(e) => setPropertyForm((p) => ({ ...p, badge: e.target.value }))} style={{ width: "100%" }} placeholder="New" />
                </div>
              </div>

              {/* Description */}
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea value={propertyForm.description} onChange={(e) => setPropertyForm((p) => ({ ...p, description: e.target.value }))} rows={3} style={{ width: "100%", resize: "vertical" }} placeholder="Describe this property..." />
              </div>

              {/* Amenities */}
              <div className="form-group">
                <label className="form-label">Amenities</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {AMENITIES_LIST.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => toggleAmenity(a)}
                      style={{
                        padding: "0.375rem 0.75rem", borderRadius: "var(--radius-full)",
                        fontSize: "0.8125rem", fontWeight: 500, cursor: "pointer",
                        border: propertyForm.amenities.includes(a)
                          ? "1px solid rgba(201,168,76,0.4)" : "1px solid var(--color-border)",
                        background: propertyForm.amenities.includes(a)
                          ? "rgba(201,168,76,0.15)" : "transparent",
                        color: propertyForm.amenities.includes(a)
                          ? "var(--color-primary-light)" : "var(--color-text-secondary)",
                        transition: "all 0.15s",
                      }}
                    >
                      {propertyForm.amenities.includes(a) && <CheckCircle size={12} style={{ marginRight: 4 }} />}
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              {/* Featured toggle */}
              <label style={{ display: "flex", alignItems: "center", gap: "0.625rem", cursor: "pointer" }}>
                <div
                  onClick={() => setPropertyForm((p) => ({ ...p, isFeatured: !p.isFeatured }))}
                  style={{
                    width: 44, height: 24, borderRadius: 12,
                    background: propertyForm.isFeatured ? "var(--color-primary)" : "var(--color-bg-dark)",
                    border: "1px solid var(--color-border)",
                    position: "relative", cursor: "pointer", transition: "all 0.2s",
                  }}
                >
                  <div style={{
                    width: 18, height: 18, borderRadius: "50%",
                    background: "white", position: "absolute", top: 2,
                    left: propertyForm.isFeatured ? 22 : 2, transition: "left 0.2s",
                  }} />
                </div>
                <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--color-text-secondary)" }}>Featured Property</span>
              </label>

              {/* Submit */}
              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>{editingProperty ? "Save Changes" : "Create Property"}</button>
                <button type="button" onClick={() => setShowPropertyModal(false)} className="btn btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .mobile-overlay { display: block !important; }
          .admin-mobile-header { display: flex !important; }
        }
        @media (max-width: 768px) {
          .admin-main > div > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminPage;
