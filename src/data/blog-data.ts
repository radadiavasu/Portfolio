import { BlogPost, Author, Category, Tag } from '../types';

// Authors
export const authors: Author[] = [
  {
    id: '1',
    name: 'Vasu Radadia',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    bio: 'Full-stack developer, blogger, and tech enthusiast. Passionate about building scalable web apps and sharing knowledge.',
  },
  {
    id: '2',
    name: 'Kunj Radadiya',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    bio: '3D Artist and front-end specialist. Loves crafting beautiful, user-centric digital experiences.',
  },
  {
    id: '3',
    name: 'Alex Kim',
    avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
    bio: 'Cloud architect and DevOps advocate. Writes about cloud, automation, and best practices.',
  },
];

// Categories
export const categories: Category[] = [
  { id: '1', name: 'Web Development', slug: 'web-development' },
  { id: '2', name: 'UI/UX Design', slug: 'ui-ux-design' },
  { id: '3', name: 'Cloud & DevOps', slug: 'cloud-devops' },
  { id: '4', name: 'JavaScript', slug: 'javascript' },
  { id: '5', name: 'React', slug: 'react' },
  { id: '6', name: 'Career', slug: 'career' },
];

// Tags
export const tags: Tag[] = [
  { id: '1', name: 'React', slug: 'react' },
  { id: '2', name: 'TypeScript', slug: 'typescript' },
  { id: '3', name: 'UI', slug: 'ui' },
  { id: '4', name: 'Cloud', slug: 'cloud' },
  { id: '5', name: 'DevOps', slug: 'devops' },
  { id: '6', name: 'JavaScript', slug: 'javascript' },
  { id: '7', name: 'CSS', slug: 'css' },
  { id: '8', name: 'Career', slug: 'career' },
  { id: '9', name: 'Productivity', slug: 'productivity' },
  { id: '10', name: 'Design', slug: 'design' },
];

// Blog Posts
export const blogPosts: BlogPost[] = [
  {
    id: '101',
    title: '10 Modern React Patterns You Should Know in 2024',
    slug: 'modern-react-patterns-2024',
    excerpt: 'Discover the latest React patterns and best practices for building scalable, maintainable apps in 2024. Includes hooks, context, suspense, and more.',
    content: `
      <h2>Introduction</h2>
      <p>React continues to evolve, and so do the patterns we use to build applications. In this article, we explore 10 modern React patterns that will help you write cleaner, more maintainable code in 2024.</p>
      <h3>1. Functional Components & Hooks</h3>
      <p>Hooks have become the standard for managing state and side effects. Prefer functional components over class components for new codebases.</p>
      <h3>2. Context for State Management</h3>
      <p>Use <code>React.createContext</code> for lightweight state sharing across components. For larger apps, consider libraries like Zustand or Redux Toolkit.</p>
      <h3>3. Suspense & Lazy Loading</h3>
      <p>Optimize performance by code-splitting and using <code>React.lazy</code> with <code>Suspense</code> for dynamic imports.</p>
      <h3>...and more</h3>
      <p>Read the full article for all 10 patterns and code examples.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
    author: authors[0],
    createdAt: new Date('2024-06-01'),
    updatedAt: new Date('2024-06-01'),
    categories: [categories[0], categories[4]],
    tags: [tags[0], tags[1], tags[6]],
    comments: [],
    isFeatured: true,
    readTime: 7,
  },
  {
    id: '102',
    title: 'Random',
    slug: 'random',
    excerpt: 'Step-by-step guide to deploying a modern web app on AWS. Covers S3, CloudFront, Lambda, and CI/CD best practices.',
    content: `
      <h2>Introduction</h2>
      <p>Cloud deployment can be daunting. This guide walks you through deploying a React app on AWS using S3, CloudFront, and Lambda.</p>
      <h3>1. S3 for Static Hosting</h3>
      <p>Host your static assets on S3 for high availability and scalability.</p>
      <h3>2. CloudFront for CDN</h3>
      <p>Distribute your content globally with AWS CloudFront.</p>
      <h3>3. Lambda for Serverless Functions</h3>
      <p>Use AWS Lambda for backend logic and APIs.</p>
      <h3>4. CI/CD</h3>
      <p>Automate deployments with GitHub Actions or AWS CodePipeline.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
    author: authors[1],
    createdAt: new Date('2024-04-15'),
    updatedAt: new Date('2024-04-16'),
    categories: [categories[2]],
    tags: [tags[3], tags[4]],
    comments: [],
    isFeatured: false,
    readTime: 8,
  },
  {
    id: '103',
    title: 'From Zero to Cloud: Deploying Your First App on AWS',
    slug: 'zero-to-cloud-aws',
    excerpt: 'Step-by-step guide to deploying a modern web app on AWS. Covers S3, CloudFront, Lambda, and CI/CD best practices.',
    content: `
      <h2>Introduction</h2>
      <p>Cloud deployment can be daunting. This guide walks you through deploying a React app on AWS using S3, CloudFront, and Lambda.</p>
      <h3>1. S3 for Static Hosting</h3>
      <p>Host your static assets on S3 for high availability and scalability.</p>
      <h3>2. CloudFront for CDN</h3>
      <p>Distribute your content globally with AWS CloudFront.</p>
      <h3>3. Lambda for Serverless Functions</h3>
      <p>Use AWS Lambda for backend logic and APIs.</p>
      <h3>4. CI/CD</h3>
      <p>Automate deployments with GitHub Actions or AWS CodePipeline.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
    author: authors[2],
    createdAt: new Date('2024-04-15'),
    updatedAt: new Date('2024-04-16'),
    categories: [categories[2]],
    tags: [tags[3], tags[4]],
    comments: [],
    isFeatured: false,
    readTime: 8,
  },
  {
    id: '104',
    title: 'How to Ace Your First Developer Interview',
    slug: 'ace-developer-interview',
    excerpt: 'Tips and strategies for landing your first developer job. Learn about resumes, portfolios, technical interviews, and soft skills.',
    content: `
      <h2>Introduction</h2>
      <p>Landing your first developer job can be challenging. Here are proven tips to help you stand out and succeed.</p>
      <h3>1. Build a Strong Portfolio</h3>
      <p>Showcase real projects, not just tutorials. Highlight your problem-solving skills.</p>
      <h3>2. Prepare for Technical Interviews</h3>
      <p>Practice coding problems, system design, and whiteboard challenges.</p>
      <h3>3. Don't Forget Soft Skills</h3>
      <p>Communication and teamwork are just as important as technical ability.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    author: authors[0],
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-11'),
    categories: [categories[5]],
    tags: [tags[7], tags[8]],
    comments: [],
    isFeatured: false,
    readTime: 6,
  },
];