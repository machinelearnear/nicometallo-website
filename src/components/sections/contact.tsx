'use client';

import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks';

const EMAIL = 'hello@nicometallo.com';

export default function Contact() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section id="contact" className="max-w-[600px] mx-auto mb-[100px] text-center">
      <motion.h2
        className="numbered-heading overline mb-5 text-green font-mono text-[clamp(var(--fz-md),3vw,var(--fz-xl))] font-normal"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        What&apos;s Next?
      </motion.h2>

      <motion.h2
        className="mb-6 text-[clamp(40px,5vw,60px)] text-lightest-slate font-semibold leading-tight"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Get In Touch
      </motion.h2>

      <motion.p
        className="mb-10 text-light-slate text-[clamp(var(--fz-lg),3vw,var(--fz-xl))] leading-[1.3]"
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
