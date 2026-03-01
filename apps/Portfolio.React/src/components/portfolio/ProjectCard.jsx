import T from "../../theme.js";
import TechPill from "./TechPill.jsx";
import { renderMarkdown } from "../../utils/markdown.jsx";

export default function ProjectCard({ project, isOpen, onToggle }) {
  return (
    <div
      style={{
        borderLeft: "2px solid rgba(0,229,255,0.15)",
        marginLeft: "12px",
        marginBottom: "10px",
        background: "rgba(0,10,30,0.5)",
        borderRadius: "0 8px 8px 0",
        overflow: "hidden",
        transition: "border-color 0.2s",
      }}
      onMouseEnter={e => (e.currentTarget.style.borderLeftColor = T.cyan)}
      onMouseLeave={e => (e.currentTarget.style.borderLeftColor = "rgba(0,229,255,0.15)")}
    >
      <button
        onClick={onToggle}
        style={{
          width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "14px 18px", background: "none", border: "none", cursor: "pointer",
        }}
      >
        <span style={{ fontSize: "14px", fontWeight: 700, color: T.text, fontFamily: T.sans }}>
          {project.title}
        </span>
        <span style={{ color: T.cyan, fontSize: "18px", lineHeight: 1 }}>{isOpen ? "−" : "+"}</span>
      </button>

      {isOpen && (
        <div style={{ padding: "0 18px 18px" }}>
          <div style={{ fontSize: "13.5px", lineHeight: 1.75 }}>
            {renderMarkdown(project.content)}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "14px" }}>
            {(project.technologies || []).map(t => <TechPill key={t} t={t} />)}
          </div>
        </div>
      )}
    </div>
  );
}
