'use client';

import { Icon } from '@/components/icons';

interface SocialMediaItem {
  name: string;
  url: string;
}

const socialMedia: SocialMediaItem[] = [
  { name: 'GitHub', url: 'https://github.com/machinelearnear' },
  { name: 'YouTube', url: 'https://www.youtube.com/@machinelearnear' },
  { name: 'Twitter', url: 'https://twitter.com/nicolasmetallo' },
  { name: 'Linkedin', url: 'https://linkedin.com/in/nicolas-metallo' },
];

export default function Footer() {

  return (
    <footer className="flex flex-col items-center justify-center min-h-[70px] py-4 text-center">
      {/* Mobile Social Links */}
      <div className="md:hidden w-full max-w-[270px] mb-2.5 text-light-slate">
        <ul className="flex justify-between items-center list-none p-0 m-0">
          {socialMedia.map(({ name, url }, i) => (
            <li key={i}>
              <a href={url} aria-label={name} className="p-2">
                <Icon name={name as any} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div tabIndex={-1} className="font-mono text-xs leading-none" style={{ color: 'var(--warm-gray)' }}>
        <a
          href="https://github.com/bchiang7/v4"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 inline-block hover:text-coral transition-all duration-300"
        >
          <div className="flex items-center justify-center gap-1">
            <span>Built with</span>
            <span style={{ color: 'var(--coral)' }}>❤</span>
            <span>&</span>
            <span>🧉</span>
          </div>
          <div className="mt-1">Design by Brittany Chiang</div>
        </a>
      </div>
    </footer>
  );
}
