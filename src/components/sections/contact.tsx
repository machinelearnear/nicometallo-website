'use client';

import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks';

const EMAIL = 'hello@nicometallo.com';

export default function Contact() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section id="contact" className="max-w-[600px] mx-auto mb-[100px] text-center">
      <motion.p
        className="flex items-center justify-center gap-2 mb-5 font-mono text-base font-bold uppercase tracking-widest"
        style={{ color: 'var(--coral)' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span>04.</span>
        <span>What&apos;s Next?</span>
      </motion.p>

      <motion.h2
        className="mb-6 font-display text-[clamp(40px,5vw,64px)] font-black leading-[1.1]"
        style={{
          color: 'var(--warm-white)',
          textShadow: '3px 3px 0 var(--coral), 6px 6px 0 rgba(0, 217, 255, 0.3)'
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Get In Touch
      </motion.h2>

      <motion.p
        className="mb-10 font-sans text-[clamp(17px,3vw,19px)] leading-[1.6]"
        style={{ color: 'var(--warm-gray)' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        I&apos;m always interested in hearing about new AI projects, speaking opportunities, or just
        connecting with folks working on interesting problems. Whether you want to collaborate on
        GenAI initiatives or just say hola, my inbox is always open!
      </motion.p>

      <motion.a
        href={`mailto:${EMAIL}`}
        className="button inline-block mt-10 hover:shadow-[0_0_20px_rgba(100,255,218,0.3)] hover:-translate-y-1 transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Say Hello
      </motion.a>
    </section>
  );
}
