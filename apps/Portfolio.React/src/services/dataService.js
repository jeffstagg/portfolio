// Data Service - Abstract data access layer
// Loads markdown files dynamically

import projectsData from '../data/projects.json';
import experiencesData from '../data/experiences.json';
import skillsData from '../data/skills.json';

const DATA_SOURCE = 'local'; // 'local' or 'cosmosdb'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

class DataService {
  constructor() {
    this.dataSource = DATA_SOURCE;
  }

  // Load markdown file content
  async loadMarkdownFile(filename) {
    try {
      const response = await fetch(`/content/${filename}`);
      if (!response.ok) {
        throw new Error(`Failed to load ${filename}`);
      }
      const content = await response.text();
     
      return content;
    } catch (error) {
      console.error(`Error loading markdown file ${filename}:`, error);
      return `Error loading content: ${error.message}`;
    }
  }

  // Enhance project with markdown content
  async enhanceProjectWithMarkdown(project) {
    const enhanced = { ...project };

    // Load markdown files if they're specified
    if (project.problemFile) {
      enhanced.problem = await this.loadMarkdownFile(project.problemFile);
    }
    if (project.solutionFile) {
      enhanced.solution = await this.loadMarkdownFile(project.solutionFile);
    }
    if (project.resultsFile) {
      enhanced.results = await this.loadMarkdownFile(project.resultsFile);
    }

    return enhanced;
  }

  // Generic fetch wrapper for future API calls
  async fetchFromAPI(endpoint) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API fetch error:', error);
      throw error;
    }
  }

  // Get all experiences
  async getExperiences() {
    if (this.dataSource === 'cosmosdb') {
      return this.fetchFromAPI('/experiences');
    }
    return Promise.resolve(experiencesData.experiences);
  }

  // Get single experience by ID
  async getExperienceById(id) {
    if (this.dataSource === 'cosmosdb') {
      return this.fetchFromAPI(`/experiences/${id}`);
    }
    const experience = experiencesData.experiences.find(exp => exp.id === id);
    return Promise.resolve(experience);
  }

  // Get all projects (with markdown content loaded)
  async getProjects() {
    if (this.dataSource === 'cosmosdb') {
      const projects = await this.fetchFromAPI('/projects');
      // Enhance each project with markdown
      return Promise.all(projects.map(p => this.enhanceProjectWithMarkdown(p)));
    }
    
    // Load markdown for all projects
    const enhancedProjects = await Promise.all(
      projectsData.projects.map(p => this.enhanceProjectWithMarkdown(p))
    );
    return enhancedProjects;
  }

  // Get projects by company ID
  async getProjectsByCompany(companyId) {
    const allProjects = await this.getProjects();
    return allProjects.filter(project => project.companyId === companyId);
  }

  // Get single project by ID (with markdown loaded)
  async getProjectById(id) {
    if (this.dataSource === 'cosmosdb') {
      const project = await this.fetchFromAPI(`/projects/${id}`);
      return this.enhanceProjectWithMarkdown(project);
    }
    
    const project = projectsData.projects.find(proj => proj.id === id);
    if (!project) return null;
    
    return this.enhanceProjectWithMarkdown(project);
  }

  // Get all skills
  async getSkills() {
    if (this.dataSource === 'cosmosdb') {
      return this.fetchFromAPI('/skills');
    }
    return Promise.resolve(skillsData.skillCategories);
  }

  // Get skills by category
  async getSkillsByCategory(category) {
    if (this.dataSource === 'cosmosdb') {
      return this.fetchFromAPI(`/skills?category=${category}`);
    }
    const skillCategory = skillsData.skillCategories.find(
      cat => cat.category === category
    );
    return Promise.resolve(skillCategory);
  }
}

export default new DataService();