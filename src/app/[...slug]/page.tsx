import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import ClientLayout from '@/app/layout-client';
import { getPostBySlug, getAllPosts } from '@/lib/content';
import type { Post } from '@/types/content';

interface PostPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slugPath = resolvedParams.slug.join('/');
  const post = await getPostBySlug(slugPath);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Nicolas Metallo`,
    description: post.description,
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post: Post) => ({
    slug: post.slug.split('/'),
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params;
  const slugPath = resolvedParams.slug.join('/');
  const post = await getPostBySlug(slugPath);

  if (!post) {
    notFound();
  }

  const { title, date, tags, content, description } = post;
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

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
          <h1 className="medium-heading text-lightest-slate">{title}</h1>
          <p className="subtitle text-light-slate mt-4">
            <time>{formattedDate}</time>
            {tags && tags.length > 0 && (
              <>
                <span className="mx-2">&mdash;</span>
                {tags.map((tag: string, i: number) => (
                  <Link
                    key={i}
                    href={`/pensieve/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-link text-green hover:text-green/80 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </>
            )}
          </p>
        </motion.header>

        <motion.article
          className="prose prose-invert max-w-none"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </main>
    </ClientLayout>
  );
}
