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
      <ul className="flex flex-col items-center gap-5 list-none p-0 m-0">
        {socialMedia.map(({ url, name }, i) => (
          <li key={i} className="group">
            <a
              href={url}
              aria-label={name}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-2.5 text-light-slate hover:text-green transition-all duration-300 hover:-translate-y-1 hover:drop-shadow-[0_0_10px_rgba(100,255,218,0.4)]"
            >
              <Icon name={name as any} />
            </a>
          </li>
        ))}
        <div className="w-px h-24 bg-light-slate/50 mx-auto" />
      </ul>
    </Side>
  );
}
