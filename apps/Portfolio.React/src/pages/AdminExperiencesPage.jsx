import { useState, useEffect } from "react";
import T from "../theme.js";
import { getExperiences, deleteExperience } from "../api.js";
import GlowBg from "../components/ui/GlowBg.jsx";
import TopBar from "../components/ui/TopBar.jsx";
import Spinner from "../components/ui/Spinner.jsx";
import ErrorMsg from "../components/ui/ErrorMsg.jsx";
import Btn from "../components/ui/Btn.jsx";
import AdminNav from "../components/nav/AdminNav.jsx";

function logoInitials(company = "") {
  return company.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

export default function AdminExperiencesPage({ navigate }) {
  const [experiences, setExperiences] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);
  const [deleting,    setDeleting]    = useState(null);

  const load = () => {
    setLoading(true);
    getExperiences()
      .then(setExperiences)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  };
  useEffect(load, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this experience and all its projects?")) return;
    setDeleting(id);
    try { await deleteExperience(id); load(); }
    catch (e) { setError(e.message); }
    finally { setDeleting(null); }
  };

  return (
    <div style={{ minHeight: "100vh", background: T.bg, display: "flex", flexDirection: "column" }}>
      <TopBar />
      <GlowBg />
      <AdminNav navigate={navigate} title="experiences" />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "900px", margin: "0 auto", padding: "48px 40px 80px", flex: 1, width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px" }}>
          <div>
            <div style={{ fontSize: "10px", fontFamily: T.mono, color: T.cyan, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "6px" }}>Admin</div>
            <h1 style={{ margin: 0, fontFamily: T.sans, fontWeight: 800, fontSize: "28px", color: T.text, letterSpacing: "-0.02em" }}>Experiences</h1>
          </div>
          <Btn variant="cyan" onClick={() => navigate("/admin/experiences/new")}>+ New Experience</Btn>
        </div>

        {loading && <Spinner />}
        {error   && <ErrorMsg msg={error} />}

        {!loading && !error && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {experiences.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px", color: T.textMuted, fontFamily: T.mono, fontSize: "13px", border: `1px dashed ${T.cardBorder}`, borderRadius: "12px" }}>
                No experiences yet. Add your first one!
              </div>
            )}
            {experiences.map(exp => (
              <div
                key={exp.id}
                style={{
                  background: T.card, border: `1px solid ${T.cardBorder}`,
                  borderRadius: "12px", padding: "20px 24px",
                  display: "flex", alignItems: "center", gap: "18px",
                  backdropFilter: "blur(20px)", transition: "border-color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = T.cardHover)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = T.cardBorder)}
              >
                {/* Logo */}
                <div style={{
                  width: "44px", height: "44px", borderRadius: "10px", flexShrink: 0,
                  background: "linear-gradient(135deg, rgba(0,229,255,0.15), rgba(0,229,255,0.04))",
                  border: "1px solid rgba(0,229,255,0.25)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: T.mono, fontWeight: 700, fontSize: "12px", color: T.cyan, overflow: "hidden",
                }}>
                  {exp.image
                    ? <img src={exp.image} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                    : logoInitials(exp.company)
                  }
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: T.sans, fontWeight: 700, fontSize: "15px", color: T.text, marginBottom: "2px" }}>{exp.title}</div>
                  <div style={{ fontFamily: T.sans, fontSize: "13px", color: T.cyan, marginBottom: "4px" }}>{exp.company}</div>
                  <div style={{ fontFamily: T.mono, fontSize: "11px", color: T.textMuted }}>
                    {exp.period} · {exp.type} · {(exp.projects || []).length} project{(exp.projects || []).length !== 1 ? "s" : ""}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                  <Btn variant="ghost" onClick={() => navigate(`/admin/experiences/${exp.id}/edit`)} style={{ fontSize: "12px", padding: "6px 14px" }}>Edit</Btn>
                  <Btn variant="danger" onClick={() => handleDelete(exp.id)} disabled={deleting === exp.id} style={{ fontSize: "12px", padding: "6px 14px" }}>
                    {deleting === exp.id ? "…" : "Delete"}
                  </Btn>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
