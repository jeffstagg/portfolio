import T from "../../theme.js";

export default function TechPill({ t }) {
  return (
    <span style={{
      padding: "3px 11px",
      background: "rgba(0,229,255,0.07)",
      border: "1px solid rgba(0,229,255,0.2)",
      borderRadius: "20px",
      fontSize: "11px",
      fontFamily: T.mono,
      color: T.cyanDim,
      letterSpacing: "0.03em",
    }}>
      {t}
    </span>
  );
}
