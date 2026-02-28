import T from "../../theme.js";

const VARIANTS = {
  primary: { background: "rgba(0,120,212,0.2)",   borderColor: "rgba(0,120,212,0.5)",   color: T.azureLight },
  cyan:    { background: "rgba(0,229,255,0.08)",   borderColor: "rgba(0,229,255,0.3)",   color: T.cyan },
  ghost:   { background: "transparent",            borderColor: "rgba(0,229,255,0.15)",  color: T.textMuted },
  danger:  { background: "rgba(239,68,68,0.08)",   borderColor: "rgba(239,68,68,0.3)",   color: "#FCA5A5" },
  success: { background: "rgba(34,197,94,0.1)",    borderColor: "rgba(34,197,94,0.3)",   color: "#4ADE80" },
};

export default function Btn({ children, onClick, variant = "primary", type = "button", disabled, style = {} }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "9px 20px", borderRadius: "8px", border: "1px solid",
        cursor: disabled ? "not-allowed" : "pointer",
        fontSize: "13px", fontFamily: T.mono, fontWeight: 600, letterSpacing: "0.04em",
        opacity: disabled ? 0.5 : 1, transition: "all 0.18s",
        ...VARIANTS[variant],
        ...style,
      }}
    >
      {children}
    </button>
  );
}
