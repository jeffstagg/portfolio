import T from "../../theme.js";
import { Field, inputStyle } from "../ui/Field.jsx";
import { renderMarkdown } from "../../utils/markdown.jsx";

export default function MarkdownEditor({ label, value, onChange }) {
  return (
    <Field label={label}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", minHeight: "200px" }}>
        {/* Editor pane */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <div style={{ fontSize: "10px", fontFamily: T.mono, color: T.textMuted, letterSpacing: "0.1em" }}>
            EDITOR
          </div>
          <textarea
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={`Write ${label.toLowerCase()} in Markdown…`}
            style={{
              ...inputStyle,
              flex: 1,
              resize: "vertical",
              fontFamily: T.mono,
              fontSize: "12.5px",
              lineHeight: 1.75,
              minHeight: "180px",
            }}
            onFocus={e => (e.target.style.borderColor = T.cyan)}
            onBlur={e  => (e.target.style.borderColor = "rgba(0,229,255,0.15)")}
          />
        </div>

        {/* Preview pane */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <div style={{ fontSize: "10px", fontFamily: T.mono, color: T.textMuted, letterSpacing: "0.1em" }}>
            PREVIEW
          </div>
          <div style={{
            ...inputStyle,
            flex: 1,
            overflowY: "auto",
            minHeight: "180px",
            background: "rgba(0,5,20,0.5)",
          }}>
            {value
              ? renderMarkdown(value)
              : <span style={{ color: "rgba(0,229,255,0.2)", fontFamily: T.mono, fontSize: "12px" }}>Preview will appear here…</span>
            }
          </div>
        </div>
      </div>
    </Field>
  );
}
