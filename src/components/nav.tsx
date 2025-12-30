'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollDirection, usePrefersReducedMotion } from '@/hooks';
import { IconLogo, IconHex } from '@/components/icons';

interface NavLink {
  name: string;
  url: string;
}

interface NavProps {
  isHome?: boolean;
}

const navLinks: NavLink[] = [
  { name: 'About', url: '/#about' },
  { name: 'Experience', url: '/#jobs' },
  { name: 'Work', url: '/#projects' },
  { name: 'Contact', url: '/#contact' },
];

export default function Nav({ isHome = false }: NavProps) {
  const [isMounted, setIsMounted] = useState(!isHome);
  const scrollDirection = useScrollDirection('down');
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = () => {
    setScrolledToTop(window.scrollY < 50);
  };

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsMounted(true);
      return;
    }

    const timeout = setTimeout(() => {
      setIsMounted(true);
    }, 100);

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prefersReducedMotion, isHome]);

  const timeout = isHome ? 1000 : 0;
  const navHeight = scrolledToTop ? '100px' : '70px';
  const isHidden = scrollDirection === 'down' && !scrolledToTop;

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-12 backdrop-blur-md bg-navy/85 transition-all duration-300"
      style={{
        height: navHeight,
        transform: isHidden ? 'translateY(-70px)' : 'translateY(0)',
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <nav className="flex items-center justify-between h-full max-w-[1400px] mx-auto">
        <Link href="/" className="flex items-center relative z-10" aria-label="home">
          <div className="absolute hex-container transition-transform duration-300">
            <IconHex />
          </div>
          <div className="relative z-10">
            <IconLogo />
          </div>
        </Link>

        <div className="hidden md:flex items-center">
          <ol className="flex items-center gap-2 list-none m-0 p-0 font-mono text-xs">
            {navLinks.map(({ url, name }, i) => (
              <motion.li
                key={i}
                style={{ transitionDelay: `${isHome ? i * 100 : 0}ms` }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: isMounted ? timeout + i * 100 : 0 }}
              >
                <Link
                  href={url}
                  className="relative px-3 py-2 text-xs text-light-slate hover:text-green transition-colors before:content-['0'] before:absolute before:left-0 before:text-green before:text-xxs before:-ml-1 before:opacity-0 hover:before:opacity-100"
                >
                  {name}
                </Link>
              </motion.li>
            ))}
          </ol>

          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 px-4 py-2 border border-green text-green rounded font-mono text-xs hover:bg-green/10 transition-colors"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: isMounted ? timeout + navLinks.length * 100 : 0 }}
          >
            Resume
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden relative z-10 p-3 bg-transparent border-0 cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          <div className="w-8 h-6 relative">
            <span
              className={`absolute left-0 w-8 h-0.5 bg-green transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 top-3' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 w-8 h-0.5 bg-green transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : 'top-3'
              }`}
            />
            <span
              className={`absolute left-0 w-8 h-0.5 bg-green transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 bottom-3' : 'top-6'
              }`}
            />
          </div>
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="fixed inset-0 bg-light-navy z-0 flex flex-col items-center justify-center md:hidden"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.3 }}
            >
              <nav className="flex flex-col items-center gap-8 font-mono text-lg">
                {navLinks.map(({ url, name }, i) => (
                <Link
                  key={i}
                  href={url}
                  className="text-lightest-slate hover:text-green transition-colors relative"
                >
                    {name}
                  </Link>
                ))}
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 px-8 py-4 border border-green text-green rounded font-mono text-sm hover:bg-green/10 transition-colors"
                >
                  Resume
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
