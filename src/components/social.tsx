'use client';

import { Icon } from '@/components/icons';
import Side from './side';

interface SocialProps {
  isHome?: boolean;
}

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

export default function Social({ isHome = false }: SocialProps) {
  return (
    <Side isHome={isHome} orientation="left">
      <ul className="flex flex-col items-center gap-4 list-none p-0 m-0">
        {socialMedia.map(({ url, name }, i) => (
          <li key={i} className="hover:transform hover:-translate-y-1 transition-transform">
            <a
              href={url}
              aria-label={name}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-light-slate hover:text-green transition-colors"
            >
              <Icon name={name as any} />
            </a>
          </li>
        ))}
        <div className="w-px h-24 bg-light-slate mx-auto" />
      </ul>
    </Side>
  );
}
