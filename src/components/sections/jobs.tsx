'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks';
import type { Job } from '@/types/content';

interface JobsProps {
  jobs: Job[];
}

export default function Jobs({ jobs }: JobsProps) {
  const [activeTabId, setActiveTabId] = useState(0);
  const [tabFocus, setTabFocus] = useState<number | null>(null);
  const tabsRef = useRef<HTMLButtonElement[]>([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  const focusTab = () => {
    if (tabFocus !== null && tabsRef.current[tabFocus]) {
      tabsRef.current[tabFocus].focus();
      return;
    }
    if (tabFocus !== null) {
      if (tabFocus >= tabsRef.current.length) {
        setTabFocus(0);
      } else if (tabFocus < 0) {
        setTabFocus(tabsRef.current.length - 1);
      }
    }
  };

  useEffect(() => {
    if (tabFocus !== null) {
      focusTab();
    }
  }, [tabFocus]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp': {
        e.preventDefault();
        setTabFocus(tabFocus !== null ? tabFocus - 1 : 0);
        break;
      }
      case 'ArrowDown': {
        e.preventDefault();
        setTabFocus(tabFocus !== null ? tabFocus + 1 : 0);
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <section id="jobs" className="max-w-[700px] mx-auto py-[100px]">
      <motion.h2
        className="numbered-heading flex items-center relative mb-10 w-full text-[clamp(26px,5vw,32px)] whitespace-nowrap"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Where I&apos;ve Worked
      </motion.h2>

      <div className="flex flex-col md:flex-row relative">
        {/* Tab List */}
        <div
          className="relative z-[3] w-full md:w-auto flex md:flex-col overflow-x-auto md:overflow-visible mb-8 md:mb-0 md:pl-0"
          role="tablist"
          aria-label="Job tabs"
          onKeyDown={onKeyDown}
        >
            {jobs.map((job: Job, i: number) => (
              <button
                key={i}
                ref={(el) => {
                  if (el) tabsRef.current[i] = el;
                }}
                className={`flex items-center justify-center md:justify-start min-w-[120px] md:min-w-0 w-full md:w-[var(--tab-width)] h-[var(--tab-height)] px-5 py-0 border-b-2 md:border-b-0 md:border-l-2 border-lightest-navy bg-transparent text-xs font-mono whitespace-nowrap transition-all duration-300 ${
                  activeTabId === i ? 'text-green' : 'text-slate'
                } hover:bg-light-navy/50 focus:outline-none`}
                onClick={() => setActiveTabId(i)}
                role="tab"
                aria-selected={activeTabId === i}
                aria-controls={`panel-${i}`}
                tabIndex={activeTabId === i ? 0 : -1}
              >
                <span>{job.company}</span>
              </button>
            ))}
          {/* Desktop Highlight */}
          <motion.div
            className="hidden md:block absolute top-0 left-0 z-10 w-0.5 h-[var(--tab-height)] rounded-[var(--border-radius)] bg-green"
            animate={{ y: activeTabId * 42 }}
            transition={{ duration: 0.25, ease: [0.645, 0.045, 0.355, 1] }}
          />
          {/* Mobile Highlight */}
          <motion.div
            className="block md:hidden absolute bottom-0 left-0 z-10 h-0.5 w-[120px] bg-green"
            animate={{ x: activeTabId * 120 }}
            transition={{ duration: 0.25, ease: [0.645, 0.045, 0.355, 1] }}
          />
        </div>

        {/* Tab Panels */}
        <div className="w-full md:ml-5 relative">
          <AnimatePresence mode="wait">
            {jobs.map((job: Job, i: number) => (
              activeTabId === i && (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.25 }}
                  role="tabpanel"
                  tabIndex={0}
                  aria-labelledby={`tab-${i}`}
                >
                  <h3 className="mb-0.5 text-[clamp(22px,5vw,var(--fz-xxl))] font-medium leading-[1.3] text-lightest-slate">
                    <span className="text-green">{job.title}</span>
                    <span className="text-green">
                      {' @ '}
                      <a href={job.url} className="inline-link" target="_blank" rel="noreferrer">
                        {job.company}
                      </a>
                    </span>
                  </h3>

                  <p className="mb-[25px] text-light-slate font-mono text-xs">
                    {job.range}
                  </p>

                  <div
                    className="text-light-slate text-[clamp(var(--fz-lg),3vw,var(--fz-xl))] leading-[1.3] styled-list"
                    dangerouslySetInnerHTML={{ __html: job.content }}
                  />
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
