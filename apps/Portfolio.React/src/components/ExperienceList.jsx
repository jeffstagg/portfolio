import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function ExperienceList({ experiences, projectCounts, onSelectExperience }) {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12">Experience</h2>
        <div className="space-y-8">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              onClick={() => onSelectExperience(exp.id)}
              className="bg-slate-800 rounded-lg p-6 hover:bg-slate-750 transition-colors cursor-pointer border border-slate-700 hover:border-blue-500"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-blue-400 mb-1">{exp.title}</h3>
                  <p className="text-xl text-slate-300 mb-2">{exp.company}</p>
                  <p className="text-sm text-slate-400">
                    {exp.period} • {exp.type} • {exp.location}
                  </p>
                </div>
                <ChevronRight className="text-slate-400 mt-4 sm:mt-0" size={24} />
              </div>
              <ul className="space-y-2 mt-4">
                {exp.highlights.map((highlight, i) => (
                  <li key={i} className="text-slate-300 flex items-start">
                    <span className="text-blue-400 mr-2">▸</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 text-sm text-blue-400 font-semibold flex items-center">
                View {projectCounts[exp.id] || 0} Project Case Studies
                <ChevronRight size={16} className="ml-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}