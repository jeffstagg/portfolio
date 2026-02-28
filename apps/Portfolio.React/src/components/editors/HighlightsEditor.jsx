import { useState } from "react";
import T from "../../theme.js";
import Btn from "../ui/Btn.jsx";
import { inputStyle } from "../ui/Field.jsx";

export default function HighlightsEditor({ highlights, onChange }) {
  const [input, setInput] = useState("");

  const add = () => {
    const v = input.trim();
    if (v) onChange([...highlights, v]);
    setInput("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <div style={{ display: "flex", gap: "8px" }}>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add a highlight and click Add"
          rows={2}
          style={{ ...inputStyle, flex: 1, resize: "vertical", lineHeight: 1.6 }}
          onFocus={e => (e.target.style.borderColor = T.cyan)}
          onBlur={e  => (e.target.style.borderColor = "rgba(0,229,255,0.15)")}
        />
        <Btn variant="cyan" onClick={add} style={{ flexShrink: 0, alignSelf: "flex-start" }}>Add</Btn>
      </div>

      {highlights.map((h, i) => (
        <div key={i} style={{
          display: "flex", gap: "10px", alignItems: "flex-start",
          padding: "10px 14px",
          background: "rgba(0,10,30,0.5)",
          border: "1px solid rgba(0,229,255,0.08)",
          borderRadius: "8px",
        }}>
          <span style={{ color: T.cyan, fontSize: "10px", marginTop: "4px", flexShrink: 0 }}>◆</span>
          <span style={{ flex: 1, fontSize: "13px", color: T.textSub, lineHeight: 1.7, fontFamily: T.sans }}>{h}</span>
          <button
            onClick={() => onChange(highlights.filter((_, j) => j !== i))}
            style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(239,68,68,0.4)", fontSize: "16px", lineHeight: 1, padding: 0, flexShrink: 0 }}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
