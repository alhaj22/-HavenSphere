import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, User, LayoutDashboard, LogOut, Shield, Heart } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "About", href: "#why-us" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#footer" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
  };

  return (
    <header
      id="header"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.3s ease",
        background: scrolled ? "rgba(10, 14, 26, 0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
      }}
    >
      <div className="container-shell" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "76px" }}>
        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
          <div style={{
            width: 38, height: 38, borderRadius: "0.625rem",
            background: "linear-gradient(135deg, #c9a84c, #e0c774)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 800, fontSize: "1.125rem", color: "#0a0e1a",
            fontFamily: "var(--font-display)",
          }}>H</div>
          <span style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: "1.375rem", color: "var(--color-text-bright)",
            letterSpacing: "-0.01em",
          }}>
            Haven<span style={{ color: "var(--color-primary)" }}>Sphere</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          style={{
            display: "flex", alignItems: "center", gap: "2rem",
          }}
          className="hidden-mobile"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              style={{
                color: location.pathname === link.href ? "var(--color-primary)" : "var(--color-text-secondary)",
                fontWeight: 500,
                fontSize: "0.9375rem",
                transition: "color 0.2s",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => e.target.style.color = "var(--color-primary)"}
              onMouseLeave={(e) => {
                if (location.pathname !== link.href) e.target.style.color = "var(--color-text-secondary)";
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {user ? (
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                style={{
                  display: "flex", alignItems: "center", gap: "0.5rem",
                  background: "rgba(201, 168, 76, 0.1)",
                  border: "1px solid rgba(201, 168, 76, 0.2)",
                  borderRadius: "var(--radius-full)",
                  padding: "0.375rem 0.875rem 0.375rem 0.375rem",
                  color: "var(--color-text-primary)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700, fontSize: "0.8125rem", color: "#0a0e1a",
                }}>
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <span style={{ fontWeight: 500, fontSize: "0.875rem" }} className="hidden-mobile">{user.name?.split(" ")[0]}</span>
                <ChevronDown size={14} style={{ color: "var(--color-text-muted)" }} />
              </button>

              {/* Dropdown */}
              {userMenuOpen && (
                <div
                  style={{
                    position: "absolute", top: "calc(100% + 8px)", right: 0,
                    width: 220, background: "var(--color-bg-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-lg)",
                    boxShadow: "var(--shadow-lg)",
                    overflow: "hidden",
                    animation: "slideDown 0.2s ease",
                    zIndex: 100,
                  }}
                >
                  <div style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--color-border)" }}>
                    <p style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--color-text-bright)", margin: 0 }}>{user.name}</p>
                    <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", margin: 0 }}>{user.email}</p>
                  </div>
                  <div style={{ padding: "0.375rem" }}>
                    <Link to="/dashboard" style={dropdownItemStyle}>
                      <LayoutDashboard size={16} /> Dashboard
                    </Link>
                    <Link to="/favorites" style={dropdownItemStyle}>
                      <Heart size={16} /> My Favorites
                    </Link>
                    <Link to="/profile" style={dropdownItemStyle}>
                      <User size={16} /> Profile
                    </Link>
                    {user.role === "admin" && (
                      <Link to="/admin" style={{ ...dropdownItemStyle, color: "var(--color-primary)" }}>
                        <Shield size={16} /> Admin Panel
                      </Link>
                    )}
                    <button onClick={handleLogout} style={{ ...dropdownItemStyle, width: "100%", color: "var(--color-danger)", background: "none", border: "none" }}>
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost hidden-mobile" style={{ fontSize: "0.875rem" }}>Sign In</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Get Started</Link>
            </>
          )}

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-only"
            style={{
              background: "none", border: "none", color: "var(--color-text-primary)",
              padding: "0.25rem", display: "none",
            }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{
          background: "var(--color-bg-dark)",
          borderTop: "1px solid var(--color-border)",
          padding: "1rem",
          animation: "slideDown 0.3s ease",
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              style={{
                display: "block", padding: "0.75rem 1rem",
                color: "var(--color-text-secondary)",
                borderRadius: "var(--radius-md)",
                transition: "all 0.2s",
                textDecoration: "none",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .mobile-only { display: none !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .mobile-only { display: flex !important; }
        }
      `}</style>
    </header>
  );
};

const dropdownItemStyle = {
  display: "flex",
  alignItems: "center",
  gap: "0.625rem",
  padding: "0.625rem 0.75rem",
  borderRadius: "var(--radius-md)",
  color: "var(--color-text-secondary)",
  fontSize: "0.875rem",
  fontWeight: 500,
  textDecoration: "none",
  transition: "all 0.15s",
  cursor: "pointer",
};

export default Header;
