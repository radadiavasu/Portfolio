import React, { useState, useEffect } from 'react';
import { BlogPost, Category, Tag } from '../../types';
import BlogCard from './BlogCard';
import { Search } from 'lucide-react';

interface BlogListProps {
  posts: BlogPost[];
  categories: Category[];
  tags: Tag[];
}

const BlogList: React.FC<BlogListProps> = ({ posts, categories, tags }) => {
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(posts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');
  
  useEffect(() => {
    let result = [...posts];
    
    if (searchTerm) {
      result = result.filter(
        post => 
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      result = result.filter(post => 
        Array.isArray(post.categories) &&
        post.categories.some(category => category && category.id === selectedCategory)
      );
    }
    
    if (selectedTag) {
      result = result.filter(post => 
        Array.isArray(post.tags) &&
        post.tags.some(tag => tag && tag.id === selectedTag)
      );
    }
    
    result.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        return a.title.localeCompare(b.title);
      }
    });
    
    setFilteredPosts(result);
  }, [posts, searchTerm, selectedCategory, selectedTag, sortBy]);
  
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedTag('');
    setSortBy('date');
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Blog</h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Insights, tutorials, and updates about web development, design, and technology.
        </p>
      </div>
      
      <div className="mb-12 grid gap-6 md:grid-cols-4">
        <div className="md:col-span-2 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search articles..."
          />
        </div>
        
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="block w-full py-2 px-3 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'title')}
            className="block w-full py-2 px-3 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Title</option>
          </select>
        </div>
      </div>
      
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedTag('')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedTag === '' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
          }`}
        >
          All
        </button>
        {tags.map(tag => (
          <button
            key={tag.id}
            onClick={() => setSelectedTag(selectedTag === tag.id ? '' : tag.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedTag === tag.id 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
            }`}
          >
            {tag.name}
          </button>
        ))}
      </div>
      
      {(searchTerm || selectedCategory || selectedTag || sortBy !== 'date') && (
        <div className="mb-8 flex items-center justify-between bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="text-sm text-gray-300">
            <span className="font-medium">{filteredPosts.length}</span> results found
            {searchTerm && <span> for "<span className="font-medium">{searchTerm}</span>"</span>}
            {selectedCategory && (
              <span> in <span className="font-medium">
                {categories.find(c => c.id === selectedCategory)?.name}
              </span></span>
            )}
          </div>
          <button
            onClick={resetFilters}
            className="text-sm text-blue-400 hover:text-blue-300 font-medium"
          >
            Reset filters
          </button>
        </div>
      )}
      
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredPosts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-800 rounded-lg border border-gray-700">
          <h3 className="text-lg font-medium text-white mb-2">No posts found</h3>
          <p className="text-gray-400">
            Try adjusting your search or filter criteria.
          </p>
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogList;