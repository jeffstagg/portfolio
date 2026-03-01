import { useState, useEffect } from "react";
import T from "../theme.js";
import { getExperiences } from "../utils/content.js";
import GlowBg from "../components/ui/GlowBg.jsx";
import TopBar from "../components/ui/TopBar.jsx";
import Spinner from "../components/ui/Spinner.jsx";
import ErrorMsg from "../components/ui/ErrorMsg.jsx";
import AzureIcon from "../components/ui/AzureIcon.jsx";
import PublicNav from "../components/nav/PublicNav.jsx";
import ExperienceCard from "../components/portfolio/ExperienceCard.jsx";
import ContactEmail from "../components/ui/ContactEmail.jsx";

export default function PortfolioPage({ navigate }) {
  const [experiences, setExperiences] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);

  useEffect(() => {
    getExperiences()
      .then(setExperiences)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: T.bg, display: "flex", flexDirection: "column" }}>
      <TopBar />
      <GlowBg />
      <PublicNav navigate={navigate} />

      {/* Hero */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: "860px", margin: "0 auto", padding: "88px 40px 64px", textAlign: "center" }}>
        {/* Azure pill */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "10px",
          padding: "5px 14px 5px 8px", marginBottom: "30px",
          background: "linear-gradient(90deg, rgba(0,120,212,0.2) 0%, rgba(0,120,212,0.07) 100%)",
          border: "1px solid rgba(0,120,212,0.4)", borderRadius: "24px",
        }}>
          <span style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: "24px", height: "24px", borderRadius: "7px",
            background: "rgba(0,120,212,0.3)", border: "1px solid rgba(0,120,212,0.5)", flexShrink: 0,
          }}>
            <AzureIcon />
          </span>
          <span style={{ fontSize: "11px", fontFamily: T.mono, letterSpacing: "0.08em", color: T.azureLight, fontWeight: 600 }}>
            Azure Specialist
          </span>
          <span style={{ width: "1px", height: "12px", background: "rgba(0,120,212,0.35)", flexShrink: 0 }} />
          <span style={{ fontSize: "11px", fontFamily: T.mono, letterSpacing: "0.08em", color: T.textMuted }}>
            C# · .Net · Terraform · Kubernetes
          </span>
        </div>

        <h1 style={{ margin: "0 0 14px", fontSize: "clamp(42px, 7vw, 66px)", fontFamily: T.sans, fontWeight: 800, color: T.text, lineHeight: 1.05, letterSpacing: "-0.03em" }}>
          Jeff Stagg
        </h1>
        <div style={{ fontSize: "16px", fontWeight: 600, color: T.cyan, fontFamily: T.sans, marginBottom: "20px" }}>
          Cloud Architect
        </div>
        <p style={{ margin: "0 auto 42px", maxWidth: "500px", fontSize: "15px", color: "#64748B", lineHeight: 1.85 }}>
          15+ years designing resilient, scalable cloud infrastructure for enterprise platforms.
          Turning distributed systems complexity into elegant, cost-efficient architecture.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
          {["Solution Architecture", "Hybrid Cloud Architecture", "Distributed Systems", "Enterprise Integration", "Incremental Migration"].map(c => (
            <span key={c} style={{
              padding: "5px 14px", background: "rgba(0,10,30,0.6)",
              border: "1px solid rgba(6,182,212,0.18)", borderRadius: "6px",
              fontSize: "11px", fontFamily: T.mono, color: T.textMuted,
            }}>{c}</span>
          ))}
        </div>
      </div>

      {/* Section label */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: "860px", margin: "0 auto", padding: "0 40px 18px", display: "flex", alignItems: "center", gap: "14px" }}>
        <span style={{ fontSize: "10px", fontFamily: T.mono, color: T.cyan, letterSpacing: "0.15em", textTransform: "uppercase" }}>Experience</span>
        <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(6,182,212,0.3), transparent)" }} />
      </div>

      {/* Cards */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: "860px", margin: "0 auto", padding: "0 40px 100px", display: "flex", flexDirection: "column", gap: "20px", flex: 1 }}>
        {loading && <Spinner />}
        {error   && <ErrorMsg msg={error} />}
        {!loading && !error && experiences.map((exp, i) => <ExperienceCard key={exp.id} exp={exp} idx={i} />)}
        {!loading && !error && experiences.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px", color: T.textMuted, fontFamily: T.mono, fontSize: "13px" }}>
            No experiences yet.
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(6,182,212,0.07)", padding: "22px 40px", textAlign: "center", fontFamily: T.mono, fontSize: "11px", color: T.textMuted, letterSpacing: "0.05em" }}>
        <ContactEmail /> · <a href="https://linkedin.com/in/jeffstagg" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>linkedin.com/in/jeffstagg</a> · <a href="https://github.com/jeffstagg" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>github.com/jeffstagg</a>
      </div>
    </div>
  );
}
