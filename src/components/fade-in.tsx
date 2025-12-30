'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInProps extends Omit<HTMLMotionProps<'div'>, 'initial' | 'whileInView' | 'viewport' | 'transition'> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  as?: 'div' | 'header' | 'article' | 'section' | 'li' | 'ul' | 'table' | 'tr';
}

export function FadeIn({ 
  children, 
  delay = 0, 
  duration = 0.5, 
  y = 20,
  as = 'div',
  className,
  ...props 
}: FadeInProps) {
  const Component = motion[as] as typeof motion.div;
  
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration, delay }}
      {...props}
    >
      {children}
    </Component>
  );
}
