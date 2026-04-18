import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { isValidEmail } from "../utils/formValidators";
import { LogIn, Mail, Lock, Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/dashboard";
  const { loginUser, setError, error } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(form.email)) {
      setError("Please enter a valid email.");
      return;
    }

    try {
      setSubmitting(true);
      await loginUser(form);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem 1rem",
      position: "relative",
      background: "var(--color-bg-deep)",
    }}>
      {/* Decorative glows */}
      <div style={{
        position: "absolute", top: "10%", left: "20%",
        width: 300, height: 300, borderRadius: "50%",
        background: "rgba(201,168,76,0.06)", filter: "blur(80px)",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", right: "20%",
        width: 200, height: 200, borderRadius: "50%",
        background: "rgba(224,121,95,0.04)", filter: "blur(60px)",
      }} />

      <div style={{
        width: "100%", maxWidth: 440,
        background: "var(--color-bg-card)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-xl)",
        padding: "2.5rem",
        boxShadow: "var(--shadow-lg)",
        position: "relative",
        animation: "var(--animate-scale-in)",
      }}>
        {/* Logo */}
        <Link to="/" style={{
          display: "flex", alignItems: "center", gap: "0.5rem",
          textDecoration: "none", marginBottom: "2rem", justifyContent: "center",
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: "0.625rem",
            background: "linear-gradient(135deg, #c9a84c, #e0c774)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 800, fontSize: "1.25rem", color: "#0a0e1a",
            fontFamily: "var(--font-display)",
          }}>H</div>
          <span style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: "1.375rem", color: "var(--color-text-bright)",
          }}>
            Haven<span style={{ color: "var(--color-primary)" }}>Sphere</span>
          </span>
        </Link>

        <h1 style={{
          fontSize: "1.75rem", fontWeight: 700,
          color: "var(--color-text-bright)",
          textAlign: "center", marginBottom: "0.375rem",
        }}>Welcome Back</h1>
        <p style={{
          textAlign: "center", color: "var(--color-text-muted)",
          fontSize: "0.9375rem", marginBottom: "2rem",
        }}>Sign in to your HavenSphere account</p>

        {error && (
          <div style={{
            padding: "0.75rem 1rem", borderRadius: "var(--radius-md)",
            background: "rgba(248,113,113,0.1)",
            border: "1px solid rgba(248,113,113,0.2)",
            color: "var(--color-danger)", fontSize: "0.8125rem",
            marginBottom: "1.25rem",
          }}>{error}</div>
        )}

        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: "relative" }}>
              <Mail size={16} style={{
                position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
                color: "var(--color-text-muted)",
              }} />
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                style={{ width: "100%", paddingLeft: "2.5rem" }}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: "relative" }}>
              <Lock size={16} style={{
                position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
                color: "var(--color-text-muted)",
              }} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                style={{ width: "100%", paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", color: "var(--color-text-muted)",
                  cursor: "pointer", padding: 0,
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary btn-lg"
            style={{ width: "100%", marginTop: "0.5rem" }}
          >
            {submitting ? (
              <>
                <div style={{
                  width: 18, height: 18, border: "2px solid rgba(10,14,26,0.3)",
                  borderTopColor: "#0a0e1a", borderRadius: "50%",
                  animation: "spin 0.6s linear infinite",
                }} />
                Signing in...
              </>
            ) : (
              <>
                <LogIn size={18} /> Sign In
              </>
            )}
          </button>
        </form>

        <p style={{
          textAlign: "center", color: "var(--color-text-muted)",
          fontSize: "0.875rem", marginTop: "1.75rem",
        }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "var(--color-primary)", fontWeight: 600 }}>Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
