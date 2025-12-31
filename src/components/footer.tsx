'use client';

import { useState, useEffect } from 'react';
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
  const [githubInfo, setGitHubInfo] = useState({
    stars: null as number | null,
    forks: null as number | null,
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      fetch('https://api.github.com/repos/machinelearnear/nicometallo-website')
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

      <div tabIndex={-1} className="text-light-slate font-mono text-xxs leading-none">
        <a
          href="https://github.com/machinelearnear/nicometallo-website"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 inline-block hover:text-green transition-all duration-300"
        >
          <div>Built by Nicolas Metallo</div>
          <div className="mt-1">Design by Brittany Chiang</div>

          {typeof githubInfo.stars === 'number' && typeof githubInfo.forks === 'number' && (
            <div className="github-stats mt-2.5">
              <span className="inline-flex items-center mx-1.5">
                <Icon name="Star" />
                <span className="ml-1">{githubInfo.stars.toLocaleString()}</span>
              </span>
              <span className="inline-flex items-center mx-1.5">
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
