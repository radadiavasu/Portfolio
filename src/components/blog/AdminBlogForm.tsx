import React, { useState, useEffect } from 'react';
import { BlogPost, Category, Tag, Author } from '../../types';
import { v4 as uuidv4 } from 'uuid';

interface AdminBlogFormProps {
  post?: BlogPost;
  categories: Category[];
  tags: Tag[];
  authors: Author[];
  onSave: (post: BlogPost) => void;
  onCancel: () => void;
}

const AdminBlogForm: React.FC<AdminBlogFormProps> = ({ 
  post, 
  categories, 
  tags, 
  authors, 
  onSave, 
  onCancel 
}) => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [readTime, setReadTime] = useState(5);
  const [isFeatured, setIsFeatured] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Initialize form with post data if editing an existing post
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setSlug(post.slug);
      setExcerpt(post.excerpt);
      setContent(post.content);
      setCoverImage(post.coverImage);
      setAuthorId(post.author.id);
      setReadTime(post.readTime);
      setIsFeatured(post.isFeatured);
      setSelectedCategories(post.categories.map(c => c.id));
      setSelectedTags(post.tags.map(t => t.id));
    } else if (authors.length > 0) {
      // Set default author if creating a new post
      setAuthorId(authors[0].id);
    }
  }, [post, authors]);
  
  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
  };
  
  // Handle title change and auto-generate slug
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!post) {
      // Only auto-generate slug for new posts
      setSlug(generateSlug(newTitle));
    }
  };
  
  // Handle category selection
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(e.target.selectedOptions);
    const values = options.map(option => option.value);
    setSelectedCategories(values);
  };
  
  // Handle tag selection
  const handleTagChange = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!title || !slug || !excerpt || !content || !coverImage || !authorId) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Find selected author
    const author = authors.find(a => a.id === authorId);
    if (!author) {
      alert('Please select a valid author');
      return;
    }
    
    // Find selected categories
    const postCategories = categories.filter(c => selectedCategories.includes(c.id));
    
    // Find selected tags
    const postTags = tags.filter(t => selectedTags.includes(t.id));
    
    // Create new post or update existing post
    const updatedPost: BlogPost = {
      id: post?.id || uuidv4(),
      title,
      slug,
      excerpt,
      content,
      coverImage,
      author,
      readTime,
      isFeatured,
      categories: postCategories,
      tags: postTags,
      comments: post?.comments || [],
      createdAt: post?.createdAt || new Date(),
      updatedAt: new Date()
    };
    
    onSave(updatedPost);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          {post ? 'Edit Blog Post' : 'Create New Blog Post'}
        </h2>
        
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          {/* Slug */}
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
              Slug *
            </label>
            <input
              type="text"
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              URL-friendly version of the title (e.g., my-blog-post)
            </p>
          </div>
          
          {/* Excerpt */}
          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
              Excerpt *
            </label>
            <textarea
              id="excerpt"
              rows={3}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              A short summary of the blog post (150-200 characters)
            </p>
          </div>
          
          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content *
            </label>
            <textarea
              id="content"
              rows={12}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          {/* Cover Image */}
          <div>
            <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-1">
              Cover Image URL *
            </label>
            <input
              type="url"
              id="coverImage"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
            {coverImage && (
              <div className="mt-2">
                <img 
                  src={coverImage}
                  alt="Cover preview"
                  className="h-32 object-cover rounded"
                />
              </div>
            )}
          </div>
          
          {/* Author */}
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
              Author *
            </label>
            <select
              id="author"
              value={authorId}
              onChange={(e) => setAuthorId(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            >
              {authors.map(author => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Categories */}
            <div>
              <label htmlFor="categories" className="block text-sm font-medium text-gray-700 mb-1">
                Categories
              </label>
              <select
                id="categories"
                multiple
                value={selectedCategories}
                onChange={handleCategoryChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                size={5}
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-sm text-gray-500">
                Hold Ctrl/Cmd to select multiple categories
              </p>
            </div>
            
            {/* Tags */}
            <div>
              <span className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </span>
              <div className="border border-gray-300 rounded-md p-3 h-[132px] overflow-y-auto">
                {tags.map(tag => (
                  <div key={tag.id} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`tag-${tag.id}`}
                      checked={selectedTags.includes(tag.id)}
                      onChange={() => handleTagChange(tag.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`tag-${tag.id}`} className="ml-2 text-sm text-gray-700">
                      {tag.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Read Time */}
            <div>
              <label htmlFor="readTime" className="block text-sm font-medium text-gray-700 mb-1">
                Read Time (minutes)
              </label>
              <input
                type="number"
                id="readTime"
                min="1"
                max="60"
                value={readTime}
                onChange={(e) => setReadTime(parseInt(e.target.value))}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            {/* Featured */}
            <div className="flex items-center h-full">
              <input
                type="checkbox"
                id="featured"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                Feature this post
              </label>
            </div>
          </div>
        </div>
      </div>
      
      {/* Form actions */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {post ? 'Update Post' : 'Create Post'}
        </button>
      </div>
    </form>
  );
};

export default AdminBlogForm;