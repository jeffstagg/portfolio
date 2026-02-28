import T from "../theme.js";
import GlowBg from "../components/ui/GlowBg.jsx";
import TopBar from "../components/ui/TopBar.jsx";
import Btn from "../components/ui/Btn.jsx";
import PublicNav from "../components/nav/PublicNav.jsx";

export default function AdminLoginPage({ navigate, onAuth }) {
  return (
    <div style={{ minHeight: "100vh", background: T.bg, display: "flex", flexDirection: "column" }}>
      <TopBar />
      <GlowBg />
      <PublicNav navigate={navigate} />

      <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
        <div style={{
          width: "100%", maxWidth: "400px",
          background: T.card, border: `1px solid ${T.cardBorder}`,
          borderRadius: "16px", padding: "40px", backdropFilter: "blur(20px)",
        }}>
          <div style={{ fontSize: "10px", fontFamily: T.mono, color: T.cyan, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "8px" }}>
            Admin Access
          </div>
          <h2 style={{ margin: "0 0 8px", fontFamily: T.sans, fontWeight: 800, fontSize: "22px", color: T.text }}>
            Sign In
          </h2>
          <p style={{ margin: "0 0 28px", fontFamily: T.sans, fontSize: "13px", color: T.textMuted, lineHeight: 1.7 }}>
            Authentication is currently stubbed. Wire up your auth provider when ready.
          </p>

          <Btn
            variant="primary"
            onClick={() => { onAuth(); navigate("/admin/experiences"); }}
            style={{ width: "100%" }}
          >
            Continue as Admin (stub)
          </Btn>

          <div style={{ marginTop: "16px", textAlign: "center" }}>
            <span
              onClick={() => navigate("/")}
              style={{ fontFamily: T.mono, fontSize: "11px", color: T.textMuted, cursor: "pointer", textDecoration: "underline" }}
            >
              ← Back to portfolio
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
