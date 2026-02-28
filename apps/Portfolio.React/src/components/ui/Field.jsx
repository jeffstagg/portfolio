import T from "../../theme.js";

export const inputStyle = {
  background: "rgba(0,10,30,0.6)",
  border: "1px solid rgba(0,229,255,0.15)",
  borderRadius: "8px",
  padding: "10px 14px",
  color: T.text,
  fontFamily: T.sans,
  fontSize: "14px",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
};

export function Field({ label, children, hint }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label style={{
        fontSize: "10px", fontFamily: T.mono,
        color: T.cyan, letterSpacing: "0.14em", textTransform: "uppercase",
      }}>
        {label}
      </label>
      {children}
      {hint && <span style={{ fontSize: "11px", color: T.textMuted, fontFamily: T.mono }}>{hint}</span>}
    </div>
  );
}

export function Input({ value, onChange, placeholder, type = "text" }) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={inputStyle}
      onFocus={e => (e.target.style.borderColor = T.cyan)}
      onBlur={e  => (e.target.style.borderColor = "rgba(0,229,255,0.15)")}
    />
  );
}

export function TextArea({ value, onChange, placeholder, rows = 4, mono }) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      style={{
        ...inputStyle,
        fontFamily: mono ? T.mono : T.sans,
        fontSize: mono ? "13px" : "14px",
        resize: "vertical",
        lineHeight: 1.7,
      }}
      onFocus={e => (e.target.style.borderColor = T.cyan)}
      onBlur={e  => (e.target.style.borderColor = "rgba(0,229,255,0.15)")}
    />
  );
}
