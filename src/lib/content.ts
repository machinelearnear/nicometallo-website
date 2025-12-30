import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import type { Job, FeaturedProject, Project, Post } from '@/types/content';

const contentDirectory = path.join(process.cwd(), 'content');

/**
 * Parse a markdown file and return frontmatter and content
 */
async function parseMarkdownFile(filePath: string) {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  return { data, content };
}

/**
 * Process markdown content to HTML using remark
 */
async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

/**
 * Get all jobs sorted by date (descending)
 */
export async function getAllJobs(): Promise<Job[]> {
  const jobsPath = path.join(contentDirectory, 'jobs');
  const companies = fs.readdirSync(jobsPath);

  const jobs = await Promise.all(
    companies.map(async (company) => {
      const filePath = path.join(jobsPath, company, 'index.md');
      const { data, content } = await parseMarkdownFile(filePath);
      
      return {
        date: data.date as string,
        title: data.title as string,
        company: data.company as string,
        location: data.location as string,
        range: data.range as string,
        url: data.url as string,
        content: await markdownToHtml(content),
      } as Job;
    })
  );

  return jobs.sort((a, b) => {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
    return 0;
  });
}

/**
 * Get all featured projects sorted by priority (ascending)
 */
export async function getFeaturedProjects(): Promise<FeaturedProject[]> {
  const featuredPath = path.join(contentDirectory, 'featured');
  const projects = fs.readdirSync(featuredPath);

  const featured = await Promise.all(
    projects.map(async (project) => {
      const filePath = path.join(featuredPath, project, 'index.md');
      const { data, content } = await parseMarkdownFile(filePath);
      
      return {
        date: data.date as string, // Used as priority number
        title: data.title as string,
        cover: data.cover as string,
        tech: (data.tech as string[]) || [],
        github: data.github as string | undefined,
        external: data.external as string | undefined,
        cta: data.cta as string | undefined,
        content: await markdownToHtml(content),
      } as FeaturedProject;
    })
  );

  return featured.sort((a, b) => {
    const dateA = parseInt(a.date, 10);
    const dateB = parseInt(b.date, 10);
    return dateA - dateB;
  });
}

/**
 * Get all projects sorted by date (descending)
 * Optionally filter by showInProjects flag
 */
export async function getAllProjects(showOnlyVisible = false): Promise<Project[]> {
  const projectsPath = path.join(contentDirectory, 'projects');
  const files = fs.readdirSync(projectsPath).filter((f) => f.endsWith('.md'));

  const projects = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(projectsPath, file);
      const { data, content } = await parseMarkdownFile(filePath);
      const slug = file.replace(/\.md$/, '');
      
      const project = {
        date: data.date as string,
        title: data.title as string,
        tech: (data.tech as string[]) || [],
        github: data.github as string | undefined,
        external: data.external as string | undefined,
        company: data.company as string | undefined,
        showInProjects: data.showInProjects as boolean,
        content: await markdownToHtml(content),
        slug,
      } as Project;

      return project;
    })
  );

  let filtered = projects;
  if (showOnlyVisible) {
    filtered = projects.filter((p) => p.showInProjects);
  }

  return filtered.sort((a, b) => {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
    return 0;
  });
}

/**
 * Get all published posts sorted by date (descending)
 * Excludes draft posts
 */
export async function getAllPosts(): Promise<Post[]> {
  const postsPath = path.join(contentDirectory, 'posts');
  const slugs = fs.readdirSync(postsPath);

  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const filePath = path.join(postsPath, slug, 'index.md');
      const { data, content } = await parseMarkdownFile(filePath);
      
      return {
        title: data.title as string,
        description: data.description as string,
        date: typeof data.date === 'string' ? data.date : String(data.date),
        draft: data.draft as boolean,
        slug: slug, // Use directory name, not frontmatter slug
        tags: (data.tags as string[]) || [],
        content: await markdownToHtml(content),
      } as Post;
    })
  );

  // Filter out drafts and sort by date
  const published = posts.filter((post) => !post.draft);
  
  return published.sort((a, b) => {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
    return 0;
  });
}

/**
 * Get a single post by slug
 * Uses directory name as the slug, ignoring frontmatter slug field
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const postsPath = path.join(contentDirectory, 'posts');
  const postPath = path.join(postsPath, slug, 'index.md');

  if (!fs.existsSync(postPath)) {
    return null;
  }

  const { data, content } = await parseMarkdownFile(postPath);
  
  return {
    title: data.title as string,
    description: data.description as string,
    date: data.date as string,
    draft: data.draft as boolean,
    slug: slug, // Use directory name, not frontmatter slug
    tags: (data.tags as string[]) || [],
    content: await markdownToHtml(content),
  } as Post;
}

/**
 * Get all unique tags from posts
 */
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tagsSet = new Set<string>();
  
  posts.forEach((post) => {
    post.tags.forEach((tag) => tagsSet.add(tag));
  });

  return Array.from(tagsSet).sort();
}

/**
 * Get posts filtered by tag
 */
export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.tags.includes(tag));
}
