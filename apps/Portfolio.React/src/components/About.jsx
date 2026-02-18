import React from 'react';

export default function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">About</h2>
        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-slate-300 leading-relaxed mb-6">
            Solution Architect with <strong>10+ years of experience</strong> designing scalable, event-driven, 
            hybrid-cloud and cloud-native systems across enterprise retail and other environments.
          </p>
          <p className="text-lg text-slate-300 leading-relaxed mb-6">
            I specialize in <strong>Domain-Driven Design</strong>, real-time data streaming, and Azure-based 
            architectures that enable predictive and ML-driven capabilities through robust data pipelines. 
            My approach converts complex business processes into resilient technical solutions while establishing 
            clear enterprise domain boundaries.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-slate-900 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-blue-400 mb-3">ML Infrastructure</h3>
              <ul className="space-y-2 text-slate-300">
                <li>• Real-time streaming for ML workloads</li>
                <li>• Predictive modeling data pipelines</li>
                <li>• Event-sourced operational data</li>
                <li>• ML-ready event schemas</li>
              </ul>
            </div>
            <div className="bg-slate-900 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-blue-400 mb-3">Emerging AI Capabilities</h3>
              <ul className="space-y-2 text-slate-300">
                <li>• RAG/LLM integration foundations</li>
                <li>• ML-driven system architectures</li>
                <li>• Data science collaboration</li>
                <li>• ML ingestion pattern design</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}