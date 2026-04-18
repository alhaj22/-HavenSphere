import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Globe, MessageCircle, Camera, Briefcase } from "lucide-react";
import { footerLinks } from "../../data/siteData";

const Footer = () => {
  return (
    <footer id="footer" style={{
      background: "var(--color-bg-dark)",
      borderTop: "1px solid var(--color-border)",
      paddingTop: "clamp(3rem, 8vw, 5rem)",
    }}>
      <div className="container-shell">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "2.5rem",
          marginBottom: "3rem",
        }}>
          {/* Brand Column */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
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
            </div>
            <p style={{
              fontSize: "0.875rem", color: "var(--color-text-muted)",
              lineHeight: 1.7, marginBottom: "1.25rem",
            }}>
              Your trusted partner in finding the perfect home. Premium real estate, verified listings, and expert guidance.
            </p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {[Globe, MessageCircle, Camera, Briefcase].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    width: 36, height: 36, borderRadius: "var(--radius-md)",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid var(--color-border)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--color-text-muted)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--color-primary)";
                    e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)";
                    e.currentTarget.style.background = "rgba(201,168,76,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--color-text-muted)";
                    e.currentTarget.style.borderColor = "var(--color-border)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
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
                fontSize: "0.875rem", fontWeight: 600,
                color: "var(--color-text-bright)",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
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
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => e.target.style.color = "var(--color-primary)"}
                      onMouseLeave={(e) => e.target.style.color = "var(--color-text-muted)"}
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
              fontSize: "0.875rem", fontWeight: 600,
              color: "var(--color-text-bright)",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              marginBottom: "1.25rem",
            }}>Contact</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { icon: MapPin, text: "123 Real Estate Ave, NY 10001" },
                { icon: Phone, text: "+1 (555) 123-4567" },
                { icon: Mail, text: "hello@havensphere.com" },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: "0.625rem",
                  fontSize: "0.875rem", color: "var(--color-text-muted)",
                }}>
                  <Icon size={15} style={{ color: "var(--color-primary)", flexShrink: 0 }} />
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
            © 2026 HavenSphere. All rights reserved.
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
