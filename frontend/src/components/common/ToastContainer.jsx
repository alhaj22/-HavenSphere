import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { useToast } from "../../hooks/useToast";

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
};

const bgMap = {
  success: "rgba(52, 211, 153, 0.15)",
  error: "rgba(248, 113, 113, 0.15)",
  info: "rgba(96, 165, 250, 0.15)",
  warning: "rgba(251, 191, 36, 0.15)",
};

const borderMap = {
  success: "rgba(52, 211, 153, 0.25)",
  error: "rgba(248, 113, 113, 0.25)",
  info: "rgba(96, 165, 250, 0.25)",
  warning: "rgba(251, 191, 36, 0.25)",
};

const colorMap = {
  success: "var(--color-success)",
  error: "var(--color-danger)",
  info: "var(--color-info)",
  warning: "var(--color-warning)",
};

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div style={{
      position: "fixed",
      top: 24,
      right: 24,
      zIndex: 9999,
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
      maxWidth: 380,
      width: "100%",
      pointerEvents: "none",
    }}>
      {toasts.map((toast) => {
        const Icon = iconMap[toast.type] || Info;
        return (
          <div
            key={toast.id}
            style={{
              pointerEvents: "auto",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.875rem 1rem",
              borderRadius: "var(--radius-lg)",
              background: bgMap[toast.type] || bgMap.info,
              border: `1px solid ${borderMap[toast.type] || borderMap.info}`,
              backdropFilter: "blur(12px)",
              boxShadow: "var(--shadow-lg)",
              animation: "var(--animate-fade-up)",
              color: colorMap[toast.type] || colorMap.info,
            }}
          >
            <Icon size={20} style={{ flexShrink: 0 }} />
            <p style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              flex: 1,
              margin: 0,
              color: "var(--color-text-primary)",
            }}>{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                flexShrink: 0,
                background: "none",
                border: "none",
                color: "var(--color-text-muted)",
                cursor: "pointer",
                padding: 0,
                transition: "opacity 0.2s",
              }}
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ToastContainer;
