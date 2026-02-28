import { useState } from "react";
import T from "../../theme.js";
import Btn from "../ui/Btn.jsx";
import { inputStyle } from "../ui/Field.jsx";

export default function TagsEditor({ tags, onChange }) {
  const [input, setInput] = useState("");

  const add = () => {
    const v = input.trim();
    if (v && !tags.includes(v)) onChange([...tags, v]);
    setInput("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <div style={{ display: "flex", gap: "8px" }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); add(); } }}
          placeholder="Add technology, press Enter"
          style={{ ...inputStyle, flex: 1 }}
          onFocus={e => (e.target.style.borderColor = T.cyan)}
          onBlur={e  => (e.target.style.borderColor = "rgba(0,229,255,0.15)")}
        />
        <Btn variant="cyan" onClick={add} style={{ flexShrink: 0 }}>Add</Btn>
      </div>

      {tags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {tags.map(t => (
            <span key={t} style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "3px 10px",
              background: "rgba(0,229,255,0.07)",
              border: "1px solid rgba(0,229,255,0.2)",
              borderRadius: "20px",
              fontSize: "11px", fontFamily: T.mono, color: T.cyanDim,
            }}>
              {t}
              <button
                onClick={() => onChange(tags.filter(x => x !== t))}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(0,229,255,0.4)", fontSize: "14px", lineHeight: 1, padding: 0 }}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
