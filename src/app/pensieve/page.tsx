import { Metadata } from 'next';
import Link from 'next/link';
import ClientLayout from '@/app/layout-client';
import { FadeIn } from '@/components/fade-in';
import { getAllPosts } from '@/lib/content';
import { Icon } from '@/components/icons';
import type { Post } from '@/types/content';

export const metadata: Metadata = {
  title: 'Pensieve | Nicolas Metallo',
  description: 'A collection of memories',
};

export default async function PensievePage() {
  const posts: Post[] = await getAllPosts();

  return (
    <ClientLayout>
      <main className="fillHeight py-[100px] px-[25px] max-w-[1000px] mx-auto">
        <FadeIn as="header" className="mb-[100px] text-center" y={30}>
          <h1 className="big-heading text-lightest-slate">Pensieve</h1>
          <p className="subtitle text-light-slate mt-4">
            <a
              href="https://www.wizardingworld.com/writing-by-jk-rowling/pensieve"
              target="_blank"
              rel="noreferrer"
              className="inline-link hover:text-green transition-colors"
            >
              a collection of memories
            </a>
          </p>
        </FadeIn>

        <ul className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[15px] mt-12">
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
                        {tags.map((tag: string, j: number) => (
                          <li key={j} className="text-green font-mono text-xs">
                            #{tag}
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
      </main>
    </ClientLayout>
  );
}
