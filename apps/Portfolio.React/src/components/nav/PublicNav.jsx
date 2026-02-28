import T from "../../theme.js";

export default function PublicNav({ navigate }) {
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(2,11,24,0.85)", backdropFilter: "blur(16px)",
      borderBottom: "1px solid rgba(0,229,255,0.07)",
      padding: "0 40px", height: "58px", flexShrink: 0,
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <span style={{ fontFamily: T.mono, fontSize: "13px", color: T.cyan }}>
        <span style={{ color: T.textMuted }}>~/</span>jeff.stagg
      </span>

      <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
        {["Experience", "About", "Contact"].map(n => (
          <span
            key={n}
            style={{ fontFamily: T.mono, fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: T.textMuted, cursor: "pointer", transition: "color 0.2s" }}
            onMouseEnter={e => (e.target.style.color = T.cyan)}
            onMouseLeave={e => (e.target.style.color = T.textMuted)}
          >
            {n}
          </span>
        ))}
        <span
          onClick={() => navigate("/admin")}
          style={{ fontFamily: T.mono, fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,120,212,0.4)", cursor: "pointer", transition: "color 0.2s" }}
          onMouseEnter={e => (e.target.style.color = T.azureLight)}
          onMouseLeave={e => (e.target.style.color = "rgba(0,120,212,0.4)")}
        >
          Admin
        </span>
      </div>
    </nav>
  );
}
