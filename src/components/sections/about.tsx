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

      <div className="grid grid-cols-3-2 gap-[50px]">
        <div className="col-span-3-2">
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
            className="grid grid-cols-2 minmax-[140px,200px] gap-0 gap-x-[10px] p-0 mt-5 overflow-hidden list-none"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {skills.map((skill, i) => (
              <li key={i} className="relative mb-2.5 pl-5 font-mono text-xs text-light-slate">
                <span className="absolute left-0 text-green text-sm leading-[12px]">▹</span>
                {skill}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          className="relative max-w-[300px]"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="relative block w-full rounded-[var(--border-radius)] bg-green group">
            <div className="relative z-10 rounded-[var(--border-radius)] overflow-hidden">
              <Image
                src="/me.jpg"
                alt="Headshot"
                width={500}
                height={500}
                className="object-cover filter grayscale contrast-100 brightness-90 mix-blend-multiply transition-all duration-300"
              />
            </div>
            <div className="absolute inset-0 rounded-[var(--border-radius)] transition-all duration-300 mix-blend-screen bg-navy" />
            <div className="absolute top-3.5 left-3.5 w-full h-full rounded-[var(--border-radius)] border-2 border-green z-[-1]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
