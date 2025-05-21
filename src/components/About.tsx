import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-24 bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-72 h-72 bg-cyan-400/20 rounded-full filter blur-2xl"></div>
                <img 
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Ben Celinski" 
                  className="w-full h-auto rounded-2xl relative z-10"
                />
              </div>
            </div>
            
            <div className="w-full md:w-1/2 space-y-6">
              <span className="text-cyan-400 font-medium">About Me</span>
              <h2 className="text-3xl md:text-4xl font-bold">
                Transforming Ideas Into Digital Experiences
              </h2>
              
              <p className="text-gray-300">
                With over 8 years of experience in product design, I specialize in creating intuitive and engaging digital experiences that solve real user problems while driving business growth.
              </p>
              
              <div className="grid grid-cols-2 gap-6 py-6">
                <div>
                  <h3 className="text-4xl font-bold text-cyan-400 mb-2">8+</h3>
                  <p className="text-gray-300">Years of Experience</p>
                </div>
                <div>
                  <h3 className="text-4xl font-bold text-cyan-400 mb-2">50+</h3>
                  <p className="text-gray-300">Projects Completed</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">UI/UX Design</span>
                    <span className="text-cyan-400">98%</span>
                  </div>
                  <div className="w-full bg-gray-700 h-2 rounded-full">
                    <div className="bg-cyan-400 h-2 rounded-full" style={{ width: '98%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Product Strategy</span>
                    <span className="text-cyan-400">92%</span>
                  </div>
                  <div className="w-full bg-gray-700 h-2 rounded-full">
                    <div className="bg-cyan-400 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Design Systems</span>
                    <span className="text-cyan-400">95%</span>
                  </div>
                  <div className="w-full bg-gray-700 h-2 rounded-full">
                    <div className="bg-cyan-400 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
              </div>
              
              <a 
                href="#contact" 
                className="inline-block px-8 py-4 bg-cyan-400 hover:bg-cyan-500 text-gray-900 font-medium rounded-lg transition-colors"
              >
                Let's Work Together
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;