import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BlogPost, Category } from '../../types';
import BlogCard from './BlogCard';
import { ArrowLeft } from 'lucide-react';

interface BlogCategoryPageProps {
  posts: BlogPost[];
  categories: Category[];
}

const BlogCategoryPage: React.FC<BlogCategoryPageProps> = ({ posts, categories }) => {
  const { slug } = useParams<{ slug: string }>();
  
  // Find the category
  const category = categories.find(c => c.slug === slug);
  
  // Filter posts by category
  const filteredPosts = posts.filter(post => 
    post.categories.some(c => c.slug === slug)
  );
  
  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Category not found</h2>
        <p className="text-gray-600 mb-8">The category you're looking for doesn't exist.</p>
        <Link 
          to="/blog" 
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to blog
        </Link>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        to="/blog"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to all posts
      </Link>
      
      <div className="text-center mb-16">
        <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">Category</span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">{category.name}</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Browse all articles in the {category.name} category
        </p>
      </div>
      
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredPosts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No posts in this category</h3>
          <p className="text-gray-600 mb-8">
            There are no posts currently available in the {category.name} category.
          </p>
          <Link 
            to="/blog" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Browse all posts
          </Link>
        </div>
      )}
    </div>
  );
};

export default BlogCategoryPage;