import { useState, useEffect } from "react";
import T from "../theme.js";
import { getProject, createProject, updateProject } from "../api.js";
import GlowBg from "../components/ui/GlowBg.jsx";
import TopBar from "../components/ui/TopBar.jsx";
import Spinner from "../components/ui/Spinner.jsx";
import ErrorMsg from "../components/ui/ErrorMsg.jsx";
import Btn from "../components/ui/Btn.jsx";
import { Field, Input } from "../components/ui/Field.jsx";
import AdminNav from "../components/nav/AdminNav.jsx";
import MarkdownEditor from "../components/editors/MarkdownEditor.jsx";
import TagsEditor from "../components/editors/TagsEditor.jsx";

const EMPTY_FORM = { title: "", company: "", problem: "", solution: "", impact: "", technologies: [] };

export default function AdminProjectFormPage({ navigate, expId, projId }) {
  const isNew = !projId;
  const [form,    setForm]    = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(!isNew);
  const [saving,  setSaving]  = useState(false);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!isNew) {
      getProject(expId, projId)
        .then(data => setForm({
          title:        data.title        || "",
          company:      data.company      || "",
          problem:      data.problem      || "",
          solution:     data.solution     || "",
          impact:       data.impact       || "",
          technologies: data.technologies || [],
        }))
        .catch(e => setError(e.message))
        .finally(() => setLoading(false));
    }
  }, [expId, projId, isNew]);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const save = async () => {
    setSaving(true); setError(null);
    try {
      if (isNew) {
        await createProject(expId, form);
      } else {
        await updateProject(expId, projId, form);
      }
      navigate(`/admin/experiences/${expId}/edit`);
    } catch (e) {
      setError(e.message);
      setSaving(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: T.bg, display: "flex", flexDirection: "column" }}>
      <TopBar />
      <GlowBg />
      <AdminNav navigate={navigate} title={isNew ? "new project" : "edit project"} back={`/admin/experiences/${expId}/edit`} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1100px", margin: "0 auto", padding: "48px 40px 80px", flex: 1, width: "100%" }}>
        <h1 style={{ margin: "0 0 32px", fontFamily: T.sans, fontWeight: 800, fontSize: "26px", color: T.text, letterSpacing: "-0.02em" }}>
          {isNew ? "New Project" : "Edit Project"}
        </h1>

        {loading ? <Spinner /> : (
          <>
            {error && <ErrorMsg msg={error} />}

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

              {/* Basic info */}
              <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: "16px", padding: "28px 32px", backdropFilter: "blur(20px)", display: "flex", flexDirection: "column", gap: "18px" }}>
                <div style={{ fontSize: "10px", fontFamily: T.mono, color: T.cyan, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  Project Info
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <Field label="Project Title">
                    <Input value={form.title} onChange={v => set("title", v)} placeholder="Core Banking Migration" />
                  </Field>
                  <Field label="Company">
                    <Input value={form.company} onChange={v => set("company", v)} placeholder="Acme Corp" />
                  </Field>
                </div>
                <Field label="Technologies">
                  <TagsEditor tags={form.technologies} onChange={v => set("technologies", v)} />
                </Field>
              </div>

              {/* Problem */}
              <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: "16px", padding: "28px 32px", backdropFilter: "blur(20px)" }}>
                <MarkdownEditor label="Problem" value={form.problem} onChange={v => set("problem", v)} />
              </div>

              {/* Solution */}
              <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: "16px", padding: "28px 32px", backdropFilter: "blur(20px)" }}>
                <MarkdownEditor label="Solution" value={form.solution} onChange={v => set("solution", v)} />
              </div>

              {/* Impact */}
              <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: "16px", padding: "28px 32px", backdropFilter: "blur(20px)" }}>
                <MarkdownEditor label="Impact" value={form.impact} onChange={v => set("impact", v)} />
              </div>

              {/* Actions */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <Btn variant="ghost" onClick={() => navigate(`/admin/experiences/${expId}/edit`)}>Cancel</Btn>
                <Btn variant="success" onClick={save} disabled={saving}>
                  {saving ? "Saving…" : isNew ? "Create Project" : "Save Project"}
                </Btn>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
