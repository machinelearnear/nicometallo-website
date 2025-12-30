'use client';

import Side from './side';

interface EmailProps {
  isHome?: boolean;
}

const EMAIL = 'hello@nicometallo.com';

export default function Email({ isHome = false }: EmailProps) {
  return (
    <Side isHome={isHome} orientation="right">
      <div className="flex flex-col items-center relative">
        <a
          href={`mailto:${EMAIL}`}
          className="my-5 p-2 font-mono text-xxs text-light-slate hover:text-green transition-all"
          style={{ writingMode: 'vertical-rl' }}
        >
          {EMAIL}
        </a>
        <div className="w-px h-24 bg-light-slate mx-auto" />
      </div>
    </Side>
  );
}
