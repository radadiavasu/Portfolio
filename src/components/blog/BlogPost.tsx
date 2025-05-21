import React, { useMemo } from 'react';
import { BlogPost as BlogPostType } from '../../types';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Facebook, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';

interface BlogPostProps {
  posts: BlogPostType[];
}

const BlogPost: React.FC<BlogPostProps> = ({ posts }) => {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find(p => p.slug === slug);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  // Table of Contents (extract h2/h3 from HTML content)
  const toc = useMemo(() => {
    if (!post) return [];
    const div = document.createElement('div');
    div.innerHTML = post.content;
    const headings = Array.from(div.querySelectorAll('h2, h3'));
    return headings.map(h => ({
      id: h.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || '',
      text: h.textContent || '',
      level: h.tagName === 'H2' ? 2 : 3,
    }));
  }, [post]);

  // Copy link to clipboard
  const copyLink = () => {
    if (navigator.clipboard && shareUrl) {
      navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    }
  };

  // Share handlers
  const shareTo = (platform: 'facebook' | 'twitter' | 'linkedin') => {
    if (!post) return;
    const url = encodeURIComponent(shareUrl);
    const text = encodeURIComponent(post.title);
    let shareLink = '';
    if (platform === 'facebook') shareLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    if (platform === 'twitter') shareLink = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
    if (platform === 'linkedin') shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    window.open(shareLink, '_blank');
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date));
  };

  // Related posts (by category/tag)
  const relatedPosts = post ? posts.filter(p => p.id !== post.id && (
    (Array.isArray(p.categories) && Array.isArray(post.categories) && p.categories.some(c => c && post.categories.some(pc => pc && pc.id === c.id))) ||
    (Array.isArray(p.tags) && Array.isArray(post.tags) && p.tags.some(t => t && post.tags.some(pt => pt && pt.id === t.id)))
  )).slice(0, 3) : [];

  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Post not found</h2>
        <p className="text-gray-400 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
        <Link 
          to="/blog" 
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to blog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Hero Section */}
      <div className="relative h-[340px] md:h-[420px] flex items-end">
        <img
          src={post.coverImage}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-gray-900/95 z-10" />
        <div className="relative z-20 max-w-4xl mx-auto px-6 pb-10 w-full">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {post.categories.map(category => (
              <span key={category.id} className="text-xs font-semibold uppercase tracking-wider text-cyan-300 bg-cyan-900/40 px-3 py-1 rounded-full">
                {category.name}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-lg">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-6 text-gray-300 text-sm">
            <div className="flex items-center gap-2">
              <img src={post.author.avatar} alt={post.author.name} className="h-8 w-8 rounded-full border-2 border-cyan-400" />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.readTime} min read</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag.id} className="px-3 py-1 bg-cyan-800/40 rounded text-xs text-cyan-300">{tag.name}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content & Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-12">
        {/* Main Content */}
        <div className="w-full md:w-2/3">
          {/* Table of Contents */}
          {toc.length > 1 && (
            <div className="mb-10 bg-gray-800/80 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-bold mb-4 text-cyan-400">Table of Contents</h3>
              <ul className="space-y-2">
                {toc.map(item => (
                  <li key={item.id} className={item.level === 2 ? 'ml-0' : 'ml-4'}>
                    <a
                      href={`#${item.id}`}
                      className="text-cyan-300 hover:underline text-sm"
                      onClick={e => {
                        e.preventDefault();
                        const el = document.getElementById(item.id);
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <article className="prose prose-invert prose-lg max-w-none text-white dark:text-white">
            <div
              dangerouslySetInnerHTML={{
                __html: post.content.replace(/<h([23])>(.*?)<\/h\1>/g, (match, level, text) => {
                  const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                  return `<h${level} id="${id}">${text}</h${level}>`;
                }),
              }}
            />
          </article>
          {/* Author Bio */}
          <div className="bg-cyan-950/60 rounded-xl p-6 mb-12 flex items-center gap-6 shadow mt-16">
            <img src={post.author.avatar} alt={post.author.name} className="h-16 w-16 rounded-full border-2 border-cyan-400" />
            <div>
              <h4 className="text-lg font-bold text-cyan-300 mb-1">{post.author.name}</h4>
              <p className="text-gray-300 text-sm">{post.author.bio}</p>
            </div>
          </div>
          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <h3 className="text-xl font-bold text-cyan-400 mb-6">Related Posts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedPosts.map(relatedPost => (
                  <Link key={relatedPost.id} to={`/blog/${relatedPost.slug}`} className="group block rounded-lg overflow-hidden shadow hover:shadow-lg transition bg-gray-800 border border-gray-700">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={relatedPost.coverImage}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-white group-hover:text-cyan-400 transition-colors mb-1">{relatedPost.title}</h4>
                      <div className="text-xs text-gray-400">{formatDate(relatedPost.createdAt)}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Sidebar */}
        <aside className="hidden md:block md:w-1/3 sticky top-32 self-start h-fit">
          <div className="bg-gray-800/80 rounded-xl p-6 mb-8 shadow flex flex-col items-center border border-gray-700">
            <img src={post.author.avatar} alt={post.author.name} className="h-20 w-20 rounded-full border-2 border-cyan-400 mb-4" />
            <h4 className="text-lg font-bold text-cyan-300 mb-1">{post.author.name}</h4>
            <p className="text-gray-300 text-sm text-center">{post.author.bio}</p>
          </div>
          <div className="mb-8">
            <h5 className="text-md font-semibold text-cyan-400 mb-3">Share</h5>
            <div className="flex gap-3">
              <button onClick={() => shareTo('facebook')} className="text-blue-500 hover:text-blue-300" aria-label="Share on Facebook"><Facebook className="h-6 w-6" /></button>
              <button onClick={() => shareTo('twitter')} className="text-cyan-400 hover:text-cyan-200" aria-label="Share on Twitter"><Twitter className="h-6 w-6" /></button>
              <button onClick={() => shareTo('linkedin')} className="text-blue-700 hover:text-blue-500" aria-label="Share on LinkedIn"><Linkedin className="h-6 w-6" /></button>
              <button onClick={copyLink} className="text-gray-400 hover:text-cyan-400" aria-label="Copy link"><LinkIcon className="h-6 w-6" /></button>
            </div>
          </div>
          <div>
            <h5 className="text-md font-semibold text-cyan-400 mb-3">Meta</h5>
            <div className="flex flex-col gap-2 text-gray-300 text-sm">
              <div className="flex items-center gap-2"><Calendar className="h-4 w-4" />{formatDate(post.createdAt)}</div>
              <div className="flex items-center gap-2"><Clock className="h-4 w-4" />{post.readTime} min read</div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.categories.map(category => (
                <span key={category.id} className="px-3 py-1 bg-cyan-900/40 rounded text-xs text-cyan-300">{category.name}</span>
              ))}
              {post.tags.map(tag => (
                <span key={tag.id} className="px-3 py-1 bg-cyan-800/40 rounded text-xs text-cyan-300">{tag.name}</span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogPost;