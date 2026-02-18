import React, { useState, useEffect } from 'react';
import { Menu, X, Mail, Linkedin } from 'lucide-react';
import dataService from './services/dataService';
import Hero from './components/Hero';
import About from './components/About';
import ExperienceList from './components/ExperienceList';
import Skills from './components/Skills';
import ProjectList from './components/ProjectList';
import ProjectDetail from './components/ProjectDetail';

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projectCounts, setProjectCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [experiencesData, projectsData, skillsData] = await Promise.all([
        dataService.getExperiences(),
        dataService.getProjects(),
        dataService.getSkills()
      ]);
      
      setExperiences(experiencesData);
      setProjects(projectsData);
      setSkills(skillsData);
      
      const counts = {};
      projectsData.forEach(project => {
        counts[project.companyId] = (counts[project.companyId] || 0) + 1;
      });
      setProjectCounts(counts);
      
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToSection = (sectionId) => {
    setMobileMenuOpen(false);
    setCurrentView('home');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const viewExperienceProjects = async (expId) => {
    setSelectedExperience(expId);
    setCurrentView('projects');
    window.scrollTo(0, 0);
  };

  const viewProjectDetail = (project) => {
    setSelectedProject(project);
    setCurrentView('project-detail');
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    if (currentView === 'project-detail') {
      setCurrentView('projects');
      setSelectedProject(null);
    } else if (currentView === 'projects') {
      setCurrentView('home');
      setSelectedExperience(null);
    }
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⚡</div>
          <p className="text-xl">Loading portfolio... </p>
        </div>
      </div>
    );
  }

  if (currentView === 'home') {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100">
        <nav className="fixed top-0 w-full bg-slate-800/95 backdrop-blur-sm z-50 border-b border-slate-700">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="text-xl font-bold text-blue-400">Jeff Stagg</div>
              
              <div className="hidden md:flex space-x-8">
                <button onClick={() => scrollToSection('about')} className="text-slate-300 hover:text-blue-400 transition-colors">About</button>
                <button onClick={() => scrollToSection('experience')} className="text-slate-300 hover:text-blue-400 transition-colors">Experience</button>
                <button onClick={() => scrollToSection('skills')} className="text-slate-300 hover:text-blue-400 transition-colors">Skills</button>
                <button onClick={() => scrollToSection('contact')} className="text-slate-300 hover:text-blue-400 transition-colors">Contact</button>
              </div>

              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-slate-300">
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden bg-slate-800 border-t border-slate-700">
              <div className="px-4 py-3 space-y-3">
                <button onClick={() => scrollToSection('about')} className="block w-full text-left text-slate-300 hover:text-blue-400 py-2">About</button>
                <button onClick={() => scrollToSection('experience')} className="block w-full text-left text-slate-300 hover:text-blue-400 py-2">Experience</button>
                <button onClick={() => scrollToSection('skills')} className="block w-full text-left text-slate-300 hover:text-blue-400 py-2">Skills</button>
                <button onClick={() => scrollToSection('contact')} className="block w-full text-left text-slate-300 hover:text-blue-400 py-2">Contact</button>
              </div>
            </div>
          )}
        </nav>

        <Hero onViewWork={() => scrollToSection('experience')} />
        <About />
        <ExperienceList 
          experiences={experiences} 
          projectCounts={projectCounts}
          onSelectExperience={viewExperienceProjects} 
        />
        <Skills skillCategories={skills} />

        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Let's Connect</h2>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
              Interested in discussing architecture, Azure, or event-driven systems? I'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="mailto:jeffstagg@proton.me" className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold transition-colors">
                <Mail size={20} className="mr-2" />
                Email Me
              </a>
              <a href="https://www.linkedin.com/in/jeffstagg/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center border-2 border-slate-600 hover:border-blue-400 text-slate-300 hover:text-blue-400 px-8 py-3 rounded-full font-semibold transition-colors">
                <Linkedin size={20} className="mr-2" />
                LinkedIn
              </a>
            </div>
          </div>
        </section>

        <footer className="bg-slate-800 py-8 px-4 sm:px-6 lg:px-8 border-t border-slate-700">
          <div className="max-w-6xl mx-auto text-center text-slate-400">
            <p>© 2025 Jeff Stagg. Built with React and Azure.</p>
            <p className="text-sm mt-2">Dallas, TX • Solution Architect • Azure Specialist</p>
          </div>
        </footer>
      </div>
    );
  }

  if (currentView === 'projects' && selectedExperience) {
    const experience = experiences.find(e => e.id === selectedExperience);
    const experienceProjects = projects.filter(p => p.companyId === selectedExperience);

    return (
      <ProjectList 
        experience={experience}
        projects={experienceProjects}
        onSelectProject={viewProjectDetail}
        onBack={goBack}
      />
    );
  }

  if (currentView === 'project-detail' && selectedProject) {
    return (
      <ProjectDetail 
        project={selectedProject}
        onBack={goBack}
      />
    );
  }

  return null;
}