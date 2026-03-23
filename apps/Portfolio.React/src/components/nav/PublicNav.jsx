import T from "../../theme.js";
import ContactEmail from "../ui/ContactEmail.jsx";

export default function PublicNav({ navigate }) {
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(2,11,24,0.85)", backdropFilter: "blur(16px)",
      borderBottom: "1px solid rgba(0,229,255,0.07)",
      padding: "0 40px", height: "58px", flexShrink: 0,
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <span style={{ fontFamily: T.mono, fontSize: "15px", color: T.cyan }}>
        <span style={{ color: T.textMuted }}>~/</span>jeff.stagg
      </span>

      <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
        {[
          { label: "Experience", path: "/" },
          { label: "About",      path: "/about" },
        ].map(({ label, path }) => (
          <span
            key={label}
            onClick={() => navigate(path)}
            style={{ fontFamily: T.mono, fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase", color: T.textMuted, cursor: "pointer", transition: "color 0.2s" }}
            onMouseEnter={e => (e.target.style.color = T.cyan)}
            onMouseLeave={e => (e.target.style.color = T.textMuted)}
          >
            {label}
          </span>
        ))}
        <span style={{ fontFamily: T.mono, fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase", color: T.textMuted }}>
          <ContactEmail label="Contact" />
        </span>
      </div>
    </nav>
  );
}
