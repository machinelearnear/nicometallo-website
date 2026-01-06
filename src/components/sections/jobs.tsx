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
                className={`flex items-center justify-center md:justify-start min-w-[120px] md:min-w-0 w-full md:w-[var(--tab-width)] h-[var(--tab-height)] px-5 py-0 border-b-2 md:border-b-0 md:border-l-3 bg-transparent text-sm font-mono font-semibold whitespace-nowrap transition-all duration-200 focus:outline-none ${
                  activeTabId === i
                    ? 'border-coral'
                    : 'border-charcoal-lightest hover:border-coral/50'
                }`}
                style={{
                  color: activeTabId === i ? 'var(--coral)' : 'var(--warm-gray)',
                  backgroundColor: activeTabId === i ? 'var(--coral-tint)' : 'transparent',
                }}
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
                  <h3 className="mb-2 font-display text-[clamp(22px,5vw,26px)] font-bold leading-[1.2]" style={{ color: 'var(--warm-white)' }}>
                    <span style={{ color: 'var(--coral)' }}>{job.title}</span>
                    <span style={{ color: 'var(--warm-gray)' }}>
                      {' @ '}
                      <a href={job.url} className="inline-link" target="_blank" rel="noreferrer">
                        {job.company}
                      </a>
                    </span>
                  </h3>

                  <p className="mb-6 font-mono text-sm font-medium tracking-wider" style={{ color: 'var(--warm-gray)' }}>
                    {job.range}
                  </p>

                  <div
                    className="font-sans text-[clamp(16px,3vw,18px)] leading-[1.6] styled-list"
                    style={{ color: 'var(--warm-gray)' }}
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
