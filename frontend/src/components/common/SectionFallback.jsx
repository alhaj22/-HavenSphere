const SectionFallback = ({ compact = false }) => {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: compact ? "2rem 0" : "4rem 0",
    }}>
      <div style={{
        width: 32, height: 32,
        border: "3px solid var(--color-border)",
        borderTopColor: "var(--color-primary)",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }} />
    </div>
  );
};

export default SectionFallback;
