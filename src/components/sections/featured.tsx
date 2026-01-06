'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Icon } from '@/components/icons';
import { usePrefersReducedMotion } from '@/hooks';
import type { FeaturedProject } from '@/types/content';

interface FeaturedProps {
  projects: FeaturedProject[];
}

export default function Featured({ projects }: FeaturedProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section id="projects" className="py-[100px]">
      <motion.h2
        className="numbered-heading flex items-center relative mb-10 w-full text-[clamp(26px,5vw,32px)] whitespace-nowrap"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Some Things I&apos;ve Built
      </motion.h2>

      <ul className="list-none p-0 m-0">
        {projects.map((project: FeaturedProject, i: number) => {
          const { external, title, tech, github, cover, cta } = project;
          const isOdd = i % 2 !== 0;
          const isYouTube = cta?.includes('youtube');

          return (
            <motion.li
              key={i}
              className={`relative mb-[50px] md:mb-[70px] lg:mb-[100px] ${isOdd ? 'md:ml-[8%]' : 'md:mr-[8%]'}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="relative w-full aspect-[16/9] overflow-hidden rounded-[var(--border-radius)]">
                <a 
                  href={external || github || '#'} 
                  className="block w-full h-full"
                >
                  <Image
                    src={cover}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 85vw"
                  />
                </a>
              </div>

              <div
                className={`absolute top-[10%] bottom-[10%] ${isOdd ? 'left-[5%]' : 'right-[5%]'} w-full md:w-[55%] lg:w-[48%] p-6 md:p-8 rounded-[var(--border-radius)] bg-[rgba(17,34,64,0.85)] backdrop-blur-sm z-10 flex flex-col justify-center`}
              >
                <p className="mb-2.5 text-green font-mono text-[13px] font-normal">Featured Project</p>
                <h3 className="mb-4 text-[clamp(22px,4vw,26px)] text-white hover:text-green transition-colors">
                  <a href={external || github || '#'} target="_blank" rel="noreferrer">
                    {title}
                  </a>
                </h3>
                
                <div 
                  className="text-light-slate text-[15px] leading-[1.5] mb-5"
                  dangerouslySetInnerHTML={{ __html: project.content }}
                />

                {tech.length > 0 && (
                  <ul className="flex flex-wrap gap-x-5 gap-y-2 mb-5">
                    {tech.map((t: string, j: number) => (
                      <li
                        key={j}
                        className="text-light-slate font-mono text-[12px] whitespace-nowrap"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex items-center gap-4 mt-auto">
                  {github && (
                    <a href={github} aria-label="GitHub Link" className="text-lightest-slate hover:text-green transition-colors">
                      <Icon name="GitHub" />
                    </a>
                  )}
                  {isYouTube && cta && (
                    <a href={cta} aria-label="YouTube Link" className="text-lightest-slate hover:text-green transition-colors">
                      <Icon name="YouTube" />
                    </a>
                  )}
                  {external && !isYouTube && (
                    <a href={external} aria-label="External Link" className="text-lightest-slate hover:text-green transition-colors">
                      <Icon name="External" />
                    </a>
                  )}
                </div>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
