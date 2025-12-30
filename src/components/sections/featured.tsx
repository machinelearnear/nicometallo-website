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

      <ul className="list-none">
        {projects.map((project: FeaturedProject, i: number) => {
          const { external, title, tech, github, cover, cta } = project;
          const isOdd = i % 2 !== 0;

          return (
            <motion.li
              key={i}
              className={`relative mb-[100px] grid grid-cols-12 gap-2.5 items-center ${
                isOdd ? '' : 'grid-flow-dense'
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Project Content */}
              <div
                className={`col-span-7 col-start-6 row-start-1 text-right ${
                  isOdd ? '' : 'col-start-1 col-end-7'
                }`}
              >
                <p className="mb-2.5 text-green font-mono text-xs font-normal">Featured Project</p>
                <h3 className="mb-5 text-[clamp(24px,5vw,28px)] text-lightest-slate">
                  <a href={external} target="_blank" rel="noreferrer" className="hover:text-green transition-colors">
                    {title}
                  </a>
                </h3>

                <div
                  className="relative z-[2] p-6 rounded-[var(--border-radius)] bg-light-navy text-light-slate text-[clamp(var(--fz-lg),3vw,var(--fz-xl))] leading-[1.3] shadow-xl"
                  dangerouslySetInnerHTML={{ __html: project.content }}
                />

                {tech.length > 0 && (
                  <ul className="flex flex-wrap relative z-[2] mt-6 mb-2.5 p-0 list-none">
                    {tech.map((t: string, j: number) => (
                      <li
                        key={j}
                        className="mr-5 mb-1.25 text-light-slate font-mono text-xs whitespace-nowrap"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex items-center relative mt-2.5 -ml-2.5 text-lightest-slate">
                  {cta && (
                    <a
                      href={cta}
                      aria-label="Course Link"
                      className="small-button"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Learn More
                    </a>
                  )}
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
                className={`col-span-5 col-start-8 row-start-1 ${
                  isOdd ? '' : 'col-start-8 col-end-13'
                }`}
              >
                <a href={external || github || '#'} className="block relative rounded-[var(--border-radius)] overflow-hidden group">
                  <div className="absolute inset-0 bg-green mix-blend-screen transition-all duration-300 opacity-0 group-hover:opacity-0" />
                  <Image
                    src={cover}
                    alt={title}
                    width={700}
                    height={400}
                    className="object-cover w-full h-auto rounded-[var(--border-radius)] filter grayscale contrast-90 brightness-90"
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
