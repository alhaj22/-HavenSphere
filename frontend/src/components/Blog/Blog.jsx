import { Clock, ArrowRight, Tag } from "lucide-react";
import { blogPosts } from "../../data/siteData";

const Blog = () => {
  return (
    <section id="blog" className="section-shell">
      <div className="container-shell">
        <div className="section-head" style={{ textAlign: "center" }}>
          <div className="section-kicker" style={{ margin: "0 auto 0.75rem" }}>📰 Blog</div>
          <h2 className="section-title" style={{ marginBottom: "0.5rem" }}>
            Latest <span className="gradient-text">Insights</span>
          </h2>
          <p className="section-description" style={{ margin: "0 auto" }}>Expert tips, market trends, and home buying guides from our team.</p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "1.5rem",
        }}>
          {blogPosts.map((post, i) => (
            <article
              key={post.id}
              className="card-interactive"
              style={{
                overflow: "hidden",
                animation: "var(--animate-fade-up)",
                animationDelay: `${i * 0.1}s`,
                opacity: 0,
              }}
            >
              <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
                <img
                  src={post.image}
                  alt={post.title}
                  style={{
                    width: "100%", height: "100%", objectFit: "cover",
                    transition: "transform 0.5s",
                  }}
                  onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                  onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(180deg, transparent 50%, rgba(10,14,26,0.7) 100%)",
                }} />
                <span className="badge badge-gold" style={{ position: "absolute", top: 12, left: 12 }}>
                  <Tag size={12} /> {post.category}
                </span>
              </div>
              <div style={{ padding: "1.25rem" }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: "1rem",
                  fontSize: "0.75rem", color: "var(--color-text-muted)",
                  marginBottom: "0.625rem",
                }}>
                  <span>{post.date}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    <Clock size={12} /> {post.readTime}
                  </span>
                </div>
                <h3 style={{
                  fontWeight: 600, fontSize: "1.0625rem",
                  color: "var(--color-text-bright)", marginBottom: "0.5rem",
                  lineHeight: 1.35,
                }}>
                  {post.title}
                </h3>
                <p style={{
                  fontSize: "0.875rem", color: "var(--color-text-muted)",
                  lineHeight: 1.6, marginBottom: "1rem",
                  display: "-webkit-box", WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical", overflow: "hidden",
                }}>
                  {post.excerpt}
                </p>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "0.375rem",
                  color: "var(--color-primary)", fontWeight: 600, fontSize: "0.875rem",
                }}>
                  Read More <ArrowRight size={14} />
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
