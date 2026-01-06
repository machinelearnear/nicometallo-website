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
          const { external, title, tech, github, cover } = project;
          const isOdd = i % 2 !== 0;

          return (
            <motion.li
              key={i}
              className="relative grid grid-cols-12 gap-2.5 items-center mb-[30px] md:mb-[70px] lg:mb-[100px]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Project Content */}
              <div
                className={`relative flex flex-col justify-center h-full col-span-12 md:col-span-5 md:col-start-1 z-[5] ${
                  isOdd ? 'md:col-start-7 md:text-left' : 'md:col-start-1 md:text-right'
                } row-start-1 px-0 py-8 md:p-0`}
              >
                <p className="mb-2.5 text-green font-mono text-[13px] font-normal">Featured Project</p>
                <h3 className="mb-5 text-[clamp(24px,5vw,28px)] text-white md:text-lightest-slate hover:text-green transition-colors">
                  <a href={external} target="_blank" rel="noreferrer">
                    {title}
                  </a>
                </h3>

                <div
                  className="relative z-[2] p-5 md:p-[25px] rounded-[var(--border-radius)] bg-[var(--light-navy)] text-[var(--light-slate)] text-[17px] leading-[1.6] shadow-[0_10px_30px_-15px_rgba(2,12,27,0.7)] styled-list"
                  dangerouslySetInnerHTML={{ __html: project.content }}
                />

                {tech.length > 0 && (
                  <ul className={`flex flex-wrap relative z-[2] mt-5 mb-0 p-0 list-none gap-x-5 gap-y-0 justify-start ${isOdd ? 'md:justify-start' : 'md:justify-end'}`}>
                    {tech.map((t: string, j: number) => (
                      <li
                        key={j}
                        className="text-[var(--light-slate)] font-mono text-[13px] m-0"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                )}

                <div className={`flex items-center relative mt-5 text-lightest-slate ${isOdd ? 'md:justify-start' : 'md:justify-end'}`}>
                  {github && (
                    <a href={github} aria-label="GitHub Link" target="_blank" rel="noreferrer" className="p-2.5 hover:text-[var(--green)] transition-colors">
                      <Icon name="GitHub" />
                    </a>
                  )}
                  {external && (
                    <a href={external} aria-label="External Link" target="_blank" rel="noreferrer" className="p-2.5 hover:text-[var(--green)] transition-colors">
                      <Icon name="External" />
                    </a>
                  )}
                </div>
              </div>

              {/* Project Image */}
              <div
                className={`relative z-[1] col-span-12 md:col-span-6 h-full ${
                  isOdd ? 'md:col-start-1 md:col-end-7' : 'md:col-start-7 md:col-end-13'
                } row-start-1`}
              >
                <a href={external || github || '#'} className="block relative w-full h-full rounded-[var(--border-radius)] overflow-hidden bg-green group">
                  <div className="absolute inset-0 bg-[var(--navy)] opacity-20 z-10 transition-opacity duration-300 group-hover:opacity-0" />
                  <Image
                    src={cover}
                    alt={title}
                    width={600}
                    height={300}
                    className="object-cover w-full h-full mix-blend-multiply filter grayscale contrast-[1] brightness-[90%] transition-all duration-300 group-hover:filter-none group-hover:mix-blend-normal group-hover:brightness-100"
                  />
                </a>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
