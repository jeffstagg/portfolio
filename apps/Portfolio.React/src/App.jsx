import { useState } from "react";
import { useRouter, matchRoute } from "./router.js";

import PortfolioPage            from "./pages/PortfolioPage.jsx";
import AdminLoginPage           from "./pages/AdminLoginPage.jsx";
import AdminExperiencesPage     from "./pages/AdminExperiencesPage.jsx";
import AdminExperienceFormPage  from "./pages/AdminExperienceFormPage.jsx";
import AdminProjectFormPage     from "./pages/AdminProjectFormPage.jsx";

import GlowBg from "./components/ui/GlowBg.jsx";
import TopBar from "./components/ui/TopBar.jsx";
import Btn    from "./components/ui/Btn.jsx";
import T      from "./theme.js";

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
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("admin_authed") === "1");

  const auth = () => {
    sessionStorage.setItem("admin_authed", "1");
    setAuthed(true);
  };

  // ── Public
  if (path === "/" || path === "") return <PortfolioPage navigate={navigate} />;

  // ── Admin login
  if (path === "/admin") {
    if (authed) { navigate("/admin/experiences"); return null; }
    return <AdminLoginPage navigate={navigate} onAuth={auth} />;
  }

  // ── Guard all /admin/* routes
  if (path.startsWith("/admin") && !authed) {
    navigate("/admin");
    return null;
  }

  // ── Admin experience list
  if (path === "/admin/experiences")
    return <AdminExperiencesPage navigate={navigate} />;

  // ── New experience
  if (matchRoute("/admin/experiences/new", path))
    return <AdminExperienceFormPage navigate={navigate} />;

  // ── Edit experience
  const editExp = matchRoute("/admin/experiences/:id/edit", path);
  if (editExp) return <AdminExperienceFormPage navigate={navigate} expId={editExp.id} />;

  // ── New project
  const newProj = matchRoute("/admin/experiences/:id/projects/new", path);
  if (newProj) return <AdminProjectFormPage navigate={navigate} expId={newProj.id} />;

  // ── Edit project
  const editProj = matchRoute("/admin/experiences/:eid/projects/:pid/edit", path);
  if (editProj) return <AdminProjectFormPage navigate={navigate} expId={editProj.eid} projId={editProj.pid} />;

  return <NotFound navigate={navigate} />;
}
