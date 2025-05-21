import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BlogList from './components/blog/BlogList';
import BlogPost from './components/blog/BlogPost';
import { blogPosts, categories, tags } from './data/blog-data';
import BlogCard from './components/blog/BlogCard';

function App() {
  useEffect(() => {
    const handleScroll = () => {
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
          element.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <div className="font-sans bg-gray-900 text-white">
        <Header />  
        <main>
          <Routes>
            <Route path="/blog" element={<BlogList posts={blogPosts} categories={categories} tags={tags} />} />
            <Route path="/blog/:slug" element={<BlogPost posts={blogPosts}/>} />
            <Route path="/" element={
              <>
                <Hero />
                <About />
                <Projects />
                <Skills />
                <Testimonials />
                <section className="py-20 bg-gray-900">
                  <div className="container mx-auto px-6">
                    <div className="max-w-2xl mx-auto text-center mb-12">
                      <span className="text-cyan-400 font-medium mb-4 block">Latest Blog Posts</span>
                      <h2 className="text-3xl md:text-4xl font-bold mb-6">From the Blog</h2>
                      <p className="text-gray-300">Read my latest articles on web development, design, and technology.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                      {blogPosts.slice(0, 3).map(post => (
                        <BlogCard key={post.id} post={post} />
                      ))}
                    </div>
                    <div className="text-center">
                      <Link to="/blog" className="inline-block px-8 py-4 bg-cyan-400 hover:bg-cyan-500 text-gray-900 font-medium rounded-lg transition-colors">View All Blog Posts</Link>
                    </div>
                  </div>
                </section>
                <Contact />
              </>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;