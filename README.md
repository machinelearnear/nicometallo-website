<div align="center">
  <img alt="Logo" src="/images/logo.png" width="100" />
</div>
<h1 align="center">
  nicometallo.com
</h1>
<p align="center">
  Personal portfolio website built with <a href="https://nextjs.org/" target="_blank">Next.js 15</a>, <a href="https://react.dev/" target="_blank">React 19</a>, <a href="https://tailwindcss.com/" target="_blank">Tailwind CSS 4</a>, and <a href="https://www.framer.com/motion/" target="_blank">framer-motion</a>
</p>
<p align="center">
  Forked and migrated from <a href="https://github.com/bchiang7/v4" target="_blank">Brittany Chiang's v4 portfolio</a>
</p>

## 🚨 Forking this repo (please read!)

This is a Next.js 15 port of Brittany Chiang's v4 portfolio. All credit for the original design goes to Brittany Chiang.

Many people have contacted me asking if they can use this code for their own website, and the answer is usually **yes, with attribution**.

I value keeping my site open source, but as you all know, _**plagiarism is bad**_. It's always disheartening whenever I find that someone has copied my site without giving me credit. I spent a non-trivial amount of effort migrating and adapting this site, and I am proud of it! All I ask of you all is to not claim this effort as your own.

Please also note that I did not build this site with the intention of it being a starter theme, so if you have questions about implementation, please refer to the [Next.js docs](https://nextjs.org/docs/).

### TL;DR

Yes, you can fork this repo. Please give me proper credit by linking back to [nicometallo.com](https://nicometallo.com). Thanks!

## 🛠 Installation & Set Up

1. Install dependencies

   ```sh
   npm install
   ```

2. Start the development server

   ```sh
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Building and Running for Production

1. Generate a full static production build

   ```sh
   npm run build
   ```

2. Start the production server

   ```sh
   npm run start
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
/
├── content/           # Markdown content (jobs, projects, posts)
├── public/            # Static assets (images, fonts, resume)
├── src/
│   ├── app/           # Next.js App Router pages
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── archive/
│   │   ├── pensieve/
│   │   └── [...slug]/
│   ├── components/    # React components
│   │   ├── icons/     # SVG icon components
│   │   └── sections/  # Page sections
│   ├── lib/           # Utilities
│   ├── hooks/         # Custom React hooks
│   └── types/         # TypeScript types
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router) |
| UI Library | React 19 |
| Language | TypeScript 5.x |
| Styling | Tailwind CSS 4 |
| Animation | framer-motion |
| Markdown | remark + gray-matter |
| Fonts | Calibre + SF Mono |

## 🎨 Color Reference

| Color          | Hex                                                                |
| -------------- | ------------------------------------------------------------------ |
| Navy           | ![#0a192f](https://via.placeholder.com/10/0a192f?text=+) `#0a192f` |
| Light Navy     | ![#112240](https://via.placeholder.com/10/0a192f?text=+) `#112240` |
| Lightest Navy  | ![#233554](https://via.placeholder.com/10/303C55?text=+) `#233554` |
| Slate          | ![#8892b0](https://via.placeholder.com/10/8892b0?text=+) `#8892b0` |
| Light Slate    | ![#a8b2d1](https://via.placeholder.com/10/a8b2d1?text=+) `#a8b2d1` |
| Lightest Slate | ![#ccd6f6](https://via.placeholder.com/10/ccd6f6?text=+) `#ccd6f6` |
| White          | ![#e6f1ff](https://via.placeholder.com/10/e6f1ff?text=+) `#e6f1ff` |
| Green          | ![#64ffda](https://via.placeholder.com/10/64ffda?text=+) `#64ffda` |

## 📝 Content Management

Content is managed via markdown files in the `content/` directory:

- **`content/jobs/`** - Job/Experience entries
- **`content/featured/`** - Featured projects with images
- **`content/projects/`** - Other projects
- **`content/posts/`** - Blog posts (pensieve)

Each content type has its own frontmatter schema. See `src/types/content.ts` for details.

## 🙏 Attribution

- Original design by [Brittany Chiang](https://brittanychiang.com)
- [Brittany Chiang's v4 repo](https://github.com/bchiang7/v4) - The foundation of this site
