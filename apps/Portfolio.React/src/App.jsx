import { useRouter } from "./router.js";

import PortfolioPage from "./pages/PortfolioPage.jsx";
import GlowBg        from "./components/ui/GlowBg.jsx";
import TopBar        from "./components/ui/TopBar.jsx";
import Btn           from "./components/ui/Btn.jsx";
import T             from "./theme.js";

function NotFound({ navigate }) {
  return (
    <div style={{ minHeight: "100vh", background: T.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px" }}>
      <TopBar />
      <GlowBg />
      <div style={{ fontFamily: T.mono, fontSize: "48px", color: "rgba(0,229,255,0.2)" }}>404</div>
      <div style={{ fontFamily: T.sans, fontSize: "16px", color: T.textMuted }}>Page not found</div>
      <Btn variant="cyan" onClick={() => navigate("/")}>Go home</Btn>
    </div>
  );
}

export default function App() {
  const { path, navigate } = useRouter();

  if (path === "/" || path === "") return <PortfolioPage navigate={navigate} />;

  return <NotFound navigate={navigate} />;
}
