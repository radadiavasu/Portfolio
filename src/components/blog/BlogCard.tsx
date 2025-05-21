import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../../types';
import { Calendar, Clock, User } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  };
  
  return (
    <article className="flex flex-col bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:translate-y-[-4px] border border-gray-700">
      <div className="relative">
        {post.isFeatured && (
          <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
            Featured
          </div>
        )}
        
        <Link to={`/blog/${post.slug}`} className="block aspect-video overflow-hidden">
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </Link>
      </div>
      
      <div className="flex-1 p-6 flex flex-col">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.categories.map(category => (
            <Link
              key={category.id}
              to={`/blog/category/${category.slug}`}
              className="text-xs font-semibold uppercase tracking-wider text-blue-400 hover:text-blue-300"
            >
              {category.name}
            </Link>
          ))}
        </div>
        
        <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 hover:text-blue-400">
          <Link to={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h2>
        
        <p className="text-gray-400 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="mt-auto flex items-center text-sm text-gray-400 gap-4">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1" />
            <span>{post.author.name}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{formatDate(post.createdAt)}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{post.readTime} min read</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;