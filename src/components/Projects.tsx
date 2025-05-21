import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';

type Category = 'all' | 'ui-design' | 'web-design' | 'app-design';

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);
    
  return (
    <section id="projects" className="py-24 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-cyan-400 font-medium mb-4 block">My Work</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Featured Projects
          </h2>
          <p className="text-gray-300">
            Explore my recent design projects, showcasing a blend of creativity, user-centered thinking, and technical excellence.
          </p>
        </div>
        
        <div className="flex justify-center flex-wrap gap-3 mb-12">
          {[
            { id: 'all', label: 'All Work' },
            { id: 'ui-design', label: 'UI Design' },
            { id: 'web-design', label: 'Web Design' },
            { id: 'app-design', label: 'App Design' }
          ].map((item) => (
            <button
              key={item.id}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeCategory === item.id
                  ? 'bg-cyan-400 text-gray-900'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => setActiveCategory(item.id as Category)}
            >
              {item.label}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;