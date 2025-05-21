import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="reveal group relative bg-gray-800 rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-400/10">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40"></div>
      </div>
      
      <div className="p-6 transform transition-transform duration-300 group-hover:translate-y-[-5px]">
        <div className="flex justify-between items-start mb-4">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-cyan-400/20 text-cyan-400 rounded-full animate-shimmer">
            {project.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </span>
          <span className="text-gray-400 text-sm">{project.year}</span>
        </div>
        
        <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors duration-300">
          {project.title}
        </h3>
        
        <p className="text-gray-400 mb-4 line-clamp-2 transition-colors duration-300 group-hover:text-gray-300">
          {project.description}
        </p>
        
        <a 
          href={project.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-medium transition-all duration-300 hover:gap-3"
        >
          View Project <ExternalLink size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;