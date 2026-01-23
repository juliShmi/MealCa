import { useEffect } from "react";

function Toast({ toast, onClose, durationMs = 2500 }) {
  useEffect(() => {
    if (!toast?.message) return;
    const t = setTimeout(() => onClose?.(), durationMs);
    return () => clearTimeout(t);
  }, [toast?.key, toast?.message, durationMs, onClose]);

  if (!toast?.message) return null;

  return (
    <div
      aria-live="polite"
      style={{
        position: "fixed",
        right: 16,
        bottom: 16,
        zIndex: 10000,
        maxWidth: 320,
        padding: "10px 12px",
        borderRadius: 12,
        border: "1px solid #ddd",
        background: "#111",
        color: "#fff",
        boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
        fontSize: 14,
      }}
    >
      {toast.message}
    </div>
  );
}

export default Toast;

