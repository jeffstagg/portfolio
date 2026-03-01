import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import T from "../theme.js";

// ─── Mermaid diagram component ────────────────────────────────────────────────
// Lazily initializes mermaid once and renders diagrams into a div via useEffect.

let mermaidInitialized = false;

async function getMermaid() {
  const mermaid = (await import("mermaid")).default;
  if (!mermaidInitialized) {
    mermaid.initialize({
      startOnLoad: false,
      theme: "dark",
      themeVariables: {
        primaryColor:        "#0A1628",
        primaryTextColor:    "#F0FDFF",
        primaryBorderColor:  "#22D3EE",
        lineColor:           "#4A7FA5",
        secondaryColor:      "#0D1F3C",
        tertiaryColor:       "#061020",
        background:          "#020B18",
        mainBkg:             "#0A1628",
        nodeBorder:          "#22D3EE",
        clusterBkg:          "#0D1F3C",
        titleColor:          "#F0FDFF",
        edgeLabelBackground: "#0A1628",
        attributeBackgroundColorEven: "#0A1628",
        attributeBackgroundColorOdd:  "#0D1F3C",
      },
      fontFamily: "'JetBrains Mono', monospace",
      fontSize:   13,
    });
    mermaidInitialized = true;
  }
  return mermaid;
}

function MermaidBlock({ code }) {
  const ref             = useRef(null);
  const [svg,   setSvg]   = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function render() {
      try {
        const mermaid = await getMermaid();
        const id      = `mermaid-${Math.random().toString(36).slice(2)}`;
        const { svg } = await mermaid.render(id, code);
        if (!cancelled) setSvg(svg);
      } catch (e) {
        if (!cancelled) setError(e.message);
      }
    }
    render();
    return () => { cancelled = true; };
  }, [code]);

  if (error) {
    return (
      <div style={{
        padding: "12px 16px", borderRadius: "8px",
        background: "rgba(239,68,68,0.08)",
        border: "1px solid rgba(239,68,68,0.25)",
        color: "#FCA5A5", fontFamily: T.mono, fontSize: "12px",
      }}>
        ⚠ Mermaid render error: {error}
      </div>
    );
  }

  if (!svg) {
    return (
      <div style={{ padding: "20px", textAlign: "center", color: T.textMuted, fontFamily: T.mono, fontSize: "12px" }}>
        Rendering diagram…
      </div>
    );
  }

  return (
    <div
      ref={ref}
      style={{
        background:      "rgba(0,10,30,0.6)",
        border:          "1px solid rgba(0,229,255,0.12)",
        borderRadius:    "10px",
        padding:         "20px",
        overflowX:       "auto",
        margin:          "16px 0",
        display:         "flex",
        justifyContent:  "center",
      }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

// ─── Component overrides for react-markdown ───────────────────────────────────

const components = {
  // Fenced code blocks — react-markdown renders <pre><code className="language-x">
  // We intercept here so mermaid isn't wrapped in a <pre>, and to apply block styling.
  pre({ children }) {
    const child    = children;
    const cls      = child?.props?.className || "";
    const language = (cls.match(/\blanguage-(\S+)/) || [])[1] || "";
    const code     = String(child?.props?.children ?? "").trimEnd();

    if (language === "mermaid") {
      return <MermaidBlock code={code} />;
    }

    return (
      <div style={{ margin: "14px 0", borderRadius: "10px", overflow: "hidden", border: "1px solid rgba(0,229,255,0.1)" }}>
        {language && (
          <div style={{
            padding:       "6px 14px",
            background:    "rgba(0,10,30,0.8)",
            borderBottom:  "1px solid rgba(0,229,255,0.08)",
            fontFamily:    T.mono,
            fontSize:      "10px",
            color:         T.cyan,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}>
            {language}
          </div>
        )}
        <pre style={{
          margin:     0,
          padding:    "16px",
          background: "rgba(0,5,20,0.7)",
          overflowX:  "auto",
          fontFamily: T.mono,
          fontSize:   "13px",
          lineHeight: 1.7,
        }}>
          {children}
        </pre>
      </div>
    );
  },

  // Inline code only — block code is handled by pre above
  code({ className, children, ...props }) {
    if (className) {
      // Block code element inside pre — render plain so pre can style it
      return <code className={className} {...props}>{children}</code>;
    }
    return (
      <code style={{
        fontFamily:   T.mono,
        fontSize:     "12px",
        color:        T.cyan,
        background:   "rgba(0,229,255,0.08)",
        padding:      "1px 6px",
        borderRadius: "4px",
        border:       "1px solid rgba(0,229,255,0.12)",
      }} {...props}>
        {children}
      </code>
    );
  },

  // Headings
  h1: ({ children }) => (
    <h1 style={{ color: T.text, fontFamily: T.sans, fontSize: "22px", fontWeight: 800, margin: "24px 0 12px", letterSpacing: "-0.02em", borderBottom: "1px solid rgba(0,229,255,0.1)", paddingBottom: "8px" }}>
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 style={{ color: T.text, fontFamily: T.sans, fontSize: "18px", fontWeight: 700, margin: "20px 0 10px", letterSpacing: "-0.01em" }}>
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 style={{ color: T.cyan, fontFamily: T.sans, fontSize: "14px", fontWeight: 700, margin: "16px 0 8px", letterSpacing: "0.02em", textTransform: "uppercase" }}>
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 style={{ color: T.textSub, fontFamily: T.sans, fontSize: "13px", fontWeight: 700, margin: "14px 0 6px" }}>
      {children}
    </h4>
  ),

  // Paragraphs
  p: ({ children }) => (
    <p style={{ margin: "0 0 12px", color: T.textSub, fontSize: "13.5px", lineHeight: 1.8, fontFamily: T.sans }}>
      {children}
    </p>
  ),

  // Lists
  ul: ({ children }) => (
    <ul style={{ margin: "8px 0 12px", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "4px" }}>
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol style={{ margin: "8px 0 12px", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "4px" }}>
      {children}
    </ol>
  ),
  li: ({ children, checked }) => {
    // Task list items (- [x] / - [ ])
    if (checked !== null && checked !== undefined) {
      return (
        <li style={{ color: T.textSub, fontSize: "13.5px", lineHeight: 1.75, listStyle: "none", display: "flex", gap: "8px", alignItems: "flex-start" }}>
          <span style={{
            width: "14px", height: "14px", borderRadius: "3px", flexShrink: 0, marginTop: "4px",
            background: checked ? "rgba(0,229,255,0.2)" : "transparent",
            border: `1px solid ${checked ? T.cyan : "rgba(0,229,255,0.3)"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "9px", color: T.cyan,
          }}>
            {checked ? "✓" : ""}
          </span>
          <span style={{ opacity: checked ? 0.5 : 1, textDecoration: checked ? "line-through" : "none" }}>
            {children}
          </span>
        </li>
      );
    }
    return (
      <li style={{ color: T.textSub, fontSize: "13.5px", lineHeight: 1.75 }}>{children}</li>
    );
  },

  // Tables (GFM)
  table: ({ children }) => (
    <div style={{ overflowX: "auto", margin: "16px 0", borderRadius: "10px", border: "1px solid rgba(0,229,255,0.1)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: T.sans, fontSize: "13.5px" }}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead style={{ background: "rgba(0,229,255,0.06)", borderBottom: "1px solid rgba(0,229,255,0.15)" }}>
      {children}
    </thead>
  ),
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => (
    <tr style={{ borderBottom: "1px solid rgba(0,229,255,0.06)" }}>{children}</tr>
  ),
  th: ({ children }) => (
    <th style={{ padding: "10px 16px", textAlign: "left", color: T.cyan, fontFamily: T.mono, fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, whiteSpace: "nowrap" }}>
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td style={{ padding: "10px 16px", color: T.textSub, verticalAlign: "top" }}>{children}</td>
  ),

  // Blockquote
  blockquote: ({ children }) => (
    <blockquote style={{
      margin:       "14px 0",
      padding:      "12px 16px",
      borderLeft:   `3px solid ${T.cyan}`,
      background:   "rgba(0,229,255,0.04)",
      borderRadius: "0 8px 8px 0",
      color:        T.textMuted,
      fontStyle:    "italic",
    }}>
      {children}
    </blockquote>
  ),

  // Horizontal rule
  hr: () => (
    <hr style={{ border: "none", borderTop: "1px solid rgba(0,229,255,0.1)", margin: "20px 0" }} />
  ),

  // Links
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: T.cyan, textDecoration: "underline", textDecorationColor: "rgba(0,229,255,0.3)", transition: "color 0.2s" }}
      onMouseEnter={e => (e.target.style.color = T.azureLight)}
      onMouseLeave={e => (e.target.style.color = T.cyan)}
    >
      {children}
    </a>
  ),

  // Inline formatting
  strong: ({ children }) => <strong style={{ color: T.text, fontWeight: 700 }}>{children}</strong>,
  em:     ({ children }) => <em     style={{ color: T.textSub, fontStyle: "italic" }}>{children}</em>,
  del:    ({ children }) => <del    style={{ color: T.textMuted, textDecoration: "line-through" }}>{children}</del>,
};

// ─── Highlight.js theme (injected once as a style tag) ────────────────────────

let hlStyleInjected = false;

function injectHighlightStyle() {
  if (hlStyleInjected || typeof document === "undefined") return;
  const style = document.createElement("style");
  style.textContent = `
    .hljs                           { background: transparent; color: #E0F7FA; }
    .hljs-keyword,
    .hljs-selector-tag,
    .hljs-built_in                  { color: #22D3EE; font-weight: 600; }
    .hljs-string, .hljs-attr        { color: #4ADE80; }
    .hljs-number, .hljs-literal     { color: #FB923C; }
    .hljs-comment                   { color: #4A7FA5; font-style: italic; }
    .hljs-variable,
    .hljs-template-variable         { color: #F0FDFF; }
    .hljs-type,
    .hljs-class .hljs-title         { color: #50A7F8; }
    .hljs-function .hljs-title,
    .hljs-title.function_           { color: #67E8F9; }
    .hljs-params                    { color: #94A3B8; }
    .hljs-meta                      { color: #4A7FA5; }
    .hljs-punctuation               { color: #64748B; }
    .hljs-operator                  { color: #22D3EE; }
    .hljs-property                  { color: #50A7F8; }
    .hljs-tag                       { color: #22D3EE; }
    .hljs-name                      { color: #50A7F8; }
    .hljs-attribute                 { color: #4ADE80; }
    .hljs-symbol, .hljs-bullet      { color: #FB923C; }
    .hljs-section                   { color: #22D3EE; font-weight: 600; }
    .hljs-addition                  { color: #4ADE80; background: rgba(74,222,128,0.1); }
    .hljs-deletion                  { color: #FCA5A5; background: rgba(239,68,68,0.1); }
    .hljs-emphasis                  { font-style: italic; }
    .hljs-strong                    { font-weight: bold; }
  `;
  document.head.appendChild(style);
  hlStyleInjected = true;
}

// ─── Exports ──────────────────────────────────────────────────────────────────

export function MarkdownRenderer({ children }) {
  injectHighlightStyle();
  if (!children) return null;
  return (
    <div style={{ lineHeight: 1.75 }}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeHighlight, { ignoreMissing: true }]]}
        components={components}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}

// Backwards-compatible wrapper for existing renderMarkdown(text) calls
export function renderMarkdown(text) {
  return <MarkdownRenderer>{text}</MarkdownRenderer>;
}
