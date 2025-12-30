'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { usePrefersReducedMotion } from '@/hooks';

const skills = [
  'JavaScript (ES6+)',
  'TypeScript',
  'React',
  'Node.js',
  'Python',
  'PostgreSQL',
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
              Hello! My name is Nicolas and I enjoy creating things that live on the internet. My
              interest in web development started back in 2012 when I decided to try editing custom
              Tumblr themes — turns out hacking together a custom reblog button taught me a lot
              about HTML &amp; CSS!
            </p>

            <p className="mb-4 text-light-slate text-[clamp(var(--fz-lg),3vw,var(--fz-xl))] leading-[1.3]">
              Fast-forward to today, and I've had the privilege of working at{' '}
              <a href="https://us.mullenlowe.com/" className="inline-link">an advertising agency</a>,{' '}
              <a href="https://starry.com/" className="inline-link">a start-up</a>,{' '}
              <a href="https://www.apple.com/" className="inline-link">a huge corporation</a>, and{' '}
              <a href="https://scout.camd.northeastern.edu/" className="inline-link">a student-led design studio</a>. My
              main focus these days is building accessible, inclusive products and digital
              experiences at <a href="https://upstatement.com/" className="inline-link">Upstatement</a> for a variety of
              clients.
            </p>

            <p className="mb-4 text-light-slate text-[clamp(var(--fz-lg),3vw,var(--fz-xl))] leading-[1.3]">
              Here are a few technologies I've been working with recently:
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
