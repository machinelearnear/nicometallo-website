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

          return (
            <motion.li
              key={i}
              className="relative grid grid-cols-12 gap-2.5 items-center mb-[100px]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Project Content */}
              <div
                className={`relative z-[2] col-span-12 md:col-span-6 ${
                  isOdd ? 'md:col-start-1 md:text-left' : 'md:col-start-7 md:text-right'
                } row-start-1`}
              >
                <p className="mb-2.5 text-green font-mono text-[13px] font-normal">Featured Project</p>
                <h3 className="mb-5 text-[clamp(24px,5vw,28px)] text-lightest-slate hover:text-green transition-colors">
                  <a href={external} target="_blank" rel="noreferrer">
                    {title}
                  </a>
                </h3>

                <div
                  className="relative z-[2] p-[25px] rounded-[var(--border-radius)] bg-light-navy text-light-slate text-[18px] leading-[1.3] shadow-xl hover:shadow-2xl transition-shadow duration-300 styled-list"
                  dangerouslySetInnerHTML={{ __html: project.content }}
                />

                {tech.length > 0 && (
                  <ul className={`flex flex-wrap relative z-[2] mt-6 mb-2.5 p-0 list-none ${isOdd ? 'justify-start' : 'justify-end'}`}>
                    {tech.map((t: string, j: number) => (
                      <li
                        key={j}
                        className={`mb-1.25 text-light-slate font-mono text-[13px] whitespace-nowrap ${isOdd ? 'mr-5' : 'ml-5'}`}
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                )}

                <div className={`flex items-center relative mt-2.5 text-lightest-slate ${isOdd ? 'justify-start -ml-2.5' : 'justify-end -mr-2.5'}`}>
                  {github && (
                    <a href={github} aria-label="GitHub Link" className="p-2.5 hover:text-green transition-colors">
                      <Icon name="GitHub" />
                    </a>
                  )}
                  {external && !cta && (
                    <a href={external} aria-label="External Link" className="p-2.5 hover:text-green transition-colors">
                      <Icon name="External" />
                    </a>
                  )}
                </div>
              </div>

              {/* Project Image */}
              <div
                className={`relative z-[1] col-span-12 ${
                  isOdd ? 'md:col-start-5 md:col-end-13' : 'md:col-start-1 md:col-end-9'
                } row-start-1 opacity-25 md:opacity-100`}
              >
                <a href={external || github || '#'} className="block relative w-full h-full rounded-[var(--border-radius)] overflow-hidden bg-green group transition-all duration-300">
                  <div className="absolute inset-0 bg-navy mix-blend-screen z-10 transition-opacity duration-300 group-hover:opacity-0" />
                  <Image
                    src={cover}
                    alt={title}
                    width={700}
                    height={400}
                    className="object-cover w-full h-full mix-blend-multiply filter grayscale contrast-100 brightness-90 transition-all duration-300 group-hover:filter-none group-hover:mix-blend-normal group-hover:brightness-100"
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
