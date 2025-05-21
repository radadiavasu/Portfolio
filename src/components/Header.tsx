import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-gray-900 shadow-md py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="text-white font-bold text-xl md:text-2xl cursor-pointer" onClick={() => navigate('/')}>
          <span className="text-cyan-400">BEN</span>CELINSKI
        </div>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-10">
            {['home', 'about', 'projects', 'skills', 'testimonials', 'contact'].map((item) => (
              <li key={item}>
                <button
                  onClick={() => scrollToSection(item)}
                  className="text-white hover:text-cyan-400 transition-colors capitalize"
                >
                  {item}
                </button>
              </li>
            ))}
            <li>
              <Link to="/blog" className="text-white hover:text-cyan-400 transition-colors capitalize">Blog</Link>
            </li>
          </ul>
        </nav>
        
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 absolute top-full left-0 right-0">
          <ul className="px-6 py-4 space-y-4">
            {['home', 'about', 'projects', 'skills', 'testimonials', 'contact'].map((item) => (
              <li key={item}>
                <button
                  onClick={() => scrollToSection(item)}
                  className="text-white hover:text-cyan-400 transition-colors block w-full text-left capitalize"
                >
                  {item}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => { navigate('/blog'); setIsOpen(false); }}
                className="text-white hover:text-cyan-400 transition-colors block w-full text-left capitalize"
              >
                Blog
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;