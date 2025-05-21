import { ReactNode } from 'react';

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  link: string;
  year: string;
}

export interface Skill {
  id: number;
  name: string;
  icon: ReactNode;
}

export interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  text: string;
  image: string;
}

// Blog related types

export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
}

export interface Comment {
  id: string;
  author: string;
  authorEmail?: string;
  content: string;
  createdAt: Date;
  blogPostId: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: Author;
  createdAt: Date;
  updatedAt: Date;
  categories: Category[];
  tags: Tag[];
  comments: Comment[];
  isFeatured: boolean;
  readTime: number;
} 