import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Globe, MessageCircle, Camera, Briefcase, ArrowUpRight, Send } from "lucide-react";
import { footerLinks } from "../../data/siteData";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <footer id="footer" style={{
      background: "var(--color-bg-dark)",
      borderTop: "1px solid var(--color-border)",
      paddingTop: "clamp(3rem, 8vw, 5rem)",
      position: "relative",
    }}>
      {/* Top gradient line */}
      <div style={{
        position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
        background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)",
      }} />

      <div className="container-shell">
        {/* Newsletter section */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: "2rem",
          padding: "2rem 2.5rem",
          background: "rgba(201,168,76,0.04)",
          border: "1px solid rgba(201,168,76,0.1)",
          borderRadius: "var(--radius-xl)",
          marginBottom: "3.5rem",
        }}>
          <div>
            <h3 style={{
              fontFamily: "var(--font-display)", fontWeight: 700,
              fontSize: "1.375rem", color: "var(--color-text-bright)",
              marginBottom: "0.25rem",
            }}>Stay Updated</h3>
            <p style={{
              fontSize: "0.875rem", color: "var(--color-text-muted)", margin: 0,
            }}>Get the latest listings and market insights delivered to your inbox.</p>
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); setEmail(""); }}
            style={{
              display: "flex", gap: "0.5rem",
              maxWidth: 400, width: "100%",
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{
                flex: 1, padding: "0.75rem 1rem",
                background: "var(--color-bg-input)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                color: "var(--color-text-primary)",
                fontSize: "0.875rem",
                outline: "none",
              }}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: "0.75rem 1.25rem" }}>
              <Send size={16} />
            </button>
          </form>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "2.5rem",
          marginBottom: "3rem",
        }}>
          {/* Brand Column */}
          <div>
            <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.125rem", textDecoration: "none" }}>
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
            <p style={{
              fontSize: "0.875rem", color: "var(--color-text-muted)",
              lineHeight: 1.75, marginBottom: "1.5rem",
            }}>
              Your trusted partner in finding the perfect home. Premium real estate, verified listings, and expert guidance.
            </p>
            <div style={{ display: "flex", gap: "0.625rem" }}>
              {[Globe, MessageCircle, Camera, Briefcase].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    width: 36, height: 36, borderRadius: "var(--radius-md)",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--color-border)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--color-text-muted)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--color-primary)";
                    e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)";
                    e.currentTarget.style.background = "rgba(201,168,76,0.08)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--color-text-muted)";
                    e.currentTarget.style.borderColor = "var(--color-border)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 style={{
                fontSize: "0.8125rem", fontWeight: 700,
                color: "var(--color-text-bright)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: "1.25rem",
              }}>{title}</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {links.map((link, i) => (
                  <li key={i} style={{ marginBottom: "0.625rem" }}>
                    <a
                      href={link.href}
                      style={{
                        color: "var(--color-text-muted)",
                        fontSize: "0.875rem",
                        textDecoration: "none",
                        transition: "all 0.2s",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.25rem",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = "var(--color-primary)";
                        e.target.style.paddingLeft = "4px";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = "var(--color-text-muted)";
                        e.target.style.paddingLeft = "0";
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 style={{
              fontSize: "0.8125rem", fontWeight: 700,
              color: "var(--color-text-bright)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: "1.25rem",
            }}>Get In Touch</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {[
                { icon: MapPin, text: "123 Real Estate Ave, NY 10001" },
                { icon: Phone, text: "+1 (555) 123-4567" },
                { icon: Mail, text: "hello@havensphere.com" },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: "0.75rem",
                  fontSize: "0.875rem", color: "var(--color-text-muted)",
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "var(--radius-sm)",
                    background: "rgba(201,168,76,0.06)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <Icon size={14} style={{ color: "var(--color-primary)" }} />
                  </div>
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: "1px solid var(--color-border)",
          padding: "1.5rem 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}>
          <p style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", margin: 0 }}>
            © {new Date().getFullYear()} HavenSphere. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Privacy", "Terms", "Cookies"].map((label) => (
              <a key={label} href="#" style={{
                fontSize: "0.8125rem", color: "var(--color-text-muted)",
                textDecoration: "none", transition: "color 0.2s",
              }}
                onMouseEnter={(e) => e.target.style.color = "var(--color-primary)"}
                onMouseLeave={(e) => e.target.style.color = "var(--color-text-muted)"}
              >{label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
