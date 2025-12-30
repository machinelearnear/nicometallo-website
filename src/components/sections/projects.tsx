'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Icon } from '@/components/icons';
import { usePrefersReducedMotion } from '@/hooks';
import type { Project } from '@/types/content';

const GRID_LIMIT = 6;

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [showMore, setShowMore] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  
  const firstSix = projects.slice(0, GRID_LIMIT);
  const displayProjects = showMore ? projects : firstSix;

  return (
    <section className="flex flex-col items-center py-[100px]">
      <motion.h2
        className="mb-10 text-[clamp(24px,5vw,var(--fz-heading))] text-lightest-slate font-semibold"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Other Noteworthy Projects
      </motion.h2>

      <Link href="/archive" className="inline-link archive-link font-mono text-sm">
        view the archive
      </Link>

      <ul className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[15px] mt-12 w-full max-w-[1200px]">
        {displayProjects.map((project: Project, i: number) => {
          const { github, external, title, tech } = project;

          return (
            <motion.li
              key={i}
              className="relative transition-all duration-300 group h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="flex flex-col justify-between p-[25px] rounded-[var(--border-radius)] bg-light-navy shadow-[0_10px_30px_-15px_rgba(2,12,27,0.7)] transition-all duration-300 h-full hover:-translate-y-2 hover:shadow-2xl">
                <div>
                  <header className="flex justify-between items-start mb-8">
                    <div className="text-green group-hover:scale-110 transition-transform duration-300">
                      <Icon name="Folder" />
                    </div>
                    <div className="flex items-center -mr-2.5 text-light-slate">
                      {github && (
                        <a
                          href={github}
                          aria-label="GitHub Link"
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.25 hover:text-green transition-colors"
                        >
                          <Icon name="GitHub" />
                        </a>
                      )}
                      {external && (
                        <a
                          href={external}
                          aria-label="External Link"
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.25 hover:text-green transition-colors"
                        >
                          <Icon name="External" />
                        </a>
                      )}
                    </div>
                  </header>

                  <h3 className="m-0 text-[clamp(22px,5vw,var(--fz-xxl))] text-lightest-slate font-semibold leading-tight">
                    <a href={external} target="_blank" rel="noreferrer" className="hover:text-green transition-colors">
                      {title}
                    </a>
                  </h3>

                  <div
                    className="mt-4 text-light-slate text-[17px] leading-[1.5] styled-list"
                    dangerouslySetInnerHTML={{ __html: project.content }}
                  />
                </div>

                <footer className="mt-5">
                  {tech && (
                    <ul className="flex flex-wrap gap-x-3 p-0 list-none styled-list">
                      {tech.map((t: string, j: number) => (
                        <li key={j} className="font-mono text-[10px] text-light-slate leading-7">
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}
                </footer>
              </div>
            </motion.li>
          );
        })}
      </ul>

      <button 
        className="more-button button mt-20 mx-auto"
        onClick={() => setShowMore(!showMore)}
      >
        Show {showMore ? 'Less' : 'More'}
      </button>
    </section>
  );
}
