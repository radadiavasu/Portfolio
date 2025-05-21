import React from 'react';
import { skills } from '../data/skills';

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
          My <span className="text-cyan-400">Skills</span>
        </h2>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {skills.map((skill) => (
              <div 
                key={skill.id}
                className="bg-gray-700 p-6 rounded-lg text-center hover:bg-gray-600 transition-colors"
              >
                <div className="text-cyan-400 mb-4 flex justify-center">
                  {skill.icon}
                </div>
                <h3 className="font-medium">{skill.name}</h3>
              </div>
            ))}
          </div>
          
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-8 text-center">My Design Process</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: 1, title: 'Research', description: 'Understanding user needs and business goals through research and discovery.' },
                { step: 2, title: 'Ideate', description: 'Exploring multiple solutions through sketching, wireframing, and creative ideation.' },
                { step: 3, title: 'Design', description: 'Crafting high-fidelity interfaces with attention to detail and user experience.' },
                { step: 4, title: 'Implement', description: 'Collaborating with developers to bring designs to life and iterate based on feedback.' },
              ].map((process) => (
                <div 
                  key={process.step}
                  className="bg-gray-700 p-6 rounded-lg relative"
                >
                  <div className="absolute -top-5 -left-5 w-10 h-10 bg-cyan-400 rounded-full flex items-center justify-center text-gray-900 font-bold">
                    {process.step}
                  </div>
                  <h4 className="text-xl font-bold mb-3 mt-2">{process.title}</h4>
                  <p className="text-gray-300">{process.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;