const PageLoader = () => {
  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--color-bg-deep)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div style={{ textAlign: "center" }}>
        <div style={{
          width: 48, height: 48, margin: "0 auto",
          border: "3px solid var(--color-border)",
          borderTopColor: "var(--color-primary)",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }} />
        <p style={{
          marginTop: "1rem",
          color: "var(--color-text-muted)",
          fontWeight: 500,
          fontSize: "0.9375rem",
        }}>Loading...</p>
      </div>
    </div>
  );
};

export default PageLoader;
