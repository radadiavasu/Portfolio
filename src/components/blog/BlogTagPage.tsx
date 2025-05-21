import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BlogPost, Tag } from '../../types';
import BlogCard from './BlogCard';
import { ArrowLeft } from 'lucide-react';

interface BlogTagPageProps {
  posts: BlogPost[];
  tags: Tag[];
}

const BlogTagPage: React.FC<BlogTagPageProps> = ({ posts, tags }) => {
  const { slug } = useParams<{ slug: string }>();
  
  // Find the tag
  const tag = tags.find(t => t.slug === slug);
  
  // Filter posts by tag
  const filteredPosts = posts.filter(post => 
    post.tags.some(t => t.slug === slug)
  );
  
  if (!tag) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Tag not found</h2>
        <p className="text-gray-600 mb-8">The tag you're looking for doesn't exist.</p>
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
        <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">Tag</span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">#{tag.name}</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Browse all articles tagged with {tag.name}
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
          <h3 className="text-lg font-medium text-gray-900 mb-2">No posts with this tag</h3>
          <p className="text-gray-600 mb-8">
            There are no posts currently tagged with {tag.name}.
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

export default BlogTagPage;