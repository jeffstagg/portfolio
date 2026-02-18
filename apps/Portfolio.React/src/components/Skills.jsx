import React from 'react';

export default function Skills({ skillCategories }) {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12">Skills & Expertise</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((skillCat) => (
            <div key={skillCat.category} className="bg-slate-900 rounded-lg p-6">
              <h3 className="text-lg font-bold text-blue-400 mb-4">{skillCat.category}</h3>
              <div className="flex flex-wrap gap-2">
                {skillCat.skills.map((skill, i) => (
                  <span 
                    key={i} 
                    className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}