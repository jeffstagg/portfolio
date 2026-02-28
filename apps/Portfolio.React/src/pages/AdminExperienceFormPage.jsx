import { useState, useEffect } from "react";
import T from "../theme.js";
import { getExperience, createExperience, updateExperience, deleteProject } from "../api.js";
import GlowBg from "../components/ui/GlowBg.jsx";
import TopBar from "../components/ui/TopBar.jsx";
import Spinner from "../components/ui/Spinner.jsx";
import ErrorMsg from "../components/ui/ErrorMsg.jsx";
import Btn from "../components/ui/Btn.jsx";
import { Field, Input, inputStyle } from "../components/ui/Field.jsx";
import AdminNav from "../components/nav/AdminNav.jsx";
import HighlightsEditor from "../components/editors/HighlightsEditor.jsx";

const EMPTY_FORM = { title: "", company: "", period: "", type: "Full-time", location: "", image: "", highlights: [] };

export default function AdminExperienceFormPage({ navigate, expId }) {
  const isNew = !expId;
  const [form,        setForm]        = useState(EMPTY_FORM);
  const [projects,    setProjects]    = useState([]);
  const [loading,     setLoading]     = useState(!isNew);
  const [saving,      setSaving]      = useState(false);
  const [error,       setError]       = useState(null);
  const [deletingProj, setDeletingProj] = useState(null);

  useEffect(() => {
    if (!isNew) {
      getExperience(expId)
        .then(data => {
          setForm({
            title:      data.title      || "",
            company:    data.company    || "",
            period:     data.period     || "",
            type:       data.type       || "Full-time",
            location:   data.location   || "",
            image:      data.image      || "",
            highlights: data.highlights || [],
          });
          setProjects(data.projects || []);
        })
        .catch(e => setError(e.message))
        .finally(() => setLoading(false));
    }
  }, [expId, isNew]);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const save = async () => {
    setSaving(true); setError(null);
    try {
      if (isNew) {
        const created = await createExperience(form);
        navigate(`/admin/experiences/${created.id}/edit`);
      } else {
        await updateExperience(expId, form);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProject = async (pid) => {
    if (!window.confirm("Delete this project?")) return;
    setDeletingProj(pid);
    try {
      await deleteProject(expId, pid);
      setProjects(p => p.filter(x => x.id !== pid));
    } catch (e) {
      setError(e.message);
    } finally {
      setDeletingProj(null);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: T.bg, display: "flex", flexDirection: "column" }}>
      <TopBar />
      <GlowBg />
      <AdminNav navigate={navigate} title={isNew ? "new experience" : "edit experience"} back="/admin/experiences" />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "860px", margin: "0 auto", padding: "48px 40px 80px", flex: 1, width: "100%" }}>
        <h1 style={{ margin: "0 0 32px", fontFamily: T.sans, fontWeight: 800, fontSize: "26px", color: T.text, letterSpacing: "-0.02em" }}>
          {isNew ? "New Experience" : "Edit Experience"}
        </h1>

        {loading ? <Spinner /> : (
          <>
            {error && <ErrorMsg msg={error} />}

            {/* Experience form */}
            <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: "16px", padding: "32px", backdropFilter: "blur(20px)", display: "flex", flexDirection: "column", gap: "22px", marginBottom: "28px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
                <Field label="Job Title">
                  <Input value={form.title} onChange={v => set("title", v)} placeholder="Principal Cloud Architect" />
                </Field>
                <Field label="Company">
                  <Input value={form.company} onChange={v => set("company", v)} placeholder="Acme Corp" />
                </Field>
                <Field label="Period">
                  <Input value={form.period} onChange={v => set("period", v)} placeholder="Jan 2021 – Present" />
                </Field>
                <Field label="Employment Type">
                  <select
                    value={form.type}
                    onChange={e => set("type", e.target.value)}
                    style={{ ...inputStyle, cursor: "pointer" }}
                  >
                    {["Full-time", "Part-time", "Contract", "Freelance", "Internship"].map(o => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Location">
                  <Input value={form.location} onChange={v => set("location", v)} placeholder="Remote — New York, NY" />
                </Field>
                <Field label="Logo Image URL" hint="Direct link to company logo image">
                  <Input value={form.image} onChange={v => set("image", v)} placeholder="https://example.com/logo.png" />
                </Field>
              </div>

              <Field label="Highlights">
                <HighlightsEditor highlights={form.highlights} onChange={v => set("highlights", v)} />
              </Field>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", paddingTop: "8px", borderTop: "1px solid rgba(0,229,255,0.07)" }}>
                <Btn variant="ghost" onClick={() => navigate("/admin/experiences")}>Cancel</Btn>
                <Btn variant="success" onClick={save} disabled={saving}>{saving ? "Saving…" : "Save Experience"}</Btn>
              </div>
            </div>

            {/* Projects section — only after experience is created */}
            {!isNew && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <div style={{ fontSize: "10px", fontFamily: T.mono, color: T.cyan, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    Projects ({projects.length})
                  </div>
                  <Btn variant="cyan" onClick={() => navigate(`/admin/experiences/${expId}/projects/new`)} style={{ fontSize: "12px", padding: "6px 14px" }}>
                    + Add Project
                  </Btn>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {projects.length === 0 && (
                    <div style={{ textAlign: "center", padding: "40px", color: T.textMuted, fontFamily: T.mono, fontSize: "13px", border: `1px dashed ${T.cardBorder}`, borderRadius: "12px" }}>
                      No projects yet. Add your first one!
                    </div>
                  )}
                  {projects.map(p => (
                    <div
                      key={p.id}
                      style={{
                        background: "rgba(0,10,30,0.5)", border: `1px solid ${T.cardBorder}`,
                        borderRadius: "10px", padding: "16px 20px",
                        display: "flex", alignItems: "center", gap: "14px",
                        transition: "border-color 0.2s",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = T.cardHover)}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = T.cardBorder)}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: T.sans, fontWeight: 700, fontSize: "14px", color: T.text, marginBottom: "4px" }}>{p.title}</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                          {(p.technologies || []).slice(0, 5).map(t => (
                            <span key={t} style={{ padding: "1px 8px", background: "rgba(0,229,255,0.07)", border: "1px solid rgba(0,229,255,0.15)", borderRadius: "12px", fontSize: "10px", fontFamily: T.mono, color: T.cyanDim }}>{t}</span>
                          ))}
                          {(p.technologies || []).length > 5 && (
                            <span style={{ fontSize: "10px", color: T.textMuted, fontFamily: T.mono }}>+{p.technologies.length - 5} more</span>
                          )}
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                        <Btn variant="ghost" onClick={() => navigate(`/admin/experiences/${expId}/projects/${p.id}/edit`)} style={{ fontSize: "12px", padding: "5px 12px" }}>Edit</Btn>
                        <Btn variant="danger" onClick={() => handleDeleteProject(p.id)} disabled={deletingProj === p.id} style={{ fontSize: "12px", padding: "5px 12px" }}>
                          {deletingProj === p.id ? "…" : "Delete"}
                        </Btn>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
