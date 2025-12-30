'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { KEY_CODES } from '@/lib/utils';
import { useOnClickOutside } from '@/hooks';

interface NavLink {
  name: string;
  url: string;
}

const navLinks: NavLink[] = [
  { name: 'About', url: '/#about' },
  { name: 'Experience', url: '/#jobs' },
  { name: 'Work', url: '/#projects' },
  { name: 'Contact', url: '/#contact' },
];

export default function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useOnClickOutside(wrapperRef, () => setIsMenuOpen(false));

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const onKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case KEY_CODES.ESCAPE:
        setIsMenuOpen(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined' && window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <div className="hidden md:block">
      <div ref={wrapperRef}>
        <button
          ref={buttonRef}
          onClick={toggleMenu}
          className="relative z-10 p-3 bg-transparent border-0 cursor-pointer group"
          aria-label="Menu"
        >
          <div className="w-8 h-6 relative inline-block">
            <span
              className={`absolute left-0 w-8 h-0.5 bg-green transition-all duration-300 ease-in-out ${
                isMenuOpen ? 'rotate-45 top-3' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 w-8 h-0.5 bg-green transition-all duration-300 ease-in-out ${
                isMenuOpen ? 'opacity-0' : 'top-2.5'
              }`}
            />
            <span
              className={`absolute left-0 w-8 h-0.5 bg-green transition-all duration-300 ease-in-out ${
                isMenuOpen ? '-rotate-45 top-5' : 'top-5'
              }`}
            />
          </div>
        </button>

        <aside
          className={`fixed inset-y-0 right-0 w-[min(75vw,400px)] bg-light-navy shadow-xl z-40 p-12 flex flex-col justify-center transition-transform duration-300 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          aria-hidden={!isMenuOpen}
        >
          <nav ref={navRef} className="w-full flex flex-col items-center text-lightest-slate font-mono text-center">
            <ol className="flex flex-col gap-8 w-full list-none p-0 m-0">
              {navLinks.map(({ url, name }, i) => (
                <li key={i} className="relative text-xl sm:text-2xl">
                  <Link
                    href={url}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lightest-slate hover:text-green transition-colors py-3 block"
                  >
                    <span className="text-green text-sm">{`0${i + 1}. `}</span>
                    {name}
                  </Link>
                </li>
              ))}
            </ol>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-12 px-10 py-4 border border-green text-green rounded font-mono text-sm hover:bg-green/10 transition-colors"
            >
              Resume
            </a>
          </nav>
        </aside>
      </div>
    </div>
  );
}
