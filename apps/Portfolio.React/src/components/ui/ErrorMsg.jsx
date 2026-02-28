import T from "../../theme.js";

export default function ErrorMsg({ msg }) {
  return (
    <div style={{ position: "relative", zIndex: 1, maxWidth: "860px", margin: "40px auto", padding: "0 40px" }}>
      <div style={{
        padding: "16px 20px", borderRadius: "8px",
        background: "rgba(239,68,68,0.08)",
        border: "1px solid rgba(239,68,68,0.25)",
        color: "#FCA5A5", fontFamily: T.mono, fontSize: "13px",
      }}>
        ⚠ {msg}
      </div>
    </div>
  );
}
