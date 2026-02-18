import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Lazy load mermaid only when needed
let mermaidInitialized = false;

function MermaidDiagram({ chart }) {
  const ref = useRef(null);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    const renderDiagram = async () => {
      if (!ref.current) return;

      try {
        // Dynamically import mermaid
        const mermaid = (await import('mermaid')).default;
        
        if (!mermaidInitialized) {
          mermaid.initialize({
            startOnLoad: false,
            theme: 'dark',
            securityLevel: 'loose',
          });
          mermaidInitialized = true;
        }

        // Generate unique ID
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        
        // Render the diagram
        const { svg } = await mermaid.render(id, chart);
        ref.current.innerHTML = svg;
        
      } catch (err) {
        console.error('Mermaid error:', err);
        setError(err.message);
      }
    };

    renderDiagram();
  }, [chart]);

  if (error) {
    return (
      <div className="my-6 bg-red-900/20 border border-red-500 p-4 rounded-lg">
        <p className="text-red-400 text-sm">Error rendering diagram: {error}</p>
        <pre className="text-xs text-slate-400 mt-2 overflow-x-auto">{chart}</pre>
      </div>
    );
  }

  return (
    <div className="my-6 p-6 rounded-lg overflow-x-auto">
      <div ref={ref}></div>
    </div>
  );
}

const MarkdownComponents = {
  h1: ({node, ...props}) => <h1 className="text-3xl font-bold mb-4 text-slate-100" {...props} />,
  h2: ({node, ...props}) => <h2 className="text-2xl font-bold mb-3 text-slate-200" {...props} />,
  h3: ({node, ...props}) => <h3 className="text-xl font-bold mb-2 text-slate-200" {...props} />,
  p: ({node, ...props}) => <p className="text-lg text-slate-300 leading-relaxed mb-4" {...props} />,
  ul: ({node, ...props}) => <ul className="list-disc list-inside mb-4 text-slate-300 space-y-2" {...props} />,
  ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-4 text-slate-300 space-y-2" {...props} />,
  li: ({node, ...props}) => <li className="text-slate-300" {...props} />,
  a: ({node, ...props}) => <a className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer" {...props} />,
  
  code: ({node, inline, className, children, ...props}) => {
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : '';
    
    if (language === 'mermaid' && !inline) {
      const chart = String(children).replace(/\n$/, '');
      return <MermaidDiagram chart={chart} config={{ theme: 'dark' }} />;
    }
    
    if (!inline) {
      return (
        <pre className="bg-slate-950 p-4 rounded-lg overflow-x-auto mb-4">
          <code className={`text-sm text-slate-300 ${className}`} {...props}>
            {children}
          </code>
        </pre>
      );
    }
    
    return <code className="bg-slate-700 text-slate-200 px-2 py-1 rounded text-sm" {...props}>{children}</code>;
  },
  
  blockquote: ({node, ...props}) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 italic text-slate-400 mb-4" {...props} />
  ),
  
  table: ({node, ...props}) => (
    <div className="overflow-x-auto mb-4">
      <table className="min-w-full border-collapse border border-slate-700" {...props} />
    </div>
  ),
  th: ({node, ...props}) => <th className="border border-slate-700 bg-slate-800 px-4 py-2 text-left text-slate-200" {...props} />,
  td: ({node, ...props}) => <td className="border border-slate-700 px-4 py-2 text-slate-300" {...props} />,
  hr: ({node, ...props}) => <hr className="border-slate-700 my-6" {...props} />,
  strong: ({node, ...props}) => <strong className="font-bold text-slate-100" {...props} />,
  em: ({node, ...props}) => <em className="italic text-slate-300" {...props} />,
};

export default function MarkdownContent({ content }) {
  return (
    <ReactMarkdown 
      remarkPlugins={[remarkGfm]}
      components={MarkdownComponents}
    >
      {content}
    </ReactMarkdown>
  );
}