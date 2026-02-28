export default function GlowBg() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      <div style={{
        position: "absolute", top: "-8%", left: "30%",
        width: "640px", height: "520px", borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(6,182,212,0.07) 0%, transparent 65%)",
      }} />
      <div style={{
        position: "absolute", top: "45%", right: "-8%",
        width: "420px", height: "420px", borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(14,165,233,0.05) 0%, transparent 65%)",
      }} />
      {[...Array(28)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          width:  i % 6 === 0 ? "2px" : "1px",
          height: i % 6 === 0 ? "2px" : "1px",
          borderRadius: "50%",
          background: "rgba(200,230,255,0.2)",
          top:  `${(i * 37 + 7)  % 100}%`,
          left: `${(i * 61 + 13) % 100}%`,
        }} />
      ))}
    </div>
  );
}
