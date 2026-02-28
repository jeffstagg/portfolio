import { useState, useEffect } from "react";
import T from "../../theme.js";
import ProjectCard from "./ProjectCard.jsx";

function logoInitials(company = "") {
  return company.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

export default function ExperienceCard({ exp, idx }) {
  const [expanded,    setExpanded]    = useState(false);
  const [openProject, setOpenProject] = useState(null);
  const [visible,     setVisible]     = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), idx * 130);
    return () => clearTimeout(t);
  }, [idx]);

  const projects = exp.projects || [];

  return (
    <div
      style={{
        opacity:   visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.5s ease, transform 0.5s ease, border-color 0.25s, box-shadow 0.25s",
        background: T.card,
        border: `1px solid ${T.cardBorder}`,
        borderRadius: "16px",
        overflow: "hidden",
        position: "relative",
        backdropFilter: "blur(20px)",
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = T.cardHover; e.currentTarget.style.boxShadow = "0 0 32px rgba(0,229,255,0.06)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = T.cardBorder; e.currentTarget.style.boxShadow = "none"; }}
    >
      {/* Corner glow */}
      <div style={{
        position: "absolute", top: 0, right: 0, pointerEvents: "none",
        width: "200px", height: "200px",
        background: "radial-gradient(circle at top right, rgba(0,229,255,0.05) 0%, transparent 70%)",
      }} />

      {/* Header */}
      <div style={{ padding: "26px 28px 20px", display: "flex", gap: "18px", alignItems: "flex-start" }}>
        <div style={{
          width: "50px", height: "50px", borderRadius: "12px", flexShrink: 0,
          background: exp.image ? "transparent" : "linear-gradient(135deg, rgba(0,229,255,0.15), rgba(0,229,255,0.04))",
          border: "1px solid rgba(0,229,255,0.25)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: T.mono, fontWeight: 700, fontSize: "13px", color: T.cyan, overflow: "hidden",
        }}>
          {exp.image
            ? <img src={exp.image} alt={exp.company} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            : logoInitials(exp.company)
          }
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ margin: "0 0 4px", fontSize: "18px", fontFamily: T.sans, fontWeight: 800, color: T.text, letterSpacing: "-0.02em" }}>
            {exp.title}
          </h3>
          <div style={{ fontSize: "13px", color: T.cyan, fontWeight: 600, marginBottom: "10px", fontFamily: T.sans }}>
            {exp.company}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 18px" }}>
            {[exp.period, exp.type, exp.location].map((m, i) => (
              <span key={i} style={{ fontSize: "11px", color: T.textMuted, fontFamily: T.mono }}>{m}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div style={{ padding: "0 28px 22px" }}>
        <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
          {(exp.highlights || []).map((h, i) => (
            <li key={i} style={{ display: "flex", gap: "12px", lineHeight: 1.75 }}>
              <span style={{ color: T.cyan, flexShrink: 0, fontSize: "10px", marginTop: "5px" }}>◆</span>
              <span style={{ fontSize: "14px", color: T.textSub, fontFamily: T.sans }}>{h}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Projects toggle */}
      {projects.length > 0 && (
        <div style={{ borderTop: "1px solid rgba(0,229,255,0.08)" }}>
          <button
            onClick={() => setExpanded(e => !e)}
            style={{
              width: "100%", padding: "13px 28px",
              display: "flex", alignItems: "center", gap: "10px",
              background: "none", border: "none", cursor: "pointer",
              fontFamily: T.mono, fontSize: "11px", color: T.cyan,
              letterSpacing: "0.1em", textTransform: "uppercase", textAlign: "left",
            }}
          >
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: T.cyan, flexShrink: 0, boxShadow: `0 0 8px ${T.cyan}` }} />
            {expanded ? "Collapse" : "View"} {projects.length} project{projects.length !== 1 ? "s" : ""}
            <span style={{ marginLeft: "auto" }}>{expanded ? "▲" : "▼"}</span>
          </button>

          {expanded && (
            <div style={{ padding: "4px 28px 20px" }}>
              {projects.map(p => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  isOpen={openProject === p.id}
                  onToggle={() => setOpenProject(op => op === p.id ? null : p.id)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
