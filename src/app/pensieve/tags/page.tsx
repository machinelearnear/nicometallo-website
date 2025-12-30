import { Metadata } from 'next';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ClientLayout from '@/app/layout-client';
import { getAllPosts } from '@/lib/content';
import type { Post } from '@/types/content';

export const metadata: Metadata = {
  title: 'Tags | Nicolas Metallo',
  description: 'All tags from my blog posts',
};

interface TagCount {
  tag: string;
  count: number;
}

export default async function TagsPage() {
  const posts = await getAllPosts();
  
  const tagCountsMap = new Map<string, number>();
  posts.forEach((post: Post) => {
    post.tags.forEach((tag) => {
      tagCountsMap.set(tag, (tagCountsMap.get(tag) || 0) + 1);
    });
  });
  
  const tags = Array.from(tagCountsMap.keys()).sort();
  const tagCounts: TagCount[] = tags.map(tag => ({
    tag,
    count: tagCountsMap.get(tag) || 0,
  }));

  return (
    <ClientLayout>
      <main className="fillHeight py-[100px] px-[25px] max-w-[1000px] mx-auto">
        <motion.header
          className="mb-[50px]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-light-slate mb-4 block">
            <span className="mr-1">&larr;</span>
            <Link href="/pensieve" className="inline-link hover:text-green transition-colors">
              All memories
            </Link>
          </span>
          <h1 className="big-heading text-lightest-slate">Tags</h1>
        </motion.header>

        <motion.ul
          className="fancy-list text-light-slate"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {tagCounts.map(({ tag, count }) => (
            <li key={tag} className="text-[clamp(22px,5vw,var(--fz-xxl))] mb-4">
              <Link href={`/pensieve/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`} className="inline-link hover:text-green transition-colors">
                {tag}
                <span className="text-slate font-mono text-base ml-2.5">
                  ({count})
                </span>
              </Link>
            </li>
          ))}
        </motion.ul>
      </main>
    </ClientLayout>
  );
}
