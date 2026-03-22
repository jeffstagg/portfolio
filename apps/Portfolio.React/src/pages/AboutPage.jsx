import T from "../theme.js";
import GlowBg from "../components/ui/GlowBg.jsx";
import TopBar from "../components/ui/TopBar.jsx";
import PublicNav from "../components/nav/PublicNav.jsx";

const SKILLS = [
  { category: "Cloud & Infrastructure", items: ["Azure", "Kubernetes", "Terraform", "Docker", "CI/CD", "Infrastructure as Code"] },
  { category: "Architecture", items: ["Event-Driven Architecture", "Domain-Driven Design", "Microservices", "Distributed Systems", "API Design", "Hybrid Cloud"] },
  { category: "Languages & Frameworks", items: ["C#", ".NET", "TypeScript", "React", "Node.js", "SQL"] },
];

export default function AboutPage({ navigate }) {
  return (
    <div style={{ minHeight: "100vh", background: T.bg, display: "flex", flexDirection: "column" }}>
      <TopBar />
      <GlowBg />
      <PublicNav navigate={navigate} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "860px", margin: "0 auto", padding: "72px 40px 100px", flex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: "56px" }}>
          <div style={{ fontSize: "12px", fontFamily: T.mono, color: T.cyan, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "18px" }}>
            About
          </div>
          <h1 style={{ margin: "0 0 20px", fontSize: "clamp(32px, 5vw, 48px)", fontFamily: T.sans, fontWeight: 800, color: T.text, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Building systems that scale,<br />and teams that last.
          </h1>
          <p style={{ fontSize: "17px", color: "#64748B", lineHeight: 1.85, maxWidth: "620px", margin: 0 }}>
            I'm Jeff Stagg — a Cloud Architect with 15+ years of experience designing
            resilient, distributed infrastructure for enterprise platforms. I thrive at
            the intersection of complex systems and pragmatic engineering.
          </p>
        </div>

        {/* Bio sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: "48px", marginBottom: "64px" }}>
          {[
            {
              label: "Background",
              text: "My career has spanned startups and large enterprises alike, giving me a broad view of how software architecture decisions play out at different scales. I've led migrations from legacy monoliths to event-driven microservices, designed multi-region cloud deployments, and built the tooling and practices that keep distributed systems observable and maintainable.",
            },
            {
              label: "Philosophy",
              text: "I believe the best architecture is the simplest one that solves the problem in front of you — not the one that anticipates every hypothetical future requirement. Complexity is a liability. Incrementalism beats the big rewrite. Good systems are boring to operate.",
            },
            {
              label: "Beyond the code",
              text: "When I'm not thinking about distributed systems, you'll find me on the water, exploring the outdoors, or tinkering with side projects that let me experiment with ideas I don't get to try in production.",
            },
          ].map(({ label, text }) => (
            <div key={label} style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: "24px", alignItems: "start" }}>
              <div style={{ fontSize: "12px", fontFamily: T.mono, color: T.cyan, letterSpacing: "0.12em", textTransform: "uppercase", paddingTop: "4px" }}>
                {label}
              </div>
              <p style={{ margin: 0, fontSize: "17px", color: T.textSub, lineHeight: 1.8, fontFamily: T.sans }}>
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(6,182,212,0.3), transparent)", marginBottom: "56px" }} />

        {/* Skills */}
        <div style={{ marginBottom: "16px" }}>
          <div style={{ fontSize: "12px", fontFamily: T.mono, color: T.cyan, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "32px" }}>
            Skills &amp; Tools
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            {SKILLS.map(({ category, items }) => (
              <div key={category} style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: "24px", alignItems: "start" }}>
                <div style={{ fontSize: "13px", fontFamily: T.mono, color: T.textMuted, paddingTop: "4px" }}>
                  {category}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {items.map(item => (
                    <span key={item} style={{
                      padding: "4px 13px",
                      background: "rgba(0,229,255,0.07)",
                      border: "1px solid rgba(0,229,255,0.2)",
                      borderRadius: "20px",
                      fontSize: "13px",
                      fontFamily: T.mono,
                      color: T.cyanDim,
                      letterSpacing: "0.03em",
                    }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(6,182,212,0.07)", padding: "22px 40px", textAlign: "center", fontFamily: T.mono, fontSize: "13px", color: T.textMuted, letterSpacing: "0.05em" }}>
        <a href="https://linkedin.com/in/jeffstagg" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none", cursor: "pointer", transition: "color 0.2s" }} onMouseEnter={e => (e.target.style.color = T.cyan)} onMouseLeave={e => (e.target.style.color = "")}>linkedin.com/in/jeffstagg</a>
        {" · "}
        <a href="https://github.com/jeffstagg" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none", cursor: "pointer", transition: "color 0.2s" }} onMouseEnter={e => (e.target.style.color = T.cyan)} onMouseLeave={e => (e.target.style.color = "")}>github.com/jeffstagg</a>
      </div>
    </div>
  );
}
