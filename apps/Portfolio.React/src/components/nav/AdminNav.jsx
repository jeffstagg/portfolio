import T from "../../theme.js";
import Btn from "../ui/Btn.jsx";

export default function AdminNav({ navigate, title, back }) {
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(2,11,24,0.92)", backdropFilter: "blur(16px)",
      borderBottom: "1px solid rgba(0,120,212,0.15)",
      padding: "0 40px", height: "58px", flexShrink: 0,
      display: "flex", alignItems: "center", gap: "16px",
    }}>
      {back && (
        <button
          onClick={() => navigate(back)}
          style={{
            background: "none", border: "none", cursor: "pointer", padding: 0,
            color: T.textMuted, fontFamily: T.mono, fontSize: "12px",
            display: "flex", alignItems: "center", gap: "6px", transition: "color 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = T.cyan)}
          onMouseLeave={e => (e.currentTarget.style.color = T.textMuted)}
        >
          ← Back
        </button>
      )}

      {back && <span style={{ color: "rgba(0,229,255,0.15)" }}>|</span>}

      <span style={{ fontFamily: T.mono, fontSize: "13px", color: T.cyan }}>
        <span style={{ color: T.textMuted }}>~/</span>jeff.stagg
        <span style={{ color: T.textMuted }}> / admin</span>
        {title && <span style={{ color: T.textMuted }}> / {title}</span>}
      </span>

      <div style={{ marginLeft: "auto" }}>
        <Btn variant="ghost" onClick={() => navigate("/")} style={{ fontSize: "11px", padding: "5px 12px" }}>
          View Portfolio
        </Btn>
      </div>
    </nav>
  );
}
