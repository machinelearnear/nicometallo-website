import { Metadata } from 'next';
import Link from 'next/link';
import ClientLayout from '@/app/layout-client';
import { FadeIn } from '@/components/fade-in';
import { getPostsByTag } from '@/lib/content';
import { Icon } from '@/components/icons';
import type { Post } from '@/types/content';

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const tag = resolvedParams.tag;
  return {
    title: `Tag: ${tag} | Nicolas Metallo`,
    description: `Posts tagged with ${tag}`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const resolvedParams = await params;
  const tag = resolvedParams.tag;
  // Decode the tag from kebab-case
  const tagName = tag.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const posts: Post[] = await getPostsByTag(tagName);

  return (
    <ClientLayout>
      <main className="fillHeight py-[100px] px-[25px] max-w-[1000px] mx-auto">
        <FadeIn as="header" className="mb-[50px]" y={30}>
          <span className="text-light-slate mb-4 block">
            <span className="mr-1">&larr;</span>
            <Link href="/pensieve" className="inline-link hover:text-green transition-colors">
              All memories
            </Link>
          </span>
          <h1 className="big-heading text-lightest-slate">#{tag}</h1>
        </FadeIn>

        {posts.length === 0 ? (
          <p className="text-light-slate">No posts found with this tag.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[15px]">
            {posts.map((post: Post, i: number) => {
              const { title, description, slug, date, tags } = post;
              const formattedDate = new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });

              return (
                <FadeIn
                  key={slug}
                  as="li"
                  className="cursor-default transition-transform duration-300"
                  delay={i * 0.05}
                >
                  <Link href={`/${slug}`} className="block relative z-10">
                    <div className="flex flex-col justify-between h-full p-7 rounded-[var(--border-radius)] bg-light-navy shadow-xl transition-all duration-300 hover:-translate-y-1.75 hover:shadow-2xl">
                      <header>
                        <div className="flex justify-between items-center mb-7 text-green">
                          <Icon name="Bookmark" />
                        </div>
                        <h3 className="text-[clamp(22px,5vw,var(--fz-xxl))] text-lightest-slate font-semibold leading-tight mb-2.5">
                          {title}
                        </h3>
                        <p className="text-light-slate text-[17px] leading-relaxed">{description}</p>
                      </header>

                      <footer className="mt-5 flex justify-between items-end">
                        <time className="text-light-slate font-mono text-xs uppercase tracking-wide">
                          {formattedDate}
                        </time>
                        <ul className="flex flex-wrap gap-x-3.75">
                          {tags.map((t: string, j: number) => (
                            <li key={j} className={`font-mono text-xs ${t === tagName ? 'text-green' : 'text-slate'}`}>
                              #{t}
                            </li>
                          ))}
                        </ul>
                      </footer>
                    </div>
                  </Link>
                </FadeIn>
              );
            })}
          </ul>
        )}
      </main>
    </ClientLayout>
  );
}
