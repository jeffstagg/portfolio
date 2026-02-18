import React from 'react';

export default function Hero({ onViewWork }) {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          Solution Architect
          <span className="block text-blue-400 mt-2">Hybrid/Cloud & Event-Driven Systems</span>
        </h1>
        <p className="text-xl text-slate-400 mb-8 max-w-3xl">
          Transforming complex business processes into resilient, scalable architectures. 
          Specialized in Azure, Domain-Driven Design, and ML-ready data pipelines.
        </p>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={onViewWork}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold transition-colors"
          >
            View Work
          </button>
          <a 
            href="mailto:jeffstagg@proton.me" 
            className="border-2 border-slate-600 hover:border-blue-400 text-slate-300 hover:text-blue-400 px-8 py-3 rounded-full font-semibold transition-colors inline-block"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}