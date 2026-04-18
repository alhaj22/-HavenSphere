import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--color-bg-deep)",
      position: "relative",
      textAlign: "center",
      padding: "2rem",
    }}>
      {/* Decorative glow */}
      <div style={{
        position: "absolute", top: "30%", left: "50%",
        transform: "translateX(-50%)",
        width: 300, height: 300, borderRadius: "50%",
        background: "rgba(201,168,76,0.05)", filter: "blur(80px)",
      }} />

      <div style={{ position: "relative", maxWidth: 480 }}>
        <div style={{
          fontSize: "8rem", fontWeight: 900,
          fontFamily: "var(--font-display)",
          lineHeight: 1,
          background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: "1rem",
        }}>404</div>
        <h1 style={{
          fontSize: "1.75rem", fontWeight: 700,
          color: "var(--color-text-bright)", marginBottom: "0.75rem",
        }}>Page Not Found</h1>
        <p style={{
          color: "var(--color-text-muted)", fontSize: "1rem",
          lineHeight: 1.7, marginBottom: "2rem",
        }}>
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem" }}>
          <Link to="/" className="btn btn-primary">
            <Home size={16} /> Back to Home
          </Link>
          <Link to="/properties" className="btn btn-secondary">
            Browse Properties
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
