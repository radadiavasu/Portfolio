import React from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="min-h-screen relative flex items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse"></div>
      </div>
      
      <div className="container mx-auto px-6 py-24 pt-32 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-cyan-400 font-medium mb-4 animate-fadeIn">Welcome to my portfolio</p>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 animate-fadeIn">
            Creative <span className="text-cyan-400">Product Designer</span> Based in New York
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 animate-fadeIn animation-delay-300 max-w-2xl mx-auto">
            I help companies create exceptional digital experiences through user-centered design and creative problem-solving.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fadeIn animation-delay-500">
            <a 
              href="#projects" 
              className="px-8 py-4 bg-cyan-400 hover:bg-cyan-500 text-gray-900 font-medium rounded-lg transition-colors"
            >
              View My Work
            </a>
            <a 
              href="#contact" 
              className="px-8 py-4 border-2 border-white hover:border-cyan-400 hover:text-cyan-400 font-medium rounded-lg transition-colors"
            >
              Let's Talk
            </a>
          </div>
        </div>
      </div>
      
      <button 
        onClick={scrollToAbout}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white hover:text-cyan-400 transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ArrowDown size={32} />
      </button>
    </section>
  );
};

export default Hero;