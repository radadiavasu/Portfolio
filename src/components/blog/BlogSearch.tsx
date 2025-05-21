import React, { useState, useEffect } from 'react';
import { BlogPost } from '../../types';
import { Link } from 'react-router-dom';
import { Search as SearchIcon, X } from 'lucide-react';

interface BlogSearchProps {
  posts: BlogPost[];
}

const BlogSearch: React.FC<BlogSearchProps> = ({ posts }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<BlogPost[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  
  // Perform search whenever searchTerm or posts changes
  useEffect(() => {
    if (searchTerm.trim().length > 2) {
      const results = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, posts]);
  
  // Format the date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(date));
  };
  
  // Handle click outside to close search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const searchContainer = document.getElementById('search-container');
      if (searchContainer && !searchContainer.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div id="search-container" className="relative">
      <button
        onClick={() => setIsSearchOpen(!isSearchOpen)}
        className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200"
        aria-label="Search blog"
      >
        <SearchIcon className="h-5 w-5" />
      </button>
      
      {isSearchOpen && (
        <div className="absolute right-0 top-full mt-2 w-screen max-w-md bg-white rounded-lg shadow-lg z-20 overflow-hidden">
          <div className="p-4 border-b">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search articles..."
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                autoFocus
              />
              {searchTerm && (
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setSearchTerm('')}
                >
                  <X className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                </button>
              )}
            </div>
          </div>
          
          <div className="max-h-80 overflow-y-auto">
            {searchTerm.trim().length > 2 ? (
              searchResults.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {searchResults.map(post => (
                    <li key={post.id}>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="block hover:bg-gray-50 transition-colors duration-150"
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSearchTerm('');
                        }}
                      >
                        <div className="px-4 py-4 flex items-center">
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm font-medium text-gray-900 truncate">
                              {post.title}
                            </h4>
                            <p className="mt-1 text-sm text-gray-500 truncate">
                              {post.excerpt.substring(0, 80)}...
                            </p>
                            <p className="mt-1 text-xs text-gray-400">
                              {formatDate(post.createdAt)}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-4 py-8 text-center">
                  <p className="text-gray-500">No results found for "{searchTerm}"</p>
                </div>
              )
            ) : searchTerm.trim().length > 0 ? (
              <div className="px-4 py-8 text-center">
                <p className="text-gray-500">Please enter at least 3 characters to search</p>
              </div>
            ) : (
              <div className="px-4 py-8 text-center">
                <p className="text-gray-500">Start typing to search for articles</p>
              </div>
            )}
          </div>
          
          {searchResults.length > 5 && (
            <div className="px-4 py-3 bg-gray-50 text-right">
              <Link
                to={{
                  pathname: "/blog",
                  search: `?search=${encodeURIComponent(searchTerm)}`
                }}
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
                onClick={() => setIsSearchOpen(false)}
              >
                View all {searchResults.length} results
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogSearch;