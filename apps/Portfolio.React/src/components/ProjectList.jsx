import React from 'react';
import { ChevronRight, ArrowLeft } from 'lucide-react';

export default function ProjectList({ experience, projects, onSelectProject, onBack }) {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <nav className="fixed top-0 w-full bg-slate-800/95 backdrop-blur-sm z-50 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button 
              onClick={onBack} 
              className="flex items-center text-slate-300 hover:text-blue-400 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2">{experience.company}</h1>
            <p className="text-xl text-blue-400">{experience.title}</p>
            <p className="text-slate-400">{experience.period}</p>
          </div>

          <h2 className="text-2xl font-bold mb-8">Project Case Studies</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="bg-slate-800 rounded-lg overflow-hidden hover:bg-slate-750 transition-colors cursor-pointer border border-slate-700 hover:border-blue-500"
              >
                <div className="h-40 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-6xl">
                  {project.image}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-blue-400">{project.title}</h3>
                  <p className="text-sm text-slate-400 mb-3">{project.timeline}</p>
                  <p className="text-sm text-green-400 font-semibold mb-3">{project.impact}</p>
                  <p className="text-slate-300 text-sm line-clamp-3">{project.problem}</p>
                  <div className="mt-4 flex items-center text-blue-400 text-sm font-semibold">
                    View Case Study
                    <ChevronRight size={16} className="ml-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}