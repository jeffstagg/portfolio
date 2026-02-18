import React from 'react';
import { ArrowLeft } from 'lucide-react';
import MarkdownContent from './MarkdownContent';

export default function ProjectDetail({ project, onBack }) {
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
              Back to Projects
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-7xl mb-4">{project.image}</div>
            <h1 className="text-4xl font-bold mb-3">{project.title}</h1>
            <p className="text-xl text-blue-400 mb-2">{project.company}</p>
            <p className="text-slate-400">{project.timeline}</p>
            <div className="inline-block bg-green-500/20 text-green-400 px-6 py-2 rounded-full font-semibold mt-4">
              {project.impact}
            </div>
          </div>

          <div className="space-y-12">
            <div className="bg-slate-800 rounded-lg p-8 border-l-4 border-red-500">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <span className="text-3xl mr-3">🔴</span>
                The Problem
              </h2>
              <MarkdownContent content={project.problem} />
            </div>

            <div className="bg-slate-800 rounded-lg p-8 border-l-4 border-blue-500">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <span className="text-3xl mr-3">🔵</span>
                The Solution
              </h2>
              <MarkdownContent content={project.solution} />
            </div>

            <div className="bg-slate-800 rounded-lg p-8 border-l-4 border-green-500">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <span className="text-3xl mr-3">🟢</span>
                The Results
              </h2>
              <MarkdownContent content={project.results} />
              
              <div className="mt-6">
                <h3 className="text-lg font-bold mb-3">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span 
                      key={i} 
                      className="bg-slate-700 text-slate-200 px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button 
              onClick={onBack} 
              className="inline-flex items-center text-blue-400 hover:text-blue-300 font-semibold"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to All Projects
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}