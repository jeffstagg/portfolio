import T from "../../theme.js";

export default function Spinner() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "60px", position: "relative", zIndex: 1 }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{
        width: "32px", height: "32px", borderRadius: "50%",
        border: "2px solid rgba(0,229,255,0.15)",
        borderTop: `2px solid ${T.cyan}`,
        animation: "spin 0.8s linear infinite",
      }} />
    </div>
  );
}
