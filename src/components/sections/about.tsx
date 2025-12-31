'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { usePrefersReducedMotion } from '@/hooks';

const skills = [
  'Python',
  'LLMs & Fine-tuning',
  'Agentic AI',
  'MLOps',
  'AWS',
  'TypeScript',
];

export default function About() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section id="about" className="max-w-[900px] mx-auto py-[100px]">
      <motion.h2
        className="numbered-heading flex items-center relative mb-10 w-full text-[clamp(26px,5vw,32px)] whitespace-nowrap"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        About Me
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-[50px]">
        <div className="md:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="mb-4 text-light-slate text-[clamp(var(--fz-lg),3vw,var(--fz-xl))] leading-[1.3]">
              Hello! I&apos;m Nico, an AI leader from Buenos Aires, Argentina. My journey into tech started
              as a mechanical engineer working in oil &amp; gas, but I taught myself to code and made 
              a career pivot into data science and AI. I even wrote a{' '}
              <a href="https://medium.com/@nicolas.metallo/train-a-choripan-classifier-with-fast-ai-v1-in-google-colab-6e438817656a" className="inline-link">choripan classifier</a> along the way!
            </p>

            <p className="mb-4 text-light-slate text-[clamp(var(--fz-lg),3vw,var(--fz-xl))] leading-[1.3]">
              After completing my Master&apos;s at <a href="https://www.nyu.edu/" className="inline-link">NYU</a> as
              a Fulbright scholar, I joined <a href="https://aws.amazon.com/" className="inline-link">AWS</a> where
              I&apos;ve spent the last 5+ years helping enterprises and governments across EMEA unlock 
              the potential of AI. I&apos;ve led sovereign AI initiatives with 20+ countries and delivered
              $30M+ in client value.
            </p>

            <p className="mb-4 text-light-slate text-[clamp(var(--fz-lg),3vw,var(--fz-xl))] leading-[1.3]">
              I also run <a href="https://www.youtube.com/@machinelearnear" className="inline-link">@machinelearnear</a> on 
              YouTube where I share AI content in Spanish for the Latin American community.
              Here are a few technologies I&apos;ve been working with recently:
            </p>
          </motion.div>

          <motion.ul
            className="grid grid-cols-[repeat(2,minmax(140px,200px))] gap-0 gap-x-[10px] p-0 mt-5 overflow-hidden list-none styled-list"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {skills.map((skill, i) => (
              <li key={i} className="text-[13px] font-mono text-light-slate">
                {skill}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          className="relative max-w-[300px] mx-auto md:mx-0"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="relative block w-full rounded-[var(--border-radius)] group cursor-pointer">
            <div className="absolute top-4 left-4 w-full h-full rounded-[var(--border-radius)] border-2 border-green transition-all duration-300 group-hover:top-3 group-hover:left-3 z-0" />
            <div className="relative rounded-[var(--border-radius)] overflow-hidden bg-green transition-all duration-300 group-hover:-translate-y-1 group-hover:-translate-x-1">
              <Image
                src="/me.jpg"
                alt="Portrait of Nicolas Metallo"
                width={500}
                height={500}
                className="object-cover relative z-10 mix-blend-multiply filter grayscale contrast-100 transition-all duration-300 group-hover:filter-none group-hover:mix-blend-normal"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
