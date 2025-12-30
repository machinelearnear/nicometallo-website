/**
 * TypeScript type definitions for content schemas
 * Used across the portfolio site for Jobs, Projects, Featured Projects, and Posts
 */

/**
 * Job entry content type
 * Located at: content/jobs/[company]/index.md
 */
export interface Job {
  date: string; // ISO date string for sorting (e.g., '2018-05-14')
  title: string; // Job title (e.g., 'Lead Engineer')
  company: string; // Company name (e.g., 'Upstatement')
  location: string; // Location string (e.g., 'Boston, MA')
  range: string; // Display date range (e.g., 'May 2018 - Present')
  url: string; // Company website URL
  content: string; // Markdown body content (bullet points)
}

/**
 * Featured project content type
 * Located at: content/featured/[name]/index.md
 */
export interface FeaturedProject {
  date: string; // Priority number for sorting (e.g., '1', '2', '3')
  title: string; // Project title
  cover: string; // Relative path to cover image (e.g., './halcyon.png')
  tech: string[]; // Array of technology names
  github?: string; // GitHub repository URL (optional)
  external?: string; // External live demo URL (optional)
  cta?: string; // Call-to-action link (optional, e.g., course link)
  content: string; // Markdown body content (HTML description)
}

/**
 * Project content type
 * Located at: content/projects/[name].md
 */
export interface Project {
  date: string; // ISO date string (e.g., '2020-03-27')
  title: string; // Project title
  tech: string[]; // Array of technology names
  github?: string; // GitHub repository URL (optional)
  external?: string; // External live demo URL (optional)
  company?: string; // Company name if applicable (optional)
  showInProjects: boolean; // Flag to show in projects grid
  content: string; // Markdown body content
}

/**
 * Blog post content type
 * Located at: content/posts/[slug]/index.md
 */
export interface Post {
  title: string; // Post title
  description: string; // Short description for SEO/cards
  date: string; // ISO date string (e.g., '2021-04-21')
  draft: boolean; // Whether the post is a draft
  slug: string; // URL slug (e.g., '/pensieve/clickable-cards')
  tags: string[]; // Array of tag names
  content: string; // Markdown body content
}

/**
 * Frontmatter parsed from markdown files
 */
export interface ParsedFrontmatter {
  date: string;
  title: string;
  [key: string]: unknown;
}

/**
 * Generic content item with slug for sorting/filtering
 */
export interface ContentItem {
  slug: string;
  date: string;
}

/**
 * Sort order for content items
 */
export type SortOrder = 'asc' | 'desc';

/**
 * Job with computed slug for display
 */
export interface JobWithSlug extends Job {
  slug: string;
}

/**
 * Project with computed slug for display
 */
export interface ProjectWithSlug extends Project {
  slug: string;
}

/**
 * Featured project with computed slug for display
 */
export interface FeaturedProjectWithSlug extends FeaturedProject {
  slug: string;
}

/**
 * Post with computed slug for display
 */
export interface PostWithSlug extends Post {
  slug: string;
}
