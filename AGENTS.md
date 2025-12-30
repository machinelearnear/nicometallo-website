# Project Migration Spec: Gatsby to Next.js 15 + Tailwind + shadcn/ui

> **Purpose**: This document serves as the persistent specification for migrating the portfolio website. Any AI agent or developer can pick up this work by reading this file.

---

## Table of Contents

1. [Oh My OpenCode Agents](#oh-my-opencode-agents)
2. [Beads Progress Tracking](#beads-progress-tracking)
3. [Project Overview](#project-overview)
4. [Current Architecture (Gatsby)](#current-architecture-gatsby)
5. [Target Architecture (Next.js 15)](#target-architecture-nextjs-15)
6. [Design System](#design-system)
7. [Content Schema](#content-schema)
8. [Component Mapping](#component-mapping)
9. [Migration Tasks](#migration-tasks)
10. [Session Handoff Notes](#session-handoff-notes)

---

## Oh My OpenCode Agents

This project uses **Oh My OpenCode** for AI-assisted development. The following agents are available:

### Core Agents

| Agent | Model | Purpose | Use When |
|-------|-------|---------|----------|
| **Sisyphus** | anthropic/claude-opus-4-5 (32k extended thinking) | Default orchestrator. Plans, delegates, executes complex tasks using specialized subagents. Aggressive parallel execution. | Default for most tasks. Plans multi-step work and delegates to specialists. |
| **Oracle** | minimax/MiniMax-M2.1 | Architecture, code review, strategy. Deep logical reasoning and analysis. | Architecture decisions, complex debugging, code review after 2+ failures, strategic planning. |
| **Librarian** | google/gemini-3-flash | Multi-repo analysis, documentation lookup, implementation examples. | External library research, finding patterns in other repos, official docs lookup. |
| **Explore** | opencode/grok-code | Fast codebase exploration and pattern matching. | Quick file searches, finding patterns, understanding code structure. |
| **Frontend UI/UX Engineer** | google/gemini-3-pro-high | Designer-turned-developer. Builds gorgeous UIs. | Visual/styling changes: colors, layouts, animations, responsive design. |
| **Document Writer** | google/gemini-3-flash | Technical writing expert. Prose that flows. | README updates, API documentation, guides. |
| **Multimodal Looker** | google/gemini-3-flash | Visual content specialist. Analyzes PDFs, images, diagrams. | Extracting info from design mockups, diagrams, screenshots. |

### Configuration

Agents are configured in `~/.config/opencode/oh-my-opencode.json`:

```json
{
  "agents": {
    "librarian": { "model": "google/gemini-3-flash" },
    "explore": { "model": "opencode/grok-code" },
    "oracle": { "model": "minimax/MiniMax-M2.1" },
    "frontend-ui-ux-engineer": { "model": "google/gemini-3-pro-high" },
    "document-writer": { "model": "google/gemini-3-flash" },
    "multimodal-looker": { "model": "google/gemini-3-flash" }
  }
}
```

### Usage Guidelines

#### When to Delegate

| Task Type | Delegate To |
|-----------|-------------|
| Frontend visual/styling changes | `frontend-ui-ux-engineer` |
| External library research | `librarian` |
| Complex architecture/review | `oracle` |
| Fast file/code searches | `explore` |
| Documentation writing | `document-writer` |
| Visual analysis (images, PDFs) | `multimodal-looker` |
| Multi-step complex tasks | `sisyphus` (default) |

#### Command Patterns

```bash
# Sisyphus (default agent) handles complex tasks automatically
# Sisyphus will delegate to specialists as needed

# Direct agent calls via background_task tool:
background_task(agent="librarian", prompt="Research React Server Components documentation")
background_task(agent="explore", prompt="Find all API route files in src/app")
background_task(agent="oracle", prompt="Review my component architecture and suggest improvements")
```

### Workflow

1. **Sisyphus** receives the task and checks **Beads** for ready issues (`bd ready`)
2. Sisyphus creates a todo list and delegates to specialized agents (background execution)
3. Results are synthesized and verified
4. **Issues are updated in Beads** for tracking
5. Changes are committed and pushed

---

## Beads Progress Tracking

**Beads** is the Git-native issue tracker for this project. It stores issues as markdown files in `.beads/`, version-controlled alongside your code.

### Why Beads?

- **Context-free resume**: New sessions recover state via `bd` commands
- **Git-native**: Issues tracked in git, no external service needed
- **Phase-based**: Organize work into phases (0-9) with priority
- **Atomic**: Each issue = one discrete task with clear status

### Quick Start

```bash
# See what needs doing
bd ready

# View specific task
bd show <issue-id>

# Sync progress with git
bd sync
```

### Session Continuity Protocol

**Starting a new session:**
```bash
bd ready      # List tasks with no blockers
bd sync       # Sync with git
# Pick highest-priority task, set status to "in_progress"
```

**Before context exhaustion:**
```bash
bd update <issue-id> --status complete  # Mark done
bd create "Next task" -p 1              # Create follow-up
bd sync                                   # Persist state
git add -A && git commit -m "feat: complete task"
git push                                 # Push to remote
```

### Beads Commands

| Command | Description |
|---------|-------------|
| `bd create "Task" -p <phase>` | Create new issue |
| `bd ready` | List ready tasks (no blockers) |
| `bd show <id>` | Show issue details |
| `bd update <id> --status <status>` | Update status |
| `bd sync` | Sync with git |

### Status Values

- `pending` - Not started
- `ready` - Ready to work
- `in_progress` - Currently working
- `complete` - Finished
- `cancelled` - No longer needed

### File Structure

```
.beads/
├── config.yaml         # Beads configuration
├── metadata.json       # Project metadata
├── interactions.jsonl  # Interaction log
└── issues/             # Individual issues (markdown)
    ├── bd-001.md
    ├── bd-002.md
    └── ...
```

---

## Project Overview

**Source**: Brittany Chiang's Portfolio v4 (forked)
**From**: Gatsby 3.x + styled-components + GraphQL
**To**: Next.js 15 (App Router) + Tailwind CSS + shadcn/ui + TypeScript

### Goals

- Modern React 19 / Next.js 15 with App Router
- TypeScript for type safety
- Tailwind CSS for styling (replacing styled-components)
- shadcn/ui for reusable components
- Static site generation (SSG) for performance
- Maintain identical visual design and interactions
- Preserve all content (jobs, projects, posts)

### Non-Goals

- Redesigning the visual appearance
- Changing the site structure or navigation
- Adding new features (focus on 1:1 migration)

---

## Current Architecture (Gatsby)

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Gatsby 3.4.1 |
| UI Library | React 17.0.2 |
| Styling | styled-components 5.3.0 |
| Data | GraphQL (gatsby-source-filesystem) |
| Markdown | gatsby-transformer-remark |
| Animation | anime.js 3.1.0, scrollreveal 4.0.5 |
| Transitions | react-transition-group 4.3.0 |
| Code Highlighting | prismjs 1.27.0 |

### Directory Structure

```
/
├── content/
│   ├── featured/      # 3 featured projects with images
│   ├── jobs/          # 5 job entries
│   ├── posts/         # 5 blog posts (pensieve)
│   └── projects/      # ~40 other project markdown files
├── src/
│   ├── components/
│   │   ├── icons/     # 17 SVG icon components
│   │   └── sections/  # 6 page sections
│   ├── fonts/         # Calibre + SF Mono custom fonts
│   ├── hooks/         # 3 custom hooks
│   ├── images/        # Favicons + site images
│   ├── pages/         # Gatsby pages
│   ├── styles/        # Theme, mixins, global styles
│   ├── templates/     # Post + tag templates
│   └── utils/         # Utilities including scroll reveal
└── static/            # Static assets (og.png, resume.pdf)
```

### Page Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with all sections |
| `/archive` | Full project archive list |
| `/pensieve` | Blog post listing |
| `/pensieve/tags` | Tag cloud page |
| `/pensieve/tags/[tag]` | Posts filtered by tag |
| `/[slug]` | Individual blog post |
| `/404` | Custom 404 page |

### Component Architecture

```
Layout
├── Head (SEO meta)
├── Loader (initial animation)
├── Nav (header navigation)
├── Social (left side social links)
├── Email (right side email)
├── Content
│   ├── Hero
│   ├── About
│   ├── Jobs (tabbed experience)
│   ├── Featured (featured projects)
│   ├── Projects (other projects grid)
│   └── Contact
└── Footer
```

---

## Target Architecture (Next.js 15)

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router) |
| UI Library | React 19 |
| Language | TypeScript 5.x |
| Styling | Tailwind CSS 3.4+ |
| Components | shadcn/ui |
| Markdown | next-mdx-remote or contentlayer |
| Animation | framer-motion (replacing anime.js) |
| Code Highlighting | rehype-pretty-code + shiki |

### Target Directory Structure

```
/
├── content/           # Keep existing content structure
│   ├── featured/
│   ├── jobs/
│   ├── posts/
│   └── projects/
├── public/            # Static assets (from /static)
├── src/
│   ├── app/           # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── archive/
│   │   ├── pensieve/
│   │   └── [...slug]/
│   ├── components/
│   │   ├── ui/        # shadcn components
│   │   ├── icons/     # SVG icons (TypeScript)
│   │   └── sections/  # Page sections
│   ├── lib/
│   │   ├── content.ts # Content fetching utilities
│   │   └── utils.ts   # General utilities
│   ├── hooks/         # Custom React hooks
│   ├── styles/
│   │   └── globals.css
│   └── types/         # TypeScript types
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

---

## Design System

### Color Palette

Preserve exact colors as CSS variables in Tailwind config:

```typescript
// tailwind.config.ts colors
const colors = {
  navy: {
    DEFAULT: '#0a192f',
    dark: '#020c1b',
    light: '#112240',
    lightest: '#233554',
  },
  slate: {
    dark: '#495670',
    DEFAULT: '#8892b0',
    light: '#a8b2d1',
    lightest: '#ccd6f6',
  },
  white: '#e6f1ff',
  green: {
    DEFAULT: '#64ffda',
    tint: 'rgba(100, 255, 218, 0.1)',
  },
  pink: '#f57dff',
  blue: '#57cbff',
}
```

### Typography

```typescript
// Font families
const fontFamily = {
  sans: ['Calibre', 'Inter', 'San Francisco', 'SF Pro Text', '-apple-system', 'system-ui', 'sans-serif'],
  mono: ['SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', 'monospace'],
}

// Font sizes (keep exact pixel values)
const fontSize = {
  xxs: '12px',
  xs: '13px',
  sm: '14px',
  md: '16px',
  lg: '18px',
  xl: '20px',
  xxl: '22px',
  heading: '32px',
}
```

### Spacing & Layout Variables

```css
--border-radius: 4px;
--nav-height: 100px;
--nav-scroll-height: 70px;
--tab-height: 42px;
--tab-width: 120px;
--hamburger-width: 30px;
--easing: cubic-bezier(0.645, 0.045, 0.355, 1);
```

---

## Content Schema

### Job Entry (`content/jobs/[company]/index.md`)

```typescript
interface Job {
  date: string;        // ISO date for sorting
  title: string;       // Job title
  company: string;     // Company name
  location: string;    // City, State
  range: string;       // "May 2018 - Present"
  url: string;         // Company website
  content: string;     // Markdown body (bullet points)
}
```

### Featured Project (`content/featured/[name]/index.md`)

```typescript
interface FeaturedProject {
  date: string;
  title: string;
  cover: string;       // Relative path to image
  tech: string[];      // Technology tags
  github?: string;     // GitHub URL
  external?: string;   // Live demo URL
  cta?: string;        // CTA link (e.g., course link)
  content: string;     // HTML description
}
```

### Project (`content/projects/[name].md`)

```typescript
interface Project {
  date: string;
  title: string;
  tech: string[];
  github?: string;
  external?: string;
  company?: string;
  showInProjects: boolean;
  content: string;
}
```

### Blog Post (`content/posts/[slug]/index.md`)

```typescript
interface Post {
  title: string;
  description: string;
  date: string;
  draft: boolean;
  slug: string;
  tags: string[];
  content: string;
}
```

---

## Component Mapping

### Icons (17 total)

| Gatsby Component | Target |
|-----------------|--------|
| `icons/appstore.js` | `icons/appstore.tsx` |
| `icons/bookmark.js` | `icons/bookmark.tsx` |
| `icons/codepen.js` | `icons/codepen.tsx` |
| `icons/external.js` | `icons/external.tsx` |
| `icons/folder.js` | `icons/folder.tsx` |
| `icons/fork.js` | `icons/fork.tsx` |
| `icons/github.js` | `icons/github.tsx` |
| `icons/hex.js` | `icons/hex.tsx` |
| `icons/instagram.js` | `icons/instagram.tsx` |
| `icons/linkedin.js` | `icons/linkedin.tsx` |
| `icons/loader.js` | `icons/loader.tsx` |
| `icons/logo.js` | `icons/logo.tsx` |
| `icons/playstore.js` | `icons/playstore.tsx` |
| `icons/star.js` | `icons/star.tsx` |
| `icons/twitter.js` | `icons/twitter.tsx` |
| `icons/icon.js` | `icons/index.tsx` (dynamic loader) |

### Layout Components

| Gatsby | Next.js | Notes |
|--------|---------|-------|
| `layout.js` | `app/layout.tsx` | Root layout with providers |
| `head.js` | `app/layout.tsx` metadata | Use Next.js Metadata API |
| `nav.js` | `components/nav.tsx` | Scroll hide/show behavior |
| `menu.js` | `components/menu.tsx` | Mobile hamburger menu |
| `side.js` | `components/side.tsx` | Side decorator wrapper |
| `social.js` | `components/social.tsx` | Left side social icons |
| `email.js` | `components/email.tsx` | Right side email link |
| `footer.js` | `components/footer.tsx` | Simple footer |
| `loader.js` | `components/loader.tsx` | Initial loading animation |

### Section Components

| Gatsby | Next.js | Notes |
|--------|---------|-------|
| `sections/hero.js` | `components/sections/hero.tsx` | Intro section |
| `sections/about.js` | `components/sections/about.tsx` | Bio with image |
| `sections/jobs.js` | `components/sections/jobs.tsx` | Tabbed job history |
| `sections/featured.js` | `components/sections/featured.tsx` | Featured projects |
| `sections/projects.js` | `components/sections/projects.tsx` | Project grid |
| `sections/contact.js` | `components/sections/contact.tsx` | Contact CTA |

### Hooks

| Gatsby | Next.js |
|--------|---------|
| `useOnClickOutside.js` | `hooks/use-click-outside.ts` |
| `usePrefersReducedMotion.js` | `hooks/use-prefers-reduced-motion.ts` |
| `useScrollDirection.js` | `hooks/use-scroll-direction.ts` |

---

## Migration Tasks

### Phase 0: Project Setup
- [x] Initialize Next.js 15 project with TypeScript
- [x] Install and configure Tailwind CSS 4
- [ ] Install shadcn/ui and initialize
- [x] Set up path aliases in tsconfig.json
- [x] Copy static assets to /public
- [x] Copy content directory (already existed)
- [x] Set up custom fonts (Calibre, SF Mono) in layout.tsx
- [x] Configure Tailwind with design tokens (colors, fonts, spacing) in globals.css

### Phase 1: Foundation
- [x] Create TypeScript types for all content schemas
- [x] Create `lib/content.ts` with markdown parsing utilities
- [x] Verify content fetching works with sample data
- [x] Create root layout with metadata

### Phase 2: Icon System
- [x] Create `components/icons/` directory
- [x] Migrate all 17 icon components to TypeScript
- [x] Create dynamic `Icon` component with name prop
- [x] Test all icons render correctly

### Phase 3: Core Components
- [x] Create Loader component with SVG animation
- [x] Create Nav component with scroll hide/show + logo
- [x] Create Menu component (mobile hamburger)
- [x] Create Side component (decorator wrapper)
- [x] Create Social component (left side icons)
- [x] Create Email component (right side link)
- [x] Create Footer component

### Phase 4: Page Sections
- [x] Create Hero section
- [x] Create About section with image
- [x] Create Jobs section with tabs
- [x] Create Featured projects section
- [x] Create Projects grid section
- [x] Create Contact section

### Phase 5: Layout Integration
- [x] Create Layout component combining all pieces
- [x] Wire up homepage with all sections
- [x] Implement scroll reveal animations (framer-motion)
- [x] Test responsive behavior at all breakpoints

### Phase 6: Additional Pages
- [x] Create /archive page (full project list)
- [x] Create /pensieve page (blog listing)
- [x] Create /pensieve/tags page (tag cloud)
- [x] Create /pensieve/tags/[tag] page
- [x] Create /[...slug] page (blog post detail)
- [x] Create 404 page

### Phase 7: Polish & Verification
- [ ] Verify all animations work
- [ ] Test keyboard navigation
- [ ] Test mobile responsiveness
- [ ] Lighthouse audit (performance, accessibility)
- [ ] Visual comparison with original site
- [ ] Clean up any unused code

---

## Session Handoff Notes

> **Last Updated**: 2025-12-30
> **Last Phase Completed**: Phase 6 (Additional Pages) - Complete
> **Current Status**: All pages implemented. Build passes. Ready for Phase 7 polish.
>
> **IMPORTANT**: Use Beads for progress tracking. Run `bd ready` to see what needs doing.

### Beads Issues for This Project

All remaining work is tracked in Beads. Run these commands to continue:

```bash
# See what needs to be done
bd ready

# View a specific task
bd show <issue-id>

# Sync with git after status changes
bd sync
```

### What's Done

1. **Phase 0 Complete**:
   - Initialized Next.js 15.5.9 with React 19 and TypeScript
   - Configured Tailwind CSS 4 with all design tokens from original
   - Set up tsconfig.json with path aliases matching Gatsby webpack aliases
   - Created src/app/layout.tsx with custom fonts (Calibre, SF Mono)
   - Created src/app/globals.css with full design system
   - Created src/app/page.tsx with placeholder hero section
   - Created src/lib/utils.ts with cn() helper and KEY_CODES
   - Moved static assets to /public directory
   - Moved old Gatsby pages to src/pages-gatsby-backup
   - Removed .babelrc (conflicted with Next.js SWC)
   - Build passes successfully (`npm run build`)

2. **Phase 1 Complete**:
   - Created TypeScript types in `src/types/content.ts` (Job, FeaturedProject, Project, Post)
   - Created content utilities in `src/lib/content.ts` with gray-matter and remark
   - Functions: `getAllJobs()`, `getFeaturedProjects()`, `getAllProjects()`, `getAllPosts()`, `getPostBySlug()`, `getAllTags()`, `getPostsByTag()`
   - Fixed gray-matter Date object parsing issue (ISO dates converted to strings)
   - Verified content fetching works with all 4 content types
   - Build passes with static generation working

3. **Phase 2 Complete**:
   - Created all 17 icon components in TypeScript
   - Created dynamic Icon component with name prop
   - All icons render correctly with framer-motion support

4. **Phase 3 Complete**:
   - Created Loader component with framer-motion SVG animation
   - Created Nav component with scroll hide/show behavior, logo, and mobile hamburger menu
   - Created Menu component (mobile slide-out drawer)
   - Created Side component (decorator wrapper with fade-in animation)
   - Created Social component (left side social icons with Side wrapper)
   - Created Email component (right side email link with Side wrapper)
   - Created Footer component (with GitHub stats integration)
   - Fixed TypeScript errors in useOnClickOutside hook
   - Fixed TypeScript errors in useScrollDirection hook
   - Fixed circular import in utils/index.ts
   - Fixed ESLint config for ESLint 9 compatibility
   - Build passes successfully with all components integrated

5. **Phase 4 Complete**:
   - All 6 page sections (Hero, About, Jobs, Featured, Projects, Contact) already existed
   - Updated page.tsx to fetch data server-side and pass to client components
   - Fixed Jobs, Featured, and Projects components to accept data as props
   - Restructured layout to use ClientLayout only in page.tsx (not RootLayout)
   - Inlined config values in Nav, Menu, Social, Footer, Email, Contact, and Side components to resolve static generation issues
   - Build passes successfully with all sections integrated

6. **Phase 5 Complete**:
   - Verified scroll reveal animations work with framer-motion
   - All sections use `motion.*` components with `whileInView` and `viewport={{ once: true }}`
   - Responsive breakpoints at 480px, 768px, 1080px configured in globals.css
   - `usePrefersReducedMotion` hook properly handles reduced motion preference
   - Build generates static pages for / and /_not-found successfully
   - Final build output:
     - Route (app)    Size    First Load JS
      - ○ /           54.5 kB  157 kB
      - ○ /_not-found  992 B   103 kB

7. **Phase 6 Complete**:
   - Created /archive/page.tsx - Full project list using `getAllProjects(true)`
   - Created /pensieve/page.tsx - Blog listing using `getAllPosts()`
   - Created /pensieve/tags/page.tsx - Tag cloud with post counts using `getAllTags()`
   - Created /pensieve/tags/[tag]/page.tsx - Posts filtered by tag using `getPostsByTag()`
   - Created /[...slug]/page.tsx - Blog post detail using `getPostBySlug()`
   - Created /not-found.tsx - Custom 404 page
   - Build generates all static pages successfully

### What's Next

**Phase 7: Polish & Verification**

1. Verify all animations work (framer-motion scroll reveal)
2. Test keyboard navigation
3. Test mobile responsiveness at all breakpoints
4. Lighthouse audit (performance, accessibility)
5. Visual comparison with original site
6. Clean up any unused code

After Phase 7, delete Gatsby-specific files:
- gatsby-browser.js, gatsby-config.js, gatsby-node.js, gatsby-ssr.js
- .babelrc
- src/pages-gatsby-backup/ (after verifying all functionality)

### Critical Technical Notes

1. **Static Generation Architecture**:
   - `page.tsx` is an async server component that fetches data server-side
   - Data is passed as props to client components (Jobs, Featured, Projects)
   - `ClientLayout` (Nav, Social, Email, Loader, Footer) wraps content in page.tsx, NOT in RootLayout
   - This separation is required for Next.js static generation to work

2. **Config Inlining**:
   - Config values (email, navLinks, socialMedia) are inlined directly in components
   - This was necessary because importing from `src/config.ts` caused `undefined` errors during SSG
   - Components affected: Nav, Menu, Social, Footer, Email, Contact, Side, About
   - The original `src/config.ts` file exists but is not actively used in client components

3. **CSS Variables**:
   - All design tokens are defined as CSS custom properties in `globals.css`
   - Tailwind v4 `@theme` maps these to utility classes
   - Responsive breakpoints: 480px, 768px, 1080px

4. **Animation System**:
   - Uses `framer-motion` with `whileInView` and `viewport={{ once: true }}`
   - `usePrefersReducedMotion` hook handles accessibility preference
   - No scrollreveal library needed - framer-motion handles all scroll animations

### Important Notes for Future Sessions

1. **Original attribution**: This is a fork of Brittany Chiang's v4 site. Keep attribution in README.
2. **Font licensing**: Calibre and SF Mono fonts are in `src/fonts/`. Ensure proper licensing.
3. **Content**: All content is markdown in `/content`. Structure must be preserved.
4. **Visual parity**: The goal is pixel-perfect migration, not redesign.
5. **scrollreveal**: The original uses scrollreveal library. Replace with framer-motion.
6. **anime.js**: Used for loader animation. Replace with framer-motion or CSS animations.

### Config Values (Inlined in Components)

The config values have been inlined directly in components for static generation compatibility:

```javascript
// Email (used in Contact and Email components)
EMAIL = 'hello@nicometallo.com'

// Nav links (used in Nav and Menu components)
navLinks = [
  { name: 'About', url: '/#about' },
  { name: 'Experience', url: '/#jobs' },
  { name: 'Work', url: '/#projects' },
  { name: 'Contact', url: '/#contact' },
]

// Social media (used in Social and Footer components)
socialMedia = [
  { name: 'GitHub', url: 'https://github.com/nicometallo' },
  { name: 'Instagram', url: 'https://www.instagram.com/nicometallo' },
  { name: 'Twitter', url: 'https://twitter.com/nicometallo' },
  { name: 'Linkedin', url: 'https://linkedin.com/in/nicometallo' },
  { name: 'Codepen', url: 'https://codepen.io/nicometallo' },
]
```

---

## Quick Reference Commands

```bash
# Original Gatsby commands (current)
npm run develop  # Start dev server
npm run build    # Build for production

# Target Next.js commands (after migration)
npm run dev      # Start dev server
npm run build    # Build for production
npm run start    # Start production server
```

---

## Files to Delete After Migration

Once migration is complete and verified:

- `gatsby-browser.js`
- `gatsby-config.js`
- `gatsby-node.js`
- `gatsby-ssr.js`
- `.babelrc`
- All Gatsby-specific dependencies from package.json

---

*This document should be updated after each work session with progress and notes.*

## Landing the Plane (Session Completion)

**When ending a work session**, you MUST complete ALL steps below. Work is NOT complete until `git push` succeeds.

**MANDATORY WORKFLOW:**

1. **Update Beads issues for remaining work** - Mark completed tasks, create new issues
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Sync Beads with git** - This is your progress checkpoint:
   ```bash
   bd sync
   git add -A && git commit -m "feat: describe completed work"
   ```
4. **PUSH TO REMOTE** - This is MANDATORY:
   ```bash
   git pull --rebase
   git push
   git status  # MUST show "up to date with origin"
   ```
5. **Clean up** - Clear stashes, prune remote branches
6. **Verify** - All changes committed AND pushed
7. **Hand off** - Via Beads (next session runs `bd ready`)

**CRITICAL RULES:**
- Work is NOT complete until `git push` succeeds
- NEVER stop before pushing - that leaves work stranded locally
- NEVER say "ready to push when you are" - YOU must push
- If push fails, resolve and retry until it succeeds
