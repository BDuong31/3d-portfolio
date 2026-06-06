import portfolioData from "./portfolio-data.json";

export interface BlogPost {
  slug: string;
  title: {
    en: string;
    vi: string;
  };
  excerpt: {
    en: string;
    vi: string;
  };
  date: string;
  readTime: {
    en: string;
    vi: string;
  };
  coverImage: string; // Gradient class or image URL
  tags: string[];
  content: {
    en: { type: "paragraph" | "heading" | "code" | "list"; text?: string; items?: string[]; code?: string; language?: string }[];
    vi: { type: "paragraph" | "heading" | "code" | "list"; text?: string; items?: string[]; code?: string; language?: string }[];
  };
}

export const blogs: BlogPost[] = [];

export function updateBlogs(newBlogsArray: any[]) {
  if (!newBlogsArray || !Array.isArray(newBlogsArray)) return;
  // Clear the array without changing its reference
  blogs.length = 0;
  blogs.push(...newBlogsArray);
}

// Initial population
updateBlogs(portfolioData.blogs || []);
