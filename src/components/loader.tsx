'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconLoader } from '@/components/icons';

interface LoaderProps {
  finishLoading: () => void;
}

const Loader = ({ finishLoading }: LoaderProps) => {
  const [isMounted, setIsMounted] = useState(false);

  const animate = useCallback(() => {
    // Use framer-motion for animations
    const sequence = async () => {
      // Logo path stroke animation handled by CSS
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      // Fade in
      await new Promise((resolve) => setTimeout(resolve, 1200));
      
      // Fade out and scale down
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      finishLoading();
    };
    
    sequence();
  }, [finishLoading]);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 10);
    animate();
    return () => clearTimeout(timeout);
  }, [animate]);

  return (
    <AnimatePresence>
      {isMounted && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-navy-dark z-[99]"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.3, ease: 'easeInOut' }
          }}
        >
        <motion.div
          className="max-w-[100px] w-full"
          initial={{ opacity: 0, scale: 0.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.1 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        >
            <IconLoader />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
