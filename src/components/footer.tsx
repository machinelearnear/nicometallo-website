'use client';

import { useState, useEffect } from 'react';
import { Icon } from '@/components/icons';

interface SocialMediaItem {
  name: string;
  url: string;
}

const socialMedia: SocialMediaItem[] = [
  { name: 'GitHub', url: 'https://github.com/nicometallo' },
  { name: 'Instagram', url: 'https://www.instagram.com/nicometallo' },
  { name: 'Twitter', url: 'https://twitter.com/nicometallo' },
  { name: 'Linkedin', url: 'https://linkedin.com/in/nicometallo' },
  { name: 'Codepen', url: 'https://codepen.io/nicometallo' },
];

export default function Footer() {
  const [githubInfo, setGitHubInfo] = useState({
    stars: null as number | null,
    forks: null as number | null,
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      fetch('https://api.github.com/repos/nicometallo/nicometallo-website')
        .then((response) => response.json())
        .then((json) => {
          const { stargazers_count, forks_count } = json;
          setGitHubInfo({
            stars: stargazers_count,
            forks: forks_count,
          });
        })
        .catch(() => {
          // Silently fail for GitHub stats
        });
    }
  }, []);

  return (
    <footer className="flex flex-col items-center justify-center min-h-[70px] py-4 text-center">
      {/* Mobile Social Links */}
      <div className="hidden md:block w-full max-w-[270px] mb-3 text-light-slate">
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

      <div tabIndex={-1} className="text-light-slate font-mono text-xxs leading-none">
        <a
          href="https://github.com/nicometallo/nicometallo-website"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 inline-block"
        >
          <div>Forked from <a href="https://github.com/bchiang7/v4" target="_blank" rel="noopener noreferrer">Brittany Chiang's v4</a></div>

          {githubInfo.stars !== null && githubInfo.forks !== null && (
            <div className="mt-2 flex items-center gap-3">
              <span className="flex items-center">
                <Icon name="Star" />
                <span className="ml-1">{githubInfo.stars.toLocaleString()}</span>
              </span>
              <span className="flex items-center">
                <Icon name="Fork" />
                <span className="ml-1">{githubInfo.forks.toLocaleString()}</span>
              </span>
            </div>
          )}
        </a>
      </div>
    </footer>
  );
}
