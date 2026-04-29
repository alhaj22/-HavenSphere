import { Clock, ArrowRight, Tag, Newspaper } from "lucide-react";
import { blogPosts } from "../../data/siteData";

const Blog = () => {
  return (
    <section id="blog" className="section-shell">
      <div className="container-shell">
        <div className="section-head" style={{ textAlign: "center" }}>
          <div className="section-kicker" style={{ margin: "0 auto 0.75rem" }}>
            <Newspaper size={14} /> Our Blog
          </div>
          <h2 className="section-title" style={{ marginBottom: "0.5rem" }}>
            Latest <span className="gradient-text">Insights</span>
          </h2>
          <p className="section-description" style={{ margin: "0 auto" }}>
            Expert tips, market trends, and home buying guides from our team.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "1.5rem",
        }}>
          {blogPosts.map((post, i) => (
            <article
              key={post.id}
              style={{
                overflow: "hidden",
                background: "var(--color-bg-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-lg)",
                animation: "var(--animate-fade-up)",
                animationDelay: `${i * 0.1}s`,
                opacity: 0,
                transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(201,168,76,0.25)";
                e.currentTarget.style.boxShadow = "0 0 30px rgba(201,168,76,0.08), 0 10px 40px rgba(0,0,0,0.3)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ position: "relative", height: 210, overflow: "hidden" }}>
                <img
                  src={post.image}
                  alt={post.title}
                  style={{
                    width: "100%", height: "100%", objectFit: "cover",
                    transition: "transform 0.6s cubic-bezier(0.23,1,0.32,1)",
                  }}
                  onMouseEnter={(e) => e.target.style.transform = "scale(1.06)"}
                  onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(180deg, transparent 40%, rgba(10,14,26,0.7) 100%)",
                }} />
                <span style={{
                  position: "absolute", top: 12, left: 12,
                  background: "rgba(201,168,76,0.12)",
                  color: "var(--color-primary-light)",
                  border: "1px solid rgba(201,168,76,0.2)",
                  borderRadius: "var(--radius-full)",
                  padding: "0.25rem 0.625rem",
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  display: "flex", alignItems: "center", gap: "0.25rem",
                  backdropFilter: "blur(10px)",
                }}>
                  <Tag size={11} /> {post.category}
                </span>
              </div>
              <div style={{ padding: "1.25rem 1.25rem 1.5rem" }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: "1rem",
                  fontSize: "0.75rem", color: "var(--color-text-muted)",
                  marginBottom: "0.75rem",
                }}>
                  <span>{post.date}</span>
                  <span style={{
                    width: 4, height: 4, borderRadius: "50%",
                    background: "var(--color-text-muted)",
                  }} />
                  <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    <Clock size={12} /> {post.readTime}
                  </span>
                </div>
                <h3 style={{
                  fontWeight: 600, fontSize: "1.0625rem",
                  color: "var(--color-text-bright)", marginBottom: "0.5rem",
                  lineHeight: 1.4,
                }}>
                  {post.title}
                </h3>
                <p style={{
                  fontSize: "0.875rem", color: "var(--color-text-muted)",
                  lineHeight: 1.65, marginBottom: "1.25rem",
                  display: "-webkit-box", WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical", overflow: "hidden",
                }}>
                  {post.excerpt}
                </p>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "0.375rem",
                  color: "var(--color-primary)", fontWeight: 600, fontSize: "0.875rem",
                  transition: "gap 0.2s",
                }}>
                  Read Article <ArrowRight size={14} />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
